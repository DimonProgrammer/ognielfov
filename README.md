# Огни Эльфов — Сайт

Корпоративный мерч под ключ. elfprint.ru — 20 лет на рынке, фабрика в Москве.

## Структура репозитория

```
prototype/      # Статический HTML-прототип сайта (деплоится на Vercel)
docs/           # Документация: PRD, SEO, копирайтинг, гайды по деплою
deploy/         # Конфиги nginx и PM2 для продакшн-сервера (Timeweb Cloud)
src/            # Контент для будущего Astro-сайта
vercel.json     # Конфиг Vercel (outputDirectory: prototype)
CLAUDE.md       # Инструкции для AI-ассистента
```

## Стек

- Прототип: HTML + Tailwind CSS CDN
- Продакшн план: Astro 5 + Tailwind 4 + shadcn/ui
- Хостинг: Timeweb Cloud VPS, Москва (152-ФЗ)
- CI/CD: GitHub Actions → SSH deploy

## Деплой прототипа

Автодеплой из ветки `main` → [ognielfov.vercel.app](https://ognielfov.vercel.app)

Финальный продакшн: Timeweb Cloud VPS (см. `deploy/`)

## Контакты проекта

Сайт: [elfprint.ru](https://elfprint.ru)
Телефон: +7 (495) 380-40-32
