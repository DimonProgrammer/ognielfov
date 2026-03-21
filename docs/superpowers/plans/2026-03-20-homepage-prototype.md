# Homepage Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-perfect HTML/Tailwind prototype of the Огни Эльфов homepage with Apple-like aesthetics, ready for Figma capture via MCP.

**Architecture:** Single-page HTML with Tailwind CSS via CDN. 10 sections, scroll animations via Intersection Observer. Mobile-first responsive. No build tools — open index.html in browser directly.

**Tech Stack:** HTML, Tailwind CSS (CDN), Google Fonts (Onest), vanilla JS (scroll animations)

**Spec:** `docs/superpowers/specs/2026-03-20-homepage-design.md`

---

## File Structure

```
prototype/
├── index.html          # Main page — all 10 sections
├── css/
│   └── custom.css      # Custom styles (pill buttons, frosted nav, animations)
└── js/
    └── animations.js   # Intersection Observer fade-in + scroll effects
```

Single HTML file with inline Tailwind classes. Custom CSS only for what Tailwind can't do (backdrop-filter, custom animations). No components, no build, no framework — maximum simplicity for Figma capture.

---

## Task 1: Project scaffold + Tailwind + Onest

**Files:**
- Create: `prototype/index.html`
- Create: `prototype/css/custom.css`
- Create: `prototype/js/animations.js`

- [ ] **Step 1: Create index.html with Tailwind CDN, Onest font, base structure**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Огни Эльфов — Корпоративный мерч под ключ</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: { accent: '#C6F24E', dark: '#1D1D1F', secondary: '#6E6E73', tertiary: '#86868B', light: '#F5F5F7' },
          fontFamily: { onest: ['Onest', 'sans-serif'] },
          maxWidth: { container: '1280px' },
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/custom.css">
</head>
<body class="font-onest bg-white text-dark">
  <!-- Sections will be added in subsequent tasks -->
  <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create custom.css with base styles**

```css
/* Frosted glass nav */
.nav-glass {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

/* Pill button */
.btn-pill {
  border-radius: 50px;
  transition: opacity 0.3s ease;
}
.btn-pill:hover { opacity: 0.85; }

/* Card hover */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Fade-in on scroll */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.reveal-stagger > .reveal:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger > .reveal:nth-child(2) { transition-delay: 100ms; }
.reveal-stagger > .reveal:nth-child(3) { transition-delay: 200ms; }
.reveal-stagger > .reveal:nth-child(4) { transition-delay: 300ms; }
.reveal-stagger > .reveal:nth-child(5) { transition-delay: 400ms; }
.reveal-stagger > .reveal:nth-child(6) { transition-delay: 500ms; }
```

- [ ] **Step 3: Create animations.js**

```js
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
```

- [ ] **Step 4: Open in browser, verify Onest loads and Tailwind works**

Run: `open prototype/index.html`
Expected: blank white page, Onest font loaded (check DevTools Network tab)

- [ ] **Step 5: Commit**

```bash
git add prototype/
git commit -m "feat: scaffold homepage prototype with Tailwind + Onest"
```

---

## Task 2: Sticky navigation

**Files:**
- Modify: `prototype/index.html` (add nav inside `<body>`)

- [ ] **Step 1: Add sticky nav with frosted glass effect**

Insert at top of `<body>`:

```html
<!-- NAV -->
<nav class="nav-glass fixed top-0 left-0 right-0 z-50">
  <div class="max-w-container mx-auto px-6 flex items-center justify-between h-16">
    <a href="#" class="font-extrabold text-lg tracking-tight">ОГНИ ЭЛЬФОВ</a>
    <div class="hidden md:flex items-center gap-7">
      <a href="#services" class="text-sm font-medium text-secondary hover:text-dark transition-colors">Услуги</a>
      <a href="#catalog" class="text-sm font-medium text-secondary hover:text-dark transition-colors">Каталог</a>
      <a href="#cases" class="text-sm font-medium text-secondary hover:text-dark transition-colors">Кейсы</a>
      <a href="#about" class="text-sm font-medium text-secondary hover:text-dark transition-colors">О нас</a>
      <a href="#contacts" class="text-sm font-medium text-secondary hover:text-dark transition-colors">Контакты</a>
    </div>
    <a href="#cta" class="btn-pill bg-accent text-dark px-6 py-2.5 text-sm font-semibold">Обсудить проект</a>
  </div>
</nav>
```

- [ ] **Step 2: Verify — nav sticks on scroll, blur effect visible**

- [ ] **Step 3: Commit**

---

## Task 3: Hero section

**Files:**
- Modify: `prototype/index.html` (add hero after nav)

- [ ] **Step 1: Add centered hero with CTA, logos, full-width image**

