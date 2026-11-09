# AGENTS.md — Kopdes Merah Putih Landing Page

Agent instructions and engineering standards for **Koperasi Desa/Kelurahan Merah Putih (Kopdes Merah Putih)** landing page project.

All agents must strictly follow rules, constraints, patterns, workflows here.

---

## 1. Project Overview & Mission

- **Project:** Koperasi Desa/Kelurahan Merah Putih Landing Page (`kopdes-merah-putih`).
- **Core Concept:** Independent eight-route informational concept of the Koperasi Desa/Kelurahan Merah Putih program; documentary photos and example service types, not a verified operating cooperative or membership system.
- **Language & Locale:** Indonesian (`id-ID`).
- **Target Audience:** Villagers, local farmers, village MSMEs (UMKM), village heads, cooperative stakeholders.
- **Performance & Quality Targets:**
  - Lighthouse (Mobile 4G): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
  - Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.
  - Zero hydration errors, zero console warnings.

---

## 2. Core Architecture & Tech Stack

| Layer | Technology | Specification / Configuration |
|---|---|---|
| **Framework** | **Astro** (latest stable) | Static site generation (SSG) default; no client JS unless island explicitly needed. |
| **Interactive Islands** | **React** (latest stable) | React islands strictly scoped via `client:visible`, `client:media`, `client:idle`. Never hydrate whole pages. |
| **Styling** | **Tailwind CSS v4** | Modern CSS-first architecture via `@tailwindcss/vite` in `astro.config.ts`. `@import "tailwindcss";` and `@theme` tokens in `src/styles/global.css`. |
| **UI Components** | **shadcn/ui (Base UI variant)** | Primitives built on **Base UI** (`@base-ui/react`). **STRICTLY NO RADIX UI**. |
| **Type System** | **TypeScript** | Strict mode (`astro/tsconfigs/strict`). No `any`, no implicit types. |
| **Icons** | **lucide-react** | SVG icons only. No emoji icons. |
| **Typography** | **Fontsource Variable** | Self-hosted `@fontsource-variable/plus-jakarta-sans` & `@fontsource-variable/inter`. `font-display: swap`. |
| **Package Manager** | **pnpm** | Strict dependency isolation. |

---

## 3. Mandatory Invariants & Hard Prohibitions

Rules non-negotiable. Violation breaks automated audit script (`scripts/audit-rules.mjs`) and CI build.

### Rule A: Strict Prohibition of `useEffect` & `useLayoutEffect`
- `useEffect` and `useLayoutEffect` **forbidden everywhere** inside `src/` (including all shadcn components, hooks, islands).
- **Mandatory alternatives:**
  - **Local UI state:** `useState` / `useReducer`.
  - **Derived calculations:** Compute during render or wrap in `useMemo`.
  - **Browser API subscriptions (media queries, window size, resize):** `useSyncExternalStore`.
  - **DOM node measurements or imperative access:** *Callback refs* (`ref={(node) => { ... }}`).
  - **Scroll and entrance animations:** Pure CSS (`@starting-style`, CSS `animation-timeline: view()`, Tailwind transitions) or native Astro `<script>` outside React.
  - **Data loading / static markup:** Native `.astro` components (zero runtime client JavaScript).
- **Audit Requirement:** `grep -r "useEffect\|useLayoutEffect" src` must return 0 results.

### Rule B: Absolute Radix UI Ban
- `@radix-ui/*` and `radix-ui` must never appear in `package.json`, `pnpm-lock.yaml`, or import path in `src/`.
- All shadcn/ui components must use **Base UI** primitive variant.
- **Audit Requirement:** `pnpm why radix-ui` and `grep -ri "radix" src package.json` must return empty.

### Rule C: No Legacy Patterns & Strict Type Safety
- **No legacy Tailwind:** Never create `tailwind.config.js` or use `@astrojs/tailwind`. Use Tailwind v4 `@import "tailwindcss"` and `@theme` directives.
- **No legacy React:** Never use `React.FC`, `forwardRef` (React 19 passes `ref` as standard prop), class components, `defaultProps`, `ReactDOM.render`.
- **No CommonJS:** ESM only (`import`/`export`). No `require` or `module.exports`.
- **Strict TypeScript:** No `var`, no `: any`, no `@ts-ignore`. If temporary compiler workaround needed, use `@ts-expect-error` with mandatory documented reason.

### Rule D: shadcn Conflict Resolution Strategy
When shadcn components installed (`pnpm dlx shadcn@latest add ...`):
1. Immediately run `node scripts/audit-rules.mjs`.
2. Inspect components with `useEffect` (e.g. `use-mobile.ts`, `carousel.tsx`, `sidebar.tsx`).
3. Apply resolution and record in `docs/shadcn-audit.md`:
   - **Refactor:** Rewrite using `useSyncExternalStore` or callback refs.
   - **Replace:** Swap with pure CSS/Astro (e.g., replace carousel with CSS `scroll-snap-x`).
   - **Quarantine:** Move unused components to `src/components/ui/_unused/` and exclude from compilation.

