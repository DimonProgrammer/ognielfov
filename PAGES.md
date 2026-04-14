# Структура сайта elfprint.ru

> Каждая страница существует в двух файлах: **root** (`public/slug.html`) и **зеркало** (`public/slug/index.html`).
> Правки вносить **в оба файла** одновременно.

---

## Главная

| Страница | Root | Зеркало |
|---|---|---|
| Главная | `public/index.html` | — (нет зеркала) |

---

## Каталог товаров

| Страница | Root | Зеркало |
|---|---|---|
| Каталог (все категории) | `public/catalog.html` | `public/catalog/index.html` |
| Одежда | `public/catalog-odezhda.html` | `public/catalog-odezhda/index.html` |
| Аксессуары | `public/catalog-aksessuary.html` | `public/catalog-aksessuary/index.html` |
| Электроника | `public/catalog-elektronika.html` | `public/catalog-elektronika/index.html` |
| Канцелярия | `public/catalog-kancelyariya.html` | `public/catalog-kancelyariya/index.html` |
| Посуда | `public/catalog-posuda.html` | `public/catalog-posuda/index.html` |
| Текстиль | `public/catalog-tekstil.html` | `public/catalog-tekstil/index.html` |

### Карточки товаров (только зеркало, root отсутствует)

| Страница | Файл |
|---|---|
| Футболки Оверсайз 180г | `public/catalog-odezhda/futbolki-basic-180/index.html` |
| Футболки Premium 240г | `public/catalog-odezhda/futbolki-oversize-240/index.html` |
| Худи 340г | `public/catalog-odezhda/hudi-340/index.html` |
| Лонгсливы 210г | `public/catalog-odezhda/longslivy-210/index.html` |

---

## Услуги

| Страница | Root | Зеркало |
|---|---|---|
| Все услуги | `public/uslugi.html` | `public/uslugi/index.html` |
| DTF-печать | `public/uslugi-dtf.html` | `public/uslugi-dtf/index.html` |
| Шелкография | `public/uslugi-shelkografiya.html` | `public/uslugi-shelkografiya/index.html` |
| Вышивка | `public/uslugi-vyshivka.html` | `public/uslugi-vyshivka/index.html` |
| Сублимация | `public/uslugi-sublimaciya.html` | `public/uslugi-sublimaciya/index.html` |
| УФ-печать | `public/uslugi-uf-pechat.html` | `public/uslugi-uf-pechat/index.html` |
| Тампопечать | `public/uslugi-tampoprint.html` | `public/uslugi-tampoprint/index.html` |

---

## О компании / Корпоративным

| Страница | Root | Зеркало |
|---|---|---|
| О компании | `public/o-kompanii.html` | `public/o-kompanii/index.html` |
| Корпоративным клиентам | `public/korporativnym-klientam.html` | `public/korporativnym-klientam/index.html` |
| Оптом | `public/optom.html` | `public/optom/index.html` |
| Маркетплейсы (WB/Ozon) | `public/marketplejsy.html` | `public/marketplejsy/index.html` |
| Портфолио / Кейсы | `public/portfolio.html` | `public/portfolio/index.html` |
| Контакты | `public/kontakty.html` | `public/kontakty/index.html` |

---

## Блог

| Страница | Root | Зеркало |
|---|---|---|
| Блог (список) | `public/blog.html` | `public/blog/index.html` |
| Статья: Корпоративный мерч / бюджет | `public/blog-korporativnyj-merch.html` | `public/blog-korporativnyj-merch/index.html` |
| Статья: Сублимация vs DTF | `public/blog-sublimacija-vs-dtf.html` | `public/blog-sublimacija-vs-dtf/index.html` |
| Статья: Выбор печати | `public/blog-vybor-pechati.html` | `public/blog-vybor-pechati/index.html` |

---

## Юридические страницы

| Страница | Root | Зеркало |
|---|---|---|
| Политика конфиденциальности | `public/politika-konfidencialnosti.html` | `public/politika-konfidencialnosti/index.html` |
| Пользовательское соглашение | `public/polzovatelskoe-soglashenie.html` | `public/polzovatelskoe-soglashenie/index.html` |
| Согласие на рассылку | `public/soglasie-na-rassylku.html` | `public/soglasie-na-rassylku/index.html` |
| Оферта | `public/oferta.html` | `public/oferta/index.html` |
| Реквизиты | `public/rekvizity.html` | `public/rekvizity/index.html` |
| Cookie | `public/cookie.html` | `public/cookie/index.html` |

---

## Общие файлы (один файл, не дублируется)

