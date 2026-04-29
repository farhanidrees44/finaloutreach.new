// Optional Supabase persistence layer.
// We avoid the @supabase/supabase-js dependency entirely and just hit
// the REST endpoint when both SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
// (or anon key) are configured. If they are missing, all functions
// silently no-op so the API routes keep working without Supabase.

const URL = process.env.SUPABASE_URL
const KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

export function isSupabaseConfigured() {
  return Boolean(URL && KEY)
}

export async function supabaseInsert(table: string, row: Record<string, unknown>) {
  if (!URL || !KEY) return { ok: false, skipped: true as const }
  try {
    const res = await fetch(`${URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      // Avoid Next caching POST requests
      cache: "no-store",
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return { ok: false, error: text || `HTTP ${res.status}` }
    }
    return { ok: true as const }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

export async function supabaseQuery(
  table: string,
  options?: {
    select?: string
    order?: string
    filter?: Record<string, unknown>
  }
) {
  if (!URL || !KEY) return { ok: false, skipped: true as const, data: [] }
  try {
    const params = new URLSearchParams()
    if (options?.select) params.append("select", options.select)
    if (options?.order) {
      const [column, direction] = options.order.split(",")
      params.append("order", `${column}.${direction || "asc"}`)
    }

    const url = `${URL}/rest/v1/${table}?${params.toString()}`

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return { ok: false, error: text || `HTTP ${res.status}`, data: [] }
    }

    const data = await res.json()
    return { ok: true as const, data }
  } catch (err) {
    return { ok: false, error: (err as Error).message, data: [] }
  }
}

export async function supabaseUpdate(
  table: string,
  id: string,
  updates: Record<string, unknown>
) {
  if (!URL || !KEY) return { ok: false, skipped: true as const }
  try {
    const res = await fetch(`${URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(updates),
      cache: "no-store",
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return { ok: false, error: text || `HTTP ${res.status}` }
    }
    return { ok: true as const }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

export async function supabaseDelete(table: string, id: string) {
  if (!URL || !KEY) return { ok: false, skipped: true as const }
  try {
    const res = await fetch(`${URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        Prefer: "return=minimal",
      },
      cache: "no-store",
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return { ok: false, error: text || `HTTP ${res.status}` }
    }
    return { ok: true as const }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}
