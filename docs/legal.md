# 152-FZ Compliance — Огни Эльфов

## Hosting & Data Storage
- Host ONLY on Russian servers — Timeweb Cloud VPS, Moscow datacenter
- Store all form data (PostgreSQL) on the same VPS in Moscow
- NEVER use: Vercel, Netlify, Cloudflare Pages (foreign hosting = 152-FZ violation, fines 1–3% revenue)

## Analytics
- Яндекс.Метрика = PRIMARY analytics tool (data stays in Russia)
- GA4 = secondary only, configure with NO personal data export abroad
- NEVER use Mixpanel, Amplitude, Heap or similar foreign analytics as primary

## Forms & Personal Data
- Consent checkbox under EVERY form: "Согласен на обработку персональных данных"
- Link to Privacy Policy must be visible in footer (separate document, required since Sept 1, 2025)
- NEVER send form data to foreign services (Mailchimp, HubSpot, Notion, Sanity cloud, Zapier to foreign endpoints)

## Banned Services (152-FZ incompatible)
- Vercel / Netlify / Cloudflare Pages — foreign hosting
- Mailchimp / Klaviyo / SendGrid (foreign) — email marketing
- Notion / Sanity cloud / Contentful — CMS with foreign data storage
- Any US/EU SaaS that stores Russian users' personal data outside Russia
