# Basement Boys

The public Basement Boys open-source project showcase at
[basementboys.org](https://basementboys.org).

## Stack

- Next.js-compatible React application built with vinext
- Cloudflare Worker runtime and static assets
- GitHub as the public source of truth
- Cloudflare Wrangler for production deployment

## Local development

Use Node.js 22.13 or newer; CI verifies the Node 22 family.

```bash
npm ci
npm run dev
```

## Verification

```bash
npm ci
npm run lint
npm run audit:dependencies
npm test
```

`npm test` builds the production Worker and checks the rendered homepage plus
the public machine-readable metadata, canonical HTTPS redirects, and browser
safety headers. The dependency audit fails on new advisories and documents the
single pinned, build-only upstream parser exception in [`SECURITY.md`](SECURITY.md).
The test suite also verifies deployment gate ordering with isolated command
stubs, without uploading a Worker or contacting a Cloudflare account.

## Production

```bash
npm run deploy:cloudflare
```

That command runs lint, the dependency audit, and the full build/test suite
before uploading the built Worker and assets to Cloudflare. Any failed gate
stops the command before the upload. A successful deployment binds the
`basementboys.org/*` and `www.basementboys.org/*` production routes. The routes
intentionally preserve the zone's existing proxied DNS records.

## Hosting rule

This public web application deploys from GitHub to Cloudflare. Do not add
OpenAI Sites, ChatGPT Site, App Garden, Wix, or another site-builder hosting
path. Purpose-built infrastructure such as Databricks, databases, queues, and
storage remains part of the architecture when the project calls for it.
