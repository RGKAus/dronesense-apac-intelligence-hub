import { spawn } from "node:child_process";
import { build, cleanEnvironment, root } from "./build.mjs";

const major = Number(process.versions.node.split(".")[0]);
if (major < 24 || (major === 24 && Number(process.versions.node.split(".")[1]) < 2)) {
  throw new Error("Use Node 24.2 or newer for built-in SQLite.");
}
build();
const child = spawn(process.execPath, ["server/local-server.mjs"], {
  cwd: root, env: cleanEnvironment(), stdio: "inherit",
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", code => { process.exitCode = code ?? 1; });
