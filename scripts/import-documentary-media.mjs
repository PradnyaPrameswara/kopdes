import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const manifest = await readFile('src/data/visual-media.ts', 'utf8');
const matches = [...manifest.matchAll(/image: '(\/images\/documentary\/[a-z-]+\.webp)',\s*sourceImage: '(https:\/\/upload\.wikimedia\.org\/[^']+)'/g)];

if (matches.length !== 5) {
  throw new Error('Expected five licensed documentary sources, found ' + matches.length);
}

await mkdir('public/images/documentary', { recursive: true });

for (const [, target, source] of matches) {
  const response = await fetch(source, {
    headers: { 'User-Agent': 'KopdesDocumentaryImporter/1.0 (attribution in source repo)' },
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
    throw new Error('Unable to import image: ' + response.status + ' ' + source);
  }

  const bytes = Buffer.from(await response.arrayBuffer());

  if (bytes.byteLength > 12_000_000) {
    throw new Error('Unexpectedly large image: ' + source);
  }

  const metadata = await sharp(bytes).metadata();

  if (!metadata.width || metadata.width < 640 || !metadata.height) {
    throw new Error('Source image resolution is too small: ' + source);
  }

  const output = path.join('public', target.slice(1));
  const smallOutput = output.replace(/\.webp$/, '-640.webp');

  await Promise.all([
    writeFile(output, await sharp(bytes).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toBuffer()),
    writeFile(smallOutput, await sharp(bytes).rotate().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toBuffer()),
  ]);

  console.log('Imported licensed documentary photo: ' + target);
}
