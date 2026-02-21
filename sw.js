const CACHE_NAME = 'celis-control-v2-cache';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Librerías externas para que funcione sin internet
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

self.addEventListener('install', event => {
  // Cuando se instala, guarda todo en la memoria caché
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Celis Control: Guardando archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Cuando la app pide un archivo, primero revisa si ya lo tiene guardado
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo usa (más rápido y sin internet)
        if (response) {
          return response;
        }
        // Si no, lo pide a internet
        return fetch(event.request);
      })
  );
});