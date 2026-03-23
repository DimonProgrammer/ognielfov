#!/bin/bash
# Настройка Decap CMS на Timeweb VPS
# Запускать на сервере: bash deploy/setup-blog-admin.sh

set -e

echo "=== Настройка Decap CMS для elfprint.ru ==="

# 1. Создать пароль для админки
echo ""
echo "Шаг 1: Создание пароля для админки"
echo "Введите логин для доступа к /admin:"
read -r ADMIN_USER
sudo htpasswd -c /etc/nginx/.htpasswd_elfprint "$ADMIN_USER"

# 2. Установить decap-server
echo ""
echo "Шаг 2: Установка decap-server"
npm install -g decap-server

# 3. Запустить через PM2
echo ""
echo "Шаг 3: Запуск decap-server через PM2"
pm2 start deploy/ecosystem.config.cjs
pm2 save

# 4. Добавить nginx конфиг
echo ""
echo "Шаг 4: Nginx"
echo "Добавьте содержимое deploy/nginx-admin.conf в ваш server {} блок:"
echo "  sudo nano /etc/nginx/sites-available/elfprint.ru"
echo ""
echo "Затем:"
echo "  sudo nginx -t && sudo systemctl reload nginx"

echo ""
echo "=== Готово! ==="
echo "Админка доступна: https://elfprint.ru/admin/"
echo "Логин: $ADMIN_USER"
