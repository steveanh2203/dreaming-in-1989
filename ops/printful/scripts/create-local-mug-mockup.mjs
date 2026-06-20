import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '../../..')
const envPath = path.join(repoRoot, 'shop-only/.env.local')
const artworkPath = path.resolve(
  process.argv[2] ??
    path.join(
      repoRoot,
      'ops/printful/artwork/late-night-rewind-club-mug/late-night-rewind-club-11oz-print.png',
    ),
)

const parseEnv = (filePath) =>
  Object.fromEntries(
    fs
      .readFileSync(filePath, 'utf8')
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=')
        return [line.slice(0, separator), line.slice(separator + 1)]
      }),
  )

const env = parseEnv(envPath)
if (!env.PRINTFUL_API_TOKEN) throw new Error('PRINTFUL_API_TOKEN is missing.')
if (!fs.existsSync(artworkPath)) throw new Error(`Artwork not found: ${artworkPath}`)

const headers = {
  Authorization: `Bearer ${env.PRINTFUL_API_TOKEN}`,
  'Content-Type': 'application/json',
}
if (env.PRINTFUL_STORE_ID) headers['X-PF-Store-Id'] = env.PRINTFUL_STORE_ID

const request = async (pathname, body) => {
  const response = await fetch(`https://api.printful.com${pathname}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  const json = await response.json()
  if (!response.ok) {
    throw new Error(`${pathname} failed (${response.status}): ${JSON.stringify(json).slice(0, 800)}`)
  }
  return json
}

const get = async (pathname) => {
  const response = await fetch(`https://api.printful.com${pathname}`, { headers })
  const json = await response.json()
  if (!response.ok) {
    throw new Error(`${pathname} failed (${response.status}): ${JSON.stringify(json).slice(0, 800)}`)
  }
  return json
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

const uploadResponse = await request('/files', {
  data: fs.readFileSync(artworkPath).toString('base64'),
  filename: path.basename(artworkPath),
  type: 'default',
})
let uploadedFile = uploadResponse.result
for (let attempt = 0; attempt < 12 && !uploadedFile.preview_url && !uploadedFile.url; attempt += 1) {
  await wait(2500)
  const fileResponse = await get(`/files/${uploadedFile.id}`)
  uploadedFile = fileResponse.result
}
const artworkUrl = uploadedFile.preview_url ?? uploadedFile.url
if (!artworkUrl) throw new Error('Printful upload did not return a usable artwork URL.')

const mockupResponse = await request('/v2/mockup-tasks', {
  format: 'png',
  mockup_width_px: 1200,
  products: [
    {
      source: 'catalog',
      catalog_product_id: 19,
      catalog_variant_ids: [1320],
      mockup_style_ids: [10423, 10421, 10422],
      orientation: 'horizontal',
      placements: [
        {
          placement: 'default',
          technique: 'sublimation',
          print_area_type: 'simple',
          layers: [
            {
              type: 'file',
              url: artworkUrl,
              position: {
                width: 9,
                height: 3.5,
                top: 0,
                left: 0,
              },
            },
          ],
        },
      ],
    },
  ],
})

console.log(
  JSON.stringify(
    {
      artwork: path.relative(repoRoot, artworkPath),
      printfulFileId: uploadedFile.id,
      task: mockupResponse.data ?? mockupResponse.result ?? mockupResponse,
    },
    null,
    2,
  ),
)
