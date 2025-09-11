import { type NextRequest, NextResponse } from "next/server"

// PayBox webhook для обработки уведомлений о платежах
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const params: Record<string, string> = {}

    // Получаем все параметры
    for (const [key, value] of formData.entries()) {
      params[key] = value.toString()
    }

    // Проверяем подпись (в реальном проекте)
    const receivedSignature = params.pg_sig
    // const calculatedSignature = calculateSignature(params)

    // if (receivedSignature !== calculatedSignature) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    // }

    const paymentId = params.pg_payment_id
    const orderId = params.pg_order_id
    const amount = params.pg_amount
    const status = params.pg_result

    // Обновляем статус заказа в базе данных
    if (status === "1") {
      // Платеж успешен
      console.log(`Төлем сәтті өтті: ${paymentId}, Тапсырыс: ${orderId}, Сома: ${amount}`)

      // Здесь обновляем базу данных
      // await updateOrderStatus(orderId, 'paid')

      return NextResponse.json({ pg_status: "ok" })
    } else {
      // Платеж не прошел
      console.log(`Төлем сәтсіз: ${paymentId}, Тапсырыс: ${orderId}`)

      // await updateOrderStatus(orderId, 'failed')

      return NextResponse.json({ pg_status: "error" })
    }
  } catch (error) {
    console.error("Webhook қатесі:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
