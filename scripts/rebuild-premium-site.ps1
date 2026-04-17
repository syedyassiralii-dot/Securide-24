$ErrorActionPreference = 'Stop'

function Write-Utf8File {
    param(
        [string]$Path,
        [string]$Content
    )

    $directory = Split-Path -Parent $Path
    if ($directory -and -not (Test-Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

$baseCss = @'
:root {
  --bg: #07111d;
  --bg-soft: #0b1727;
  --panel: rgba(13, 25, 43, 0.82);
  --panel-strong: #102138;
  --panel-border: rgba(126, 174, 255, 0.18);
  --text: #edf4ff;
  --text-soft: #b9c7de;
  --text-muted: #86a0bf;
  --line: rgba(255, 255, 255, 0.08);
  --blue: #61d4ff;
  --cyan: #7ff7e4;
  --violet: #8f87ff;
  --magenta: #ff68c4;
  --success: #6ef2b3;
  --warning: #ffbf69;
  --danger: #ff6b7a;
  --shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.22);
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --container: 1240px;
  --space-1: 0.5rem;
  --space-2: 0.75rem;
  --space-3: 1rem;
  --space-4: 1.25rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 2.5rem;
  --space-8: 3rem;
  --space-9: 4rem;
  --space-10: 5rem;
  --transition: 180ms ease;
  --font: "Segoe UI", "Inter", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font);
  color: var(--text);
  background:
    radial-gradient(circle at top right, rgba(97, 212, 255, 0.12), transparent 0 32%),
    radial-gradient(circle at bottom left, rgba(143, 135, 255, 0.16), transparent 0 28%),
    linear-gradient(180deg, #06101a 0%, #091321 45%, #08111c 100%);
  line-height: 1.6;
  overflow-x: hidden;
}

body.menu-open {
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

h1,
h2,
h3,
h4,
p,
ul {
  margin: 0;
}

ul {
  padding: 0;
  list-style: none;
}

.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
  background: #fff;
  color: #000;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  z-index: 1000;
}

:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(127, 247, 228, 0.24);
  background: rgba(16, 33, 56, 0.72);
  color: var(--cyan);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.74rem;
  margin-bottom: 1rem;
}

.eyebrow::before {
  content: "";
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  box-shadow: 0 0 16px rgba(97, 212, 255, 0.5);
}

.section-heading {
  max-width: 760px;
  margin-bottom: var(--space-7);
}

.section-heading h2 {
  font-size: clamp(1.9rem, 2.4vw, 3rem);
  line-height: 1.15;
  margin-bottom: 0.9rem;
}

.section-heading p {
  color: var(--text-soft);
}

.text-gradient {
  background: linear-gradient(135deg, var(--text) 0%, var(--blue) 48%, var(--cyan) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 768px) {
  .section-heading {
    margin-bottom: var(--space-6);
  }
}
'@

$layoutCss = @'
.container {
  width: min(var(--container), calc(100% - 2rem));
  margin: 0 auto;
}

.section {
  padding: var(--space-9) 0;
}

.section-tight {
  padding: var(--space-7) 0;
}

.grid-2,
.grid-3,
.grid-4,
.card-grid {
  display: grid;
  gap: 1.2rem;
}

.grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-3,
.card-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.page-hero {
  position: relative;
  padding: 8.5rem 0 4rem;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}

.page-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(97, 212, 255, 0.08), transparent 40%),
    radial-gradient(circle at right top, rgba(143, 135, 255, 0.18), transparent 0 34%);
  pointer-events: none;
}

.page-hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 2rem;
  align-items: center;
}

.page-hero h1 {
  font-size: clamp(2.3rem, 4vw, 4rem);
  line-height: 1.05;
  margin-bottom: 1rem;
}

.page-hero p {
  color: var(--text-soft);
  max-width: 720px;
}

.page-hero-card {
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(12, 27, 46, 0.86), rgba(9, 20, 34, 0.92));
  border: 1px solid var(--panel-border);
  box-shadow: var(--shadow-soft);
}

.page-hero-card ul {
  display: grid;
  gap: 0.75rem;
}

.page-hero-card li {
  padding: 0.8rem 0.9rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-soft);
}

.stack {
  display: grid;
  gap: 1rem;
}

.dual-panel {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.2rem;
}

.region-slab {
  display: grid;
  gap: 0.75rem;
  padding: 1.1rem;
  border-radius: var(--radius-md);
  background: rgba(10, 21, 36, 0.86);
  border: 1px solid rgba(255,255,255,0.06);
}

.region-slab strong {
  font-size: 1.05rem;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;
}

.process-step {
  position: relative;
  padding: 1.1rem;
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(15, 29, 48, 0.86), rgba(9, 19, 31, 0.92));
  border: 1px solid var(--panel-border);
}

.process-step span {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 0.75rem;
  background: rgba(97, 212, 255, 0.14);
  color: var(--blue);
  font-weight: 700;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 1024px) {
  .grid-4,
  .metrics-grid,
  .process-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-3,
  .card-grid,
  .page-hero-inner,
  .dual-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .section {
    padding: 4.5rem 0;
  }

  .grid-2,
  .grid-3,
  .grid-4,
  .card-grid,
  .metrics-grid,
  .process-grid {
    grid-template-columns: 1fr;
  }

  .page-hero {
    padding-top: 7rem;
  }
}
'@

$componentsCss = @'
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.4rem;
}

.btn,
button.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.9rem 1.15rem;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform var(--transition), border-color var(--transition), background var(--transition);
}

.btn:hover,
button.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  color: #06101a;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  box-shadow: 0 10px 30px rgba(97, 212, 255, 0.22);
}

.btn-secondary {
  color: var(--text);
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.12);
}

.btn-link {
  padding: 0;
  color: var(--blue);
}

.surface-card,
.service-card,
.product-card,
.case-card,
.insight-card,
.alert-card,
.expert-card,
.stat-card,
.feature-list,
.faq-item,
.contact-card,
.value-card {
  position: relative;
  padding: 1.2rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(12, 26, 44, 0.9), rgba(8, 18, 30, 0.96));
  border: 1px solid var(--panel-border);
  box-shadow: var(--shadow-soft);
}

.service-card,
.product-card,
.case-card,
.insight-card,
.alert-card,
.expert-card {
  display: grid;
  gap: 0.8rem;
  min-height: 100%;
}

.service-card:hover,
.product-card:hover,
.case-card:hover,
.insight-card:hover,
.alert-card:hover,
.expert-card:hover,
.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(97, 212, 255, 0.3);
  transition: transform var(--transition), border-color var(--transition);
}

.card-kicker,
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.tag,
.badge,
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.34rem 0.65rem;
  border-radius: 999px;
  font-size: 0.76rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-soft);
  background: rgba(255, 255, 255, 0.03);
}

.badge-blue {
  color: var(--blue);
  border-color: rgba(97, 212, 255, 0.22);
}

.badge-violet {
  color: #c9c3ff;
  border-color: rgba(143, 135, 255, 0.26);
}

.badge-cyan {
  color: var(--cyan);
  border-color: rgba(127, 247, 228, 0.24);
}

.status-high { color: #ffd2d7; border-color: rgba(255, 107, 122, 0.34); }
.status-medium { color: #ffe8c2; border-color: rgba(255, 191, 105, 0.32); }
.status-low { color: #cdf9e4; border-color: rgba(110, 242, 179, 0.32); }

.stat-card strong {
  display: block;
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.35rem;
}

.list-clean {
  display: grid;
  gap: 0.65rem;
}

.list-clean li {
  padding-left: 1rem;
  position: relative;
  color: var(--text-soft);
}

.list-clean li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65rem;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--blue), var(--cyan));
}

.proof-strip {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: rgba(4, 10, 18, 0.8);
}

.proof-items {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  padding: 1rem 0;
}

.proof-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--text-soft);
}

.proof-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  box-shadow: 0 0 16px rgba(97,212,255,.45);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.2rem;
}

.filter-button {
  padding: 0.7rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  color: var(--text-soft);
}

.filter-button.is-active {
  color: #06101a;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
  background: transparent;
  color: var(--text);
  border: 0;
  padding: 0;
}

.faq-panel {
  display: none;
  padding-top: 0.85rem;
  color: var(--text-soft);
}

.faq-item.is-open .faq-panel {
  display: block;
}

.expert-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #08111d;
  background: linear-gradient(135deg, var(--cyan), var(--violet));
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

label {
  display: grid;
  gap: 0.4rem;
  color: var(--text-soft);
  font-size: 0.95rem;
}

input,
select,
textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  color: var(--text);
  padding: 0.85rem 0.95rem;
}

textarea {
  min-height: 140px;
  resize: vertical;
}

.form-note,
.card-note,
small {
  color: var(--text-muted);
}

.success-message {
  display: none;
  margin-top: 1rem;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background: rgba(110, 242, 179, 0.12);
  border: 1px solid rgba(110, 242, 179, 0.28);
  color: #d9ffe9;
}

.success-message.is-visible {
  display: block;
}

@media (max-width: 1024px) {
  .proof-items,
  .info-grid,
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .btn-row,
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .proof-items,
  .info-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }
}
'@

$headerCss = @'
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(4, 10, 18, 0.82);
  backdrop-filter: blur(16px);
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 74px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brand-mark {
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(127,247,228,0.95), rgba(97,212,255,0.95));
  color: #07111d;
  box-shadow: 0 8px 24px rgba(97,212,255,0.2);
}

.brand small {
  display: block;
  font-size: 0.64rem;
  letter-spacing: 0.16em;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.nav-item {
  position: relative;
}

.nav-item > a,
.nav-toggle-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.75rem 0.8rem;
  color: var(--text-soft);
  border-radius: 999px;
}

.nav-item > a:hover,
.nav-item.is-active > a,
.nav-toggle-link:hover {
  color: var(--text);
  background: rgba(255,255,255,0.03);
}

