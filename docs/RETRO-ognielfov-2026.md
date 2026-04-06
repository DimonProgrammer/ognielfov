# Ретроспектива проекта: elfprint.ru (Огни Эльфов)

**Дата:** 3 апреля 2026
**Разработчик:** Дмитрий Сараев + Claude AI
**Период:** 20 марта — 3 апреля 2026 (14 календарных дней, 9 рабочих)

---

## 1. Что построено

### Масштаб
- 37 HTML-страниц (+ 38 index.html поддиректорий для clean URLs)
- 6 страниц услуг (DTF, шелкография, сублимация, тампопечать, УФ-печать, вышивка)
- 6 каталогов (одежда, электроника, аксессуары, канцелярия, посуда, текстиль)
- 4 статьи блога + листинг
- 5 правовых страниц (политика конф., пользовательское соглашение, cookies, оферта, рассылка)
- 7 бизнес-страниц (контакты, о компании, портфолио, опт, корп. клиенты, маркетплейсы, реквизиты)
- 4 страницы дизайн-системы (noindex)
- 58 изображений в /img/

### Стек
- HTML5 + Tailwind CSS CDN + vanilla JS (4 файла, ~25 KB)
- custom.css: ~590 строк (20+ компонентов)
- b24.js: Bitrix24 CRM через REST webhook
- animations.js: scroll reveal, count-up, carousel, drag-scroll, progress bar
- mobile-menu.js: hamburger toggle
- product-detail.js: галерея, размеры, цвета, sticky CTA
- Vercel (cleanUrls, outputDirectory: public)
- Подготовлен deploy/ для Timeweb Cloud VPS (nginx, PM2)

### Метрики
| Метрика | Значение |
|---------|----------|
| Календарных дней | 14 |
| Рабочих дней (с коммитами) | 9 |
| Всего коммитов | 68 |
| Пиковый день | 30 марта — 20 коммитов |
| HTML-файлов | 37 (уникальных) |
| Размер deploy-папки | 40 MB |
| JS-файлов | 4 |
| CSS-файлов | 1 |

---

## 2. Хронология по фазам

### Фаза 1: Scaffold (20-21 марта) — 3 коммита
```
bab685f scaffold homepage prototype with nav and hero section
5c3f372 add 17 prototype pages with full content and design system
2d7de96 full prototype with logo, design system, and all pages
```
**Ключевое решение:** начать с static HTML, а не Astro 5 (как в CLAUDE.md), чтобы показать результат клиенту за 1 день. Astro — на следующем этапе.

### Фаза 2: Контент-страницы (21 марта) — 7 коммитов
```
afed6fb add 6 catalog category pages with product grids
2dcb8ee add blog nav, review badges, WB/Ozon blocks
1e1da85 add blog strategy and articles
f357285 update header on all 26 pages
b3b7223 add 152-ФЗ compliance + noindex design system
```
**Ключевое решение:** сразу заложить SEO (JSON-LD, OG-теги) и правовой compliance в фундамент, а не как afterthought.

### Фаза 3: Clean URLs + SEO (21-24 марта) — 5 коммитов
```
0879849 remove .html extensions from all internal links
25ab75b add index.html subdirs for 9 pages (Vercel clean URLs)
d7a72de sync subdirectory index.html + USP "от 1 штуки"
10efd54 update H1 tags — remove quantity, add "Москва"
```
**Ключевое решение:** Vercel cleanUrls + поддиректории index.html вместо серверных редиректов. Работает, но создаёт дублирование файлов.

### Фаза 4: Продуктовые страницы + Mobile UX (28-30 марта) — 10 коммитов
```
f753f4f add DonateBoom product page prototype
3e83304 Revert DonateBoom prototype
3067dd6 fix CTA form + 3 product pages
487e4ac replace emoji with real photos in tech cards
b5d2493 replace placeholder photos + mobile gallery slider
8c83452 redesign mobile gallery — peek slider
```
**Ключевое решение:** revert неудачного прототипа DonateBoom (f753f4f→3e83304) вместо попытки исправить. Быстрее начать заново.

### Фаза 5: Инфраструктура (30 марта) — 5 коммитов
```
3e6a4f9 rename prototype/ → public/
101e621 clean up repo — remove local files (89 файлов)
8a46852 add deploy guide + blog CMS guide
3aa3d5c remove research/brief files from git tracking
```
**Ключевое решение:** .vercelignore вместо git LFS для больших файлов. Repo push падал из-за 1.1GB — решено исключением папок.

### Фаза 6: Контакты + Правовые (31 марта — 1 апреля) — 10 коммитов
```
4c5caf5 update all contact links + fix review count
ce03e51 replace Yandex Maps placeholder with real iframe
c3ef8e8 switch nav breakpoints to xl (1280px)
614e0dd add Yandex + 2GIS review badges in footer
c332694 add 5 legal pages + update footer links
```
**Ключевое решение:** Playwright headless Chrome для извлечения текстов правовых страниц с JS-rendered Tilda сайта. Ручной копипаст не работал — Tilda рендерит контент через JS.

