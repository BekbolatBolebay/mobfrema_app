// Cloudflare R2 - 10GB ТЕГІН!

interface UploadResult {
  success: boolean
  url: string
  provider: string
  fileId?: string
  error?: string
}

export class CloudflareR2Service {
  private config = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  }

  async upload(file: File): Promise<UploadResult> {
    try {
      const fileName = `${Date.now()}-${file.name}`
      const uploadUrl = `${this.config.endpoint}/${this.config.bucketName}/${fileName}`

      // Multipart upload үлкен файлдар үшін
      if (file.size > 100 * 1024 * 1024) {
        // 100MB+
        return await this.multipartUpload(file, fileName)
      }

      // Қарапайым жүктеу
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
          Authorization: this.generateAuthHeader("PUT", fileName),
        },
      })

      if (!response.ok) {
        throw new Error(`R2 жүктеу сәтсіз: ${response.statusText}`)
      }

      const publicUrl = `https://pub-${this.config.accountId}.r2.dev/${fileName}`

      return {
        success: true,
        url: publicUrl,
        provider: "Cloudflare R2",
        fileId: fileName,
      }
    } catch (error) {
      return {
        success: false,
        url: "",
        provider: "Cloudflare R2",
        error: error.message,
      }
    }
  }

  // Үлкен файлдар үшін multipart upload
  private async multipartUpload(file: File, fileName: string): Promise<UploadResult> {
    const chunkSize = 10 * 1024 * 1024 // 10MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize)

    console.log(`📦 Multipart жүктеу: ${totalChunks} бөлік`)

    try {
      // 1. Multipart upload бастау
      const initResponse = await fetch(`${this.config.endpoint}/${this.config.bucketName}/${fileName}?uploads`, {
        method: "POST",
        headers: {
          Authorization: this.generateAuthHeader("POST", fileName),
        },
      })

      const initData = await initResponse.text()
      const uploadId = this.extractUploadId(initData)

      // 2. Бөліктерді жүктеу
      const uploadPromises = []
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize
        const end = Math.min(start + chunkSize, file.size)
        const chunk = file.slice(start, end)

        uploadPromises.push(this.uploadChunk(chunk, fileName, uploadId, i + 1))
      }

      const parts = await Promise.all(uploadPromises)

      // 3. Multipart upload аяқтау
      await this.completeMultipartUpload(fileName, uploadId, parts)

      const publicUrl = `https://pub-${this.config.accountId}.r2.dev/${fileName}`

      return {
        success: true,
        url: publicUrl,
        provider: "Cloudflare R2",
        fileId: fileName,
      }
    } catch (error) {
      return {
        success: false,
        url: "",
        provider: "Cloudflare R2",
        error: error.message,
      }
    }
  }

  private async uploadChunk(chunk: Blob, fileName: string, uploadId: string, partNumber: number) {
    const response = await fetch(
      `${this.config.endpoint}/${this.config.bucketName}/${fileName}?partNumber=${partNumber}&uploadId=${uploadId}`,
      {
        method: "PUT",
        body: chunk,
        headers: {
          Authorization: this.generateAuthHeader("PUT", fileName),
        },
      },
    )

    const etag = response.headers.get("ETag")
    return { partNumber, etag }
  }

  private async completeMultipartUpload(fileName: string, uploadId: string, parts: any[]) {
    const completeXML = `
      <CompleteMultipartUpload>
        ${parts
          .map(
            (part) => `
          <Part>
            <PartNumber>${part.partNumber}</PartNumber>
            <ETag>${part.etag}</ETag>
          </Part>
        `,
          )
          .join("")}
      </CompleteMultipartUpload>
    `

    await fetch(`${this.config.endpoint}/${this.config.bucketName}/${fileName}?uploadId=${uploadId}`, {
      method: "POST",
      body: completeXML,
      headers: {
        "Content-Type": "application/xml",
        Authorization: this.generateAuthHeader("POST", fileName),
      },
    })
  }

  private generateAuthHeader(method: string, fileName: string): string {
    // AWS Signature V4 (жеңілдетілген нұсқа)
    // Нақты жобада AWS SDK пайдаланыңыз
    return `AWS4-HMAC-SHA256 Credential=${this.config.accessKeyId}/...`
  }

  private extractUploadId(xml: string): string {
    const match = xml.match(/<UploadId>([^<]+)<\/UploadId>/)
    return match ? match[1] : ""
  }
}
