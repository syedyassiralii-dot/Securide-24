// app.js - bootstraps site

document.addEventListener('DOMContentLoaded', () => {

  const registerServiceWorker = () => {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) {
      return;
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {
        // SW registration failure should not block site behavior.
      });
    });
  };

  registerServiceWorker();

  const initSiteFooter = () => {
    const footer = document.querySelector('.site-footer');
    const footerContainer = footer?.querySelector('.container');

    if (!footerContainer || footer.dataset.enhancedFooter === 'true') {
      return;
    }

    const pathname = window.location.pathname.toLowerCase();
    const rootPrefix = /\/pages\//.test(pathname) ? '../../' : '';
    const year = new Date().getFullYear();

    const buildLink = (relativePath) => `${rootPrefix}${relativePath}`;

    const links = {
      home: buildLink('index.html'),
      about: buildLink('pages/about/index.html'),
      solutions: buildLink('pages/solutions/index.html'),
      capabilities: buildLink('pages/capabilities/index.html'),
      industries: buildLink('pages/industries/index.html'),
      intelligence: buildLink('pages/intelligence/index.html'),
      contact: buildLink('pages/contact/index.html'),
      riskMonitoring: buildLink('pages/solutions/risk-intelligence-monitoring.html'),
      mobility: buildLink('pages/solutions/executive-mobility-secure-travel.html'),
      protection: buildLink('pages/solutions/executive-protection-coordination.html'),
      crisis: buildLink('pages/solutions/crisis-response-incident-coordination.html')
    };

    footer.dataset.enhancedFooter = 'true';
    footerContainer.innerHTML = `
      <div class="footer-content footer-content-rich">
        <section class="footer-panel footer-brand-panel" aria-label="SECURIDE 24 overview">
          <a class="footer-brand-lockup" href="${links.home}" aria-label="SECURIDE 24 home">
            <img src="${buildLink('assets/images/logo.webp')}" alt="SECURIDE 24" class="footer-brand-logo" loading="lazy" decoding="async" />
            <span class="footer-brand-name">SECURIDE 24</span>
          </a>
          <p class="footer-brand-text">SECURIDE 24 delivers intelligence-led risk advisory, executive protection, and secure mobility planning for executives, diplomats, and organisations operating in complex environments.</p>
        </section>
        <section class="footer-panel" aria-label="Quick links">
          <h4>Quick Links</h4>
          <ul class="footer-link-list">
            <li><a href="${links.home}">Home</a></li>
            <li><a href="${links.about}">About</a></li>
            <li><a href="${links.solutions}">Solutions</a></li>
            <li><a href="${links.capabilities}">Capabilities</a></li>
            <li><a href="${links.industries}">Industries</a></li>
            <li><a href="${links.contact}">Contact</a></li>
          </ul>
        </section>
        <section class="footer-panel" aria-label="Follow SECURIDE 24">
          <h4>Follow Us On</h4>
          <ul class="footer-link-list footer-social-list">
            <li>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <span class="footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.01 2.01 0 0 0 3.25 5c0 1.1.9 2 2 2s2-.9 2-2a2.01 2.01 0 0 0-2-2ZM20.75 12.65c0-3.46-1.85-5.07-4.32-5.07-1.99 0-2.88 1.1-3.38 1.87V8.5H9.67c.04.63 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.68.13-.92.27-.68.89-1.38 1.93-1.38 1.36 0 1.91 1.04 1.91 2.57V20H20.4v-6.96c0-.14.01-.26.01-.39Z" />
                  </svg>
                </span>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                <span class="footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.77-6.24L6.67 22H3.56l7.24-8.27L1 2h6.26l4.31 5.69L18.9 2Zm-1.07 18.17h1.72L6.32 3.74H4.47l13.36 16.43Z" />
                  </svg>
                </span>
                <span>X</span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <span class="footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M23.5 6.2a3.06 3.06 0 0 0-2.15-2.16C19.46 3.5 12 3.5 12 3.5s-7.46 0-9.35.54A3.06 3.06 0 0 0 .5 6.2 32.4 32.4 0 0 0 0 12a32.4 32.4 0 0 0 .5 5.8 3.06 3.06 0 0 0 2.15 2.16c1.89.54 9.35.54 9.35.54s7.46 0 9.35-.54a3.06 3.06 0 0 0 2.15-2.16A32.4 32.4 0 0 0 24 12a32.4 32.4 0 0 0-.5-5.8ZM9.6 15.73V8.27L16 12l-6.4 3.73Z" />
                  </svg>
                </span>
                <span>YouTube</span>
              </a>
            </li>
          </ul>
          <p class="footer-note">Follow SECURIDE 24 for intelligence updates, security insights, and operational briefings.</p>
        </section>
        <section class="footer-panel" aria-label="Contact details">
          <h4>Contact</h4>
          <ul class="footer-link-list footer-contact-details">
            <li>
              <a class="footer-contact-row" href="mailto:social@securide24.com" aria-label="Email SECURIDE 24">
                <span class="footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2.17-.47L12 10.56l6.83-4.28a.75.75 0 0 0-.58-.28H5.75c-.2 0-.4.1-.58.28Z" />
                  </svg>
                </span>
                <span class="footer-contact-inline"><span class="footer-contact-value">social@securide24.com</span></span>
              </a>
            </li>
            <li>
              <a class="footer-contact-row" href="https://wa.me/19145206519" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp SECURIDE 24">
                <span class="footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12.01 0C5.39 0 0 5.38 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.16-1.57A11.95 11.95 0 0 0 12 24h.01C18.63 24 24 18.62 24 12a11.9 11.9 0 0 0-3.48-8.52Zm-8.51 18.5h-.01c-1.8 0-3.56-.49-5.09-1.42l-.36-.22-3.66.93.98-3.56-.24-.37a9.93 9.93 0 1 1 8.38 4.64Zm5.44-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.45a8.9 8.9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.14-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.06 2.88 1.2 3.08.15.2 2.08 3.17 5.03 4.45.71.31 1.26.49 1.69.63.71.22 1.35.19 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                </span>
                <span class="footer-contact-inline"><span class="footer-contact-value">+1 (914) 520-6519</span></span>
              </a>
            </li>
            <li>
              <div class="footer-contact-row">
                <span class="footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M12 2a7 7 0 0 1 7 7c0 4.78-4.74 9.15-6.35 10.47a1 1 0 0 1-1.3 0C9.74 18.15 5 13.78 5 9a7 7 0 0 1 7-7Zm0 4.5A2.5 2.5 0 1 0 12 11.5a2.5 2.5 0 0 0 0-5Z" />
                  </svg>
                </span>
                <span class="footer-contact-inline footer-contact-inline-stack"><span class="footer-contact-label">Headquarters (UK)</span><span class="footer-contact-value">London, United Kingdom</span></span>
              </div>
            </li>
            <li>
              <div class="footer-contact-row">
                <span class="footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M12 2a7 7 0 0 1 7 7c0 4.78-4.74 9.15-6.35 10.47a1 1 0 0 1-1.3 0C9.74 18.15 5 13.78 5 9a7 7 0 0 1 7-7Zm0 4.5A2.5 2.5 0 1 0 12 11.5a2.5 2.5 0 0 0 0-5Z" />
                  </svg>
                </span>
                <span class="footer-contact-inline footer-contact-inline-stack"><span class="footer-contact-label">Regional Operations (Pakistan)</span><span class="footer-contact-value">Lahore, Pakistan</span></span>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} SECURIDE 24. All rights reserved.</p>
        <p>Worldwide risk advisory, protective coordination, and secure mobility support.</p>
      </div>
    `;
  };

  initSiteFooter();

  const initCaseStudyCardLinks = () => {
    const pathname = window.location.pathname.toLowerCase();
    const isOperationalSubpage = /\/(industries|solutions|capabilities)\//.test(pathname) && !/\/index\.html$/.test(pathname);
    if (!isOperationalSubpage) {
      return;
    }

    const resolveCaseStudyKey = (card) => {
      const heading = (card.querySelector('h3')?.textContent || '').trim().toLowerCase();
      const cardText = `${heading} ${pathname}`;

      if (/(delegation|diplomat|venue|event organiser|event security|event)/.test(cardText)) {
        return 'delegation-venue-security';
      }

      if (/(cross-border|cross border|ngo|project team|jurisdiction|regional project|team protection)/.test(cardText)) {
        return 'cross-border-team-protection';
      }

      if (/(evacuation|drill|incident|response rehearsal)/.test(cardText)) {
        return 'incident-evacuation-drill';
      }

      if (/(crisis|command|handover|leadership|governance|advisory|resilien)/.test(cardText)) {
        return 'crisis-command-handover';
      }

      if (/(route|mobility|travel|movement|transit|convoy|reroute|visitor|executive)/.test(cardText)) {
        return 'executive-convoy-reroute';
      }

      return 'summit-route-hardening';
    };

    const caseStudyCards = Array.from(document.querySelectorAll('.solution-detail-card')).filter((card) => {
      const label = card.querySelector('.card-label');
      return label && label.textContent.trim().toLowerCase() === 'case study';
    });

    if (!caseStudyCards.length) {
      return;
    }

    caseStudyCards.forEach((card) => {
      const contentKey = resolveCaseStudyKey(card);
      const targetHref = `../intelligence/case-studies.html#${contentKey}`;

      card.classList.add('case-study-card-link');
      card.dataset.caseStudyHref = targetHref;

      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }

      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `${card.querySelector('h3')?.textContent?.trim() || 'Case study'} - open case studies page`);

      const openCaseStudy = () => {
        window.location.assign(targetHref);
      };

      card.addEventListener('click', (event) => {
        if (event.target.closest('a[href], button')) {
          return;
        }

        openCaseStudy();
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCaseStudy();
        }
      });
    });
  };

  const initSolutionsTeamProfiles = () => {
    const leadershipProfiles = [
      {
        name: 'Muhammad Ahmad Malik',
        designation: 'Director — Global Operations',
        experience: 'Leads global operations delivery, field execution standards, and cross-region mission coordination.'
      },
      {
        name: 'Sayyed Yasir Shah',
        designation: 'Director — Risk Intelligence & Strategic Analysis',
        experience: 'Directs intelligence interpretation, strategic risk analysis, and decision-support advisory outputs.'
      },
      {
        name: 'Waleed Haider',
        designation: 'Director — Business Development & Strategic Partnerships',
        experience: 'Builds strategic partnerships and growth pathways across complex security and risk environments.'
      }
    ];

    const operationalProfiles = [
      {
        name: 'Tufail Khan',
        designation: 'Director — Global Risk Management',
        experience: 'Oversees enterprise risk frameworks, governance controls, and multi-market risk mitigation programs.'
      },
      {
        name: 'Masood Kharal',
        designation: 'Senior Manager — Global Travel Risk & Protective Services',
        experience: 'Leads secure travel risk strategy, protective services integration, and mobility assurance planning.'
      },
      {
        name: 'Imran Noor',
        designation: 'Senior Manager — Global Operations Coordination',
        experience: 'Coordinates operational readiness, command support rhythms, and incident response alignment.'
      },
      {
        name: 'Ayesha Arooj',
        designation: 'Senior Manager — Global Sales & Client Solutions',
        experience: 'Aligns client requirements to practical security solutions and long-term service outcomes.'
      },
      {
        name: 'Afaq Durez Khan',
        designation: 'Senior Manager — Executive Protection & Secure Mobility (Asia)',
        experience: 'Manages Asia-focused executive protection and secure mobility operations in dynamic contexts.'
      },
      {
        name: 'Sara Rose',
        designation: 'Manager — Client Success & Strategic Accounts',
        experience: 'Ensures service continuity, account performance, and strategic stakeholder alignment.'
      },
      {
        name: 'Maria K',
        designation: 'Manager — Global Meetings, Events & Client Coordination',
        experience: 'Coordinates secure event delivery and client-facing operational planning at global scale.'
      },
      {
        name: 'Mike Jr.',
        designation: 'Manager — Compliance, Governance & Standards',
        experience: 'Leads compliance assurance, governance implementation, and quality standards alignment.'
      }
    ];

    const teamProfiles = [...leadershipProfiles, ...operationalProfiles];

    const profilesByName = teamProfiles.reduce((map, profile) => {
      map[profile.name] = profile;
      return map;
    }, {});

    const fixedRoleToMemberRules = [
      { matcher: /(executive protection|protective|principal)/i, member: 'Afaq Durez Khan' },
      { matcher: /(travel|mobility|route|movement|transit|journey)/i, member: 'Masood Kharal' },
      { matcher: /(risk intelligence|intelligence|threat|analysis|advisory|strategy|resilience)/i, member: 'Tufail Khan' },
      { matcher: /(incident|response|coordination|command|field|operation|operations)/i, member: 'Muhammad Ashraf' },
      { matcher: /(compliance|governance|standard|standards|audit|policy)/i, member: 'Mike Jr.' },
      { matcher: /(meeting|meetings|event|events|venue)/i, member: 'Maria K' },
      { matcher: /(client success|strategic accounts|accounts|stakeholder)/i, member: 'Sara Rose' },
      { matcher: /(sales|client solutions|solution|engagement|business development)/i, member: 'Ayesha Arooj' }
    ];

    const fixedFallbackBySection = {
      solutions: ['Muhammad Ashraf', 'Tufail Khan', 'Masood Kharal', 'Afaq Durez Khan', 'Sara Rose', 'Maria K', 'Mike Jr.', 'Ayesha Arooj'],
      industries: ['Ayesha Arooj', 'Sara Rose', 'Muhammad Ashraf', 'Masood Kharal', 'Tufail Khan', 'Maria K', 'Mike Jr.', 'Afaq Durez Khan'],
      capabilities: ['Tufail Khan', 'Muhammad Ashraf', 'Masood Kharal', 'Afaq Durez Khan', 'Mike Jr.', 'Sara Rose', 'Maria K', 'Ayesha Arooj']
    };

    const cardSelectors = [
      '.solutions24-people-grid article',
      '.solution-detail-people-grid .people-card:not(.people-card-logo)',
      '.about24-people-grid .about24-person-card'
    ];

    const cards = Array.from(document.querySelectorAll(cardSelectors.join(', ')));
    if (!cards.length) {
      return;
    }

    const pathname = window.location.pathname.toLowerCase();
    const operationalSectionMatch = pathname.match(/\/(industries|solutions|capabilities)\//);
    const operationalSection = operationalSectionMatch ? operationalSectionMatch[1] : null;
    const isOperationalPage = Boolean(operationalSection);
    const pagePool = isOperationalPage ? operationalProfiles : teamProfiles;

    const getOrCreateProfileLayer = () => {
      const existingDrawer = document.querySelector('[data-profile-drawer]');
      const existingBackdrop = document.querySelector('[data-profile-backdrop]');

      if (existingDrawer && existingBackdrop) {
        return {
          drawer: existingDrawer,
          backdrop: existingBackdrop,
          closeBtn: existingDrawer.querySelector('.solutions24-profile-close'),
          nameEl: existingDrawer.querySelector('[data-profile-field="name"]'),
          designationEl: existingDrawer.querySelector('[data-profile-field="designation"]'),
          experienceEl: existingDrawer.querySelector('[data-profile-field="experience"]')
        };
      }

      const backdrop = document.createElement('div');
      backdrop.className = 'solutions24-profile-backdrop';
      backdrop.hidden = true;
      backdrop.setAttribute('data-profile-backdrop', '');

      const drawer = document.createElement('aside');
      drawer.className = 'solutions24-profile-drawer';
      drawer.setAttribute('data-profile-drawer', '');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.innerHTML = `
        <button class="solutions24-profile-close" type="button" aria-label="Close profile panel">&times;</button>
        <p class="solutions24-profile-kicker">Team Profile</p>
        <h3 class="solutions24-profile-name" data-profile-field="name">SECURIDE 24 Team Member</h3>
        <p class="solutions24-profile-designation" data-profile-field="designation">Security & Risk Professional</p>
        <p class="solutions24-profile-experience" data-profile-field="experience">Operationally experienced specialist supporting security risk management and incident coordination.</p>
      `;

      document.body.append(backdrop, drawer);

      return {
        drawer,
        backdrop,
        closeBtn: drawer.querySelector('.solutions24-profile-close'),
        nameEl: drawer.querySelector('[data-profile-field="name"]'),
        designationEl: drawer.querySelector('[data-profile-field="designation"]'),
        experienceEl: drawer.querySelector('[data-profile-field="experience"]')
      };
    };

    const profileLayer = getOrCreateProfileLayer();
    const { drawer, backdrop, closeBtn, nameEl, designationEl, experienceEl } = profileLayer;

    if (!drawer || !backdrop || !nameEl || !designationEl || !experienceEl) {
      return;
    }

    const extractText = (element, selectors) => {
      for (const selector of selectors) {
        const target = element.querySelector(selector);
        if (target) {
          const value = (target.textContent || '').trim();
          if (value) {
            return value;
          }
        }
      }
      return '';
    };

    const resolveProfile = (card) => {
      const heading = extractText(card, ['h3', 'h4']);
      const paragraph = extractText(card, ['.people-info p', 'p']);
      const hasStructuredProfile = Boolean(card.dataset.profileName || card.dataset.profileDesignation || card.dataset.profileExperience);

      const name = (card.dataset.profileName || heading || 'SECURIDE 24 Team Member').trim();
      const designation = (card.dataset.profileDesignation
        || (hasStructuredProfile ? '' : heading)
        || extractText(card, ['p'])
        || 'Security & Risk Professional').trim();
      const experience = (card.dataset.profileExperience
        || paragraph
        || 'Operationally experienced specialist supporting security risk management and incident coordination.').trim();

      return {
        name,
        designation,
        experience
      };
    };

    const openProfile = (card) => {
      const profile = resolveProfile(card);
      nameEl.textContent = profile.name;
      designationEl.textContent = profile.designation;
      experienceEl.textContent = profile.experience;

      cards.forEach((item) => item.classList.toggle('is-active', item === card));
      backdrop.hidden = false;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      Utils.lockScroll();
    };

    const closeProfile = () => {
      cards.forEach((item) => item.classList.remove('is-active'));
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.hidden = true;

      if (typeof Navigation !== 'undefined' && typeof Navigation.canUnlockScroll === 'function') {
        if (Navigation.canUnlockScroll()) {
          Utils.unlockScroll();
        }
      } else {
        Utils.unlockScroll();
      }
    };

    const pickProfileForCard = (card, cardIndex) => {
      const roleSource = [
        card.dataset.profileDesignation || '',
        extractText(card, ['h3', 'h4']),
        extractText(card, ['.people-info p', 'p'])
      ].join(' ').toLowerCase();

      if (isOperationalPage) {
        const matchedRule = fixedRoleToMemberRules.find((rule) => rule.matcher.test(roleSource));
        if (matchedRule && profilesByName[matchedRule.member]) {
          return profilesByName[matchedRule.member];
        }

        const fallbackOrder = fixedFallbackBySection[operationalSection] || fixedFallbackBySection.solutions;
        const fallbackName = fallbackOrder[cardIndex % fallbackOrder.length];
        return profilesByName[fallbackName] || operationalProfiles[cardIndex % operationalProfiles.length];
      }

      return pagePool[cardIndex % pagePool.length];
    };

    cards.forEach((card, cardIndex) => {
      const profileByRole = pickProfileForCard(card, cardIndex);

      if (!card.dataset.profileName) {
        card.dataset.profileName = profileByRole.name;
      }

      if (!card.dataset.profileDesignation) {
        card.dataset.profileDesignation = profileByRole.designation;
      }

      if (!card.dataset.profileExperience) {
        card.dataset.profileExperience = profileByRole.experience;
      }

      const headingEl = card.querySelector('h3, h4');
      if (headingEl) {
        headingEl.textContent = card.dataset.profileName;
      }

      const infoParagraph = card.querySelector('.people-info p, p');
      if (infoParagraph) {
        infoParagraph.textContent = card.dataset.profileDesignation;
      }

      card.classList.add('team-profile-card');
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }
      if (!card.hasAttribute('role')) {
        card.setAttribute('role', 'button');
      }

      const open = () => openProfile(card);

      card.addEventListener('click', (event) => {
        const anchor = event.target.closest('a[href]');
        if (anchor) {
          event.preventDefault();
        }
        open();
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeProfile);
    }

    backdrop.addEventListener('click', closeProfile);

    Utils.onEscapeKey(() => {
      if (drawer.classList.contains('is-open')) {
        closeProfile();
      }
    });
  };



  const initMonitoringLeafletMap = () => {
    const el = document.getElementById('monitoringMap');
    const svg = document.querySelector('.monitoring-network-svg');
    if (!el || typeof window.L === 'undefined' || !svg) {
      return;
    }

    const map = window.L.map(el, {
      zoomControl: true,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: true,
      tap: true,
      touchZoom: true,
      minZoom: 1,
      maxZoom: 6,
      zoomSnap: 0.1,
      maxBounds: [[-85, -180], [85, 180]], // Tight world bounds to prevent empty space
      maxBoundsViscosity: 1.0 // Strongest viscosity to "lock" the map
    });

    // Fit entire world into view with dynamic padding
    const containerWidth = el.parentElement?.offsetWidth || el.offsetWidth;
    const containerHeight = el.parentElement?.offsetHeight || el.offsetHeight;
    const aspectRatio = containerWidth / containerHeight;
    
    // Adjust padding based on aspect ratio to maintain rectangular shape
    const horizontalPadding = aspectRatio > 1.5 ? 80 : 50;
    const verticalPadding = aspectRatio > 1.5 ? 40 : 50;
    
    map.fitBounds([[-85, -180], [85, 180]], { padding: [verticalPadding, horizontalPadding], animate: false });
    
    // After fitBounds, set minZoom to lock at this zoom level - prevents zooming out
    const calculatedZoom = map.getZoom();
    map.setMinZoom(calculatedZoom);

    // Force Leaflet to recalculate container size
    setTimeout(() => {
      map.invalidateSize(true);
      const w = el.parentElement?.offsetWidth || el.offsetWidth;
      const h = el.parentElement?.offsetHeight || el.offsetHeight;
      const ar = w / h;
      const hPad = ar > 1.5 ? 80 : 50;
      const vPad = ar > 1.5 ? 40 : 50;
      map.fitBounds([[-85, -180], [85, 180]], { padding: [vPad, hPad], animate: false });
      const zoom = map.getZoom();
      map.setMinZoom(zoom);
    }, 100);

    // Additional safety call after longer delay
    setTimeout(() => {
      map.invalidateSize(true);
      const w = el.parentElement?.offsetWidth || el.offsetWidth;
      const h = el.parentElement?.offsetHeight || el.offsetHeight;
      const ar = w / h;
      const hPad = ar > 1.5 ? 80 : 50;
      const vPad = ar > 1.5 ? 40 : 50;
      map.fitBounds([[-85, -180], [85, 180]], { padding: [vPad, hPad], animate: false });
      const zoom = map.getZoom();
      map.setMinZoom(zoom);
    }, 500);

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      noWrap: true, // Prevents the world from repeating horizontally
      bounds: [[-90, -180], [90, 180]] // Limits tile requests to the physical world
    }).addTo(map);

    const nodes = Array.from(document.querySelectorAll('.global-monitoring-map .monitoring-node[data-lat][data-lng]'));
    const nodesByClass = nodes.reduce((acc, node) => {
      const idMatch = node.className.match(/node-([a-z-]+)/);
      if (idMatch) {
        acc[idMatch[1]] = node;
      }
      return acc;
    }, {});

    const links = [
      { className: 'nl-1', from: 'uk-main', to: 'pk-main', bend: -0.12 },
      { className: 'nl-2', from: 'uk-main', to: 'europe-continent', bend: -0.22 },
      { className: 'nl-3', from: 'uk-main', to: 'africa-continent', bend: 0.14 },
      { className: 'nl-4', from: 'uk-main', to: 'na-continent', bend: -0.1 },
      { className: 'nl-5', from: 'uk-main', to: 'sa-continent', bend: 0.1 },
      { className: 'nl-6', from: 'uk-main', to: 'asia-continent', bend: -0.12 },
      { className: 'nl-7', from: 'uk-main', to: 'oceania-continent', bend: 0.08 },
      { className: 'nl-8', from: 'pk-main', to: 'europe-continent', bend: -0.08 },
      { className: 'nl-9', from: 'pk-main', to: 'africa-continent', bend: 0.16 },
      { className: 'nl-10', from: 'pk-main', to: 'asia-continent', bend: -0.18 },
      { className: 'nl-11', from: 'pk-main', to: 'na-continent', bend: 0.1 },
      { className: 'nl-12', from: 'pk-main', to: 'sa-continent', bend: 0.06 },
      { className: 'nl-13', from: 'pk-main', to: 'oceania-continent', bend: -0.06 }
    ];

    const getPointFromLatLong = (nodeEl) => {
      const lat = Number(nodeEl.dataset.lat);
      const lng = Number(nodeEl.dataset.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return map.latLngToContainerPoint([lat, lng]);
    };

    const buildCurvePath = (fromPoint, toPoint, bend = 0) => {
      const dx = toPoint.x - fromPoint.x;
      const dy = toPoint.y - fromPoint.y;
      const distance = Math.hypot(dx, dy) || 1;
      const normalX = -dy / distance;
      const normalY = dx / distance;
      const offset = Math.min(110, distance * Math.abs(bend));
      const direction = bend >= 0 ? 1 : -1;

      const controlX = (fromPoint.x + toPoint.x) / 2 + normalX * offset * direction;
      const controlY = (fromPoint.y + toPoint.y) / 2 + normalY * offset * direction;

      return `M${fromPoint.x.toFixed(1)},${fromPoint.y.toFixed(1)} Q${controlX.toFixed(1)},${controlY.toFixed(1)} ${toPoint.x.toFixed(1)},${toPoint.y.toFixed(1)}`;
    };

    const renderSync = () => {
      // 1. Position dots
      nodes.forEach((node) => {
        const point = getPointFromLatLong(node);
        if (point) {
          node.style.left = `${point.x}px`;
          node.style.top = `${point.y}px`;
        }
      });

      // 2. Position paths
      links.forEach((link) => {
        const path = svg.querySelector(`.${link.className}`);
        const fromNode = nodesByClass[link.from];
        const toNode = nodesByClass[link.to];
        if (!path || !fromNode || !toNode) return;

        const fromP = getPointFromLatLong(fromNode);
        const toP = getPointFromLatLong(toNode);
        if (fromP && toP) {
          path.setAttribute('d', buildCurvePath(fromP, toP, link.bend));
        }
      });
    };

    let frame = null;
    const scheduleSync = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        renderSync();
      });
    };

    renderSync();
    
    // Enforce minimum zoom to prevent map from shrinking too small
    let enforcedMinZoom = 1.5;
    map.on('zoomend', () => {
      const currentZoom = map.getZoom();
      if (currentZoom < enforcedMinZoom) {
        map.setZoom(enforcedMinZoom, { animate: false });
      }
    });
    
    map.on('zoom zoomstart zoomend move movestart moveend viewreset', scheduleSync);
    window.addEventListener('resize', () => {
      map.invalidateSize(true);
      const w = el.parentElement?.offsetWidth || el.offsetWidth;
      const h = el.parentElement?.offsetHeight || el.offsetHeight;
      const ar = w / h;
      const hPad = ar > 1.5 ? 80 : 50;
      const vPad = ar > 1.5 ? 40 : 50;
      map.fitBounds([[-85, -180], [85, 180]], { padding: [vPad, hPad], animate: false });
      const zoom = map.getZoom();
      map.setMinZoom(zoom);
      scheduleSync();
    }, { passive: true });
  };

  const monitoringToggleButton = document.querySelector('.monitoring-notify-btn');
  const monitoringRiskPanel = document.getElementById('monitoringRiskPanel');

  if (monitoringToggleButton && monitoringRiskPanel) {
    const setRiskPanelState = (isOpen) => {
      monitoringToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      monitoringRiskPanel.hidden = !isOpen;
    };

    setRiskPanelState(false);

    monitoringToggleButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = monitoringToggleButton.getAttribute('aria-expanded') === 'true';
      setRiskPanelState(!isOpen);
    });

    document.addEventListener('click', (event) => {
      if (monitoringRiskPanel.hidden) {
        return;
      }

      if (monitoringRiskPanel.contains(event.target) || monitoringToggleButton.contains(event.target)) {
        return;
      }

      setRiskPanelState(false);
    });
  }

  // Initialize all modules
  if (typeof Navigation !== 'undefined') {
    Navigation.init();
  }

  if (typeof Ticker !== 'undefined') {
    Ticker.init();
  }

  if (typeof Alerts !== 'undefined') {
    Alerts.init();
  }

  if (typeof Signals !== 'undefined') {
    Signals.init();
  }

  if (typeof Carousel !== 'undefined') {
    Carousel.init();
  }

  if (typeof ContactPanel !== 'undefined') {
    ContactPanel.init();
  }

  if (typeof Search !== 'undefined') {
    Search.init();
  }

  initSolutionsTeamProfiles();
  initCaseStudyCardLinks();
  initMonitoringLeafletMap();

  console.log('SECURIDE 24 initialized');
});

