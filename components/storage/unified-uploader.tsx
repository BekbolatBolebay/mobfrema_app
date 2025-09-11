"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { storageManager } from "@/lib/storage/unified-storage-manager"
import { Upload, HardDrive, Zap, CheckCircle, Cloud, Database, Activity, BarChart3 } from "lucide-react"

export default function UnifiedUploader() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadResults, setUploadResults] = useState<any>(null)
  const [storageStats, setStorageStats] = useState<any>(null)
  const [providersHealth, setProvidersHealth] = useState<any[]>([])

  useEffect(() => {
    // Сақтау статистикасын жүктеу
    const stats = storageManager.getStorageStats()
    setStorageStats(stats)

    // Провайдерлердің денсаулығын тексеру
    checkProvidersHealth()
  }, [])

  const checkProvidersHealth = async () => {
    const health = await storageManager.checkProvidersHealth()
    setProvidersHealth(health)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setUploadResults(null)

    // Ұсынылатын провайдерді көрсету
    const recommended = storageManager.recommendProvider(file.size, file.type)
    console.log("Ұсынылатын провайдер:", recommended)
  }

  const handleUpload = async (priority: "speed" | "space" | "reliability" = "space") => {
    if (!selectedFile) return

    setUploading(true)
    setProgress(0)

    try {
      // Прогресс симуляциясы
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90))
      }, 200)

      // Файлды жүктеу
      const results = await storageManager.uploadFile(selectedFile, {
        priority,
        createBackups: true,
        maxBackups: 2,
      })

      clearInterval(progressInterval)
      setProgress(100)
      setUploadResults(results)

      // Статистиканы жаңарту
      const newStats = storageManager.getStorageStats()
      setStorageStats(newStats)

      console.log("Жүктеу нәтижелері:", results)
    } catch (error) {
      console.error("Жүктеу қатесі:", error)
      alert("Жүктеу кезінде қате орын алды")
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getProviderIcon = (provider: string) => {
    const icons = {
      MEGA: "🟢",
      "Google Drive": "🔵",
      "Cloudflare R2": "🟠",
      "Backblaze B2": "🔴",
      Supabase: "🟣",
    }
    return icons[provider] || "⚪"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "bg-green-600"
      case "warning":
        return "bg-yellow-600"
      case "full":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="upload" className="text-white">
            <Upload className="w-4 h-4 mr-2" />
            Жүктеу
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Статистика
          </TabsTrigger>
          <TabsTrigger value="health" className="text-white">
            <Activity className="w-4 h-4 mr-2" />
            Мониторинг
          </TabsTrigger>
        </TabsList>

        {/* ЖҮКТЕУ ТАБЫ */}
        <TabsContent value="upload" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Cloud className="w-5 h-5 mr-2 text-cyan-400" />
                Ақылды файл жүктеу
              </CardTitle>
              <p className="text-gray-400 text-sm">
                4 провайдер арқылы 55GB тегін орын! Автоматты резервті көшірмелер.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Файл таңдау */}
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="*/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                  id="unified-file-upload"
                />
                <label htmlFor="unified-file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Кез келген файлды таңдаңыз</p>
                  <p className="text-gray-500 text-xs mt-1">5GB дейін, автоматты провайдер таңдау</p>
                </label>
              </div>

              {/* Таңдалған файл */}
              {selectedFile && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{selectedFile.name}</h4>
                      <p className="text-gray-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <Badge className="bg-cyan-600">
                      {storageManager.recommendProvider(selectedFile.size, selectedFile.type)}
                    </Badge>
                  </div>

                  {/* Жүктеу опциялары */}
                  {!uploading && !uploadResults && (
                    <div className="grid grid-cols-3 gap-2">
                      <Button onClick={() => handleUpload("space")} className="bg-green-600 hover:bg-green-700 text-xs">
                        <HardDrive className="w-3 h-3 mr-1" />
                        Орын үнемдеу
                      </Button>
                      <Button onClick={() => handleUpload("speed")} className="bg-blue-600 hover:bg-blue-700 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Жылдамдық
                      </Button>
                      <Button
                        onClick={() => handleUpload("reliability")}
                        className="bg-purple-600 hover:bg-purple-700 text-xs"
                      >
                        <Database className="w-3 h-3 mr-1" />
                        Сенімділік
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Прогресс */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Жүктелуде...</span>
                    <span className="text-cyan-400">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {/* Нәтижелер */}
              {uploadResults && (
                <div className="space-y-3">
                  <h4 className="text-white font-medium">
                    Жүктеу аяқталды! {uploadResults.totalCopies} көшірме жасалды:
                  </h4>

                  {/* Негізгі көшірме */}
                  <div className="bg-green-900/20 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-white text-sm">
                          {getProviderIcon(uploadResults.primary.provider)} {uploadResults.primary.provider} (негізгі)
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(uploadResults.primary.url)}
                        className="text-xs"
                      >
                        URL көшіру
                      </Button>
                    </div>
                  </div>

                  {/* Резервті көшірмелер */}
                  {uploadResults.backups.map((backup: any, index: number) => (
                    <div key={index} className="bg-blue-900/20 border border-blue-600 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Database className="w-4 h-4 text-blue-400 mr-2" />
                          <span className="text-white text-sm">
                            {getProviderIcon(backup.provider)} {backup.provider} (резерв)
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigator.clipboard.writeText(backup.url)}
                          className="text-xs"
                        >
                          URL көшіру
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* СТАТИСТИКА ТАБЫ */}
        <TabsContent value="stats" className="space-y-4">
          {storageStats && (
            <>
              {/* Жалпы статистика */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Жалпы сақтау орны</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Барлығы:</span>
                      <span className="text-white">{storageStats.total.limit}GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Қолданылған:</span>
                      <span className="text-cyan-400">{storageStats.total.used.toFixed(2)}GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Қалған:</span>
                      <span className="text-green-400">{storageStats.total.available.toFixed(2)}GB</span>
                    </div>
                    <Progress value={storageStats.total.percentage} className="w-full mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Провайдерлер бойынша */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storageStats.providers.map((provider: any) => (
                  <Card key={provider.name} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium flex items-center">
                          {getProviderIcon(provider.name)} {provider.name}
                        </h4>
                        <Badge className={getStatusColor(provider.status)}>
                          {provider.status === "ok" ? "Жақсы" : provider.status === "warning" ? "Ескерту" : "Толы"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Лимит:</span>
                          <span className="text-white">{provider.limit}GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Қолданылған:</span>
                          <span className="text-cyan-400">{provider.used.toFixed(2)}GB</span>
                        </div>
                        <Progress value={provider.percentage} className="w-full mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* МОНИТОРИНГ ТАБЫ */}
        <TabsContent value="health" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Провайдерлердің жағдайы
                <Button onClick={checkProvidersHealth} size="sm" variant="outline" className="text-xs bg-transparent">
                  Жаңарту
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {providersHealth.map((provider) => (
                  <div key={provider.provider} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          provider.status === "healthy"
                            ? "bg-green-400"
                            : provider.status === "error"
                              ? "bg-red-400"
                              : "bg-yellow-400"
                        }`}
                      />
                      <span className="text-white">
                        {getProviderIcon(provider.provider)} {provider.provider}
                      </span>
                    </div>
                    <Badge
                      className={
                        provider.status === "healthy"
                          ? "bg-green-600"
                          : provider.status === "error"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                      }
                    >
                      {provider.status === "healthy"
                        ? "Жұмыс істейді"
                        : provider.status === "error"
                          ? "Қате"
                          : "Белгісіз"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
