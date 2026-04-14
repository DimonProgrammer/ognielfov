// ==================== PRODUCT DETAIL PAGE JS ====================

(function() {
  'use strict';

  var mainImage = document.getElementById('gallery-main');

  // --- rebuildGallery: replace thumbs + mobile slider for a given image set ---
  function rebuildGallery(images) {
    if (!images || !images.length) return;

    // 1. Update main image
    if (mainImage) {
      mainImage.style.opacity = '0';
      setTimeout(function() {
        mainImage.src = images[0].src;
        mainImage.alt = images[0].alt || '';
        mainImage.style.opacity = '1';
      }, 150);
    }

    // 2. Rebuild desktop thumbnails
    var thumbsContainer = document.getElementById('gallery-thumbs');
    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      images.forEach(function(imgData, idx) {
        var btn = document.createElement('button');
        btn.className = 'gallery-thumb w-20 h-20 rounded-xl overflow-hidden bg-[#F5F5F7] flex-shrink-0' + (idx === 0 ? ' active' : '');
        btn.setAttribute('data-src', imgData.src);
        btn.setAttribute('data-alt', imgData.alt || '');
        var imgEl = document.createElement('img');
        imgEl.src = imgData.src;
        imgEl.alt = imgData.alt || '';
        imgEl.className = 'w-full h-full object-cover';
        imgEl.width = 160;
        imgEl.height = 213;
        imgEl.loading = 'lazy';
        btn.appendChild(imgEl);
        btn.addEventListener('click', function() {
          if (!mainImage) return;
          var src = btn.getAttribute('data-src');
          var alt = btn.getAttribute('data-alt');
          mainImage.style.opacity = '0';
          setTimeout(function() {
            mainImage.src = src;
            if (alt) mainImage.alt = alt;
            mainImage.style.opacity = '1';
          }, 150);
          thumbsContainer.querySelectorAll('.gallery-thumb').forEach(function(t) { t.classList.remove('active'); });
          btn.classList.add('active');
        });
        thumbsContainer.appendChild(btn);
      });
    }

    // 3. Rebuild mobile slider
    var sliderTrack = document.getElementById('slider-track');
    if (sliderTrack) {
      sliderTrack.innerHTML = '';
      images.forEach(function(imgData) {
        var slide = document.createElement('div');
        slide.className = 'slider-slide flex-shrink-0 bg-[#F5F5F7] rounded-2xl overflow-hidden aspect-[3/4]';
        var imgEl = document.createElement('img');
        imgEl.src = imgData.src;
        imgEl.alt = imgData.alt || '';
        imgEl.className = 'w-full h-full object-cover object-bottom';
        imgEl.width = 600;
        imgEl.height = 800;
        imgEl.loading = 'lazy';
        slide.appendChild(imgEl);
        sliderTrack.appendChild(slide);
      });

      // Rebuild dots
      var dotsContainer = document.getElementById('slider-dots');
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        images.forEach(function(_, idx) {
          var dot = document.createElement('button');
          dot.className = 'slider-dot h-2 rounded-full transition-all duration-300';
          dot.style.width = idx === 0 ? '20px' : '8px';
          dot.style.background = idx === 0 ? '#1D1D1F' : '#D1D1D6';
          dot.setAttribute('aria-label', 'Фото ' + (idx + 1));
          (function(i) { dot.onclick = function() { if (typeof sliderGoTo === 'function') sliderGoTo(i); }; })(idx);
          dotsContainer.appendChild(dot);
        });
      }

      // Reset slider position
      if (typeof sliderGoTo === 'function') sliderGoTo(0);
    }
  }

  // Expose for inline script initialization
  window.rebuildGallery = rebuildGallery;

  // --- Desktop gallery prev/next navigation ---
  function initGalleryNav() {
    var prevBtn = document.getElementById('gallery-prev');
    var nextBtn = document.getElementById('gallery-next');
    if (!prevBtn || !nextBtn) return;

    function navigate(dir) {
      var allThumbs = document.querySelectorAll('#gallery-thumbs .gallery-thumb');
      if (allThumbs.length <= 1) return;
      var activeIdx = 0;
      allThumbs.forEach(function(t, i) { if (t.classList.contains('active')) activeIdx = i; });
      var newIdx = (activeIdx + dir + allThumbs.length) % allThumbs.length;
      allThumbs[newIdx].click();
    }

    prevBtn.addEventListener('click', function() { navigate(-1); });
    nextBtn.addEventListener('click', function() { navigate(1); });
  }

  initGalleryNav();

  // --- Gallery: thumbnail click switches main image ---
  var thumbs = document.querySelectorAll('.gallery-thumb');

  thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      if (!mainImage) return;
      var src = this.getAttribute('data-src');
      var alt = this.getAttribute('data-alt');
      if (src) {
        mainImage.style.opacity = '0';
        setTimeout(function() {
          mainImage.src = src;
          if (alt) mainImage.alt = alt;
          mainImage.style.opacity = '1';
        }, 150);
      }
      thumbs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // --- Color swatch selector ---
  var swatches = document.querySelectorAll('.color-swatch');
  var colorNameEl = document.getElementById('selected-color-name');
  var mobileColorNameEl = document.getElementById('mobile-color-name');

  swatches.forEach(function(swatch) {
    swatch.addEventListener('click', function() {
      swatches.forEach(function(s) { s.classList.remove('active'); });
      this.classList.add('active');
      var colorName = this.getAttribute('data-color');
      if (colorNameEl && colorName) colorNameEl.textContent = colorName;
      if (mobileColorNameEl && colorName) mobileColorNameEl.textContent = colorName;

      // Multi-image gallery: rebuild with all views for this color
      if (window.productColorImages && window.productColorImages[colorName]) {
        rebuildGallery(window.productColorImages[colorName]);
        return;
      }

      // Fallback: single image via data-src (CDN photos for gray/red/navy etc.)
      var newSrc = this.getAttribute('data-src');
      if (newSrc && mainImage) {
        mainImage.style.opacity = '0';
        setTimeout((function(src) {
          return function() { mainImage.src = src; mainImage.style.opacity = '1'; };
        })(newSrc), 150);
      }
    });
  });

  // --- Size chip selector ---
  var sizeChips = document.querySelectorAll('.size-chip');
  var sizeNameEl = document.getElementById('selected-size-name');

  sizeChips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      sizeChips.forEach(function(c) { c.classList.remove('active'); });
      this.classList.add('active');
      var size = this.getAttribute('data-size');
      if (sizeNameEl && size) sizeNameEl.textContent = size;
    });
  });

  // --- Size chart modal ---
  var sizeChartToggle = document.getElementById('size-chart-toggle');
  var sizeChartModal = document.getElementById('size-chart-modal');

  if (sizeChartToggle && sizeChartModal) {
    sizeChartToggle.addEventListener('click', function() {
      sizeChartModal.classList.remove('hidden');
      sizeChartModal.classList.add('flex');
    });
  }

  window.closeSizeChart = function() {
    if (sizeChartModal) {
      sizeChartModal.classList.add('hidden');
      sizeChartModal.classList.remove('flex');
    }
  };

  // --- Sticky CTA bar (mobile) ---
  var stickyCta = document.getElementById('sticky-cta');
  var productCta = document.getElementById('product-cta');

  if (stickyCta && productCta) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          stickyCta.classList.add('hidden');
        } else {
          stickyCta.classList.remove('hidden');
        }
      });
    }, { threshold: 0 });

    observer.observe(productCta);
  }

  // --- Product order popup with pre-filled config ---
  window.openProductOrderPopup = function() {
    var popup = document.getElementById('popup-form');
    if (!popup) return;

    var activeColor = document.querySelector('.color-swatch.active');
    var activeSize = document.querySelector('.size-chip.active');
    var quantityInput = document.getElementById('quantity-input');

    var colorName = activeColor ? activeColor.getAttribute('data-color') : '';
    var sizeName = activeSize ? activeSize.getAttribute('data-size') : '';
    var quantity = quantityInput ? quantityInput.value : '';

    var colorField = document.getElementById('popup-selected-color');
    var sizeField = document.getElementById('popup-selected-size');
    var qtyField = document.getElementById('popup-selected-quantity');

    if (colorField) colorField.value = colorName;
    if (sizeField) sizeField.value = sizeName;
    if (qtyField) qtyField.value = quantity;

    var configSummary = document.getElementById('popup-config-summary');
    var configText = document.getElementById('popup-config-text');

    if (configSummary && configText) {
      var parts = [];
      if (colorName) parts.push(colorName);
      if (sizeName) parts.push('размер ' + sizeName);
      if (quantity) parts.push(quantity + ' шт.');

      if (parts.length > 0) {
        configText.textContent = parts.join(' / ');
        configSummary.classList.remove('hidden');
      } else {
        configSummary.classList.add('hidden');
      }
    }

    popup.classList.remove('hidden');
    popup.classList.add('flex');
  };

})();
