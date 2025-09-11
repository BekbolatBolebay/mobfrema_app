import { type NextRequest, NextResponse } from "next/server"

// Cloudflare R2 - 10GB АҚЫСЫЗ!
export async function POST(request: NextRequest) {
  try {
    const file = await request.blob()
    const fileName = request.headers.get("X-File-Name") || "unknown"

    // Cloudflare R2 S3-compatible API
    const r2Config = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
      bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    }

    const uploadUrl = `https://${r2Config.accountId}.r2.cloudflarestorage.com/${r2Config.bucketName}/${fileName}`

    // R2-ға жүктеу
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "application/octet-stream",
        // AWS S3 signature керек (немесе Cloudflare Workers арқылы)
      },
    })

    if (!uploadResponse.ok) {
      throw new Error("R2 жүктеу сәтсіз")
    }

    // Публикалық URL
    const publicUrl = `https://pub-${r2Config.accountId}.r2.dev/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      provider: "cloudflare-r2",
      size: file.size,
    })
  } catch (error) {
    console.error("Cloudflare R2 қатесі:", error)
    return NextResponse.json({ error: "Жүктеу сәтсіз" }, { status: 500 })
  }
}
