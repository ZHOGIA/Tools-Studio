const CACHE_NAME = 'tools-studio-v1';

// Install event: cache basic layout
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/favicon.ico',
                '/favicon.svg',
                '/manifest.json'
            ]);
        })
    );
});

// Fetch event: Serve from network, fallback to cache
self.addEventListener('fetch', (event) => {
    // Only intercept GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Return fresh network response
                return response;
            })
            .catch(() => {
                // If offline, try looking up in cache
                return caches.match(event.request);
            })
    );
});
