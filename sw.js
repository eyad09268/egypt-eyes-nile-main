const CACHE_NAME = 'egypt-eyes-nile-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/goals.html',
  '/videos.html',
  '/css/style.css',
  '/images/logo.png',
  '/images/capital.jpg',
  '/images/haya-karima.jpg',
  '/images/roads.jpg',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  'https://unpkg.com/aos@2.3.4/dist/aos.css',
  'https://unpkg.com/aos@2.3.4/dist/aos.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 