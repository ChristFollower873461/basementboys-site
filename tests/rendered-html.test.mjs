import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
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
  assert.match(html, /<title>Basement Boys — Open Source for Fun<\/title>/i);
  assert.match(html, /Then we open the source\./);
  assert.match(html, /A dev group with the source open\./);
  assert.match(html, /Repo pile/);
  assert.match(html, /Robotics Sandbox/);
  assert.match(html, /Drip Council/);
  assert.match(html, /CodexVault/);
  assert.match(html, /Pjario Staltman/);
  assert.match(html, /04 featured repos/);
  assert.match(html, /License it clearly\./);
  assert.match(html, /github\.com\/ChristFollower873461\/robotics-sandbox-spec/);
  assert.match(html, /https:\/\/robotics\.basementboys\.org/);
  assert.match(html, /source-backed robot decision workbench/i);
  assert.match(html, /github\.com\/ChristFollower873461\/dripcouncil/);
  assert.match(
    html,
    /href="https:\/\/dripcouncil\.org"[^>]*aria-label="Open the live Drip Council"/,
  );
  assert.match(html, /github\.com\/ChristFollower873461\/codexvault/);
  assert.match(
    html,
    /href="https:\/\/vault\.basementboys\.org"[^>]*aria-label="Open the live CodexVault"/,
  );
  assert.match(html, /safe browser walkthrough/i);
  assert.match(html, /github\.com\/ChristFollower873461\/pjario-staltman/);
  assert.match(html, /compact operating system for agent-built software/i);
  assert.match(html, /Quiet Aggregate/);
  assert.match(html, /independently repeated, verified findings/i);
  assert.doesNotMatch(html, /aria-label="Open the live Pjario Staltman"/);
  assert.match(html, /\/bb-mark\.svg/);
  assert.doesNotMatch(html, /src="\/logo\.svg"/);
  assert.match(html, /data-agent="site-summary"/);
  assert.match(html, /\/\.well-known\/agent\.json/);
  assert.doesNotMatch(html, /pitch deck/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("publishes complete social preview and icon metadata", async () => {
  const response = await fetchBuilt();
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/basementboys\.org\/"\s*\/?>/i,
  );
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/basementboys\.org\/basement-boys-social\.png"\s*\/?>/i,
  );
  assert.match(html, /<meta property="og:image:width" content="1200"\s*\/?>/i);
  assert.match(html, /<meta property="og:image:height" content="630"\s*\/?>/i);
  assert.match(html, /<meta property="og:image:type" content="image\/png"\s*\/?>/i);
  assert.match(
    html,
    /<meta property="og:image:alt" content="Basement Boys — open-source tools, experiments, and reference projects\."\s*\/?>/i,
  );
  assert.match(
    html,
    /<meta name="twitter:card" content="summary_large_image"\s*\/?>/i,
  );
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/basementboys\.org\/basement-boys-social\.png"\s*\/?>/i,
  );
  assert.match(
    html,
    /<meta name="twitter:image:alt" content="Basement Boys — open-source tools, experiments, and reference projects\."\s*\/?>/i,
  );
  assert.match(
    html,
    /<link rel="icon" href="https:\/\/basementboys\.org\/favicon-32\.png" sizes="32x32" type="image\/png"\s*\/?>/i,
  );
  assert.match(
    html,
    /<link rel="icon" href="https:\/\/basementboys\.org\/favicon-16\.png" sizes="16x16" type="image\/png"\s*\/?>/i,
  );
  assert.match(
    html,
    /<link rel="apple-touch-icon" href="https:\/\/basementboys\.org\/apple-touch-icon\.png" sizes="180x180" type="image\/png"\s*\/?>/i,
  );
});

test("keeps the social image inside the common preview-service budget", async () => {
  const imageUrl = new URL("../public/basement-boys-social.png", import.meta.url);
  const [png, imageStat] = await Promise.all([readFile(imageUrl), stat(imageUrl)]);

  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(imageStat.size < 1_000_000, `expected social image below 1 MB; got ${imageStat.size} bytes`);
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
