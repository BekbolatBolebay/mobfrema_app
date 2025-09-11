"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    // Service Worker тіркеу
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    // PWA орнату prompt-ын ұстау
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("Пайдаланушы PWA орнатуға келісті")
    } else {
      console.log("Пайдаланушы PWA орнатудан бас тартты")
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  return (
    <>
      {children}

      {/* PWA орнату prompt-ы */}
      {showInstallPrompt && (
        <div className="fixed bottom-20 left-4 right-4 z-50">
          <Card className="bg-gray-800 border-cyan-400">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm">MobFrame орнату</h3>
                  <p className="text-gray-300 text-xs">Жылдам қол жеткізу үшін телефонға орнатыңыз</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button size="sm" onClick={handleInstallClick} className="bg-cyan-600 hover:bg-cyan-700">
                    <Download className="w-4 h-4 mr-1" />
                    Орнату
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowInstallPrompt(false)}
                    className="text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
