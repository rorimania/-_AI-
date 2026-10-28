/**
 * 游器 journey store.
 *
 * The five stages are small acts rather than a checklist. Each one leaves
 * a seal in the player's field notes; the result page turns those seals,
 * choices and moments into a printable journey memo.
 */

export type StageId = 'clay' | 'form' | 'craft' | 'fire' | 'result';

export interface JourneyStage {
  id: StageId;
  n: number;
  name: string;
  en: string;
  stamp: string;
  quest: string;
  hint: string;
  href: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'clay',
    n: 1,
    name: '取土',
    en: 'Clay',
    stamp: '醒',
    quest: '揉泥三巡',
    hint: '循着泥上的记号按下去，让气泡离开。',
    href: '/create/clay',
  },
  {
    id: 'form',
    n: 2,
    name: '拉坯',
    en: 'Form',
    stamp: '转',
    quest: '三手定型',
    hint: '左右拖动瓶身，把手感留在轮廓里。',
    href: '/create/form',
  },
  {
    id: 'craft',
    n: 3,
    name: '择釉',
    en: 'Glaze',
    stamp: '辨',
    quest: '试釉三问',
    hint: '听一句釉色的话，认出它走过的那把火。',
    href: '/create/craft',
  },
  {
    id: 'fire',
    n: 4,
    name: '入窑',
    en: 'Fire',
    stamp: '候',
    quest: '候火三刻',
    hint: '等火色落进保温带，再把这一把柴投进去。',
    href: '/create/fire',
  },
  {
    id: 'result',
    n: 5,
    name: '开窑',
    en: 'Reveal',
    stamp: '见',
    quest: '五印成谱',
    hint: '把这一路的手感、火候与选择收进一页手札。',
    href: '/create/result',
  },
];

export const STAGE_BY_ID = Object.fromEntries(
  JOURNEY_STAGES.map((stage) => [stage.id, stage]),
) as Record<StageId, JourneyStage>;

export interface StageRecord {
  id: StageId;
  score: number;
  note: string;
  at: number;
  meta?: Record<string, string | number | boolean | null>;
}

export interface JourneyShape {
  preset: string;
  presetLabel: string;
  edits: number;
}

export interface Journey {
  version: 1;
  id: string;
  startedAt: number;
  updatedAt: number;
  finishedAt: number | null;
  stages: Partial<Record<StageId, StageRecord>>;
  shape: JourneyShape | null;
  craft: string | null;
  visits: Partial<Record<StageId, number>>;
}

const STORAGE_KEY = 'ciyun:journey:v1';
const memoryFallback = { value: null as Journey | null };

