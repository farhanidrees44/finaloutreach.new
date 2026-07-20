import { spawn } from "node:child_process"
import { existsSync, readdirSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"

const root = process.cwd()
const appDir = join(root, "app")
const nextBin = join(root, "node_modules", "next", "dist", "bin", "next")
const port = Number(process.env.SITEMAP_CHECK_PORT || 3199)
const origin = `http://127.0.0.1:${port}`

if (!existsSync(join(root, ".next", "BUILD_ID"))) {
  console.error("Sitemap check requires a completed production build.")
  process.exit(1)
}

function collectPagePatterns(dir = appDir) {
  const patterns = []

  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry)
    if (!statSync(absolute).isDirectory()) continue
    patterns.push(...collectPagePatterns(absolute))
  }

  if (existsSync(join(dir, "page.tsx")) || existsSync(join(dir, "page.js"))) {
    const route = relative(appDir, dir)
      .split(sep)
      .filter((segment) => !segment.startsWith("(") && !segment.startsWith("@"))
      .map((segment) => {
        if (segment.startsWith("[[...")) return ".*"
        if (segment.startsWith("[...")) return ".+"
        if (segment.startsWith("[")) return "[^/]+"
        return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      })
      .join("/")

    patterns.push(new RegExp(`^/${route}${route ? "" : ""}/?$`))
  }

  return patterns
}

const pagePatterns = collectPagePatterns()

function isBackedByPage(pathname) {
  return pagePatterns.some((pattern) => pattern.test(pathname))
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(origin, { redirect: "manual" })
      if (response.status > 0) return
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error("Timed out waiting for the local Next.js server.")
}

const server = spawn(
  process.execPath,
  [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    cwd: root,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  },
)

let serverOutput = ""
server.stdout.on("data", (chunk) => {
  serverOutput += chunk
})
server.stderr.on("data", (chunk) => {
  serverOutput += chunk
})

try {
  await waitForServer()

  const sitemapResponse = await fetch(`${origin}/sitemap.xml`, {
    redirect: "manual",
  })
  if (sitemapResponse.status !== 200) {
    throw new Error(
      `/sitemap.xml returned ${sitemapResponse.status}.\n${serverOutput}`,
    )
  }

  const xml = await sitemapResponse.text()
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    decodeXml(match[1]),
  )

  if (locations.length === 0) {
    throw new Error("Generated sitemap.xml contains no <loc> entries.")
  }

  const duplicates = locations.filter(
    (location, index) => locations.indexOf(location) !== index,
  )
  if (duplicates.length > 0) {
    throw new Error(
      `Duplicate sitemap URLs:\n${[...new Set(duplicates)].join("\n")}`,
    )
  }

  const failures = []
  for (const location of locations) {
    const sourceUrl = new URL(location)
    const pathname = sourceUrl.pathname

    if (!isBackedByPage(pathname)) {
      failures.push(`${pathname} has no matching app/**/page component`)
      continue
    }

    const response = await fetch(`${origin}${pathname}`, {
      redirect: "manual",
    })
    if (response.status !== 200) {
      failures.push(`${pathname} returned HTTP ${response.status}`)
    }
  }

  if (failures.length > 0) {
    throw new Error(`Invalid sitemap entries:\n${failures.join("\n")}`)
  }

  console.log(
    `Sitemap validation passed: ${locations.length} URLs resolve locally with HTTP 200.`,
  )
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  server.kill("SIGTERM")
}
