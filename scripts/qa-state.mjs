import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'],
});
const context = await browser.newContext({ viewport:{width:1024,height:700}, reducedMotion:'no-preference' });
const page = await context.newPage();
page.on('pageerror', e=>console.log('PAGEERROR', e.message));
await page.goto('http://127.0.0.1:4321/', {waitUntil:'domcontentloaded'});
await page.waitForSelector('.vessel-canvas.is-ready', {timeout:25000});
await page.waitForTimeout(1200);
async function info(label){
  const d = await page.evaluate(()=>{
    const h=document.querySelector('.vessel-canvas'); const s=document.querySelector('[data-vessel-stage]');
    return {y:window.scrollY, state:h?.dataset.state, target:h?.dataset.target, dist:h?.dataset.distance, targetY:h?.dataset.targetY, obs:s?.dataset.observeState, name:document.querySelector('[data-stage-name]')?.textContent};
  });
  console.log(label, JSON.stringify(d));
}
await info('top');
for (const [i,name] of [[0,'mouth'],[1,'neck'],[2,'shoulder'],[3,'belly'],[4,'foot']]) {
  await page.evaluate((i)=>{
    const el=document.querySelectorAll('[data-chapter]')[i];
    const r=el.getBoundingClientRect();
    window.scrollTo({top:window.scrollY+r.top+r.height/2-window.innerHeight/2, behavior:'instant'});
  }, i);
  await page.evaluate(()=>document.dispatchEvent(new CustomEvent('ciyun:observe-request')));
  await page.waitForTimeout(1800);
  await info(name);
}
await browser.close();
