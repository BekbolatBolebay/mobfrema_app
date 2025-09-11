// Жаңартылған төлем жүйесі - Kaspi жойылды, Stripe қосылды

// PayBox төлемі (Қазақстан үшін)
export const payboxPayment = {
  async createPayment(amount: number, description: string) {
    const response = await fetch("/api/paybox/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description,
        currency: "KZT",
      }),
    })

    return response.json()
  },
}

// Stripe төлемі (халықаралық)
export const stripePayment = {
  async createPaymentIntent(amount: number, currency = "usd", description: string) {
    const response = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        description,
      }),
    })

    return response.json()
  },

  async getPaymentStatus(paymentIntentId: string) {
    const response = await fetch(`/api/stripe/payment-status?id=${paymentIntentId}`)
    return response.json()
  },
}

// CloudPayments төлемі (ТМД үшін)
export const cloudPaymentsPayment = {
  async createPayment(amount: number, description: string, currency = "KZT") {
    const response = await fetch("/api/cloudpayments/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description,
        currency,
      }),
    })

    return response.json()
  },
}
