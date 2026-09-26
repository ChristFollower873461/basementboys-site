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

The existing Sharp override requires `0.35.4`, which includes the patched native
image libraries. Keep dependency lockfiles and native packages consistent when
updating these overrides, and rerun the generated Worker and visit-safety checks.
