// Stripe интеграциясы - Kaspi орнына

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export interface StripePaymentData {
  amount: number // центтермен (100 = $1.00)
  currency: string
  description: string
  customerEmail?: string
  metadata?: Record<string, string>
}

export class StripeService {
  // Төлем Intent жасау
  static async createPaymentIntent(data: StripePaymentData) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        metadata: data.metadata || {},
        automatic_payment_methods: {
          enabled: true,
        },
      })

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }
    } catch (error) {
      console.error("Stripe payment intent error:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Төлем статусын тексеру
  static async getPaymentStatus(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

      return {
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Клиент жасау
  static async createCustomer(email: string, name?: string) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
      })

      return {
        success: true,
        customerId: customer.id,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Жазылым жасау
  static async createSubscription(customerId: string, priceId: string) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      })

      return {
        success: true,
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Webhook signature тексеру
  static verifyWebhookSignature(payload: string, signature: string) {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
      return { success: true, event }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
