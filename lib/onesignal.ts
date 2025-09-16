// lib/onesignal.ts
import sendOneSignalNotification from "@/lib/onesignal";

export async function sendOneSignalNotification(message: string) {
  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Basic ${process.env.ONESIGNAL_API_KEY}`, // OneSignal API key
    },
    body: JSON.stringify({
      app_id: process.env.ONESIGNAL_APP_ID, // OneSignal App ID
      contents: { en: message },
      included_segments: ["All"], // Барлық қолданушыларға
    }),
  });

  if (!response.ok) {
    throw new Error(`OneSignal error: ${response.statusText}`);
  }

  return response.json();
}
