import { showToast } from './app';

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
  if (!downloadBtn && !shareBtn) return;

  let busy = false;

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
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = '瓷韵数绎-器物卡.png';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      showToast('器物卡已生成，正在下载。');
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

  const onShare = async () => {
    const ok = await copyText(location.href);
    showToast(ok ? '链接已复制，可以分享给朋友了。' : '复制失败，请从浏览器地址栏复制。');
  };

  downloadBtn?.addEventListener('click', onDownload);
  shareBtn?.addEventListener('click', onShare);

  cleanup = () => {
    downloadBtn?.removeEventListener('click', onDownload);
    shareBtn?.removeEventListener('click', onShare);
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
