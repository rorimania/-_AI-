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

  const offsetFor = (index: number, anchor: number) => {
    let offset = index - anchor;
    if (offset > half) offset -= count;
    if (offset < -half) offset += count;
    return offset;
  };

  const slideName = (index: number) =>
    cards[index]?.querySelector<HTMLElement>('.gallery-card__title')?.textContent?.trim() ??
    cards[index]?.getAttribute('aria-label')?.replace('查看', '') ??
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
    autoTimer = window.setInterval(() => setActive(active + 1), 6200);
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

  const onCard = (event: Event) => {
    if (suppressClick) return;
    const card = event.currentTarget as HTMLButtonElement;
    const index = Number(card.dataset.galleryIndex);
    if (!Number.isFinite(index) || index === active) return;
    setActive(index);
    announce();
    restartAuto();
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
  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);
  root.addEventListener('keydown', onKey);
  root.addEventListener('pointerenter', pause);
  root.addEventListener('pointerleave', resume);
  root.addEventListener('focusin', pause);
  root.addEventListener('focusout', onFocusOut);
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
    stage.removeEventListener('pointerup', finishDrag);
    stage.removeEventListener('pointercancel', finishDrag);
    root.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerenter', pause);
    root.removeEventListener('pointerleave', resume);
    root.removeEventListener('focusin', pause);
    root.removeEventListener('focusout', onFocusOut);
    document.removeEventListener('visibilitychange', onVisibility);
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
