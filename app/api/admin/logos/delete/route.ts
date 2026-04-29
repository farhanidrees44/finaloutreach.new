import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { supabaseDelete, supabaseQuery } from "@/lib/api/supabase"

export const runtime = "nodejs"

export async function DELETE(req: Request) {
  // Check admin authentication
  const authHeader = req.headers.get("authorization")
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Admin panel not configured" },
      { status: 500 }
    )
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { ok: false, error: "Missing authorization header" },
      { status: 401 }
    )
  }

  const token = authHeader.slice(7)
  if (token !== adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const logoId = searchParams.get("id")

    if (!logoId) {
      return NextResponse.json(
        { ok: false, error: "Logo ID is required" },
        { status: 400 }
      )
    }

    // Get logo metadata to find blob URL
    const logoResult = await supabaseQuery("uploaded_logos", {
      select: "id,blob_url",
    })

    if (!logoResult.ok || !Array.isArray(logoResult.data)) {
      return NextResponse.json(
        { ok: false, error: "Could not fetch logo metadata" },
        { status: 500 }
      )
    }

    const logo = logoResult.data.find((l: any) => l.id === logoId)
    if (!logo) {
      return NextResponse.json(
        { ok: false, error: "Logo not found" },
        { status: 404 }
      )
    }

    // Delete from Blob
    try {
      await del(logo.blob_url)
    } catch (err) {
      console.warn("[admin/logos/delete] Blob delete failed:", err)
      // Continue with Supabase deletion even if Blob fails
    }

    // Delete from Supabase
    const deleteResult = await supabaseDelete("uploaded_logos", logoId)

    if (!deleteResult.ok) {
      return NextResponse.json(
        { ok: false, error: deleteResult.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[admin/logos/delete] Error:", error)
    return NextResponse.json(
      { ok: false, error: "Failed to delete logo" },
      { status: 500 }
    )
  }
}
