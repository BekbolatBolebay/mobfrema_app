import { type NextRequest, NextResponse } from "next/server"

// Yandex Object Storage интеграция
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 })
    }

    // Yandex Cloud S3 API
    const yandexConfig = {
      accessKeyId: process.env.YANDEX_ACCESS_KEY_ID!,
      secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY!,
      region: "ru-central1",
      bucket: process.env.YANDEX_BUCKET_NAME!,
    }

    // Здесь используем AWS SDK для S3-совместимого API
    const fileName = `uploads/${Date.now()}-${file.name}`

    // Простая загрузка через fetch (в продакшене используйте AWS SDK)
    const uploadUrl = `https://storage.yandexcloud.net/${yandexConfig.bucket}/${fileName}`

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
        // Здесь нужна правильная авторизация для Yandex Cloud
      },
    })

    if (!uploadResponse.ok) {
      throw new Error("Загрузка в Yandex Cloud не удалась")
    }

    const publicUrl = `https://storage.yandexcloud.net/${yandexConfig.bucket}/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      provider: "yandex-cloud",
    })
  } catch (error) {
    console.error("Yandex upload error:", error)
    return NextResponse.json({ error: "Загрузка не удалась" }, { status: 500 })
  }
}