---

## 4. Visual Identity, Design Tokens & Assets

### 4.1 Theme Tokens (Tailwind v4 `@theme`)
Defined in `src/styles/global.css`:
```css
@import "tailwindcss";

@theme {
  --color-brand-red: #CE1126;        /* Indonesian flag red, primary CTAs */
  --color-brand-red-dark: #9E0D1D;   /* Hover and active states */
  --color-brand-white: #FFFFFF;      /* Primary background */
  --color-surface: #FFF7F7;          /* Soft warm red-tinted section backgrounds */
  --color-ink: #1F1415;              /* Primary text (contrast > 10:1 on white) */
  --color-muted: #6B5B5D;            /* Secondary / helper text (contrast ≥ 4.5:1) */
  --color-gold: #F2B705;             /* Promo badges, highlights */
}
```

### 4.2 Asset Quality Standards
- **Logo:** `src/assets/brand/logo-kopdes.png` must be high-resolution transparent PNG (alpha channel, width ≥ 1200px), no white box or fringing. Must stay crisp on white and red backgrounds.
- **Documentary Photos:** Real named Commons locations with source/license metadata; 640px and 1280px WebP local renditions are in `public/images/documentary/`.
- **Image Delivery:** Use Astro `<Image>` for imported bundled assets, and local WebP `srcset` with explicit intrinsic dimensions for `public/` documentary photographs.
- **Loading Strategy:** Hero image uses `loading="eager"` + `fetchpriority="high"`. Below-the-fold images use `loading="lazy"`.
- **Credits & Ethics:** Document photo sources, authors, licenses in `docs/assets-credits.md`. If demo or unverified local instance, include footer disclaimer: *"Website ini bukan situs resmi pemerintah."*

---

## 5. Skills Integration & Execution Directives

Agents must invoke and apply skills during task:

### 5.1 `using-superpowers`
- **Rule:** Before action or code, check and invoke skill.
- **Priority:** Process skills (brainstorming, systematic-debugging) first, then domain and implementation skills.
- **Stop Red Flags:** Never skip skill saying "this simple" or "explore first".

### 5.2 `using-agent-skills`
Follow engineering sequence:
1. **Define:** `spec-driven-development` / `idea-refine` before code.
2. **Plan:** `planning-and-task-breakdown` for small verifiable tasks.
3. **Build:** `incremental-implementation` with thin vertical slices.
4. **Verify:** `test-driven-development` and `browser-testing-with-devtools`.
5. **Review:** `code-review-and-quality` and `code-simplification`.
- **Core Operating Behaviors:** Surface assumptions early, clarify confusion immediately, reject bad ideas, enforce simplicity.

### 5.3 `karpathy-guidelines`
- **Think Before Coding:** State assumptions explicitly; do not guess conflicting choices.
- **Simplicity First:** Write minimal code. No speculative flexibility, no unneeded abstractions.
- **Surgical Changes:** Edit only what needed. Match conventions. No unsolicited refactors.
- **Goal-Driven Execution:** Set clear pass/fail criteria before executing.

### 5.4 `ui-ux-pro-max`
- Apply UI/UX design intelligence via local CLI script:
  ```bash
  python "C:/Users/agung/.agents/skills/ui-ux-pro-max/scripts/search.py" "<query>" --domain <domain>
  ```
- **Rule Priority Order:**
  1. **Accessibility (Critical):** WCAG AA contrast (≥ 4.5:1), visible focus rings, alt text on images, semantic tags, aria attributes.
  2. **Touch & Interaction (Critical):** Minimum 44×44px tap targets, ≥ 8px spacing between targets, clear loading/active states.
  3. **Performance (High):** Modern formats (AVIF/WebP), lazy loading, reserve layout space for CLS < 0.1.
  4. **Layout & Responsive (High):** Mobile-first design (360px → 1440px+), no horizontal scroll.
  5. **Typography & Color:** Base 16px body, 1.5 line height, semantic tokens, no raw hex in markup.
  6. **Animation:** Subtle CSS transitions, respect `prefers-reduced-motion`.

### 5.5 `cavecrew`
- Use subagents to save context tokens in multi-file operations:
  - `cavecrew-investigator`: Fast code localization returning `path:line` tables.
  - `cavecrew-builder`: Surgical edits limited to ≤ 2 files.
  - `cavecrew-reviewer`: Diff and bug audits returning structured findings.

