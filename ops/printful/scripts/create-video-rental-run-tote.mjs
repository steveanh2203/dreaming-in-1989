import fs from 'node:fs'
import path from 'node:path'

import { retryOn429 } from './retry-on-429.mjs'

const repoRoot = path.resolve(import.meta.dirname, '../../..')
const envPath = path.join(repoRoot, 'shop-only/.env.local')
const artworkPath = path.join(
  repoRoot,
  'ops/printful/artwork/video-rental-run-tote/video-rental-run-tote-print.png',
)
const mockupDirectory = path.join(repoRoot, 'ops/printful/mockups/video-rental-run-tote')
const productReportPath = path.join(repoRoot, 'ops/printful/video-rental-run-tote-product.json')
const uploadReportPath = path.join(repoRoot, 'ops/printful/video-rental-run-tote-upload.json')
const taskReportPath = path.join(repoRoot, 'ops/printful/video-rental-run-tote-mockup-task.json')
const resultReportPath = path.join(repoRoot, 'ops/printful/video-rental-run-tote-mockup-result.json')

const product = {
  name: 'Video Rental Run Tote Bag',
  externalId: 'video-rental-run-tote',
  catalogProductId: 367,
  catalogVariantId: 10458,
  retailPrice: '29.00',
  sku: 'SKU-1989-VRRT-TOTE-OS',
  placement: 'front',
  technique: 'dtg',
  mockupStyleIds: [19423, 19427, 19430, 19433, 19429],
}

const outputNames = {
  19423: '01-flat-front.png',
  19427: '02-model-front.png',
  19430: '03-flat-lifestyle.png',
  19433: '04-hanger-front.png',
  19429: '05-product-detail.png',
}

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

const request = async (method, pathname, body = null) => {
  return retryOn429(async () => {
    const response = await fetch(`https://api.printful.com${pathname}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
    const text = await response.text()
    const json = JSON.parse(text || '{}')
    if (!response.ok) {
      const error = new Error(
        `${method} ${pathname} failed (${response.status}): ${text.slice(0, 1000)}`,
      )
      error.status = response.status
      throw error
    }
    return json
  })
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

fs.mkdirSync(mockupDirectory, { recursive: true })

let uploadedFile = null
if (fs.existsSync(uploadReportPath)) {
  uploadedFile = JSON.parse(fs.readFileSync(uploadReportPath, 'utf8')).printfulFile
}

if (!uploadedFile?.id) {
  uploadedFile = (
    await request('POST', '/files', {
      data: fs.readFileSync(artworkPath).toString('base64'),
      filename: path.basename(artworkPath),
      type: 'default',
    })
  ).result
  fs.writeFileSync(
    uploadReportPath,
    `${JSON.stringify({ createdAt: new Date().toISOString(), printfulFile: uploadedFile }, null, 2)}\n`,
  )
}

for (let attempt = 0; attempt < 20 && !uploadedFile.preview_url && !uploadedFile.url; attempt += 1) {
  await wait(2500)
  uploadedFile = (await request('GET', `/files/${uploadedFile.id}`)).result
  fs.writeFileSync(
    uploadReportPath,
    `${JSON.stringify({ updatedAt: new Date().toISOString(), printfulFile: uploadedFile }, null, 2)}\n`,
  )
}

const artworkUrl = uploadedFile.preview_url ?? uploadedFile.url
if (!artworkUrl) throw new Error('Printful did not return a usable artwork URL.')

const storeProducts = (await request('GET', '/store/products?limit=100')).result ?? []
let syncProduct = storeProducts.find((item) => item.external_id === product.externalId)
let createdThisRun = false

if (!syncProduct) {
  syncProduct = (
    await request('POST', '/store/products', {
      sync_product: {
        name: product.name,
        external_id: product.externalId,
      },
      sync_variants: [
        {
          external_id: `${product.externalId}-one-size-oyster`,
          variant_id: product.catalogVariantId,
          retail_price: product.retailPrice,
          sku: product.sku,
          files: [{ id: uploadedFile.id, type: product.placement }],
        },
      ],
    })
  ).result
  createdThisRun = true
}

fs.writeFileSync(
  productReportPath,
  `${JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      product,
      printfulFile: uploadedFile,
      syncProduct,
      createdThisRun,
      publishedToExternalStorefront: false,
    },
    null,
    2,
  )}\n`,
)

const mockupRequest = {
  format: 'png',
  mockup_width_px: 1600,
  products: [
    {
      source: 'catalog',
      catalog_product_id: product.catalogProductId,
      catalog_variant_ids: [product.catalogVariantId],
      mockup_style_ids: product.mockupStyleIds,
      orientation: 'vertical',
      placements: [
        {
          placement: product.placement,
          technique: product.technique,
          print_area_type: 'simple',
          layers: [
            {
              type: 'file',
              url: artworkUrl,
              position: {
                width: 10,
                height: 10,
                top: 0,
                left: 0,
              },
            },
          ],
        },
      ],
    },
  ],
}

const mockupResponse = await request('POST', '/v2/mockup-tasks', mockupRequest)
const task = mockupResponse.data?.[0]
if (!task?.id) throw new Error('Printful did not return a mockup task ID.')

fs.writeFileSync(
  taskReportPath,
  `${JSON.stringify({ createdAt: new Date().toISOString(), request: mockupRequest, response: mockupResponse }, null, 2)}\n`,
)

let completedTask = task
for (let attempt = 0; attempt < 30; attempt += 1) {
  if (completedTask.status === 'completed' || completedTask.status === 'failed') break
  await wait(5000)
  completedTask = (await request('GET', `/v2/mockup-tasks?id=${task.id}`)).data?.[0]
}
if (completedTask?.status !== 'completed') {
  throw new Error(`Mockup task failed: ${JSON.stringify(completedTask?.failure_reasons ?? completedTask)}`)
}

const mockups = completedTask.catalog_variant_mockups.flatMap((variant) => variant.mockups)
for (const [index, mockup] of mockups.entries()) {
  const response = await fetch(mockup.mockup_url)
  if (!response.ok) throw new Error(`Mockup download failed (${response.status}): ${mockup.mockup_url}`)
  const filename = outputNames[mockup.style_id] ?? `view-${index + 1}.png`
  fs.writeFileSync(path.join(mockupDirectory, filename), Buffer.from(await response.arrayBuffer()))
}

fs.writeFileSync(resultReportPath, `${JSON.stringify(completedTask, null, 2)}\n`)

console.log(
  JSON.stringify(
    {
      printfulFileId: uploadedFile.id,
      mockupTaskId: completedTask.id,
      mockups: fs.readdirSync(mockupDirectory).sort(),
      syncProductId: syncProduct.id,
      createdThisRun,
    },
    null,
    2,
  ),
)
