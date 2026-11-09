# Visual reference — KOPDES retro redesign

## Goal

Adapt the vintage, editorial composition of https://www.lphishiring.com/ to Koperasi Desa/Kelurahan Merah Putih using KOPDES's own brand identity. This is a visual study, **not** an official government site or an AMC/Los Pollos Hermanos derivative product. No proprietary restaurant logo, characters, video, or wording is bundled.

The live reference did not load reliably during inspection, so pixel-perfect parity cannot currently be established. Compare against authenticated screenshots at 360, 768, 1280, and 1440 px before claiming fidelity.

## Composition

1. Wide photo masthead with centered circular KOPDES seal, large display logotype, tagline.
2. Deep teal horizontal navigation with crimson trim; keyboard-operable native details menu on mobile.
3. Warm paper welcome area, dramatic serif headline, left editorial copy / right portrait with circular frame and caption.
4. Alternating history, values, service-grid, photographic gallery, and contact/CTA sections.
5. Compact deep teal footer with red decorative trim.

KOPDES colors: #B91C1C red, #065366 teal, #FFF0CF warm light accent, #FFFAF0 paper, #FFFFFF white. No Radix, no useEffect, no new front-end runtime dependencies.

## Asset / editorial constraints

- Existing local transparent portrait of President Prabowo is used; no fabricated photo or quotation.
- Storefront / gallery images are verified photographs of named cooperatives, centrally listed in `src/data/visual-media.ts`. They are temporary externally hosted URLs: verify permission and move authorized originals to local optimized assets before production. Broken URL placeholders were replaced.
- Photos represent **different cooperatives**, not the fictional 'Desa Makmur' address still present in older site data.
- Information on individual service eligibility, actual branches, prices, guarantees, opening hours, or membership fees must be verified by real cooperative operators.
- The /daftar page still transmits NIK in a WhatsApp URL. It must be redesigned for data protection before real personal data is collected.
- The original sections and image files remain in Git history and source tree to avoid deleting unrelated work; the redesigned home no longer renders their stock-photo sections.

## Verification

Run pnpm install --frozen-lockfile, pnpm lint, pnpm audit:rules, pnpm check, pnpm build, and visual/accessibility reviews at key widths. No screenshot comparison or Lighthouse score can be claimed without actually running it.

## Reference alignment — PR4

Navigation now carries the same four-column information hierarchy as the reference's History / Culture & Values / Jobs / Training sections: Sejarah Kami / Budaya & Nilai / Gerai & Layanan / Galeri Kegiatan. All previous site routes remain reachable via the global footer; registration also remains in the mobile navigation and in page CTAs.

The welcome area uses a strong centered display heading, short left-hand statement with a white framed promise box, and an existing transparent President Prabowo photograph aligned to the right/bottom. The decorative disc not present in the known reference structure was removed. The image is labeled documentary, not as a quotation or personalized endorsement.

Pixel-accurate parity **is not verified** until reference screenshots and local render screenshots can be compared at matched viewport widths.
