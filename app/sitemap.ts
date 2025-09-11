import type { MetadataRoute } from "next"

// Автоматты sitemap - Google/Yandex индексациясы үшін
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mobframe.kz"

  // Статикалық беттер
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/photographers`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/materials`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]

  // Динамикалық беттер (блог, портфолио)
  // Бұл жерде базадан деректерді алып, динамикалық URL-дер қосуға болады

  return staticPages
}
