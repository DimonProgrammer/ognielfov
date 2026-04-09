<?php
/**
 * Огни Эльфов — Blog CMS
 * Один файл: логин, редактор (Quill.js), сохранение статей прямо на сервер.
 * Пароль по умолчанию: elfprint2026 — смените в константе CMS_PASSWORD.
 */

// ─── КОНФИГУРАЦИЯ ────────────────────────────────────────────────────────────
define('CMS_PASSWORD', 'elfprint2026');   // Ваш пароль
define('BLOG_DIR',  dirname(__DIR__));    // /www/elfprint.ru
define('TEMPLATE',  BLOG_DIR . '/blog-korporativnyj-merch.html');
define('BLOG_FILE', BLOG_DIR . '/blog.html');
define('BLOG_IDX',  BLOG_DIR . '/blog/index.html');

$CATEGORIES = ['Гайды','Технологии','Корпоративный мерч','Идеи','Кейсы','Маркетплейсы'];

// ─── БЕЗОПАСНОСТЬ / AUTH ─────────────────────────────────────────────────────
session_start();

$passFile = __DIR__ . '/.pass';
if (!file_exists($passFile)) {
    file_put_contents($passFile, password_hash(CMS_PASSWORD, PASSWORD_DEFAULT));
}

$action = $_GET['action'] ?? 'list';
$msg    = '';

// Выход
if ($action === 'logout') {
    session_destroy();
    header('Location: ?');
    exit;
}

// Логин
if (!isset($_SESSION['cms_auth'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
        $hash = trim(file_get_contents($passFile));
        if (password_verify($_POST['password'], $hash)) {
            $_SESSION['cms_auth'] = true;
            $_SESSION['csrf'] = bin2hex(random_bytes(16));
            header('Location: ?');
            exit;
        }
        $msg = 'Неверный пароль';
    }
    renderLogin($msg);
    exit;
}

if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(16));
}

