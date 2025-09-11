import { type NextRequest, NextResponse } from "next/server"
import { StripeService } from "@/lib/payments/stripe-integration"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "usd", description, customerEmail, metadata } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Дұрыс сома енгізіңіз" }, { status: 400 })
    }

    const result = await StripeService.createPaymentIntent({
      amount: Math.round(amount * 100), // долларды центке айналдыру
      currency,
      description,
      metadata: {
        ...metadata,
        platform: "mobframe",
        timestamp: new Date().toISOString(),
      },
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        clientSecret: result.clientSecret,
        paymentIntentId: result.paymentIntentId,
      })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Stripe API error:", error)
    return NextResponse.json({ error: "Төлем жасау кезінде қате орын алды" }, { status: 500 })
  }
}
