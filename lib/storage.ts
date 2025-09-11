import { supabase } from "./auth"

// Файл жүктеу қызметі
export const storageService = {
  // Бейне/фото жүктеу
  async uploadMedia(file: File, bucket = "media") {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) {
      throw error
    }

    // Публикалық URL алу
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return { filePath, publicUrl }
  },

  // Файлды жою
  async deleteMedia(filePath: string, bucket = "media") {
    const { error } = await supabase.storage.from(bucket).remove([filePath])

    return { error }
  },
}
