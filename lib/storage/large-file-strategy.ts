// Үлкен файлдарды тегін сақтау стратегиясы

export interface StorageProvider {
  name: string
  freeLimit: number // GB
  maxFileSize: number // MB
  uploadSpeed: "fast" | "medium" | "slow"
  reliability: "high" | "medium" | "low"
  apiComplexity: "easy" | "medium" | "hard"
  bestFor: string[]
}

export const freeStorageProviders: StorageProvider[] = [
  {
    name: "Cloudflare R2",
    freeLimit: 10, // 10GB ТЕГІН!
    maxFileSize: 5000, // 5GB файл
    uploadSpeed: "fast",
    reliability: "high",
    apiComplexity: "medium",
    bestFor: ["видео", "RAW фото", "үлкен файлдар"],
  },
  {
    name: "Backblaze B2",
    freeLimit: 10, // 10GB ТЕГІН!
    maxFileSize: 5000,
    uploadSpeed: "fast",
    reliability: "high",
    apiComplexity: "medium",
    bestFor: ["бэкап", "архив", "видео"],
  },
  {
    name: "Google Drive API",
    freeLimit: 15, // 15GB ТЕГІН!
    maxFileSize: 5000,
    uploadSpeed: "medium",
    reliability: "high",
    apiComplexity: "hard",
    bestFor: ["құжаттар", "фото", "видео"],
  },
  {
    name: "MEGA API",
    freeLimit: 20, // 20GB ТЕГІН!
    maxFileSize: 1000,
    uploadSpeed: "medium",
    reliability: "medium",
    apiComplexity: "hard",
    bestFor: ["жеке файлдар", "архив"],
  },
  {
    name: "GitHub LFS",
    freeLimit: 1, // 1GB тегін, бірақ көп аккаунт жасауға болады
    maxFileSize: 100,
    uploadSpeed: "slow",
    reliability: "high",
    apiComplexity: "easy",
    bestFor: ["кіші медиа файлдар", "ресурстар"],
  },
  {
    name: "Supabase Storage",
    freeLimit: 1, // 1GB тегін
    maxFileSize: 50,
    uploadSpeed: "fast",
    reliability: "high",
    apiComplexity: "easy",
    bestFor: ["аватарлар", "кіші фото", "иконкалар"],
  },
]

// Файл үшін ең жақсы провайдерді таңдау
export class SmartStorageRouter {
  static selectProvider(fileSize: number, fileType: string): StorageProvider {
    const fileSizeMB = fileSize / (1024 * 1024)

    // Кіші файлдар (< 10MB) - Supabase
    if (fileSizeMB < 10) {
      return freeStorageProviders.find((p) => p.name === "Supabase Storage")!
    }

    // Орташа файлдар (10-100MB) - Cloudflare R2
    if (fileSizeMB < 100) {
      return freeStorageProviders.find((p) => p.name === "Cloudflare R2")!
    }

    // Үлкен видео файлдар (100MB+) - Backblaze B2
    if (fileType.startsWith("video/")) {
      return freeStorageProviders.find((p) => p.name === "Backblaze B2")!
    }

    // Өте үлкен файлдар - MEGA
    if (fileSizeMB > 500) {
      return freeStorageProviders.find((p) => p.name === "MEGA API")!
    }

    // Әдепкі - Cloudflare R2
    return freeStorageProviders.find((p) => p.name === "Cloudflare R2")!
  }

  // Барлық тегін орынды есептеу
  static getTotalFreeStorage(): number {
    return freeStorageProviders.reduce((total, provider) => total + provider.freeLimit, 0)
  }
}
