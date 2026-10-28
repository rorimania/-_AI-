import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox','--enable-gpu','--ignore-gpu-blocklist','--use-angle=d3d11','--enable-unsafe-swiftshader'],
});
const context = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
const page = await context.newPage();
page.on('pageerror', e=>console.log('PAGEERROR', e.message));
await page.goto('http://127.0.0.1:4321/', {waitUntil:'domcontentloaded'});
await page.waitForSelector('.vessel-canvas.is-ready', {timeout:25000});
await page.waitForTimeout(1200);
const gl = await page.evaluate(()=>{
  const c=document.querySelector('.vessel-canvas canvas');
  const g=c?.getContext('webgl2');
  return {renderer:g?.getParameter(g.RENDERER), vendor:g?.getParameter(g.VENDOR)};
});
console.log('GL', gl);
const fps = await page.evaluate(()=>new Promise(res=>{let n=0;const t=performance.now();function f(){n++;if(performance.now()-t<1000)requestAnimationFrame(f);else res(n);}requestAnimationFrame(f);}));
console.log('FPS', fps);
async function info(label){
  const d = await page.evaluate(()=>{
    const h=document.querySelector('.vessel-canvas'); const s=document.querySelector('[data-vessel-stage]');
    return {y:window.scrollY, state:h?.dataset.state, target:h?.dataset.target, dist:h?.dataset.distance, obs:s?.dataset.observeState, name:document.querySelector('[data-stage-name]')?.textContent};
  });
  console.log(label, JSON.stringify(d));
}
for (const [i,name] of [[0,'mouth'],[3,'belly'],[4,'foot']]) {
  await page.evaluate((i)=>{
    const el=document.querySelectorAll('[data-chapter]')[i];
    const r=el.getBoundingClientRect();
    window.scrollTo({top:window.scrollY+r.top+r.height/2-window.innerHeight/2, behavior:'instant'});
    document.dispatchEvent(new CustomEvent('ciyun:observe-request'));
  }, i);
  await page.waitForTimeout(2000);
  await info(name);
  await page.screenshot({path:`qa-shots-3d/gpu-${name}.png`, timeout:60000});
}
await browser.close();
