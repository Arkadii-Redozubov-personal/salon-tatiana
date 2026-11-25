import { IMAGE_META } from '../data/siteData.js';
import { initAnimatedCounters, initScrollReveal, initStickyHeaderOnHome } from './motion.js';

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function pictureMarkup(imageKey, alt, options = {}) {
  const { loading = 'lazy', fetchpriority = '', className = '', posOverride = '' } = options;
  const cls = className ? ` class="${className}"` : '';
  const prio = fetchpriority ? ` fetchpriority="${fetchpriority}"` : '';
  const load = loading ? ` loading="${loading}"` : '';
  const meta = IMAGE_META[imageKey] || { w: 1152, h: 1440, pos: '50% 50%' };
  const pos = posOverride || meta.pos;

  return `<picture>
    <source srcset="/images/${imageKey}.webp" type="image/webp" />
    <img src="/images/${imageKey}.jpg" alt="${escapeHtml(alt)}" width="${meta.w}" height="${meta.h}" style="object-position: ${pos}"${cls}${load}${prio} />
  </picture>`;
}

export function initCommonUI() {
  initStickyHeaderOnHome();
  initScrollReveal();
  initAnimatedCounters();

  const drawer = document.getElementById('site-menu-drawer');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');

  if (drawer && openBtn && closeBtn) {
    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!drawer.classList.contains('is-open')) {
          drawer.hidden = true;
        }
      }, 320);
      openBtn.focus();
    };

    const openDrawer = () => {
      drawer.hidden = false;
      requestAnimationFrame(() => {
        drawer.classList.add('is-open');
      });
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    openBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (event) => {
      if (event.target === drawer) {
        closeDrawer();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  document.querySelectorAll('[data-faq-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panelId = btn.getAttribute('aria-controls');
      const wrap = panelId ? document.getElementById(panelId) : null;
      btn.setAttribute('aria-expanded', String(!expanded));
      if (wrap) {
        wrap.classList.toggle('is-open', !expanded);
      }
    });
  });
}
