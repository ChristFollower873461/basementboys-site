import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { request as httpRequest } from "node:http";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

function assertSafetyHeaders(response) {
  for (const [name, expected] of Object.entries({
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin",
    "cross-origin-opener-policy": "same-origin",
    "strict-transport-security": "max-age=300",
  })) {
    assert.equal(response.headers.get(name), expected, name);
  }
  assert.match(response.headers.get("permissions-policy") ?? "", /payment=\(\)/);
  const csp = response.headers.get("content-security-policy") ?? "";
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /object-src 'none'/);
}

async function startLocalWorker(t) {
  // Launch the generated configuration unchanged: a wrapper-only import skips
  // Cloudflare's asset router and cannot detect assets bypassing the Worker.
  const env = Object.fromEntries(
    ["PATH", "HOME", "TMPDIR", "LANG", "LC_ALL", "SHELL", "USER", "LOGNAME"]
      .filter((name) => process.env[name] !== undefined)
      .map((name) => [name, process.env[name]]),
  );
  Object.assign(env, {
    CI: "true",
    NO_COLOR: "1",
    WRANGLER_SEND_METRICS: "false",
    WRANGLER_LOG_PATH: path.join(root, ".wrangler", "runtime-test.log"),
    NEXT_TELEMETRY_DISABLED: "1",
    CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: "false",
  });
  const child = spawn(process.execPath, [
    path.join(root, "node_modules", "wrangler", "bin", "wrangler.js"),
    "dev", "--config", "dist/server/wrangler.json", "--local",
    "--ip", "127.0.0.1", "--port", "0", "--inspector-port", "0",
    "--show-interactive-dev-session=false",
  ], { cwd: root, env, stdio: ["ignore", "pipe", "pipe"] });
  const exited = once(child, "exit");
  t.after(async () => {
    if (child.exitCode === null) child.kill("SIGTERM");
    await exited;
  });
  let output = "";
  return new Promise((resolve, reject) => {
    const deadline = setTimeout(() => reject(new Error(`Local Worker startup timed out:\n${output}`)), 30_000);
    const fail = (error) => {
      clearTimeout(deadline);
      reject(error);
    };
    child.once("error", fail);
    child.once("exit", (code) => fail(new Error(`Local Worker exited (${code}):\n${output}`)));
    const onOutput = (chunk) => {
      output = (output + chunk).slice(-12_000);
      const ready = output.match(/Ready on (http:\/\/127\.0\.0\.1:\d+)/);
      if (ready) {
        clearTimeout(deadline);
        resolve(ready[1]);
      }
    };
    child.stdout.on("data", onOutput);
    child.stderr.on("data", onOutput);
  });
}

test("generated Worker routing serves assets through the public response boundary", { timeout: 60_000 }, async (t) => {
  const origin = await startLocalWorker(t);
  const fetchLocal = (pathname, headers = {}, method = "GET") => new Promise((resolve, reject) => {
    // Use HTTP directly so the synthetic Host header reaches Wrangler unchanged.
    // Every connection remains on literal loopback and redirects are not followed.
    const request = httpRequest(new URL(pathname, origin), { headers, method }, (incoming) => {
      const chunks = [];
      incoming.on("data", (chunk) => chunks.push(chunk));
      incoming.on("error", reject);
      incoming.on("end", () => resolve(new Response(Buffer.concat(chunks), {
        status: incoming.statusCode, headers: incoming.headers,
      })));
    });
    request.on("error", reject);
    request.setTimeout(10_000, () => request.destroy(new Error("Local Worker response timed out")));
    request.end();
  });
  const homepage = await fetchLocal("/");
  const html = await homepage.text();
  const scripts = [...new Set([...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.js)"/g)].map((match) => match[1]))];
  const styles = [...new Set([...html.matchAll(/href="(\/assets\/[^"?]+\.css)"/g)].map((match) => match[1]))];
  assert.ok(scripts.length > 0, "exercise JavaScript actually referenced by the built homepage");
  assert.ok(styles.length > 0, "exercise CSS actually referenced by the built homepage");

  for (const pathname of ["/", "/sleeper-draft-command-center"]) {
    await t.test(`renders HTML at ${pathname}`, async () => {
      const response = await fetchLocal(pathname);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
      assert.match(await response.text(), /<title>[^<]*Basement Boys[^<]*<\/title>/);
      assertSafetyHeaders(response);
    });
  }

  const assets = [
    ["/robots.txt", /^text\/plain\b/i],
    ["/sitemap.xml", /^application\/xml\b/i],
    ["/.well-known/agent.json", /^application\/json\b/i],
    ["/bb-mark.svg", /^image\/svg\+xml\b/i],
    ["/basement-boys-social.png", /^image\/png\b/i],
    ["/sleeper-draft-command-center.png", /^image\/png\b/i],
    ["/favicon-32.png", /^image\/png\b/i],
    ...styles.map((pathname) => [pathname, /^text\/css\b/i]),
    ...scripts.map((pathname) => [pathname, /^(?:text|application)\/javascript\b/i]),
  ];
  for (const [pathname, mime] of assets) {
    await t.test(`serves ${pathname} with its bytes, MIME and safety headers`, async () => {
      const response = await fetchLocal(pathname);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", mime);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(path.join(root, "dist", "client", pathname)));
      assertSafetyHeaders(response);
    });
  }

  await t.test("serves asset HEAD requests without a body and with safety headers", async () => {
    const response = await fetchLocal("/bb-mark.svg", {}, "HEAD");
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^image\/svg\+xml\b/i);
    assert.equal((await response.arrayBuffer()).byteLength, 0);
    assertSafetyHeaders(response);
  });

  for (const pathname of ["/", "/sitemap.xml", "/.well-known/agent.json", "/bb-mark.svg", styles[0]]) {
    await t.test(`canonicalizes www request for ${pathname} before serving it`, async () => {
      const response = await fetchLocal(`${pathname}?source=synthetic-runtime-test`, { host: "www.basementboys.org" });
      assert.equal(response.status, 308);
      assert.equal(response.headers.get("location"), `https://basementboys.org${pathname}?source=synthetic-runtime-test`);
      assertSafetyHeaders(response);
      await response.arrayBuffer();
    });
  }

  for (const pathname of ["/_vinext/image?url=%2Fbb-mark.svg&w=64&q=75", "/synthetic-missing-route"]) {
    await t.test(`returns a secured 404 for ${pathname}`, async () => {
      const response = await fetchLocal(pathname);
      assert.equal(response.status, 404);
      assert.equal(response.headers.get("location"), null);
      assertSafetyHeaders(response);
      await response.arrayBuffer();
    });
  }
});
