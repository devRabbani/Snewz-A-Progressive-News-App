importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "about.html",
    "revision": "acd572a390cc00ee01c7118a4be87c9f"
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
    "revision": "65e08151e82f16d1b6980894b50f7c95"
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
