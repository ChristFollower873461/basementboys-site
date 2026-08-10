import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const approvedAdvisories = new Set([
  "https://github.com/advisories/GHSA-5p2g-fcmc-qvqq",
  "https://github.com/advisories/GHSA-w3rx-r6r6-pgpr",
]);
const approvedPackages = new Set(["image-size", "vinext"]);
const approvedVersions = new Map([
  ["node_modules/image-size", "2.0.2"],
  ["node_modules/vinext", "0.0.50"],
]);

const audit = spawnSync("npm", ["audit", "--json"], {
  encoding: "utf8",
});
if (audit.error) throw audit.error;

let report;
try {
  report = JSON.parse(audit.stdout);
} catch {
  console.error(audit.stdout || audit.stderr || "npm audit did not return JSON");
  process.exit(1);
}

const vulnerabilities = Object.entries(report.vulnerabilities ?? {});
if (vulnerabilities.length === 0) {
  console.log("Dependency audit passed with no advisories.");
  process.exit(0);
}

const unexpectedPackages = vulnerabilities
  .map(([name]) => name)
  .filter((name) => !approvedPackages.has(name));
const reportedAdvisories = new Set(
  vulnerabilities.flatMap(([, vulnerability]) =>
    vulnerability.via
      .filter((item) => typeof item === "object" && item.url)
      .map((item) => item.url),
  ),
);
const unexpectedAdvisories = [...reportedAdvisories].filter(
  (url) => !approvedAdvisories.has(url),
);

const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
const changedApprovedVersions = [...approvedVersions].filter(
  ([path, version]) => lock.packages?.[path]?.version !== version,
);

if (
  unexpectedPackages.length > 0 ||
  unexpectedAdvisories.length > 0 ||
  reportedAdvisories.size !== approvedAdvisories.size ||
  changedApprovedVersions.length > 0
) {
  console.error("Dependency audit found an unreviewed result.");
  console.error(JSON.stringify({
    unexpectedPackages,
    unexpectedAdvisories,
    reportedAdvisories: [...reportedAdvisories],
    changedApprovedVersions,
  }, null, 2));
  process.exit(1);
}

console.warn(
  "Accepted two pinned upstream image-size advisories: vinext invokes this parser only during builds over maintainer-controlled repository images; no visitor upload or runtime parser path exists. Any package, advisory, or version change fails this gate for review.",
);
