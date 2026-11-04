# shadcn/ui Component Audit & Resolution Log

This document records the audit findings and resolution strategy for all installed shadcn/ui Base UI components in accordance with `PRD.md` §3.2 and `AGENTS.md` Rule D.

## Invariant Requirements
- **Rule A:** Zero `useEffect` and `useLayoutEffect` inside active `src/`.
- **Rule B:** Zero Radix UI dependencies (`@radix-ui/*`, `radix-ui`).
- **Rule C:** Zero legacy React (`forwardRef`, `React.FC`), zero CommonJS, zero `any`.

---

## Audit Findings & Resolutions

| # | Component / Hook | Finding | Resolution | Details |
|---|---|---|---|---|
| 1 | `src/hooks/use-mobile.ts` | Contained `useEffect` with `window.matchMedia` listener | **Refactored** | Rewritten using `React.useSyncExternalStore` with SSR fallback (`getServerSnapshot`). Zero `useEffect`. |
* 2 | `src/components/ui/calendar.tsx` | Contained `useEffect` for programmatic button focus | **Refactored** | Replaced with callback ref: `ref={(el) => { if (modifiers.focused) el?.focus(); }}`. Zero `useEffect`. |
* 3 | `src/components/ui/carousel.tsx` | Depends on `embla-carousel-react` with internal effects | **Quarantined / Replaced** | Quarantined to `src/components/ui/_unused/carousel.tsx`. Replaced across site with native CSS `scroll-snap-x`. |
* 4 | `src/components/ui/sidebar.tsx` | Contained multiple `useEffect` hooks for keyboard shortcuts and resize events | **Quarantined** | Quarantined to `src/components/ui/_unused/sidebar.tsx`. Not needed for single-page landing site (mobile nav uses Base UI `Sheet`). |
* 5 | `src/components/ui/chart.tsx` | Contained unparsed payload parameters and untyped assertions | **Quarantined** | Quarantined to `src/components/ui/_unused/chart.tsx`. Not needed for landing page. |
* 6 | `src/components/ui/code-block.tsx` | Contained untyped children runtime checks and effect timer | **Quarantined** | Quarantined to `src/components/ui/_unused/code-block.tsx`. |
* 7 | `src/hooks/use-highlighted-code.ts` & `src/lib/highlighter.tsx` | Contained `useEffect` for asynchronous Shiki highlighter loading | **Quarantined** | Quarantined to `src/hooks/_unused/` and `src/lib/_unused/`. |

---

## Import Path Normalization
- All CLI-generated `from "cn"` imports across 61 files were normalized to `from "@/lib/utils"` pointing to standard `cn()` helper (`clsx` + `tailwind-merge`).

## Automated Enforcement
- Audited via `scripts/audit-rules.mjs` (exits 1 on any violation).
- Excluded quarantined directories (`src/**/_unused/**`) in `tsconfig.json`, `.oxlintrc.json`, and `scripts/audit-rules.mjs`.
