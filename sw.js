self.addEventListener('install', event => {
    console.log('sw has been installed.');
    event.waitUntil(
        caches.open('medu-pwa').then(function(cache){
            return cache.addAll([
                './'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('medu-pwa').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
});

self.addEventListener('activate', event => {
    console.log('sw has been activated.');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
});