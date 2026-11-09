# Final visual regression gate — reference comparison

**Reference screenshot:** https://scanner.pcrisk.com/screenshots/lphishiring.com?t=1788282028353&w=1100
**Source:** PCrisk archived 2026-09-01; original site was not accessible for live DOM inspection.

The responsive screenshot workflow now captures **a true 1000 × 563 viewport**, the approximate displayed dimensions of the archived desktop image, alongside 1440 × 900 and 390 × 844 above-fold captures and the existing full-page snapshots. The script checks PNG signature, nontrivial file size, exact widths, and firstfold heights. CI also smoke-tests all eight routes.

## Manual side-by-side acceptance

Compare `home-reference-1000x563.png` with the archive screenshot at the *same displayed size*, using the approximate anchor coordinates in `docs/reference-geometry.md`:

- Masthead image, logo/wordmark center, and decorative top strip
- Four-link horizontal navigation with divider rhythm
- Start of welcome background, person on **left**, title and quote on **right**
- Compact central media panel immediately beneath the person/quote
- Person and quote do not imply an invented quotation or endorsement

Intended visual differences are the KOPDES identity, documentary storefront imagery, Prabowo portrait, Indonesian copy and palette. No assertion of raw pixel equality should be made, and a score cannot be fabricated. The archive does **not** establish below-fold or mobile behavior.

## Non-visual release checks

Before merging the Draft stack to main or publicly deploying, obtain authorization for external publisher photographs, remove or verify prototype business claims, and independently test focus/navigation, lazy-image loading, and smartphone browsers. Screenshot existence alone does not prove accessibility or photo licensing.
