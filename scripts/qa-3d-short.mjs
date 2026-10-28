import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'qa-shots-3d');
fs.mkdirSync(out, { recursive: true });
const browserArgs = [
  '--no-sandbox',
  '--use-gl=angle',
  '--use-angle=swiftshader',
  '--enable-unsafe-swiftshader',
  '--font-render-hinting=none',
];
const errors = [];

async function open(viewport) {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: browserArgs,
  });
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('requestfailed', (request) =>
    errors.push(`requestfailed: ${request.url()} ${request.failure()?.errorText ?? ''}`),
  );
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.vessel-canvas.is-ready', { timeout: 25000 });
  await page.waitForTimeout(1400);
  return { browser, page };
}

async function scrollToChapter(page, index) {
  await page.evaluate((i) => {
    const el = document.querySelectorAll('[data-chapter]')[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2,
      behavior: 'instant',
    });
  }, index);
  await page.waitForTimeout(1700);
}

async function snap(page, name) {
  await page.screenshot({ path: path.join(out, name), timeout: 45000 });
  console.log('shot', name);
}

{
  const { browser, page } = await open({ width: 1440, height: 900 });
  await snap(page, 'focus-hero.png');
  await scrollToChapter(page, 0);
  await snap(page, 'focus-mouth.png');
  await scrollToChapter(page, 2);
  await snap(page, 'focus-belly.png');
  await browser.close();
}

{
  const { browser, page } = await open({ width: 390, height: 844 });
  await snap(page, 'focus-mobile-hero.png');
  await scrollToChapter(page, 1);
  await snap(page, 'focus-mobile-neck.png');
  await browser.close();
}

fs.writeFileSync(path.join(out, 'report-focus.json'), JSON.stringify({ errors }, null, 2), 'utf8');
console.log('ERRORS', errors.length);
for (const error of errors) console.log(error);
