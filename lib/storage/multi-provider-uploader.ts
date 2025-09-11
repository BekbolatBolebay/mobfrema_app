// Бірнеше провайдерге бір уақытта жүктеу

import { CloudflareR2Service } from "./cloudflare-r2-service"
import { BackblazeB2Service } from "./backblaze-b2-service"
import { GoogleDriveService } from "./google-drive-service"
import { MegaService } from "./mega-service"
import { SupabaseService } from "./supabase-service"
import { SmartStorageRouter } from "./smart-storage-router"
import { freeStorageProviders } from "./free-storage-providers"
import type { File } from "./file"
import type { UploadResult } from "./upload-result"

export class MultiProviderUploader {
  private providers = {
    cloudflareR2: new CloudflareR2Service(),
    backblazeB2: new BackblazeB2Service(),
    googleDrive: new GoogleDriveService(),
    mega: new MegaService(),
    supabase: new SupabaseService(),
  }

  // Файлды ең жақсы провайдерге жүктеу
  async uploadFile(file: File): Promise<UploadResult> {
    const provider = SmartStorageRouter.selectProvider(file.size, file.type)

    console.log(`📁 ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB) → ${provider.name}`)

    try {
      switch (provider.name) {
        case "Cloudflare R2":
          return await this.providers.cloudflareR2.upload(file)
        case "Backblaze B2":
          return await this.providers.backblazeB2.upload(file)
        case "Google Drive API":
          return await this.providers.googleDrive.upload(file)
        case "MEGA API":
          return await this.providers.mega.upload(file)
        case "Supabase Storage":
          return await this.providers.supabase.upload(file)
        default:
          throw new Error("Провайдер табылмады")
      }
    } catch (error) {
      // Егер бір провайдер жұмыс істемесе, басқасын қолдану
      console.warn(`${provider.name} сәтсіз, резервті провайдерді қолданамыз...`)
      return await this.uploadToFallback(file)
    }
  }

  // Резервті жүктеу
  private async uploadToFallback(file: File): Promise<UploadResult> {
    const fallbackOrder = ["Cloudflare R2", "Backblaze B2", "Google Drive API", "Supabase Storage"]

    for (const providerName of fallbackOrder) {
      try {
        const provider = freeStorageProviders.find((p) => p.name === providerName)!
        const fileSizeMB = file.size / (1024 * 1024)

        if (fileSizeMB <= provider.maxFileSize) {
          console.log(`🔄 Резервті жүктеу: ${providerName}`)

          switch (providerName) {
            case "Cloudflare R2":
              return await this.providers.cloudflareR2.upload(file)
            case "Backblaze B2":
              return await this.providers.backblazeB2.upload(file)
            case "Google Drive API":
              return await this.providers.googleDrive.upload(file)
            case "Supabase Storage":
              return await this.providers.supabase.upload(file)
          }
        }
      } catch (error) {
        console.warn(`${providerName} да сәтсіз`)
        continue
      }
    }

    throw new Error("Барлық провайдерлер сәтсіз")
  }

  // Файлды бірнеше жерге бэкап жасау (маңызды файлдар үшін)
  async uploadWithBackup(file: File): Promise<UploadResult[]> {
    const primaryProvider = SmartStorageRouter.selectProvider(file.size, file.type)
    const backupProviders = freeStorageProviders
      .filter((p) => p.name !== primaryProvider.name && file.size / 1024 / 1024 <= p.maxFileSize)
      .slice(0, 2) // 2 резервті көшірме

    const results: UploadResult[] = []

    // Негізгі жүктеу
    try {
      const primaryResult = await this.uploadFile(file)
      results.push(primaryResult)
    } catch (error) {
      console.error("Негізгі жүктеу сәтсіз:", error)
    }

    // Резервті жүктеулер
    for (const backupProvider of backupProviders) {
      try {
        const backupResult = await this.uploadToProvider(file, backupProvider.name)
        results.push(backupResult)
      } catch (error) {
        console.warn(`Резервті жүктеу сәтсіз (${backupProvider.name}):`, error)
      }
    }

    return results
  }

  private async uploadToProvider(file: File, providerName: string): Promise<UploadResult> {
    switch (providerName) {
      case "Cloudflare R2":
        return await this.providers.cloudflareR2.upload(file)
      case "Backblaze B2":
        return await this.providers.backblazeB2.upload(file)
      case "Google Drive API":
        return await this.providers.googleDrive.upload(file)
      case "MEGA API":
        return await this.providers.mega.upload(file)
      case "Supabase Storage":
        return await this.providers.supabase.upload(file)
      default:
        throw new Error("Белгісіз провайдер")
    }
  }
}
