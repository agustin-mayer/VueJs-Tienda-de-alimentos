const CACHE_NAME = 'foodmay-vue-cache',
  urlsToCache = [
    './'
  ]

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log(data)
  console.log('Notificacion recibida')
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'https://cdn-icons-png.flaticon.com/512/1340/1340115.png'
  })
})

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }
        return fetch(e.request).then(function (response) {
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(function (cache) {
              cache.put(e.request, responseToCache);
            });
          return response;
        }
        );
      })
  )
})