# SEO & Marketing Research: elfprint.ru (Corporate Merch)

**Date:** 2026-03-21
**Sources:** 20+ articles (Skillbox, Habr, SEO Sherpa, vc.ru, kokoc.com, key-g.com, senorit.de, airassvet.ru, etc.)
**Status:** COMPREHENSIVE RESEARCH COMPLETE

---

## 1. YANDEX SEO vs GOOGLE SEO in RUSSIA (2025-2026)

### 1.1 Search Engine Market Share (2024-2025)

| Engine | All Devices | Desktop | Mobile |
|--------|------------|---------|--------|
| **Yandex** | **70.7%** | 73.47% | 68.4% |
| **Google** | **27.85%** | ~25% | ~30% |
| Bing | 0.93% | — | — |
| Mail.ru | 0.14% | — | — |
| Yahoo | 0.13% | — | — |

**Key trends:**
- Yandex growth YoY: +9.6% overall, +10.64% mobile, +8.5% desktop
- Growth driven by mandatory preinstallation law for Russian software on Android
- Google still significant for B2B/information queries (~30% of that segment)
- Market stabilizing after major redistribution post-Google exit from Russian ad market
- **Generative AI search (Yandex Neuro)** growing but hasn't significantly impacted organic traffic volumes yet

**IMPLICATION FOR ELFPRINT.RU:** Yandex is PRIMARY optimization target (~71% of traffic). Google is SECONDARY but still matters (~28%). Optimize for both but prioritize Yandex-specific signals.

### 1.2 Key Differences: Yandex vs Google Algorithms

| Factor | Yandex | Google |
|--------|--------|--------|
| **#1 Priority** | Behavioral factors (PF) | Content quality + backlinks |
| **Commercial signals** | CRITICAL (dedicated "Proxima" algorithm) | Important but less formalized |
| **Regionality** | Strong region-based ranking | Less region-dependent |
| **Backlinks** | Less weight, penalizes purchased links ("Minusinsk") | High weight, penalizes spam links |
| **JS Rendering** | NOW capable (2024-2025 breakthrough) but SSR still safer | Excellent JS rendering |
| **Core Web Vitals** | Less strict thresholds, not official ranking factor | Official ranking signal |
| **Duplicate content** | VERY strict, penalizes even internal duplication | Strict but more forgiving |
| **User behavior** | Absolute priority (CTR, dwell time, return visits) | Important but not primary |
| **Content freshness** | Values regular updates strongly | Values E-E-A-T more |
| **Exact match keywords** | Still values exact match in titles/H1/first paragraph | More semantic/contextual |
| **Algorithm names** | Vega (2019), Korolyov, Proxima (commercial) | Helpful Content, Core Updates |

### 1.3 Yandex IKS (Индекс качества сайта)

**What it is:** Site Quality Index, replaced old TIC (ТИЦ) in August 2018. Evaluates site usefulness through user satisfaction signals across all Yandex services.

**Factors IKS considers:**
1. **Content quality & usefulness** -- expert, unique, regularly updated content
2. **User behavior signals** -- time on page, viewing depth, return visits, search satisfaction
3. **Trust/authority** -- brand reputation, direct brand searches, loyal audience
4. **Technical performance** -- speed, mobile responsiveness, Core Web Vitals

**IKS Scale (by niche):**
| Score | Examples |
|-------|----------|
| 0-20 | New blogs, local businesses |
| 20-100 | Small niche resources, regional companies |
| 100-1,000 | Popular portals, established e-commerce |
| 1,000+ | Major marketplaces, media giants |

**Does IKS affect rankings directly?** Officially NO, but strong correlation exists. Top-10 results have significantly higher average IKS. Improving for users improves both rankings and IKS simultaneously.

**How to improve IKS for elfprint.ru:**
1. Expert content with depth (comparisons, video reviews, infographics)
2. Fast site speed, intuitive navigation, mobile-friendly
3. Build audience loyalty (respond to reviews, newsletter, community)
4. Increase brand recognition (industry publications, conferences)
5. AVOID AI-generated low-quality content (Yandex detects it)
6. Updates monthly approximately

### 1.4 Yandex Turbo Pages -- DISCONTINUED

