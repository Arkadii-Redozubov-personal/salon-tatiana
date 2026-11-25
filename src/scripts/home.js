import { PORTFOLIO_ITEMS, PROCESS_STEPS, REELS_ITEMS, TRUST_PILLARS } from '../data/siteData.js';
import { escapeHtml, initCommonUI, pictureMarkup } from './common.js';
import { prefersReducedMotion } from './motion.js';
import { mountPigmentStrip, mountServicesSplit } from './servicesPanel.js';

const HERO_LOOKS = [
  {
    id: 'master',
    label: 'Мастер Татьяна',
    image: 'tatiana-smile',
    alt: 'Татьяна Малыгина — сертифицированный мастер перманентного макияжа с опытом 18 лет',
    offer:
      'Перманентный макияж бровей «Как свои», пудровое напыление Magic Shading, акварельные губы, стрелки и лазерное удаление Nd:YAG в Чадыр-Лунге.',
    ctaHref: '/booking/'
  },
  {
    id: 'brows',
    label: 'Брови «Как свои»',
    image: 'brows-kak-svoi',
    alt: 'Брови в волосковой технике «Как свои» — работа Татьяны Малыгиной',
    offer:
      'Аппаратная волосковая техника «Как свои» минеральными красками Елены Нечаевой: воздушные волоски без плотной забивки и синевы.',
    ctaHref: '/booking/?service=brows-kak-svoi'
  },
  {
    id: 'lips',
    label: 'Aquarelle Lips',
    image: 'lips-aquarelle',
    alt: 'Акварельные губы Aquarelle Lips от Татьяны Малыгиной',
    offer:
      'Акварельный перманент губ строго по природному контуру: свежесть цвета на 1,5–2 года и скидка при записи на две или три зоны.',
    ctaHref: '/booking/?service=lips'
  },
  {
    id: 'eyeliner',
    label: 'Стрелки Soft Liner',
    image: 'eyeliner-softliner',
    alt: 'Стрелки с мягкой растушёвкой Soft Liner — макро работы Татьяны Малыгиной',
    offer:
      'Стрелка с мягкой растушёвкой Soft Liner и межресничный контур: быстрое заживление за 4–5 дней и выразительный взгляд.',
    ctaHref: '/booking/?service=eyeliner'
  },
  {
    id: 'laser',
    label: 'Лазер Nd:YAG',
    image: 'laser-ndyag',
    alt: 'Татьяна Малыгина проводит лазерное удаление старого татуажа Nd:YAG Q-Switch',
    offer:
      'Удаление старого перманента и тату на однокристальном лазере Nd:YAG Q-Switch: без рубцов, с сохранением родных волосков.',
    ctaHref: '/booking/?service=laser-removal'
  }
];

function initHeroLookSwitcher() {
  const bg = document.getElementById('hero-bg-target');
  const offer = document.getElementById('hero-offer-text');
  const cta = document.getElementById('hero-primary-cta');
  const container = document.getElementById('hero-switcher');
  if (!bg || !offer || !cta || !container) {
    return;
  }

  let activeIndex = 0;
  let timerId = null;

  const applyLook = (index, animate = true) => {
    activeIndex = (index + HERO_LOOKS.length) % HERO_LOOKS.length;
    const current = HERO_LOOKS[activeIndex];

    bg.innerHTML = pictureMarkup(current.image, current.alt, {
      loading: 'eager',
      fetchpriority: 'high',
      className: animate ? 'is-fading-in' : ''
    });
    offer.textContent = current.offer;
    cta.setAttribute('href', current.ctaHref);

    // Rolling 3-card window like Velour (active card + next 2 upcoming cards)
    const visible = [
      HERO_LOOKS[activeIndex],
      HERO_LOOKS[(activeIndex + 1) % HERO_LOOKS.length],
      HERO_LOOKS[(activeIndex + 2) % HERO_LOOKS.length]
    ];

    container.innerHTML = visible
      .map((item, idx) => {
        const isFirst = idx === 0;
        const targetIdx = HERO_LOOKS.findIndex((l) => l.id === item.id);
        return `
          <button
            type="button"
            class="hero-look-card${isFirst ? ' is-active' : ''}"
            data-hero-idx="${targetIdx}"
            aria-pressed="${isFirst}"
          >
            <span class="hero-look-label">${escapeHtml(item.label)}</span>
            <span class="hero-look-media">
              ${pictureMarkup(item.image, '', { loading: 'eager' })}
              <span class="hero-look-arrow" aria-hidden="true">→</span>
            </span>
          </button>
        `;
      })
      .join('');

    container.querySelectorAll('[data-hero-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-hero-idx')) || 0;
        applyLook(idx, true);
        restartAutoCycle();
      });
    });
  };

  const restartAutoCycle = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    if (prefersReducedMotion()) {
      return;
    }
    timerId = setInterval(() => {
      applyLook(activeIndex + 1, true);
    }, 5200);
  };

  container.addEventListener('mouseenter', () => {
    if (timerId) {
      clearInterval(timerId);
    }
  });
  container.addEventListener('mouseleave', restartAutoCycle);

  applyLook(0, false);
  restartAutoCycle();
}

