"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authService } from "@/lib/auth"
import { User, Mail, Lock, Phone, MapPin } from "lucide-react"

interface RegisterFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    specialty: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Толық атыңызды енгізіңіз"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email енгізіңіз"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Дұрыс email енгізіңіз"
    }

    if (!formData.password) {
      newErrors.password = "Құпия сөз енгізіңіз"
    } else if (formData.password.length < 6) {
      newErrors.password = "Құпия сөз кемінде 6 символ болуы керек"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Құпия сөздер сәйкес келмейді"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const { data, error } = await authService.signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        specialty: formData.specialty,
      })

      if (error) {
        setErrors({ general: error.message })
      } else {
        alert("Тіркелу сәтті өтті! Email-ға келген сілтемені растаңыз.")
        onSuccess()
      }
    } catch (error) {
      setErrors({ general: "Тіркелу кезінде қате орын алды" })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-center">MobFrame-ға тіркелу</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-3">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <User className="w-4 h-4 inline mr-1" />
              Толық аты-жөні
            </label>
            <Input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`bg-gray-700 border-gray-600 text-white ${errors.fullName ? "border-red-500" : ""}`}
              placeholder="Айдана Сейтова"
            />
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <Mail className="w-4 h-4 inline mr-1" />
              Электрондық пошта
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`bg-gray-700 border-gray-600 text-white ${errors.email ? "border-red-500" : ""}`}
              placeholder="aida@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <Phone className="w-4 h-4 inline mr-1" />
              Телефон нөмірі
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="+7 777 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              Қала
            </label>
            <Input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Алматы"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Мамандық</label>
            <Input
              type="text"
              value={formData.specialty}
              onChange={(e) => handleInputChange("specialty", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Фотограф, Видеограф, SMM маманы"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <Lock className="w-4 h-4 inline mr-1" />
              Құпия сөз
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`bg-gray-700 border-gray-600 text-white ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <Lock className="w-4 h-4 inline mr-1" />
              Құпия сөзді растау
            </label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`bg-gray-700 border-gray-600 text-white ${errors.confirmPassword ? "border-red-500" : ""}`}
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={loading}>
            {loading ? "Тіркелуде..." : "Тіркелу"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Аккаунтыңыз бар ма?{" "}
            <button onClick={onSwitchToLogin} className="text-cyan-400 hover:underline">
              Кіру
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
