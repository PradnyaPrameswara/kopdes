import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const routes = ['', 'tujuan', 'gerai', 'keanggotaan', 'tentang', 'lokasi', 'faq', 'daftar'];
const base = '/kopdes/';
const site = 'https://pradnyaprameswara.github.io/kopdes/';
const problems = [];

for (const route of routes) {
  const path = join('dist', route, 'index.html');
  const html = await readFile(path, 'utf8');
  const attributes = [...html.matchAll(/\b(?:href|src|srcset|data-fallback-src|data-fallback-srcset)\s*=\s*["']([^"']*)["']/g)];

  for (const [, value] of attributes) {
    const urls = value.split(', ').map((item) => item.trim().split(' ')[0]);

    for (const url of urls) {
      if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(base)) {
        problems.push(route + ': unprefixed local asset/link ' + url);
      }
    }
  }

  const canonical = route ? site + route + '/' : site;

  if (!html.includes('rel="canonical" href="' + canonical + '"')) problems.push(route + ': incorrect canonical');

  if (!html.includes('content="noindex, nofollow"')) problems.push(route + ': missing noindex');

  if (!html.includes('content="' + site + 'images/brand/logo-kopdes.webp"')) problems.push(route + ': incorrect OG image base');

  console.log('CHECK Pages prefix /' + route);
}

const robots = await readFile('dist/robots.txt', 'utf8');

if (!/^Disallow:\s*\/$/m.test(robots)) problems.push('Pages preview robots policy changed');

if (problems.length) {
  for (const problem of problems) console.error('FAIL ' + problem);

  process.exitCode = 1;
} else {
  console.log('PASS all 8 GitHub Pages preview routes with /kopdes/ paths and noindex');
}
