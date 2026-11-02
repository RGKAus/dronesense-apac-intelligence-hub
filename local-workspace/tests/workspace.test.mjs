import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync, writeFileSync, readdirSync, statSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import http from "node:http";
import { DatabaseSync } from "node:sqlite";
import { cleanEnvironment } from "../scripts/build.mjs";
import { storageDirectory } from "../server/storage-location.mjs";
import runtime from "../.runtime/local-workspace/server/store.js";
import domain from "../.runtime/local-workspace/lib/workspace.js";
import customers from "../.runtime/web-app/lib/customerDemo.js";
import customerModel from "../.runtime/web-app/lib/customers.js";
import logs from "../.runtime/web-app/lib/intelligenceLog.js";

process.umask(0o077);
const temporary = mkdtempSync(path.join(tmpdir(), "versaterm-local-tests-"));
process.on("exit", () => rmSync(temporary, { recursive: true, force: true }));
const directory = name => path.join(temporary, name);

test("SQLite seed retains canonical IDs, evidence, unknowns and completeness", () => {
  const store = new runtime.WorkspaceStore(directory("seed"));
  try {
    const snapshot = store.read();
    assert.equal(snapshot.revision, 1);
    domain.validateWorkspace(snapshot.data);
    assert.deepEqual(snapshot.data, domain.initialWorkspace());
    assert.equal(snapshot.data.handovers.find(item => item.organisationId === "demo-auckland").sections.contracts.value, null);
    assert.equal(customerModel.getHandoverCompleteness(snapshot.data.handovers.find(item => item.organisationId === "demo-auckland")).percent, 100);
    assert.equal(statSync(path.join(directory("seed"), "fictional-workspace.sqlite")).mode & 0o777, 0o600);
  } finally { store.close(); }
});

test("customer, contract, follow-up and linked log CRUD persists across database reopen", () => {
  const location = directory("crud");
  let store = new runtime.WorkspaceStore(location);
  let snapshot = store.read();
  const created = customers.createBlankDemoCustomer(snapshot.data, "Fictional: Local Test Service", "NZ", "auckland", "demo-local-test");
  assert.equal(created.error, null);
  const record = created.state.handovers.find(item => item.organisationId === "demo-local-test");
  const contract = customerModel.createEmptyContract("contract-demo-one");
  contract.products = ["iapro", "dronesense"];
  contract.value = "1200.00"; contract.currency = "NZD"; contract.evidence = "reported";
  contract.source = "Fictional: Role-play document";
  record.sections.contracts = { value: [contract, customerModel.createEmptyContract("contract-demo-two")], source: "Fictional: Role-play", evidence: "reported", review: "reviewed" };
  record.actions = [{ id: "demo-action", title: "Fictional: Review contracts", completed: false, dueDate: null }];
  const entry = logs.createLogEntry("demo-linked-log", new Date());
  entry.notes = `Fictional: ${"Role-play transcript example.\n".repeat(4000)}`;
  entry.organisationIds = ["demo-local-test", "wa-police"];
  entry.tags = ["Partner", "Action Required"];
  const savedLog = logs.saveLogEntry([], entry, created.state.organisations, new Date());
  snapshot = store.save({ ...created.state, entries: savedLog.entries }, snapshot.revision);
  store.close();
  store = new runtime.WorkspaceStore(location);
  try {
    assert.deepEqual(store.read(), snapshot);
    assert.equal(logs.getLogEntriesForOrganisation(snapshot.data.entries, "demo-local-test").length, 1);
    const updated = structuredClone(snapshot.data);
    const profile = updated.handovers.find(item => item.organisationId === "demo-local-test");
    profile.sections.contracts.value[0].value = null;
    profile.sections.contracts.value.splice(1, 1);
    profile.actions[0].completed = true;
    updated.entries[0].tags = ["Internal"];
    snapshot = store.save(updated, snapshot.revision);
    assert.equal(snapshot.data.handovers.at(-1).sections.contracts.value[0].value, null);
    const deleted = structuredClone(snapshot.data);
    deleted.handovers = deleted.handovers.filter(item => item.organisationId !== "demo-local-test");
    deleted.organisations = deleted.organisations.filter(item => item.id !== "demo-local-test");
    deleted.entries = [];
    snapshot = store.save(deleted, snapshot.revision);
    assert.equal(snapshot.data.handovers.some(item => item.organisationId === "demo-local-test"), false);
    assert.equal(snapshot.data.entries.length, 0);
  } finally { store.close(); }
});

