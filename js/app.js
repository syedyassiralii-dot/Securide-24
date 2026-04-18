const COUNTRIES = [
  { name: 'Afghanistan', lat: 33.93, lng: 67.71, risk: 'Critical', col: '#e83a3a', alert: 'Complex threat environment. Multiple armed actor activity. Air corridor remains primary access route.', time: '15m ago', signals: '42 active', view: 'All executive movement requires full advance threat assessment, counter-surveillance protocols, and dedicated protective support.' },
  { name: 'Pakistan', lat: 30.38, lng: 69.35, risk: 'High', col: '#e87a3a', alert: 'Civil unrest elevated in KP and Punjab. Political protest movements active in multiple urban centres.', time: '8m ago', signals: '31 active', view: 'Priority Region. Islamabad and Lahore corridors under active monitoring. Avoid protest assembly areas. Advance route intelligence mandatory.' },
  { name: 'Iran', lat: 32.43, lng: 53.69, risk: 'Critical', col: '#e83a3a', alert: 'Active regional tension. Internal security apparatus activity in major urban centres.', time: '20m ago', signals: '24 active', view: 'Securide24 advises against non-essential executive travel to Iran. All monitored routes carry elevated risk assessment.' },
  { name: 'Iraq', lat: 33.22, lng: 43.68, risk: 'High', col: '#e87a3a', alert: 'Checkpoint activity intensified on northern approach corridor.', time: '1h 18m ago', signals: '18 active', view: 'Executive movement requires advance route intelligence. Securide24 advises dedicated protective support for all in-country movements.' },
  { name: 'Yemen', lat: 15.55, lng: 48.52, risk: 'Critical', col: '#e83a3a', alert: 'Active conflict environment. No executive travel advised.', time: '2h ago', signals: '38 active', view: 'Securide24 does not advise executive travel to Yemen under current threat conditions. Remote advisory only.' },
  { name: 'Syria', lat: 34.80, lng: 38.10, risk: 'Critical', col: '#e83a3a', alert: 'Conflict-affected environment. No routine executive travel possible.', time: '3h ago', signals: '29 active', view: 'No executive travel advisory issued for Syria. Monitoring continues for potential future access assessment.' },
  { name: 'Libya', lat: 26.34, lng: 17.23, risk: 'High', col: '#e87a3a', alert: 'Fragmented security environment. Armed group activity in interior regions.', time: '2h ago', signals: '14 active', view: 'Executive travel limited to secured zones with advance assessment. Securide24 advises dedicated ground coordination.' },
  { name: 'Sudan', lat: 12.86, lng: 30.22, risk: 'Critical', col: '#e83a3a', alert: 'Active conflict. Humanitarian situation deteriorating in multiple regions.', time: '4h ago', signals: '22 active', view: 'No executive travel recommended. Monitoring active for regional spillover.' },
  { name: 'Somalia', lat: 5.15, lng: 46.20, risk: 'Critical', col: '#e83a3a', alert: 'Ongoing security threats from armed groups. Maritime threat elevated.', time: '5h ago', signals: '16 active', view: 'Executive operations not feasible without full protective support and advance coordination through Securide24.' },
  { name: 'Nigeria', lat: 9.08, lng: 8.68, risk: 'High', col: '#e87a3a', alert: 'Kidnap-for-ransom threat elevated. Northern states under additional restrictions.', time: '3h ago', signals: '12 active', view: 'Pre-deployment assessment mandatory. Securide24 advises vetted local coordination and secure accommodation protocols.' },
  { name: 'Ethiopia', lat: 9.14, lng: 40.49, risk: 'High', col: '#e87a3a', alert: 'Ongoing regional instability in Tigray. Addis Ababa remains accessible.', time: '4h ago', signals: '9 active', view: 'Executive travel to Addis Ababa feasible with standard precautions. Avoid travel to northern regions.' },
  { name: 'Mali', lat: 17.57, lng: -3.99, risk: 'Critical', col: '#e83a3a', alert: 'Sahel instability. Jihadist threat elevated across multiple regions.', time: '6h ago', signals: '17 active', view: 'No executive travel outside secured compounds without full protective coordination.' },
  { name: 'Democratic Republic of Congo', lat: -4.04, lng: 21.76, risk: 'High', col: '#e87a3a', alert: 'Eastern provinces remain conflict-affected. Kinshasa stable.', time: '5h ago', signals: '11 active', view: 'Executive operations in eastern DRC require full protective support. Kinshasa accessible with standard precautions.' },
  { name: 'Ukraine', lat: 48.38, lng: 31.17, risk: 'Critical', col: '#e83a3a', alert: 'Active conflict zone. No executive travel advised outside western regions.', time: '1h ago', signals: '33 active', view: 'Executive travel limited to Lviv and western Ukraine only. Full risk assessment and protective coordination required.' },
  { name: 'Russia', lat: 61.52, lng: 105.32, risk: 'High', col: '#e87a3a', alert: 'Elevated detention risk for foreign nationals. Travel heavily restricted.', time: '2h ago', signals: '15 active', view: 'Securide24 advises against executive travel to Russia. Significant legal and personal safety risk to foreign principals.' },
  { name: 'Venezuela', lat: 6.42, lng: -66.59, risk: 'High', col: '#e87a3a', alert: 'Crime and kidnap threat elevated. Political instability ongoing.', time: '3h ago', signals: '10 active', view: 'Pre-deployment assessment required. Securide24 advises vetted ground coordination and avoidance of night movement.' },
  { name: 'Myanmar', lat: 21.91, lng: 95.96, risk: 'Critical', col: '#e83a3a', alert: 'Military governance. Armed resistance active in multiple states.', time: '5h ago', signals: '20 active', view: 'No executive travel recommended without full operational support package and extraction planning.' },
  { name: 'Mexico', lat: 23.63, lng: -102.55, risk: 'Medium', col: '#e8c43a', alert: 'Cartel activity elevated in northern states. Major cities accessible.', time: '2h ago', signals: '8 active', view: 'Executive travel to Mexico City and Guadalajara with standard precautions. Assess northern border regions carefully.' },
  { name: 'Colombia', lat: 4.57, lng: -74.30, risk: 'Medium', col: '#e8c43a', alert: 'Dissidents active in border regions. Bogotá and Medellín accessible.', time: '3h ago', signals: '7 active', view: 'Executive travel to major cities with vetted ground transport. Avoid coca-producing regions without specific assessment.' },
  { name: 'Egypt', lat: 26.82, lng: 30.80, risk: 'Medium', col: '#e8c43a', alert: 'Sinai security concerns persist. Cairo and resort areas stable.', time: '2h ago', signals: '6 active', view: 'Executive travel to Cairo and Sharm El Sheikh with standard precautions. Avoid Sinai Peninsula.' },
  { name: 'Jordan', lat: 30.59, lng: 36.24, risk: 'Low', col: '#3ae88a', alert: 'Stable environment. Regional tensions monitored closely.', time: '4h ago', signals: '3 active', view: 'Executive travel to Amman assessed as low-risk. Recommended as regional coordination hub for Middle East operations.' },
  { name: 'UAE', lat: 23.42, lng: 53.85, risk: 'Low', col: '#3ae88a', alert: 'Stable operating environment. Travel posture normal with elevated vigilance.', time: '33m ago', signals: '4 active', view: 'Dubai and Abu Dhabi remain accessible and well-suited for regional executive operations. Standard precautions apply.' },
  { name: 'Saudi Arabia', lat: 23.89, lng: 45.08, risk: 'Low', col: '#3ae88a', alert: 'Stable in major cities. Yemen border areas monitored.', time: '2h ago', signals: '5 active', view: 'Riyadh and Jeddah accessible. Executive travel with standard corporate precautions and awareness of cultural protocols.' },
  { name: 'India', lat: 20.59, lng: 78.96, risk: 'Low', col: '#3ae88a', alert: 'Stable operating environment. Border state tensions monitored.', time: '3h ago', signals: '8 active', view: 'No specific advisory for executive travel to India. Standard due diligence applies for travel to border states.' },
  { name: 'China', lat: 35.86, lng: 104.20, risk: 'Medium', col: '#e8c43a', alert: 'Information restrictions apply. Digital security monitoring elevated.', time: '2h ago', signals: '10 active', view: 'All executive travel should include digital security assessment. Devices screened before entry. Operational security precautions throughout.' },
  { name: 'United Kingdom', lat: 55.38, lng: -3.44, risk: 'Low', col: '#4a9eff', alert: 'National threat level remains at Substantial. No specific threats to executive movement.', time: '30m ago', signals: '5 active', view: 'UK operations governed from London HQ. Threat posture monitored continuously. Executive movement within mainland UK assessed as routine.' },
  { name: 'United States', lat: 37.09, lng: -95.71, risk: 'Medium', col: '#e8c43a', alert: 'Large-scale civil demonstrations in major cities. Federal agency movements monitored.', time: '2h ago', signals: '12 active', view: 'Assess any gatherings in metropolitan areas before executive ground movement. No flight disruptions currently reported.' },
  { name: 'Kenya', lat: -0.02, lng: 37.91, risk: 'Medium', col: '#e8c43a', alert: 'Minor seismic event 4.1M east of city. Nairobi stable.', time: '47m ago', signals: '5 active', view: 'Executive travel to Nairobi with standard precautions. Al-Shabaab threat in northern counties requires specific assessment.' },
  { name: 'Kazakhstan', lat: 48.02, lng: 66.92, risk: 'Low', col: '#3ae88a', alert: 'Stable environment. Energy sector operations well-established.', time: '6h ago', signals: '2 active', view: 'Nur-Sultan and Almaty accessible for executive operations. Standard corporate precautions apply.' },
  { name: 'Turkey', lat: 38.96, lng: 35.24, risk: 'Medium', col: '#e8c43a', alert: 'Regional tensions elevated. Istanbul and Ankara stable for executive operations.', time: '1h ago', signals: '7 active', view: 'Major cities accessible. Executive operations in southeast Turkey require advance assessment due to proximity to conflict zones.' },
];

