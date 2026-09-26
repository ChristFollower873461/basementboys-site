import { spawnSync } from "node:child_process";

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

if (
  audit.signal ||
  audit.status === null ||
  audit.status > 1 ||
  report.error ||
  !Number.isInteger(report.metadata?.vulnerabilities?.total) ||
  report.metadata.vulnerabilities.total < 0 ||
  !report.vulnerabilities ||
  typeof report.vulnerabilities !== "object" ||
  Array.isArray(report.vulnerabilities)
) {
  console.error("npm audit did not return a complete advisory report.");
  console.error(audit.stderr || JSON.stringify(report.error ?? report, null, 2));
  process.exit(1);
}

if (
  audit.status !== 0 ||
  report.metadata.vulnerabilities.total !== 0 ||
  Object.keys(report.vulnerabilities).length !== 0
) {
  console.error("Dependency audit found advisories; no exceptions are allowed.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Dependency audit passed with no advisories.");
