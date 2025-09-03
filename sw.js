const CACHE_NAME = 'gbl-assistant-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

// Evento de instalação: Salva os arquivos no cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de fetch: Intercepta as requisições
// Se o arquivo estiver no cache, entrega a versão do cache.
// Se não, busca na internet.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Retorna do cache
                }
                return fetch(event.request); // Busca na rede
            })
    );
});