**STATUS: DEAD.** On February 7, 2025, Yandex officially announced discontinuation of Turbo Pages technology. The Turbo section in Yandex Webmaster was scheduled for automatic deactivation 2 months later.

**What to do instead:**
- Ensure the site itself is fast (LCP < 2.5s)
- Use responsive design
- Optimize images (WebP, lazy loading)
- **No need to implement Turbo Pages** -- they are obsolete

### 1.5 Hosting Location

**Does Yandex penalize sites hosted outside Russia?** No direct evidence of penalization for foreign hosting. However:
- Server response time matters (closer servers = faster response)
- Yandex's regional focus means having Russian-region contact info is more important than server location
- Vercel (CDN-based) deploys globally and will serve from nearest edge = acceptable
- **Recommendation:** Vercel hosting is fine. Focus on regional signals (Moscow address, local phone, Yandex.Maps integration) rather than server geography.

### 1.6 Yandex Webmaster Best Practices

1. **Verify site** via yandex-verification meta tag or DNS record
2. **Set target region** (Moscow) in Webmaster settings
3. **Submit sitemap.xml** in Webmaster
4. **Monitor crawl errors** and fix immediately
5. **Check indexation status** regularly
6. **Use "Original Texts"** feature before publishing new content (signals authorship to Yandex)
7. **Monitor IKS** score monthly
8. **Set up turbo-feed** -- NO LONGER NEEDED (deprecated)
9. **Check for Minusinsk** (link spam) and Mimicry (behavioral manipulation) penalties

### 1.7 Yandex Commercial Ranking Factors (CRITICAL for B2B)

Yandex's "Proxima" algorithm specifically evaluates commercial/service sites. **THIS IS THE MOST IMPORTANT SECTION FOR ELFPRINT.RU.**

#### A. Trust & Business Legitimacy

| Factor | Requirement | Priority |
|--------|------------|----------|
| Legal entity info | INN, OGRN, full legal name visible | CRITICAL |
| Physical address | With interactive map, office/factory photos | CRITICAL |
| Verified Yandex.Maps profile | With reviews and rating | HIGH |
| About Us page | Real team photos, credentials, company history | HIGH |
| Certificates/licenses | Quality certificates displayed prominently | HIGH |
| Portfolio/case studies | Real work examples | HIGH |

#### B. Contact Information

| Factor | Requirement | Priority |
|--------|------------|----------|
| Phone with city code | 8 (495) or 8 (499) format for Moscow | CRITICAL |
| 8-800 toll-free number | Signals scale and reliability | HIGH |
| Contacts on EVERY page | Header/footer, not just /contacts | CRITICAL |
| Multiple contact methods | Phone, email, messenger, chat | HIGH |
| Corporate email | @elfprint.ru, not @gmail.com | MEDIUM |

#### C. Pricing Transparency

| Factor | Requirement | Priority |
|--------|------------|----------|
| Display prices | NEVER "price by request" | CRITICAL |
| "From X rubles" minimum | Even for complex orders | CRITICAL |
| Price calculator | For custom orders (tiers, materials) | HIGH |
| Payment options | Card, cash, corporate invoice with VAT | HIGH |
| Payment system logos | Visa/MC/MIR displayed | MEDIUM |

#### D. Delivery & Guarantees

| Factor | Requirement | Priority |
|--------|------------|----------|
| Delivery info page | Regions, costs, timelines | HIGH |
| Pickup locations | Map with addresses | MEDIUM |
| Return/warranty policy | Clear step-by-step process | HIGH |
| Free shipping thresholds | If applicable | MEDIUM |

#### E. Product/Service Catalog Quality

| Factor | Requirement | Priority |
|--------|------------|----------|
| Wide assortment | More categories = better signal | HIGH |
| Product cards | Photos, descriptions, specs, pricing | HIGH |
| Filtering & sorting | By price, category, technology | HIGH |
| Comparison tools | Optional but strong signal | MEDIUM |
| Never delete items | Mark "out of stock" instead | MEDIUM |
| Cross-sell recommendations | Related products/services | MEDIUM |

#### F. Conversion Elements

| Factor | Requirement | Priority |
|--------|------------|----------|
| Clear CTA buttons | Contrasting, large, visible | HIGH |
| One-click request | Simplified forms | HIGH |
| Customer reviews on site | Authentic, with responses | HIGH |
| No intrusive ads | Clean design without banners | HIGH |

