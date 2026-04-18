'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Geo lookup table — city/country name → lat/lng for map marker placement
// ---------------------------------------------------------------------------
const CITY_GEO = {
  islamabad:      { lat: 33.72, lng: 73.06 },
  lahore:         { lat: 31.55, lng: 74.34 },
  karachi:        { lat: 24.86, lng: 67.01 },
  rawalpindi:     { lat: 33.60, lng: 73.04 },
  peshawar:       { lat: 34.01, lng: 71.57 },
  quetta:         { lat: 30.18, lng: 66.99 },
  pakistan:       { lat: 30.38, lng: 69.35 },
  kabul:          { lat: 34.53, lng: 69.17 },
  afghanistan:    { lat: 33.93, lng: 67.71 },
  dubai:          { lat: 25.20, lng: 55.27 },
  'abu dhabi':    { lat: 24.47, lng: 54.37 },
  uae:            { lat: 23.42, lng: 53.85 },
  riyadh:         { lat: 24.69, lng: 46.72 },
  jeddah:         { lat: 21.49, lng: 39.18 },
  'saudi arabia': { lat: 23.89, lng: 45.08 },
  iran:           { lat: 32.43, lng: 53.69 },
  tehran:         { lat: 35.69, lng: 51.39 },
  baghdad:        { lat: 33.34, lng: 44.40 },
  iraq:           { lat: 33.22, lng: 43.68 },
  doha:           { lat: 25.29, lng: 51.53 },
  qatar:          { lat: 25.35, lng: 51.18 },
  london:         { lat: 51.51, lng: -0.12 },
  ukraine:        { lat: 48.38, lng: 31.17 },
  kyiv:           { lat: 50.45, lng: 30.52 },
  moscow:         { lat: 55.75, lng: 37.62 },
  russia:         { lat: 61.52, lng: 105.32 },
  nairobi:        { lat: -1.29, lng: 36.82 },
  kenya:          { lat: -0.02, lng: 37.91 },
  istanbul:       { lat: 41.01, lng: 28.96 },
  ankara:         { lat: 39.93, lng: 32.86 },
  turkey:         { lat: 38.96, lng: 35.24 },
  mumbai:         { lat: 19.08, lng: 72.88 },
  delhi:          { lat: 28.61, lng: 77.21 },
  india:          { lat: 20.59, lng: 78.96 },
  myanmar:        { lat: 21.91, lng: 95.96 },
  yangon:         { lat: 16.87, lng: 96.19 },
  mogadishu:      { lat: 2.05,  lng: 45.34 },
  somalia:        { lat: 5.15,  lng: 46.20 },
  tripoli:        { lat: 32.90, lng: 13.18 },
  libya:          { lat: 26.34, lng: 17.23 },
  khartoum:       { lat: 15.55, lng: 32.53 },
  sudan:          { lat: 12.86, lng: 30.22 },
  nigeria:        { lat: 9.08,  lng: 8.68  },
  abuja:          { lat: 9.07,  lng: 7.40  },
  cairo:          { lat: 30.04, lng: 31.24 },
  egypt:          { lat: 26.82, lng: 30.80 },
  addis:          { lat: 9.03,  lng: 38.74 },
  ethiopia:       { lat: 9.14,  lng: 40.49 },
};

// Country name → 2-letter display code (used in alert location labels)
const COUNTRY_CODES = {
  pakistan: 'PK', afghanistan: 'AF', iran: 'IR', iraq: 'IQ',
  uae: 'AE', dubai: 'AE', 'abu dhabi': 'AE',
  'saudi arabia': 'SA', riyadh: 'SA', jeddah: 'SA',
  qatar: 'QA', doha: 'QA',
  ukraine: 'UA', russia: 'RU',
  kenya: 'KE', nairobi: 'KE',
  turkey: 'TR', istanbul: 'TR', ankara: 'TR',
  india: 'IN', mumbai: 'IN', delhi: 'IN',
  myanmar: 'MM', yangon: 'MM',
  somalia: 'SO', mogadishu: 'SO',
  libya: 'LY', tripoli: 'LY',
  sudan: 'SD', khartoum: 'SD',
  nigeria: 'NG', abuja: 'NG',
  egypt: 'EG', cairo: 'EG',
  ethiopia: 'ET',
  'united kingdom': 'UK', london: 'UK',
  'united states': 'US',
  israel: 'IL', 'tel aviv': 'IL', jerusalem: 'IL',
};

