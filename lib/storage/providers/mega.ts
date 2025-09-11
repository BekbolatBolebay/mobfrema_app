// MEGA API интеграциясы - 20GB тегін!

interface MegaUploadResult {
  success: boolean
  url: string
  provider: string
  fileId?: string
  error?: string
}

export class MegaService {
  private config = {
    email: process.env.MEGA_EMAIL!,
    password: process.env.MEGA_PASSWORD!,
  }

  private sessionId = ""
  private isAuthenticated = false

  async upload(file: File): Promise<MegaUploadResult> {
    try {
      // 1. Аутентификация
      if (!this.isAuthenticated) {
        await this.authenticate()
      }

      // 2. Upload URL алу
      const uploadUrl = await this.getUploadUrl(file.size)

      // 3. Файлды жүктеу
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          "X-MEGA-Session": this.sessionId,
        },
      })

      if (!response.ok) {
        throw new Error(`MEGA жүктеу сәтсіз: ${response.statusText}`)
      }

      const result = await response.json()

      // 4. Публикалық сілтеме жасау
      const publicUrl = await this.createPublicLink(result.fileId)

      return {
        success: true,
        url: publicUrl,
        provider: "MEGA",
        fileId: result.fileId,
      }
    } catch (error) {
      return {
        success: false,
        url: "",
        provider: "MEGA",
        error: error.message,
      }
    }
  }

  private async authenticate() {
    try {
      const response = await fetch("https://g.api.mega.co.nz/cs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            a: "us", // user session
            user: this.config.email,
            uh: await this.hashPassword(this.config.password),
          },
        ]),
      })

      const data = await response.json()

      if (data[0] && data[0].tsid) {
        this.sessionId = data[0].tsid
        this.isAuthenticated = true
      } else {
        throw new Error("MEGA аутентификация сәтсіз")
      }
    } catch (error) {
      throw new Error(`MEGA аутентификация қатесі: ${error.message}`)
    }
  }

  private async getUploadUrl(fileSize: number) {
    const response = await fetch("https://g.api.mega.co.nz/cs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MEGA-Session": this.sessionId,
      },
      body: JSON.stringify([
        {
          a: "u", // upload
          s: fileSize,
        },
      ]),
    })

    const data = await response.json()
    return data[0].p // upload URL
  }

  private async createPublicLink(fileId: string) {
    const response = await fetch("https://g.api.mega.co.nz/cs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MEGA-Session": this.sessionId,
      },
      body: JSON.stringify([
        {
          a: "l", // create link
          n: fileId,
        },
      ]),
    })

    const data = await response.json()
    return `https://mega.nz/file/${data[0]}`
  }

  private async hashPassword(password: string): Promise<string> {
    // MEGA password hashing (жеңілдетілген)
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isAuthenticated) {
        await this.authenticate()
      }
      return true
    } catch {
      return false
    }
  }
}
