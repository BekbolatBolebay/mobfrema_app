"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Briefcase, Heart, Share2, MessageCircle, Award, Play, Eye, Calendar } from "lucide-react"

interface CreatorProfileProps {
  creator: {
    id: number
    name: string
    avatar: string
    specialty: string
    rating: number
    jobs: number
    location: string
    verified: boolean
    bio: string
    joinDate: string
    followers: number
    following: number
  }
}

export default function CreatorProfile({ creator }: CreatorProfileProps) {
  const portfolio = [
    {
      id: 1,
      type: "image",
      thumbnail: "/placeholder.svg?height=200&width=200",
      title: "Wedding Moments",
      likes: 234,
      views: 1200,
    },
    {
      id: 2,
      type: "video",
      thumbnail: "/placeholder.svg?height=200&width=200",
      title: "Commercial Shoot",
      likes: 189,
      views: 890,
      duration: "2:34",
    },
    {
      id: 3,
      type: "image",
      thumbnail: "/placeholder.svg?height=200&width=200",
      title: "Street Photography",
      likes: 156,
      views: 567,
    },
  ]

  const reviews = [
    {
      id: 1,
      client: "Айгерим К.",
      rating: 5,
      comment: "Өте кәсіби жұмыс! Той фотолары керемет шықты.",
      date: "2 апта бұрын",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      client: "ТОО Алтын",
      rating: 5,
      comment: "Корпоративті видео үшін рахмет. Сапасы жоғары!",
      date: "1 ай бұрын",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} />
              <AvatarFallback>{creator.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-white text-xl font-bold">{creator.name}</h1>
                {creator.verified && <Award className="w-5 h-5 text-blue-400" />}
              </div>
              <p className="text-cyan-400 font-medium mb-2">{creator.specialty}</p>
              <p className="text-gray-400 text-sm mb-3">{creator.bio}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">{creator.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{creator.jobs} жұмыс</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{creator.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{creator.joinDate}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-white font-bold">{creator.followers}</div>
                  <div className="text-gray-400 text-sm">Жазылушылар</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">{creator.following}</div>
                  <div className="text-gray-400 text-sm">Жазылған</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Хабарласу
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Жазылу
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="portfolio" className="text-white">
            Портфолио
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-white">
            Пікірлер
          </TabsTrigger>
          <TabsTrigger value="about" className="text-white">
            Туралы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {portfolio.map((item) => (
              <Card key={item.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className="relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  {item.type === "video" && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white bg-black/50 rounded-full p-1" />
                      </div>
                      {item.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                          {item.duration}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <CardContent className="p-3">
                  <h4 className="text-white text-sm font-medium mb-2">{item.title}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">{item.views}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {item.type === "video" ? "Видео" : "Фото"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{review.client[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{review.client}</h4>
                      <span className="text-gray-400 text-sm">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Туралы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Мамандық</h4>
                <p className="text-gray-400">{creator.specialty}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Орналасқан жері</h4>
                <p className="text-gray-400">{creator.location}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Тіркелген күні</h4>
                <p className="text-gray-400">{creator.joinDate}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Дағдылар</h4>
                <div className="flex flex-wrap gap-2">
                  {["Фотография", "Видеосъемка", "Монтаж", "Цветокоррекция"].map((skill) => (
                    <Badge key={skill} variant="outline" className="border-cyan-400 text-cyan-400">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