// ---------------------------------------------------------------------------
// Severity classification
// ---------------------------------------------------------------------------
const CRITICAL_TERMS = [
  'attack', 'terrorism', 'terrorist', 'explosion', 'blast', 'bomb',
  'missile', 'hostage', 'shooting', 'killed', 'assassin', 'gunfire',
  'airstrike', 'massacre', 'suicide bomb',
];
const HIGH_TERMS = [
  'protest', 'unrest', 'riot', 'airport closure', 'border closed',
  'checkpoint', 'military activity', 'evacuation', 'kidnapping',
  'arrested', 'crackdown', 'military operation', 'armed', 'detained',
  'curfew', 'blockade', 'siege',
];
const MEDIUM_TERMS = [
  'flood', 'earthquake', 'storm', 'fire', 'power outage', 'disruption',
  'closure', 'warning', 'seismic', 'cyclone', 'hurricane', 'landslide',
  'wildfire', 'drought',
];

function scoreSeverity(text) {
  const lower = text.toLowerCase();
  if (CRITICAL_TERMS.some((t) => lower.includes(t))) return 'critical';
  if (HIGH_TERMS.some((t) => lower.includes(t))) return 'high';
  if (MEDIUM_TERMS.some((t) => lower.includes(t))) return 'medium';
  return 'monitor';
}

// ---------------------------------------------------------------------------
// Alert tagging
// ---------------------------------------------------------------------------
const TAG_RULES = [
  { tag: 'Civil Unrest',       pattern: /protest|unrest|riot|demonstration|civil disorder|strike|march|rally/ },
  { tag: 'Travel Impact',      pattern: /airport|flight|border|checkpoint|travel|route|road|highway|transit|closure|disruption/ },
  { tag: 'Security Incident',  pattern: /attack|blast|explosion|shooting|terrorism|terrorist|security incident|military operation|gunfire/ },
  { tag: 'Environmental',      pattern: /flood|earthquake|storm|fire|seismic|cyclone|hurricane|natural disaster|landslide|wildfire/ },
];

function tagArticle(text) {
  const lower = text.toLowerCase();
  const tags = TAG_RULES.filter((r) => r.pattern.test(lower)).map((r) => r.tag);
  return tags.length ? tags : ['General Alert'];
}

// ---------------------------------------------------------------------------
// Geo & country detection from article text
// ---------------------------------------------------------------------------
function detectGeo(text) {
  const lower = text.toLowerCase();
  for (const [place, coords] of Object.entries(CITY_GEO)) {
    if (lower.includes(place)) {
      const label = place.split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
      return { place: label, lat: coords.lat, lng: coords.lng };
    }
  }
  return null;
}

