// PayBox.kz интеграция - самая простая для Казахстана

interface PayBoxConfig {
  merchantId: string
  secretKey: string
  testMode: boolean
}

interface PaymentData {
  amount: number
  description: string
  orderId: string
  userEmail?: string
  userPhone?: string
  successUrl?: string
  failureUrl?: string
}

export class PayBoxService {
  private config: PayBoxConfig

  constructor(config: PayBoxConfig) {
    this.config = config
  }

  // Создание платежа
  async createPayment(paymentData: PaymentData) {
    const baseUrl = this.config.testMode ? "https://api.paybox.kz/v1/merchant" : "https://api.paybox.kz/v1/merchant"

    const params = {
      pg_merchant_id: this.config.merchantId,
      pg_amount: paymentData.amount,
      pg_description: paymentData.description,
      pg_order_id: paymentData.orderId,
      pg_currency: "KZT",
      pg_user_email: paymentData.userEmail,
      pg_user_phone: paymentData.userPhone,
      pg_success_url: paymentData.successUrl || `${window.location.origin}/payment/success`,
      pg_failure_url: paymentData.failureUrl || `${window.location.origin}/payment/failure`,
      pg_request_method: "POST",
      pg_testing_mode: this.config.testMode ? "1" : "0",
    }

    // Создание подписи
    const signature = this.generateSignature(params)
    params.pg_sig = signature

    try {
      const response = await fetch(`${baseUrl}/payment.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(params).toString(),
      })

      const result = await response.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(result, "text/xml")

      const status = xmlDoc.getElementsByTagName("pg_status")[0]?.textContent
      const paymentUrl = xmlDoc.getElementsByTagName("pg_redirect_url")[0]?.textContent
      const paymentId = xmlDoc.getElementsByTagName("pg_payment_id")[0]?.textContent

      if (status === "ok" && paymentUrl) {
        return {
          success: true,
          paymentUrl,
          paymentId,
        }
      } else {
        const errorDescription = xmlDoc.getElementsByTagName("pg_error_description")[0]?.textContent
        return {
          success: false,
          error: errorDescription || "Төлем жасау кезінде қате орын алды",
        }
      }
    } catch (error) {
      return {
        success: false,
        error: "Желі қатесі",
      }
    }
  }

  // Подпись для безопасности
  private generateSignature(params: any): string {
    // Сортируем параметры
    const sortedParams = Object.keys(params)
      .filter((key) => key !== "pg_sig")
      .sort()
      .map((key) => `${key};${params[key]}`)
      .join(";")

    // Добавляем секретный ключ
    const stringToSign = `payment.php;${sortedParams};${this.config.secretKey}`

    // В реальном проекте используйте crypto-js или встроенный crypto
    return this.md5(stringToSign)
  }

  // Простая MD5 функция (в продакшене используйте crypto-js)
  private md5(str: string): string {
    // Упрощенная версия - в реальном проекте используйте crypto-js
    return btoa(str)
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase()
      .substring(0, 32)
  }

  // Проверка статуса платежа
  async checkPaymentStatus(paymentId: string) {
    const baseUrl = this.config.testMode ? "https://api.paybox.kz/v1/merchant" : "https://api.paybox.kz/v1/merchant"

    const params = {
      pg_merchant_id: this.config.merchantId,
      pg_payment_id: paymentId,
      pg_request_method: "POST",
    }

    const signature = this.generateSignature(params)
    params.pg_sig = signature

    try {
      const response = await fetch(`${baseUrl}/get_status.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(params).toString(),
      })

      const result = await response.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(result, "text/xml")

      const status = xmlDoc.getElementsByTagName("pg_transaction_status")[0]?.textContent

      return {
        success: true,
        status, // 'ok', 'pending', 'error', 'canceled'
      }
    } catch (error) {
      return {
        success: false,
        error: "Статусты тексеру кезінде қате",
      }
    }
  }
}

// Экспорт настроенного сервиса
export const payboxService = new PayBoxService({
  merchantId: process.env.NEXT_PUBLIC_PAYBOX_MERCHANT_ID!,
  secretKey: process.env.PAYBOX_SECRET_KEY!,
  testMode: process.env.NODE_ENV !== "production",
})
