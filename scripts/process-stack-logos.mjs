import sharp from "sharp"
import path from "path"
import fs from "fs"

const assetDir =
  "C:\\Users\\HP\\.cursor\\projects\\c-Users-HP-finaloutreach-new\\assets"
const outDir = "C:\\Users\\HP\\finaloutreach.new\\public\\logos"

const map = [
  { match: "apify-ad0", out: "apify.png", removeBlack: true },
  { match: "highlevel-429", out: "gohighlevel.png", removeBlack: true },
  { match: "appsumo-87d", out: "appsumo.png", removeBlack: true },
  { match: "instantly-a4e", out: "instantly.png", removeBlack: false },
  { match: "n8n-1ece", out: "n8n.png", removeBlack: true },
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
    // Dark / near-black flat background → transparent
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

// Remove mistaken multi-logo strip saved as apollo.png
const badApollo = path.join(outDir, "apollo.png")
if (fs.existsSync(badApollo)) {
  fs.unlinkSync(badApollo)
  console.log("removed bad apollo.png (multi-logo strip)")
}

for (const item of map) {
  await processLogo(item)
}
console.log("done")