.nav-panel {
  position: absolute;
  left: 0;
  top: calc(100% + 0.5rem);
  min-width: 290px;
  padding: 0.8rem;
  border-radius: 18px;
  background: rgba(8, 17, 29, 0.98);
  border: 1px solid var(--panel-border);
  box-shadow: var(--shadow);
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity var(--transition), transform var(--transition), visibility var(--transition);
}

.nav-item:hover .nav-panel,
.nav-item:focus-within .nav-panel {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-panel a {
  display: block;
  padding: 0.65rem 0.7rem;
  border-radius: 12px;
  color: var(--text-soft);
}

.nav-panel a:hover {
  background: rgba(255,255,255,0.04);
  color: var(--text);
}

.nav-cta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.mobile-toggle {
  display: none;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
}

.mobile-panel {
  display: none;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.mobile-panel .container {
  padding: 1rem 0 1.25rem;
}

.mobile-links {
  display: grid;
  gap: 0.6rem;
}

.mobile-links a {
  padding: 0.8rem 0.9rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  color: var(--text-soft);
}

.mobile-panel.is-open {
  display: block;
}

.site-footer {
  border-top: 1px solid var(--line);
  padding: 1rem 0 2.5rem;
  background: rgba(3, 8, 14, 0.9);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 2rem 0;
}

.footer-grid h3,
.footer-grid h4 {
  margin-bottom: 0.8rem;
}

.footer-grid p,
.footer-grid li,
.footer-bottom {
  color: var(--text-soft);
}

.footer-link-list {
  display: grid;
  gap: 0.55rem;
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 1rem;
}

@media (max-width: 1024px) {
  .site-nav {
    display: none;
  }

  .mobile-toggle {
    display: inline-grid;
    place-items: center;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .footer-grid,
  .footer-bottom {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
}
'@

$homeCss = @'
.hero {
  position: relative;
  padding: 7rem 0 3rem;
  overflow: hidden;
}

.hero::before,
.hero::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(8px);
}

.hero::before {
  width: 380px;
  height: 380px;
  right: -120px;
  top: 40px;
  background: radial-gradient(circle, rgba(97,212,255,0.22), transparent 65%);
}

.hero::after {
  width: 360px;
  height: 360px;
  left: -120px;
  bottom: -120px;
  background: radial-gradient(circle, rgba(143,135,255,0.18), transparent 65%);
}

.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.2rem;
  align-items: center;
}

.hero-copy h1 {
  font-size: clamp(2.6rem, 4.7vw, 4.7rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.hero-copy p {
  max-width: 680px;
  color: var(--text-soft);
  font-size: 1.04rem;
}

.hero-slides {
  position: relative;
  min-height: 310px;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.hero-slide.is-active {
  position: relative;
  opacity: 1;
  transform: translateY(0);
}

.hero-panel {
  display: grid;
  gap: 0.9rem;
  padding: 1.2rem;
  border-radius: var(--radius-xl);
  background: linear-gradient(180deg, rgba(13, 27, 46, 0.92), rgba(8, 17, 29, 0.95));
  border: 1px solid var(--panel-border);
  box-shadow: var(--shadow);
}

.hero-panel .meta-row {
  margin-top: 0.4rem;
}

.hero-metric-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 0.75rem;
}

.hero-metric {
  padding: 0.8rem;
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
}

.hero-metric strong {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.hero-dots {
  display: flex;
  gap: 0.45rem;
  margin-top: 0.7rem;
}

.hero-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  border: 0;
}

.hero-dot.is-active {
  background: linear-gradient(135deg, var(--cyan), var(--blue));
}

.reach-map {
  min-height: 330px;
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--panel-border);
  background:
    linear-gradient(180deg, rgba(7, 15, 26, 0.9), rgba(7, 15, 26, 0.96)),
    radial-gradient(circle at 20% 30%, rgba(97,212,255,0.15), transparent 0 16%),
    radial-gradient(circle at 70% 45%, rgba(127,247,228,0.14), transparent 0 18%),
    radial-gradient(circle at 50% 75%, rgba(143,135,255,0.14), transparent 0 17%);
}

.reach-map::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}

.map-marker {
  position: absolute;
  display: grid;
  gap: 0.3rem;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  background: rgba(7, 18, 31, 0.9);
  border: 1px solid var(--panel-border);
  box-shadow: var(--shadow-soft);
  font-size: 0.82rem;
}

.map-marker::before {
  content: "";
  position: absolute;
  left: -0.45rem;
  top: 50%;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, var(--cyan), var(--blue));
}

.marker-uk { top: 22%; left: 16%; }
.marker-gulf { top: 40%; left: 48%; }
.marker-pk { top: 49%; left: 57%; }
.marker-apac { top: 65%; left: 74%; }

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero {
    padding-top: 6.5rem;
  }

  .hero-metric-row {
    grid-template-columns: 1fr;
  }

  .hero-slides {
    min-height: 350px;
  }
}
'@

$pagesCss = @'
.content-split {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1rem;
}

.content-stack {
  display: grid;
  gap: 1rem;
}

.timeline-list {
  display: grid;
  gap: 0.9rem;
}

.timeline-list li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
}

.timeline-index {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-grid;
  place-items: center;
  color: #06101a;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  font-weight: 700;
}

.cta-band {
  padding: 1.4rem;
  border-radius: var(--radius-xl);
  display: grid;
  gap: 0.9rem;
  border: 1px solid rgba(97,212,255,0.24);
  background: linear-gradient(135deg, rgba(12, 28, 47, 0.94), rgba(14, 23, 44, 0.94));
}

.alert-card header,
.insight-card header,
.case-card header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.8rem;
}

.alert-summary,
.insight-summary,
.case-summary {
  color: var(--text-soft);
}

.contact-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1rem;
}

.contact-details {
  display: grid;
  gap: 0.85rem;
}

.contact-details li {
  padding: 0.85rem 0.95rem;
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
}

.filter-card.is-hidden {
  display: none;
}

@media (max-width: 1024px) {
  .content-split,
  .contact-layout {
    grid-template-columns: 1fr;
  }
}
'@

