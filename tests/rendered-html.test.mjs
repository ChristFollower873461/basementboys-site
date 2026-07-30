import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function fetchBuilt(path = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Basement Boys homepage", async () => {
  const response = await fetchBuilt();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Basement Boys — Definitely Have Opinions<\/title>/i);
  assert.match(html, /Definitely/);
  assert.match(html, /have opinions\./);
  assert.match(html, /A small site with explicit edges\./);
  assert.match(html, /No money moves/);
  assert.match(html, /data-agent="site-summary"/);
  assert.match(html, /data-agent="contact-form"/);
  assert.match(html, /\/\.well-known\/agent\.json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("publishes the public agent card", async () => {
  const file = await readFile(
    new URL("../dist/client/.well-known/agent.json", import.meta.url),
    "utf8",
  );
  const payload = JSON.parse(file);
  assert.equal(payload.name, "Basement Boys");
  assert.equal(payload.safety.authentication, false);
  assert.equal(payload.safety.payments, false);
  assert.equal(payload.safety.automated_write_endpoint, false);
  assert.deepEqual(payload.public_routes, [
    "/",
    "/robots.txt",
    "/sitemap.xml",
    "/.well-known/agent.json",
  ]);
});
