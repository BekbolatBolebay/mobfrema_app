// Ақысыз сақтау стратегиясы - бірнеше провайдерді пайдалану

interface StorageProvider {
  name: string
  freeLimit: number // GB
  uploadLimit: number // MB per file
  used: number
}

export class FreeStorageStrategy {
  private providers: StorageProvider[] = [
    { name: "supabase", freeLimit: 1, uploadLimit: 50, used: 0 },
    { name: "cloudflare-r2", freeLimit: 10, uploadLimit: 100, used: 0 },
    { name: "backblaze-b2", freeLimit: 10, uploadLimit: 100, used: 0 },
    { name: "google-drive-api", freeLimit: 15, uploadLimit: 100, used: 0 },
    { name: "github-lfs", freeLimit: 1, uploadLimit: 100, used: 0 },
  ]

  // Ең жақсы провайдерді таңдау
  selectBestProvider(fileSize: number): string {
    const fileSizeMB = fileSize / (1024 * 1024)

    // Провайдерлерді сүзу
    const availableProviders = this.providers.filter((p) => {
      const remainingGB = p.freeLimit - p.used
      const remainingMB = remainingGB * 1024
      return remainingMB > fileSizeMB && fileSizeMB <= p.uploadLimit
    })

    if (availableProviders.length === 0) {
      throw new Error("Барлық ақысыз лимиттер таусылды")
    }

    // Ең көп орын қалған провайдерді таңдау
    return availableProviders.sort((a, b) => b.freeLimit - b.used - (a.freeLimit - a.used))[0].name
  }

  // Файлды дұрыс провайдерге жүктеу
  async uploadToOptimalProvider(file: File) {
    const provider = this.selectBestProvider(file.size)

    switch (provider) {
      case "supabase":
        return this.uploadToSupabase(file)
      case "cloudflare-r2":
        return this.uploadToCloudflareR2(file)
      case "backblaze-b2":
        return this.uploadToBackblazeB2(file)
      case "google-drive-api":
        return this.uploadToGoogleDrive(file)
      case "github-lfs":
        return this.uploadToGitHubLFS(file)
      default:
        throw new Error("Провайдер табылмады")
    }
  }

  private async uploadToCloudflareR2(file: File) {
    // Cloudflare R2 - 10GB ақысыз!
    const response = await fetch("/api/storage/cloudflare-r2", {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": file.type,
        "X-File-Name": file.name,
      },
    })

    return response.json()
  }

  private async uploadToBackblazeB2(file: File) {
    // Backblaze B2 - 10GB ақысыз!
    const response = await fetch("/api/storage/backblaze-b2", {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": file.type,
        "X-File-Name": file.name,
      },
    })

    return response.json()
  }

  private async uploadToSupabase(file: File) {
    const { supabase } = await import("@/lib/supabase/client")

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `media/${fileName}`

    const { data, error } = await supabase.storage.from("media-files").upload(filePath, file)

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage.from("media-files").getPublicUrl(filePath)

    return { url: publicUrl, provider: "supabase" }
  }

  private async uploadToGoogleDrive(file: File) {
    // Google Drive API - 15GB ақысыз!
    const response = await fetch("/api/storage/google-drive", {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": file.type,
        "X-File-Name": file.name,
      },
    })

    return response.json()
  }

  private async uploadToGitHubLFS(file: File) {
    // GitHub LFS - 1GB ақысыз (Git Large File Storage)
    const response = await fetch("/api/storage/github-lfs", {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": file.type,
        "X-File-Name": file.name,
      },
    })

    return response.json()
  }
}
