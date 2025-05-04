// Service Worker para gestionar notificaciones push y funcionalidad offline

const CACHE_NAME = 'mi-app-personal-v1';
const OFFLINE_URL = '/offline.html';

// Archivos a cachear para funcionamiento offline
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
];

// Instalar el service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activar el service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar solicitudes de red
self.addEventListener('fetch', (event) => {
  // Estrategia: Network first, fallback to cache, then offline page
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y guardarla en caché
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar obtener de la caché
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // Si no está en caché y es una solicitud de navegación, mostrar página offline
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // Para otros recursos, devolver un error
            return new Response('', {
              status: 408,
              statusText: 'Request timed out.',
            });
          });
      })
  );
});

// Manejar notificaciones push
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.warn('Evento push sin datos');
    return;
  }
  
  try {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nueva notificación',
      icon: data.icon || '/logo192.png',
      badge: data.badge || '/logo192.png',
      data: data.data || {},
      actions: data.actions || [],
      tag: data.tag || 'default',
      requireInteraction: data.requireInteraction || false,
      silent: data.silent || false,
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Notificación', options)
    );
  } catch (error) {
    console.error('Error al procesar notificación push:', error);
  }
});

// Manejar clic en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const data = event.notification.data || {};
  const url = data.url || '/';
  
  // Si se hizo clic en una acción específica
  if (event.action) {
    // Manejar acciones específicas
    switch (event.action) {
      case 'view':
        // Abrir la URL específica de la acción
        event.waitUntil(
          clients.openWindow(data.viewUrl || url)
        );
        break;
      case 'dismiss':
        // Solo cerrar la notificación (ya se hizo)
        break;
      default:
        // Para otras acciones, abrir la URL predeterminada
        event.waitUntil(
          clients.openWindow(url)
        );
        break;
    }
  } else {
    // Clic en la notificación principal
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then((clientList) => {
          // Verificar si ya hay una ventana abierta
          for (const client of clientList) {
            if (client.url === url && 'focus' in client) {
              return client.focus();
            }
          }
          
          // Si no hay ventana abierta, abrir una nueva
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
  }
});

// Manejar cierre de notificaciones
self.addEventListener('notificationclose', (event) => {
  // Registrar cierre de notificación si es necesario
  const data = event.notification.data || {};
  
  if (data.trackClose) {
    // Aquí se podría enviar una solicitud al servidor para registrar el cierre
    console.log('Notificación cerrada sin interacción');
  }
});
