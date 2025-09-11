"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Play,
  Music,
  Volume2,
  Palette,
  Camera,
  Eye,
  Layers,
  Crown,
  Lock,
  Star,
  Heart,
  Share2,
} from "lucide-react"

interface MaterialsMenuProps {
  onBack: () => void
}

export default function MaterialsMenu({ onBack }: MaterialsMenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Барлығы", icon: Layers, count: 1250 },
    { id: "music", name: "Музыка", icon: Music, count: 450 },
    { id: "sounds", name: "Дыбыс эффектілері", icon: Volume2, count: 320 },
    { id: "luts", name: "LUT пресеттері", icon: Palette, count: 180 },
    { id: "angles", name: "Камера бұрыштары", icon: Camera, count: 200 },
    { id: "plans", name: "Жоспарлар", icon: Eye, count: 100 },
  ]

  const materials = [
    {
      id: 1,
      title: "Cinematic Wedding Pack",
      category: "music",
      type: "Музыка",
      duration: "3:45",
      price: 2500,
      isPremium: true,
      downloads: 1234,
      rating: 4.9,
      author: "SoundMaster_KZ",
      preview: "/placeholder.svg?height=100&width=100",
      tags: ["wedding", "cinematic", "emotional"],
    },
    {
      id: 2,
      title: "Urban Street Sounds",
      category: "sounds",
      type: "Дыбыс эффектілері",
      duration: "Pack (15 files)",
      price: 1800,
      isPremium: false,
      downloads: 892,
      rating: 4.7,
      author: "AudioPro_Almaty",
      preview: "/placeholder.svg?height=100&width=100",
      tags: ["urban", "street", "ambient"],
    },
    {
      id: 3,
      title: "Moody Film LUTs",
      category: "luts",
      type: "LUT пресеттері",
      duration: "10 LUTs",
      price: 3200,
      isPremium: true,
      downloads: 567,
      rating: 4.8,
      author: "ColorGrader_Pro",
      preview: "/placeholder.svg?height=100&width=100",
      tags: ["moody", "film", "cinematic"],
    },
    {
      id: 4,
      title: "Dynamic Camera Moves",
      category: "angles",
      type: "Камера бұрыштары",
      duration: "Tutorial + Examples",
      price: 1500,
      isPremium: false,
      downloads: 445,
      rating: 4.6,
      author: "CameraPro_KZ",
      preview: "/placeholder.svg?height=100&width=100",
      tags: ["dynamic", "movement", "tutorial"],
    },
  ]

  const filteredMaterials = materials.filter(
    (material) =>
      (selectedCategory === "all" || material.category === selectedCategory) &&
      (searchQuery === "" || material.title.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-xl font-semibold">Материалдар дүкені</h1>
        <Button variant="ghost" size="sm" className="text-gray-400">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Материалдарды іздеу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "border-gray-600 text-gray-400 bg-transparent hover:border-cyan-400 hover:text-cyan-400"
                }`}
              >
                <IconComponent className="w-4 h-4 mr-1" />
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Premium Banner */}
      <div className="px-4 mb-4">
        <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                  Premium жазылым
                </h3>
                <p className="text-gray-300 text-sm">Барлық материалдарға шексіз қол жетімділік</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Жазылу
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Materials Grid */}
      <div className="px-4 space-y-4">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                {/* Preview */}
                <div className="relative flex-shrink-0">
                  <img
                    src={material.preview || "/placeholder.svg"}
                    alt={material.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                  </div>
                  {material.isPremium && (
                    <div className="absolute -top-1 -right-1">
                      <Crown className="w-4 h-4 text-yellow-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{material.title}</h4>
                      <p className="text-gray-400 text-sm">{material.author}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-semibold">{material.price.toLocaleString()} ₸</div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-400 text-xs">{material.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {material.type}
                    </Badge>
                    <span className="text-gray-400 text-xs">{material.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" className="text-gray-400 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 p-0">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <span className="text-gray-400 text-xs">{material.downloads} жүктеу</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 bg-transparent">
                        Алдын ала көру
                      </Button>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        {material.isPremium ? (
                          <>
                            <Lock className="w-3 h-3 mr-1" />
                            Premium
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            Сатып алу
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <div className="p-8 text-center">
          <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-white text-lg font-medium mb-2">Материалдар табылмады</h3>
          <p className="text-gray-400">Іздеу сөзін өзгертіп көріңіз немесе басқа категорияны таңдаңыз</p>
        </div>
      )}
    </div>
  )
}
