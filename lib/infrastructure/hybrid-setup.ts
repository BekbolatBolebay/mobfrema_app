// Гибридті инфраструктура конфигурациясы

export const infrastructureConfig = {
  // Frontend - Vercel (Edge/CDN)
  frontend: {
    platform: "vercel",
    regions: ["fra1", "arn1"], // Европа + Азия
    features: ["edge-functions", "isr", "image-optimization"],
  },

  // Database - Supabase (Managed)
  database: {
    platform: "supabase",
    region: "eu-west-1", // Ближайший к КЗ
    features: ["realtime", "auth", "storage"],
  },

  // File Storage - Yandex Cloud (для больших файлов)
  storage: {
    primary: "supabase", // Для небольших файлов
    secondary: "yandex-cloud", // Для видео/больших файлов
    cdn: "cloudflare", // Для быстрой доставки
  },

  // Payments - PayBox.kz
  payments: {
    primary: "paybox",
    region: "kazakhstan",
    webhook_url: "/api/paybox/webhook",
  },
}
