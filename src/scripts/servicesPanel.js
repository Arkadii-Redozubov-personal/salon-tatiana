import { PIGMENT_SWATCHES, SERVICES } from '../data/siteData.js';
import { resolveServiceSlug } from '../lib/booking.js';
import { escapeHtml, pictureMarkup } from './common.js';

export function mountServicesSplit(rootSelector, options = {}) {
  const root = document.querySelector(rootSelector);
  if (!root) {
    return;
  }

  const { syncUrl = true } = options;
  let activeSlug = resolveServiceSlug(window.location.search, SERVICES);

  const render = (animateFade = false) => {
    const current = SERVICES.find((s) => s.slug === activeSlug) || SERVICES[0];
    const totalStr = SERVICES.length < 10 ? `0${SERVICES.length}` : String(SERVICES.length);

    root.innerHTML = `
      <div class="service-showcase">
        <div class="service-showcase-media${animateFade ? ' is-fading-in' : ''}">
          ${pictureMarkup(current.image, current.imageAlt, { loading: 'eager' })}
        </div>
        <span class="service-index-badge">${escapeHtml(current.index)} / ${totalStr}</span>
        <div class="service-showcase-glass">
          <h3>${escapeHtml(current.title)}</h3>
          <a class="btn-pill btn-pill-light" href="/booking/?service=${encodeURIComponent(current.slug)}">
            Выбрать
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div class="service-selector-list" role="tablist" aria-label="Направления услуг">
        ${SERVICES.map((item) => {
          const isActive = item.slug === current.slug;
          return `
            <button
              type="button"
              role="tab"
              aria-selected="${isActive}"
              class="service-row-btn${isActive ? ' is-active' : ''}"
              data-service-slug="${escapeHtml(item.slug)}"
            >
              <span class="service-row-main">
                ${pictureMarkup(item.image, '', { loading: 'lazy', className: 'service-row-thumb' })}
                <span>
                  <span class="service-row-num">${escapeHtml(item.index)}</span>
                  <span class="service-row-title">${escapeHtml(item.shortTitle)}</span>
                </span>
              </span>
              <span class="service-row-side">
                <span class="service-row-price">${escapeHtml(item.price)}</span>
                <span class="service-row-arrow" aria-hidden="true">${isActive ? '↗' : '→'}</span>
              </span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    root.querySelectorAll('[data-service-slug]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeSlug = btn.getAttribute('data-service-slug') || SERVICES[0].slug;
        if (syncUrl) {
          const url = new URL(window.location.href);
          url.searchParams.delete('active-service');
          url.searchParams.set('service', activeSlug);
          window.history.replaceState({}, '', url);
        }
        render(true);
      });
    });
  };

  render(false);
}

export function mountPigmentStrip(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) {
    return;
  }

  let activeId = PIGMENT_SWATCHES[0].id;

  const render = () => {
    const current = PIGMENT_SWATCHES.find((p) => p.id === activeId) || PIGMENT_SWATCHES[0];
    root.innerHTML = `
      <div>
        <p class="eyebrow" style="margin-bottom: 6px;">Палитра пигментов</p>
        <strong>${escapeHtml(current.name)}</strong> · <span>${escapeHtml(current.zone)}</span>
        <p class="lead-copy" style="font-size: 14px; margin-top: 4px;">${escapeHtml(current.description)}</p>
        <div class="pigment-gradient-bar" aria-hidden="true"></div>
      </div>
      <div class="pigment-swatches-row" role="group" aria-label="Оттенки минеральных пигментов">
        ${PIGMENT_SWATCHES.map((swatch) => {
          const active = swatch.id === current.id;
          return `
            <button
              type="button"
              class="pigment-swatch-btn${active ? ' is-active' : ''}"
              data-pigment-id="${escapeHtml(swatch.id)}"
              aria-pressed="${active}"
            >
              <span class="pigment-dot" style="background: ${swatch.gradient};"></span>
              <span>${escapeHtml(swatch.name)}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    root.querySelectorAll('[data-pigment-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeId = btn.getAttribute('data-pigment-id') || PIGMENT_SWATCHES[0].id;
        render();
      });
    });
  };

  render();
}
