const CACHE_NAME = 'mi_pwa-v1';

const APP_SHELL = [
    "https://anthonybuenog.github.io/gestorTareas/",
    "https://anthonybuenog.github.io/gestorTareas/index.html",
    "https://anthonybuenog.github.io/gestorTareas/manifest.json",
    "https://anthonybuenog.github.io/gestorTareas/app.js",
    "https://anthonybuenog.github.io/gestorTareas/sw.js",
    "https://anthonybuenog.github.io/gestorTareas/index.css"
];

self.addEventListener('install', (event) => {
    console.log("Service Worker: INSTALL - version 1.0.0");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(APP_SHELL);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log("Service Worker: ACTIVATE");
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)  
            .then((response) => {

                // Si está en caché, usarlo
                if (response) {
                    return response;
                }

                // Si no está en caché, buscarlo en Internet
                return fetch(event.request);
            })
    );
});