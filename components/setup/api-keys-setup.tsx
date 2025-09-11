"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ExternalLink, Key, AlertCircle } from "lucide-react"

export default function ApiKeysSetup() {
  const [completedKeys, setCompletedKeys] = useState<Set<string>>(new Set())

  const keyCategories = [
    {
      name: "Негізгі платформалар",
      priority: "high",
      keys: [
        {
          id: "supabase",
          name: "Supabase",
          url: "https://supabase.com",
          difficulty: "easy",
          time: "5 мин",
          required: true,
        },
        {
          id: "vercel",
          name: "Vercel",
          url: "https://vercel.com",
          difficulty: "easy",
          time: "3 мин",
          required: true,
        },
      ],
    },
    {
      name: "Төлем жүйелері",
      priority: "high",
      keys: [
        {
          id: "stripe",
          name: "Stripe",
          url: "https://stripe.com",
          difficulty: "medium",
          time: "10 мин",
          required: true,
        },
        {
          id: "paybox",
          name: "PayBox.kz",
          url: "https://paybox.kz",
          difficulty: "hard",
          time: "1-3 күн",
          required: false,
        },
      ],
    },
    {
      name: "Файл сақтау",
      priority: "medium",
      keys: [
        {
          id: "cloudflare",
          name: "Cloudflare R2",
          url: "https://cloudflare.com",
          difficulty: "medium",
          time: "15 мин",
          required: false,
        },
      ],
    },
  ]

  const toggleKeyCompletion = (keyId: string) => {
    const newCompleted = new Set(completedKeys)
    if (newCompleted.has(keyId)) {
      newCompleted.delete(keyId)
    } else {
      newCompleted.add(keyId)
    }
    setCompletedKeys(newCompleted)
  }

  const totalKeys = keyCategories.flatMap((cat) => cat.keys).length
  const completedCount = completedKeys.size
  const progress = (completedCount / totalKeys) * 100

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

  return (
    <div className="space-y-6">
      {/* Прогресс */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium">API кілттерін орнату</h3>
            <span className="text-cyan-400 text-sm">
              {completedCount}/{totalKeys}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-gray-400 text-xs mt-2">
            {progress === 100 ? "Барлық кілттер орнатылды! 🎉" : "Негізгі кілттерден бастаңыз"}
          </p>
        </CardContent>
      </Card>

      {/* Категориялар */}
      {keyCategories.map((category) => (
        <Card key={category.name} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Key className="w-5 h-5 mr-2 text-cyan-400" />
              {category.name}
              <Badge
                variant="outline"
                className={`ml-2 ${
                  category.priority === "high" ? "border-red-400 text-red-400" : "border-yellow-400 text-yellow-400"
                }`}
              >
                {category.priority === "high" ? "Міндетті" : "Қосымша"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {category.keys.map((key) => (
              <div
                key={key.id}
                className={`p-3 rounded-lg border transition-all ${
                  completedKeys.has(key.id)
                    ? "bg-green-900/20 border-green-600"
                    : "bg-gray-700 border-gray-600 hover:border-gray-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyCompletion(key.id)}
                      className={completedKeys.has(key.id) ? "text-green-400" : "text-gray-400"}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <div>
                      <h4 className="text-white font-medium">{key.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getDifficultyColor(key.difficulty)} size="sm">
                          {key.difficulty}
                        </Badge>
                        <span className="text-gray-400 text-xs">{key.time}</span>
                        {key.required && (
                          <Badge variant="outline" className="border-red-400 text-red-400" size="sm">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Міндетті
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(key.url, "_blank")}
                    className="border-cyan-400 text-cyan-400"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Алу
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Келесі қадам */}
      <Card className="bg-blue-900/20 border-blue-600">
        <CardContent className="p-4">
          <h3 className="text-blue-400 font-medium mb-2">💡 Келесі қадам:</h3>
          <p className="text-gray-300 text-sm">
            {completedCount === 0 && "Supabase және Vercel кілттерінен бастаңыз - олар ең оңай!"}
            {completedCount > 0 && completedCount < 3 && "Stripe кілтін қосыңыз - төлемдер үшін керек"}
            {completedCount >= 3 && "Керемет! Енді қосымша кілттерді қосуға болады"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
