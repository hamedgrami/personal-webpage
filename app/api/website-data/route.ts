import { NextResponse } from "next/server"
import { getWebsiteData } from "@/lib/data"

export async function GET() {
  try {
    const data = await getWebsiteData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching website data:", error)
    return NextResponse.json({ error: "Failed to fetch website data" }, { status: 500 })
  }
}
