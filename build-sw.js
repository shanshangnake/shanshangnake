// This is the "Offline page" service worker

const CACHE = "pwa-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "index.html";

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function (event) {

  event.waitUntil(
    caches.open('site-static').then(cache => {
      cache.addAll(['/', '/index.html','/static/img/gree.jpeg','/static/css/index.css'])
    })
  );
});

// If any fetch fails, it will show the offline page.
self.addEventListener('fetch', e => {
  console.log(caches)
  e.respondWith(
    caches.match(e.request).then(res => {
      return res
    })
  )
})

// This is an event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", function () {
  const offlinePageRequest = new Request(offlineFallbackPage);

  return fetch(offlineFallbackPage).then(function (response) {
    return caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Offline page updated from refreshOffline event: " + response.url);
      return cache.put(offlinePageRequest, response);
    });
  });
});
