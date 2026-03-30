# Промпты для Google Stitch — "Огни Эльфов"

Контент один-в-один из текущего прототипа. Задача Stitch — пересобрать визуал, сделать насыщеннее и премиальнее.

---

## Базовый контекст (вставляй в начало КАЖДОГО промпта)

```
You are redesigning an existing Russian corporate merch manufacturer website "Огни Эльфов" (elfprint.ru). The content is FINAL — do not change any text, numbers, or labels. Your job is to create a visually richer, more premium design.

Design tokens (MANDATORY):
- Background: #FFFFFF, secondary: #F5F5F7
- Text primary: #1D1D1F, secondary: #6E6E73, tertiary: #86868B
- Accent: #C6F24E (lime green)
- Font: "Onest" from Google Fonts
- Headings: weight 800, letter-spacing -0.03em
- Body: weight 400, 18px, line-height 1.5
- Buttons: pill-shaped, border-radius 50px, font-weight 600
- Cards: border-radius 16px, hover: translateY(-4px) + shadow
- Container: max-width 1280px, centered
- Section spacing: 96-128px vertical padding
- Navigation: sticky, frosted glass (backdrop-blur 20px)

Style: Apple.com-inspired minimalism. Premium, trustworthy, clean.
Desktop viewport 1440px. All text in Russian.
DO NOT change any text content — use it exactly as provided.
```

---

## Промпт 1 — Hero (Главная)

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the homepage hero section. Use ALL of this exact content:

H1: "Производство мерча и брендированной продукции под ключ"
Subtitle: "Собственная фабрика в Москве, 6 технологий нанесения, доставка по всей России"
Chips (pill badges): "Своя фабрика в Москве" | "От 1 штуки" | "20+ лет опыта" | "2 000+ клиентов" | "Ответ за 30 мин" | "Безнал с НДС"
Primary CTA button: "Обсудить проект"
Secondary CTA link: "Смотреть каталог →"
Right side: image placeholder area with text "Фото: команда в брендированном мерче на фоне производства — худи, футболки, шопперы с фирменным стилем"

