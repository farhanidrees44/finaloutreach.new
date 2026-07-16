import sharp from "sharp"
import fs from "fs"
import path from "path"

const ASSETS =
  "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-finaloutreach/assets"
const OUT = path.resolve("C:/Users/HP/Desktop/finaloutreach/public/stack")
const SIZE = 256

fs.mkdirSync(OUT, { recursive: true })

const FILES = {
  gohighlevel:
    "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ghl_svg_logo-ea2b8caa-7182-4854-8c57-7a7270463eee.png",
  lemlist:
    "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_lemlist_svg_logo-f43e4d07-d802-4ede-8c46-032c41223b11.png",
  hubspot:
    "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_hubspot_svg_logo-c0adfd7a-5be5-4d35-b979-0ae07bb5512d.png",
  zapier:
    "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_apollo_logo-ef9a2d8d-33e1-4b20-b5ab-2954137a80cf.png",
  clay:
    "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_clay_svg_logo-ed4d2035-1f83-4660-9db2-6a375e113a50.png",
  zoominfo:
    "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ZoomInfo_logo__2024_.svg-c4c17c4e-3853-41db-9b3e-52a0a9298f68.png",
  smartlead:
    "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_smartlead_logo-0586166b-1780-4821-8188-5e1ea0e3ee8d.png",
}

async function rawRgba(inputPath) {
  return sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
}

function mapPixels(data, fn) {
  for (let i = 0; i < data.length; i += 4) {
    fn(data, i)
  }
}

async function fromRaw(data, width, height) {
  return sharp(data, { raw: { width, height, channels: 4 } })
}

/** Kill near-black background. */
function killDarkBg(data, threshold = 40) {
  mapPixels(data, (d, i) => {
    if (d[i] < threshold && d[i + 1] < threshold && d[i + 2] < threshold) {
      d[i + 3] = 0
    }
  })
}

/** Kill near-white background. */
function killLightBg(data, threshold = 248) {
  mapPixels(data, (d, i) => {
    if (d[i] > threshold && d[i + 1] > threshold && d[i + 2] > threshold) {
      d[i + 3] = 0
    }
  })
}

/** Recolor remaining opaque dark-grey marks to a brand color (Zapier). */
function recolorDarkTo(data, rgb) {
  mapPixels(data, (d, i) => {
    if (d[i + 3] < 20) return
    const lum = (d[i] + d[i + 1] + d[i + 2]) / 3
    if (lum < 120) {
      d[i] = rgb[0]
      d[i + 1] = rgb[1]
      d[i + 2] = rgb[2]
      d[i + 3] = 255
    }
  })
}

async function contentBBox(data, width, height) {
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3]
      if (a > 12) {
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }
  }
  if (maxX < minX) return null
  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  }
}

async function cropLeftIcon(buf, maxAspect = 1.15) {
  const img = sharp(buf)
  const m = await img.metadata()
  const w = m.width
  const h = m.height
  if (!w || !h) return buf
  if (w / h <= maxAspect) return buf
  // Take leftmost roughly-square region covering the mark
  const side = h
  return img
    .extract({ left: 0, top: 0, width: Math.min(side, w), height: side })
    .png()
    .toBuffer()
}

async function finalize(buf, outName) {
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const box = await contentBBox(data, info.width, info.height)
  let cropped = buf
  if (box) {
    cropped = await sharp(buf)
      .extract(box)
      .png()
      .toBuffer()
  }
  const pad = Math.round(SIZE * 0.1)
  await sharp(cropped)
    .resize(SIZE - pad * 2, SIZE - pad * 2, {
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
    .png()
    .toFile(path.join(OUT, outName))
  console.log("OK", outName)
}

async function process(slug, file, mode) {
  const src = path.join(ASSETS, file)
  let { data, info } = await rawRgba(src)

  if (mode === "dark-bg") killDarkBg(data, 42)
  if (mode === "dark-bg-soft") killDarkBg(data, 55)
  if (mode === "light-bg") killLightBg(data, 245)
  if (mode === "zapier") {
    killDarkBg(data, 18) // only pure black
    recolorDarkTo(data, [255, 79, 0]) // Zapier orange
  }

  let buf = await (await fromRaw(data, info.width, info.height)).png().toBuffer()

  if (mode === "left-icon-dark") {
    killDarkBg(data, 42)
    buf = await (await fromRaw(data, info.width, info.height)).png().toBuffer()
    buf = await cropLeftIcon(buf, 1.2)
  }
  if (mode === "left-icon-light") {
    killLightBg(data, 245)
    buf = await (await fromRaw(data, info.width, info.height)).png().toBuffer()
    buf = await cropLeftIcon(buf, 1.2)
  }
  if (mode === "ghl") {
    // keep circular logo as-is (navy is brand), just square-contain
    buf = await sharp(src).png().toBuffer()
  }

  await finalize(buf, `${slug}.png`)
}

await process("gohighlevel", FILES.gohighlevel, "ghl")
await process("lemlist", FILES.lemlist, "left-icon-light")
await process("hubspot", FILES.hubspot, "dark-bg")
await process("zapier", FILES.zapier, "zapier")
await process("clay", FILES.clay, "left-icon-dark")
await process("zoominfo", FILES.zoominfo, "left-icon-dark")
await process("smartlead", FILES.smartlead, "left-icon-dark")

console.log(fs.readdirSync(OUT))
