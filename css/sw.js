importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');workbox.precaching.precacheAndRoute([
  {
    "url": "about.html",
    "revision": "11d84e6a571c0b8d9f49a190bf0b3cbc"
  },
  {
    "url": "css/style.css",
    "revision": "ec52c3e72e96a701a3dcdec7cb5fbb2c"
  },
  {
    "url": "images/bars.svg",
    "revision": "b3f49afdaa769bc2cb267d590e308ae0"
  },
  {
    "url": "images/Dual Ring.svg",
    "revision": "80e5b792bc7f5f831e50fbe4717d1496"
  },
  {
    "url": "images/DualRing.svg",
    "revision": "80e5b792bc7f5f831e50fbe4717d1496"
  },
  {
    "url": "images/icon.svg",
    "revision": "b921974a86d4ab62af744db602d2e8c4"
  },
  {
    "url": "index.html",
    "revision": "87006c0b9bd4a420e2cf65649d974f09"
  },
  {
    "url": "js/index.js",
    "revision": "23752193b674031122fe75c20d042771"
  }
]);workbox.routing.registerRoute(new RegExp('\.(png|jpg|jpeg|ico)$'),new workbox.strategies.CacheFirst({cacheName:'images-cache',plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:50,maxAgeSeconds:30*24*60*60,})]}));const bgSyncPlugin=new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName',{maxRetentionTime:24*60});workbox.routing.registerRoute(new RegExp('https://newsapi.org/v2/top-headlines(.*)'),new workbox.strategies.NetworkFirst({cacheName:'news-cache',networkTimeoutSeconds:5,plugins:[new workbox.expiration.ExpirationPlugin({maxAgeSeconds:3*24*60*60,maxEntries:30,}),new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200],bgSyncPlugin}),]}));workbox.routing.registerRoute(new RegExp('https://newsapi.org/v2/sources(.*)'),new workbox.strategies.StaleWhileRevalidate({cacheName:'source-cache',plugins:[new workbox.expiration.ExpirationPlugin({maxAgeSeconds:3*24*60*60,}),new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200],}),]}))