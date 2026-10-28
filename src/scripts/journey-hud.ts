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

  const toggles = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-journey-toggle]'));
  const panel = hud.querySelector<HTMLElement>('[data-journey-panel]');
  const close = hud.querySelector<HTMLButtonElement>('[data-journey-close]');
  const reset = hud.querySelector<HTMLButtonElement>('[data-journey-reset]');
  const bar = hud.querySelector<HTMLElement>('[data-journey-bar]');
  const time = hud.querySelector<HTMLElement>('[data-journey-time]');
  const current = hud.dataset.currentStage ?? document.body.dataset.page ?? '';

  if (!toggles.length || !panel) return;

  let resetArmed = false;
  let liveTimer = 0;

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
    toggles.forEach((toggle) => {
      toggle.setAttribute(
        'aria-label',
        state.count ? `打开游器谱，已落 ${state.count} 枚印` : '打开游器谱，查看五关玩法',
      );
      toggle.classList.toggle('has-stamps', state.count > 0);
    });
  };

  const tickTime = () => {
    if (!time) return;
    const journey = loadJourney();
    time.textContent = formatDuration(Date.now() - journey.startedAt);
  };

  const open = (focus = true) => {
    hud.classList.add('is-open');
    toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'true'));
    panel.setAttribute('aria-hidden', 'false');
    tickTime();
    window.clearInterval(liveTimer);
    liveTimer = window.setInterval(tickTime, 1000);
    if (focus) close?.focus({ preventScroll: true });
  };

  const closePanel = (focusToggle = false) => {
    hud.classList.remove('is-open');
    toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));
    panel.setAttribute('aria-hidden', 'true');
    window.clearInterval(liveTimer);
    if (focusToggle) toggles[0]?.focus({ preventScroll: true });
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
    const target = event.target as Element | null;
    if (target?.closest('[data-journey-panel]')) return;
    if (target?.closest('[data-journey-toggle]')) return;
    closePanel();
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && hud.classList.contains('is-open')) closePanel(true);
  };

  const onJourney = (event: Event) => {
    const journey = (event as CustomEvent<{ journey?: Journey }>).detail?.journey;
    if (journey) render(journey);
  };

  toggles.forEach((toggle) => toggle.addEventListener('click', onToggle));
  close?.addEventListener('click', onClose);
  reset?.addEventListener('click', onReset);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKey);
  document.addEventListener('ciyun:journey', onJourney);

  const journey = loadJourney();
  render(journey);

  cleanup = () => {
    toggles.forEach((toggle) => toggle.removeEventListener('click', onToggle));
    close?.removeEventListener('click', onClose);
    reset?.removeEventListener('click', onReset);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('ciyun:journey', onJourney);
    window.clearInterval(liveTimer);
  };
}

document.addEventListener('ciyun:page-load', initJourneyHud);

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initJourneyHud();

export {};
