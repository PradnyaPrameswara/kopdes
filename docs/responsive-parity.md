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

## PR #16 CSS and extreme-width QA

Removed obsolete CSS selectors from pre-PR10 welcome layouts (the no-longer-rendered original two-column home, long introduction copy, portrait disc, and portrait-caption styles). Active section components and tokens remain unchanged; selectors were removed only where every selector in that block addressed an obsolete class. This is a narrow dead-style cleanup, not a visual redesign.

New screenshots at **320 × 700** and **1920 × 1080** in the existing Playwright workflow. The PNG validation script requires both exact dimensions. Human review should still check text wrapping, menu keyboard operation, tap targets, and overflow; screenshot existence alone does not prove absence of horizontal scroll.
