# AGENTS.md — Kopdes Merah Putih Landing Page

Agent instructions and engineering standards for the **Koperasi Desa/Kelurahan Merah Putih (Kopdes Merah Putih)** landing page project.

All agents operating in this repository must strictly adhere to the rules, constraints, architectural patterns, and skill workflows defined herein.

---

## 1. Project Overview & Mission

- **Project:** Koperasi Desa/Kelurahan Merah Putih Landing Page (`kopdes-merah-putih`).
- **Core Concept:** A high-trust, high-performance single-page landing site presenting Kopdes Merah Putih as a modern village retail store and cooperative hub (gotong royong) offering affordable staples, village pharmacy/clinic, cold storage, agricultural logistics, and member registration.
- **Language & Locale:** Indonesian (`id-ID`).
- **Target Audience:** Villagers, local farmers, village MSMEs (UMKM), village heads, and cooperative stakeholders.
- **Performance & Quality Targets:**
  - Lighthouse (Mobile 4G): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
  - Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.
  - Zero hydration errors, zero console warnings.

---

## 2. Core Architecture & Tech Stack

| Layer | Technology | Specification / Configuration |
|---|---|---|
| **Framework** | **Astro** (latest stable) | Static site generation (SSG) by default; zero client JS unless an island is explicitly needed. |
| **Interactive Islands** | **React** (latest stable) | React islands strictly scoped via `client:visible`, `client:media`, or `client:idle`. Never hydrate whole pages. |
| **Styling** | **Tailwind CSS v4** | Modern CSS-first architecture via `@tailwindcss/vite` in `astro.config.ts`. `@import "tailwindcss";` and `@theme` tokens in `src/styles/global.css`. |
| **UI Components** | **shadcn/ui (Base UI variant)** | Primitives built on **Base UI** (`@base-ui-components/react`). **STRICTLY NO RADIX UI**. |
| **Type System** | **TypeScript** | Strict mode (`astro/tsconfigs/strict`). No `any`, no implicit types. |
| **Icons** | **lucide-react** | SVG icons only. Never use emoji as UI icons. |
| **Typography** | **Fontsource Variable** | Self-hosted `@fontsource-variable/plus-jakarta-sans` & `@fontsource-variable/inter`. `font-display: swap`. |
| **Package Manager** | **pnpm** | Strict dependency isolation. |

---

## 3. Mandatory Invariants & Hard Prohibitions

These rules are non-negotiable. Any violation causes the automated audit script (`scripts/audit-rules.mjs`) and CI build to fail.

### Rule A: Strict Prohibition of `useEffect` & `useLayoutEffect`
- `useEffect` and `useLayoutEffect` are **forbidden everywhere** inside `src/` (including all shadcn components, hooks, and islands).
- **Mandatory alternatives:**
  - **Local UI state:** `useState` / `useReducer`.
  - **Derived calculations:** Compute during render or wrap in `useMemo`.
  - **Browser API subscriptions (media queries, window size, resize):** `useSyncExternalStore`.
  - **DOM node measurements or imperative access:** *Callback refs* (`ref={(node) => { ... }}`).
  - **Scroll and entrance animations:** Pure CSS (`@starting-style`, CSS `animation-timeline: view()`, Tailwind transitions) or native Astro `<script>` outside React.
  - **Data loading / static markup:** Native `.astro` components (zero runtime client JavaScript).
- **Audit Requirement:** `grep -r "useEffect\|useLayoutEffect" src` must return 0 results.

### Rule B: Absolute Radix UI Ban
- `@radix-ui/*` and `radix-ui` must never appear in `package.json`, `pnpm-lock.yaml`, or any import path in `src/`.
- All shadcn/ui components must use the **Base UI** primitive variant.
- **Audit Requirement:** `pnpm why radix-ui` and `grep -ri "radix" src package.json` must return empty.

