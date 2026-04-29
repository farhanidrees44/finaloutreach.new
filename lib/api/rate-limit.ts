// Lightweight in-memory rate limiter. Replace with Upstash Redis or
// Vercel KV in production for multi-instance correctness — this works
// per server instance and is sufficient for small/medium traffic.

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export type RateLimitResult = {
  ok: boolean
  remaining: number
  resetAt: number
}

/**
 * Returns { ok: false } when the key has exceeded `max` requests inside
 * the rolling `windowMs` window.
 */
export function rateLimit(
  key: string,
  max: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt < now) {
    const fresh: Bucket = { count: 1, resetAt: now + windowMs }
    buckets.set(key, fresh)
    return { ok: true, remaining: max - 1, resetAt: fresh.resetAt }
  }

  if (existing.count >= max) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  return { ok: true, remaining: max - existing.count, resetAt: existing.resetAt }
}

/** Pull a stable client identifier from the request — falls back to "anon". */
export function clientIp(req: Request): string {
  const headers = req.headers
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "anon"
  )
}
