"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, DollarSign, MapPin, Clock, Zap, Plus, X } from "lucide-react"

interface JobPostFormProps {
  onBack: () => void
}

export default function JobPostForm({ onBack }: JobPostFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [location, setLocation] = useState("")
  const [deadline, setDeadline] = useState("")
  const [category, setCategory] = useState("")
  const [urgent, setUrgent] = useState(false)
  const [requirements, setRequirements] = useState<string[]>([])
  const [deliverables, setDeliverables] = useState<string[]>([])
  const [newRequirement, setNewRequirement] = useState("")
  const [newDeliverable, setNewDeliverable] = useState("")

  const categories = ["Фотография", "Видеосъемка", "Монтаж", "Дизайн", "SMM", "Анимация", "Дрон съемка", "Стрим"]

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()])
      setNewDeliverable("")
    }
  }

  const removeDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    alert("Жұмыс жарияланды! Мобилографтар өтініш жібере бастайды.")
    onBack()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-white text-lg font-semibold">Жұмыс жариялау</h1>
      </div>

      {/* Basic Info */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Негізгі ақпарат</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Жұмыс атауы</label>
            <Input
              placeholder="Мысалы: Той фотосессиясы керек"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Сипаттама</label>
            <Textarea
              placeholder="Жұмыс туралы толық ақпарат жазыңыз..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Категория</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Таңдаңыз" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Орналасқан жері
              </label>
              <Input
                placeholder="Алматы"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Бюджет
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
                Мерзім
              </label>
              <Input
                placeholder="3 күн"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-white text-sm font-medium">Шұғыл жұмыс</label>
              <p className="text-gray-400 text-xs">Жоғары приоритет беріледі</p>
            </div>
            <Switch checked={urgent} onCheckedChange={setUrgent} />
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Талаптар</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Талап қосу..."
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addRequirement()}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Button onClick={addRequirement} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                <span className="text-white text-sm">{req}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRequirement(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deliverables */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Нәтиже</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Нәтиже қосу..."
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addDeliverable()}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Button onClick={addDeliverable} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {deliverables.map((del, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                <span className="text-white text-sm">{del}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDeliverable(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tips */}
      <Card className="bg-blue-900/20 border-blue-600">
        <CardContent className="p-4">
          <h3 className="text-blue-400 font-medium mb-2">💡 Баға кеңестері:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Фотосессия: 50,000-200,000 ₸</li>
            <li>• Видео түсіру: 100,000-500,000 ₸</li>
            <li>• Монтаж: 30,000-150,000 ₸</li>
            <li>• SMM контент: 80,000-300,000 ₸</li>
          </ul>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex space-x-3">
        <Button variant="outline" onClick={onBack} className="flex-1 border-gray-600 text-gray-400 bg-transparent">
          Артқа
        </Button>
        <Button onClick={handleSubmit} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
          {urgent && <Zap className="w-4 h-4 mr-1" />}
          Жариялау
        </Button>
      </div>
    </div>
  )
}
