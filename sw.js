/* ═══════════════════════════════════════
   競拍雷達 AuctionRadar — Service Worker
   版本更新時請修改 CACHE_NAME
═══════════════════════════════════════ */
const CACHE_NAME = 'auction-radar-v2-1';

/* 離線時快取的核心資源 */
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

/* 外部 CDN 資源（Chart.js、Google Fonts） */
const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Noto+Sans+TC:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap',
];

/* ── Install: 預快取核心資源 ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 核心資源必須成功，CDN 資源失敗可容忍
      return cache.addAll(CORE_ASSETS).then(() => {
        CDN_ASSETS.forEach(url => cache.add(url).catch(() => {}));
      });
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: 清除舊快取 ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: 快取優先策略 ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API 請求（mis.twse、twse、tpex 等）永遠走網路，不快取
  const liveAPIs = [
    'mis.twse.com.tw',
    'twse.com.tw',
    'tpex.org.tw',
    'openapi.twse.com.tw',
    'corsproxy.io',
    'allorigins.win',
  ];
  if (liveAPIs.some(domain => url.hostname.includes(domain))) {
    event.respondWith(fetch(event.request).catch(() =>
      new Response(JSON.stringify({ error: 'offline' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    ));
    return;
  }

  // 靜態資源：快取優先，網路備援
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // 只快取成功的 GET 請求
        if (!response || response.status !== 200 || event.request.method !== 'GET') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // 離線時回傳快取的 index.html（SPA fallback）
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
