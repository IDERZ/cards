self.addEventListener('install', event => {
    console.log('sw has been installed.');
});

self.addEventListener('activate', event => {
    console.log('sw has been activated.');
});