const PLATFORM_FEATURES = {
  signals: {
    label: 'Executive Signals — Live Layer',
    title: 'High-relevance alerts calibrated for principal exposure',
    text: 'Executive Signals condenses complex operating conditions into a concise readout shaped around movement impact, proximity, and decision urgency.',
    items: [
      'Signals ranked by exposure, timing, and route relevance',
      'Secure delivery format for leadership and protective teams',
      'Built for decision speed during movement and access changes',
      'Escalation logic aligned to executive travel posture',
    ],
  },
  briefs: {
    label: 'Country Risk Brief — Advisory Grade',
    title: 'Structured country posture before travel or market entry',
    text: 'Country Risk Briefs convert fragmented political, security, and travel reporting into one structured posture read for boards, principals, and travelling teams.',
    items: [
      'Threat environment, travel posture, and access constraints',
      'Executive movement implications and protective considerations',
      'Decision-quality summaries for leadership consumption',
      'Useful for pre-deployment, market entry, and board review',
    ],
  },
  briefings: {
    label: 'Intelligence Brief — Sample Extract',
    title: 'Pakistan — Regional Security Assessment',
    text: 'Pakistan\'s major urban centres remain elevated following sustained political mobilisation. Executive movement in and around Islamabad requires advance route intelligence for the current operating cycle.',
    items: [
      'Protest movements active in Rawalpindi, Lahore, and Karachi',
      'Security forces maintaining elevated posture at key junctions',
      'Airport operations nominally normal — recommend +2h arrival buffers',
      'Diplomatic zone perimeter monitoring in effect — no closure confirmed',
    ],
  },
  alerts: {
    label: 'Active Alert Stream — Monitoring Layer',
    title: 'Live signal watch separated from noise and interpreted for action',
    text: 'The alert stream is built as a decision aid, not a news feed. Signals are filtered, categorised, and contextualised for faster movement from awareness to response.',
    items: [
      'Civil unrest, travel, route, and seismic categories',
      'Rapid triage on impact to movement and access',
      'Integrated with country context and executive briefings',
      'Intended for continuous watch and rapid escalation support',
    ],
  },
  flash: {
    label: 'Crisis Flash Update — Leadership Use',
    title: 'Fast-turn leadership guidance when situations deteriorate quickly',
    text: 'Crisis Flash Updates provide immediate clarity on what changed, the likely exposure implications, and the decisions that now warrant executive attention.',
    items: [
      'Fast-turn synthesis for crisis and incident windows',
      'Decision framing for leadership, security leads, and operations',
      'Built to support structured communications and next actions',
      'Complements real-time monitoring and field coordination',
    ],
  },
};

