import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = mkdtempSync(join(tmpdir(), "intelligence-log-tests-"));
process.on("exit", () => rmSync(output, { recursive: true, force: true }));
const compile = spawnSync(process.execPath, [
  join(root, "node_modules/typescript/bin/tsc"), "lib/intelligenceLog.ts",
  "--module", "commonjs", "--target", "ES2022", "--strict", "--skipLibCheck", "--outDir", output,
], { cwd: root, encoding: "utf8" });
assert.equal(compile.status, 0, compile.stdout + compile.stderr);
const load = async (path) => (await import(pathToFileURL(join(output, path)).href)).default;
const log = await load("intelligenceLog.js");
const { getCanonicalCustomerOrganisations } = await load("customerOrganisations.js");
const { demoOrganisations } = await load("customerDemo.js");
const organisations = log.getLogOrganisations();
const now = new Date("2026-10-28T07:15:00Z");
const blank = () => log.createLogEntry("new-demo", now);
const draft = () => ({ ...blank(), notes: "Fictional: notebook writing exercise." });
const entries = () => log.getDemoLogEntries();
const filter = (changes) => ({ ...log.emptyLogFilters, ...changes });
const read = (path) => readFileSync(join(root, path), "utf8");

test("blank entry defaults are minimal and do not invent customer details or user attribution", () => {
  const entry = blank();
  assert.equal(entry.occurredAt, now.toISOString());
  for (const field of ["title", "notes", "source"]) assert.equal(entry[field], "");
  for (const field of ["tags", "organisationIds", "actions"]) assert.deepEqual(entry[field], []);
  for (const field of ["country", "jurisdiction", "createdBy", "updatedBy"]) assert.equal(entry[field], null);
  assert.equal(entry.type, "General");
  assert.equal(entry.evidence, "Not assessed");
  assert.equal(entry.revision, 0);
});

