const cacheName='news-v1';

const staticAssests=[
  './',
'./index.html',
 './about.html',
  './css/style.css',
  './js/index.js',
  './sw.js',
  './images/icon.svg',
  './images/favicon-32x32.png',
  './images/favicon-16x16.png'
];


self.addEventListener('install',async e =>{
  const cache =await caches.open(cacheName);
  await cache.addAll(staticAssests);
  return self.skipWaiting();
});

self.addEventListener('activate',e =>{
  self.clients.claim();
});

self.addEventListener('fetch',async e =>{
  const req = e.request;
  const url=new URL(req.url);
  
  if(url.origin==location.origin){
    e.respondWith(cacheFirst(req));
  }else{
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req){
  const cache=await caches.open(cacheName);
  const cached=await cache.match(req);
  return cached || fetch(req);
}

async function networkFirst(req){
  const cache=await caches.open(cacheName);
  try{
    const fresh=await fetch(req);
    await cache.put(req,fresh.clone());
    return fresh;
  }catch(e){
    const cached=await cache.match(req);
    return cached;
  }
 
}




