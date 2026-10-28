import { recordStage } from '../lib/journey';

let cleanup: (() => void) | null = null;
let initToken = 0;

function initFireGame() {
  const token = ++initToken;
  cleanup?.();
  cleanup = null;
  if (document.body.dataset.page !== 'fire') return;

  const trial = document.querySelector<HTMLElement>('[data-fire-trial]');
  const strike = document.querySelector<HTMLButtonElement>('[data-fire-strike]');
  const skip = document.querySelector<HTMLButtonElement>('[data-fire-skip]');
  const roundsEl = document.querySelector<HTMLElement>('[data-fire-rounds]');
  const meter = document.querySelector<HTMLElement>('[data-fire-meter]');
  const zone = document.querySelector<HTMLElement>('[data-fire-zone]');
  const needle = document.querySelector<HTMLElement>('[data-fire-needle]');
  const feedback = document.querySelector<HTMLElement>('[data-fire-feedback]');
  const kilnTemp = document.querySelector<HTMLElement>('[data-kiln-temp]');
  const progressEl = document.querySelector<HTMLElement>('[data-fire-progress]');
  const progressBar = document.querySelector<HTMLElement>('.fire-timeline__bar span');

  if (!trial || !strike || !meter || !zone || !needle) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const totalRounds = 3;
  let position = 0.18;
  let direction = 1;
  let speed = 0.15;
  let attempts = 0;
  let hits = 0;
  let finished = false;
  let locked = false;
  let raf = 0;
  let lastTime = performance.now();
  let roundScores: number[] = [];
  let zoneStart = 0.4;
  let zoneWidth = 0.18;
  let settleTimer = 0;

  const drawNeedle = () => {
    needle.style.left = `${Math.max(0, Math.min(1, position)) * 100}%`;
  };

  const animate = (now: number) => {
    raf = window.requestAnimationFrame(animate);
    const delta = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;
    if (finished || locked || document.hidden) return;
    position += direction * speed * delta;
    if (position >= 1) {
      position = 1;
      direction = -1;
    } else if (position <= 0) {
      position = 0;
      direction = 1;
    }
    drawNeedle();
  };

  const setFeedback = (message: string, state: 'hit' | 'miss' | '') => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.toggle('is-hit', state === 'hit');
    feedback.classList.toggle('is-miss', state === 'miss');
  };

  const setZone = () => {
    zoneWidth = 0.2 + Math.random() * 0.08;
    zoneStart = 0.2 + Math.random() * Math.max(0.1, 0.74 - zoneWidth - 0.2);
    zone.style.left = `${zoneStart * 100}%`;
    zone.style.width = `${zoneWidth * 100}%`;
  };

  const finish = (recap: string, score: number, skipped = false) => {
    if (finished) return;
    finished = true;
    locked = true;
    window.clearTimeout(settleTimer);
    trial.classList.add('is-done');
    strike.disabled = true;
    strike.textContent = skipped ? '未候火' : '火候已定';
    if (skip) skip.hidden = true;
    if (roundsEl) roundsEl.textContent = `${attempts} / ${totalRounds}`;
    if (!skipped) {
      setFeedback(recap, score >= 65 ? 'hit' : 'miss');
      recordStage('fire', score, recap, {
        rounds: attempts,
        hits,
        score,
      });
      const progress = Math.min(96, 72 + Math.round(score * 0.23));
      if (progressEl) progressEl.textContent = `${progress}%`;
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (kilnTemp) kilnTemp.textContent = score >= 85 ? '1336' : score >= 60 ? '1322' : '1298';
      trial.dataset.fireScore = String(score);
    } else {
      setFeedback('这一窑的火候留白了。可以继续开窑。', '');
    }
  };

  const updateRounds = () => {
    if (roundsEl) roundsEl.textContent = `${attempts} / ${totalRounds}`;
  };

  const onStrike = () => {
    if (finished || locked) return;
    attempts += 1;
    const inside = position >= zoneStart && position <= zoneStart + zoneWidth;
    const center = zoneStart + zoneWidth / 2;
    const precision = inside
      ? 1 - Math.min(1, Math.abs(position - center) / (zoneWidth / 2)) * 0.55
      : 0;
    roundScores.push(inside ? precision : 0);

    meter.classList.remove('is-hit', 'is-miss');
    // Restart the small flash animation even when the same result repeats.
    void meter.offsetWidth;
    meter.classList.add(inside ? 'is-hit' : 'is-miss');

    if (inside) {
      hits += 1;
      setFeedback(
        precision > 0.8
          ? '正好落在火心，这一把柴把保温带稳住了。'
          : '落在带内，火候稳住了。',
        'hit',
      );
    } else {
      setFeedback(
        position < zoneStart
          ? '早了一刻，火还没走进保温带。'
          : '晚了一刻，火色已经越过去了。',
        'miss',
      );
    }

    updateRounds();

    if (attempts >= totalRounds) {
      const score = Math.round(
        (roundScores.reduce((sum, value) => sum + value, 0) / totalRounds) * 100,
      );
      const recap =
        score >= 85
          ? '三刻都落在保温带，火色很稳。'
          : score >= 55
            ? '火候有几刻偏离，但器物仍在火里成了。'
            : '这一窑火候偏得厉害，釉色只能交给窑变。';
      finish(recap, score);
      return;
    }

    locked = true;
    settleTimer = window.setTimeout(() => {
      locked = false;
      setZone();
      setFeedback('下一刻 · 等火色重新落进保温带。', '');
      lastTime = performance.now();
    }, 720);
  };

  const onSkip = () => {
    if (finished) return;
    finish('这一窑的火候留白了。可以继续开窑。', 0, true);
  };

  const onMeterPointer = (event: PointerEvent) => {
    if (!reduceMotion || finished) return;
    const rect = meter.getBoundingClientRect();
    position = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)));
    drawNeedle();
  };

  const onVisibility = () => {
    lastTime = performance.now();
  };

  strike.addEventListener('click', onStrike);
  skip?.addEventListener('click', onSkip);
  meter.addEventListener('pointermove', onMeterPointer);
  meter.addEventListener('pointerdown', onMeterPointer);
  document.addEventListener('visibilitychange', onVisibility);

  setZone();
  if (reduceMotion) {
    position = zoneStart + zoneWidth / 2;
    if (feedback) feedback.textContent = '拖动火尺到保温带，再投柴。';
  } else {
    raf = window.requestAnimationFrame(animate);
  }
  drawNeedle();

  if (token !== initToken) return;

  cleanup = () => {
    window.clearTimeout(settleTimer);
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    strike.removeEventListener('click', onStrike);
    skip?.removeEventListener('click', onSkip);
    meter.removeEventListener('pointermove', onMeterPointer);
    meter.removeEventListener('pointerdown', onMeterPointer);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'fire') initFireGame();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initFireGame();

export {};
