import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PWAProvider } from "@/components/providers/pwa-provider"
import { CapacitorProvider } from "@/components/providers/capacitor-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "MobFrame - Мобилографтар платформасы",
  description: "Мобилографтар, бейнеграфтар және клиенттерді байланыстыратын платформа",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MobFrame",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "MobFrame",
    title: "MobFrame - Мобилографтар платформасы",
    description: "Мобилографтар, бейнеграфтар және клиенттерді байланыстыратын платформа",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#06b6d4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kk">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <PWAProvider>
          <CapacitorProvider>{children}</CapacitorProvider>
        </PWAProvider>
      </body>
    </html>
  )
}
