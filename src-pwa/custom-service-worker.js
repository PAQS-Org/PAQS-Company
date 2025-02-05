/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from "workbox-core";
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { CacheFirst } from "workbox-strategies";
import { Queue } from "workbox-background-sync";

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let backgroundSync = "sync" in self.registration ? true : false;

let scanDialog = null;
if (backgroundSync) {
  scanDialog = new Queue("scanDialog", {
    onSync: async ({ queue }) => {
      console.log("queue", queue);
      let entry;
      while ((entry = await queue.shiftRequest())) {
        try {
          await fetch(entry.request);
          console.log("Replay successful for request", entry.request);
          const channel = new BroadcastChannel("sw-messages");
          channel.postMessage({ msg: "offline-scan-submitted" });
        } catch (error) {
          console.error("Scan failed for request", entry.request, error);

          // Put the entry back in the queue and re-throw the error:
          await queue.unshiftRequest(entry);
          throw error;
        }
      }
      console.log("Scan successful!");
    },
  });
}
// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== "ssr" || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  );
}

registerRoute(
  ({ url }) => url.host.startsWith("fonts.googleapi.com"),
  new CacheFirst({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(({ url }) => url.pathname.startsWith("/"), new NetworkFirst());

registerRoute(
  ({ url }) => url.protocol === "http:" || url.protocol === "https:",
  new StaleWhileRevalidate()
);

if (backgroundSync) {
  self.addEventListener("fetch", (event) => {
    if (event.request.method == "POST") {
      // Clone the request to ensure it's safe to read when
      // adding to the Queue.
      if (!self.navigator.onLine) {
        const promiseChain = fetch(event.request.clone()).catch((err) => {
          return createBlogQueue.pushRequest({ request: event.request });
        });

        event.waitUntil(promiseChain);
      }
    }
  });
}

self.addEventListener("push", (event) => {
  console.log("Push message received:", event);
  if (event.data) {
    let data = JSON.parse(event.data.text());
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "icons/icon-128x128.png",
        badge: "icons/icon-128x128.png",
        data: {
          openUrl: data.openUrl,
        },
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  let notification = event.notification;
  event.waitUntil(
    clients.matchAll().then((clis) => {
      let clientUsingApp = clis.find((cli) => {
        return cli.visibilityState === "visible";
      });
      if (clientUsingApp) {
        clientUsingApp.navigate(notification.data.openUrl);
        clientUsingApp.focus();
      } else {
        clients.openWindow(notification.data.openUrl);
      }
    })
  );
  notification.close();
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification was closed", event);
});
