# Static quality gate — PR #21

The CI pipeline now executes `pnpm audit:site` after the production build. This checks the eight generated HTML routes for Indonesian document language, title, description, canonical and Open Graph image, primary main landmark, the independent-website disclaimer and absence of NIK/KTP input forms. It also checks that all ten local documentary WebP files, both favicons and the brand OG image exist in the output.

The gate detects missing static outputs and important content regressions. **It does not measure Lighthouse, Core Web Vitals, contrast, screen-reader behavior, browser compatibility or production traffic**. Performance targets from PRD remain release goals until real device measurements are recorded. Chromium screenshots and manual mobile/focus/overflow review are still necessary. Do not invent a Lighthouse score from successful CI.
