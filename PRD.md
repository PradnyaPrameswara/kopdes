# KOPDES — Current product brief

**Updated:** 9 November 2026. **Status:** Independent informational website concept. Not a government portal, registered cooperative website or membership service.

## Observable purpose

Explain Koperasi Desa/Kelurahan Merah Putih principles, possible service types and how to seek verified membership information. Never imply real opening hours, confirmed branches, prices, fees, health guarantees, contacts, official endorsement or ability to register when no operator has verified them. The `/daftar/` route is guidance-only; collect no NIK or personal information.

## Implemented scope

Eight static routes: `/`, `/tujuan/`, `/gerai/`, `/keanggotaan/`, `/tentang/`, `/lokasi/`, `/faq/`, `/daftar/`. The homepage has a photographic masthead, four-link desktop navigation, a left documentary portrait and right informational message, a documentary media area, history, values, example outlets, gallery, CTAs and footer.

A single archived 1 September 2026 desktop screenshot of `lphishiring.com` grounds the **approximate composition**; KOPDES uses independent content, its red/deep-teal/cream palette, documentary Prabowo image and real cooperative buildings. No borrowed restaurant-specific logos, characters, wording or entertainment imagery. Original mobile and below-fold fidelity is **unknown**, not pixel-perfect.

## Architecture and constraints

Astro SSG, TypeScript strict, React islands, Tailwind CSS 4, shadcn Base UI (`@base-ui/react`), pnpm. No Radix, `useEffect`/`useLayoutEffect` in `src/`, legacy React/Tailwind, backend or new runtime dependencies without justification. Keep all eight routes working.

## Content and asset integrity

Use the sources in `docs/content-verification.md`. The website is unaffiliated with government or any individual cooperative until written authorization is provided. No fictitious contact numbers, actual-service claims, or attributed presidential quotations.

The five documentary images identify actual Commons locations; `src/data/visual-media.ts` records author, source, license and original URL. Local WebP conversions/resizes are disclosed in `docs/assets-credits.md`. CC BY-SA attribution, ShareAlike and modification-indication rules remain in effect. Brand/portrait permission and trademark use require independent review before publication.

## Quality and release gates

Targets, **not proven measurements**: Lighthouse Performance ≥90, Accessibility/Best Practices/SEO ≥95; LCP <2.5s, CLS <0.1, INP <200ms in a documented mobile environment. Check responsive widths 320/390/768/1000/1440/1920, keyboard focus, touch targets, no horizontal overflow, eight-route smoke tests, image 200 responses, canonical, SEO, OG, robots and sitemap. Run lint, rules audit, Astro check, build, Chromium screenshots.

Do not publish as an official production site until operator identity, domain ownership, branding/portrait rights, contact/service details, all image licenses, device QA and deployment ownership have been verified. Preview deployment is separate from production authorization.

Reference documents: `docs/reference-geometry.md`, `docs/layout-calibration-1000.md`, `docs/content-verification.md`, `docs/final-visual-regression.md`, `docs/documentary-image-delivery.md`.
