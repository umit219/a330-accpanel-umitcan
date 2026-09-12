const CACHE = 'a330-v3';

const FILES = [
  '/',
  '/index.html',

  /* =========================
     MAIN PAGES
  ========================= */

  '/cb.html',
  '/panels.html',
  '/circuit.html',
  '/sematik.html',
  '/fleet.html',
  '/unit.html',
  '/inspection.html',

  /* =========================
     JAVASCRIPT
  ========================= */

  '/theme.js',
  '/data.js',
  '/resetData.js',
  '/fleet.js',
  '/unit.js',
  '/inspection.js',

  /* =========================
     CSS
  ========================= */

  '/theme.css',

  /* =========================
     IMAGES
  ========================= */

  '/lh1.png',
  '/rh2.png',
  '/330.png',

  /* =========================
     OTHER PAGES
  ========================= */

  '/kisaltmalar.html',
  '/borescope.html',
  '/reset.html',
  '/bilgiler.html',

  /* =========================
     PWA
  ========================= */

  '/manifest.json'
];


/* =========================
   INSTALL
========================= */

self.addEventListener('install', event => {

  event.waitUntil(

    caches
      .open(CACHE)
      .then(cache => {

        return cache.addAll(FILES);

      })

  );

  self.skipWaiting();

});


/* =========================
   ACTIVATE
========================= */

self.addEventListener('activate', event => {

  event.waitUntil(

    caches
      .keys()
      .then(keys => {

        return Promise.all(

          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))

        );

      })

  );

  self.clients.claim();

});


/* =========================
   FETCH
========================= */

self.addEventListener('fetch', event => {

  /*
   * Sadece GET isteklerini
   * service worker üzerinden yönet.
   */

  if (event.request.method !== 'GET') {
    return;
  }


  event.respondWith(

    fetch(event.request)

      .then(response => {

        /*
         * Başarılı internet cevabını
         * cache'e kaydet.
         */

        const clone =
          response.clone();


        caches
          .open(CACHE)
          .then(cache => {

            cache.put(
              event.request,
              clone
            );

          });


        return response;

      })

      .catch(() => {

        /*
         * İnternet yoksa cache'den getir.
         */

        return caches.match(
          event.request
        );

      })

  );

});
