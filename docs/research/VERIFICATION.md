# DeckCraft first version verification

## Build checks

- `pnpm build`: passed.
- `node_modules/.bin/tsc --noEmit`: passed, no diagnostics.
- `pnpm cf:ci:build`: passed.
- `wrangler deploy --dry-run`: passed; no publishing performed. Worker bundle gzip 1,820.29 KiB, D1 binding `deckcraft`, production origin `https://deckcraft.me`.
- Generated `_headers` retains source WebAssembly MIME and hashed-file cache rules.
- `git diff --check`: passed.

## Browser checks

Home, download, tutorials and comparison at 320/375/390/414/768/1440 px: page scroll width equals viewport; no broken images. The short home section navigation can be scrolled within its own bar on the smallest width.

Confirmed slide-preview tab changes its panel; feature accordion swaps screenshot; native FAQ expands; mobile menu opens; platform buttons and route query parameters select correct installers; animation lesson query selects stage four. Chinese home has `lang=zh` and translated heading.

The actual upstream v0.7.0 editor initializes, adds a slide, edits text and saves a native `.deckcraft` archive. The downloaded archive contains nine slides and the exact edited title. This verifies a real edit/save workflow, not a decorative editor mockup. No guarantee of complete PowerPoint round-trip compatibility is made.

Home, /app, /download, /tutorials, /compare and policy routes returned HTTP 200. HTML canonical origin is deckcraft.me. No inherited Hotel Lobby branding in the checked page responses.

## Contrast

Measured with browser sRGB rendering and WCAG relative luminance: ink/paper 16.38:1; muted/paper 6.31:1; white/accent 5.37:1; accent/peach 4.60:1; white/green 12.44:1. Visible focus styles and reduced-motion overrides are present.

## Deliberate boundaries

This is an independent guide and browser access point. The software is published by the ArtCraft team at Storytold. The official bundled editor processes files locally and saves through downloads; it does not use the website D1 database for document storage. Existing D1/admin/auth remain in place. Domain configuration is prepared; DNS and production services were not changed.
