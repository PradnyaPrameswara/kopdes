# PR #26 — GitHub Pages preview (explicit opt-in only)

This adds a **working preview build configuration and a manually invoked deployment workflow**. It deliberately does **not** publish a website or enable indexing during pull requests or on `main` pushes.

- Preview target: `https://pradnyaprameswara.github.io/kopdes/` (hypothetical until GitHub Pages is enabled and an approved workflow actually deploys it).
- For `KOPDES_PAGES_PREVIEW=true pnpm build`, Astro emits canonical URLs under the GitHub Pages site and `/kopdes/` base; `scripts/prepare-pages-preview.mjs` prefixes otherwise root-absolute internal HTML links, `src`, `srcset`, and fallback data attributes that Astro does not rewrite automatically. `scripts/audit-pages-preview.mjs` checks **all eight routes** for prefix correctness, canonical and OG image URL, and `noindex`. This transformation is only for the Pages build; normal local/production builds remain unchanged.
- `pages-preview-validation.yml` runs on PRs; no Pages permission is requested there.
- `github-pages-preview.yml` uses only `workflow_dispatch`, **requires an explicit boolean approval**, and only runs from `main`. It uses least-needed Pages permissions and GitHub-managed `github-pages` environment.
- An authorized repository admin must select **Settings → Pages → Source: GitHub Actions** and confirm they intend to make the independent concept publicly viewable. The resulting URL, even with `noindex`, is still public; noindex does not make it private.

Public appearance and rights remain unverified: legal identity, domain, logo, portrait, all image licenses, regulatory claims and content/operator authorization must be checked before a public-facing preview. Do not run the manual workflow without explicit permission.
