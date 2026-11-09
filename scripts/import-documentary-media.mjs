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
  let response;

  for (let attempt = 0; attempt < 6; attempt++) {
    response = await fetch(source, {
      headers: { 'User-Agent': 'KopdesDocumentaryImporter/1.0 (attribution in source repo)' },
      signal: AbortSignal.timeout(45000),
    });

    if (response.ok) break;

    if (response.status !== 429 && response.status !== 503) {
      throw new Error('Unable to import image: ' + response.status + ' ' + source);
    }

    if (attempt === 5) throw new Error('Commons rate limit persisted: ' + source);

    await new Promise((resolve) => setTimeout(resolve, 2500 * (attempt + 1)));
  }

  if (!response?.ok || !response.headers.get('content-type')?.startsWith('image/')) {
    throw new Error('Invalid source image response: ' + source);
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
  await new Promise((resolve) => setTimeout(resolve, 1200));
}
