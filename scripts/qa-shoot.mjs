import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'qa-shots');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--font-render-hinting=none'],
});

const errors = [];
const warnings = [];

async function newPage(width, height, label) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`[${label}] console: ${message.text()}`);
    if (message.type() === 'warning') warnings.push(`[${label}] warn: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`[${label}] pageerror: ${error.message}`));
  page.on('requestfailed', (request) =>
    errors.push(`[${label}] requestfailed: ${request.url()} ${request.failure()?.errorText ?? ''}`),
  );
  return { context, page };
}

async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(450);
}

async function shot(page, name) {
  await page.screenshot({ path: path.join(out, `${name}.png`), animations: 'disabled' });
}

async function checkOverflow(page, label) {
  const info = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    scrollHeight: document.documentElement.scrollHeight,
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim()?.slice(0, 60) ?? '',
  }));
  if (info.scrollWidth > info.innerWidth + 1) {
    errors.push(`[${label}] horizontal overflow: ${info.scrollWidth} > ${info.innerWidth}`);
  }
  console.log(label, JSON.stringify(info));
}

// Desktop home
{
  const { context, page } = await newPage(1440, 900, 'home-desktop');
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
  await settle(page);
  await checkOverflow(page, 'home-desktop');
  await shot(page, 'home-top');

  const chapters = page.locator('[data-chapter]');
  await chapters.nth(0).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await shot(page, 'home-chapter-1');
  await chapters.nth(2).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await shot(page, 'home-chapter-3');

  await page.locator('#process').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await shot(page, 'home-process');

  await page.locator('#collection').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await shot(page, 'home-collection');

  await page.locator('.closing').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await shot(page, 'home-closing');

  // client navigation
  await page.locator('a[href="/create/clay"]').first().click();
  await page.waitForTimeout(900);
  await checkOverflow(page, 'home->clay-clientnav');
  await shot(page, 'clientnav-clay');

  await context.close();
}

// Mobile home
{
  const { context, page } = await newPage(390, 844, 'home-mobile');
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
  await settle(page);
  await checkOverflow(page, 'home-mobile');
  await shot(page, 'home-mobile-top');
  await page.locator('[data-chapter]').nth(2).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await shot(page, 'home-mobile-chapter');
  await page.locator('#collection').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await shot(page, 'home-mobile-collection');
  await context.close();
}

// Other pages desktop
const pages = [
  ['clay', '/create/clay'],
  ['form', '/create/form'],
  ['craft', '/create/craft'],
  ['fire', '/create/fire'],
  ['result', '/create/result'],
  ['credits', '/credits'],
];

for (const [name, route] of pages) {
  const { context, page } = await newPage(1440, 900, `${name}-desktop`);
  await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'domcontentloaded' });
  await settle(page);
  await checkOverflow(page, `${name}-desktop`);
  await shot(page, `${name}-desktop`);
  await context.close();
}

// Clay mobile + form mobile
for (const [name, route] of [
  ['clay', '/create/clay'],
  ['form', '/create/form'],
  ['craft', '/create/craft'],
  ['fire', '/create/fire'],
  ['result', '/create/result'],
]) {
  const { context, page } = await newPage(390, 844, `${name}-mobile`);
  await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'domcontentloaded' });
  await settle(page);
  await checkOverflow(page, `${name}-mobile`);
  await shot(page, `${name}-mobile`);
  await context.close();
}

// Reduced motion home
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`[reduced] pageerror: ${error.message}`));
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
  await settle(page);
  const hidden = await page
    .locator('.reveal')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity === '0').length);
  if (hidden > 0) errors.push(`[reduced] ${hidden} reveal elements still hidden`);
  await shot(page, 'home-reduced');
  await context.close();
}

await browser.close();

fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify({ errors, warnings }, null, 2), 'utf8');
console.log('ERRORS', errors.length);
for (const error of errors) console.log(error);
console.log('WARNINGS', warnings.length);
for (const warning of warnings.slice(0, 10)) console.log(warning);
