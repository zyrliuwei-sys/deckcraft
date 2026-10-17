# DeckCraft Projector redesign verification

Date: 2026-10-17. This record covers the inherited homepage, guide-page, SEO, and visual identity changes after the Claude handoff.

## Content and SEO

The English `.dc-site` contains approximately 1,281 whitespace-separated words, including navigation, disclosure content, FAQ answers, and footer. This meets the approximate 1,300-word brief. FAQ and feature descriptions remain in the rendered DOM when collapsed.

The homepage includes WebSite, SoftwareApplication, HowTo, and FAQPage JSON-LD. SoftwareApplication uses the configured application name. English and Chinese pages retain localized titles, descriptions, and canonical URLs.

## Build and code checks

- `pnpm build`: passed after final code changes.
- `pnpm exec tsc --noEmit`: passed after final code changes.
- `git diff --check`: passed.
- Prettier: checked changed page/style/message files; corrected the four files that failed, then rechecked them and the brand document successfully.

## Browser verification

Using the running local development server and ego-browser:

- Checked `/`, `/download`, `/tutorials`, `/compare`, and their Chinese equivalents at 320, 390, 768, and 1440 CSS pixels: 32 page/viewport combinations. Each had one H1, and document scroll width equaled viewport width.
- Visually inspected full-page desktop home, download, and comparison screenshots, plus the mobile homepage.
- Decoded every homepage image, including lazy images: no broken images.
- Feature selection changed its description and screenshot; native FAQ disclosure expanded.
- Mobile menu opened. Windows download query selected Windows after hydration; the animation tutorial query selected lesson four.
- English and Chinese home titles and headings displayed the appropriate locale.

Measured browser sRGB contrast ratios: ink on paper 16.98:1, muted text on paper 6.53:1, and white on cobalt 6.59:1.

## Identity and scope

Updated `docs/design-references/brand-identity.md` to describe the implemented DeckCraft palette, typography, logo, slide framing, components, and responsive behavior. Removed the stale Hotel Lobby identity from that document.

The marketing site intentionally keeps the inherited light Projector theme in both application theme classes. This pass did not publish a deployment, alter the database, or repeat the earlier editor archive round-trip test. Production performance and live search indexing were not measured.
