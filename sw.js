const C='kt-v5',A=['./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('kt-')&&x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(url.origin!==self.location.origin||e.request.method!=='GET'||url.pathname.startsWith('/api/')||url.pathname.startsWith('/.netlify/')||!A.some(asset=>new URL(asset,self.location).pathname===url.pathname))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
