import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(
  '/Users/steveanh/Desktop/Quản lý project/MMO USA/Dreaming in 1989/GitHub/dreaming-in-1989/shop-only/package.json',
)
const sharp = require('sharp')

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(scriptDirectory, '../../..')
const assetDirectory = path.join(
  repositoryRoot,
  'shop-only/src/assets/catalog/after-school-arcade-tee',
)
const sourceDirectory = path.join(assetDirectory, 'generated-sources')
const artworkPath = path.join(
  repositoryRoot,
  'ops/printful/artwork/after-school-arcade-tee/after-school-arcade-tee-print.png',
)

const scenes = [
  {
    source: 'arcade-1988.png',
    output: '03-lifestyle-1.jpg',
    width: 400,
    top: 390,
  },
  {
    source: 'mall-1991.png',
    output: '04-lifestyle-2.jpg',
    width: 340,
    top: 445,
  },
  {
    source: 'record-store-1989.png',
    output: '05-lifestyle-3.jpg',
    width: 390,
    top: 405,
  },
  {
    source: 'diner-1990.png',
    output: '06-lifestyle-4.jpg',
    width: 325,
    top: 430,
  },
]

for (const scene of scenes) {
  const sourcePath = path.join(sourceDirectory, scene.source)
  const metadata = await sharp(sourcePath).metadata()
  const artwork = await sharp(artworkPath)
    .resize({ width: scene.width })
    .blur(0.3)
    .modulate({ brightness: 0.94, saturation: 0.94 })
    .png()
    .toBuffer()
  const artworkMetadata = await sharp(artwork).metadata()

  await sharp(sourcePath)
    .composite([
      {
        input: artwork,
        left: Math.round((metadata.width - artworkMetadata.width) / 2),
        top: scene.top,
        blend: 'over',
      },
    ])
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.join(assetDirectory, scene.output))
}
