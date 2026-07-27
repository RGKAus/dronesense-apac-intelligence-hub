(() => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
        .catch(error => console.error("Service worker registration failed:", error));
    });
  }

  let deferredPrompt;
  const installButton = document.querySelector("[data-pwa-install]");

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    if (installButton) installButton.hidden = false;
  });

  if (installButton) {
    installButton.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      installButton.hidden = true;
    });
  }

  window.addEventListener("appinstalled", () => {
    if (installButton) installButton.hidden = true;
  });
})();
