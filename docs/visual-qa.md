# Visual QA review guide

This workflow provides reproducible screenshots of the current KOPDES branch. It **does not** automatically prove visual equivalence with `lphishiring.com`.

## Snapshots produced
- Home: 1440px wide (tall capture viewport), full-page capture
- Home: 768px wide (tall capture viewport), full-page capture
- Home: 390px wide (tall capture viewport), full-page capture
- History: 390px wide (tall capture viewport)
- Outlets: 1440px wide (tall capture viewport)
- Membership guidance: 390px wide (tall capture viewport)

All screenshots are available as the `kopdes-responsive-snapshots` artifact of the **Responsive visual screenshots** GitHub Actions run (7-day retention).

## Manual acceptance review
1. Use the actual reference screenshots at the same viewport width and zoom as ground truth. Do **not** compare against unrelated Los Pollos fan designs.
2. Compare these anchors: photo masthead cropping; centered logo size and vertical position; four nav item boundaries; first welcome heading baseline; paragraph column width; Prabowo cutout edge; first content divider; recurring section spacing; footer transition.
3. Examine mobile order, font readability, touch targets, focus states, image failures, and horizontal overflow.
4. Document observed differences before claiming exact likeness.
5. Verify remote photo permissions and replace with licensed local originals before release; publisher image URLs are temporary.

The user requested KOPDES content, KOPDES color palette, and a visual **layout adaptation**, not copied restaurant-specific words, logos, or a fabricated endorsement. All original routes should remain reachable.

## Screenshot findings, November 9, 2026

The first successful Chrome screenshots exposed blank history and gallery images, even though the URLs were retrievable by another web client. This is an external hotlink/availability issue, **not** evidence that the photographs depict the wrong locations. The follow-up PR adds an accessible, honest fallback to the documented Bentangan storefront image; when triggered, the caption and source URL change to match that alternate photo. A single repeated storefront is preferable to falsely describing an unavailable image, but production still requires authorized locally hosted photos of each intended site.

## Full-page screenshot caveat

Playwright's default full-page capture may leave lazy-loaded photos unfetched if the page was never scrolled. This workflow uses a taller-than-physical display viewport with the same **width breakpoints** to bring all gallery images into the lazy-loading window; it therefore provides layout-width evidence, **not** a true 900px-height browser screenshot. Future browser interaction tests should scroll naturally and capture at actual device heights.
