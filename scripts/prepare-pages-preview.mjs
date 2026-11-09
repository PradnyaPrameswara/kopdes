import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = '/kopdes/';
const root = 'dist';
let updatedFiles = 0;

function prefix(url) {
  if (!url.startsWith('/') || url.startsWith('//') || url.startsWith(base)) return url;

  return base + url.slice(1);
}

function rewriteHtml(html) {
  return html.replace(/(\b(?:href|src|srcset|data-fallback-src|data-fallback-srcset|content)\s*=\s*)(["'])(.*?)\2/g, (match, key, quote, value) => {
    if (key.trim().startsWith('content') || (!value.startsWith('/') && !value.includes(', /'))) return match;

    const rewritten = value.includes(', ')
      ? value.split(', ').map((entry) => prefix(entry)).join(', ')
      : prefix(value);

    return key + quote + rewritten + quote;
  });
}

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);

    if (entry.isDirectory()) {
      await visit(file);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const original = await readFile(file, 'utf8');
      const rewritten = rewriteHtml(original);

      if (rewritten !== original) {
        await writeFile(file, rewritten);
        updatedFiles++;
      }
    }
  }
}

await visit(root);
console.log('Prepared Pages /kopdes/ preview links in ' + updatedFiles + ' HTML documents.');
