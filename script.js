/* =============================================================
   Thriwin Bumblebees Preschool — Static Site Scripts
   ============================================================= */

const ALBUM_URL = "https://photos.app.goo.gl/HMGbmAFf7SCpmpN86";

// Baked-in fallback list. The browser tries to refresh this from the live
// Google Photos album on every visit (via a CORS proxy). If the proxy fails
// — they're flaky free services — we just use this list as the fallback.
const PHOTO_URLS = [
  "https://lh3.googleusercontent.com/pw/AP1GczMjB2ULYLcpEcK7NHveZ21YUrxBxk4HgKlC36SjoISqtUFKWIXdrHKDerrCufqSZoRapRSadzWNn-rHlcWcGeVN4VbkpTqcvK3VSfU8RXiwBP_-MiA",
  "https://lh3.googleusercontent.com/pw/AP1GczN8TBkECAQ1IGCaV0E9NKiQD6YMZMjbK-fS0VZAMt7MvKWlZYXF5O84LnMYuRKwA3bhaa5naBfWSnfmibdYRpe1GW-ncycarqvTqQNErO0kfnjtl5U",
  "https://lh3.googleusercontent.com/pw/AP1GczNLWUjelDQWZzRmJcwEmCVLBd952W5lKpFFG9whOCMmUdzT-k8HNG-I9y-G6Q1p4obPXHXq_rcbK-YPFdFkVWEToJ4qNCwOjOJIpE1pi3zKr3evz28",
  "https://lh3.googleusercontent.com/pw/AP1GczNa73GDFcN4gqPoX7hh77r6OrLDpbX1B6N9OskczkLYxBq_1dDhSFm3cRm2B1av1Dfp64bmgsemfuHV-hZZZQc2NJxL1xNqrlzzLq3JHx9bS7DPwRI",
  "https://lh3.googleusercontent.com/pw/AP1GczNvH--Am9Ef9P4bQ2-xO46YRKX_eMW9pYC09pQWIyldLCVgprsJ2vU8xgeptDF028n5kgya9l0i6xnGi-vDK6LQriwIkkrq6s5pdGJTKoSy336q6e4",
  "https://lh3.googleusercontent.com/pw/AP1GczOvoN9SJ9e3BZQk1BMM2pwJFGlUqVdRZCkVzD0P5kbnqZCEoeKiaPbSM5Z30WEgP_gOtDj2qiIyRXHQXnYcjTfl-Q3l0OptHCj7rKLkhT0VZCYEszs",
  "https://lh3.googleusercontent.com/pw/AP1GczPVc4elrJH5L8p4nNcprn_bWMJA85lkgRIitSoChOC45ZSNiYxv7iNzxqZhVdp5TI1Wb_-HEi3lIiCVazXOUbV0EvaCtZOpKoV5_w7h7LCQnbGNTs8",
  "https://lh3.googleusercontent.com/pw/AP1GczPpwMIfQ1xa_gxDhPjRbnhBa-va_9-pLJcaWJQhw_hwGH--YDGPwg3Wr8lCHMd3tWSIUJwjz6Rfy701TeGu1ryEOjFukI6CSrIVqpWo9trw3ocV0Vc"
];

// Shuffle photos so each visit has a different order
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();
  initMobileMenu();
  initLightbox();
  initForms();
  document.getElementById('year').textContent = new Date().getFullYear();

  // Try to refresh photos from the live album BEFORE rendering the gallery.
  // Falls back silently to the baked-in PHOTO_URLS if proxies are unavailable.
  await maybeRefreshPhotosFromAlbum();
  initGallery();
  initVideos();
});

