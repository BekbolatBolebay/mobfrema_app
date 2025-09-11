#!/bin/bash

# Барлық 4 провайдерді орнату скрипті

echo "🚀 55GB тегін сақтау орнын орнату..."

setup_mega() {
    echo "🟢 MEGA орнатылуда (20GB)..."
    echo "1. mega.nz сайтына кіріңіз"
    echo "2. Тіркеліңіз"
    echo "3. Email және паролді .env файлына қосыңыз"
    echo "MEGA_EMAIL=your_email@example.com"
    echo "MEGA_PASSWORD=your_password"
    echo ""
}

setup_google_drive() {
    echo "🔵 Google Drive орнатылуда (15GB)..."
    echo "1. console.cloud.google.com сайтына кіріңіз"
    echo "2. Жаңа жоба жасаңыз"
    echo "3. Drive API қосыңыз"
    echo "4. OAuth 2.0 кілттерін жасаңыз"
    echo "5. Refresh token алыңыз"
    echo ""
}

setup_cloudflare_r2() {
    echo "🟠 Cloudflare R2 орнатылуда (10GB)..."
    echo "1. cloudflare.com сайтына кіріңіз"
    echo "2. R2 Object Storage қосыңыз"
    echo "3. API Token жасаңыз"
    echo "4. Bucket құрыңыз"
    echo ""
}

setup_backblaze_b2() {
    echo "🔴 Backblaze B2 орнатылуда (10GB)..."
    echo "1. backblaze.com сайтына кіріңіз"
    echo "2. B2 Cloud Storage қосыңыз"
    echo "3. Application Key жасаңыз"
    echo "4. Bucket құрыңыз"
    echo ""
}

# Барлық провайдерлерді орнату
setup_mega
setup_google_drive
setup_cloudflare_r2
setup_backblaze_b2

echo "✅ Барлық провайдерлер орнатылды!"
echo "📊 Барлығы: 55GB тегін сақтау орны"
echo ""
echo "Келесі қадам: .env файлына барлық кілттерді қосыңыз"
