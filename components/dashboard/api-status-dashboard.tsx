"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { apiManager, type APIStatus } from "@/lib/api-integration"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Settings,
  Database,
  CreditCard,
  Cloud,
} from "lucide-react"

interface APIStatusDashboardProps {
  onBack: () => void
}

export default function APIStatusDashboard({ onBack }: APIStatusDashboardProps) {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkAllAPIs()
  }, [])

  const checkAllAPIs = async () => {
    setLoading(true)
    try {
      const statuses = await apiManager.checkAllAPIs()
      setApiStatuses(statuses)
    } catch (error) {
      console.error("API тексеру қатесі:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "not_configured":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-600 text-white">Қосылған</Badge>
      case "error":
        return <Badge className="bg-red-600 text-white">Қате</Badge>
      case "not_configured":
        return <Badge className="bg-yellow-600 text-white">Орнатылмаған</Badge>
      default:
        return <Badge className="bg-gray-600 text-white">Белгісіз</Badge>
    }
  }

  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "supabase":
        return <Database className="w-6 h-6 text-green-400" />
      case "stripe":
      case "paybox":
        return <CreditCard className="w-6 h-6 text-blue-400" />
      default:
        return <Cloud className="w-6 h-6 text-gray-400" />
    }
  }

  const connectedCount = apiStatuses.filter((api) => api.status === "connected").length
  const totalCount = apiStatuses.length
  const progress = totalCount > 0 ? (connectedCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-xl font-semibold">API статусы</h1>
        <Button variant="ghost" size="sm" onClick={checkAllAPIs} disabled={loading} className="text-gray-400">
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Overview */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">Жалпы статус</h2>
          <span className="text-cyan-400 font-medium">
            {connectedCount}/{totalCount} қосылған
          </span>
        </div>
        <Progress value={progress} className="w-full mb-2" />
        <p className="text-gray-400 text-sm">
          {progress === 100
            ? "🎉 Барлық API-лар дұрыс жұмыс істейді!"
            : `${totalCount - connectedCount} API орнату керек`}
        </p>
      </div>

      {/* API Status Cards */}
      <div className="p-4 space-y-4">
        {apiStatuses.map((api) => (
          <Card key={api.name} className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getServiceIcon(api.name)}
                  <div>
                    <CardTitle className="text-white text-lg">{api.name}</CardTitle>
                    <p className="text-gray-400 text-sm">Соңғы тексеру: {api.lastChecked.toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(api.status)}
                  {getStatusBadge(api.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {api.error && (
                <div className="bg-red-900/20 border border-red-600 rounded-lg p-3 mb-3">
                  <p className="text-red-400 text-sm">{api.error}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {api.status === "connected" && "✅ Дұрыс жұмыс істейді"}
                  {api.status === "error" && "❌ Қате бар, тексеріңіз"}
                  {api.status === "not_configured" && "⚠️ Орнату керек"}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 bg-transparent">
                    <Settings className="w-3 h-3 mr-1" />
                    Орнату
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 bg-transparent">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Сайт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <div className="p-4">
        <Card className="bg-blue-900/20 border-blue-600">
          <CardContent className="p-4">
            <h3 className="text-blue-400 font-medium mb-2">💡 Көмек керек пе?</h3>
            <p className="text-gray-300 text-sm mb-3">API кілттерін орнату бойынша толық нұсқаулық алыңыз</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Нұсқаулықты ашу
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
