// ── Page Loader ──────────────────────────────────────────────
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader && loader.classList.add('hidden'), 900);
});

// ── Custom Cursor ─────────────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

if (cursor && cursorRing) {
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Ring follows with slight lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow ring on hover over interactive elements
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ── Text Scramble ─────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function scramble(el) {
  const target = el.dataset.value;
  let iteration = 0;
  clearInterval(el._scramble);
  el._scramble = setInterval(() => {
    el.textContent = target.split('').map((char, i) => {
      if (i < Math.floor(iteration)) return target[i];
      return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (iteration >= target.length) {
      el.textContent = target;
      clearInterval(el._scramble);
    }
    iteration += 0.4;
  }, 35);
}

// Run scramble on page load for hero/page-header
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.scramble').forEach((el, i) => {
      setTimeout(() => scramble(el), i * 150);
    });
  }, 950); // after loader fades
});

// ── Nav Scroll State ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav && nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Portfolio Tabs ────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(`tab-${target}`);
    panel.classList.add('active');
    panel.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  });
});

// ── Scroll Reveal ─────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll(
  '.section-header, .timeline-item, .contact-blurb, .contact-links, .resume-cta, .about-intro, .about-stats, .about-layout, .overview-card'
).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// ── Stat Counters ─────────────────────────────────────────────
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    let start = 0;
    const duration = 1200;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stat-value[data-count]').forEach(el => {
  statObserver.observe(el);
});
