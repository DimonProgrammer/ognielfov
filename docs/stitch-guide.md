# Google Stitch — инструкция и промпты

## Что это

Google Stitch — AI-инструмент от Google Labs для генерации UI-дизайна из текстовых промптов. Выдаёт HTML + Tailwind CSS, можно экспортировать в Figma. Бесплатный, работает на Gemini 2.5 Pro.

**Веб-интерфейс:** https://stitch.withgoogle.com/

## Подключение через MCP (уже настроено)

MCP-сервер `@_davideast/stitch-mcp` подключён через API-ключ в `~/.claude/settings.json`:
```json
"stitch": {
  "command": "node",
  "args": ["/usr/local/lib/node_modules/@_davideast/stitch-mcp/bin/stitch-mcp.js", "proxy"],
  "env": {
    "STITCH_API_KEY": "..."
  }
}
```

## Доступные MCP-инструменты

### Виртуальные (proxy)
| Инструмент | Описание |
|------------|----------|
| `get_screen_code` | Получить HTML-код экрана |
| `get_screen_image` | Получить скриншот экрана (base64) |
| `build_site` | Собрать Astro-сайт из экранов → маршруты |

### Нативные Stitch API
| Инструмент | Описание |
|------------|----------|
| `create_project` | Создать новый проект |
| `get_project` | Получить данные проекта |
| `list_projects` | Список всех проектов |
| `list_screens` | Список экранов в проекте |
| `get_screen` | Получить данные экрана |
| `generate_screen_from_text` | **Главный** — генерация экрана из текстового промпта |
| `edit_screens` | Редактирование существующих экранов |
| `generate_variants` | Генерация вариантов экрана |
| `create_design_system` | Создать дизайн-систему |
| `update_design_system` | Обновить дизайн-систему |
| `list_design_systems` | Список дизайн-систем |
| `apply_design_system` | Применить дизайн-систему к проекту |

## Рабочий процесс (пошаговый)

### 1. Создание проекта
```
create_project(title: "Огни Эльфов — Главная")
→ projectId
```

### 2. (Опционально) Создание дизайн-системы
```
create_design_system(
  title: "Огни Эльфов",
  colors: { primary: "#C6F24E", bg: "#FFFFFF", text: "#1D1D1F", secondary_bg: "#F5F5F7" },
  fonts: { heading: "Onest", body: "Onest" }
)
```
Затем:
```
apply_design_system(projectId: "...", designSystemId: "...")
```

### 3. Генерация экранов из промптов
```
generate_screen_from_text(
  projectId: "...",
  prompt: "..."
)
→ screenId
```

### 4. Получение кода
```
get_screen_code(projectId: "...", screenId: "...")
→ HTML + Tailwind CSS
```

### 5. Получение скриншота
```
get_screen_image(projectId: "...", screenId: "...")
→ base64 PNG
```

### 6. Сборка Astro-сайта
```
build_site(
  projectId: "...",
  routes: [
    { screenId: "abc", route: "/" },
    { screenId: "def", route: "/catalog" }
  ]
)
→ HTML для каждой страницы
```

## Формула промпта

```
[Тип страницы] + [Стиль/эстетика] + [Конкретный контент] + [Технические требования]
```

### Принципы эффективных промптов

1. **Одна правка за раз** — не мешать layout + компоненты + цвета в одном промпте
2. **UI-термины** — "navigation bar", "hero section", "card grid", а не "красивая шапка"
3. **Конкретные указания** — "primary CTA button with text 'Рассчитать заказ'" а не "кнопка"
4. **Zoom-out → zoom-in** — сначала общая структура, потом детали

## Промпты для проекта "Огни Эльфов"

### Базовый промпт-шаблон (для всех страниц)
```
Design a modern Russian-language landing page for a corporate merch manufacturer
"Огни Эльфов" (elfprint.ru).

Style: Apple-inspired minimalism, lots of white space.
Background: #FFFFFF, secondary #F5F5F7.
Text: #1D1D1F (primary), #6E6E73 (secondary).
Accent: #C6F24E (lime green) for CTAs and highlights.
Font: Onest (Google Fonts), headings weight 800, body weight 400 18px.
Buttons: pill-shaped (border-radius 50px), accent color.
Cards: border-radius 16px, subtle shadow on hover.
Container: max-width 1280px, centered.
Section spacing: 96-128px vertical padding.

Desktop layout (1440px viewport).
All text in Russian.
```

### Главная страница
```
[Базовый шаблон] +

Page: Homepage for corporate merch production company.

Sections:
1. HERO — Large headline "Мерч с логотипом на заказ" with subtext about 20+ years experience.
   Primary CTA "Рассчитать заказ" (lime green pill button).
   Secondary CTA "Каталог продукции" (outline button).

2. SERVICES GRID — 6 cards in 3x2 grid:
   DTF-печать, Шелкография, Вышивка, Сублимация, УФ-печать, Тампопечать.
   Each card: icon + title + short description + "Подробнее" link.

3. STATS BAR — Horizontal row on #F5F5F7 background:
   "20+ лет", "300+ клиентов", "Собственная фабрика", "от 1 штуки"

4. PORTFOLIO — 4-column masonry grid with project thumbnails.
   Section title "Наши работы". "Смотреть все" button below.

5. CLIENTS — Logo carousel: Армия России, ЛДПР, Летуаль, Тинькофф, Яндекс, Лукойл.
   Use placeholder rectangles for logos.

6. CTA DARK PANEL — Dark (#1D1D1F) full-width section.
   "Обсудить проект" heading, phone +7 (495) XXX-XX-XX, email, CTA button.

7. FOOTER — Company details, INN/OGRN, navigation links, phone, email.
```

