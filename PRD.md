# PRD — Koperasi Desa/Kelurahan Merah Putih (Kopdes Merah Putih) Landing Page

| | |
|---|---|
| **Version** | 1.0 (Draft) |
| **Date** | November 3, 2026 |
| **Type** | Static frontend landing page (no backend) |
| **Theme** | Merah Putih (Red & White) · village retail store · gotong royong (mutual cooperation) |
| **Content language** | Indonesian (id-ID) |

---

## 1. Summary & Goals

A single-page landing site presenting Kopdes Merah Putih as a **village retail store**: a place where residents buy staples at affordable prices, access the village pharmacy/clinic, sell their harvests through cold storage and logistics, and sign up as members.

**Primary goals**
1. Build trust: Merah Putih visual identity, logo in the header, real photos of the store.
2. Introduce the cooperative's business units/outlets clearly.
3. Show a retail-style product showcase so the site feels like a store.
4. Drive action: **register as a member** and **visit/contact the outlet** (WhatsApp, map).

**Success metrics**
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- LCP < 2.5 s, CLS < 0.1, INP < 200 ms (4G network).
- Clicks on "Register as Member" and "WhatsApp" CTAs are trackable (optional events, see §9).

**Out of scope (v1):** e-commerce/cart/payments, login, member dashboard, CMS, backend/API.

---

## 2. Target Users

| Persona | Needs | Device |
|---|---|---|
| Villagers / prospective members | Know products, prices, opening hours, how to join | Low–mid Android, 4G |
| Farmers / village MSMEs | Learn about cold storage, warehouse, logistics services | Android |
| Cooperative board / village government | A credible page to share | Desktop + mobile |

Design priority: **mobile-first**, large readable text, lightweight on slow networks.

---

## 3. Tech Stack & Mandatory Rules

