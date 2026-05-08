self.addEventListener("install", (event) => {
  console.log("SW instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW activado");

  event.waitUntil(
    self.clients.claim()
  );
});

self.addEventListener("push", function (event) {
  console.log("🔥 PUSH RECIBIDO");

  const data = event.data?.json() || {};

  const title = data.title || "Notificación";
  const options = {
    body: data.body || "",
    icon: "/icons/icon-192.png",
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});