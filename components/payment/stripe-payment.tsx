"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CreditCard, Shield } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripePaymentProps {
  amount: number
  currency?: string
  description: string
  onSuccess?: (paymentIntentId: string) => void
  onError?: (error: string) => void
}

function PaymentForm({ amount, currency = "usd", description, onSuccess, onError }: StripePaymentProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string>("")

  useEffect(() => {
    // Payment Intent жасау
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency,
            description,
          }),
        })

        const data = await response.json()

        if (data.success) {
          setClientSecret(data.clientSecret)
        } else {
          onError?.(data.error)
        }
      } catch (error) {
        onError?.("Төлем дайындау кезінде қате")
      }
    }

    createPaymentIntent()
  }, [amount, currency, description, onError])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setLoading(true)

    const cardElement = elements.getElement(CardElement)!

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    })

    if (error) {
      onError?.(error.message || "Төлем кезінде қате орын алды")
    } else if (paymentIntent.status === "succeeded") {
      onSuccess?.(paymentIntent.id)
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-center flex items-center justify-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Stripe төлемі
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Сума */}
        <div className="text-center">
          <div className="text-3xl font-bold text-cyan-400">
            ${amount.toFixed(2)} {currency.toUpperCase()}
          </div>
          <p className="text-gray-300 text-sm mt-1">{description}</p>
        </div>

        {/* Карта формасы */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                },
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={!stripe || loading || !clientSecret}
            className="w-full bg-cyan-600 hover:bg-cyan-700 h-12"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Төлем жасалуда...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />${amount.toFixed(2)} төлеу
              </>
            )}
          </Button>
        </form>

        {/* Қауіпсіздік */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-2">
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Visa</div>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs">Mastercard</div>
            <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Amex</div>
          </div>
          <p className="text-gray-500 text-xs">🔒 Қауіпсіз төлем Stripe арқылы</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function StripePayment(props: StripePaymentProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  )
}
