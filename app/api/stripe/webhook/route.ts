import { type NextRequest, NextResponse } from "next/server"
import { StripeService } from "@/lib/payments/stripe-integration"
import { supabase } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    const { success, event, error } = StripeService.verifyWebhookSignature(body, signature)

    if (!success) {
      console.error("Webhook signature verification failed:", error)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Төлем оқиғаларын өңдеу
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        console.log(`Төлем сәтті: ${paymentIntent.id}`)

        // Базада төлем статусын жаңарту
        await supabase.from("transactions").update({ status: "completed" }).eq("payment_id", paymentIntent.id)

        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object
        console.log(`Төлем сәтсіз: ${failedPayment.id}`)

        await supabase.from("transactions").update({ status: "failed" }).eq("payment_id", failedPayment.id)

        break

      case "customer.subscription.created":
        const subscription = event.data.object
        console.log(`Жаңа жазылым: ${subscription.id}`)
        break

      default:
        console.log(`Өңделмеген оқиға түрі: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
