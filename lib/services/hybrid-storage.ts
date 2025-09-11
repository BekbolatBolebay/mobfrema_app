// Умное распределение файлов по хранилищам

export class HybridStorageService {
  // Определяем, куда загружать файл
  static getStorageProvider(fileSize: number, fileType: string) {
    // Маленькие файлы (< 10MB) - Supabase
    if (fileSize < 10 * 1024 * 1024) {
      return "supabase"
    }

    // Большие видео файлы - Yandex Cloud
    if (fileType.startsWith("video/")) {
      return "yandex-cloud"
    }

    // Остальное - Supabase
    return "supabase"
  }

  // Загрузка с автоматическим выбором хранилища
  static async uploadFile(file: File) {
    const provider = this.getStorageProvider(file.size, file.type)

    switch (provider) {
      case "supabase":
        return this.uploadToSupabase(file)
      case "yandex-cloud":
        return this.uploadToYandexCloud(file)
      default:
        throw new Error("Неподдерживаемый провайдер")
    }
  }

  private static async uploadToSupabase(file: File) {
    // Supabase загрузка
    const { supabase } = await import("@/lib/supabase/client")

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { data, error } = await supabase.storage.from("media-files").upload(filePath, file)

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage.from("media-files").getPublicUrl(filePath)

    return { url: publicUrl, provider: "supabase" }
  }

  private static async uploadToYandexCloud(file: File) {
    // Yandex Cloud загрузка (через API)
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/storage/yandex-upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) throw new Error("Yandex Cloud загрузка не удалась")

    const result = await response.json()
    return { url: result.url, provider: "yandex-cloud" }
  }
}
