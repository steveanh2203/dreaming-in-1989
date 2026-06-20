import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(import.meta.dirname, '../../..')
const shopRoot = path.join(repoRoot, 'shop-only')
const require = createRequire(path.join(shopRoot, 'package.json'))
const sharp = require('sharp')

const mockupRoot = path.join(repoRoot, 'ops/printful/mockups/video-rental-run-tote')
const artworkPath = path.join(
  repoRoot,
  'ops/printful/artwork/video-rental-run-tote/video-rental-run-tote-transparent.png',
)
const outputRoot = path.join(shopRoot, 'src/assets/catalog/video-rental-run-tote')

const generatedLifestylePaths = [
  '/Users/steveanh/.codex/generated_images/019edf22-bfcb-78c1-83f2-e46e4bc02e4d/ig_062c5bffdde1ae9e016a35f4b3eb40819190bf3f9d8cfec93f.png',
  '/Users/steveanh/.codex/generated_images/019edf22-bfcb-78c1-83f2-e46e4bc02e4d/ig_062c5bffdde1ae9e016a35f53f934881918628e6b848741bcf.png',
  '/Users/steveanh/.codex/generated_images/019edf22-bfcb-78c1-83f2-e46e4bc02e4d/ig_062c5bffdde1ae9e016a35f5e5aa90819181cca65624b8c618.png',
  '/Users/steveanh/.codex/generated_images/019edf22-bfcb-78c1-83f2-e46e4bc02e4d/ig_062c5bffdde1ae9e016a35f63c752c819198cb739802191aa3.png',
  '/Users/steveanh/.codex/generated_images/019edf22-bfcb-78c1-83f2-e46e4bc02e4d/ig_062c5bffdde1ae9e016a35f693fe0081919f4b1a8a667079e2.png',
]

const productOutputs = [
  '01-front.png',
  '02-back.png',
  '03-hanger-front.png',
  '04-hanger-back.png',
  '05-detail.png',
]

const lifestyleOutputs = [
  '06-hero-lifestyle.png',
  '07-lifestyle-1.png',
  '08-lifestyle-2.png',
  '09-lifestyle-3.png',
  '10-lifestyle-4.png',
]

const oyster = [237, 206, 165]

const colorizeBase = async (inputPath, outputPath, { preserveGreen = false } = {}) => {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index]
    const green = data[index + 1]
    const blue = data[index + 2]
    const isWhiteBackground = red > 244 && green > 244 && blue > 244

    if (isWhiteBackground) {
      data[index + 3] = 0
      continue
    }

    const isGreenLabel = preserveGreen && green > red * 1.08 && green > blue * 1.08
    if (isGreenLabel) continue

    const luminance = (red + green + blue) / 3
    const shade = Math.min(1.08, 0.46 + (luminance / 255) * 0.62)
    data[index] = Math.min(255, Math.round(oyster[0] * shade))
    data[index + 1] = Math.min(255, Math.round(oyster[1] * shade))
    data[index + 2] = Math.min(255, Math.round(oyster[2] * shade))
  }

  await sharp(data, { raw: info }).png().toFile(outputPath)
}

const squareCopy = async (inputPath, outputPath) => {
  await sharp(inputPath)
    .resize(1200, 1200, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: false,
    })
    .png()
    .toFile(outputPath)
}

fs.mkdirSync(outputRoot, { recursive: true })

await squareCopy(path.join(mockupRoot, 'front.png'), path.join(outputRoot, productOutputs[0]))
await colorizeBase(path.join(mockupRoot, 'back.png'), path.join(outputRoot, productOutputs[1]))

const hangerFrontBase = path.join(outputRoot, '.hanger-front-base.png')
await colorizeBase(path.join(mockupRoot, 'hangerFront.png'), hangerFrontBase)
const artworkBuffer = await sharp(artworkPath)
  .resize(330, 330, { fit: 'contain' })
  .png()
  .toBuffer()
await sharp(hangerFrontBase)
  .composite([{ input: artworkBuffer, left: 335, top: 490 }])
  .png()
  .toFile(path.join(outputRoot, productOutputs[2]))
fs.rmSync(hangerFrontBase)

await colorizeBase(
  path.join(mockupRoot, 'hangerBack.png'),
  path.join(outputRoot, productOutputs[3]),
)
await colorizeBase(
  path.join(mockupRoot, 'detail.png'),
  path.join(outputRoot, productOutputs[4]),
  { preserveGreen: true },
)

for (const [index, inputPath] of generatedLifestylePaths.entries()) {
  if (!fs.existsSync(inputPath)) throw new Error(`Missing generated lifestyle image: ${inputPath}`)
  await sharp(inputPath)
    .resize(1200, 1200, { fit: 'cover' })
    .png()
    .toFile(path.join(outputRoot, lifestyleOutputs[index]))
}

console.log(
  JSON.stringify(
    {
      outputRoot: path.relative(repoRoot, outputRoot),
      files: fs.readdirSync(outputRoot).sort(),
    },
    null,
    2,
  ),
)
