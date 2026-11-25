import { PORTFOLIO_ITEMS } from '../data/siteData.js';
import { escapeHtml, initCommonUI, pictureMarkup } from './common.js';

const CATEGORIES = [
  { key: 'all', label: 'Все работы' },
  { key: 'brows', label: 'Брови' },
  { key: 'lips', label: 'Губы Aquarelle' },
  { key: 'eyeliner', label: 'Стрелки Soft Liner' },
  { key: 'laser', label: 'Лазер Nd:YAG' },
  { key: 'process', label: 'Оборудование' }
];

function initPortfolioGallery() {
  const filtersRoot = document.getElementById('portfolio-filters');
  const galleryRoot = document.getElementById('portfolio-master-detail');
  const lightbox = document.getElementById('portfolio-lightbox');
  const lightboxBody = document.getElementById('portfolio-lightbox-content');

  if (!filtersRoot || !galleryRoot) {
    return;
  }

  let activeCategory = 'all';
  let activeId = PORTFOLIO_ITEMS[0].id;

  const getFiltered = () =>
    activeCategory === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (item, itemsList) => {
    if (!lightbox || !lightboxBody) {
      return;
    }

    const renderLightboxItem = (target) => {
      lightboxBody.innerHTML = `
        <div class="lightbox-media">
          ${pictureMarkup(target.image, target.alt, { loading: 'eager', posOverride: '50% 50%' })}
        </div>
        <div class="lightbox-body">
          <div>
            <p class="eyebrow">${escapeHtml(target.categoryLabel)}</p>
            <h3 style="margin: 0 0 12px; font-family: var(--font-display); font-size: 32px; font-weight: 400;">
              ${escapeHtml(target.title)}
            </h3>
            <p class="lead-copy">${escapeHtml(target.caption)}</p>
          </div>
          <div class="hero-cta-row">
            <a class="btn-pill btn-pill-light" href="/booking/">Записаться на консультацию</a>
            <a class="btn-pill btn-pill-outline-light" href="${escapeHtml(target.instagramUrl)}" target="_blank" rel="noopener noreferrer">
              Исходный пост
            </a>
            <button type="button" class="btn-pill btn-pill-outline-light" data-lightbox-close>Закрыть</button>
          </div>
        </div>
      `;
      lightboxBody.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox.close());
    };

    renderLightboxItem(item);

    const onKey = (e) => {
      if (!lightbox.open) {
        document.removeEventListener('keydown', onKey);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const idx = itemsList.findIndex((x) => x.id === activeId);
        const nextIdx =
          e.key === 'ArrowRight'
            ? (idx + 1) % itemsList.length
            : (idx - 1 + itemsList.length) % itemsList.length;
        activeId = itemsList[nextIdx].id;
        renderLightboxItem(itemsList[nextIdx]);
        render(true);
      }
    };
    document.addEventListener('keydown', onKey);

    lightbox.showModal();
  };

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });
  }

  const render = (animateFade = false) => {
    const items = getFiltered();
    if (!items.some((i) => i.id === activeId)) {
      activeId = items[0]?.id || PORTFOLIO_ITEMS[0].id;
    }
    const activeIndex = Math.max(
      0,
      items.findIndex((i) => i.id === activeId)
    );
    const current = items[activeIndex] || items[0];

    filtersRoot.innerHTML = CATEGORIES.map(
      (cat) => `
        <button
          type="button"
          class="filter-pill-btn${cat.key === activeCategory ? ' is-active' : ''}"
          data-filter-cat="${escapeHtml(cat.key)}"
          aria-pressed="${cat.key === activeCategory}"
        >
          ${escapeHtml(cat.label)}
        </button>
      `
    ).join('');

    const idxStr = activeIndex + 1 < 10 ? `0${activeIndex + 1}` : String(activeIndex + 1);
    const lenStr = items.length < 10 ? `0${items.length}` : String(items.length);

    galleryRoot.innerHTML = `
      <div class="gallery-stage">
        <div class="${animateFade ? 'is-fading-in' : ''}" style="height: 100%;">
          ${pictureMarkup(current.image, current.alt, { loading: 'eager' })}
        </div>
        <div class="gallery-stage-bar">
          <div>
            <span class="eyebrow" style="color: #e6c6b8; margin-bottom: 4px;">
              ${idxStr} / ${lenStr} · ${escapeHtml(current.categoryLabel)}
            </span>
            <h3>${escapeHtml(current.title)}</h3>
            <p style="margin: 6px 0 0; font-size: 14px; color: rgba(247, 239, 230, 0.88);">${escapeHtml(current.caption)}</p>
          </div>
          <div class="gallery-stage-actions">
            <div style="display: flex; gap: 8px;">
              <button type="button" class="icon-circle-btn" style="color: #fff; border-color: rgba(255,255,255,0.4);" data-gallery-prev aria-label="Предыдущая работа">←</button>
              <button type="button" class="icon-circle-btn" style="color: #fff; border-color: rgba(255,255,255,0.4);" data-gallery-next aria-label="Следующая работа">→</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <button type="button" class="btn-pill btn-pill-light" style="min-height: 44px; padding: 0 18px;" data-open-lightbox>
                Увеличить фото
              </button>
              <a class="btn-pill btn-pill-outline-light" style="min-height: 44px; padding: 0 18px;" href="${escapeHtml(current.instagramUrl)}" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="gallery-thumb-grid" role="list" aria-label="Миниатюры работ">
        ${items
          .map(
            (item) => `
          <button
            type="button"
            class="gallery-thumb-btn${item.id === current.id ? ' is-active' : ''}"
            data-thumb-id="${escapeHtml(item.id)}"
            aria-label="Показать: ${escapeHtml(item.title)}"
            aria-pressed="${item.id === current.id}"
          >
            ${pictureMarkup(item.image, item.alt, { loading: 'lazy' })}
          </button>
        `
          )
          .join('')}
      </div>
    `;

    filtersRoot.querySelectorAll('[data-filter-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-filter-cat') || 'all';
        render(true);
      });
    });

    galleryRoot.querySelectorAll('[data-thumb-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeId = btn.getAttribute('data-thumb-id') || items[0].id;
        render(true);
      });
    });

    galleryRoot.querySelector('[data-gallery-prev]')?.addEventListener('click', () => {
      const prevIdx = (activeIndex - 1 + items.length) % items.length;
      activeId = items[prevIdx].id;
      render(true);
    });

    galleryRoot.querySelector('[data-gallery-next]')?.addEventListener('click', () => {
      const nextIdx = (activeIndex + 1) % items.length;
      activeId = items[nextIdx].id;
      render(true);
    });

    galleryRoot.querySelector('[data-open-lightbox]')?.addEventListener('click', () => {
      openLightbox(current, items);
    });
  };

  render(false);
}

initPortfolioGallery();
initCommonUI();
