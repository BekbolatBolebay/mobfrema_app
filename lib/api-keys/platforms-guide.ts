// Барлық платформалардан API кілттерін алу нұсқаулығы

export const apiKeyGuide = {
  // 1. НЕГІЗГІ ПЛАТФОРМАЛАР (міндетті)
  essential: {
    supabase: {
      name: "Supabase",
      url: "https://supabase.com",
      keys: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
      steps: [
        "1. supabase.com сайтына кіру",
        "2. 'Start your project' басу",
        "3. GitHub арқылы тіркелу",
        "4. 'New project' жасау",
        "5. Settings > API бөліміне өту",
        "6. URL және anon key көшіру",
      ],
      free_tier: "500MB база, 2GB трафик",
      required_for: "База деректер, аутентификация, файл сақтау",
    },

    vercel: {
      name: "Vercel",
      url: "https://vercel.com",
      keys: ["VERCEL_TOKEN"],
      steps: [
        "1. vercel.com сайтына кіру",
        "2. GitHub арқылы тіркелу",
        "3. Settings > Tokens бөліміне өту",
        "4. 'Create Token' басу",
        "5. Token атын беру",
        "6. Токенді көшіру",
      ],
      free_tier: "100GB bandwidth, безшекті деплой",
      required_for: "Хостинг, домен, деплой",
    },

    stripe: {
      name: "Stripe",
      url: "https://stripe.com",
      keys: ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
      steps: [
        "1. stripe.com сайтына кіру",
        "2. 'Start now' басу",
        "3. Аккаунт жасау",
        "4. Dashboard > Developers > API keys",
        "5. Publishable key және Secret key көшіру",
        "6. Webhooks орнату",
      ],
      free_tier: "Алғашқы $1M үшін 2.9% + 30¢",
      required_for: "Халықаралық төлемдер",
    },
  },

  // 2. ТӨЛЕМ ЖҮЙЕЛЕРІ
  payments: {
    paybox: {
      name: "PayBox.kz",
      url: "https://paybox.kz",
      keys: ["PAYBOX_MERCHANT_ID", "PAYBOX_SECRET_KEY"],
      steps: [
        "1. paybox.kz сайтына кіру",
        "2. 'Подключиться' басу",
        "3. Заявка толтыру",
        "4. Құжаттарды жіберу",
        "5. Модерация күту (1-3 күн)",
        "6. API кілттерін алу",
      ],
      commission: "2.5-3.5%",
      required_for: "Қазақстандық төлемдер",
    },

    cloudpayments: {
      name: "CloudPayments",
      url: "https://cloudpayments.kz",
      keys: ["CLOUDPAYMENTS_PUBLIC_ID", "CLOUDPAYMENTS_API_SECRET"],
      steps: [
        "1. cloudpayments.kz сайтына кіру",
        "2. Тіркелу",
        "3. Бизнес деректерін толтыру",
        "4. Модерация күту",
        "5. API кілттерін алу",
      ],
      commission: "2.8%",
      required_for: "Қазақстан + ТМД төлемдері",
    },
  },

  // 3. ФАЙЛ САҚТАУ
  storage: {
    cloudflare_r2: {
      name: "Cloudflare R2",
      url: "https://cloudflare.com",
      keys: ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_R2_ACCESS_KEY_ID", "CLOUDFLARE_R2_SECRET_ACCESS_KEY"],
      steps: [
        "1. cloudflare.com сайтына кіру",
        "2. Тіркелу",
        "3. R2 Object Storage қосу",
        "4. API Token жасау",
        "5. Bucket құру",
        "6. Кілттерді көшіру",
      ],
      free_tier: "10GB сақтау, 1M операция",
      required_for: "Үлкен файлдар сақтау",
    },

    yandex_cloud: {
      name: "Yandex Cloud",
      url: "https://cloud.yandex.kz",
      keys: ["YANDEX_ACCESS_KEY_ID", "YANDEX_SECRET_ACCESS_KEY"],
      steps: [
        "1. cloud.yandex.kz сайтына кіру",
        "2. Yandex ID арқылы кіру",
        "3. Object Storage қосу",
        "4. Service Account жасау",
        "5. Static Access Keys алу",
        "6. Bucket құру",
      ],
      free_tier: "1GB сақтау",
      required_for: "ҚР-дағы жылдам файл беру",
    },
  },

  // 4. AI ҚЫЗМЕТТЕРІ
  ai: {
    openai: {
      name: "OpenAI",
      url: "https://platform.openai.com",
      keys: ["OPENAI_API_KEY"],
      steps: [
        "1. platform.openai.com сайтына кіру",
        "2. Тіркелу",
        "3. API keys бөліміне өту",
        "4. 'Create new secret key' басу",
        "5. Кілтті көшіру",
      ],
      free_tier: "$5 кредит",
      required_for: "AI чат, мазмұн генерациясы",
    },

    replicate: {
      name: "Replicate",
      url: "https://replicate.com",
      keys: ["REPLICATE_API_TOKEN"],
      steps: [
        "1. replicate.com сайтына кіру",
        "2. GitHub арқылы тіркелу",
        "3. Account settings > API tokens",
        "4. Token жасау",
        "5. Көшіру",
      ],
      free_tier: "Айына $10 кредит",
      required_for: "Сурет генерациясы, AI модельдер",
    },
  },

  // 5. АНАЛИТИКА
  analytics: {
    google_analytics: {
      name: "Google Analytics",
      url: "https://analytics.google.com",
      keys: ["GA_MEASUREMENT_ID"],
      steps: [
        "1. analytics.google.com сайтына кіру",
        "2. Google аккаунтпен кіру",
        "3. 'Start measuring' басу",
        "4. Property жасау",
        "5. Measurement ID көшіру",
      ],
      free_tier: "Толығымен тегін",
      required_for: "Пайдаланушы аналитикасы",
    },

    yandex_metrica: {
      name: "Yandex Metrica",
      url: "https://metrica.yandex.com",
      keys: ["YANDEX_METRICA_ID"],
      steps: [
        "1. metrica.yandex.com сайтына кіру",
        "2. Yandex ID арқылы кіру",
        "3. 'Добавить счетчик' басу",
        "4. Сайт деректерін толтыру",
        "5. Counter ID көшіру",
      ],
      free_tier: "Толығымен тегін",
      required_for: "ҚР/ТМД аналитикасы",
    },
  },

  // 6. ХАБАРЛАНДЫРУЛАР
  notifications: {
    resend: {
      name: "Resend",
      url: "https://resend.com",
      keys: ["RESEND_API_KEY"],
      steps: [
        "1. resend.com сайтына кіру",
        "2. GitHub арқылы тіркелу",
        "3. API Keys бөліміне өту",
        "4. 'Create API Key' басу",
        "5. Кілтті көшіру",
      ],
      free_tier: "Айына 3000 email",
      required_for: "Email хабарландырулар",
    },

    telegram_bot: {
      name: "Telegram Bot",
      url: "https://t.me/BotFather",
      keys: ["TELEGRAM_BOT_TOKEN"],
      steps: [
        "1. Telegram-да @BotFather табу",
        "2. /newbot командасын жіберу",
        "3. Bot атын беру",
        "4. Username беру",
        "5. Token алу",
      ],
      free_tier: "Толығымен тегін",
      required_for: "Telegram хабарландырулар",
    },
  },
}