test("transactional revision checks prevent lost updates across connections", () => {
  const location = directory("concurrency");
  const first = new runtime.WorkspaceStore(location);
  const second = new runtime.WorkspaceStore(location);
  try {
    const stale = second.read();
    const current = first.read();
    current.data.entries[0].notes = "Fictional: first writer";
    first.save(current.data, current.revision);
    assert.throws(() => second.save(stale.data, stale.revision), error => error.status === 409);
    assert.equal(second.read().data.entries[0].notes, "Fictional: first writer");
  } finally { first.close(); second.close(); }
});

test("server validation rejects sensitive content, malformed types, extra fields and dangling links", () => {
  const original = domain.initialWorkspace();
  for (const mutate of [
    data => { data.entries[0].notes = "Actual private meeting notes"; },
    data => { data.entries[0].notes = "Fictional: person@example.invalid"; },
    data => { data.entries[0].organisationIds = ["nonexistent"]; },
    data => { data.handovers[0].sections.notes.value = 123; },
    data => { data.entries[0].secret = "Extra field"; },
    data => { data.organisations[0].name = "Fictional: changed real agency"; },
    data => { data.organisations.splice(0, 1); },
    data => { data.handovers[0].salesforceAccountUrl = "https://example.invalid"; },
    data => { data.entries[0].evidence = "AI verified"; },
    data => { data.entries[0].actions = [{ id: "x", title: "Fictional: action", dueDate: null, completed: "true" }]; },
  ]) {
    const next = structuredClone(original);
    mutate(next);
    assert.throws(() => domain.validateWorkspace(next));
  }
});

test("backup restores exact content, advances revision and retains pre-restore snapshot", () => {
  const store = new runtime.WorkspaceStore(directory("recovery"));
  try {
    const original = store.read();
    const backup = store.backup();
    assert.equal(store.listBackups().length, 1);
    assert.equal(statSync(path.join(store.backupDirectory, backup)).mode & 0o777, 0o600);
    const changed = structuredClone(original.data);
    changed.entries[0].notes = "Fictional: changed since backup";
    const next = store.save(changed, original.revision);
    const restored = store.restore(backup, next.revision);
    assert.deepEqual(restored.data, original.data);
    assert.equal(restored.revision, next.revision + 1);
    assert.equal(store.listBackups().length, 2);
    assert.throws(() => store.save(changed, next.revision), error => error.status === 409);
    const content = JSON.parse(readFileSync(path.join(store.backupDirectory, backup), "utf8"));
    content.payload += " ";
    writeFileSync(path.join(store.backupDirectory, backup), JSON.stringify(content));
    assert.throws(() => store.restore(backup, restored.revision), /checksum/);
    assert.deepEqual(store.read(), restored);
    assert.throws(() => store.restore("../fictional-workspace.sqlite", restored.revision), /existing backup/);
  } finally { store.close(); }
});

test("symlinked database or backup targets are rejected", () => {
  const store = new runtime.WorkspaceStore(directory("symlinks"));
  const file = store.backup();
  const target = path.join(store.backupDirectory, file);
  rmSync(target);
  symlinkSync(path.join(directory("symlinks"), "fictional-workspace.sqlite"), target);
  assert.throws(() => store.restore(file, store.read().revision), /unsafe/);
  store.close();
});

