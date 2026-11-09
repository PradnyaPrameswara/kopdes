import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const pages = ['', 'tujuan', 'gerai', 'keanggotaan', 'tentang', 'lokasi', 'faq', 'daftar'];
const dist = 'dist';
const problems = [];

function fail(message) {
  problems.push(message);
  console.error('FAIL ' + message);
}

for (const route of pages) {
  const path = join(dist, route, 'index.html');

  if (!existsSync(path)) {
    fail('Missing route HTML: /' + route);

    continue;
  }

  const html = readFileSync(path, 'utf8');
  const label = route || 'home';

  if (!/<html[^>]+lang="id"/.test(html)) fail(label + ': expected Indonesian document language');
  if (!/<title>[^<]+<\/title>/.test(html)) fail(label + ': missing title');
  if (!/<meta\s+name="description"\s+content="[^"]+"/.test(html)) fail(label + ': missing description');
  if (!/<link\s+rel="canonical"\s+href="https:\/\//.test(html)) fail(label + ': missing canonical URL');
  if (!/property="og:image"\s+content="https:\/\//.test(html)) fail(label + ': missing absolute social image');
  if (!/<main\b[^>]*id="main-content"/.test(html)) fail(label + ': missing primary landmark');
  if (!/Bukan situs resmi pemerintah/.test(html)) fail(label + ': independent-site disclaimer missing');
  if (/<input\b[^>]*(?:name|id)="(?:nik|ktp)"/i.test(html)) fail(label + ': identity collection form present');

  console.log('CHECK route /' + route);
}

for (const name of ['bentangan', 'watualang', 'mandirancan', 'tambakboyo', 'kwarasan']) {
  for (const suffix of ['', '-640']) {
    const path = join(dist, 'images', 'documentary', name + suffix + '.webp');

    if (!existsSync(path)) fail('Missing licensed local image: ' + path);
  }
}

for (const name of ['favicon.svg', 'favicon.webp', 'images/brand/logo-kopdes.webp']) {
  if (!existsSync(join(dist, name))) fail('Missing brand/social asset: ' + name);
}

if (problems.length) {
  console.error(problems.length + ' static site audit error(s).');
  process.exitCode = 1;
} else {
  console.log('PASS static site quality gate: 8 routes, metadata, disclaimer, media assets.');
}
