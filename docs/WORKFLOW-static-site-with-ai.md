# Алгоритм: Корпоративный сайт с AI-ассистентом

**Проверено на:** elfprint.ru (37 страниц, 68 коммитов, 14 дней, 1 разработчик)
**Стек:** Static HTML + Tailwind CDN + Vanilla JS → Vercel / VPS

---

## День 0: Подготовка (до начала кодирования)

### 0.1 Сбор данных от клиента
- [ ] Бриф: компания, УТП, ЦА (max 3 сегмента)
- [ ] Контактные данные: телефон, email, адрес, ИНН/ОГРН
- [ ] Реальные фото продукции (НЕ стоковые)
- [ ] Лого в SVG
- [ ] URL текущего сайта (для extraction правовых текстов)
- [ ] Прайс-лист
- [ ] Ссылки на отзывы (Яндекс, 2GIS, Google)
- [ ] Доступы к CRM (Bitrix24 webhook / Telegram bot token)

### 0.2 Research
- [ ] Анализ 3-5 конкурентов
- [ ] SEO keywords (Яндекс Wordstat)
- [ ] Выбор 3-5 дизайн-референсов
- **Результат:** `docs/seo-keywords-research.md`

### 0.3 PRD
- [ ] Все страницы с описанием секций
- [ ] Job stories по каждому сегменту ЦА
- [ ] Критерии успеха (метрики)
- **Результат:** `docs/PRD.md`

### 0.4 CLAUDE.md
- [ ] Описание проекта, стека, дизайн-системы (цвета, шрифты, компоненты)
- [ ] Правила контента (anti-AI cliche)
- [ ] Структура файлов
- [ ] Список запретов (что НЕ делать)
- **Quality gate:** CLAUDE.md достаточен, чтобы НОВЫЙ AI-ассистент продолжил работу без брифинга

### 0.5 Инфраструктура (день 1 = уже поздно)
```bash
mkdir project && cd project && git init
echo "*.DS_Store\nnode_modules/\n*.env" > .gitignore
mkdir -p public/{css,js,img}
```
- [ ] `.gitignore` — исключить рабочие файлы, фото-архивы, DOCX, PDF
- [ ] `.vercelignore` — исключить всё кроме `public/**`

---

## Дни 1-2: Scaffold + Design System

### 1.1 Дизайн-система (custom.css)
Минимум компонентов:
- [ ] Nav (frosted glass, sticky)
- [ ] Buttons (pill, outline, accent)
- [ ] Cards (hover, shadow)
- [ ] Typography (headings, body, captions)
- [ ] Colors (CSS variables или Tailwind config)
- [ ] Spacing scale
- [ ] Reveal animation (.reveal + .visible)
- **Результат:** `public/css/custom.css` + `design-system.html` (noindex)

### 1.2 Homepage
- [ ] HTML boilerplate (meta, OG, JSON-LD, Tailwind CDN)
- [ ] Nav + hero + 3-4 секции + footer
- [ ] Формы: popup "Обсудить проект" + inline CTA
- [ ] Consent checkbox под каждой формой (152-ФЗ)
- [ ] Mobile responsive (проверить на 375px)
- **Quality gate:** показать клиенту → одобрение дизайна

### 1.3 Vercel deploy
```json
{
  "buildCommand": "",
  "outputDirectory": "public",
  "framework": null,
  "cleanUrls": true,
  "trailingSlash": false
}
```
- [ ] `vercel deploy` → отправить ссылку клиенту
- **Quality gate:** сайт открывается, нет 404

---

## Дни 3-5: Контент-страницы (батчами)

### 2.1 Шаблон каждой страницы
- [ ] Уникальный `<title>` (max 60 символов)
- [ ] Уникальный `<meta name="description">` (120-160 символов)
- [ ] OG-теги (og:title, og:description, og:image, og:url, og:locale)
- [ ] `<link rel="canonical">`
- [ ] H1 — один на страницу, с городом для local SEO
- [ ] JSON-LD (LocalBusiness / Article / BreadcrumbList)
- [ ] Consent checkbox под каждой формой

### 2.2 Рекомендуемый батч-порядок
| День | Страницы | Количество |
|------|----------|-----------|
| 3 | Услуги (шелкография, DTF, сублимация, тампопечать, УФ, вышивка) | 6+1 |
| 4 | Каталог (одежда, электроника, аксессуары, канцелярия, посуда, текстиль) | 6+1 |
| 5 | О компании, контакты, портфолио, опт, корп. клиенты, маркетплейсы | 6 |

### 2.3 Техники mass replacement
| Задача | Инструмент | Пример |
|--------|-----------|--------|
| Простая замена | `sed -i '' 's/old/new/g' public/*.html` | Телефон, email |
| Multiline | `perl -0777 -i -pe 's/old\nblock/new\nblock/gs' public/*.html` | Footer, nav |
| Complex regex | Python script | Header с вложенными тегами |

- **Quality gate:** `grep -r "placeholder\|Lorem\|TODO" public/*.html` → 0 результатов

---

## Дни 6-7: SEO + Правовые страницы

