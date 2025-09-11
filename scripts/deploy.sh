#!/bin/bash

# Скрипт для деплоя на разные платформы

echo "🚀 Деплой MobFrame..."

# Проверяем переменные окружения
if [ -z "$DEPLOYMENT_TARGET" ]; then
  echo "❌ Укажите DEPLOYMENT_TARGET (vercel/railway/yandex)"
  exit 1
fi

case $DEPLOYMENT_TARGET in
  "vercel")
    echo "📦 Деплой на Vercel..."
    npm run build
    vercel --prod
    ;;
  "railway")
    echo "🚂 Деплой на Railway..."
    railway login
    railway up
    ;;
  "yandex")
    echo "☁️ Деплой на Yandex Cloud..."
    # Здесь будет скрипт для Yandex Cloud
    docker build -t mobframe .
    # yc container registry push mobframe
    ;;
  *)
    echo "❌ Неизвестная платформа: $DEPLOYMENT_TARGET"
    exit 1
    ;;
esac

echo "✅ Деплой завершен!"
