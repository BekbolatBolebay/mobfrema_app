"use client"

import { useState, useEffect } from "react"
import { Capacitor } from "@capacitor/core"
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import { Share } from "@capacitor/share"
import { Haptics, ImpactStyle } from "@capacitor/haptics"
import { PushNotifications } from "@capacitor/push-notifications"

export function useNativeFeatures() {
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform())
  }, [])

  // Камера функциясы
  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      })

      return image.dataUrl
    } catch (error) {
      console.error("Фото түсіру кезінде қате:", error)
      return null
    }
  }

  // Галереядан фото таңдау
  const pickPhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      })

      return image.dataUrl
    } catch (error) {
      console.error("Фото таңдау кезінде қате:", error)
      return null
    }
  }

  // Бөлісу функциясы
  const shareContent = async (title: string, text: string, url?: string) => {
    try {
      await Share.share({
        title,
        text,
        url,
      })
    } catch (error) {
      console.error("Бөлісу кезінде қате:", error)
    }
  }

  // Haptic feedback
  const vibrate = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (isNative) {
      try {
        await Haptics.impact({ style })
      } catch (error) {
        console.error("Вибрация кезінде қате:", error)
      }
    }
  }

  // Push notifications орнату
  const setupPushNotifications = async () => {
    if (!isNative) return

    try {
      const permission = await PushNotifications.requestPermissions()

      if (permission.receive === "granted") {
        await PushNotifications.register()

        PushNotifications.addListener("registration", (token) => {
          console.log("Push registration success, token: " + token.value)
          // Токенді серверге жіберу
        })

        PushNotifications.addListener("registrationError", (error) => {
          console.error("Push registration error: ", error)
        })

        PushNotifications.addListener("pushNotificationReceived", (notification) => {
          console.log("Push received: ", notification)
        })

        PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
          console.log("Push action performed: ", notification)
        })
      }
    } catch (error) {
      console.error("Push notifications орнату кезінде қате:", error)
    }
  }

  return {
    isNative,
    takePhoto,
    pickPhoto,
    shareContent,
    vibrate,
    setupPushNotifications,
  }
}
