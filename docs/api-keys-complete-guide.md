# 🔑 БАРЛЫҚ API КІЛТТЕРІН АЛУ - ТОЛЫҚ НҰСҚАУЛЫҚ

## 📦 САҚТАУ ПРОВАЙДЕРЛЕРІ (55GB ТЕГІН!)

### 🟢 1. MEGA API - 20GB ТЕГІН
**Сілтеме:** https://mega.nz/register

**Қадамдар:**
1. **Тіркелу:** https://mega.nz/register
2. Email растау
3. Кіру: https://mega.nz/login
4. **API кілттер алу үшін:**
   - Аккаунт орнатулары → API
   - Немесе тікелей: https://mega.nz/sdk
5. **.env файлына қосу:**
\`\`\`bash
MEGA_EMAIL=your_email@example.com
MEGA_PASSWORD=your_password
\`\`\`

**Лимиттер:** 20GB тегін, 1GB файл лимиті

---

### 🔵 2. GOOGLE DRIVE API - 15GB ТЕГІН
**Сілтеме:** https://console.cloud.google.com

**Қадамдар:**
1. **Google Cloud Console:** https://console.cloud.google.com
2. **Жаңа жоба жасау:**
   - "New Project" → "MobFrame Storage"
3. **Drive API қосу:**
   - APIs & Services → Library
   - "Google Drive API" іздеу → Enable
   - Сілтеме: https://console.cloud.google.com/apis/library/drive.googleapis.com
4. **OAuth 2.0 орнату:**
   - APIs & Services → Credentials
   - "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Authorized redirect URIs: `http://localhost:3000/auth/callback`
5. **Refresh Token алу:**
   - OAuth Playground: https://developers.google.com/oauthplayground
   - Scopes: `https://www.googleapis.com/auth/drive.file`
   - Authorize APIs → Exchange authorization code for tokens

**.env файлына қосу:**
\`\`\`bash
GOOGLE_DRIVE_CLIENT_ID=your_client_id.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret
GOOGLE_DRIVE_REFRESH_TOKEN=your_refresh_token
\`\`\`

**Лимиттер:** 15GB тегін, 5GB файл лимиті

---

### 🟠 3. CLOUDFLARE R2 - 10GB ТЕГІН
**Сілтеме:** https://dash.cloudflare.com

**Қадамдар:**
1. **Тіркелу:** https://dash.cloudflare.com/sign-up
2. **R2 қосу:**
   - Dashboard → R2 Object Storage
   - "Create bucket" → "mobframe-storage"
3. **API Token жасау:**
   - My Profile → API Tokens
   - "Create Token" → "Custom token"
   - Permissions: `Zone:Zone:Read, Zone:Zone Settings:Edit`
   - Account resources: `Include - All accounts`
4. **R2 кілттері:**
   - R2 → Manage R2 API tokens
   - "Create API token"

**.env файлына қосу:**
\`\`\`bash
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=mobframe-storage
\`\`\`

**Лимиттер:** 10GB тегін, 5GB файл лимиті

---

### 🔴 4. BACKBLAZE B2 - 10GB ТЕГІН
**Сілтеме:** https://www.backblaze.com/b2/sign-up.html

**Қадамдар:**
1. **Тіркелу:** https://www.backblaze.com/b2/sign-up.html
2. **B2 Cloud Storage қосу:**
   - Account → B2 Cloud Storage
3. **Application Key жасау:**
   - App Keys → "Add a New Application Key"
   - Key Name: "MobFrame"
   - Allow access to: "All"
4. **Bucket жасау:**
   - Buckets → "Create a Bucket"
   - Bucket Name: "mobframe-files"
   - Files in Bucket are: "Public"

**.env файлына қосу:**
\`\`\`bash
BACKBLAZE_APPLICATION_KEY_ID=your_key_id
BACKBLAZE_APPLICATION_KEY=your_application_key
BACKBLAZE_BUCKET_ID=your_bucket_id
\`\`\`

**Лимиттер:** 10GB тегін, 5GB файл лимиті

---

### 🟣 5. SUPABASE - 1GB ТЕГІН
**Сілтеме:** https://supabase.com

**Қадамдар:**
1. **Тіркелу:** https://supabase.com
2. **Жаңа жоба:** "New project" → "MobFrame"
3. **API кілттері:**
   - Settings → API
   - Project URL және anon public key көшіру

**.env файлына қосу:**
\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

**Лимиттер:** 1GB тегін, 50MB файл лимиті

---

## 💳 ТӨЛЕМ ЖҮЙЕЛЕРІ

### 🇰🇿 1. PAYBOX.KZ - ҚАЗАҚСТАН
**Сілтеме:** https://paybox.kz

**Қадамдар:**
1. **Өтініш:** https://paybox.kz/ru/connect
2. **Құжаттар дайындау:**
   - ЖСН/БИН
   - Банк деректемесі
   - Бизнес лицензиясы
3. **Модерация:** 1-3 күн
4. **API кілттері:** Личный кабинет → API

**.env файлына қосу:**
\`\`\`bash
PAYBOX_MERCHANT_ID=your_merchant_id
PAYBOX_SECRET_KEY=your_secret_key
\`\`\`

**Комиссия:** 2.5-3.5%

---

### 🌍 2. STRIPE - ХАЛЫҚАРАЛЫҚ
**Сілтеме:** https://stripe.com

**Қадамдар:**
1. **Тіркелу:** https://dashboard.stripe.com/register
2. **Аккаунт растау:** Бизнес деректері
3. **API кілттері:**
   - Developers → API keys
   - Publishable key және Secret key көшіру
4. **Webhook орнату:**
   - Developers → Webhooks
   - Endpoint URL: `https://yourdomain.com/api/stripe/webhook`