// ─── РОУТИНГ ─────────────────────────────────────────────────────────────────
switch ($action) {
    case 'new':    renderEditor([]); break;
    case 'edit':   handleEdit();     break;
    case 'save':   handleSave();     break;
    case 'delete': handleDelete();   break;
    default:       renderList();     break;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function slug(string $title): string {
    $map = ['а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'yo',
            'ж'=>'zh','з'=>'z','и'=>'i','й'=>'j','к'=>'k','л'=>'l','м'=>'m',
            'н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u',
            'ф'=>'f','х'=>'kh','ц'=>'ts','ч'=>'ch','ш'=>'sh','щ'=>'shch',
            'ъ'=>'','ы'=>'y','ь'=>'','э'=>'e','ю'=>'yu','я'=>'ya'];
    $s = mb_strtolower($title, 'UTF-8');
    $s = strtr($s, $map);
    $s = preg_replace('/[^a-z0-9]+/', '-', $s);
    return trim($s, '-');
}

function readingTime(string $html): int {
    $text  = strip_tags($html);
    $words = preg_match_all('/\S+/', $text, $m);
    return max(1, (int)ceil($words / 200));
}

function dateRu(string $iso): string {
    $months = ['января','февраля','марта','апреля','мая','июня',
               'июля','августа','сентября','октября','ноября','декабря'];
    $ts = strtotime($iso);
    return date('j', $ts) . ' ' . $months[date('n', $ts) - 1] . ' ' . date('Y', $ts);
}

function listPosts(): array {
    $posts = [];
    foreach (glob(BLOG_DIR . '/blog-*.html') as $f) {
        $base = basename($f, '.html');
        if ($base === 'blog') continue;
        $html  = file_get_contents($f);
        $title = '';
        $cat   = '';
        $date  = '';
        $draft = str_contains($html, '<!--DRAFT-->');

        if (preg_match('/<title>([^|<]+)/u', $html, $m)) {
            $title = trim(explode('|', $m[1])[0]);
        }
        if (preg_match('/<time datetime="([^"]+)"/', $html, $m)) {
            $date = $m[1];
        }
        if (preg_match('/<span[^>]*btn-pill bg-\[#C6F24E\][^>]*>([^<]+)<\/span>/', $html, $m)) {
            $cat = trim($m[1]);
        }
        $posts[] = compact('base', 'title', 'cat', 'date', 'draft');
    }
    usort($posts, fn($a,$b) => strcmp($b['date'], $a['date']));
    return $posts;
}

function parsePost(string $slug): array {
    $file = BLOG_DIR . "/blog-{$slug}.html";
    if (!file_exists($file)) return [];
    $html  = file_get_contents($file);
    $data  = ['slug' => $slug];
    $draft = str_contains($html, '<!--DRAFT-->');
    $data['draft'] = $draft;

    if (preg_match('/<meta name="description" content="([^"]+)"/', $html, $m)) $data['description'] = $m[1];
    if (preg_match('/<title>([^|<]+)/u', $html, $m)) $data['title'] = trim(explode('|', $m[1])[0]);
    if (preg_match('/<time datetime="([^"]+)"/', $html, $m)) $data['date'] = $m[1];
    if (preg_match('/<span[^>]*btn-pill bg-\[#C6F24E\][^>]*>([^<]+)<\/span>/u', $html, $m)) $data['category'] = trim($m[1]);
    if (preg_match('/<div class="mt-8 bg-\[#E8E8ED\][^>]*>.*?<img src="([^"]+)"/s', $html, $m)) $data['image'] = $m[1];

    // Извлечение контента — поддержка обоих форматов (CMS и ручной)
    $content = '';

    // 1. CMS-формат: ищем article-body, заканчиваем на <style> после него
    $bodyTag = '<div class="article-body">';
    $bodyPos = strpos($html, $bodyTag);
    if ($bodyPos !== false) {
        $innerStart = $bodyPos + strlen($bodyTag);
        // Конец — тег <style> (идёт сразу после закрывающих divs в шаблоне CMS)
        $stylePos = strpos($html, '<style>', $innerStart);
        if ($stylePos !== false) {
            $chunk   = substr($html, $innerStart, $stylePos - $innerStart);
            $content = trim(preg_replace('/\s*<\/div>\s*<\/div>\s*<\/article>\s*$/s', '', $chunk));
        } else {
            // Fallback: до </article>
            $artEnd  = strpos($html, '</article>', $innerStart);
            $chunk   = $artEnd ? substr($html, $innerStart, $artEnd - $innerStart) : '';
            $content = trim(preg_replace('/\s*<\/div>\s*<\/div>\s*$/s', '', $chunk));
        }
    }

    // 2. Старый формат: space-y-8 div внутри <article>
    if (!$content) {
        if (preg_match('/<div class="space-y-8[^"]*">([\s\S]+?)<\/div>\s*<\/div>\s*<\/article>/i', $html, $m)) {
            $content = trim($m[1]);
        }
    }

    // 3. Любой контент между <article> и CTA-секцией
    if (!$content) {
        $artOpen = strpos($html, '<article');
        $ctaPos  = strpos($html, '<!-- ==================== CTA');
        if ($artOpen !== false && $ctaPos !== false) {
            $artClose = strpos($html, '</article>', $artOpen);
            if ($artClose !== false && $artClose < $ctaPos) {
                $artFull = substr($html, $artOpen, $artClose - $artOpen + strlen('</article>'));
                // Вырезаем header и breadcrumbs, берём только body
                $divPos = strpos($artFull, '<div class="space-y-');
                if (!$divPos) $divPos = strpos($artFull, '</header>');
                if ($divPos) $content = trim(substr($artFull, $divPos));
            }
        }
    }

    $data['content'] = $content;
    return $data;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SAVE / GENERATE
// ═══════════════════════════════════════════════════════════════════════════════

function handleSave(): void {
    global $CATEGORIES;

    if (($_POST['csrf'] ?? '') !== $_SESSION['csrf']) {
        die('CSRF error');
    }

    $title    = trim(strip_tags($_POST['title'] ?? ''));
    $rawSlug  = preg_replace('/[^a-z0-9-]/', '', $_POST['slug'] ?? slug($title));
    $slug     = trim($rawSlug, '-') ?: slug($title);
    $category = in_array($_POST['category'] ?? '', $CATEGORIES) ? $_POST['category'] : $CATEGORIES[0];
    $date     = $_POST['date'] ?: date('Y-m-d');
    $desc     = mb_substr(trim(strip_tags($_POST['description'] ?? '')), 0, 200, 'UTF-8');
    // Загрузка файла обложки (приоритет над URL)
    $image = trim($_POST['image'] ?? '');
    if (!empty($_FILES['image_file']['tmp_name']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
        $file    = $_FILES['image_file'];
        $ext     = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg','jpeg','png','webp'];
        if (in_array($ext, $allowed) && $file['size'] <= 8 * 1024 * 1024) {
            $imgDir = BLOG_DIR . '/img/blog';
            if (!is_dir($imgDir)) mkdir($imgDir, 0755, true);
            $fname  = preg_replace('/[^a-z0-9-]/', '', $slug) . '-cover.' . ($ext === 'jpeg' ? 'jpg' : $ext);
            $target = $imgDir . '/' . $fname;
            if (move_uploaded_file($file['tmp_name'], $target)) {
                $image = '/img/blog/' . $fname;
            }
        }
    }
    $content  = $_POST['content'] ?? '';   // HTML from Quill — already sanitized client-side
    $draft    = ($_POST['draft'] ?? '') === '1';
    $editing  = !empty($_POST['editing']);

    if (!$title || !$slug || !$content) {
        $_SESSION['err'] = $content ? 'Заполните заголовок' : 'Добавьте содержание статьи';
        header('Location: ' . ($_POST['editing'] ? "?action=edit&slug={$slug}" : '?action=new'));
        exit;
    }

    $outFile    = BLOG_DIR . "/blog-{$slug}.html";
    $outFileIdx = BLOG_DIR . "/blog-{$slug}/index.html";

    // ── Защита от перезаписи: новая статья не должна затирать существующую ──
    if (!$editing && file_exists($outFile)) {
        $_SESSION['err'] = "Статья с URL /blog-{$slug} уже существует. Измените slug.";
        header('Location: ?action=new');
        exit;
    }

    // При редактировании сохраняем оригинальную дату публикации
    $pubDate = $date;
    if ($editing && file_exists($outFile)) {
        $oldHtml = file_get_contents($outFile);
        if (preg_match('/article:published_time" content="([^"T]+)/', $oldHtml, $pm)) {
            $pubDate = $pm[1]; // Сохраняем дату первой публикации
        }
    }
    $modDate = date('Y-m-d'); // Дата редактирования — всегда сегодня

    $articleHtml = generateArticleHtml($title, $slug, $category, $pubDate, $desc, $image, $content, $draft, $modDate);

    file_put_contents($outFile, $articleHtml);

    // Создаём /blog-{slug}/index.html
    if (!is_dir(BLOG_DIR . "/blog-{$slug}")) {
        mkdir(BLOG_DIR . "/blog-{$slug}", 0755, true);
    }
    file_put_contents($outFileIdx, $articleHtml);

    // Обновляем blog.html и blog/index.html (только если публикуем)
    $cardInserted = true;
    if (!$draft) {
        $card = generateCard($title, $slug, $category, $pubDate, $desc, $image);
        if ($editing) {
            // updateCard: удаляем старую карточку CMS-маркером ИЛИ по href
            updateCard($card, $slug, BLOG_FILE);
            updateCard($card, $slug, BLOG_IDX);
        } else {
            $ok1 = prependCard($card, BLOG_FILE);
            $ok2 = prependCard($card, BLOG_IDX);
            $cardInserted = $ok1 && $ok2;
        }
    }

    if (!$draft && !$cardInserted) {
        // Grid needle не найден — статья сохранена, но в листинг не попала
        $_SESSION['warn'] = "Статья сохранена, но не добавлена в /blog/ — добавьте карточку вручную или обратитесь к разработчику.";
    }

    $link = "/blog-{$slug}/";
    renderSuccess($title, $link, $draft);
}

function generateArticleHtml(string $title, string $slug, string $cat, string $date,
                              string $desc, string $image, string $content, bool $draft,
                              string $modDate = ''): string
{
    if (!file_exists(TEMPLATE)) {
        die('Шаблон не найден: ' . TEMPLATE);
    }
    $tpl   = file_get_contents(TEMPLATE);
    $split = '<!-- ==================== BREADCRUMBS';
    $pos   = strpos($tpl, $split);
    $part1 = $pos !== false ? substr($tpl, 0, $pos) : $tpl;

    $split2 = '<!-- ==================== CTA';
    $pos2   = strpos($tpl, $split2);
    $part2  = $pos2 !== false ? substr($tpl, $pos2) : '';

    $draftComment = $draft ? '<!--DRAFT-->' . "\n" : '';
    $titleShort   = mb_substr($title, 0, 50, 'UTF-8') . (mb_strlen($title, 'UTF-8') > 50 ? '…' : '');
    $dateRu       = dateRu($date);
    $readTime     = readingTime($content);
    $canonical    = "https://elfprint.ru/blog-{$slug}";
    $imgSrc       = $image ?: '/img/merch-flatlay.jpg';

    // ── Заменяем head-мета ────────────────────────────────────────────────────
    $part1 = preg_replace('/<title>[^<]*<\/title>/',
        "<title>" . h("{$title} | Огни Эльфов") . "</title>", $part1, 1);
    $part1 = preg_replace('/<meta name="description" content="[^"]*"/',
        '<meta name="description" content="' . h($desc) . '"', $part1, 1);
    $part1 = preg_replace('/<meta property="og:title" content="[^"]*"/',
        '<meta property="og:title" content="' . h($title) . '"', $part1, 1);
    $part1 = preg_replace('/<meta property="og:description" content="[^"]*"/',
        '<meta property="og:description" content="' . h($desc) . '"', $part1, 1);
    $part1 = preg_replace('/<meta property="og:url" content="[^"]*"/',
        '<meta property="og:url" content="' . h($canonical) . '"', $part1, 1);
    $part1 = preg_replace('/<meta property="og:image" content="[^"]*"/',
        '<meta property="og:image" content="' . h("https://elfprint.ru{$imgSrc}") . '"', $part1, 1);
    $part1 = preg_replace('/<link rel="canonical" href="[^"]*"/',
        '<link rel="canonical" href="' . h($canonical) . '"', $part1, 1);
    $modDateActual = $modDate ?: $date;
    $part1 = preg_replace('/<meta property="article:published_time" content="[^"]*"/',
        '<meta property="article:published_time" content="' . h($date . 'T12:00:00+03:00') . '"', $part1, 1);
    $part1 = preg_replace('/<meta property="article:modified_time" content="[^"]*"/',
        '<meta property="article:modified_time" content="' . h($modDateActual . 'T12:00:00+03:00') . '"', $part1, 1);
    // JSON-LD
    $part1 = preg_replace_callback('/<script type="application\/ld\+json">(.*?)<\/script>/s', function($m) use ($title, $desc, $date, $canonical) {
        $json = json_decode($m[1], true) ?? [];
        if (isset($json['@type']) && $json['@type'] === 'Article') {
            $json['headline']      = $title;
            $json['description']   = $desc;
            $json['datePublished'] = $date;
            $json['dateModified']  = $date;
            $json['url']           = $canonical;
        }
        return '<script type="application/ld+json">' . json_encode($json, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . '</script>';
    }, $part1);

    // ── Контент статьи ────────────────────────────────────────────────────────
    $articleContent = <<<HTML

{$draftComment}
  <!-- ==================== BREADCRUMBS ==================== -->
  <section class="pt-24 pb-4">
    <div class="max-w-[1280px] mx-auto px-6">
      <nav class="flex items-center gap-2 text-sm text-[#86868B]">
        <a href="/" class="hover:text-[#1D1D1F] transition-colors">Главная</a>
        <span>&rarr;</span>
        <a href="/blog" class="hover:text-[#1D1D1F] transition-colors">Блог</a>
        <span>&rarr;</span>
        <span class="text-[#1D1D1F]">{$titleShort}</span>
      </nav>
    </div>
  </section>

  <!-- ==================== ARTICLE ==================== -->
  <article class="pb-16">
    <div class="max-w-3xl mx-auto px-6">
      <header class="pt-8 pb-10">
        <span class="inline-block btn-pill bg-[#C6F24E] text-[#1D1D1F] px-4 py-1 text-xs font-semibold">{$cat}</span>
        <div class="flex items-center gap-4 mt-4 text-sm text-[#86868B]">
          <time datetime="{$date}">{$dateRu}</time>
          <span>|</span>
          <span>{$readTime} мин чтения</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-heading mt-4 leading-tight">{$title}</h1>
        <p class="text-[#6E6E73] mt-4 text-lg leading-relaxed">{$desc}</p>
        <div class="mt-8 bg-[#E8E8ED] h-80 w-full rounded-2xl overflow-hidden">
          <img src="{$imgSrc}" alt="{$title}" class="w-full h-full object-cover" width="1200" height="800" loading="eager">
        </div>
      </header>
      <div class="article-body">
{$content}
      </div>
    </div>
  </article>
  <style>
    .article-body h2{font-size:1.625rem;font-weight:800;letter-spacing:-0.02em;margin-top:2.75rem;margin-bottom:1rem;color:#1D1D1F}
    .article-body h3{font-size:1.2rem;font-weight:700;margin-top:2rem;margin-bottom:.75rem;color:#1D1D1F}
    .article-body p{font-size:1.0625rem;line-height:1.75;color:#1D1D1F;margin-top:1rem}
    .article-body ul{list-style:disc;padding-left:1.5rem;margin-top:1rem}
    .article-body ol{list-style:decimal;padding-left:1.5rem;margin-top:1rem}
    .article-body li{font-size:1.0625rem;line-height:1.7;margin-bottom:.4rem;color:#1D1D1F}
    .article-body blockquote{border-left:4px solid #C6F24E;padding-left:1rem;color:#6E6E73;font-style:italic;margin:1.5rem 0}
    .article-body img{border-radius:1rem;width:100%;margin:2rem 0;display:block}
    .article-body a{color:#1D1D1F;text-decoration:underline;text-underline-offset:3px}
    .article-body strong{font-weight:700}
    .article-body pre{background:#F5F5F7;border-radius:.75rem;padding:1.25rem;overflow-x:auto;font-size:.875rem;margin:1.5rem 0;font-family:monospace}
    .article-body table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.9375rem}
    .article-body th{background:#1D1D1F;color:#fff;padding:.75rem 1rem;text-align:left;font-weight:600}
    .article-body td{padding:.75rem 1rem;border-bottom:1px solid #E8E8ED}
    .article-body tr:nth-child(even) td{background:#F5F5F7}
  </style>

HTML;

    return $part1 . $articleContent . $part2;
}

function generateCard(string $title, string $slug, string $cat, string $date,
                      string $desc, string $image): string
{
    $imgSrc  = $image ?: '/img/merch-flatlay.jpg';
    $dateRu  = dateRu($date);
    $descH   = h(mb_substr($desc, 0, 160, 'UTF-8'));
    $titleH  = h($title);
    $catH    = h($cat);

    return <<<HTML

        <!-- CMS:{$slug} -->
        <a href="/blog-{$slug}" class="bg-white rounded-2xl overflow-hidden card-hover block reveal relative">
          <div class="h-48 bg-[#E8E8ED] relative overflow-hidden">
            <img src="{$imgSrc}" alt="{$titleH}" class="w-full h-full object-cover" width="1200" height="800" loading="lazy">
            <span class="absolute top-4 left-4 btn-pill bg-[#C6F24E] text-[#1D1D1F] px-3 py-1 text-xs font-semibold">{$catH}</span>
          </div>
          <div class="p-6">
            <p class="text-[#86868B] text-xs">{$dateRu}</p>
            <h3 class="font-bold text-lg mt-2 text-[#1D1D1F]">{$titleH}</h3>
            <p class="text-sm text-[#6E6E73] mt-2 line-clamp-2">{$descH}</p>
            <span class="text-[#1D1D1F] font-semibold text-sm mt-4 inline-block">Читать &rarr;</span>
          </div>
        </a>
HTML;
}

function prependCard(string $card, string $file): bool {
    if (!file_exists($file)) return false;
    $html   = file_get_contents($file);
    // Пробуем несколько вариантов grid-контейнера
    $needles = [
        'class="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">',
        'class="grid grid-cols-1 md:grid-cols-3 gap-8">',
    ];
    foreach ($needles as $needle) {
        $pos = strpos($html, $needle);
        if ($pos !== false) {
            $insert = $pos + strlen($needle);
            $html   = substr($html, 0, $insert) . $card . substr($html, $insert);
            file_put_contents($file, $html);
            return true;
        }
    }
    return false; // Grid не найден
}

function updateCard(string $card, string $slug, string $file): void {
    if (!file_exists($file)) return;
    $html = file_get_contents($file);
    // 1. Удаляем старую карточку по CMS-маркеру (новые статьи)
    $html = preg_replace('/\s*<!-- CMS:' . preg_quote($slug, '/') . ' -->.*?<\/a>/s', '', $html);
    // 2. Удаляем карточку по href (статьи без маркера — ручные или старые)
    $html = preg_replace(
        '/\s*<a\s+href="\/blog-' . preg_quote($slug, '/') . '"[^>]*class="bg-white rounded-2xl overflow-hidden[^"]*"[^>]*>.*?<\/a>/s',
        '', $html
    );
    file_put_contents($file, $html);
    prependCard($card, $file);
}

function handleEdit(): void {
    $slug = preg_replace('/[^a-z0-9-]/', '', $_GET['slug'] ?? '');
    $data = parsePost($slug);
    if (!$data) { header('Location: ?'); exit; }
    renderEditor($data);
}

function handleDelete(): void {
    if (($_POST['csrf'] ?? '') !== $_SESSION['csrf']) die('CSRF');
    $slug = preg_replace('/[^a-z0-9-]/', '', $_POST['slug'] ?? '');
    if (!$slug) { header('Location: ?'); exit; }

    @unlink(BLOG_DIR . "/blog-{$slug}.html");
    $idxFile = BLOG_DIR . "/blog-{$slug}/index.html";
    if (file_exists($idxFile)) {
        @unlink($idxFile);
        @rmdir(BLOG_DIR . "/blog-{$slug}");
    }
    // Remove card from listings
    foreach ([BLOG_FILE, BLOG_IDX] as $f) {
        if (!file_exists($f)) continue;
        $html = file_get_contents($f);
        $html = preg_replace('/\s*<!-- CMS:' . preg_quote($slug, '/') . ' -->.*?<\/a>/s', '', $html);
        file_put_contents($f, $html);
    }
    header('Location: ?deleted=1');
    exit;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HTML OUTPUT
// ═══════════════════════════════════════════════════════════════════════════════

function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

function pageHead(string $title = 'Блог CMS — Огни Эльфов'): void { ?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title><?= h($title) ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: { extend: {
        fontFamily: { sans: ['Onest','system-ui','sans-serif'] },
        colors: { accent: '#C6F24E', dark: '#1D1D1F', muted: '#6E6E73', surface: '#F5F5F7' }
      }}
    }
  </script>
  <style>
    body { font-family: 'Onest', system-ui, sans-serif; }
    .btn-primary { background:#C6F24E; color:#1D1D1F; border-radius:50px; font-weight:600; padding:.6rem 1.5rem; transition:opacity .15s; }
    .btn-primary:hover { opacity:.85; }
    .btn-ghost { border:1.5px solid #D1D1D6; color:#1D1D1F; border-radius:50px; font-weight:500; padding:.55rem 1.4rem; transition:border-color .15s; }
    .btn-ghost:hover { border-color:#1D1D1F; }
    .btn-danger { color:#DC2626; border:1.5px solid #FCA5A5; border-radius:50px; font-weight:500; padding:.45rem 1rem; font-size:.8125rem; transition:all .15s; }
    .btn-danger:hover { background:#FEF2F2; border-color:#DC2626; }
    .field { width:100%; background:#F5F5F7; border:none; border-radius:.75rem; padding:.875rem 1rem; font-size:.9375rem; font-family:inherit; outline:none; transition:box-shadow .15s; }
    .field:focus { box-shadow:0 0 0 2.5px #C6F24E; }
    .label { font-size:.8125rem; font-weight:600; color:#6E6E73; margin-bottom:.35rem; display:block; }
    #ql-editor-wrap .ql-editor { min-height: 420px; font-family:'Onest',sans-serif; font-size:1rem; line-height:1.7; }
    #ql-editor-wrap .ql-toolbar { border-radius:.75rem .75rem 0 0; background:#F5F5F7; border-color:#E8E8ED; }
    #ql-editor-wrap .ql-container { border-radius:0 0 .75rem .75rem; border-color:#E8E8ED; }
    #ql-editor-wrap .ql-editor:focus { outline:none; }
    .draft-badge { background:#F5F5F7; color:#6E6E73; padding:.2rem .7rem; border-radius:50px; font-size:.75rem; font-weight:600; }
    .pub-badge  { background:#ECFDF5; color:#059669; padding:.2rem .7rem; border-radius:50px; font-size:.75rem; font-weight:600; }
  </style>
</head>
<body class="bg-[#FAFAFA] text-[#1D1D1F] min-h-screen">
<?php }

function pageNav(string $current = ''): void { ?>
<header class="bg-white border-b border-[#E8E8ED] sticky top-0 z-50">
  <div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <span class="font-extrabold text-base tracking-tight">Огни Эльфов</span>
      <span class="text-[#D1D1D6]">|</span>
      <span class="text-sm text-[#6E6E73]">Blog CMS</span>
    </div>
    <div class="flex items-center gap-4">
      <?php if ($current !== 'list'): ?>
      <a href="?" class="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">← Все статьи</a>
      <?php endif; ?>
      <a href="?action=logout" class="text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors">Выйти</a>
    </div>
  </div>
</header>
<?php }

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function renderLogin(string $error = ''): void { ?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Вход — Blog CMS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Onest','system-ui','sans-serif']}}}}</script>
  <style>
    *{box-sizing:border-box}
    body{font-family:'Onest',system-ui,sans-serif;margin:0;min-height:100vh;background:#F5F5F7;display:flex;align-items:center;justify-content:center;padding:1rem}
    .field{width:100%;background:#F5F5F7;border:1.5px solid #E8E8ED;border-radius:.75rem;padding:.875rem 1rem;font-size:1rem;font-family:inherit;outline:none;transition:border-color .15s,box-shadow .15s;-webkit-appearance:none}
    .field:focus{border-color:#C6F24E;box-shadow:0 0 0 3px rgba(198,242,78,.25)}
    .btn{width:100%;background:#C6F24E;color:#1D1D1F;border:none;border-radius:50px;font-weight:700;font-size:1rem;font-family:inherit;padding:.85rem 1.5rem;cursor:pointer;transition:opacity .15s;letter-spacing:-.01em}
    .btn:hover{opacity:.88}
    .btn:active{opacity:.75;transform:scale(.98)}
  </style>
</head>
<body>
  <div style="background:#fff;border-radius:1.25rem;box-shadow:0 4px 32px rgba(0,0,0,.07);padding:2.5rem 2rem;width:100%;max-width:380px">

    <!-- Лого -->
    <div style="text-align:center;margin-bottom:2rem">
      <svg viewBox="0 0 160 44" style="height:2rem;margin:0 auto 0.75rem;display:block" fill="none">
        <rect x="0" y="2" width="4" height="40" rx="1" fill="#1D1D1F"/>
        <rect x="7" y="2" width="6" height="40" rx="1" fill="#1D1D1F"/>
        <rect x="16" y="2" width="9" height="40" rx="1" fill="#1D1D1F"/>
        <rect x="28" y="2" width="13" height="40" rx="1" fill="#C6F24E"/>
        <text x="50" y="18" font-family="Onest,sans-serif" font-weight="800" font-size="15" letter-spacing="-0.45" fill="#1D1D1F">ОГНИ</text>
        <text x="50" y="36" font-family="Onest,sans-serif" font-weight="800" font-size="15" letter-spacing="-0.45" fill="#1D1D1F">ЭЛЬФОВ</text>
      </svg>
      <p style="color:#6E6E73;font-size:.875rem;margin:0">Управление блогом</p>
    </div>

    <form method="POST">
      <label style="display:block;font-size:.8125rem;font-weight:600;color:#6E6E73;margin-bottom:.4rem">Пароль</label>
      <input type="password" name="password" autofocus autocomplete="current-password"
             class="field" placeholder="Введите пароль" style="margin-bottom:<?= $error ? '.75rem' : '1.25rem' ?>">
      <?php if ($error): ?>
        <p style="color:#DC2626;font-size:.875rem;margin:0 0 1rem"><?= h($error) ?></p>
      <?php endif; ?>
      <button type="submit" class="btn">Войти</button>
    </form>

  </div>
</body>
</html>
<?php }

// ─── LIST ─────────────────────────────────────────────────────────────────────
function renderList(): void {
    $posts   = listPosts();
    $deleted = isset($_GET['deleted']);
    pageHead(); pageNav('list'); ?>
<main class="max-w-5xl mx-auto px-6 py-10">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-2xl font-extrabold">Статьи блога</h1>
      <p class="text-sm text-[#86868B] mt-1"><?= count($posts) ?> статей</p>
    </div>
    <a href="?action=new" class="btn-primary">+ Новая статья</a>
  </div>

  <?php if ($deleted): ?>
    <div class="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-sm text-green-700 mb-6">Статья удалена.</div>
  <?php endif; ?>

  <?php if (!$posts): ?>
    <div class="bg-white rounded-2xl p-12 text-center">
      <p class="text-[#6E6E73] mb-4">Статей ещё нет</p>
      <a href="?action=new" class="btn-primary">Написать первую</a>
    </div>
  <?php else: ?>
    <div class="bg-white rounded-2xl overflow-hidden border border-[#E8E8ED]">
      <table class="w-full text-sm">
        <thead class="bg-[#F5F5F7] text-[#6E6E73] text-xs uppercase tracking-wider">
          <tr>
            <th class="text-left px-6 py-3 font-600">Заголовок</th>
            <th class="text-left px-4 py-3 font-600 hidden md:table-cell">Категория</th>
            <th class="text-left px-4 py-3 font-600 hidden md:table-cell">Дата</th>
            <th class="text-left px-4 py-3 font-600">Статус</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#F5F5F7]">
          <?php foreach ($posts as $p): ?>
          <tr class="hover:bg-[#FAFAFA] transition-colors">
            <td class="px-6 py-4 font-medium max-w-xs truncate">
              <a href="/blog-<?= h($p['base'] === 'blog' ? '' : substr($p['base'], 5)) ?>/" target="_blank"
                 class="hover:text-[#6E6E73] transition-colors" title="Открыть статью">
                <?= h($p['title'] ?: $p['base']) ?>
              </a>
            </td>
            <td class="px-4 py-4 text-[#6E6E73] hidden md:table-cell"><?= h($p['cat']) ?></td>
            <td class="px-4 py-4 text-[#6E6E73] hidden md:table-cell"><?= $p['date'] ? dateRu($p['date']) : '—' ?></td>
            <td class="px-4 py-4">
              <?php if ($p['draft']): ?>
                <span class="draft-badge">Черновик</span>
              <?php else: ?>
                <span class="pub-badge">Опубликовано</span>
              <?php endif; ?>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 justify-end">
                <a href="?action=edit&slug=<?= h(substr($p['base'], 5)) ?>" class="btn-ghost text-xs py-1 px-3">Редактировать</a>
                <form method="POST" action="?action=delete" onsubmit="return confirm('Удалить «<?= h(addslashes($p['title'])) ?>»?')">
                  <input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>">
                  <input type="hidden" name="slug" value="<?= h(substr($p['base'], 5)) ?>">
                  <button type="submit" class="btn-danger">Удалить</button>
                </form>
              </div>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</main>
</body></html>
<?php }

// ─── EDITOR ───────────────────────────────────────────────────────────────────
function renderEditor(array $d): void {
    global $CATEGORIES;
    $editing  = !empty($d['slug']);
    $title    = $d['title']    ?? '';
    $slug     = $d['slug']     ?? '';
    $category = $d['category'] ?? '';
    $date     = $d['date']     ?? date('Y-m-d');
    $desc     = $d['description'] ?? '';
    $image    = $d['image']    ?? '';
    $content  = $d['content']  ?? '';
    $draft    = $d['draft']    ?? false;
    $err      = $_SESSION['err'] ?? '';
    unset($_SESSION['err']);
    $pageTitle = $editing ? 'Редактировать: ' . $title : 'Новая статья';
    pageHead($pageTitle); pageNav(); ?>

<!-- Quill CSS -->
<link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">

<main class="max-w-4xl mx-auto px-6 py-8">

  <!-- Sticky save bar -->
  <div class="sticky top-14 z-40 bg-[#FAFAFA]/95 backdrop-blur-sm py-3 -mx-6 px-6 border-b border-[#E8E8ED] flex items-center justify-between mb-8">
    <h1 class="font-extrabold text-lg"><?= $editing ? 'Редактировать статью' : 'Новая статья' ?></h1>
    <div class="flex gap-3">
      <button form="cms-form" name="draft_btn" onclick="document.getElementById('draft-hidden').value='1'" type="submit" class="btn-ghost text-sm">Сохранить черновик</button>
      <button form="cms-form" name="publish_btn" onclick="document.getElementById('draft-hidden').value=''" type="submit" class="btn-primary text-sm">Опубликовать</button>
    </div>
  </div>

  <?php if ($err): ?>
    <div class="bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-sm text-red-700 mb-6"><?= h($err) ?></div>
  <?php endif; ?>

  <form id="cms-form" method="POST" action="?action=save" enctype="multipart/form-data" onsubmit="return beforeSubmit()">
    <input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>">
    <input type="hidden" name="editing" value="<?= $editing ? '1' : '' ?>">
    <input type="hidden" name="content" id="content-hidden">
    <input type="hidden" name="draft" id="draft-hidden" value="<?= $draft ? '1' : '' ?>">

    <!-- Заголовок + slug -->
    <div class="bg-white rounded-2xl p-6 mb-5 border border-[#E8E8ED]">
      <div class="mb-4">
        <label class="label">Заголовок <span class="text-red-400">*</span></label>
        <input type="text" name="title" id="title-field" value="<?= h($title) ?>" required
               class="field text-lg font-semibold" placeholder="Как выбрать мерч для команды">
      </div>
      <div>
        <label class="label">URL статьи (slug)</label>
        <div class="flex items-center gap-2">
          <span class="text-sm text-[#86868B] whitespace-nowrap">elfprint.ru/blog-</span>
          <input type="text" name="slug" id="slug-field" value="<?= h($slug) ?>"
                 <?= $editing ? 'readonly class="field bg-[#E8E8ED] text-[#6E6E73] flex-1"' : 'class="field flex-1"' ?>
                 placeholder="kak-vybrat-merch" pattern="[a-z0-9-]+">
        </div>
        <?php if ($editing): ?>
          <p class="text-xs text-[#86868B] mt-1">Slug нельзя изменить после публикации (это может сломать ссылки)</p>
        <?php endif; ?>
      </div>
    </div>

    <!-- Метаданные -->
    <div class="bg-white rounded-2xl p-6 mb-5 border border-[#E8E8ED]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label class="label">Категория <span class="text-red-400">*</span></label>
          <select name="category" class="field">
            <?php foreach ($CATEGORIES as $cat): ?>
              <option value="<?= h($cat) ?>" <?= $category === $cat ? 'selected' : '' ?>><?= h($cat) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div>
          <label class="label">Дата публикации</label>
          <input type="date" name="date" value="<?= h($date) ?>" class="field">
        </div>
        <div>
          <label class="label">Фото обложки</label>
          <input type="file" name="image_file" id="image-file" accept="image/jpeg,image/png,image/webp"
                 class="field text-sm py-2.5" style="cursor:pointer">
          <p class="text-xs text-[#86868B] mt-1">или укажите URL:</p>
          <input type="text" name="image" id="image-field" value="<?= h($image) ?>"
                 class="field mt-1" placeholder="/img/blog/my-image.jpg">
        </div>
      </div>
      <?php if ($image): ?>
      <div id="img-preview" class="mb-4">
        <img src="<?= h($image) ?>" class="h-32 rounded-xl object-cover w-full" style="object-position:center">
      </div>
      <?php else: ?>
      <div id="img-preview" class="hidden mb-4">
        <img src="" class="h-32 rounded-xl object-cover w-full" style="object-position:center">
      </div>
      <?php endif; ?>
      <div>
        <label class="label">Описание / лид <span class="text-red-400">*</span> <span class="text-[#86868B] font-normal" id="desc-counter">(<?= mb_strlen($desc, 'UTF-8') ?>/200)</span></label>
        <textarea name="description" id="desc-field" rows="2" required maxlength="200"
                  class="field resize-none" placeholder="Краткое описание для поиска и карточки в блоге"><?= h($desc) ?></textarea>
      </div>
    </div>

    <!-- Редактор -->
    <div class="bg-white rounded-2xl mb-5 border border-[#E8E8ED] overflow-hidden">
      <div class="px-6 pt-5 pb-3 border-b border-[#F5F5F7]">
        <p class="text-xs font-semibold text-[#6E6E73] uppercase tracking-wider">Содержание статьи</p>
      </div>
      <div class="p-4">
        <div id="ql-editor-wrap">
          <div id="quill-editor"></div>
        </div>
      </div>
      <div class="px-6 pb-4 flex items-center gap-2 text-xs text-[#86868B]">
        <span>💡 Совет:</span>
        <span>H2 — основные разделы, H3 — подразделы. Изображение вставляйте кнопкой 🖼 → URL. Таблицы через кнопку ≡.</span>
      </div>
    </div>

    <!-- Нижняя панель -->
    <div class="flex items-center justify-between">
      <a href="?" class="text-sm text-[#86868B] hover:text-[#1D1D1F]">← Отмена</a>
      <div class="flex gap-3">
        <button name="draft_btn" onclick="document.getElementById('draft-hidden').value='1'" type="submit" class="btn-ghost">Сохранить черновик</button>
        <button name="publish_btn" onclick="document.getElementById('draft-hidden').value=''" type="submit" class="btn-primary">Опубликовать →</button>
      </div>
    </div>
  </form>
</main>

<!-- Quill JS -->
<script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
<script>
var quill = new Quill('#quill-editor', {
  theme: 'snow',
  placeholder: 'Начните писать статью...',
  modules: {
    toolbar: {
      container: [
        [{ header: 2 }, { header: 3 }],
        ['bold', 'italic'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: function() {
          var url = prompt('URL изображения:');
          if (url) {
            var range = quill.getSelection();
            quill.insertEmbed(range ? range.index : 0, 'image', url);
          }
        }
      }
    }
  }
});

// Загружаем существующий контент через dangerouslyPasteHTML (надёжнее innerHTML)
var existingContent = <?= json_encode($content) ?>;
if (existingContent && existingContent.trim() !== '') {
  quill.clipboard.dangerouslyPasteHTML(existingContent);
  // Сбрасываем историю чтобы undo не стёр контент
  quill.history.clear();
}

// ── Авто-сохранение в localStorage ──────────────────────────────────────────
var AUTOSAVE_KEY = 'cms_draft_<?= h($slug ?: 'new') ?>';

// Восстановить из localStorage если нет серверного контента
if (!existingContent || existingContent.trim() === '') {
  var saved = localStorage.getItem(AUTOSAVE_KEY);
  if (saved) {
    try {
      var savedData = JSON.parse(saved);
      if (savedData.content) quill.clipboard.dangerouslyPasteHTML(savedData.content);
      if (savedData.title && !document.getElementById('title-field').value)
        document.getElementById('title-field').value = savedData.title;
      if (savedData.desc && !document.getElementById('desc-field').value)
        document.getElementById('desc-field').value = savedData.desc;
      // Показываем уведомление
      var notice = document.createElement('div');
      notice.style.cssText = 'background:#FFF9C4;border:1px solid #F0D500;border-radius:.5rem;padding:.5rem 1rem;font-size:.8125rem;margin-bottom:1rem;';
      notice.innerHTML = '💾 Восстановлен черновик из авто-сохранения. <button onclick="localStorage.removeItem(\''+AUTOSAVE_KEY+'\');this.parentNode.remove()" style="color:#6E6E73;text-decoration:underline;background:none;border:none;cursor:pointer;font-size:.8125rem">Очистить</button>';
      document.querySelector('main').insertBefore(notice, document.getElementById('cms-form'));
    } catch(e) {}
  }
}

// Сохранять каждые 30 секунд
setInterval(function() {
  var html = quill.root.innerHTML;
  if (html && html !== '<p><br></p>') {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({
      content: html,
      title: document.getElementById('title-field').value,
      desc: document.getElementById('desc-field').value,
      ts: Date.now()
    }));
  }
}, 30000);

// Очищаем авто-сохранение при успешной отправке
document.getElementById('cms-form').addEventListener('submit', function() {
  localStorage.removeItem(AUTOSAVE_KEY);
});

// Auto-slug from title
var titleField = document.getElementById('title-field');
var slugField  = document.getElementById('slug-field');
<?php if (!$editing): ?>
titleField.addEventListener('input', function() {
  var s = this.value.toLowerCase()
    .replace(/[а-яё]/g, function(c) {
      var m={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
      return m[c] || '';
    })
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  slugField.value = s;
});
<?php endif; ?>

// Image URL preview
document.getElementById('image-field').addEventListener('input', function() {
  var p = document.getElementById('img-preview');
  var img = p.querySelector('img');
  if (this.value) { img.src = this.value; p.classList.remove('hidden'); }
  else if (!document.getElementById('image-file').files.length) p.classList.add('hidden');
});

// Image file preview
document.getElementById('image-file').addEventListener('change', function() {
  var p = document.getElementById('img-preview');
  var img = p.querySelector('img');
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) { img.src = e.target.result; p.classList.remove('hidden'); };
    reader.readAsDataURL(this.files[0]);
  }
});

// Desc counter
document.getElementById('desc-field').addEventListener('input', function() {
  document.getElementById('desc-counter').textContent = '(' + this.value.length + '/200)';
});

// Before submit: copy Quill content to hidden field
function beforeSubmit() {
  var html = quill.root.innerHTML;
  if (html === '<p><br></p>' || html.trim() === '') {
    alert('Заполните содержание статьи');
    return false;
  }
  document.getElementById('content-hidden').value = html;
  return true;
}
</script>
</body></html>
<?php }

// ─── SUCCESS ──────────────────────────────────────────────────────────────────
function renderSuccess(string $title, string $link, bool $draft): void {
    $warn = $_SESSION['warn'] ?? '';
    unset($_SESSION['warn']);
    pageHead('Готово!'); pageNav(); ?>
<main class="max-w-2xl mx-auto px-6 py-20 text-center">
  <div class="bg-white rounded-2xl p-12 border border-[#E8E8ED]">
    <div class="w-16 h-16 bg-[#C6F24E] rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-8 h-8 text-[#1D1D1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
    </div>
    <h1 class="text-2xl font-extrabold mb-2">
      <?= $draft ? 'Черновик сохранён' : 'Статья опубликована!' ?>
    </h1>
    <p class="text-[#6E6E73] mb-8"><?= h($title) ?></p>
    <?php if ($warn): ?>
      <div style="background:#FFF3CD;border:1px solid #FFC107;border-radius:.75rem;padding:.75rem 1rem;font-size:.8125rem;color:#856404;margin-bottom:1.5rem;text-align:left"><?= h($warn) ?></div>
    <?php endif; ?>
    <?php if (!$draft): ?>
    <a href="<?= h($link) ?>" target="_blank"
       class="btn-primary inline-block mb-4">Открыть статью →</a>
    <br>
    <?php endif; ?>
    <div class="flex justify-center gap-4 mt-4">
      <a href="?action=new" class="btn-ghost text-sm">Написать ещё</a>
      <a href="?" class="text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors mt-2">К списку статей</a>
    </div>
  </div>
</main>
</body></html>
<?php }
