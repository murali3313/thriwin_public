/* =============================================================
   Thriwin Bumblebees Preschool — Static Site Scripts
   ============================================================= */

const ALBUM_URL = "https://photos.app.goo.gl/HMGbmAFf7SCpmpN86";

// Baked-in fallback list. The browser tries to refresh this from the live
// Google Photos album on every visit (via a CORS proxy). If the proxy fails
// — they're flaky free services — we just use this list as the fallback.
const PHOTO_URLS = [
  "https://lh3.googleusercontent.com/pw/AP1GczM0VRUbVOO4vVIgx6w0pCJfZJeyYg8Ij7lTsKmtz7yDBQhktmYv0irryeD5DoLxIr_2_gaeW-8RZ_da61wy79OP9bkrZmgejxN6VFSVe59zmqgKj1FN",
  "https://lh3.googleusercontent.com/pw/AP1GczM7EZk57XLGKU74-rI58Ddsgra5Lq4Jhd7BctBXaT29yx8hQn4tm_Df3nQ625XueW1wX8d3K9OUreXZ4Km80KPImY-Qi6jPF8_eXr1Yfgz72ZRCRYF3",
  "https://lh3.googleusercontent.com/pw/AP1GczMGPN-q0Jm633byMQRFJ6Me2vkha-QnBAqQq7UfnKmYdbDEwLAHaX92WRkI_TNQgh-E0wPraUoN7TuTm-wMWEy3d_b2HwdXSeCojGGr54ix1fWoxaZ5",
  "https://lh3.googleusercontent.com/pw/AP1GczMd5w8MI2uY2y2npDv9qGpX77RtWCakIi66xwbYEoRMmigEBfPlKVLP0ievytuUNTIwubUzpRCFtpuqzwxb3c9x1MNHj1o_F3YtM-ZQPfW4qBg4cT2j",
  "https://lh3.googleusercontent.com/pw/AP1GczMvnFRO1H30dq6PBPwk1XbmgzfD4YP-Gh-BAwpXMq5c_DU61H-oVlGE5VRo-UiI_3EqBS59oQgZo0eMBKDm48eOcJmwzelO1xgS8BF0ZcoektNaJMF2",
  "https://lh3.googleusercontent.com/pw/AP1GczMwgt4TFEwTo3P5niY8i_DlflpuR8tcRx83IvRRdyU4JcDkNiGZS4bmMRawMFMAWSuRKf17UWWumc2Z4vmJ6q7kGvIS2cDhWeGi1KVXg5dFwrrHrQ0g",
  "https://lh3.googleusercontent.com/pw/AP1GczMxNgDKtxoLIzbYGuW-__0qZobJKR_YuCaxiTuLl53yFnbjBrz9jhHWGN-Zp-Q6xmbroC90qAeDrmQTgvifgyAEiPcRz70z2rR4VcMdCazY4i6EmIBZ",
  "https://lh3.googleusercontent.com/pw/AP1GczN8LP3qW6gTUa4L9FnSUrTUQN9MlVJMvkMxwy9bxwriVtPLSmdUu9UpJK0dOdoSSNkONMXtl32QLMXEw7pm2vfRH1CXrPNJorsOPic8gCziXAtzweWV",
  "https://lh3.googleusercontent.com/pw/AP1GczNGhNpzkm7xq81UlZVNcBYzH0XHfx0qdKusc2l7Spl6lqXqs5qdsuSSCb7WKZxSfoCT980p4Stw1G_9mpqMaPsrd6cdi-6Pt9G6eK-YptqCO6siJYL2",
  "https://lh3.googleusercontent.com/pw/AP1GczNaySCBIqKn-5ApYgfZmHUkj3eSYN-E7Nnq5DjgzmYEMmWzqN8IlFuf7l_JP-ZNQrehLTJbkzi4pq0B6alikkIMSoFw_-132f3RxhffmiOfKfPFC_7l",
  "https://lh3.googleusercontent.com/pw/AP1GczNcOD_ZGGPLHFnQuHLA2ViM5-clBcKeZwaVQILlkW46-sMP8p66jI7W9DxHHruUgrTAsjHBo3YyXgeTEBLCAPd9aD883463Le4h8s2Y97UVQ3O5EFZc",
  "https://lh3.googleusercontent.com/pw/AP1GczNdTrCfM-_SX6zVhbnt9APgvdrOzcyRTWQXAa3oujSGH9VT_cfnQFtOitUF4IxnDrwQpU0bXA1ko3TTR12koACHvm_CNmEdv5LdGsTPSvduOsv6dRN2",
  "https://lh3.googleusercontent.com/pw/AP1GczNdxPQVgppzYAjJRTtN-zywROW_1I73jAFZ8j17jnoWPpd3Jm351XuDBo2XbZ64RPWCPs0dA8a-6BY0UFi3VdwZEayW9YRKapxSmVJv4NKqHDy_VDMD",
  "https://lh3.googleusercontent.com/pw/AP1GczNi29i-pCQgSrNfguGO1pmBdVF9Sww55VvjHtQZUQzeAIW1plest_zNWyFVCYBTeqDntGgJ9EH7RMnrARspLZSd31a0Fme3BpTypwdoFhBTwubw4x0W",
  "https://lh3.googleusercontent.com/pw/AP1GczNnShK7QVsOOU4SLpNHaXJ2O1kl5zRoj1Tid7IMw2hEbJNzhJ7VsQOW7-C9CsbifyLQNO_ZJipGdItT95OrlMcKhmhvEkbcHuhWuvHwqZSpASsYGDFu",
  "https://lh3.googleusercontent.com/pw/AP1GczNqa4HjZKA0qTCTpbp4e8oTifdPS1sqPnF3cLlnGV7KHia8FvYqc7g5Leh5w2RLJrs2FYjY9Nnv9o2HmCXHchJAis6gKkXedWcO0QjVCMKnQ8nViT0A",
  "https://lh3.googleusercontent.com/pw/AP1GczO8E3qJoLu-xZT1vrmmmV2baub63ovtZl1Q5daVip-BKRpTWc2Xoda2rgMVqzOC0GJ1jmQLjzL6JUDmaZAPqUUuDp98SKYm-SHVaNuJBDoFunadBhT2",
  "https://lh3.googleusercontent.com/pw/AP1GczOiZg_-AbvDMhzCgMtqJdCCyf6CKCeHna2J_vynKjOmiNkAAXwfhadl4vmSHWanDJ7J9wrkDZ-vzJPwu4YKCMyGKUDgC-wTQ2DoI8p89XIv8iLyKzoA",
  "https://lh3.googleusercontent.com/pw/AP1GczOqGnbm8uX0gQxnGwrJ9PnAh_n1hWsvasoX24B9-qnEPDSigX4KuuHC7mQ7ppM5uEFjIG5R8WB04s16iMDMJZ9gmYVSi9L_p7jWp-xZwVB13DyeveSW",
  "https://lh3.googleusercontent.com/pw/AP1GczOtbmXe18bW1swfJjEvo23DhGP7l6HM3I8lZn3LpgPTppfrpu0SPnDmK0rxrfcuP1omiN3-fZLYeMhd5CUQ9-yecpvnP7A08s-NKi_5jlKa0Iv6JyKk",
  "https://lh3.googleusercontent.com/pw/AP1GczOuSlFik5sBsO08Ey9f1SMYI-318TUvHzlK_91yQtJuev1Kn0YviMmI45Jpb5vxFDlxnbDNtdAN9vNSh7SJj4Ju0aoMKE59ISkWY6wS3tL6LeP4hyXK",
  "https://lh3.googleusercontent.com/pw/AP1GczP-sXFKl7I7w2V-vO0aFQ28yL4ckBDH1wSEZQrRci6IePr7ze9Zz_J_fudeEDFDckELnmA_pcBw-J3MtpZDpDRl8aSUPrggvvpNBwZoHROCGbTf_GG_",
  "https://lh3.googleusercontent.com/pw/AP1GczPAZP0s201JGbKBn_Qu8-nJJlTSfMVw-ETRbQ2hDRqmopW-6PJZ8U1j09woCRkmttGuapvBH039embdkeFSZWoniFKS9EHuzxwVIJFqNJqPnU_wBxzG",
  "https://lh3.googleusercontent.com/pw/AP1GczPEtWd3EQzzIk7hzYcoiDyn1uZh6ge4yb165bTGqBJd-S3a1m8zoI8BgbUGxGAA_ZDzSjknhIds7GDblmumEbQghThuJD-LZdoN2TrVvKVfOys4SN-d",
  "https://lh3.googleusercontent.com/pw/AP1GczPMCoBQC_5sZpZB7bDttPgKaI_Iuom-vS1ilLPGpBAqGy_ie_4WCHGBH3-BJ12_mh0eBmJk2x--D3l4Y3E8EEWYOwaFcK10iNaHP-EVsfoCyvq5MKAZ",
  "https://lh3.googleusercontent.com/pw/AP1GczPSMHWZS_q01z9K4309o-ERcWCg3O3tiqy44dD_JPgDCSVz7vW3cFz7f_R9ZrOra3cuhNEfZiTm1e58rg_RbMq4InI6Wy3ZlQkhCjMbBWCxT6iYxPEl",
  "https://lh3.googleusercontent.com/pw/AP1GczPUNc3ba9sGznSWel8wtH1pRpeKPjx1XSRTRpXqbWDITKHgdS9_GwaGuPPA6z_4Yczr7t_t9vHodX4WrJxE4IB2ZPJMhCiNSwmz_0cFHAxmpbQum_11",
  "https://lh3.googleusercontent.com/pw/AP1GczPW7xmvq1Tlupgy7lszTYC-GlwS1kCYJ8CafBMtfvwZtQ2XbcXDKTBwh6YePifjZnhbrt5KjhtIdwwfzarGxRR9pFSq16BYsWnj_eaPNgQVk-EozAap",
  "https://lh3.googleusercontent.com/pw/AP1GczP_vWEfjiLEDDvHImp9-qZjf6eZ-u8h6On0_oI9MVa7KCY82QHlob9k5THsue_qQciRkI2rHmfGlboYRHvfA3gRM-nwSZuvfo5dpbrCvrJwptYqi1qi",
  "https://lh3.googleusercontent.com/pw/AP1GczPjnZqiMNj6_nr8YuH3f8ZU_VFxTlDhn1phPmnGlgTOUUHR9uOSumpeP5ANxM0o8ciB70MI0IIiwb0ujGz35YM8t_8ZcJUwU92fqQEj6SV67fOL2gU-",
  "https://lh3.googleusercontent.com/pw/AP1GczPopwTMPcu9I17sc2vjp-TtQcIbw-9NRycwqYyEDaJW6VMHtFjuEI6bes54_7Rb1KrWCA9AaDhcW0R3dtd7pe3He0iYLXAwh6C0JajEzezRR7BZTZru",
  "https://lh3.googleusercontent.com/pw/AP1GczPvuZLdUwFkSmAvS50GN-uhAURKP58p7qJnu7vR3Xz-kj0ctT2SDhL4NzkUWjl2O4Qp7hT9DdbqIAqQTkV3JNSQwp29DH5Xkh0mHQKOivqIxJvW1HBw",
  "https://lh3.googleusercontent.com/pw/AP1GczPxZGV5S_ojEp7wdADyl0S6EvlmHrLdntNWLuXVT_yzc7AcbWHBIJPaU3gu0EyYnEWX9JR0mvtQaHinDq893APdcYJAYlCwbRStMBucNogjC0547hQp"
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

