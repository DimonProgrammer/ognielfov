# Промпты Higgsfield — оптимизированный план

19 клиентских фото + 1 Higgsfield-генерация = покрывают ~60% плейсхолдеров.
Оставшиеся ~35 уникальных генераций (вместо 86) — за счёт переиспользования.

---

## ЧАСТЬ 1: Клиентские фото → куда ставить

### hero-merch-flatlay.jpg (Higgsfield, уже есть)
Брендированный мерч flat lay — худи, футболка, шоппер, блокнот, ручки
- **index.html** → hero (уже стоит)
- **korporativnym-klientam.html** → hero (вместо "welcome-kit в коробке")
- **uslugi.html** → hero placeholder "Изображение технологий"
- **portfolio.html** → featured кейс

### футболки-цвета-1.jpg
7 футболок веером по цветам
- **index.html** → каталог "Одежда" featured (уже стоит)
- **catalog.html** → категория "Одежда"
- **catalog-odezhda.html** → featured "Футболки Basic 180г"
- **optom.html** → hero "стопка blank-футболок"

### футболки-цвета-2.jpg
Аналогичный ракурс, другие цвета
- **catalog-odezhda.html** → "Футболки Premium 240г"

### футболки-цвета-3.jpg
- **optom.html** → карточка "Футболки"

### футболки-цвета-4.jpg
- **blog.html** → featured article image

### футболки-стопки-стол.jpg
4 стопки на тёмном фоне (белый, серый, тёмный, чёрный)
- **index.html** → карточка "Малые заказы / Футболки с принтами"
- **catalog-odezhda.html** → "Свитшоты" (похожий вид стопки)

### корпоративный-заказ-худи.jpg
Чёрные худи с белым логотипом, стопкой
- **korporativnym-klientam.html** → "Брендированная одежда" карточка
- **catalog-odezhda.html** → "Худи с начёсом"
- **portfolio.html** → кейс "Брендированная форма"

### худи-белое.jpg
Белое худи flat lay
- **catalog-odezhda.html** → "Худи без начёса 340г"
- **optom.html** → карточка "Худи"

### футболки-в-офисе-1.jpg
Стопки на столе, принты на стене
- **portfolio.html** → кейс "Welcome-kit для сотрудников"
- **o-kompanii.html** → производство/офис

### футболки-в-офисе-2.jpg
Тот же ракурс
- **portfolio.html** → кейс "Event-мерч"

### dtf-принтер.jpg
DTF-принтер крупным планом
- **index.html** → карточка DTF (уже стоит)
- **uslugi-dtf.html** → hero
- **blog-sublimacija-vs-dtf.html** → иллюстрация DTF

### вышивка-машина-с-изделиями.jpg
Цех вышивки, работники
- **index.html** → карточка Вышивка (уже стоит)
- **uslugi-vyshivka.html** → hero

### вышивальная-машина.jpg
Промышленная вышивальная машина крупно
- **uslugi-vyshivka.html** → галерея (доп. фото)

### мастерская-светлая.jpg
Светлая мастерская, окно
- **o-kompanii.html** → hero "фасад фабрики или цех"

### принтованные-футболки-стопка.jpg
Стопка с яркими принтами
- **uslugi-dtf.html** → галерея "футболки с DTF-принтом"
- **index.html** → карточка "Шелкография" (уже стоит)

### футболки-веером-сверху-1.jpg
- **catalog-odezhda.html** → "Поло" (ближайший визуал)

### футболки-веером-сверху-2.jpg
- **optom.html** → карточка "Лонгсливы"

### рулоны-ткани.jpg
Рулоны на складе
- **uslugi-sublimaciya.html** → hero "оборудование, процесс сублимации"

### цех-синие-стены.jpg
Цех с оборудованием
- **index.html** → карточка Сублимация (уже стоит)
- **uslugi-sublimaciya.html** → галерея

---

