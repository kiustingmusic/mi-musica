/* Rumbo Kiustin — Service Worker
   - El shell de la app se cachea para que Rumbo ABRA sin conexión.
   - Los tiles/estilo del mapa se sirven de la caché primero (la app también
     precarga los tiles del corredor de la ruta activa en esta misma caché).
   - El HTML va red-primero para recibir actualizaciones cuando hay señal. */
var CACHE = "rumbo-v1";
var SHELL = [
  "./",
  "./index.html",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.webmanifest",
  "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css",
  "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return fetch(u).then(function (r) { if (r.ok) return c.put(u, r); }).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        if (k !== CACHE && k.indexOf("rumbo-") === 0) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = e.request.url;

  // Navegación (el HTML): red primero; sin conexión, la copia en caché
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).then(function (r) {
        var cl = r.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, cl); });
        return r;
      }).catch(function () {
        return caches.match(e.request).then(function (h) { return h || caches.match("./index.html"); });
      })
    );
    return;
  }

  // Tiles, estilo, glifos y sprites del mapa: caché primero, se rellena al verlos
  if (url.indexOf("tiles.openfreemap.org") >= 0) {
    e.respondWith(
      caches.open(CACHE).then(function (c) {
        return c.match(e.request).then(function (hit) {
          if (hit) return hit;
          return fetch(e.request).then(function (r) { if (r.ok) c.put(e.request, r.clone()); return r; });
        });
      })
    );
    return;
  }

  // Resto (librerías versionadas y archivos propios): caché primero
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (r) {
        if (r.ok && (url.indexOf("unpkg.com") >= 0 || url.indexOf(self.location.origin) === 0)) {
          var cl = r.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, cl); });
        }
        return r;
      });
    })
  );
});
