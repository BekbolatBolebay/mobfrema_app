"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  ExternalLink,
  Copy,
  Database,
  CreditCard,
  Cloud,
  Zap,
  Globe,
} from "lucide-react"

interface CompleteSetupGuideProps {
  onBack: () => void
}

export default function CompleteSetupGuide({ onBack }: CompleteSetupGuideProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const setupSteps = {
    essential: [
      {
        id: "supabase",
        title: "Supabase - База деректер",
        description: "Аутентификация, база деректер және файл сақтау",
        icon: Database,
        priority: "Жоғары",
        time: "10 мин",
        free: "500MB база + 1GB файл",
        url: "https://supabase.com",
        keys: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
        instructions: [
          "supabase.com сайтына кіріңіз",
          "GitHub арқылы тіркеліңіз",
          "New project түймесін басыңыз",
          "Project name: mobframe-kz",
          "Database password жасаңыз",
          "Settings > API бөлімінен кілттерді көшіріңіз",
        ],
      },
      {
        id: "vercel",
        title: "Vercel - Хостинг",
        description: "Сайтты интернетке шығару",
        icon: Globe,
        priority: "Жоғары",
        time: "5 мин",
        free: "Шексіз деплой + 100GB трафик",
        url: "https://vercel.com",
        keys: ["VERCEL_TOKEN"],
        instructions: [
          "vercel.com сайтына кіріңіз",
          "GitHub арқылы тіркеліңіз",
          "Import Git Repository",
          "GitHub репозиторийіңізді таңдаңыз",
          "Environment Variables қосыңыз",
          "Deploy түймесін басыңыз",
        ],
      },
    ],
    payments: [
      {
        id: "stripe",
        title: "Stripe - Халықаралық төлемдер",
        description: "Visa, Mastercard, Apple Pay, Google Pay",
        icon: CreditCard,
        priority: "Орташа",
        time: "15 мин",
        free: "Тест режимі тегін",
        url: "https://stripe.com",
        keys: ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY"],
        instructions: [
          "stripe.com сайтына кіріңіз",
          "Create account түймесін басыңыз",
          "Business type: Individual",
          "Country: Kazakhstan",
          "Developers > API keys бөлімінен кілттерді алыңыз",
          "Test mode-та жұмыс істеңіз",
        ],
      },
      {
        id: "paybox",
        title: "PayBox.kz - Қазақстан төлемдері",
        description: "Kaspi, Halyk, Сбер және басқа банктер",
        icon: CreditCard,
        priority: "Жоғары",
        time: "1-3 күн",
        free: "Тест режимі тегін",
        url: "https://paybox.kz/ru/connect",
        keys: ["PAYBOX_MERCHANT_ID", "PAYBOX_SECRET_KEY"],
        instructions: [
          "paybox.kz/ru/connect сайтына кіріңіз",
          "Заявка жіберіңіз",
          "Құжаттарды дайындаңыз (ЖСН, банк деректері)",
          "1-3 күн күтіңіз",
          "Тест кілттерін алыңыз",
          "Интеграцияны тестілеңіз",
        ],
      },
    ],
    storage: [
      {
        id: "mega",
        title: "MEGA - 20GB тегін",
        description: "Ең көп тегін орын",
        icon: Cloud,
        priority: "Жоғары",
        time: "3 мин",
        free: "20GB тегін",
        url: "https://mega.nz/register",
        keys: ["MEGA_EMAIL", "MEGA_PASSWORD"],
        instructions: [
          "mega.nz/register сайтына кіріңіз",
          "Email және құпия сөз енгізіңіз",
          "Email растаңыз",
          "Логин және паролді .env файлына қосыңыз",
        ],
      },
      {
        id: "google-drive",
        title: "Google Drive - 15GB тегін",
        description: "Жылдам және сенімді",
        icon: Cloud,
        priority: "Орташа",
        time: "10 мин",
        free: "15GB тегін",
        url: "https://console.cloud.google.com",
        keys: ["GOOGLE_DRIVE_CLIENT_ID", "GOOGLE_DRIVE_CLIENT_SECRET"],
        instructions: [
          "console.cloud.google.com сайтына кіріңіз",
          "New Project жасаңыз",
          "APIs & Services > Enable APIs",
          "Google Drive API қосыңыз",
          "Credentials > Create Credentials > OAuth 2.0",
          "Client ID және Secret алыңыз",
        ],
      },
      {
        id: "cloudflare-r2",
        title: "Cloudflare R2 - 10GB тегін",
        description: "Ең жылдам CDN",
        icon: Zap,
        priority: "Орташа",
        time: "8 мин",
        free: "10GB тегін",
        url: "https://dash.cloudflare.com",
        keys: ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_R2_ACCESS_KEY_ID"],
        instructions: [
          "dash.cloudflare.com сайтына кіріңіз",
          "R2 Object Storage бөлімін ашыңыз",
          "Create bucket түймесін басыңыз",
          "Manage R2 API tokens",
          "Create API token",
          "Account ID және кілттерді көшіріңіз",
        ],
      },
    ],
  }

  const allSteps = [...setupSteps.essential, ...setupSteps.payments, ...setupSteps.storage]
  const progress = (completedSteps.size / allSteps.length) * 100

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId)
    } else {
      newCompleted.add(stepId)
    }
    setCompletedSteps(newCompleted)
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    alert("Көшірілді!")
  }

  const renderStepCard = (step: any) => (
    <Card key={step.id} className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleStep(step.id)}
              className={`p-0 ${completedSteps.has(step.id) ? "text-green-400" : "text-gray-400"}`}
            >
              {completedSteps.has(step.id) ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </Button>
            <div className="flex items-center space-x-2">
              <step.icon className="w-5 h-5 text-cyan-400" />
              <div>
                <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant={step.priority === "Жоғары" ? "destructive" : "secondary"}
              className={step.priority === "Жоғары" ? "bg-red-600" : "bg-yellow-600"}
            >
              {step.priority}
            </Badge>
            <p className="text-gray-400 text-xs mt-1">{step.time}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-400 text-sm font-medium">🎁 {step.free}</p>
            <a
              href={step.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 text-sm hover:underline flex items-center"
            >
              {step.url} <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-2">Қадамдар:</h4>
          <ol className="text-gray-300 text-sm space-y-1">
            {step.instructions.map((instruction: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-cyan-400 mr-2">{index + 1}.</span>
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-2">Кілттер (.env файлына қосыңыз):</h4>
          <div className="space-y-2">
            {step.keys.map((key: string) => (
              <div key={key} className="flex items-center space-x-2">
                <code className="bg-gray-700 text-cyan-400 px-2 py-1 rounded text-xs flex-1">{key}=your_key_here</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`${key}=`)}
                  className="text-gray-400 p-1"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-xl font-semibold">API кілттер нұсқаулығы</h1>
        <Badge variant="outline" className="border-cyan-400 text-cyan-400">
          {completedSteps.size}/{allSteps.length}
        </Badge>
      </div>

      {/* Progress */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">Орындалу барысы</span>
          <span className="text-cyan-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full" />
        <p className="text-gray-400 text-sm mt-2">
          {completedSteps.size} / {allSteps.length} қадам орындалды
        </p>
      </div>

      {/* Content */}
      <Tabs defaultValue="essential" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 mx-4 mt-4">
          <TabsTrigger value="essential" className="text-white">
            Міндетті ({setupSteps.essential.length})
          </TabsTrigger>
          <TabsTrigger value="payments" className="text-white">
            Төлемдер ({setupSteps.payments.length})
          </TabsTrigger>
          <TabsTrigger value="storage" className="text-white">
            Сақтау ({setupSteps.storage.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="essential" className="p-4 space-y-4">
          <div className="mb-4">
            <h2 className="text-white text-lg font-semibold mb-2">🚀 Міндетті платформалар</h2>
            <p className="text-gray-400 text-sm">Бұл платформалар сайттың жұмыс істеуі үшін міндетті түрде қажет</p>
          </div>
          {setupSteps.essential.map(renderStepCard)}
        </TabsContent>

        <TabsContent value="payments" className="p-4 space-y-4">
          <div className="mb-4">
            <h2 className="text-white text-lg font-semibold mb-2">💳 Төлем жүйелері</h2>
            <p className="text-gray-400 text-sm">Клиенттерден төлем алу үшін кемінде біреуін міндетті түрде қосыңыз</p>
          </div>
          {setupSteps.payments.map(renderStepCard)}
        </TabsContent>

        <TabsContent value="storage" className="p-4 space-y-4">
          <div className="mb-4">
            <h2 className="text-white text-lg font-semibold mb-2">☁️ Файл сақтау (55GB тегін!)</h2>
            <p className="text-gray-400 text-sm">
              Видео мен фотоларды сақтау үшін. Барлығын қосып, 55GB тегін орын алыңыз!
            </p>
          </div>
          {setupSteps.storage.map(renderStepCard)}
        </TabsContent>
      </Tabs>

      {/* Summary */}
      {completedSteps.size > 0 && (
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <Card className="bg-green-900/20 border-green-600">
            <CardContent className="p-4">
              <h3 className="text-green-400 font-medium mb-2">🎉 Керемет!</h3>
              <p className="text-gray-300 text-sm">
                {completedSteps.size} қадам орындалды.
                {completedSteps.size === allSteps.length
                  ? " Барлық интеграциялар дайын!"
                  : ` Тағы ${allSteps.length - completedSteps.size} қадам қалды.`}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