## ЧАСТЬ 2: Что генерируем (и где переиспользуем)

### Описание логотипа (использовать ВЕЗДЕ одинаково):
```
four vertical bars logo (three black, one lime green) with "ОГНИ ЭЛЬФОВ" text
```
Короткий вариант для мелких предметов: `minimal four-bar logo with lime accent`

### Постфикс для ПРОДУКТОВЫХ фото (студия):
```
white or light gray studio background, professional product photography, clean minimal aesthetic, soft even studio lighting, sharp focus, 85mm f/2.8 lens, commercial e-commerce style, 4K resolution, no text overlays, no watermarks
```

### Постфикс для DOCUMENTARY фото (процесс/цех):
```
bright industrial workshop setting, professional documentary photography, natural + artificial lighting, sharp focus, 35mm f/2.0 lens, authentic workplace aesthetic, no text overlays, no watermarks
```

---

### ГРУППА A: Аксессуары (1 генерация → 4 места)

**A1. Шоппер с логотипом** [+ продуктовый постфикс]
```
canvas tote bag in natural beige with lime green (#C6F24E) bottom panel, small minimal four-bar logo with lime accent printed on front, flat lay on white background, showing handles and spacious interior
```
Куда:
- catalog.html → категория "Аксессуары"
- catalog-aksessuary.html → featured product
- korporativnym-klientam.html → "Event-мерч" карточка (шоппер в составе)
- index.html → карточка "Упакованные заказы" (если не клиентское фото)

---

### ГРУППА B: Посуда (2 генерации → 5 мест)

**B1. Белая кружка с логотипом** [+ продуктовый постфикс]
```
white ceramic mug with small minimal four-bar logo (three black bars, one lime green) printed on side, studio shot with soft shadow, three-quarter view showing handle
```
Куда:
- catalog.html → категория "Посуда"
- catalog-posuda.html → featured product
- catalog-posuda.html → "Кружки"

**B2. Термос чёрный с гравировкой** [+ продуктовый постфикс]
```
matte black stainless steel travel tumbler with laser-engraved minimal four-bar logo with lime accent on body, standing on white background, showing lid and USB port detail
```
Куда:
- catalog-posuda.html → "Термосы/термокружки"
- catalog-posuda.html → "Бутылки для воды" (похожий визуал, подойдёт)

---

### ГРУППА C: Канцелярия (2 генерации → 5 мест)

**C1. Блокнот + ручка** [+ продуктовый постфикс]
```
A5 black hardcover notebook with debossed minimal four-bar logo on cover and lime green (#C6F24E) elastic closure band, matching black metal pen with lime clip beside it, flat lay on white surface, overhead shot
```
Куда:
- catalog.html → категория "Канцелярия"
- catalog-kancelyariya.html → featured product
- catalog-kancelyariya.html → "Блокноты"

**C2. Набор ручек** [+ продуктовый постфикс]
```
set of 3 metal pens — black, silver, and lime green (#C6F24E) — each with small laser-engraved four-bar logo, arranged diagonally on white background, close-up showing engraving detail
```
Куда:
- catalog-kancelyariya.html → "Ручки"
- catalog-kancelyariya.html → "Наборы канцелярии"

---

### ГРУППА D: Текстиль (1 генерация → 3 места)

**D1. Полотенце с вышивкой** [+ продуктовый постфикс]
```
white cotton towel with small embroidered four-bar logo in black thread (rightmost bar in lime green thread), neatly folded showing embroidery texture detail, light gray background
```
Куда:
- catalog.html → категория "Текстиль"
- catalog-tekstil.html → featured product
- catalog-tekstil.html → "Полотенца"

---

### ГРУППА E: Электроника (2 генерации → 5 мест)

**E1. Повербанк с УФ-печатью** [+ продуктовый постфикс]
```
sleek matte black 10000mAh power bank with UV-printed white four-bar logo and lime accent bar on top surface, on white background, showing USB-C port and LED indicators, three-quarter view
```
Куда:
- catalog.html → категория "Электроника"
- catalog-elektronika.html → featured product
- catalog-elektronika.html → "Повербанки"

