# KOPDES / lphishiring.com — reference layout audit

**Reference:** https://scanner.pcrisk.com/screenshots/lphishiring.com?t=1788282028353&w=1100

**Captured by PCrisk:** 2026-09-01. **Inspected:** 2026-11-09. The live site repeatedly timed out. Treat this as one archived desktop screenshot, not a verified live page or proof of mobile behavior. Do not copy the Los Pollos Hermanos artwork or its written copy.

## Grounded desktop landmarks

The archived image is presented at approximately 1000 × 563 px. The values below are **visual estimates from the image as displayed**, not DOM measurements. They are useful for matching topology and relative proportions only.

| Landmark | Approx. bounding region (x, y, width, height) | Relative treatment |
|---|---|---|
| Diamond/argyle stripe | 0, 0, 1000, 16 | Narrow repeating geometric band |
| Photographic masthead | 0, 16, 1000, 184 | Edge-to-edge food photograph, central illustrated brand and slogan |
| Dark navigation bar | 0, 200, 1000, 26 | Four uppercase links, centered; red diamond dividers |
| Bright welcome background | 0, 226, 1000, at least 337 | Dominant high-contrast field |
| Central story/media column | 275, 245, 450, >318 | Compact central composition rather than full-width content |
| Person cutout | approx. 275, 247, 174, 151 | Person **left**, aligned to media panel upper edge |
| Welcome title | approx. 505, 245, 132, 24 | Person's right, compact bold heading |
| Quote white panel | approx. 407, 275, 316, 80 | Right side, overlapping central column, quote marks |
| Zigzag separator | approx. 444, 369, 280, 16 | Below quote, above media |
| Embedded training panel | approx. 275, 396, 450, extends below fold | Media immediately follows welcome portrait/quote |

**Important correction to earlier PRs:** The current KOPDES PR #7 places Prabowo on the right, stretches the welcome two-column section across a wider container, and places history directly below. The reference instead places the person on the **left**, a quote/title **on the right**, and a media panel **beneath both**. Therefore the page needs structural reordering, not just CSS tuning.

## Invariants for KOPDES adaptation

- Keep KOPDES's red (#B91C1C), deep teal (#065366), white, and warm paper; do **not** reproduce the trademarked Los Pollos artwork, exact restaurant quote, or proprietary typefaces.
- Use the existing real Prabowo portrait, clearly labeled as documentation rather than endorsement or a fabricated presidential statement.
- Use actual documented KOPDES gerai imagery with source attribution. Images still externally hosted require reuse permission and reliable authorized local copies before production.
- Keep current Astro/Tailwind 4/TypeScript/React islands and shadcn Base UI; no Radix, effects, or new animation dependencies.
- Keep all eight routes accessible; informational pages may share the visual language without falsely implying operational authorization.
- Never expose NIK or contact details to demonstration WhatsApp numbers.

## Verification plan and limits

Compare the final homepage screenshot against this archived visual at an equivalent **displayed** width, focusing on section order, alignment, crop, and relative measurements. Exclude intentional differences in photo subject, identity, font licensing and brand palette from pixel-difference metrics. Another screenshot or live reference is required for mobile and below-fold claims. No numeric parity score is justified until two comparable captures and measured boxes are available.

## Source provenance

- Archive and timestamp: https://scanner.pcrisk.com/scan-results/lphishiring.com
- Screenshot: https://scanner.pcrisk.com/screenshots/lphishiring.com?t=1788282028353&w=1100
- GitHub KOPDES current baseline before this audit: PR #7, commit `36e39e45a11d11072424911efb29a370abcf5182`.
