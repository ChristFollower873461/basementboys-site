import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(new URL("../scripts/audit-dependencies.mjs", import.meta.url));
const clean = { metadata: { vulnerabilities: { total: 0 } }, vulnerabilities: {} };

async function runAudit(t, report, status = 0) {
  const directory = await mkdtemp(path.join(tmpdir(), "basementboys-audit-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const bin = path.join(directory, "bin");
  const response = path.join(directory, "response.json");
  await mkdir(bin);
  await writeFile(response, typeof report === "string" ? report : JSON.stringify(report));
  await writeFile(path.join(bin, "npm"), `#!/bin/sh
/bin/cat "$AUDIT_RESPONSE"
exit "$AUDIT_STATUS"
`, { mode: 0o700 });
  const result = spawnSync(process.execPath, [script], {
    env: { PATH: bin, AUDIT_RESPONSE: response, AUDIT_STATUS: String(status) },
    encoding: "utf8",
    timeout: 5_000,
  });
  assert.ifError(result.error);
  return result;
}

test("a complete zero-advisory report permits deployment", async (t) => {
  assert.equal((await runAudit(t, clean)).status, 0);
});

test("the formerly allowlisted image-size findings now block deployment", async (t) => {
  const report = {
    metadata: { vulnerabilities: { total: 2 } },
    vulnerabilities: {
      "image-size": { via: [
        { url: "https://github.com/advisories/GHSA-5p2g-fcmc-qvqq" },
        { url: "https://github.com/advisories/GHSA-w3rx-r6r6-pgpr" },
      ] },
      vinext: { via: ["image-size"] },
    },
  };
  const result = await runAudit(t, report, 1);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /no exceptions are allowed/);
});

for (const [name, report, status] of [
  ["registry failure", { error: { code: "ENETWORK" } }, 2],
  ["invalid JSON", "not an audit report", 0],
  ["missing vulnerability counts", { vulnerabilities: {} }, 0],
  ["nonzero npm exit with an empty report", clean, 1],
  ["nonzero count with no listed advisory", { ...clean, metadata: { vulnerabilities: { total: 1 } } }, 0],
  ["listed advisory with zero count", { ...clean, vulnerabilities: { example: {} } }, 0],
]) {
  test(`${name} fails closed`, async (t) => {
    assert.equal((await runAudit(t, report, status)).status, 1);
  });
}
