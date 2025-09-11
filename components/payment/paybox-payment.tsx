"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { payboxService } from "@/lib/payments/paybox"
import { Loader2, CreditCard, Smartphone } from "lucide-react"

interface PayBoxPaymentProps {
  amount: number
  description: string
  orderId: string
  onSuccess?: (paymentId: string) => void
  onError?: (error: string) => void
}

export default function PayBoxPayment({ amount, description, orderId, onSuccess, onError }: PayBoxPaymentProps) {
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")

  const handlePayment = async () => {
    if (!userEmail && !userPhone) {
      onError?.("Электрондық пошта немесе телефон нөмірін енгізіңіз")
      return
    }

    setLoading(true)

    try {
      const result = await payboxService.createPayment({
        amount,
        description,
        orderId,
        userEmail: userEmail || undefined,
        userPhone: userPhone || undefined,
      })

      if (result.success && result.paymentUrl) {
        // Перенаправляем на страницу оплаты PayBox
        window.location.href = result.paymentUrl
      } else {
        onError?.(result.error || "Төлем жасау кезінде қате орын алды")
      }
    } catch (error) {
      onError?.("Желі қатесі")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-center flex items-center justify-center">
          <CreditCard className="w-5 h-5 mr-2" />
          PayBox төлемі
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Сумма */}
        <div className="text-center">
          <div className="text-3xl font-bold text-cyan-400">{amount.toLocaleString()} ₸</div>
          <p className="text-gray-300 text-sm mt-1">{description}</p>
        </div>

        {/* Поля ввода */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Электрондық пошта
            </Label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="example@mail.com"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="text-center text-gray-400 text-sm">немесе</div>

          <div>
            <Label htmlFor="phone" className="text-gray-300">
              Телефон нөмірі
            </Label>
            <Input
              id="phone"
              type="tel"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        {/* Кнопка оплаты */}
        <Button
          onClick={handlePayment}
          disabled={loading || (!userEmail && !userPhone)}
          className="w-full bg-cyan-600 hover:bg-cyan-700 h-12"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Төлем жасалуда...
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4 mr-2" />
              Төлеу
            </>
          )}
        </Button>

        {/* Поддерживаемые карты */}
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-2">Қолдау көрсетілетін карталар:</p>
          <div className="flex justify-center space-x-2">
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Visa</div>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs">MasterCard</div>
            <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">Казкарт</div>
          </div>
        </div>

        {/* Безопасность */}
        <div className="text-center text-gray-500 text-xs">🔒 Қауіпсіз төлем PayBox.kz арқылы</div>
      </CardContent>
    </Card>
  )
}
