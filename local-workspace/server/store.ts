import { DatabaseSync } from "node:sqlite";
import { createHash, randomUUID } from "node:crypto";
import { closeSync, existsSync, fsyncSync, lstatSync, mkdirSync, openSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { initialWorkspace, validateWorkspace, workspaceSchemaVersion, type Snapshot, type Workspace } from "../lib/workspace";

export class WorkspaceError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const backupName = /^fictional-[0-9T.-]+Z-[a-f0-9-]+\.json$/;

export function readBackup(directory: string, file: string): Workspace {
  const parent = lstatSync(directory);
  if (!parent.isDirectory() || parent.isSymbolicLink() || (parent.mode & 0o077) !== 0 ||
    (process.getuid && parent.uid !== process.getuid())) throw new WorkspaceError("Unsafe backup directory.");
  if (!backupName.test(file)) throw new WorkspaceError("Choose an existing backup from this workspace.");
  const target = path.join(directory, file);
  if (!existsSync(target) || lstatSync(target).isSymbolicLink() || !lstatSync(target).isFile() || lstatSync(target).size > 16_000_000) throw new WorkspaceError("Backup is missing or unsafe.");
  const wrapper: unknown = JSON.parse(readFileSync(target, "utf8"));
  if (!wrapper || typeof wrapper !== "object" || !("payload" in wrapper) || typeof wrapper.payload !== "string" ||
    !("sha256" in wrapper) || wrapper.sha256 !== hash(wrapper.payload)) throw new WorkspaceError("Backup checksum mismatch. No data restored.");
  const parsed: unknown = JSON.parse(wrapper.payload);
  if (!parsed || typeof parsed !== "object" || !("schemaVersion" in parsed) || parsed.schemaVersion !== workspaceSchemaVersion ||
    !("fictionalOnly" in parsed) || parsed.fictionalOnly !== true || !("data" in parsed)) throw new WorkspaceError("Unsupported backup format.");
  validateWorkspace(parsed.data);
  return parsed.data;
}

export class WorkspaceStore {
  private db: DatabaseSync;
  readonly backupDirectory: string;

  constructor(readonly directory: string) {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    const stat = lstatSync(directory);
    if (stat.isSymbolicLink() || !stat.isDirectory() || (stat.mode & 0o077) !== 0 ||
      (process.getuid && stat.uid !== process.getuid())) throw new Error("Workspace directory must be owned by this user with mode 0700, not a symlink.");
    const databasePath = path.join(directory, "fictional-workspace.sqlite");
    if (existsSync(databasePath) && (!lstatSync(databasePath).isFile() || lstatSync(databasePath).isSymbolicLink() || (lstatSync(databasePath).mode & 0o077) !== 0)) throw new Error("Unsafe database permissions or symlink.");
    const newDatabase = !existsSync(databasePath);
    if (newDatabase) closeSync(openSync(databasePath, "wx", 0o600));
    this.backupDirectory = path.join(directory, "backups");
    mkdirSync(this.backupDirectory, { recursive: true, mode: 0o700 });
    if (lstatSync(this.backupDirectory).isSymbolicLink() || (lstatSync(this.backupDirectory).mode & 0o077) !== 0) throw new Error("Unsafe backup directory.");
    this.db = new DatabaseSync(databasePath);
    this.db.exec("PRAGMA journal_mode=DELETE; PRAGMA synchronous=FULL; PRAGMA busy_timeout=3000;");
    this.db.exec("CREATE TABLE IF NOT EXISTS workspace (id INTEGER PRIMARY KEY CHECK(id=1), schema_version INTEGER NOT NULL, revision INTEGER NOT NULL, data TEXT NOT NULL)");
    if (!this.db.prepare("SELECT id FROM workspace WHERE id=1").get()) {
      if (!newDatabase) throw new Error("Existing workspace has no saved state. Do not reset it; investigate and restore a verified backup.");
      const data = initialWorkspace();
      validateWorkspace(data);
      this.db.prepare("INSERT INTO workspace VALUES(1,?,?,?)").run(workspaceSchemaVersion, 1, JSON.stringify(data));
    }
    this.read();
  }

  read(): Snapshot {
    const row = this.db.prepare("SELECT schema_version,revision,data FROM workspace WHERE id=1").get();
    if (!row || row.schema_version !== workspaceSchemaVersion || typeof row.revision !== "number" || typeof row.data !== "string") throw new Error("Unsupported or damaged workspace. Do not overwrite it; restore a verified backup.");
    const data: unknown = JSON.parse(row.data);
    validateWorkspace(data);
    return { revision: row.revision, data };
  }

  save(data: unknown, expected: number): Snapshot {
    validateWorkspace(data);
    if (!Number.isSafeInteger(expected) || expected < 1) throw new WorkspaceError("A valid workspace revision is required.");
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const current = this.read();
      if (current.revision !== expected) throw new WorkspaceError("Workspace changed in another tab or was restored. Reload before saving; your draft has not been saved.", 409);
      this.db.prepare("UPDATE workspace SET data=?,revision=revision+1 WHERE id=1").run(JSON.stringify(data));
      this.db.exec("COMMIT");
      return { revision: current.revision + 1, data };
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }

  listBackups(): string[] {
    return readdirSync(this.backupDirectory).filter((name) => backupName.test(name)).sort().reverse();
  }

  backup(): string {
    const snapshot = this.read();
    const payload = JSON.stringify({ schemaVersion: workspaceSchemaVersion, fictionalOnly: true, data: snapshot.data });
    const file = `fictional-${new Date().toISOString().replaceAll(":", ".")}-${randomUUID()}.json`;
    const target = path.join(this.backupDirectory, file);
    const temporary = `${target}.tmp`;
    const descriptor = openSync(temporary, "wx", 0o600);
    try {
      writeFileSync(descriptor, JSON.stringify({ payload, sha256: hash(payload) }));
      fsyncSync(descriptor);
    } finally { closeSync(descriptor); }
    renameSync(temporary, target);
    const parent = openSync(this.backupDirectory, "r");
    try { fsyncSync(parent); } finally { closeSync(parent); }
    return file;
  }

  restore(file: string, expected: number): Snapshot {
    const data = readBackup(this.backupDirectory, file);
    if (this.read().revision !== expected) throw new WorkspaceError("Workspace changed; reload before restoring.", 409);
    this.backup();
    return this.save(data, expected);
  }

  close() { this.db.close(); }
}
