// Контент маркетинг - пайдалы мазмұн арқылы тартып алу

export class ContentMarketingService {
  // SEO-дос блог посттары
  static blogPosts = [
    {
      slug: "mobilografiya-negizder",
      title: "Мобилография негіздері: Телефонмен кәсіби фото түсіру",
      description: "Телефонмен кәсіби сапалы фото түсірудің 10 негізгі ережесі",
      keywords: ["мобилография", "телефон фото", "фото түсіру кеңестері"],
      content: `
# Мобилография негіздері

## 1. Жарық - ең маңызды фактор
Табиғи жарықты пайдаланыңыз...

## 2. Композиция ережелері
Үштен бір ережесін қолданыңыз...

[Толық мақала...]
      `,
    },
    {
      slug: "video-montazh-bastalgyshylar",
      title: "Видео монтаж бастаушыларға: Қадам-қадаммен нұсқаулық",
      description: "Ақысыз бағдарламалармен кәсіби видео монтаж жасау",
      keywords: ["видео монтаж", "бастаушыларға", "ақысыз бағдарламалар"],
      content: "...",
    },
  ]

  // YouTube контент идеялары
  static youtubeContent = [
    {
      title: "Қазақстандағы ең жақсы фото орындары",
      description: "Алматы мен Астанадағы Instagram-дық фото орындар",
      tags: ["фотография", "қазақстан", "алматы", "астана"],
    },
    {
      title: "1000 теңгеге кәсіби фото түсіру",
      description: "Арзан бюджетпен сапалы фотосессия ұйымдастыру",
      tags: ["арзан фото", "бюджет", "фотосессия"],
    },
  ]

  // TikTok трендтері
  static tiktokTrends = [
    {
      hashtag: "#МобилографКЗ",
      idea: "Телефонмен түсірілген керемет кадрлар",
      music: "Trending казахские треки",
    },
    {
      hashtag: "#ФотоВызовКЗ",
      idea: "Фотографтар арасындағы челлендж",
      music: "Популярные треки",
    },
  ]

  // Автоматты хэштег генератор
  static generateHashtags(category: string, location?: string) {
    const baseHashtags = {
      photography: ["#фотография", "#фото", "#photography", "#mobilography"],
      videography: ["#видео", "#видеосъемка", "#videography", "#filming"],
      smm: ["#smm", "#маркетинг", "#реклама", "#контент"],
    }

    const locationHashtags = location ? [`#${location}`, `#${location}фото`] : []
    const brandHashtags = ["#MobFrame", "#МобФрейм", "#КЗФотограф"]

    return [...(baseHashtags[category] || []), ...locationHashtags, ...brandHashtags]
  }
}
