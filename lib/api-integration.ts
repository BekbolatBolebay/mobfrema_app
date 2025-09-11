// Барлық API интеграцияларын басқару

export interface APIStatus {
  name: string
  status: "connected" | "error" | "not_configured"
  lastChecked: Date
  error?: string
}

export class APIManager {
  private static instance: APIManager
  private apiStatuses: Map<string, APIStatus> = new Map()

  static getInstance(): APIManager {
    if (!APIManager.instance) {
      APIManager.instance = new APIManager()
    }
    return APIManager.instance
  }

  // Supabase тексеру
  async checkSupabase(): Promise<APIStatus> {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url || !key) {
        return {
          name: "Supabase",
          status: "not_configured",
          lastChecked: new Date(),
          error: "URL немесе API key жоқ",
        }
      }

      // Supabase байланысын тексеру
      const response = await fetch(`${url}/rest/v1/`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      })

      const status: APIStatus = {
        name: "Supabase",
        status: response.ok ? "connected" : "error",
        lastChecked: new Date(),
        error: response.ok ? undefined : "Байланыс қатесі",
      }

      this.apiStatuses.set("supabase", status)
      return status
    } catch (error) {
      const status: APIStatus = {
        name: "Supabase",
        status: "error",
        lastChecked: new Date(),
        error: error.message,
      }
      this.apiStatuses.set("supabase", status)
      return status
    }
  }

  // Stripe тексеру
  async checkStripe(): Promise<APIStatus> {
    try {
      const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

      if (!key) {
        return {
          name: "Stripe",
          status: "not_configured",
          lastChecked: new Date(),
          error: "Publishable key жоқ",
        }
      }

      // Stripe кілтінің форматын тексеру
      const isValid = key.startsWith("pk_test_") || key.startsWith("pk_live_")

      const status: APIStatus = {
        name: "Stripe",
        status: isValid ? "connected" : "error",
        lastChecked: new Date(),
        error: isValid ? undefined : "Дұрыс емес key форматы",
      }

      this.apiStatuses.set("stripe", status)
      return status
    } catch (error) {
      const status: APIStatus = {
        name: "Stripe",
        status: "error",
        lastChecked: new Date(),
        error: error.message,
      }
      this.apiStatuses.set("stripe", status)
      return status
    }
  }

  // PayBox тексеру
  async checkPayBox(): Promise<APIStatus> {
    try {
      const merchantId = process.env.NEXT_PUBLIC_PAYBOX_MERCHANT_ID
      const secretKey = process.env.PAYBOX_SECRET_KEY

      if (!merchantId || !secretKey) {
        return {
          name: "PayBox",
          status: "not_configured",
          lastChecked: new Date(),
          error: "Merchant ID немесе Secret Key жоқ",
        }
      }

      const status: APIStatus = {
        name: "PayBox",
        status: "connected",
        lastChecked: new Date(),
      }

      this.apiStatuses.set("paybox", status)
      return status
    } catch (error) {
      const status: APIStatus = {
        name: "PayBox",
        status: "error",
        lastChecked: new Date(),
        error: error.message,
      }
      this.apiStatuses.set("paybox", status)
      return status
    }
  }

  // Барлық API-ларды тексеру
  async checkAllAPIs(): Promise<APIStatus[]> {
    const checks = await Promise.all([this.checkSupabase(), this.checkStripe(), this.checkPayBox()])

    return checks
  }

  // API статусын алу
  getAPIStatus(name: string): APIStatus | undefined {
    return this.apiStatuses.get(name.toLowerCase())
  }

  // Барлық статустарды алу
  getAllStatuses(): APIStatus[] {
    return Array.from(this.apiStatuses.values())
  }
}

// Глобальды instance
export const apiManager = APIManager.getInstance()