test("existing missing state is never silently replaced with demonstration defaults", () => {
  const location = directory("no-reset");
  const store = new runtime.WorkspaceStore(location);
  store.close();
  const database = new DatabaseSync(path.join(location, "fictional-workspace.sqlite"));
  database.exec("DELETE FROM workspace");
  database.close();
  assert.throws(() => new runtime.WorkspaceStore(location), /Do not reset/);
});

test("damaged database is not needed to validate a recovery snapshot", () => {
  const location = directory("damaged");
  const store = new runtime.WorkspaceStore(location);
  const before = store.read();
  const backup = store.backup();
  store.close();
  writeFileSync(path.join(location, "fictional-workspace.sqlite"), "deliberately damaged fictional test database");
  assert.deepEqual(runtime.readBackup(path.join(location, "backups"), backup), before.data);
  assert.throws(() => new runtime.WorkspaceStore(location));
});

test("launcher environment is cloud-free and storage root is outside repository/sync paths", () => {
  const environment = cleanEnvironment();
  assert.deepEqual(Object.keys(environment).filter(key => /SUPABASE|VERCEL|SECRET|TOKEN|PASSWORD|NODE_OPTIONS/i.test(key)), []);
  assert.equal(environment.NEXT_TELEMETRY_DISABLED, "1");
  const location = storageDirectory();
  assert.equal(location.includes(process.cwd()), false);
  assert.doesNotMatch(location, /OneDrive|CloudStorage|Dropbox|Mobile Documents/);
});

test("public build traces and route manifest exclude all local storage code", () => {
  const publicRoot = path.resolve("../web-app");
  const manifest = readFileSync(path.join(publicRoot, ".next/server/app-paths-manifest.json"), "utf8");
  assert.doesNotMatch(manifest, /local-api|backups|local-workspace/);
  let count = 0;
  const walk = directory => {
    for (const item of readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name);
      if (item.isDirectory()) walk(file);
      else if (file.endsWith(".nft.json")) {
        count++;
        assert.doesNotMatch(readFileSync(file, "utf8"), /local-workspace|fictional-workspace\.sqlite|node:sqlite|Application Support/);
      }
    }
  };
  walk(path.join(publicRoot, ".next/server"));
  assert.ok(count > 20);
});

test("offline recovery command validates a snapshot and retains the previous database", () => {
  const store = new runtime.WorkspaceStore(storageDirectory());
  const before = store.read();
  const file = store.backup();
  store.close();
  writeFileSync(path.join(storageDirectory(), "fictional-workspace.sqlite-journal"), "fictional interrupted journal for recovery test");
  const result = spawnSync(process.execPath, ["scripts/recover.mjs", file], { cwd: process.cwd(), env: process.env, encoding: "utf8" });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const restored = new runtime.WorkspaceStore(storageDirectory());
  try { assert.deepEqual(restored.read().data, before.data); } finally { restored.close(); }
  assert.ok(readdirSync(storageDirectory()).some(name => name.includes(".before-recovery-")));
});