test("local datetime round trips without UTC slicing, including half-hour and DST regions", () => {
  const original = process.env.TZ;
  try {
    for (const zone of ["Australia/Perth", "Australia/Adelaide", "Pacific/Auckland"]) {
      process.env.TZ = zone;
      const local = log.toLocalDateTime(now.toISOString());
      assert.equal(log.fromLocalDateTime(local), now.toISOString());
      assert.notEqual(local, now.toISOString().slice(0, 16));
    }
    process.env.TZ = "Australia/Sydney";
    assert.equal(log.fromLocalDateTime("2026-10-04T02:30"), null);
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
  for (const value of ["", "invalid", "2026-02-30T12:00", "2026-13-01T12:00"]) assert.equal(log.fromLocalDateTime(value), null);
});

test("all seed content is valid, fictional and fresh for each notebook", () => {
  for (const entry of entries()) {
    assert.equal(log.validateLogEntry(entry, organisations), null);
    assert.match(entry.title, /Fictional/i);
    assert.match(entry.notes, /Fictional/i);
  }
  const changed = entries();
  changed[0].actions[0].title = "Fictional: changed";
  assert.notEqual(entries()[0].actions[0].title, changed[0].actions[0].title);
});

test("save creates an isolated in-memory entry; cancelling a cloned draft has no effect", () => {
  const existing = entries();
  const before = structuredClone(existing);
  const pending = draft();
  const result = log.saveLogEntry(existing, pending, organisations, now);
  assert.equal(result.error, null);
  assert.equal(result.entries.length, 4);
  assert.equal(result.entries.at(-1).title, "Untitled fictional entry");
  assert.equal(result.entries.at(-1).revision, 1);
  assert.deepEqual(existing, before);
  pending.tags.push("Internal");
  assert.deepEqual(result.entries.at(-1).tags, []);
  const cancelled = structuredClone(existing[0]);
  cancelled.notes = "Fictional: cancelled writing";
  cancelled.actions[0].completed = true;
  assert.deepEqual(existing, before);
});

test("editing one entry preserves all other entries, identity, creation date and evidence", () => {
  const existing = entries();
  const edit = structuredClone(existing[0]);
  edit.notes = "Fictional: revised notes.";
  edit.tags = ["Partner", "Internal"];
  edit.organisationIds = ["demo-wa", "wa-police"];
  edit.actions[0].completed = true;
  const result = log.saveLogEntry(existing, edit, organisations, now);
  assert.equal(result.error, null);
  assert.deepEqual(result.entries.slice(1), existing.slice(1));
  assert.equal(result.entries[0].evidence, "Reported / unverified");
  assert.equal(result.entries[0].createdAt, existing[0].createdAt);
  assert.equal(result.entries[0].revision, 2);
  assert.equal(result.entries[0].updatedAt, now.toISOString());
  assert.equal(existing[0].actions[0].completed, false);
  const stale = log.saveLogEntry(result.entries, edit, organisations, now);
  assert.match(stale.error, /changed/);
  assert.equal(stale.entries, result.entries);
});

test("reverse chronology follows entry time rather than edit time without mutating state", () => {
  const original = entries().reverse();
  original[0].updatedAt = "2099-01-01T00:00:00Z";
  assert.deepEqual(log.filterLogEntries(original, filter({}), organisations).map((entry) => entry.id),
    ["demo-log-meeting", "demo-log-research", "demo-log-general"]);
  assert.equal(original[0].id, "demo-log-general");
});

test("full transcript search reaches well beyond previews, including long fictional text", () => {
  const entry = draft();
  entry.notes = `Fictional: ${"A role-play speaker discusses an example.\n".repeat(4000)}UnusualSearchToken`;
  assert.ok(entry.notes.length > 100_000);
  assert.ok(entry.notes.length < log.MAX_LOG_NOTES);
  assert.equal(log.validateLogEntry(entry, organisations), null);
  assert.doesNotMatch(log.getLogPreview(entry.notes), /UnusualSearchToken/);
  assert.equal(log.filterLogEntries([entry], filter({ search: "unusualsearchtoken" }), organisations).length, 1);
  assert.equal(log.validateLogEntry({ ...entry, notes: "Fictional: " + "x".repeat(log.MAX_LOG_NOTES) }, organisations).includes("200,000"), true);
});

test("combined type, country, jurisdiction, multi-tag, organisation and follow-up filters", () => {
  const combined = filter({ type: "Meeting", country: "AU", jurisdiction: "western-australia",
    tags: ["Customer", "Action Required"], organisationId: "demo-wa", outstandingOnly: true });
  assert.equal(log.filterLogEntries(entries(), combined, organisations).length, 1);
  for (const change of [{ type: "Call" }, { country: "NZ" }, { jurisdiction: "auckland" },
    { tags: ["Customer", "Technology"] }, { organisationId: "demo-nsw" }]) {
    assert.equal(log.filterLogEntries(entries(), { ...combined, ...change }, organisations).length, 0);
  }
  assert.equal(log.filterLogEntries(entries(), filter({ search: "requirements review" }), organisations).length, 1);
  assert.equal(log.filterLogEntries(entries(), filter({ country: "NZ", jurisdiction: "canterbury" }), organisations).length, 1);
});

test("organisation identities are reused, unique and immutable; multiple links support future profile lookup", () => {
  const identities = [...getCanonicalCustomerOrganisations(), ...demoOrganisations];
  assert.equal(new Set(organisations.map((organisation) => organisation.id)).size, organisations.length);
  for (const identity of organisations) assert.deepEqual(identity, identities.find((item) => item.id === identity.id));
  const snapshot = structuredClone(identities);
  const linked = { ...draft(), organisationIds: ["wa-police", "demo-wa"] };
  assert.equal(log.saveLogEntry([], linked, organisations, now).error, null);
  assert.equal(log.getLogEntriesForOrganisation([linked], "wa-police").length, 1);
  assert.equal(log.getLogEntriesForOrganisation([linked], "demo-wa").length, 1);
  assert.equal(log.getLogEntriesForOrganisation([linked], "nonexistent").length, 0);
  assert.deepEqual([...getCanonicalCustomerOrganisations(), ...demoOrganisations], snapshot);
  assert.match(log.validateLogEntry({ ...linked, organisationIds: ["invented"] }, organisations), /existing organisations/);
  assert.match(log.validateLogEntry({ ...linked, organisationIds: ["demo-wa", "demo-wa"] }, organisations), /existing organisations/);
});

test("linking does not infer geography, evidence or customer relationships", () => {
  const linked = { ...draft(), organisationIds: ["wa-police"] };
  const saved = log.saveLogEntry([], linked, organisations, now).entries[0];
  assert.equal(saved.country, null);
  assert.equal(saved.jurisdiction, null);
  assert.equal(saved.evidence, "Not assessed");
  assert.equal("customerStatus" in saved, false);
});

test("unknown evidence stays unknown; confirmation is explicit and requires a fictional source", () => {
  assert.equal(log.saveLogEntry([], { ...draft(), evidence: "Unknown" }, organisations, now).entries[0].evidence, "Unknown");
  assert.match(log.validateLogEntry({ ...draft(), evidence: "Confirmed" }, organisations), /source/);
  assert.equal(log.validateLogEntry({ ...draft(), evidence: "Confirmed", source: "Fictional: exercise reference" }, organisations), null);
});

test("validation rejects non-fictional writing and contact data in every free-text field", () => {
  for (const value of ["real meeting", "Fictional: example@example.invalid", "Fictional: +61 400 123 456",
    "Fictional: https://example.invalid", "Demo: tel:123", "Fictional: mailto:someone"]) {
    for (const field of ["title", "notes", "source"]) {
      assert.ok(log.validateLogEntry({ ...draft(), [field]: value }, organisations), `${field}: ${value}`);
    }
    assert.ok(log.validateLogEntry({ ...draft(), actions: [{ id: "action", title: value, dueDate: null, completed: false }] }, organisations));
  }
  assert.equal(log.logDemoTextError("Fictional: 2026-10-28 09:00:00 Speaker Example: role-play."), null);
  assert.ok(log.validateLogEntry({ ...draft(), notes: " " }, organisations));
});

test("invalid metadata and follow-ups surface errors rather than silently saving", () => {
  for (const changes of [
    { occurredAt: "" }, { type: "Unsupported" }, { evidence: "Verified by AI" }, { tags: ["Wrong"] },
    { tags: ["Customer", "Customer"] }, { country: "AU", jurisdiction: "canterbury" },
    { country: null, jurisdiction: "auckland" },
    { actions: [{ id: "a", title: "", dueDate: null, completed: false }] },
    { actions: [{ id: "a", title: "Fictional: review", dueDate: "2026-02-30", completed: false }] },
  ]) {
    const original = entries();
    const result = log.saveLogEntry(original, { ...draft(), ...changes }, organisations, now);
    assert.ok(result.error, JSON.stringify(changes));
    assert.equal(result.entries, original);
  }
});

test("module has no persistence transport, raw HTML rendering or AI ingestion; nav is shared", () => {
  const files = ["lib/intelligenceLog.ts", "components/IntelligenceLogBrowser.tsx", "components/IntelligenceLogEditor.tsx", "app/intelligence-log/page.tsx"];
  for (const file of files) assert.doesNotMatch(read(file), /localStorage|sessionStorage|indexedDB|supabase|fetch\(|XMLHttpRequest|sendBeacon|dangerouslySetInnerHTML|use server/);
  assert.match(read("components/navigation.ts"), /label: "Intelligence Log", href: "\/intelligence-log"/);
  assert.match(read("components/IntelligenceLogBrowser.tsx"), /Draft cancelled\. Saved entries are unchanged/);
  assert.match(read("components/IntelligenceLogBrowser.tsx"), /disabled=\{draft !== null\}/);
  assert.match(read("components/IntelligenceLogEditor.tsx"), /onCancel/);
});
