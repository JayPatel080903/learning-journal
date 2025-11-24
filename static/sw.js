const CACHE_NAME = "lj-cache-v2";

const FILES_TO_CACHE = [
    "/",
    "/journal",
    "/project",
    "/about",
    "/reflection",
    "/static/css/style.css",
    "/static/js/script.js",
    "/static/js/form4JS.js",
    "/static/images/icon-192.png",
    "/static/images/icon-512.png",
    "/static/images/jay-profile.jpg"
];

// Install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate – clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
