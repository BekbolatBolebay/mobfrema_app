"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ExternalLink, Copy, AlertCircle, HardDrive, CreditCard, Zap } from "lucide-react"

export default function ApiSetupWizard() {
  const [completedApis, setCompletedApis] = useState<Set<string>>(new Set())
  const [copiedText, setCopiedText] = useState<string>("")

  const apiCategories = [
    {
      id: "storage",
      name: "Сақтау провайдерлері",
      icon: HardDrive,
      color: "bg-green-600",
      totalSpace: "55GB ТЕГІН!",
      apis: [
        {
          id: "mega",
          name: "MEGA",
          space: "20GB",
          difficulty: "easy",
          time: "5 мин",
          url: "https://mega.nz/register",
          priority: "high",
          envVars: ["MEGA_EMAIL", "MEGA_PASSWORD"],
        },
        {
          id: "google-drive",
          name: "Google Drive",
          space: "15GB",
          difficulty: "hard",
          time: "15 мин",
          url: "https://console.cloud.google.com",
          priority: "high",
          envVars: ["GOOGLE_DRIVE_CLIENT_ID", "GOOGLE_DRIVE_CLIENT_SECRET", "GOOGLE_DRIVE_REFRESH_TOKEN"],
        },
        {
          id: "cloudflare-r2",
          name: "Cloudflare R2",
          space: "10GB",
          difficulty: "medium",
          time: "10 мин",
          url: "https://dash.cloudflare.com",
          priority: "high",
          envVars: ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_R2_ACCESS_KEY_ID", "CLOUDFLARE_R2_SECRET_ACCESS_KEY"],
        },
        {
          id: "backblaze-b2",
          name: "Backblaze B2",
          space: "10GB",
          difficulty: "medium",
          time: "10 мин",
          url: "https://www.backblaze.com/b2/sign-up.html",
          priority: "medium",
          envVars: ["BACKBLAZE_APPLICATION_KEY_ID", "BACKBLAZE_APPLICATION_KEY", "BACKBLAZE_BUCKET_ID"],
        },
        {
          id: "supabase",
          name: "Supabase",
          space: "1GB",
          difficulty: "easy",
          time: "3 мин",
          url: "https://supabase.com",
          priority: "high",
          envVars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
        },
      ],
    },
    {
      id: "payments",
      name: "Төлем жүйелері",
      icon: CreditCard,
      color: "bg-blue-600",
      totalSpace: "Халықаралық төлемдер",
      apis: [
        {
          id: "stripe",
          name: "Stripe",
          space: "Халықаралық",
          difficulty: "easy",
          time: "5 мин",
          url: "https://stripe.com",
          priority: "high",
          envVars: ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
        },
        {
          id: "paybox",
          name: "PayBox.kz",
          space: "Қазақстан",
          difficulty: "hard",
          time: "1-3 күн",
          url: "https://paybox.kz/ru/connect",
          priority: "medium",
          envVars: ["PAYBOX_MERCHANT_ID", "PAYBOX_SECRET_KEY"],
        },
        {
          id: "cloudpayments",
          name: "CloudPayments",
          space: "ТМД",
          difficulty: "medium",
          time: "1-2 күн",
          url: "https://cloudpayments.kz/Registration",
          priority: "low",
          envVars: ["CLOUDPAYMENTS_PUBLIC_ID", "CLOUDPAYMENTS_API_SECRET"],
        },
      ],
    },
    {
      id: "ai",
      name: "AI қызметтері",
      icon: Zap,
      color: "bg-purple-600",
      totalSpace: "Ақылды функциялар",
      apis: [
        {
          id: "openai",
          name: "OpenAI",
          space: "$5 тегін",
          difficulty: "easy",
          time: "3 мин",
          url: "https://platform.openai.com",
          priority: "medium",
          envVars: ["OPENAI_API_KEY"],
        },
        {
          id: "replicate",
          name: "Replicate",
          space: "$10/ай",
          difficulty: "easy",
          time: "2 мин",
          url: "https://replicate.com",
          priority: "low",
          envVars: ["REPLICATE_API_TOKEN"],
        },
        {
          id: "xai",
          name: "xAI (Grok)",
          space: "$25 тегін",
          difficulty: "easy",
          time: "3 мин",
          url: "https://x.ai/api",
          priority: "low",
          envVars: ["XAI_API_KEY"],
        },
      ],
    },
  ]

  const toggleApiCompletion = (apiId: string) => {
    const newCompleted = new Set(completedApis)
    if (newCompleted.has(apiId)) {
      newCompleted.delete(apiId)
    } else {
      newCompleted.add(apiId)
    }
    setCompletedApis(newCompleted)
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-600"
      case "medium":
        return "bg-yellow-600"
      case "hard":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-400 text-red-400"
      case "medium":
        return "border-yellow-400 text-yellow-400"
      case "low":
        return "border-green-400 text-green-400"
      default:
        return "border-gray-400 text-gray-400"
    }
  }

  const totalApis = apiCategories.flatMap((cat) => cat.apis).length
  const completedCount = completedApis.size
  const progress = (completedCount / totalApis) * 100

  return (
    <div className="space-y-6">
      {/* Жалпы прогресс */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium">API орнату прогрессі</h3>
            <span className="text-cyan-400 text-sm">
              {completedCount}/{totalApis}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-gray-400 text-xs mt-2">
            {progress === 100 ? "Барлық API кілттер орнатылды! 🎉" : "Сақтау провайдерлерінен бастаңыз"}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="storage" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          {apiCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <TabsTrigger key={category.id} value={category.id} className="text-white">
                <IconComponent className="w-4 h-4 mr-2" />
                {category.name}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {apiCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <category.icon className="w-5 h-5 mr-2 text-cyan-400" />
                  {category.name}
                  <Badge className={`ml-2 ${category.color}`}>{category.totalSpace}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.apis.map((api) => (
                  <div
                    key={api.id}
                    className={`p-4 rounded-lg border transition-all ${
                      completedApis.has(api.id)
                        ? "bg-green-900/20 border-green-600"
                        : "bg-gray-700 border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleApiCompletion(api.id)}
                          className={completedApis.has(api.id) ? "text-green-400" : "text-gray-400"}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <div>
                          <h4 className="text-white font-medium">{api.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getDifficultyColor(api.difficulty)} size="sm">
                              {api.difficulty}
                            </Badge>
                            <span className="text-gray-400 text-xs">{api.time}</span>
                            <Badge variant="outline" className={getPriorityColor(api.priority)} size="sm">
                              {api.priority === "high" ? "Міндетті" : api.priority === "medium" ? "Маңызды" : "Қосымша"}
                            </Badge>
                            <Badge variant="outline" className="border-cyan-400 text-cyan-400" size="sm">
                              {api.space}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(api.url, "_blank")}
                        className="border-cyan-400 text-cyan-400"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Алу
                      </Button>
                    </div>

                    {/* Environment variables */}
                    <div className="space-y-2">
                      <p className="text-gray-400 text-xs">Environment variables:</p>
                      <div className="grid grid-cols-1 gap-1">
                        {api.envVars.map((envVar) => (
                          <div key={envVar} className="flex items-center justify-between bg-gray-800 rounded p-2">
                            <code className="text-cyan-400 text-xs">{envVar}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(envVar)}
                              className="text-gray-400 hover:text-white"
                            >
                              {copiedText === envVar ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Келесі қадамдар */}
      <Card className="bg-blue-900/20 border-blue-600">
        <CardContent className="p-4">
          <h3 className="text-blue-400 font-medium mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Келесі қадамдар:
          </h3>
          <div className="space-y-1 text-sm text-gray-300">
            {completedCount === 0 && <p>1. MEGA-дан бастаңыз - ең оңай және 20GB тегін орын!</p>}
            {completedCount > 0 && completedCount < 3 && (
              <p>2. Supabase және Stripe қосыңыз - негізгі функциялар үшін</p>
            )}
            {completedCount >= 3 && completedCount < 5 && <p>3. Қалған сақтау провайдерлерін қосып, 55GB толтырыңыз</p>}
            {completedCount >= 5 && <p>4. Керемет! Енді AI және қосымша қызметтерді қосуға болады</p>}
          </div>
        </CardContent>
      </Card>

      {/* Толық .env файлы */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Толық .env файлы
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generateEnvFile())}
              className="text-xs bg-transparent"
            >
              <Copy className="w-3 h-3 mr-1" />
              Көшіру
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs text-gray-300 bg-gray-900 p-3 rounded overflow-x-auto">{generateEnvFile()}</pre>
        </CardContent>
      </Card>
    </div>
  )

  function generateEnvFile() {
    return `# === САҚТАУ ПРОВАЙДЕРЛЕРІ (55GB ТЕГІН!) ===
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
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

PAYBOX_MERCHANT_ID=your_merchant_id
PAYBOX_SECRET_KEY=your_secret_key

CLOUDPAYMENTS_PUBLIC_ID=pk_your_public_id
CLOUDPAYMENTS_API_SECRET=your_api_secret

# === AI ҚЫЗМЕТТЕРІ ===
OPENAI_API_KEY=sk-...
REPLICATE_API_TOKEN=r8_...
XAI_API_KEY=xai-...

# === EMAIL & ХАБАРЛАНДЫРУЛАР ===
RESEND_API_KEY=re_...
TELEGRAM_BOT_TOKEN=123456789:ABC...

# === АНАЛИТИКА ===
GA_MEASUREMENT_ID=G-...
YANDEX_METRICA_ID=12345678

# === АУТЕНТИФИКАЦИЯ ===
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# === CDN & ХОСТИНГ ===
CLOUDFLARE_API_TOKEN=your_api_token
VERCEL_TOKEN=your_vercel_token`
  }
}
