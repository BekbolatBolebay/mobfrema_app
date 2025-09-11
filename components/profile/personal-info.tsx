"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Phone, User, Briefcase, Plus, X, Edit, Save, ArrowLeft } from "lucide-react"

interface PersonalInfoProps {
  onBack: () => void
}

export default function PersonalInfo({ onBack }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Айдана Сейтова",
    username: "aida_photo",
    email: "aida.photo@gmail.com",
    phone: "+7 777 123 4567",
    city: "Алматы",
    specialty: "Wedding Photography",
    bio: "Кәсіби фотограф, той мен корпоративті іс-шараларға маман. 5 жылдық тәжірибе.",
    website: "https://aidaphoto.kz",
    instagram: "@aida_photo_kz",
    skills: ["Фотография", "Видеосъемка", "Ретушь", "Дрон съемка"],
    languages: ["Қазақша", "Русский", "English"],
    availability: true,
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  })

  const [newSkill, setNewSkill] = useState("")

  const handleSave = () => {
    setIsEditing(false)
    // Здесь будет API вызов для сохранения данных
    alert("Профиль сақталды!")
  }

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="text-gray-400">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Артқа
        </Button>
        <h1 className="text-white text-xl font-semibold">Жеке ақпарат</h1>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-cyan-600 hover:bg-cyan-700"}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Сақтау
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Өңдеу
            </>
          )}
        </Button>
      </div>

      {/* Profile Photo */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6 text-center">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback className="text-2xl">АС</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="sm"
                className="absolute bottom-2 right-0 rounded-full w-8 h-8 p-0 bg-cyan-600 hover:bg-cyan-700"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
          <h2 className="text-white text-xl font-semibold">{profileData.fullName}</h2>
          <p className="text-gray-400">@{profileData.username}</p>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="w-5 h-5 mr-2" />
            Негізгі ақпарат
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Толық аты-жөні</label>
              <Input
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-700 border-gray-600 text-white disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Пайдаланушы аты</label>
              <Input
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-700 border-gray-600 text-white disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Мамандық</label>
              <Input
                value={profileData.specialty}
                onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-700 border-gray-600 text-white disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Өзім туралы</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-60 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            Байланыс ақпараты
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-700 border-gray-600 text-white disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Телефон</label>
            <Input
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-700 border-gray-600 text-white disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Қала</label>
            <Select
              value={profileData.city}
              onValueChange={(value) => setProfileData({ ...profileData, city: value })}
              disabled={!isEditing}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white disabled:opacity-60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Алматы">Алматы</SelectItem>
                <SelectItem value="Астана">Астана</SelectItem>
                <SelectItem value="Шымкент">Шымкент</SelectItem>
                <SelectItem value="Қарағанды">Қарағанды</SelectItem>
                <SelectItem value="Ақтөбе">Ақтөбе</SelectItem>
                <SelectItem value="Тараз">Тараз</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Әлеуметтік желілер</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Веб-сайт</label>
            <Input
              value={profileData.website}
              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              disabled={!isEditing}
              placeholder="https://example.com"
              className="bg-gray-700 border-gray-600 text-white disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Instagram</label>
            <Input
              value={profileData.instagram}
              onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
              disabled={!isEditing}
              placeholder="@username"
              className="bg-gray-700 border-gray-600 text-white disabled:opacity-60"
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Дағдылар
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-cyan-600 text-white">
                {skill}
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 p-0 h-auto text-white hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Жаңа дағды қосу"
                className="bg-gray-700 border-gray-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Тілдер</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profileData.languages.map((language, index) => (
              <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                {language}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Параметрлер</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Қолжетімділік</p>
              <p className="text-gray-400 text-sm">Жаңа жұмыстарға дайынмын</p>
            </div>
            <Switch
              checked={profileData.availability}
              onCheckedChange={(checked) => setProfileData({ ...profileData, availability: checked })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-medium">Хабарландырулар</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Email хабарландырулар</span>
              <Switch
                checked={profileData.notifications.email}
                onCheckedChange={(checked) =>
                  setProfileData({
                    ...profileData,
                    notifications: { ...profileData.notifications, email: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Push хабарландырулар</span>
              <Switch
                checked={profileData.notifications.push}
                onCheckedChange={(checked) =>
                  setProfileData({
                    ...profileData,
                    notifications: { ...profileData.notifications, push: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">SMS хабарландырулар</span>
              <Switch
                checked={profileData.notifications.sms}
                onCheckedChange={(checked) =>
                  setProfileData({
                    ...profileData,
                    notifications: { ...profileData.notifications, sms: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
