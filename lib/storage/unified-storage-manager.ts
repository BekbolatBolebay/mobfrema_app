// Барлық 4 провайдерді біріктіретін ақылды жүйе

import { CloudflareR2Service } from "./providers/cloudflare-r2"
import { BackblazeB2Service } from "./providers/backblaze-b2"
import { GoogleDriveService } from "./providers/google-drive"
import { MegaService } from "./providers/mega"
import { SupabaseService } from "./providers/supabase"

export interface StorageProvider {
  name: string
  service: any
  freeLimit: number // GB
  maxFileSize: number // MB
  currentUsage: number // GB
  speed: "slow" | "medium" | "fast" | "ultra"
  reliability: number // 1-10
  setupComplexity: "easy" | "medium" | "hard"
}

export class UnifiedStorageManager {
  private providers: StorageProvider[] = [
    {
      name: "MEGA",
      service: new MegaService(),
      freeLimit: 20,
      maxFileSize: 1000, // 1GB
      currentUsage: 0,
      speed: "medium",
      reliability: 8,
      setupComplexity: "medium",
    },
    {
      name: "Google Drive",
      service: new GoogleDriveService(),
      freeLimit: 15,
      maxFileSize: 5000, // 5GB
      currentUsage: 0,
      speed: "fast",
      reliability: 9,
      setupComplexity: "hard",
    },
    {
      name: "Cloudflare R2",
      service: new CloudflareR2Service(),
      freeLimit: 10,
      maxFileSize: 5000, // 5GB
      currentUsage: 0,
      speed: "ultra",
      reliability: 9,
      setupComplexity: "medium",
    },
    {
      name: "Backblaze B2",
      service: new BackblazeB2Service(),
      freeLimit: 10,
      maxFileSize: 5000, // 5GB
      currentUsage: 0,
      speed: "fast",
      reliability: 8,
      setupComplexity: "medium",
    },
    {
      name: "Supabase",
      service: new SupabaseService(),
      freeLimit: 1,
      maxFileSize: 50, // 50MB
      currentUsage: 0,
      speed: "fast",
      reliability: 9,
      setupComplexity: "easy",
    },
  ]

  // Файл үшін ең жақсы провайдерді таңдау
  selectOptimalProvider(fileSize: number, fileType: string, priority: "speed" | "space" | "reliability" = "space") {
    const fileSizeMB = fileSize / (1024 * 1024)
    const fileSizeGB = fileSizeMB / 1024

    // Файл өлшемі бойынша сүзу
    const compatibleProviders = this.providers.filter((provider) => {
      const hasSpace = provider.currentUsage + fileSizeGB <= provider.freeLimit * 0.95 // 95% лимит
      const canHandleSize = fileSizeMB <= provider.maxFileSize
      return hasSpace && canHandleSize
    })

    if (compatibleProviders.length === 0) {
      throw new Error("Барлық провайдерлерде орын жетіспейді!")
    }

    // Приоритет бойынша сұрыптау
    switch (priority) {
      case "speed":
        return this.sortBySpeed(compatibleProviders)[0]
      case "reliability":
        return this.sortByReliability(compatibleProviders)[0]
      case "space":
      default:
        return this.sortByAvailableSpace(compatibleProviders)[0]
    }
  }

