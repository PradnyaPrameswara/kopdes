import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const routes = ['', 'tujuan', 'gerai', 'keanggotaan', 'tentang', 'lokasi', 'faq', 'daftar'];
const failures = [];

for (const route of routes) {
  const filename = join('dist', route, 'index.html');
  const html = readFileSync(filename, 'utf8');
  const attributes = [...html.matchAll(/\b(?:href|src|srcset|data-fallback-src|data-fallback-srcset)\s*=\s*["']([^"']*)["']/g)];
  const headingCount = [...html.matchAll(/<h1\b/g)].length;

  if (headingCount !== 1) failures.push((route || 'home') + ': expected one H1, got ' + headingCount);

  for (const [, value] of attributes) {
    for (const part of value.split(',')) {
      const url = part.trim().split(/\s+/)[0];

      if (!url.startsWith('/') || url.startsWith('//')) continue;

      const [pathname, hash] = url.split('#');
      const clean = pathname.split('?')[0];
      const target = clean === '/' ? 'dist/index.html' : join('dist', clean.replace(/^[/]+/, ''));

      const resolved = clean.endsWith('/') || !clean.includes('.', clean.lastIndexOf('/') + 1)
        ? join(target, 'index.html')
        : target;

      const correct = clean === '/' ? 'dist/index.html' : resolved;

      if (!existsSync(correct)) failures.push((route || 'home') + ': missing internal target ' + url);

      if (hash && clean === '/' && !html.includes('id="' + hash + '"')) {
        const home = readFileSync('dist/index.html', 'utf8');

        if (!home.includes('id="' + hash + '"')) failures.push((route || 'home') + ': missing homepage anchor ' + hash);
      }
    }
  }

  console.log('CHECK navigation and semantics /' + route);
}

if (failures.length) {
  for (const failure of failures) console.error('FAIL ' + failure);

  process.exitCode = 1;
} else {
  console.log('PASS eight-route local links, asset paths, and single H1 headings.');
}