---

## 2. TECHNICAL SEO FOR RUSSIAN MARKET

### 2.1 Yandex-Specific Meta Tags

```html
<!-- Verification -->
<meta name="yandex-verification" content="VERIFICATION_CODE" />

<!-- Region targeting (set in Yandex Webmaster, not meta) -->

<!-- No Yandex-specific meta tags for content beyond standard HTML -->
<!-- Focus on standard meta: title, description, canonical, robots -->
```

### 2.2 Schema.org Support by Yandex

**Yandex supports the following schema.org types for rich snippets:**

| Type | Rich Result | Status |
|------|------------|--------|
| `Organization` | Company info in SERP | Supported |
| `LocalBusiness` | Map/address integration | Supported |
| `Product` + `AggregateOffer` | Price in snippet | Supported |
| `FAQPage` | FAQ accordion in SERP | **Supported** (confirmed) |
| `BreadcrumbList` | Breadcrumb trail | Supported |
| `Article` / `BlogPosting` | Article rich results | Supported |
| `Service` | Service listing | Supported (basic) |
| `WebSite` + `SearchAction` | Site search box | Supported |
| `HowTo` | Step-by-step | Supported |
| `Review` / `AggregateRating` | Star rating | Supported |
| `VideoObject` | Video snippet | Supported |

**Implementation for elfprint.ru:**
- Homepage: `Organization` + `WebSite` + `LocalBusiness`
- Catalog pages: `Product` + `AggregateOffer` + `BreadcrumbList`
- Service pages: `Service` + `FAQPage` + `BreadcrumbList`
- Blog: `Article` / `BlogPosting` + `BreadcrumbList`
- About: `Organization` with `founders`, `employee`
- Portfolio: `CreativeWork` or `ImageGallery`

### 2.3 robots.txt for Yandex

**IMPORTANT: Yandex `Host` directive is DEPRECATED.** Yandex Webmaster now handles preferred domain via settings, not robots.txt. Current best practice:

```txt
User-agent: Yandex
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /*?sort=
Disallow: /*?filter=
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term

User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

Sitemap: https://elfprint.ru/sitemap.xml
```

**Key Yandex robots.txt specifics:**
- `Clean-param` directive (Yandex-only) -- tells Yandex to ignore URL parameters
- `Host` directive -- DEPRECATED, do NOT use
- Maximum 2048 rules allowed
- Yandex crawler bot: `YandexBot/3.0`

### 2.4 XML Sitemap for Yandex

Requirements match Google standard with minor notes:
- Submit in Yandex Webmaster AND robots.txt
- Use `<lastmod>` with accurate dates (Yandex uses this for crawl priority)
- Keep under 50,000 URLs per sitemap file
- Use sitemap index for large sites
- Include `<changefreq>` and `<priority>` (Yandex may still consider these)

### 2.5 Core Web Vitals -- Yandex Position

**Yandex does NOT use Core Web Vitals as an official ranking factor.** However:
- Page speed still matters for behavioral factors (slow pages = higher bounce = worse PF)
- Google DOES use CWV as a ranking signal
- Since both engines need optimization, target these thresholds:

| Metric | Target | Why |
|--------|--------|-----|
| LCP | < 2.5s | Google ranking + Yandex user experience |
| INP | < 200ms | Google ranking signal |
| CLS | < 0.1 | Both engines, user experience |
| FCP | < 1.8s | Perceived speed |

**RISK:** Russian analytics counters (Yandex Metrika, VK Pixel) and chat widgets degrade CWV. Solution: load via `async`/`defer`, use `strategy="afterInteractive"` in Next.js `<Script>`.

### 2.6 Mobile-First Indexing in Yandex

- Yandex implemented mobile-first indexing BEFORE Google
- Mobile experience is CRITICAL for Yandex rankings
- Responsive design (not separate mobile site) is the standard
- Test with Yandex Webmaster mobile-friendly tool
- Mobile page speed is especially important given variable internet speeds across Russian regions

### 2.7 URL Structure for Russian Sites

**Transliteration vs Russian URLs:**

