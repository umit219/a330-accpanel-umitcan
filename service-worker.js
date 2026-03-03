const CACHE_NAME = 'a330-panel-v5';
const BASE = '/a330-accpanel-umitcan';

const urlsToCache = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/bilgiler.html',
  BASE + '/reset.html',
  BASE + '/borescope.html',
  BASE + '/cb.html',
  BASE + '/sematik.html',
  BASE + '/kisaltmalar.html',
  BASE + '/panels.html',
  BASE + '/circuit.html',
  BASE + '/data.js',
  BASE + '/resetData.js',
  BASE + '/330.png',
  BASE + '/lh1.png',
  BASE + '/rh2.png',
  BASE + '/manifest.json',
  BASE + '/boro/cf1.png',  BASE + '/boro/cf2.png',  BASE + '/boro/cf3.png',
  BASE + '/boro/cf4.png',  BASE + '/boro/cf5.png',  BASE + '/boro/cf6.png',
  BASE + '/boro/cf7.png',  BASE + '/boro/cf8.png',  BASE + '/boro/cf9.png',
  BASE + '/boro/cf10.png', BASE + '/boro/cf11.png', BASE + '/boro/cf12.png',
  BASE + '/boro/cf13.png', BASE + '/boro/cf14.png', BASE + '/boro/cf15.png',
  BASE + '/boro/cf16.png', BASE + '/boro/cf17.png',
  BASE + '/boro/pw1.png',  BASE + '/boro/pw2.png',  BASE + '/boro/pw3.png',
  BASE + '/boro/pw4.png',  BASE + '/boro/pw5.png',  BASE + '/boro/pw6.png',
  BASE + '/boro/pw7.png',  BASE + '/boro/pw8.png',  BASE + '/boro/pw9.png',
  BASE + '/boro/pw10.png', BASE + '/boro/pw11.png', BASE + '/boro/pw12.png',
  BASE + '/boro/rr1.png',  BASE + '/boro/rr2.png',  BASE + '/boro/rr3.png',
  BASE + '/boro/rr4.png',  BASE + '/boro/rr5.png',  BASE + '/boro/rr6.png',
  BASE + '/boro/rr7.png',  BASE + '/boro/rr8.png',
  BASE + '/cbs/5000ve.png', BASE + '/cbs/5001ve.png', BASE + '/cbs/5002ve.png',
  BASE + '/cbs/5005ve.png', BASE + '/cbs/5006ve.png', BASE + '/cbs/5058ve.png',
  BASE + '/cbs/5060ve.png',
  BASE + '/cbs/715vu.png',  BASE + '/cbs/717vu.png',  BASE + '/cbs/718vu.png',
  BASE + '/cbs/721vu.png',  BASE + '/cbs/722vu.png',  BASE + '/cbs/725vu.png',
  BASE + '/cbs/735vu.png',  BASE + '/cbs/742vu.png',  BASE + '/cbs/751vu.png',
  BASE + '/cbs/all1.png',  BASE + '/cbs/all2.png',  BASE + '/cbs/all3.png',
  BASE + '/cbs/all4.png',  BASE + '/cbs/all5.png',  BASE + '/cbs/all6.png',
  BASE + '/cbs/all7.png',  BASE + '/cbs/all8.png',  BASE + '/cbs/all9.png',
  BASE + '/cbs/all10.png',
  BASE + '/images/1.png',  BASE + '/images/2.png',  BASE + '/images/3.png',
  BASE + '/images/4.png',  BASE + '/images/5.png',  BASE + '/images/6.png',
  BASE + '/images/7.png',  BASE + '/images/8.png',  BASE + '/images/9.png',
  BASE + '/images/10.png', BASE + '/images/11.png', BASE + '/images/12.png',
  BASE + '/images/13.png', BASE + '/images/14.png', BASE + '/images/15.png',
  BASE + '/images/16.png', BASE + '/images/17.png', BASE + '/images/18.png',
  BASE + '/images/19.png', BASE + '/images/20.png', BASE + '/images/21.png',
  BASE + '/images/22.png', BASE + '/images/23.png', BASE + '/images/24.png',
  BASE + '/images/25.png', BASE + '/images/26.png', BASE + '/images/27.png',
  BASE + '/images/28.png', BASE + '/images/29.png', BASE + '/images/30.png',
  BASE + '/images/31.png', BASE + '/images/32.png', BASE + '/images/33.png',
  BASE + '/images/34.png', BASE + '/images/35.png', BASE + '/images/36.png',
  BASE + '/images/37.png', BASE + '/images/38.png', BASE + '/images/39.png',
  BASE + '/images/40.png', BASE + '/images/41.png', BASE + '/images/42.png',
  BASE + '/images/43.png', BASE + '/images/44.png', BASE + '/images/45.png',
  BASE + '/images/46.png', BASE + '/images/47.png', BASE + '/images/48.png',
  BASE + '/images/49.png', BASE + '/images/50.png', BASE + '/images/51.png',
  BASE + '/images/52.png', BASE + '/images/53.png', BASE + '/images/54.png',
  BASE + '/images/55.png', BASE + '/images/56.png', BASE + '/images/57.png',
  BASE + '/images/58.png', BASE + '/images/59.png', BASE + '/images/60.png',
  BASE + '/images/61.png', BASE + '/images/62.png', BASE + '/images/63.png',
  BASE + '/sematik/1.png',    BASE + '/sematik/2.png',    BASE + '/sematik/3.png',
  BASE + '/sematik/4.png',    BASE + '/sematik/5.png',    BASE + '/sematik/6.png',
  BASE + '/sematik/7.png',    BASE + '/sematik/8.png',    BASE + '/sematik/9.png',
  BASE + '/sematik/10.png',   BASE + '/sematik/11.png',   BASE + '/sematik/12.png',
  BASE + '/sematik/13.png',   BASE + '/sematik/14.png',   BASE + '/sematik/15.png',
  BASE + '/sematik/16.png',   BASE + '/sematik/16.1.png', BASE + '/sematik/16.2.png',
  BASE + '/sematik/17.png',   BASE + '/sematik/18.png',   BASE + '/sematik/19.png',
  BASE + '/sematik/20.png',   BASE + '/sematik/21.png',   BASE + '/sematik/22.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
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
  self.clients.claim();
});

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
        return new Response('Cevrimdisi - Bu icerik onbellekte bulunamadi.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});