const REACH_REGIONS = {
  'pak-af': {
    topline: 'Primary Depth',
    title: 'Pakistan & Afghanistan',
    body: 'Deep operational network. Senior regional advisory. Active monitoring.',
    note: 'Securide24\'s Pakistan and Afghanistan capability is built from direct experience, not distance or database subscriptions.',
    list: [
      'Ground-informed context for movement and exposure.',
      'Active watch logic around Islamabad and Lahore corridors.',
      'Leadership-grade advisory presentation for complex visits.',
    ],
    stats: ['94', '24/7', 'UK'],
  },
  gulf: {
    topline: 'Extended Reach',
    title: 'Middle East & Gulf',
    body: 'UAE, Saudi, Iraq, and Iran monitoring. Travel and protection coordination.',
    note: 'Regional work across the Gulf and wider Middle East demands disciplined interpretation of spillover, access restrictions, and escalation risk.',
    list: [
      'Travel posture guidance across Gulf commercial hubs.',
      'Protection coordination when exposure increases beyond routine.',
      'Regional tension translated into executive movement decisions.',
    ],
    stats: ['4', 'Live', 'Regional'],
  },
  'south-asia': {
    topline: 'Regional Reach',
    title: 'Central & South Asia',
    body: 'India, Central Asian states, and corridor monitoring across adjacent markets.',
    note: 'This region demands differentiated posture, with corridor exposure, state-level variation, and travel logic framed into a disciplined advisory picture.',
    list: [
      'Country-by-country posture rather than broad regional generalisation.',
      'Useful for multi-stop executive itineraries and investor travel.',
      'Supports pre-entry review and movement planning across adjacent markets.',
    ],
    stats: ['3', 'Briefing', 'Corridor'],
  },
  uk: {
    topline: 'HQ Governed',
    title: 'United Kingdom',
    body: 'Platform governed and headquartered. UK advisory operations base.',
    note: 'From a UK-governed platform, Securide24 maintains the standards and professional conduct expected by executive clients and multinational organisations.',
    list: [
      'Governance, discretion, and professional conduct baseline.',
      'London-based operating posture for international coordination.',
      'Suitable hub for advisory continuity and executive escalation handling.',
    ],
    stats: ['UK', 'HQ', 'Governed'],
  },
  global: {
    topline: 'Global Monitoring',
    title: 'Global Advisory',
    body: '94 countries monitored. International advisory networks activated on request.',
    note: 'Global coverage is built around monitoring reach and decision support, with deeper concentration where Securide24 holds stronger practitioner access.',
    list: [
      'Monitoring footprint across 94 countries.',
      'International advisory support available on request.',
      'Depth varies by region and is communicated directly, not exaggerated.',
    ],
    stats: ['94', 'Global', 'On Request'],
  },
};

