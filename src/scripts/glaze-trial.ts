import { recordStage } from '../lib/journey';

interface Question {
  clue: string;
  answer: string;
  praise: string;
}

const QUESTIONS: Question[] = [
  {
    clue: '“白地青花，一笔一世界。”',
    answer: 'qinghua',
    praise: '青花钴蓝，1320°C 的氧化焰把一笔钴蓝留在了白地上。',
  },
  {
    clue: '“一盏玄色，火痕如丝。”',
    answer: 'jian',
    praise: '建盏兔毫，强还原焰里析出的铁结晶，细得像兔毛。',
  },
  {
    clue: '“入窑一色，出窑万彩。”',
    answer: 'jun',
    praise: '钧窑窑变，铜红在火里不可控地游走，才有一器一色。',
  },
];

let cleanup: (() => void) | null = null;
let initToken = 0;

function initGlazeTrial() {
  const token = ++initToken;
  cleanup?.();
  cleanup = null;
  if (document.body.dataset.page !== 'craft') return;

  const trial = document.querySelector<HTMLElement>('[data-glaze-trial]');
  const clue = document.querySelector<HTMLElement>('[data-glaze-clue]');
  const roundEl = document.querySelector<HTMLElement>('[data-glaze-round]');
  const feedback = document.querySelector<HTMLElement>('[data-glaze-feedback]');
  const board = document.querySelector<HTMLElement>('.glaze-trial__board');
  const done = document.querySelector<HTMLElement>('[data-glaze-done]');
  const scoreEl = document.querySelector<HTMLElement>('[data-glaze-score]');
  const skip = document.querySelector<HTMLButtonElement>('[data-glaze-skip]');
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-glaze-option]'));

  if (!trial || !clue || !buttons.length) return;

  let round = 0;
  let firstTry = true;
  let locked = false;
  let correctFirstTry = 0;
  let mistakes = 0;
  let finished = false;
  let timer = 0;

  const setFeedback = (message: string, state: 'correct' | 'wrong' | '') => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.toggle('is-correct', state === 'correct');
    feedback.classList.toggle('is-wrong', state === 'wrong');
  };

  const clearMarks = () => {
    buttons.forEach((button) => {
      button.classList.remove('is-correct', 'is-wrong');
      button.disabled = false;
      button.removeAttribute('aria-disabled');
    });
    locked = false;
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(timer);
    const score = Math.max(40, Math.round(((correctFirstTry * 100 + (3 - correctFirstTry) * 55) / 3)));
    trial.classList.add('is-done');
    if (done) done.hidden = false;
    if (scoreEl) {
      scoreEl.textContent = `辨釉 · ${score} ｜ 首答 ${correctFirstTry} / 3`;
    }
    if (roundEl) roundEl.textContent = '03';
    if (board) board.hidden = true;
    recordStage(
      'craft',
      score,
      correctFirstTry === 3
        ? '三句釉色，三把火，你都听出来了。'
        : `三问里首答中了 ${correctFirstTry} 问，釉色开始认得你了。`,
      { rounds: 3, correctFirstTry, mistakes, score },
    );
  };

  const nextRound = () => {
    timer = window.setTimeout(() => {
      round += 1;
      if (round >= QUESTIONS.length) {
        finish();
        return;
      }
      const question = QUESTIONS[round];
      firstTry = true;
      if (clue) clue.textContent = question.clue;
      if (roundEl) roundEl.textContent = String(round + 1).padStart(2, '0');
      clearMarks();
      setFeedback('选一个釉色，看看火怎么说。', '');
    }, 800);
  };

  const onAnswer = (event: Event) => {
    if (locked || finished) return;
    const button = event.currentTarget as HTMLButtonElement;
    const id = button.dataset.glazeOption ?? '';
    const question = QUESTIONS[round];
    if (!question) return;

    if (id === question.answer) {
      locked = true;
      if (firstTry) correctFirstTry += 1;
      buttons.forEach((item) => {
        item.disabled = true;
        if (item === button) item.classList.add('is-correct');
      });
      button.classList.add('is-correct');
      setFeedback(`对了。${question.praise}`, 'correct');
      nextRound();
      return;
    }

    mistakes += 1;
    firstTry = false;
    button.classList.add('is-wrong');
    button.disabled = true;
    setFeedback('这不是它的火。再听一遍那句釉色的话，换一个。', 'wrong');
  };

  const onSkip = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(timer);
    trial.classList.add('is-done');
    if (done) done.hidden = false;
    if (board) board.hidden = true;
    if (scoreEl) scoreEl.textContent = '未落印 · 直接择釉';
    if (roundEl) roundEl.textContent = '—';
  };

  buttons.forEach((button) => button.addEventListener('click', onAnswer));
  skip?.addEventListener('click', onSkip);

  if (token !== initToken) return;

  cleanup = () => {
    window.clearTimeout(timer);
    buttons.forEach((button) => button.removeEventListener('click', onAnswer));
    skip?.removeEventListener('click', onSkip);
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'craft') initGlazeTrial();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initGlazeTrial();

export {};
