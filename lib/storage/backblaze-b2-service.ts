// Backblaze B2 - 10GB ТЕГІН!

interface UploadResult {
  success: boolean
  url: string
  provider: string
  fileId?: string
  error?: string
}

export class BackblazeB2Service {
  private config = {
    applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID!,
    applicationKey: process.env.BACKBLAZE_APPLICATION_KEY!,
    bucketId: process.env.BACKBLAZE_BUCKET_ID!,
  }

  private authToken = ""
  private apiUrl = ""
  private downloadUrl = ""

  async upload(file: File): Promise<UploadResult> {
    try {
      // 1. Авторизация
      await this.authorize()

      // 2. Upload URL алу
      const uploadAuth = await this.getUploadUrl()

      // 3. Файлды жүктеу
      const fileName = `${Date.now()}-${file.name}`

      const response = await fetch(uploadAuth.uploadUrl, {
        method: "POST",
        headers: {
          Authorization: uploadAuth.authorizationToken,
          "X-Bz-File-Name": encodeURIComponent(fileName),
          "Content-Type": file.type || "application/octet-stream",
          "X-Bz-Content-Sha1": "unverified", // Жеңілдетілген нұсқа
        },
        body: file,
      })

      if (!response.ok) {
        throw new Error(`B2 жүктеу сәтсіз: ${response.statusText}`)
      }

      const result = await response.json()
      const publicUrl = `${this.downloadUrl}/file/${result.bucketName}/${fileName}`

      return {
        success: true,
        url: publicUrl,
        provider: "Backblaze B2",
        fileId: result.fileId,
      }
    } catch (error) {
      return {
        success: false,
        url: "",
        provider: "Backblaze B2",
        error: error.message,
      }
    }
  }

  private async authorize() {
    const response = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account", {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${this.config.applicationKeyId}:${this.config.applicationKey}`)}`,
      },
    })

    const data = await response.json()
    this.authToken = data.authorizationToken
    this.apiUrl = data.apiUrl
    this.downloadUrl = data.downloadUrl
  }

  private async getUploadUrl() {
    const response = await fetch(`${this.apiUrl}/b2api/v2/b2_get_upload_url`, {
      method: "POST",
      headers: {
        Authorization: this.authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketId: this.config.bucketId,
      }),
    })

    return await response.json()
  }
}
