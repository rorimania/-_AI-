const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let revealObserver: IntersectionObserver | null = null;
let revealFallback: number | undefined;
let hashBound = false;

function getNav() {
  return document.querySelector<HTMLElement>('[data-site-nav]');
}

function getMenuParts() {
  const nav = getNav();
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-site-menu]');
  return { nav, toggle, menu };
}

export function closeMenu(focusToggle = false) {
  const { nav, toggle, menu } = getMenuParts();
  if (!nav || !toggle || !menu) return;

  const wasOpen = nav.classList.contains('is-open');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', '打开目录');
  menu.setAttribute('aria-hidden', 'true');

  const label = toggle.querySelector<HTMLElement>('[data-menu-label]');
  if (label) label.textContent = '目录';
  if (wasOpen && focusToggle) toggle.focus({ preventScroll: true });
}

function updateNavState() {
  const nav = getNav();
  if (!nav) return;
  nav.classList.toggle('is-scrolled', window.scrollY > 12);
}

function setupNav() {
  const { nav, toggle, menu } = getMenuParts();
  if (!nav || !toggle || !menu) return;

  if (nav.dataset.scrollBound !== 'true') {
    nav.dataset.scrollBound = 'true';
    window.addEventListener('scroll', updateNavState, { passive: true });

    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭目录' : '打开目录');
      menu.setAttribute('aria-hidden', String(!open));

      const label = toggle.querySelector<HTMLElement>('[data-menu-label]');
      if (label) label.textContent = open ? '收起' : '目录';

      if (open) {
        menu.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
      } else {
        toggle.focus({ preventScroll: true });
      }
    });

    menu.addEventListener('click', (event) => {
      if ((event.target as Element | null)?.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu(true);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  updateNavState();
}

function updateActiveNav() {
  const path = location.pathname;
  const isHome = path === '/' || path === '/index.html';
  const isCreate = path.startsWith('/create');

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const match = link.dataset.navLink;
    const active =
      (match === 'home' && isHome) || (match === 'create' && isCreate);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function setupReveals() {
  revealObserver?.disconnect();
  if (revealFallback) window.clearTimeout(revealFallback);

  const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'));
  if (!elements.length) return;

  if (motionQuery.matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-in'));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).classList.add('is-in');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  elements.forEach((element) => revealObserver?.observe(element));

  // Never leave content hidden if the observer misses (long page, print, odd browser).
  revealFallback = window.setTimeout(() => {
    elements.forEach((element) => element.classList.add('is-in'));
  }, 2400);
}

function setupHashLinks() {
  if (hashBound) return;
  hashBound = true;

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || link.target === '_blank') return;

    const url = new URL(link.href, location.href);
    if (url.pathname !== location.pathname || url.hash.length < 2) return;

    const id = decodeURIComponent(url.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: motionQuery.matches ? 'auto' : 'smooth',
      block: 'start',
    });
    history.pushState(null, '', url.hash);
  });
}

function scrollToCurrentHash() {
  if (!location.hash) return;
  const id = decodeURIComponent(location.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
  });
}

export function showToast(message: string, duration = 3200) {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), duration);
}


let pageSceneCleanup: (() => void) | null = null;
let pageSceneToken = 0;

function disposePageScene() {
  pageSceneToken += 1;
  const cleanup = pageSceneCleanup;
  pageSceneCleanup = null;
  cleanup?.();
}

async function mountPageScene() {
  pageSceneCleanup?.();
  pageSceneCleanup = null;
  const token = ++pageSceneToken;

  if (document.body.dataset.page !== 'home') return;

  const host = document.querySelector<HTMLElement>('[data-vessel-canvas]');
  const stage = document.querySelector<HTMLElement>('[data-vessel-stage]');
  if (!host) return;

  try {
    const observatory = await import('../lib/home/observatory');
    if (token !== pageSceneToken) return;

    const observatoryCleanup = observatory.mountObservatory();
    pageSceneCleanup = observatoryCleanup;

    const scene = await import('../lib/vessel/home-scene');
    if (token !== pageSceneToken) {
      observatoryCleanup();
      if (pageSceneCleanup === observatoryCleanup) pageSceneCleanup = null;
      return;
    }

    const sceneCleanup = scene.mountHomeScene(host, stage);
    pageSceneCleanup = () => {
      sceneCleanup();
      observatoryCleanup();
    };
  } catch (error) {
    console.error('[ciyun] home scene failed to mount', error);
  }
}

function initPage() {
  closeMenu();
  setupNav();
  updateActiveNav();
  setupReveals();
  scrollToCurrentHash();

  document.dispatchEvent(
    new CustomEvent('ciyun:page-load', {
      detail: { page: document.body.dataset.page ?? 'page' },
    }),
  );

  void mountPageScene();
}

document.addEventListener('astro:page-load', initPage);

document.addEventListener('astro:before-swap', () => {
  revealObserver?.disconnect();
  revealObserver = null;
  if (revealFallback) {
    window.clearTimeout(revealFallback);
    revealFallback = undefined;
  }
  closeMenu();
  disposePageScene();
});

document.addEventListener('astro:after-swap', () => {
  updateNavState();
});

setupHashLinks();
