import { homedir } from "node:os";
import { existsSync, lstatSync, realpathSync } from "node:fs";
import path from "node:path";

export function storageDirectory() {
  const home = realpathSync(homedir());
  const directory = path.join(home, "Library", "Application Support", "Versaterm Intelligence Hub Prototype");
  for (let current = directory; current !== path.dirname(current); current = path.dirname(current)) {
    if (/OneDrive|CloudStorage|Dropbox|Mobile Documents|Google Drive|Syncthing/i.test(current)) throw new Error("Synced storage is forbidden.");
    if (existsSync(current) && (lstatSync(current).isSymbolicLink() || realpathSync(current) !== current)) throw new Error("Storage ancestors must not be symlinks.");
  }
  return directory;
}
