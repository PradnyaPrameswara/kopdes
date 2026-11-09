# PR #24 — Responsive and interaction evidence

The existing Chromium screenshots catch broad shape regressions but do not establish that menus work, links remain in view, or images load. This PR adds browser execution (using the already downloaded Playwright CLI package, **no new runtime dependency**) against the built static site. For each of eight routes at 320/390/768/1440px the test inspects the main landmark, one H1, rendered image loading/alt attributes, horizontal overflow, interactive clipping and minimum 44px primary button height. At mobile/tablet widths it opens and closes the native `details/summary` menu via keyboard Enter and verifies the links are visible.

The CI gate only claims the behaviors actually checked. It is not a WCAG certificate or a full screen-reader audit. Manual testing still needs iOS Safari, Android Chrome, keyboard Tab/Shift+Tab order, VoiceOver/TalkBack, contrast with real display settings and touch targets not included in the primary CTA class. The 1000px archival desktop visual check remains unchanged.

Run in the screenshot workflow after starting the built preview. Browser QA errors cause CI failure rather than being masked by page-level `overflow-x: hidden`.
