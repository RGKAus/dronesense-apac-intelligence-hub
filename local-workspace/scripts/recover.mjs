import net from "node:net";
import { constants, copyFileSync, existsSync, fsyncSync, closeSync, lstatSync, openSync, renameSync, rmdirSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { compileRuntime, root } from "./build.mjs";
import { storageDirectory } from "../server/storage-location.mjs";

process.umask(0o077);
const file = process.argv[2];
if (!file || process.argv.length !== 3) throw new Error("Usage: npm run recover -- <backup-filename>. Stop the workspace first. No arbitrary paths accepted.");
compileRuntime();
const { default: runtime } = await import(pathToFileURL(path.join(root, ".runtime/local-workspace/server/store.js")).href);
const directory = storageDirectory();
const guard = net.createServer();
await new Promise((resolve, reject) => {
  guard.once("error", () => reject(new Error("Stop the workspace before offline recovery; port 3219 must be free.")));
  guard.listen(3219, "127.0.0.1", resolve);
});
try {
  const data = runtime.readBackup(path.join(directory, "backups"), file);
  const stage = path.join(directory, `recovery-${randomUUID()}`);
  const replacement = new runtime.WorkspaceStore(stage);
  try { replacement.save(data, replacement.read().revision); } finally { replacement.close(); }
  const database = path.join(directory, "fictional-workspace.sqlite");
  const retained = `${database}.before-recovery-${randomUUID()}`;
  if (existsSync(database)) {
    if (!lstatSync(database).isFile() || lstatSync(database).isSymbolicLink()) throw new Error("Refusing to replace an unsafe database path.");
    copyFileSync(database, retained, constants.COPYFILE_EXCL);
    const descriptor = openSync(retained, "r");
    try { fsyncSync(descriptor); } finally { closeSync(descriptor); }
  }
  for (const suffix of ["-journal", "-wal", "-shm"]) {
    const sidecar = `${database}${suffix}`;
    if (existsSync(sidecar)) {
      if (!lstatSync(sidecar).isFile() || lstatSync(sidecar).isSymbolicLink()) throw new Error("Unsafe database recovery sidecar.");
      renameSync(sidecar, `${retained}${suffix}`);
    }
  }
  renameSync(path.join(stage, "fictional-workspace.sqlite"), database);
  const descriptor = openSync(directory, "r");
  try { fsyncSync(descriptor); } finally { closeSync(descriptor); }
  rmdirSync(path.join(stage, "backups"));
  rmdirSync(stage);
  console.log("Verified fictional backup recovered. Previous database retained beside it. Start the workspace again and unlock with its new launch code.");
} finally { guard.close(); }
