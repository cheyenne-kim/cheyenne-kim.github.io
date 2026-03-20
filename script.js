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

// ── Photo Collections ──────────────────────────────────────
const COLLECTIONS = [
  {
    name: 'Aoife',
    photos: [
      'aoife/06884286-A7A3-4D53-BF81-00F43CA0D2402024-06-17_19-46-56_916.JPEG',
      'aoife/18CB7335-75B5-46D2-8489-ED035CC281A92024-06-17_19-50-33_759.JPEG',
      'aoife/360D83F0-9296-44B3-AE1C-7EDCDF6411FF2024-06-17_19-46-56_972.JPEG',
      'aoife/60AF7E90-FDAB-47EE-A122-483D1B5DDA072024-07-02_23-43-54_001.JPEG',
      'aoife/69649C45-42DB-466F-B4D3-78DD2AA56F012024-06-17_19-56-56_554.JPEG',
      'aoife/735FB459-68EE-4514-B4E4-575027B445052024-06-17_19-56-56_456.JPEG',
      'aoife/825366B4-BFD3-4271-9B84-0FAC5FC551AF2024-06-17_19-46-56_859.JPEG',
      'aoife/CD935474-4E19-4715-B919-C5AE4980D9662024-06-17_19-56-56_511.JPEG',
    ]
  },
  {
    name: 'Charlene & Noah',
    photos: [
      'charlene and noah/DSC05068.jpg',
      'charlene and noah/DSC05020.jpg',
      'charlene and noah/DSC05080.jpg',
      'charlene and noah/DSC05087.jpg',
      'charlene and noah/DSC05091.jpg',
      'charlene and noah/DSC05096.jpg',
      'charlene and noah/DSC05107.jpg',
      'charlene and noah/DSC05150.jpg',
      'charlene and noah/DSC05269.jpg',
      'charlene and noah/DSC05270.jpg',
      'charlene and noah/DSC05329.jpg',
      'charlene and noah/DSC05481.jpg',
      'charlene and noah/DSC05511.jpg',
      'charlene and noah/DSC05515.jpg',
      'charlene and noah/DSC05544.jpg',
      'charlene and noah/DSC05561.jpg',
      'charlene and noah/DSC05594.jpg',
      'charlene and noah/DSC05599.jpg',
      'charlene and noah/FF20200E-F6B2-4783-A77D-4AFD30C8F1662024-06-17_19-50-33_707.JPEG',
    ]
  },
  {
    name: 'Cherokee',
    photos: [
      'cherokee/IMG_8037.jpg',
      'cherokee/IMG_7807 (1).jpg',
      'cherokee/IMG_7890.jpg',
      'cherokee/IMG_7901.jpg',
      'cherokee/IMG_8043.jpg',
    ]
  },
  {
    name: 'Hyae Mi & Johnny',
    photos: [
      'hyae mi and johnny/edited-003.jpg',
      'hyae mi and johnny/edited-018.jpg',
      'hyae mi and johnny/edited-069.jpg',
      'hyae mi and johnny/edited-086.jpg',
      'hyae mi and johnny/edited-142.jpg',
      'hyae mi and johnny/edited-188.jpg',
      'hyae mi and johnny/edited-198.jpg',
      'hyae mi and johnny/edited-210.jpg',
      'hyae mi and johnny/edited-213.jpg',
      'hyae mi and johnny/edited-237.jpg',
      'hyae mi and johnny/edited-259.jpg',
      'hyae mi and johnny/edited-289.jpg',
      'hyae mi and johnny/edited-323.jpg',
      'hyae mi and johnny/edited-331.jpg',
      'hyae mi and johnny/edited-347.jpg',
      'hyae mi and johnny/edited-353.jpg',
      'hyae mi and johnny/edited-416.jpg',
      'hyae mi and johnny/edited-423.jpg',
      'hyae mi and johnny/edited-482.jpg',
    ]
  },
  {
    name: 'Maddy',
    photos: [
      'maddy/DSC01262 (1).jpg',
      'maddy/DSC01052.jpg',
      'maddy/DSC01134.jpg',
      'maddy/DSC01157.jpg',
      'maddy/DSC01163.jpg',
      'maddy/DSC01262.jpg',
      'maddy/DSC01335.jpg',
      'maddy/DSC01400.jpg',
    ]
  },
  {
    name: 'Megan',
    photos: [
      'megan/709C7AD0-6472-4337-BFF8-E3D99E7BB3F82022-05-17_06-23-35_350.JPEG',
      'megan/0D6E4BFB-D55F-403F-9388-D665564E4AE42022-05-17_06-33-52_090.JPEG',
      'megan/110CC23E-D12F-4BC6-9C63-859D7EC8EF3E2022-05-17_06-18-30_650.JPEG',
      'megan/444C0B6B-3AF1-4EA2-BF83-57FAD9594F572022-05-17_06-28-03_340.JPEG',
      'megan/6107EBA9-9148-42B0-862B-D794F6B27ECB2022-05-17_06-24-36_490.JPEG',
      'megan/8301BC89-F60D-4EAC-BC2D-D28910DF4DA22022-05-17_06-19-55_390.JPEG',
      'megan/83CDB07A-2611-4BD8-8091-DF50CACCAE7F2022-05-17_06-23-41_780.JPEG',
      'megan/9F4472D4-7CA8-4F95-84BF-320AC3EB0FC42022-05-17_06-42-16_960.JPEG',
    ]
  },
  {
    name: 'Burr Family',
    photos: [
      'burr family/DSC05684.jpg',
      'burr family/DSC05688.jpg',
      'burr family/DSC05698.jpg',
      'burr family/DSC05705.jpg',
      'burr family/DSC05712.jpg',
      'burr family/DSC05713.jpg',
      'burr family/DSC05743.jpg',
      'burr family/DSC05746.jpg',
      'burr family/DSC05751.jpg',
    ]
  },
  {
    name: 'Fall',
    photos: [
      'fall/edited-653.jpg',
      'fall/edited-656.jpg',
      'fall/edited-676.jpg',
      'fall/edited-684.jpg',
      'fall/edited-690.jpg',
      'fall/edited-705.jpg',
      'fall/edited-854.jpg',
      'fall/edited-909.jpg',
    ]
  },
  {
    name: 'Pet',
    photos: [
      'pet/31A6887F-AA99-4B82-9E0D-3859A4171AAD2019-01-29_15-59-24_000.JPEG',
      'pet/53C1A6F4-6802-475C-9B05-6EEBC0E532D12019-01-29_15-57-59_000.JPEG',
      'pet/5EBC8091-F849-4EFA-9286-39BBFE8EEFBF2019-01-29_16-00-00_000.JPEG',
      'pet/701A7362-849D-4A6F-935A-ACCD30FFA4672018-11-23_18-03-13_000.JPEG',
      'pet/84315B43-2816-4ADC-BF6D-D0E542D0AAD42018-11-23_18-04-21_000.JPEG',
      'pet/8BFF691A-C181-42F2-A3E1-432CE3C94A7F2019-01-29_15-59-21_000.JPEG',
      'pet/909908FB-0B33-48CF-9C8F-C499392846532019-01-29_15-58-01_000.JPEG',
      'pet/9A9A0D23-6B72-4DD7-B91B-223C35617EC02019-01-29_16-01-57_000.JPEG',
      'pet/D1953E06-7F3E-4483-95BA-44844C55A3282019-01-29_15-59-17_000.JPEG',
    ]
  },
  {
    name: 'Sam',
    photos: [
      'sam/82B6503A-C375-4532-A57E-51936598E6C22022-05-07_08-16-52_350.JPEG',
      'sam/566D24EF-F0ED-4764-81BE-DABCCB31D3512022-05-07_07-37-59_780.JPEG',
      'sam/622725AF-C5E9-4236-BC1C-A52085783EDC2022-05-07_08-07-25_030.JPEG',
      'sam/D5862F55-BC18-4EB5-A1CE-D8BD5FDD11002022-05-22_13-13-47_938.JPEG',
      'sam/F5ECCC43-B06E-44FE-8FD5-79506D4692672022-05-07_07-50-51_710.JPEG',
    ]
  },
];

