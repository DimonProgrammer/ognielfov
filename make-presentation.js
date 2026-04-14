const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "ЛифтКонтроль";
pres.author = "ЛифтКонтроль";

// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  dark:    "1A1A2E",   // тёмный фон (титульник, заключение)
  orange:  "E85D26",   // основной акцент
  orange2: "FF7A42",   // вторичный акцент
  light:   "FFF8F5",   // светлый фон контентных слайдов
  white:   "FFFFFF",
  text:    "1D1D1F",
  muted:   "6E6E73",
  card:    "FFFFFF",
  cardbg:  "F7F0EC",
};

const makeShadow = () => ({
  type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10,
});

// ─── Helper: section header bar (orange left stripe) ─────────────────────────
function sectionHeader(slide, title) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.3, w: 0.05, h: 0.45,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  slide.addText(title, {
    x: 0.65, y: 0.28, w: 8.5, h: 0.5,
    fontSize: 22, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
  });
}

// ─── Helper: stat card ────────────────────────────────────────────────────────
function statCard(slide, x, y, w, h, value, unit, label, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
    shadow: makeShadow(),
  });
  // orange top accent line
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.04,
    fill: { color: color || C.orange }, line: { color: color || C.orange },
  });
  slide.addText(value, {
    x: x + 0.18, y: y + 0.2, w: w - 0.36, h: 0.65,
    fontSize: 40, bold: true, color: color || C.orange, fontFace: "Manrope",
    align: "center", margin: 0,
  });
  if (unit) {
    slide.addText(unit, {
      x: x + 0.18, y: y + 0.8, w: w - 0.36, h: 0.25,
      fontSize: 11, color: C.muted, fontFace: "Manrope", align: "center", margin: 0,
    });
  }
  slide.addText(label, {
    x: x + 0.1, y: y + h - 0.38, w: w - 0.2, h: 0.32,
    fontSize: 10, color: C.muted, fontFace: "Manrope", align: "center",
    wrap: true, margin: 0,
  });
}

// ─── Helper: feature card ─────────────────────────────────────────────────────
function featureCard(slide, x, y, w, h, icon, title, desc) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
    shadow: makeShadow(),
  });
  // icon circle
  slide.addShape(pres.shapes.OVAL, {
    x: x + 0.2, y: y + 0.18, w: 0.45, h: 0.45,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  slide.addText(icon, {
    x: x + 0.2, y: y + 0.18, w: 0.45, h: 0.45,
    fontSize: 16, color: C.white, align: "center", valign: "middle", margin: 0,
  });
  slide.addText(title, {
    x: x + 0.75, y: y + 0.18, w: w - 0.95, h: 0.32,
    fontSize: 12, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
  });
  slide.addText(desc, {
    x: x + 0.2, y: y + 0.7, w: w - 0.4, h: h - 0.85,
    fontSize: 10, color: C.muted, fontFace: "Manrope", wrap: true, margin: 0,
  });
}

// ─── SLIDE 1: Title ───────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // decorative orange block top-right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 0, w: 2.5, h: 5.625,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  // lighter inner block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.0, y: 0, w: 2.0, h: 5.625,
    fill: { color: C.orange2 }, line: { color: C.orange2 },
  });

  s.addText("ЛифтКонтроль", {
    x: 0.7, y: 1.5, w: 6.5, h: 1.0,
    fontSize: 54, bold: true, color: C.white, fontFace: "Manrope", charSpacing: 1.5, margin: 0,
  });
  s.addText("Цифровая платформа управления\nлифтовым хозяйством", {
    x: 0.7, y: 2.7, w: 6.5, h: 0.9,
    fontSize: 20, color: "FFB899", fontFace: "Manrope", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 3.85, w: 1.2, h: 0.04,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("Эффективное управление. Прозрачный контроль. Быстрая реакция.", {
    x: 0.7, y: 4.1, w: 6.5, h: 0.5,
    fontSize: 13, color: "AAAAAA", fontFace: "Manrope", italic: true, margin: 0,
  });
}

// ─── SLIDE 2: Проблема ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Проблема");

  s.addText("Бумажный учёт и ручная диспетчеризация — тупик для роста", {
    x: 0.5, y: 0.9, w: 9.0, h: 0.55,
    fontSize: 17, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
  });

  const problems = [
    ["📋", "Журналы заявок на бумаге", "Заявки теряются, дублируются, невозможно отследить статус в реальном времени"],
    ["📞", "Диспетчеризация по телефону", "Ручное назначение техников, нет контроля выполнения, постоянные ошибки"],
    ["📊", "Нет аналитики и отчётности", "Руководитель не видит картину целиком: ни KPI, ни SLA, ни рейтингов"],
    ["🔧", "ТО планируется «на глаз»", "Пропуски плановых обслуживаний, рост аварийных ситуаций, штрафы"],
    ["🏢", "Разрозненные системы", "Разные объекты ведутся в разных таблицах, нет единой базы лифтов"],
    ["👷", "Нет контроля техников", "Невозможно отследить, кто, когда и что сделал на объекте"],
  ];

  const cols = 3, rows = 2;
  const cw = 2.9, ch = 1.1, gx = 0.2, gy = 0.15;
  const startX = 0.45, startY = 1.65;

  problems.forEach(([icon, title, desc], i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cw + gx);
    const y = startY + row * (ch + gy);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: 0.04,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(icon + "  " + title, {
      x: x + 0.15, y: y + 0.1, w: cw - 0.3, h: 0.3,
      fontSize: 11, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
    });
    s.addText(desc, {
      x: x + 0.15, y: y + 0.42, w: cw - 0.3, h: 0.6,
      fontSize: 9.5, color: C.muted, fontFace: "Manrope", wrap: true, margin: 0,
    });
  });
}

