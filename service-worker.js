const CACHE_NAME = 'a330-panel-v4';

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
  '/circuit.html',
  '/data.js',
  '/resetData.js',
  '/330.png',
  '/lh1.png',
  '/rh2.png',
  '/manifest.json',

  // boro klasörü
  '/boro/cf1.png', '/boro/cf2.png', '/boro/cf3.png', '/boro/cf4.png',
  '/boro/cf5.png', '/boro/cf6.png', '/boro/cf7.png', '/boro/cf8.png',
  '/boro/cf9.png', '/boro/cf10.png', '/boro/cf11.png', '/boro/cf12.png',
  '/boro/cf13.png', '/boro/cf14.png', '/boro/cf15.png', '/boro/cf16.png',
  '/boro/cf17.png',
  '/boro/pw1.png', '/boro/pw2.png', '/boro/pw3.png', '/boro/pw4.png',
  '/boro/pw5.png', '/boro/pw6.png', '/boro/pw7.png', '/boro/pw8.png',
  '/boro/pw9.png', '/boro/pw10.png', '/boro/pw11.png', '/boro/pw12.png',
  '/boro/rr1.png', '/boro/rr2.png', '/boro/rr3.png', '/boro/rr4.png',
  '/boro/rr5.png', '/boro/rr6.png', '/boro/rr7.png', '/boro/rr8.png',

  // cbs klasörü
  '/cbs/5000ve.png', '/cbs/5001ve.png', '/cbs/5002ve.png', '/cbs/5005ve.png',
  '/cbs/5006ve.png', '/cbs/5058ve.png', '/cbs/5060ve.png',
  '/cbs/715vu.png', '/cbs/717vu.png', '/cbs/718vu.png', '/cbs/721vu.png',
  '/cbs/722vu.png', '/cbs/725vu.png', '/cbs/735vu.png', '/cbs/742vu.png',
  '/cbs/751vu.png',
  '/cbs/all1.png', '/cbs/all2.png', '/cbs/all3.png', '/cbs/all4.png',
  '/cbs/all5.png', '/cbs/all6.png', '/cbs/all7.png', '/cbs/all8.png',
  '/cbs/all9.png', '/cbs/all10.png',

  // images klasörü
  '/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png',
  '/images/5.png', '/images/6.png', '/images/7.png', '/images/8.png',
  '/images/9.png', '/images/10.png', '/images/11.png', '/images/12.png',
  '/images/13.png', '/images/14.png', '/images/15.png', '/images/16.png',
  '/images/17.png', '/images/18.png', '/images/19.png', '/images/20.png',
  '/images/21.png', '/images/22.png', '/images/23.png', '/images/24.png',
  '/images/25.png', '/images/26.png', '/images/27.png', '/images/28.png',
  '/images/29.png', '/images/30.png', '/images/31.png', '/images/32.png',
  '/images/33.png', '/images/34.png', '/images/35.png', '/images/36.png',
  '/images/37.png', '/images/38.png', '/images/39.png', '/images/40.png',
  '/images/41.png', '/images/42.png', '/images/43.png', '/images/44.png',
  '/images/45.png', '/images/46.png', '/images/47.png', '/images/48.png',
  '/images/49.png', '/images/50.png', '/images/51.png', '/images/52.png',
  '/images/53.png', '/images/54.png', '/images/55.png', '/images/56.png',
  '/images/57.png', '/images/58.png', '/images/59.png', '/images/60.png',
  '/images/61.png', '/images/62.png', '/images/63.png',

  // sematik klasörü
  '/sematik/1.png', '/sematik/2.png', '/sematik/3.png', '/sematik/4.png',
  '/sematik/5.png', '/sematik/6.png', '/sematik/7.png', '/sematik/8.png',
  '/sematik/9.png', '/sematik/10.png', '/sematik/11.png', '/sematik/12.png',
  '/sematik/13.png', '/sematik/14.png', '/sematik/15.png', '/sematik/16.png',
  '/sematik/16.1.png', '/sematik/16.2.png', '/sematik/17.png', '/sematik/18.png',
  '/sematik/19.png', '/sematik/20.png', '/sematik/21.png', '/sematik/22.png'
];

// Kurulum - tüm dosyaları cache'e al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Tüm dosyalar cache\'e alınıyor...');
      return cache.addAll(urlsToCache);
    }).then(() => {
      console.log('Cache tamamlandı!');
    })
  );
  self.skipWaiting();
});

// Aktifleştirme - eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Eski cache siliniyor:', name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch - cache-first, yoksa internetten al ve cache'e ekle
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || event.request.method !== 'GET') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        return new Response('Çevrimdışı - Bu içerik önbellekte bulunamadı.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});