**.env файлына қосу:**
\`\`\`bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`

**Комиссия:** 2.9% + 30¢

---

### 🇰🇿 3. CLOUDPAYMENTS.KZ - ТМД
**Сілтеме:** https://cloudpayments.kz

**Қадамдар:**
1. **Тіркелу:** https://cloudpayments.kz/Registration
2. **Бизнес деректері:** Толтыру
3. **Модерация:** 1-2 күн
4. **API кілттері:** Настройки → API

**.env файлына қосу:**
\`\`\`bash
CLOUDPAYMENTS_PUBLIC_ID=pk_your_public_id
CLOUDPAYMENTS_API_SECRET=your_api_secret
\`\`\`

**Комиссия:** 2.8%

---

## 🤖 AI ҚЫЗМЕТТЕРІ

### 🧠 1. OPENAI - GPT API
**Сілтеме:** https://platform.openai.com

**Қадамдар:**
1. **Тіркелу:** https://platform.openai.com/signup
2. **API кілт:** https://platform.openai.com/api-keys
3. **"Create new secret key"**

**.env файлына қосу:**
\`\`\`bash
OPENAI_API_KEY=sk-...
\`\`\`

**Лимиттер:** $5 тегін кредит

---

### 🎨 2. REPLICATE - AI МОДЕЛЬДЕР
**Сілтеме:** https://replicate.com

**Қадамдар:**
1. **GitHub арқылы кіру:** https://replicate.com
2. **API Token:** Account settings → API tokens
3. **"Create token"**

**.env файлына қосу:**
\`\`\`bash
REPLICATE_API_TOKEN=r8_...
\`\`\`

**Лимиттер:** $10/ай тегін

---

### 🚀 3. XAI (GROK) - ELON MUSK AI
**Сілтеме:** https://x.ai

**Қадамдар:**
1. **Тіркелу:** https://x.ai/api
2. **API кілт алу:** Dashboard → API Keys
3. **"Generate API Key"**

**.env файлына қосу:**
\`\`\`bash
XAI_API_KEY=xai-...
\`\`\`

**Лимиттер:** $25 тегін кредит

---

## 📧 EMAIL ҚЫЗМЕТТЕРІ

### 📮 1. RESEND - EMAIL API
**Сілтеме:** https://resend.com

**Қадамдар:**
1. **GitHub арқылы кіру:** https://resend.com
2. **API Keys:** Dashboard → API Keys
3. **"Create API Key"**

**.env файлына қосу:**
\`\`\`bash
RESEND_API_KEY=re_...
\`\`\`

**Лимиттер:** 3000 email/ай тегін

---

### 📧 2. SENDGRID - EMAIL DELIVERY
**Сілтеме:** https://sendgrid.com

**Қадамдар:**
1. **Тіркелу:** https://signup.sendgrid.com
2. **API Key:** Settings → API Keys
3. **"Create API Key"**

**.env файлына қосу:**
\`\`\`bash
SENDGRID_API_KEY=SG....
\`\`\`

**Лимиттер:** 100 email/күн тегін

---

## 📱 PUSH ХАБАРЛАНДЫРУЛАР

### 🔔 1. FIREBASE - PUSH NOTIFICATIONS
**Сілтеме:** https://console.firebase.google.com

**Қадамдар:**
1. **Жаңа жоба:** https://console.firebase.google.com
2. **"Add project" → "MobFrame"**
3. **Cloud Messaging қосу**
4. **Service Account:** Project settings → Service accounts
5. **"Generate new private key"**

**.env файлына қосу:**
\`\`\`bash
FIREBASE_PROJECT_ID=mobframe-...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...
\`\`\`

**Лимиттер:** Тегін (лимитсіз)

---

### 📲 2. TELEGRAM BOT - ХАБАРЛАНДЫРУЛАР
**Сілтеме:** https://t.me/BotFather

**Қадамдар:**
1. **Telegram-да @BotFather табу**
2. **/newbot командасы**
3. **Bot атын беру: "MobFrame Bot"**
4. **Username беру: "mobframe_kz_bot"**
5. **Token алу**

**.env файлына қосу:**
\`\`\`bash
TELEGRAM_BOT_TOKEN=123456789:ABC...
TELEGRAM_CHAT_ID=your_chat_id
\`\`\`

**Лимиттер:** Тегін (лимитсіз)

---

## 📊 АНАЛИТИКА

### 📈 1. GOOGLE ANALYTICS
**Сілтеме:** https://analytics.google.com

**Қадамдар:**
1. **Кіру:** https://analytics.google.com
2. **"Start measuring"**
3. **Property жасау:** "MobFrame"
4. **Measurement ID көшіру**

**.env файлына қосу:**
\`\`\`bash
GA_MEASUREMENT_ID=G-...
\`\`\`

**Лимиттер:** Тегін (лимитсіз)

---

### 📊 2. YANDEX METRICA - ҚР ҮШІН
**Сілтеме:** https://metrica.yandex.com

**Қадамдар:**
1. **Кіру:** https://metrica.yandex.com
2. **"Добавить счетчик"**
3. **Сайт URL: mobframe.kz**
4. **Counter ID көшіру**

**.env файлына қосу:**
\`\`\`bash
YANDEX_METRICA_ID=12345678
\`\`\`

**Лимиттер:** Тегін (лимитсіз)

---

## 🔐 АУТЕНТИФИКАЦИЯ

### 🔑 1. NEXTAUTH - SOCIAL LOGIN
**GitHub, Google, Facebook үшін**

**GitHub:**
1. **Settings:** https://github.com/settings/developers
2. **"New OAuth App"**
3. **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

**Google:**
1. **Console:** https://console.cloud.google.com
2. **APIs & Services → Credentials**
3. **"Create Credentials" → "OAuth 2.0 Client ID"**

**.env файлына қосу:**
\`\`\`bash
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

---

## 🌐 CDN & ДОМЕН

### ⚡ 1. CLOUDFLARE - CDN
**Сілтеме:** https://cloudflare.com

**Қадамдар:**
1. **Тіркелу:** https://dash.cloudflare.com/sign-up
2. **Домен қосу:** "Add site"
3. **DNS орнату:** Nameservers өзгерту
4. **API Token:** My Profile → API Tokens

**.env файлына қосу:**
\`\`\`bash
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ZONE_ID=your_zone_id
\`\`\`

---

### 🌍 2. VERCEL - ХОСТИНГ
**Сілтеме:** https://vercel.com

**Қадамдар:**
1. **GitHub арқылы кіру:** https://vercel.com
2. **Settings → Tokens**
3. **"Create Token"**

**.env файлына қосу:**
\`\`\`bash
VERCEL_TOKEN=your_vercel_token
\`\`\`

---

## 📋 ТОЛЫҚ .ENV ФАЙЛЫ

\`\`\`bash
# === САҚТАУ ПРОВАЙДЕРЛЕРІ (55GB ТЕГІН!) ===
MEGA_EMAIL=your_email@example.com
MEGA_PASSWORD=your_password

GOOGLE_DRIVE_CLIENT_ID=your_client_id.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret
GOOGLE_DRIVE_REFRESH_TOKEN=your_refresh_token

CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=mobframe-storage

BACKBLAZE_APPLICATION_KEY_ID=your_key_id
BACKBLAZE_APPLICATION_KEY=your_application_key
BACKBLAZE_BUCKET_ID=your_bucket_id

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# === ТӨЛЕМ ЖҮЙЕЛЕРІ ===
PAYBOX_MERCHANT_ID=your_merchant_id
PAYBOX_SECRET_KEY=your_secret_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

CLOUDPAYMENTS_PUBLIC_ID=pk_your_public_id
CLOUDPAYMENTS_API_SECRET=your_api_secret

# === AI ҚЫЗМЕТТЕРІ ===
OPENAI_API_KEY=sk-...
REPLICATE_API_TOKEN=r8_...
XAI_API_KEY=xai-...

# === EMAIL & ХАБАРЛАНДЫРУЛАР ===
RESEND_API_KEY=re_...
SENDGRID_API_KEY=SG....

FIREBASE_PROJECT_ID=mobframe-...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...

TELEGRAM_BOT_TOKEN=123456789:ABC...
TELEGRAM_CHAT_ID=your_chat_id

# === АНАЛИТИКА ===
GA_MEASUREMENT_ID=G-...
YANDEX_METRICA_ID=12345678

# === АУТЕНТИФИКАЦИЯ ===
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# === CDN & ХОСТИНГ ===
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ZONE_ID=your_zone_id
VERCEL_TOKEN=your_vercel_token
\`\`\`

## 🚀 ОРНАТУ ТӘРТІБІ

### 1️⃣ **БІРІНШІ КЕЗЕК (Міндетті):**
- ✅ Supabase (база деректер)
- ✅ Vercel (хостинг)
- ✅ Stripe (төлемдер)

### 2️⃣ **ЕКІНШІ КЕЗЕК (Сақтау):**
- ✅ MEGA (20GB)
- ✅ Google Drive (15GB)
- ✅ Cloudflare R2 (10GB)
- ✅ Backblaze B2 (10GB)

### 3️⃣ **ҮШІНШІ КЕЗЕК (Қосымша):**
- ✅ PayBox.kz (ҚР төлемдері)
- ✅ OpenAI (AI функциялар)
- ✅ Resend (Email)
- ✅ Firebase (Push)

## 📞 КӨМЕК КЕРЕК БОЛСА:

**Telegram:** @mobframe_support
**Email:** support@mobframe.kz
**Сайт:** https://mobframe.kz/help

---

**🎯 МАҚСАТ:** Барлық API кілттерін алып, 55GB тегін сақтау орнын толық пайдалану!