function mountTrustPillars() {
  const container = document.getElementById('home-trust-pillars');
  if (!container) {
    return;
  }
  container.innerHTML = TRUST_PILLARS.map(
    (pillar, idx) => `
      <article class="pillar-card" data-reveal data-reveal-delay="${(idx * 0.08).toFixed(2)}s">
        <span class="pillar-num">${escapeHtml(pillar.number)}</span>
        <h3>${escapeHtml(pillar.title)}</h3>
        <p>${escapeHtml(pillar.text)}</p>
      </article>
    `
  ).join('');
}

function getSlotForIndex(index, activeIndex, total) {
  let diff = index - activeIndex;
  if (diff > total / 2) {
    diff -= total;
  }
  if (diff < -total / 2) {
    diff += total;
  }
  if (diff >= -3 && diff <= 3) {
    return String(diff);
  }
  return diff > 0 ? 'off-right' : 'off-left';
}

function mountCoverflow() {
  const stage = document.getElementById('home-coverflow-stage');
  const counterEl = document.getElementById('coverflow-counter');
  const prevBtn = document.getElementById('coverflow-prev');
  const nextBtn = document.getElementById('coverflow-next');

  if (!stage || !counterEl || !prevBtn || !nextBtn) {
    return;
  }

  const items = PORTFOLIO_ITEMS;
  const total = items.length;
  let activeIndex = 0;
  let autoTimer = null;

  stage.innerHTML = items
    .map(
      (item, idx) => `
      <button
        type="button"
        class="vw-c"
        data-cf-idx="${idx}"
        data-slot="${getSlotForIndex(idx, activeIndex, total)}"
        aria-label="${escapeHtml(item.title)}"
      >
        ${pictureMarkup(item.image, item.alt, { loading: idx < 4 ? 'eager' : 'lazy' })}
        <span class="vw-c-overlay">
          <span class="vw-c-badge">${escapeHtml(item.categoryLabel)}</span>
          <span>
            <span class="vw-c-flank-label">${escapeHtml(item.categoryLabel)}</span>
            <span class="vw-c-center-copy">
              <h3 class="vw-c-title">${escapeHtml(item.title)}</h3>
            </span>
          </span>
        </span>
      </button>
    `
    )
    .join('');

  const cards = stage.querySelectorAll('.vw-c');

  const sync = () => {
    cards.forEach((card, idx) => {
      const slot = getSlotForIndex(idx, activeIndex, total);
      card.setAttribute('data-slot', slot);
      card.setAttribute('aria-current', slot === '0' ? 'true' : 'false');
    });
    const numStr = activeIndex + 1 < 10 ? `0${activeIndex + 1}` : String(activeIndex + 1);
    const totStr = total < 10 ? `0${total}` : String(total);
    counterEl.textContent = `${numStr} / ${totStr}`;
  };

  const goTo = (nextIdx) => {
    activeIndex = (nextIdx + total) % total;
    sync();
  };

  const resetAuto = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
    }
    if (prefersReducedMotion()) {
      return;
    }
    autoTimer = setInterval(() => {
      goTo(activeIndex + 1);
    }, 3800);
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = Number(card.getAttribute('data-cf-idx')) || 0;
      if (idx === activeIndex) {
        window.location.href = '/portfolio/';
        return;
      }
      goTo(idx);
      resetAuto();
    });
  });

  prevBtn.addEventListener('click', () => {
    goTo(activeIndex - 1);
    resetAuto();
  });

  nextBtn.addEventListener('click', () => {
    goTo(activeIndex + 1);
    resetAuto();
  });

  let touchStartX = 0;
  stage.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0]?.clientX || 0;
    },
    { passive: true }
  );
  stage.addEventListener(
    'touchend',
    (e) => {
      const dx = (e.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(dx) > 42) {
        goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1);
        resetAuto();
      }
    },
    { passive: true }
  );

  stage.addEventListener('mouseenter', () => {
    if (autoTimer) {
      clearInterval(autoTimer);
    }
  });
  stage.addEventListener('mouseleave', resetAuto);

  sync();
  resetAuto();
}

