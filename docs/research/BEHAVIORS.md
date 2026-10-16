# Interactions and validation

## Reference observations

The Microsoft reference uses a contextual navigation bar, a sticky in-page quick-link row, feature tabs and expandable answers. Sections do not automatically cycle on normal scroll. Browser extraction supplied real computed fonts/colors and DOM topology. The reference's page pointer dispatch intermittently timed out; therefore the implementation follows its visual structure and observed tab semantics rather than claiming pixel-identical behavior.

## Implemented interaction model

Hero: three manual tabs, with aria-selected, associated tabpanel and left/right keyboard navigation; no auto-rotation.
Features: click-driven exclusive disclosure, associated region, screenshot switches. FAQ uses native details/summary. Mobile navigation uses aria-expanded and closes on a route click. Download buttons select platform, with ?platform= support. Tutorial buttons change the active lesson, with ?step=animation support.
Editor: genuine official Rust/WASM build. Loading state waits until the upstream loading element disappears, not just iframe HTML onload. At 30 seconds a compatibility-mode/download fallback appears. Opening a different deck asks to save unsaved work. Reload is explicit.
Motion: opacity transition between preview states and one short entry reveal. Reduced-motion preference disables transitions and animations. No autoplay.

## Verified

- Browser rendering at 320, 375, 390, 414, 768, 1440 CSS pixels for home/download/tutorials/compare; no page horizontal overflow or broken images. See responsive-qa.json.
- Mobile menu opens; feature accordion swaps screenshot; FAQ opens; Windows and Linux download targets resolve to the corresponding official release files; animation lesson query opens stage 4.
- Real upstream editor loads in iframe; browser test added a slide, edited the title to “Hello from DeckCraft”, and downloaded the native .deckcraft archive. Its presentation.json contains nine slides and the edited title.
- Routes and WebAssembly resource return 200; wasm MIME is application/wasm.
- No publishing or DNS changes performed.
