# PR #27 — Final release gate: scope and results

The independent KOPDES informational site retains eight routes, licensed Commons photo attribution, no personal-data collection, `noindex`, and a disallow-all robots policy. This PR adds a generated-site audit that checks **all eight route documents**, their single-H1 structure, root-absolute internal link destinations, image paths and homepage anchor targets; failure blocks a merge. It supplements, rather than replaces, the existing Astro build, static metadata and privacy checks, viewport screenshots, browser interaction QA, and media size limits.

## Evidence to retain in PR reviews

- Frontend validation run: lint, rules, strict Astro check, production build, static content, release guard, image budget and link audit.
- Responsive screenshots: 320, 360, 390, 768, 1000, 1280, 1440, 1920, with reference geometry JSON and browser navigation checks. Compare original archive only where actual evidence supports it.
- Lighthouse artifact: one simulated mobile score sample; no claim of real-user INP.
- GitHub Pages base-path validation: all eight routes, local links, canonical/OG and indexing guards, without executing the manual Pages deployment.

## Deliberately unverified / needs human acceptance

- Who is legally allowed to represent a specific cooperative, its contact and operating details.
- Authorization to publish KOPDES identity/logo, presidential photography, license and derivative obligations on real-location photos.
- Operator control of production domain and GitHub Pages settings.
- Manual iOS Safari / Android Chrome, keyboard Tab order, screen-reader behavior and WCAG contrast review.
- Multiple consistent Lighthouse runs and field Core Web Vitals; any remaining measured accessibility/performance findings.

**Release verdict until these conditions are satisfied: PREVIEW BUILD READY FOR REVIEW, PUBLICATION NOT AUTHORIZED.** `workflow_dispatch` for Pages stays opt-in and public-accessible; a green CI does not change copyright, privacy or identity requirements. No automatic deployment is created here.