  // Файлды жүктеу (автоматты провайдер таңдаумен)
  async uploadFile(
    file: File,
    options: {
      priority?: "speed" | "space" | "reliability"
      createBackups?: boolean
      maxBackups?: number
    } = {},
  ) {
    const { priority = "space", createBackups = true, maxBackups = 2 } = options

    try {
      // Негізгі провайдерді таңдау
      const primaryProvider = this.selectOptimalProvider(file.size, file.type, priority)

      console.log(`📁 ${file.name} → ${primaryProvider.name} (негізгі)`)

      // Негізгі жүктеу
      const primaryResult = await primaryProvider.service.upload(file)

      if (!primaryResult.success) {
        throw new Error(`${primaryProvider.name} жүктеу сәтсіз: ${primaryResult.error}`)
      }

      // Провайдер қолданылған орнын жаңарту
      primaryProvider.currentUsage += file.size / (1024 * 1024 * 1024)

      const results = [primaryResult]

      // Резервті көшірмелер жасау
      if (createBackups) {
        const backupProviders = this.selectBackupProviders(file.size, file.type, primaryProvider.name, maxBackups)

        for (const backupProvider of backupProviders) {
          try {
            console.log(`💾 ${file.name} → ${backupProvider.name} (резерв)`)
            const backupResult = await backupProvider.service.upload(file)

            if (backupResult.success) {
              backupProvider.currentUsage += file.size / (1024 * 1024 * 1024)
              results.push(backupResult)
            }
          } catch (error) {
            console.warn(`Резервті жүктеу сәтсіз (${backupProvider.name}):`, error)
          }
        }
      }

      return {
        success: true,
        primary: primaryResult,
        backups: results.slice(1),
        totalCopies: results.length,
        providers: results.map((r) => r.provider),
      }
    } catch (error) {
      console.error("Жүктеу қатесі:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Резервті провайдерлерді таңдау
  private selectBackupProviders(fileSize: number, fileType: string, excludeProvider: string, maxBackups: number) {
    const fileSizeMB = fileSize / (1024 * 1024)
    const fileSizeGB = fileSizeMB / 1024

    return this.providers
      .filter((provider) => {
        const isNotPrimary = provider.name !== excludeProvider
        const hasSpace = provider.currentUsage + fileSizeGB <= provider.freeLimit * 0.95
        const canHandleSize = fileSizeMB <= provider.maxFileSize
        return isNotPrimary && hasSpace && canHandleSize
      })
      .sort((a, b) => b.reliability - a.reliability) // Сенімділік бойынша
      .slice(0, maxBackups)
  }

  // Жылдамдық бойынша сұрыптау
  private sortBySpeed(providers: StorageProvider[]) {
    const speedOrder = { ultra: 4, fast: 3, medium: 2, slow: 1 }
    return providers.sort((a, b) => speedOrder[b.speed] - speedOrder[a.speed])
  }

  // Сенімділік бойынша сұрыптау
  private sortByReliability(providers: StorageProvider[]) {
    return providers.sort((a, b) => b.reliability - a.reliability)
  }

  // Қолжетімді орын бойынша сұрыптау
  private sortByAvailableSpace(providers: StorageProvider[]) {
    return providers.sort((a, b) => {
      const aAvailable = a.freeLimit - a.currentUsage
      const bAvailable = b.freeLimit - b.currentUsage
      return bAvailable - aAvailable
    })
  }

  // Барлық провайдерлердің статистикасы
  getStorageStats() {
    const totalLimit = this.providers.reduce((sum, p) => sum + p.freeLimit, 0)
    const totalUsed = this.providers.reduce((sum, p) => sum + p.currentUsage, 0)
    const totalAvailable = totalLimit - totalUsed

    return {
      providers: this.providers.map((p) => ({
        name: p.name,
        limit: p.freeLimit,
        used: p.currentUsage,
        available: p.freeLimit - p.currentUsage,
        percentage: (p.currentUsage / p.freeLimit) * 100,
        status: p.currentUsage / p.freeLimit > 0.9 ? "full" : p.currentUsage / p.freeLimit > 0.7 ? "warning" : "ok",
      })),
      total: {
        limit: totalLimit,
        used: totalUsed,
        available: totalAvailable,
        percentage: (totalUsed / totalLimit) * 100,
      },
    }
  }

  // Провайдерлердің қолжетімділігін тексеру
  async checkProvidersHealth() {
    const healthChecks = await Promise.allSettled(
      this.providers.map(async (provider) => {
        try {
          // Кіші тест файлын жүктеп көру
          const testResult = await provider.service.healthCheck?.()
          return {
            name: provider.name,
            status: testResult ? "healthy" : "unknown",
            responseTime: Date.now(),
          }
        } catch (error) {
          return {
            name: provider.name,
            status: "error",
            error: error.message,
          }
        }
      }),
    )

    return healthChecks.map((result, index) => ({
      provider: this.providers[index].name,
      ...(result.status === "fulfilled" ? result.value : { status: "error", error: result.reason }),
    }))
  }

  // Ең жақсы провайдерді ұсыну
  recommendProvider(fileSize: number, fileType: string) {
    const fileSizeMB = fileSize / (1024 * 1024)

    // Файл түрі бойынша ұсыныстар
    const recommendations = {
      "image/": {
        small: "Supabase", // < 10MB
        medium: "Cloudflare R2", // 10-100MB
        large: "Google Drive", // > 100MB
      },
      "video/": {
        small: "Cloudflare R2", // < 100MB
        medium: "Backblaze B2", // 100MB-1GB
        large: "MEGA", // > 1GB (бірақ 1GB лимит)
      },
      "audio/": {
        small: "Supabase",
        medium: "Cloudflare R2",
        large: "Google Drive",
      },
      default: {
        small: "Supabase",
        medium: "Cloudflare R2",
        large: "Google Drive",
      },
    }

    const category = Object.keys(recommendations).find((key) => fileType.startsWith(key)) || "default"
    const sizeCategory = fileSizeMB < 10 ? "small" : fileSizeMB < 100 ? "medium" : "large"

    return recommendations[category][sizeCategory]
  }
}

// Глобальды instance
export const storageManager = new UnifiedStorageManager()