$appJs = @'
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const root = body.dataset.root || "";
  const page = body.dataset.page || "";

  const navGroups = {
    pillars: [
      { href: `${root}pages/solutions/index.html`, label: "Overview" },
      { href: `${root}pages/solutions/risk-intelligence-monitoring.html`, label: "Risk Intelligence" },
      { href: `${root}pages/solutions/executive-mobility-secure-travel.html`, label: "Executive Mobility" },
      { href: `${root}pages/solutions/executive-protection-coordination.html`, label: "Protective Coordination" },
      { href: `${root}pages/solutions/crisis-response-incident-coordination.html`, label: "Crisis Leadership Support" }
    ],
    intelligence: [
      { href: `${root}pages/intelligence/index.html`, label: "Intelligence Products" },
      { href: `${root}pages/intelligence/insights.html`, label: "Insights" },
      { href: `${root}pages/intelligence/active-alerts.html`, label: "Active Alerts" },
      { href: `${root}pages/intelligence/case-studies.html`, label: "Case Studies" }
    ],
    about: [
      { href: `${root}pages/about/index.html`, label: "About" },
      { href: `${root}pages/about/leadership.html`, label: "Leadership" },
      { href: `${root}pages/about/methodology.html`, label: "Methodology" },
      { href: `${root}pages/about/governance.html`, label: "Governance" }
    ]
  };

  const activeMap = {
    home: "home",
    pillars: "pillars",
    "risk-intelligence": "pillars",
    "executive-mobility": "pillars",
    "protective-coordination": "pillars",
    "crisis-leadership": "pillars",
    products: "products",
    capabilities: "capabilities",
    industries: "industries",
    insights: "intelligence",
    alerts: "intelligence",
    "case-studies": "intelligence",
    about: "about",
    leadership: "about",
    methodology: "about",
    governance: "about",
    contact: "contact"
  };

  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");

  const renderPanelLinks = (items) => items.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");

  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="site-header">
        <div class="container">
          <a class="brand" href="${root}index.html" aria-label="SECURIDE 24 home">
            <span class="brand-mark">S24</span>
            <span>SECURIDE 24<small>Intelligence-led advisory</small></span>
          </a>
          <nav class="site-nav" aria-label="Primary">
            <ul class="nav-list">
              <li class="nav-item" data-nav="home"><a href="${root}index.html">Home</a></li>
              <li class="nav-item" data-nav="pillars">
                <a href="${root}pages/solutions/index.html">Advisory Pillars</a>
                <div class="nav-panel">${renderPanelLinks(navGroups.pillars)}</div>
              </li>
              <li class="nav-item" data-nav="products"><a href="${root}pages/intelligence/index.html">Intelligence Products</a></li>
              <li class="nav-item" data-nav="capabilities"><a href="${root}pages/capabilities/index.html">Capabilities</a></li>
              <li class="nav-item" data-nav="industries"><a href="${root}pages/industries/index.html">Industries</a></li>
              <li class="nav-item" data-nav="intelligence">
                <a href="${root}pages/intelligence/insights.html">Intelligence</a>
                <div class="nav-panel">${renderPanelLinks(navGroups.intelligence)}</div>
              </li>
              <li class="nav-item" data-nav="about">
                <a href="${root}pages/about/index.html">About</a>
                <div class="nav-panel">${renderPanelLinks(navGroups.about)}</div>
              </li>
              <li class="nav-item" data-nav="contact"><a href="${root}pages/contact/index.html">Contact</a></li>
            </ul>
          </nav>
          <div class="nav-cta">
            <a class="btn btn-primary" href="${root}pages/contact/index.html">Request Consultation</a>
            <button class="mobile-toggle" type="button" aria-expanded="false" aria-controls="mobilePanel">
              <span class="sr-only">Open menu</span>Menu
            </button>
          </div>
        </div>
        <div class="mobile-panel" id="mobilePanel">
          <div class="container">
            <div class="mobile-links">
              <a href="${root}index.html">Home</a>
              <a href="${root}pages/solutions/index.html">Advisory Pillars</a>
              <a href="${root}pages/intelligence/index.html">Intelligence Products</a>
              <a href="${root}pages/capabilities/index.html">Capabilities</a>
              <a href="${root}pages/industries/index.html">Industries</a>
              <a href="${root}pages/intelligence/insights.html">Intelligence</a>
              <a href="${root}pages/about/index.html">About</a>
              <a href="${root}pages/contact/index.html">Contact</a>
            </div>
          </div>
        </div>
      </header>`;

    const activeKey = activeMap[page] || page;
    const activeItem = headerTarget.querySelector(`[data-nav="${activeKey}"]`);
    if (activeItem) activeItem.classList.add("is-active");

    const menuButton = headerTarget.querySelector(".mobile-toggle");
    const mobilePanel = headerTarget.querySelector(".mobile-panel");
    if (menuButton && mobilePanel) {
      menuButton.addEventListener("click", () => {
        const isOpen = mobilePanel.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        body.classList.toggle("menu-open", isOpen);
      });
    }
  }

  if (footerTarget) {
    const year = new Date().getFullYear();
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <section>
              <h3>SECURIDE 24</h3>
              <p>Intelligence-led risk advisory, executive mobility assurance, protective coordination, and crisis leadership support for clients operating in complex environments.</p>
            </section>
            <section>
              <h4>Advisory</h4>
              <ul class="footer-link-list">
                <li><a href="${root}pages/solutions/risk-intelligence-monitoring.html">Risk Intelligence</a></li>
                <li><a href="${root}pages/solutions/executive-mobility-secure-travel.html">Executive Mobility</a></li>
                <li><a href="${root}pages/solutions/executive-protection-coordination.html">Protective Coordination</a></li>
                <li><a href="${root}pages/solutions/crisis-response-incident-coordination.html">Crisis Leadership Support</a></li>
              </ul>
            </section>
            <section>
              <h4>Intelligence</h4>
              <ul class="footer-link-list">
                <li><a href="${root}pages/intelligence/index.html">Intelligence Products</a></li>
                <li><a href="${root}pages/intelligence/insights.html">Insights</a></li>
                <li><a href="${root}pages/intelligence/active-alerts.html">Active Alerts</a></li>
                <li><a href="${root}pages/intelligence/case-studies.html">Case Studies</a></li>
              </ul>
            </section>
            <section>
              <h4>Contact</h4>
              <ul class="footer-link-list">
                <li><a href="mailto:social@securide24.com">social@securide24.com</a></li>
                <li><a href="tel:+19145206519">+1 (914) 520-6519</a></li>
                <li>London governance hub</li>
                <li>Lahore regional coordination desk</li>
              </ul>
            </section>
          </div>
          <div class="footer-bottom">
            <span>&copy; <span id="footerYear">${year}</span> SECURIDE 24. All rights reserved.</span>
            <span>Structured advisory. Discreet coordination. Clear escalation paths.</span>
          </div>
        </div>
      </footer>`;
  }

  const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  if (heroSlides.length > 1) {
    let current = 0;
    const showSlide = (index) => {
      heroSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      current = index;
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index));
    });

    showSlide(0);
    setInterval(() => showSlide((current + 1) % heroSlides.length), 6500);
  }

  document.querySelectorAll(".faq-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      item?.classList.toggle("is-open");
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const buttons = group.querySelectorAll(".filter-button");
    const target = document.querySelector(group.dataset.filterGroup);
    if (!target) return;

    const cards = target.querySelectorAll(".filter-card");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.filterTarget;
        buttons.forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
        cards.forEach((card) => {
          const matches = value === "all" || (card.dataset.category || "").includes(value);
          card.classList.toggle("is-hidden", !matches);
        });
      });
    });
  });

  const contactForm = document.querySelector("#consultationForm");
  const successMessage = document.querySelector("#formSuccess");
  if (contactForm && successMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      successMessage.classList.add("is-visible");
      contactForm.reset();
    });
  }
});
'@

function Get-Head {
    param([string]$Title, [string]$Description, [string]$Root)
    return @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>$Title</title>
  <meta name="description" content="$Description" />
  <meta name="robots" content="index,follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="$Title" />
  <meta property="og:description" content="$Description" />
  <meta property="og:site_name" content="SECURIDE 24" />
  <link rel="stylesheet" href="${Root}css/base.css" />
  <link rel="stylesheet" href="${Root}css/layout.css" />
  <link rel="stylesheet" href="${Root}css/components.css" />
  <link rel="stylesheet" href="${Root}css/header.css" />
  <link rel="stylesheet" href="${Root}css/home.css" />
  <link rel="stylesheet" href="${Root}css/pages.css" />
</head>
"@
}

