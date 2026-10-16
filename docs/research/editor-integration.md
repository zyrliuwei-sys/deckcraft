# Upstream DeckCraft editor integration

Researched on 2026-10-16. This site hosts the unmodified official DeckCraft web release, with upstream notices alongside the application. The guide site is independent from the ArtCraft project.

## Provenance

- Repository: https://github.com/storytold/deckcraft
- Pinned release: https://github.com/storytold/deckcraft/releases/tag/v0.7.0
- Release source commit: `d78e657e4cb1e490ceb5445785c052d9cf5ad963`.
- Web archive: https://github.com/storytold/deckcraft/releases/download/v0.7.0/deckcraft-web-0.7.0.zip
- Archive size: 9,385,879 bytes.
- Official checksums: https://github.com/storytold/deckcraft/releases/download/v0.7.0/SHA256SUMS.txt
- Expected SHA-256: `4ab91994048c096fa356b7246c31098474d978ecd572e5b252dd825a287d1c40` (also published as the GitHub release asset digest).
- Downloaded archive SHA-256 was verified to match the official checksum exactly.
- Extracted WASM: `deckcraft-web-3d451cd28e31e9b6_bg.wasm`, 25,537,284 bytes (24.35 MiB). This is below the Cloudflare Workers static asset limit of 25 MiB, with only 677,116 bytes of headroom. Future upgrades must recheck asset size.
- Extracted glue JS: `deckcraft-web-3d451cd28e31e9b6.js`, 155,070 bytes.
- Local integrity checks: every relative asset referenced by the HTML exists; Node's `WebAssembly.validate()` returns true for the extracted WASM. Browser behavior still needs the site's normal visual smoke test.

## Local URLs and hosting

The distribution is installed at `public/editor/`; access it at `/editor/` (the trailing slash matters for relative assets). The site can link its own `/app` entry to that path.

- `/editor/` opens the upstream sample presentation.
- `/editor/?blank` starts a new presentation.
- `/editor/?show` starts the sample slideshow.
- `/editor/?webgl` forces WebGL2 instead of WebGPU for compatibility.

Upstream `apps/deckcraft-web/Trunk.toml` uses `public_url = "./"`, so a subdirectory works. Serve `.wasm` as `application/wasm`, JavaScript as JavaScript, and HTML as `text/html`. The upstream application does not require cross-origin isolation headers or a separate application backend. WebGPU needs a secure context (HTTPS or localhost); the fallback requires WebGL2. Fullscreen and clipboard permissions may be needed when embedding in an iframe. A direct top-level link avoids iframe restrictions.

Upstream `HOSTING.md`, `_headers` and `.htaccess` are preserved. `_headers` contains root-level sample patterns, so hosting rules should adapt them to `/editor/*.wasm`, `/editor/*.js` and `/editor/index.html`. Set `X-Content-Type-Options: nosniff`; use `Cache-Control: public, max-age=31536000, immutable` for hashed JS/WASM and `no-cache` for HTML. Enable gzip/Brotli for WASM, JS and HTML where the host supports it.

The browser editor runs the Rust application through WebAssembly and a canvas. Local files open through the browser picker or drag and drop. Save and export trigger local downloads. The browser application does not persist preferences, upload files to the project's D1 database, or provide cloud document synchronization. Processing runs locally once assets are loaded. This is not a service-worker offline installation: refreshing without a network connection depends on ordinary browser cache behavior.

Sources: `apps/deckcraft-web/src/main.rs`, `apps/deckcraft-web/src/web.rs`, and `apps/deckcraft-web/Trunk.toml` at the pinned release.

## Licenses

DeckCraft is MIT OR Apache-2.0. Keep `LICENSE-MIT`, `LICENSE-APACHE`, `NOTICE`, `ATTRIBUTION.md`, and packaged third-party font license files available with the software. The ArtCraft name, wordmark, and logos have separate trademark terms; this integration does not import those logos into site branding. The upstream README calls the product alpha / early development; do not market it as complete PowerPoint parity.

Upstream's web archive includes the two software licenses but omits its top-level NOTICE/attribution, so those were copied separately from the pinned source release. Web builds embed Inter Regular/Bold and BIZ UDPGothic Regular, with egui fallback fonts. Font licenses have been included under `public/editor/licenses/fonts/` from the official sources: `storytold/craft-fonts/fonts/biz-ud-pgothic/OFL.txt`, `google/fonts/ofl/inter/OFL.txt`, and `emilk/egui/crates/epaint_default_fonts/fonts/` (Hack, Noto Emoji OFL, Ubuntu UFL and icon licenses).

## Official screenshots

Retrieved from the repository's `main` branch through the GitHub Contents API (the raw host was unreliable); the observed `main` commit was `1dc69720db64323370dda061226becb09ad79fd4`. Attribution is recorded in upstream `ATTRIBUTION.md`: screenshots and the built-in original sample deck are MIT OR Apache-2.0, by DeckCraft contributors; Inter font is OFL-1.1.

| Local asset                        |  Bytes | Dimensions  |
| ---------------------------------- | -----: | ----------- |
| `/imgs/deckcraft/editor.png`       | 251930 | 1600 × 1000 |
| `/imgs/deckcraft/shape-format.png` | 262731 | 1600 × 1000 |
| `/imgs/deckcraft/format-pane.png`  | 314182 | 1600 × 1000 |
| `/imgs/deckcraft/slide-sorter.png` | 180769 | 1600 × 1000 |
| `/imgs/deckcraft/dark-mode.png`    | 243112 | 1600 × 1000 |
| `/imgs/deckcraft/sample-deck.png`  | 135890 | 2020 × 600  |

Original URL pattern: `https://raw.githubusercontent.com/storytold/deckcraft/main/docs/images/<filename>.png`.
