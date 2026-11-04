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

Single-page site show Kopdes Merah Putih as **village retail store**. Villager buy staples cheap, use pharmacy/clinic, sell crops via cold storage/logistics, join member.

**Primary goals**
1. Build trust: Red-white identity, header logo, real store photos.
2. Show business units/outlets clear.
3. Show retail product grid like real store.
4. Drive action: **register member**, **visit/contact outlet** (WhatsApp, map).

**Success metrics**
- Mobile Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- 4G: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.
- Track "Register as Member" and "WhatsApp" clicks (optional, see §9).

**Out of scope (v1):** e-commerce, cart, payment, login, member portal, CMS, backend/API.

---

## 2. Target Users

| Persona | Needs | Device |
|---|---|---|
| Villagers / prospective members | Know products, prices, hours, join steps | Budget Android, 4G |
| Farmers / village MSMEs | Storage, warehouse, shipping info | Android |
| Board / village gov | Shareable trust page | Desktop + phone |

Rule: **mobile-first**, big text, fast on slow web.

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
- Ban `useEffect` and `useLayoutEffect` in `src/` — shadcn code too.
- Use instead:
  - Local state → `useState` / `useReducer`.
  - Derived values → render time / `useMemo`.
  - Browser events/media queries → `useSyncExternalStore`.
  - DOM handles → *callback refs*.
  - Scroll/view animations → **CSS** (`animation-timeline: view()`, `@starting-style`, Tailwind transitions) or Astro `<script>` (not React).
  - Pure static content → zero-JS `.astro` components.
- Block via ESLint rules: `no-restricted-imports` / `no-restricted-syntax` for `useEffect` and `useLayoutEffect`. Build fail on hit.

**B. No Radix**
- Zero `@radix-ui/*` or `radix-ui` anywhere in `package.json`, the lockfile, or any import.
- shadcn/ui must use **Base UI** primitives.
- Verify: `pnpm why radix-ui` and `grep -ri "radix" src package.json` return empty.

**C. No legacy code**
- Ban `tailwind.config.js` and `@astrojs/tailwind` → use Tailwind v4 CSS imports (`@import "tailwindcss"` + `@theme`).
- Ban class components, `defaultProps`, `ReactDOM.render`, `React.FC`, `forwardRef` (React 19 pass `ref` as prop).
- No CommonJS (`require`, `module.exports`); ESM only.
- Ban `var`, loose `any`, `@ts-ignore` (use reasoned `@ts-expect-error` if must).
- Ban old dead packages.

### 3.2 ⚠️ Conflict to resolve: "install all shadcn components" vs "no useEffect"

shadcn components hide `useEffect` inside (`carousel`, `sidebar`, `use-mobile`, embla-carousel). Fix plan:

1. Run `shadcn add --all`.
2. Run audit script (§12) find all `useEffect`/`useLayoutEffect`.
3. Fix each file and log in `docs/shadcn-audit.md`:
   - **Refactor** to `useSyncExternalStore` / callback refs (e.g. `use-mobile`), OR
   - **Delete** file, use pure CSS (e.g. carousel → `scroll-snap`), OR
   - **Isolate** file: move to `src/components/ui/_unused/`, exclude from build.
4. Final check: `grep -r "useEffect\|useLayoutEffect" src` return 0.

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

- Contrast meet WCAG AA (4.5:1).
- Feel: clean, warm, modern store; round edge (`rounded-2xl`), soft-shadow cards, subtle red-white Indonesian flag touches.
- No dark mode in v1.

---

## 5. Assets (Required)

> **Source note:** Tirto report state central gov **no official logo release yet**; circulating logo come from local gov and Insta. Must **verify / get permission** from Ministry of Cooperatives or local Kopdes board first.

### 5.1 Asset manifest

