document.addEventListener('DOMContentLoaded', () => {

  // ======== SCROLL PROGRESS BAR ========
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (maxScroll > 0 ? scrolled / maxScroll * 100 : 0) + '%';
  }, { passive: true });

  // ======== NAV SCROLL STATE ========
  const nav = document.querySelector('nav.nav-glass');
  if (nav) {
    const onNavScroll = () => nav.classList.toggle('nav-scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  // ======== REVEAL ON SCROLL ========
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ======== HERO ENTRANCE STAGGER ========
  // Apply stagger delays to first-section reveal elements
  const heroSection = document.querySelector('section');
  if (heroSection) {
    heroSection.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (0.07 + i * 0.13) + 's';
    });
  }
  // Force-show elements already visible in viewport (above-fold)
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(() => el.classList.add('visible'));
    }
  });

  // ======== COUNT-UP ANIMATION ========
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(easedProgress * target);

      // Format number with spaces for thousands
      const formatted = current.toLocaleString('ru-RU');
      el.textContent = prefix + formatted + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ======== DRAG TO SCROLL (TECHNOLOGIES) ========
  document.querySelectorAll('.scroll-container').forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
  });

  // ======== STEPPER WAVE ANIMATION ========
  const waveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stepper-wave').forEach(el => waveObserver.observe(el));

  // ======== TESTIMONIALS CAROUSEL ========
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    if (!track) return;

    const cards = track.children;
    const cardWidth = cards[0]?.offsetWidth + 24 || 404; // width + gap
    const visibleCount = window.innerWidth >= 768 ? 3 : 1;
    const maxIndex = Math.max(0, cards.length - visibleCount);
    let currentIndex = 0;
    let autoplayTimer;

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      track.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';
      // Update dots
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === currentIndex);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); resetAutoplay(); });

    // Autoplay
    function startAutoplay() {
      autoplayTimer = setInterval(() => {
        goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
      }, 5000);
    }
    function resetAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    carousel.addEventListener('mouseleave', startAutoplay);
    startAutoplay();

    // Touch swipe support (mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
        resetAutoplay();
      }
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
      const newCardWidth = cards[0]?.offsetWidth + 24 || 404;
      if (newCardWidth !== cardWidth) {
        goTo(0);
      }
    });
  });

  // ======== SELECT COLOR ON CHANGE ========
  document.querySelectorAll('select').forEach(sel => {
    const update = () => {
      sel.style.color = sel.value ? '#1D1D1F' : '';
    };
    sel.addEventListener('change', update);
    update();
  });
});
