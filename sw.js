const CACHE_NAME = 'ki-portfolio-v1';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/favicon.ico'
];

// Installation des Service Workers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache geöffnet');
                return cache.addAll(CACHE_URLS);
            })
    );
});

// Aktivierung des Service Workers
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Alten Cache löschen:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Abfangen von Fetch-Ereignissen
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache-Hit - return response
                if (response) {
                    return response;
                }

                // Cache-Miss - Netzwerkanfrage
                return fetch(event.request).then(
                    response => {
                        // Prüfen ob gültige Antwort
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Antwort klonen für Cache
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
}); 