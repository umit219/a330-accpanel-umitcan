const CACHE = 'a330-v7';

const FILES = [
  '/',
  '/index.html',
  '/cb.html',
  '/panels.html',
  '/circuit.html',
  '/sematik.html',
  '/fleet.html',
  '/unit.html',
  '/inspection.html',
  '/theme.js',
  '/data.js',
  '/resetData.js',
  '/fleet.js',
  '/unit.js',
  '/inspection.js',
  '/theme.css',
  '/lh1.png',
  '/rh2.png',
  '/330.png',
  '/kisaltmalar.html',
  '/borescope.html',
  '/reset.html',
  '/bilgiler.html',
  '/manifest.json'
];


self.addEventListener('install', event => {

  event.waitUntil(

    caches.open(CACHE)
      .then(cache => cache.addAll(FILES))

  );

  self.skipWaiting();

});


self.addEventListener('activate', event => {

  event.waitUntil(

    caches.keys()
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


self.addEventListener('fetch', event => {

  if (event.request.method !== 'GET') {
    return;
  }


  event.respondWith(

    fetch(event.request)

      .then(response => {

        const clone = response.clone();

        caches.open(CACHE)
          .then(cache => {

            cache.put(
              event.request,
              clone
            );

          });

        return response;

      })

      .catch(() => {

        return caches.match(
          event.request
        );

      })

  );

});
