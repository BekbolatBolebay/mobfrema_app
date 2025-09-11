"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gift, Users, Copy } from "lucide-react"
import { ViralMarketingService } from "@/lib/marketing/viral-features"

export default function ReferralSystem({ userId }: { userId: string }) {
  const [copied, setCopied] = useState(false)
  const referralCode = ViralMarketingService.generateReferralCode(userId)
  const referralLink = `https://mobframe.kz/register?ref=${referralCode}`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToSocial = (platform: string) => {
    const text = "MobFrame платформасына қосыл! Мобилографтар мен клиенттерді байланыстыратын ең жақсы орын 📸"
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + referralLink)}`,
      telegram: `https://t.me/share/url?url=${referralLink}&text=${encodeURIComponent(text)}`,
      instagram: `https://www.instagram.com/`, // Instagram Stories үшін
    }

    window.open(urls[platform], "_blank")
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Gift className="w-5 h-5 mr-2 text-cyan-400" />
          Досыңызды шақырыңыз
        </CardTitle>
        <p className="text-gray-400 text-sm">Әр досыңыз үшін 1000₸ бонус алыңыз! Олар да 1000₸ алады.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Реферальная ссылка */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Сіздің реферальдық сілтемеңіз:</label>
          <div className="flex space-x-2">
            <Input value={referralLink} readOnly className="bg-gray-700 border-gray-600 text-white" />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="border-cyan-400 text-cyan-400 bg-transparent"
            >
              {copied ? "Көшірілді!" : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Социальные сети */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Әлеуметтік желілерде бөлісу:</label>
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={() => shareToSocial("whatsapp")} className="bg-green-600 hover:bg-green-700">
              WhatsApp
            </Button>
            <Button onClick={() => shareToSocial("telegram")} className="bg-blue-600 hover:bg-blue-700">
              Telegram
            </Button>
            <Button onClick={() => shareToSocial("instagram")} className="bg-pink-600 hover:bg-pink-700">
              Instagram
            </Button>
          </div>
        </div>

        {/* Статистика */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-gray-300 text-sm">Шақырылған достар:</span>
            </div>
            <span className="text-cyan-400 font-semibold">0</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-300 text-sm">Жалпы бонус:</span>
            <span className="text-green-400 font-semibold">0₸</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