// ─── SLIDE 3: Решение ─────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Решение");

  s.addText("ЛифтКонтроль — единая цифровая платформа для обслуживания лифтов", {
    x: 0.5, y: 0.9, w: 9.0, h: 0.55,
    fontSize: 16, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
  });

  // three pillars
  const pillars = [
    { title: "CRM\nДиспетчерская", desc: "Приём и распределение заявок, контроль исполнения, история обращений по каждому лифту" },
    { title: "Мобильное\nприложение", desc: "Техники получают задания на телефон, отмечают выполнение, фотографируют результат" },
    { title: "Аналитика\nи отчётность", desc: "Дашборд директора, KPI техников, рейтинги, SLA, автоматические отчёты" },
  ];

  pillars.forEach((p, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.65, w: 2.9, h: 2.9,
      fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.65, w: 2.9, h: 0.06,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 1.1, y: 1.85, w: 0.7, h: 0.7,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(["📋", "📱", "📊"][i], {
      x: x + 1.1, y: 1.85, w: 0.7, h: 0.7,
      fontSize: 20, align: "center", valign: "middle", margin: 0,
    });
    s.addText(p.title, {
      x: x + 0.15, y: 2.7, w: 2.6, h: 0.65,
      fontSize: 16, bold: true, color: C.text, fontFace: "Manrope",
      align: "center", margin: 0,
    });
    s.addText(p.desc, {
      x: x + 0.2, y: 3.42, w: 2.5, h: 1.0,
      fontSize: 10, color: C.muted, fontFace: "Manrope",
      align: "center", wrap: true, margin: 0,
    });
  });

  s.addText("Дополнительно: QR-коды для жителей · Интеграция с внешними системами · Электронный паспорт лифта · Планирование ТО", {
    x: 0.5, y: 4.85, w: 9.0, h: 0.4,
    fontSize: 10, color: C.muted, fontFace: "Manrope", align: "center",
    italic: true, margin: 0,
  });
}