### 5.6 `install-anti-slop`
- Enforce Oxlint anti-slop rules in `tools/oxlint/anti-slop/`.
- Prevent AI slop:
  - Ban redundant filter-map chains (`anti-slop/no-array-filter-map`).
  - Ban quadratic spread accumulators in reduce (`oxc/no-accumulating-spread`, `anti-slop/no-reduce-accumulator-copy`).
  - Ban chained type assertions and unsafe dictionary types.
  - Enforce clean readable structure and spacing.

---

## 6. MCP Tools Integration

Agents must use MCP servers for grounded work:

### 6.1 Lexa MCP (`mcp__lexa_*`)
- Static analysis, dependency tracing, verified edits:
  - `mcp__lexa_files`: File inventory.
  - `mcp__lexa_symbol_search` & `mcp__lexa_symbol_defs`: Symbol lookups.
  - `mcp__lexa_callers`: Trace call sites before changing interfaces.
  - `mcp__lexa_patch`: Hash-checked file patches.
  - `mcp__lexa_audit`: Architecture audits.

### 6.2 CodeDB MCP (`mcp__codedb_*`)
- Call graph resolution and semantic context:
  - `codedb_explain`: Get symbol body and all call sites in one call.
  - `codedb_callpath`: Find call paths between functions (A → … → B).
  - `codedb_context`: Task context with token budget limit.
  - `codedb_list_dir`: Fast, gitignore-aware directory listing.

### 6.3 Figwright MCP (`mcp__figwright_*`)
- When Figma designs or URLs provided:
  - `get_design_context`: Source of truth for measurements, colors, fonts, hierarchy. Never guess styles from images.
  - `component_map`, `token_map`, `icon_map`: Ground Figma components and tokens against local project before writing markup.
  - `save_screenshots` / `save_image_fills`: Extract assets directly from canvas.

### 6.4 Browser & Runtime DevTools
- Use browser testing for layout, contrast, touch sizes, Lighthouse scores.

---

## 7. Project Structure & Code Organization

```
kopdes-merah-putih/
├── astro.config.ts             # Astro config with @tailwindcss/vite and React plugin
├── components.json             # shadcn configuration (base: Base UI)
├── eslint.config.js            # Linter banning useEffect, useLayoutEffect, and radix
├── tsconfig.json               # Extends astro/tsconfigs/strict with @/* alias
├── assets-source/              # Original raw HD photo/logo masters (never bundled)
├── docs/
│   ├── assets-credits.md       # Asset licensing, author attribution, and source URLs
│   └── shadcn-audit.md         # Audit log for shadcn Base UI components & useEffect resolutions
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── robots.txt
├── scripts/
│   └── audit-rules.mjs         # Automated enforcement script (useEffect, radix, legacy patterns)
└── src/
    ├── assets/
    │   ├── brand/              # Logo transparent PNG/SVG
    │   ├── photos/             # Store, outlets, and product web images
    │   └── pattern/            # Red-white decorative SVG motifs
    ├── components/
    │   ├── ui/                 # shadcn Base UI components (audited)
    │   ├── sections/           # Modular .astro components (Header, Hero, Outlets, etc.)
    │   └── islands/            # Interactive *.tsx React components (MobileNav, ProductTabs, GalleryModal)
    ├── data/                   # Data layer separated from presentation
    │   ├── site.config.ts      # Site metadata, contacts, social links, stats
    │   ├── outlets.ts          # Outlets list with status: active | coming-soon | unavailable
    │   ├── products.ts         # Sample retail products (name, price, unit, category, image)
    │   └── faq.ts              # FAQ questions and answers
    ├── layouts/
    │   └── Layout.astro        # Master HTML layout, SEO meta tags, font preload, JSON-LD
    ├── lib/
    │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
    ├── pages/
    │   └── index.astro         # Main landing page assembling sections and islands
    └── styles/
        └── global.css          # Tailwind CSS v4 import and @theme custom tokens
```

---

## 8. Definition of Done & Verification Protocol

Before declaring work complete, verify:

1. **Rule Audit:** Run `pnpm audit:rules` (or `node scripts/audit-rules.mjs`) with 0 errors:
   - Zero `useEffect` or `useLayoutEffect` in `src/`.
   - Zero `radix` references in `package.json`, `pnpm-lock.yaml`, `src/`.
   - Zero legacy patterns (`forwardRef`, `React.FC`, `CommonJS`, `tailwind.config.*`).
   - Zero `: any` or `@ts-ignore` in `src/`.
2. **Typecheck & Astro Check:** Run `pnpm astro check` and `pnpm tsc --noEmit` — exit 0 clean.
3. **Lint & Anti-slop Check:** Run `pnpm lint` — pass without suppressed rules.
4. **Production Build:** Run `pnpm build` — static output builds without hydration warnings or build errors.
5. **Visual & Accessibility QA:**
   - Verify mobile layout down to 360px viewport (no horizontal overflow).
   - Verify transparent logo on white and red backgrounds.
   - Verify 44px minimum tap targets for buttons, tabs, hamburger menus.