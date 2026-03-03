const CACHE_NAME = 'a330-panel-v3';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/bilgiler.html',
        '/reset.html',
        '/borescope.html',
        '/cb.html',
        '/sematik.html',
        '/kisaltmalar.html',
        '/panels.html',
        '/circuit.html',
        '/data.js',
        '/resetData.js',
        '/330.png',
        '/lh1.png',
        '/rh2.png'
      ]);
    })
  );
  self.skipWaiting(); // ← Hemen aktifleş, bekleme
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim(); // ← Hemen kontrolü al
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Sadece geçerli GET isteklerini cache'le
        if (!response || response.status !== 200 || event.request.method !== 'GET') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        return new Response('Çevrimdışı - Bu sayfa önbellekte bulunamadı.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});