### 3.1 SEO инфраструктура
- [ ] `sitemap.xml` — все страницы, priority, lastmod
- [ ] `robots.txt` — Clean-param для UTM (Yandex-specific), Host директива
- [ ] Canonical URLs на всех страницах
- [ ] Alt теги на всех изображениях (на русском с ключевыми словами)
- **Quality gate:** валидатор sitemap, Google Rich Results Test

### 3.2 Правовые страницы (152-ФЗ для РФ)
- [ ] Политика конфиденциальности
- [ ] Пользовательское соглашение
- [ ] Политика cookies
- [ ] Оферта
- [ ] Согласие на рассылку (если есть формы с email)
- [ ] Реквизиты (ИНН, ОГРН, юр. адрес)

**Извлечение текстов со старого сайта (Tilda/Wix/Webflow):**
```javascript
// Playwright — для JS-rendered контента
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('https://old-site.ru/privacy');
const content = await page.textContent('main');
```

### 3.3 Clean URLs (для static hosting)
```bash
# Vercel cleanUrls убирает .html, но нужны поддиректории:
for f in public/*.html; do
  name=$(basename "$f" .html)
  [ "$name" = "index" ] && continue
  mkdir -p "public/$name"
  cp "$f" "public/$name/index.html"
done
```
**Лучше:** использовать SSG (Astro/11ty) который генерирует поддиректории автоматически.

---

## Дни 8-9: Блог + Контент-маркетинг

### 4.1 Стратегия
- [ ] 3-5 статей на старте
- [ ] Каждая таргетирует 1-2 ключевых запроса из keyword research
- [ ] Внутренние перелинковки на услуги/каталог
- **Результат:** `docs/blog-content-strategy.md`

### 4.2 Написание статей
Промпт для Claude: SEO keywords + anti-AI cliche правила из CLAUDE.md

- **Quality gate на каждую статью:**
  - [ ] Нет AI-клише ("рубленые фразы", "кинематограф", "знакомо?")
  - [ ] Факты верифицированы (нет выдуманных чисел)
  - [ ] Ключевые слова в H1, H2, первом абзаце
  - [ ] 1000-2000 слов

---

## Дни 10-11: UI Polish + Mobile

### 5.1 Реальные фото
- [ ] Заменить все placeholder/emoji на фото клиента
- [ ] width/height атрибуты (CLS prevention)
- [ ] Alt теги на русском
- [ ] `loading="lazy"` на всех фото ниже fold

### 5.2 Mobile UX (78% российских пользователей — мобильные)
- [ ] Мобильное меню (hamburger)
- [ ] Мобильная галерея (swipe/peek slider)
- [ ] CTA кнопки: min 48px touch target
- [ ] Nav breakpoint: тестировать на РЕАЛЬНОМ тексте (не lorem)
- [ ] Формы: input type="tel" для телефона

### 5.3 Анимации (один файл: js/animations.js)
- [ ] Scroll reveal (IntersectionObserver, threshold 0.08)
- [ ] Count-up (для чисел/статистики)
- [ ] Carousel (отзывы, touch swipe, autoplay)
- [ ] Drag-to-scroll (горизонтальные карточки)
- [ ] Scroll progress bar
- [ ] Nav scroll state (фон при прокрутке)
- [ ] `@media (prefers-reduced-motion: reduce)` — ОБЯЗАТЕЛЬНО
- [ ] Force-reveal для above-fold элементов (не ждать scroll)

- **Quality gate:** Lighthouse Performance > 90 на mobile

---

## Дни 12-13: Интеграции

### 6.1 CRM (Bitrix24)
```javascript
// b24.js — подключить ко всем формам через form[action="#"]
fetch('https://YOUR_DOMAIN.bitrix24.ru/rest/ID/TOKEN/crm.lead.add.json', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    fields: {
      TITLE: 'Заявка с сайта — ' + pageTitle,
      NAME: formData.name,
      PHONE: [{VALUE: formData.phone, VALUE_TYPE: 'WORK'}],
      SOURCE_ID: 'WEB',
      SOURCE_DESCRIPTION: window.location.href + utmParams,
      COMMENTS: structuredComments
    }
  })
});
```
- [ ] Структурированные комментарии (страница, UTM, данные формы)
- [ ] Fallback: показать телефон при ошибке
- [ ] Тест: 3 тестовые заявки (popup, CTA, прайс)
- **Quality gate:** заявки появляются в CRM с правильными данными

### 6.2 Карты + Виджеты
- [ ] Yandex Maps iframe (с маркером на адресе)
- [ ] Review badges (Яндекс Карты, 2GIS) — ссылки в footer
- [ ] Messenger widget (Telegram, VK, MAX/WhatsApp, телефон)

### 6.3 Аналитика
- [ ] Яндекс.Метрика (primary для РФ)
- [ ] GA4 (secondary, без передачи ПД за рубеж)

- **Quality gate:**
  - [ ] Заявка доходит до CRM
  - [ ] Карта показывает правильный адрес с маркером
  - [ ] Messenger ссылки открывают правильные чаты

---

## День 14: Финализация + Деплой