### Rule C: No Legacy Patterns & Strict Type Safety
- **No legacy Tailwind:** Never create `tailwind.config.js` or use `@astrojs/tailwind`. Use Tailwind v4 `@import "tailwindcss"` and `@theme` directives.
- **No legacy React:** Never use `React.FC`, `forwardRef` (React 19 passes `ref` as a standard prop), class components, `defaultProps`, or `ReactDOM.render`.
- **No CommonJS:** ESM only (`import`/`export`). No `require` or `module.exports`.
- **Strict TypeScript:** No `var`, no `: any`, no `@ts-ignore`. If a temporary compiler workaround is unavoidable, use `@ts-expect-error` with a mandatory documented reason.

### Rule D: shadcn Conflict Resolution Strategy
When shadcn components are installed (`pnpm dlx shadcn@latest add ...`):
1. Immediately run `node scripts/audit-rules.mjs`.
2. Inspect any component containing `useEffect` (e.g. `use-mobile.ts`, `carousel.tsx`, `sidebar.tsx`).
3. For each finding, apply one of three resolutions and record it in `docs/shadcn-audit.md`:
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
- **Logo:** `src/assets/brand/logo-kopdes.png` must be a high-resolution transparent PNG (alpha channel, width ≥ 1200px) with no white bounding box or fringing. Must remain crisp and legible against both white and red backgrounds.
- **Store & Section Photos:** Longest edge ≥ 1920px (hero photo ≥ 2400px). Store originals in `assets-source/` (not bundled).
- **Astro Image Pipeline:** Always use Astro's `<Picture>` or `<Image>` components to emit modern formats (AVIF, WebP) with responsive `srcset` and explicit `width`/`height`.
- **Loading Strategy:** Hero image uses `loading="eager"` + `fetchpriority="high"`. All below-the-fold images must use `loading="lazy"`.
- **Credits & Ethics:** Document all photo sources, authors, and licenses in `docs/assets-credits.md`. If running a demo or unverified local instance, include the required footer disclaimer: *"Website ini bukan situs resmi pemerintah."*

---

## 5. Skills Integration & Execution Directives

Agents must invoke and apply the following skills throughout task execution:

### 5.1 `using-superpowers`
- **Rule:** Before taking any action or writing code, check and invoke the applicable skill.
- **Priority:** Process skills (brainstorming, systematic-debugging) precede domain and implementation skills.
- **Stop Red Flags:** Never rationalize skipping a skill with "this is simple" or "let me explore first".

### 5.2 `using-agent-skills`
Follow the standard engineering lifecycle sequence:
1. **Define:** `spec-driven-development` / `idea-refine` before writing code.
2. **Plan:** `planning-and-task-breakdown` to create verifiable, small tasks.
3. **Build:** `incremental-implementation` with thin vertical slices.
4. **Verify:** `test-driven-development` and `browser-testing-with-devtools`.
5. **Review:** `code-review-and-quality` and `code-simplification`.
- **Core Operating Behaviors:** Surface assumptions early, manage confusion actively (stop and clarify rather than guessing), push back on bad ideas, and enforce simplicity.

### 5.3 `karpathy-guidelines`
- **Think Before Coding:** Explicitly state assumptions; never silently pick between conflicting interpretations.
- **Simplicity First:** Write the minimum code required to solve the task. No speculative flexibility, no unnecessary abstractions.
- **Surgical Changes:** Edit only what is required. Match existing conventions. Do not perform unsolicited refactoring on adjacent systems.
- **Goal-Driven Execution:** Establish verifiable pass/fail criteria before executing.

### 5.4 `ui-ux-pro-max`
- Apply UI/UX design intelligence using the local CLI script:
  ```bash
  python "C:/Users/agung/.agents/skills/ui-ux-pro-max/scripts/search.py" "<query>" --domain <domain>
  ```
- **Rule Priority Order:**
  1. **Accessibility (Critical):** WCAG AA contrast (≥ 4.5:1), visible keyboard focus rings, alt text on all images, semantic tags, aria attributes.
  2. **Touch & Interaction (Critical):** Minimum 44×44px interactive tap targets, ≥ 8px spacing between touch targets, clear loading/active states.
  3. **Performance (High):** Modern image formats (AVIF/WebP), lazy loading, reserve layout space to guarantee CLS < 0.1.
  4. **Layout & Responsive (High):** Mobile-first design (360px → 1440px+), zero horizontal scrolling.
  5. **Typography & Color:** Base 16px body, 1.5 line height, semantic token usage, no raw hex in component markup.
  6. **Animation:** Subtle CSS-based transitions, respect `prefers-reduced-motion`.