// ─── SLIDE 4: Цифры ───────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addText("Система в цифрах", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.65,
    fontSize: 28, bold: true, color: C.white, fontFace: "Manrope",
    charSpacing: 1.5, align: "center", margin: 0,
  });

  // large stats
  const stats = [
    ["1 500+", "лифтов", "подключено к платформе"],
    ["12+", "компаний", "обслуживают объекты в системе"],
    ["7", "регионов", "охвачено в России"],
    ["90%", "заявок", "обрабатывается в срок"],
    ["30 сек", "среднее", "время реакции на заявку"],
    ["15", "заявок/ч", "обрабатывает один оператор"],
  ];

  stats.forEach(([val, unit, label], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 3.0;
    const y = 1.2 + row * 1.9;
    const w = 2.7, h = 1.6;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: "24243E" }, line: { color: C.orange, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.04,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(val, {
      x: x + 0.1, y: y + 0.15, w: w - 0.2, h: 0.75,
      fontSize: 36, bold: true, color: C.orange, fontFace: "Manrope",
      align: "center", margin: 0,
    });
    s.addText(unit, {
      x: x + 0.1, y: y + 0.88, w: w - 0.2, h: 0.28,
      fontSize: 11, bold: true, color: C.white, fontFace: "Manrope",
      align: "center", margin: 0,
    });
    s.addText(label, {
      x: x + 0.1, y: y + 1.18, w: w - 0.2, h: 0.32,
      fontSize: 9.5, color: "AAAAAA", fontFace: "Manrope",
      align: "center", margin: 0,
    });
  });
}

// ─── SLIDE 5: Ролевая модель ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Ролевая модель системы");

  s.addText("Каждый участник получает свой личный кабинет с нужным ему функционалом", {
    x: 0.5, y: 0.9, w: 9.0, h: 0.45,
    fontSize: 14, color: C.muted, fontFace: "Manrope", margin: 0,
  });

  const roles = [
    ["👔", "Директор", "Аналитика, KPI, рейтинги техников, сводные отчёты по всем объектам"],
    ["🎧", "Оператор", "Приём заявок, назначение техников, контроль статусов, журнал событий"],
    ["🔧", "Техник", "Мобильное приложение: задания, маршруты, фотоотчёт, подпись актов"],
    ["🚨", "Служба эвакуации", "Мгновенные уведомления об аварийных ситуациях, доступ к паспорту лифта"],
    ["🏢", "Диспетчер объекта", "Локальный контроль за конкретным жилым комплексом или зданием"],
    ["📋", "Администратор", "Управление справочниками, пользователями, настройка системы"],
  ];

  const cw = 2.9, ch = 1.3, gx = 0.2, gy = 0.2;
  const startX = 0.45, startY = 1.55;

  roles.forEach(([icon, name, desc], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cw + gx);
    const y = startY + row * (ch + gy);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
      shadow: makeShadow(),
    });
    // left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.2, w: 0.04, h: ch - 0.4,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(icon + " " + name, {
      x: x + 0.18, y: y + 0.15, w: cw - 0.3, h: 0.35,
      fontSize: 13, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
    });
    s.addText(desc, {
      x: x + 0.18, y: y + 0.52, w: cw - 0.3, h: 0.7,
      fontSize: 10, color: C.muted, fontFace: "Manrope", wrap: true, margin: 0,
    });
  });
}

