"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Star,
  DollarSign,
  Award,
  Users,
  Clock,
  Heart,
  Play,
  Eye,
} from "lucide-react"

interface AdvancedSearchProps {
  query: string
  onBack: () => void
}

export default function AdvancedSearch({ query, onBack }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState(query)
  const [filters, setFilters] = useState({
    category: "all",
    location: "all",
    priceRange: [0, 500000],
    rating: 0,
    experience: "all",
    availability: "all",
  })

  // Mock data - в реальном приложении будет из API
  const searchResults = {
    creators: [
      {
        id: 1,
        name: "Aida_Photo",
        avatar: "/placeholder.svg?height=60&width=60",
        specialty: "Wedding Photography",
        rating: 4.9,
        reviewCount: 127,
        completedJobs: 89,
        location: "Алматы",
        priceRange: "50,000 - 200,000 ₸",
        verified: true,
        available: true,
        portfolio: [
          "/placeholder.svg?height=100&width=100",
          "/placeholder.svg?height=100&width=100",
          "/placeholder.svg?height=100&width=100",
        ],
      },
      {
        id: 2,
        name: "Nurlan_Video",
        avatar: "/placeholder.svg?height=60&width=60",
        specialty: "Commercial Video",
        rating: 4.8,
        reviewCount: 95,
        completedJobs: 67,
        location: "Астана",
        priceRange: "80,000 - 300,000 ₸",
        verified: true,
        available: false,
        portfolio: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
    ],
    jobs: [
      {
        id: 1,
        title: "Той фотосессиясы керек",
        description: "Дәстүрлі қазақ тойына кәсіби фотограф іздеймін",
        budget: "150,000 ₸",
        deadline: "3 күн",
        location: "Алматы",
        client: "Айгерим К.",
        clientRating: 4.8,
        applicants: 12,
        urgent: true,
        postedDate: "2 күн бұрын",
      },
      {
        id: 2,
        title: "Бизнес видео түсіру",
        description: "Компания туралы корпоративті видео жасау керек",
        budget: "200,000 ₸",
        deadline: "1 апта",
        location: "Астана",
        client: "ТОО Алтын",
        clientRating: 4.9,
        applicants: 8,
        urgent: false,
        postedDate: "1 күн бұрын",
      },
    ],
    content: [
      {
        id: 1,
        title: "Cinematic Wedding Moments",
        author: "Aida_Photo",
        thumbnail: "/placeholder.svg?height=150&width=200",
        duration: "2:34",
        views: 12500,
        likes: 2340,
        category: "Wedding",
        uploadDate: "2 күн бұрын",
        isPremium: false,
      },
      {
        id: 2,
        title: "Street Photography Tips",
        author: "Nurlan_Video",
        thumbnail: "/placeholder.svg?height=150&width=200",
        duration: "4:12",
        views: 8900,
        likes: 1890,
        category: "Tutorial",
        uploadDate: "1 апта бұрын",
        isPremium: true,
      },
    ],
  }

  const categories = [
    { value: "all", label: "Барлығы" },
    { value: "photography", label: "Фотография" },
    { value: "videography", label: "Видеография" },
    { value: "smm", label: "SMM" },
    { value: "design", label: "Дизайн" },
    { value: "editing", label: "Монтаж" },
  ]

  const cities = [
    { value: "all", label: "Барлық қалалар" },
    { value: "almaty", label: "Алматы" },
    { value: "astana", label: "Астана" },
    { value: "shymkent", label: "Шымкент" },
    { value: "karaganda", label: "Қарағанды" },
    { value: "aktobe", label: "Ақтөбе" },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center space-x-3 sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Іздеу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="grid grid-cols-2 gap-3">
          <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Қала" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Бағалар диапазоны: {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} ₸
          </label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
            max={500000}
            step={10000}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <Tabs defaultValue="creators" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 mx-4 mt-4">
          <TabsTrigger value="creators" className="text-white">
            Мобилографтар ({searchResults.creators.length})
          </TabsTrigger>
          <TabsTrigger value="jobs" className="text-white">
            Жұмыстар ({searchResults.jobs.length})
          </TabsTrigger>
          <TabsTrigger value="content" className="text-white">
            Контент ({searchResults.content.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creators" className="p-4 space-y-4">
          {searchResults.creators.map((creator) => (
            <Card key={creator.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <img
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-semibold">{creator.name}</h3>
                          {creator.verified && <Award className="w-4 h-4 text-blue-400" />}
                          {creator.available && <Badge className="bg-green-600 text-white text-xs">Қолжетімді</Badge>}
                        </div>
                        <p className="text-gray-400 text-sm">{creator.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-white text-sm font-medium">{creator.rating}</span>
                          <span className="text-gray-400 text-xs">({creator.reviewCount})</span>
                        </div>
                        <p className="text-gray-400 text-xs">{creator.completedJobs} жұмыс</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{creator.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{creator.priceRange}</span>
                      </div>
                    </div>

                    {/* Portfolio Preview */}
                    <div className="flex space-x-2 mb-3">
                      {creator.portfolio.map((img, index) => (
                        <img
                          key={index}
                          src={img || "/placeholder.svg"}
                          alt={`Portfolio ${index + 1}`}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        Профильді көру
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 bg-transparent">
                        Хабарласу
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="jobs" className="p-4 space-y-4">
          {searchResults.jobs.map((job) => (
            <Card key={job.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-medium">{job.title}</h3>
                      {job.urgent && <Badge className="bg-red-600 text-white text-xs">Шұғыл</Badge>}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{job.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-green-400">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">{job.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{job.deadline}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Клиент: {job.client}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{job.clientRating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{job.applicants} өтініш</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    Өтініш жіберу
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="content" className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {searchResults.content.map((content) => (
              <Card key={content.id} className="bg-gray-800 border-gray-700">
                <div className="relative">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white bg-black/50 rounded-full p-1" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                    {content.duration}
                  </div>
                  {content.isPremium && (
                    <Badge className="absolute top-2 left-2 bg-purple-600 text-white text-xs">Premium</Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h4 className="text-white text-sm font-medium mb-1">{content.title}</h4>
                  <p className="text-gray-400 text-xs mb-2">{content.author}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{content.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{content.likes.toLocaleString()}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {content.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