$homePage = (Get-Head -Title 'SECURIDE 24 | Intelligence-Led Risk Advisory' -Description 'Premium international risk intelligence, executive mobility assurance, protective coordination, and crisis leadership support.' -Root '') + @'
<body data-root="" data-page="home">
  <a class="skip-link" href="#main">Skip to content</a>
  <div data-site-header></div>
  <main id="main">
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">Executive-facing risk advisory</span>
          <h1>Intelligence-led support for leaders moving through complex environments.</h1>
          <p>SECURIDE 24 helps executives, organizations, delegations, and investors maintain decision clarity, secure movement, and structured response when operating conditions shift.</p>
          <div class="btn-row">
            <a class="btn btn-primary" href="pages/contact/index.html">Request Consultation</a>
            <a class="btn btn-secondary" href="pages/solutions/index.html">Explore Services</a>
          </div>
        </div>
        <div>
          <div class="hero-slides">
            <article class="hero-slide is-active">
              <div class="hero-panel">
                <span class="eyebrow">Core positioning</span>
                <h3>Decision clarity in unstable operating contexts</h3>
                <p class="card-note">Advisory-led support for travel, exposure, escalation, and continuity across high-consequence environments.</p>
                <div class="hero-metric-row">
                  <div class="hero-metric"><strong>24/7</strong><span>Monitoring access</span></div>
                  <div class="hero-metric"><strong>2 hubs</strong><span>London governance and regional depth</span></div>
                  <div class="hero-metric"><strong>1 picture</strong><span>Integrated risk view for leaders</span></div>
                </div>
              </div>
            </article>
            <article class="hero-slide">
              <div class="hero-panel">
                <span class="eyebrow">Executive mobility</span>
                <h3>Secure movement with discreet coordination</h3>
                <p class="card-note">Pre-travel risk packs, route assurance, liaison support, and escalation pathways for executive movement.</p>
                <div class="meta-row">
                  <span class="badge badge-blue">Pre-travel planning</span>
                  <span class="badge badge-cyan">Route intelligence</span>
                  <span class="badge badge-violet">Partner coordination</span>
                </div>
              </div>
            </article>
            <article class="hero-slide">
              <div class="hero-panel">
                <span class="eyebrow">Crisis leadership support</span>
                <h3>Structured response when time and clarity matter most</h3>
                <p class="card-note">Leadership briefings, incident escalation, and continuity support designed for high-stakes decision-makers.</p>
                <div class="meta-row">
                  <span class="badge status-high">Rapid escalation</span>
                  <span class="badge badge-cyan">Leadership briefings</span>
                  <span class="badge badge-blue">Continuity support</span>
                </div>
              </div>
            </article>
          </div>
          <div class="hero-dots" aria-label="Hero slide controls">
            <button class="hero-dot is-active" type="button" aria-label="Show slide 1"></button>
            <button class="hero-dot" type="button" aria-label="Show slide 2"></button>
            <button class="hero-dot" type="button" aria-label="Show slide 3"></button>
          </div>
        </div>
      </div>
    </section>

    <section class="proof-strip">
      <div class="container proof-items">
        <div class="proof-item"><span class="proof-dot"></span><span>London-governed advisory model</span></div>
        <div class="proof-item"><span class="proof-dot"></span><span>Pakistan and Afghanistan operational depth</span></div>
        <div class="proof-item"><span class="proof-dot"></span><span>24/7 monitoring access</span></div>
        <div class="proof-item"><span class="proof-dot"></span><span>Executive-focused delivery</span></div>
        <div class="proof-item"><span class="proof-dot"></span><span>Trusted regional coordination</span></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Flagship advisory pillars</span>
          <h2>Four clear pillars clients can remember and act on.</h2>
          <p>The offer is structured to separate the strategic advisory layer from intelligence products and delivery capabilities.</p>
        </div>
        <div class="card-grid">
          <article class="service-card">
            <div class="card-kicker"><span class="badge badge-blue">Pillar 01</span></div>
            <h3>Risk Intelligence</h3>
            <p>Monitoring, assessment, and executive briefings that convert fragmented signals into a usable risk picture.</p>
            <a class="btn-link" href="pages/solutions/risk-intelligence-monitoring.html">View pillar →</a>
          </article>
          <article class="service-card">
            <div class="card-kicker"><span class="badge badge-blue">Pillar 02</span></div>
            <h3>Executive Mobility</h3>
            <p>Secure movement planning for leaders, visitors, delegations, and high-consequence travel programs.</p>
            <a class="btn-link" href="pages/solutions/executive-mobility-secure-travel.html">View pillar →</a>
          </article>
          <article class="service-card">
            <div class="card-kicker"><span class="badge badge-blue">Pillar 03</span></div>
            <h3>Protective Coordination</h3>
            <p>Protective planning and operational alignment for sensitive movements, events, and executive exposure.</p>
            <a class="btn-link" href="pages/solutions/executive-protection-coordination.html">View pillar →</a>
          </article>
          <article class="service-card">
            <div class="card-kicker"><span class="badge badge-blue">Pillar 04</span></div>
            <h3>Crisis Leadership Support</h3>
            <p>Structured leadership updates, escalation support, and continuity coordination during fast-moving incidents.</p>
            <a class="btn-link" href="pages/solutions/crisis-response-incident-coordination.html">View pillar →</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Intelligence products</span>
          <h2>Outputs that feel like a real intelligence service, not generic website content.</h2>
        </div>
        <div class="card-grid">
          <article class="product-card"><span class="badge badge-cyan">Executive Signals</span><h3>Weekly strategic signal brief</h3><p>Format: concise leadership note. Use case: board-level situational awareness. Cadence: weekly.</p></article>
          <article class="product-card"><span class="badge status-high">Active Alerts</span><h3>Rapid operational notifications</h3><p>Format: alert card. Use case: movement or exposure changes. Cadence: live when required.</p></article>
          <article class="product-card"><span class="badge badge-blue">Pre-Travel Risk Pack</span><h3>Travel-specific exposure summary</h3><p>Format: itinerary brief. Use case: executive visits and delegations. Cadence: pre-deployment.</p></article>
          <article class="product-card"><span class="badge badge-violet">Country Risk Snapshot</span><h3>Decision-ready country overview</h3><p>Format: 1-2 page snapshot. Use case: market entry, site visits, due diligence.</p></article>
          <article class="product-card"><span class="badge badge-cyan">Executive Briefing</span><h3>Leadership readout before movement</h3><p>Format: advisory briefing. Use case: sensitive visits, VIP schedules, board travel.</p></article>
          <article class="product-card"><span class="badge status-medium">Crisis Flash Update</span><h3>Escalation and next-step update</h3><p>Format: flash note. Use case: disruptions, civil unrest, detentions, route changes.</p></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">How we work</span>
          <h2>From anticipation to response in six disciplined stages.</h2>
        </div>
        <div class="process-grid">
          <div class="process-step"><span>1</span><h3>Anticipate</h3><p>Frame exposure before movement or engagement.</p></div>
          <div class="process-step"><span>2</span><h3>Monitor</h3><p>Track indicators across travel, local dynamics, and incident shifts.</p></div>
          <div class="process-step"><span>3</span><h3>Assess</h3><p>Convert raw signals into decision-relevant analysis.</p></div>
          <div class="process-step"><span>4</span><h3>Advise</h3><p>Provide calm, executive-facing recommendations.</p></div>
          <div class="process-step"><span>5</span><h3>Coordinate</h3><p>Align transport, liaison, and protective layers.</p></div>
          <div class="process-step"><span>6</span><h3>Respond</h3><p>Support escalation, continuity, and leadership reporting.</p></div>
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container dual-panel">
        <div>
          <div class="section-heading">
            <span class="eyebrow">Operational reach</span>
            <h2>Regional depth with an international advisory posture.</h2>
            <p>SECURIDE 24 combines discreet coordination in Pakistan and Afghanistan with structured advisory presentation suitable for global firms, embassies, family offices, and executive teams.</p>
          </div>
          <div class="stack">
            <div class="region-slab"><strong>Pakistan and Afghanistan depth</strong><p>Ground-informed context, partner liaison, movement planning, and practical operating insight.</p></div>
            <div class="region-slab"><strong>Regional coordination capability</strong><p>Support for delegations, project teams, and executive travel across elevated-risk locations.</p></div>
            <div class="region-slab"><strong>Global advisory network support</strong><p>International-facing reporting style, governance discipline, and discreet partner model.</p></div>
          </div>
        </div>
        <div class="reach-map" aria-label="Operational reach visualization">
          <div class="map-marker marker-uk"><strong>London</strong><span>Governance and client interface</span></div>
          <div class="map-marker marker-gulf"><strong>Regional transit</strong><span>Route and liaison support</span></div>
          <div class="map-marker marker-pk"><strong>Pakistan</strong><span>Operational coordination depth</span></div>
          <div class="map-marker marker-apac"><strong>Wider support</strong><span>Networked advisory model</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Selected case studies</span>
          <h2>Recent examples of structured support in sensitive environments.</h2>
        </div>
        <div class="card-grid">
          <article class="case-card"><header><h3>Executive visit stabilization</h3><span class="badge badge-blue">Corporate leadership</span></header><p class="case-summary">Adjusted routes, updated advisories, and synchronized local coordination for a high-visibility executive delegation.</p><a class="btn-link" href="pages/intelligence/case-studies.html">Read case →</a></article>
          <article class="case-card"><header><h3>Project team continuity support</h3><span class="badge badge-violet">Elevated-risk project</span></header><p class="case-summary">Maintained movement confidence during a period of localized unrest and changing access conditions.</p><a class="btn-link" href="pages/intelligence/case-studies.html">Read case →</a></article>
          <article class="case-card"><header><h3>Delegation risk picture refresh</h3><span class="badge badge-cyan">Official visit</span></header><p class="case-summary">Produced fast-turn executive briefings and incident-trigger thresholds ahead of a time-sensitive visit.</p><a class="btn-link" href="pages/intelligence/case-studies.html">Read case →</a></article>
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Leadership and experts</span>
          <h2>Cross-functional advisory profiles with operational credibility.</h2>
        </div>
        <div class="grid-3">
          <article class="expert-card"><div class="expert-avatar">AM</div><h3>A. Malik</h3><p>Director, Global Operations</p><p class="card-note">Advisory focus: executive movement, field coordination, response management.</p></article>
          <article class="expert-card"><div class="expert-avatar">YS</div><h3>Y. Shah</h3><p>Director, Risk Intelligence</p><p class="card-note">Advisory focus: risk interpretation, political-security briefings, strategic decision support.</p></article>
          <article class="expert-card"><div class="expert-avatar">TH</div><h3>T. Khan</h3><p>Director, Global Risk Management</p><p class="card-note">Advisory focus: governance, continuity planning, operating model resilience.</p></article>
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Insights and signals</span>
          <h2>Editorial analysis and operational updates, kept clearly separate.</h2>
        </div>
        <div class="card-grid">
          <article class="insight-card"><header><h3>Border friction and executive travel planning</h3><span class="badge badge-blue">Insight</span></header><p class="insight-summary">How mobility teams can manage schedule confidence when permit timing and local protests create uncertainty.</p><a class="btn-link" href="pages/intelligence/insights.html">Open insight →</a></article>
          <article class="alert-card"><header><h3>Active alert: route disruption watch</h3><span class="badge status-high">Operational</span></header><p class="alert-summary">Short-notice route constraints require pre-cleared alternatives for executive movement windows.</p><a class="btn-link" href="pages/intelligence/active-alerts.html">View alert feed →</a></article>
          <article class="insight-card"><header><h3>What leaders need during the first 60 minutes of a crisis</h3><span class="badge badge-cyan">Briefing</span></header><p class="insight-summary">A framework for calm escalation, accountability, and decision sequencing.</p><a class="btn-link" href="pages/intelligence/insights.html">Open insight →</a></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-band">
          <span class="eyebrow">Request a consultation</span>
          <h2>Discuss your operating environment with our advisory team.</h2>
          <p>For executive travel, delegation planning, elevated-risk operations, or crisis response support, we can help frame the risk picture and next steps.</p>
          <div class="btn-row">
            <a class="btn btn-primary" href="pages/contact/index.html">Speak with Our Advisory Team</a>
            <a class="btn btn-secondary" href="pages/intelligence/index.html">View Intelligence Products</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div data-site-footer></div>
  <script src="js/app.js"></script>
</body>
</html>
'@

function Get-InnerPage {
    param(
        [string]$Root,
        [string]$Page,
        [string]$Title,
        [string]$Description,
        [string]$Eyebrow,
        [string]$HeroTitle,
        [string]$HeroText,
        [string]$HeroCard,
        [string]$MainHtml
    )

    $head = Get-Head -Title $Title -Description $Description -Root $Root
    return $head + @"
<body data-root="$Root" data-page="$Page">
  <a class="skip-link" href="#main">Skip to content</a>
  <div data-site-header></div>
  <main id="main">
    <section class="page-hero">
      <div class="container page-hero-inner">
        <div>
          <span class="eyebrow">$Eyebrow</span>
          <h1>$HeroTitle</h1>
          <p>$HeroText</p>
          <div class="btn-row">
            <a class="btn btn-primary" href="${Root}pages/contact/index.html">Request Consultation</a>
            <a class="btn btn-secondary" href="${Root}pages/intelligence/index.html">View Intelligence Products</a>
          </div>
        </div>
        <aside class="page-hero-card">
          $HeroCard
        </aside>
      </div>
    </section>
    $MainHtml
  </main>
  <div data-site-footer></div>
  <script src="${Root}js/app.js"></script>
</body>
</html>
"@
}

$pillarsMain = @'
<section class="section">
  <div class="container">
    <div class="section-heading">
      <span class="eyebrow">Commercial clarity</span>
      <h2>The four flagship pillars are designed to be memorable, strategic, and distinct.</h2>
      <p>Each pillar addresses a leadership problem. Intelligence products and capabilities then support delivery underneath it.</p>
    </div>
    <div class="card-grid">
      <article class="service-card"><span class="badge badge-blue">Risk Intelligence</span><h3>For leadership teams needing clearer signal interpretation</h3><p>Solves: fragmented information, elevated uncertainty, weak travel visibility.</p><ul class="list-clean"><li>Executive signals and snapshots</li><li>Pre-travel risk framing</li><li>Monitoring and escalation thresholds</li></ul><a class="btn-link" href="risk-intelligence-monitoring.html">Explore pillar →</a></article>
      <article class="service-card"><span class="badge badge-blue">Executive Mobility</span><h3>For travel, movement assurance, and visiting leadership teams</h3><p>Solves: route friction, local uncertainty, short-notice travel complexity.</p><ul class="list-clean"><li>Itinerary assurance</li><li>Secure movement planning</li><li>Regional liaison support</li></ul><a class="btn-link" href="executive-mobility-secure-travel.html">Explore pillar →</a></article>
      <article class="service-card"><span class="badge badge-blue">Protective Coordination</span><h3>For exposure-sensitive executives, delegations, and events</h3><p>Solves: unclear protective posture, partner misalignment, site vulnerabilities.</p><ul class="list-clean"><li>Protective planning</li><li>Venue and route coordination</li><li>Escalation support</li></ul><a class="btn-link" href="executive-protection-coordination.html">Explore pillar →</a></article>
      <article class="service-card"><span class="badge badge-blue">Crisis Leadership Support</span><h3>For organizations navigating fast-moving disruptions</h3><p>Solves: leadership overload, fragmented response, poor communication rhythm.</p><ul class="list-clean"><li>Crisis flash updates</li><li>Incident escalation</li><li>Continuity support</li></ul><a class="btn-link" href="crisis-response-incident-coordination.html">Explore pillar →</a></article>
    </div>
  </div>
