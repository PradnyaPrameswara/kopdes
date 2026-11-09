import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const input = 'screenshots/home-reference-1000x563.png';
const output = 'screenshots/reference-geometry.json';
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });

if (info.width !== 1000 || info.height !== 563) {
  throw new Error('Reference comparison requires Chromium 1000x563');
}

function matches(x, y, rgb) {
  const offset = (y * info.width + x) * info.channels;

  return rgb.every((channel, i) => Math.abs(data[offset + i] - channel) <= 1);
}

function firstY(x, from, to, rgb) {
  for (let y = from; y <= to; y++) {
    if (matches(x, y, rgb)) return y;
  }

  throw new Error('Cannot find expected horizontal band at x=' + x);
}

function panelWidth(y, rgb) {
  let left = 0;

  while (left < info.width && !matches(left, y, rgb)) left++;

  if (left === info.width) throw new Error('No solid-colored media edge found');

  let right = left;

  while (right + 1 < info.width && matches(right + 1, y, rgb)) right++;

  return { left, width: right - left + 1 };
}

const teal = [6, 83, 102];
const cream = [255, 240, 207];
const darkTeal = [2, 63, 80];
const mastheadStart = 16;
const navigationStart = firstY(3, 180, 218, teal);
const welcomeStart = firstY(3, 220, 244, cream);
const mediaTop = firstY(500, 370, 420, darkTeal);
const panel = panelWidth(mediaTop + 3, darkTeal);

const actual = {
  stripeHeight: mastheadStart,
  mastheadHeight: navigationStart - mastheadStart,
  navigationTop: navigationStart,
  navigationHeight: welcomeStart - navigationStart,
  welcomeTop: welcomeStart,
  mediaTop,
  mediaLeft: panel.left,
  mediaWidth: panel.width,
};

const archive = {
  stripeHeight: 16,
  mastheadHeight: 184,
  navigationTop: 200,
  navigationHeight: 26,
  welcomeTop: 226,
  mediaTop: 396,
  mediaLeft: 275,
  mediaWidth: 450,
};

const tolerances = {
  stripeHeight: 0,
  mastheadHeight: 2,
  navigationTop: 2,
  navigationHeight: 2,
  welcomeTop: 2,
  mediaTop: 5,
  mediaLeft: 2,
  mediaWidth: 4,
};

const checks = Object.entries(archive).map(([name, estimate]) => {
  const observed = actual[name];
  const delta = observed - estimate;
  const passed = Math.abs(delta) <= tolerances[name];

  console.log((passed ? 'PASS ' : 'FAIL ') + name + ': observed=' + observed + ', archive estimate=' + estimate + ', delta=' + delta);

  return { name, observed, archiveEstimate: estimate, delta, tolerance: tolerances[name], passed };
});

await writeFile(output, JSON.stringify({
  viewport: { width: info.width, height: info.height },
  source: 'docs/reference-geometry.md (single archived desktop raster, approximate estimates)',
  screenshot: input,
  checks,
  disclaimer: 'Structural measurements only. No original DOM/mobile reference or pixel-similarity score.',
}, null, 2) + '\n');

if (checks.some((check) => !check.passed)) process.exitCode = 1;
