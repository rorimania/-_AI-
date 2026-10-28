import {
  loadJourney,
  recordStage,
  setJourneyShape,
} from '../lib/journey';

let cleanup: (() => void) | null = null;
let initToken = 0;

async function initWheel() {
  const token = ++initToken;
  cleanup?.();
  cleanup = null;
  if (document.body.dataset.page !== 'form') return;

  const stage = document.querySelector<HTMLElement>('[data-wheel-stage]');
  const host = document.querySelector<HTMLElement>('[data-wheel-canvas]');
  if (!stage || !host) return;

  const editsEl = document.querySelector<HTMLElement>('[data-wheel-edits]');
  const quest = document.querySelector<HTMLElement>('[data-wheel-quest]');
  const questCopy = document.querySelector<HTMLElement>('[data-wheel-quest-copy]');
  const hint = document.querySelector<HTMLElement>('[data-wheel-hint]');
  const status = document.querySelector<HTMLElement>('[data-wheel-status]');
  const statusNote = document.querySelector<HTMLElement>('[data-wheel-status-note]');
  const sealCopy = document.querySelector<HTMLElement>('[data-wheel-seal-copy]');
  const panel = document.querySelector<HTMLElement>('.wheel-panel');
  const presetLabel = document.querySelector<HTMLElement>('[data-preset-label]');
  const spinLabel = document.querySelector<HTMLElement>('[data-wheel-spin-label]');
  const presets = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-preset]'));
  const tools = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-wheel-tool]'));
  const smoothBtn = document.querySelector<HTMLButtonElement>('[data-wheel-action="smooth"]');
  const undoBtn = document.querySelector<HTMLButtonElement>('[data-wheel-action="undo"]');
  const resetBtn = document.querySelector<HTMLButtonElement>('[data-wheel-action="reset"]');

  let editCount = 0;
  let currentPreset = 'meiping';
  let currentPresetLabel = '梅瓶';
  let stamped = false;
  let handle: import('../lib/vessel/wheel-scene').WheelSceneHandle | null = null;
  let disposed = false;

  const pushShape = () => {
    setJourneyShape({
      preset: currentPreset,
      presetLabel: currentPresetLabel,
      edits: editCount,
    });
  };

  const updateUi = () => {
    if (editsEl) editsEl.textContent = String(editCount);
    const complete = editCount >= 3;
    stage.dataset.edits = String(editCount);
    quest?.classList.toggle('is-complete', complete);
    if (questCopy) {
      questCopy.textContent = complete
        ? '三手落定，这一关的印记已经留住了'
        : `再推 ${Math.max(0, 3 - editCount)} 手，让轮廓更像你`;
    }
    if (statusNote) {
      statusNote.textContent = editCount > 0 ? `已塑 ${editCount} 手` : '尚未修改';
    }
    if (complete && !stamped) {
      stamped = true;
      panel?.classList.add('is-stamped');
      if (sealCopy) sealCopy.textContent = '三手已落，转印在此';
      if (hint) hint.textContent = '这一手留下 · 可以择釉了';
    }

    if (complete) {
      const score = Math.min(100, 62 + editCount * 12);
      recordStage(
        'form',
        score,
        editCount >= 3
          ? `${currentPresetLabel}的轮廓里留下了 ${editCount} 手力道。`
          : '器型已选定，轮廓停在起手式上。',
        { edits: editCount, preset: currentPreset, presetLabel: currentPresetLabel, score },
      );
      pushShape();
    }
  };

  const setActivePreset = (id: string) => {
    presets.forEach((button) => {
      const active = button.dataset.preset === id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  const onEdit = (count: number) => {
    editCount = count;
    updateUi();
  };

  const onPreset = (id: string, label: string) => {
    currentPreset = id;
    currentPresetLabel = label;
    editCount = 0;
    stamped = false;
    panel?.classList.remove('is-stamped');
    if (sealCopy) sealCopy.textContent = '三手之后，落印于此';
    if (hint) hint.textContent = '左右拖动 · 塑出轮廓';
    if (questCopy) questCopy.textContent = '拖动瓶身三手，留下你的轮廓';
    if (presetLabel) presetLabel.textContent = label;
    if (status) status.textContent = `器型 · 示例${label}`;
    setActivePreset(id);
    stage.dataset.preset = id;
    updateUi();
  };

  try {
    const { mountWheelScene } = await import('../lib/vessel/wheel-scene');
    if (disposed || token !== initToken) return;
    handle = mountWheelScene(host, stage, { onEdit, onPreset });
  } catch (error) {
    console.error('[ciyun] wheel scene failed to mount', error);
    if (hint) hint.textContent = '3D 暂未载入 · 仍可使用示例器型';
    return;
  }

  const onPresetClick = (event: Event) => {
    const button = (event.currentTarget as HTMLButtonElement).dataset.preset;
    if (!button) return;
    handle?.setPreset(button);
  };

  const onTool = (event: Event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const mode = button.dataset.wheelTool;
    if (mode !== 'shape' && mode !== 'rotate') return;
    handle?.setMode(mode);
    tools.forEach((tool) => {
      const active = tool === button;
      tool.setAttribute('aria-pressed', String(active));
    });
    if (hint) hint.textContent = mode === 'rotate' ? '左右拖动 · 转动器身' : '左右拖动 · 塑出轮廓';
    if (spinLabel) spinLabel.textContent = mode === 'rotate' ? '手动旋转' : '自动旋转';
  };

  const onSmooth = () => {
    handle?.smooth();
    if (hint) hint.textContent = '修过一刀 · 线条更顺了';
  };

  const onUndo = () => {
    handle?.undo();
    if (hint) hint.textContent = '退回上一手';
  };

  const onReset = () => {
    handle?.reset();
    editCount = 0;
    stamped = false;
    panel?.classList.remove('is-stamped');
    if (sealCopy) sealCopy.textContent = '三手之后，落印于此';
    setJourneyShape({ preset: currentPreset, presetLabel: currentPresetLabel, edits: 0 });
    updateUi();
  };

  const onKey = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
    if ((event.key === 'z' || event.key === 'Z') && !event.metaKey && !event.ctrlKey) {
      onUndo();
    }
  };

  presets.forEach((button) => button.addEventListener('click', onPresetClick));
  tools.forEach((button) => button.addEventListener('click', onTool));
  smoothBtn?.addEventListener('click', onSmooth);
  undoBtn?.addEventListener('click', onUndo);
  resetBtn?.addEventListener('click', onReset);
  document.addEventListener('keydown', onKey);

  const previous = loadJourney().stages.form;
  if (previous) {
    if (previous.meta?.preset) {
      currentPreset = String(previous.meta.preset);
      currentPresetLabel = String(previous.meta.presetLabel ?? currentPresetLabel);
    }
    if (currentPreset !== 'meiping') handle?.setPreset(currentPreset);
    if (previous.meta?.edits) editCount = Number(previous.meta.edits) || 0;
    if (presetLabel) presetLabel.textContent = currentPresetLabel;
    if (status) status.textContent = `器型 · 示例${currentPresetLabel}`;
    setActivePreset(currentPreset);
    if (editCount >= 3) {
      stamped = true;
      panel?.classList.add('is-stamped');
      if (sealCopy) sealCopy.textContent = '三手已落，转印在此';
    }
    updateUi();
  }

  cleanup = () => {
    disposed = true;
    handle?.destroy();
    handle = null;
    presets.forEach((button) => button.removeEventListener('click', onPresetClick));
    tools.forEach((button) => button.removeEventListener('click', onTool));
    smoothBtn?.removeEventListener('click', onSmooth);
    undoBtn?.removeEventListener('click', onUndo);
    resetBtn?.removeEventListener('click', onReset);
    document.removeEventListener('keydown', onKey);
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'form') void initWheel();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

void initWheel();

export {};
