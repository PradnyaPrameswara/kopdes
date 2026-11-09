# PR #16 CSS cleanup and responsive safeguards

Previous visual iterations accumulated layered CSS overrides. This PR removes only CSS rules addressing obsolete classes no longer rendered by the current homepage: .retro-welcome-grid, .retro-welcome-detail, .retro-welcome-sign, .retro-lead, .retro-portrait-caption, .retro-portrait-disc.

It intentionally does **not** introduce a new CSS architecture, replace Tailwind, or modify route behavior. The cleanup preserves the final live selectors from PR #15. A changed rendering would be a regression and must be corrected before merge.

## Verification

- Existing CI: Oxlint, anti-slop audit, Astro type checks and production build.
- Existing Playwright screenshot workflow, including two additional firstfold viewports at 320×700 and 1920×1080.
- Visual inspection at 320/390/768/1000/1440/1920 widths for clipping, crops, button focus and accessibility.
- Reuse the screenshot band checks at 1000px established in PR #15.

Original-site mobile layouts were not independently available; do not claim exact mobile parity. Documentary images remain Creative Commons-credited Wikimedia remote URLs, not local media files.
