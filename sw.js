importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "about.html",
    "revision": "e61528ba6992c5c7c7b1ed2299264fbc"
  },
  {
    "url": "css/style.css",
    "revision": "f33bd436d5cf9b1d28b09464a8018ed2"
  },
  {
    "url": "images/Dual Ring.svg",
    "revision": "80e5b792bc7f5f831e50fbe4717d1496"
  },
  {
    "url": "images/icon.svg",
    "revision": "b921974a86d4ab62af744db602d2e8c4"
  },
  {
    "url": "index.html",
    "revision": "79a134aab510c8c2c46a758f940eb254"
  },
  {
    "url": "js/index.js",
    "revision": "297240c0efa1a814c824b97b22f1c077"
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

const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
  new RegExp('https://newsapi.org/v2/top-headlines(.*)'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'news-cache',
    networkTimeoutSeconds:5,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 3 * 24 * 60 * 60,
        maxEntries:30, // 3 Days
      }),
       new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses:[0,200],
      bgSyncPlugin
    }),
    
    ]
  })
);

workbox.routing.registerRoute(
new RegExp('https://newsapi.org/v2/sources(.*)'),

  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'source-cache',
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
