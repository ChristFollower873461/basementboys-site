# Security Policy

Basement Boys is a public, read-only project index. It has no accounts, forms,
uploads, payments, analytics, or public write endpoints. Report suspected
security issues through
[GitHub private vulnerability reporting](https://github.com/ChristFollower873461/basementboys-site/security/advisories/new),
not a public issue.

## Visit-Safety Invariants

- Production HTTP and `www` requests redirect to `https://basementboys.org`.
- Public responses set CSP, HSTS, frame, content-type, referrer, and permissions
  protections.
- Project and live links use HTTPS. New external-tab links must preserve
  `rel="noreferrer"`.
- The site does not accept visitor-controlled images or files, and it does not
  expose an image-optimization or remote-fetch endpoint.
- Deployment secrets and generated artifacts do not belong in Git history.

## Dependency Boundary

The dependency audit has no advisory exceptions. Both CI and the deployment
command require a complete, successful `npm audit` report with zero advisories;
a failed or incomplete audit stops deployment.

`vinext@0.0.50` declares `image-size@2.0.2`. An exact override installs the patched
`image-size@2.0.3` until the framework can be upgraded without the old parser pin.
That release fixes [GHSA-5p2g-fcmc-qvqq](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq)
and [GHSA-w3rx-r6r6-pgpr](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr), so the
former September 30 exception is removed. The parser is used during builds over
maintainer-controlled repository images. Visitor uploads and runtime image
optimization remain unavailable.

The Sharp override requires `0.35.5`, including the librsvg security fix.
Additional exact overrides patch dependencies pinned by the current tooling:

- `undici@7.30.1` replaces Miniflare's vulnerable `7.29.0` pin without changing
  the Cloudflare tooling or the runtime framework.
- `satori@0.33.5` fixes the SVG advisory without upgrading vinext from `0.0.50`
  to the breaking `1.x` line. Its pinned `fflate` is patched to `0.7.5`.
- Vulnerable `minimatch` versions from `7` through `11.0.0` are overridden to
  `11.0.1` for the lint tooling. The unaffected `3.x` copies remain unchanged.

Keep dependency lockfiles and native packages consistent when updating these
overrides, and rerun the generated Worker and visit-safety checks.
