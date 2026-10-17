# DeckCraft on Cloudflare

Production URL: https://deckcraft.me

The apex hostname is a Workers Custom Domain with managed HTTPS. The two
previous apex A records were replaced during launch; Cloudflare Email Routing
MX records and the SPF TXT record were preserved. When connecting another
hostname, resolve conflicting website DNS records before the first deployment.

GitHub source: https://github.com/zyrliuwei-sys/deckcraft, branch `main`.

## Automatic deployment

Cloudflare Workers Builds watches pushes to `main`. Local file edits must be
committed and pushed to GitHub before Cloudflare can see them.

- Worker: `deckcraft`
- Build command: `pnpm run cf:ci:build`
- Deploy command: `pnpm run cf:ci:deploy`
- Root directory: `/`
- Node: `24.14.1`; pnpm: `11.15.1`

`scripts/prepare-cloudflare-ci.mjs` recreates the ignored `wrangler.jsonc` and
`.env.production` from the tracked, public `wrangler.production.json`. Update
that tracked file when changing production bindings, public variables or domains.
Do not put secret values in it.

The deploy command applies pending D1 migrations before publishing the Worker.
Commit new migration SQL and Drizzle metadata under `drizzle/` with schema changes.
Existing migrations are recorded by D1 and skipped on later deployments.

## Database and secrets

The `DB` binding uses D1 database `deckcraft`
(`666cd6cf-462a-45c7-a7fd-4877fc39d7bc`). Local development's remote D1 adapter
uses this same database. Local `.env` credentials stay outside Git.

`AUTH_SECRET` and `CONFIG_ENCRYPTION_KEY` are encrypted Worker secrets, managed
separately from the repository and retained between deployments. Keep the
encryption key stable to preserve access to encrypted admin configuration.

The existing super administrator signs in at https://deckcraft.me/sign-in.

## Manual deployment

After authenticating Wrangler and preparing `.env.production` and `wrangler.jsonc`:

```sh
pnpm exec wrangler d1 migrations apply deckcraft --remote --config wrangler.jsonc
pnpm run cf:deploy
```

Inspect automatic build logs in Cloudflare → Workers & Pages → deckcraft →
Settings → Builds. Runtime request logs are under Observability.
