# DeckCraft v1 — page topology

Reference: https://www.microsoft.com/en-us/microsoft-365/powerpoint (observed 2026-10-16).
Actual computed reference fonts: Segoe UI Variable Text, Display and Small; hero 40px/48px, weight 500, ink rgb(14,23,38), body rgb(255,253,251). Reference has contextual product navigation, announcement, split product hero, sticky in-page quick links, click-driven feature tabs/accordions, app-download and resource sections, FAQ. Adapted to independent DeckCraft content, without Microsoft branding or invented Copilot capabilities.

## Delivered architecture

- Header + mobile menu; product and guide navigation.
- Open-source announcement; split hero with three manually selected slide-design previews.
- Sticky in-page nav. Only this nav is sticky; it cannot overlap the main header.
- Four exclusive feature accordion panels; real upstream screenshot switches with selected feature.
- Open-source/local-workflow feature and genuine dark-mode screenshot.
- Three platform download links → detailed download guide, preserving selected platform.
- Tutorial/comparison resource links → dedicated interactive guide pages.
- Five native details/summary FAQ items.
- Closing editor action and source/attribution footer.
- /app embeds verified upstream /editor/ WebAssembly app with local file download, sample/blank selection and compatibility fallback.
- /download: platform buttons, direct pinned upstream installers and installation instructions.
- /tutorials: five tutorial stages and previous/next navigation.
- /compare: sourced feature table and suitability guidance; clear early-development status.
- Existing auth/admin/D1 retained; no new database tables required.
