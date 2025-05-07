"use server"

import { saveWebsiteData } from "./data"

export async function updateWebsiteData(data: any) {
  try {
    await saveWebsiteData(data)
    return { success: true }
  } catch (error) {
    console.error("Error updating website data:", error)
    throw new Error("Failed to update website data")
  }
}