// ─── SLIDE 6: Дашборд (placeholder) ──────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Интерфейс системы — главный экран");

  // outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.9, w: 9.0, h: 4.5,
    fill: { color: "F0E8E3" }, line: { color: C.orange, width: 2 },
    shadow: makeShadow(),
  });

  // placeholder text
  s.addText("📸 Вставьте скриншот\nдашборда системы", {
    x: 0.5, y: 0.9, w: 9.0, h: 4.5,
    fontSize: 22, color: C.orange, fontFace: "Manrope",
    align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // hint text below
  s.addText("Рекомендуемый размер: 1920×1080 или 1280×720 · Формат: PNG или JPG", {
    x: 0.5, y: 5.2, w: 9.0, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Manrope", align: "center", margin: 0,
    italic: true,
  });
}

// ─── SLIDE 7: Управление заявками ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Управление заявками");

  s.addText("Полный жизненный цикл заявки от регистрации до закрытия", {
    x: 0.5, y: 0.9, w: 9.0, h: 0.45,
    fontSize: 14, color: C.muted, fontFace: "Manrope", margin: 0,
  });

  // status flow diagram
  const statuses = [
    { label: "Новая", color: "6E6E73", desc: "Зарегистрирована\nв системе" },
    { label: "В обработке", color: C.orange, desc: "Назначен\nответственный" },
    { label: "В работе", color: "0082C8", desc: "Техник выехал\nна объект" },
    { label: "Проверка", color: "8B5CF6", desc: "Ожидает\nподтверждения" },
    { label: "Завершена", color: "16A34A", desc: "Акт подписан,\nзакрыта" },
  ];

  const bw = 1.55, bh = 1.2;
  statuses.forEach((st, i) => {
    const x = 0.5 + i * 1.8;
    const y = 1.55;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: bw, h: bh,
      fill: { color: C.white }, line: { color: st.color, width: 2 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: bw, h: 0.32,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText(st.label, {
      x, y, w: bw, h: 0.32,
      fontSize: 11, bold: true, color: C.white, fontFace: "Manrope",
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.desc, {
      x: x + 0.1, y: y + 0.38, w: bw - 0.2, h: 0.75,
      fontSize: 10, color: C.muted, fontFace: "Manrope",
      align: "center", wrap: true, margin: 0,
    });

    // arrow
    if (i < statuses.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: x + bw + 0.02, y: y + bh / 2, w: 0.22, h: 0,
        line: { color: C.orange, width: 2 },
      });
    }
  });

  // features below
  const features = [
    ["🔔", "Уведомления", "SMS/push при смене статуса заявки — жителям и технику"],
    ["📷", "Фотоотчёт", "Техник прикрепляет фото до и после выполнения работ"],
    ["⏱", "SLA-контроль", "Система предупреждает о заявках с риском нарушения срока"],
    ["🎯", "Приоритеты", "Аварийные, плановые и срочные заявки по отдельным очередям"],
  ];

  features.forEach(([icon, title, desc], i) => {
    const x = 0.5 + i * 2.3;
    const y = 3.1;
    featureCard(s, x, y, 2.1, 1.95, icon, title, desc);
  });
}

// ─── SLIDE 8: Рейтинговая система ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Рейтинговая система");

  s.addText("Объективная оценка каждого участника процесса", {
    x: 0.5, y: 0.9, w: 9.0, h: 0.45,
    fontSize: 14, color: C.muted, fontFace: "Manrope", margin: 0,
  });

  // left panel — metrics list
  const metrics = [
    "✅  Процент заявок, выполненных в срок",
    "⚡  Среднее время реакции на заявку",
    "🔄  Количество повторных обращений",
    "📸  Полнота фотоотчётов",
    "⭐  Оценки жителей и управляющих компаний",
    "📋  Соблюдение регламентов и стандартов",
  ];

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.52, w: 4.2, h: 3.9,
    fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
    shadow: makeShadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.52, w: 4.2, h: 0.04,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("Параметры оценки", {
    x: 0.65, y: 1.6, w: 3.9, h: 0.35,
    fontSize: 13, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
  });
  metrics.forEach((m, i) => {
    s.addText(m, {
      x: 0.7, y: 2.08 + i * 0.52, w: 3.8, h: 0.42,
      fontSize: 11, color: C.text, fontFace: "Manrope", margin: 0,
    });
  });

  // right panel — benefits
  const benefits = [
    ["🏆", "Мотивация", "Лучшие техники видят свой рейтинг и стремятся к росту"],
    ["📊", "Прозрачность", "Руководитель видит реальную картину без субъективности"],
    ["📈", "Рост KPI", "Геймификация повышает скорость и качество работ"],
    ["🎯", "Управление", "Данные рейтинга влияют на назначение приоритетных заявок"],
  ];

  benefits.forEach((b, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 5.0 + col * 2.3;
    const y = 1.52 + row * 2.05;
    featureCard(s, x, y, 2.1, 1.85, b[0], b[1], b[2]);
  });
}