| # | Target file | Specification | Required | Suggested source |
|---|---|---|---|---|
| 1 | `src/assets/brand/logo-kopdes.png` | **Transparent PNG (alpha)**, width ≥ 1200 px, no white box/halo | ✅ | Official Kopdes/Kemenkop/gov file; cut background if JPG, test on red + white |
| 2 | `src/assets/brand/logo-kopdes.svg` | Vector for favicon / small sizes | ➖ | Same as #1 |
| 3 | `src/assets/photos/hero-toko-kopdes.jpg` | **Store outlet front**, landscape, ≥ 2400×1350 | ✅ | Kopdes real photo (best); legal press photo (Antara, gov) |
| 4 | `src/assets/photos/gerai-sembako.jpg` | Shelves with rice, oil, food, ≥ 1600 px | ✅ | Stock photo (Unsplash/Pexels/Wikimedia) or real shot |
| 5 | `src/assets/photos/apotek-klinik-desa.jpg` | Village pharmacy/clinic | ✅ | Same |
| 6 | `src/assets/photos/cold-storage.jpg` | Cold room / fish / farm crops | ✅ | Same |
| 7 | `src/assets/photos/logistik-desa.jpg` | Delivery vehicle / boxes | ✅ | Same |
| 8 | `src/assets/photos/petani-panen.jpg` | Harvest / village business | ➖ | Same |
| 9 | `src/assets/photos/produk/*.webp` | Item pictures (rice, oil, sugar, eggs, gas 3kg, fertilizer, meds) 800×800, clean | ✅ | Stock or real photo |
| 10 | `src/assets/pattern/merah-putih.svg` | Custom flag visual shape | ➖ | Figma export |
| 11 | `public/favicon.svg`, `public/og-image.jpg` | Icon + OG social card 1200×630 | ✅ | Made from logo + hero photo |

### 5.2 Quality rules ("HD")
- Big side ≥ 1920 px (hero ≥ 2400 px), sharp, no watermarks.
- Raw files stay in `assets-source/` (not build). Astro auto-make web sizes via `<Picture>` (AVIF/WebP/JPG fallback + `srcset`).
- Hero use `loading="eager"` + `fetchpriority="high"`. Rest use `lazy`.
- `alt` text in Indonesian required.

### 5.3 Licensing & ethics
- Track assets in `docs/assets-credits.md`: path, source link, owner, license, date.
- No unlicensed pictures. Get model release for clear human faces.
- Put photo attribution in footer if license ask.
- If unofficial site, put footer disclaimer: *"This is not an official government website."*

---

## 6. Page Structure & Functional Requirements

Single `/` landing with anchor scroll. Static parts use `.astro`. Interactive parts use React islands only.

| # | Section | Content | Implementation |
|---|---|---|---|
| 1 | **Header** (sticky) | **Transparent PNG logo** left, links (Home, Outlets, Products, Membership, Location, FAQ), CTA button. Mobile: hamburger → `Sheet` | Desktop & logo = Astro; mobile menu = React island `client:media`/`client:visible` |
| 2 | **Hero** | Big HD outlet photo, headline, subhead, 2 CTAs (Join, See Goods), red-white line | Astro + `<Picture>` |
| 3 | **Stats/Impact** | 3–4 numbers (members, goods count, hours) from `site.config.ts` | Astro; CSS counter, **no JS effect** |
| 4 | **Outlets & Services** | Unit list cards: Groceries, Meds, Clinic, Cold Storage, Logistics, Office, Loan/Save (see §6.1) | Astro + shadcn `Card`, `Badge` |
| 5 | **Product Showcase** | Store items: image, title, unit, price (sample), status tag. Filter tabs (Staples, Meds, Farm). "Ask WhatsApp" link per card | React island: Base UI `Tabs`, state filter with `useState`; data in `src/data/products.ts` |
| 6 | **About & Benefits** | Mission: mutual help, short supply link, fair price, open book | Astro |
| 7 | **How to Become a Member** | Steps 1-2-3 (local resident, show ID, fill paper, pay fee) | Astro static list |
| 8 | **Gallery** | Store pictures; click trigger `Dialog` lightbox popup | React island `client:visible` |
| 9 | **Testimonials** | 3 quote cards from locals (sample copy) | Astro grid or CSS scroll-snap; **no JS slider** |
| 10 | **Location & Hours** | Street address, work hours, WhatsApp button, map link or lazy embed | Astro |
| 11 | **FAQ** | Accordion collapse questions | Base UI shadcn `Accordion` |
| 12 | **Closing CTA** | Big red callout box: "Join Kopdes Merah Putih" | Astro |
| 13 | **Footer** | Brand mark, page links, phone/chat, social, credits, disclaimer, copyright | Astro |

### 6.1 Content accuracy notes (important)
Gov reports disagree on business units (some list 7 units, Dec 2025 report say savings & loans delayed, fertilizer added). Rules:
- Unit list live in `src/data/outlets.ts` with flag: `active | coming-soon | unavailable`.
- Inactive units must show **"Coming soon"** badge; no fake active claims.
- All v1 prices/hours be **sample data**; replace before real launch.
- Gov stats (e.g. total national co-ops) need link and timestamp.