function riskBg(color) {
  const colorMap = {
    '#e83a3a': 'rgba(232,58,58,0.18)',
    '#e87a3a': 'rgba(232,122,58,0.15)',
    '#e8c43a': 'rgba(232,196,58,0.12)',
    '#3ae88a': 'rgba(58,232,138,0.10)',
    '#4a9eff': 'rgba(74,158,255,0.12)',
  };

  return colorMap[color] || 'rgba(74,158,255,0.1)';
}

function buildPopupHTML(country) {
  return `<div class="lf-popup">
    <div class="lf-popup-country">${country.name}</div>
    <div class="lf-popup-risk" style="background:${riskBg(country.col)};color:${country.col};border:1px solid ${country.col}44;">
      <span style="width:6px;height:6px;border-radius:50%;background:${country.col};display:inline-block;"></span>
      ${country.risk} Risk
    </div>
    <div class="lf-popup-grid">
      <div class="lf-popup-field">
        <div class="lf-popup-label">Updated</div>
        <div class="lf-popup-value">${country.time}</div>
      </div>
      <div class="lf-popup-field">
        <div class="lf-popup-label">Active Signals</div>
        <div class="lf-popup-value">${country.signals}</div>
      </div>
    </div>
    <div class="lf-popup-field" style="margin-bottom:10px;">
      <div class="lf-popup-label">Latest Alert</div>
      <div class="lf-popup-value">${country.alert}</div>
    </div>
    <div class="lf-popup-view">${country.view}</div>
    <button class="lf-popup-cta" onclick="openModal()">Request Country Brief →</button>
  </div>`;
}

