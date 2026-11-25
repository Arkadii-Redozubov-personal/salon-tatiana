export function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initScrollReveal() {
  const nodes = document.querySelectorAll('[data-reveal]');
  if (nodes.length === 0) {
    return;
  }

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
  );

  nodes.forEach((node) => {
    const delay = node.getAttribute('data-reveal-delay');
    if (delay) {
      node.style.setProperty('--reveal-delay', delay);
    }
    observer.observe(node);
  });
}

export function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) {
    return;
  }

  const animateNode = (el) => {
    const target = Number(el.getAttribute('data-counter')) || 0;
    const suffix = el.getAttribute('data-counter-suffix') || '';

    if (prefersReducedMotion() || target <= 0) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1100;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = `${current}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateNode);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNode(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((node) => observer.observe(node));
}

export function initStickyHeaderOnHome() {
  if (document.body.getAttribute('data-page') !== 'home') {
    return;
  }

  const header = document.getElementById('site-header');
  if (!header) {
    return;
  }

  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 120);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

