# Basement Boys

The public Basement Boys open-source project showcase at
[basementboys.org](https://basementboys.org).

## Stack

- Next.js-compatible React application built with vinext
- Cloudflare Worker runtime and static assets
- GitHub as the public source of truth
- Cloudflare Wrangler for production deployment

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run lint
```

`npm test` builds the production Worker and checks the rendered homepage plus
the public machine-readable metadata.

## Production

```bash
npm run deploy:cloudflare
```

That command verifies the application, uploads the built Worker and assets to
Cloudflare, and binds the `basementboys.org/*` production route. The route
intentionally preserves the zone's existing proxied apex DNS record.

## Hosting rule

This public web application deploys from GitHub to Cloudflare. Do not add
OpenAI Sites, ChatGPT Site, App Garden, Wix, or another site-builder hosting
path. Purpose-built infrastructure such as Databricks, databases, queues, and
storage remains part of the architecture when the project calls for it.
