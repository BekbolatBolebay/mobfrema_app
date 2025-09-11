"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { payboxService } from "@/lib/payments/paybox"

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<string>("checking")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  useEffect(() => {
    const checkPayment = async () => {
      const paymentId = searchParams.get("pg_payment_id")

      if (paymentId) {
        try {
          const result = await payboxService.checkPaymentStatus(paymentId)

          if (result.success) {
            setPaymentStatus(result.status || "unknown")
            setPaymentDetails({
              paymentId,
              amount: searchParams.get("pg_amount"),
              orderId: searchParams.get("pg_order_id"),
            })
          }
        } catch (error) {
          setPaymentStatus("error")
        }
      }
    }

    checkPayment()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-white">
            {paymentStatus === "ok" ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                Төлем сәтті өтті!
              </>
            ) : paymentStatus === "checking" ? (
              "Төлем тексерілуде..."
            ) : (
              "Төлем мәртебесі белгісіз"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {paymentDetails && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Төлем ID:</span>
                <span className="text-white">{paymentDetails.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Сома:</span>
                <span className="text-cyan-400">{paymentDetails.amount} ₸</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Тапсырыс ID:</span>
                <span className="text-white">{paymentDetails.orderId}</span>
              </div>
            </div>
          )}

          <Button onClick={() => (window.location.href = "/")} className="w-full bg-cyan-600 hover:bg-cyan-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Басты бетке оралу
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
