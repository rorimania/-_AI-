import { showToast } from './app';
import { crafts } from '../data/crafts';
import { tonePalettes } from '../data/tones';
import {
  JOURNEY_STAGES,
  buildRecap,
  formatDate,
  loadJourney,
  recordStage,
  resetJourney,
  type JourneyRecap,
} from '../lib/journey';

let cleanup: (() => void) | null = null;

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    textarea.remove();
    return ok;
  }
}

function loadSvgImage(svg: SVGSVGElement) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '600');
    clone.setAttribute('height', '820');

    const xml = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('poster image failed'));
    };
    image.src = url;
  });
}

function applyCraftToPoster(craftId: string) {
  const poster = document.querySelector<HTMLElement>('[data-vessel-poster]');
  const craft = crafts.find((item) => item.id === craftId) ?? crafts[1];
  if (!poster) return craft;

  const palette = tonePalettes[craft.tone];
  const svg = poster.querySelector('svg');
  const glazeStops = Array.from(svg?.querySelectorAll<SVGStopElement>('.tone-glaze stop') ?? []);
  const rimStops = Array.from(svg?.querySelectorAll<SVGStopElement>('.tone-rim stop') ?? []);
  const outline = svg?.querySelector<SVGPathElement>('.vessel-outline');
  const rim = svg?.querySelector<SVGEllipseElement>('.vessel-rim');
  const footLines = Array.from(svg?.querySelectorAll<SVGPathElement>('.vessel-foot-line') ?? []);
  const crackle = svg?.querySelector<SVGGElement>('.poster-crackle');

  [palette.a, palette.b, palette.c, palette.d, palette.e].forEach((color, index) => {
    glazeStops[index]?.setAttribute('stop-color', color);
  });
  [palette.rimA, palette.rimB, palette.rimC].forEach((color, index) => {
    rimStops[index]?.setAttribute('stop-color', color);
  });
  outline?.setAttribute('stroke', palette.edge);
  rim?.setAttribute('stroke', palette.edge);
  footLines.forEach((line) => line.setAttribute('stroke', palette.edge));
  crackle?.setAttribute('stroke', palette.edge);
  poster.dataset.tone = craft.tone;
  svg?.setAttribute('aria-label', `你完成的${craft.name}瓷瓶`);

  const stage = document.querySelector<HTMLElement>('[data-result-stage]');
  stage?.style.setProperty('--result-accent', craft.glaze.accent);
  return craft;
}

function updateResultContext() {
  const journey = loadJourney();
  const craft = applyCraftToPoster(journey.craft ?? 'qinghua');
  const shape = journey.shape?.presetLabel ?? '梅瓶';

  const set = (selector: string, value: string) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  set('[data-result-field="shape"]', shape);
  set('[data-result-field="glaze"]', `${craft.name} · ${craft.subtitle}`);
  set('[data-result-field="temp"]', `${craft.tempLabel} · ${craft.atmosphere}`);
  set('[data-result-name]', `${shape} · ${craft.name}`);
  set('[data-result-plaque]', `${craft.tempLabel} · ${craft.atmosphere} · 数字器物`);
}

