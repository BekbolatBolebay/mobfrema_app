"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Upload, DollarSign, Clock, FileText, Camera, ArrowLeft } from "lucide-react"

interface JobApplicationProps {
  job: any
  onBack: () => void
}

export default function JobApplication({ job, onBack }: JobApplicationProps) {
  const [proposal, setProposal] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [portfolio, setPortfolio] = useState<File[]>([])

  const handleSubmit = () => {
    alert("Өтініш жіберілді! Клиент сізбен байланысқа шығады.")
    onBack()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-white text-lg font-semibold">Өтініш жіберу</h1>
      </div>

      {/* Job Summary */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={job.client.avatar || "/placeholder.svg"} />
              <AvatarFallback>{job.client.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-white font-medium">{job.title}</h3>
              <p className="text-gray-400 text-sm">
                {job.client.name} • {job.budget}
              </p>
            </div>
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              {job.category}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Application Form */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Ұсыныс жазу</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Ұсыныс хаты</label>
            <Textarea
              placeholder="Неліктен сіз бұл жұмысқа сай екеніңізді жазыңыз..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              rows={4}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Баға ұсынысы
              </label>
              <Input
                placeholder="150,000 ₸"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Орындау мерзімі
              </label>
              <Input
                placeholder="5 күн"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              Портфолио тіркеу
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm mb-2">Жұмыс үлгілерін жүктеңіз</p>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 bg-transparent">
                <Camera className="w-4 h-4 mr-1" />
                Файл таңдау
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex space-x-3">
        <Button variant="outline" onClick={onBack} className="flex-1 border-gray-600 text-gray-400 bg-transparent">
          Артқа
        </Button>
        <Button onClick={handleSubmit} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
          Өтініш жіберу
        </Button>
      </div>
    </div>
  )
}
