# Visual QA review guide

This workflow provides reproducible screenshots of the current KOPDES branch. It **does not** automatically prove visual equivalence with `lphishiring.com`.

## Snapshots produced
- Home: 1440 × 900 viewport, full-page capture
- Home: 768 × 1024 viewport, full-page capture
- Home: 390 × 844 viewport, full-page capture
- History: mobile 390 × 844
- Outlets: desktop 1440 × 900
- Membership guidance: mobile 390 × 844

All screenshots are available as the `kopdes-responsive-snapshots` artifact of the **Responsive visual screenshots** GitHub Actions run (7-day retention).

## Manual acceptance review
1. Use the actual reference screenshots at the same viewport width and zoom as ground truth. Do **not** compare against unrelated Los Pollos fan designs.
2. Compare these anchors: photo masthead cropping; centered logo size and vertical position; four nav item boundaries; first welcome heading baseline; paragraph column width; Prabowo cutout edge; first content divider; recurring section spacing; footer transition.
3. Examine mobile order, font readability, touch targets, focus states, image failures, and horizontal overflow.
4. Document observed differences before claiming exact likeness.
5. Verify remote photo permissions and replace with licensed local originals before release; publisher image URLs are temporary.

The user requested KOPDES content, KOPDES color palette, and a visual **layout adaptation**, not copied restaurant-specific words, logos, or a fabricated endorsement. All original routes should remain reachable.
