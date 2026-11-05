# DeckCraft guide selection — 2026-11-05

Source: the authenticated Google Search Console report for `sc-domain:deckcraft.me`, read through Tabbit. Period selector: **3 months**, search type: **Web**. All **23 query rows** were read across three pages. Totals: **31 clicks, 824 impressions, 3.8% CTR, average position 7.3**. The report's exact date endpoints were not captured. Raw rows are in `gsc-guides-2026-11-05.json`.

These are this property's observed impressions, not global keyword search volumes. Visible query rows do not account for the full report totals. No extrapolated traffic forecasts were used.

| Guide                                   | Included query cluster                                                             | Observed impressions | Clicks | Rationale                                                                                                               |
| --------------------------------------- | ---------------------------------------------------------------------------------- | -------------------: | -----: | ----------------------------------------------------------------------------------------------------------------------- |
| `/guides/deckcraft-slides-guide`        | deck craft, deckcraft, deckcraft slides, what is deckcraft                         |                  148 |      1 | Highest relevant exposure; disambiguates the presentation product and answers a practical getting-started intent.       |
| `/guides/deckcraft-download-guide`      | deckcraft download, deck craft download, download deckcraft, deckcraft download pc |                   54 |      4 | High observed clicks; package selection, installation and troubleshooting expand the quick-download landing page.       |
| `/guides/deckcraft-online-guide`        | deckcraft online, deckcraft web                                                    |                   32 |      4 | High observed clicks; answers browser setup, safe saving and graphics troubleshooting.                                  |
| `/guides/deckcraft-vs-powerpoint-guide` | deckcraft vs powerpoint, deckcraft powerpoint                                      |                   11 |      0 | Distinct evaluation intent; matched the 9-impression slides query but merits its own comparison and migration workflow. |

Misspellings and ambiguous unrelated variants were not turned into separate pages. The broad brand queries remain served by the homepage; the new article addresses the informational slide-making task. Existing `/download`, `/tutorials`, `/compare`, and `/app` remain quick task destinations. Articles cross-link to them rather than duplicating their short layouts.

## Content and linking

- Four English guides, each over 2,100 words before formatting, and four complete Chinese versions with over 3,000 Chinese characters each.
- Each article has three product images: one lead screenshot and two contextual figures. All have descriptive alt text, captions, explicit dimensions, and WebP encoding. Body images load lazily.
- Homepage directly links all four articles in the guides section. Navigation and footer link the guide index. Each article links the homepage, its editor section, relevant task pages, and the other guides.
- Both locales have independent canonical URLs and reciprocal hreflang, including x-default. Articles include Article and BreadcrumbList structured data and social metadata. All ten guide URLs (index plus four articles, in two languages) are included in the sitemap.
- Long bodies are loaded as MDX chunks; only metadata is needed by the index and homepage.

## Source and asset provenance

- Query evidence: Search Console UI, read-only, November 5, 2026.
- Product status and download naming: https://github.com/storytold/deckcraft
- Current upstream release: https://github.com/storytold/deckcraft/releases (v0.15.1 observed; latest link used for current downloads).
- Known limitations: https://github.com/storytold/deckcraft/blob/main/docs/gaps.md
- PowerPoint product and plan claims: https://www.microsoft.com/en-us/microsoft-365/powerpoint and https://www.microsoft.com/en-us/microsoft-365/free-office-online-for-the-web
- PowerPoint basic workflow: https://support.microsoft.com/en-us/powerpoint/basic-tasks-for-creating-a-powerpoint-presentation
- `public/imgs/guides/{editor,format-pane,shape-format,slide-sorter,dark-mode}.webp`: compressed copies of the existing upstream product screenshots in `public/imgs/deckcraft/`. No generated interface mockups.
- `public/imgs/guides/online-workspace.webp`: actual screenshot of `https://deckcraft.me/app`, captured in Tabbit on November 5, 2026. No personal document or account data is shown.
- Hosted browser version observed: v0.7.0. The content explicitly distinguishes it from upstream releases. No upgrade to the hosted editor or existing download targets was performed.

The worked presentation example, evaluation checklist, migration exercise and editorial guidance are original instructional content. They do not claim fabricated benchmarks, customer results or guaranteed compatibility.

## Verification

- `pnpm build`: passed after final content changes.
- `pnpm exec tsc --noEmit`: passed.
- All eight localized article URLs and both index URLs returned HTTP 200; article prose and three figures were present in server-rendered HTML. Unknown guide slug returned HTTP 404.
- Sitemap returned all ten localized guide URLs. Development URLs reflect the existing local `VITE_APP_URL`; production uses its configured app origin.
- Tabbit verified homepage links to all four guides, article navigation, a Chinese table-of-contents anchor, three successfully loaded figures, canonical/hreflang, and localized body links.
- Visual inspection covered desktop/light, a 390px Chinese article, and dark article text. Measured layouts had no horizontal or header overflow at 390px, 853px, 1223px, and 1600px CSS viewport widths.
- Production output contains separate chunks for all eight MDX bodies. The six compressed guide images total approximately 376 KB on disk.
- Local preview: `http://localhost:3301/guides`. No production deployment or Git commit was performed.
