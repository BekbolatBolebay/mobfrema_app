"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authService } from "@/lib/auth"

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToRegister: () => void
}


export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await authService.signIn(email, password)

      if (error) {
        alert("Кіру кезінде қате: " + error.message)
      } else {
        alert("Сәтті кірдіңіз!")
        onSuccess() // Вызываем callback вместо redirect
      }
    } catch (error) {
      alert("Кіру кезінде қате орын алды")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-center">MobFrame-ға кіру</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Электрондық пошта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Құпия сөз</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={loading}>
            {loading ? "Кіру..." : "Кіру"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Аккаунтыңыз жоқ па?{" "}
            <button onClick={onSwitchToRegister} className="text-cyan-400 hover:underline">
              Тіркелу
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