### 5.5 `cavecrew`
- Use subagents to conserve context window tokens during multi-file operations:
  - `cavecrew-investigator`: Fast code localization returning compressed `path:line` tables.
  - `cavecrew-builder`: Surgical edits limited to ≤ 2 files.
  - `cavecrew-reviewer`: Diff and bug audits returning structured findings.

### 5.6 `install-anti-slop`
- Enforce strict Oxlint anti-slop rules vendored in `tools/oxlint/anti-slop/`.
- Prevent AI coding slop:
  - Ban redundant filter-map chains (`anti-slop/no-array-filter-map`).
  - Ban quadratic spread accumulators in reduce loops (`oxc/no-accumulating-spread`, `anti-slop/no-reduce-accumulator-copy`).
  - Ban chained type assertions and unsafe dictionary types.
  - Enforce clean, readable code structure and maintainable spacing.

---

## 6. MCP Tools Integration

Agents must leverage connected Model Context Protocol (MCP) servers to ensure grounded implementation:

### 6.1 Lexa MCP (`mcp__lexa_*`)
- Use for static codebase analysis, dependency tracing, and verified edits:
  - `mcp__lexa_files`: High-level inventory of indexed files.
  - `mcp__lexa_symbol_search` & `mcp__lexa_symbol_defs`: Instant, accurate symbol lookups.
  - `mcp__lexa_callers`: Trace call sites before modifying interfaces.
  - `mcp__lexa_patch`: Apply hash-checked surgical file patches.
  - `mcp__lexa_audit`: Run static architecture audits.

### 6.2 CodeDB MCP (`mcp__codedb_*`)
- Use for call graph resolution and semantic context:
  - `codedb_explain`: Retrieve complete symbol definition body and all call sites in one call.
  - `codedb_callpath`: Discover execution paths between functions (A → … → B).
  - `codedb_context`: Retrieve surrounding task context with token budget limits.
  - `codedb_list_dir`: Fast, gitignore-aware directory listings.

### 6.3 Figwright MCP (`mcp__figwright_*`)
- When Figma designs or URLs are provided:
  - `get_design_context`: Authoritative source of truth for measurements, colors, fonts, and hierarchy. Never guess or eyeball styles from images.
  - `component_map`, `token_map`, `icon_map`: Ground Figma components and tokens against the local project before generating new markup.
  - `save_screenshots` / `save_image_fills`: Extract original asset bytes directly from the canvas.

### 6.4 Browser & Runtime DevTools
- Use browser testing for runtime verification of responsive layout, visual contrast, touch target sizes, and Lighthouse scores.

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

Before declaring any implementation or phase complete, verify all of the following:

1. **Rule Audit:** Run `pnpm audit:rules` (or `node scripts/audit-rules.mjs`). Must pass with 0 errors:
   - Zero occurrences of `useEffect` or `useLayoutEffect` in `src/`.
   - Zero references to `radix` in `package.json`, `pnpm-lock.yaml`, or `src/`.
   - Zero legacy patterns (`forwardRef`, `React.FC`, `CommonJS`, `tailwind.config.*`).
   - Zero `: any` or `@ts-ignore` in `src/`.
2. **Typecheck & Astro Check:** Run `pnpm astro check` and `pnpm tsc --noEmit` — must exit 0 with clean output.
3. **Lint & Anti-slop Check:** Run `pnpm lint` — must pass cleanly without suppressed rules.
4. **Production Build:** Run `pnpm build` — static output must generate without hydration warnings or build errors.
5. **Visual & Accessibility QA:**
   - Verify mobile layout down to 360px viewport width (no horizontal overflow).
   - Verify transparent logo on both white and red backgrounds.
   - Verify minimum 44px tap targets for buttons, tabs, and hamburger menus.
