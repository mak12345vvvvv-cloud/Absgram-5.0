// OneSignalSDKWorker.js - Service Worker для push-уведомлений
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

// Дополнительная обработка уведомлений (опционально)
self.addEventListener('notificationclick', function(event) {
  console.log('🔔 Уведомление нажато:', event.notification);
  
  // Закрываем уведомление
  event.notification.close();
  
  // Получаем данные из уведомления
  const data = event.notification.data || {};
  const urlToOpen = data.url || '/';
  
  // Открываем нужную страницу
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      // Если уже есть открытое окно, фокусируем его
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Иначе открываем новое окно
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Обработка закрытия уведомления
self.addEventListener('notificationclose', function(event) {
  console.log('🔕 Уведомление закрыто:', event.notification);
});

// Кэширование для офлайн-режима (опционально)
const CACHE_NAME = 'absgram-cache-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', function(event) {
  console.log('🛠️ Service Worker установлен');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('📦 Кэширование ресурсов');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Возвращаем кэш, если есть, иначе грузим с сети
        return response || fetch(event.request);
      })
  );
});