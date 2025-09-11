import type { MetadataRoute } from "next"

// robots.txt - іздеу жүйелері үшін
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: "https://mobframe.kz/sitemap.xml",
  }
}