### Фаза 7: Messenger + SEO audit (1-2 апреля) — 12 коммитов
```
3f7f7fc remove duplicate legal links + add messenger widget
0f2293d replace WhatsApp with MAX messenger
f386372 use official MAX icon + Yandex review widget
cf131d8 SEO — meta descriptions, titles, canonical URLs, sitemap
bf5b81a center MAX messenger icon
a41d30e fix broken blog article links
8723e96 add price download popup to catalog + service pages
```
**Ключевое решение:** отказ от WhatsApp в пользу MAX (российский мессенджер) — соответствует стратегии локализации.

### Фаза 8: Анимации + CRM (2-3 апреля) — 4 коммита
```
a6e779a premium animations across all pages
6a7d0aa force-reveal above-fold elements + unobserve after trigger
0d8be45 add Bitrix24 CRM lead integration (b24.js)
```
**Ключевое решение:** все анимации в одном JS-файле (animations.js, 212 строк), а не inline-скрипты на каждой странице.

---

## 3. Что работало хорошо

### Процесс
- **Ветка Тест → merge в main** — безопасный деплой, Vercel auto-deploy с main
- **CLAUDE.md** как контракт между человеком и AI — дизайн-система, запреты, стек
- **PRD до кода** (docs/PRD.md) — сэкономил итерации на согласование
- **Быстрый прототип** — клиент увидел рабочий сайт за 1 день

### Техника
- **Tailwind CDN** — zero build step, мгновенная итерация
- **Vercel cleanUrls** — нет .html в URL без серверной настройки
- **IntersectionObserver** — все анимации без библиотек (0 зависимостей)
- **sed/Perl/Python** для mass replacements по 60+ файлам
- **Playwright headless** для извлечения контента с Tilda

### Контент
- **Yandex-first SEO** — Clean-param, Host директива, JSON-LD
- **Anti-AI cliche rules** в CLAUDE.md — контент не звучит как ChatGPT
- **152-ФЗ compliance** заложен с фазы 2
- **Реальные фото** клиента вместо стоковых (после фазы 4)

---

## 4. Что не работало / боли

### Архитектурные
- **CLAUDE.md drift** — описывает Astro 5, а проект полностью static HTML. Новый участник будет в замешательстве
- **77 файлов без шаблонизатора** — каждое изменение header/footer = sed по 60+ файлам. При >10 страницах нужен template engine
- **Clean URL дублирование** — 37 .html + 38 index.html = двойная работа при каждом обновлении

### Процессные
- **20 коммитов за день** (30 марта) — хаотичная работа без чёткого плана на день
- **4 итерации по иконке MAX** — микроменеджмент, нужно группировать визуальные правки в батчи
- **Revert DonateBoom** (f753f4f→3e83304) — нужно было делать feature branch для эксперимента

### Технические
- **Webhook URL в клиентском JS** — b24.js строка 9 содержит полный URL с токеном, виден в DevTools
- **Tailwind CDN ~300KB** — нет tree-shaking, на каждой странице полный CSS
- **Нет минификации** HTML/CSS/JS
- **Нет image optimization** — нет автоматической генерации WebP/AVIF
- **Repo bloat** — рабочие файлы (фото, DOCX, исследования) попали в git, push падал на 1.1GB

---

## 5. 10 уроков

1. **Static HTML для прототипа, SSG после 10 страниц** — показать результат за день, но планировать переход на Astro/11ty
2. **CLAUDE.md = живой документ** — обновлять при КАЖДОМ архитектурном решении, иначе drift
3. **PRD до кода — не роскошь** — экономит 50% итераций по согласованию
4. **.vercelignore и .gitignore в день 1** — не ждать, пока push упадёт на 1.1GB
5. **sed работает до 20 страниц** — после нужен template engine или build script
6. **Playwright > ручной копипаст** для извлечения контента с JS-rendered сайтов (Tilda, Wix, Webflow)
7. **Один JS-файл на фичу** (animations.js, b24.js) > inline-скрипты на каждой странице
8. **Review badges (Яндекс, 2GIS) — бесплатное соц.доказательство**, добавлять сразу
9. **Nav breakpoints тестировать на реальном тексте** — "Контакты производства мерча в Москве" ломал навигацию, хотя "Контакты" помещалось
10. **CRM интеграция = последний шаг** — сначала UI, потом data flow

---

## 6. Рекомендации для следующей фазы

### Критично (до продакшн-запуска)
- [ ] Вынести Bitrix24 webhook из клиентского JS (server-side proxy или Vercel serverless)
- [ ] Добавить Яндекс.Метрику
- [ ] Зарегистрировать тексты в Яндекс.Вебмастер ("Оригинальные тексты")
- [ ] Настроить 301 редиректы с старого Tilda сайта
- [ ] Обновить CLAUDE.md под фактический стек (static HTML, не Astro)

### Важно (первый месяц)
- [ ] Перенести на Astro 5 (или 11ty) для шаблонизации
- [ ] Image optimization pipeline (WebP, сжатие, lazy loading)
- [ ] Минификация HTML/CSS/JS
- [ ] Обновить lastmod в sitemap.xml при каждом деплое
- [ ] Добавить Telegram-уведомления о заявках (помимо Bitrix24)

### Желательно
- [ ] A/B тест двух вариантов hero-секции
- [ ] Подключить CDN для статики (Timeweb CDN или Selectel)
- [ ] Автотесты ссылок (Playwright crawl по всем страницам)
- [ ] Мониторинг аптайма (UptimeRobot)
