## Project Overview
- Company: "Огни Эльфов" (elfprint.ru), 20+ years, own factory in Moscow
- Corporate merch turnkey (primary), wholesale items (secondary)
- Segments: B2C (from 10 pcs), WB/Ozon sellers (fulfillment), Corporate (150K–2M RUB)
- Design: Apple-style minimalism

## Tech Stack
- Astro 5 (hybrid) + @astrojs/react + @astrojs/node
- Tailwind CSS 4 + shadcn/ui (React islands)
- Content: Astro Content Collections + Zod (MDX blog, JSON catalog)
- Forms: Astro Server Endpoints → Telegram Bot API + PostgreSQL
- SEO: @astrojs/sitemap + JSON-LD + robots.txt (Clean-param for UTM)
- Analytics: Яндекс.Метрика (PRIMARY) + GA4 (secondary)
- Deploy: Timeweb Cloud VPS (Moscow), nginx + PM2 | CI/CD: GitHub Actions → SSH

## Design System
Colors: bg #FFFFFF, secondary #F5F5F7, text #1D1D1F / #6E6E73 / #86868B, accent #C6F24E
Typography: Onest — headings weight 800 letter-spacing -0.03em, body 18px/1.5, buttons 600
Components: pill buttons (r50px), cards (r16px, hover -4px+shadow), sticky nav (blur 20px)
Layout: section spacing 96–128px, container max-w 1280px, fade-in via IntersectionObserver

## File Structure
src/pages/ (.astro SSG) → catalog/, uslugi/, blog/, api/ (SSR endpoints: contact, callback, price-download)
src/components/ → layout/ (.astro), sections/ (.astro), ui/ (.tsx), forms/ (.tsx)
src/content/ → blog/ (MDX), catalog/ (JSON), services/ (MDX)
src/layouts/ → BaseLayout.astro, BlogLayout.astro | src/styles/ → global.css

## Coding Standards
- .astro for pages/layouts; .tsx for React islands (forms, menu, accordion, gallery)
- `client:visible` for below-fold forms, `client:load` for nav
- Content Collections + Zod schemas; Server Endpoints in src/pages/api/
- Images: WebP/AVIF, Astro `<Image>`, always set width/height
- JSON-LD schema.org in <head>; TypeScript strict, no `any`

## Content & SEO
Language: Russian. Yandex = 70.7% RU market — optimize FIRST.
EVERY page: unique title + meta description + OG tags + schema.org. URLs: transliterated (/catalog/futbolki).
**IMPORTANT:** Before content/SEO work → read `docs/seo-rules.md` and `docs/copywriting-guide.md`

## 152-FZ (Russian Data Law)
Host ONLY on Russian servers (Timeweb Cloud). Consent checkbox on every form. Privacy policy in footer.
**IMPORTANT:** Before infra/analytics/form changes → read `docs/legal.md`

## Self-Improvement Protocol
Use `claude-md-management:revise-claude-md` skill when new lessons are found.
- LESSON [min-order]: "от X дней/шт" claims use X=1 — verified by Self-Verify greps
- LESSON [propagation]: repeated content → grep entire site before editing
- LESSON [json-ld]: never wrap email/phone in HTML tags inside JSON-LD scripts
- LESSON [ftp-mirror]: always upload BOTH root .html AND /subdir/index.html mirrors

## Change Propagation Rule (CRITICAL)
ANY change to repeated content (phone, email, bank, copy blocks, logos) — grep ENTIRE site first.
- `grep -rn "текст" public/ --include="*.html"` before editing
- Update BOTH root `.html` AND `/subdir/index.html` mirrors
- Check desktop AND mobile blocks AND JSON-LD schema versions

## Self-Verify Before Every Commit (MANDATORY)
Run these checks — if any returns > 0, fix first:
- `grep -rn "Альфа-БАНК\|044525593" public/` → 0
- `grep -rn "Загрузить макет\|price-popup" public/ --include="*.html" | grep -v admin` → 0
- `grep -rn '"email": "<a' public/` → 0 (no HTML tags in JSON-LD)
- `grep -rn 'href="/blog" class="bg-white rounded-2xl' public/blog.html` → 0
- `grep -rn "от [2-9] дней\|от [2-9][0-9]* дней\|от [2-9] дня" public/ --include="*.html" | grep -v "admin\|logo\|30 минут\|доставк"` → 0
- `grep -rn "от [2-9][0-9]\+ шт\b\|от [0-9][0-9][0-9] шт\b" public/ --include="*.html" | grep -v "admin\|logo\|экономич\|₽"` → 0

## What NOT To Do
- NO foreign servers (152-FZ), NO GA4 as primary, NO personal data abroad (Mailchimp, Notion, Sanity)
- NO invented stats or facts, NO CSS-in-JS (Tailwind only), NO `any` in TypeScript
- NO mobile skip (78% RU users on mobile), NO inbox.ru email on site
- NO Telegram Bot Token in client-side code, NO `output: 'export'` with server endpoints
- NO missing `client:` directive for interactive React components
