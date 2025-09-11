"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useNativeFeatures } from "@/hooks/use-native-features"
import CreatorProfile from "@/components/creators/creator-profile"
import JobDetail from "@/components/jobs/job-detail"
import JobApplication from "@/components/jobs/job-application"
import JobPostForm from "@/components/jobs/job-post-form"
import SearchResults from "@/components/search/search-results"
import PersonalInfo from "@/components/profile/personal-info"
import MyJobs from "@/components/profile/my-jobs"
import Favorites from "@/components/profile/favorites"
import MessagesList from "@/components/profile/messages-list"
import VideoPlayer from "@/components/video/video-player"
import { MaterialsMenu } from "@/components/materials/materials-menu"
import PrivateLinks from "@/components/premium/private-links"
import Portfolio from "@/components/profile/portfolio"
import CompleteSetupGuide from "@/components/setup/complete-setup-guide"
import {
  Home,
  Briefcase,
  PlusCircle,
  MessageCircle,
  User,
  Heart,
  Share2,
  MessageSquare,
  Music,
  Volume2,
  Palette,
  Camera,
  Eye,
  Layers,
  Play,
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  TrendingUp,
  Award,
  Zap,
  ArrowLeft,
  Lock,
  Settings,
} from "lucide-react"
import LoginForm from "@/components/auth/login-form"