</section>
<section class="section section-tight">
  <div class="container metrics-grid">
    <div class="stat-card"><strong>4</strong><span>Flagship pillars</span></div>
    <div class="stat-card"><strong>6</strong><span>Intelligence products</span></div>
    <div class="stat-card"><strong>6</strong><span>Delivery capabilities</span></div>
    <div class="stat-card"><strong>24/7</strong><span>Monitoring-informed support</span></div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="cta-band">
      <span class="eyebrow">Need the right mix?</span>
      <h2>We can tailor a pillar-led support model to your travel profile or operating environment.</h2>
      <div class="btn-row"><a class="btn btn-primary" href="../contact/index.html">Discuss your requirements</a></div>
    </div>
  </div>
</section>
'@

$riskMain = @'
<section class="section">
  <div class="container content-split">
    <div class="content-stack">
      <div class="section-heading"><span class="eyebrow">What this solves</span><h2>When the signal environment is noisy, leadership still needs a clear view.</h2><p>We help clients interpret evolving issues, anticipate exposure, and prioritize what matters to movement, personnel, and continuity.</p></div>
      <ul class="list-clean"><li>Fragmented or inconsistent local reporting</li><li>Travel approvals without risk context</li><li>Unclear escalation thresholds</li><li>Need for concise executive-facing briefings</li></ul>
    </div>
    <aside class="surface-card"><h3>Typical client scenarios</h3><ul class="list-clean"><li>Board or investor travel into elevated-risk locations</li><li>NGO or project team planning in volatile periods</li><li>Country entry assessment before market engagement</li><li>Leadership monitoring during political disruption</li></ul></aside>
  </div>
</section>
<section class="section section-tight"><div class="container grid-3"><article class="service-card"><h3>Core deliverables</h3><ul class="list-clean"><li>Executive Signals</li><li>Country Risk Snapshots</li><li>Executive Briefings</li></ul></article><article class="service-card"><h3>Execution support</h3><ul class="list-clean"><li>Watch desk monitoring</li><li>Incident-trigger thresholds</li><li>Advisory calls and updates</li></ul></article><article class="service-card"><h3>Related capabilities</h3><ul class="list-clean"><li>Monitoring and Watch Desk</li><li>Incident Escalation</li><li>Executive Advisory Support</li></ul></article></div></section>
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">FAQ</span><h2>Common questions</h2></div><div class="stack"><article class="faq-item"><button class="faq-trigger" type="button"><span>Do you provide only alerts or also interpretation?</span><span>+</span></button><div class="faq-panel"><p>Both. The core value is to interpret what changes in the operating picture mean for leaders and movement plans.</p></div></article><article class="faq-item"><button class="faq-trigger" type="button"><span>Can briefings be tailored for senior executives?</span><span>+</span></button><div class="faq-panel"><p>Yes. Outputs can be tuned for board members, chiefs of staff, global mobility teams, or security directors.</p></div></article></div></div></section>
'@

$mobilityMain = @'
<section class="section"><div class="container content-split"><div class="content-stack"><div class="section-heading"><span class="eyebrow">What this solves</span><h2>Travel confidence for leaders operating under time pressure.</h2><p>Executive Mobility is built for visits where timing, visibility, discretion, and route assurance matter as much as transportation itself.</p></div><ul class="list-clean"><li>Pre-travel exposure mapping</li><li>Arrival, route, and venue planning</li><li>Short-notice travel changes</li><li>Coordination between stakeholders and local partners</li></ul></div><aside class="surface-card"><h3>Typical scenarios</h3><ul class="list-clean"><li>CEO and board visits</li><li>Official delegations and VIP movement</li><li>Family office travel into unfamiliar environments</li><li>Investor site visits with compressed timelines</li></ul></aside></div></section>
<section class="section section-tight"><div class="container grid-3"><article class="service-card"><h3>Core deliverables</h3><ul class="list-clean"><li>Pre-Travel Risk Pack</li><li>Movement advisories</li><li>Executive briefings</li></ul></article><article class="service-card"><h3>How we support execution</h3><ul class="list-clean"><li>Secure mobility planning</li><li>Route contingencies</li><li>Regional liaison support</li></ul></article><article class="service-card"><h3>Related capabilities</h3><ul class="list-clean"><li>Protective Planning</li><li>Secure Mobility Planning</li><li>Monitoring and Watch Desk</li></ul></article></div></section>
<section class="section"><div class="container"><div class="stack"><article class="faq-item"><button class="faq-trigger" type="button"><span>Is this only for high-profile principals?</span><span>+</span></button><div class="faq-panel"><p>No. It also supports project leaders, technical teams, and official visitors with operational exposure.</p></div></article><article class="faq-item"><button class="faq-trigger" type="button"><span>Can you support recurring movement programs?</span><span>+</span></button><div class="faq-panel"><p>Yes. We can help structure repeat travel protocols, decision points, and routine briefing outputs.</p></div></article></div></div></section>
'@

$protectiveMain = @'
<section class="section"><div class="container content-split"><div class="content-stack"><div class="section-heading"><span class="eyebrow">What this solves</span><h2>Protective posture without a noisy, tactical feel.</h2><p>Protective Coordination aligns plans, partners, timings, and escalation pathways so principals and hosts can operate with confidence and discretion.</p></div><ul class="list-clean"><li>Unclear protective ownership</li><li>Venue or movement exposure for visiting principals</li><li>Last-minute itinerary changes</li><li>Need for discreet coordination rather than visible disruption</li></ul></div><aside class="surface-card"><h3>Typical scenarios</h3><ul class="list-clean"><li>Executive visits and leadership roadshows</li><li>Private events or closed-door sessions</li><li>High-visibility delegation programs</li><li>Ad hoc protective support in changing conditions</li></ul></aside></div></section>
<section class="section section-tight"><div class="container grid-3"><article class="service-card"><h3>Core deliverables</h3><ul class="list-clean"><li>Protective planning notes</li><li>Venue and route reviews</li><li>Escalation triggers</li></ul></article><article class="service-card"><h3>How we support execution</h3><ul class="list-clean"><li>Partner alignment</li><li>Operational liaison</li><li>Day-of coordination support</li></ul></article><article class="service-card"><h3>Related capabilities</h3><ul class="list-clean"><li>Protective Planning</li><li>Regional Liaison and Coordination</li><li>Executive Advisory Support</li></ul></article></div></section>
<section class="section"><div class="container"><div class="stack"><article class="faq-item"><button class="faq-trigger" type="button"><span>Do you act as a direct guard provider?</span><span>+</span></button><div class="faq-panel"><p>The positioning is advisory-led. We coordinate protective requirements, planning, and partner alignment around the principal's risk picture.</p></div></article><article class="faq-item"><button class="faq-trigger" type="button"><span>Can support remain discreet?</span><span>+</span></button><div class="faq-panel"><p>Yes. The aim is confidence and continuity, not unnecessary visibility.</p></div></article></div></div></section>
'@

$crisisMain = @'
<section class="section"><div class="container content-split"><div class="content-stack"><div class="section-heading"><span class="eyebrow">What this solves</span><h2>Leadership needs structure when operating conditions change quickly.</h2><p>Crisis Leadership Support provides timely updates, escalation rhythm, and coordinated continuity guidance when teams face security incidents, movement disruption, or political instability.</p></div><ul class="list-clean"><li>Leadership information overload</li><li>Unclear incident ownership or escalation</li><li>Response actions happening without coordination</li><li>Need for board-ready updates during disruption</li></ul></div><aside class="surface-card"><h3>Typical scenarios</h3><ul class="list-clean"><li>Rapid deterioration in local conditions</li><li>Detention, protest, or route shutdown affecting leadership travel</li><li>Team accountability during fast-moving incidents</li><li>Operational continuity planning during crisis periods</li></ul></aside></div></section>
<section class="section section-tight"><div class="container grid-3"><article class="service-card"><h3>Core deliverables</h3><ul class="list-clean"><li>Crisis Flash Updates</li><li>Leadership readouts</li><li>Escalation recommendations</li></ul></article><article class="service-card"><h3>How we support execution</h3><ul class="list-clean"><li>Incident escalation</li><li>Stakeholder coordination</li><li>Continuity support</li></ul></article><article class="service-card"><h3>Related capabilities</h3><ul class="list-clean"><li>Monitoring and Watch Desk</li><li>Incident Escalation</li><li>Executive Advisory Support</li></ul></article></div></section>
<section class="section"><div class="container"><div class="stack"><article class="faq-item"><button class="faq-trigger" type="button"><span>How quickly can updates be issued?</span><span>+</span></button><div class="faq-panel"><p>Updates can be structured as fast-turn flash notes, direct advisory calls, or leadership briefs depending on urgency.</p></div></article><article class="faq-item"><button class="faq-trigger" type="button"><span>Does this include continuity support?</span><span>+</span></button><div class="faq-panel"><p>Yes. The service focuses on protecting leadership decision quality and continuity during disruption.</p></div></article></div></div></section>
'@

$productsMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Productized outputs</span><h2>Each intelligence product is built to support a specific decision or operating moment.</h2></div><div class="card-grid"><article class="product-card"><span class="badge badge-cyan">Executive Signals</span><h3>Strategic signal briefing</h3><p>Why it matters: keeps leaders updated on emerging shifts before they affect movement or reputation.</p><p class="card-note">Used by: executives, chiefs of staff, security directors.</p></article><article class="product-card"><span class="badge status-high">Active Alerts</span><h3>Live operational notification</h3><p>Why it matters: highlights route, location, or incident changes with immediate relevance.</p><p class="card-note">Format: alert card. Use case: travel windows and short-notice movement changes.</p></article><article class="product-card"><span class="badge badge-blue">Pre-Travel Risk Pack</span><h3>Travel readiness brief</h3><p>Why it matters: clarifies risk before wheels-up rather than during disruption.</p><p class="card-note">Format: concise itinerary pack with recommendations.</p></article><article class="product-card"><span class="badge badge-violet">Country Risk Snapshot</span><h3>Country-level exposure summary</h3><p>Why it matters: informs visits, entry planning, and leadership expectations.</p><p class="card-note">Used by: investors, project leaders, visiting delegations.</p></article><article class="product-card"><span class="badge badge-cyan">Executive Briefing</span><h3>Leadership pre-read</h3><p>Why it matters: delivers clear decision context ahead of key movements or engagements.</p><p class="card-note">Format: executive-facing briefing deck or summary note.</p></article><article class="product-card"><span class="badge status-medium">Crisis Flash Update</span><h3>Fast-turn escalation update</h3><p>Why it matters: keeps principals informed when timing, reputation, and continuity are at stake.</p><p class="card-note">Used by: crisis teams, mobility leads, senior management.</p></article></div></div></section>
<section class="section section-tight"><div class="container cta-band"><span class="eyebrow">Output-first model</span><h2>Clients receive concrete briefings, not vague promises.</h2><p>That product discipline helps SECURIDE 24 present like a true intelligence-led advisory platform.</p></div></section>
'@

$capabilitiesMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Delivery capabilities</span><h2>Capabilities are operational enablers that support the advisory pillars rather than duplicate them.</h2></div><div class="card-grid"><article class="service-card"><span class="badge badge-blue">Monitoring and Watch Desk</span><p>Operational role: track events, validate developments, and escalate decision-relevant shifts.</p><p class="card-note">Linked services: Risk Intelligence, Crisis Leadership Support.</p></article><article class="service-card"><span class="badge badge-blue">Protective Planning</span><p>Operational role: structure principal, route, and venue protective considerations.</p><p class="card-note">Linked services: Protective Coordination, Executive Mobility.</p></article><article class="service-card"><span class="badge badge-blue">Secure Mobility Planning</span><p>Operational role: design movement options, route confidence, and contingency pathways.</p><p class="card-note">Linked services: Executive Mobility, Protective Coordination.</p></article><article class="service-card"><span class="badge badge-blue">Incident Escalation</span><p>Operational role: set thresholds, support decisions, and structure leadership updates.</p><p class="card-note">Linked services: Risk Intelligence, Crisis Leadership Support.</p></article><article class="service-card"><span class="badge badge-blue">Regional Liaison and Coordination</span><p>Operational role: connect advisory planning to local partner and stakeholder actions.</p><p class="card-note">Linked services: Executive Mobility, Protective Coordination.</p></article><article class="service-card"><span class="badge badge-blue">Executive Advisory Support</span><p>Operational role: translate detail into concise leadership-ready recommendations.</p><p class="card-note">Linked services: all flagship pillars.</p></article></div></div></section>
'@

$industriesMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Industries served</span><h2>Support models shaped by sector exposure, stakeholder profile, and operating tempo.</h2></div><div class="card-grid"><article class="service-card"><h3>Corporate Executives</h3><p>Typical risks: compressed schedules, reputational visibility, route uncertainty.</p><p class="card-note">Relevant support: Executive Mobility, Protective Coordination, Executive Briefings.</p></article><article class="service-card"><h3>International Organizations</h3><p>Typical risks: program continuity, regional coordination, stakeholder complexity.</p><p class="card-note">Relevant support: Risk Intelligence, Crisis Leadership Support.</p></article><article class="service-card"><h3>Diplomatic and Official Visitors</h3><p>Typical risks: protocol exposure, public visibility, layered coordination.</p><p class="card-note">Relevant support: Mobility assurance, protective planning, active alerts.</p></article><article class="service-card"><h3>NGOs and Humanitarian Actors</h3><p>Typical risks: field volatility, local access, continuity pressure.</p><p class="card-note">Relevant support: Country snapshots, monitoring, escalation support.</p></article><article class="service-card"><h3>Investors and Family Offices</h3><p>Typical risks: unfamiliar environments, sensitive schedules, discreet movement needs.</p><p class="card-note">Relevant support: pre-travel packs, executive mobility, advisory briefings.</p></article><article class="service-card"><h3>Projects in Elevated-Risk Environments</h3><p>Typical risks: movement friction, disruption risk, leadership oversight demands.</p><p class="card-note">Relevant support: risk intelligence, crisis support, local liaison.</p></article><article class="service-card"><h3>Events, Delegations, and Visits</h3><p>Typical risks: concentration risk, venue issues, route and timing exposure.</p><p class="card-note">Relevant support: protective coordination, watch desk, route planning.</p></article></div></div></section>
'@

$casesMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Case studies</span><h2>Structured examples of advisory support, movement assurance, and coordination impact.</h2></div><div class="stack"><article class="case-card"><header><h3>Executive delegation route reset</h3><span class="badge badge-blue">Challenge</span></header><p class="case-summary">A senior delegation required movement through a city facing fast-changing demonstrations and traffic restrictions.</p><ul class="list-clean"><li>Environment: urban political disruption</li><li>Response: refreshed risk picture, alternate route logic, live coordination</li><li>Outcome: visit completed with preserved timing and reduced exposure</li><li>Leadership impact: clearer confidence for last-mile decisions</li></ul></article><article class="case-card"><header><h3>Project continuity during localized unrest</h3><span class="badge badge-violet">Environment</span></header><p class="case-summary">A project leadership team needed to maintain oversight without increasing movement exposure for staff.</p><ul class="list-clean"><li>Risk picture: transport volatility and access uncertainty</li><li>Securide24 response: tailored monitoring, escalation thresholds, continuity advisories</li><li>Outcome: work rhythm maintained with controlled decision points</li></ul></article><article class="case-card"><header><h3>Official visitor briefing and protection alignment</h3><span class="badge badge-cyan">Response</span></header><p class="case-summary">A visiting principal required discreet movement support and a concise understanding of current exposure.</p><ul class="list-clean"><li>Challenge: compressed schedule and multiple stakeholders</li><li>Response: executive briefing, protective coordination, liaison checks</li><li>Outcome: smoother movement and stronger decision clarity for the host team</li></ul></article></div></div></section>
'@

$insightsMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Editorial analysis</span><h2>Thought leadership and briefings for leaders managing complex environments.</h2></div><div class="filter-bar" data-filter-group="#insightGrid"><button class="filter-button is-active" data-filter-target="all" type="button">All</button><button class="filter-button" data-filter-target="mobility" type="button">Mobility</button><button class="filter-button" data-filter-target="crisis" type="button">Crisis</button><button class="filter-button" data-filter-target="strategy" type="button">Strategy</button></div><div class="card-grid" id="insightGrid"><article class="insight-card filter-card" data-category="mobility strategy"><header><h3>Executive travel in uncertain urban settings</h3><span class="badge badge-blue">Mobility</span></header><p class="insight-summary">How to preserve movement confidence when route reliability and public sentiment are changing.</p></article><article class="insight-card filter-card" data-category="crisis"><header><h3>First-hour leadership discipline in a crisis</h3><span class="badge badge-cyan">Crisis</span></header><p class="insight-summary">A practical sequence for escalation, updates, accountability, and communication.</p></article><article class="insight-card filter-card" data-category="strategy"><header><h3>Why intelligence products matter to boards</h3><span class="badge badge-violet">Strategy</span></header><p class="insight-summary">Boards need structured, concise outputs rather than raw reporting noise.</p></article><article class="insight-card filter-card" data-category="mobility"><header><h3>Pre-travel risk packs for high-consequence visits</h3><span class="badge badge-blue">Mobility</span></header><p class="insight-summary">A better way to align principal expectations before arrival.</p></article><article class="insight-card filter-card" data-category="strategy crisis"><header><h3>Escalation thresholds that help rather than confuse</h3><span class="badge badge-cyan">Governance</span></header><p class="insight-summary">Clear thresholds improve speed and reduce executive overload.</p></article><article class="insight-card filter-card" data-category="strategy"><header><h3>Advisory posture versus tactical branding</h3><span class="badge badge-violet">Positioning</span></header><p class="insight-summary">Why executive clients respond to calm structure over noisy security language.</p></article></div></div></section>
'@

$alertsMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Operational alert feed</span><h2>Live-style alert cards separated from thought leadership content.</h2></div><div class="filter-bar" data-filter-group="#alertGrid"><button class="filter-button is-active" data-filter-target="all" type="button">All severities</button><button class="filter-button" data-filter-target="high" type="button">High</button><button class="filter-button" data-filter-target="medium" type="button">Medium</button><button class="filter-button" data-filter-target="low" type="button">Low</button></div><div class="card-grid" id="alertGrid"><article class="alert-card filter-card" data-category="high"><header><h3>Movement disruption watch</h3><span class="status-pill status-high">High</span></header><p class="alert-summary">Region: major urban corridor. Updated: 45 minutes ago. Advisory: pre-clear alternatives before executive movement.</p></article><article class="alert-card filter-card" data-category="medium"><header><h3>Localized protest monitoring</h3><span class="status-pill status-medium">Medium</span></header><p class="alert-summary">Region: city center zone. Updated: 2 hours ago. Advisory: review route exposure and site timing.</p></article><article class="alert-card filter-card" data-category="low"><header><h3>Border processing delays</h3><span class="status-pill status-low">Low</span></header><p class="alert-summary">Region: cross-border transit point. Updated: 3 hours ago. Advisory: allow additional schedule margin.</p></article><article class="alert-card filter-card" data-category="high"><header><h3>Short-notice venue access controls</h3><span class="status-pill status-high">High</span></header><p class="alert-summary">Region: official district. Updated: 1 hour ago. Advisory: refresh arrival sequence and parking control.</p></article><article class="alert-card filter-card" data-category="medium"><header><h3>Communications degradation</h3><span class="status-pill status-medium">Medium</span></header><p class="alert-summary">Region: provincial area. Updated: 90 minutes ago. Advisory: confirm fallback contact channels.</p></article><article class="alert-card filter-card" data-category="low"><header><h3>Weather-related route slowdown</h3><span class="status-pill status-low">Low</span></header><p class="alert-summary">Region: mountain corridor. Updated: 50 minutes ago. Advisory: adjust departure windows.</p></article></div></div></section>
'@

$aboutMain = @'
<section class="section"><div class="container grid-2"><div class="surface-card"><h3>Who we are</h3><p>SECURIDE 24 is positioned as a premium advisory and coordination platform serving organizations, executives, delegations, and high-value travelers operating in complex environments.</p></div><div class="surface-card"><h3>Why clients choose us</h3><ul class="list-clean"><li>Calm executive-facing communication</li><li>Regional depth with international standards</li><li>Discreet coordination and structured escalation</li><li>Clear separation between services, products, and capabilities</li></ul></div></div></section>
<section class="section section-tight"><div class="container grid-3"><article class="value-card"><h3>Operating philosophy</h3><p>Reduce uncertainty, preserve continuity, and support better decisions under pressure.</p></article><article class="value-card"><h3>Regional depth</h3><p>Ground-informed perspective for Pakistan and Afghanistan risk environments.</p></article><article class="value-card"><h3>International standards</h3><p>Governance-minded reporting style suited to global clients and institutional audiences.</p></article></div></section>
'@

$leadershipMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Selected experts</span><h2>Advisory profiles built for credibility, discretion, and operational judgment.</h2></div><div class="card-grid"><article class="expert-card"><div class="expert-avatar">AM</div><h3>Ahmad Malik</h3><p>Role: Director, Global Operations</p><p class="card-note">Region: South Asia | Focus: executive movement, operational coordination, continuity support | Languages: English, Urdu</p></article><article class="expert-card"><div class="expert-avatar">YS</div><h3>Yasir Shah</h3><p>Role: Director, Risk Intelligence and Strategic Analysis</p><p class="card-note">Region: Pakistan and Afghanistan | Focus: intelligence interpretation, leadership briefings, advisory framing</p></article><article class="expert-card"><div class="expert-avatar">TH</div><h3>Tufail Khan</h3><p>Role: Director, Global Risk Management</p><p class="card-note">Sector focus: corporate, project environments, governance assurance</p></article><article class="expert-card"><div class="expert-avatar">MH</div><h3>Masood Haider</h3><p>Role: Senior Manager, Global Travel Risk</p><p class="card-note">Focus: movement assurance, principal protection logic, travel readiness.</p></article><article class="expert-card"><div class="expert-avatar">AN</div><h3>Imran Noor</h3><p>Role: Senior Manager, Operations Coordination</p><p class="card-note">Focus: escalation rhythm, partner coordination, response support.</p></article><article class="expert-card"><div class="expert-avatar">SR</div><h3>Sara Rose</h3><p>Role: Manager, Client Success and Strategic Accounts</p><p class="card-note">Focus: client continuity, briefing cadence, service alignment.</p></article></div></div></section>
'@

$methodMain = @'
<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Signal to continuity</span><h2>A structured methodology from discovery through monitoring and escalation.</h2></div><ol class="timeline-list"><li><span class="timeline-index">1</span><div><strong>Discovery</strong><p>We define the client context, movement pattern, leadership priorities, and exposure assumptions.</p></div></li><li><span class="timeline-index">2</span><div><strong>Risk framing</strong><p>We convert location and activity context into a usable risk picture for decision-makers.</p></div></li><li><span class="timeline-index">3</span><div><strong>Planning</strong><p>We align movement, liaison, protective, and escalation assumptions before activity begins.</p></div></li><li><span class="timeline-index">4</span><div><strong>Monitoring</strong><p>We track changes, validate local developments, and maintain situational awareness.</p></div></li><li><span class="timeline-index">5</span><div><strong>Escalation</strong><p>We support structured updates and decision points when conditions deteriorate.</p></div></li><li><span class="timeline-index">6</span><div><strong>Continuity support</strong><p>We help preserve operational rhythm and leadership confidence during disruption.</p></div></li></ol></div></section>
'@

$governanceMain = @'
<section class="section"><div class="container grid-2"><article class="surface-card"><h3>Governance model</h3><p>London-governed presentation discipline with clear accountability for partner coordination and advisory outputs.</p></article><article class="surface-card"><h3>Compliance approach</h3><p>Documentation, oversight, and escalation are handled with discretion, clarity, and client confidence in mind.</p></article><article class="surface-card"><h3>Confidentiality</h3><p>Client identities, routes, schedules, and exposure patterns are handled on a need-to-know basis.</p></article><article class="surface-card"><h3>Escalation protocol</h3><p>Structured thresholds ensure faster decisions and cleaner leadership reporting when circumstances shift.</p></article></div></section>
'@

$contactMain = @'
<section class="section"><div class="container contact-layout"><div class="contact-card"><h2>Consultation request</h2><p class="card-note">Tell us about your operating environment, travel profile, or current requirement. For urgent matters, note the time sensitivity in your message.</p><form id="consultationForm"><div class="form-grid"><label>Full name<input type="text" name="name" required></label><label>Organization<input type="text" name="org" required></label><label>Email<input type="email" name="email" required></label><label>Phone<input type="tel" name="phone"></label><label>Sector<select name="sector"><option>Corporate</option><option>Diplomatic</option><option>NGO / Humanitarian</option><option>Family Office</option><option>Investor</option><option>Project Environment</option></select></label><label>Requirement<select name="requirement"><option>Risk Intelligence</option><option>Executive Mobility</option><option>Protective Coordination</option><option>Crisis Leadership Support</option></select></label></div><label>Message<textarea name="message" placeholder="Example: We are planning a senior visit into a dynamic operating environment and need pre-travel advisory support."></textarea></label><button class="btn btn-primary" type="submit">Submit Consultation Request</button><p class="form-note">Response expectation: advisory team reply within one business day. Urgent travel and incident matters are prioritized faster.</p><div class="success-message" id="formSuccess">Thank you. Your consultation request has been captured for follow-up.</div></form></div><aside class="contact-card"><h3>Contact and coverage</h3><ul class="contact-details"><li><strong>Email</strong><br>social@securide24.com</li><li><strong>Phone / WhatsApp</strong><br>+1 (914) 520-6519</li><li><strong>Governance hub</strong><br>London, United Kingdom</li><li><strong>Regional coordination</strong><br>Lahore, Pakistan</li><li><strong>Sectors served</strong><br>Executives, delegations, investors, NGOs, project teams, and official visits.</li></ul><div class="cta-band"><span class="eyebrow">Urgent advisory</span><h3>Need time-sensitive support?</h3><p>Use the consultation form for movement planning, executive travel, or incident support requirements.</p></div></aside></div></section>
'@

