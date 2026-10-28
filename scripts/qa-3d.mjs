import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'qa-shots-3d');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: [
    '--no-sandbox',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--font-render-hinting=none',
  ],
});

const errors = [];
const warnings = [];

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  if (message.type() === 'warning') warnings.push(`warn: ${message.text()}`);
});
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
page.on('requestfailed', (request) =>
  errors.push(`requestfailed: ${request.url()} ${request.failure()?.errorText ?? ''}`),
);

await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);

let ready = false;
try {
  await page.waitForSelector('.vessel-canvas.is-ready', { timeout: 20000 });
  ready = true;
} catch {
  errors.push('3D canvas did not become ready');
}

await page.waitForTimeout(1600);

const info = await page.evaluate(() => {
  const host = document.querySelector('.vessel-canvas');
  const canvas = host?.querySelector('canvas');
  const poster = document.querySelector('[data-vessel-poster]');
  const stage = document.querySelector('[data-vessel-stage]');
  const gl = canvas?.getContext('webgl2');
  return {
    hostClass: host?.className,
    stageClass: stage?.className,
    canvas: canvas ? { w: canvas.width, h: canvas.height, cssW: canvas.clientWidth, cssH: canvas.clientHeight } : null,
    posterOpacity: poster ? getComputedStyle(poster).opacity : null,
    hostOpacity: host ? getComputedStyle(host).opacity : null,
    webgl2: Boolean(gl),
    renderer: gl?.getParameter(gl.RENDERER) ?? null,
    scrollY: window.scrollY,
    stateAttr: stage?.getAttribute('data-state') ?? null,
  };
});
console.log('READY', ready, JSON.stringify(info, null, 2));

await page.screenshot({ path: path.join(out, '3d-hero.png'), timeout: 60000 });

async function focusChapter(index, name) {
  await page.evaluate((i) => {
    const el = document.querySelectorAll('[data-chapter]')[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const target = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
    window.scrollTo({ top: target, behavior: 'instant' });
  }, index);
  await page.waitForTimeout(1800);
  const state = await page.evaluate(() => ({
    y: window.scrollY,
    name: document.querySelector('[data-stage-name]')?.textContent,
    index: document.querySelector('[data-stage-index]')?.textContent,
  }));
  console.log(name, state);
  await page.screenshot({ path: path.join(out, `3d-${name}.png`), timeout: 60000 });
}

await focusChapter(0, 'mouth');
await focusChapter(1, 'neck');
await focusChapter(3, 'belly');
await focusChapter(4, 'foot');

// back to hero
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(1600);
await page.screenshot({ path: path.join(out, '3d-hero-back.png'), timeout: 60000 });

// mobile
const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});
const mobile = await mobileContext.newPage();
mobile.on('pageerror', (error) => errors.push(`mobile pageerror: ${error.message}`));
await mobile.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
await mobile.waitForTimeout(1000);
try {
  await mobile.waitForSelector('.vessel-canvas.is-ready', { timeout: 20000 });
} catch {
  errors.push('mobile 3D canvas did not become ready');
}
await mobile.waitForTimeout(1500);
await mobile.screenshot({ path: path.join(out, '3d-mobile-hero.png'), timeout: 60000 });
await mobile.evaluate(() => {
  const el = document.querySelectorAll('[data-chapter]')[2];
  if (!el) return;
  const rect = el.getBoundingClientRect();
  window.scrollTo({
    top: window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2,
    behavior: 'instant',
  });
});
await mobile.waitForTimeout(1800);
await mobile.screenshot({ path: path.join(out, '3d-mobile-shoulder.png'), timeout: 60000 });

await browser.close();

fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify({ errors, warnings }, null, 2), 'utf8');
console.log('ERRORS', errors.length);
for (const error of errors) console.log(error);
console.log('WARNINGS', warnings.length);
for (const warning of warnings.slice(0, 12)) console.log(warning);
