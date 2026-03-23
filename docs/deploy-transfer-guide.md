# Инструкция по переносу проекта elfprint.ru

**Для:** Филипп (заказчик)
**Что переносим:** сайт elfprint.ru + админка блога (Decap CMS)
**Куда:** аккаунты заказчика (GitHub, Timeweb Cloud VPS)

---

## Что нужно завести заказчику

| Сервис | Зачем | Стоимость |
|--------|-------|-----------|
| **GitHub** (аккаунт) | Хранение кода, автодеплой | Бесплатно |
| **Timeweb Cloud VPS** | Хостинг сайта (Москва, 152-ФЗ) | ~500–1500 ₽/мес |
| **Домен elfprint.ru** | Если ещё не оформлен на заказчика | ~200 ₽/год |
| **Яндекс.Вебмастер** | SEO, индексация | Бесплатно |
| **Яндекс.Метрика** | Аналитика (основная) | Бесплатно |

---

## Этап 1: GitHub

### 1.1. Создать аккаунт
- Зайти на github.com → Sign Up
- Подтвердить email

### 1.2. Создать приватный репозиторий
- New Repository → Название: `elfprint-site` → Private
- Не ставить галочки (README, .gitignore, license)

### 1.3. Перенести код
Мы (разработчики) выполним:
```bash
git remote set-url origin https://github.com/ФИЛИПП_USERNAME/elfprint-site.git
git push -u origin main
```

Или Филипп клонирует к себе:
```bash
git clone https://github.com/DimonProgrammer/ognielfov.git elfprint-site
cd elfprint-site
git remote set-url origin https://github.com/ФИЛИПП_USERNAME/elfprint-site.git
git push -u origin main
```

---

## Этап 2: Timeweb Cloud VPS

### 2.1. Заказать VPS
- Зайти на timeweb.cloud → Cloud → Создать сервер
- **Регион:** Москва (обязательно, 152-ФЗ)
- **ОС:** Ubuntu 22.04
- **Конфигурация:** минимум 1 vCPU, 1 GB RAM, 20 GB SSD (хватит)
- Записать IP-адрес сервера

### 2.2. Настроить сервер
Подключиться по SSH и выполнить:

```bash
# Обновить систему
sudo apt update && sudo apt upgrade -y

# Установить Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Установить nginx
sudo apt install -y nginx

# Установить PM2 (менеджер процессов)
sudo npm install -g pm2

# Установить decap-server (админка блога)
sudo npm install -g decap-server

# Создать директорию сайта
sudo mkdir -p /var/www/elfprint
sudo chown $USER:$USER /var/www/elfprint
```

### 2.3. Клонировать проект на сервер
```bash
cd /var/www/elfprint
git clone https://github.com/ФИЛИПП_USERNAME/elfprint-site.git .
```

---

## Этап 3: Nginx

### 3.1. Создать конфигурацию сайта
```bash
sudo nano /etc/nginx/sites-available/elfprint.ru
```

Вставить:
```nginx
server {
    listen 80;
    server_name elfprint.ru www.elfprint.ru;

    root /var/www/elfprint/prototype;
    index index.html;

    # Основной сайт
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Decap CMS API (локальный бэкенд)
    location /api/v1/ {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Админка блога — защищена паролем
    location /admin {
        auth_basic "Админка блога";
        auth_basic_user_file /etc/nginx/.htpasswd_elfprint;
        try_files $uri $uri/ /admin/index.html;
    }

    # Кэширование статики
    location ~* \.(css|js|svg|png|jpg|jpeg|webp|avif|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3.2. Включить сайт
```bash
sudo ln -s /etc/nginx/sites-available/elfprint.ru /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 3.3. SSL-сертификат (HTTPS)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d elfprint.ru -d www.elfprint.ru
```
Certbot автоматически обновит nginx-конфиг на HTTPS.

---

## Этап 4: Админка блога (Decap CMS)

### 4.1. Создать пароль для админки
```bash
sudo apt install -y apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd_elfprint admin
```
Ввести пароль — этот логин/пароль будет использоваться для входа в админку.

### 4.2. Запустить decap-server через PM2
```bash
cd /var/www/elfprint
pm2 start "npx decap-server" --name decap-server
pm2 save
pm2 startup  # выполнить команду, которую покажет PM2
```

### 4.3. Проверить
- Открыть `https://elfprint.ru/admin/`
- Ввести логин/пароль из шага 4.1
- Создать тестовую статью
- Убедиться, что файл появился в `src/content/blog/`

---

## Этап 5: Автодеплой (GitHub Actions)

### 5.1. Добавить SSH-ключ в GitHub
На сервере:
```bash
ssh-keygen -t ed25519 -C "deploy@elfprint.ru" -f ~/.ssh/deploy_key -N ""
cat ~/.ssh/deploy_key  # это PRIVATE ключ — скопировать
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys
```

В GitHub-репозитории:
- Settings → Secrets and variables → Actions → New repository secret
- Имя: `VPS_SSH_KEY`, значение: содержимое `~/.ssh/deploy_key`
- Добавить ещё: `VPS_HOST` = IP-адрес сервера, `VPS_USER` = имя пользователя

### 5.2. Создать workflow
Файл `.github/workflows/deploy.yml` уже должен быть в репозитории.
Если нет — мы его создадим перед передачей.

### 5.3. Как работает деплой
```
Филипп пишет статью в /admin → сохраняет →
  файл .md создаётся в src/content/blog/ →
    при следующем git push → GitHub Actions →
      SSH на VPS → git pull → сайт обновлён
```

---

## Этап 6: Яндекс.Вебмастер + Метрика

### 6.1. Яндекс.Метрика
- Зайти на metrika.yandex.ru → Добавить счётчик
- Домен: elfprint.ru
- Скопировать код счётчика
- Вставить в `<head>` всех страниц (мы подготовим)

### 6.2. Яндекс.Вебмастер
- Зайти на webmaster.yandex.ru → Добавить сайт
- Подтвердить владение (через мета-тег или DNS)
- Добавить sitemap.xml
- Зарегистрировать тексты в «Оригинальные тексты»

---

## Этап 7: Домен (DNS)

Направить домен elfprint.ru на VPS:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | elfprint.ru | IP_АДРЕС_VPS |
| A | www | IP_АДРЕС_VPS |

TTL: 3600 (или минимальный доступный)

---

## Чеклист после переноса

- [ ] Сайт открывается по https://elfprint.ru
- [ ] Все страницы работают (пройти по навигации)
- [ ] Админка открывается по https://elfprint.ru/admin/
- [ ] Можно создать и сохранить статью в админке
- [ ] SSL-сертификат активен (замочек в браузере)
- [ ] Яндекс.Метрика считает визиты
- [ ] Яндекс.Вебмастер видит сайт
- [ ] robots.txt доступен
- [ ] Деплой по git push работает

---

## Контакты для помощи

Если что-то пошло не так на любом этапе — пишите разработчику.
Мы поможем с настройкой или подключимся к серверу удалённо.
