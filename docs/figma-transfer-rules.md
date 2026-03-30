# Правила и инструкция: перенос страниц в Figma

## Что работает (проверено в марте 2026)

### Метод: Script-tag + hash-URL (для страниц на Vercel)

Все страницы уже содержат инжектированный скрипт захвата Figma:
```html
<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
```

Благодаря этому можно открывать страницы с hash-параметрами и они сами отправятся в Figma — без Playwright.

### Пошаговый алгоритм

1. **Получить captureId** через MCP инструмент:
   ```
   mcp__figma__generate_figma_design(
     outputMode: "existingFile",
     fileKey: "kknpIHFSL12WTtgAcPHcEl"
   )
   ```
   → возвращает `captureId` и endpoint URL

2. **Открыть страницу** с hash-параметрами:
   ```bash
   open "https://ognielfov.vercel.app/<page>#figmacapture=<captureId>&figmaendpoint=https%3A%2F%2Fmcp.figma.com%2Fmcp%2Fcapture%2F<captureId>%2Fsubmit&figmadelay=2000"
   ```
   - `figmadelay=2000` — дать странице время загрузиться перед захватом

3. **Подождать ~10 секунд**, затем проверить статус:
   ```
   mcp__figma__generate_figma_design(captureId: "<captureId>")
   ```
   Повторять каждые 5 сек до статуса `completed`.

4. После `completed` — повторить для следующей страницы с новым captureId.

### Важно: отключить анимации перед переносом

CSS-файл `prototype/css/custom.css` содержит `.reveal { opacity: 0; transform: translateY(20px); }` — элементы невидимы до скролла. Перед захватом нужно временно сделать все элементы видимыми:

```css
/* TEMP: disable for Figma capture */
.reveal {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

После завершения всех захватов — **обязательно вернуть** исходный CSS:
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
```

И задеплоить изменение.

### Figma файл проекта

- **File key**: `kknpIHFSL12WTtgAcPHcEl`
- **Страница**: Page 1
- Все фреймы — прямые дети `canvas id="0:1"`

### Vercel production URL

- `https://ognielfov.vercel.app`
- Последний production deploy: `ognielfov-kaeigumi4-dimasens.vercel.app`

### Список всех страниц для захвата (26 штук)

Уже перенесены (в файле есть):
| Фрейм Figma | Страница |
|-------------|----------|
| 117:2 | index.html |
| 119:2 | uslugi.html |
| 120:2 / 124:2 | uslugi-dtf.html (дубль — ок) |
| 121:2 / 125:2 | uslugi-shelkografiya.html (дубль — ок) |
| 122:2 / 126:2 | uslugi-vyshivka.html (дубль — ок) |
| 127:2 | uslugi-sublimaciya.html |
| 128:2 | uslugi-uf-pechat.html |
| 129:2 | uslugi-tampoprint.html |
| 130:2 | catalog.html |
| 131:2 | catalog-odezhda.html |
| 132:2 | catalog-aksessuary.html |
| 133:2 | catalog-posuda.html |
| 134:2 | catalog-tekstil.html |
| 135:2 | catalog-elektronika.html |
| 136:2 | catalog-kancelyariya.html |
| 137:2 | korporativnym-klientam.html |
| 138:2 | marketplejsy.html |
| 139:2 | optom.html |
| 140:2 | portfolio.html |
| 141:2 | o-kompanii.html |
| 142:2 | kontakty.html |
| 143:2 | blog.html |
| 144:2 | blog-sublimacija-vs-dtf.html |

Ещё не перенесены (нужно при следующем запросе):
- blog-korporativnyj-merch.html
- blog-vybor-pechati.html
- blog-article.html

### Почему Playwright НЕ нужен для этого проекта

Инструкция говорит "для внешних URL — используй Playwright". Но это правило для сайтов БЕЗ инжектированного скрипта. У нас скрипт уже вшит в HTML всех страниц, поэтому hash-URL метод работает напрямую без Playwright.

**Доказательство**: в сессии марта 2026 было успешно перенесено 26 страниц именно этим методом — все фреймы видны в Figma файле.

### Типичные ошибки и как их избежать

| Проблема | Решение |
|----------|---------|
| Пустые/полупустые макеты в Figma | Отключить `.reveal` анимации в custom.css перед захватом |
| Токен Figma MCP истёк | Пользователь должен переавторизоваться в настройках MCP |
| Статус captureId застрял в `pending` | Проверить, что страница открылась — попробовать ещё раз с новым captureId |
| `open` команда не работает | Проверить что URL не содержит неэкранированных символов |
