# KOPDES — GitHub Pages preview installation

The KOPDES project uses Astro's static build, GitHub Actions, and the `/kopdes/` project path. This is a public **independent informational preview**, not an official government service. Every route keeps `noindex, nofollow`, and `robots.txt` retains `Disallow: /`.

## Repository configuration

- `.github/workflows/github-pages-preview.yml` builds and deploys on relevant **pushes to `main`**, and supports a manually approved `workflow_dispatch`. No pull request can publish.
- `KOPDES_PAGES_PREVIEW=true pnpm build` builds the correct Astro base URL for `https://pradnyaprameswara.github.io/kopdes/`.
- `scripts/prepare-pages-preview.mjs` adjusts root-absolute local HTML image, link and fallback paths to `/kopdes/`.
- `scripts/audit-pages-preview.mjs` checks all eight pages' route links, canonicals, OG images and indexing guards before uploading to Pages.
- The deployment requires the `github-pages` environment and uses only `contents:read`, `pages:write` and `id-token:write`.

## One-time GitHub Pages enablement

This is a repository admin setting that cannot be completed by the existing code-only GitHub connector. It is **not** automatically enabled by committing the workflow. Do these steps as the repository owner:

1. Visit [KOPDES Settings → Pages](https://github.com/PradnyaPrameswara/kopdes/settings/pages).
2. Under **Build and deployment**, select **Source: GitHub Actions**.
3. Go to [Actions → Publish KOPDES GitHub Pages preview](https://github.com/PradnyaPrameswara/kopdes/actions/workflows/github-pages-preview.yml) and choose **Run workflow** on **main**. Tick **public_preview_approved** and run it.
4. Confirm a successful `deploy` job with `github-pages` environment URL, then open `https://pradnyaprameswara.github.io/kopdes/` and test eight routes, mobile/desktop images and internal links.

After the initial activation, relevant `main` pushes update the preview automatically. A Pages workflow that ran **before** the Pages setting was enabled may fail at `actions/configure-pages`; rerun manually after enabling it. `noindex` does **not** make a deployed Pages URL private. Avoid representing the site as a verified operating branch or an official government portal. Verify photo licensing, portrait and trademark rights, all operational claims and device accessibility before any public promotion.
