## Project Overview
- Company: "Огни Эльфов" (elfprint.ru), 20+ years, 300+ clients, own factory in Moscow
- Positioning: corporate merch turnkey (primary), wholesale items (secondary, separate page)
- Three audience segments: B2C (small orders from 10), WB/Ozon sellers (fulfillment, ~300 items/day), Corporate (HR/marketing, avg 150K-2M RUB)
- Known clients: Армия России, ЛДПР, Летуаль, Тинькофф, Яндекс, Лукойл
- Design: Apple-style minimalism

## Tech Stack
- Astro 5 (hybrid mode) + @astrojs/react + @astrojs/node
- Tailwind CSS 4 + shadcn/ui (React islands)
- Content: Astro Content Collections + Zod (MDX for blog, JSON for catalog)
- Forms: Astro Server Endpoints → Telegram Bot API + PostgreSQL
- SEO: @astrojs/sitemap + JSON-LD + robots.txt (with Clean-param for UTM)
- Analytics: Яндекс.Метрика (PRIMARY) + GA4 (secondary)
- Deploy: Timeweb Cloud VPS (Moscow), nginx + PM2
- CI/CD: GitHub Actions → SSH deploy

## Design System
Colors:
- Background: #FFFFFF
- Secondary bg: #F5F5F7
- Text primary: #1D1D1F
- Text secondary: #6E6E73
- Text tertiary: #86868B
- Accent: #C6F24E (lime)

Typography: Onest (Google Fonts)
- Headings: weight 800, letter-spacing -0.03em
- Body: weight 400, 18px, line-height 1.5
- Buttons: weight 600

Components:
- Buttons: pill-shape, border-radius 50px
- Cards: border-radius 16px, hover translateY(-4px) + shadow
- Nav: sticky, backdrop-filter blur(20px), frosted glass
- Section spacing: 96-128px
- Container: max-width 1280px
- Animations: fade-in on scroll via IntersectionObserver

## File Structure
```
src/
  pages/           # .astro — SSG by default
    index.astro
    catalog/
    uslugi/
    blog/
    api/           # Server Endpoints (SSR)
      contact.ts
      callback.ts
      price-download.ts
  components/
    layout/        # .astro — Header, Footer, Nav
    sections/      # .astro — Hero, Services, Stats, FAQ
    ui/            # .tsx — shadcn/ui React islands
    forms/         # .tsx — ContactForm, CallbackForm
  content/
    blog/          # MDX files
    catalog/       # JSON files
    services/      # MDX files
  layouts/
    BaseLayout.astro
    BlogLayout.astro
  styles/
    global.css
```

## Coding Standards
- .astro files for pages and layouts (SSG by default)
- .tsx files for React islands (forms, mobile menu, accordion, gallery)
- Use `client:visible` for forms below fold, `client:load` for nav menu
- Content Collections with Zod schemas for blog and catalog
- Server Endpoints in src/pages/api/ for form handling
- Images: WebP/AVIF, Astro `<Image>` from astro:assets, always set width/height
- Schema.org via JSON-LD in <head> of layouts
- TypeScript strict mode, no `any`

## Content & SEO (Yandex-first)
- Language: Russian for content, English for technical terms
- Yandex = 70.7% of Russian search market — optimize for Yandex FIRST
- EVERY page must have: unique title + meta description + OG tags + schema.org
- Commercial ranking factors (MANDATORY for Yandex B2B):
  - INN/OGRN in footer and /rekvizity page
  - Phone with city code (+7 495) on EVERY page
  - Visible prices (at least "от X руб.")
  - Portfolio with real photos
  - Reviews with real names
  - Delivery/payment/guarantee info
- URLs: transliterated Latin (/catalog/futbolki, NOT Russian chars)
- robots.txt: include Clean-param for UTM parameters (Yandex-specific)
- Register texts in Yandex.Webmaster "Original Texts" before publishing

Anti-AI cliche rules (top 5 bans):
1. NO "рубленые фразы" — "Написал. Проверил. Отправил."
2. NO "кинематограф" — "Понедельник, 9 утра. Открываешь каталог..."
3. NO "ложная глубина" — "Проблема не в мерче, проблема в подходе"
4. NO "фальшивая близость" — "Знакомо?", "Узнаёте себя?"
5. NO invented facts — NEVER make up numbers, names, statistics