**E2. Беспроводные наушники в кейсе**
```
wireless earbuds in matte black charging case with small printed white logo on lid, case open showing earbuds, white background, tech product photography
```
Куда:
- catalog-elektronika.html → "Наушники"
- catalog-elektronika.html → "Колонки" (переиспользуем, похожий визуал)

---

### ГРУППА F: Welcome-kit (1 генерация → 3 места)

**F1. Welcome-kit в коробке (тёмный фон)**
```
open branded black gift box on dark charcoal surface — black hoodie with white geometric logo, notebook, pen, sticker pack inside, lime green tissue paper accent, moody professional lighting, corporate gift photography
```
Куда:
- korporativnym-klientam.html → тёмная карточка "Welcome-kit"
- index.html → карточка "Welcome-kit в коробке"
- korporativnym-klientam.html → "Подарки партнёрам"

---

### ГРУППА G: Шелкография (2 генерации → 4 места)

**G1. Процесс шелкографии**
```
screen printing press with squeegee pushing lime green ink through mesh onto white t-shirt, close-up of printing process, industrial workshop, documentary photography
```
Куда:
- uslugi-shelkografiya.html → hero
- uslugi-shelkografiya.html → галерея "процесс"

**G2. Результат шелкографии — белые футболки**
```
stack of white t-shirts with crisp single-color lime green screen print logo, showing sharp clean edges of print, product photography on white background
```
Куда:
- uslugi-shelkografiya.html → галерея "результат"
- uslugi-shelkografiya.html → галерея "корпоративный мерч"

---

### ГРУППА H: Тампопечать + УФ-печать (2 генерации → 4 места)

**H1. Тампопечать на сувенирах**
```
pad printing machine stamping small logo onto promotional pen, close-up of silicone pad transferring ink, other branded items nearby — lighters, keychains, workshop setting
```
Куда:
- uslugi-tampoprint.html → hero
- uslugi.html → карточка тампопечати (если есть)

**H2. УФ-печать на твёрдых поверхностях**
```
UV flatbed printer printing geometric logo directly onto dark wooden gift box, visible UV light curing ink, other items nearby — phone cases, badges, workshop setting
```
Куда:
- uslugi-uf-pechat.html → hero
- uslugi.html → карточка УФ-печати

---

### ГРУППА I: DTF галерея (1 генерация → 3 места)

**I1. Макро DTF-принта**
```
extreme macro close-up of DTF print on black cotton fabric, showing vivid color gradients and individual ink details, shallow depth of field, technical detail photography
```
Куда:
- uslugi-dtf.html → галерея "детали принта крупным планом"
- uslugi-dtf.html → галерея "корпоративный мерч с DTF"
- blog-vybor-pechati.html → иллюстрация DTF-процесса

---

### ГРУППА J: Сублимация галерея (2 генерации → 4 места)

**J1. Спортивная форма all-over print**
```
sports jersey with vibrant all-over sublimation geometric pattern, flat lay on white background, showing full coverage print from edge to edge, sportswear photography
```
Куда:
- uslugi-sublimaciya.html → галерея "all-over print"
- uslugi-sublimaciya.html → галерея "спортивная форма"

**J2. Флаг/баннер с сублимацией**
```
large fabric banner with full-color sublimation print showing geometric brand pattern, hanging flat against white wall, showing vivid colors and full coverage
```
Куда:
- uslugi-sublimaciya.html → галерея "флаги и баннеры"
- uslugi-sublimaciya.html → галерея "интерьерный текстиль"

---

### ГРУППА K: Маркетплейсы (1 генерация → 2 места)

