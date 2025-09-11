"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, DollarSign, Users, Calendar, Zap, Star, MessageCircle, Share2, Bookmark } from "lucide-react"

interface JobDetailProps {
  job: any
  onApply: () => void
}

export default function JobDetail({ job, onApply }: JobDetailProps) {
  return (
    <div className="p-4 space-y-4">
      {/* Job Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-white text-xl font-bold">{job.title}</h1>
                {job.urgent && (
                  <Badge className="bg-red-600 text-white">
                    <Zap className="w-3 h-3 mr-1" />
                    Шұғыл
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="border-cyan-400 text-cyan-400 mb-3">
                {job.category}
              </Badge>
              <p className="text-gray-300 mb-4">{job.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">{job.budget}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{job.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{job.applicants} өтініш</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Жарияланған: {job.postedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={onApply} className="bg-cyan-600 hover:bg-cyan-700 flex-1">
              Өтініш жіберу
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client Info */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Клиент туралы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={job.client.avatar || "/placeholder.svg"} />
              <AvatarFallback>{job.client.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="text-white font-medium">{job.client.name}</h4>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-400 text-sm">{job.client.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{job.client.jobsPosted} жұмыс жарияланған</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-cyan-400 text-cyan-400 bg-transparent">
              <MessageCircle className="w-4 h-4 mr-1" />
              Хабарласу
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Талаптар</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.requirements.map((requirement: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-300">{requirement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Deliverables */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Нәтиже</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.deliverables.map((deliverable: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-300">{deliverable}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Apply Section */}
      <Card className="bg-blue-900/20 border-blue-600">
        <CardContent className="p-6 text-center">
          <h3 className="text-blue-400 font-medium mb-2">Бұл жұмысқа қызықсыз ба?</h3>
          <p className="text-gray-300 text-sm mb-4">Өз ұсынысыңызды жіберіп, клиентпен байланысқа шыңыз</p>
          <Button onClick={onApply} className="bg-blue-600 hover:bg-blue-700">
            Өтініш жіберу
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
