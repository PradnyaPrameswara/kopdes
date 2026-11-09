# PR #23 — Visual reference parity, measured rather than guessed

The only authenticated reference available to this project is a screenshot of `lphishiring.com` recorded by PCrisk on 1 September 2026 (see `docs/reference-geometry.md`). Its DOM, below-fold behavior and mobile view are **not available**. This audit compares broad section geometry only. It deliberately excludes proprietary branding, text, entertainment images, and palette from a false pixel-similarity claim.

## Evidence and acceptance

Use the existing Chromium `home-reference-1000x563.png`, built from the KOPDES site at an exact 1000×563 viewport. `node scripts/report-visual-geometry.mjs` measures independently from actual screenshot pixels, exports `screenshots/reference-geometry.json`, and fails if these approximate source landmarks are exceeded:

| Landmark | Archive estimate | Baseline KOPDES (PR #22 screenshot) | Allowed difference |
|---|---:|---:|---:|
| Decorative stripe height | 16px | 16px | 0px |
| Masthead height | 184px | 184px | 2px |
| Navigation begins | y=200px | y=200px | 2px |
| Navigation height | 26px | 27px | 2px |
| Warm welcome begins | y=226px | y=227px | 2px |
| Central media begins | y≈396px | y=395px | 5px |
| Central media left | x≈275px | x=275px | 2px |
| Central media width | ≈450px | 450px | 4px |

**Limitations:** Archive measurements are estimates, not computed from the original page DOM. The script examines the locally rendered Chromium screenshot and guards against drift; passing does not establish exact typography, crop, color, mobile or full-page parity. The outputs should be reviewed alongside the original screenshot, and adjustments should only be made for demonstrated divergences.

No CSS changes are proposed where the existing geometry is already within the documented tolerances. This keeps the current KOPDES identity and avoids unsupported speculative visual edits.
