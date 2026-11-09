import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const robots = readFileSync('dist/robots.txt', 'utf8');
const routes = ['', 'tujuan', 'gerai', 'keanggotaan', 'tentang', 'lokasi', 'faq', 'daftar'];

if (!/^Disallow:\s*\/$/m.test(robots)) {
  throw new Error('Preview robots.txt must disallow all paths');
}

for (const route of routes) {
  const page = readFileSync(join('dist', route, 'index.html'), 'utf8');

  if (!/<meta\s+name="robots"\s+content="noindex, nofollow"/.test(page)) {
    throw new Error('Unapproved public-indexing risk at route /' + route);
  }
}

console.log('PASS preview release guard: 8 noindex routes and robots Disallow /.');
