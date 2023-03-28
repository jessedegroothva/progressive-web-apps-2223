// ik registreer de service worker 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service worker registered:', registration);
            })
            .catch(function(error) {
                console.error('Service worker registration failed:', error);
            });
    });
  }

