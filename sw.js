const CACHE_ELEMENT = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
];

const CACHE_NAME = "v2_cache_contador_react";

//self = this
self.addEventListener("install", (e) =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            cache.addAll(CACHE_ELEMENT).then( () => {
                self.skipWaiting();
            }).catch(console.log)
        })
    )
})

self.addEventListener("activate", (e) =>{
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cachesName =>{
            return Promise.all(cachesName.map(cacheName => {
                return cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) =>{
   e.respondeWith( 
    caches.match(e.request).then((res) => {
        if (res) {
            return res;
        }

        return fetch(e.request);
    })   
    );
});