| Layer | Choice |
|---|---|
| Framework | **Astro** (latest stable) |
| Interactive UI | **React** (latest stable) as Astro islands |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` |
| Components | **shadcn/ui — Base UI variant** (not Radix) |
| Language | **TypeScript** in `strict` mode |
| Icons | `lucide-react` |
| Fonts | Self-hosted via `@fontsource-variable/*` (e.g. Plus Jakarta Sans + Inter) |
| Package manager | `pnpm` |

### 3.1 Prohibitions (hard rules)

**A. No `useEffect`**
- `useEffect` and `useLayoutEffect` are forbidden everywhere in `src/` — including shadcn-generated files.
- Alternatives:
  - Local state → `useState` / `useReducer`.
  - Derived data → compute during render / `useMemo`.
  - Subscribing to browser APIs (media queries, etc.) → `useSyncExternalStore`.
  - DOM refs → *callback refs*.
  - Scroll/enter animations → **CSS** (`animation-timeline: view()`, `@starting-style`, Tailwind transitions) or Astro's built-in `<script>` (outside React).
  - Static content → `.astro` components with zero JS.
- Enforced via ESLint: `no-restricted-imports` / `no-restricted-syntax` for `useEffect` and `useLayoutEffect`. The build fails on any violation.

**B. No Radix**
- No `@radix-ui/*` or `radix-ui` packages in `package.json`, the lockfile, or any import.
- shadcn/ui is initialized with **Base UI** as the primitive library.
- Automated check: `pnpm why radix-ui` and `grep -ri "radix" src package.json` must return nothing.

**C. No legacy code**
- No `tailwind.config.js` + `@astrojs/tailwind` (old integration) → use Tailwind v4 CSS-first (`@import "tailwindcss"` + `@theme`).
- No class components, `defaultProps`, `ReactDOM.render`, `React.FC`, or `forwardRef` (React 19: `ref` is a regular prop).
- No CommonJS (`require`, `module.exports`); ESM only.
- No `var`, implicit `any`, or `@ts-ignore` (use `@ts-expect-error` with a reason if unavoidable).
- No deprecated libraries.

### 3.2 ⚠️ Conflict to resolve: "install all shadcn components" vs "no useEffect"

Several generated shadcn components **use `useEffect` internally** (commonly `carousel`, `sidebar` + the `use-mobile` hook, and a few others; embla-carousel itself also uses effects internally). Therefore:

1. Run `shadcn add --all` as requested.
2. Run the audit script (§12) to find files containing `useEffect`/`useLayoutEffect`.
3. For each finding, choose one and record it in `docs/shadcn-audit.md`:
   - **Refactor** to `useSyncExternalStore` / callback refs (e.g. `use-mobile`), or
   - **Remove** the component and replace it with a CSS solution (e.g. carousel → `scroll-snap`), or
   - **Do not import it** (quarantine the file in `src/components/ui/_unused/` and exclude it from the bundle).
4. End state: `grep -r "useEffect\|useLayoutEffect" src` = 0 results.

---

## 4. Visual Identity

**Palette (Tailwind v4 tokens in `@theme`)**

| Token | Value (reference) | Usage |
|---|---|---|
| `--color-brand-red` | `#CE1126` | Primary CTA, accents, header strip |
| `--color-brand-red-dark` | `#9E0D1D` | Hover/active |
| `--color-brand-white` | `#FFFFFF` | Main background |
| `--color-surface` | `#FFF7F7` | Alternating sections |
| `--color-ink` | `#1F1415` | Primary text |
| `--color-muted` | `#6B5B5D` | Secondary text |
| `--color-gold` | `#F2B705` | Small accent (e.g. "Promo" badge) — optional |

- Text contrast at least WCAG AA (4.5:1).
- Style: clean, warm, modern retail feel; rounded corners (`rounded-2xl`), product cards with soft shadows, moderate use of Merah Putih flag motifs (wavy section dividers or a thin red-white strip).
- Dark mode: not required in v1.

---

## 5. Assets (Required)

> **Honest note on sources:** according to the Tirto article referenced, the central government has **not yet released an official visual identity/logo guideline** for Kopdes Merah Putih to the public; the circulating logo is already widely used by local governments, village websites, and the cooperative's official Instagram account. The logo must therefore be **verified / permission requested** from the Ministry of Cooperatives or the local Kopdes board before production use.

### 5.1 Asset manifest

| # | Target file | Specification | Required | Suggested source |
|---|---|---|---|---|
| 1 | `src/assets/brand/logo-kopdes.png` | **Transparent PNG (alpha)**, width ≥ 1200 px, no white box/halo around edges | ✅ | Official logo from the Kopdes board / Kemenkop / official local government site; if only a JPG exists, remove the background (rembg / Figma), then QA on both red and white backgrounds |
| 2 | `src/assets/brand/logo-kopdes.svg` | Vector version (if available) for favicon and small sizes | ➖ | Same as #1 |
| 3 | `src/assets/photos/hero-toko-kopdes.jpg` | Photo of the **Kopdes store/outlet** front view, landscape, ≥ 2400×1350 | ✅ | Original photo owned by the Kopdes (best); or licensed/permitted media (Antara Foto, Kemenkop/local government documentation) |
| 4 | `src/assets/photos/gerai-sembako.jpg` | Shelves of staples/rice/cooking oil, ≥ 1600 px | ✅ | Unsplash / Pexels / Wikimedia Commons (check license) or original photo |
| 5 | `src/assets/photos/apotek-klinik-desa.jpg` | Village pharmacy/clinic | ✅ | Same |
| 6 | `src/assets/photos/cold-storage.jpg` | Cold storage / farm or fish produce | ✅ | Same |
| 7 | `src/assets/photos/logistik-desa.jpg` | Vehicle/goods delivery | ✅ | Same |
| 8 | `src/assets/photos/petani-panen.jpg` | Farmers/village MSMEs | ➖ | Same |
| 9 | `src/assets/photos/produk/*.webp` | Product photos (rice, oil, sugar, eggs, 3 kg LPG, fertilizer, OTC medicine) 800×800, clean background | ✅ | Pexels/Unsplash or original photos |
| 10 | `src/assets/pattern/merah-putih.svg` | Self-made decorative pattern/ornament | ➖ | Created in Figma |
| 11 | `public/favicon.svg`, `public/og-image.jpg` | Favicon + OG 1200×630 | ✅ | Derived from logo + hero photo |

### 5.2 Quality rules ("HD")
- Photos: longest side ≥ 1920 px (hero ≥ 2400 px), no pixelation, no watermarks.
- Keep original masters in `assets-source/` (not bundled); web versions are generated automatically by Astro (`<Picture>` → AVIF + WebP + JPG fallback, responsive `srcset`).
- Hero loads with `loading="eager"` + `fetchpriority="high"`; everything else `lazy`.
- Descriptive `alt` text in Indonesian is mandatory.

### 5.3 Licensing & ethics
- Create `docs/assets-credits.md` listing: file, source (URL), rights holder, license type, download date.
- Do not use strictly-licensed photos without permission. People whose faces are clearly visible should have consented.
- Show photo credits in the footer when the license requires it.
- If the site is not officially run by the Kopdes/Kemenkop, add a footer disclaimer: *"This is not an official government website."* — adjust to the real status.

---

## 6. Page Structure & Functional Requirements

A single `/` page with anchor navigation. Static parts are written as `.astro`; **only** truly interactive parts become React islands.

| # | Section | Content | Implementation |
|---|---|---|---|
| 1 | **Header** (sticky) | **Transparent PNG logo** on the left, menu (Home, Outlets, Products, Membership, Location, FAQ), "Register as Member" CTA button. Mobile: hamburger menu → `Sheet` | Logo & desktop menu = Astro; mobile menu = React island `client:media`/`client:visible` |
| 2 | **Hero** | HD photo of the Kopdes store as background/main image, headline, subheadline, 2 CTAs (Register as Member, View Products), red-white strip | Astro + `<Picture>` |
| 3 | **Stats/Impact** | 3–4 numbers (e.g. member count, product count, opening hours) — numbers live in `site.config.ts`, not hard-coded in markup | Astro; count-up via CSS, **not** effects |
| 4 | **Outlets & Services** | Business unit cards: Grocery Outlet, Village Pharmacy, Village Clinic, Cold Storage/Warehouse, Village Logistics, Cooperative Office, Savings & Loans (see note §6.1) | Astro + shadcn `Card`, `Badge` |
| 5 | **Product Showcase** | Retail grid: photo, name, unit, price (dummy data), "Promo/In stock" badge. Category tabs (Staples, Health, Agriculture). "Ask via WhatsApp" button per product | React island: `Tabs` (Base UI), filtering with `useState`; data from `src/data/products.ts` |
| 6 | **About & Benefits** | Brief cooperative vision: gotong royong, shortening supply chains, stable prices, transparency | Astro |
| 7 | **How to Become a Member** | Steps 1-2-3 (resident of the village/sub-district, bring ID card, fill in the form, pay the savings contribution per local rules) | Astro (ordered steps) |
| 8 | **Gallery** | Photo grid of the outlet & activities; click opens a `Dialog` lightbox | React island `client:visible` |
| 9 | **Testimonials** | 3 resident quotes (dummy, clearly marked as examples until replaced) | Astro — **no JS carousel**; grid or CSS scroll-snap |
| 10 | **Location & Hours** | Address, opening hours, WhatsApp/phone buttons, lazy iframe map embed or Google Maps link | Astro |
| 11 | **FAQ** | Accordion with 6–8 questions | shadcn `Accordion` (Base UI) |
| 12 | **Closing CTA** | Red banner: "Join the Merah Putih Cooperative" | Astro |
| 13 | **Footer** | Logo, navigation, contacts, social media, asset credits, disclaimer, © year | Astro |

### 6.1 Content accuracy notes (important)
Government/media sources describe the business units **inconsistently**: some cite seven units (cooperative office, staples, savings & loans, clinic, pharmacy, cold storage, logistics), while a December 2025 report says savings & loans will not be run first and adds a fertilizer outlet. Therefore:
- The outlet list is **configurable** in `src/data/outlets.ts` with status `active | coming-soon | unavailable`.
- For outlets not yet operating at that location, show a **"Coming soon"** badge; do not claim they are active.
- All price/product/opening-hour data in v1 is **sample data** and must be replaced with real data before release.
- National figures (e.g. total legally incorporated cooperatives) may only be used with a source and data date.

### 6.2 Non-functional requirements
- **Responsive:** 360 px → 1440 px+; default Tailwind breakpoints.
- **Accessibility:** semantic HTML, correct focus order, `aria-*` from Base UI, skip link, `prefers-reduced-motion` respected, tap targets ≥ 44 px.
- **SEO:** id-ID `<title>`/meta description, canonical, Open Graph + Twitter card, JSON-LD (`Organization`/`LocalBusiness`), `sitemap.xml` (`@astrojs/sitemap`), `robots.txt`.
- **Performance:** minimal JS (Astro islands, `client:visible` for below-the-fold), no heavy animation libraries, self-hosted fonts with `font-display: swap`.
- **Security:** no secrets on the client; external links use `rel="noopener noreferrer"`.
- **Browsers:** last 2 versions of Chrome, Safari, Firefox, Edge; Android Chrome & iOS Safari.

---

## 7. Architecture & Project Structure

```
kopdes-merah-putih/
├─ astro.config.ts
├─ components.json              # shadcn config (base: Base UI)
├─ eslint.config.js             # rules banning useEffect/useLayoutEffect/radix
├─ tsconfig.json                # extends astro/tsconfigs/strict
├─ assets-source/               # original photo/logo masters (not bundled)
├─ docs/
│  ├─ assets-credits.md
│  └─ shadcn-audit.md
├─ public/                      # favicon, og-image, robots.txt
├─ scripts/
│  └─ audit-rules.mjs           # checks useEffect / radix / legacy
└─ src/
   ├─ assets/{brand,photos,pattern}/
   ├─ components/
   │  ├─ ui/                    # shadcn output (audited)
   │  ├─ sections/              # one *.astro per section
   │  └─ islands/               # *.tsx: MobileNav, ProductShowcase, GalleryLightbox
   ├─ data/                     # site.config.ts, outlets.ts, products.ts, faq.ts
   ├─ layouts/Layout.astro
   ├─ lib/utils.ts              # cn()
   ├─ pages/index.astro
   └─ styles/global.css         # @import "tailwindcss"; @theme { ... }
```

Principles: data separated from presentation; all types in TypeScript (`type Product`, `type Outlet`, etc.); `@/*` path alias.

---

## 8. Setup & Installation (command order)

```bash
# 1. Astro project (TypeScript strict)
pnpm create astro@latest kopdes-merah-putih -- --template minimal --typescript strict --install --git
cd kopdes-merah-putih

# 2. React integration
pnpm astro add react

# 3. Tailwind CSS v4 (CSS-first, no legacy integration)
pnpm add tailwindcss @tailwindcss/vite
#    -> register plugin in astro.config.ts: vite: { plugins: [tailwindcss()] }
#    -> src/styles/global.css: @import "tailwindcss";

# 4. Supporting packages
pnpm add lucide-react clsx tailwind-merge class-variance-authority tw-animate-css
pnpm add @fontsource-variable/plus-jakarta-sans @fontsource-variable/inter
pnpm astro add sitemap

# 5. shadcn/ui — choose BASE UI (not Radix) during init
pnpm dlx shadcn@latest init
#    -> when asked for the primitive library, choose "Base UI"
#    (check the latest shadcn docs if the flag/option changes)

# 6. Install ALL shadcn components
pnpm dlx shadcn@latest add --all

# 7. Rule audit (see §12) — must pass before continuing
node scripts/audit-rules.mjs
```

**Dev tooling:** ESLint (typescript-eslint, eslint-plugin-astro, jsx-a11y, react-hooks), Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss`, `@astrojs/check`.

---

## 9. Analytics & Contact (optional)

- WhatsApp link: `https://wa.me/<number>?text=<encoded message>` (number in `site.config.ts`).
- CTA click tracking: use a `data-track` attribute plus one small Astro `<script>` (not a React effect). Lightweight analytics provider (Plausible/Umami) — decision in §13.

---

## 10. Delivery Plan

| Phase | Scope | Estimate |
|---|---|---|
| 0 | Gather assets (transparent PNG logo, store photos, other photos) + permissions/licenses | 1–2 days |
| 1 | Project setup, Tailwind, shadcn Base UI, useEffect/radix audit | 0.5 day |
| 2 | Design tokens, layout, Header + Hero + Footer | 1 day |
| 3 | Outlets, Products (island), About, Membership sections | 1.5 days |
| 4 | Gallery, FAQ, Location, CTA, SEO, OG | 1 day |
| 5 | Accessibility, performance, cross-device QA, fixes | 1 day |
| **Total** | | **~6–7 working days** |

---

## 11. Acceptance Criteria (Definition of Done)

- [ ] Header shows the **transparent PNG logo** with no box/halo, sharp on retina screens, legible on both white and red backgrounds.
- [ ] Hero uses a high-resolution **Kopdes store photo**; LCP target met.
- [ ] All assets exist in the §5 manifest and are recorded in `docs/assets-credits.md`.
- [ ] `grep -r "useEffect\|useLayoutEffect" src` → **0 results**.
- [ ] No `radix` in `package.json`, the lockfile, or `src` (§3.1-B).
- [ ] No legacy patterns (§3.1-C); `astro check` and `tsc --noEmit` clean; ESLint 0 errors.
- [ ] All shadcn components installed, and the §3.2 audit results are documented.
- [ ] Lighthouse scores meet §1 targets (mobile).
- [ ] Keyboard navigation + screen reader work; AA contrast.
- [ ] Dummy content is clearly marked or replaced with real data.
- [ ] Disclaimer & photo credits appear in the footer according to the site's status.

---

## 12. Audit Script (spec for `scripts/audit-rules.mjs`)

A Node (ESM) script that fails (exit 1) if:
1. `useEffect` / `useLayoutEffect` appears in `src/**/*.{ts,tsx,astro}`.
2. The string `radix` appears in `package.json`, `pnpm-lock.yaml`, or `src/**`.
3. `forwardRef`, `defaultProps`, `ReactDOM.render`, `require(`, `module.exports`, `@astrojs/tailwind`, or a `tailwind.config.*` file is found.
4. `: any` / `@ts-ignore` appears in `src/**`.

Run via `pnpm audit:rules` and as a mandatory CI step before build.

---

## 13. Open Questions (decisions needed before build)

1. **Site status:** official site of a specific Kopdes, or portfolio/demo? (Determines the disclaimer and logo permission.)
2. **Kopdes name & location:** village/sub-district name, address, opening hours, WhatsApp number.
3. **Logo & photos:** do you already have the logo file and real store photos, or should they be sourced from licensed sources?
4. **List of outlets actually active** at that location (especially savings & loans, clinic, pharmacy).
5. **Registration form:** is a WhatsApp/Google Form link enough, or is a custom form page needed (requires a backend)?
6. **Analytics:** needed or not, and which provider.
7. **Hosting:** Vercel / Netlify / Cloudflare Pages / village hosting.

---

## 14. References

- Launch & logo: tirto.id — "Koperasi Merah Putih Diluncurkan, Apa Sudah Ada Logo Resmi?" and "Logo Koperasi Desa Merah Putih dan Filosofinya"
- Business units: Bisnis.com — "Catat! Ini Lingkup Usaha dan Skema Pengawasan Kopdes Merah Putih"; Antara (Apr 23, 2026) — Minister of Cooperatives on medicine outlets & village clinics; Bisnis.com (Dec 8, 2025) — savings & loans not run initially
- Legal basis: Presidential Instruction (Inpres) No. 9 of 2025; Permenkop No. 2 of 2025 (peraturan.go.id)
- Cooperative count data: DJPB Ministry of Finance (KPPN Bima) — 81,738 legally incorporated in total (73,155 village + 8,582 sub-district); use only with source & date