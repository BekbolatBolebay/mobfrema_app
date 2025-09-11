"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MultiProviderUploader, SmartStorageRouter } from "@/lib/storage/multi-provider-uploader"
import { Upload, HardDrive, Zap, CheckCircle, AlertCircle } from "lucide-react"

export default function LargeFileUploader() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadResults, setUploadResults] = useState<any[]>([])

  const uploader = new MultiProviderUploader()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setUploadResults([])

    // Файл үшін ең жақсы провайдерді көрсету
    const recommendedProvider = SmartStorageRouter.selectProvider(file.size, file.type)
    console.log("Ұсынылатын провайдер:", recommendedProvider)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setProgress(0)

    try {
      // Прогресс симуляциясы
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      // Файлды жүктеу (резервті көшірмелермен)
      const results = await uploader.uploadWithBackup(selectedFile)

      clearInterval(progressInterval)
      setProgress(100)
      setUploadResults(results)

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

  const getProviderColor = (provider: string) => {
    const colors = {
      "Cloudflare R2": "bg-orange-600",
      "Backblaze B2": "bg-red-600",
      "Google Drive API": "bg-blue-600",
      "MEGA API": "bg-green-600",
      "Supabase Storage": "bg-purple-600",
    }
    return colors[provider] || "bg-gray-600"
  }

  return (
    <div className="space-y-4">
      {/* Файл таңдау */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <HardDrive className="w-5 h-5 mr-2 text-cyan-400" />
            Үлкен файл жүктеу
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Барлығы {SmartStorageRouter.getTotalFreeStorage()}GB тегін орын қолжетімді!
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
              id="large-file-upload"
            />
            <label htmlFor="large-file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Кез келген файлды таңдаңыз</p>
              <p className="text-gray-500 text-xs mt-1">5GB дейін қолдау</p>
            </label>
          </div>

          {/* Таңдалған файл ақпараты */}
          {selectedFile && (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{selectedFile.name}</h4>
                  <p className="text-gray-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                </div>
                <div className="text-right">
                  <Badge
                    className={getProviderColor(
                      SmartStorageRouter.selectProvider(selectedFile.size, selectedFile.type).name,
                    )}
                  >
                    {SmartStorageRouter.selectProvider(selectedFile.size, selectedFile.type).name}
                  </Badge>
                  <p className="text-gray-400 text-xs mt-1">Ұсынылатын провайдер</p>
                </div>
              </div>
            </div>
          )}

          {/* Жүктеу батырмасы */}
          {selectedFile && !uploading && uploadResults.length === 0 && (
            <Button onClick={handleUpload} className="w-full bg-cyan-600 hover:bg-cyan-700">
              <Zap className="w-4 h-4 mr-2" />
              Жүктеу (резервті көшірмелермен)
            </Button>
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
          {uploadResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium">Жүктеу нәтижелері:</h4>
              {uploadResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 rounded p-3">
                  <div className="flex items-center">
                    {result.success ? (
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                    )}
                    <span className="text-white text-sm">{result.provider}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {result.success ? (
                      <Badge className="bg-green-600">Сәтті</Badge>
                    ) : (
                      <Badge className="bg-red-600">Сәтсіз</Badge>
                    )}
                    {result.success && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(result.url)}
                        className="text-xs"
                      >
                        URL көшіру
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Провайдерлер ақпараты */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm">Қолжетімді тегін сақтау:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Cloudflare R2:</span>
              <span className="text-cyan-400">10GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Backblaze B2:</span>
              <span className="text-cyan-400">10GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Google Drive:</span>
              <span className="text-cyan-400">15GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">MEGA:</span>
              <span className="text-cyan-400">20GB</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="flex justify-between font-medium">
              <span className="text-white">Барлығы:</span>
              <span className="text-green-400">55GB ТЕГІН!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
