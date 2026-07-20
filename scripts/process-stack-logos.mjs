import sharp from "sharp"
import path from "path"
import fs from "fs"

const assetDir =
  "C:\\Users\\HP\\.cursor\\projects\\c-Users-HP-finaloutreach-new\\assets"
const outDir = "C:\\Users\\HP\\finaloutreach.new\\public\\logos"

/** Single-logo assets only — skip multi-logo strips (apollo-ec3). */
const map = [
  { match: "dripify-76f", out: "dripify.png", removeBlack: false },
  { match: "gohighlevel_svg-0fc", out: "gohighlevel.png", removeBlack: true },
  { match: "instantly-2d2", out: "instantly.png", removeBlack: false },
  { match: "lemlist_svg", out: "lemlist.png", removeBlack: false },
  { match: "n8n-4af", out: "n8n.png", removeBlack: true },
  { match: "success.ai-logo-6b15", out: "success-ai.png", removeBlack: true },
]

function findAsset(match) {
  return fs.readdirSync(assetDir).find((f) => f.includes(match))
}

async function knockOutDarkBg(inputPath) {
  const { data, info } = await sharp(inputPath)
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
    if (max <= 40 && sat < 18) {
      data[i + 3] = 0
    } else if (max <= 55 && sat < 14) {
      data[i + 3] = Math.round(((max - 40) / 15) * 220)
    }
  }

  return sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
}

async function processLogo({ match, out, removeBlack }) {
  const file = findAsset(match)
  if (!file) throw new Error(`Missing asset for ${match}`)
  const input = path.join(assetDir, file)
  const meta = await sharp(input).metadata()
  console.log("processing", out, `${meta.width}x${meta.height}`)

  let img = removeBlack
    ? await knockOutDarkBg(input)
    : sharp(input).ensureAlpha()

  const targetW = 520
  const targetH = 168
  const pad = 18

  await img
    .png()
    .trim({ threshold: 12 })
    .resize({
      width: targetW - pad * 2,
      height: targetH - pad * 2,
      fit: "contain",
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
    .toFile(path.join(outDir, out))

  console.log("wrote", out)
}

for (const item of map) {
  await processLogo(item)
}
console.log("done")
