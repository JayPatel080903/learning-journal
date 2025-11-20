const CACHE_NAME = "lj-cache-v1";
const FILES_TO_CACHE = [
    "index.html",
    "journal.html",
    "project.html",
    "about.html",
    "css/style.css",
    "js/script.js",
    "images/icon-192.png",
    "images/icon-512.png"
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

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
