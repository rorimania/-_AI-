let cleanup: (() => void) | null = null;
let initToken = 0;

function initGallery() {
  const token = ++initToken;
  cleanup?.();
  cleanup = null;
  if (document.body.dataset.page !== 'home') return;

  const root = document.querySelector<HTMLElement>('[data-gallery]');
  const stage = document.querySelector<HTMLElement>('[data-gallery-stage]');
  const cards = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-gallery-card]'));
  const dots = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-gallery-dot]'));
  const prev = document.querySelector<HTMLButtonElement>('[data-gallery-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-gallery-next]');
  const current = document.querySelector<HTMLElement>('[data-gallery-current]');
  const name = document.querySelector<HTMLElement>('[data-gallery-name]');
  const preview = document.querySelector<HTMLDialogElement>('[data-gallery-preview]');
  const previewClose = document.querySelector<HTMLButtonElement>('[data-gallery-preview-close]');
  const previewImage = document.querySelector<HTMLImageElement>('[data-gallery-preview-image]');
  const previewIndex = document.querySelector<HTMLElement>('[data-gallery-preview-index]');
  const previewTitle = document.querySelector<HTMLElement>('[data-gallery-preview-title]');
  const previewEn = document.querySelector<HTMLElement>('[data-gallery-preview-en]');
  const previewEra = document.querySelector<HTMLElement>('[data-gallery-preview-era]');
  const previewNote = document.querySelector<HTMLElement>('[data-gallery-preview-note]');
  if (!root || !stage || !cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = cards.length;
  const half = Math.floor(count / 2);
  let active = 0;
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragDelta = 0;
  let suppressClick = false;
  let autoTimer = 0;
  let paused = false;
  let inView = false;
  let hoverX = 0;
  let hoverAccum = 0;
  let hoverCooldown = 0;
  let wheelCooldown = 0;

  const offsetFor = (index: number, anchor: number) => {
    let offset = index - anchor;
    if (offset > half) offset -= count;
    if (offset < -half) offset += count;
    return offset;
  };

  const slideName = (index: number) =>
    cards[index]?.dataset.title ??
    cards[index]?.querySelector<HTMLElement>('.gallery-card__title')?.textContent?.trim() ??
    cards[index]?.getAttribute('aria-label')?.replace('预览', '') ??
    '';

  const setActive = (index: number, options: { focus?: boolean } = {}) => {
    active = ((index % count) + count) % count;
    cards.forEach((card, cardIndex) => {
      const offset = offsetFor(cardIndex, active);
      const abs = Math.abs(offset);
      card.style.setProperty('--offset', String(offset));
      card.style.setProperty('--abs', String(abs));
      card.classList.toggle('is-active', offset === 0);
      card.setAttribute('aria-hidden', String(offset !== 0));
      card.tabIndex = offset === 0 ? 0 : -1;
    });

    dots.forEach((dot, dotIndex) => {
      const selected = dotIndex === active;
      dot.classList.toggle('is-active', selected);
      dot.setAttribute('aria-current', selected ? 'true' : 'false');
    });

    if (current) current.textContent = String(active + 1).padStart(2, '0');
    if (name) name.textContent = slideName(active);
    root.dataset.active = String(active);

    if (options.focus) cards[active]?.focus({ preventScroll: true });
  };

  const announce = () => {
    if (name) name.textContent = slideName(active);
  };

  const go = (direction: number) => {
    setActive(active + direction);
    announce();
    restartAuto();
  };

  const restartAuto = () => {
    window.clearInterval(autoTimer);
    if (reduceMotion || paused || !inView) return;
    autoTimer = window.setInterval(() => setActive(active + 1), 10000);
  };

  const onPrev = () => go(-1);
  const onNext = () => go(1);

  const onDot = (event: Event) => {
    const dot = event.currentTarget as HTMLButtonElement;
    const index = Number(dot.dataset.galleryDot);
    if (!Number.isFinite(index)) return;
    setActive(index);
    announce();
    restartAuto();
  };

  const openPreview = (index: number) => {
    if (!preview || !previewImage) return;
    const card = cards[index];
    const source = card?.dataset.preview || card?.querySelector<HTMLImageElement>('img')?.src;
    if (!source) return;

    setActive(index);
    announce();
    paused = true;
    window.clearInterval(autoTimer);

    previewImage.src = source;
    previewImage.alt = card.querySelector<HTMLImageElement>('img')?.alt ?? card.dataset.title ?? '';
    if (previewIndex) {
      previewIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
    }
    if (previewTitle) previewTitle.textContent = card.dataset.title ?? '';
    if (previewEn) previewEn.textContent = card.dataset.en ?? '';
    if (previewEra) previewEra.textContent = card.dataset.era ?? '';
    if (previewNote) previewNote.textContent = card.dataset.note ?? '';

    if (!preview.open) preview.showModal();
    previewClose?.focus({ preventScroll: true });
  };

  const closePreview = () => {
    if (preview?.open) preview.close();
  };

  const onPreviewClose = () => {
    paused = false;
    restartAuto();
    cards[active]?.focus({ preventScroll: true });
  };

  const onPreviewBackdrop = (event: MouseEvent) => {
    if (event.target === preview) closePreview();
  };

  const onCard = (event: Event) => {
    if (suppressClick) return;
    const card = event.currentTarget as HTMLButtonElement;
    const index = Number(card.dataset.galleryIndex);
    if (!Number.isFinite(index)) return;
    openPreview(index);
  };

  const onStageEnter = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') hoverX = event.clientX;
    hoverAccum = 0;
  };

  const onHoverMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || event.buttons !== 0 || dragging || preview?.open) return;
    const dx = event.clientX - hoverX;
    hoverX = event.clientX;

    if (Math.abs(dx) > 40) {
      hoverAccum = 0;
      return;
    }
    if (Math.sign(dx) !== Math.sign(hoverAccum)) hoverAccum = 0;
    hoverAccum += dx;

    if (Math.abs(hoverAccum) < 120) return;
    if (performance.now() < hoverCooldown) return;

    go(hoverAccum > 0 ? -1 : 1);
    hoverAccum = 0;
    hoverCooldown = performance.now() + 520;
  };

  const onStageLeave = () => {
    hoverX = 0;
    hoverAccum = 0;
  };

  const onWheel = (event: WheelEvent) => {
    if (preview?.open) return;
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.2) return;
    if (Math.abs(event.deltaX) < 4) return;
    event.preventDefault();
    if (performance.now() < wheelCooldown) return;
    go(event.deltaX > 0 ? 1 : -1);
    wheelCooldown = performance.now() + 500;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    dragging = true;
    suppressClick = false;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragDelta = 0;
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    const dx = event.clientX - dragStartX;
    const dy = event.clientY - dragStartY;
    if (Math.abs(dx) < 8) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      dragDelta = dx;
      event.preventDefault();
    }
  };

  const finishDrag = () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(dragDelta) > 42) {
      suppressClick = true;
      go(dragDelta > 0 ? -1 : 1);
      window.setTimeout(() => {
        suppressClick = false;
      }, 0);
    }
    dragDelta = 0;
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
      restartAuto();
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(count - 1);
      restartAuto();
    }
  };

  const pause = () => {
    paused = true;
    window.clearInterval(autoTimer);
  };

  const resume = () => {
    paused = false;
    restartAuto();
  };

  const onFocusOut = (event: FocusEvent) => {
    if (root.contains(event.relatedTarget as Node | null)) return;
    resume();
  };

  const onVisibility = () => {
    if (document.hidden) pause();
    else resume();
  };

  prev?.addEventListener('click', onPrev);
  next?.addEventListener('click', onNext);
  dots.forEach((dot) => dot.addEventListener('click', onDot));
  cards.forEach((card) => card.addEventListener('click', onCard));
  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointermove', onHoverMove);
  stage.addEventListener('pointerenter', onStageEnter);
  stage.addEventListener('pointerleave', onStageLeave);
  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);
  root.addEventListener('wheel', onWheel, { passive: false });
  root.addEventListener('keydown', onKey);
  root.addEventListener('pointerenter', pause);
  root.addEventListener('pointerleave', resume);
  root.addEventListener('focusin', pause);
  root.addEventListener('focusout', onFocusOut);
  previewClose?.addEventListener('click', closePreview);
  preview?.addEventListener('close', onPreviewClose);
  preview?.addEventListener('click', onPreviewBackdrop);
  document.addEventListener('visibilitychange', onVisibility);

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      inView = entries[0]?.isIntersecting ?? false;
      if (inView) restartAuto();
      else window.clearInterval(autoTimer);
    },
    { threshold: 0.24 },
  );
  visibilityObserver.observe(root);

  setActive(0);

  if (token !== initToken) return;

  cleanup = () => {
    window.clearInterval(autoTimer);
    visibilityObserver.disconnect();
    prev?.removeEventListener('click', onPrev);
    next?.removeEventListener('click', onNext);
    dots.forEach((dot) => dot.removeEventListener('click', onDot));
    cards.forEach((card) => card.removeEventListener('click', onCard));
    stage.removeEventListener('pointerdown', onPointerDown);
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointermove', onHoverMove);
    stage.removeEventListener('pointerenter', onStageEnter);
    stage.removeEventListener('pointerleave', onStageLeave);
    stage.removeEventListener('pointerup', finishDrag);
    stage.removeEventListener('pointercancel', finishDrag);
    root.removeEventListener('wheel', onWheel);
    root.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerenter', pause);
    root.removeEventListener('pointerleave', resume);
    root.removeEventListener('focusin', pause);
    root.removeEventListener('focusout', onFocusOut);
    previewClose?.removeEventListener('click', closePreview);
    preview?.removeEventListener('close', onPreviewClose);
    preview?.removeEventListener('click', onPreviewBackdrop);
    document.removeEventListener('visibilitychange', onVisibility);
    closePreview();
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'home') initGallery();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initGallery();

export {};
