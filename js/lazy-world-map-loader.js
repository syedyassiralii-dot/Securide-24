// lazy-world-map-loader.js - defers map dependencies until the map section is near viewport

(function () {
  const mapRoot = document.getElementById('worldRiskMap');
  if (!mapRoot) {
    return;
  }

  const mapSection = mapRoot.closest('section') || mapRoot;
  let hasLoadedMapScripts = false;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src="' + src + '"]');
      if (existingScript) {
        if (existingScript.dataset.loaded === 'true') {
          resolve();
          return;
        }

        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Failed to load ' + src)), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', () => reject(new Error('Failed to load ' + src)), { once: true });
      document.head.appendChild(script);
    });
  }

  function loadMapScripts() {
    if (hasLoadedMapScripts) {
      return;
    }

    hasLoadedMapScripts = true;

    loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js'))
      .then(() => loadScript('js/world-risk-map.js?v=4'))
      .catch((error) => {
        console.error(error);
      });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMapScripts();
          currentObserver.disconnect();
        }
      });
    }, { rootMargin: '300px 0px' });

    observer.observe(mapSection);
  } else {
    window.setTimeout(loadMapScripts, 1500);
  }
})();