| Approach | Example | Pros | Cons |
|----------|---------|------|------|
| Transliteration | `/catalog/futbolki` | Clean URLs, no encoding issues, easier sharing | Less readable in search |
| Russian | `/каталог/футболки` | Visible keywords in SERP, natural for users | URL encoding, copy-paste issues, sharing problems |

**RECOMMENDATION:** Use **transliteration** (Latin characters). This is the industry standard for Russian sites. Yandex understands both equally well, but transliterated URLs:
- Work better in email/messenger sharing
- No encoding issues in analytics
- Cleaner in browser address bar
- Standard across all major Russian sites (ozon.ru, wb.ru, etc.)

**Transliteration rules:**
- `ш` -> `sh`, `щ` -> `shch`, `ч` -> `ch`, `ж` -> `zh`, `ю` -> `yu`, `я` -> `ya`
- Use hyphens between words: `dtf-pechat`, `korporativnyj-merch`
- Keep URLs short and keyword-rich

### 2.8 Yandex JavaScript Rendering (2024-2025 Update)

**BREAKTHROUGH:** As of late 2024, Yandex significantly improved JavaScript rendering:
- Yandex now successfully indexes SPA sites (Vue 3, React tested)
- Previously Yandex struggled with client-side rendered content
- SSR is NO LONGER strictly required for Yandex indexing

**However, SSR/SSG remains RECOMMENDED because:**
1. Faster initial render = better behavioral factors
2. More reliable indexing (no dependency on JS rendering queue)
3. Better for Core Web Vitals (Google factor)
4. Next.js SSG produces zero-JS pages by default for static content

**CONCLUSION:** Next.js SSG is the optimal strategy -- generates static HTML (perfect for both engines) while allowing client-side interactivity where needed (filters, forms).

---

## 3. SEO ARCHITECTURE FOR MULTI-SERVICE SITES

### 3.1 Recommended Site Structure (Hub-and-Spoke Model)

```
elfprint.ru (HUB: корпоративный мерч)
|
├── /catalog/ (Product Hub)
│   ├── /catalog/futbolki
│   ├── /catalog/hudi
│   ├── /catalog/svitshoty
│   ├── /catalog/welcome-pack
│   ├── /catalog/podarki
│   └── /catalog/aksessuary
|
├── /uslugi/ (Service Hub)
│   ├── /uslugi/dtf-pechat
│   ├── /uslugi/shelkografiya
│   ├── /uslugi/sublimaciya
│   ├── /uslugi/vyshivka
│   ├── /uslugi/poshiv
│   └── /uslugi/goryachee-tisnenie
|
├── /portfolio/ (Spoke: Trust/Authority)
│   └── /portfolio/[slug] (individual cases)
|
├── /blog/ (Content Hub)
│   └── /blog/[slug] (articles)
|
├── /marketplace/ (Spoke: WB/Ozon services)
├── /o-kompanii/ (Trust page)
├── /kontakty/ (Trust page)
├── /dostavka/ (Commercial factor)
├── /oplata/ (Commercial factor)
└── /legal/ (Trust page)
```

### 3.2 Internal Linking Strategy

**Hub-and-Spoke implementation:**
1. **Homepage** links to all hub pages (catalog, services, portfolio)
2. **Each hub page** links to all its spokes + related hub pages
3. **Each spoke page** links back to hub + cross-links to related spokes
4. **Blog articles** link to relevant service/catalog pages (content -> commercial)
5. **Service pages** link to related catalog items and blog articles
6. **Every page** has breadcrumbs + footer navigation

**Cross-linking rules:**
- DTF print page -> link to catalog items where DTF is used (futbolki, hudi)
- Blog "DTF vs Shelkografiya" -> link to both /uslugi/dtf-pechat and /uslugi/shelkografiya
- Catalog "futbolki" -> link to all applicable technology pages
- Portfolio cases -> link to technologies and products used

### 3.3 Breadcrumb Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://elfprint.ru" },
    { "@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://elfprint.ru/catalog" },
    { "@type": "ListItem", "position": 3, "name": "Футболки с логотипом", "item": "https://elfprint.ru/catalog/futbolki" }
  ]
}
```

### 3.4 FAQPage Schema -- Yandex Rich Results

**YES, Yandex supports FAQPage rich results.** Implement on every service page:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какой минимальный тираж для DTF-печати?",
      "acceptedAnswerText": "Минимальный тираж для DTF-печати — от 1 штуки..."
    }
  ]
}
```