### Страница каталога (категория)
```
[Базовый шаблон] +

Page: Product catalog page for branded clothing category.

Sections:
1. BREADCRUMBS — "Главная → Каталог → Одежда"

2. HERO — Title "Брендированная одежда на заказ",
   subtitle about print methods and customization.
   No image, text-only hero on #F5F5F7.

3. PRODUCT GRID — 3-column grid of product cards:
   Each card: product image placeholder (300x400), title, "от XXX ₽" price, order button.
   Products: Футболки, Поло, Худи, Свитшоты, Куртки, Жилеты.

4. ADVANTAGES — 4 icon blocks in a row:
   "Собственное производство", "Любой тираж от 1 шт", "Доставка по РФ", "Макет бесплатно"

5. CTA DARK PANEL — Same as homepage.
6. FOOTER — Same as homepage.
```

### Страница услуги (DTF, шелкография и т.д.)
```
[Базовый шаблон] +

Page: Service page for [название метода печати].

Sections:
1. BREADCRUMBS — "Главная → Услуги → [Название]"

2. HERO — Title "[Название] на заказ в Москве",
   subtitle explaining the technology.
   CTA "Рассчитать стоимость" (lime pill button).
   Right side: image placeholder of printed product.

3. HOW IT WORKS — 4 numbered steps in horizontal timeline:
   Step cards with number, title, description.
   Connected by a lime (#C6F24E) line.

4. PRICE TABLE — Table or cards showing pricing tiers:
   Columns: тираж, цена за единицу, итого.
   "от" prefix on prices.

5. ADVANTAGES — 3-column cards with icons.

6. PORTFOLIO SAMPLES — 3 photos from this method's projects.

7. FAQ ACCORDION — 5-6 questions about this print method.
   Expandable items.

8. CTA DARK PANEL
9. FOOTER
```

### Страница блога (статья)
```
[Базовый шаблон] +

Page: Blog article page with long-form content.

Layout:
- Centered content column, max-width 720px.
- Left margin: table of contents (sticky on scroll).

Sections:
1. BREADCRUMBS — "Главная → Блог → [Название статьи]"
2. ARTICLE HEADER — H1 title, publication date, reading time, author.
3. ARTICLE BODY — Headings (H2, H3), paragraphs, images, pull quotes,
   bulleted lists, comparison tables. Use placeholder text.
4. RELATED ARTICLES — 3-column card grid "Читайте также"
5. CTA DARK PANEL
6. FOOTER
```

## Режимы генерации в Stitch

| Режим | Модель | Лимит | Когда использовать |
|-------|--------|-------|--------------------|
| Standard (Flash) | Gemini 2.5 Flash | ~350/мес | Быстрая итерация, черновики |
| Experimental (Thinking) | Gemini 2.5 Pro | ~50/мес | Финальные варианты, сложные лейауты |

## Редактирование экранов

Для итеративных правок используй `edit_screens`:
```
edit_screens(
  projectId: "...",
  screenIds: ["screenId"],
  prompt: "Move the CTA section above the FAQ. Change accent color to #C6F24E."
)
```

**Правило:** Одна-две правки за один промпт. Не комбинировать layout-изменения с цветовыми.

## Экспорт в Figma

Stitch имеет кнопку "Copy to Figma" в веб-интерфейсе. Через MCP:
1. `get_screen_code` → получить HTML
2. Использовать Figma MCP `generate_figma_design` для переноса HTML→Figma
3. Или вручную через stitch.withgoogle.com → "Copy to Figma"

## Экспорт в код (Astro)

```bash
# Собрать Astro-сайт из экранов
STITCH_API_KEY="..." stitch-mcp site -p <projectId>
```

Или через MCP: `build_site` → получить HTML для каждого маршрута → адаптировать под `.astro` файлы.

## CLI-команды (терминал)

```bash
# Инициализация и авторизация
stitch-mcp init

# Список проектов
stitch-mcp view --projects

# Превью в браузере
stitch-mcp serve -p <projectId>

# Сборка Astro-сайта
stitch-mcp site -p <projectId>

# Просмотр экранов
stitch-mcp screens -p <projectId>

# Проверка здоровья
stitch-mcp doctor
```

## Типичные ошибки

| Проблема | Решение |
|----------|---------|
| Permission Denied | Проверить billing и Stitch API включён в GCP |
| Токен истёк | Proxy-режим обновляет автоматически. Если API-ключ — не истекает |
| Размытый/плохой дизайн | Уточнить промпт, использовать Experimental mode |
| Русский текст кривой | Указать "Font: Onest from Google Fonts" явно в промпте |
| Нет мобильной версии | Добавить "Create responsive design with mobile breakpoint at 768px" |
