const CACHE = 'a330-v1';
const FILES = [
  '/',
  '/index.html',
  '/cb.html',
  '/theme.css',
  '/theme.js',
  '/data.js',
  '/resetData.js',
  '/lh1.png',
  '/rh2.png'
  // cbs klasöründeki görseller varsa: '/cbs/all1.png' şeklinde ekle
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});