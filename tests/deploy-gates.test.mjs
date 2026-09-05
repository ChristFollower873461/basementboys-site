import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const { scripts } = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const gates = ["lint", "audit:dependencies", "test"];

async function simulateDeploy(t, failedGate = "") {
  const directory = await mkdtemp(path.join(tmpdir(), "basementboys-deploy-gates-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const bin = path.join(directory, "bin");
  const trace = path.join(directory, "trace");
  await mkdir(bin);
  await writeFile(trace, "");
  await writeFile(path.join(bin, "npm"), `#!/bin/sh
case "$*" in
  "run lint") gate=lint ;;
  "run audit:dependencies") gate=audit:dependencies ;;
  "test") gate=test ;;
  *) printf 'unexpected npm: %s\\n' "$*" >> "$TRACE"; exit 99 ;;
esac
printf '%s\\n' "$gate" >> "$TRACE"
if [ "$FAILED_GATE" = "$gate" ]; then exit 17; fi
`, { mode: 0o700 });
  await writeFile(path.join(bin, "wrangler"), `#!/bin/sh
printf 'wrangler %s\\n' "$*" >> "$TRACE"
`, { mode: 0o700 });

  // Execute the real package command, but expose only harmless command stubs.
  // No installed Wrangler, inherited provider environment, or build runs here.
  const result = spawnSync("/bin/sh", ["-c", scripts["deploy:cloudflare"]], {
    cwd: directory,
    env: { PATH: bin, TRACE: trace, FAILED_GATE: failedGate },
    encoding: "utf8",
    timeout: 5_000,
  });
  assert.ifError(result.error);
  return { status: result.status, trace: (await readFile(trace, "utf8")).trim().split("\n") };
}

for (const [index, gate] of gates.entries()) {
  test(`deployment stops before Wrangler when ${gate} fails`, async (t) => {
    const result = await simulateDeploy(t, gate);
    assert.equal(result.status, 17);
    assert.deepEqual(result.trace, gates.slice(0, index + 1));
  });
}

test("deployment reaches the harmless Wrangler stub only after all gates pass", async (t) => {
  const result = await simulateDeploy(t);
  assert.equal(result.status, 0);
  assert.deepEqual(result.trace.slice(0, 3), gates);
  assert.equal(result.trace.length, 4);
  assert.equal(result.trace[3], "wrangler deploy --config dist/server/wrangler.json --name basementboys-site --route basementboys.org/* --route www.basementboys.org/*");
});
