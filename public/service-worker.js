const CACHE_NAME = 'mymacysapp-v2';
// 仅缓存静态资源，避免缓存 index.html 导致标题更新不生效
const urlsToCache = [
  '/',
  '/src/assets/fontawesome/css/all.min.css',
  '/src/assets/placeholder.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 对 HTML 采用 network-first，确保 index.html 总是优先从网络获取最新版本
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const acceptHeader = request.headers.get('accept') || '';

  if (request.mode === 'navigate' || acceptHeader.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 在线成功则更新缓存并返回
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // 其他静态资源采用 cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});