const CACHE_VERSION = 'securide24-static-v2';
const STATIC_CACHE = CACHE_VERSION;
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/header.css',
  '/css/home.css?v=15',
  '/css/pages.css',
  '/js/app.js',
  '/js/utils.js',
  '/js/navigation.js',
  '/js/lazy-world-map-loader.js?v=1',
  '/assets/images/logo.webp',
  '/assets/icons/logo-favicon.svg?v=2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((key) => key !== STATIC_CACHE)
        .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

function isStaticAssetRequest(requestUrl) {
  return /\.(?:css|js|webp|avif|png|jpg|jpeg|gif|svg|webm|woff2?)$/i.test(requestUrl.pathname);
}

function isCriticalUiAsset(requestUrl) {
  return requestUrl.pathname.endsWith('/js/app.js') || requestUrl.pathname.endsWith('/css/components.css');
}

function isTrustedCdn(requestUrl) {
  return requestUrl.origin === 'https://cdn.jsdelivr.net';
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  if (isSameOrigin && isStaticAssetRequest(requestUrl)) {
    if (isCriticalUiAsset(requestUrl)) {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => caches.match(event.request))
      );
      return;
    }

    event.respondWith(
      caches.match(event.request).then((cached) => {
        const networkFetch = fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => cached);

        return cached || networkFetch;
      })
    );
    return;
  }

  if (isTrustedCdn(requestUrl)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) {
          return cached;
        }

        return fetch(event.request).then((response) => {
          if (response && response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        });
      })
    );
  }
});
