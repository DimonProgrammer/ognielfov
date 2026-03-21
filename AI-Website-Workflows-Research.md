# AI Website Development Workflows: Complete Research

> Исследование лучших workflow по разработке сайтов с помощью ИИ "под ключ"
> Дата: 2026-03-19
> Фокус: корпоративные сайты, e-commerce | Стек: Next.js, React, Cursor, v0, Claude
> Формат: оригинальные промпты (EN) + адаптация (RU)

---

## Table of Contents

1. [Сводная таблица workflow](#1-comparison)
2. [WORKFLOW A: Full-Cycle (11 этапов) — Tilda Education](#2-workflow-a)
3. [WORKFLOW B: Structured Vibe Coding (5 этапов) — DEV.to/Wasp](#3-workflыow-b)
4. [WORKFLOW C: Solo SaaS MVP (5 этапов) — VibeCoding.app](#4-workflow-c)
5. [WORKFLOW D: Cursor + Supabase (12 этапов) — Francesca Tabor](#5-workflow-d)
6. [WORKFLOW E: Quality Hardening (4 промпта) — Richard Seroter](#6-workflow-e)
7. [WORKFLOW F: Landing Page за 1-3 часа — VibeCoding.app](#7-workflow-f)
8. [Универсальный стек бесплатных инструментов](#8-tools)
9. [Мега-промпты по этапам](#9-mega-prompts)
10. [Источники](#10-sources)

---

<a id="1-comparison"></a>
## 1. Сводная таблица workflow

| Workflow | Автор/Источник | Этапы | Тип сайта | Время | Стек |
|----------|---------------|-------|-----------|-------|------|
| A: Full-Cycle | Tilda Education | 11 | Любой (лендинги, бизнес) | 2-5 дней | ChatGPT/Claude + Figma + Tilda |
| B: Structured Vibe | DEV.to (Wasp) | 5 | Full-stack приложения | 1-3 дня | Cursor + Wasp/Next.js + Prisma |
| C: Solo SaaS MVP | VibeCoding.app | 5 | SaaS MVP | 4-8 часов | Cursor + Supabase + Vercel |
| D: Cursor+Supabase | Francesca Tabor | 12 | Внутренние/SaaS/MVP | 1-2 дня | Cursor Agent + Supabase + Next.js |
| E: Quality Hardening | Richard Seroter | 4 промпта | Пост-разработка | 1-2 часа | Любой LLM |
| F: Landing Page | VibeCoding.app | 5 | Лендинг | 1-3 часа | Bolt.new / v0 + Vercel |

---

<a id="2-workflow-a"></a>
## 2. WORKFLOW A: Full-Cycle (11 этапов) — от клиента до презентации

**Источник:** [Tilda Education](https://tilda.education/creating-a-website-with-ai)
**Лучше всего для:** фрилансеров/агентств, полный цикл с клиентами

### Этап 1: Коммуникация с клиентом и КП
**Инструменты:** ChatGPT, Claude, DeepSeek
**Промпт (EN):**
```
You are an expert in pricing, negotiations, and creative services sales.
Create a commercial proposal for [project type] including:
- Task description and client goals
- Deliverables breakdown
- Three pricing tiers (basic/standard/premium)
- Call-to-action and next steps
Client context: [describe client, industry, budget range]
```
**Промпт (RU):**
```
Ты эксперт в ценообразовании и продаже дизайн-услуг.
Составь коммерческое предложение на [тип проекта]:
- Описание задачи и целей клиента
- Перечень работ и результатов
- Три тарифа (базовый/стандартный/премиум)
- Призыв к действию и следующие шаги
Контекст клиента: [описание клиента, отрасль, бюджет]
```

### Этап 2: Анализ договора
**Инструменты:** ChatGPT, Claude
**Промпт (EN):**
```
Analyze this contract for potential risks, ambiguous language, and missing protections.
Focus on: payment schedules, revision limits, IP rights, portfolio usage rights,
cancellation terms. Suggest specific clause improvements defending the designer's rights.
[paste contract]
```

### Этап 3: Исследование рынка и ЦА
**Инструменты:** ChatGPT, Claude, Perplexity (бесплатно)
**Промпт (EN):**
```
I'm creating a website for [company] in [industry].
Provide structured analysis:
1. Target user profiles (3-4 segments) with motivations, fears, decision triggers
2. 5-7 competitor websites with comparative analysis (strengths/weaknesses)
3. Design implications: recommended visual style, messaging hierarchy, UX patterns
4. Key differentiators we should emphasize
```
**Промпт (RU):**
```
Я создаю сайт для [компания] в [отрасль].
Дай структурированный анализ:
1. Портреты ЦА (3-4 сегмента) — мотивации, страхи, триггеры решений
2. 5-7 сайтов конкурентов с анализом (сильные/слабые стороны)
3. Рекомендации по дизайну: визуальный стиль, иерархия сообщений, UX-паттерны
4. Ключевые отличия, которые стоит подчеркнуть
```

### Этап 4: Структура сайта (Sitemap)
**Инструменты:** ChatGPT, Claude, Relume (бесплатный план)
**Промпт (EN):**
```
Create a website structure for [company type] with logical block sequencing.
For each page, define:
- Navigation anchor
- Headline and subheading
- Key messaging points
- CTA with destination
- Illustration/visual guidance
Order blocks from general to specific. Use conversion-focused sequencing.
Pages needed: [list pages]
```

### Этап 5: Копирайтинг (AIDA)
**Инструменты:** Claude (лучший для текстов), ChatGPT
**Промпт (EN):**
```
You are an expert conversion copywriter. Write website copy using the AIDA model
(Attention → Interest → Desire → Action).

Rules:
- Eliminate filler words
- Prioritize specifics and logic over generic claims
- Use short sentences and accessible vocabulary
- Emphasize reader BENEFIT over self-promotion
- Every section must answer "What's in it for the reader?"

Website: [company name, industry]
Target audience: [describe]
Tone: [professional/friendly/bold]
Page: [page name]
Sections: [list sections with purposes]
```
**Промпт (RU):**
```
Ты эксперт-копирайтер. Напиши текст для сайта по модели AIDA
(Внимание → Интерес → Желание → Действие).

Правила:
- Убери воду и канцелярит
- Приоритет: конкретика и логика вместо общих фраз
- Короткие предложения, доступный язык
- Акцент на ПОЛЬЗЕ для читателя, а не на самовосхвалении
- Каждый блок отвечает на вопрос "Что это даёт читателю?"

Сайт: [название, отрасль]
ЦА: [описание]
Тон: [деловой/дружелюбный/смелый]
Страница: [название]
Блоки: [список блоков с их задачами]
```

### Этап 6: Визуальная концепция (Мудборд)
**Инструменты:** ChatGPT, Claude, Pinterest, Freepik
**Промпт (EN):**
```
Create a visual direction brief for [project]:
1. Visual metaphors and associations (3-5)
2. 2-3 color palettes with psychological justification
3. Stylistic references with composition principles
4. Font selections (heading + body) with usage guidance
5. Photography/illustration style direction
6. Client presentation script using benefit language
```

### Этап 7: Консультация по реализации
**Промпт (EN):**
```
I need to implement [specific design element/feature] on a website.
Provide:
1. 2-3 implementation options with step-by-step instructions
2. Specific tool recommendations and plugins
3. Alternative approaches for unusual requests
4. Ending checklist of deliverables
My stack: [your stack]
```

### Этап 8: Генерация визуальных материалов
**Инструменты:** ChatGPT (DALL-E), Freepik AI, Leonardo (бесплатно)

**5-точечная формула промпта для изображений:**
```
1. [Конкретный тип визуала] — не "что-то красивое", а "иллюстрация для лендинга"
2. [Контекст использования] — фон сайта, иконка, обложка, соцсеть
3. [Стиль и атмосфера] — минимализм, flat, фото-реализм, mood
4. [Технические параметры] — пропорции, формат (PNG без фона), разрешение
5. [Метафорический мостик] — эмоциональный якорь, если описать сложно
```

**Пример (EN):**
```
Horizontal photograph for organic egg producer homepage.
Morning light, wooden crate with white and brown eggs, water droplets.
Professional iPhone 15 PRO style photography.
Warm, natural color palette. Conveys freshness, trust, farm care.
PNG format, 1920x1080, no background elements.
```

### Этап 9: Оценка и итерации дизайна
**Промпт (EN):**
```
Evaluate this website design across these criteria:
1. Visual hierarchy clarity
2. Typography readability and contrast
3. Color palette cohesion and accessibility
4. Compositional balance and element distribution
5. UX logic and navigation flow
6. Image-text alignment and messaging consistency
Provide specific improvement suggestions for each area.
[attach screenshot or describe]
```

### Этап 10: Сборка сайта
**Инструменты:** v0.dev (бесплатно) → Cursor → Vercel
**Быстрый вариант:** v0 для генерации UI, затем доработка в Cursor
**Продвинутый:** Figma → ручная верстка в Cursor с AI

### Этап 11: Подготовка презентации
**Промпт (EN):**
```
Structure a client presentation for [website project]:
1. Logical flow (problem → solution → result)
2. Accessible explanations of design decisions using benefit language
3. Anticipated objections (5-7) with reassuring responses
4. Value reinforcement and clear next steps
Keep language client-friendly, avoid jargon.
```

---

<a id="3-workflow-b"></a>
## 3. WORKFLOW B: Structured Vibe Coding (5 этапов) — для разработчиков

**Источник:** [DEV.to — A Structured Workflow for Vibe Coding Full-Stack Apps](https://dev.to/wasp/a-structured-workflow-for-vibe-coding-full-stack-apps-352l)
**Лучше всего для:** разработчиков, строящих full-stack приложения
**Скорость:** 20-50x быстрее традиционной разработки

### Этап 1: Foundation — Подготовка инфраструктуры
- Выбрать UI-библиотеку (shadcn/ui — бесплатно)
- Выбрать фреймворк (Next.js)
- Настроить boilerplate

### Этап 2: AI Configuration — Настройка правил для LLM
Создайте `.cursor/rules/` директорию:

**Файл `.cursor/rules/general.mdc`:**
```
You are a senior full-stack developer.
Always use TypeScript strict mode.
Prefer server components in Next.js App Router.
Use Tailwind CSS for styling.
Use shadcn/ui components when possible.
Keep files small and focused (< 200 lines).
Write meaningful variable names.
Handle errors explicitly.
```

**Файл `.cursor/rules/7-possible-solutions.mdc`:**
```
Before implementing any solution, think of 7 possible approaches.
Evaluate each for: simplicity, maintainability, performance.
Pick the best one. Explain your reasoning in 2-3 sentences.
Then implement it.
```

### Этап 3: PRD + Plan — Определение "Что" и "Как"
**Промпт генерации PRD (EN):**
```
I'm building [app description] for [target users].

Core features:
- [feature 1]
- [feature 2]
- [feature 3]

Tech stack: Next.js 14, TypeScript, Tailwind CSS, Supabase, Vercel.

Create a detailed PRD covering:
1. User stories for each feature
2. Database schema
3. API routes needed
4. Page structure and navigation
5. Authentication flow
6. Edge cases and error states
```

**Промпт генерации плана (EN):**
```
From this PRD, create an actionable, step-by-step plan using a modified
vertical slice implementation approach suitable for LLM-assisted coding.

Before creating the plan, think about 3 different implementation styles,
pick the best, and explain your reasoning.

Remember we'll constantly reference this plan, so ensure it's structured,
concise, and actionable. Each phase should deliver a working full-stack slice.
```

**Промпт (RU):**
```
На основе этого PRD создай пошаговый план реализации методом
вертикальных срезов, подходящий для разработки с помощью LLM.

Перед созданием плана подумай о 3 разных подходах к реализации,
выбери лучший и объясни почему.

План будет использоваться постоянно — он должен быть структурным,
кратким и actionable. Каждая фаза должна давать работающий full-stack срез.
```

### Этап 4: Build — Вертикальные срезы
Для каждой фазы плана:
1. Определить схему БД для фичи
2. Написать серверную логику
3. Создать страницы/роуты
4. Собрать UI-компоненты
5. Подключить всё через хуки

**Промпт для каждой фичи (EN):**
```
Implement [feature name] according to Phase [X] of our plan.
Reference the PRD for requirements.
Follow vertical slice approach: database → API → UI.
Use existing components and patterns from previous phases.
```

### Этап 5: Documentation — AI-документация
**Промпт (EN):**
```
Document what we just built in Phase [X].
Create a markdown file in ai/docs/ covering:
1. Core logic explanation
2. Database → Server → Client connection flow
3. Key design decisions with file references
4. Known limitations and future improvements
Reference specific file paths and function names.
```

---

<a id="4-workflow-c"></a>
## 4. WORKFLOW C: Solo SaaS MVP за 4-8 часов

**Источник:** [VibeCoding.app — Workflow Examples](https://vibecoding.app/blog/vibe-coding-workflow-examples)
**Инструменты:** Cursor ($20/мес) + Supabase (бесплатно) + Vercel (бесплатно)

### Универсальный фреймворк: Define → Scaffold → Build → Debug → Ship

### Stage 1: Define (30 мин)
**Промпт (EN):**
```
I'm building a [product type]. Target users are [description].

Core features:
- [feature 1 with detail]
- [feature 2 with detail]
- [feature 3 with detail]
- [feature 4 with detail]

Tech stack: Next.js 14, Supabase (auth + db), Tailwind CSS, Vercel deploy.

Before writing any code, outline the database schema, page structure,
and key API routes. I want to review the architecture first.
```

### Stage 2: Scaffold (20 мин)
**Промпт (EN):**
```
Create the project structure based on the architecture we discussed.
Start with:
1. Supabase schema (SQL for the [tables])
2. Next.js project with the page routes
3. Supabase client setup with environment variables
4. Auth configuration (email + Google OAuth)

Don't build features yet — just the scaffold.
```
**Чекпоинт:** Запустить проект, проверить логин и соединение с Supabase.

### Stage 3: Build (2-4 часа)
**Промпт для каждой фичи (EN):**
```
Build the [feature name] page:
- Fetch [data] from Supabase
- Show [UI elements description]
- When [user action], [expected behavior]
- Use Tailwind for styling — keep it minimal
```
**Правило:** `git commit` после каждой работающей фичи.

### Stage 4: Debug & Test (1-2 часа)
**Промпт (EN):**
```
When I [user action], I get this error in the console:
[paste full error stack trace]

Expected behavior: [what should happen]
Current behavior: [what actually happens]
Relevant files: [list files]
```

### Stage 5: Ship (30 мин)
**Промпт (EN):**
```
Create a Vercel deployment configuration for this project.
I need:
- Environment variables for NEXT_PUBLIC_SUPABASE_URL and
  NEXT_PUBLIC_SUPABASE_ANON_KEY
- A vercel.json if needed
- Instructions for connecting the GitHub repo to Vercel
```

---

<a id="5-workflow-d"></a>
## 5. WORKFLOW D: Cursor Agent + Supabase (12 этапов)

**Источник:** [Francesca Tabor — From Idea to Production](https://www.francescatabor.com/articles/2025/12/28/from-idea-to-production-building-apps-faster-with-cursor-agent-and-supabase)
**Лучше всего для:** SaaS MVP, внутренние инструменты, операционные приложения

### Ключевые промпты:

**Scaffold (EN):**
```
Create markdown instructions to scaffold a minimal Next.js app
with TypeScript + Tailwind, removing unnecessary boilerplate.
```

**Database Schema (EN):**
```
Create a Supabase schema with tables, relationships, indexes,
and migrations using Supabase CLI conventions.
Generate TypeScript types and update the app to read/write data.
```

**CRUD Integration (EN):**
```
Install Supabase JS client for Next.js.
Add environment variables for local Supabase.
Implement basic CRUD for [main table] and display results in UI.
```

**MCP Setup (EN):**
```
Set up Postgres MCP so the agent can introspect the local Supabase
database schema. Summarize tables and relations after connecting.
```

**Security — RLS (EN):**
```
Enable RLS on all user data tables. Add policies so users read/write
only their own rows. Inserts set owner_id to auth.uid().
Update queries to use authenticated user.
```

**UI from Screenshot (EN):**
```
Recreate this UI in Next.js + Tailwind using clean components.
Use shadcn/ui if helpful. Make responsive.
```

### Правила для Cursor (`.cursorrules`):
```
Use Next.js App Router.
Prefer server components.
Use Tailwind + Supabase Auth + RLS.
Keep files small and organized.
Follow existing patterns in the codebase.
```

---

<a id="6-workflow-e"></a>
## 6. WORKFLOW E: Quality Hardening — 4 пост-разработочных промпта

**Источник:** [Richard Seroter — Quality-focused prompts](https://seroter.com/2025/07/07/quality-focused-prompts-for-the-vibe-coding-addict/)
**Когда применять:** ПОСЛЕ того, как сайт собран и работает

### Prompt 1: Code Quality & Maintainability Audit
```
Act as a senior software engineer conducting a thorough code review.
Analyze the whole codebase and provide:
1. Refactoring for Clarity: Top 5 code smells with refactored versions
2. Configuration & Secrets: Find hardcoded values, suggest .env template
3. Dependency Review: Find deprecated/risky libraries
4. Automated Quality Gates: Generate .eslintrc.json and .prettierrc
5. Documentation: Generate README.md template
```

### Prompt 2: Security & Reliability Hardening
```
Act as a paranoid security and reliability engineer.
Analyze codebase for:
1. OWASP Top 10 scan (injection, XSS, auth flaws)
2. Insecure dependencies with CVEs
3. Error handling gaps — add try/catch for all critical paths
4. Health check endpoint (/healthz or /status)
```

### Prompt 3: Performance & Observability
```
Act as a Site Reliability Engineer. Analyze for:
1. Performance bottlenecks (N+1 queries, heavy computations, data loading)
2. Structured logging strategy (JSON format)
3. Key metrics instrumentation (latency, error rate, active users)
4. Scalability blockers (in-memory state → Redis/DB)
```

### Prompt 4: Production Deployment Blueprint
```
Act as a DevOps specialist. Generate:
1. Multi-stage Dockerfile (build + production)
2. docker-compose.yml for local dev (app + db + cache)
3. .env.example with all required variables
4. GitHub Actions CI pipeline (.github/workflows/ci.yml):
   - Install deps → Lint → Test → Build Docker image
```

---

<a id="7-workflow-f"></a>
## 7. WORKFLOW F: Landing Page за 1-3 часа

**Источник:** [VibeCoding.app](https://vibecoding.app/blog/vibe-coding-workflow-examples)
**Инструменты:** v0.dev (бесплатно) или Bolt.new (бесплатно, 150K токенов/день)

### Stage 1: Define (15 мин)
**Промпт (EN):**
```
Build a landing page for [product name] — [product description].

Structure:
- Hero section: headline "[headline]", subhead about [value prop], CTA "[CTA text]"
- Features section: [N] cards ([feature names])
- Social proof section: [N] testimonial cards
- Pricing section: [tier names] in a comparison table
- Footer with links

Style: clean, modern, lots of white space.
Primary color: [hex]. Use [font name] font.
Mobile-responsive.
```

### Stages 2-3: Build Iteratively (1-2 часа)
**Правило: один визуальный запрос за раз:**
```
The hero section needs more vertical padding — double it.
Move the CTA button to the left, aligned with the headline.
Make the feature cards equal height with icons above each title.
```

### Stage 4: Polish & Test
```
The pricing table breaks on mobile — the columns stack but the text overflows.
Make the table responsive: single column on mobile with each plan as a card.
```

### Stage 5: Deploy
v0 → экспорт в Next.js → push в GitHub → Vercel auto-deploy

---

<a id="8-tools"></a>
## 8. Универсальный стек бесплатных инструментов

### По этапам:

| Этап | Инструмент | Цена | Назначение |
|------|-----------|------|------------|
| **Стратегия/Research** | Claude (Max x5) | Подписка | Анализ ЦА, конкурентов, стратегия |
| **Стратегия/Research** | Exa | Бесплатно | Поиск данных о рынке |
| **Sitemap** | Relume | Бесплатно (лимит) | AI-генерация карты сайта |
| **Sitemap** | Claude | Подписка | Генерация структуры текстом |
| **Копирайтинг** | Claude | Подписка | Лучший для текстов и тона |
| **Wireframe** | v0.dev | Бесплатно | UI-генерация из промпта |
| **Wireframe** | Relume | Бесплатно | Wireframe из sitemap |
| **Дизайн** | Figma | Бесплатно (3 проекта) | Дизайн-макеты |
| **Дизайн** | Figma MCP + Claude | Подписка | Figma → код автоматически |
| **Изображения** | Freepik AI | Бесплатно (лимит) | Генерация фото/иллюстраций |
| **Изображения** | Leonardo AI | Бесплатно (лимит) | Генерация изображений |
| **Изображения** | ChatGPT (DALL-E) | Бесплатно (лимит) | Генерация изображений |
| **Разработка** | Cursor | $20/мес | AI IDE (можно на Claude Max) |
| **Разработка** | Claude Code (VS Code) | Подписка | AI-агент для кодинга |
| **UI-компоненты** | v0.dev | Бесплатно | Генерация React-компонентов |
| **UI-компоненты** | shadcn/ui | Бесплатно | Библиотека компонентов |
| **Backend/БД** | Supabase | Бесплатно | PostgreSQL + Auth + Storage |
| **Backend/БД** | Neon | Бесплатно | Serverless PostgreSQL |
| **Деплой** | Vercel | Бесплатно | Хостинг Next.js |
| **Тестирование** | Playwright MCP | Бесплатно | Автоматические браузерные тесты |
| **Тестирование** | Claude Code | Подписка | AI-ревью кода |
| **Версионирование** | GitHub | Бесплатно | Git + CI/CD |

### Ваш оптимальный стек (с учётом Claude Max x5):

```
Claude Max x5 (стратегия + тексты + код-ревью + тестирование)
  ↓
VS Code + Claude Code extension (разработка)
  ↓
v0.dev (UI-прототипы, бесплатно)
  ↓
Figma + Figma MCP (дизайн → код)
  ↓
shadcn/ui (компоненты, бесплатно)
  ↓
Supabase (БД + авторизация, бесплатно)
  ↓
Vercel (деплой, бесплатно)
  ↓
Playwright MCP (тестирование, бесплатно)
```

---

<a id="9-mega-prompts"></a>
## 9. Мега-промпты по этапам (универсальные)

### 9.1 Стартовый промпт: от идеи к PRD

**EN:**
```
I'm building a [website type] for [company/product] targeting [audience].

Business context:
- Industry: [industry]
- Main goal: [lead generation / sales / brand awareness / etc.]
- Unique value proposition: [what makes this different]
- Competitors: [list 2-3 competitor URLs]

Create a comprehensive PRD including:
1. Target audience profiles (2-3 segments with pain points)
2. Sitemap with page descriptions
3. For each page: sections, their purpose, headline direction, CTA
4. Database schema (if e-commerce or has user accounts)
5. Tech stack recommendation with justification
6. Success metrics (what to measure)

Format as structured markdown I can reference throughout development.
```

**RU:**
```
Я создаю [тип сайта] для [компания/продукт], ЦА: [аудитория].

Бизнес-контекст:
- Отрасль: [отрасль]
- Главная цель: [лидогенерация / продажи / узнаваемость]
- УТП: [чем отличаемся]
- Конкуренты: [2-3 URL]

Создай PRD:
1. Портреты ЦА (2-3 сегмента с болями)
2. Карта сайта с описанием страниц
3. Для каждой страницы: блоки, их задачи, направление заголовков, CTA
4. Схема БД (если есть e-commerce или аккаунты)
5. Рекомендация по стеку с обоснованием
6. Метрики успеха

Формат: структурированный markdown для постоянного использования.
```

### 9.2 Копирайтинг: полный текст страницы

**EN:**
```
Role: Expert conversion copywriter with 10+ years in [industry].

Write all copy for the [page name] page of [website].

Audience: [describe target user, their pain, desired outcome]
Tone: [professional yet approachable / bold and direct / warm and trustworthy]
Goal: [generate leads / drive purchases / build trust]

For each section, provide:
- Headline (max 8 words, benefit-focused)
- Subheadline (1-2 sentences expanding on the headline)
- Body copy (benefit-focused, scannable, no fluff)
- CTA button text + supporting micro-copy

Sections:
1. Hero — [purpose]
2. Problem/Pain — [purpose]
3. Solution — [purpose]
4. Features/Benefits — [purpose]
5. Social Proof — [purpose]
6. Pricing/CTA — [purpose]
7. FAQ — [purpose]

Rules:
- Lead with benefits, not features
- Use specific numbers over vague claims
- Every paragraph must answer "So what?" from the reader's perspective
- Write like a human, not a corporation
```

### 9.3 UI-генерация в v0 / Cursor

**EN:**
```
Build a [page type] using Next.js 14 App Router + Tailwind CSS + shadcn/ui.

Design requirements:
- Clean, modern aesthetic with plenty of white space
- Primary color: [hex], accent: [hex]
- Font: Inter (or system font stack)
- Fully responsive (mobile-first)
- Smooth scroll behavior
- Subtle animations on scroll (fade-in, slide-up)

Sections:
1. [Section] — [description of layout and content]
2. [Section] — [description of layout and content]
...

Use shadcn/ui components: Button, Card, Badge, Separator, Tabs where appropriate.
Keep the code clean, well-organized, and production-ready.
```

### 9.4 Полное тестирование

**EN:**
```
Review the entire codebase for this [website type] and:

1. SECURITY: Check for XSS, injection, auth bypasses, exposed secrets
2. PERFORMANCE: Identify N+1 queries, large bundle sizes, unoptimized images
3. ACCESSIBILITY: Check ARIA labels, contrast ratios, keyboard navigation
4. SEO: Verify meta tags, OG tags, structured data, sitemap.xml
5. MOBILE: Check responsive breakpoints, touch targets, viewport issues
6. ERROR HANDLING: Find unhandled promises, missing error boundaries

For each issue found:
- Severity (critical/high/medium/low)
- File and line
- Specific fix with code

Then generate a Playwright test suite covering the critical user flows.
```

### 9.5 Деплой на Vercel

**EN:**
```
Prepare this Next.js project for production deployment on Vercel:

1. Create vercel.json with optimal settings
2. List all required environment variables with descriptions
3. Set up proper caching headers for static assets
4. Configure redirects/rewrites if needed
5. Add proper error pages (404, 500)
6. Generate sitemap.xml and robots.txt
7. Set up Vercel Analytics (free tier)
8. Create deployment checklist I can follow

Current env vars: [list them]
Domain: [if known]
```

---

<a id="10-sources"></a>
## 10. Источники

### Полные workflow:
- [Tilda Education — 11-Stage AI Website Workflow (RU)](https://tilda.education/creating-a-website-with-ai)
- [DEV.to/Wasp — Structured Vibe Coding Workflow](https://dev.to/wasp/a-structured-workflow-for-vibe-coding-full-stack-apps-352l)
- [VibeCoding.app — 4 Complete Workflows with Prompts](https://vibecoding.app/blog/vibe-coding-workflow-examples)
- [Francesca Tabor — Cursor Agent + Supabase (12 stages)](https://www.francescatabor.com/articles/2025/12/28/from-idea-to-production-building-apps-faster-with-cursor-agent-and-supabase)
- [Richard Seroter — 4 Quality Hardening Prompts](https://seroter.com/2025/07/07/quality-focused-prompts-for-the-vibe-coding-addict/)

### Промпт-шаблоны и репозитории:
- [KhazP/vibe-coding-prompt-template (GitHub)](https://github.com/KhazP/vibe-coding-prompt-template) — PRD, Tech Design, Agent templates
- [filipecalegario/awesome-vibe-coding (GitHub)](https://github.com/filipecalegario/awesome-vibe-coding) — кураторский список ресурсов
- [VibeworkFlow.app](https://vibeworkflow.app/) — бесплатный генератор PRD → Tech Design → ZIP

### Инструменты:
- [Relume.io](https://www.relume.io/) — AI sitemap → wireframes → Figma/React
- [v0.dev](https://v0.dev/) — AI UI-генератор (бесплатно)
- [Supabase](https://supabase.com/) — PostgreSQL + Auth (бесплатно)
- [Vercel](https://vercel.com/) — деплой (бесплатно)
- [shadcn/ui](https://ui.shadcn.com/) — компоненты React (бесплатно)

### Эксперты и влиятельные лица:
- [Greg Isenberg](https://www.gregisenberg.com/) — AI startup workflows, $500 MVP
- [Riley Brown](https://x.com/rileybrown_ai) — Cursor tutorials, vibe coding
- [GoCodeo — Complete Vibe Coding Guide](https://www.gocodeo.com/post/vibe-coding-concept-workflow-ai-prompts-tools-case-study-more)
- [Habr — Rostislav Dugin (RU)](https://habr.com/ru/articles/1007842/) — Developer workflow с Claude
- [Codebrand — AI Website Builders Comparison](https://www.codebrand.us/blog/ai-website-builders-v0-cursor-2025/)

### Обучение:
- [Udemy — Complete AI Coding Course (Cursor + Claude + v0)](https://www.udemy.com/course/the-complete-ai-coding-course-2025-cursor-ai-v0-vercel/)
- [Frontend Masters — Cursor & Claude Code](https://frontendmasters.com/courses/pro-ai/)
- [DesignCode.io — Cursor + Claude AI](https://designcode.io/cursor/)

---

## Рекомендуемый комбинированный workflow (на основе исследования)

Для вашего кейса (корпоративный сайт / e-commerce, код, полный цикл, Claude Max):

```
ФАЗА 1: СТРАТЕГИЯ (1-2 часа)
├── Claude: анализ ЦА + конкурентов (Workflow A, этап 3)
├── Claude: PRD + sitemap (Workflow B, этап 3)
└── Perplexity: дополнительный research

ФАЗА 2: КОНТЕНТ (2-4 часа)
├── Claude: копирайтинг по AIDA (Workflow A, этап 5)
├── Claude: SEO-оптимизация текстов
└── Claude: микрокопия (кнопки, формы, ошибки)

ФАЗА 3: ПРОТОТИП + ДИЗАЙН (2-4 часа)
├── v0.dev: генерация UI из промптов (бесплатно)
├── Figma: доработка дизайна (бесплатно, 3 проекта)
├── Freepik AI / Leonardo: изображения (бесплатно)
└── Claude: визуальная концепция (Workflow A, этап 6)

ФАЗА 4: РАЗРАБОТКА (4-8 часов)
├── VS Code + Claude Code: scaffold + vertical slices (Workflow D)
├── shadcn/ui: компоненты (бесплатно)
├── Supabase: БД + Auth (бесплатно)
├── .cursorrules: правила для AI (Workflow B, этап 2)
└── git commit после каждой фичи

ФАЗА 5: QUALITY HARDENING (1-2 часа)
├── Claude: Security audit (Workflow E, промпт 2)
├── Claude: Performance audit (Workflow E, промпт 3)
├── Claude: Code quality (Workflow E, промпт 1)
└── Playwright MCP: автотесты

ФАЗА 6: ДЕПЛОЙ + ЗАПУСК (30 мин - 1 час)
├── Vercel: деплой (бесплатно)
├── Claude: deployment config (Workflow E, промпт 4)
└── Проверка: мобайл + скорость + SEO

ИТОГО: 10-20 часов от идеи до продакшена
```
