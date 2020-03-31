importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "about.html",
    "revision": "d1f9ca9b04074f5f2f854cfe3685ab53"
  },
  {
    "url": "css/style.css",
    "revision": "fd02a82c47f54ec1153248ce140bd6b4"
  },
  {
    "url": "images/icon.svg",
    "revision": "b921974a86d4ab62af744db602d2e8c4"
  },
  {
    "url": "index.html",
    "revision": "90e0374a40df591d27f577b227a1e73f"
  },
  {
    "url": "js/index.js",
    "revision": "6b0138a6bcdfe784da3a39289eaa4d96"
  }
]);
workbox.routing.registerRoute(
  new RegExp('\.(png|jpg|jpeg|ico)$'),
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('https://newsapi.org/v2/top-headlines(.*)'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'news-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 3 * 24 * 60 * 60, // 3 Days
      }),
       new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses:[0,200],
    }),
    ]
  })
);

workbox.routing.registerRoute(
new RegExp('https://newsapi.org/v2/sources(.*)'),

  new workbox.strategies.NetworkFirst({
    cacheName: 'news-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 3 * 24 * 60 * 60, // 3 Days
      }),
       new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses:[0,200],
    }),
    ]
  })
);
