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

`vinext@0.0.50` currently pins `image-size@2.0.2`, which has two denial-of-service
advisories without a patched release. Vinext invokes that parser during builds
over maintainer-controlled repository images; it is not called by a visitor
request, upload, or browser runtime path in this project. The production audit
gate permits only those exact advisory IDs and versions, and fails on any other
result so this exception cannot silently expand.

The repository owner is responsible for this exception. It expires after
2026-09-30 and must be removed by upgrading Vinext to a release that no longer
pins the affected parser, or explicitly re-reviewed with fresh reachability
evidence before that date.
