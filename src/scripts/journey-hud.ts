import {
  JOURNEY_STAGES,
  completion,
  formatDuration,
  loadJourney,
  resetJourney,
  type Journey,
} from '../lib/journey';

let cleanup: (() => void) | null = null;

function initJourneyHud() {
  cleanup?.();
  cleanup = null;

  const hud = document.querySelector<HTMLElement>('[data-journey-hud]');
  if (!hud) return;

  const toggle = hud.querySelector<HTMLButtonElement>('[data-journey-toggle]');
  const panel = hud.querySelector<HTMLElement>('[data-journey-panel]');
  const close = hud.querySelector<HTMLButtonElement>('[data-journey-close]');
  const reset = hud.querySelector<HTMLButtonElement>('[data-journey-reset]');
  const bar = hud.querySelector<HTMLElement>('[data-journey-bar]');
  const time = hud.querySelector<HTMLElement>('[data-journey-time]');
  const nudge = hud.querySelector<HTMLElement>('[data-journey-nudge]');
  const current = hud.dataset.currentStage ?? document.body.dataset.page ?? '';

  if (!toggle || !panel) return;

  let resetArmed = false;
  let nudgeTimer = 0;

  const render = (journey: Journey) => {
    const state = completion(journey);
    document.querySelectorAll<HTMLElement>('[data-journey-count]').forEach((element) => {
      element.textContent = `${state.count} / ${JOURNEY_STAGES.length}`;
    });
    if (bar) bar.style.width = `${(state.count / JOURNEY_STAGES.length) * 100}%`;
    if (time) time.textContent = formatDuration(Date.now() - journey.startedAt);

    document.querySelectorAll<HTMLElement>('[data-journey-step]').forEach((step) => {
      step.classList.toggle('is-stamped', !!journey.stages[step.dataset.journeyStep as keyof Journey['stages']]);
    });

    JOURNEY_STAGES.forEach((stage) => {
      const row = hud.querySelector<HTMLElement>(`[data-journey-stage="${stage.id}"]`);
      if (!row) return;
      const record = journey.stages[stage.id];
      row.classList.toggle('is-done', !!record);
      row.classList.toggle('is-current', stage.id === current && !record);
      const score = row.querySelector<HTMLElement>('[data-stage-score]');
      const note = row.querySelector<HTMLElement>('[data-stage-note]');
      if (score) score.textContent = record ? `${record.score} 分` : '未落印';
      if (note) note.textContent = record ? record.note : stage.hint;
    });

    hud.classList.toggle('is-complete', state.complete);
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        state.count ? `打开游器谱，已落 ${state.count} 枚印` : '打开游器谱，查看五关玩法',
      );
    }
  };

  const open = (focus = true) => {
    hud.classList.add('is-open');
    hud.classList.remove('is-nudging');
    window.clearTimeout(nudgeTimer);
    toggle.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    if (focus) close?.focus({ preventScroll: true });
  };

  const closePanel = (focusToggle = false) => {
    hud.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    if (focusToggle) toggle.focus({ preventScroll: true });
  };

  const onToggle = () => {
    if (hud.classList.contains('is-open')) closePanel();
    else open();
  };

  const onClose = () => closePanel(true);

  const onReset = () => {
    if (!resetArmed) {
      resetArmed = true;
      if (reset) reset.textContent = '再按一次，从头开始';
      window.setTimeout(() => {
        resetArmed = false;
        if (reset) reset.textContent = '重新游器';
      }, 3600);
      return;
    }
    resetJourney();
    window.location.href = '/create/clay';
  };

  const onDocumentClick = (event: MouseEvent) => {
    if (!hud.classList.contains('is-open')) return;
    if ((event.target as Element | null)?.closest('[data-journey-hud]')) return;
    closePanel();
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && hud.classList.contains('is-open')) closePanel(true);
  };

  const onJourney = (event: Event) => {
    const journey = (event as CustomEvent<{ journey?: Journey }>).detail?.journey;
    if (journey) render(journey);
  };

  toggle.addEventListener('click', onToggle);
  close?.addEventListener('click', onClose);
  reset?.addEventListener('click', onReset);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKey);
  document.addEventListener('ciyun:journey', onJourney);

  const journey = loadJourney();
  render(journey);

  if (nudge) {
    const seen = (() => {
      try {
        return window.sessionStorage.getItem('ciyun:journey-nudged') === 'true';
      } catch {
        return true;
      }
    })();

    if (!seen && completion(journey).count === 0) {
      hud.classList.add('is-nudging');
      nudgeTimer = window.setTimeout(() => hud.classList.remove('is-nudging'), 9000);
      try {
        window.sessionStorage.setItem('ciyun:journey-nudged', 'true');
      } catch {
        // storage is optional
      }
    }
  }

  cleanup = () => {
    toggle.removeEventListener('click', onToggle);
    close?.removeEventListener('click', onClose);
    reset?.removeEventListener('click', onReset);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('ciyun:journey', onJourney);
    window.clearTimeout(nudgeTimer);
  };
}

document.addEventListener('ciyun:page-load', initJourneyHud);

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initJourneyHud();

export {};
