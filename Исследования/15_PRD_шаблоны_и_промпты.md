# PRD шаблоны и промпты для мерч-сайта

**Дата:** 20 марта 2026
**Цель:** Подобрать лучший формат PRD для составления требований к новому сайту elfprint.ru

---

## Итоговая рекомендация

Для нашего проекта (корпоративный мерч-сайт) берём **гибрид из 3 источников**:

| Источник | Что берём | Зачем |
|----------|-----------|-------|
| pingwu/agentic-landing-template (Consulting Services PRD) | Структуру User Stories + Acceptance Criteria + Success Metrics | Заточен под B2B-услуги с лид-генерацией |
| ChatPRD / ccforpms.com (Claude Code PRD Guide) | Методологию: Socratic Questions + Multi-approach + Sub-agent Review | AI-first workflow для Claude |
| Intercom "Intermission" | Ограничение на 1 страницу для executive summary | Фокус, никакой воды |

---

## Рекомендуемая структура PRD для elfprint.ru

```markdown
# PRD: [Название страницы / функции]

## 1. Problem Statement
- Какую проблему пользователя решаем?
- Кто испытывает эту проблему острее всего?
- Что будет, если НЕ решим?

## 2. Target Users (Job Stories)
- When [ситуация], I want to [действие], so I can [результат]
- (формат Intercom Job Stories вместо классических User Stories)

## 3. Solution Overview
- Что делаем (1-3 предложения)
- Чего НЕ делаем (Non-Goals — контроль скоупа)

## 4. User Stories + Acceptance Criteria
- US-1: [Название]
  - As a [кто], I want to [что], so that [зачем]
  - Acceptance Criteria:
    - [ ] Конкретный чекбокс 1
    - [ ] Конкретный чекбокс 2

## 5. Page Structure / Functional Requirements
| Секция | Required | Ключевые элементы |
|--------|----------|-------------------|
| Hero   | Yes      | ... |
| ...    | ...      | ... |

## 6. Content Requirements
- Что нужно написать / подготовить для каждой секции
- Тон, стиль, ограничения

## 7. Design Requirements
- UX/UI требования
- Мобильная версия
- Анимации

## 8. Technical Requirements
- Стек, интеграции, API
- SEO-требования
- Производительность

## 9. Success Metrics
| Метрика | Target | Как измеряем |
|---------|--------|-------------|
| ...     | ...    | ...         |

## 10. Constraints & Risks
- Жёсткие ограничения
- Известные риски
```

---

## Источник 1: Consulting Services PRD (pingwu/agentic-landing-template)

**Repo:** https://github.com/pingwu/agentic-landing-template
**Файл:** docs/PRD-TEMPLATES.md

### Почему подходит нам (9/10):
- B2B-услуги с фокусом на лид-генерацию
- Есть секции: Credibility, Service Tiers, Case Studies, Testimonials
- Measurable success metrics
- AI-friendly (Claude/Cursor)

### Ключевые User Stories (адаптируем под elfprint):

**US-1: Доверие с первого взгляда**
- As a потенциальный корпоративный клиент
- I want to быстро понять экспертизу и опыт компании
- So that я решу, стоит ли тратить время на изучение

Acceptance Criteria:
- [ ] Профессиональный заголовок виден за 2 секунды
- [ ] Ключевые цифры (20 лет, 300+ клиентов) выше fold
- [ ] Социальное доказательство (логотипы, отзывы) без скролла
- [ ] Чёткая специализация указана

**US-2: Понимание услуг**
- As a клиент, оценивающий варианты
- I want to понять какие услуги и по какой цене
- So that я могу сам оценить подходит ли мне

**US-3: Доказательство результатов**
- As a скептичный посетитель
- I want to видеть доказательства качества работ
- So that я могу доверить свой заказ

**US-4: Простой следующий шаг**
- As a заинтересованный клиент
- I want to легко связаться / оставить заявку
- So that начать работу без трения

### Functional Requirements (шаблон):

| Секция | Required | Ключевые элементы |
|--------|----------|-------------------|
| Hero | Yes | Название, специализация, ценностное предложение, CTA |
| Authority | Yes | Цифры, опыт, краткое описание |
| Services | Yes | Услуги с ценами, особенности, CTA |
| Case Studies | Yes | 2-3 проекта с метриками |
| Testimonials | Recommended | 3+ цитат с атрибуцией |
| FAQ | Recommended | 4-6 частых возражений |
| Contact | Yes | Форма, телефон, мессенджеры, карта |

### Success Metrics (шаблон):

| Метрика | Target | Измерение |
|---------|--------|-----------|
| Посетитель → заявка | >3% | Яндекс.Метрика + CRM |
| Время на странице | >2 мин | Яндекс.Метрика |
| Bounce rate | <50% | Яндекс.Метрика |
| Заявки / месяц | 30+ | CRM |
| Заявка → КП | >50% | CRM |

---