function detectCountryCode(text) {
  const lower = text.toLowerCase();
  for (const [name, code] of Object.entries(COUNTRY_CODES)) {
    if (lower.includes(name)) return code;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Relative time formatting
// ---------------------------------------------------------------------------
function formatRelativeTime(pubDateStr) {
  if (!pubDateStr) return '—';
  try {
    // NewsData.io returns "YYYY-MM-DD HH:MM:SS" in UTC
    const normalized = pubDateStr.replace(' ', 'T') + 'Z';
    const pub = new Date(normalized);
    if (Number.isNaN(pub.getTime())) return '—';
    const diffMs = Date.now() - pub.getTime();
    const diffMins = Math.max(0, Math.floor(diffMs / 60000));
    if (diffMins < 60) return `${diffMins}m`;
    const h = Math.floor(diffMins / 60);
    const m = diffMins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  } catch {
    return '—';
  }
}

// ---------------------------------------------------------------------------
// Normalise raw NewsData.io articles into clean alert objects
// ---------------------------------------------------------------------------
function normalizeAlerts(articles) {
  const seen = new Set();
  const alerts = [];

  for (const article of articles) {
    if (!article.title) continue;

    // Deduplicate by title prefix
    const key = article.title.toLowerCase().replace(/\s+/g, ' ').slice(0, 70);
    if (seen.has(key)) continue;
    seen.add(key);

    const fullText = `${article.title} ${article.description || ''}`;
    const severity   = scoreSeverity(fullText);
    const tags       = tagArticle(fullText);
    const geo        = detectGeo(fullText);
    const countryCode = detectCountryCode(fullText);

    // Build concise, intelligence-style summary (cap at 200 chars)
    const rawSummary = article.description || article.title;
    const summary = rawSummary.length > 200
      ? rawSummary.slice(0, 197) + '…'
      : rawSummary;

    alerts.push({
      id:           article.article_id || article.link || key,
      title:        article.title,
      summary,
      source:       article.source_name || article.source_id || 'Unknown',
      url:          article.link || null,
      publishedAt:  article.pubDate || null,
      relativeTime: formatRelativeTime(article.pubDate),
      severity,
      tags,
      geo,
      countryCode,
    });
  }

  // Sort by severity: critical → high → medium → monitor
  const ORDER = { critical: 0, high: 1, medium: 2, monitor: 3 };
  alerts.sort((a, b) => ORDER[a.severity] - ORDER[b.severity]);

  return alerts;
}

// ---------------------------------------------------------------------------
// Server-side cache — 15 minutes to stay within the free API quota
// ---------------------------------------------------------------------------
const CACHE_TTL_MS = 15 * 60 * 1000;
let alertCache = { payload: null, storedAt: 0 };

// ---------------------------------------------------------------------------
// API route — /api/risk-alerts
// ---------------------------------------------------------------------------
app.get('/api/risk-alerts', async (req, res) => {
  // Serve from cache when fresh
  if (alertCache.payload && Date.now() - alertCache.storedAt < CACHE_TTL_MS) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(alertCache.payload);
  }

  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'NEWSDATA_API_KEY environment variable is not set.' });
  }

  // Focused query: geo-priority regions AND security/disruption keywords
  const query = [
    '(Pakistan OR Afghanistan OR Iraq OR Iran OR UAE OR "Saudi Arabia" OR Doha OR Kabul OR Islamabad OR Lahore OR Karachi)',
    'AND',
    '(protest OR attack OR explosion OR terrorism OR unrest OR riot OR flood OR earthquake OR checkpoint OR border OR military OR evacuation OR kidnapping OR "road closure" OR "airport" OR "security warning")',
  ].join(' ');

  const url = new URL('https://newsdata.io/api/1/latest');
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set('q', query);
  url.searchParams.set('language', 'en');

  try {
    const upstream = await fetch(url.toString());

    if (!upstream.ok) {
      const body = await upstream.text();
      console.error('NewsData.io error:', upstream.status, body.slice(0, 200));
      return res.status(502).json({ error: 'Upstream API error', status: upstream.status });
    }

    const data = await upstream.json();

    if (data.status !== 'success') {
      console.error('NewsData.io non-success:', JSON.stringify(data).slice(0, 200));
      return res.status(502).json({ error: 'Upstream returned non-success', detail: data });
    }

    const alerts = normalizeAlerts(data.results || []);
    const payload = {
      alerts,
      fetchedAt:   new Date().toISOString(),
      totalCount:  alerts.length,
      nextPage:    data.nextPage || null,
    };

    alertCache = { payload, storedAt: Date.now() };
    res.setHeader('X-Cache', 'MISS');
    return res.json(payload);
  } catch (err) {
    console.error('risk-alerts fetch error:', err.message);
    return res.status(502).json({ error: 'Failed to fetch alerts', detail: err.message });
  }
});

// ---------------------------------------------------------------------------
// Multi-page HTML routing (mirrors the old render.yaml rewrite rules)
// ---------------------------------------------------------------------------
const PAGES = ['about', 'contact', 'insights', 'platform', 'services'];

PAGES.forEach((page) => {
  app.get(`/${page}`, (_req, res) =>
    res.sendFile(path.join(__dirname, page, 'index.html'))
  );
  app.get(`/${page}/:file`, (req, res) => {
    const filePath = path.join(__dirname, page, req.params.file);
    res.sendFile(filePath, (err) => {
      if (err) res.sendFile(path.join(__dirname, page, 'index.html'));
    });
  });
});

// Serve static assets (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Catch-all — serve the homepage for any unknown route
app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Securide24 server running on port ${PORT}`);
});
