import { FAQ_ITEMS, PACKAGES, PREP_CHECKLIST, SERVICES } from '../data/siteData.js';
import { escapeHtml, initCommonUI, pictureMarkup } from './common.js';
import { mountPigmentStrip, mountServicesSplit } from './servicesPanel.js';

function mountPackagesGrid() {
  const grid = document.getElementById('services-packages-grid');
  if (!grid) {
    return;
  }

  grid.innerHTML = PACKAGES.map(
    (pkg, idx) => `
      <article class="package-card${pkg.featured ? ' is-featured' : ''}" data-reveal data-reveal-delay="${(idx * 0.08).toFixed(2)}s">
        <div class="package-media">
          ${pictureMarkup(pkg.image, pkg.imageAlt, { loading: 'lazy' })}
          <span class="package-badge">${escapeHtml(pkg.badge)}</span>
        </div>
        <div>
          <h3 class="package-title">${escapeHtml(pkg.title)}</h3>
          <p class="package-price">${escapeHtml(pkg.price)}</p>
          <p class="package-note">${escapeHtml(pkg.note)}</p>
        </div>
        <ul class="package-features">
          ${pkg.features
            .map(
              (feat) => `
            <li>
              <span class="package-check" aria-hidden="true">✓</span>
              <span>${escapeHtml(feat)}</span>
            </li>
          `
            )
            .join('')}
        </ul>
        <a
          class="btn-pill package-cta ${pkg.featured ? 'btn-pill-light' : 'btn-pill-dark'}"
          href="/booking/?service=${encodeURIComponent(pkg.slug)}"
        >
          ${escapeHtml(pkg.ctaLabel)}
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </article>
    `
  ).join('');
}

function mountCatalogCards() {
  const grid = document.getElementById('services-cards-grid');
  if (!grid) {
    return;
  }

  grid.innerHTML = SERVICES.map(
    (item, idx) => `
      <article class="catalog-card${item.featured ? ' is-featured' : ''}" data-reveal data-reveal-delay="${((idx % 3) * 0.08).toFixed(2)}s">
        <div class="catalog-card-media">
          ${pictureMarkup(item.image, item.imageAlt, { loading: 'lazy' })}
          <span class="catalog-card-badge">${escapeHtml(item.tag)}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="catalog-card-desc">${escapeHtml(item.description)}</p>
        <ul class="catalog-card-list">
          ${item.highlights.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
        </ul>
        <div class="catalog-card-meta">
          <span><strong>Цена:</strong> ${escapeHtml(item.price)}</span>
          <span><strong>Время:</strong> ${escapeHtml(item.duration)}</span>
        </div>
        <a
          class="btn-pill ${item.featured ? 'btn-pill-light' : 'btn-pill-dark'}"
          href="/booking/?service=${encodeURIComponent(item.slug)}"
        >
          Выбрать процедуру
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </article>
    `
  ).join('');
}

function mountPrepChecklist() {
  const list = document.getElementById('services-prep-list');
  if (!list) {
    return;
  }
  list.innerHTML = PREP_CHECKLIST.map((line) => `<li>${escapeHtml(line)}</li>`).join('');
}

function mountFaqList() {
  const list = document.getElementById('services-faq-list');
  if (!list) {
    return;
  }

  list.innerHTML = FAQ_ITEMS.map((item, index) => {
    const isOpen = index === 0;
    const panelId = `faq-panel-${index}`;
    return `
      <article class="faq-item">
        <button
          type="button"
          class="faq-trigger"
          data-faq-trigger
          aria-expanded="${isOpen}"
          aria-controls="${panelId}"
        >
          <span>${escapeHtml(item.question)}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div id="${panelId}" class="faq-panel-wrap${isOpen ? ' is-open' : ''}">
          <div class="faq-panel-inner">
            <p>${escapeHtml(item.answer)}</p>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

mountServicesSplit('#services-interactive-split', { syncUrl: true });
mountPackagesGrid();
mountCatalogCards();
mountPigmentStrip('#services-pigment-strip');
mountPrepChecklist();
mountFaqList();
initCommonUI();
