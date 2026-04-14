/**
 * Битрикс24 CRM — интеграция форм elfprint.ru
 * Вебхук: REST API входящий, пользователь #14
 */
(function () {
  'use strict';

  var WEBHOOK   = 'https://b24-91104r.bitrix24.ru/rest/14/2wt6srq9qh4joj1u/crm.lead.add.json';
  var MAIL_URL  = '/send-mail.php';

  /* ─── Название страницы (без «| Огни Эльфов») ─── */
  function pageName() {
    return document.title.replace(/\s*[|—–]\s*Огни\s*Эльфов.*$/i, '').trim();
  }

  /* ─── UTM-метки для поля «Источник» ─── */
  function utmInfo() {
    var p = new URLSearchParams(window.location.search);
    var parts = [];
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
      if (p.get(k)) parts.push(k.replace('utm_', '') + ': ' + p.get(k));
    });
    return parts.length ? '\nUTM: ' + parts.join(', ') : '';
  }

  /* ─── Заголовок лида — что сразу видит менеджер ─── */
  function leadTitle(form, data) {
    var page = pageName();

    /* Расширенная форма заказа (услуги) — самый ценный лид */
    if (data.quantity) {
      var item = data.product ? data.product : 'изделие';
      return 'Заказ: ' + item + ', ' + data.quantity + ' шт. — ' + page;
    }
    if (data.product) {
      return 'Заказ: ' + data.product + ' — ' + page;
    }

    /* Попапы */
    if (form.closest('#price-popup')) return 'Запрос прайса — ' + page;
    if (form.closest('#popup-form'))  return 'Обсудить проект — ' + page;

    /* Inline CTA */
    return 'Заявка с сайта — ' + page;
  }

  /* ─── Структурированный комментарий к лиду ─── */
  function buildComments(data) {
    var lines = [];

    if (data.product)  lines.push('📦 Изделие: ' + data.product);
    if (data.service)  lines.push('🖨 Технология: ' + data.service);
    if (data.quantity) lines.push('🔢 Количество: ' + data.quantity + ' шт.');
    if (data.deadline) lines.push('📅 Срок: ' + data.deadline);
    if (data.comment)  lines.push('\n💬 Комментарий:\n' + data.comment);

    lines.push('\n🌐 Страница: ' + window.location.href + utmInfo());

    return lines.join('\n');
  }

  /* ─── Показать успех вместо формы ─── */
  function showSuccess(form) {
    var wrap = document.createElement('div');
    wrap.className = 'text-center py-6';
    wrap.innerHTML =
      '<div class="text-2xl mb-2">✓</div>' +
      '<p class="font-semibold text-[#1D1D1F]">Готово, ждите звонка!</p>' +
      '<p class="text-sm text-[#6E6E73] mt-1">Перезвоним в течение 30&nbsp;минут в рабочее время.</p>';
    form.replaceWith(wrap);
  }

  /* ─── Показать ошибку прямо в форме ─── */
  function showError(form, btn, originalText) {
    if (btn) { btn.textContent = originalText; btn.disabled = false; }
    var old = form.querySelector('.b24-err');
    if (old) old.remove();
    var err = document.createElement('p');
    err.className = 'b24-err text-xs text-red-500 mt-1';
    err.textContent = 'Не удалось отправить. Позвоните: +7 (495) 380-40-32';
    form.appendChild(err);
  }

  /* ─── Маска телефона +7 (XXX) XXX-XX-XX ─── */
  function applyPhoneMask(input) {
    function initValue() {
      if (!this.value) this.value = '+7 ';
    }
    input.addEventListener('focus', initValue);
    input.addEventListener('touchstart', initValue, { passive: true });
    input.addEventListener('blur', function () {
      if (this.value === '+7 ' || this.value === '+7') this.value = '';
    });
    input.addEventListener('input', function () {
      var pos = this.selectionStart;
      var digits = this.value.replace(/\D/g, '');
      if (!digits) { this.value = ''; return; }
      if (digits[0] === '8') digits = '7' + digits.slice(1);
      if (digits[0] !== '7') digits = '7' + digits;
      digits = digits.slice(0, 11);
      var r = '+7';
      if (digits.length > 1) r += ' (' + digits.slice(1, Math.min(4, digits.length));
      if (digits.length >= 4) r += ') ' + digits.slice(4, Math.min(7, digits.length));
      if (digits.length >= 7) r += '-' + digits.slice(7, Math.min(9, digits.length));
      if (digits.length >= 9) r += '-' + digits.slice(9, 11);
      this.value = r;
    });
  }
  document.querySelectorAll('input[type="tel"]').forEach(applyPhoneMask);

  /* ─── Навесить обработчик на каждую форму ─── */
  document.querySelectorAll('form[action="#"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Собрать все поля формы */
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== 'consent') data[k] = v; });

      /* Заблокировать кнопку */
      var btn = form.querySelector('[type="submit"]');
      var origText = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Отправляем…'; btn.disabled = true; }

      /* Сформировать поля лида */
      var fields = {
        TITLE:              leadTitle(form, data),
        NAME:               data.name || '',
        PHONE:              data.phone ? [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }] : [],
        EMAIL:              data.email ? [{ VALUE: data.email, VALUE_TYPE: 'WORK' }] : [],
        SOURCE_ID:          'WEB',
        SOURCE_DESCRIPTION: window.location.href + utmInfo(),
        COMMENTS:           buildComments(data),
      };

      /* Дублировать на email (fire-and-forget, не блокирует UX) */
      fetch(MAIL_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          title:    fields.TITLE,
          name:     data.name    || '',
          phone:    data.phone   || '',
          email:    data.email   || '',
          product:  data.product || '',
          service:  data.service || '',
          quantity: data.quantity|| '',
          deadline: data.deadline|| '',
          comment:  data.comment || '',
          page:     window.location.href,
        }),
      }).catch(function() {}); /* молча игнорируем ошибку */

      /* Отправить в Битрикс24 */
      fetch(WEBHOOK, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ fields: fields }),
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.result) {
            showSuccess(form);
          } else {
            console.error('B24 error:', json);
            showError(form, btn, origText);
          }
        })
        .catch(function (err) {
          console.error('B24 fetch error:', err);
          showError(form, btn, origText);
        });
    });
  });
})();
