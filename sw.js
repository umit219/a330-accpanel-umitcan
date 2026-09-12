const CACHE = 'a330-v4';

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

    '/manhour.html',

    '/theme.js',
    '/data.js',
    '/resetData.js',
    '/fleet.js',
    '/unit.js',
    '/inspection.js',
    '/manhour.js',

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


self.addEventListener(
    'install',
    event => {

        event.waitUntil(

            caches.open(CACHE)
                .then(
                    cache => cache.addAll(FILES)
                )
                .then(
                    () => self.skipWaiting()
                )

        );

    }
);


self.addEventListener(
    'activate',
    event => {

        event.waitUntil(

            caches.keys()
                .then(
                    keys => {

                        return Promise.all(

                            keys
                                .filter(
                                    key => key !== CACHE
                                )
                                .map(
                                    key => caches.delete(key)
                                )

                        );

                    }
                )
                .then(
                    () => self.clients.claim()
                )

        );

    }
);


self.addEventListener(
    'fetch',
    event => {

        event.respondWith(

            fetch(event.request)
                .then(
                    response => {

                        const copy =
                            response.clone();

                        caches.open(CACHE)
                            .then(
                                cache => {

                                    cache.put(
                                        event.request,
                                        copy
                                    );

                                }
                            );

                        return response;

                    }
                )
                .catch(
                    () => {

                        return caches.match(
                            event.request
                        );

                    }
                )

        );

    }
);
