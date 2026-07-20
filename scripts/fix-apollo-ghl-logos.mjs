import sharp from "sharp"
import fs from "fs"
import path from "path"

const assetDir =
  "C:\\Users\\HP\\.cursor\\projects\\c-Users-HP-finaloutreach-new\\assets"
const outDir = "C:\\Users\\HP\\finaloutreach.new\\public\\logos"
/** Max logo box inside the marquee card (matches ~168×88 card minus chrome). */
const maxW = 480
const maxH = 140
const pad = 10

function findAsset(match) {
  return fs.readdirSync(assetDir).find((f) => f.includes(match))
}

async function knockOutDarkBg(bufferOrPath) {
  const { data, info } = await sharp(bufferOrPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min
    if (max <= 42 && sat < 20) data[i + 3] = 0
    else if (max <= 58 && sat < 16)
      data[i + 3] = Math.round(((max - 42) / 16) * 220)
  }

  return sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
}

async function contentBBox(img) {
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let minX = info.width,
    minY = info.height,
    maxX = 0,
    maxY = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels
      // Any opaque pixel counts — includes near-black Apollo marks
      if (data[i + 3] > 24) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
  }
  if (maxX < minX) throw new Error("No visible content")
  const m = 2
  return {
    left: Math.max(0, minX - m),
    top: Math.max(0, minY - m),
    width: Math.min(
      info.width - Math.max(0, minX - m),
      maxX - minX + 1 + m * 2,
    ),
    height: Math.min(
      info.height - Math.max(0, minY - m),
      maxY - minY + 1 + m * 2,
    ),
  }
}

/**
 * Tight crop + scale to card slot. Do NOT pad into a wide empty 520×168 canvas —
 * transparent gutters make object-contain shrink square marks vs wide wordmarks.
 */
async function fitToCard(img, outName) {
  const png = await img.png().toBuffer()
  const cropped = await sharp(png)
    .extract(await contentBBox(sharp(png)))
    .png()
    .toBuffer()

  await sharp(cropped)
    .resize({
      width: maxW,
      height: maxH,
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 8 })
    .toFile(path.join(outDir, outName))

  const meta = await sharp(path.join(outDir, outName)).metadata()
  console.log("wrote", outName, `${meta.width}x${meta.height}`)
}

/** HighLevel — crop colored arrows, drop black field. */
async function processHighLevel() {
  const file = findAsset("gohighlevel_svg-3ab")
  if (!file) throw new Error("Missing HighLevel asset")
  const input = path.join(assetDir, file)
  const knocked = await knockOutDarkBg(input)
  await fitToCard(knocked, "gohighlevel.png")
}

/**
 * Apollo — user upload is solid black (unusable).
 * Render existing mark SVG large so it reads clearly on cream cards.
 */
async function processApollo() {
  const svgPath = path.join(outDir, "apollo.svg")
  let svg = fs.readFileSync(svgPath, "utf8")
  svg = svg.replaceAll("#1F1F1E", "#111111")
  const rendered = await sharp(Buffer.from(svg), { density: 400 })
    .resize(800, 800, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  const check = await sharp(rendered)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let ink = 0
  for (let i = 0; i < check.data.length; i += check.info.channels) {
    if (check.data[i + 3] > 200) ink++
  }
  console.log("apollo rendered ink pixels", ink)
  if (ink < 100) throw new Error("Apollo SVG render produced no ink")

  await fitToCard(sharp(rendered), "apollo.png")
}

await processHighLevel()
await processApollo()

for (const f of ["gohighlevel.png", "apollo.png", "instantly.png"]) {
  const { data, info } = await sharp(path.join(outDir, f))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let minX = info.width,
    minY = info.height,
    maxX = 0,
    maxY = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels
      if (data[i + 3] > 20) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
  }
  const cw = maxX - minX + 1
  const ch = maxY - minY + 1
  console.log(
    f,
    `${info.width}x${info.height}`,
    `content fill ${Math.round((cw / info.width) * 100)}%×${Math.round((ch / info.height) * 100)}%`,
  )
}
