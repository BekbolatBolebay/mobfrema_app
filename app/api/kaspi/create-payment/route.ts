import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, description } = await request.json()

    // Kaspi API-мен интеграция
    // Бұл жерде Kaspi-дің нақты API endpoint-тарын пайдалану керек
    const kaspiResponse = await fetch("https://api.kaspi.kz/payments/qr", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KASPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description,
        currency: "KZT",
        merchant_id: process.env.KASPI_MERCHANT_ID,
      }),
    })

    const paymentData = await kaspiResponse.json()

    return NextResponse.json({
      success: true,
      qr_code: paymentData.qr_code,
      payment_id: paymentData.payment_id,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Төлем жасау кезінде қате орын алды" }, { status: 500 })
  }
}
