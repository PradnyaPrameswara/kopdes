# Responsive parity criteria

The only original-site screenshot grounded so far is desktop (PCrisk, 2026-09-01); its mobile CSS, navigation and animation could not be inspected. Do not label these adaptations pixel-perfect without a real mobile reference.

At viewport widths of 320, 390, 768, 1000, 1440 and 1920 pixels:

- The masthead has a legible, centered KOPDES logo and no horizontal scrolling.
- Desktop at >900 px shows four horizontal navigation links; at <=900 px native details navigation exposes all four, plus the registration link, with 44 px minimum link targets.
- The first section retains **portrait left, heading and message right, media below**; on narrow screens the portrait is reduced instead of swapping the two columns.
- The panel below the quote remains a documentary image linking to the KOPDES gallery, not an invented video.
- The page contains no copied entertainment characters, testimonials or proprietary illustrations.
- Images have descriptive alt text, captions/source attribution, and a visible fallback if a publisher blocks hotlinking.
- All eight routes can be opened and no 16-digit NIK is collected.

### Verifications

CI lint + audit + Astro check + build; capture screenshots from PR #6 workflow and inspect them at true display width. A measured side-by-side of the reference is necessary for any numeric parity conclusion.
