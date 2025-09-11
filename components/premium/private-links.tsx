"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Link, Eye, Download, Copy, Share2, Lock, Crown, Upload } from "lucide-react"

interface PrivateLinksProps {
  onBack: () => void
}

export default function PrivateLinks({ onBack }: PrivateLinksProps) {
  const [newLinkTitle, setNewLinkTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const privateLinks = [
    {
      id: 1,
      title: "Wedding Highlights - Айгерим & Нұрлан",
      fileName: "wedding_highlights_4k.mp4",
      fileSize: "2.4 GB",
      createdAt: "2024-01-15",
      expiresAt: "2024-02-15",
      viewCount: 12,
      downloadCount: 3,
      maxViews: 50,
      maxDownloads: 10,
      isActive: true,
      shareLink: "https://mobframe.kz/private/abc123def456",
      downloadLink: "https://mobframe.kz/download/abc123def456",
    },
    {
      id: 2,
      title: "Corporate Video - ТОО Алтын",
      fileName: "corporate_final.mp4",
      fileSize: "1.8 GB",
      createdAt: "2024-01-10",
      expiresAt: "2024-02-10",
      viewCount: 8,
      downloadCount: 1,
      maxViews: 25,
      maxDownloads: 5,
      isActive: true,
      shareLink: "https://mobframe.kz/private/xyz789ghi012",
      downloadLink: "https://mobframe.kz/download/xyz789ghi012",
    },
    {
      id: 3,
      title: "Product Showcase - Beauty Studio",
      fileName: "product_showcase.mp4",
      fileSize: "950 MB",
      createdAt: "2024-01-05",
      expiresAt: "2024-01-20",
      viewCount: 25,
      downloadCount: 8,
      maxViews: 30,
      maxDownloads: 10,
      isActive: false,
      shareLink: "https://mobframe.kz/private/mno345pqr678",
      downloadLink: "https://mobframe.kz/download/mno345pqr678",
    },
  ]

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    alert("Сілтеме көшірілді!")
  }

  const handleCreateLink = () => {
    if (!newLinkTitle.trim() || !selectedFile) {
      alert("Атауы мен файлды таңдаңыз")
      return
    }

    // Здесь будет логика создания приватной ссылки
    alert("Жабық сілтеме жасалды! (Кейінірек API-мен байланыстырылады)")
    setNewLinkTitle("")
    setSelectedFile(null)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-xl font-semibold flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Жабық сілтемелер
        </h1>
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      </div>

      <div className="p-4 space-y-6">
        {/* Create New Link */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Link className="w-5 h-5 mr-2" />
              Жаңа жабық сілтеме жасау
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Жұмыс атауы</label>
              <Input
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
                placeholder="Мысалы: Wedding Highlights - Клиент аты"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Файл таңдау</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="video/*,image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-gray-400 mb-2">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    Файлды таңдаңыз немесе сүйреп әкеліңіз
                  </div>
                  {selectedFile && <p className="text-cyan-400 text-sm">{selectedFile.name}</p>}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Максимум көру саны</label>
                <Input type="number" defaultValue="50" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Максимум жүктеу саны</label>
                <Input type="number" defaultValue="10" className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>

            <Button
              onClick={handleCreateLink}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Lock className="w-4 h-4 mr-2" />
              Жабық сілтеме жасау
            </Button>
          </CardContent>
        </Card>

        {/* Existing Links */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-semibold">Менің жабық сілтемелерім</h2>

          {privateLinks.map((link) => (
            <Card key={link.id} className={`border-gray-700 ${link.isActive ? "bg-gray-800" : "bg-gray-800/50"}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{link.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {link.fileName} • {link.fileSize}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                      <span>Жасалды: {link.createdAt}</span>
                      <span>Мерзімі: {link.expiresAt}</span>
                    </div>
                  </div>
                  <Badge
                    variant={link.isActive ? "default" : "secondary"}
                    className={link.isActive ? "bg-green-600" : "bg-gray-600"}
                  >
                    {link.isActive ? "Белсенді" : "Мерзімі өтті"}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">Көрулер</span>
                      </div>
                      <span className="text-white font-medium">
                        {link.viewCount}/{link.maxViews}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">Жүктеулер</span>
                      </div>
                      <span className="text-white font-medium">
                        {link.downloadCount}/{link.maxDownloads}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {link.isActive && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={link.shareLink}
                        readOnly
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(link.shareLink)}
                        className="border-gray-600 text-gray-400 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 bg-transparent">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={link.downloadLink}
                        readOnly
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(link.downloadLink)}
                        className="border-gray-600 text-gray-400 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-900/20 border-blue-600">
          <CardContent className="p-4">
            <h3 className="text-blue-400 font-medium mb-2 flex items-center">
              <Crown className="w-4 h-4 mr-2" />
              Premium функция
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Клиенттерге сапалы жұмыстарды қауіпсіз жіберіңіз</li>
              <li>• Көру және жүктеу санын шектеңіз</li>
              <li>• Мерзімін белгілеңіз</li>
              <li>• Толық статистиканы көріңіз</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
