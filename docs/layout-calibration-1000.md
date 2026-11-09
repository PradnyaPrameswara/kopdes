# Desktop visual geometry calibration — 1000px

Reference: https://scanner.pcrisk.com/screenshots/lphishiring.com?t=1788282028353&w=1100 (archived 2026-09-01). Measurements from that raster are approximate, not DOM layout metrics.

Previous PR #14 Chromium screenshot at 1000×563 showed: photo masthead y=16–199; navigation y=200–226; warm welcome y=227 onward; documentary media y≈401. These are observed screenshot landmarks, verified with PNG color samples.

PR #15 preserves the first three anchors and reduces the desktop welcome top padding by 6px (17px → 11px) to put the media edge nearer the archive target y≈396. The central media stage is adjusted from 46vw to 45vw (450px at 1000px, centered at x≈275), and the welcome heading is centered within the right column. Other mobile layout and brand assets remain unchanged.

The screenshot QA script checks PNG integrity and KOPDES's **own** fixed-color anchor bands at x=3 and the media top around x=500/y=398. This guards against unintended geometry drift; it is **not** a pixel-similarity score against the copyrighted reference image.

Intended differences: logo, Prabowo portrait, licensed documentary photography, Indonesian text, KOPDES brand colors. Full below-fold and original-site mobile reference data are still missing. Exact 100% parity is neither claimed nor automatically measurable from the available archived screenshot.
