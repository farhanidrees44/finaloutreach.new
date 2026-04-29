import { NextResponse } from "next/server"
import { supabaseQuery } from "@/lib/api/supabase"

export const runtime = "nodejs"

export async function GET() {
  try {
    // Try to fetch from Supabase first
    const result = await supabaseQuery("uploaded_logos", {
      select: "id,company_name,blob_url,file_type,height_class,sort_order",
      order: "sort_order,asc",
    })

    if (result.ok && Array.isArray(result.data)) {
      const logos = result.data.map((row: any) => ({
        id: row.id,
        name: row.company_name,
        url: row.blob_url,
        type: row.file_type,
        heightClass: row.height_class || "h-7 sm:h-8",
        order: row.sort_order || 0,
      }))

      return NextResponse.json({
        ok: true,
        logos,
        source: "supabase",
      })
    }

    // Fallback to empty array if Supabase not available
    return NextResponse.json({
      ok: true,
      logos: [],
      source: "fallback",
    })
  } catch (error) {
    console.error("[logos/list] Error:", error)
    return NextResponse.json(
      { ok: false, error: "Failed to fetch logos" },
      { status: 500 }
    )
  }
}