### 7.1 Pre-launch чеклист
- [ ] `grep -r "placeholder\|Lorem\|TODO\|XXX" public/*.html` → 0
- [ ] Все ссылки рабочие (ручная проверка или Playwright crawl)
- [ ] Mobile: каждая страница на 375px
- [ ] Forms: consent checkbox под каждой формой
- [ ] Footer: ИНН, ОГРН, телефон, email, правовые ссылки
- [ ] OG image существует и имеет правильный размер (1200x630)
- [ ] favicon.svg в корне
- [ ] `console.log` → убрать всё
- [ ] Секреты (webhook URL, API tokens) — НЕ в клиентском JS

### 7.2 Деплой
- [ ] Merge Тест → main
- [ ] Vercel auto-deploy → проверить production URL
- [ ] Привязать домен (DNS A/CNAME record)
- [ ] SSL сертификат (Vercel = автоматический, VPS = Let's Encrypt)

### 7.3 nginx конфиг (если VPS, не Vercel)
```nginx
server {
    listen 443 ssl;
    server_name elfprint.ru www.elfprint.ru;
    root /var/www/elfprint.ru/public;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

### 7.4 Post-launch
- [ ] Зарегистрировать в Яндекс.Вебмастер
- [ ] Подать sitemap.xml
- [ ] Зарегистрировать "Оригинальные тексты" (Яндекс.Вебмастер)
- [ ] Настроить 301 редиректы с старого сайта
- [ ] Мониторинг аптайма (UptimeRobot — бесплатно)

---

## Справочник инструментов

| Задача | Инструмент | Когда |
|--------|-----------|-------|
| PRD, копирайтинг, SEO тексты | Claude + CLAUDE.md | День 0-5 |
| Кодирование HTML/CSS/JS | Claude Code | День 1-14 |
| Mass replacement (simple) | `sed -i '' 's/old/new/g'` | По мере необходимости |
| Mass replacement (multiline) | `perl -0777 -i -pe` | По мере необходимости |
| Mass replacement (complex) | Python regex script | По мере необходимости |
| JS-rendered content extraction | Playwright headless | День 6 |
| Image optimization | squoosh / imagemin | День 10 |
| SEO validation | Яндекс.Вебмастер, Lighthouse | День 12 |
| Deploy prototype | Vercel CLI / git push | День 1 |
| Deploy production | VPS + nginx + PM2 | День 14 |
| CRM тестирование | `curl -X POST` REST API | День 12 |
| Проверка ссылок | `grep -r "href=" \| sort \| uniq` | День 14 |

---

## 10 типичных ошибок

### 1. Repo bloat
**Проблема:** рабочие файлы (PDF, DOCX, фото-архивы) попали в git, push 1.1GB
**Решение:** `.gitignore` и `.vercelignore` в день 1, ДО первого коммита

### 2. CLAUDE.md drift
**Проблема:** документ описывает стек (Astro 5), который не используется
**Решение:** обновлять при КАЖДОМ архитектурном решении

### 3. No template engine at 20+ pages
**Проблема:** изменение header/footer = sed по 60+ файлам
**Решение:** после 10 страниц оценить переход на Astro/11ty/Nunjucks

### 4. Hardcoded secrets in client JS
**Проблема:** Bitrix24 webhook URL виден в DevTools
**Решение:** server-side proxy (Vercel serverless function или VPS endpoint)

### 5. Nav breakpoints на lorem ipsum
**Проблема:** "Контакты производства мерча в Москве" не помещается
**Решение:** тестировать с реальным контентом, не placeholder

### 6. Placeholder photos shipped
**Проблема:** emoji/placeholder в production
**Решение:** `grep -r "emoji\|placeholder\|stock" public/` перед деплоем

### 7. Clean URL file duplication
**Проблема:** 37 .html + 38 index.html = 75 файлов для 37 страниц
**Решение:** SSG (Astro/11ty) или build script для генерации

### 8. Ссылки на несуществующие страницы
**Проблема:** blog-idei-mercha-it → 404 (статья не написана)
**Решение:** не ставить ссылки на ненаписанные страницы, fallback на /blog

### 9. Too many cosmetic iterations
**Проблема:** 4 коммита на одну иконку мессенджера
**Решение:** группировать визуальные правки в батчи: 1 коммит = 1 фича

### 10. Legal pages last
**Проблема:** правовые страницы как afterthought в последние дни
**Решение:** правовые страницы = день 6-7, не день 13. 152-ФЗ compliance — не опционально

---

## Масштабирование алгоритма

| Масштаб | Стек | Срок |
|---------|------|------|
| 5-10 страниц | Static HTML + Tailwind CDN | 5-7 дней |
| 10-30 страниц | Static HTML → SSG (Astro/11ty) на фазе 5 | 10-14 дней |
| 30-50 страниц | SSG с первого дня + CMS (Decap/Tina) | 14-21 день |
| 50+ страниц | Full framework (Astro 5 + React islands) + headless CMS | 21-30 дней |

Алгоритм масштабируется линейно по дням, но сложность mass operations растёт экспоненциально без шаблонизатора.