test("protected HTTP runtime persists across process restarts and rejects foreign requests", async () => {
  let child;
  let code;
  async function launch() {
    child = spawn(process.execPath, ["server/local-server.mjs"], { cwd: process.cwd(), env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    code = await new Promise((resolve, reject) => {
      let output = "";
      const timer = setTimeout(() => reject(new Error("Local server failed readiness; ensure port 3219 is free.")), 15000);
      child.once("exit", () => { clearTimeout(timer); reject(new Error("Local server exited before readiness.")); });
      child.stderr.on("data", chunk => { if (String(chunk).includes("could not open")) { clearTimeout(timer); reject(new Error("Storage safety check failed.")); } });
      child.stdout.on("data", chunk => {
        output += chunk;
        const match = output.match(/Unlock code \(this launch only\): ([A-Za-z0-9_-]+)/);
        if (match) { clearTimeout(timer); resolve(match[1]); }
      });
    });
  }
  async function stop() {
    if (!child || child.exitCode !== null) return;
    const exited = new Promise(resolve => child.once("exit", resolve));
    child.kill("SIGTERM");
    await exited;
  }
  const origin = "http://127.0.0.1:3219";
  async function unlock() {
    const response = await fetch(`${origin}/unlock`, { method: "POST", redirect: "manual",
      headers: { Origin: origin, "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code }) });
    assert.equal(response.status, 303);
    return response.headers.get("set-cookie").split(";")[0];
  }
  let previous;
  let headers;
  try {
    await launch();
    assert.equal((await fetch(`${origin}/local-api/state`)).status, 401);
    assert.equal((await fetch(`${origin}/customers`, { redirect: "manual" })).status, 303);
    const badHostStatus = await new Promise((resolve, reject) => {
      const request = http.get(`${origin}/unlock`, { headers: { Host: "attacker.invalid:3219" } }, response => { response.resume(); resolve(response.statusCode); });
      request.on("error", reject);
    });
    assert.equal(badHostStatus, 403);
    assert.equal((await fetch(`${origin}/local-api/state`, { headers: { Origin: "https://attacker.invalid" } })).status, 403);
    const cookie = await unlock();
    const loaded = await (await fetch(`${origin}/local-api/state`, { headers: { Cookie: cookie } })).json();
    previous = loaded.data;
    headers = { Cookie: cookie, Origin: origin, "Content-Type": "application/json", "X-Workspace-CSRF": loaded.csrf };
    assert.equal((await fetch(`${origin}/local-api/state`, { method: "PUT", headers: { ...headers, "X-Workspace-CSRF": "wrong" }, body: "{}" })).status, 403);
    assert.equal((await fetch(`${origin}/local-api/state`, { method: "PUT", headers: { ...headers, Origin: "" }, body: "{}" })).status, 403);
    assert.equal((await fetch(`${origin}/api/documents/list`, { headers })).status, 404);
    const backupResponse = await fetch(`${origin}/local-api/backup`, { method: "POST", headers, body: "{}" });
    assert.equal(backupResponse.status, 200);
    const backupFile = (await backupResponse.json()).file;
    const changed = structuredClone(previous);
    changed.entries = logs.saveLogEntry(changed.entries, {
      ...logs.createLogEntry("demo-http-restart", new Date()), notes: "Fictional: persisted across process restart.", organisationIds: ["demo-wa"],
    }, changed.organisations, new Date()).entries;
    let response = await fetch(`${origin}/local-api/state`, { method: "PUT", headers, body: JSON.stringify({ revision: loaded.revision, data: changed }) });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("cache-control"), /no-store/);
    await stop();
    await launch();
    assert.equal((await fetch(`${origin}/local-api/state`, { headers })).status, 401);
    const newCookie = await unlock();
    const after = await (await fetch(`${origin}/local-api/state`, { headers: { Cookie: newCookie } })).json();
    assert.ok(after.data.entries.some(item => item.id === "demo-http-restart"));
    headers = { Cookie: newCookie, Origin: origin, "Content-Type": "application/json", "X-Workspace-CSRF": after.csrf };
    response = await fetch(`${origin}/local-api/restore`, { method: "POST", headers, body: JSON.stringify({ revision: after.revision, file: backupFile }) });
    assert.equal(response.status, 200);
    const recovered = await response.json();
    assert.deepEqual(recovered.data, previous);
    assert.ok(recovered.backups.includes(backupFile));
    previous = null;
    assert.equal((await fetch(`${origin}/local-api/lock`, { method: "POST", headers, body: "{}" })).status, 200);
    assert.equal((await fetch(`${origin}/local-api/state`, { headers })).status, 401);
  } finally {
    if (previous && headers) {
      const response = await fetch(`${origin}/local-api/state`, { headers });
      if (response.ok) {
        const latest = await response.json();
        await fetch(`${origin}/local-api/state`, { method: "PUT", headers: { ...headers, "X-Workspace-CSRF": latest.csrf }, body: JSON.stringify({ revision: latest.revision, data: previous }) });
      }
    }
    await stop();
  }
});