export default function MobFrameApp() {
    const [orientations, setOrientations] = useState<string[]>([]);
  useEffect(() => {
    setOrientations(trendingContent.map(() =>
      Math.random() > 0.5 ? "Landscape" : "Portrait"
    ));
  }, []);
  const [activeTab, setActiveTab] = useState("home")
  const [currentView, setCurrentView] = useState("main") // main, profile, job-detail, job-apply, job-post, search, personal-info, my-jobs, favorites, messages-list, video-player
  const [selectedCreator, setSelectedCreator] = useState<any>(null)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Moved to top level
  const { isNative, takePhoto, pickPhoto, shareContent, vibrate, setupPushNotifications } = useNativeFeatures()
  const [showMaterialsMenu, setShowMaterialsMenu] = useState(false)

  useEffect(() => {
    if (isNative) {
      setupPushNotifications()
    }
  }, [isNative, setupPushNotifications])

  const categories = [
    { icon: Music, label: "Музыка", color: "bg-purple-600", count: "2.3K" },
    { icon: Volume2, label: "Дыбыс эффектілері", color: "bg-blue-600", count: "1.8K" },
    { icon: Palette, label: "LUT пресеттері", color: "bg-green-600", count: "956" },
    { icon: Camera, label: "Камера бұрыштары", color: "bg-red-600", count: "1.2K" },
    { icon: Eye, label: "Жоспарлар", color: "bg-yellow-600", count: "743" },
    { icon: Layers, label: "Композициялар", color: "bg-pink-600", count: "892" },
  ]

  const featuredCreators = [
    {
      id: 1,
      name: "Aida_Photo",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Wedding Photography",
      rating: 4.9,
      jobs: 127,
      location: "Алматы",
      verified: true,
      bio: "Кәсіби фотограф, той мен корпоративті іс-шараларға маман",
      joinDate: "2022 жылдан бері",
      followers: 1234,
      following: 567,
    },
    {
      id: 2,
      name: "Nurlan_Video",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Commercial Video",
      rating: 4.8,
      jobs: 89,
      location: "Астана",
      verified: true,
      bio: "Коммерциялық видео және жарнама роликтерін жасаймын",
      joinDate: "2021 жылдан бері",
      followers: 892,
      following: 234,
    },
    {
      id: 3,
      name: "Madina_SMM",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Social Media",
      rating: 4.7,
      jobs: 156,
      location: "Шымкент",
      verified: false,
      bio: "SMM маманы, әлеуметтік желілер үшін контент жасаймын",
      joinDate: "2023 жылдан бері",
      followers: 445,
      following: 123,
    },
  ]

  const trendingContent = [
    {
      id: 1,
      author: "Aida_Photo",
      authorId: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=300&width=200",
      title: "Cinematic Wedding Moments",
      likes: 2340,
      comments: 145,
      category: "Wedding",
      duration: "2:34",
      trending: true,
      videoUrl: "/placeholder-video.mp4",
      description: "Дәстүрлі қазақ тойының ең әдемі сәттері. Кинематографиялық стильде түсірілген эмоционалды видео.",
      tags: ["wedding", "cinematic", "kazakhstan", "traditional"],
      uploadDate: "2 күн бұрын",
      views: 12500,
    },
    {
      id: 2,
      author: "Nurlan_Video",
      authorId: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=300&width=200",
      title: "Street Photography Techniques",
      likes: 1890,
      comments: 89,
      category: "Tutorial",
      duration: "4:12",
      trending: true,
      videoUrl: "/placeholder-video.mp4",
      description: "Көше фотографиясының негізгі техникалары мен кеңестері. Кәсіби фотографтан үйреніңіз.",
      tags: ["photography", "tutorial", "street", "tips"],
      uploadDate: "1 апта бұрын",
      views: 8900,
    },
    {
      id: 3,
      author: "Madina_SMM",
      authorId: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=300&width=200",
      title: "Product Showcase Magic",
      likes: 1560,
      comments: 67,
      category: "Commercial",
      duration: "1:45",
      trending: false,
      videoUrl: "/placeholder-video.mp4",
      description: "Өнімді тартымды түрде көрсетудің жолдары. SMM үшін керемет идеялар.",
      tags: ["product", "showcase", "commercial", "smm"],
      uploadDate: "3 күн бұрын",
      views: 5600,
    },
  ]

  const activeJobs = [
    {
      id: 1,
      title: "Той фотосессиясы керек",
      budget: "150,000 ₸",
      deadline: "3 күн",
      location: "Алматы",
      client: {
        name: "Айгерим К.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        jobsPosted: 12,
      },
      description: "Дәстүрлі қазақ тойына кәсіби фотограф іздеймін. Той 200 адамға арналған.",
      applicants: 12,
      urgent: true,
      category: "Фотография",
      postedDate: "2 күн бұрын",
      requirements: [
        "Кәсіби фото жабдықтары",
        "Той фотосессиясында тәжірибе",
        "Дәстүрлі қазақ салт-дәстүрлерін білу",
        "Портфолио болуы міндетті",
      ],
      deliverables: [
        "300+ өңделген фото",
        "Онлайн галерея",
        "USB флешкада барлық фотолар",
        "2 апта ішінде дайын болуы",
      ],
    },
    {
      id: 2,
      title: "Бизнес видео түсіру",
      budget: "200,000 ₸",
      deadline: "1 апта",
      location: "Астана",
      client: {
        name: "ТОО Алтын",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        jobsPosted: 25,
      },
      description: "Компания туралы корпоративті видео жасау керек. Ұзақтығы 3-5 минут.",
      applicants: 8,
      urgent: false,
      category: "Видеосъемка",
      postedDate: "1 күн бұрын",
      requirements: [
        "4K видео жабдықтары",
        "Корпоративті видео тәжірибесі",
        "Видео монтаж дағдылары",
        "Дрон түсірілімі (қосымша)",
      ],
      deliverables: [
        "3-5 минуттық дайын видео",
        "4K сапасында",
        "Музыка мен дыбыс эффектілері",
        "Компания логотипі мен брендинг",
      ],
    },
  ]

  const handleCreatorClick = (authorId: number) => {
    const creator = featuredCreators.find((c) => c.id === authorId)
    if (creator) {
      setSelectedCreator(creator)
      setCurrentView("profile")
      vibrate()
    }
  }

  const handleJobClick = (job: any) => {
    setSelectedJob(job)
    setCurrentView("job-detail")
    vibrate()
  }

  const handleJobApply = (job: any) => {
    setSelectedJob(job)
    setCurrentView("job-apply")
    vibrate()
  }

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video)
    setCurrentView("video-player")
    vibrate()
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearch(true)
      setCurrentView("search")
      vibrate()
    }
  }

  const handleBackToMain = () => {
    setCurrentView("main")
    setSelectedCreator(null)
    setSelectedJob(null)
    setSelectedVideo(null)
    setShowSearch(false)
  }

  const toggleLike = async (videoId: number) => {
    await vibrate()
    const newLiked = new Set(likedVideos)
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId)
    } else {
      newLiked.add(videoId)
    }
    setLikedVideos(newLiked)
  }

  const handleShare = async (content: any) => {
    await shareContent(
      content.title,
      `${content.author} арқылы жасалған керемет жұмыс!`,
      `https://mobframe.kz/content/${content.id}`,
    )
  }

  const renderHeader = () => (
    <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
      {currentView !== "main" ? (
        <Button variant="ghost" size="sm" onClick={handleBackToMain} className="text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      ) : (
        <h1 className="text-cyan-400 text-xl font-bold">MobFrame</h1>
      )}

      <div className="flex items-center space-x-2">
        {isNative && (
          <Badge variant="outline" className="border-green-400 text-green-400 text-xs">
            Native
          </Badge>
        )}
        {currentView === "main" && (
          <Button variant="ghost" size="sm" onClick={handleSearch} className="text-gray-400">
            <Search className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Мобилографтар, жұмыстар іздеу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Featured Creators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-white text-lg font-semibold">Топ мобилографтар</h2>
          <Button variant="ghost" size="sm" className="text-cyan-400">
            Барлығын көру
          </Button>
        </div>
        <div className="flex space-x-4 px-4 overflow-x-auto">
          {featuredCreators.map((creator) => (
            <Card
              key={creator.id}
              className="bg-gray-800 border-gray-700 min-w-[280px] flex-shrink-0 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => handleCreatorClick(creator.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <h4 className="text-white font-medium">{creator.name}</h4>
                      {creator.verified && <Award className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-gray-400 text-sm">{creator.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">{creator.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{creator.jobs}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{creator.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-white text-lg font-semibold">Материалдар категориялары</h2>
          <Button variant="ghost" size="sm" className="text-cyan-400">
            <Filter className="w-4 h-4 mr-1" />
            Сүзгі
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 px-4">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                onClick={() => vibrate()}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium mb-1">{category.label}</p>
                  <p className="text-gray-400 text-xs">{category.count} файл</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="px-4">
        <Button
          onClick={() => setShowMaterialsMenu(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Layers className="w-5 h-5 mr-2" />
          Материалдар дүкені
        </Button>
      </div>

      {/* Trending Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-white text-lg font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
            Тренд контент
          </h2>
          <Button variant="ghost" size="sm" className="text-cyan-400">
            Барлығын көру
          </Button>
        </div>

      {trendingContent.map((content, index) => (
  <Card key={content.id} className="bg-gray-800 border-gray-700 mx-4">
    <CardContent className="p-0">
      {/* Author Header */}
      <div className="flex items-center justify-between p-3">

                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleCreatorClick(content.authorId)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={content.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{content.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-white text-sm font-medium hover:text-cyan-400 transition-colors">
                      {content.author}
                    </span>
                    <p className="text-gray-400 text-xs">{content.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {content.trending && (
                    <Badge className="bg-red-600 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Тренд
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-cyan-600 text-white">
                    {content.category}
                  </Badge>
                </div>
              </div>

              {/* Content Thumbnail */}
              <div
                className="relative cursor-pointer group"
                onClick={() => handleVideoClick(content)}
                onMouseEnter={() => {
                  // Optional: Add hover preview functionality later
                }}
              >
                <img
                  src={content.thumbnail || "/placeholder.svg"}
                  alt={content.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-all">
                  <Button
                    size="lg"
                    className="bg-black/50 hover:bg-black/70 rounded-full opacity-80 group-hover:opacity-100 transition-all"
                  >
                    <Play className="w-6 h-6 text-white" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {content.duration}
                </div>
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
  {orientations[index]}
</div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(content.id)}
                    className={likedVideos.has(content.id) ? "text-red-500" : "text-gray-400"}
                  >
                    <Heart className={`w-5 h-5 mr-1 ${likedVideos.has(content.id) ? "fill-current" : ""}`} />
                    {content.likes.toLocaleString()}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <MessageSquare className="w-5 h-5 mr-1" />
                    {content.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => handleShare(content)}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Title */}
              <div className="px-3 pb-3">
                <p className="text-white text-sm font-medium">{content.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderJobs = () => (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">Белсенді жұмыстар</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView("job-post")}
            className="border-cyan-400 text-cyan-400 bg-transparent"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Жариялау
          </Button>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 bg-transparent">
            <Filter className="w-4 h-4 mr-1" />
            Сүзгі
          </Button>
        </div>
      </div>

      {activeJobs.map((job) => (
        <Card key={job.id} className="bg-gray-800 border-gray-700 cursor-pointer" onClick={() => handleJobClick(job)}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-white font-medium">{job.title}</h3>
                  {job.urgent && (
                    <Badge className="bg-red-600 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Шұғыл
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-2">{job.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-green-400 font-medium">{job.budget}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{job.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{job.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Клиент: {job.client.name}</span>
                <span className="text-cyan-400 text-sm">{job.applicants} өтініш</span>
              </div>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleJobApply(job)
                }}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Өтініш жіберу
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-900/20 border-blue-600">
        <CardContent className="p-4 text-center">
          <h3 className="text-blue-400 font-medium mb-2">Жұмыс жариялау керек пе?</h3>
          <p className="text-gray-300 text-sm mb-3">Өз жобаңызды жариялап, ең жақсы мобилографтарды табыңыз</p>
          <Button onClick={() => setCurrentView("job-post")} className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            Жұмыс жариялау
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPublication = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-white text-lg font-semibold">Жарияланым жасау</h2>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={async () => {
                const photo = await takePhoto()
                if (photo) {
                  console.log("Фото түсірілді:", photo)
                  alert("Фото түсірілді! Жүктеу функциясы кейінірек қосылады.")
                }
              }}
              className="h-20 bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center"
            >
              <Camera className="w-6 h-6 mb-1" />
              <span className="text-xs">Камера</span>
            </Button>
            <Button
              onClick={async () => {
                const photo = await pickPhoto()
                if (photo) {
                  console.log("Фото таңдалды:", photo)
                  alert("Фото таңдалды! Жүктеу функциясы кейінірек қосылады.")
                }
              }}
              className="h-20 bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center"
            >
              <Layers className="w-6 h-6 mb-1" />
              <span className="text-xs">Галерея</span>
            </Button>
          </div>

          <div className="space-y-3">
            <Input placeholder="Атауы" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <textarea
              placeholder="Сипаттама"
              rows={3}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
            />
            <Input
              placeholder="Хэштегтер (#wedding #photography)"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <div className="grid grid-cols-3 gap-2">
              {categories.slice(0, 3).map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 bg-transparent"
                >
                  <category.icon className="w-3 h-3 mr-1" />
                  {category.label.split(" ")[0]}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => {
              alert("Жарияланым жасалды! Кейінірек серверге жіберіледі.")
              vibrate()
            }}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Жариялау
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-green-900/20 border-green-600">
        <CardContent className="p-4">
          <h3 className="text-green-400 font-medium mb-2">💡 Кеңестер:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Сапалы фото/видео жүктеңіз</li>
            <li>• Толық сипаттама жазыңыз</li>
            <li>• Дұрыс хэштегтер қолданыңыз</li>
            <li>• Категорияны дұрыс таңдаңыз</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )

  const renderMessages = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-white text-lg font-semibold">Хабарлар</h2>

      <div className="space-y-3">
        {[
          {
            id: 1,
            name: "Айгерим К.",
            message: "Той фотосессиясы туралы сұрағым бар",
            time: "5 мин бұрын",
            unread: true,
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 2,
            name: "ТОО Алтын",
            message: "Видео жұмысы қашан дайын болады?",
            time: "1 сағат бұрын",
            unread: false,
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 3,
            name: "Beauty Studio",
            message: "Келесі ай үшін контент жоспары",
            time: "3 сағат бұрын",
            unread: false,
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ].map((chat) => (
          <Card
            key={chat.id}
            className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => {
              setCurrentView("messages-list")
              vibrate()
            }}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{chat.name}</h4>
                    <span className="text-gray-400 text-xs">{chat.time}</span>
                  </div>
                  <p className={`text-sm ${chat.unread ? "text-white" : "text-gray-400"}`}>{chat.message}</p>
                </div>
                {chat.unread && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4 text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Клиенттермен тікелей хабарласып, жұмыстарды талқылаңыз</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => {
    if (!isAuthenticated) {
      return <LoginForm onSuccess={() => setIsAuthenticated(true)} />
    }

    return (
      <div className="p-4 space-y-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>МП</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold">Менің профилім</h3>
                <p className="text-gray-400">Мобилограф</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white text-sm">4.8</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">23 жұмыс</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentView("personal-info")}
              className="w-full border-cyan-400 text-cyan-400 bg-transparent"
            >
              Профильді өңдеу
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">156K</div>
              <div className="text-gray-400 text-sm">Көрулер</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">89</div>
              <div className="text-gray-400 text-sm">Лайктар</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {[
            { icon: User, label: "Жеке ақпарат", action: "Өңдеу", view: "personal-info" },
            { icon: Briefcase, label: "Менің жұмыстарым", action: "Көру", view: "my-jobs" },
            { icon: Heart, label: "Ұнатқандар", action: "Көру", view: "favorites" },
            { icon: MessageCircle, label: "Хабарлар", action: "Көру", view: "messages-list" },
            { icon: Layers, label: "Портфолио", action: "Көру", view: "portfolio" },
            { icon: Lock, label: "Жабық сілтемелер", action: "Көру", view: "private-links" },
            { icon: Settings, label: "API орнату", action: "Көру", view: "setup-guide" },
          ].map((item, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-white">{item.label}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentView(item.view)
                      vibrate()
                    }}
                    className="text-cyan-400"
                  >
                    {item.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "profile":
        return selectedCreator ? <CreatorProfile creator={selectedCreator} /> : renderHome()
      case "job-detail":
        return selectedJob ? <JobDetail job={selectedJob} onApply={() => handleJobApply(selectedJob)} /> : renderJobs()
      case "job-apply":
        return selectedJob ? (
          <JobApplication job={selectedJob} onBack={() => setCurrentView("job-detail")} />
        ) : (
          renderJobs()
        )
      case "job-post":
        return <JobPostForm onBack={() => setCurrentView("main")} />
      case "search":
        return <SearchResults query={searchQuery} onBack={() => setCurrentView("main")} />
      case "personal-info":
        return <PersonalInfo onBack={() => setCurrentView("main")} />
      case "my-jobs":
        return <MyJobs onBack={() => setCurrentView("main")} />
      case "favorites":
        return <Favorites onBack={() => setCurrentView("main")} />
      case "messages-list":
        return <MessagesList onBack={() => setCurrentView("main")} />
      case "video-player":
        return selectedVideo ? (
          <VideoPlayer
            video={selectedVideo}
            onBack={() => setCurrentView("main")}
            onAuthorClick={handleCreatorClick}
            onLike={toggleLike}
            onShare={handleShare}
            isLiked={likedVideos.has(selectedVideo.id)}
          />
        ) : (
          renderHome()
        )
      case "materials-menu":
        return <MaterialsMenu onBack={() => setCurrentView("main")} />
      case "private-links":
        return <PrivateLinks onBack={() => setCurrentView("main")} />
      case "portfolio":
        return <Portfolio onBack={() => setCurrentView("main")} />
      case "setup-guide":
        return <CompleteSetupGuide onBack={() => setCurrentView("main")} />
      case "main":
      default:
        if (activeTab === "home") return renderHome()
        if (activeTab === "jobs") return renderJobs()
        if (activeTab === "publish") return renderPublication()
        if (activeTab === "messages") return renderMessages()
        if (activeTab === "profile") return renderProfile()
        return renderHome()
    }
  }

  return (
    <div className={`min-h-screen bg-gray-900 ${isNative ? "pt-safe-top pb-safe-bottom" : ""}`}>
      {currentView !== "video-player" && renderHeader()}

      {/* Content */}
      <div className={currentView !== "video-player" ? "pb-20" : ""}>{renderCurrentView()}</div>

      {/* Bottom Navigation - только показываем когда на главном экране */}
      {currentView === "main" && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center justify-around py-2">
            {[
              { id: "home", icon: Home, label: "Басты" },
              { id: "jobs", icon: Briefcase, label: "Жұмыстар" },
              { id: "publish", icon: PlusCircle, label: "Жариялау" },
              { id: "messages", icon: MessageCircle, label: "Хабарлар" },
              { id: "profile", icon: User, label: "Профиль" },
            ].map((tab) => {
              const IconComponent = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveTab(tab.id)
                    vibrate()
                  }}
                  className={`flex flex-col items-center space-y-1 p-2 ${
                    activeTab === tab.id ? "text-cyan-400" : "text-gray-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
