import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const executable = process.env.PLAYWRIGHT_CLI;

if (!executable) throw new Error('Set PLAYWRIGHT_CLI to the existing pnpm dlx Playwright executable');

const require = createRequire(resolve(executable));
const { chromium } = require('playwright');
const origin = 'http://127.0.0.1:4321';
const routes = ['/', '/tujuan/', '/gerai/', '/keanggotaan/', '/tentang/', '/lokasi/', '/faq/', '/daftar/'];
const widths = [320, 390, 768, 1440];
const problems = [];
const browser = await chromium.launch({ headless: true });

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();

    for (const route of routes) {
      const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, 'HTTP 200 expected: ' + route);

      const result = await page.evaluate(() => {
        const visible = (element) => element.getClientRects().length > 0;
        const isBroken = (image) => visible(image) && (!image.complete || image.naturalWidth === 0);
        const focusables = [...document.querySelectorAll('a, button, input, summary')].filter(visible);

        const clipped = focusables.filter((element) => {
          const rect = element.getBoundingClientRect();

          return rect.width && (rect.right < -1 || rect.left > window.innerWidth + 1 || (rect.left < -1 && rect.right < window.innerWidth) || (rect.right > window.innerWidth + 1 && rect.left > 0));
        });

        return {
          width: window.innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          hasMain: Boolean(document.querySelector('main#main-content')),
          headings: document.querySelectorAll('h1').length,
          unlabelledImages: [...document.images].filter((image) => !image.hasAttribute('alt')).length,
          brokenImages: [...document.images].flatMap((image) => isBroken(image) ? [image.currentSrc] : []),
          clippedControls: clipped.map((element) => element.outerHTML.slice(0, 120)),
          primaryButtonsTooSmall: [...document.querySelectorAll('.retro-button')].filter(visible).filter((element) => element.getBoundingClientRect().height < 44).length,
        };
      });

      if (!result.hasMain || result.headings !== 1) problems.push(route + ' @' + width + ': main/h1 missing or duplicated');

      if (result.documentWidth > result.width + 1) problems.push(route + ' @' + width + ': horizontal overflow ' + result.documentWidth);

      if (result.unlabelledImages || result.brokenImages.length) problems.push(route + ' @' + width + ': missing alt or broken images ' + JSON.stringify(result.brokenImages));

      if (result.clippedControls.length) problems.push(route + ' @' + width + ': controls clipped ' + JSON.stringify(result.clippedControls));

      if (result.primaryButtonsTooSmall) problems.push(route + ' @' + width + ': button height below 44px');

      console.log('CHECK ' + width + 'px ' + route);
    }

    if (width <= 768) {
      await page.goto(origin + '/', { waitUntil: 'networkidle' });
      const menu = page.locator('.retro-nav-mobile > summary');
      await menu.focus();
      await page.keyboard.press('Enter');

      if (!(await page.locator('.retro-nav-mobile').evaluate((el) => el.hasAttribute('open')))) problems.push(width + 'px: native mobile menu did not open from keyboard');

      const firstLink = page.locator('.retro-nav-mobile-links a').first();

      if (!(await firstLink.isVisible())) problems.push(width + 'px: mobile links not visible when opened');

      await menu.focus();
      await page.keyboard.press('Enter');

      if (await page.locator('.retro-nav-mobile').evaluate((el) => el.hasAttribute('open'))) problems.push(width + 'px: native mobile menu did not close from keyboard');
    }

    await context.close();
  }
} finally {
  await browser.close();
}

if (problems.length) {
  for (const problem of problems) console.error('FAIL ' + problem);

  process.exitCode = 1;
} else {
  console.log('PASS 32 responsive route checks + keyboard mobile menu; manual assistive-technology testing remains required.');
}
