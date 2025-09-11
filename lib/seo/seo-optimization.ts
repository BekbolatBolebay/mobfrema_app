// SEO оптимизация - Google/Yandex-те жоғары шығу үшін

export const seoConfig = {
  // Негізгі кілт сөздер (қазақша + орысша)
  keywords: {
    kz: [
      "мобилограф қазақстан",
      "фотограф алматы",
      "бейнеграф астана",
      "фото түсіру қызметі",
      "видео монтаж",
      "SMM маман",
      "креативті контент",
      "LUT пресеттер",
      "фото редакция",
      "бейне түсіру",
    ],
    ru: [
      "мобилограф казахстан",
      "фотограф алматы",
      "видеограф астана",
      "фотосъемка услуги",
      "видеомонтаж",
      "SMM специалист",
      "креативный контент",
      "LUT пресеты",
      "фоторедактирование",
      "видеосъемка",
    ],
  },

  // Мета теги
  generateMetaTags: (page: string, title: string, description: string) => ({
    title: `${title} | MobFrame - Мобилографтар платформасы`,
    description,
    keywords: seoConfig.keywords.kz.concat(seoConfig.keywords.ru).join(", "),
    openGraph: {
      title,
      description,
      url: `https://mobframe.kz/${page}`,
      siteName: "MobFrame",
      images: [
        {
          url: "https://mobframe.kz/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "kk_KZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://mobframe.kz/og-image.jpg"],
    },
  }),
}

// Автоматты sitemap генерация
export function generateSitemap() {
  const baseUrl = "https://mobframe.kz"
  const pages = [
    { url: "", priority: 1.0, changefreq: "daily" },
    { url: "/jobs", priority: 0.9, changefreq: "hourly" },
    { url: "/photographers", priority: 0.8, changefreq: "daily" },
    { url: "/portfolio", priority: 0.7, changefreq: "weekly" },
    { url: "/materials", priority: 0.6, changefreq: "weekly" },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("")}
</urlset>`

  return sitemap
}
