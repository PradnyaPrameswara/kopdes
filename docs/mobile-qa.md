# Mobile and tablet refinements — PR #20

The original reference site's mobile CSS and screenshots are unavailable. The KOPDES adaptation prioritizes readable content and keyboard-operated navigation rather than claiming exact mobile parity.

Review of the PR #17 Chromium captures at 320×700 and 390×844 showed an unnecessarily tall empty region above the welcome portrait/heading while the documentary panel remained below. PR #20 shortens only the 640px-and-below welcome composition, preserving the **portrait left / message right / media below** order. It also adds visible keyboard focus styling to the native `details` mobile menu and breaks unusually long message text without widening the viewport.

Capture at 320, 360, 390, 768, 1000, 1280, 1440 and 1920. CI validates screenshot dimensions and the unchanged 1000px desktop geometry. Human reviewers still need to verify no horizontal scroll, 44px targets, focus order and menu opening/closing with keyboard and assistive technology; PNG captures cannot prove those behaviors.
