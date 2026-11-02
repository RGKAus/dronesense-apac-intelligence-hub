import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export function cleanEnvironment() {
  if (process.env.VERCEL) throw new Error("The local workspace must never run on Vercel.");
  for (const file of [".env", ".env.local", ".env.production", ".env.production.local"]) {
    if (existsSync(path.join(root, file))) throw new Error("Local workspace .env files are not supported. No private configuration belongs in this checkout.");
  }
  const allowed = ["PATH", "HOME", "USER", "LOGNAME", "TMPDIR", "LANG", "LC_ALL", "SYSTEMROOT"];
  return { ...Object.fromEntries(allowed.filter(key => process.env[key]).map(key => [key, process.env[key]])),
    NEXT_TELEMETRY_DISABLED: "1", NODE_ENV: "production" };
}
export function compileRuntime() {
  const result = spawnSync(process.execPath, [
    "node_modules/typescript/bin/tsc", "server/store.ts", "--module", "commonjs", "--target", "ES2022",
    "--strict", "--skipLibCheck", "--esModuleInterop", "--outDir", ".runtime",
  ], { cwd: root, env: cleanEnvironment(), stdio: "inherit" });
  if (result.status !== 0) throw new Error("Local runtime compilation failed.");
}
export function build() {
  compileRuntime();
  const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
    cwd: root, env: cleanEnvironment(), stdio: "inherit",
  });
  if (result.status !== 0) throw new Error("Local workspace build failed.");
}
if (process.argv[1] === fileURLToPath(import.meta.url)) build();
