import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../../..')
const require = createRequire(path.join(repoRoot, 'shop-only/package.json'))
const sharp = require('sharp')
const artworkDir = path.join(repoRoot, 'ops/printful/artwork/after-school-arcade-tee')
const sourcePath = path.join(artworkDir, 'arcade-scene-source.png')
const transparentPath = path.join(artworkDir, 'arcade-scene-transparent.png')
const outputPath = path.join(artworkDir, 'after-school-arcade-tee-print.png')
const logoPath = path.join(
  repoRoot,
  'shop-only/src/assets/header/dreaming-1989-logo-alpha.png',
)

const source = sharp(sourcePath).ensureAlpha()
const { data, info } = await source.raw().toBuffer({ resolveWithObject: true })
const alpha = new Uint8Array(info.width * info.height).fill(255)
const visited = new Uint8Array(alpha.length)
const queue = new Int32Array(alpha.length)
let head = 0
let tail = 0

const isChroma = (index) => {
  const offset = index * 4
  const red = data[offset]
  const green = data[offset + 1]
  const blue = data[offset + 2]
  return red >= 205 && blue >= 190 && green <= 105 && red + blue - green * 2 >= 310
}

const enqueue = (index) => {
  if (visited[index] || !isChroma(index)) return
  visited[index] = 1
  queue[tail++] = index
}

for (let x = 0; x < info.width; x += 1) {
  enqueue(x)
  enqueue((info.height - 1) * info.width + x)
}
for (let y = 0; y < info.height; y += 1) {
  enqueue(y * info.width)
  enqueue(y * info.width + info.width - 1)
}

while (head < tail) {
  const index = queue[head++]
  alpha[index] = 0
  const x = index % info.width
  const y = Math.floor(index / info.width)
  if (x > 0) enqueue(index - 1)
  if (x + 1 < info.width) enqueue(index + 1)
  if (y > 0) enqueue(index - info.width)
  if (y + 1 < info.height) enqueue(index + info.width)
}

for (let index = 0; index < alpha.length; index += 1) {
  if (alpha[index] !== 0) continue
  const x = index % info.width
  const y = Math.floor(index / info.width)
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const nextX = x + dx
      const nextY = y + dy
      if (nextX < 0 || nextX >= info.width || nextY < 0 || nextY >= info.height) continue
      const next = nextY * info.width + nextX
      if (!visited[next]) alpha[next] = Math.min(alpha[next], 120 + 45 * Math.max(Math.abs(dx), Math.abs(dy)))
    }
  }
}

for (let index = 0; index < alpha.length; index += 1) {
  const offset = index * 4
  data[offset + 3] = alpha[index]
  if (alpha[index] < 255) {
    const strength = (255 - alpha[index]) / 255
    data[offset] = Math.max(0, Math.round(data[offset] - 80 * strength))
    data[offset + 2] = Math.max(0, Math.round(data[offset + 2] - 80 * strength))
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(transparentPath)

const scene = await sharp(transparentPath)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize({ width: 3850, height: 5000, fit: 'inside', withoutEnlargement: false })
  .png()
  .toBuffer()

const sceneMeta = await sharp(scene).metadata()
const sceneLeft = Math.round((4500 - sceneMeta.width) / 2)
const sceneTop = 130

const titleSvg = Buffer.from(`
  <svg width="4500" height="5400" xmlns="http://www.w3.org/2000/svg">
    <style>
      .title { font-family: "Arial Black", "Helvetica", sans-serif; font-weight: 900; text-anchor: middle; }
      .support { font-family: "Courier New", monospace; font-weight: 700; text-anchor: middle; letter-spacing: 12px; }
    </style>
    <text x="2250" y="1725" class="title" font-size="310" fill="#f4d99c" stroke="#0b3f3e" stroke-width="46" paint-order="stroke">AFTER SCHOOL</text>
    <text x="2250" y="2070" class="title" font-size="330" fill="#b93425" stroke="#f4d99c" stroke-width="58" paint-order="stroke">ARCADE CLUB</text>
    <text x="2250" y="4750" class="support" font-size="120" fill="#f4d99c" stroke="#0b3f3e" stroke-width="20" paint-order="stroke">TOKENS • HIGH SCORES • 1989</text>
  </svg>
`)

const logo = await sharp(logoPath)
  .resize({ width: 620, fit: 'inside', withoutEnlargement: true })
  .png()
  .toBuffer()
const logoMeta = await sharp(logo).metadata()

await sharp({
  create: {
    width: 4500,
    height: 5400,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: scene, left: sceneLeft, top: sceneTop },
    { input: titleSvg, left: 0, top: 0 },
    {
      input: logo,
      left: Math.round((4500 - logoMeta.width) / 2),
      top: 4900,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outputPath)

const output = await sharp(outputPath).metadata()
console.log(JSON.stringify({
  source: path.relative(repoRoot, sourcePath),
  transparent: path.relative(repoRoot, transparentPath),
  output: path.relative(repoRoot, outputPath),
  width: output.width,
  height: output.height,
  hasAlpha: output.hasAlpha,
}, null, 2))