// Render collection cards
const collectionsGrid = document.getElementById('collections-grid');
if (collectionsGrid) {
  COLLECTIONS.forEach((col, idx) => {
    const card = document.createElement('div');
    card.className = 'collection-card';
    card.innerHTML = `
      <img src="${encodeURI(col.photos[0])}" alt="${col.name}" loading="lazy" />
      <div class="collection-info">
        <span class="collection-name">${col.name}</span>
        <span class="collection-count">${col.photos.length} photos</span>
      </div>
    `;
    card.addEventListener('click', () => openGallery(idx, 0));
    collectionsGrid.appendChild(card);
  });
}

// ── Gallery Lightbox ───────────────────────────────────────
let galCollection = 0;
let galPhoto = 0;

const galModal   = document.getElementById('gallery-modal');
const galImg     = document.getElementById('gallery-img');
const galName    = document.getElementById('gallery-name');
const galCounter = document.getElementById('gallery-counter');

function openGallery(collIdx, photoIdx) {
  galCollection = collIdx;
  galPhoto = photoIdx;
  updateGallery();
  galModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  galModal.classList.remove('open');
  document.body.style.overflow = '';
}

function updateGallery() {
  const col = COLLECTIONS[galCollection];
  galImg.style.opacity = '0';
  setTimeout(() => {
    galImg.src = encodeURI(col.photos[galPhoto]);
    galImg.alt = col.name;
    galImg.style.opacity = '1';
  }, 150);
  galName.textContent = col.name;
  galCounter.textContent = `${galPhoto + 1} / ${col.photos.length}`;
}

function galNext() {
  const len = COLLECTIONS[galCollection].photos.length;
  galPhoto = (galPhoto + 1) % len;
  updateGallery();
}

function galPrev() {
  const len = COLLECTIONS[galCollection].photos.length;
  galPhoto = (galPhoto - 1 + len) % len;
  updateGallery();
}

if (galModal) {
  document.getElementById('gallery-close').addEventListener('click', closeGallery);
  document.getElementById('gallery-prev').addEventListener('click', galPrev);
  document.getElementById('gallery-next').addEventListener('click', galNext);
  document.querySelector('.gallery-backdrop').addEventListener('click', closeGallery);
  document.addEventListener('keydown', e => {
    if (!galModal.classList.contains('open')) return;
    if (e.key === 'Escape')      closeGallery();
    if (e.key === 'ArrowRight')  galNext();
    if (e.key === 'ArrowLeft')   galPrev();
  });
}
