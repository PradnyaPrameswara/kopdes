import fs from 'node:fs';
import path from 'node:path';

const snapshotDirectory = 'screenshots';
const exact = [
  ['home-reference-1000x563.png', 1000, 563],
  ['home-firstfold-1440x900.png', 1440, 900],
  ['home-firstfold-390x844.png', 390, 844],
];
const fullPage = [
  ['home-desktop-1440.png', 1440, 900],
  ['home-tablet-768.png', 768, 1024],
  ['home-mobile-390.png', 390, 844],
  ['history-mobile-390.png', 390, 844],
  ['outlets-desktop-1440.png', 1440, 900],
  ['registration-mobile-390.png', 390, 844],
];

let failed = false;

function inspectScreenshot(file, expectedWidth, minimumHeight, isExact) {
  const filePath = path.join(snapshotDirectory, file);

  if (!fs.existsSync(filePath)) {
    console.error('Missing screenshot: ' + file);
    failed = true;

    return;
  }

  const png = fs.readFileSync(filePath);
  const signature = Buffer.from('89504e470d0a1a0a', 'hex');

  if (png.length < 1024 || !png.subarray(0, 8).equals(signature)) {
    console.error('Missing or invalid PNG data: ' + file);
    failed = true;

    return;
  }

  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  const heightMatches = isExact ? height === minimumHeight : height >= minimumHeight;

  if (width !== expectedWidth || !heightMatches) {
    console.error(
      file + ': invalid dimensions ' + width + 'x' + height +
      ', expected width ' + expectedWidth +
      (isExact ? ' and height ' : ' and minimum height ') + minimumHeight
    );
    failed = true;

    return;
  }

  console.log('PASS ' + file + ': ' + width + 'x' + height);
}

for (const [file, width, height] of exact) {
  inspectScreenshot(file, width, height, true);
}

for (const [file, width, minimumHeight] of fullPage) {
  inspectScreenshot(file, width, minimumHeight, false);
}

if (failed) {
  process.exitCode = 1;
}
