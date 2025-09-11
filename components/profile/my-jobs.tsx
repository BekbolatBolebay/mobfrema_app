"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react"

interface MyJobsProps {
  onBack: () => void
}

export default function MyJobs({ onBack }: MyJobsProps) {
  const [activeTab, setActiveTab] = useState("active")

  const activeJobs = [
    {
      id: 1,
      title: "Корпоративті видео түсіру",
      client: {
        name: "ТОО Алтын",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      budget: "200,000 ₸",
      deadline: "5 күн қалды",
      status: "in_progress",
      progress: 60,
      description: "Компания туралы корпоративті видео жасау. Ұзақтығы 3-5 минут.",
      location: "Астана",
      startDate: "15 қаңтар",
      category: "Видеосъемка",
    },
    {
      id: 2,
      title: "Ресторан фотосессиясы",
      client: {
        name: "Айгерим К.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      budget: "80,000 ₸",
      deadline: "2 күн қалды",
      status: "pending",
      progress: 0,
      description: "Жаңа ресторанның ішкі интерьері мен тағамдарын түсіру.",
      location: "Алматы",
      startDate: "20 қаңтар",
      category: "Фотография",
    },
  ]

  const completedJobs = [
    {
      id: 3,
      title: "Той фотосессиясы",
      client: {
        name: "Нұрлан Б.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      budget: "150,000 ₸",
      completedDate: "10 қаңтар",
      rating: 5,
      review: "Керемет жұмыс! Барлық фотолар өте әдемі шықты. Ұсынамын!",
      category: "Фотография",
      deliverables: ["300+ фото", "Онлайн галерея", "USB флешка"],
    },
    {
      id: 4,
      title: "Өнім фотосессиясы",
      client: {
        name: "Beauty Store",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      budget: "60,000 ₸",
      completedDate: "5 қаңтар",
      rating: 4,
      review: "Жақсы жұмыс, бірақ кейбір фотоларды қайта түсіру керек болды.",
      category: "Коммерциялық",
      deliverables: ["50+ фото", "Ретушь", "Каталог дизайны"],
    },
  ]

  const applications = [
    {
      id: 5,
      title: "SMM контент жасау",
      client: {
        name: "Digital Agency",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      budget: "100,000 ₸",
      appliedDate: "2 күн бұрын",
      status: "pending",
      applicants: 8,
      category: "SMM",
    },
    {
      id: 6,
      title: "Дрон түсірілімі",
      client: {
        name: "Құрылыс компаниясы",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      budget: "250,000 ₸",
      appliedDate: "1 күн бұрын",
      status: "accepted",
      applicants: 12,
      category: "Видеосъемка",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-600"
      case "pending":
        return "bg-yellow-600"
      case "completed":
        return "bg-green-600"
      case "accepted":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "Орындалуда"
      case "pending":
        return "Күтуде"
      case "completed":
        return "Аяқталды"
      case "accepted":
        return "Қабылданды"
      default:
        return "Белгісіз"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Артқа
        </Button>
        <h1 className="text-white text-xl font-semibold">Менің жұмыстарым</h1>
        <div></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">{activeJobs.length}</div>
            <div className="text-gray-400 text-sm">Белсенді</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{completedJobs.length}</div>
            <div className="text-gray-400 text-sm">Аяқталды</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{applications.length}</div>
            <div className="text-gray-400 text-sm">Өтініштер</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="active" className="text-gray-400 data-[state=active]:text-white">
            Белсенді
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-gray-400 data-[state=active]:text-white">
            Аяқталды
          </TabsTrigger>
          <TabsTrigger value="applications" className="text-gray-400 data-[state=active]:text-white">
            Өтініштер
          </TabsTrigger>
        </TabsList>

        {/* Active Jobs */}
        <TabsContent value="active" className="space-y-4 mt-4">
          {activeJobs.map((job) => (
            <Card key={job.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-medium">{job.title}</h3>
                      <Badge className={getStatusColor(job.status)}>{getStatusText(job.status)}</Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{job.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-green-400 font-medium">{job.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.deadline}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={job.client.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{job.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-white text-sm font-medium">{job.client.name}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-400 text-xs">{job.client.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Хабар
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
                      <Phone className="w-4 h-4 mr-1" />
                      Қоңырау
                    </Button>
                  </div>
                </div>

                {/* Progress */}
                {job.status === "in_progress" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Прогресс</span>
                      <span className="text-white">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-cyan-600 text-white">
                    {job.category}
                  </Badge>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    Толығырақ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Completed Jobs */}
        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedJobs.map((job) => (
            <Card key={job.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-medium">{job.title}</h3>
                      <Badge className="bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Аяқталды
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-green-400 font-medium">{job.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{job.completedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={job.client.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{job.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-white text-sm font-medium">{job.client.name}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-400 text-xs">{job.client.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating & Review */}
                <div className="bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-white text-sm font-medium">Баға:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < job.rating ? "text-yellow-400 fill-current" : "text-gray-500"}`}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 text-sm">{job.rating}/5</span>
                  </div>
                  <p className="text-gray-300 text-sm">{job.review}</p>
                </div>

                {/* Deliverables */}
                <div className="mb-4">
                  <h4 className="text-white text-sm font-medium mb-2">Жеткізілген:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.deliverables.map((item, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-cyan-600 text-white">
                    {job.category}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
                    Қайта жұмыс істеу
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Applications */}
        <TabsContent value="applications" className="space-y-4 mt-4">
          {applications.map((app) => (
            <Card key={app.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-medium">{app.title}</h3>
                      <Badge className={getStatusColor(app.status)}>{getStatusText(app.status)}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-green-400 font-medium">{app.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{app.appliedDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{app.applicants} өтініш</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={app.client.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{app.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-white text-sm font-medium">{app.client.name}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-400 text-xs">{app.client.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-cyan-600 text-white">
                    {app.category}
                  </Badge>
                  <div className="flex space-x-2">
                    {app.status === "pending" && (
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400 bg-transparent">
                        <XCircle className="w-4 h-4 mr-1" />
                        Бас тарту
                      </Button>
                    )}
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                      Толығырақ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
