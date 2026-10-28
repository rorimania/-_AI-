import { crafts } from '../data/crafts';
import { tonePalettes } from '../data/tones';

let cleanup: (() => void) | null = null;

function initCraft() {
  cleanup?.();
  cleanup = null;
  if (document.body.dataset.page !== 'craft') return;

  const stage = document.querySelector<HTMLElement>('[data-craft-stage]');
  const poster = document.querySelector<HTMLElement>('[data-vessel-poster]');
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('[data-craft-input]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.craft-card'));
  const details = Array.from(document.querySelectorAll<HTMLElement>('[data-craft-detail]'));
  const nameEl = document.querySelector<HTMLElement>('[data-craft-name]');
  const tempEl = document.querySelector<HTMLElement>('[data-craft-temp]');

  if (!stage || !poster || !inputs.length) return;

  const svg = poster.querySelector('svg');
  const glazeStops = Array.from(svg?.querySelectorAll<SVGStopElement>('.tone-glaze stop') ?? []);
  const rimStops = Array.from(svg?.querySelectorAll<SVGStopElement>('.tone-rim stop') ?? []);
  const outline = svg?.querySelector<SVGPathElement>('.vessel-outline');
  const rim = svg?.querySelector<SVGEllipseElement>('.vessel-rim');
  const footLines = Array.from(svg?.querySelectorAll<SVGPathElement>('.vessel-foot-line') ?? []);
  const crackle = svg?.querySelector<SVGGElement>('.poster-crackle');

  let current: string | null = null;

  const apply = (id: string) => {
    const craft = crafts.find((item) => item.id === id);
    if (!craft) return;
    current = craft.id;

    const palette = tonePalettes[craft.tone];

    [palette.a, palette.b, palette.c, palette.d, palette.e].forEach((color, index) => {
      glazeStops[index]?.setAttribute('stop-color', color);
    });
    [palette.rimA, palette.rimB, palette.rimC].forEach((color, index) => {
      rimStops[index]?.setAttribute('stop-color', color);
    });

    outline?.setAttribute('stroke', palette.edge);
    rim?.setAttribute('stroke', palette.edge);
    footLines.forEach((line) => line.setAttribute('stroke', palette.edge));
    crackle?.setAttribute('stroke', palette.edge);
    poster.dataset.tone = craft.tone;

    stage.style.setProperty('--craft-accent', craft.glaze.accent);

    if (nameEl) nameEl.textContent = craft.name;
    if (tempEl) tempEl.textContent = `${craft.tempLabel} · ${craft.atmosphere}`;

    cards.forEach((card) => card.classList.toggle('is-selected', card.dataset.craft === craft.id));
    details.forEach((detail) => {
      detail.hidden = detail.dataset.craftDetail !== craft.id;
    });

    document.dispatchEvent(
      new CustomEvent('ciyun:craft-change', {
        detail: { craft: craft.id, tone: craft.tone },
      }),
    );
  };

  const onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input?.matches('[data-craft-input]')) apply(input.value);
  };

  inputs.forEach((input) => input.addEventListener('change', onChange));

  const initial = inputs.find((input) => input.checked)?.value ?? crafts[0].id;
  if (initial !== current) apply(initial);

  cleanup = () => {
    inputs.forEach((input) => input.removeEventListener('change', onChange));
  };
}

document.addEventListener('ciyun:page-load', (event) => {
  if ((event as CustomEvent<{ page?: string }>).detail?.page === 'craft') initCraft();
});

document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = null;
});

initCraft();
