export async function sendOneSignalNotification(message: string) {
  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Basic ${process.env.ONESIGNAL_REST_API_KEY}`, // REST API Key
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID, // OneSignal App ID
      contents: { en: message },
      included_segments: ["All"],
    }),
  });

  return response.json();
}