**K1. Упакованные заказы с маркировкой**
```
neatly packaged products in transparent poly bags with barcode labels and branded stickers, stacked boxes ready for shipment, clean warehouse workspace, organized and professional
```
Куда:
- marketplejsy.html → hero
- index.html → карточка "Упакованные заказы с маркировкой"

---

### ГРУППА L: Каталог — оставшиеся продукты (5 генераций)

**L1. Кепка с вышивкой**
```
black baseball cap with small embroidered geometric bar logo on front panel, three-quarter view on white background, showing curved brim, product photography
```
→ catalog-aksessuary.html → "Кепки/бейсболки"
→ catalog-odezhda.html → "Куртки/ветровки" (переиспользуем нет, нужна отдельная)

**L2. Ветровка/куртка**
```
lightweight black windbreaker jacket with small printed white logo on chest, flat lay on white background, showing zipper and stand-up collar, product photography
```
→ catalog-odezhda.html → "Куртки/ветровки"

**L3. Плед с вышивкой**
```
soft fleece blanket in charcoal gray with embroidered white geometric logo in corner, partially folded on white background, cozy textile product shot
```
→ catalog-tekstil.html → "Пледы"

**L4. Ежедневник кожаный**
```
premium leather-look daily planner in dark brown with gold-foil stamped geometric logo, slightly open on white background, executive stationery product shot
```
→ catalog-kancelyariya.html → "Ежедневники"

**L5. USB-флешка**
```
metal USB flash drive with laser-engraved geometric logo, on white background, close-up showing metal texture and connector, tech accessory shot
```
→ catalog-elektronika.html → "USB-флешки"

---

### ГРУППА M: Блог (2 генерации → 6+ мест)

**M1. Сравнение DTF vs шелкография (split)**
```
split comparison image — left side: colorful DTF print close-up on fabric, right side: crisp single-color screen print, both on white t-shirts, side by side, technical comparison photography
```
→ blog.html → featured article
→ blog-sublimacija-vs-dtf.html → article hero
→ blog-vybor-pechati.html → article illustration

**M2. Корпоративный мерч коллекция**
```
corporate merchandise collection flat lay — branded hoodie, polo shirt, tote bag, notebook, mug, all with matching minimal geometric logo, overhead shot on white background, editorial photography
```
→ blog-korporativnyj-merch.html → article hero
→ blog.html → превью статьи о мерче
→ Переиспользуется как generic blog preview image

---

## ЧАСТЬ 3: Итоговая сводка

### Клиентские фото: 19 файлов → покрывают ~55 плейсхолдеров
### Генерации Higgsfield: 21 уникальный промпт → покрывают ~65 плейсхолдеров
### Непокрытые: ~10 мелких (доп. карточки каталогов) — закроются переиспользованием ближайших

| Группа | Генераций | Покрывает мест |
|--------|-----------|----------------|
| A. Аксессуары (шоппер) | 1 | 4 |
| B. Посуда | 2 | 5 |
| C. Канцелярия | 2 | 5 |
| D. Текстиль | 1 | 3 |
| E. Электроника | 2 | 5 |
| F. Welcome-kit (тёмный) | 1 | 3 |
| G. Шелкография | 2 | 4 |
| H. Тампопечать + УФ | 2 | 4 |
| I. DTF макро | 1 | 3 |
| J. Сублимация | 2 | 4 |
| K. Маркетплейсы | 1 | 2 |
| L. Каталог остатки | 5 | 5 |
| M. Блог | 2 | 6 |
| **ИТОГО** | **24** | **53** |

### Приоритет генерации
1. **F1** (welcome-kit) — используется на 3 ключевых страницах
2. **A1** (шоппер) — 4 места, каталог + корп
3. **B1** (кружка) — 3 места
4. **G1** (шелкография процесс) — hero услуги
5. **H1, H2** (тампо + УФ) — hero услуг без клиентских фото
6. **K1** (маркетплейсы) — отдельная аудитория
7. **E1** (повербанк) — каталог электроники
8. Остальные по мере необходимости
