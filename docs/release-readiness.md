# KOPDES preview release readiness — PR #22

**State:** Independent prototype; **not authorized for a public or official launch**. All eight routes are built statically. PR #22 makes the preview non-indexable by default: every route has `noindex, nofollow` and `robots.txt` disallows crawling. The preview workflow **uploads a build artifact only**; it does not deploy to Pages, production domains or external services.

## Automated gates

1. Frontend validation: lint, anti-slop/rules audit, Astro check, production build.
2. Generated site audit: eight HTML documents, metadata, independent-site disclaimer, absence of NIK/KTP forms, all ten local documentary images and OG/favicon assets.
3. Release guard: each route has `noindex, nofollow`, and robots.txt disallows all.
4. Responsive Chromium workflow: exact-size screenshots and 1000px reference-geometry band/edge assertions.

**Not verified by these gates:** real-world identity, domain ownership, license/trademark and portrait authorization, actual operating contact/service data, Lighthouse/Web Vitals, assistive-technology acceptance or physical-device browser behavior. No score or clearance is implied by a green CI badge.

## Before a separately approved public release

- Confirm written authority to publish as a specific cooperative or keep the independent identity unambiguously labeled.
- Confirm production domain control, legal/operator contact details, any real unit hours/prices/membership terms, logo/portrait usage rights and the photo attribution/modification license obligations.
- Inspect 320/360/390/768/1000/1280/1440/1920 screenshots, navigate all eight routes on actual mobile browsers, test keyboard focus/touch targets, image loads and horizontal overflow.
- Run and record Lighthouse mobile, Core Web Vitals and screen-reader checks, fix measured blockers.
- Create an explicitly approved release PR changing `noindex`/robots to allow indexing **only after** the above checks; verify canonical domain and deploy through a separately authorized workflow.

The `kopdes-static-preview` CI artifact can be downloaded and served locally with `pnpm preview` (from a local production build) or another static server. It is not a published URL.
