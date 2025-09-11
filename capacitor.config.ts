import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "kz.mobframe.app",
  appName: "MobFrame",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1f2937",
      showSpinner: false,
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#1f2937",
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Camera: {
      permissions: {
        camera: "Камераны пайдалану үшін рұқсат керек",
        photos: "Фотоларға қол жеткізу үшін рұқсат керек",
      },
    },
  },
}

export default config
