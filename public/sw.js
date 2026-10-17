// Service worker ASEPS : réseau d'abord, cache en secours (hors connexion).
const CACHE = "aseps-v1.4.0";
const PRECACHE = ["/", "/index.html", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const memeSite = url.origin === self.location.origin;
  const polices = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!memeSite && !polices) return; // vidéos YouTube, liens externes : non mis en cache

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok || res.type === "opaque") {
          const copie = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copie));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((r) => r || (req.mode === "navigate" ? caches.match("/index.html") : undefined))
      )
  );
});
