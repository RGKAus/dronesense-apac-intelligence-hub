import { spawnSync } from "node:child_process";
import { build, cleanEnvironment, root } from "./build.mjs";
build();
const result = spawnSync(process.execPath, ["--test", "tests/workspace.test.mjs"], {
  cwd: root, env: cleanEnvironment(), stdio: "inherit",
});
process.exitCode = result.status ?? 1;