**Where to implement FAQ sections:**
- Each technology page (/uslugi/dtf-pechat etc.) -- 5-7 questions
- Each catalog category (/catalog/futbolki) -- 3-5 questions
- Homepage -- 5-7 general questions
- Welcome pack page -- 5-7 questions

### 3.5 Product Schema for Non-E-Commerce Catalog

Even without cart/checkout, use `Product` + `AggregateOffer` schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Футболки с логотипом",
  "description": "Печать логотипа на футболках. DTF, шелкография, вышивка.",
  "image": "https://elfprint.ru/images/catalog/futbolki.jpg",
  "brand": { "@type": "Brand", "name": "Огни Эльфов" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "RUB",
    "lowPrice": "350",
    "highPrice": "2500",
    "offerCount": "50+",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "51"
  }
}
```

---

## 4. CONTENT MARKETING FOR CORPORATE MERCH (RUSSIAN MARKET)

### 4.1 Blog Topics That Drive Organic Traffic

**Tier 1: High traffic + high conversion potential**
| Topic | Est. Monthly Searches | Content Type |
|-------|----------------------|--------------|
| DTF печать что это | 3,000-5,000 | Guide |
| Виды печати на одежде | 2,000-4,000 | Overview |
| Шелкография или DTF что лучше | 1,000-2,000 | Comparison |
| Что положить в Welcome pack | 500-1,000 | Checklist |
| Идеи корпоративного мерча | 500-1,500 | Lookbook |
| Что такое мерч простыми словами | 1,000-2,000 | Explainer |

**Tier 2: Seasonal/trending**
| Topic | Est. Monthly Searches | Season |
|-------|----------------------|--------|
| Подарки сотрудникам на Новый год с логотипом | 3,000-8,000 | Oct-Dec |
| Подарки на 23 февраля коллегам | 2,000-5,000 | Jan-Feb |
| Подарки на 8 марта сотрудницам | 2,000-5,000 | Feb-Mar |

**Tier 3: Long-term SEO authority**
| Topic | Est. Monthly Searches |
|-------|----------------------|
| Как выбрать технологию печати на одежде | 500-1,000 |
| Мерч как инструмент HR бренда | 200-500 |
| Тренды мерча 2026 | 300-800 |
| Как рассчитать бюджет на корпоративный мерч | 100-300 |

### 4.2 Long-Tail B2B Keyword Strategy

**Pattern:** [product] + [modifier] + [geo] + [intent]

Top long-tail clusters for elfprint.ru:
1. `корпоративный мерч под ключ москва заказать`
2. `welcome pack для новых сотрудников заказать`
3. `печать на футболках оптом от 50 штук цена`
4. `производство мерча для IT компании`
5. `корпоративные подарки с логотипом москва`
6. `пошив худи с логотипом компании от 100 штук`

### 4.3 Local SEO for Moscow-Based Production

**Key actions:**
1. **Yandex.Maps** -- verified profile with Moscow factory address
2. **Yandex.Business** -- complete profile (see Section 4.5)
3. **Moscow-specific content:** mention Moscow/МСК in titles and descriptions where natural
4. **NAP consistency** (Name, Address, Phone) across all platforms
5. **Local directories:** 2GIS, Yell.ru, Spravker.ru, Zoon.ru
6. **Regional subdomain NOT needed** -- elfprint.ru with Moscow region set in Yandex Webmaster is sufficient for a single-location business

### 4.4 E-E-A-T Signals for Yandex

While E-E-A-T is primarily Google's framework, Yandex has parallel trust signals:

| Signal | Implementation |
|--------|---------------|
| **Experience** | Portfolio/case studies with real project details, process photos |
| **Expertise** | Team member profiles with credentials, 20+ years experience highlighted |
| **Authoritativeness** | Media mentions, industry publications, 300+ clients |
| **Trustworthiness** | Reviews (4.9 rating, 51 reviews), certificates, legal entity info |

**For Yandex Neuro (AI answers):** Factual accuracy is critical. YandexGPT verifies facts against authoritative sources. Factual errors exclude content from neural answers.

### 4.5 Yandex.Business Profile Optimization

**Current asset: 4.9 rating, 51 reviews -- this is EXCELLENT.**

**Optimization checklist:**
1. Verify ownership and claim the profile
2. Fill ALL fields: hours, description, services list with prices
3. Add quality photos: factory, production process, finished products, office
4. Category selection: "Производство мерча", "Печать на одежде", "Рекламная продукция"
5. Add services with individual descriptions and keyword-optimized names
6. Add promotions/special offers (stands out in search)
7. Respond to ALL reviews promptly, using brand voice
8. Add links: website, VK, Telegram, WhatsApp
9. Enable Yandex.Messenger for direct inquiries
10. Monitor analytics: views, clicks, route requests
11. Target "Хорошее место" badge (good IKS + reviews)
12. Add Stories (content updates visible on Maps)

**Integration with website:**
- Embed Yandex.Map widget on contacts page
- Link Yandex.Business reviews on homepage (trust signal)
- Consistent NAP across website and Yandex.Business profile

---

## 5. ANALYTICS & CONVERSION TRACKING

### 5.1 Yandex.Metrika vs GA4

**Verdict: USE BOTH, but Yandex.Metrika is PRIMARY for this project.**

| Feature | Yandex.Metrika | GA4 |
|---------|---------------|-----|
| **Market relevance** | 70%+ of traffic from Yandex | Covers Google + referral |
| **Session recording** | WebVisor (built-in) | Requires 3rd party (Hotjar) |
| **Heatmaps** | Built-in (clicks, scroll, form) | Requires 3rd party |
| **Goal types** | URL, event, JavaScript event, composite | Event-based only |
| **Yandex.Direct integration** | Native, automatic | None |
| **Data model** | Session-based (simpler) | Event-based (more granular) |
| **Attribution** | Last-click focus | Data-driven, multi-touch |
| **Data privacy** | Russian data residency | GDPR-focused, potential issues |
| **Cost** | Free | Free |
| **Ease of setup** | Simpler | More complex |

**Recommendation for elfprint.ru:**
- **Primary:** Yandex.Metrika (with WebVisor, heatmaps, form analytics)
- **Secondary:** GA4 (for Google Ads attribution, cross-device tracking)

### 5.2 Yandex.Metrika Goals for Lead Generation

**Essential goals to configure:**

| Goal | Type | Trigger |
|------|------|---------|
| Form submission (any) | JavaScript event | `ym(COUNTER, 'reachGoal', 'form_submit')` |
| Form: request quote | JavaScript event | `ym(COUNTER, 'reachGoal', 'quote_request')` |
| Form: callback request | JavaScript event | `ym(COUNTER, 'reachGoal', 'callback')` |
| Phone click | JavaScript event | `ym(COUNTER, 'reachGoal', 'phone_click')` |
| WhatsApp/Telegram click | JavaScript event | `ym(COUNTER, 'reachGoal', 'messenger_click')` |
| Email click | JavaScript event | `ym(COUNTER, 'reachGoal', 'email_click')` |
| Portfolio case view | URL match | `/portfolio/*` |
| Price list download | JavaScript event | `ym(COUNTER, 'reachGoal', 'pricelist_download')` |
| Page scroll > 70% | JavaScript event | Scroll depth trigger |

### 5.3 WebVisor with Next.js SSR

**Does WebVisor work with Next.js/Astro SSR?** YES, with caveats:

- WebVisor 2.0 works with SPA/SSR applications
- Uses DOM mutation observer, not page recording
- **Configuration for Next.js:**
  - Use `@koiztech/next-yandex-metrika` package OR manual `<Script>` integration
  - Set `webvisor: true` in Metrika initialization
  - Use `strategy="afterInteractive"` for Script loading
  - Track page transitions via router events: `ym(COUNTER, 'hit', url)`

```tsx
// Recommended: Manual integration in app/layout.tsx
<Script
  id="yandex-metrika"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(m,e,t,r,i,k,a){...})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(COUNTER_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true
      });
    `
  }}
/>
```

**SPA page tracking (critical for Next.js):**
```tsx
// In a client component wrapping the app
useEffect(() => {
  const handleRouteChange = (url: string) => {
    if (typeof window.ym !== 'undefined') {
      window.ym(COUNTER_ID, 'hit', url);
    }
  };
  // Subscribe to Next.js router events
}, []);
```

### 5.4 Yandex.Metrika E-Commerce Module

**Applicable for elfprint.ru?** Partially. Even without a shopping cart, the e-commerce module can track:
- Product/service impressions (which catalog items are viewed)
- "Add to favorites" / "Request quote" as proxy purchase events

**However,** for a lead-gen site, standard goals are more practical. Use e-commerce module only if future plans include online ordering.

### 5.5 UTM Tracking for Russian Platforms

**Standard UTM structure for Russian ad platforms:**

```
# Yandex.Direct
?utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}&utm_term={keyword}

# VK Ads (VKontakte)
?utm_source=vk&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}

# Telegram Ads
?utm_source=telegram&utm_medium=cpc&utm_campaign={campaign_name}

# 2GIS
?utm_source=2gis&utm_medium=referral

# Yandex.Business
?utm_source=yandex_business&utm_medium=maps
```

**robots.txt optimization:** Use `Clean-param` directive to prevent Yandex from indexing UTM-tagged URLs as separate pages.

---

## 6. NEXT.JS vs ASTRO FOR SEO

### 6.1 Performance Benchmarks

| Metric | Astro (SSG) | Next.js (SSG) | Next.js (SSR) |
|--------|-------------|---------------|---------------|
| Lighthouse Performance | 100 | 95-98 | 85-92 |
| First Contentful Paint | 0.4s | 0.8s | 1.2s |
| Largest Contentful Paint | 0.8s | 1.4s | 2.1s |
| Time to Interactive | 0.4s | 1.5s | 2.3s |
| Total Blocking Time | 0ms | 50ms | 180ms |
| JS Bundle (default) | 0-5 KB | 80-120 KB | 100-150 KB |

**Astro claims:** 40% faster than Next.js, 90% less JavaScript.

### 6.2 SEO Capabilities Comparison

| Feature | Astro | Next.js |
|---------|-------|---------|
| SSG | Native, zero-JS | Supported, some hydration overhead |
| SSR | Supported | Native, excellent |
| ISR | Not native | Built-in, excellent |
| Metadata API | Manual/plugin | Built-in `generateMetadata` |
| Sitemap | `@astrojs/sitemap` | `next-sitemap` or native `app/sitemap.ts` |
| robots.txt | Manual file | Native `app/robots.ts` |
| JSON-LD | Manual | Manual (same effort) |
| Image optimization | `@astrojs/image` | Built-in `next/image` (superior) |
| Yandex Metrika | Manual Script | `next/script` + strategy |

### 6.3 Yandex JS Rendering Considerations

- Yandex NOW can render JavaScript (2024-2025 breakthrough)
- SSG-generated static HTML is STILL the safest approach for both engines
- **Both frameworks produce static HTML when using SSG mode**
- **Difference:** Next.js includes React hydration JS (~80-120KB) even for static pages; Astro ships zero JS unless explicitly added

### 6.4 Which Framework for elfprint.ru?

**Decision already made: Next.js 15 (see 08_стек_решение.md)**

**The decision remains correct because:**

1. **shadcn/ui integration** -- native React, no friction
2. **Development speed** -- critical with tight timeline (4-5 day prototype)
3. **Form -> Telegram Server Actions** -- built-in, no API route needed
4. **Catalog filtering** -- React state management, cleaner than Astro Islands
5. **Vercel deployment** -- zero-config, same company
6. **Future CMS integration** -- Sanity `next-sanity` first-class support
7. **Metrika/GA4 integration** -- `next/script` with strategy control

**Where Astro would win:**
- Pure performance (0 JS by default)
- Lighthouse scores (100 vs 95-98)
- Hosting costs (50-80% cheaper)

**But for THIS project,** Next.js SSG gives 95-98 Lighthouse scores (sufficient) with dramatically faster development. The SEO difference is negligible when both use SSG.

### 6.5 SEO Implementation Checklist for Next.js

```
app/
├── layout.tsx          → Organization JSON-LD, global metadata
├── page.tsx            → Homepage metadata + LocalBusiness JSON-LD
├── robots.ts           → Dynamic robots.txt with Yandex rules
├── sitemap.ts          → Dynamic sitemap generation
├── catalog/
│   ├── page.tsx        → ItemList JSON-LD + breadcrumbs
│   └── [slug]/page.tsx → Product JSON-LD + FAQ + breadcrumbs
├── uslugi/
│   └── [slug]/page.tsx → Service JSON-LD + FAQ + breadcrumbs
├── blog/
│   ├── page.tsx        → Blog listing metadata
│   └── [slug]/page.tsx → Article JSON-LD + breadcrumbs
├── portfolio/
│   └── [slug]/page.tsx → CreativeWork JSON-LD + breadcrumbs
├── o-kompanii/page.tsx → Organization extended JSON-LD
├── kontakty/page.tsx   → LocalBusiness + contact JSON-LD
├── dostavka/page.tsx   → delivery info
├── oplata/page.tsx     → payment info
└── legal/page.tsx      → legal info

lib/
├── seo.ts              → generateMetadata helpers
├── schema.ts           → JSON-LD builder functions
└── metrika.ts          → Yandex.Metrika utility functions
```

---

## 7. ACTION ITEMS / IMPLEMENTATION PRIORITIES

### Immediate (Before Development)
1. [ ] Register elfprint.ru in Yandex Webmaster
2. [ ] Set region to Moscow
3. [ ] Verify Yandex.Business profile ownership
4. [ ] Prepare JSON-LD schemas for all page types
5. [ ] Create robots.txt with Yandex-specific Clean-param rules

### During Development
6. [ ] Implement `generateMetadata` for every page with Yandex-optimized titles
7. [ ] Add JSON-LD structured data on every page type
8. [ ] Implement breadcrumbs with BreadcrumbList schema
9. [ ] Add FAQPage schema on all service/catalog pages
10. [ ] Set up Yandex.Metrika with WebVisor + goals
11. [ ] Set up GA4 as secondary analytics
12. [ ] Implement phone click tracking goals
13. [ ] Add yandex-verification meta tag
14. [ ] Create dynamic sitemap.ts
15. [ ] Ensure prices visible on all commercial pages

### Post-Launch
16. [ ] Submit sitemap to Yandex Webmaster
17. [ ] Monitor indexation in Yandex Webmaster
18. [ ] Set up Yandex.Business Stories with regular updates
19. [ ] Create first batch of blog articles (Tier 1 topics)
20. [ ] Register in local directories (2GIS, Yell.ru)
21. [ ] Set up UTM tracking for all traffic sources
22. [ ] Monitor IKS score monthly

---

## SOURCES

- https://skillbox.com/media/marketing/doli-yandeksa-i-google-v-rossii-chto-izmenilos-k-2025-godu/
- https://airassvet.ru/articles/strategicheskiy-otchet-kompleksnaya-optimizatsiya-i-prodvizhenie-veb-resursov-v-poiskovom-prostranstve-rossii-2026-g
- https://kokoc.com/blog/chto-takoe-iks-sajta-v-yandekse/
- https://seosherpa.com/yandex-seo/
- https://dollarskills.com/blogs/article/what-makes-yandex-rank-websites-higher
- https://habr.com/ru/articles/889700 (SPA indexing by Yandex)
- https://habr.com/ru/articles/966214/ (Next.js SEO)
- https://key-g.com/ru/blog/commercial-ranking-factors-for-yandex-and-google/
- https://vc.ru/seo/2772116-kommercheskie-faktory-ranjirovaniya-yandeksa
- https://seohead.pro/blog/kommercheskie-faktory-v-yandekse-chto-eto-i-zachem-oni-nuzhny/
- https://aventon.ru/yandeks-otklyuchaet-turbo-stranicy (Turbo Pages discontinued)
- https://senorit.de/en/blog/astro-vs-nextjs-2025
- https://aim1.ru/blog/kak-optimizirovat-kartochku-v-yandeks-biznes/
- https://vc.ru/seo/2045676-kak-nastroit-profil-v-yandeks-biznes
- https://private-seo.ru/blog/obzor-yandeks-metriki-i-google-analytics-4-dlya-vladeltsa-biznesa
- https://metrika-analytics.ru/analysis/metrika-vs-analytics-2026/
- https://npmjs.com/package/@koiztech/next-yandex-metrika
