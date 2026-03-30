// ==================== PRODUCT DETAIL PAGE JS ====================

(function() {
  'use strict';

  // --- Gallery: thumbnail click switches main image ---
  var mainImage = document.getElementById('gallery-main');
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
      // Update active state
      thumbs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // --- Color swatch selector ---
  var swatches = document.querySelectorAll('.color-swatch');
  var colorNameEl = document.getElementById('selected-color-name');

  swatches.forEach(function(swatch) {
    swatch.addEventListener('click', function() {
      swatches.forEach(function(s) { s.classList.remove('active'); });
      this.classList.add('active');
      var colorName = this.getAttribute('data-color');
      if (colorNameEl && colorName) colorNameEl.textContent = colorName;
      // Switch main gallery image to this color's photo
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

    // Gather selected config
    var activeColor = document.querySelector('.color-swatch.active');
    var activeSize = document.querySelector('.size-chip.active');
    var quantityInput = document.getElementById('quantity-input');

    var colorName = activeColor ? activeColor.getAttribute('data-color') : '';
    var sizeName = activeSize ? activeSize.getAttribute('data-size') : '';
    var quantity = quantityInput ? quantityInput.value : '';

    // Fill hidden fields
    var colorField = document.getElementById('popup-selected-color');
    var sizeField = document.getElementById('popup-selected-size');
    var qtyField = document.getElementById('popup-selected-quantity');

    if (colorField) colorField.value = colorName;
    if (sizeField) sizeField.value = sizeName;
    if (qtyField) qtyField.value = quantity;

    // Show config summary
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
