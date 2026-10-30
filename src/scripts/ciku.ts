interface CikuImage {
  src: string;
  card: string;
  alt: string;
}

interface CikuItem {
  id: string;
  title: string;
  dynasty: string;
  culture: string;
  era: string;
  dimensions: string;
  description: string;
  images: CikuImage[];
  dpmId: string;
  source: string;
}

interface CikuCategory {
  id: string;
  num: string;
  name: string;
  en: string;
  items: CikuItem[];
}

interface CikuEntry {
  item: CikuItem;
  category: CikuCategory;
  index: number;
}

let cleanup: (() => void) | null = null;
let initToken = 0;

const pad = (value: number) => String(value).padStart(2, '0');

function initCiku() {
  const token = ++initToken;
  cleanup?.();
  cleanup = null;

  if (document.body.dataset.page !== 'ciku') return;

  const dataEl = document.querySelector<HTMLScriptElement>('[data-ciku-data]');
  const dialog = document.querySelector<HTMLDialogElement>('[data-ciku-dialog]');
  const rail = document.querySelector<HTMLElement>('[data-ciku-rail]');
  const railList = document.querySelector<HTMLElement>('[data-ciku-rail-list]');
  const railCurrent = document.querySelector<HTMLElement>('[data-ciku-rail-current]');
  const railLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-ciku-rail-link]'),
  );
  const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-ciku-chapter]'));
  const closeBtn = dialog?.querySelector<HTMLButtonElement>('[data-ciku-close]') ?? null;
  const prevBtn = dialog?.querySelector<HTMLButtonElement>('[data-ciku-prev]') ?? null;
  const nextBtn = dialog?.querySelector<HTMLButtonElement>('[data-ciku-next]') ?? null;
  const imageEl = dialog?.querySelector<HTMLImageElement>('[data-ciku-dialog-image]') ?? null;
  const emptyEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-empty]') ?? null;
  const thumbsEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-thumbs]') ?? null;
  const hintEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-hint]') ?? null;
  const categoryEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-cat]') ?? null;
  const titleEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-title]') ?? null;
  const eraEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-era]') ?? null;
  const ageEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-age]') ?? null;
  const dimsEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-dims]') ?? null;
  const idEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-id]') ?? null;
  const descEl = dialog?.querySelector<HTMLElement>('[data-ciku-dialog-desc]') ?? null;
  const sourceEl = dialog?.querySelector<HTMLAnchorElement>('[data-ciku-dialog-source]') ?? null;
  const positionEl = dialog?.querySelector<HTMLElement>('[data-ciku-position]') ?? null;

  if (!dataEl || !dialog || !chapters.length) return;

  let categories: CikuCategory[];
  try {
    categories = JSON.parse(dataEl.textContent ?? '[]') as CikuCategory[];
  } catch (error) {
    console.error('[ciyun] ciku data parse failed', error);
    return;
  }

  const entryById = new Map<string, CikuEntry>();
  categories.forEach((category) => {
    category.items.forEach((item, index) => {
      entryById.set(item.id, { item, category, index });
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current: CikuEntry | null = null;
  let lastTrigger: HTMLElement | null = null;
  let activeId = '';
  let updateFrame = 0;

  function scrollRailTo(id: string) {
    if (!railList) return;
    const link = railLinks.find((item) => item.dataset.cikuRailLink === id);
    if (!link) return;

    const listRect = railList.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const inset = 22;
    if (linkRect.left >= listRect.left + inset && linkRect.right <= listRect.right - inset) return;

    railList.scrollTo({
      left: railList.scrollLeft + (linkRect.left - listRect.left) - inset,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }

  function setActive(id: string, scroll = false) {
    const category = categories.find((item) => item.id === id);
    if (!category) return;

    if (id !== activeId) {
      activeId = id;
      railLinks.forEach((link) => {
        const selected = link.dataset.cikuRailLink === id;
        link.classList.toggle('is-active', selected);
        if (selected) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
      if (railCurrent) railCurrent.textContent = category.num;
    }

    if (scroll) scrollRailTo(id);
  }

  function updateActive() {
    const rootStyles = getComputedStyle(document.documentElement);
    const navHeight = Number.parseFloat(rootStyles.getPropertyValue('--nav-h')) || 78;
    const railHeight = rail?.getBoundingClientRect().height ?? 54;
    const threshold = navHeight + railHeight + 64;

    let id = chapters[0]?.dataset.cikuChapter ?? '';
    for (const chapter of chapters) {
      if (chapter.getBoundingClientRect().top <= threshold) {
        id = chapter.dataset.cikuChapter ?? id;
      }
    }

    const documentEl = document.documentElement;
    if (window.scrollY + window.innerHeight >= documentEl.scrollHeight - 8) {
      id = chapters[chapters.length - 1]?.dataset.cikuChapter ?? id;
    }

    setActive(id, true);
  }

  function requestActiveUpdate() {
    if (updateFrame) return;
    updateFrame = window.requestAnimationFrame(() => {
      updateFrame = 0;
      updateActive();
    });
  }

  function buildThumbs(item: CikuItem, active: number) {
    if (!thumbsEl) return;
    thumbsEl.replaceChildren();

    if (item.images.length < 2) {
      thumbsEl.hidden = true;
      return;
    }

    thumbsEl.hidden = false;
    item.images.forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ciku-dialog__thumb';
      button.setAttribute('aria-label', `查看图 ${index + 1}`);
      button.setAttribute('aria-pressed', String(index === active));
      if (index === active) button.classList.add('is-active');

      const thumb = document.createElement('img');
      thumb.src = image.card;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      button.append(thumb);
      button.addEventListener('click', () => setImage(index));
      thumbsEl.append(button);
    });
  }

  function setImage(index: number) {
    if (!current || !imageEl || !emptyEl) return;
    const images = current.item.images;

    if (!images.length) {
      imageEl.hidden = true;
      imageEl.removeAttribute('src');
      imageEl.alt = '';
      emptyEl.hidden = false;
      if (thumbsEl) thumbsEl.hidden = true;
      if (hintEl) hintEl.textContent = '暂无图像 · No image';
      return;
    }

    const image = images[Math.max(0, Math.min(index, images.length - 1))];
    imageEl.hidden = false;
    emptyEl.hidden = true;
    imageEl.src = image.src;
    imageEl.alt = image.alt;
    if (hintEl) hintEl.textContent = `图 ${pad(index + 1)} / ${pad(images.length)}`;

    thumbsEl?.querySelectorAll<HTMLButtonElement>('.ciku-dialog__thumb').forEach((thumb, i) => {
      const selected = i === index;
      thumb.classList.toggle('is-active', selected);
      thumb.setAttribute('aria-pressed', String(selected));
    });
  }

  function render(entry: CikuEntry) {
    current = entry;
    const { item, category, index } = entry;
    const era = [item.dynasty, item.culture].filter(Boolean).join(' · ') || item.era;

    if (categoryEl) categoryEl.textContent = `${category.num} · ${category.name} · ${category.en}`;
    if (titleEl) titleEl.textContent = item.title;
    if (eraEl) eraEl.textContent = era;
    if (ageEl) ageEl.textContent = item.era || '—';
    if (dimsEl) dimsEl.textContent = item.dimensions || '尺寸未详';
    if (idEl) idEl.textContent = `DPM · ${item.dpmId}`;
    if (descEl) descEl.textContent = item.description || '暂无文字说明。';
    if (sourceEl) sourceEl.href = item.source;
    if (positionEl) {
      positionEl.textContent = `${pad(index + 1)} / ${pad(category.items.length)}`;
    }

    buildThumbs(item, 0);
    setImage(0);
  }

  function openEntry(id: string, trigger: HTMLElement | null) {
    const entry = entryById.get(id);
    if (!entry || !dialog) return;

    lastTrigger = trigger;
    render(entry);
    if (!dialog.open) dialog.showModal();
    closeBtn?.focus({ preventScroll: true });
  }

  function closeDialog() {
    if (dialog?.open) dialog.close();
  }

  function move(direction: number) {
    if (!current) return;
    const items = current.category.items;
    if (!items.length) return;
    const nextIndex = (current.index + direction + items.length) % items.length;
    const next = entryById.get(items[nextIndex].id);
    if (next) render(next);
  }

  function onDocumentClick(event: MouseEvent) {
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-ciku-open]');
    if (!trigger) return;

    const id = trigger.dataset.cikuOpen;
    if (!id) return;

    event.preventDefault();
    openEntry(id, trigger);
  }

  function onRailClick(event: MouseEvent) {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
      '[data-ciku-rail-link]',
    );
    const id = link?.dataset.cikuRailLink;
    if (id) setActive(id, true);
  }

  function onDialogClick(event: MouseEvent) {
    if (event.target === dialog) closeDialog();
  }

  function onDialogKeydown(event: KeyboardEvent) {
    if (!dialog?.open) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  }

  function onDialogClose() {
    const trigger = lastTrigger;
    lastTrigger = null;
    current = null;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  }

  function onHashChange() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (chapters.some((chapter) => chapter.dataset.cikuChapter === id)) {
      setActive(id, true);
    }
  }

  const onPrev = () => move(-1);
  const onNext = () => move(1);

  document.addEventListener('click', onDocumentClick);
  rail?.addEventListener('click', onRailClick);
  closeBtn?.addEventListener('click', closeDialog);
  prevBtn?.addEventListener('click', onPrev);
  nextBtn?.addEventListener('click', onNext);
  dialog.addEventListener('click', onDialogClick);
  dialog.addEventListener('keydown', onDialogKeydown);
  dialog.addEventListener('close', onDialogClose);
  window.addEventListener('scroll', requestActiveUpdate, { passive: true });
  window.addEventListener('resize', requestActiveUpdate);
  window.addEventListener('hashchange', onHashChange);

  const initialHash = decodeURIComponent(location.hash.slice(1));
  if (chapters.some((chapter) => chapter.dataset.cikuChapter === initialHash)) {
    setActive(initialHash);
  } else if (chapters[0]?.dataset.cikuChapter) {
    setActive(chapters[0].dataset.cikuChapter);
  }
  requestActiveUpdate();

  if (token !== initToken) return;

  cleanup = () => {
    if (updateFrame) {
      window.cancelAnimationFrame(updateFrame);
      updateFrame = 0;
    }
    document.removeEventListener('click', onDocumentClick);
    rail?.removeEventListener('click', onRailClick);
    closeBtn?.removeEventListener('click', closeDialog);
    prevBtn?.removeEventListener('click', onPrev);
    nextBtn?.removeEventListener('click', onNext);
    dialog.removeEventListener('click', onDialogClick);
    dialog.removeEventListener('keydown', onDialogKeydown);
    dialog.removeEventListener('close', onDialogClose);
    window.removeEventListener('scroll', requestActiveUpdate);
    window.removeEventListener('resize', requestActiveUpdate);
    window.removeEventListener('hashchange', onHashChange);
    if (dialog.open) dialog.close();
    current = null;
    lastTrigger = null;
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'ciku') initCiku();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initCiku();

export {};
