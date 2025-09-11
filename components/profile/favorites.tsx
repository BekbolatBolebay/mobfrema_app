"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, Play, Star, Eye, Share2, Download, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FavoritesProps {
  onBack: () => void
}

export default function Favorites({ onBack }: FavoritesProps) {
  const [activeTab, setActiveTab] = useState("content")
  const [searchQuery, setSearchQuery] = useState("")

  const favoriteContent = [
    {
      id: 1,
      title: "Cinematic Wedding Moments",
      author: "Aida_Photo",
      authorId: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "2:34",
      likes: 2340,
      views: 12500,
      category: "Wedding",
      addedDate: "2 күн бұрын",
      type: "video",
    },
    {
      id: 2,
      title: "Street Photography Magic",
      author: "Nurlan_Video",
      authorId: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "4:12",
      likes: 1890,
      views: 8900,
      category: "Tutorial",
      addedDate: "1 апта бұрын",
      type: "video",
    },
    {
      id: 3,
      title: "Product Showcase Ideas",
      author: "Madina_SMM",
      authorId: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=300",
      likes: 1560,
      views: 5600,
      category: "Commercial",
      addedDate: "3 күн бұрын",
      type: "photo",
    },
  ]

  const favoriteCreators = [
    {
      id: 1,
      name: "Aida_Photo",
      avatar: "/placeholder.svg?height=60&width=60",
      specialty: "Wedding Photography",
      rating: 4.9,
      followers: 1234,
      jobs: 127,
      location: "Алматы",
      verified: true,
      followedDate: "1 ай бұрын",
    },
    {
      id: 2,
      name: "Nurlan_Video",
      avatar: "/placeholder.svg?height=60&width=60",
      specialty: "Commercial Video",
      rating: 4.8,
      followers: 892,
      jobs: 89,
      location: "Астана",
      verified: true,
      followedDate: "2 апта бұрын",
    },
    {
      id: 3,
      name: "Madina_SMM",
      avatar: "/placeholder.svg?height=60&width=60",
      specialty: "Social Media",
      rating: 4.7,
      followers: 445,
      jobs: 156,
      location: "Шымкент",
      verified: false,
      followedDate: "1 апта бұрын",
    },
  ]

  const handleRemoveFromFavorites = (id: number, type: string) => {
    // Здесь будет логика удаления из избранного
    alert(`${type} избранноедан алынды!`)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Артқа
        </Button>
        <h1 className="text-white text-xl font-semibold">Ұнатқандар</h1>
        <Button variant="ghost" size="sm" className="text-gray-400">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Ұнатқандарыңыздан іздеу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">{favoriteContent.length}</div>
            <div className="text-gray-400 text-sm">Ұнатқан контент</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">{favoriteCreators.length}</div>
            <div className="text-gray-400 text-sm">Жазылған авторлар</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="content" className="text-gray-400 data-[state=active]:text-white">
            Контент
          </TabsTrigger>
          <TabsTrigger value="creators" className="text-gray-400 data-[state=active]:text-white">
            Авторлар
          </TabsTrigger>
        </TabsList>

        {/* Favorite Content */}
        <TabsContent value="content" className="space-y-4 mt-4">
          {favoriteContent.map((content) => (
            <Card key={content.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                {/* Content Header */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={content.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{content.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-white text-sm font-medium">{content.author}</span>
                      <p className="text-gray-400 text-xs">{content.addedDate}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-cyan-600 text-white">
                    {content.category}
                  </Badge>
                </div>

                {/* Content Thumbnail */}
                <div className="relative">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-48 object-cover"
                  />
                  {content.type === "video" && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" className="bg-black/50 hover:bg-black/70 rounded-full">
                          <Play className="w-6 h-6 text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {content.duration}
                      </div>
                    </>
                  )}
                </div>

                {/* Content Info */}
                <div className="p-3">
                  <h3 className="text-white font-medium mb-2">{content.title}</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-400 fill-current" />
                        <span>{content.likes.toLocaleString()}</span>
                      </div>
                      {content.views && (
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{content.views.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromFavorites(content.id, "контент")}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {favoriteContent.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">Ұнатқан контент жоқ</h3>
                <p className="text-gray-400 text-sm">Ұнатқан видео мен фотоларыңыз осында көрсетіледі</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Favorite Creators */}
        <TabsContent value="creators" className="space-y-4 mt-4">
          {favoriteCreators.map((creator) => (
            <Card key={creator.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-medium">{creator.name}</h3>
                      {creator.verified && <Badge className="bg-blue-600 text-white text-xs">✓ Тексерілген</Badge>}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{creator.specialty}</p>

                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{creator.rating}</span>
                      </div>
                      <span>{creator.followers} жазылушы</span>
                      <span>{creator.jobs} жұмыс</span>
                      <span>{creator.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromFavorites(creator.id, "автор")}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      Жазылудан бас тарту
                    </Button>
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                      Профильді көру
                    </Button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-gray-400 text-xs">Жазылған: {creator.followedDate}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {favoriteCreators.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">Жазылған авторлар жоқ</h3>
                <p className="text-gray-400 text-sm">Ұнатқан мобилографтарыңыз осында көрсетіледі</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