function renderVolumeIcon(isMuted) {
  if (isMuted) {
    return `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>`;
  }
  return `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>`;
}

function renderPlayIcon(isPlaying) {
  if (isPlaying) {
    return `<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>`;
  }
  return `<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="7 5 19 12 7 19 7 5" />
  </svg>`;
}

function mountReelsStrip() {
  const container = document.getElementById('home-reels-strip');
  const prevBtn = document.getElementById('reels-prev');
  const nextBtn = document.getElementById('reels-next');
  if (!container) {
    return;
  }

  const reduceMotion = prefersReducedMotion();

  container.innerHTML = REELS_ITEMS.map(
    (reel) => `
      <article class="reel-card" data-reel-id="${escapeHtml(reel.id)}">
        <video
          class="reel-video${reel.letterboxed ? ' is-letterboxed' : ''}"
          src="${escapeHtml(reel.video)}"
          poster="${escapeHtml(reel.poster)}"
          ${reduceMotion ? '' : 'autoplay'}
          muted
          loop
          playsinline
          preload="metadata"
          aria-label="${escapeHtml(reel.title)}"
        ></video>
        <div class="reel-top">
          <div class="reel-story-bar" aria-hidden="true"><span></span></div>
          <div class="reel-top-row">
            <span class="reel-handle">
              <span class="reel-handle-badge" aria-hidden="true">T</span>
              <span>@tatiana_malighina</span>
            </span>
            <div class="reel-controls">
              <button
                type="button"
                class="reel-ctrl-btn"
                data-reel-mute
                aria-label="Включить звук: ${escapeHtml(reel.title)}"
                aria-pressed="false"
              >
                ${renderVolumeIcon(true)}
              </button>
              <button
                type="button"
                class="reel-ctrl-btn"
                data-reel-play
                aria-label="${reduceMotion ? 'Воспроизвести' : 'Поставить на паузу'}: ${escapeHtml(reel.title)}"
                aria-pressed="${reduceMotion ? 'false' : 'true'}"
              >
                ${renderPlayIcon(!reduceMotion)}
              </button>
            </div>
          </div>
        </div>
        <div class="reel-bottom">
          <h3>${escapeHtml(reel.title)}</h3>
          <p>${escapeHtml(reel.subtitle)}</p>
          <a
            class="reel-ig-link"
            href="${escapeHtml(reel.url)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Смотреть в Instagram</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `
  ).join('');

  const cards = Array.from(container.querySelectorAll('.reel-card'));

  const syncPlayButton = (card, isPlaying) => {
    const playBtn = card.querySelector('[data-reel-play]');
    const title = card.querySelector('h3')?.textContent || 'видео';
    if (!playBtn) {
      return;
    }
    playBtn.innerHTML = renderPlayIcon(isPlaying);
    playBtn.setAttribute('aria-pressed', String(isPlaying));
    playBtn.setAttribute('aria-label', `${isPlaying ? 'Поставить на паузу' : 'Воспроизвести'}: ${title}`);
  };

  const syncMuteButton = (card, isMuted) => {
    const muteBtn = card.querySelector('[data-reel-mute]');
    const title = card.querySelector('h3')?.textContent || 'видео';
    if (!muteBtn) {
      return;
    }
    muteBtn.innerHTML = renderVolumeIcon(isMuted);
    muteBtn.setAttribute('aria-pressed', String(!isMuted));
    muteBtn.setAttribute('aria-label', `${isMuted ? 'Включить' : 'Выключить'} звук: ${title}`);
  };

  cards.forEach((card) => {
    const video = card.querySelector('video');
    const barFill = card.querySelector('.reel-story-bar span');
    const playBtn = card.querySelector('[data-reel-play]');
    const muteBtn = card.querySelector('[data-reel-mute]');
    if (!video) {
      return;
    }

    video.addEventListener('timeupdate', () => {
      if (barFill && video.duration > 0) {
        const pct = Math.min(100, (video.currentTime / video.duration) * 100);
        barFill.style.width = `${pct.toFixed(1)}%`;
      }
    });

    video.addEventListener('play', () => syncPlayButton(card, true));
    video.addEventListener('pause', () => syncPlayButton(card, false));

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          card.dataset.userPaused = 'false';
          video.play().catch(() => {});
        } else {
          card.dataset.userPaused = 'true';
          video.pause();
        }
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const nextMuted = !video.muted;
        if (!nextMuted) {
          cards.forEach((other) => {
            if (other !== card) {
              const otherVideo = other.querySelector('video');
              if (otherVideo && !otherVideo.muted) {
                otherVideo.muted = true;
                syncMuteButton(other, true);
              }
            }
          });
          if (video.paused) {
            card.dataset.userPaused = 'false';
            video.play().catch(() => {});
          }
        }
        video.muted = nextMuted;
        syncMuteButton(card, nextMuted);
      });
    }
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const video = card.querySelector('video');
          if (!video) {
            return;
          }
          if (entry.isIntersecting) {
            if (card.dataset.userPaused !== 'true') {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    cards.forEach((card) => observer.observe(card));
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

function mountProcessAccordion() {
  const container = document.getElementById('home-process-accordion');
  if (!container) {
    return;
  }
  let activeStep = 0;

  const render = () => {
    container.innerHTML = PROCESS_STEPS.map((step, idx) => {
      const isActive = idx === activeStep;
      const numStr = `0${idx + 1}`;
      return `
        <button
          type="button"
          class="process-panel${isActive ? ' is-active' : ''}"
          data-process-idx="${idx}"
          aria-expanded="${isActive}"
        >
          ${pictureMarkup(step.image, step.title, { loading: 'lazy' })}
          <div class="process-panel-top">
            <span class="process-panel-step">ШАГ</span>
            <span class="process-panel-num">${numStr}</span>
          </div>
          <div class="process-panel-body">
            <h3 class="process-panel-title">${escapeHtml(step.title)}</h3>
            <p class="process-panel-desc">${escapeHtml(step.description)}</p>
            <div class="process-progress-bars" aria-hidden="true">
              ${PROCESS_STEPS.map(
                (_, segIdx) => `<span class="process-progress-seg${segIdx <= idx ? ' is-filled' : ''}"></span>`
              ).join('')}
            </div>
          </div>
        </button>
      `;
    }).join('');

    container.querySelectorAll('[data-process-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeStep = Number(btn.getAttribute('data-process-idx')) || 0;
        render();
      });
    });
  };

  render();
}

initHeroLookSwitcher();
mountPigmentStrip('#home-pigment-strip');
mountServicesSplit('#home-services-split', { syncUrl: true });
mountTrustPillars();
mountCoverflow();
mountReelsStrip();
mountProcessAccordion();
initCommonUI();