function updateMemory() {
  const journey = loadJourney();
  const recap = buildRecap(journey);
  const memory = document.querySelector<HTMLElement>('[data-memory]');
  if (!memory) return recap;

  const set = (selector: string, value: string) => {
    const element = memory.querySelector<HTMLElement>(selector);
    if (element) element.textContent = value;
  };

  const memoryCraft = crafts.find((item) => item.id === journey.craft);
  set('[data-memory-persona]', recap.title);
  set('[data-memory-persona-note]', recap.personaNote);
  set('[data-memory-shape]', journey.shape?.presetLabel ?? '未定器型');
  set('[data-memory-craft]', memoryCraft?.name ?? '未择釉');
  set('[data-memory-count]', String(recap.count));
  set('[data-memory-duration]', recap.durationLabel);
  set('[data-memory-score]', recap.count ? `${recap.total} 分` : '—');
  set('[data-memory-date]', formatDate(journey.startedAt));
  set('[data-memory-id]', journey.id);

  const title = memory.querySelector<HTMLElement>('#memory-title');
  if (title) {
    title.innerHTML = recap.complete ? '五印落定，<br />此行有记。' : '此行未竟，<br />亦已成器。';
  }

  const narrative = memory.querySelector<HTMLElement>('[data-memory-narrative]');
  if (narrative) {
    narrative.replaceChildren(
      ...recap.narrative.map((line) => {
        const item = document.createElement('li');
        item.textContent = line;
        return item;
      }),
    );
  }

  JOURNEY_STAGES.forEach((stage) => {
    const stop = memory.querySelector<HTMLElement>(`[data-memory-stage="${stage.id}"]`);
    if (!stop) return;
    const record = journey.stages[stage.id];
    stop.classList.toggle('is-filled', !!record);
    const score = stop.querySelector<HTMLElement>('[data-memory-stage-score]');
    const note = stop.querySelector<HTMLElement>('[data-memory-stage-note]');
    if (score) score.textContent = record ? `${record.score} 分` : '未落印';
    if (note) note.textContent = record ? record.note : stage.hint;
  });

  memory.dataset.recap = JSON.stringify({
    title: recap.title,
    count: recap.count,
    total: recap.total,
  });

  return recap;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = 3,
): string[] {
  const lines: string[] = [];
  let current = '';
  for (const char of Array.from(text)) {
    const next = current + char;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = char;
      if (lines.length >= maxLines) break;
    } else {
      current = next;
    }
  }
  if (lines.length < maxLines && current) lines.push(current);
  return lines;
}

