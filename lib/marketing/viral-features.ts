// Вирусты функциялар - пайдаланушылар өздері жарнамалайды

export class ViralMarketingService {
  // Реферальная программа
  static generateReferralCode(userId: string): string {
    return `MF${userId.slice(0, 6).toUpperCase()}`
  }

  // Реферал сыйлығы
  static async processReferral(referrerCode: string, newUserId: string) {
    // Жаңа пайдаланушы тіркелгенде екеуіне де бонус
    const bonusAmount = 1000 // 1000 тенге бонус

    return {
      referrer: {
        bonus: bonusAmount,
        message: "Досыңызды шақырғаныңыз үшін 1000₸ бонус!",
      },
      newUser: {
        bonus: bonusAmount,
        message: "Тіркелгеніңіз үшін 1000₸ бонус!",
      },
    }
  }

  // Әлеуметтік бөлісу мотивациясы
  static generateShareContent(type: "portfolio" | "job" | "achievement") {
    const templates = {
      portfolio: {
        kz: "MobFrame платформасында менің жаңа жұмысым! 📸 #MobFrame #Фотограф #Қазақстан",
        ru: "Моя новая работа на платформе MobFrame! 📸 #MobFrame #Фотограф #Казахстан",
      },
      job: {
        kz: "MobFrame арқылы керемет тапсырыс тапты! 💼 Сіз де қосылыңыз! #MobFrame #Жұмыс",
        ru: "Нашел отличный заказ через MobFrame! 💼 Присоединяйтесь! #MobFrame #Работа",
      },
      achievement: {
        kz: "MobFrame-де жаңа деңгейге жеттім! 🏆 #MobFrame #Жетістік #Мобилограф",
        ru: "Достиг нового уровня в MobFrame! 🏆 #MobFrame #Достижение #Мобилограф",
      },
    }

    return templates[type]
  }

  // Геймификация - пайдаланушыларды белсенді ету
  static calculateUserLevel(stats: {
    completedJobs: number
    rating: number
    portfolioItems: number
  }) {
    const score = stats.completedJobs * 10 + stats.rating * 5 + stats.portfolioItems * 2

    const levels = [
      { name: "Жаңадан келген", min: 0, badge: "🌱" },
      { name: "Дамушы", min: 50, badge: "📸" },
      { name: "Кәсіпқой", min: 150, badge: "⭐" },
      { name: "Эксперт", min: 300, badge: "🏆" },
      { name: "Мастер", min: 500, badge: "👑" },
    ]

    const currentLevel = levels.reverse().find((level) => score >= level.min) || levels[0]
    return { ...currentLevel, score }
  }
}