Reference files:
- docs/PRD.md — page requirements
- docs/copywriting-guide.md — tone, voice, examples
- docs/seo-keywords-research.md — keywords per page
- Исследования/19_SEO_маркетинг_глубокий.md — Yandex SEO factors

## 152-FZ Compliance (Russian Data Law)
- Host ONLY on Russian servers (Timeweb Cloud, Moscow)
- Consent checkbox under EVERY form: "Согласен на обработку персональных данных"
- Privacy policy link in footer (separate document since Sept 1, 2025)
- Store form data in PostgreSQL on VPS (Moscow)
- Яндекс.Метрика = PRIMARY analytics (GA4 = secondary, no PD export abroad)
- Do NOT use: Vercel, Netlify, Cloudflare Pages, Mailchimp, Notion, Sanity cloud

## Self-Improvement Protocol
When I make a repeated mistake OR discover a new pattern that prevents future errors:
1. Add a one-line rule to the relevant section below (Self-Verify, What NOT To Do, or a new section)
2. Include a grep/check command if verifiable
3. Use the `claude-md-management:revise-claude-md` skill to update this file in future sessions

**Format for new lessons:**
```
- LESSON [keyword]: rule description — check: `grep command` → 0
```

**Recorded lessons this project:**
- LESSON [min-order]: "от X дней/шт" claims must use X=1 — grep check added to Self-Verify
- LESSON [propagation]: changes to repeated content (phone, email, bank) need site-wide grep before editing
- LESSON [json-ld]: never wrap email/phone in HTML tags inside JSON-LD scripts
- LESSON [ftp-mirror]: always upload BOTH root .html AND /subdir/index.html mirrors

## Change Propagation Rule (CRITICAL)
When making ANY change to content that appears on multiple pages (phone numbers, email, hours, bank details, copy blocks, button texts, logos, etc.) — ALWAYS search the entire site for ALL occurrences and update them simultaneously. Never update just the page the user mentioned.
- Use `grep -rn "текст" public/ --include="*.html"` to find all instances before editing
- Both `.html` root files AND `/subdirectory/index.html` mirrors must be updated
- Check for the same element in different formats (e.g. desktop vs mobile blocks, text vs JSON-LD schema)

## Self-Verify Before Every Commit (MANDATORY)
Run these checks before every commit/deploy. If any returns > 0 — fix first:
- `grep -rn "Альфа-БАНК\|044525593" public/` → 0
- `grep -rn "Загрузить макет\|price-popup" public/ --include="*.html" | grep -v admin` → 0
- `grep -rn '"email": "<a' public/` → 0 (no HTML tags in JSON-LD)
- `grep -rn 'href="/blog" class="bg-white rounded-2xl' public/blog.html` → 0
- After mass replace: spot-check 2-3 files with grep to confirm change applied
- `grep -rn "от [2-9] дней\|от [2-9][0-9]* дней\|от [2-9] дня" public/ --include="*.html" | grep -v "admin\|logo\|30 минут\|доставк"` → 0 (min order days)
- `grep -rn "от [2-9][0-9]\+ шт\b\|от [0-9][0-9][0-9] шт\b" public/ --include="*.html" | grep -v "admin\|logo\|экономич\|₽"` → 0 (min order qty)

## What NOT To Do
- Do NOT host on foreign servers (152-FZ violation, fines up to 1-3% revenue)
- Do NOT use Google Analytics as primary (Yandex.Metrika is primary)
- Do NOT send personal data abroad (Mailchimp, Notion, Sanity cloud)
- Do NOT invent statistics or facts (anti-hallucination rule)
- Do NOT use CSS-in-JS (Tailwind only)
- Do NOT skip mobile breakpoints (78% Russian users browse mobile)
- Do NOT use inbox.ru email on site (use corporate email)
- Do NOT forget `client:` directive for interactive React components
- Do NOT store Telegram Bot Token in client-side code
- Do NOT use `output: 'export'` in Astro if you need server endpoints
