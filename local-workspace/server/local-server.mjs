import http from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import next from "next";
import runtime from "../.runtime/local-workspace/server/store.js";
import { storageDirectory } from "./storage-location.mjs";

process.umask(0o077);
if (process.env.VERCEL) throw new Error("Local workspace cannot run on Vercel.");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = storageDirectory();
const port = 3219;
const origin = `http://127.0.0.1:${port}`;
const host = `127.0.0.1:${port}`;
const unlockCode = randomBytes(24).toString("base64url");
const session = randomBytes(32).toString("base64url");
const csrf = randomBytes(32).toString("base64url");
let authenticatedAt = 0;
let lastActivity = 0;
let failures = 0;
let blockedUntil = 0;
let store;
const app = next({ dev: false, dir: root, hostname: "127.0.0.1", port });
await app.prepare();
const handle = app.getRequestHandler();
const equal = (a, b) => typeof a === "string" && Buffer.byteLength(a) === Buffer.byteLength(b) && timingSafeEqual(Buffer.from(a), Buffer.from(b));

async function body(request, max = 16_000_000) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > max) throw new runtime.WorkspaceError("Request is too large.", 413);
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
function json(response, status, value) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(value));
}
const unlockPage = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Unlock local fictional workspace</title><body><main><h1>Versaterm local workspace</h1><p>Fictional records only. Enter the unlock code shown in the launch terminal. Never enter corporate credentials.</p><form method="post" action="/unlock"><label>Local unlock code <input name="code" type="password" required autocomplete="off"></label><button>Unlock workspace</button></form></main></body></html>`;

const server = http.createServer(async (request, response) => {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "same-origin");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'");
  if (request.socket.remoteAddress !== "127.0.0.1" || request.headers.host !== host ||
    (request.headers.origin && request.headers.origin !== origin) ||
    request.headers["sec-fetch-site"] === "cross-site") {
    return json(response, 403, { error: "Local origin and host required." });
  }
  const mutation = !["GET", "HEAD"].includes(request.method ?? "");
  if (mutation && request.headers.origin !== origin) return json(response, 403, { error: "Exact local Origin required." });
  let pathname;
  try {
    const target = new URL(request.url, origin);
    if (target.origin !== origin) return json(response, 403, { error: "Local request target required." });
    pathname = target.pathname;
  } catch { return json(response, 400, { error: "Invalid local request target." }); }
  try {
    if (pathname === "/unlock") {
      if (request.method === "GET") { response.setHeader("Content-Type", "text/html; charset=utf-8"); return response.end(unlockPage); }
      if (request.method !== "POST") return json(response, 405, { error: "Method not allowed." });
      if (Date.now() < blockedUntil) return json(response, 429, { error: "Too many unlock attempts. Wait one minute." });
      const code = new URLSearchParams(await body(request, 1024)).get("code");
      if (!equal(code, unlockCode)) {
        if (++failures >= 5) { blockedUntil = Date.now() + 60_000; failures = 0; }
        return json(response, 401, { error: "Invalid local unlock code. Use the launch terminal, not corporate credentials." });
      }
      failures = 0; authenticatedAt = Date.now(); lastActivity = Date.now();
      response.setHeader("Set-Cookie", `local_workspace=${session}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`);
      response.writeHead(303, { Location: "/customers" }); return response.end();
    }
    const cookie = (request.headers.cookie ?? "").split(";").map(value => value.trim()).find(value => value.startsWith("local_workspace="))?.slice("local_workspace=".length);
    if (!equal(cookie, session) || !authenticatedAt || Date.now() - authenticatedAt > 8 * 60 * 60_000 || Date.now() - lastActivity > 30 * 60_000) {
      if (pathname.startsWith("/local-api/")) return json(response, 401, { error: "Workspace locked. Unlock again; unsaved drafts are not persisted." });
      response.writeHead(303, { Location: "/unlock" }); return response.end();
    }
    lastActivity = Date.now();
    if (pathname.startsWith("/local-api/")) {
      if (mutation && (!equal(request.headers["x-workspace-csrf"], csrf) || request.headers["content-type"] !== "application/json")) return json(response, 403, { error: "CSRF token and JSON content required." });
      if (pathname === "/local-api/state" && request.method === "GET") return json(response, 200, { ...store.read(), csrf, backups: store.listBackups() });
      if (pathname === "/local-api/lock" && request.method === "POST") { authenticatedAt = 0; return json(response, 200, { locked: true }); }
      if (pathname === "/local-api/state" && request.method === "PUT") {
        const parsed = JSON.parse(await body(request));
        if (!parsed || typeof parsed !== "object" || !Number.isSafeInteger(parsed.revision) || !("data" in parsed)) throw new runtime.WorkspaceError("Expected workspace data and revision.");
        return json(response, 200, store.save(parsed.data, parsed.revision));
      }
      if (pathname === "/local-api/backup" && request.method === "POST") { await body(request, 1024); return json(response, 200, { file: store.backup(), backups: store.listBackups() }); }
      if (pathname === "/local-api/restore" && request.method === "POST") {
        const parsed = JSON.parse(await body(request, 2048));
        if (!parsed || typeof parsed.file !== "string" || !Number.isSafeInteger(parsed.revision)) throw new runtime.WorkspaceError("Choose a backup and provide the current revision.");
        return json(response, 200, { ...store.restore(parsed.file, parsed.revision), backups: store.listBackups() });
      }
      return json(response, 405, { error: "Unsupported local operation." });
    }
    if (mutation) return json(response, 405, { error: "Only the protected local API accepts writes." });
    if (!["/", "/customers", "/intelligence-log", "/backups"].includes(pathname) &&
      !pathname.startsWith("/customers/") && !pathname.startsWith("/_next/") && pathname !== "/favicon.ico") {
      return json(response, 404, { error: "This module is not part of the isolated local workspace." });
    }
    await handle(request, response);
  } catch (error) {
    if (error instanceof runtime.WorkspaceError) return json(response, error.status, { error: error.message });
    if (error instanceof SyntaxError) return json(response, 400, { error: "Invalid JSON. No changes were saved." });
    // Domain validation messages are safe; never log requests, record bodies or database contents.
    if (error instanceof Error && !("code" in error)) return json(response, 400, { error: error.message });
    console.error("Local storage operation failed; record contents omitted.");
    json(response, 500, { error: "Local storage failed. No success is assumed. Check disk availability and retained backups." });
  }
});
server.requestTimeout = 30_000;
server.headersTimeout = 10_000;
server.on("error", () => { console.error("Cannot listen on the fixed local port. Stop any previous workspace instance."); process.exitCode = 1; void app.close(); });
server.listen(port, "127.0.0.1", () => {
  try {
    store = new runtime.WorkspaceStore(directory);
    console.log(`Fictional workspace: ${origin}\nLocal database folder: ${directory}\nUnlock code (this launch only): ${unlockCode}\nKeep this terminal open. Ctrl+C stops the workspace.`);
  } catch { console.error("Local storage could not open safely. Check folder permissions, disk space and backups. No demo reset was attempted."); server.close(); void app.close(); process.exitCode = 1; }
});
for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, () => {
  server.close(() => { store?.close(); void app.close().then(() => process.exit(0)); });
  server.closeIdleConnections();
});
