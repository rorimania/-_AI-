interface ChapterElement extends HTMLElement {
  dataset: DOMStringMap & {
    chapterId?: string;
    chapterName?: string;
    chapterEn?: string;
  };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Scroll narrative controller for the home page.
 *
 * Publishes `state`, a continuous number from -1 (hero, whole vessel)
 * to 0..4 (the five parts). The 3D scene listens to `ciyun:observe`.
 * Also keeps the DOM labels, caption and SVG fallback in sync.
 */
export function mountObservatory(): () => void {
  if (document.body.dataset.page !== 'home') return () => {};

  const stage = document.querySelector<HTMLElement>('[data-vessel-stage]');
  const poster = document.querySelector<HTMLElement>('[data-vessel-poster]');
  const indexEl = document.querySelector<HTMLElement>('[data-stage-index]');
  const nameEl = document.querySelector<HTMLElement>('[data-stage-name]');
  const enEl = document.querySelector<HTMLElement>('[data-stage-en]');
  const chapters = Array.from(document.querySelectorAll<ChapterElement>('[data-chapter]'));

  if (!stage || !poster || !chapters.length) return () => {};

  let activeId: string | null = null;
  let lastState = Number.NaN;
  let frame = 0;
  let disposed = false;

  const applyChapter = (chapter: ChapterElement | null) => {
    const id = chapter?.dataset.chapterId ?? null;
    if (id === activeId) return;
    activeId = id;

    if (id) poster.dataset.active = id;
    else delete poster.dataset.active;

    if (indexEl) {
      indexEl.textContent =
        chapter?.querySelector('.chapter__num')?.textContent?.trim() ?? '器';
    }
    if (nameEl) nameEl.textContent = chapter?.dataset.chapterName ?? '观器';
    if (enEl) enEl.textContent = chapter?.dataset.chapterEn ?? 'Observe the vessel';

    chapters.forEach((item) => item.classList.toggle('is-active', item === chapter));

    document.dispatchEvent(
      new CustomEvent('ciyun:chapter', {
        detail: { id: id ?? 'intro', name: chapter?.dataset.chapterName ?? '观器' },
      }),
    );
  };

  const anchors = () => {
    const scrollY = window.scrollY;
    const viewportCenter = window.innerHeight / 2;
    return chapters.map((chapter) => {
      const rect = chapter.getBoundingClientRect();
      return rect.top + scrollY + rect.height / 2 - viewportCenter;
    });
  };

  const emit = (state: number) => {
    if (Number.isFinite(lastState) && Math.abs(state - lastState) < 0.0005) return;
    lastState = state;
    document.dispatchEvent(
      new CustomEvent('ciyun:observe', {
        detail: { state, progress: clamp((state + 1) / 5, 0, 1) },
      }),
    );
  };

  const update = () => {
    if (disposed) return;

    const scrollY = window.scrollY;
    const points = anchors();
    const first = Math.max(1, points[0]);
    let state = -1;

    if (scrollY <= first) {
      state = -1 + clamp(scrollY / first, 0, 1);
    } else if (scrollY >= points[points.length - 1]) {
      state = points.length - 1;
    } else {
      for (let i = 0; i < points.length - 1; i += 1) {
        if (scrollY < points[i + 1]) {
          const span = Math.max(1, points[i + 1] - points[i]);
          state = i + clamp((scrollY - points[i]) / span, 0, 1);
          break;
        }
      }
    }

    stage.dataset.observeState = state.toFixed(3);
    const activeIndex = state < -0.25 ? -1 : Math.round(clamp(state, 0, chapters.length - 1));
    applyChapter(activeIndex >= 0 ? chapters[activeIndex] : null);
    emit(state);
  };

  const requestUpdate = () => {
    if (disposed) return;
    update();
  };

  const onRequest = () => {
    lastState = Number.NaN;
    update();
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  document.addEventListener('ciyun:observe-request', onRequest);

  update();

  return () => {
    if (disposed) return;
    disposed = true;
    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);
    document.removeEventListener('ciyun:observe-request', onRequest);
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };
}
