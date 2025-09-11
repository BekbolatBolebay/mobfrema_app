// Google Drive API интеграциясы - 15GB тегін!

interface GoogleDriveUploadResult {
  success: boolean
  url: string
  provider: string
  fileId?: string
  error?: string
}

export class GoogleDriveService {
  private config = {
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET!,
    refreshToken: process.env.GOOGLE_DRIVE_REFRESH_TOKEN!,
  }

  private accessToken = ""

  async upload(file: File): Promise<GoogleDriveUploadResult> {
    try {
      // 1. Access token алу
      await this.refreshAccessToken()

      // 2. Файлды жүктеу
      const metadata = {
        name: file.name,
        parents: ["1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"], // MobFrame папкасы
      }

      const form = new FormData()
      form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }))
      form.append("file", file)

      const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: form,
      })

      if (!response.ok) {
        throw new Error(`Google Drive жүктеу сәтсіз: ${response.statusText}`)
      }

      const result = await response.json()

      // 3. Файлды публикалық ету
      await this.makeFilePublic(result.id)

      const publicUrl = `https://drive.google.com/file/d/${result.id}/view`

      return {
        success: true,
        url: publicUrl,
        provider: "Google Drive",
        fileId: result.id,
      }
    } catch (error) {
      return {
        success: false,
        url: "",
        provider: "Google Drive",
        error: error.message,
      }
    }
  }

  private async refreshAccessToken() {
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.config.refreshToken,
          grant_type: "refresh_token",
        }),
      })

      const data = await response.json()

      if (data.access_token) {
        this.accessToken = data.access_token
      } else {
        throw new Error("Access token алу сәтсіз")
      }
    } catch (error) {
      throw new Error(`Google Drive аутентификация қатесі: ${error.message}`)
    }
  }

  private async makeFilePublic(fileId: string) {
    await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "reader",
        type: "anyone",
      }),
    })
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.refreshAccessToken()
      return true
    } catch {
      return false
    }
  }
}
