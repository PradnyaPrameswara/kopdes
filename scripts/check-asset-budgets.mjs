import { stat } from 'node:fs/promises';
import { join } from 'node:path';

const names = ['bentangan', 'watualang', 'mandirancan', 'tambakboyo', 'kwarasan'];
const limits = { full: 250_000, small: 70_000, logo: 175_000 };
const failures = [];
let totalBytes = 0;

for (const name of names) {
  for (const [suffix, limit] of [['', limits.full], ['-640', limits.small]]) {
    const filename = join('dist', 'images', 'documentary', name + suffix + '.webp');
    const size = (await stat(filename)).size;

    totalBytes += size;
    console.log('CHECK ' + filename + ': ' + size + ' bytes');

    if (size > limit) failures.push(filename + ' exceeds ' + limit + ' bytes');
  }
}

const logo = join('dist', 'images', 'brand', 'logo-kopdes.webp');
const logoBytes = (await stat(logo)).size;

if (logoBytes > limits.logo) failures.push(logo + ' exceeds ' + limits.logo + ' bytes');

console.log('Documentary image total: ' + totalBytes + ' bytes');
\nconsole.log('Brand logo: ' + logoBytes + ' bytes');

if (failures.length) {
  for (const failure of failures) console.error('FAIL ' + failure);

  process.exitCode = 1;
}