// ==================== LIVE ALBUM REFRESH (browser-side) ====================
// Browsers can't fetch photos.app.goo.gl directly because Google sets a
// restrictive CORS policy. We try a few public CORS proxies in order; if any
// of them returns the album HTML, we extract fresh photo URLs from it.
async function maybeRefreshPhotosFromAlbum() {
  const proxies = [
    (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  ];

  for (const buildUrl of proxies) {
    try {
      const proxied = buildUrl(ALBUM_URL);
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(proxied, { signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) continue;
      const html = await res.text();
      const matches = html.match(/https:\/\/lh3\.googleusercontent\.com\/pw\/[A-Za-z0-9_\-]+/g);
      if (matches && matches.length >= 5) {
        const fresh = Array.from(new Set(matches));
        // Mutate the global PHOTO_URLS in place so the rest of the script uses it.
        PHOTO_URLS.length = 0;
        PHOTO_URLS.push(...fresh);
        console.info(`[gallery] Refreshed ${fresh.length} photos from live album.`);
        return;
      }
    } catch (err) {
      // try next proxy
    }
  }
  console.info('[gallery] Live refresh unavailable — using baked-in photos.');
}

// ==================== INLINE VIDEOS ====================
async function initVideos() {
  const section = document.getElementById('videosSection');
  const grid = document.getElementById('videoGrid');
  if (!section || !grid) return;

  try {
    const res = await fetch('videos.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    const videos = (data && Array.isArray(data.videos)) ? data.videos : [];
    if (videos.length === 0) return;

    grid.innerHTML = videos.map((v, i) => {
      const thumb = v.thumbnail || pickThumbForVideo(i);
      return `
        <a class="video-card" href="${escapeAttr(ALBUM_URL)}" target="_blank" rel="noopener" data-testid="link-video-${i}" aria-label="${escapeAttr(v.title || 'Open video in Google Photos')}">
          <div class="video-frame">
            ${thumb ? `<img src="${escapeAttr(thumb)}" alt="${escapeAttr(v.title || 'Video thumbnail')}" loading="lazy">` : ''}
            <div class="video-play-overlay">
              <div class="play-circle">▶</div>
            </div>
          </div>
          ${v.title ? `<div class="video-card-title">${escapeHtml(v.title)}</div>` : ''}
        </a>
      `;
    }).join('');
    section.hidden = false;
  } catch (err) {
    console.warn('No videos.json found or it is empty.');
  }
}

function pickThumbForVideo(i) {
  // Reuse a photo from the gallery as a fallback thumbnail
  if (typeof PHOTO_URLS !== 'undefined' && PHOTO_URLS.length > 0) {
    const url = PHOTO_URLS[i % PHOTO_URLS.length];
    return url + '=w900-h506';
  }
  return '';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

// ==================== NAVBAR ====================
function initNavbar() {
  const nav = document.getElementById('navbar');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// ==================== GALLERY CAROUSEL ====================
let carouselIndex = 0;
let shuffledPhotos = [];
let autoplayTimer = null;

function initGallery() {
  shuffledPhotos = shuffle(PHOTO_URLS);
  const track = document.getElementById('carouselTrack');
  const thumbs = document.getElementById('thumbGrid');
  const count = document.getElementById('photoCount');

  // Build carousel slides
  track.innerHTML = shuffledPhotos.map((url, i) => `
    <div class="carousel-slide" data-index="${i}">
      <img src="${url}=w900-h675" alt="School moment ${i + 1}" loading="lazy" />
    </div>
  `).join('');

  // Build thumbnails (first 12)
  thumbs.innerHTML = shuffledPhotos.slice(0, 12).map((url, i) => `
    <button class="thumb" data-index="${i}" aria-label="Open photo ${i + 1}">
      <img src="${url}=w400-h400" alt="Thumbnail ${i + 1}" loading="lazy" />
    </button>
  `).join('');

  count.textContent = `Showing ${shuffledPhotos.length} candid moments from our preschool family`;

  // Slide click → lightbox
  track.querySelectorAll('.carousel-slide').forEach(slide =>
    slide.addEventListener('click', () => openLightbox(parseInt(slide.dataset.index, 10)))
  );

  // Thumb click → lightbox
  thumbs.querySelectorAll('.thumb').forEach(btn =>
    btn.addEventListener('click', () => openLightbox(parseInt(btn.dataset.index, 10)))
  );

  // Carousel buttons
  document.getElementById('carouselPrev').addEventListener('click', () => moveCarousel(-1));
  document.getElementById('carouselNext').addEventListener('click', () => moveCarousel(1));

  // Autoplay
  startAutoplay();

  // Pause on hover
  const wrapper = document.querySelector('.carousel-wrapper');
  wrapper.addEventListener('mouseenter', stopAutoplay);
  wrapper.addEventListener('mouseleave', startAutoplay);
}

function moveCarousel(dir) {
  carouselIndex = (carouselIndex + dir + shuffledPhotos.length) % shuffledPhotos.length;
  const track = document.getElementById('carouselTrack');
  const slide = track.querySelector('.carousel-slide');
  if (!slide) return;
  const slideWidth = slide.getBoundingClientRect().width;
  track.style.transform = `translateX(-${carouselIndex * slideWidth}px)`;
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => moveCarousel(1), 4000);
}
function stopAutoplay() {
  if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
}

// ==================== LIGHTBOX ====================
let lightboxIndex = 0;

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', e => { e.stopPropagation(); navLightbox(-1); });
  document.getElementById('lightboxNext').addEventListener('click', e => { e.stopPropagation(); navLightbox(1); });
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = shuffledPhotos[index] + '=w1600-h1200';
  lb.classList.add('active');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('active');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + shuffledPhotos.length) % shuffledPhotos.length;
  document.getElementById('lightboxImg').src = shuffledPhotos[lightboxIndex] + '=w1600-h1200';
}

// ==================== FORMS ====================
function initForms() {
  const admissions = document.getElementById('admissionsForm');
  const contact = document.getElementById('contactForm');

  admissions.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(admissions));
    const subject = encodeURIComponent(`Admission Inquiry — ${data.parentName}`);
    const body = encodeURIComponent(
      `Parent: ${data.parentName}\nPhone: ${data.phone}\nChild's Age: ${data.childAge}\nProgram: ${data.program}\n\nMessage:\n${data.message || '(none)'}`
    );
    window.location.href = `mailto:hello@thriwinbumblebees.in?subject=${subject}&body=${body}`;
    alert(`Thank you ${data.parentName}! Your email client will open to send this application.`);
  });

  contact.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contact));
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(`From: ${data.name} <${data.email}>\n\n${data.message}`);
    window.location.href = `mailto:hello@thriwinbumblebees.in?subject=${subject}&body=${body}`;
    alert(`Thank you ${data.name}! Your email client will open to send this message.`);
  });
}

