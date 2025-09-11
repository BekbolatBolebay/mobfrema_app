"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { kaspiPayment } from "@/lib/payments"

interface KaspiQRProps {
  amount: number
  description: string
  onSuccess?: () => void
}

export default function KaspiQR({ amount, description, onSuccess }: KaspiQRProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreatePayment = async () => {
    setLoading(true)

    try {
      const result = await kaspiPayment.createQRPayment(amount, description)

      if (result.success) {
        setQrCode(result.qr_code)
      } else {
        alert("Төлем жасау кезінде қате орын алды")
      }
    } catch (error) {
      alert("Төлем жасау кезінде қате орын алды")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-center">Kaspi QR төлемі</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-2xl text-cyan-400 font-bold">{amount.toLocaleString()} ₸</div>

        <p className="text-gray-300 text-sm">{description}</p>

        {!qrCode ? (
          <Button onClick={handleCreatePayment} className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={loading}>
            {loading ? "QR код жасалуда..." : "QR код жасау"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <img src={qrCode || "/placeholder.svg"} alt="Kaspi QR код" className="w-full max-w-xs mx-auto" />
            </div>
            <p className="text-gray-300 text-sm">Kaspi қолданбасымен QR кодты сканерлеңіз</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