// ─── SLIDE 9: Планирование ТО ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Техническое обслуживание");

  s.addText("Автоматическое планирование и контроль графиков ТО", {
    x: 0.5, y: 0.9, w: 9.0, h: 0.45,
    fontSize: 14, color: C.muted, fontFace: "Manrope", margin: 0,
  });

  const items = [
    ["📅", "Автоматическое расписание", "Система сама формирует график ТО на основе нормативов и истории обслуживания каждого лифта", 0.5, 1.55],
    ["🔔", "Напоминания и уведомления", "За 3 дня до плановой даты техник и диспетчер получают уведомление", 5.0, 1.55],
    ["📋", "Электронный паспорт лифта", "Полная история: монтаж, ТО, ремонты, замены деталей, акты сдачи-приёмки", 0.5, 3.15],
    ["📊", "Контроль выполнения", "Директор в реальном времени видит, какие ТО проведены, какие просрочены", 5.0, 3.15],
  ];

  items.forEach(([icon, title, desc, x, y]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.2, h: 1.35,
      fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.2, h: 0.04,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(icon + "  " + title, {
      x: x + 0.15, y: y + 0.1, w: 3.9, h: 0.35,
      fontSize: 12, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
    });
    s.addText(desc, {
      x: x + 0.15, y: y + 0.48, w: 3.9, h: 0.78,
      fontSize: 10.5, color: C.muted, fontFace: "Manrope", wrap: true, margin: 0,
    });
  });
}

// ─── SLIDE 10: Мобильное приложение ───────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Мобильное приложение для техников");

  s.addText("Техник работает с телефона — без бумаг и звонков диспетчеру", {
    x: 0.5, y: 0.9, w: 9.0, h: 0.45,
    fontSize: 14, color: C.muted, fontFace: "Manrope", margin: 0,
  });

  // phone mockup (simple shape)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.4, w: 2.4, h: 3.9,
    fill: { color: "1A1A2E" }, line: { color: C.orange, width: 2 },
    rectRadius: 0.2,
  });
  // screen inside
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.7, w: 2.0, h: 3.1,
    fill: { color: "24243E" }, line: { color: "333360" },
  });
  s.addText("📱\nМобильный\nкабинет\nтехника", {
    x: 0.8, y: 1.9, w: 2.0, h: 2.7,
    fontSize: 12, color: C.orange, fontFace: "Manrope",
    align: "center", valign: "middle", margin: 0, bold: true,
  });

  const appFeatures = [
    ["📬", "Список заявок", "Текущие задания с адресом, типом работ и приоритетом"],
    ["🗺️", "Маршрут на карте", "Навигация прямо из приложения до объекта"],
    ["📷", "Фотоотчёт", "Фото до и после, прямо из камеры телефона"],
    ["✍️", "Электронная подпись", "Акт выполненных работ подписывается на месте"],
    ["📟", "QR-сканер", "Сканирование кода лифта для быстрого открытия паспорта"],
    ["📴", "Офлайн-режим", "Работает без интернета — синхронизация при подключении"],
  ];

  appFeatures.forEach(([icon, title, desc], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 3.4 + col * 3.1;
    const y = 1.42 + row * 1.35;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.9, h: 1.2,
      fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.9, h: 0.04,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(icon + "  " + title, {
      x: x + 0.12, y: y + 0.1, w: 2.66, h: 0.3,
      fontSize: 11, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
    });
    s.addText(desc, {
      x: x + 0.12, y: y + 0.43, w: 2.66, h: 0.68,
      fontSize: 10, color: C.muted, fontFace: "Manrope", wrap: true, margin: 0,
    });
  });
}

