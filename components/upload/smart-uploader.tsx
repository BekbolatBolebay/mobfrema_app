"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SmartCompressionService } from "@/lib/storage/smart-compression"
import { FreeStorageStrategy } from "@/lib/storage/free-storage-strategy"
import { Upload, ImageIcon, Video, Zap } from "lucide-react"

export default function SmartUploader() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [compressionSavings, setCompressionSavings] = useState<number | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      const originalSize = file.size
      console.log(`Түпнұсқа файл: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)

      // 1. Ақылды сығымдау
      setProgress(20)
      const compressed = await SmartCompressionService.createProgressiveUpload(file)

      const finalFile = compressed.medium || compressed.preview || compressed.full
      const finalSize = finalFile.size
      const savings = ((originalSize - finalSize) / originalSize) * 100

      setCompressionSavings(savings)
      console.log(`Сығымдалған: ${(finalSize / 1024 / 1024).toFixed(2)} MB (${savings.toFixed(1)}% үнемдеу)`)

      // 2. Ең жақсы провайдерді таңдау
      setProgress(40)
      const storageStrategy = new FreeStorageStrategy()

      // 3. Жүктеу
      setProgress(60)
      const result = await storageStrategy.uploadToOptimalProvider(finalFile)

      setProgress(100)
      console.log("Жүктеу сәтті:", result)

      alert(`Файл сәтті жүктелді! ${savings.toFixed(1)}% орын үнемделді`)
    } catch (error) {
      console.error("Жүктеу қатесі:", error)
      alert("Жүктеу кезінде қате орын алды")
    } finally {
      setUploading(false)
      setProgress(0)
      setCompressionSavings(null)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-white text-lg font-semibold mb-2">Ақылды жүктеу</h3>
          <p className="text-gray-400 text-sm">200MP фото + 8K видео қолдау</p>
        </div>

        {/* Файл таңдау */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400">Файлды таңдаңыз</p>
            <p className="text-gray-500 text-xs mt-1">Автоматты сығымдау + ақысыз сақтау</p>
          </label>
        </div>

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

        {/* Үнемдеу статистикасы */}
        {compressionSavings && (
          <div className="bg-green-900/20 border border-green-600 rounded-lg p-3">
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm">{compressionSavings.toFixed(1)}% орын үнемделді!</span>
            </div>
          </div>
        )}

        {/* Қолдау көрсетілетін форматтар */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center text-gray-400">
            <ImageIcon className="w-3 h-3 mr-1" />
            200MP фото
          </div>
          <div className="flex items-center text-gray-400">
            <Video className="w-3 h-3 mr-1" />
            8K видео
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
