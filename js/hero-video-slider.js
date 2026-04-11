// hero-video-slider.js - rotates hero background videos on the home page

(function () {
  const VIDEO_INTERVAL_MS = 3000;
  const DESKTOP_VIDEO_FILES = [
    'assets/video/hero-slide-01.webm',
    'assets/video/hero-slide-02.webm',
    'assets/video/hero-slide-03.webm',
    'assets/video/hero-slide-04.webm',
    'assets/video/hero-slide-05.webm',
    'assets/video/hero-slide-06.webm'
  ];
  const MOBILE_VIDEO_FILES = [
    'assets/video/hero-mobile-slide-01.webm',
    'assets/video/hero-mobile-slide-02.webm',
    'assets/video/hero-mobile-slide-03.webm',
    'assets/video/hero-mobile-slide-04.webm',
    'assets/video/hero-mobile-slide-05.webm',
    'assets/video/hero-mobile-slide-06.webm'
  ];
  const MOBILE_BREAKPOINT = '(max-width: 768px)';

  function initHeroVideoSlider() {
    const video = document.getElementById('heroVideoSlider');
    const backdropVideo = document.getElementById('heroVideoSliderBackdrop');
    if (!video) {
      return;
    }

    const dotButtons = Array.from(document.querySelectorAll('.hero-slider-dot'));
    const prevButton = document.getElementById('heroSliderPrev');
    const nextButton = document.getElementById('heroSliderNext');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileViewportQuery = window.matchMedia(MOBILE_BREAKPOINT);

    let activeIndex = 0;
    let sliderIntervalId = null;

    function getVideoFiles() {
      return mobileViewportQuery.matches ? MOBILE_VIDEO_FILES : DESKTOP_VIDEO_FILES;
    }

    function syncVideoSource(element, source) {
      if (!element) {
        return;
      }

      element.setAttribute('src', source);
      element.load();
      element.play().catch(() => {
        // Autoplay can be blocked in some contexts; muted playback usually succeeds.
      });
    }

    function updateDots(index) {
      dotButtons.forEach((dot, dotIndex) => {
        const isActive = dotIndex === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function setVideo(index) {
      const videoFiles = getVideoFiles();

      if (index === activeIndex && video.getAttribute('src') === videoFiles[index]) {
        return;
      }

      video.classList.add('is-fading');

      window.setTimeout(() => {
        activeIndex = index;
        syncVideoSource(video, videoFiles[activeIndex]);
        syncVideoSource(backdropVideo, videoFiles[activeIndex]);

        updateDots(activeIndex);
        video.classList.remove('is-fading');
      }, 160);
    }

    function showNext() {
      const nextIndex = (activeIndex + 1) % getVideoFiles().length;
      setVideo(nextIndex);
    }

    function showPrevious() {
      const currentLength = getVideoFiles().length;
      const previousIndex = (activeIndex - 1 + currentLength) % currentLength;
      setVideo(previousIndex);
    }

    function restartAutoRotation() {
      if (prefersReducedMotion) {
        return;
      }

      if (sliderIntervalId) {
        window.clearInterval(sliderIntervalId);
      }

      sliderIntervalId = window.setInterval(showNext, VIDEO_INTERVAL_MS);
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        showPrevious();
        restartAutoRotation();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        showNext();
        restartAutoRotation();
      });
    }

    dotButtons.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIndex = Number(dot.getAttribute('data-hero-slide'));
        if (!Number.isNaN(slideIndex)) {
          setVideo(slideIndex);
          restartAutoRotation();
        }
      });
    });

    updateDots(0);

    const onViewportModeChange = () => {
      const videoFiles = getVideoFiles();
      if (activeIndex >= videoFiles.length) {
        activeIndex = 0;
      }

      syncVideoSource(video, videoFiles[activeIndex]);
      syncVideoSource(backdropVideo, videoFiles[activeIndex]);
    };

    if (typeof mobileViewportQuery.addEventListener === 'function') {
      mobileViewportQuery.addEventListener('change', onViewportModeChange);
    } else if (typeof mobileViewportQuery.addListener === 'function') {
      mobileViewportQuery.addListener(onViewportModeChange);
    }

    const initialVideo = getVideoFiles()[activeIndex];
    syncVideoSource(video, initialVideo);
    syncVideoSource(backdropVideo, initialVideo);
    restartAutoRotation();

    const retryPlayback = () => {
      video.play().catch(() => {
        // Some browsers require an interaction before autoplay; retry on interaction.
      });
      if (backdropVideo) {
        backdropVideo.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        retryPlayback();
      }
    });

    ['pointerdown', 'touchstart', 'keydown'].forEach((eventName) => {
      document.addEventListener(eventName, retryPlayback, { once: true, passive: true });
    });
  }

  document.addEventListener('DOMContentLoaded', initHeroVideoSlider);
})();
