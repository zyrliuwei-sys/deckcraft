# DeckCraft guide pages specification

Reference: Microsoft PowerPoint marketing page. Adapt the clean warm-white canvas, small rectangular red-orange CTA, ample whitespace, dark ink typography and product-first imagery. Independently branded guide, not official affiliation.

## Foundation (shared with main builder)

Use layout `<div className="dc-site"><DeckcraftHeader /><main className="dc-page-main">...</main><DeckcraftFooter /></div>`.
Header and Footer imports from `@/blocks/deckcraft/chrome` (main creates). Route files download.tsx, tutorials.tsx, compare.tsx. Class names shared dc-container, dc-eyebrow, dc-button, dc-button-secondary, dc-section-heading, dc-lead, dc-link, dc-page-hero, dc-page-panel, dc-pill. Orange primary, white paper, grey fine borders, DM Sans body. Main handles shared tokens/CSS; agent may create `src/styles/deckcraft-guides.css` scoped under dc-site with its layout rules, import it in its own blocks.

## Content and behavior

Download page /download: platform tabs macOS/Windows/Linux, detailed basic installation guide switches with tab; direct official GitHub links v0.7.0 actual release assets. macOS universal dmg, Windows x64 msi/portable and ARM64 link, Linux x86_64 AppImage/deb/rpm, arm64 release link. All releases and checksum official links. Describe early development. No invented security guarantees or browser-compatibility guarantees. No fabricated version stats. External URLs immutable verified from https://api.github.com/repos/storytold/deckcraft/releases/latest. OS auto-detect may select tab after hydrate. No downloads auto-start.
Tutorials /tutorials: beginner step navigation for creating slide, editing/formatting, shapes/media, transitions/present, save/export. Use real official screenshots `/imgs/deckcraft/editor.png`, shape-format.png, format-pane.png, slide-sorter.png and dark-mode.png. Link directly /app to genuine selfhosted upstream app. Source github README and docs sources; do not invent exact keyboard shortcuts or promise complete format fidelity. Accordion or tabs driven by clicks with keyboard support. Readable article, no placeholder blog cards.
Comparison /compare: DeckCraft versus PowerPoint table: license/open-source (MIT OR Apache 2.0 vs proprietary); desktop free vs paid options, PowerPoint web free with MS account; macOS Windows Linux browser vs macOS Windows web mobile; local file workflow vs Microsoft 365 sharing/collaboration ecosystem; pptx read/write early-development caveat; CLI/MCP vs Office ecosystem tooling. No unverified speed/memory claims or exact prices. Cite primary sources near table. Clear choice guidance and alpha caveat. Use concise copy; independent guide, not official site. No sales subscriptions.

## Integration

All user-visible text via `m['dc.guide.*']()` in both locales. DO NOT edit messages directly, instead write docs/research/guide-translations.json as {en:{...},zh:{...}}; main integrates before build. Can use loops of literal calls to m for static extraction. Metadata uses envConfigs.app_name for app name, canonical https://deckcraft.me paths, localized links from core i18n. Main config data optional `@/config/deckcraft` may not exist yet; use exported constants from own component or direct official URLs.
Responsive 390/768/1440; no overflow, visible focus, native accessible controls. Main will test build after merging. No DB changes or schema reset. No deployment. Own only guide routes, guide block file(s), guide css, translation patch. Retain all unrelated files.
