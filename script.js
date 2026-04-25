/* =============================================================
   Thriwin Bumblebees Preschool — Static Site Scripts
   ============================================================= */

const ALBUM_URL = "https://photos.app.goo.gl/HMGbmAFf7SCpmpN86";

// Baked-in fallback list. The browser tries to refresh this from the live
// Google Photos album on every visit (via a CORS proxy). If the proxy fails
// — they're flaky free services — we just use this list as the fallback.
const PHOTO_URLS = [
  "https://lh3.googleusercontent.com/pw/AP1GczMDGZmFEmPvUQZQSxxF3neL74PwzIgu0aBl9bivpfV7v3kwr-1MW5VjbAsldv55hwzDMlGNdSZ9BYvKFoD1jj8BobCr9svmWXVnhD7LBS1k9gzUIrA",
  "https://lh3.googleusercontent.com/pw/AP1GczMfu7bVnfsxmXBV5nzqZoggKJbx_v5O7UBVH2JUvTTDCuLOHh39HV02mRenfeF6h8GoVkQ88ZXrlbMC8gTEt0i10x04bHFl0V_Je3lZcmGdkvglBO8",
  "https://lh3.googleusercontent.com/pw/AP1GczMGvoDAhGB13QklZdXkZV9Apc6YNr2BBavaTOzxuVj5_5EahXOjuwgyNMMlwzt44fqSI7IeaIF3LEr_8CSeJCOk5SmCPl3VbTwAMEhkYLr_k8SSbV0",
  "https://lh3.googleusercontent.com/pw/AP1GczMMzocTCY59irJMOuOWM1LHs_Uibg_KtP_2qd6Dj3DPt8K4oHFedWskGg3plwbCANSlO03x09vkNukARDcUuxZtb_XPkCQyqoVuhAzRZP7tLrB4osI",
  "https://lh3.googleusercontent.com/pw/AP1GczMO66u3XM9rYbMHId6c3IAYspTeo3nG0XDi7ItN5B4ph9qbjiZojJTAW5gP-QsnxHBSBe0E5uIeFamD2fVFy6Uezx6-1WfNKofd2SRwQzpgPSL3-Eo",
  "https://lh3.googleusercontent.com/pw/AP1GczMsOkC2MIGCR8vaNLlUVlSaJz0NXt41gZVM1yexP-0rmwQsc5UgiMkaF2UoS6BrND8WaMGo2e4B8nCgGqQdc-KxhwDg4O2RLakyDgiKQB3JHSZAwzA",
  "https://lh3.googleusercontent.com/pw/AP1GczMtcUQ5Uhesu1a-MJkxm2IP-Ec2OJ8r6EJ4toItA-9Wj_TkP5eXePQ5NsPQzd_33rDsgPOXKRpjc8Gpxj_6Qy_J70BGDE6XeTWtiacXQhInJjzuxuY",
  "https://lh3.googleusercontent.com/pw/AP1GczMtQ1g69UCSIS47u6K-oU3mtwt0UJFi-LcSxK0rQ6hpj9e0-AKqcGq9D0Sp9zcRIHwft-e0TwYNGICTVCyHBXMBqjIVGbNSRmVLWTVcb21pBOeuwpQ",
  "https://lh3.googleusercontent.com/pw/AP1GczN2dfRSIeObhfgt57EEMr51NG-zkDoZd28hpnv9Gk-cCzwj7ZWRvVuUb4D2_3uUXRspoU7QUYtWUqvYfTufSWItghOHaDAOCdUUCLcbLUFtUuEx_rM",
  "https://lh3.googleusercontent.com/pw/AP1GczN4QckHLOadLeuJW_-pqSQp04F2B4Rpzyf1WHR_ptMdk1cx34A6rWhe07X4AsMqqyPJP1kzuH6ZohUgZj2UmAdn37q7ivCH-3rSw2FsMfowDeyUF78",
  "https://lh3.googleusercontent.com/pw/AP1GczN56P8yjJsubOwpbgu0KptXIWU_bhb0m45ZeO-5wv4De8P_soYMnLoHR7OqYyYYUUjYiTMYQFVJ867Je6FLJKyPZwg16qxgw-o76pXeb_JrqOY1ECY",
  "https://lh3.googleusercontent.com/pw/AP1GczN9L_Fxz_4t_18zXuzYjUtkvCGC9Owb8IGq1Frgwd8jcxSfnR5L_y2hQybnvhK-WPrelM9fjoeIX47cWhg_UbZMyhIg1eOs9dOKcHTIOGepJ_ROC9w",
  "https://lh3.googleusercontent.com/pw/AP1GczN9YP_cfIIDTAQ43G3IeTZl4atG2ndzmo354EZ8PzTnAvn0jN_YSADugpOjGVZChGkkdTQSefwxVxQbH1yvh5z8BXJU9882sOmLs9_3UAcdFpxCpFQ",
  "https://lh3.googleusercontent.com/pw/AP1GczNJdHAE-SvyrlY3-M7EBZKbT0m6vXp-gU3DIlDrR0Uu3vtDvgcXeOXDzEq6nwY3g12unj7ORd73ENZFrSNBTKrDKrUCNZGqabpknoZdfQchzzLuJxI",
  "https://lh3.googleusercontent.com/pw/AP1GczNLKgcwwBLeu-3pgIi0BVykTUBNnPfLN5vJPDaIKcIbCnH7EQvUqgiY2_ekNRc3gWQE7C-ZDMkvtJOFmI5J0kqGwcBecnZf1kqcxe6XD2C2_IRguvE",
  "https://lh3.googleusercontent.com/pw/AP1GczNrQnm0E5QctJJskecz675deskI6njChB9YeOxXBBdXfBqjD2Kk_mBPfMThwyG8gBRxkFtuaGZHcxk2ZlYsPkR1IGg8WRME-nxDsWk2Kmp9lF8ha8U",
  "https://lh3.googleusercontent.com/pw/AP1GczNTAnH3wtZVzF3sc35WwncAaxPvh_UnWYSf2qlx1x7tWvuGpUXluB-t2_1evudhC1QbJ1ZfXg7fs36PbrhnGcpHwNQ3YYuTmLQvcYC_fsBm49fXFk8",
  "https://lh3.googleusercontent.com/pw/AP1GczNTdepUvLqonSPdmXQN7UsiJkX-WjKi1ml68zTy-3X-pM11Mp_X0JEl9MHlkycYGx7fWuY5qhA0gksKHK8yV35JF1HcZPj-Fuh_UrJj3-lc1siv0qg",
  "https://lh3.googleusercontent.com/pw/AP1GczNtG2ZEjktFz5Pf6Q2sC7PV5rAOYtBVa8YH1CsKJGIhxNshBJ98sbH3Q00Gyoj-mRz7ktlSs5IbQdMs-R3Fv4_mqwzB8iIZ7SfzGVtT-5zhrjGiU-4",
  "https://lh3.googleusercontent.com/pw/AP1GczNxv9rC8DndUPWfu-NO12anIo1miZeVrJRFLheVoB6x9l6G2PtTYDxQ8w5aghtnqNwINORT11KwBoWxnqkybKa2K1m_5dx8Dz8AL9H2Rjf8HCw3QHo",
  "https://lh3.googleusercontent.com/pw/AP1GczNYxPy8tU46-gB30n-JpO1W9TPWrCw18xvKWryREmBVh3p_aotVJ3ANXKTjMWLp2YbswRvlP2TPOv1DP3LoYWBjoZaFK7AS69AxLDwYScLARR-2Uvc",
  "https://lh3.googleusercontent.com/pw/AP1GczNYZ0Uc8icWQS9yjRe6wruzHaOeF45cr9ycnW48l7EYWUlwc4gAJhFQwAbojG7qoJp7oDPcCPnyLlxwRDWBzGVZC1ta-rqDt2rtPP6nGRKAZ2Yus4Q",
  "https://lh3.googleusercontent.com/pw/AP1GczNZAApDcjJLLS4g59UVxxf-jGniegWW2iyCU-8-pgzuDnnZrdq8Z5R7aT1QRymf45sx-xrQBYg-cOc-37Yk993Or1IdPVMmxAxB05ysNGalIoG57yk",
  "https://lh3.googleusercontent.com/pw/AP1GczNZcJFGRroVVvw-70cfw4au_hTC84FfCFCLrGtPbWVMtuyEhM6p3DdRAQt2HhucuWe3oGSQKRf0Kl0Yjr1J9a_dV-EQZeJax3UbMhQcvIRfaLCpAHE",
  "https://lh3.googleusercontent.com/pw/AP1GczNZZu-pjhgdht5xKRq0SKhH-XjIWU64THw6L3EJm8RmmWRKyVpKp_VVHSJ6tP85_QCcFqaBfM-GD9o5eNNFa9fAviewdGQaFU-gDnOA-w-Q07iCvfw",
  "https://lh3.googleusercontent.com/pw/AP1GczO28C_4WsUdo9LRhGS2v3D6dSVlnbFKAWs7TdGk31JI63FKoWy_kFlSt7U8EISiNunyZYV8543V9X47HebG-lrh5VgjIvq_1pKo1kO8kqrthUhBzB8",
  "https://lh3.googleusercontent.com/pw/AP1GczO2A0VS96PTf1iWS4dD5naNK6n_82Z15AZJ9SQyjMWQo-R8hwcQ2hdBslYJ7OVhYufsM0QU1kP1avD5cgRGUViyOLrCcIjxOtZbXFTfsAgUiucw_2Y",
  "https://lh3.googleusercontent.com/pw/AP1GczO43WQRQ1cY0f7IUlen7NDcp8v4ybk1rlgkJoyow6myF9zWFVsab97zu5dHIRPMbhZW1O2H-bygE2XKCBDWtCqgUBixbZvTY0EKpe5lOKwP64ufDN0",
  "https://lh3.googleusercontent.com/pw/AP1GczOFkTjeKgu5W11ZevDo-DrFYRRD40IONYLMV1Dnn2ifVXvgGxnoVYDmnst2aUn6ym6pEBBvF3v8SUPc6DzLCoXuPZSMR_md7YhA1LTAramXy835PZ8",
  "https://lh3.googleusercontent.com/pw/AP1GczO_l5XJ7L4M47wIbZs2PxjdI0gn8XLZE7iJTsc2NokcmkIsd6cmtlD0nCt4fgIbuD7Pac0mhrGtPBLW3PfmPd4YcKVl1RXW68-TdydiwgDSQkjx-bU",
  "https://lh3.googleusercontent.com/pw/AP1GczOp3h5RVOunVOVW3s2-Vc8_sr2L0siooeyXSruxonMZB8UDQL_5_k_73_--yABm9869dF6ADD29AxWpojmm3UjeZ_yGdMuyth5LecPULAXT3HkEwe0",
  "https://lh3.googleusercontent.com/pw/AP1GczOQe_lUwplo-Yp29tKPkP5HkR_YCNDVzn_0LkUdLqHpkkBByxLah5an_rxrb0boRcEsTw4C7Gdxhr_EHi8hiLwjF63DJWFMNIHhoW_T0RfkNSJDgyU",
  "https://lh3.googleusercontent.com/pw/AP1GczOvu8gVeNtMjIxFWXpTfeI9cU1GLWTRwIhGN3DsSjUSD-OGzAlBkR3ymPqhntI5hD-g56SfpeJ79H8qv3w65iUts9J5EMLWk-1c7e0aReyDBFacEOk",
  "https://lh3.googleusercontent.com/pw/AP1GczOxDCxQ66BMZ5hFvODdP2tzEx35RO4NBT2kcSnrpSPIg2rrDAT4mfU04y5hUeTUn6vxitGFy2gDkeebGpNopPIQJIqMpaa0pPqXmY-NsawjrsVwW7E",
  "https://lh3.googleusercontent.com/pw/AP1GczOyQ7f0wDAEr70XDho62wj6hB8SOU14CJQCSc_v7wVsPr28I8PcvHc8VaTw3u_y5vET6Udimp1NDMoZKT7IOWFeSy44tSIvNagk7xtKiKshECCHNW0",
  "https://lh3.googleusercontent.com/pw/AP1GczP1-p9NJ6r5Gy6Mt0a-UnU2CLOaBFHXw3zsncsqseDHdpf1sUxvhfdnB0xaR--8-aDZdNXHRD-HcKcb6LwDaT5NcY5IFHBJKmU6qySRGtMoLSYQR6s",
  "https://lh3.googleusercontent.com/pw/AP1GczPDIXyQVKOVI-p04vciTlT32E5vtd8GiH9NqyPisq7yYFLRQ8A4ovzC-ObF6fCAlkhBRp9NBOVvDbu98R1x2QNrRcqNRzN79NNJtkj-CgmiUe0VYzM",
  "https://lh3.googleusercontent.com/pw/AP1GczPFOUUZEw-hlIMb6N3leig7Wy7_iJpDcQsSq6f1A6bCo75hthKnKdTG7K1sQI_TiaX_r2OMzx42rNXtPpE2VIFvV43gq0k7WdQs3_fl5o0f9BpjoiA",
  "https://lh3.googleusercontent.com/pw/AP1GczPgLEoDW3xpl8JRIeiZnIoufXOKQeNkmjtGPMODud4oIZK_cCDcy2q7r9whOReACpV0OtA8tnir5U6LnCxVJNl6fLQZwdb7tWQpXhZKIpIhgXxS4Mc",
  "https://lh3.googleusercontent.com/pw/AP1GczPgTc0cdFPZ0tjdI73sodnjSkHXr4MJJXnqddWZQ_DWWsYquskNbc13f2hLtnwXLV3rFx2ufIR_7zIE6JsjEtwYooPRbZkO_fYKzoJUSiSUlEpVEi0",
  "https://lh3.googleusercontent.com/pw/AP1GczPM1b2K7w0A1a6qBVzFQrx-YXCfJWFNoK38tNizkhpPo1vPS2vulQvf0cgrAmD2qese7cHyCmyYAwEm2KY-pweOmWl8gogIeSiB2H9JQnrYIahLYD4",
  "https://lh3.googleusercontent.com/pw/AP1GczPnYvII62zUxXUYbsMiVdZNmBYg6nwcZ2hcFnSyphtxp_6cdHem7NtgGBxE7lwrWjFPleEq2cjAH3b8veY38vjx2ShlR30Y9qpz-NQVa7AgNus3rUc",
  "https://lh3.googleusercontent.com/pw/AP1GczPTc9LQUixjfy6yOiJMmCARSLAwKez6SQ-MUftfPGFtci2evLVCE-atQhBwuvw4afIc1HCCN0up4R1rS1IBFvCJVs9Iys4hIBzl9kPCki_eZ0KPYL0",
  "https://lh3.googleusercontent.com/pw/AP1GczPvJmJCKMXrDBQFAgJpBAE9tMtUA6KiybuxYbsNUXQnRq9mr0JfbYPGHB9j58QzjnugM6cEi5_0CacgwdmHSChDdsk1WnSpxCBVtr81KtJdt3DqUHY",
  "https://lh3.googleusercontent.com/pw/AP1GczPzZqxcKbkKfHLb3bhJPmcSjK2lqE1Rv49RCpQzfkTZ95qCksdxY8dUY6hGGp7iYrYvd0Eu7FuxXE0JgbUfYfpFoGZkXfdHXAkEQ3IepJAxjdsl74o"
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