// ─── SLIDE 11: Интеграции ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  sectionHeader(s, "Интеграции и модули");

  const modules = [
    ["🔌", "Внешние диспетчерские", "Подключение к ЛКДС ОБЫ, ЕССАН и другим действующим системам"],
    ["🏘️", "УК и ТСЖ", "Интеграция с системами управляющих компаний и ТСЖ"],
    ["📲", "QR-коды для жителей", "Жители сканируют код в кабине и подают заявку напрямую"],
    ["📧", "Email и SMS", "Автоматические уведомления при изменении статуса заявки"],
    ["🔑", "Единый вход (SSO)", "Авторизация через корпоративный портал или ЕСИА"],
    ["🛠️", "API для разработчиков", "REST API для подключения любых внешних сервисов"],
  ];

  const cw = 2.9, ch = 1.3, gx = 0.2, gy = 0.2;
  const startX = 0.45, startY = 1.52;

  modules.forEach(([icon, title, desc], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cw + gx);
    const y = startY + row * (ch + gy);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: C.white }, line: { color: "F0E8E3", width: 1 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.18, y: y + 0.15, w: 0.5, h: 0.5,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(icon, {
      x: x + 0.18, y: y + 0.15, w: 0.5, h: 0.5,
      fontSize: 16, align: "center", valign: "middle", margin: 0,
    });
    s.addText(title, {
      x: x + 0.8, y: y + 0.18, w: cw - 1.0, h: 0.32,
      fontSize: 11, bold: true, color: C.text, fontFace: "Manrope", margin: 0,
    });
    s.addText(desc, {
      x: x + 0.18, y: y + 0.72, w: cw - 0.36, h: 0.52,
      fontSize: 9.5, color: C.muted, fontFace: "Manrope", wrap: true, margin: 0,
    });
  });
}

// ─── SLIDE 12: Следующий шаг ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // decorative left block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: C.orange }, line: { color: C.orange },
  });

  s.addText("Готовы к демонстрации", {
    x: 0.65, y: 0.8, w: 8.8, h: 0.8,
    fontSize: 38, bold: true, color: C.white, fontFace: "Manrope", margin: 0,
  });
  s.addText("Подключим вашу компанию к системе\nи проведём обучение персонала", {
    x: 0.65, y: 1.75, w: 8.0, h: 0.9,
    fontSize: 18, color: "FFB899", fontFace: "Manrope", margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.65, y: 2.85, w: 0.9, h: 0.04,
    fill: { color: C.orange }, line: { color: C.orange },
  });

  const steps = [
    ["01", "Запрос демо", "Свяжитесь с нами — покажем систему в действии за 30 минут"],
    ["02", "Пилотный запуск", "Бесплатное подключение 50 лифтов на 14 дней"],
    ["03", "Полное внедрение", "Подписание договора, обучение, интеграция со смежными системами"],
  ];

  steps.forEach(([num, title, desc], i) => {
    const x = 0.65 + i * 3.1;
    const y = 3.1;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.9, h: 1.9,
      fill: { color: "24243E" }, line: { color: C.orange, width: 1 },
    });
    s.addText(num, {
      x: x + 0.15, y: y + 0.1, w: 0.55, h: 0.55,
      fontSize: 22, bold: true, color: C.orange, fontFace: "Manrope", margin: 0,
    });
    s.addText(title, {
      x: x + 0.15, y: y + 0.68, w: 2.6, h: 0.35,
      fontSize: 13, bold: true, color: C.white, fontFace: "Manrope", margin: 0,
    });
    s.addText(desc, {
      x: x + 0.15, y: y + 1.06, w: 2.6, h: 0.75,
      fontSize: 10, color: "AAAAAA", fontFace: "Manrope", wrap: true, margin: 0,
    });
  });
}

// ─── Write file ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/admin/Projects/Филипп/presentation-lifts.pptx" })
  .then(() => console.log("✅ Done: presentation-lifts.pptx"))
  .catch(err => { console.error("❌", err); process.exit(1); });
