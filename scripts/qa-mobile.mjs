import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox','--enable-gpu','--ignore-gpu-blocklist','--use-angle=d3d11','--enable-unsafe-swiftshader'],
});
const context = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'no-preference' });
const page = await context.newPage();
page.on('pageerror', e=>console.log('PAGEERROR', e.message));
await page.goto('http://127.0.0.1:4321/', {waitUntil:'domcontentloaded'});
await page.waitForSelector('.vessel-canvas.is-ready', {timeout:25000});
await page.waitForTimeout(1500);
await page.screenshot({path:'qa-shots-3d/mobile-hero-2.png', timeout:60000});
for (const [i,name] of [[1,'neck'],[2,'shoulder']]) {
  await page.evaluate((i)=>{
    const el=document.querySelectorAll('[data-chapter]')[i];
    const r=el.getBoundingClientRect();
    window.scrollTo({top:window.scrollY+r.top+r.height/2-window.innerHeight/2, behavior:'instant'});
    document.dispatchEvent(new CustomEvent('ciyun:observe-request'));
  }, i);
  await page.waitForTimeout(2000);
  await page.screenshot({path:`qa-shots-3d/mobile-${name}-2.png`, timeout:60000});
}
await browser.close();
