const CACHE_NAME = "mobframe-v1"
const urlsToCache = ["/", "/manifest.json", "/icons/icon-192x192.png", "/icons/icon-512x512.png"]

// Service Worker орнату
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Кэштен файлдарды беру
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Кэште бар болса, оны қайтару
      if (response) {
        return response
      }

      // Жоқ болса, желіден жүктеу
      return fetch(event.request)
    }),
  )
})

// Push notification өңдеу
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Жаңа хабарлама",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Көру",
        icon: "/icons/checkmark.png",
      },
      {
        action: "close",
        title: "Жабу",
        icon: "/icons/xmark.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("MobFrame", options))
})