Make it visually impactful:
- Add subtle gradient or geometric pattern to the hero background
- Make the H1 larger and more dramatic (56-64px)
- Add a small animated-ready badge above H1 (like Apple's "New" pill)
- The image placeholder should feel like a premium card with rounded corners and subtle shadow
- Chips should have slight glass-morphism effect
```

---

## Промпт 2 — Stats Strip

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the stats strip. Background: #C6F24E (lime). Full-width.

Exact stats (do not change numbers or labels):
- "от 10" / "штук мин. тираж"  — wait, this is for DTF page

For HOMEPAGE the stats are embedded in chips, not a separate strip.

For DTF page stats strip:
- "от 10" / "штук мин. тираж"
- "от 3" / "дней производство"
- "60" / "стирок стойкость"
- "от 450" / "руб./пог. м"

For Corporate page stats strip:
- "20+" / "лет на рынке"
- "2 000+" / "корпоративных клиентов"
- "50%" / "объёма — повторные заказы"
- "30" / "минут — время ответа"

Make it visually richer:
- Numbers should be large and bold (48px+), labels smaller below
- Add subtle dividers between stats
- Consider countUp animation-ready markup
- The lime background should feel vibrant but not overwhelming
```

---

## Промпт 3 — Bento Grid: Услуги (Главная)

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the services bento grid section. Exact content:

Section H2: "Услуги производства мерча"
Subtitle: "Полный цикл: от подбора продукции и разработки дизайна до нанесения и доставки"

4 service cards in a bento grid layout:

Card 1 (LARGE, spans 2 columns):
- Title: "DTF-печать"
- Badge: "от 1 шт."
- Description: "Полноцветные принты на любых тканях. Фотокачество, стойкость до 60 стирок."

Card 2:
- Title: "Шелкография"
- Badge: "от 100 шт."
- Description: "Выгоднее всего на тиражах от 500 шт. Насыщенные цвета, максимальная стойкость."

Card 3:
- Title: "Вышивка"
- Badge: "от 100 шт."
- Description: "Объёмный логотип на ткани. Премиальный вид, идеальна для корпоративной одежды."

Card 4:
- Title: "Сублимация"
- Badge: "от 1 м"
- Description: "Рулонная печать по всей площади синтетической ткани. Спортивная форма, флаги, текстиль из полиэстера."

Design goals:
- Each card should have a large image placeholder area (aspect ~4:3)
- Cards on #F5F5F7 background with hover lift effect
- The large card should feel hero-like, visually dominant
- Add subtle icons or illustrations for each service
- Badges should be lime (#C6F24E) pills
```

---

## Промпт 4 — Process Stepper (Главная)

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the "How we work" process section. Exact content:

H2: "Как мы работаем"
Subtitle: "От заявки до доставки — 5 шагов"

Steps:
1. "Бриф" — "Обсуждаем задачу, бюджет, сроки и объём. Ответим за 30 минут"
2. "Подбор метода" — "Подбираем оптимальную технологию и материалы под ваш макет"
3. "Производство" — "Печатаем на импортном оборудовании: SROQUE (Португалия), MIMAKI и BARUDAN (Япония)"
4. "Контроль качества" — "Проверяем каждое изделие перед отправкой. Брак — за наш счёт"
5. "Доставка" — "СДЭК, Почта России, курьер по Москве или самовывоз с фабрики"

Design goals:
- Horizontal timeline with numbered circles connected by a line
- Circles: lime (#C6F24E) background with bold number
- Connection line: solid lime between completed steps
- Each step: circle → title (bold) → description below
- Make it feel like a premium onboarding flow, not a boring list
- Consider icons inside circles instead of just numbers
```

---

## Промпт 5 — Каталог Grid (Главная)

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the product catalog grid section. Exact content:

H2: "Каталог продукции"
Subtitle: "Всё доступно для нанесения логотипа 6 технологиями"
Link: "Весь каталог →"

Featured card (large, spans 2 columns):
- Title: "Одежда"
- Details: "Футболки 180г/240г, лонгсливы 210г, худи 340г оверсайз"
- Price: "от 184 ₽/шт."
- CTA: "Смотреть →"

Category cards:
1. "Аксессуары" — "Шопперы, рюкзаки, кепки, зонты" — "от 250 ₽/шт."
2. "Посуда" — "Кружки, термосы, бутылки" — "от 450 ₽"
3. "Канцелярия" — "Ручки, блокноты, ежедневники" — "от 120 ₽"
4. "Текстиль" — "Полотенца, пледы, подушки" — "от 590 ₽"
5. "Электроника" — "Повербанки, колонки, наушники" — "от 990 ₽"

Design goals:
- Featured card: large image placeholder, premium feel, dark overlay with white text
- Small cards: image placeholder + title + details + price
- Hover: card lifts with shadow
- Price badges: lime background
- Consider a slight asymmetric bento layout (not just regular grid)
```

---

## Промпт 6 — Кейсы (Главная)

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the portfolio/cases section. Exact content:

H2: "Кейсы и примеры работ"
Subtitle: "Яндекс, Тинькофф, Лукойл и ещё 2 000+ компаний"
Link: "Все кейсы →"

Featured case (large):
- Image text: "Мерч для конференции на 2000 человек"
- Description: "Футболки, шопперы, бейджи, стикерпаки. Дизайн с нуля, производство за 10 дней."
- CTA: "Подробнее →"

Small cases:
1. "Welcome-kit для новых сотрудников" — "Подробнее →"
2. "Брендированная форма для сети ресторанов" — "Подробнее →"

Design goals:
- Magazine-style layout with one hero case and two smaller
- Image placeholders should feel cinematic (16:9 for hero, 4:3 for small)
- Hover: subtle overlay with text
- Make it feel like a premium design agency portfolio
- Add subtle category tags on cards
```

---

## Промпт 7 — Отзывы (Главная)

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the testimonials section. Exact content:

H2: "Отзывы клиентов"
Subtitle: "Реальные отзывы с Яндекс.Карт"
Rating badge: "4.9 / 51 отзыв на Яндекс.Картах"

Testimonials (show 4-6, the rest scroll):
1. "Лаура" — "Заказывали печать на футболках для корпоратива. Качество отличное, принт яркий, сроки соблюдены. Менеджер Елена помогла подобрать оптимальный вариант."
2. "Ольга" — "Делали welcome-kit для новых сотрудников: худи, блокноты, ручки в коробке. Всё сделали в срок, упаковка аккуратная, качество на высоте."
3. "Игроман52" — "Печатали партию футболок DTF-методом. Цвета насыщенные, после стирки не потеряли вид. Обращусь ещё раз."
4. "Дмитрий К." — "Заказывали вышивку на поло для всей команды. Логотип получился объёмный и аккуратный. Быстро рассчитали стоимость и согласовали макет."
5. "Анна М." — "Работаем уже третий год. Стабильное качество, быстрые сроки, адекватные цены. Рекомендую как надёжного подрядчика по мерчу."
6. "Сергей В." — "Шелкография на шопперах — 500 штук за неделю. Краска легла ровно, ни одного бракованного экземпляра. Буду обращаться повторно."

Design goals:
- Cards on white background (#FFFFFF), section bg #F5F5F7
- Each card: 5 yellow stars (★), quote text, author name bold, no avatars — use initial circles instead
- Horizontal scroll or marquee animation
- Rating badge prominent at top (Яндекс stars + score)
- Premium, trustworthy feel
```

---

## Промпт 8 — FAQ (Главная)

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the FAQ section. Exact content:

H2: "Частые вопросы"
Subtitle: "Не нашли ответ? Напишите нам — ответим за 30 минут"
Link: "Написать в Telegram"

Two-column layout: left = heading + subtitle + link, right = accordion.

Q&A items:
1. Q: "Какой минимальный заказ?" — A: "Зависит от технологии: DTF — от 1 штуки, шелкография и вышивка — от 100, сублимация — от 1 погонного метра, пошив — от 1 000 штук."
2. Q: "Работаете по безналу с НДС?" — A: "Да, полный пакет закрывающих документов: счёт, акт, счёт-фактура. ИНН 7721525448, ОГРН 1057746319432."
3. Q: "Какие сроки производства?" — A: "DTF-печать — от 3 рабочих дней. Шелкография, вышивка — от 7 дней. Пошив — от 14 дней. Срочные заказы — обсуждаем индивидуально."
4. Q: "Можно заказать пробный образец?" — A: "Да, пробный образец оплачивается отдельно. При заказе партии его стоимость вычитается из суммы заказа."
5. Q: "Какую технологию выбрать для футболок?" — A: "До 500 штук с многоцветным дизайном — DTF. От 500 штук с простым макетом — шелкография (дешевле на единицу). Присылайте макет — подберём оптимальный вариант."
6. Q: "Как устроена доставка?" — A: "СДЭК и Почта России по всей стране. По Москве — курьер или самовывоз с фабрики (ул. Фабричная, д. 6, стр. 1)."
7. Q: "Что делать, если нет готового макета?" — A: "Наш дизайнер разработает макет по вашему брендбуку или с нуля. Стоимость — в зависимости от сложности, обсуждается на этапе брифа."

Design goals:
- Left column: sticky heading area
- Right column: expandable accordion items
- First item open by default
- Smooth expand animation
- Subtle + / − icons
- Clean, not cluttered
```

---

## Промпт 9 — CTA Dark Panel

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the dark CTA section. Exact content:

Background: #1D1D1F (near-black), full width.

H2: "Обсудим ваш проект?"
Subtitle: "Расскажите о задаче — подберём решение и рассчитаем стоимость. Ответим за 30 минут"

Form fields:
- Input: "Имя"
- Input: "Телефон"
- Submit button: "Отправить"
- Checkbox: "Согласен на обработку персональных данных"
- Text: "Или напишите в мессенджер:"
- Messenger links: "Telegram" | "MAX"

Design goals:
- Add subtle gradient mesh or geometric accent pattern at low opacity
- Center-aligned layout
- Form should feel compact and premium (inline or card-style)
- Lime CTA button stands out against dark background
- Messenger icons should be recognizable
- Think Apple's dark hero sections
```

---

## Промпт 10 — Footer

```
[ВСТАВЬ БАЗОВЫЙ КОНТЕКСТ]

Redesign the footer. Background: #F5F5F7. Exact content:

Column 1 — Company:
- Logo: "ОГНИ ЭЛЬФОВ" (SVG placeholder)
- "Производство мерча под ключ"
- "г. Москва, ул. Фабричная, д. 6, стр. 1"
- "Фабрика «Победа труда»"
- Badge: "4.9 Яндекс.Отзывы"

Column 2 — Navigation:
- Header: "НАВИГАЦИЯ"
- Links: Услуги | Каталог | Кейсы | Блог | Маркетплейсы | О компании | Контакты

Column 3 — Contacts:
- Header: "КОНТАКТЫ"
- "+7 (495) 380-40-32"
- "+7 (915) 264-88-80 Елена"
- "info@elfprint.ru"
- Social: Telegram | VKontakte | MAX
- Legal: "ИНН: 7 721 525 448" | "ОГРН: 1 057 746 319 432"

Column 4 — Map:
- Header: "МЫ НА КАРТЕ"
- Map placeholder (Яндекс.Карты widget area)

Bottom bar:
- "© 2026 Огни Эльфов. Все права защищены."
- "Политика конфиденциальности" | "Оферта"

Design goals:
- 4-column grid, clean and organized
- Map area: rounded placeholder with subtle border
- Social links: small icon buttons
- Rating badge: yellow star + score
- Bottom bar: thin border-top separator
- Overall: informative but not cluttered
```

---

## Порядок работы

1. Создай проект в Stitch
2. Генерируй секции **по одной** (промпты 1-10)
3. После каждой генерации — проверь, что текст не изменился
4. Если Stitch поменял текст — скажи ему: `"Do not change any text. Use the exact Russian text I provided. Only redesign the visual layout."`
5. Когда готово — экспортируй HTML или "Copy to Figma"
6. Скинь мне — я внедрю в прототип
