"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, Globe } from "lucide-react"

export default function DomainSetup() {
  const [selectedOption, setSelectedOption] = useState<string>("vercel")

  const options = [
    {
      id: "vercel",
      name: "Vercel тегін домені",
      domain: "mobframe.vercel.app",
      price: "ТЕГІН",
      setup: "1 минут",
      pros: ["Автоматты SSL", "Жылдам CDN", "Лезде орнату"],
      cons: ["Vercel брендингі"],
      recommended: true,
    },
    {
      id: "xyz",
      name: ".xyz домені",
      domain: "mobframe.xyz",
      price: "$1.99/жыл",
      setup: "5 минут",
      pros: ["Арзан", "Заманауи", "Кәсіби"],
      cons: ["Жаңа TLD"],
      recommended: false,
    },
    {
      id: "kz",
      name: ".kz домені",
      domain: "mobframe.kz",
      price: "$20/жыл",
      setup: "1-2 күн",
      pros: ["Жергілікті", "SEO жақсы", "Сенімді"],
      cons: ["Қымбат", "Құжаттар керек"],
      recommended: false,
    },
  ]

  const handleSetup = (optionId: string) => {
    const setupInstructions = {
      vercel: "1. Vercel-ге деплой жасаңыз\n2. Автоматты домен беріледі\n3. SSL автоматты орнайды",
      xyz: "1. Namecheap.com-ға кіріңіз\n2. .xyz домен іздеңіз\n3. Сатып алыңыз\n4. Vercel-ге қосыңыз",
      kz: "1. nic.kz сайтына кіріңіз\n2. Құжаттарды дайындаңыз\n3. Домен тіркеңіз\n4. DNS орнатыңыз",
    }

    alert(`${optionId} домені орнату:\n\n${setupInstructions[optionId]}`)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Домен таңдау</h2>
        <p className="text-gray-400">MobFrame платформасы үшін ең жақсы опцияны таңдаңыз</p>
      </div>

      <div className="grid gap-4">
        {options.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all ${
              selectedOption === option.id
                ? "bg-gray-700 border-cyan-400"
                : "bg-gray-800 border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{option.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  {option.recommended && <Badge className="bg-cyan-600">Ұсынылады</Badge>}
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    {option.price}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                <Globe className="w-4 h-4 mr-2" />
                <span className="font-mono">{option.domain}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-400">Орнату уақыты: {option.setup}</div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-green-400 text-sm font-medium mb-1">Артықшылықтары:</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {option.pros.map((pro, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-1" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-yellow-400 text-sm font-medium mb-1">Кемшіліктері:</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {option.cons.map((con, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-3 h-3 text-yellow-400 mr-1">⚠</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedOption === option.id && (
                <Button onClick={() => handleSetup(option.id)} className="w-full bg-cyan-600 hover:bg-cyan-700 mt-3">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Орнатуды бастау
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ұсыныс */}
      <Card className="bg-blue-900/20 border-blue-600">
        <CardContent className="p-4">
          <h3 className="text-blue-400 font-medium mb-2">💡 Менің ұсынысым:</h3>
          <p className="text-gray-300 text-sm">
            <strong>Бастау үшін:</strong> Vercel тегін домені (mobframe.vercel.app)
            <br />
            <strong>Кейін:</strong> Табысты болғанда .kz немесе .com сатып алыңыз
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
