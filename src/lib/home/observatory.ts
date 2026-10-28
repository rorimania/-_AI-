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
  const annotationLayer = document.querySelector<HTMLElement>('[data-vessel-annotations]');
  const callouts = Array.from(document.querySelectorAll<HTMLElement>('[data-callout]'));
  const annotationGroups = Array.from(
    document.querySelectorAll<SVGGElement>('[data-annotation-group]'),
  );
  const annotationPaths = new Map<string, SVGPathElement>();
  const annotationDots = new Map<string, SVGCircleElement>();

  annotationGroups.forEach((group) => {
    const id = group.dataset.annotationGroup;
    if (!id) return;
    const path = group.querySelector<SVGPathElement>('[data-annotation-line]');
    const dot = group.querySelector<SVGCircleElement>('[data-annotation-dot]');
    if (path) annotationPaths.set(id, path);
    if (dot) annotationDots.set(id, dot);
  });

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

    callouts.forEach((item) => {
      item.classList.toggle('is-active', !!id && item.dataset.callout === id);
    });
    stage.classList.toggle('has-active-callout', !!id);
    annotationGroups.forEach((group) => {
      group.classList.toggle('is-active', !!id && group.dataset.annotationGroup === id);
    });

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

  const onAnchors = (event: Event) => {
    if (!annotationLayer) return;
    const detail = (event as CustomEvent<{
      anchors?: Array<{ id: string; x: number; y: number; visible: boolean }>;
    }>).detail;
    if (!detail?.anchors?.length) return;

    const layerRect = annotationLayer.getBoundingClientRect();

    for (const anchor of detail.anchors) {
      const group = annotationGroups.find((item) => item.dataset.annotationGroup === anchor.id);
      const label = callouts.find((item) => item.dataset.callout === anchor.id);
      if (!group || !label) continue;

      const labelVisible = label.offsetParent !== null;
      group.classList.toggle('is-hidden', !labelVisible || !anchor.visible);
      if (!labelVisible || !anchor.visible) continue;

      const labelRect = label.getBoundingClientRect();
      const targetX = labelRect.left - layerRect.left;
      const targetY = labelRect.top - layerRect.top + labelRect.height / 2;
      const startX = anchor.x;
      const startY = anchor.y;
      const direction = targetX >= startX ? 1 : -1;
      const c1x = startX + (targetX - startX) * 0.44 * direction;
      const c2x = targetX - (targetX - startX) * 0.28 * direction;
      const path = annotationPaths.get(anchor.id);
      const dot = annotationDots.get(anchor.id);

      if (path) {
        path.setAttribute(
          'd',
          `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${c1x.toFixed(1)} ${startY.toFixed(
            1,
          )}, ${c2x.toFixed(1)} ${targetY.toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`,
        );
      }
      if (dot) {
        dot.setAttribute('cx', startX.toFixed(1));
        dot.setAttribute('cy', startY.toFixed(1));
      }
    }

    stage.classList.add('is-annotated');
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  document.addEventListener('ciyun:observe-request', onRequest);
  document.addEventListener('ciyun:vessel-anchors', onAnchors);

  update();

  return () => {
    if (disposed) return;
    disposed = true;
    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);
    document.removeEventListener('ciyun:observe-request', onRequest);
    document.removeEventListener('ciyun:vessel-anchors', onAnchors);
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };
}
