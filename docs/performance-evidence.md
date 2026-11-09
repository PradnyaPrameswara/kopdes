# PR #25 — Asset budget and Lighthouse evidence

- Removed the duplicate Geist stylesheet import in `src/layouts/Layout.astro` (the font is already imported by `src/styles/global.css`). This is a bundling cleanup, not a claimed measurable Lighthouse improvement.
- Added hard per-image **build artifact** size limits: each 1280px licensed WebP ≤250 kB, each 640px rendition ≤70 kB, site logo WebP ≤175 kB. These limits are above the observed PR #22 file sizes (largest full image ≈231 kB, thumbnails ≈40 kB, logo ≈146 kB). CI rejects oversized replacements.
- Added a **separate** mobile Lighthouse sampling workflow to record actual category scores (performance, accessibility, best practices and SEO) and lab metrics (FCP, LCP, CLS, total blocking time, speed index) in a seven-day GitHub Actions artifact. Scores are reported, **not assumed or hardcoded**, and a single lab run is not a service-level guarantee. Numeric thresholds are not CI release gates until enough reproducible runs establish a realistic baseline.

The PRD goals (90/95 and real-user LCP/CLS/INP) are targets. A single simulated Lighthouse run cannot measure field INP; that requires opted-in, privacy-aware real-user monitoring on an authorized deployment. Do not deploy or add tracking without consent.