## Источник 2: Claude Code PRD Methodology (ccforpms.com + ChatPRD)

**URL:** https://ccforpms.com/advanced/write-prd
**URL:** https://www.chatprd.ai/resources/PRD-for-Claude-Code

### 4 ключевые техники:

#### 1. Full Context через @-mentions
Даём Claude всю информацию сразу:
- Контекст компании (бриф, исследования, аудит сайта)
- Данные пользователей (ICP, JTBD, осведомлённость)
- Шаблон PRD
- Методологические файлы (Скрижаль)

#### 2. Socratic Questioning — уточняющие вопросы перед драфтом

**Ясность проблемы:**
- Какую конкретную боль пользователя решаем?
- Кто испытывает это острее всего?
- Сколько стоит НЕ решать?

**Валидация решения:**
- Почему именно это решение?
- Какие альтернативы рассматривались?
- Какая минимальная версия?

**Критерии успеха:**
- Как измерим успех?
- Что будет означать провал?
- Какую метрику двигаем и на сколько?

**Ограничения:**
- Какие технические риски?
- Что мы НЕ делаем?
- Если бы было вполовину меньше времени — что вырежем?

#### 3. Несколько стратегических подходов
Генерируем 2-3 варианта параллельно через sub-agents, затем синтезируем лучшее.

#### 4. Multi-perspective Review через sub-agents
- Engineer: техническая реализуемость, риски
- Executive: бизнес-ценность, стратегический фит
- User Researcher: потребности пользователей, юзабилити

### Форматирование PRD для Claude:
- **Bullet points** вместо плотных параграфов (Claude обрабатывает как чеклист)
- **Чёткие заголовки секций** (Acceptance Criteria, Technical Requirements)
- **Атомарные User Stories** — одна задача на одну историю
- **Нумерация** (US1, US2) для ссылок

---

## Источник 3: Intercom "Intermission" (Lean PRD)

**Философия:** "The longer the doc, the less it gets read"
**Ограничение:** Должен умещаться на 1 страницу A4

### Структура:
1. **Problem Statement** — что решаем (с данными)
2. **Job Stories** — "When _____, I want _____, so I can _____"
3. **Success Criteria** — качественные + количественные
4. **Scope** — релизы, что входит/не входит, дедлайны

### Применение для нас:
Executive summary каждого PRD пишем в формате Intermission — 1 страница максимум. Детали — в развёрнутых секциях ниже.

---

## Дополнительные ресурсы

### Website-specific PRD:
- **The Square Agency** — 5-Point Website Requirements: Purpose, Audience, Structure, Content, Tech Specs
  https://thesquareagency.com/blog/website-requirements-document-template

### E-commerce PRD:
- **Elogic** — полный гайд по e-commerce requirements с user journeys
  https://elogic.co/blog/how-to-write-an-ecommerce-website-requirements-specification-document-tips-tricks-and-best-practices/

### AI-инструменты:
- **ChatPRD** — AI-платформа для генерации PRD (100K+ пользователей)
  https://www.chatprd.ai/
- **PRD for Cursor** — специфичные рекомендации для Cursor
  https://www.chatprd.ai/resources/PRD-for-Cursor

### Notion шаблоны:
- 116+ PRD шаблонов: https://www.notion.com/templates/category/product-requirements-doc
- Website Design PRD: https://www.notion.com/templates/prd-template-website-design

### Визуальные:
- **Miro PRD** — canvas-based, командное выравнивание
- **Figma PRD + AI Generator** — интеграция с дизайн-системой
- **FlowMapp** — сайтмапы, user flows, wireframes

---

## Промпт для генерации PRD elfprint.ru

```
Ты — продуктовый менеджер с опытом в B2B-услугах и маркетинговых сайтах.

Напиши PRD для [страница/функция] нового сайта elfprint.ru —
корпоративного мерч-производства "Огни Эльфов" (20+ лет, 300+ клиентов,
собственное производство в Москве).

Основное позиционирование: корпоративный мерч под ключ.

Используй следующие данные:
- Аудит текущего сайта: Исследования/14_анализ_сайта_и_прайса.md
- ICP и психографика: Исследования/04_психографика_ICP.md
- JTBD: Исследования/06_JTBD_рынок.md
- Осведомлённость по Шварцу: Исследования/05_осведомлённость_Шварц.md
- Конкурентный анализ: Исследования/01_конкурентный_анализ.md

Структура PRD:
1. Problem Statement (с данными)
2. Target Users (Job Stories формат)
3. Solution Overview + Non-Goals
4. User Stories + Acceptance Criteria (чекбоксы)
5. Page Structure / Functional Requirements (таблица)
6. Content Requirements
7. Design Requirements
8. Technical Requirements
9. Success Metrics (таблица)
10. Constraints & Risks

Формат: bullet points, нумерованные US, acceptance criteria как [ ] чеклист.
Язык: русский для контента, английский для технических терминов.
```
