# DeckCraft visual identity: Projector

## Direction

A presentation software site for students, teachers, and people making decks for work. The visual language comes from the slide itself: clear framing, generous canvas space, and a yellow highlighter on the phrase that matters. Product screenshots demonstrate the actual editor.

Design variance: 6/10, with an offset hero and varied section layouts. Motion intensity: 4/10, limited to entrance, image changes, and interaction feedback. Visual density: 4/10, balancing readable SEO copy with product demonstrations.

## Palette

The site defaults to a light canvas and offers explicit light/dark buttons in the shared header. The selected theme persists in local storage through next-themes. Dark mode uses graphite surfaces, light text, a brighter cobalt action color, and a muted gold highlighter. Product screenshots preserve their original colors.

| Role          | Token               | OKLCH value       |
| ------------- | ------------------- | ----------------- |
| Paper         | `--color-dc-paper`  | `98.5% 0.004 255` |
| Ink           | `--color-dc-ink`    | `21% 0.03 264`    |
| Muted copy    | `--color-dc-muted`  | `47% 0.022 262`   |
| Cobalt action | `--color-dc-accent` | `49% 0.2 263`     |
| Highlight     | `--color-dc-marker` | `90% 0.15 99`     |
| Editor frame  | `--color-dc-stage`  | `20.5% 0.028 264` |

The `.dark` overrides in `tokens.css` define the matching dark palette. `--color-dc-on-accent` keeps action labels separate from card surfaces so button contrast stays readable in both modes.

`tokens.css` is the source for the palette, spacing, typography, radii, and motion. `src/styles/globals.css` maps those values into the application component tokens.

## Typography and logo

- Display: Bricolage Grotesque Variable, with substantial weight and compact tracking.
- Body and interface: Geist Variable. Chinese falls back to PingFang SC and Microsoft YaHei.
- Captions: the system monospace stack, used sparingly for screenshot annotations.
- The logo and favicon use the cobalt slide mark. Preserve a clear margin around the mark and pair it with the DeckCraft wordmark in navigation.

Fonts are served locally, with Latin font preloads in the document head. Do not add remote font stylesheets.

## Components

- `SlideFrame`: real editor imagery within a crisp frame, crop corners, and an optional caption underneath. Reserve image dimensions to avoid layout shifts.
- `Marked`: a flat yellow highlight behind selected words; avoid gradient-filled text.
- Primary action: cobalt background and white label; secondary action: a quiet border on the light canvas.
- Corners: 6px for buttons and 10px for panels. Use spacing and rules before adding more cards.
- Homepage features: selectable descriptions with a matching editor screenshot. FAQs use native disclosure elements.
- Inner pages: shared navigation, type, buttons, and framing for download, tutorials, and comparison views.

## Responsive and accessibility behavior

At narrow widths, the hero and section layouts collapse into one column. Navigation becomes an expandable menu, while login and theme buttons stay visible. Download choices remain usable without horizontal page scrolling. Keep visible keyboard focus outlines, semantic heading order, descriptive image alternatives, and reduced-motion overrides.

The website is an independent guide and browser access point. Preserve the footer attribution to ArtCraft / Storytold and the existing product limitations.