async function buildMemoryCard(recap: JourneyRecap) {
  const poster = document.querySelector<HTMLElement>('[data-vessel-poster]');
  const svg = poster?.querySelector('svg');
  await document.fonts.ready.catch(() => undefined);

  const width = 1200;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('missing canvas');

  const serif = '"Noto Serif SC Variable", "Songti SC", "STSong", serif';
  const sans = '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif';
  const latin = '"EB Garamond Variable", "Times New Roman", serif';

  ctx.fillStyle = '#f3eee4';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(27, 24, 19, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(42, 42, width - 84, height - 84);
  ctx.strokeStyle = 'rgba(27, 24, 19, 0.08)';
  ctx.strokeRect(54, 54, width - 108, height - 108);

  ctx.strokeStyle = 'rgba(184, 97, 58, 0.18)';
  ctx.beginPath();
  ctx.moveTo(110, 100);
  ctx.lineTo(110, height - 100);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(27, 24, 19, 0.03)';
  for (let y = 150; y < height - 100; y += 34) {
    ctx.beginPath();
    ctx.moveTo(110, y);
    ctx.lineTo(width - 100, y);
    ctx.stroke();
  }

  ctx.fillStyle = '#7c7365';
  ctx.font = `500 15px ${latin}`;
  ctx.textAlign = 'left';
  ctx.fillText('CIYUN SHUYI  ·  JOURNEY MEMO', 150, 112);

  ctx.fillStyle = '#1b1813';
  ctx.font = `600 46px ${serif}`;
  ctx.fillText('游器手札', 150, 188);

  ctx.fillStyle = '#7c7365';
  ctx.font = `400 18px ${sans}`;
  ctx.fillText(recap.complete ? '五印落定，此行有记。' : '此行未竟，亦已成器。', 152, 224);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#7c7365';
  ctx.font = `500 16px ${latin}`;
  ctx.fillText(formatDate(recap.journey.startedAt), width - 130, 112);
  ctx.fillText(recap.journey.id, width - 130, 138);

  if (svg) {
    try {
      const vessel = await loadSvgImage(svg);
      const imgWidth = 330;
      const imgHeight = (imgWidth * 820) / 600;
      ctx.drawImage(vessel, width - 460, 280, imgWidth, imgHeight);
    } catch {
      // The hand-written card still works without the illustration.
    }
  }

  ctx.textAlign = 'left';
  ctx.fillStyle = '#7c7365';
  ctx.font = `500 14px ${sans}`;
  ctx.fillText('本次游器 · 评语', 150, 306);

  ctx.fillStyle = '#1b1813';
  ctx.font = `500 48px ${serif}`;
  const titleLines = wrapText(ctx, recap.title, 560, 2);
  let titleY = 372;
  titleLines.forEach((line) => {
    ctx.fillText(line, 150, titleY);
    titleY += 64;
  });

  ctx.fillStyle = '#4a443b';
  ctx.font = `400 21px ${serif}`;
  wrapText(ctx, recap.personaNote, 560, 3).forEach((line, index) => {
    ctx.fillText(line, 150, titleY + 18 + index * 34);
  });

  const routeY = 800;
  ctx.strokeStyle = 'rgba(27, 24, 19, 0.2)';
  ctx.setLineDash([4, 7]);
  ctx.beginPath();
  ctx.moveTo(150, routeY);
  ctx.lineTo(width - 150, routeY);
  ctx.stroke();
  ctx.setLineDash([]);

  const stops = JOURNEY_STAGES;
  const stepWidth = (width - 300) / (stops.length - 1);
  stops.forEach((stage, index) => {
    const x = 150 + stepWidth * index;
    const record = recap.journey.stages[stage.id];
    ctx.beginPath();
    ctx.arc(x, routeY - 3, 22, 0, Math.PI * 2);
    ctx.fillStyle = record ? '#b8613a' : '#f3eee4';
    ctx.fill();
    ctx.strokeStyle = record ? '#b8613a' : 'rgba(27, 24, 19, 0.24)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = record ? '#f6efe4' : '#7c7365';
    ctx.font = `500 18px ${serif}`;
    ctx.fillText(stage.stamp, x, routeY + 5);

    ctx.fillStyle = '#1b1813';
    ctx.font = `500 17px ${serif}`;
    ctx.fillText(stage.name, x, routeY + 48);

    ctx.fillStyle = record ? '#b8613a' : '#7c7365';
    ctx.font = `500 13px ${latin}`;
    ctx.fillText(record ? `${record.score}` : '·', x, routeY + 72);
  });

  const notesY = 936;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#7c7365';
  ctx.font = `500 14px ${sans}`;
  ctx.fillText('这一路的注脚', 150, notesY);

  ctx.strokeStyle = 'rgba(124, 154, 139, 0.65)';
  ctx.beginPath();
  ctx.moveTo(150, notesY + 18);
  ctx.lineTo(150, notesY + 188);
  ctx.stroke();

  ctx.fillStyle = '#4a443b';
  ctx.font = `400 20px ${serif}`;
  let noteY = notesY + 34;
  recap.narrative.slice(0, 3).forEach((line) => {
    wrapText(ctx, line, 700, 2).forEach((part) => {
      ctx.fillText(`— ${part}`, 174, noteY);
      noteY += 32;
    });
    noteY += 4;
  });

  const statsY = 1370;
  ctx.strokeStyle = 'rgba(27, 24, 19, 0.16)';
  ctx.beginPath();
  ctx.moveTo(150, statsY);
  ctx.lineTo(width - 150, statsY);
  ctx.stroke();

  const craft = crafts.find((item) => item.id === recap.journey.craft);
  const stats: Array<[string, string]> = [
    ['游印', `${recap.count} / 5`],
    ['时长', recap.durationLabel],
    ['釉色', craft?.name ?? '未定'],
    ['手感均分', recap.count ? `${recap.total}` : '—'],
  ];
  stats.forEach(([label, value], index) => {
    const x = 150 + index * 235;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#7c7365';
    ctx.font = `500 13px ${sans}`;
    ctx.fillText(label, x, statsY + 34);
    ctx.fillStyle = '#1b1813';
    ctx.font = `500 24px ${serif}`;
    ctx.fillText(value, x, statsY + 70);
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#7c7365';
  ctx.font = `400 13px ${sans}`;
  ctx.fillText('数字生成 · 非真实文物 · 只为这一次游器留下记录', width / 2, height - 88);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('memory card export failed');
  return blob;
}

async function buildCard() {
  const poster = document.querySelector<HTMLElement>('[data-vessel-poster]');
  const svg = poster?.querySelector('svg');
  if (!svg) throw new Error('missing poster');

  await document.fonts.ready.catch(() => undefined);
  const vessel = await loadSvgImage(svg);

  const width = 1200;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('missing canvas');

  const serif = '"Noto Serif SC Variable", "Songti SC", "STSong", serif';
  const sans = '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif';
  const latin = '"EB Garamond Variable", "Times New Roman", serif';
  const field = (name: string) =>
    document.querySelector<HTMLElement>(`[data-result-field="${name}"]`)?.textContent?.trim() ?? '';

  ctx.fillStyle = '#f3eee4';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(27, 24, 19, 0.16)';
  ctx.lineWidth = 1;
  ctx.strokeRect(42, 42, width - 84, height - 84);
  ctx.strokeStyle = 'rgba(27, 24, 19, 0.07)';
  ctx.strokeRect(54, 54, width - 108, height - 108);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#7c7365';
  ctx.font = `500 15px ${latin}`;
  ctx.fillText('CIYUN SHUYI  ·  VESSEL RECORD', width / 2, 112);

  ctx.fillStyle = '#1b1813';
  ctx.font = `600 54px ${serif}`;
  ctx.fillText('瓷韵数绎', width / 2, 176);

  ctx.fillStyle = '#4a443b';
  ctx.font = `400 20px ${serif}`;
  ctx.fillText('器 物 档 案', width / 2, 214);

  // seal
  ctx.fillStyle = '#b8613a';
  ctx.fillRect(width - 150, 96, 62, 62);
  ctx.fillStyle = '#f6efe4';
  ctx.font = `600 34px ${serif}`;
  ctx.textAlign = 'center';
  ctx.fillText('瓷', width - 119, 141);

  const imgWidth = 590;
  const imgHeight = (imgWidth * 820) / 600;
  const imgX = (width - imgWidth) / 2;
  const imgY = 260;
  ctx.drawImage(vessel, imgX, imgY, imgWidth, imgHeight);

  ctx.strokeStyle = 'rgba(27, 24, 19, 0.14)';
  ctx.beginPath();
  ctx.moveTo(150, 1140);
  ctx.lineTo(width - 150, 1140);
  ctx.stroke();

  const columns = [
    { x: 150, rows: [['釉色', field('glaze') || '青花钴蓝'], ['窑温', field('temp') || '1320°C · 氧化焰']] },
    { x: 660, rows: [['器型', field('shape') || '梅瓶'], ['编号', field('serial') || 'CY-2026-0001']] },
  ];

  for (const column of columns) {
    let y = 1196;
    for (const [label, value] of column.rows) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#7c7365';
      ctx.font = `500 14px ${sans}`;
      ctx.fillText(label, column.x, y);

      ctx.fillStyle = '#1b1813';
      ctx.font = `500 27px ${serif}`;
      ctx.fillText(value, column.x, y + 38);
      y += 104;
    }
  }

  // vertical motto
  ctx.save();
  ctx.translate(96, 820);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = 'rgba(74, 68, 59, 0.55)';
  ctx.font = `400 16px ${serif}`;
  ctx.textAlign = 'center';
  ctx.fillText('器成于手，亦成于火', 0, 0);
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#7c7365';
  ctx.font = `400 13px ${sans}`;
  ctx.fillText('数字生成 · 非真实文物', width / 2, height - 104);
  ctx.font = `400 13px ${latin}`;
  ctx.fillText('第九届传智杯 · 瓷韵数绎  /  2026', width / 2, height - 78);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('card export failed');
  return blob;
}

function initResult() {
  cleanup?.();
  cleanup = null;
  if (document.body.dataset.page !== 'result') return;

  const downloadBtn = document.querySelector<HTMLButtonElement>('[data-result-download]');
  const shareBtn = document.querySelector<HTMLButtonElement>('[data-result-share]');
  const memoryBtn = document.querySelector<HTMLButtonElement>('[data-memory-download]');
  const regenerateBtn = document.querySelector<HTMLButtonElement>('[data-memory-regenerate]');
  const restartLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-journey-restart]'));

  if (!downloadBtn && !shareBtn && !memoryBtn) return;

  const journeyBefore = loadJourney();
  const priorScores = JOURNEY_STAGES.filter(
    (stage) => stage.id !== 'result' && journeyBefore.stages[stage.id],
  ).map((stage) => journeyBefore.stages[stage.id]?.score ?? 0);
  const resultScore = priorScores.length
    ? Math.round(priorScores.reduce((sum, score) => sum + score, 0) / priorScores.length)
    : 72;
  recordStage(
    'result',
    resultScore,
    priorScores.length >= 4
      ? '五印成谱，这一页手札收住了整次游器。'
      : '窑门开了，留下的印记已经收进手札。',
    { priorStamps: priorScores.length },
  );

  updateResultContext();
  let recap = updateMemory();

  let busy = false;
  let regenerateTimer = 0;

  const download = async (blob: Blob, filename: string, message: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast(message);
  };

  const onDownload = async () => {
    if (busy) return;
    busy = true;
    const label = downloadBtn?.innerHTML ?? '';
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.textContent = '生成中…';
    }

    try {
      const blob = await buildCard();
      await download(blob, '瓷韵数绎-器物卡.png', '器物卡已生成，正在下载。');
    } catch {
      showToast('器物卡生成失败，请稍后再试。');
    } finally {
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = label;
      }
      busy = false;
    }
  };

  const onMemoryDownload = async () => {
    if (busy) return;
    busy = true;
    const label = memoryBtn?.innerHTML ?? '';
    if (memoryBtn) {
      memoryBtn.disabled = true;
      memoryBtn.textContent = '正在收拢这一路…';
    }

    try {
      const current = updateMemory();
      recap = current;
      const blob = await buildMemoryCard(recap);
      await download(blob, '瓷韵数绎-游器回忆.png', '游器回忆卡已生成，正在下载。');
    } catch {
      showToast('回忆卡生成失败，请稍后再试。');
    } finally {
      if (memoryBtn) {
        memoryBtn.disabled = false;
        memoryBtn.innerHTML = label;
      }
      busy = false;
    }
  };

  const onRegenerate = () => {
    window.clearTimeout(regenerateTimer);
    const memory = document.querySelector<HTMLElement>('[data-memory]');
    memory?.classList.add('is-generating');
    regenerateTimer = window.setTimeout(() => {
      recap = updateMemory();
      memory?.classList.remove('is-generating');
      showToast('手札已按这一次的印记重新生成。');
    }, 520);
  };

  const onShare = async () => {
    const ok = await copyText(location.href);
    showToast(ok ? '链接已复制，可以分享给朋友了。' : '复制失败，请从浏览器地址栏复制。');
  };

  const onRestart = () => {
    resetJourney();
  };

  downloadBtn?.addEventListener('click', onDownload);
  memoryBtn?.addEventListener('click', onMemoryDownload);
  regenerateBtn?.addEventListener('click', onRegenerate);
  shareBtn?.addEventListener('click', onShare);
  restartLinks.forEach((link) => link.addEventListener('click', onRestart));

  cleanup = () => {
    window.clearTimeout(regenerateTimer);
    downloadBtn?.removeEventListener('click', onDownload);
    memoryBtn?.removeEventListener('click', onMemoryDownload);
    regenerateBtn?.removeEventListener('click', onRegenerate);
    shareBtn?.removeEventListener('click', onShare);
    restartLinks.forEach((link) => link.removeEventListener('click', onRestart));
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'result') initResult();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initResult();
