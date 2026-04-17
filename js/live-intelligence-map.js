(function () {
  const MAP_READY_EVENT = 'live-intel-map:ready';
  const MAP_ERROR_EVENT = 'live-intel-map:error';
  const MAP_FOCUS_EVENT = 'live-intel-map:focus-country';
  const AUTO_SCROLL_SPEED = 16;
  const AUTO_SCROLL_RESUME_DELAY = 2600;
  const REFRESH_INTERVAL_MS = 14000;
  const OVERLAY_LABELS = {
    'risk-level': 'Risk Level',
    'route-disruption': 'Route Disruption',
    earthquake: 'Earthquake',
    travel: 'Travel',
    'civil-unrest': 'Civil Unrest',
    'general-alerts': 'General Alerts'
  };
  const SOURCE_PILLS = [
    { key: 'risk-level', label: 'Country risk model' },
    { key: 'route-disruption', label: 'Route watch' },
    { key: 'earthquake', label: 'Seismic feed' },
    { key: 'travel', label: 'Travel advisories' },
    { key: 'civil-unrest', label: 'Civil unrest desk' },
    { key: 'general-alerts', label: 'OSINT alert stream' }
  ];
  const RISK_DISTRIBUTION = [
    { label: 'Low', short: 'L', value: 21, className: 'risk-low' },
    { label: 'Guarded', short: 'G', value: 43, className: 'risk-guarded' },
    { label: 'Elevated', short: 'E', value: 18, className: 'risk-elevated' },
    { label: 'High', short: 'H', value: 11, className: 'risk-high' },
    { label: 'Severe', short: 'S', value: 7, className: 'risk-severe' }
  ];
  const ALERTS = [
    {
      id: 'islamabad-route-watch',
      countryCode: 'PK',
      location: 'Islamabad, Pakistan',
      region: 'Pakistan',
      title: 'Pakistan watch elevated for executive corridors',
      category: 'Route Watch',
      source: 'Route Friction Desk',
      summary: 'Motorway congestion and checkpoint drag are compressing movement windows across the Islamabad-Lahore axis.',
      interpretation: 'Route friction increasing',
      severity: 'high',
      severityLabel: 'High',
      severityRank: 3,
      updatedMinutes: 6,
      href: 'pages/intelligence/active-alerts.html?country=PK',
      image: 'assets/images/travel-bg.webp',
      categories: ['route-disruption', 'general-alerts', 'travel'],
      priorityRegion: true,
      ticker: 'Route watch raised near Islamabad'
    },
    {
      id: 'tokyo-seismic-review',
      countryCode: 'JP',
      location: 'Tokyo, Japan',
      region: 'Japan',
      title: 'Seismic advisory updated for Tokyo rail and airport links',
      category: 'Seismic Feed',
      source: 'Seismic Review Cell',
      summary: 'A fresh seismic event is driving inspections, schedule drift, and onward itinerary review for executive travel teams.',
      interpretation: 'Two nodes require review',
      severity: 'medium',
      severityLabel: 'Elevated',
      severityRank: 2,
      updatedMinutes: 11,
      href: 'pages/intelligence/active-alerts.html?country=JP',
      image: 'assets/images/global-map.webp',
      categories: ['earthquake', 'travel'],
      priorityRegion: false,
      ticker: 'Seismic advisory updated for Japan'
    },
    {
      id: 'london-travel-window',
      countryCode: 'GB',
      location: 'London, United Kingdom',
      region: 'United Kingdom',
      title: 'UK travel alert unchanged across executive transfer windows',
      category: 'Travel Advisory',
      source: 'Mobility Advisory Desk',
      summary: 'Demonstration spillover and central-London route controls remain manageable with staggered arrivals and pre-cleared alternates.',
      interpretation: 'Airport-linked delays stable',
      severity: 'medium',
      severityLabel: 'Elevated',
      severityRank: 2,
      updatedMinutes: 17,
      href: 'pages/intelligence/active-alerts.html?country=GB',
      image: 'assets/images/slide-01.webp',
      categories: ['travel', 'civil-unrest'],
      priorityRegion: true,
      ticker: 'UK travel alert unchanged'
    },
    {
      id: 'tehran-route-review',
      countryCode: 'IR',
      location: 'Tehran, Iran',
      region: 'Iran',
      title: 'Iran route exposure remains under active urban review',
      category: 'Civil Unrest',
      source: 'Urban Stability Monitor',
      summary: 'Demonstration indicators and police posture changes continue to shape route reliability in central transit corridors.',
      interpretation: 'Exposure under review',
      severity: 'high',
      severityLabel: 'High',
      severityRank: 3,
      updatedMinutes: 20,
      href: 'pages/intelligence/active-alerts.html?country=IR',
      image: 'assets/images/intelligence-alerts-bg.webp',
      categories: ['civil-unrest', 'general-alerts'],
      priorityRegion: true,
      ticker: 'Iran route exposure under review'
    },
    {
      id: 'kabul-incident-watch',
      countryCode: 'AF',
      location: 'Kabul, Afghanistan',
      region: 'Afghanistan',
      title: 'Afghanistan remains highest risk in current watch set',
      category: 'General Alert',
      source: 'OSINT Fusion Cell',
      summary: 'Security incidents and corridor posture changes are sustaining severe exposure assumptions for executive planning.',
      interpretation: 'Movement confidence reduced',
      severity: 'critical',
      severityLabel: 'Severe',
      severityRank: 4,
      updatedMinutes: 24,
      href: 'pages/intelligence/active-alerts.html?country=AF',
      image: 'assets/images/risk-management-bg.webp',
      categories: ['general-alerts', 'route-disruption'],
      priorityRegion: true,
      ticker: 'Afghanistan highest-risk corridor unchanged'
    },
    {
      id: 'istanbul-civil-monitor',
      countryCode: 'TR',
      location: 'Istanbul, Turkey',
      region: 'Turkey',
      title: 'Turkey civil unrest watch tightens around business districts',
      category: 'Civil Unrest',
      source: 'Field Signal Desk',
      summary: 'Localized protest reporting and transport slowdowns are increasing friction for senior personnel transfers.',
      interpretation: 'Escalation watch active',
      severity: 'high',
      severityLabel: 'High',
      severityRank: 3,
      updatedMinutes: 29,
      href: 'pages/intelligence/active-alerts.html?country=TR',
      image: 'assets/images/slide-03.webp',
      categories: ['civil-unrest', 'travel'],
      priorityRegion: false,
      ticker: 'Turkey district movement window tightened'
    },
    {
      id: 'dubai-airport-signal',
      countryCode: 'AE',
      location: 'Dubai, United Arab Emirates',
      region: 'United Arab Emirates',
      title: 'Travel disruption signals flagged across Gulf airport timings',
      category: 'Travel Signal',
      source: 'Travel Signal Net',
      summary: 'Arrival slippage and terminal-side congestion are requiring tighter handover windows for onward executive movement.',
      interpretation: 'Three airport-linked signals',
      severity: 'low',
      severityLabel: 'Guarded',
      severityRank: 1,
      updatedMinutes: 33,
      href: 'pages/intelligence/active-alerts.html?country=AE',
      image: 'assets/images/intelligence-monitoring-bg.webp',
      categories: ['travel'],
      priorityRegion: false,
      ticker: 'Gulf airport-linked travel signals flagged'
    },
    {
      id: 'kyiv-security-brief',
      countryCode: 'UA',
      location: 'Kyiv, Ukraine',
      region: 'Ukraine',
      title: 'Ukraine movement advisory retained for executive avoidance',
      category: 'Security Brief',
      source: 'Strategic Risk Cell',
      summary: 'Security conditions remain severe and keep all movement planning in advisory-only mode for affected corridors.',
      interpretation: 'Advisory posture retained',
      severity: 'critical',
      severityLabel: 'Severe',
      severityRank: 4,
      updatedMinutes: 38,
      href: 'pages/intelligence/active-alerts.html?country=UA',
      image: 'assets/images/slide-04.webp',
      categories: ['general-alerts'],
      priorityRegion: false,
      ticker: 'Ukraine advisory posture retained'
    }
  ];

  function formatRelativeUpdate(updatedMinutes) {
    if (updatedMinutes < 60) {
      return updatedMinutes + 'm ago';
    }

    const hours = Math.floor(updatedMinutes / 60);
    return hours + 'h ago';
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

  function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
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

  function createSparkline(values) {
    return values.map((value) => '<i style="--spark-height:' + value + '%"></i>').join('');
  }

  function animateCounter(node, target) {
    const previous = Number(node.dataset.currentValue || 0);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 720;

    if (!duration) {
      node.textContent = String(target);
      node.dataset.currentValue = String(target);
      return;
    }

    const start = performance.now();

    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const nextValue = Math.round(previous + ((target - previous) * easeOutCubic(progress)));
      node.textContent = String(nextValue);

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      } else {
        node.dataset.currentValue = String(target);
      }
    }

    window.requestAnimationFrame(frame);
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
    const telemetryNode = section.querySelector('[data-live-intel-telemetry]');
    const telemetryGrid = section.querySelector('[data-live-intel-telemetry-grid]');
    const tickerNode = section.querySelector('[data-live-intel-ticker]');
    const updatedNodes = Array.from(section.querySelectorAll('[data-live-intel-updated], [data-live-intel-legend-updated], [data-live-intel-sidebar-updated], [data-live-intel-telemetry-updated]'));
    const toolbarButtons = Array.from(section.querySelectorAll('[data-overlay-toggle]'));

    if (!statusNode || !sourceStrip || !priorityStrip || !listNode || !feedCountNode || !feedWindow || !telemetryNode || !telemetryGrid || !tickerNode || !toolbarButtons.length) {
      return;
    }

    const state = {
      activeOverlays: new Set(['risk-level', 'general-alerts']),
      activeAlertId: ALERTS[0].id,
      mapReady: false,
      mapFailed: false,
      refreshCount: 0,
      filteredAlerts: ALERTS.slice(),
      currentSyncLabel: 'Awaiting first sync',
      feedPaused: false,
      feedLoopHeight: 0,
      lastFeedTimestamp: 0,
      feedRafId: 0,
      refreshTimer: 0,
      resumeTimer: 0,
      interactionsBound: false,
      telemetrySnapshot: {}
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

    function getHighestRiskAlert(alerts) {
      return alerts.slice().sort((left, right) => right.severityRank - left.severityRank)[0] || ALERTS[0];
    }

    function getDisplayMinutes(alert) {
      return Math.max(2, alert.updatedMinutes - (state.refreshCount % 3));
    }

    function setUpdatedLabels() {
      state.currentSyncLabel = formatSyncLabel(new Date());
      updatedNodes.forEach((node) => {
        node.textContent = state.currentSyncLabel;
      });
    }

    function renderSources() {
      sourceStrip.innerHTML = '';

      SOURCE_PILLS.forEach((source) => {
        const pill = document.createElement('span');
        const isActive = state.activeOverlays.has(source.key);
        pill.className = 'live-intel-source-pill' + (isActive ? ' is-active' : '') + (state.mapFailed && source.key === 'risk-level' ? ' is-offline' : '');
        pill.textContent = source.label;
        sourceStrip.appendChild(pill);
      });
    }

    function renderPriorityRegions() {
      const labels = ['Priority Regions'].concat(
        state.filteredAlerts
          .filter((alert) => alert.priorityRegion)
          .map((alert) => alert.region)
          .filter((region, index, list) => list.indexOf(region) === index)
          .slice(0, 4)
      );

      priorityStrip.innerHTML = '';
      labels.forEach((label, index) => {
        const pill = document.createElement('span');
        pill.className = 'live-intel-priority-pill' + (index === 0 ? ' is-label' : '');
        pill.textContent = label;
        priorityStrip.appendChild(pill);
      });
    }

    function createTelemetryCards() {
      const activeCategories = getActiveCategoryOverlays();
      const routeSignals = ALERTS.filter((alert) => alert.categories.includes('route-disruption')).length;
      const seismicSignals = ALERTS.filter((alert) => alert.categories.includes('earthquake')).length;
      const travelSignals = ALERTS.filter((alert) => alert.categories.includes('travel')).length;
      const unrestSignals = ALERTS.filter((alert) => alert.categories.includes('civil-unrest')).length;
      const highestRisk = getHighestRiskAlert(state.filteredAlerts);
      const focusedLabel = activeCategories.length ? activeCategories.map((key) => OVERLAY_LABELS[key]).join(' + ') : 'Risk Level';
      const riskLeader = RISK_DISTRIBUTION.slice().sort((left, right) => right.value - left.value)[0];
      const alertCount = 122 + (state.filteredAlerts.length * 3) + (state.refreshCount % 5);
      const routeCount = 7 + (routeSignals * 2) + (state.refreshCount % 2);
      const seismicCount = 12 + (seismicSignals * 2) + ((state.refreshCount + 1) % 2);
      const combinedTravelCount = 9 + (travelSignals * 2) + unrestSignals;

      return [
        {
          id: 'risk-model',
          label: 'Global Risk Model',
          status: 'Live model',
          tone: 'cool',
          valueText: riskLeader.value + '%',
          meta: riskLeader.label + ' largest share',
          extra: 'Highest risk: ' + highestRisk.region,
          distribution: RISK_DISTRIBUTION,
          spark: [40, 58, 52, 60, 66, 62, 70]
        },
        {
          id: 'active-alerts',
          label: 'Active Alerts',
          status: '+6 in last 10 mins',
          tone: 'neutral',
          value: alertCount,
          meta: state.filteredAlerts.length + ' currently visible',
          extra: 'Newest: ' + state.filteredAlerts[0].region,
          spark: [22, 34, 38, 44, 52, 58, 64]
        },
        {
          id: 'priority-regions',
          label: 'Priority Regions',
          status: focusedLabel,
          tone: 'warning',
          value: state.filteredAlerts.filter((alert) => alert.priorityRegion).length || 4,
          meta: 'Elevated posture active',
          extra: 'Pakistan, Afghanistan, Iran, UK',
          spark: [30, 44, 46, 54, 58, 63, 67]
        },
        {
          id: 'route-disruption',
          label: 'Route Disruption',
          status: 'Executive movement',
          tone: 'warning',
          value: routeCount,
          meta: '2 airport-linked reviews',
          extra: 'Primary corridor stress rising',
          spark: [18, 26, 31, 40, 48, 44, 56]
        },
        {
          id: 'seismic-feed',
          label: 'Seismic Feed',
          status: 'Open-source feed',
          tone: 'cool',
          value: seismicCount,
          meta: '2 requiring review',
          extra: 'Japan remains active',
          spark: [16, 19, 34, 48, 37, 42, 40]
        },
        {
          id: 'travel-unrest',
          label: 'Travel / Civil Unrest',
          status: 'Composite watch',
          tone: highestRisk.severityRank >= 4 ? 'critical' : 'warning',
          value: combinedTravelCount,
          meta: travelSignals + ' travel | ' + unrestSignals + ' unrest',
          extra: highestRisk.region + ' ' + highestRisk.severityLabel,
          spark: [24, 36, 32, 49, 54, 50, 62]
        }
      ];
    }

    function renderTelemetry() {
      const cards = createTelemetryCards();
      telemetryGrid.innerHTML = '';

      cards.forEach((card) => {
        const article = document.createElement('article');
        article.className = 'live-intel-signal-card tone-' + card.tone + (card.tone === 'critical' ? ' is-breathing' : '');

        const top = document.createElement('div');
        top.className = 'live-intel-signal-top';

        const label = document.createElement('span');
        label.className = 'live-intel-signal-label';
        label.textContent = card.label;

        const status = document.createElement('span');
        status.className = 'live-intel-signal-status';
        status.innerHTML = '<i></i>' + card.status;

        const value = document.createElement('strong');
        value.className = 'live-intel-signal-value';

        if (typeof card.value === 'number') {
          const previousValue = Number(state.telemetrySnapshot[card.id] || 0);
          value.dataset.currentValue = String(previousValue);
          value.textContent = String(previousValue);
        } else {
          value.textContent = card.valueText || '';
        }

        const meta = document.createElement('span');
        meta.className = 'live-intel-signal-meta';
        meta.textContent = card.meta;

        const extra = document.createElement('span');
        extra.className = 'live-intel-signal-extra';
        extra.textContent = card.extra;

        const visual = document.createElement('div');
        visual.className = 'live-intel-signal-visual';

        if (card.distribution) {
          const distribution = document.createElement('div');
          distribution.className = 'live-intel-distribution';
          card.distribution.forEach((entry) => {
            const bar = document.createElement('span');
            bar.className = 'live-intel-distribution-segment ' + entry.className;
            bar.style.setProperty('--segment-size', String(entry.value));
            bar.innerHTML = '<small>' + entry.short + '</small>';
            distribution.appendChild(bar);
          });
          visual.appendChild(distribution);
        } else {
          const sparkline = document.createElement('div');
          sparkline.className = 'live-intel-sparkline';
          sparkline.innerHTML = createSparkline(card.spark);
          visual.appendChild(sparkline);
        }

        top.appendChild(label);
        top.appendChild(status);
        article.appendChild(top);
        article.appendChild(value);
        article.appendChild(meta);
        article.appendChild(extra);
        article.appendChild(visual);
        telemetryGrid.appendChild(article);

        if (typeof card.value === 'number') {
          animateCounter(value, card.value);
          state.telemetrySnapshot[card.id] = card.value;
        }
      });
    }

    function renderTicker() {
      const snippets = state.filteredAlerts.slice(0, 5).map((alert) => alert.ticker).concat('Live refresh active ' + state.currentSyncLabel);
      tickerNode.innerHTML = snippets.concat(snippets).map((snippet) => '<span class="live-intel-ticker-item"><i></i>' + snippet + '</span>').join('');
    }

    function updateAlertSelection() {
      const cards = listNode.querySelectorAll('.live-intel-alert');
      cards.forEach((card) => {
        card.classList.toggle('is-active', card.dataset.alertId === state.activeAlertId);
      });
    }

    function dispatchCountryFocus(alertId) {
      const alert = state.filteredAlerts.find((item) => item.id === alertId) || ALERTS.find((item) => item.id === alertId);
      if (!alert) {
        return;
      }

      window.dispatchEvent(new CustomEvent(MAP_FOCUS_EVENT, {
        detail: { countryCode: alert.countryCode }
      }));
    }

    function createAlertCard(alert, isActive, duplicate) {
      const item = document.createElement('article');
      item.className = 'live-intel-alert' + (alert.priorityRegion ? ' is-priority-region' : '') + (isActive ? ' is-active' : '') + (state.filteredAlerts[0] && state.filteredAlerts[0].id === alert.id ? ' is-newest' : '');
      item.dataset.alertId = alert.id;
      item.tabIndex = duplicate ? -1 : 0;

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

      const meta = document.createElement('div');
      meta.className = 'live-intel-alert-meta';
      const location = document.createElement('span');
      location.className = 'live-intel-alert-location';
      location.textContent = alert.location;
      const time = document.createElement('span');
      time.className = 'live-intel-alert-time' + (state.filteredAlerts[0] && state.filteredAlerts[0].id === alert.id ? ' is-live' : '');
      time.textContent = formatRelativeUpdate(getDisplayMinutes(alert));
      const category = document.createElement('span');
      category.className = 'live-intel-badge category';
      category.textContent = alert.category;

      const summary = document.createElement('p');
      summary.className = 'live-intel-alert-summary';
      summary.textContent = alert.summary;
      const interpretation = document.createElement('p');
      interpretation.className = 'live-intel-alert-interpretation';
      interpretation.textContent = alert.interpretation;
      const view = document.createElement('a');
      view.className = 'live-intel-alert-view';
      view.href = alert.href;
      view.innerHTML = '<strong>View Briefing</strong>';
      view.addEventListener('click', (event) => {
        event.stopPropagation();
      });

      top.appendChild(title);
      top.appendChild(severity);
      meta.appendChild(location);
      meta.appendChild(time);
      meta.appendChild(category);
      body.appendChild(top);
      body.appendChild(meta);
      body.appendChild(summary);
      body.appendChild(interpretation);
      body.appendChild(view);
      item.appendChild(thumb);
      item.appendChild(body);

      if (!duplicate) {
        item.addEventListener('click', () => {
          pauseFeed();
          state.activeAlertId = alert.id;
          updateAlertSelection();
          dispatchCountryFocus(alert.id);
          scheduleFeedResume(3200);
        });
        item.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            item.click();
          }
        });
      } else {
        item.setAttribute('aria-hidden', 'true');
      }

      return item;
    }

    function updateStatus() {
      const overlays = getActiveCategoryOverlays();
      const highestRisk = getHighestRiskAlert(state.filteredAlerts);
      const overlayLabel = overlays.length ? overlays.map((key) => OVERLAY_LABELS[key]).join(', ') : OVERLAY_LABELS['risk-level'];

      if (state.mapFailed) {
        statusNode.classList.add('is-error');
        statusNode.textContent = 'Map layer unavailable. Live alert stream remains active for ' + overlayLabel.toLowerCase() + '.';
        return;
      }

      statusNode.classList.remove('is-error');
      statusNode.textContent = (state.mapReady ? 'Map synchronized. ' : 'Loading map layer. ') + highestRisk.region + ' is the highest-risk country in the current watch.';
    }

    function stopFeedLoop() {
      if (state.feedRafId) {
        window.cancelAnimationFrame(state.feedRafId);
        state.feedRafId = 0;
      }
    }

    function pauseFeed() {
      state.feedPaused = true;
      listNode.classList.add('is-paused');
      window.clearTimeout(state.resumeTimer);
    }

    function scheduleFeedResume(delay) {
      window.clearTimeout(state.resumeTimer);
      state.resumeTimer = window.setTimeout(() => {
        state.feedPaused = false;
        listNode.classList.remove('is-paused');
      }, delay || AUTO_SCROLL_RESUME_DELAY);
    }

    function feedStep(timestamp) {
      if (!state.lastFeedTimestamp) {
        state.lastFeedTimestamp = timestamp;
      }

      const delta = Math.min(34, timestamp - state.lastFeedTimestamp);
      state.lastFeedTimestamp = timestamp;

      if (!state.feedPaused && state.feedLoopHeight > listNode.clientHeight + 24) {
        listNode.scrollTop += (delta / 1000) * AUTO_SCROLL_SPEED;
        if (listNode.scrollTop >= state.feedLoopHeight) {
          listNode.scrollTop -= state.feedLoopHeight;
        }
      }

      state.feedRafId = window.requestAnimationFrame(feedStep);
    }

    function bindFeedInteractions() {
      if (state.interactionsBound) {
        return;
      }

      state.interactionsBound = true;
      listNode.addEventListener('mouseenter', pauseFeed);
      listNode.addEventListener('mouseleave', () => scheduleFeedResume(1400));
      listNode.addEventListener('focusin', pauseFeed);
      listNode.addEventListener('focusout', () => scheduleFeedResume(1800));
      listNode.addEventListener('wheel', () => {
        pauseFeed();
        scheduleFeedResume(3200);
      }, { passive: true });
      listNode.addEventListener('touchstart', pauseFeed, { passive: true });
      listNode.addEventListener('touchend', () => scheduleFeedResume(3200), { passive: true });
      listNode.addEventListener('scroll', () => {
        if (state.feedPaused) {
          scheduleFeedResume(3200);
        }
      }, { passive: true });
    }

    function renderEmptyState() {
      listNode.innerHTML = '';
      const empty = document.createElement('article');
      empty.className = 'live-intel-list-empty';
      empty.innerHTML = '<span class="live-intel-list-empty-dot"></span><div><strong>No alerts match the current overlay view</strong><p>Enable another overlay to widen the operating picture.</p></div>';
      listNode.appendChild(empty);
      feedCountNode.textContent = '0 alerts';
      stopFeedLoop();
    }

    function renderAlerts() {
      state.filteredAlerts = getFilteredAlerts();

      if (!state.filteredAlerts.length) {
        renderEmptyState();
        renderPriorityRegions();
        renderTelemetry();
        renderTicker();
        updateStatus();
        return;
      }

      if (!state.filteredAlerts.some((alert) => alert.id === state.activeAlertId)) {
        state.activeAlertId = state.filteredAlerts[0].id;
      }

      feedCountNode.textContent = state.filteredAlerts.length + ' alerts';
      listNode.innerHTML = '';

      const track = document.createElement('div');
      track.className = 'live-intel-list-track';
      const firstBatch = document.createElement('div');
      firstBatch.className = 'live-intel-list-batch';
      const secondBatch = document.createElement('div');
      secondBatch.className = 'live-intel-list-batch';

      state.filteredAlerts.forEach((alert) => {
        firstBatch.appendChild(createAlertCard(alert, alert.id === state.activeAlertId, false));
        secondBatch.appendChild(createAlertCard(alert, false, true));
      });

      track.appendChild(firstBatch);
      track.appendChild(secondBatch);
      listNode.appendChild(track);
      listNode.scrollTop = 0;
      renderPriorityRegions();
      renderTelemetry();
      renderTicker();
      updateStatus();
      bindFeedInteractions();
      dispatchCountryFocus(state.activeAlertId);

      window.requestAnimationFrame(() => {
        const styles = window.getComputedStyle(track);
        state.feedLoopHeight = firstBatch.offsetHeight + parseFloat(styles.rowGap || '0');
      });

      if (!state.feedRafId) {
        state.feedRafId = window.requestAnimationFrame(feedStep);
      }
    }

    function refreshTimeLabels() {
      listNode.querySelectorAll('.live-intel-alert').forEach((card) => {
        const alert = ALERTS.find((item) => item.id === card.dataset.alertId);
        const timeNode = card.querySelector('.live-intel-alert-time');
        if (alert && timeNode) {
          timeNode.textContent = formatRelativeUpdate(getDisplayMinutes(alert));
        }
      });
    }

    function triggerRefreshSurface() {
      feedWindow.classList.remove('is-refreshing');
      telemetryNode.classList.remove('is-refreshing');
      void feedWindow.offsetWidth;
      feedWindow.classList.add('is-refreshing');
      telemetryNode.classList.add('is-refreshing');
      window.setTimeout(() => {
        feedWindow.classList.remove('is-refreshing');
        telemetryNode.classList.remove('is-refreshing');
      }, 780);
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
      setUpdatedLabels();
      renderSources();
      renderAlerts();
      triggerRefreshSurface();
    }

    toolbarButtons.forEach((button) => {
      button.addEventListener('click', () => {
        toggleOverlay(button.getAttribute('data-overlay-toggle'));
      });
    });

    window.addEventListener(MAP_READY_EVENT, () => {
      state.mapReady = true;
      state.mapFailed = false;
      setUpdatedLabels();
      renderSources();
      updateStatus();
      dispatchCountryFocus(state.activeAlertId);
    });

    window.addEventListener(MAP_ERROR_EVENT, () => {
      state.mapReady = false;
      state.mapFailed = true;
      renderSources();
      updateStatus();
    });

    function startRefreshLoop() {
      window.clearInterval(state.refreshTimer);
      state.refreshTimer = window.setInterval(() => {
        state.refreshCount += 1;
        setUpdatedLabels();
        renderTelemetry();
        renderTicker();
        refreshTimeLabels();
        triggerRefreshSurface();
      }, REFRESH_INTERVAL_MS);
    }

    syncToolbar();
    setUpdatedLabels();
    renderSources();
    renderAlerts();
    startRefreshLoop();

    loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js'))
      .then(() => loadScript('js/world-risk-map.js'))
      .catch(() => {
        state.mapFailed = true;
        renderSources();
        updateStatus();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiveIntelligenceSection, { once: true });
  } else {
    initLiveIntelligenceSection();
  }
})();