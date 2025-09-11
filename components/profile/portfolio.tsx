"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Play, Heart, Eye, Share2, Download, Edit, Trash2, Upload, Lock, Crown } from "lucide-react"

interface PortfolioProps {
  onBack: () => void
}

export default function Portfolio({ onBack }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState("all")

  const portfolioItems = [
    {
      id: 1,
      title: "Cinematic Wedding Highlights",
      type: "video",
      category: "Wedding",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "3:45",
      views: 12500,
      likes: 2340,
      uploadDate: "2024-01-15",
      isPrivate: false,
      isPremium: false,
      description: "Дәстүрлі қазақ тойының ең әдемі сәттері",
      tags: ["wedding", "cinematic", "traditional"],
    },
    {
      id: 2,
      title: "Corporate Brand Story",
      type: "video",
      category: "Commercial",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "2:30",
      views: 8900,
      likes: 1560,
      uploadDate: "2024-01-10",
      isPrivate: true,
      isPremium: true,
      description: "Компания туралы корпоративті видео",
      tags: ["corporate", "brand", "commercial"],
    },
    {
      id: 3,
      title: "Street Photography Series",
      type: "photo",
      category: "Photography",
      thumbnail: "/placeholder.svg?height=200&width=300",
      views: 5600,
      likes: 890,
      uploadDate: "2024-01-05",
      isPrivate: false,
      isPremium: false,
      description: "Алматы көшелерінен фото серия",
      tags: ["street", "photography", "almaty"],
    },
    {
      id: 4,
      title: "Product Showcase Reel",
      type: "video",
      category: "Commercial",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "1:20",
      views: 3400,
      likes: 567,
      uploadDate: "2024-01-01",
      isPrivate: false,
      isPremium: false,
      description: "Өнім көрсету үшін жасалған видео",
      tags: ["product", "showcase", "commercial"],
    },
  ]

  const categories = [
    { id: "all", name: "Барлығы", count: portfolioItems.length },
    { id: "video", name: "Видео", count: portfolioItems.filter((item) => item.type === "video").length },
    { id: "photo", name: "Фото", count: portfolioItems.filter((item) => item.type === "photo").length },
    { id: "private", name: "Жабық", count: portfolioItems.filter((item) => item.isPrivate).length },
  ]

  const getFilteredItems = () => {
    switch (activeTab) {
      case "video":
        return portfolioItems.filter((item) => item.type === "video")
      case "photo":
        return portfolioItems.filter((item) => item.type === "photo")
      case "private":
        return portfolioItems.filter((item) => item.isPrivate)
      default:
        return portfolioItems
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-xl font-semibold">Менің портфолиом</h1>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="w-4 h-4 mr-1" />
          Қосу
        </Button>
      </div>

      {/* Stats */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{portfolioItems.length}</div>
            <div className="text-gray-400 text-sm">Жұмыстар</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {portfolioItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Көрулер</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {portfolioItems.reduce((sum, item) => sum + item.likes, 0).toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Лайктар</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {portfolioItems.filter((item) => item.isPremium).length}
            </div>
            <div className="text-gray-400 text-sm">Premium</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 mx-4 mt-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-white">
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {getFilteredItems().map((item) => (
              <Card key={item.id} className="bg-gray-800 border-gray-700 group">
                <div className="relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white">
                        <Share2 className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-red-600/80 border-red-500 text-white">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Type indicator */}
                  {item.type === "video" && (
                    <div className="absolute top-2 left-2">
                      <Play className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                    </div>
                  )}

                  {/* Duration */}
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                      {item.duration}
                    </div>
                  )}

                  {/* Privacy badges */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {item.isPrivate && (
                      <Badge className="bg-gray-800/80 text-white text-xs">
                        <Lock className="w-2 h-2 mr-1" />
                        Жабық
                      </Badge>
                    )}
                    {item.isPremium && (
                      <Badge className="bg-purple-600/80 text-white text-xs">
                        <Crown className="w-2 h-2 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-3">
                  <h4 className="text-white text-sm font-medium mb-1 truncate">{item.title}</h4>
                  <p className="text-gray-400 text-xs mb-2 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {item.category}
                    </Badge>
                    <span>{item.uploadDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 p-0 h-auto">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {getFilteredItems().length === 0 && (
            <div className="text-center py-12">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">Портфолио бос</h3>
              <p className="text-gray-400 text-sm mb-4">Өз жұмыстарыңызды жүктеп, портфолионы толтырыңыз</p>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Алғашқы жұмысты қосу
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Upload FAB */}
      <div className="fixed bottom-20 right-4">
        <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 rounded-full w-14 h-14 p-0 shadow-lg">
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