$pillarsPage = Get-InnerPage -Root '../../' -Page 'pillars' -Title 'Advisory Pillars | SECURIDE 24' -Description 'Overview of the four flagship advisory pillars.' -Eyebrow 'Advisory pillars' -HeroTitle 'A clearer, more commercial service architecture.' -HeroText 'The website now separates flagship pillars, intelligence products, and delivery capabilities so clients immediately understand what SECURIDE 24 does and how it delivers.' -HeroCard '<ul><li>Who it is for</li><li>Operating challenges it solves</li><li>Key deliverables</li><li>Supporting capabilities</li></ul>' -MainHtml $pillarsMain
$riskPage = Get-InnerPage -Root '../../' -Page 'risk-intelligence' -Title 'Risk Intelligence | SECURIDE 24' -Description 'Monitoring, assessment, and executive briefings for leaders in complex environments.' -Eyebrow 'Flagship pillar' -HeroTitle 'Risk Intelligence for decision clarity and exposure awareness.' -HeroText 'Intelligence-led monitoring and analysis designed to give leaders a sharper understanding of what matters to movement, continuity, and reputation.' -HeroCard '<ul><li>Executive signals</li><li>Country risk snapshots</li><li>Leadership briefings</li><li>Monitoring and escalation</li></ul>' -MainHtml $riskMain
$mobilityPage = Get-InnerPage -Root '../../' -Page 'executive-mobility' -Title 'Executive Mobility | SECURIDE 24' -Description 'Secure movement planning and advisory support for executive travel.' -Eyebrow 'Flagship pillar' -HeroTitle 'Executive Mobility built for high-consequence travel.' -HeroText 'We help leaders move with greater confidence through dynamic environments by combining planning, advisories, liaison, and route assurance.' -HeroCard '<ul><li>Pre-travel risk packs</li><li>Movement assurance</li><li>Route contingencies</li><li>Discreet coordination</li></ul>' -MainHtml $mobilityMain
$protectivePage = Get-InnerPage -Root '../../' -Page 'protective-coordination' -Title 'Protective Coordination | SECURIDE 24' -Description 'Protective planning and discreet coordination for exposed executives and delegations.' -Eyebrow 'Flagship pillar' -HeroTitle 'Protective Coordination without unnecessary visibility.' -HeroText 'A premium coordination model for executive exposure, sensitive visits, and event-linked protective needs.' -HeroCard '<ul><li>Protective planning</li><li>Venue and route review</li><li>Partner alignment</li><li>Escalation readiness</li></ul>' -MainHtml $protectiveMain
$crisisPage = Get-InnerPage -Root '../../' -Page 'crisis-leadership' -Title 'Crisis Leadership Support | SECURIDE 24' -Description 'Structured crisis updates, escalation support, and continuity advisory.' -Eyebrow 'Flagship pillar' -HeroTitle 'Crisis Leadership Support for fast-moving events.' -HeroText 'When conditions deteriorate, leaders need structure, clarity, and disciplined escalation rather than noise.' -HeroCard '<ul><li>Crisis flash updates</li><li>Leadership readouts</li><li>Incident escalation</li><li>Continuity support</li></ul>' -MainHtml $crisisMain
$productsPage = Get-InnerPage -Root '../../' -Page 'products' -Title 'Intelligence Products | SECURIDE 24' -Description 'Productized intelligence outputs for executives and organizations.' -Eyebrow 'Intelligence products' -HeroTitle 'Advisory outputs designed for real client use.' -HeroText 'Each product exists to support a defined decision: a trip, a visit, an escalation point, or a leadership update.' -HeroCard '<ul><li>What it is</li><li>Why it matters</li><li>Who uses it</li><li>Delivery format</li></ul>' -MainHtml $productsMain
$capabilitiesPage = Get-InnerPage -Root '../../' -Page 'capabilities' -Title 'Capabilities | SECURIDE 24' -Description 'Operational delivery capabilities supporting the advisory pillars.' -Eyebrow 'Operational enablers' -HeroTitle 'Capabilities that power delivery without blurring the offer.' -HeroText 'These capabilities underpin the service model and are intentionally presented as enablers rather than duplicate services.' -HeroCard '<ul><li>Monitoring and Watch Desk</li><li>Protective Planning</li><li>Secure Mobility Planning</li><li>Incident Escalation</li></ul>' -MainHtml $capabilitiesMain
$industriesPage = Get-InnerPage -Root '../../' -Page 'industries' -Title 'Industries | SECURIDE 24' -Description 'Industry-specific risk advisory and mobility support.' -Eyebrow 'Sectors served' -HeroTitle 'Support tailored to sector exposure and stakeholder expectations.' -HeroText 'Different sectors face different pressures. The site now explains those differences in a clearer, more executive-friendly structure.' -HeroCard '<ul><li>Typical risks</li><li>What support is needed</li><li>How SECURIDE 24 helps</li><li>Relevant services and products</li></ul>' -MainHtml $industriesMain
$caseStudiesPage = Get-InnerPage -Root '../../' -Page 'case-studies' -Title 'Case Studies | SECURIDE 24' -Description 'Case studies on executive mobility, intelligence, and crisis support.' -Eyebrow 'Selected assignments' -HeroTitle 'Case studies with leadership relevance and operational outcomes.' -HeroText 'These examples show how intelligence, mobility planning, and escalation support combine in practical client contexts.' -HeroCard '<ul><li>Client challenge</li><li>Operating environment</li><li>Response model</li><li>Leadership impact</li></ul>' -MainHtml $casesMain
$insightsPage = Get-InnerPage -Root '../../' -Page 'insights' -Title 'Insights | SECURIDE 24' -Description 'Editorial analysis and briefings on risk and executive travel.' -Eyebrow 'Intelligence and analysis' -HeroTitle 'Insights for leaders navigating uncertainty.' -HeroText 'Thought leadership, operational analysis, and executive briefings presented in a clean editorial format.' -HeroCard '<ul><li>Editorial tone</li><li>Clear categories</li><li>Executive-facing analysis</li><li>Operational relevance</li></ul>' -MainHtml $insightsMain
$alertsPage = Get-InnerPage -Root '../../' -Page 'alerts' -Title 'Active Alerts | SECURIDE 24' -Description 'Operational alerts and monitoring updates for dynamic environments.' -Eyebrow 'Operational monitoring' -HeroTitle 'Active Alerts designed to feel operational, not editorial.' -HeroText 'Short-form alert cards help distinguish time-sensitive developments from broader thought leadership and analysis.' -HeroCard '<ul><li>Status indicator</li><li>Region</li><li>Severity</li><li>Time updated</li></ul>' -MainHtml $alertsMain
$aboutPage = Get-InnerPage -Root '../../' -Page 'about' -Title 'About | SECURIDE 24' -Description 'About SECURIDE 24 and its intelligence-led positioning.' -Eyebrow 'About SECURIDE 24' -HeroTitle 'A premium advisory posture for complex operating environments.' -HeroText 'We are not presented as a guard company. The new site positions SECURIDE 24 as an intelligence-led advisory and coordination partner for executive-facing risk needs.' -HeroCard '<ul><li>Who we are</li><li>Operating philosophy</li><li>Regional depth</li><li>International standards</li></ul>' -MainHtml $aboutMain
$leadershipPage = Get-InnerPage -Root '../../' -Page 'leadership' -Title 'Leadership | SECURIDE 24' -Description 'Leadership and expert profiles.' -Eyebrow 'Leadership and experts' -HeroTitle 'Expert profiles with authority, focus, and sector relevance.' -HeroText 'A more credible advisory brand requires visible expertise presented in a disciplined, premium format.' -HeroCard '<ul><li>Authority statements</li><li>Regional focus</li><li>Sector familiarity</li><li>Advisory strengths</li></ul>' -MainHtml $leadershipMain
$methodPage = Get-InnerPage -Root '../../' -Page 'methodology' -Title 'Methodology | SECURIDE 24' -Description 'How SECURIDE 24 works from signal to advisory to coordination.' -Eyebrow 'How we work' -HeroTitle 'From signal to continuity through a disciplined method.' -HeroText 'The methodology page explains how discovery, risk framing, planning, monitoring, escalation, and continuity support fit together.' -HeroCard '<ul><li>Discovery</li><li>Risk framing</li><li>Planning</li><li>Monitoring and escalation</li></ul>' -MainHtml $methodMain
$governancePage = Get-InnerPage -Root '../../' -Page 'governance' -Title 'Governance and Compliance | SECURIDE 24' -Description 'Governance, compliance, confidentiality, and escalation protocol.' -Eyebrow 'Institutional trust' -HeroTitle 'Governance and compliance content built for credibility.' -HeroText 'This page reinforces discretion, documentation discipline, partner oversight, and escalation governance in a calm executive style.' -HeroCard '<ul><li>Governance model</li><li>Compliance approach</li><li>Confidentiality</li><li>Escalation protocol</li></ul>' -MainHtml $governanceMain
$contactPage = Get-InnerPage -Root '../../' -Page 'contact' -Title 'Contact | SECURIDE 24' -Description 'Contact SECURIDE 24 for consultations and advisory support.' -Eyebrow 'Contact' -HeroTitle 'Speak with our advisory team.' -HeroText 'Use the contact page for consultation requests, executive travel support discussions, and high-priority advisory requirements.' -HeroCard '<ul><li>Response expectations</li><li>Sectors served</li><li>Urgent advisory support</li><li>Regional service coverage</li></ul>' -MainHtml $contactMain

$files = @{
    'c:\Data\VSC\frontend\css\base.css' = $baseCss
    'c:\Data\VSC\frontend\css\layout.css' = $layoutCss
    'c:\Data\VSC\frontend\css\components.css' = $componentsCss
    'c:\Data\VSC\frontend\css\header.css' = $headerCss
    'c:\Data\VSC\frontend\css\home.css' = $homeCss
    'c:\Data\VSC\frontend\css\pages.css' = $pagesCss
    'c:\Data\VSC\frontend\js\app.js' = $appJs
    'c:\Data\VSC\frontend\index.html' = $homePage
    'c:\Data\VSC\frontend\pages\solutions\index.html' = $pillarsPage
    'c:\Data\VSC\frontend\pages\solutions\risk-intelligence-monitoring.html' = $riskPage
    'c:\Data\VSC\frontend\pages\solutions\executive-mobility-secure-travel.html' = $mobilityPage
    'c:\Data\VSC\frontend\pages\solutions\executive-protection-coordination.html' = $protectivePage
    'c:\Data\VSC\frontend\pages\solutions\crisis-response-incident-coordination.html' = $crisisPage
    'c:\Data\VSC\frontend\pages\intelligence\index.html' = $productsPage
    'c:\Data\VSC\frontend\pages\capabilities\index.html' = $capabilitiesPage
    'c:\Data\VSC\frontend\pages\industries\index.html' = $industriesPage
    'c:\Data\VSC\frontend\pages\intelligence\case-studies.html' = $caseStudiesPage
    'c:\Data\VSC\frontend\pages\intelligence\insights.html' = $insightsPage
    'c:\Data\VSC\frontend\pages\intelligence\active-alerts.html' = $alertsPage
    'c:\Data\VSC\frontend\pages\about\index.html' = $aboutPage
    'c:\Data\VSC\frontend\pages\about\leadership.html' = $leadershipPage
    'c:\Data\VSC\frontend\pages\about\methodology.html' = $methodPage
    'c:\Data\VSC\frontend\pages\about\governance.html' = $governancePage
    'c:\Data\VSC\frontend\pages\contact\index.html' = $contactPage
}

foreach ($entry in $files.GetEnumerator()) {
    Write-Utf8File -Path $entry.Key -Content $entry.Value
}

Write-Host 'Premium static site rebuild complete.'
