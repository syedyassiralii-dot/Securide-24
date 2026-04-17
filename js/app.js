document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const root = body.dataset.root || "";
  const page = body.dataset.page || "";

  const navGroups = {
    pillars: [
      { href: `${root}pages/solutions/index.html`, label: "Overview", meta: "Four flagship advisory pillars" },
      { href: `${root}pages/solutions/risk-intelligence-monitoring.html`, label: "Risk Intelligence", meta: "Monitoring, assessment, executive briefings" },
      { href: `${root}pages/solutions/executive-mobility-secure-travel.html`, label: "Executive Mobility", meta: "Travel assurance and secure movement" },
      { href: `${root}pages/solutions/executive-protection-coordination.html`, label: "Protective Coordination", meta: "Discreet protective planning and liaison" },
      { href: `${root}pages/solutions/crisis-response-incident-coordination.html`, label: "Crisis Leadership Support", meta: "Structured escalation and continuity guidance" }
    ],
    intelligence: [
      { href: `${root}pages/intelligence/index.html`, label: "Intelligence Products", meta: "Structured client deliverables" },
      { href: `${root}pages/intelligence/insights.html`, label: "Insights", meta: "Editorial analysis and briefings" },
      { href: `${root}pages/intelligence/active-alerts.html`, label: "Active Alerts", meta: "Operational watch updates" },
      { href: `${root}pages/intelligence/case-studies.html`, label: "Case Studies", meta: "Outcome-led assignments and results" }
    ],
    about: [
      { href: `${root}pages/about/index.html`, label: "About", meta: "Positioning and operating philosophy" },
      { href: `${root}pages/about/leadership.html`, label: "Leadership", meta: "Expert profiles and authority" },
      { href: `${root}pages/about/methodology.html`, label: "Methodology", meta: "From signal to continuity" },
      { href: `${root}pages/about/governance.html`, label: "Governance", meta: "Oversight, discretion, and protocol" }
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

  const renderPanelLinks = (items) => items.map((item) => `
    <a href="${item.href}">
      <strong>${item.label}</strong>
      <span>${item.meta}</span>
    </a>`).join("");

  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="site-header">
        <div class="container">
          <a class="brand" href="${root}index.html" aria-label="SECURIDE 24 home">
            <span class="brand-mark">S24</span>
            <span class="brand-copy">
              <span>SECURIDE 24</span>
              <small class="brand-context">Security &amp; risk consultancy</small>
            </span>
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
              <span class="sr-only">Open menu</span>
              <span class="mobile-toggle-lines" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="mobile-toggle-text">Menu</span>
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

    const header = headerTarget.querySelector(".site-header");
    const activeKey = activeMap[page] || page;
    const activeItem = headerTarget.querySelector(`[data-nav="${activeKey}"]`);
    if (activeItem) activeItem.classList.add("is-active");

    const syncHeaderState = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });

    const menuButton = headerTarget.querySelector(".mobile-toggle");
    const mobilePanel = headerTarget.querySelector(".mobile-panel");
    if (menuButton && mobilePanel) {
      menuButton.addEventListener("click", () => {
        const isOpen = mobilePanel.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        body.classList.toggle("menu-open", isOpen);
      });

      mobilePanel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobilePanel.classList.remove("is-open");
          menuButton.setAttribute("aria-expanded", "false");
          body.classList.remove("menu-open");
        });
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
              <div class="footer-brand-block">
                <p>Intelligence-led security and risk consultancy for executive movement, secure mobility planning, crisis readiness, and sensitive operating contexts.</p>
                <div class="footer-signal-row"><span class="footer-signal"></span><span>London governance hub. Regional coordination depth in Pakistan and Afghanistan.</span></div>
              </div>
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
              <h4>Platform</h4>
              <ul class="footer-link-list">
                <li><a href="${root}pages/intelligence/index.html">Intelligence Products</a></li>
                <li><a href="${root}pages/capabilities/index.html">Capabilities</a></li>
                <li><a href="${root}pages/industries/index.html">Industries</a></li>
                <li><a href="${root}pages/about/governance.html">Governance</a></li>
              </ul>
            </section>
            <section>
              <h4>Contact</h4>
              <ul class="footer-link-list footer-contact-list">
                <li><span class="footer-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16v10H4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"></path><path d="m5 8 7 5 7-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><a href="mailto:social@securide24.com">social@securide24.com</a></li>
                <li><span class="footer-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 5h3l1.2 3.1-1.6 1.6a14 14 0 0 0 4.7 4.7l1.6-1.6L19 14v3c0 .6-.4 1-1 1A14 14 0 0 1 6 6c0-.6.4-1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><a href="tel:+19145206519">+1 (914) 520-6519</a></li>
                <li><span class="footer-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 6v6l4 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"></circle></svg></span><span>Response rhythm: within one business day</span></li>
                <li><span class="footer-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 5 7v5c0 4.1 2.6 7.7 7 9 4.4-1.3 7-4.9 7-9V7l-7-4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span>Urgent requests prioritized for consultancy review</span></li>
              </ul>
            </section>
          </div>
          <div class="footer-bottom">
            <span>&copy; <span id="footerYear">${year}</span> SECURIDE 24. All rights reserved.</span>
            <span>Strategic consultancy. Discreet coordination. Clear escalation paths.</span>
          </div>
        </div>
      </footer>`;
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

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileHeroVideoQuery = window.matchMedia("(max-width: 720px)");
  const prefersReducedMotion = reducedMotionQuery.matches;

  const syncMediaQueryListener = (mediaQuery, callback) => {
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", callback);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(callback);
    }
  };

  const playLoopVideo = (video) => {
    if (!video) return;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        video.classList.add("is-fallback");
      });
    }
  };

  const heroSlides = Array.from(document.querySelectorAll("[data-hero-slide]"));
  const heroDots = Array.from(document.querySelectorAll("[data-hero-dot]"));
  const heroVideos = heroSlides.map((slide) => slide.querySelector(".hero-slide-video")).filter(Boolean);
  const heroTitle = document.querySelector("[data-hero-title]");
  const heroCurrent = document.querySelector("[data-hero-current]");
  const heroTotal = document.querySelector("[data-hero-total]");
  const heroSliderTimingMs = 7600;

  if (heroSlides.length && heroDots.length === heroSlides.length) {
    let activeHeroIndex = 0;
    let heroSliderIntervalId = null;

    if (heroTotal) {
      heroTotal.textContent = String(heroSlides.length).padStart(2, "0");
    }

    const syncHeroVideoSource = (video) => {
      const heroSource = video?.querySelector("source");
      if (!video || !heroSource) return;

      const desktopSource = video.dataset.desktopSrc || heroSource.getAttribute("src") || "";
      const mobileSource = video.dataset.mobileSrc || desktopSource;
      const nextSource = mobileHeroVideoQuery.matches ? mobileSource : desktopSource;

      if (!nextSource || heroSource.getAttribute("src") === nextSource) {
        return;
      }

      heroSource.setAttribute("src", nextSource);
      video.load();
    };

    const syncHeroVideos = () => {
      heroVideos.forEach((video, index) => {
        syncHeroVideoSource(video);

        if (reducedMotionQuery.matches || index !== activeHeroIndex) {
          video.pause();
          if (index !== activeHeroIndex) {
            video.currentTime = 0;
          }
          return;
        }

        playLoopVideo(video);
      });
    };

    const showHeroSlide = (index) => {
      activeHeroIndex = (index + heroSlides.length) % heroSlides.length;
      const activeSlide = heroSlides[activeHeroIndex];

      heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeHeroIndex);
      });

      heroDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeHeroIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });

      if (heroTitle) {
        heroTitle.textContent = activeSlide?.dataset.title || "";
      }

      if (heroCurrent) {
        heroCurrent.textContent = String(activeHeroIndex + 1).padStart(2, "0");
      }

      syncHeroVideos();
    };

    const restartHeroAutoplay = () => {
      if (heroSliderIntervalId) {
        window.clearInterval(heroSliderIntervalId);
      }

      if (reducedMotionQuery.matches) {
        return;
      }

      heroSliderIntervalId = window.setInterval(() => {
        showHeroSlide(activeHeroIndex + 1);
      }, heroSliderTimingMs);
    };

    heroDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showHeroSlide(index);
        restartHeroAutoplay();
      });
    });

    showHeroSlide(0);
    restartHeroAutoplay();

    syncMediaQueryListener(mobileHeroVideoQuery, () => {
      syncHeroVideos();
    });

    syncMediaQueryListener(reducedMotionQuery, () => {
      syncHeroVideos();
      restartHeroAutoplay();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        heroVideos.forEach((video) => video.pause());
        return;
      }

      syncHeroVideos();
      restartHeroAutoplay();
    });
  }

  const productVideos = Array.from(document.querySelectorAll(".product-loop-video, .reach-loop-video"));
  const syncProductVideoState = (shouldPlay) => {
    productVideos.forEach((video) => {
      if (!shouldPlay) {
        video.pause();
        return;
      }

      playLoopVideo(video);
    });
  };

  syncMediaQueryListener(reducedMotionQuery, (event) => {
    syncProductVideoState(!event.matches);
  });

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const motionTargets = document.querySelectorAll(".section-heading, .architecture-card, .proof-item, .service-card, .product-card, .case-card, .expert-card, .process-step, .reach-node, .operational-reach-media, .cta-band, .value-card, .surface-card");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

    motionTargets.forEach((element, index) => {
      element.classList.add("motion-ready");
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(element);
    });
  }

  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    const tiltTargets = document.querySelectorAll(".pillar-card, .product-card, .case-card, .leader-card, .proof-item");
    tiltTargets.forEach((card) => {
      let frame = null;

      card.addEventListener("mousemove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        const rotateY = (x - 0.5) * 5;
        const rotateX = (0.5 - y) * 4;

        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
      });

      card.addEventListener("mouseleave", () => {
        if (frame) cancelAnimationFrame(frame);
        card.style.transform = "";
      });
    });
  }

  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    const depthSurfaces = document.querySelectorAll("[data-depth-surface]:not(.proof-item), .operational-reach-media");
    depthSurfaces.forEach((surface) => {
      let frame = null;

      surface.addEventListener("mousemove", (event) => {
        const bounds = surface.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;

        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          surface.style.transform = `translate3d(${x * 0.18}px, ${y * 0.18}px, 0)`;
        });
      });

      surface.addEventListener("mouseleave", () => {
        if (frame) cancelAnimationFrame(frame);
        surface.style.transform = "";
      });
    });
  }

  if (!prefersReducedMotion) {
    // Intelligence Products — subtle live status animation logic
    const liveCards = Array.from(document.querySelectorAll("[data-live-surface]"));

    liveCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.35}s`;
    });

    syncProductVideoState(true);

    if (liveCards.length > 1) {
      let activeIndex = 0;
      liveCards[0].classList.add("is-live-focus");

      window.setInterval(() => {
        liveCards[activeIndex]?.classList.remove("is-live-focus");
        activeIndex = (activeIndex + 1) % liveCards.length;
        liveCards[activeIndex]?.classList.add("is-live-focus");
      }, 3200);
    }

    if (window.matchMedia("(pointer: fine)").matches) {
      liveCards.forEach((card) => {
        const visual = card.querySelector(".product-visual");
        if (!visual) return;

        let frame = null;
        card.addEventListener("mousemove", (event) => {
          const bounds = card.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;

          if (frame) cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            visual.style.transform = `translate3d(${x * 0.4}px, ${y * 0.35}px, 0)`;
          });
        });

        card.addEventListener("mouseleave", () => {
          if (frame) cancelAnimationFrame(frame);
          visual.style.transform = "";
        });
      });
    }
  } else {
    syncProductVideoState(false);
  }

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