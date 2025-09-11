import { NextResponse } from "next/server"
import { apiManager } from "@/lib/api-integration"

export async function GET() {
  try {
    const statuses = await apiManager.checkAllAPIs()

    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      services: statuses,
      summary: {
        total: statuses.length,
        connected: statuses.filter((s) => s.status === "connected").length,
        errors: statuses.filter((s) => s.status === "error").length,
        not_configured: statuses.filter((s) => s.status === "not_configured").length,
      },
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
