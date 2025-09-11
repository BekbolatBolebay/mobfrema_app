import { supabase } from "@/lib/supabase/client"
import type { Media } from "@/lib/supabase/client"

export class MediaService {
  // Получить все медиа с пагинацией
  static async getMedia(page = 0, limit = 10, categoryId?: string) {
    let query = supabase
      .from("media")
      .select(`
        *,
        profiles:author_id (
          username,
          full_name,
          avatar_url
        ),
        categories:category_id (
          name,
          name_kz,
          icon,
          color
        )
      `)
      .order("created_at", { ascending: false })
      .range(page * limit, (page + 1) * limit - 1)

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  // Загрузить медиа файл
  static async uploadMedia(file: File, metadata: Partial<Media>) {
    const user = await supabase.auth.getUser()
    if (!user.data.user) throw new Error("Пользователь не авторизован")

    // Загружаем файл в Supabase Storage
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `media/${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage.from("media-files").upload(filePath, file)

    if (uploadError) throw uploadError

    // Получаем публичный URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("media-files").getPublicUrl(filePath)

    // Создаем запись в базе данных
    const { data, error } = await supabase
      .from("media")
      .insert({
        ...metadata,
        file_url: publicUrl,
        file_size: file.size,
        file_type: file.type,
        author_id: user.data.user.id,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Лайкнуть/убрать лайк
  static async toggleLike(mediaId: string) {
    const user = await supabase.auth.getUser()
    if (!user.data.user) throw new Error("Пользователь не авторизован")

    // Проверяем, есть ли уже лайк
    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", user.data.user.id)
      .eq("media_id", mediaId)
      .single()

    if (existingLike) {
      // Убираем лайк
      const { error } = await supabase.from("likes").delete().eq("user_id", user.data.user.id).eq("media_id", mediaId)

      if (error) throw error
      return { liked: false }
    } else {
      // Добавляем лайк
      const { error } = await supabase.from("likes").insert({
        user_id: user.data.user.id,
        media_id: mediaId,
      })

      if (error) throw error
      return { liked: true }
    }
  }
}