### 6.2 Non-functional requirements
- **Layout:** 360 px to 1440 px+ with Tailwind breakpoints.
- **A11y:** Semantic tags, right tab flow, Base UI `aria-*`, skip-to-content, respect `prefers-reduced-motion`, tap targets ≥ 44 px.
- **SEO:** id-ID `<title>`/meta description, canonical tags, Open Graph, Twitter card, JSON-LD schema (`Organization`/`LocalBusiness`), `sitemap.xml` via `@astrojs/sitemap`, `robots.txt`.
- **Speed:** Small JS payloads (islands, `client:visible` lower down), pure CSS motion, local fonts with `font-display: swap`.
- **Safety:** Zero private keys in client code; links use `rel="noopener noreferrer"`.
- **Browsers:** Modern Chrome, Safari, Firefox, Edge, Android Chrome, iOS Safari.

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

Rules: data files away from views; TypeScript types for data structures (`type Product`, `type Outlet`, etc.); import via `@/*`.

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

**Code quality tools:** ESLint (typescript-eslint, eslint-plugin-astro, jsx-a11y, react-hooks), Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss`, `@astrojs/check`.

---

## 9. Analytics & Contact (optional)

- WhatsApp URL: `https://wa.me/<number>?text=<encoded message>` (phone in `site.config.ts`).
- Event tracking: use `data-track` plus plain Astro `<script>` (no React effect). Small privacy tracker (Plausible/Umami) — see §13.

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

- [ ] Header has crisp **transparent PNG logo**, no white halo, works on white and red backgrounds.
- [ ] Hero show sharp **Kopdes store photo**; hit speed target.
- [ ] Manifest assets exist and logged in `docs/assets-credits.md`.
- [ ] `grep -r "useEffect\|useLayoutEffect" src` return **0**.
- [ ] No `radix` in `package.json`, the lockfile, or `src` (§3.1-B).
- [ ] Zero old code patterns (§3.1-C); `astro check` pass; `tsc --noEmit` pass; ESLint 0 errors.
- [ ] shadcn added, audit notes written in §3.2 doc.
- [ ] Mobile Lighthouse pass §1 numbers.
- [ ] Keyboard nav and screen reader work; AA color contrast.
- [ ] Placeholder text tagged or swapped with real copy.
- [ ] Disclaimer and image credits visible in footer.

---

## 12. Audit Script (spec for `scripts/audit-rules.mjs`)

Node ESM script crash build (exit 1) if:
1. `useEffect` or `useLayoutEffect` inside `src/**/*.{ts,tsx,astro}`.
2. String `radix` inside `package.json`, `pnpm-lock.yaml`, or `src/**`.
3. Hit old patterns: `forwardRef`, `defaultProps`, `ReactDOM.render`, `require(`, `module.exports`, `@astrojs/tailwind`, or `tailwind.config.*`.
4. Hit `: any` or `@ts-ignore` inside `src/**`.

Run with `pnpm audit:rules` in CI before deploy.

---

## 13. Open Questions (decisions needed before build)

1. **Site role:** real village site or preview demo? (Sets disclaimer and logo use rights).
2. **Kopdes identity:** village name, physical location, operating hours, phone contact.
3. **Media supply:** real store photos available, or use stock?
4. **Active outlets:** which actual stalls run today (loans, doctor, meds)?
5. **Registration flow:** WhatsApp / external form link, or native form page (needs backend)?
6. **Analytics tool:** want stats, which software?
7. **Host:** Vercel, Netlify, Cloudflare, or local village server?

---

## 14. References

- Launch & logo: tirto.id — "Koperasi Merah Putih Diluncurkan, Apa Sudah Ada Logo Resmi?" and "Logo Koperasi Desa Merah Putih dan Filosofinya"
- Business units: Bisnis.com — "Catat! Ini Lingkup Usaha dan Skema Pengawasan Kopdes Merah Putih"; Antara (Apr 23, 2026) — Minister of Cooperatives on medicine outlets & village clinics; Bisnis.com (Dec 8, 2025) — savings & loans not run initially
- Legal basis: Presidential Instruction (Inpres) No. 9 of 2025; Permenkop No. 2 of 2025 (peraturan.go.id)
- Cooperative count data: DJPB Ministry of Finance (KPPN Bima) — 81,738 legally incorporated in total (73,155 village + 8,582 sub-district); use only with source & date