function newId() {
  return `J-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function emptyJourney(): Journey {
  const now = Date.now();
  return {
    version: 1,
    id: newId(),
    startedAt: now,
    updatedAt: now,
    finishedAt: null,
    stages: {},
    shape: null,
    craft: null,
    visits: {},
  };
}

function isJourney(value: unknown): value is Journey {
  if (!value || typeof value !== 'object') return false;
  const maybe = value as Partial<Journey>;
  return maybe.version === 1 && typeof maybe.startedAt === 'number' && !!maybe.stages;
}

function readStorage(): Journey | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isJourney(parsed) ? parsed : null;
  } catch {
    return memoryFallback.value;
  }
}

function writeStorage(journey: Journey) {
  memoryFallback.value = journey;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(journey));
  } catch {
    // Private mode or a full quota: the in-memory copy still carries the visit.
  }
}

function publish(journey: Journey) {
  writeStorage(journey);
  if (typeof document !== 'undefined') {
    document.dispatchEvent(
      new CustomEvent('ciyun:journey', { detail: { journey } }),
    );
  }
}

export function loadJourney(): Journey {
  const stored = readStorage();
  if (stored) {
    memoryFallback.value = stored;
    return stored;
  }
  const created = emptyJourney();
  writeStorage(created);
  return created;
}

export function startJourney(force = false): Journey {
  const existing = readStorage();
  if (existing && !force) return existing;
  const created = emptyJourney();
  publish(created);
  return created;
}

export function updateJourney(
  updater: (journey: Journey) => Journey,
): Journey {
  const next = updater(loadJourney());
  next.updatedAt = Date.now();
  publish(next);
  return next;
}

export function markVisit(stage: StageId): Journey {
  return updateJourney((journey) => {
    journey.visits[stage] = (journey.visits[stage] ?? 0) + 1;
    return journey;
  });
}

export function recordStage(
  stage: StageId,
  score: number,
  note: string,
  meta?: StageRecord['meta'],
): Journey {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  return updateJourney((journey) => {
    journey.stages[stage] = {
      id: stage,
      score: safeScore,
      note,
      at: Date.now(),
      meta,
    };
    if (stage === 'result') {
      journey.finishedAt = Date.now();
    }
    return journey;
  });
}

export function setJourneyShape(shape: JourneyShape): Journey {
  return updateJourney((journey) => {
    journey.shape = shape;
    return journey;
  });
}

export function setJourneyCraft(craft: string): Journey {
  return updateJourney((journey) => {
    journey.craft = craft;
    return journey;
  });
}

export function resetJourney(): Journey {
  return startJourney(true);
}

export function completion(journey: Journey) {
  const completed = JOURNEY_STAGES.filter((stage) => journey.stages[stage.id]);
  const scores = completed.map((stage) => journey.stages[stage.id]?.score ?? 0);
  return {
    count: completed.length,
    total: completed.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
    sum: scores.reduce((a, b) => a + b, 0),
    complete: completed.length === JOURNEY_STAGES.length,
  };
}

export function formatDuration(ms: number) {
  const total = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  if (minutes <= 0) return `${seconds} 秒`;
  return `${minutes} 分 ${String(seconds).padStart(2, '0')} 秒`;
}

export function formatDate(ms: number) {
  const date = new Date(ms);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

export interface JourneyRecap {
  journey: Journey;
  count: number;
  total: number;
  complete: boolean;
  duration: number;
  durationLabel: string;
  persona: string;
  personaNote: string;
  narrative: string[];
  title: string;
}

const personaByCraft: Record<string, { name: string; note: string }> = {
  longquan: {
    name: '守青人',
    note: '你让火慢下来，青釉便把春水留在了器身。',
  },
  qinghua: {
    name: '描蓝者',
    note: '你信一线钴蓝，能在白地上写出很远的世界。',
  },
  jian: {
    name: '候火师',
    note: '你不追亮，只等那一道火痕自己沉进黑釉里。',
  },
  jun: {
    name: '观变生',
    note: '你知道窑变不能控制，于是把意外也收进了作品。',
  },
};

const fallbackPersona = {
  name: '初游人',
  note: '五道工序还未走完，器物仍留着下一次的手温。',
};

export function buildRecap(journey = loadJourney()): JourneyRecap {
  const state = completion(journey);
  const duration = (journey.finishedAt ?? journey.updatedAt) - journey.startedAt;
  const craft = journey.craft ? personaByCraft[journey.craft] ?? fallbackPersona : fallbackPersona;
  const shape = journey.shape?.presetLabel ?? '未定器型';
  const clay = journey.stages.clay;
  const form = journey.stages.form;
  const fire = journey.stages.fire;

  const narrative: string[] = [];
  if (clay) {
    narrative.push(
      clay.score >= 85
        ? '你在泥团上按准了三次记号，泥性被揉得很匀。'
        : '你把泥团反复揉开，气泡在最后才肯离开。',
    );
  }
  if (form) {
    const edits = Number(form.meta?.edits ?? 0);
    narrative.push(
      edits > 0
        ? `你为${shape}推了 ${edits} 手，轮廓里留着你的力道。`
        : `你选了${shape}，把动手的念头留给了下一次。`,
    );
  } else {
    narrative.push(`轮廓停在${shape}的起手式上。`);
  }
  if (journey.craft) {
    narrative.push(craft.note);
  } else {
    narrative.push('釉色还没有选定，火在窑里继续等。');
  }
  if (fire) {
    narrative.push(
      fire.score >= 80
        ? '三次投柴都落在保温带，火色很稳。'
        : '火候有几刻偏离，但窑变本来就会多给一点意外。',
    );
  }

  return {
    journey,
    count: state.count,
    total: state.total,
    complete: state.complete,
    duration,
    durationLabel: formatDuration(duration),
    persona: craft.name,
    personaNote: craft.note,
    narrative,
    title: `${shape === '未定器型' ? '一器' : shape} · ${craft.name}`,
  };
}
