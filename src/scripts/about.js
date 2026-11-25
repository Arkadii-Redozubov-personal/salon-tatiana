import { PUBLIC_REVIEWS, TRUST_PILLARS } from '../data/siteData.js';
import { escapeHtml, initCommonUI, pictureMarkup } from './common.js';

const pillarsEl = document.getElementById('about-trust-pillars');
if (pillarsEl) {
  pillarsEl.innerHTML = TRUST_PILLARS.map(
    (pillar, idx) => `
      <article class="pillar-card" data-reveal data-reveal-delay="${(idx * 0.08).toFixed(2)}s">
        <span class="pillar-num">${escapeHtml(pillar.number)}</span>
        <h3>${escapeHtml(pillar.title)}</h3>
        <p>${escapeHtml(pillar.text)}</p>
      </article>
    `
  ).join('');
}

const reviewsEl = document.getElementById('about-public-reviews');
if (reviewsEl) {
  reviewsEl.innerHTML = PUBLIC_REVIEWS.map(
    (rev) => `
      <article class="review-quote-card" data-reveal>
        <span class="review-quote-glyph" aria-hidden="true">“</span>
        <p style="margin: 0; font-family: var(--font-display); font-style: italic; font-size: 28px; line-height: 1.3; color: var(--ink-dark);">
          ${escapeHtml(rev.quote)}
        </p>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 8px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 44px; height: 44px; border-radius: 50%; overflow: hidden; display: block;">
              ${pictureMarkup(rev.image, '', { loading: 'lazy' })}
            </span>
            <div>
              <strong style="display: block; font-size: 14px;">${escapeHtml(rev.author)}</strong>
              <span style="font-size: 12px; color: var(--ink-muted);">${escapeHtml(rev.context)}</span>
            </div>
          </div>
          <a class="btn-pill btn-pill-outline" style="min-height: 44px; padding: 0 16px; font-size: 13px;" href="${escapeHtml(rev.url)}" target="_blank" rel="noopener noreferrer">
            Открыть пост
          </a>
        </div>
      </article>
    `
  ).join('');
}

initCommonUI();
