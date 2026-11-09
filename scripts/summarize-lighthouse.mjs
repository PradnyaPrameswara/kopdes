import { readFile, writeFile } from 'node:fs/promises';

const report = JSON.parse(await readFile('reports/lighthouse-home-mobile.json', 'utf8'));
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const lines = ['# Lighthouse mobile sample', '', 'Local production build; one simulated mobile run. Not field Core Web Vitals.', ''];

for (const name of categories) {
  const value = report.categories?.[name]?.score;

  if (!Number.isFinite(value)) throw new Error('Missing Lighthouse category: ' + name);

  lines.push('- ' + name + ': ' + Math.round(value * 100));
}

lines.push('');

lines.push('## Lab metrics');

for (const id of ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index']) {
  const audit = report.audits?.[id];
  const measured = audit?.displayValue ?? 'not available';

  lines.push('- ' + id + ': ' + measured);
}

lines.push('', 'INP cannot be established by this single lab Lighthouse run; it requires real-user field data.', '');

await writeFile('reports/lighthouse-summary.md', lines.join('\n'));

console.log(lines.join('\n'));
