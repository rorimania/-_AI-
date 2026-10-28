import { loadJourney, recordStage } from '../lib/journey';

type Speck = { x: number; y: number; r: number; light: boolean };

let cleanup: (() => void) | null = null;

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function initClay() {
  cleanup?.();
  cleanup = null;
  if (document.body.dataset.page !== 'clay') return;

  const stage = document.querySelector<HTMLElement>('[data-clay-stage]');
  const wrap = document.querySelector<HTMLElement>('.clay-stage__canvas-wrap');
  const canvas = document.querySelector<HTMLCanvasElement>('[data-clay-canvas]');
  const countEl = document.querySelector<HTMLElement>('[data-clay-count]');
  const statusEl = document.querySelector<HTMLElement>('[data-clay-status]');
  const scoreEl = document.querySelector<HTMLElement>('[data-clay-score]');
  const hintEl = document.querySelector<HTMLElement>('[data-clay-hint]');
  const dots = Array.from(document.querySelectorAll<HTMLElement>('[data-clay-dot]'));
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-clay-target]'));
  const completeBtn = document.querySelector<HTMLButtonElement>('[data-clay-complete]');
  const ctaLabel = document.querySelector<HTMLElement>('[data-clay-cta-label]');
  const cta = document.querySelector<HTMLAnchorElement>('[data-clay-cta]');

  if (!stage || !wrap || !canvas || !countEl || !statusEl) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const journey = loadJourney();
  const previousClay = journey.stages.clay;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const random = mulberry32(20261027);

  let width = 0;
  let height = 0;
  let dpr = 1;
  let cx = 0;
  let cy = 0;
  let rx = 0;
  let ry = 0;

  let kneads = 0;
  let score = typeof previousClay?.score === 'number' ? previousClay.score : 0;
  let lastQuality = 0;
  const qualities: number[] = [];
  let dragging = false;
  let pointerId: number | null = null;
  let dentAngle = 0;
  let dentDepth = 0;
  let squash = 0;
  let pressX = 0;
  let pressY = 0;
  let pressAlpha = 0;
  let raf = 0;

  let specks: Speck[] = [];

  const messages = [
    '泥团已就位，第一处记号在等你。',
    '第一巡按准了。泥开始听话。',
    '第二巡。气泡正在离开。',
    '第三巡完成，泥性已经揉匀。',
  ];

  const blobPath = () => {
    const path = new Path2D();
    const points = 168;
    for (let index = 0; index <= points; index += 1) {
      const theta = (index / points) * Math.PI * 2;
      const wobble =
        1 +
        0.035 * Math.sin(theta * 3 + 0.7) +
        0.021 * Math.sin(theta * 5 - 1.4) +
        0.012 * Math.sin(theta * 9 + 2.1);
      const angleDistance = Math.atan2(
        Math.sin(theta - dentAngle),
        Math.cos(theta - dentAngle),
      );
      const dent = 1 - dentDepth * Math.exp(-(angleDistance * angleDistance) / 0.16);
      const sx = 1 + squash * 0.55;
      const sy = 1 - squash;
      const x = cx + Math.cos(theta) * rx * wobble * dent * sx;
      const y = cy + Math.sin(theta) * ry * wobble * dent * sy;
      if (index === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    }
    path.closePath();
    return path;
  };

  const draw = () => {
    if (!width || !height) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const path = blobPath();

    // floor shadow
    ctx.save();
    const shadow = ctx.createRadialGradient(cx, cy + ry * 1.06, 0, cx, cy + ry * 1.06, rx * 1.18);
    shadow.addColorStop(0, 'rgba(82, 52, 32, 0.22)');
    shadow.addColorStop(0.6, 'rgba(82, 52, 32, 0.08)');
    shadow.addColorStop(1, 'rgba(82, 52, 32, 0)');
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(cx, cy + ry * 1.04, rx * 1.3, ry * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // clay body
    ctx.save();
    const gradient = ctx.createRadialGradient(
      cx - rx * 0.35,
      cy - ry * 0.5,
      rx * 0.08,
      cx + rx * 0.15,
      cy + ry * 0.3,
      rx * 1.15,
    );
    gradient.addColorStop(0, '#d3a67c');
    gradient.addColorStop(0.36, '#bc8b62');
    gradient.addColorStop(0.72, '#9b6b49');
    gradient.addColorStop(1, '#7c5136');
    ctx.fillStyle = gradient;
    ctx.fill(path);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(83, 51, 31, 0.28)';
    ctx.stroke(path);
    ctx.restore();

    // inner highlight
    ctx.save();
    ctx.clip(path);
    const sheen = ctx.createRadialGradient(
      cx - rx * 0.37,
      cy - ry * 0.44,
      0,
      cx - rx * 0.33,
      cy - ry * 0.38,
      rx * 0.66,
    );
    sheen.addColorStop(0, 'rgba(255, 239, 211, 0.34)');
    sheen.addColorStop(0.5, 'rgba(255, 239, 211, 0.1)');
    sheen.addColorStop(1, 'rgba(255, 239, 211, 0)');
    ctx.fillStyle = sheen;
    ctx.beginPath();
    ctx.ellipse(cx - rx * 0.3, cy - ry * 0.36, rx * 0.62, ry * 0.42, -0.35, 0, Math.PI * 2);
    ctx.fill();

    // speckles
    for (const speck of specks) {
      ctx.beginPath();
      ctx.arc(cx + speck.x * rx, cy + speck.y * ry, speck.r, 0, Math.PI * 2);
      ctx.fillStyle = speck.light
        ? 'rgba(246, 226, 198, 0.34)'
        : 'rgba(79, 48, 30, 0.26)';
      ctx.fill();
    }

    // crevices
    ctx.strokeStyle = 'rgba(86, 52, 31, 0.18)';
    ctx.lineWidth = 1.1;
    ctx.lineCap = 'round';
    const lines: Array<[number, number, number, number, number, number]> = [
      [-0.58, -0.08, -0.2, 0.08, 0.14, -0.02],
      [0.25, -0.46, 0.5, -0.14, 0.42, 0.16],
      [-0.4, 0.4, 0.04, 0.3, 0.36, 0.48],
      [-0.12, -0.6, 0.06, -0.32, 0.28, -0.2],
    ];
    for (const [x1, y1, x2, y2, x3, y3] of lines) {
      ctx.beginPath();
      ctx.moveTo(cx + x1 * rx, cy + y1 * ry);
      ctx.quadraticCurveTo(cx + x2 * rx, cy + y2 * ry, cx + x3 * rx, cy + y3 * ry);
      ctx.stroke();
    }

    // press glow
    if (pressAlpha > 0.01) {
      const glow = ctx.createRadialGradient(pressX, pressY, 0, pressX, pressY, rx * 0.3);
      glow.addColorStop(0, `rgba(255, 236, 204, ${0.24 * pressAlpha})`);
      glow.addColorStop(1, 'rgba(255, 236, 204, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pressX, pressY, rx * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const animate = () => {
    raf = 0;
    if (!dragging) {
      dentDepth *= 0.88;
      squash *= 0.86;
      pressAlpha *= 0.9;
      if (Math.abs(dentDepth) < 0.0015) dentDepth = 0;
      if (Math.abs(squash) < 0.0008) squash = 0;
    }
    draw();
    if (dragging || dentDepth !== 0 || squash !== 0 || pressAlpha > 0.01) {
      raf = window.requestAnimationFrame(animate);
    }
  };

  const wake = () => {
    if (reduced) {
      draw();
      return;
    }
    if (!raf) raf = window.requestAnimationFrame(animate);
  };

  const resize = () => {
    const rect = wrap.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    cx = width * 0.5;
    cy = height * 0.52;
    rx = Math.min(width * 0.31, height * 0.4);
    ry = rx * 0.82;

    specks = Array.from({ length: 96 }, () => {
      const angle = random() * Math.PI * 2;
      const distance = Math.sqrt(random()) * 0.82;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        r: 0.5 + random() * 1.35,
        light: random() > 0.62,
      };
    });

    draw();
    canvas.classList.add('is-ready');
    wrap.classList.add('is-ready');
  };

  const paintScore = () => {
    const rounded = Math.round(score);
    if (scoreEl) {
      scoreEl.textContent = kneads === 0 ? '泥性 · 待揉' : `泥性 · ${rounded}`;
    }
    stage.dataset.clayScore = String(rounded);
  };

  const updateUi = () => {
    countEl.textContent = String(kneads);
    dots.forEach((dot, index) => dot.classList.toggle('is-filled', index < kneads));
    if (statusEl) statusEl.textContent = messages[Math.min(kneads, messages.length - 1)];
    if (hintEl) {
      hintEl.textContent =
        kneads >= 3 ? '泥性已匀，可以上轮' : '按住亮起的记号，向两侧揉开';
    }

    targets.forEach((target, index) => {
      target.classList.toggle('is-active', index === kneads && kneads < 3);
      target.classList.toggle('is-hit', index < kneads);
    });

    paintScore();

    const ready = kneads >= 3;
    stage.dataset.ready = String(ready);
    if (ready) {
      if (ctaLabel) ctaLabel.textContent = '泥已匀 · 上轮拉坯';
      cta?.classList.add('is-ready');
    }
    if (kneads >= 3 && completeBtn) {
      completeBtn.disabled = true;
      completeBtn.textContent = '三巡已毕';
    }
  };

  const knead = (quality: number) => {
    if (kneads >= 3) return;
    lastQuality = Math.max(0, Math.min(1, quality));
    qualities.push(lastQuality);
    kneads += 1;
    score = Math.round(
      (qualities.reduce((sum, value) => sum + value, 0) / qualities.length) * 100,
    );
    updateUi();

    if (kneads >= 3) {
      const note =
        score >= 86
          ? '三巡都落在泥心上，泥性柔和，气泡去得很干净。'
          : score >= 60
            ? '三次揉压略有偏差，泥性仍被揉开了。'
            : '泥团被揉开了，下一次可以再靠近记号一点。';
      if (statusEl) statusEl.textContent = note;
      recordStage('clay', score, note, {
        passes: kneads,
        accuracy: score,
        quality: Number(lastQuality.toFixed(2)),
      });
    }
  };

  const pointerPosition = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const onPointerDown = (event: PointerEvent) => {
    if (pointerId !== null) return;
    pointerId = event.pointerId;
    dragging = true;
    canvas.setPointerCapture(event.pointerId);
    event.preventDefault();

    const point = pointerPosition(event);
    pressX = point.x;
    pressY = point.y;
    pressAlpha = 1;
    dentAngle = Math.atan2(point.y - cy, point.x - cx);
    dentDepth = 0.075;
    squash = Math.max(-0.035, Math.min(0.035, (point.y - cy) / ry * 0.025));

    const activeTarget = targets[kneads];
    if (activeTarget && kneads < 3) {
      const targetRect = activeTarget.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const targetX = targetRect.left - canvasRect.left + targetRect.width / 2;
      const targetY = targetRect.top - canvasRect.top + targetRect.height / 2;
      const distance = Math.hypot(point.x - targetX, point.y - targetY);
      const hitRadius = Math.max(46, Math.min(width, height) * 0.22);

      if (distance > hitRadius) {
        if (statusEl) statusEl.textContent = '这一下偏开了，把手移向亮起的记号。';
        wake();
        return;
      }

      const quality = 1 - Math.min(1, distance / hitRadius);
      knead(0.55 + quality * 0.45);
    }

    wake();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return;
    const point = pointerPosition(event);
    pressX = point.x;
    pressY = point.y;
    pressAlpha = 1;
    dentAngle = Math.atan2(point.y - cy, point.x - cx);
    const distance = Math.min(1, Math.hypot(point.x - cx, point.y - cy) / rx);
    dentDepth = 0.055 + distance * 0.035;
    squash = Math.max(-0.035, Math.min(0.035, (point.y - cy) / ry * 0.025));
    wake();
  };

  const finishPointer = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    dragging = false;
    pointerId = null;
    pressAlpha = 0.3;
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch {
      // pointer already released
    }
    wake();
  };

  const onComplete = () => {
    if (kneads >= 3) return;
    const filled = qualities.reduce((sum, value) => sum + value, 0) + 0.58 * (3 - qualities.length);
    score = Math.max(55, Math.round((filled / 3) * 100));
    qualities.push(0.58);
    kneads = 3;
    dentAngle = -0.9;
    dentDepth = 0.085;
    squash = 0.03;
    pressAlpha = 0;
    updateUi();
    wake();
    if (statusEl) statusEl.textContent = '帮你揉匀了，泥性可以上轮。';
    recordStage('clay', score, '请人代揉，泥也匀了，只是手感少了一点。', {
      passes: 3,
      assisted: true,
      accuracy: score,
    });
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', finishPointer);
  canvas.addEventListener('pointercancel', finishPointer);
  completeBtn?.addEventListener('click', onComplete);

  const observer = new ResizeObserver(() => resize());
  observer.observe(wrap);
  resize();

  cleanup = () => {
    observer.disconnect();
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', finishPointer);
    canvas.removeEventListener('pointercancel', finishPointer);
    completeBtn?.removeEventListener('click', onComplete);
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    canvas.classList.remove('is-ready');
    wrap.classList.remove('is-ready');
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'clay') initClay();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initClay();

export {};