function initLeafletMap() {
  const mapElement = document.getElementById('leaflet-risk-map');
  if (!mapElement || !window.L) {
    return;
  }

  const map = L.map('leaflet-risk-map', {
    center: [25, 45],
    zoom: 3,
    minZoom: 2,
    maxZoom: 7,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  COUNTRIES.forEach((country) => {
    const icon = L.divIcon({
      className: '',
      html: `<div class="risk-marker-pulse" style="background:${country.col};color:${country.col};box-shadow:0 0 10px ${country.col}66;"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    const marker = L.marker([country.lat, country.lng], { icon }).addTo(map);
    marker.bindPopup(buildPopupHTML(country), {
      maxWidth: 280,
      minWidth: 260,
      closeButton: true,
      autoPanPaddingTopLeft: [20, 80],
      autoPanPaddingBottomRight: [20, 20],
    });

    marker.on('click', () => {
      map.closePopup();
      marker.openPopup();
    });
  });

  const routeCoordinates = [
    [51.5, -0.12],
    [41.0, 28.9],
    [35.0, 48.0],
    [33.7, 73.1],
  ];

  L.polyline(routeCoordinates, {
    color: '#4a9eff',
    weight: 1,
    opacity: 0.35,
    dashArray: '6, 6',
  }).addTo(map);

  map.on('focus', () => map.scrollWheelZoom.enable());
  map.on('blur', () => map.scrollWheelZoom.disable());

  // Expose map globally so live alert markers can be added after fetch
  window.riskMap = map;
}

// ---------------------------------------------------------------------------
// Live Alerts — fetch, render, and refresh
// ---------------------------------------------------------------------------

let _liveAlertMarkers = [];
let _currentAlertFilter = 'all';

const SEV_CLASS  = { critical: 'sev-critical', high: 'sev-high', medium: 'sev-medium', monitor: 'sev-low' };
const SEV_LABEL  = { critical: 'Critical',     high: 'High',     medium: 'Medium',     monitor: 'Monitor' };
const SEV_COLOR  = { critical: '#e83a3a',       high: '#e87a3a',  medium: '#e8c43a',    monitor: '#4a9eff' };

const TAG_CATEGORY = {
  'Civil Unrest':      'unrest',
  'Travel Impact':     'travel route',
  'Security Incident': 'route unrest',
  'Environmental':     'seismic',
  'General Alert':     'general',
};

function tagsToCategory(tags) {
  const cats = new Set(['general']);
  tags.forEach((tag) => {
    (TAG_CATEGORY[tag] || 'general').split(' ').forEach((c) => cats.add(c));
  });
  return [...cats].join(' ');
}

function locationLabel(alert) {
  if (alert.geo && alert.countryCode) return `${alert.geo.place.toUpperCase()} · ${alert.countryCode}`;
  if (alert.geo)                       return alert.geo.place.toUpperCase();
  if (alert.countryCode)               return alert.countryCode;
  return '—';
}

function truncate(str, max) {
  return str && str.length > max ? str.slice(0, max - 1) + '…' : (str || '');
}

// Render the featured incident card (Live Desk section)
function renderFeaturedAlert(alert) {
  const card = document.getElementById('liveIncidentCard');
  if (!card || !alert) return;
  const sc = SEV_CLASS[alert.severity] || 'sev-low';
  const sl = SEV_LABEL[alert.severity] || 'Monitor';
  card.innerHTML = `
    <div class="live-incident-header">
      <span class="feed-sev-tag ${sc}">${sl}</span>
      <span class="feed-time">${alert.relativeTime}</span>
    </div>
    <h3>${truncate(alert.title, 130)}</h3>
    <p>${truncate(alert.summary, 200)}</p>
    <div class="live-incident-tags">
      ${alert.tags.map((t) => `<span>${t}</span>`).join('')}
    </div>`;
}

// Render the three secondary stack cards (Live Desk sidebar)
function renderStackCards(alerts) {
  const container = document.getElementById('liveStackBody');
  if (!container) return;
  const items = alerts.slice(1, 4);
  if (!items.length) return;
  container.innerHTML = items.map((alert) => {
    const sc = SEV_CLASS[alert.severity] || 'sev-low';
    const sl = SEV_LABEL[alert.severity] || 'Monitor';
    return `
    <div class="live-stack-card">
      <div class="live-stack-item">
        <div>
          <span class="feed-sev-tag ${sc}">${sl}</span>
          <strong>${locationLabel(alert)}</strong>
        </div>
        <span class="feed-time">${alert.relativeTime}</span>
      </div>
      <p>${truncate(alert.summary, 100)}</p>
    </div>`;
  }).join('');
}

// Render the scrolling alert feed (Risk Map section)
function renderAlertFeed(alerts) {
  const feed = document.getElementById('alertFeed');
  if (!feed) return;

  const items = alerts.slice(0, 10);
  if (!items.length) {
    feed.innerHTML = '<div class="feed-item"><div class="feed-desc">No alerts — monitoring active.</div></div>';
    return;
  }

  // Duplicate items for the seamless CSS scroll loop (translateY -50%)
  const html = items.map((alert) => {
    const sc  = SEV_CLASS[alert.severity] || 'sev-low';
    const sl  = SEV_LABEL[alert.severity] || 'Monitor';
    const cat = tagsToCategory(alert.tags);
    return `
    <div class="feed-item" data-category="${cat}">
      <div class="feed-item-top">
        <span class="feed-sev-tag ${sc}">${sl}</span>
        <span class="feed-time">${alert.relativeTime}</span>
      </div>
      <div class="feed-location">${locationLabel(alert)}</div>
      <div class="feed-desc">${truncate(alert.title, 110)}</div>
    </div>`;
  }).join('');
  feed.innerHTML = html + html; // doubled for seamless scroll

  // Re-apply any active category filter
  const activeBtn = document.querySelector('.risk-filter-btn.active');
  if (activeBtn && _currentAlertFilter !== 'all') {
    feed.querySelectorAll('.feed-item').forEach((item) => {
      const cats = (item.dataset.category || '').split(' ').filter(Boolean);
      item.style.display = cats.includes(_currentAlertFilter) ? '' : 'none';
    });
  }
}

// Update telemetry strip and live desk metrics
function updateTelemetry(data) {
  const { alerts, fetchedAt } = data;

  const critHighAlerts = alerts.filter((a) => a.severity === 'critical' || a.severity === 'high');
  const travelCount    = alerts.filter((a) => a.tags.includes('Travel Impact')).length;
  const uniqueCodes    = [...new Set(critHighAlerts.filter((a) => a.countryCode).map((a) => a.countryCode))].slice(0, 4);
  const regionCount    = uniqueCodes.length;

  // Telemetry strip
  const el = (id) => document.getElementById(id);
  if (el('telActiveAlerts'))     el('telActiveAlerts').textContent     = alerts.length;
  if (el('telActiveAlertsSub'))  el('telActiveAlertsSub').textContent  = `↑ updated live`;
  if (el('telPriorityRegions'))  el('telPriorityRegions').textContent  = uniqueCodes.join(' · ') || 'Global';
  if (el('telPriorityRegionsSub')) el('telPriorityRegionsSub').textContent = `${regionCount} under watch`;
  if (el('telTravelDisruption')) el('telTravelDisruption').textContent = travelCount;

  // Last refresh time
  if (el('refreshTime') && fetchedAt) {
    const d = new Date(fetchedAt);
    el('refreshTime').textContent = [
      String(d.getHours()).padStart(2, '0'),
      String(d.getMinutes()).padStart(2, '0'),
    ].join(':');
  }

  // Live Desk metrics block
  if (el('liveMetricAlerts'))  el('liveMetricAlerts').textContent  = alerts.length;
  if (el('liveMetricRegions')) el('liveMetricRegions').textContent = regionCount || '—';
  if (el('liveMetricRoutes'))  el('liveMetricRoutes').textContent  = travelCount;
}

// Add live alert markers on the Leaflet map for alerts with geo coordinates
function placeLiveMapMarkers(alerts) {
  if (!window.riskMap || !window.L) return;

  // Clear previous live markers
  _liveAlertMarkers.forEach((m) => window.riskMap.removeLayer(m));
  _liveAlertMarkers = [];

  alerts.filter((a) => a.geo).forEach((alert) => {
    const col  = SEV_COLOR[alert.severity] || '#4a9eff';
    const icon = L.divIcon({
      className: '',
      html: `<div class="risk-marker-pulse" style="background:${col};box-shadow:0 0 8px ${col}88;width:10px;height:10px;border-radius:50%;"></div>`,
      iconSize:   [10, 10],
      iconAnchor: [5, 5],
    });

    const marker = L.marker([alert.geo.lat, alert.geo.lng], { icon }).addTo(window.riskMap);

    const sl = SEV_LABEL[alert.severity] || 'Monitor';
    marker.bindPopup(`
      <div class="lf-popup">
        <div class="lf-popup-country">${alert.geo.place}</div>
        <div class="lf-popup-risk" style="background:rgba(232,58,58,0.12);color:${col};border:1px solid ${col}44;">
          <span style="width:6px;height:6px;border-radius:50%;background:${col};display:inline-block;margin-right:5px;"></span>${sl}
        </div>
        <div class="lf-popup-field" style="margin:8px 0 6px;">
          <div class="lf-popup-label">Live Alert</div>
          <div class="lf-popup-value">${truncate(alert.title, 140)}</div>
        </div>
        <div class="lf-popup-grid">
          <div class="lf-popup-field">
            <div class="lf-popup-label">Source</div>
            <div class="lf-popup-value">${alert.source}</div>
          </div>
          <div class="lf-popup-field">
            <div class="lf-popup-label">Time</div>
            <div class="lf-popup-value">${alert.relativeTime} ago</div>
          </div>
        </div>
      </div>`, { maxWidth: 280, minWidth: 260, closeButton: true });

    marker.on('click', () => {
      window.riskMap.closePopup();
      marker.openPopup();
    });

    _liveAlertMarkers.push(marker);
  });
}

// Show inline loading skeleton inside the feed
function showFeedLoading() {
  const feed = document.getElementById('alertFeed');
  if (!feed) return;
  feed.innerHTML = `
    <div class="feed-item">
      <div class="feed-item-top">
        <span class="feed-sev-tag sev-low" style="opacity:0.5;">Syncing</span>
        <span class="feed-time">—</span>
      </div>
      <div class="feed-location" style="opacity:0.4;">Fetching live intelligence…</div>
      <div class="feed-desc" style="opacity:0.3;">Signal stream connecting</div>
    </div>
    <div class="feed-item" style="opacity:0.25;">
      <div class="feed-item-top"><span class="feed-sev-tag sev-low">—</span></div>
      <div class="feed-desc">—</div>
    </div>
    <div class="feed-item" style="opacity:0.12;">
      <div class="feed-item-top"><span class="feed-sev-tag sev-low">—</span></div>
      <div class="feed-desc">—</div>
    </div>`;
}

// Show graceful error state inside the feed
function showFeedError() {
  const feed = document.getElementById('alertFeed');
  if (!feed) return;
  feed.innerHTML = `
    <div class="feed-item">
      <div class="feed-item-top">
        <span class="feed-sev-tag sev-medium">Offline</span>
        <span class="feed-time">—</span>
      </div>
      <div class="feed-location">SIGNAL FEED</div>
      <div class="feed-desc" style="color:var(--risk-medium);">Feed temporarily unavailable — reconnecting automatically.</div>
    </div>`;
}

// Primary fetch-and-render cycle
async function fetchAndRenderAlerts() {
  showFeedLoading();
  try {
    const res = await fetch('/api/risk-alerts');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!data.alerts || !data.alerts.length) {
      showFeedError();
      return;
    }

    renderFeaturedAlert(data.alerts[0]);
    renderStackCards(data.alerts);
    renderAlertFeed(data.alerts);
    updateTelemetry(data);
    placeLiveMapMarkers(data.alerts);
  } catch (err) {
    console.warn('[Securide24] Alert feed error:', err.message);
    showFeedError();
  }
}

// Initialise live alerts and schedule auto-refresh every 15 minutes
function initLiveAlerts() {
  fetchAndRenderAlerts();
  setInterval(fetchAndRenderAlerts, 15 * 60 * 1000);
}

function resetModalState() {
  const form = document.getElementById('consultForm');
  const formBody = document.getElementById('modalFormBody');
  const success = document.getElementById('formSuccess');
  const submitButton = document.getElementById('formSubmitBtn');

  if (form) {
    form.reset();
  }

  if (formBody) {
    formBody.style.display = 'block';
  }

  if (success) {
    success.classList.remove('show');
  }

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Confidential Enquiry';
  }
}

function openModal() {
  const modal = document.getElementById('consultModal');
  if (!modal) {
    return;
  }

  resetModalState();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('consultModal');
  if (!modal) {
    return;
  }

  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function showSuccess() {
  const formBody = document.getElementById('modalFormBody');
  const success = document.getElementById('formSuccess');

  if (formBody) {
    formBody.style.display = 'none';
  }

  if (success) {
    success.classList.add('show');
  }
}

function setFilter(button, category) {
  _currentAlertFilter = category;
  document.querySelectorAll('.risk-filter-btn').forEach((filterButton) => {
    filterButton.classList.remove('active');
  });
  button.classList.add('active');

  const feedItems = document.querySelectorAll('.feed-item');
  feedItems.forEach((feedItem) => {
    const categories = (feedItem.dataset.category || '').split(' ').filter(Boolean);
    const shouldShow = category === 'all' || categories.includes(category);
    feedItem.style.display = shouldShow ? '' : 'none';
  });
}

function updateTime() {
  const now = new Date();
  const timeText = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join(':');

  const timeNodes = document.querySelectorAll('#refreshTime, .js-live-time');
  if (!timeNodes.length) {
    return;
  }

  timeNodes.forEach((timeNode) => {
    timeNode.textContent = timeText;
  });
}

function initAnimations() {
  const animatedNodes = document.querySelectorAll('.fade-up');
  if (!animatedNodes.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  animatedNodes.forEach((node) => observer.observe(node));
}

function initFeedInteractions() {
  const feedInner = document.getElementById('alertFeed');
  if (!feedInner || !feedInner.parentElement) {
    return;
  }

  feedInner.parentElement.addEventListener('mouseenter', () => {
    feedInner.style.animationPlayState = 'paused';
  });

  feedInner.parentElement.addEventListener('mouseleave', () => {
    feedInner.style.animationPlayState = 'running';
  });

  feedInner.addEventListener('click', () => {
    const isPaused = feedInner.style.animationPlayState === 'paused';
    feedInner.style.animationPlayState = isPaused ? 'running' : 'paused';
  });
}

function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  if (!slider) {
    return;
  }

  const slides = Array.from(slider.querySelectorAll('[data-hero-slide]'));
  const dots = Array.from(slider.querySelectorAll('[data-hero-dot]'));
  const progressBar = document.getElementById('heroSliderProgress');
  const prevButton = slider.querySelector('[data-hero-prev]');
  const nextButton = slider.querySelector('[data-hero-next]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let autoplayHandle = null;

  const syncVideos = () => {
    slides.forEach((slide, index) => {
      const video = slide.querySelector('video');
      if (!video) {
        return;
      }

      if (index === activeIndex) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const renderActiveSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeIndex);
    });
    if (progressBar) {
      progressBar.style.transform = `translateX(${activeIndex * 100}%)`;
    }
    syncVideos();
  };

  const stopAutoplay = () => {
    if (autoplayHandle) {
      window.clearInterval(autoplayHandle);
      autoplayHandle = null;
    }
  };

  const startAutoplay = () => {
    if (prefersReducedMotion) {
      return;
    }

    stopAutoplay();
    autoplayHandle = window.setInterval(() => {
      renderActiveSlide(activeIndex + 1);
    }, 5200);
  };

  prevButton?.addEventListener('click', () => {
    renderActiveSlide(activeIndex - 1);
    startAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    renderActiveSlide(activeIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      renderActiveSlide(Number(dot.dataset.heroDot));
      startAutoplay();
    });
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  renderActiveSlide(0);
  startAutoplay();
}

function initPlatformModules() {
  const buttons = Array.from(document.querySelectorAll('.platform-module'));
  const label = document.getElementById('platformFeatureLabel');
  const title = document.getElementById('platformFeatureTitle');
  const text = document.getElementById('platformFeatureText');
  const list = document.getElementById('platformFeatureList');

  if (!buttons.length || !label || !title || !text || !list) {
    return;
  }

  const renderFeature = (featureKey) => {
    const feature = PLATFORM_FEATURES[featureKey];
    if (!feature) {
      return;
    }

    buttons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.module === featureKey);
    });

    label.textContent = feature.label;
    title.textContent = feature.title;
    text.textContent = feature.text;
    list.innerHTML = feature.items.map((item) => `<div class="intel-signal">${item}</div>`).join('');
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => renderFeature(button.dataset.module));
  });

  renderFeature('briefings');
}

function initReachInterface() {
  const buttons = Array.from(document.querySelectorAll('.reach-tab'));
  const nodes = Array.from(document.querySelectorAll('[data-region-node]'));
  const topline = document.getElementById('reachTopline');
  const title = document.getElementById('reachTitle');
  const body = document.getElementById('reachBody');
  const note = document.getElementById('reachNote');
  const list = document.getElementById('reachList');
  const statOne = document.getElementById('reachStatOne');
  const statTwo = document.getElementById('reachStatTwo');
  const statThree = document.getElementById('reachStatThree');

  if (!buttons.length || !topline || !title || !body || !note || !list || !statOne || !statTwo || !statThree) {
    return;
  }

  const renderRegion = (regionKey) => {
    const region = REACH_REGIONS[regionKey];
    if (!region) {
      return;
    }

    buttons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.region === regionKey);
    });
    nodes.forEach((node) => {
      node.classList.toggle('is-active', node.dataset.regionNode === regionKey);
    });

    topline.textContent = region.topline;
    title.textContent = region.title;
    body.textContent = region.body;
    note.textContent = region.note;
    list.innerHTML = region.list.map((item) => `<li>${item}</li>`).join('');
    [statOne.textContent, statTwo.textContent, statThree.textContent] = region.stats;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => renderRegion(button.dataset.region));
  });

  renderRegion('pak-af');
}

function initNavigationMenus() {
  const navRoot = document.querySelector('[data-nav-root]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navPanel = document.querySelector('[data-nav-panel]');
  const navItems = Array.from(document.querySelectorAll('[data-nav-item]'));
  const navTriggers = Array.from(document.querySelectorAll('[data-nav-trigger]'));

  if (!navRoot || !navToggle || !navPanel || !navItems.length) {
    return;
  }

  const mobileQuery = window.matchMedia('(max-width: 820px)');

  const closeAllDropdowns = () => {
    navItems.forEach((navItem) => {
      navItem.classList.remove('is-open');
      const trigger = navItem.querySelector('[data-nav-trigger]');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const closeNavPanel = () => {
    navRoot.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    closeAllDropdowns();
  };

  navToggle.addEventListener('click', () => {
    const nextState = !navRoot.classList.contains('is-open');
    navRoot.classList.toggle('is-open', nextState);
    navToggle.setAttribute('aria-expanded', String(nextState));
    if (!nextState) {
      closeAllDropdowns();
    }
  });

  navTriggers.forEach((navTrigger) => {
    navTrigger.addEventListener('click', () => {
      if (!mobileQuery.matches) {
        return;
      }

      const parentItem = navTrigger.closest('[data-nav-item]');
      if (!parentItem) {
        return;
      }

      const nextState = !parentItem.classList.contains('is-open');
      closeAllDropdowns();
      parentItem.classList.toggle('is-open', nextState);
      navTrigger.setAttribute('aria-expanded', String(nextState));
    });
  });

  navPanel.querySelectorAll('a').forEach((navLink) => {
    navLink.addEventListener('click', () => {
      if (mobileQuery.matches) {
        closeNavPanel();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!navRoot.contains(event.target)) {
      closeAllDropdowns();
      if (mobileQuery.matches) {
        navRoot.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  window.addEventListener('resize', () => {
    if (!mobileQuery.matches) {
      navRoot.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
  });
}

function initModalInteractions() {
  const overlay = document.getElementById('consultModal');
  if (!overlay) {
    return;
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

function initFormSubmission() {
  const form = document.getElementById('consultForm');
  if (!form) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = document.getElementById('formSubmitBtn');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting…';
    }

    const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        showSuccess();
        return;
      }

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      showSuccess();
    } catch (error) {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Confidential Enquiry';
      }
      alert('There was a problem submitting your enquiry. Please email advisory@securide24.com directly.');
    }
  });
}

function initNavScrollEffect() {
  const nav = document.querySelector('nav');
  if (!nav) {
    return;
  }

  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40 ? 'rgba(5,13,26,0.98)' : 'rgba(5,13,26,0.92)';
  });
}

function initClock() {
  updateTime();
  window.setInterval(updateTime, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initLeafletMap();
  initAnimations();
  initFeedInteractions();
  initHeroSlider();
  initPlatformModules();
  initReachInterface();
  initNavigationMenus();
  initModalInteractions();
  initFormSubmission();
  initNavScrollEffect();
  initClock();
  initLiveAlerts();
});

window.openModal = openModal;
window.closeModal = closeModal;
window.setFilter = setFilter;
