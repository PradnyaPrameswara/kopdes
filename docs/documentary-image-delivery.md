# Documentary photo delivery

The five real-location photos remain credited to their Wikimedia Commons authors. The active site now reads optimized local WebP renditions from `public/images/documentary/`, not live publisher or Wikimedia hotlinks. A smaller 640px version is selected on narrow screens via `srcset`; the 1280px version is the default.

Run `node scripts/import-documentary-media.mjs` to regenerate the two files per source from `sourceImage` in `src/data/visual-media.ts`. The PR workflow may populate these files automatically for same-repository pull requests; the import is complete only after all 10 generated WebP files are committed and CI screenshots pass. Network/download failures must not be hidden with placeholder stock or generated photos.

The images were resized, converted to WebP and compressed; underlying scene content was not edited. Each visible photo caption links its original Commons file, author and CC license. CC BY-SA photos retain their original license for adapted/converted image files and must be redistributed with attribution, a link to the license and an indication of these processing changes. This does not establish official endorsement, logo/portrait permission, or an operating branch of this independent site.
