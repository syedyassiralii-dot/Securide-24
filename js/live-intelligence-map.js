(function () {
  const MAP_READY_EVENT = 'live-intel-map:ready';
  const MAP_ERROR_EVENT = 'live-intel-map:error';
  const OVERLAY_LABELS = {
    'risk-level': 'Risk level',
    'route-disruption': 'Route disruption',
    earthquake: 'Earthquake',
    travel: 'Travel',
    'civil-unrest': 'Civil unrest',
    'general-alerts': 'General alerts'
  };

  const SOURCE_PILLS = [
    { key: 'risk-level', label: 'Country risk model' },
    { key: 'route-disruption', label: 'Route watch' },
    { key: 'earthquake', label: 'Seismic feed' },
    { key: 'travel', label: 'Travel advisories' },
    { key: 'civil-unrest', label: 'Civil unrest desk' },
    { key: 'general-alerts', label: 'OSINT alert stream' }
  ];

  const ALERTS = [
    {
      id: 'pakistan-route-watch',
      title: 'Pakistan motorway route disruption watch',
      location: 'Pakistan',
      source: 'Route Watch',
      summary: 'Freight backlog and checkpoint congestion are extending secure movement windows on the Lahore-Islamabad corridor.',
      severity: 'high',
      severityLabel: 'High',
      updatedMinutes: 11,
      href: 'pages/intelligence/active-alerts.html?country=PK',
      image: 'assets/images/travel-bg.webp',
      categories: ['route-disruption', 'general-alerts'],
      priorityRegion: true
    },
    {
      id: 'japan-seismic-watch',
      title: 'Japan seismic alert requiring itinerary review',
      location: 'Japan',
      source: 'Seismic Feed',
      summary: 'A fresh seismic event is driving infrastructure checks and rail service interruptions around monitored districts.',
      severity: 'medium',
      severityLabel: 'Elevated',
      updatedMinutes: 18,
      href: 'pages/intelligence/active-alerts.html?country=JP',
      image: 'assets/images/global-map.webp',
      categories: ['earthquake', 'travel'],
      priorityRegion: false
    },
    {
      id: 'uk-travel-brief',
      title: 'United Kingdom travel advisory for executive transfers',
      location: 'United Kingdom',
      source: 'Travel Advisory',
      summary: 'Planned demonstrations and central-London road controls are affecting arrival sequencing for executive movements.',
      severity: 'medium',
      severityLabel: 'Elevated',
      updatedMinutes: 24,
      href: 'pages/intelligence/active-alerts.html?country=GB',
      image: 'assets/images/slide-01.webp',
      categories: ['travel', 'civil-unrest'],
      priorityRegion: true
    },
    {
      id: 'iran-protest-monitoring',
      title: 'Iran urban protest monitoring remains active',
      location: 'Iran',
      source: 'OSINT Monitoring',
      summary: 'Local demonstration reporting and police presence indicators continue to shift around key city-center transit nodes.',
      severity: 'high',
      severityLabel: 'High',
      updatedMinutes: 29,
      href: 'pages/intelligence/active-alerts.html?country=IR',
      image: 'assets/images/intelligence-alerts-bg.webp',
      categories: ['civil-unrest', 'general-alerts'],
      priorityRegion: true
    },
    {
      id: 'afghanistan-general-alert',
      title: 'Afghanistan incident reporting elevated across provincial corridors',
      location: 'Afghanistan',
      source: 'OSINT Monitoring',
      summary: 'Security incidents and checkpoint posture changes continue to affect route confidence and movement timing assumptions.',
      severity: 'critical',
      severityLabel: 'Severe',
      updatedMinutes: 34,
      href: 'pages/intelligence/active-alerts.html?country=AF',
      image: 'assets/images/risk-management-bg.webp',
      categories: ['general-alerts', 'route-disruption'],
      priorityRegion: true
    },
    {
      id: 'turkey-civil-unrest',
      title: 'Turkey civil unrest watch around business districts',
      location: 'Turkey',
      source: 'Civil Unrest Desk',
      summary: 'Demonstration activity and localized transport disruption are driving tighter transfer planning for senior personnel.',
      severity: 'high',
      severityLabel: 'High',
      updatedMinutes: 41,
      href: 'pages/intelligence/active-alerts.html?country=TR',
      image: 'assets/images/slide-03.webp',
      categories: ['civil-unrest', 'travel'],
      priorityRegion: false
    }
  ];

  function formatRelativeUpdate(updatedMinutes) {
    if (updatedMinutes < 60) {
      return updatedMinutes + ' mins ago';
    }

    const hours = Math.round(updatedMinutes / 60);
    return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  }

  function formatSyncLabel(date) {
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src="' + src + '"]');
      if (existingScript) {
        if (existingScript.dataset.loaded === 'true') {
          resolve();
          return;
        }

        existingScript.addEventListener('load', resolve, { once: true });
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

  function createAlertCard(alert, isActive, onSelect) {
    const item = document.createElement('article');
    item.className = 'live-intel-alert' + (alert.priorityRegion ? ' is-priority-region' : '') + (isActive ? ' is-active' : '');
    item.tabIndex = 0;

    const thumb = document.createElement('div');
    thumb.className = 'live-intel-alert-thumb';

    const image = document.createElement('img');
    image.src = alert.image;
    image.alt = alert.title;
    thumb.appendChild(image);

    const body = document.createElement('div');
    body.className = 'live-intel-alert-body';

    const top = document.createElement('div');
    top.className = 'live-intel-alert-top';

    const title = document.createElement('strong');
    title.className = 'live-intel-alert-title';
    title.textContent = alert.title;

    const severity = document.createElement('span');
    severity.className = 'live-intel-badge severity-' + alert.severity;
    severity.textContent = alert.severityLabel;

    top.appendChild(title);
    top.appendChild(severity);

    const meta = document.createElement('div');
    meta.className = 'live-intel-alert-meta';

    const location = document.createElement('span');
    location.className = 'live-intel-alert-location' + (alert.priorityRegion ? '' : ' is-unmapped');
    location.textContent = alert.location;

    const time = document.createElement('span');
    time.className = 'live-intel-alert-time';
    time.textContent = formatRelativeUpdate(alert.updatedMinutes);

    const source = document.createElement('span');
    source.className = 'live-intel-badge category';
    source.textContent = alert.source;

    meta.appendChild(location);
    meta.appendChild(time);
    meta.appendChild(source);

    const summary = document.createElement('p');
    summary.className = 'live-intel-alert-summary';
    summary.textContent = alert.summary;

    const view = document.createElement('a');
    view.className = 'live-intel-alert-view';
    view.href = alert.href;
    view.innerHTML = '<strong>View briefing</strong> ->';
    view.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    body.appendChild(top);
    body.appendChild(meta);
    body.appendChild(summary);
    body.appendChild(view);

    item.appendChild(thumb);
    item.appendChild(body);

    item.addEventListener('click', () => onSelect(alert.id));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(alert.id);
      }
    });

    return item;
  }

  function initLiveIntelligenceSection() {
    const section = document.querySelector('[data-live-intel-map-section]');
    if (!section) {
      return;
    }

    const statusNode = section.querySelector('[data-live-intel-status]');
    const sourceStrip = section.querySelector('[data-live-intel-sources]');
    const priorityStrip = section.querySelector('[data-live-intel-priority-strip]');
    const listNode = section.querySelector('[data-live-intel-list]');
    const feedCountNode = section.querySelector('[data-live-intel-feed-count]');
    const feedWindow = section.querySelector('[data-live-intel-feed-window]');
    const updatedNodes = Array.from(section.querySelectorAll('[data-live-intel-updated], [data-live-intel-legend-updated], [data-live-intel-sidebar-updated]'));
    const toolbarButtons = Array.from(section.querySelectorAll('[data-overlay-toggle]'));

    if (!statusNode || !sourceStrip || !priorityStrip || !listNode || !feedCountNode || !feedWindow || !toolbarButtons.length) {
      return;
    }

    const state = {
      activeOverlays: new Set(['risk-level', 'general-alerts']),
      activeAlertId: ALERTS[0].id,
      mapReady: false,
      mapFailed: false
    };

    function getActiveCategoryOverlays() {
      return Array.from(state.activeOverlays).filter((key) => key !== 'risk-level');
    }

    function getFilteredAlerts() {
      const activeCategories = getActiveCategoryOverlays();
      if (!activeCategories.length) {
        return ALERTS.slice();
      }

      return ALERTS.filter((alert) => alert.categories.some((category) => activeCategories.includes(category)));
    }

    function setUpdatedLabels() {
      const label = formatSyncLabel(new Date());
      updatedNodes.forEach((node) => {
        node.textContent = label;
      });
    }

    function renderSources() {
      sourceStrip.innerHTML = '';

      SOURCE_PILLS.forEach((source) => {
        const pill = document.createElement('span');
        pill.className = 'live-intel-source-pill';
        if (state.mapFailed && source.key === 'risk-level') {
          pill.classList.add('is-offline');
        }
        pill.textContent = source.label;
        sourceStrip.appendChild(pill);
      });
    }

    function renderPriorityRegions(filteredAlerts) {
      const regions = filteredAlerts
        .filter((alert) => alert.priorityRegion)
        .map((alert) => alert.location)
        .filter((location, index, list) => list.indexOf(location) === index)
        .slice(0, 4);

      const labels = ['Priority Regions'].concat(regions.length ? regions : ['Pakistan', 'Afghanistan', 'Iran', 'United Kingdom']);

      priorityStrip.innerHTML = '';
      labels.forEach((label) => {
        const pill = document.createElement('span');
        pill.className = 'live-intel-priority-pill';
        pill.textContent = label;
        priorityStrip.appendChild(pill);
      });
    }

    function renderEmptyState(activeCategories) {
      const empty = document.createElement('article');
      empty.className = 'live-intel-list-empty';

      const dot = document.createElement('span');
      dot.className = 'live-intel-list-empty-dot';

      const body = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = 'No alerts match the current overlay view';
      const message = document.createElement('p');
      message.textContent = 'Try enabling another overlay such as ' + (activeCategories[0] ? OVERLAY_LABELS[activeCategories[0]].toLowerCase() : 'general alerts') + ' to widen the monitoring window.';

      body.appendChild(title);
      body.appendChild(message);
      empty.appendChild(dot);
      empty.appendChild(body);
      listNode.appendChild(empty);
    }

    function renderAlerts() {
      const filteredAlerts = getFilteredAlerts();
      const activeCategories = getActiveCategoryOverlays();

      if (!filteredAlerts.some((alert) => alert.id === state.activeAlertId)) {
        state.activeAlertId = filteredAlerts.length ? filteredAlerts[0].id : '';
      }

      listNode.innerHTML = '';
      feedCountNode.textContent = filteredAlerts.length + (filteredAlerts.length === 1 ? ' alert' : ' alerts');

      if (!filteredAlerts.length) {
        renderEmptyState(activeCategories);
        renderPriorityRegions(filteredAlerts);
        return;
      }

      filteredAlerts.forEach((alert) => {
        listNode.appendChild(createAlertCard(alert, alert.id === state.activeAlertId, (alertId) => {
          state.activeAlertId = alertId;
          renderAlerts();
          updateStatus();
        }));
      });

      renderPriorityRegions(filteredAlerts);
    }

    function updateStatus() {
      const activeCategories = getActiveCategoryOverlays();
      const overlays = activeCategories.length
        ? activeCategories.map((key) => OVERLAY_LABELS[key]).join(', ')
        : OVERLAY_LABELS['risk-level'];

      if (state.mapFailed) {
        statusNode.classList.add('is-error');
        statusNode.textContent = 'Map feed unavailable. Alert feed still running for ' + overlays.toLowerCase() + '.';
        return;
      }

      statusNode.classList.remove('is-error');
      statusNode.textContent = (state.mapReady ? 'Map synchronized. ' : 'Loading map layer. ') + 'Showing ' + overlays.toLowerCase() + '.';
    }

    function syncToolbar() {
      toolbarButtons.forEach((button) => {
        const key = button.getAttribute('data-overlay-toggle');
        const isActive = state.activeOverlays.has(key);
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    function toggleOverlay(key) {
      if (state.activeOverlays.has(key)) {
        state.activeOverlays.delete(key);
      } else {
        state.activeOverlays.add(key);
      }

      if (!state.activeOverlays.size) {
        state.activeOverlays.add('risk-level');
      }

      syncToolbar();
      renderAlerts();
      updateStatus();
      setUpdatedLabels();
      feedWindow.classList.add('is-refreshing');
      window.setTimeout(() => {
        feedWindow.classList.remove('is-refreshing');
      }, 320);
    }

    toolbarButtons.forEach((button) => {
      button.addEventListener('click', () => {
        toggleOverlay(button.getAttribute('data-overlay-toggle'));
      });
    });

    window.addEventListener(MAP_READY_EVENT, () => {
      state.mapReady = true;
      state.mapFailed = false;
      updateStatus();
      setUpdatedLabels();
      renderSources();
    });

    window.addEventListener(MAP_ERROR_EVENT, () => {
      state.mapReady = false;
      state.mapFailed = true;
      updateStatus();
      renderSources();
    });

    syncToolbar();
    renderSources();
    renderAlerts();
    updateStatus();
    setUpdatedLabels();

    loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js'))
      .then(() => loadScript('js/world-risk-map.js'))
      .catch(() => {
        state.mapFailed = true;
        updateStatus();
        renderSources();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiveIntelligenceSection, { once: true });
  } else {
    initLiveIntelligenceSection();
  }
})();