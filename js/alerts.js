// alerts.js - rotates active intelligence alert card in sync with border cycle

const svgToDataUrl = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
const ALERTS_SIGNALS_ROTATION_MS = 4000;
const ALERTS_SIGNALS_TICK_EVENT = 'alerts-signals-tick';

const Alerts = {
  flagSVGs: {
    se: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#006aa7"/><rect x="5" width="2" height="10" fill="#fecc00"/><rect y="4" width="16" height="2" fill="#fecc00"/></svg>'),
    nz: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#012169"/><g fill="#c8102e"><circle cx="11.5" cy="2.5" r="0.75"/><circle cx="13.2" cy="4.2" r="0.75"/><circle cx="10.8" cy="6" r="0.75"/><circle cx="12.8" cy="7.6" r="0.75"/></g></svg>'),
    cl: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#d52b1e"/><rect width="16" height="5" fill="#fff"/><rect width="5" height="5" fill="#0039a6"/><polygon points="2.5,1 2.85,2.05 3.95,2.05 3.05,2.7 3.4,3.8 2.5,3.15 1.6,3.8 1.95,2.7 1.05,2.05 2.15,2.05" fill="#fff"/></svg>'),
    gb: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#012169"/><path d="M0 0l16 10M16 0L0 10" stroke="#fff" stroke-width="2"/><path d="M0 0l16 10M16 0L0 10" stroke="#c8102e" stroke-width="1"/><path d="M8 0v10M0 5h16" stroke="#fff" stroke-width="3"/><path d="M8 0v10M0 5h16" stroke="#c8102e" stroke-width="1.8"/></svg>'),
    tr: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#e30a17"/><circle cx="6" cy="5" r="2.2" fill="#fff"/><circle cx="6.7" cy="5" r="1.75" fill="#e30a17"/><polygon points="8.7,5 10.9,4.25 9.55,6.05 9.55,3.95 10.9,5.75" fill="#fff"/></svg>'),
    ps: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#007a3d"/><rect width="16" height="6.66" fill="#fff"/><rect width="16" height="3.33" fill="#000"/><polygon points="0,0 6,5 0,10" fill="#ce1126"/></svg>'),
    ua: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="5" fill="#0057b7"/><rect y="5" width="16" height="5" fill="#ffd700"/></svg>'),
    sy: svgToDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="3.33" fill="#ce1126"/><rect y="3.33" width="16" height="3.34" fill="#fff"/><rect y="6.67" width="16" height="3.33" fill="#000"/><polygon points="6,4.2 6.25,4.95 7.05,4.95 6.4,5.4 6.65,6.15 6,5.7 5.35,6.15 5.6,5.4 4.95,4.95 5.75,4.95" fill="#007a3d"/><polygon points="10,4.2 10.25,4.95 11.05,4.95 10.4,5.4 10.65,6.15 10,5.7 9.35,6.15 9.6,5.4 8.95,4.95 9.75,4.95" fill="#007a3d"/></svg>')
  },

  init() {
    this.section = Utils.qs('.intelligence-alerts-section');
    this.card = this.section ? this.section.querySelector('.alert-card') : null;
    if (!this.card) return;

    this.flagIcon = this.card.querySelector('.flag-corner');
    this.locationText = this.card.querySelector('.location-text');
    this.alertLabel = this.card.querySelector('.alert-label');
    this.alertBadge = this.card.querySelector('.alert-badge');
    this.alertMessage = this.card.querySelector('.alert-message');
    this.alertTimestamp = this.card.querySelector('.alert-timestamp');
    this.alertCta = this.card.querySelector('.alert-cta');

    if (!this.flagIcon || !this.locationText || !this.alertLabel || !this.alertBadge || !this.alertMessage || !this.alertTimestamp || !this.alertCta) {
      return;
    }

    const alertsRaw = [
      {
        flag: '🇸🇪',
        countryCode: 'se',
        location: 'Stockholm, Sweden',
        type: 'Travel Advisory',
        severity: 'Low',
        severityClass: 'alert-badge-low',
        cardClass: 'alert-low',
        message: 'Minor infrastructure updates. Normal precautions sufficient. No immediate travel concerns.',
        updated: 'Updated: 45 mins ago',
        href: 'pages/intelligence/active-alerts.html#continent-europe'
      },
      {
        flag: '🇳🇿',
        countryCode: 'nz',
        location: 'Auckland, New Zealand',
        type: 'Travel Notice',
        severity: 'Low',
        severityClass: 'alert-badge-low',
        cardClass: 'alert-low',
        message: 'Routine maintenance on select transport routes. Minimal disruption expected with standard scheduling.',
        updated: 'Updated: 1 hour ago',
        href: 'pages/intelligence/active-alerts.html#continent-oceania'
      },
      {
        flag: '🇨🇱',
        countryCode: 'cl',
        location: 'Santiago, Chile',
        type: 'Civil Unrest',
        severity: 'Moderate',
        severityClass: 'alert-badge-moderate',
        cardClass: 'alert-moderate',
        message: 'Protests and demonstrations ongoing. Public transport disruptions reported in multiple areas.',
        updated: 'Updated: 20 mins ago',
        href: 'pages/intelligence/active-alerts.html#continent-south-america'
      },
      {
        flag: '🇬🇧',
        countryCode: 'gb',
        location: 'London, United Kingdom',
        type: 'Traffic Advisory',
        severity: 'Moderate',
        severityClass: 'alert-badge-moderate',
        cardClass: 'alert-moderate',
        message: 'Planned road closures in central London may impact executive transfers and airport routes.',
        updated: 'Updated: 35 mins ago',
        href: 'pages/intelligence/active-alerts.html#continent-europe'
      },
      {
        flag: '🇹🇷',
        countryCode: 'tr',
        location: 'Istanbul, Turkey',
        type: 'Political Instability',
        severity: 'High',
        severityClass: 'alert-badge-high',
        cardClass: 'alert-high',
        message: 'Heightened political tensions and security alerts in central districts. Exercise heightened caution.',
        updated: 'Updated: 12 mins ago',
        href: 'pages/intelligence/active-alerts.html#continent-asia'
      },
      {
        flag: '🇵🇸',
        countryCode: 'ps',
        location: 'Gaza Strip',
        type: 'Regional Conflict',
        severity: 'High',
        severityClass: 'alert-badge-high',
        cardClass: 'alert-high',
        message: 'Ongoing security developments. Avoid the area. Immediate threat level elevated with restricted movement.',
        updated: 'Updated: 8 mins ago',
        href: 'pages/intelligence/active-alerts.html#continent-asia'
      },
      {
        flag: '🇺🇦',
        countryCode: 'ua',
        location: 'Kyiv, Ukraine',
        type: 'Military Alert',
        severity: 'Critical',
        severityClass: 'alert-badge-critical',
        cardClass: 'alert-critical',
        message: 'Critical security alert. Active military operations ongoing. Complete avoidance required. All movements suspended.',
        updated: 'Updated: 5 mins ago',
        href: 'pages/intelligence/active-alerts.html#continent-europe'
      },
      {
        flag: '🇸🇾',
        countryCode: 'sy',
        location: 'Damascus, Syria',
        type: 'Crisis Alert',
        severity: 'Critical',
        severityClass: 'alert-badge-critical',
        cardClass: 'alert-critical',
        message: 'Severe instability and armed conflict zones. Extreme risk. Category 1 travel constraints enforced immediately.',
        updated: 'Updated: 3 mins ago',
        href: 'pages/intelligence/active-alerts.html#continent-asia'
      }
    ];

    // Shuffle order: Low → Low → Critical → Critical → Moderate → Moderate → High → High
    this.items = [
      alertsRaw[0], alertsRaw[1], // Low, Low (Stockholm, Auckland)
      alertsRaw[6], alertsRaw[7], // Critical, Critical (Kyiv, Damascus)
      alertsRaw[2], alertsRaw[3], // Moderate, Moderate (Santiago, London)
      alertsRaw[4], alertsRaw[5]  // High, High (Istanbul, Gaza)
    ];

    this.currentIndex = 0;
    this.cycleMs = this.getCycleDurationMs();

    this.render(this.currentIndex);
    this.startRotation();
  },

  getCycleDurationMs() {
    return ALERTS_SIGNALS_ROTATION_MS;
  },

  startRotation() {
    this.stopRotation();
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.render(this.currentIndex);
      window.dispatchEvent(new CustomEvent(ALERTS_SIGNALS_TICK_EVENT, { detail: { alertIndex: this.currentIndex } }));
    }, this.cycleMs);
  },

  stopRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

  render(index) {
    const item = this.items[index];
    if (!item) return;

    // Update flag with embedded SVG data URL
    const flagSrc = this.flagSVGs[item.countryCode] || this.flagSVGs['tr'];
    this.flagIcon.src = flagSrc;
    this.flagIcon.alt = item.location;
    
    this.locationText.textContent = item.location;
    this.alertLabel.textContent = item.type;
    this.alertBadge.textContent = item.severity;
    this.alertBadge.classList.remove('alert-badge-moderate', 'alert-badge-elevated', 'alert-badge-high', 'alert-badge-low', 'alert-badge-critical');
    this.alertBadge.classList.add(item.severityClass);
    this.alertMessage.textContent = item.message;
    this.alertTimestamp.textContent = item.updated;
    this.alertCta.setAttribute('href', item.href);
    
    // Update card electric border color
    this.card.classList.remove('alert-high', 'alert-moderate', 'alert-low', 'alert-critical');
    this.card.classList.add(item.cardClass);
  }
};

