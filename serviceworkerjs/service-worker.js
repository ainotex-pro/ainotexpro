const CACHE_NAME = "ainotexpro-cache-v1";
const ASSETS = [
  "/",
  "/hello.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-152.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-1024.png",
  "/icons/favicon-32.png"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(cached => {
      if(cached) return cached;
      return fetch(evt.request).catch(()=> {
        if (evt.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