| Файл | Назначение |
|---|---|
| `public/b24.js` | Bitrix24 webhook + маска телефона. Телефон ошибки: `+7 (495) 380-40-32` |
| `public/css/custom.css` | Кастомный CSS (анимации, gallery-thumb, slider-dot) |
| `public/js/animations.js` | Fade-in + IntersectionObserver |
| `public/js/mobile-menu.js` | Мобильное меню (гамбургер) |
| `public/js/product-detail.js` | Галерея, свотчи, размеры, CTA-попап для карточек товаров |
| `public/robots.txt` | SEO: запрет на /admin/, /assets/ |
| `public/sitemap.xml` | XML-карта сайта |
| `public/og-image.jpg` | OG-превью для соцсетей (все страницы) |

---

## Изображения (`public/img/`)

| Тип | Файлы |
|---|---|
| Hero / мерч | `hero-merch-flatlay.jpg`, `merch-brand-spread.jpeg`, `merch-flatlay.jpg` |
| Корп. заказы / кейсы | `корпоративный-заказ-худи.jpg`, `welcome-kit-box.jpeg`, `футболки-в-офисе-1.jpg`, `футболки-в-офисе-2.jpg` |
| Оборудование | `dtf-принтер.jpg`, `mimaki-sublimaciya.webp`, `barudan-vyshivka.webp`, `sroque-shelkografiya.jpg` |
| Продукты | `футболки-цвета-1..4.jpg`, `худи-белое.jpg`, `shopper-tote.jpeg`, `ryukzak.jpg` |
| Товары каталога | `kruzhka.jpeg`, `termokruzhka.jpg`, `ruchki.jpg`, `bloknot-ruchka.jpg`, `poverbank.jpg` |
| Галереи карточек | `public/img/products/futbolki-basic-180/`, `futbolki-oversize-240/`, `hudi-340/`, `longslivy-210/` |

---

## Логотипы клиентов (`public/assets/logos/`)

`yandex.svg`, `tinkoff.svg`, `lukoil.svg`, `letoile.svg`, `armiya-rossii.svg`, `ldpr.svg`

---

## Правила внесения правок

### Контакты (телефон/email) — 70+ вхождений
```bash
# Перед правкой проверить количество:
grep -rn "+7 (495) 380-40-32" public/ --include="*.html" | wc -l
# Менять скриптом python, не вручную
```

### Повторяющиеся блоки во всех/большинстве страниц
| Блок | Где искать | Тип правки |
|---|---|---|
| Шапка (nav) | `<nav ` до `</nav>` | Python replace по всем файлам |
| Футер | `<footer ` до `</footer>` | Python replace по всем файлам |
| Попап форма | `id="popup-form"` | Python replace по всем файлам |
| Виджет мессенджеров | `id="msg-widget"` или `id="msg-toggle"` | Python replace по всем файлам |
| CTA-секция тёмная | `id="cta"` | Python replace по группам страниц |

### Self-verify перед деплоем (из CLAUDE.md)
```bash
grep -rn "Альфа-БАНК\|044525593" public/ | wc -l          # → 0
grep -rn "Загрузить макет\|price-popup" public/ --include="*.html" | grep -v admin | wc -l  # → 0
grep -rn '"email": "<a' public/ | wc -l                    # → 0
grep -rn "от [2-9] дней" public/ --include="*.html" | grep -v "admin\|logo\|30 минут\|доставк" | wc -l  # → 0
grep -rn "mcp.figma.com" public/ --include="*.html" | wc -l # → 0
```

---

## Статус изменений (апрель 2026)

### ✅ Готово к деплою (локально исправлено, на сайте ещё старое)
- `b24.js` — телефон ошибки исправлен (был 646-07-59)
- `og-image.jpg` — создан (был 404)
- 69 HTML — удалён Figma capture.js
- 62 HTML — добавлен «О компании» в футер
- 53 HTML — добавлен телефон Елены в футер
- 12 HTML — добавлен «О нас» в шапку (юридические страницы)
- `uslugi-dtf` (×2) — чип «от 3 дней» → «от 1 дня»
- `uslugi-shelkografiya`, `uslugi-vyshivka` (×2 каждый) — чип «от 100 шт.» → «от 1 шт.»
- 4 карточки товаров — убрана «Размерная сетка» (кнопка + модал)
- 4 карточки товаров — галерея 3:4 компактная (slideW ≤ 255px, высота 340px)
- 3+1 карточки товаров — добавлен slider JS (у oversize/hudi/longslivy его не было)
- `korporativnym-klientam` (×2) — 3 плейсхолдера заменены фотографиями
- `rekvizity` (×2) — банк обновлён: Альфа-БАНК → Точка

### ⚠️ Требует деплоя
Все изменения выше в `public/` → задеплоить через `deploy.py` на FTP reg.ru
