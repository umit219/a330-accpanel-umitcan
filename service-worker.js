const CACHE_NAME = 'a330-panel-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/bilgiler.html',
  '/reset.html',
  '/borescope.html',
  '/cb.html',
  '/sematik.html',
  '/kisaltmalar.html',
  '/panels.html',
  '/330.png'
];

// Kurulum - Cache'e dosyaları ekle
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache açıldı');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktifleştirme - Eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eski cache siliniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - Cache-first stratejisi
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache'de varsa onu döndür
        if (response) {
          return response;
        }
        
        // Yoksa internetten al
        return fetch(event.request).then(response => {
          // Geçerli bir response değilse cache'leme
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Response'u klonla (bir kere kullanılabilir)
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Offline ise ve sayfa bulunamazsa
        return new Response('Çevrimdışı moddasınız. Bu sayfa cache\'de yok.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});