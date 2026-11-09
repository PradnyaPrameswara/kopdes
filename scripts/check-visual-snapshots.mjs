import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const snapshotDirectory = 'screenshots';

const exact = [
  ['home-reference-1000x563.png', 1000, 563],
  ['home-firstfold-1440x900.png', 1440, 900],
  ['home-firstfold-390x844.png', 390, 844],
  ['home-firstfold-320x700.png', 320, 700],
  ['home-firstfold-1920x1080.png', 1920, 1080],
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


async function inspectReferenceGeometry() {
  const screenshot = path.join(snapshotDirectory, 'home-reference-1000x563.png');
  const { data, info } = await sharp(screenshot).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  function pixelAt(x, y) {
    const index = (y * info.width + x) * info.channels;

    return [data[index], data[index + 1], data[index + 2]];
  }

  function near(actual, expected, tolerance = 12) {
    return actual.every((value, index) => Math.abs(value - expected[index]) <= tolerance);
  }

  // These sample only solid KOPDES layout bands, not reference pixels or imagery.
  const anchors = [
    { name: 'navigation band at y=210', x: 3, y: 210, rgb: [6, 83, 102] },
    { name: 'welcome starts at y=229', x: 3, y: 229, rgb: [255, 240, 207] },
    { name: 'warm welcome continues at y=400', x: 3, y: 400, rgb: [255, 240, 207] },
  ];

  for (const anchor of anchors) {
    const actual = pixelAt(anchor.x, anchor.y);

    if (!near(actual, anchor.rgb)) {
      console.error('FAIL ' + anchor.name + ': ' + actual.join(','));
      failed = true;
    } else {
      console.log('PASS ' + anchor.name);
    }
  }

  const mediaTop = pixelAt(500, 398);

  if (!near(mediaTop, [2, 63, 80], 30)) {
    console.error('FAIL media panel top at 1000px: ' + mediaTop.join(','));
    failed = true;
  } else {
    console.log('PASS documentary media panel starts near reference y=396');
  }
}

await inspectReferenceGeometry();

if (failed) {
  process.exitCode = 1;
}