// ─── Executive Signals – rotating card for senior decision-makers ─────────────

const Signals = {
  items: [
    {
      type: 'Geopolitical',
      typeClass: 'signal-geopolitical',
      classification: 'RESTRICTED',
      subject: 'Central Asia Corridor: Elevated Executive Transit Risk',
      summary: 'Intelligence assessments indicate increased military posturing along key transit corridors. Executive movement through Tier 2 zones requires enhanced security protocols and updated contingency routing.',
      assessment: 'Elevated',
      assessmentClass: 'signal-assessment--elevated',
      updated: 'Updated: 8 mins ago',
      href: 'pages/intelligence/index.html'
    },
    {
      type: 'Strategic',
      typeClass: 'signal-strategic',
      classification: 'CONFIDENTIAL',
      subject: 'Middle East Diplomatic Tension: Board-Level Exposure Assessment',
      summary: 'Escalating diplomatic friction between Gulf states introduces reputational and operational exposure for senior executives with regional assets. Board-level briefing recommended prior to Q2 engagements.',
      assessment: 'Advisory',
      assessmentClass: 'signal-assessment--advisory',
      updated: 'Updated: 22 mins ago',
      href: 'pages/intelligence/index.html'
    },
    {
      type: 'Operational',
      typeClass: 'signal-operational',
      classification: 'INTERNAL',
      subject: 'South Asia Supply Chain: Critical Node Disruption Risk',
      summary: 'Port congestion and labour action at key logistics nodes in South Asia are creating cascading delays. Executives with operational dependencies in the region should initiate contingency supply reviews.',
      assessment: 'Moderate',
      assessmentClass: 'signal-assessment--moderate',
      updated: 'Updated: 41 mins ago',
      href: 'pages/intelligence/index.html'
    },
    {
      type: 'Economic',
      typeClass: 'signal-economic',
      classification: 'INTERNAL',
      subject: 'Currency Volatility: Emerging Market Exposure for Q2 Travel Budgets',
      summary: 'Rapid currency depreciation across three emerging markets is inflating executive travel and security contract costs by an estimated 18–24%. Finance and security teams should review budget exposure immediately.',
      assessment: 'Standard',
      assessmentClass: 'signal-assessment--standard',
      updated: 'Updated: 1 hr ago',
      href: 'pages/intelligence/index.html'
    },
    {
      type: 'Crisis',
      typeClass: 'signal-crisis',
      classification: 'RESTRICTED',
      subject: 'Energy Sector Targeting: Infrastructure Threat Intelligence',
      summary: 'Credible intelligence indicates coordinated threat actor interest in energy infrastructure executives across three jurisdictions. Personal digital hygiene protocols and travel security posture should be reviewed immediately.',
      assessment: 'Critical',
      assessmentClass: 'signal-assessment--critical',
      updated: 'Updated: 6 mins ago',
      href: 'pages/intelligence/index.html'
    },
    {
      type: 'Advisory',
      typeClass: 'signal-advisory',
      classification: 'CONFIDENTIAL',
      subject: 'Executive Profile Exposure: Open-Source Intelligence Risk',
      summary: 'Recent OSINT analysis of C-suite public profiles identifies exploitable patterns in travel routines, public schedule disclosures, and digital footprint. Immediate profile hardening advised for high-value principals.',
      assessment: 'Elevated',
      assessmentClass: 'signal-assessment--elevated',
      updated: 'Updated: 15 mins ago',
      href: 'pages/intelligence/index.html'
    },
    {
      type: 'Geopolitical',
      typeClass: 'signal-geopolitical',
      classification: 'RESTRICTED',
      subject: 'Eastern Europe Corridor: Sanctions Compliance & Movement Risk',
      summary: 'New sanctions designations and border checkpoint protocols across Eastern European corridors are affecting executive transit timelines. Legal and security teams should validate travel itineraries against updated compliance frameworks.',
      assessment: 'Informational',
      assessmentClass: 'signal-assessment--informational',
      updated: 'Updated: 33 mins ago',
      href: 'pages/intelligence/index.html'
    }
  ],

  getCycleDurationMs() {
    return ALERTS_SIGNALS_ROTATION_MS;
  },

  init() {
    const section = Utils.qs('.intelligence-alerts-section');
    this.card = section ? section.querySelector('#rotatingSignalCard') : null;
    if (!this.card) return;

    this.typeBadge        = this.card.querySelector('.signal-type-badge-text');
    this.classification   = this.card.querySelector('.signal-classification-text');
    this.subject          = this.card.querySelector('.signal-subject-text');
    this.summary          = this.card.querySelector('.signal-summary-text');
    this.assessmentBadge  = this.card.querySelector('.signal-assessment-text');
    this.timestamp        = this.card.querySelector('.signal-timestamp-text');
    this.cta              = this.card.querySelector('.signal-cta');

    if (!this.typeBadge || !this.subject || !this.summary) return;

    this.currentIndex = 0;
    this.render(0);
    this.onAlertsTick = () => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.render(this.currentIndex);
    };

    window.addEventListener(ALERTS_SIGNALS_TICK_EVENT, this.onAlertsTick);
  },

  render(index) {
    const item = this.items[index];
    if (!item) return;

    // Swap card-level class for accent colour
    this.card.classList.remove(
      'signal-geopolitical', 'signal-economic', 'signal-operational',
      'signal-strategic', 'signal-crisis', 'signal-advisory'
    );
    this.card.classList.add(item.typeClass);

    this.typeBadge.textContent = item.type;

    // Sync badge border/bg colour to current signal accent via inline style
    this.typeBadge.style.color = '';
    this.typeBadge.style.borderColor = '';
    this.typeBadge.style.backgroundColor = '';

    if (this.classification) this.classification.textContent = item.classification;
    if (this.timestamp)      this.timestamp.textContent      = item.updated;
    this.subject.textContent  = item.subject;
    this.summary.textContent  = item.summary;

    if (this.assessmentBadge) {
      this.assessmentBadge.textContent = item.assessment;
      this.assessmentBadge.className = 'signal-assessment-badge signal-assessment-text ' + item.assessmentClass;
    }

    if (this.cta) this.cta.setAttribute('href', item.href);
  }
};