```html
<!-- HERO -->
<section class="pt-32 pb-0">
  <div class="max-w-container mx-auto px-6 text-center">
    <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none max-w-3xl mx-auto">
      Корпоративный мерч, который хочется носить
    </h1>
    <p class="text-lg text-secondary mt-6 max-w-lg mx-auto leading-relaxed">
      Полный цикл — от идеи до доставки. Собственное производство в Москве, 20 лет опыта
    </p>
    <div class="flex items-center justify-center gap-4 mt-8">
      <a href="#cta" class="btn-pill bg-accent text-dark px-8 py-3.5 font-semibold">Обсудить проект</a>
      <a href="#catalog" class="font-medium border-b border-dark pb-0.5 hover:opacity-70 transition-opacity">Смотреть каталог →</a>
    </div>
    <!-- Trust logos -->
    <div class="flex items-center justify-center gap-10 mt-10 pb-12">
      <span class="text-xs font-semibold tracking-widest opacity-25">ЯНДЕКС</span>
      <span class="text-xs font-semibold tracking-widest opacity-25">СБЕР</span>
      <span class="text-xs font-semibold tracking-widest opacity-25">OZON</span>
      <span class="text-xs font-semibold tracking-widest opacity-25">VK</span>
      <span class="text-xs font-semibold tracking-widest opacity-25">МТС</span>
      <span class="text-xs font-semibold tracking-widest opacity-25">МФТИ</span>
    </div>
  </div>
  <!-- Full-width hero image -->
  <div class="w-full h-80 md:h-[480px] bg-light flex items-center justify-center text-tertiary text-sm">
    [ Фото: мерч-продукция — худи, футболки, шоперы с корпоративным брендингом ]
  </div>
</section>
```

- [ ] **Step 2: Verify — centered layout, responsive, CTA visible**

- [ ] **Step 3: Commit**

---

## Task 4: Цифры доверия

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add stats section**

```html
<!-- STATS -->
<section class="bg-light py-24">
  <div class="max-w-container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal-stagger">
    <div class="reveal">
      <div class="text-4xl md:text-5xl font-extrabold">20+</div>
      <div class="text-sm text-secondary mt-2">лет на рынке</div>
    </div>
    <div class="reveal">
      <div class="text-4xl md:text-5xl font-extrabold">300+</div>
      <div class="text-sm text-secondary mt-2">корпоративных клиентов</div>
    </div>
    <div class="reveal">
      <div class="text-4xl md:text-5xl font-extrabold">700K+</div>
      <div class="text-sm text-secondary mt-2">единиц продукции</div>
    </div>
    <div class="reveal">
      <div class="text-4xl md:text-5xl font-extrabold">14</div>
      <div class="text-sm text-secondary mt-2">дней — средний срок</div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify — numbers animate in on scroll**

- [ ] **Step 3: Commit**

---

## Task 5: Услуги (3 карточки)

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add services section with 3 hover cards**

3 карточки: Мерч с нуля / Брендирование готовой продукции / Мерч-паки. Каждая — `card-hover` с иконкой, заголовком, описанием, CTA «Подробнее →».

- [ ] **Step 2: Verify hover effects**

- [ ] **Step 3: Commit**

---

## Task 6: Как это работает (4 шага)

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add process timeline**

4 шага горизонтально: Бриф → Дизайн → Производство → Доставка. Лайм-круги с номерами, соединены линией. Описание под каждым.

- [ ] **Step 2: Verify — responsive (stacks on mobile)**

- [ ] **Step 3: Commit**

---

## Task 7: Каталог категорий (сетка 3×2)

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add catalog grid**

6 карточек: Одежда / Аксессуары / Посуда / Канцелярия / Текстиль / Электроника. Placeholder-фото, название, «от X руб.», hover-эффект.

- [ ] **Step 2: Commit**

---

## Task 8: Кейсы / Портфолио

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add cases section**

3-4 карточки проектов. Крупное фото-placeholder, название проекта, краткое описание, что было сделано.

- [ ] **Step 2: Commit**

---

## Task 9: Технологии нанесения

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add tech section**

DTF, шелкография, сублимация, вышивка, тиснение. Горизонтальный скролл или сетка. Иконка + название + краткое описание.

- [ ] **Step 2: Commit**

---

## Task 10: Отзывы

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add testimonials**

2-3 карточки-цитаты. Текст отзыва, имя, должность, компания. Лайм-кавычки как декор.

- [ ] **Step 2: Commit**

---

## Task 11: FAQ (аккордеон)

**Files:**
- Modify: `prototype/index.html`
- Modify: `prototype/js/animations.js` (add accordion toggle)

- [ ] **Step 1: Add FAQ section with 6 questions**

Аккордеон на чистом JS. Вопросы: минимальный тираж, сроки, доставка, дизайн-макеты, оплата, гарантии.

- [ ] **Step 2: Commit**

---

## Task 12: Финальный CTA + Footer

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Add CTA section**

Полноширинный блок на #F5F5F7. Заголовок «Обсудить проект», форма (имя, телефон, email), кнопка лайм. Или кнопки WhatsApp/Telegram.

- [ ] **Step 2: Add footer**

Логотип, навигация, контакты, реквизиты, копирайт.

- [ ] **Step 3: Commit**

---

## Task 13: Mobile responsive + финальная полировка

**Files:**
- Modify: `prototype/index.html`
- Modify: `prototype/css/custom.css`

- [ ] **Step 1: Test all breakpoints (375, 768, 1024, 1440)**
- [ ] **Step 2: Add hamburger menu for mobile nav**
- [ ] **Step 3: Fix any spacing/typography issues on mobile**
- [ ] **Step 4: Final visual review**
- [ ] **Step 5: Commit**

---

## Task 14: Figma capture

- [ ] **Step 1: Start local server for prototype**

```bash
cd prototype && python3 -m http.server 3000
```

- [ ] **Step 2: Capture to Figma via MCP**

Prompt: "Start a local server for my app and capture the UI in a new Figma file"

- [ ] **Step 3: Verify layers are editable in Figma**
