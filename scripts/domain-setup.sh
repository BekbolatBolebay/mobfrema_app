#!/bin/bash

# Домен орнату скрипті

echo "🌐 MobFrame домен орнату..."

# Vercel тегін домені
setup_vercel_domain() {
    echo "📦 Vercel домені орнатылуда..."
    
    # Vercel CLI орнату
    npm i -g vercel
    
    # Деплой жасау
    vercel --prod
    
    echo "✅ Домен дайын: https://mobframe.vercel.app"
}

# Кастом домен қосу
setup_custom_domain() {
    echo "🔧 Кастом домен орнатылуда..."
    
    read -p "Домен атын енгізіңіз (мысалы: mobframe.xyz): " DOMAIN
    
    # Vercel-ге домен қосу
    vercel domains add $DOMAIN
    
    # DNS орнату нұсқаулары
    echo "📋 DNS орнату:"
    echo "A record: @ -> 76.76.19.19"
    echo "CNAME record: www -> cname.vercel-dns.com"
    
    echo "✅ Домен қосылды. DNS таратылуын күтіңіз (24 сағатқа дейін)"
}

# Опция таңдау
echo "Домен опциясын таңдаңыз:"
echo "1) Vercel тегін домені (ұсынылады)"
echo "2) Кастом домен қосу"

read -p "Таңдауыңыз (1-2): " choice

case $choice in
    1) setup_vercel_domain ;;
    2) setup_custom_domain ;;
    *) echo "Қате таңдау" ;;
esac
