"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Capacitor } from "@capacitor/core"
import { StatusBar, Style } from "@capacitor/status-bar"
import { SplashScreen } from "@capacitor/splash-screen"
import { App } from "@capacitor/app"
import { Keyboard } from "@capacitor/keyboard"

export function CapacitorProvider({ children }: { children: React.ReactNode }) {
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    const initCapacitor = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true)

        // Status Bar конфигурациясы
        await StatusBar.setStyle({ style: Style.Dark })
        await StatusBar.setBackgroundColor({ color: "#1f2937" })

        // Splash Screen жасыру
        await SplashScreen.hide()

        // Back button өңдеу
        App.addListener("backButton", ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp()
          } else {
            window.history.back()
          }
        })

        // Keyboard events
        Keyboard.addListener("keyboardWillShow", (info) => {
          document.body.style.paddingBottom = `${info.keyboardHeight}px`
        })

        Keyboard.addListener("keyboardWillHide", () => {
          document.body.style.paddingBottom = "0px"
        })
      }
    }

    initCapacitor()
  }, [])

  return <div className={isNative ? "native-app" : "web-app"}>{children}</div>
}
