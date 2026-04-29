import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { supabaseInsert } from "@/lib/api/supabase"
import { z } from "zod"

export const runtime = "nodejs"

const AdminAuthSchema = z.object({
  adminPassword: z.string(),
})

const LogoUploadSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  file: z.instanceof(File),
  heightClass: z.string().default("h-7 sm:h-8"),
})

export async function POST(req: Request) {
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
    const formData = await req.formData()
    const companyName = formData.get("companyName") as string
    const heightClass = (formData.get("heightClass") as string) || "h-7 sm:h-8"
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ["image/svg+xml", "image/png"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Only SVG and PNG files are allowed",
        },
        { status: 400 }
      )
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: "File size must be less than 2MB" },
        { status: 400 }
      )
    }

    if (!companyName || companyName.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Company name is required" },
        { status: 400 }
      )
    }

    // Upload to Blob
    const filename = `logos/${Date.now()}-${companyName.replace(/\s+/g, "-").toLowerCase()}.${file.type === "image/svg+xml" ? "svg" : "png"}`

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    })

    // Save metadata to Supabase
    const fileType = file.type === "image/svg+xml" ? "svg" : "png"
    const result = await supabaseInsert("uploaded_logos", {
      company_name: companyName,
      blob_url: blob.url,
      file_name: blob.pathname,
      file_type: fileType,
      height_class: heightClass,
    })

    if (!result.ok) {
      console.warn("[admin/logos/upload] Supabase insert failed, but file uploaded:", result.error)
      // Still return success since file is uploaded
    }

    return NextResponse.json({
      ok: true,
      logo: {
        name: companyName,
        url: blob.url,
        type: fileType,
        heightClass,
      },
    })
  } catch (error) {
    console.error("[admin/logos/upload] Error:", error)
    return NextResponse.json(
      { ok: false, error: "Failed to upload logo" },
      { status: 500 }
    )
  }
}
