import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(import.meta.dirname, '../../..')
const shopRoot = path.join(repoRoot, 'shop-only')
const require = createRequire(path.join(shopRoot, 'package.json'))
const sharp = require('sharp')
const envPath = path.join(shopRoot, '.env.local')
const outputRoot = path.join(shopRoot, 'src/assets/catalog')
const artworkRoot = path.join(repoRoot, 'ops/printful/artwork')
const reportPath = path.join(repoRoot, 'ops/printful/product-mapping.generated.json')
const dataPath = path.join(shopRoot, 'src/data/catalog.js')

const colors = {
  cream: '#f7e0aa',
  paper: '#eed09a',
  red: '#a72b22',
  orange: '#d7822e',
  teal: '#073b36',
  ink: '#1c1712',
  gold: '#c99635',
  offWhite: '#fff4d3',
}

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const index = line.indexOf('=')
      return [line.slice(0, index), line.slice(index + 1)]
    }),
)

const headers = {
  Authorization: `Bearer ${env.PRINTFUL_API_TOKEN}`,
  'X-PF-Store-Id': env.PRINTFUL_STORE_ID,
  'Content-Type': 'application/json',
}

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true })
const currency = (value) => Number(value).toFixed(2)
const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const api = async (method, pathname, body = null) => {
  const response = await fetch(`https://api.printful.com${pathname}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await response.text()
  const json = JSON.parse(text || '{}')
  if (!response.ok) {
    throw new Error(`${method} ${pathname} failed ${response.status}: ${JSON.stringify(json).slice(0, 600)}`)
  }
  return json
}

const svgText = (text, attrs = {}) => {
  const {
    x = 0,
    y = 0,
    size = 100,
    fill = colors.ink,
    family = 'Arial Black, Impact, sans-serif',
    anchor = 'middle',
    weight = 900,
    letterSpacing = 0,
    transform = '',
  } = attrs
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${family}" font-size="${size}" font-weight="${weight}" letter-spacing="${letterSpacing}" fill="${fill}" transform="${transform}">${escapeHtml(text)}</text>`
}

const retroBadge = ({ title, subtitle, year = '1989', shape = 'circle', width = 1800, height = 1800 }) => {
  const isCircle = shape === 'circle'
  const frame = isCircle
    ? `<circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) * 0.39}" fill="${colors.cream}" stroke="${colors.teal}" stroke-width="42"/>
       <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) * 0.34}" fill="none" stroke="${colors.red}" stroke-width="28"/>`
    : `<rect x="${width * 0.12}" y="${height * 0.16}" width="${width * 0.76}" height="${height * 0.66}" rx="58" fill="${colors.cream}" stroke="${colors.teal}" stroke-width="42"/>
       <rect x="${width * 0.16}" y="${height * 0.2}" width="${width * 0.68}" height="${height * 0.58}" rx="36" fill="none" stroke="${colors.red}" stroke-width="28"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="none"/>
    ${frame}
    <circle cx="${width / 2}" cy="${height * 0.44}" r="${height * 0.16}" fill="${colors.orange}" opacity=".92"/>
    <path d="M${width * 0.36} ${height * 0.44}H${width * 0.64}M${width * 0.39} ${height * 0.49}H${width * 0.61}M${width * 0.42} ${height * 0.54}H${width * 0.58}" stroke="${colors.cream}" stroke-width="18" opacity=".85"/>
    ${svgText(title, { x: width / 2, y: height * 0.34, size: Math.min(width / 8.8, 190), fill: colors.red })}
    ${svgText(subtitle, { x: width / 2, y: height * 0.62, size: Math.min(width / 11.5, 136), fill: colors.teal })}
    ${svgText(year, { x: width / 2, y: height * 0.75, size: Math.min(width / 7.2, 240), fill: colors.ink })}
    <path d="M${width * 0.27} ${height * 0.82}H${width * 0.73}" stroke="${colors.teal}" stroke-width="34"/>
    <path d="M${width * 0.34} ${height * 0.89}H${width * 0.66}" stroke="${colors.orange}" stroke-width="34"/>
  </svg>`
}

const posterSvg = ({ title, subtitle, footer, width = 3600, height = 5400 }) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${colors.paper}"/>
    <rect x="210" y="220" width="${width - 420}" height="${height - 440}" rx="90" fill="${colors.cream}" stroke="${colors.teal}" stroke-width="68"/>
    <rect x="340" y="350" width="${width - 680}" height="${height - 700}" rx="54" fill="none" stroke="${colors.red}" stroke-width="48"/>
    <circle cx="${width / 2}" cy="1970" r="620" fill="${colors.orange}"/>
    <path d="M790 1980H2810M960 2140H2640M1160 2300H2440" stroke="${colors.cream}" stroke-width="46" opacity=".72"/>
    <path d="M750 2950L1320 2400H2280L2850 2950H750Z" fill="${colors.teal}"/>
    <path d="M1050 2950V2590H2550V2950" fill="none" stroke="${colors.ink}" stroke-width="54"/>
    <path d="M1500 2950V2510H2100V2950" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="42"/>
    ${svgText(title, { x: width / 2, y: 1080, size: 330, fill: colors.red })}
    ${svgText(subtitle, { x: width / 2, y: 1500, size: 220, fill: colors.teal })}
    ${svgText(footer, { x: width / 2, y: 3820, size: 190, fill: colors.offWhite })}
    ${svgText('1989', { x: width / 2, y: 4520, size: 430, fill: colors.red })}
    <rect x="520" y="3540" width="${width - 1040}" height="520" fill="${colors.teal}"/>
    <path d="M520 4180H3080" stroke="${colors.red}" stroke-width="80"/>
    <path d="M520 4310H3080" stroke="${colors.orange}" stroke-width="80"/>
  </svg>`

const stickerStripSvg = () => `
  <svg xmlns="http://www.w3.org/2000/svg" width="4500" height="1125" viewBox="0 0 4500 1125">
    <rect width="4500" height="1125" fill="none"/>
    <g transform="translate(80 40) scale(.54)">${retroBadge({ title: 'SUNSET', subtitle: 'MALL CLUB', shape: 'circle' }).replace(/<\/?svg[^>]*>/g, '')}</g>
    <g transform="translate(1180 40) scale(.54)">${retroBadge({ title: 'REWIND', subtitle: 'VIDEO NIGHT', shape: 'rect' }).replace(/<\/?svg[^>]*>/g, '')}</g>
    <g transform="translate(2280 40) scale(.54)">${retroBadge({ title: 'ARCADE', subtitle: 'TOKEN RUN', shape: 'circle' }).replace(/<\/?svg[^>]*>/g, '')}</g>
    <g transform="translate(3380 40) scale(.54)">${retroBadge({ title: 'FOOD', subtitle: 'COURT', shape: 'rect' }).replace(/<\/?svg[^>]*>/g, '')}</g>
  </svg>`

const notebookSvg = () => `
  <svg xmlns="http://www.w3.org/2000/svg" width="1650" height="2550" viewBox="0 0 1650 2550">
    <rect width="1650" height="2550" fill="${colors.cream}"/>
    <rect x="115" y="125" width="1420" height="2300" rx="70" fill="${colors.paper}" stroke="${colors.teal}" stroke-width="42"/>
    <rect x="240" y="270" width="1170" height="1780" rx="40" fill="${colors.cream}" stroke="${colors.red}" stroke-width="34"/>
    <circle cx="825" cy="980" r="330" fill="${colors.orange}"/>
    ${svgText('VIDEO', { x: 825, y: 645, size: 230, fill: colors.red })}
    ${svgText('RENTAL', { x: 825, y: 895, size: 220, fill: colors.teal })}
    ${svgText('NOTES', { x: 825, y: 1260, size: 260, fill: colors.ink })}
    ${svgText('BE KIND REWIND', { x: 825, y: 1660, size: 92, fill: colors.red, family: 'Courier New, monospace' })}
    ${svgText('1989 SUPPLY CO.', { x: 825, y: 2150, size: 108, fill: colors.teal, family: 'Courier New, monospace' })}
  </svg>`

const mousepadSvg = () => `
  <svg xmlns="http://www.w3.org/2000/svg" width="2610" height="2130" viewBox="0 0 2610 2130">
    <rect width="2610" height="2130" fill="${colors.teal}"/>
    <circle cx="1305" cy="820" r="530" fill="${colors.orange}"/>
    <path d="M400 1470H2210" stroke="${colors.cream}" stroke-width="76"/>
    ${svgText('ARCADE DESK', { x: 1305, y: 690, size: 255, fill: colors.cream })}
    ${svgText('COMMAND CENTER', { x: 1305, y: 1015, size: 190, fill: colors.ink })}
    ${svgText('1989', { x: 1305, y: 1320, size: 270, fill: colors.red })}
    ${svgText('GAME SAVED - WORK RESUMED', { x: 1305, y: 1655, size: 90, fill: colors.cream, family: 'Courier New, monospace' })}
  </svg>`

const physicalMockupSvg = ({ product, artworkHref, shape = 'card' }) => {
  const prop = product.shapeColor || colors.offWhite
  const productShape =
    shape === 'tee'
      ? `<path d="M415 248L598 140H716L900 248L826 438L754 410V1006H562V410L489 438Z" fill="${prop}" stroke="${colors.ink}" stroke-width="16"/>`
      : shape === 'hoodie'
        ? `<path d="M420 290L575 150H743L900 290L852 1020H470Z" fill="${prop}" stroke="${colors.ink}" stroke-width="16"/><path d="M585 178Q660 270 735 178" fill="none" stroke="${colors.ink}" stroke-width="14"/>`
        : shape === 'mug'
          ? `<rect x="440" y="320" width="470" height="520" rx="42" fill="${prop}" stroke="${colors.ink}" stroke-width="16"/><path d="M910 445Q1090 470 1050 610Q1010 750 910 718" fill="none" stroke="${colors.ink}" stroke-width="36"/>`
          : shape === 'tote'
            ? `<rect x="410" y="300" width="540" height="620" rx="24" fill="${prop}" stroke="${colors.ink}" stroke-width="16"/><path d="M560 305Q680 120 800 305" fill="none" stroke="${colors.ink}" stroke-width="28"/>`
            : shape === 'round'
              ? `<circle cx="675" cy="600" r="330" fill="${prop}" stroke="${colors.ink}" stroke-width="16"/>`
              : `<rect x="370" y="180" width="610" height="850" rx="30" fill="${prop}" stroke="${colors.ink}" stroke-width="16"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1350" height="1350" viewBox="0 0 1350 1350">
    <defs><pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="#c99b60" stroke-width="2" opacity=".35"/></pattern></defs>
    <rect width="1350" height="1350" fill="${colors.paper}"/><rect width="1350" height="1350" fill="url(#grid)"/>
    <rect x="86" y="86" width="1178" height="1178" rx="34" fill="#f8e4b6" opacity=".75" stroke="#8b5a32" stroke-width="8"/>
    ${productShape}
    <image href="${artworkHref}" x="500" y="465" width="350" height="350" preserveAspectRatio="xMidYMid meet"/>
    ${svgText(product.name, { x: 675, y: 1165, size: 72, fill: colors.teal })}
    ${svgText(product.caption, { x: 675, y: 1245, size: 42, fill: colors.red, family: 'Courier New, monospace' })}
  </svg>`
}

const lifestyleSvg = ({ product, artworkHref, index }) => {
  const scenes = [
    ['COUNTER FIND', 'coffee refills / receipt paper / warm noon light'],
    ['MALL DESK', 'cassette notes / arcade token / taped calendar'],
    ['GIFT READY', 'paper bag / counter stamp / weekend pickup'],
    ['ROOM SHELF', 'poster wall / VHS stack / late lights'],
  ]
  const [title, copy] = scenes[index % scenes.length]
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <rect width="1600" height="1100" fill="${index % 2 ? colors.teal : colors.paper}"/>
    <circle cx="1230" cy="210" r="230" fill="${colors.orange}" opacity=".82"/>
    <rect x="90" y="120" width="850" height="780" rx="28" fill="${colors.cream}" stroke="${colors.ink}" stroke-width="10"/>
    <image href="${artworkHref}" x="170" y="190" width="690" height="620" preserveAspectRatio="xMidYMid meet"/>
    <rect x="980" y="500" width="480" height="300" rx="18" fill="${colors.cream}" stroke="${colors.ink}" stroke-width="8"/>
    ${svgText(title, { x: 1220, y: 615, size: 80, fill: colors.red })}
    ${svgText(product.name, { x: 1220, y: 710, size: 52, fill: colors.teal })}
    ${svgText(copy, { x: 1220, y: 775, size: 30, fill: colors.ink, family: 'Courier New, monospace' })}
  </svg>`
}

const products = [
  {
    id: 'rewind-club-tee',
    name: 'Rewind Club Tee',
    category: 'Apparel',
    tag: 'New Drop',
    shortDetail: 'Vintage-white tee with a Sunset Mall rewind badge.',
    price: 31,
    sku: 'SKU-1989-TEE-001',
    shape: 'tee',
    shapeColor: '#f6ebcf',
    artwork: retroBadge({ title: 'REWIND', subtitle: 'SUNSET MALL', shape: 'circle' }),
    printful: { catalogProductId: 71, fileType: 'front', variants: [
      ['S', 'Vintage White', 14714, 11.69, 31],
      ['M', 'Vintage White', 14715, 11.69, 31],
      ['L', 'Vintage White', 14716, 11.69, 31],
      ['XL', 'Vintage White', 14717, 11.69, 31],
      ['2XL', 'Vintage White', 14718, 13.69, 34],
    ] },
  },
  {
    id: 'mall-weekend-hoodie',
    name: 'Mall Weekend Hoodie',
    category: 'Apparel',
    tag: 'Best Seller',
    shortDetail: 'Soft hoodie for parking-lot sunsets and food-court runs.',
    price: 56,
    sku: 'SKU-1989-HDY-001',
    shape: 'hoodie',
    shapeColor: '#d7d7cf',
    artwork: retroBadge({ title: 'MALL', subtitle: 'WEEKEND RUN', shape: 'rect' }),
    printful: { catalogProductId: 146, fileType: 'front', variants: [
      ['S', 'Sport Grey', 5610, 19.95, 56],
      ['M', 'Sport Grey', 5611, 19.95, 56],
      ['L', 'Sport Grey', 5612, 19.95, 56],
      ['XL', 'Sport Grey', 5613, 19.95, 56],
      ['2XL', 'Sport Grey', 5614, 23.95, 60],
    ] },
  },
  {
    id: 'mall-weekend-tote',
    name: 'Mall Weekend Tote',
    category: 'Bags',
    tag: 'Fresh Drop',
    shortDetail: 'Organic cotton tote for records, snacks, and Saturday finds.',
    price: 29,
    sku: 'SKU-1989-TOTE-001',
    shape: 'tote',
    shapeColor: '#efe1c2',
    artwork: retroBadge({ title: 'SUNSET', subtitle: 'SHOPPING RUN', shape: 'rect' }),
    printful: { catalogProductId: 367, fileType: 'front', variants: [['One size', 'Oyster', 10458, 15.25, 29]] },
  },
  {
    id: 'mall-weekend-mug',
    name: 'Mall Weekend Mug',
    category: 'Drinkware',
    tag: 'Under $20',
    shortDetail: 'Glossy mug for coffee, tea, and late checkout tabs.',
    price: 19.95,
    sku: 'SKU-1989-MUG-002',
    shape: 'mug',
    shapeColor: '#fff',
    artwork: retroBadge({ title: 'MALL', subtitle: 'COFFEE CLUB', shape: 'rect', width: 2700, height: 1050 }),
    printful: { catalogProductId: 19, fileType: 'default', variants: [['11 oz', 'White', 1320, 6.5, 19.95], ['15 oz', 'White', 4830, 8.95, 24.95]] },
  },
  {
    id: 'food-court-poster',
    name: 'Food Court Poster',
    category: 'Wall Art',
    tag: 'Gift Pick',
    shortDetail: 'Matte poster for rooms, kitchens, and desk walls.',
    price: 32,
    sku: 'SKU-1989-POSTER-001',
    shape: 'card',
    artwork: posterSvg({ title: 'FOOD COURT', subtitle: 'AT SUNSET MALL', footer: 'GOOD FOOD GOOD FRIENDS GOOD TIMES' }),
    printful: { catalogProductId: 1, fileType: 'default', variants: [['12x18 in', null, 3876, 10.5, 24.5], ['18x24 in', null, 1, 11.75, 32]] },
  },
  {
    id: 'memory-lane-canvas',
    name: 'Memory Lane Canvas',
    category: 'Wall Art',
    tag: 'Premium Pick',
    shortDetail: 'Gallery-style canvas with a late-80s mall poster feel.',
    price: 52,
    sku: 'SKU-1989-CANVAS-001',
    shape: 'card',
    artwork: posterSvg({ title: 'MEMORY LANE', subtitle: 'SUNSET MALL', footer: 'ROOM WALL READY' }),
    printful: { catalogProductId: 3, fileType: 'default', variants: [['12x18 in', null, 19299, 26.95, 52], ['16x24 in', null, 19303, 33.5, 68]] },
  },
  {
    id: 'rewind-sticker-strip',
    name: 'Rewind Sticker Strip',
    category: 'Stationery',
    tag: 'Gift Pick',
    shortDetail: 'Long sticker strip of mall, arcade, diner, and VHS marks.',
    price: 16.5,
    sku: 'SKU-1989-STICKER-001',
    shape: 'card',
    artwork: stickerStripSvg(),
    printful: { catalogProductId: 358, fileType: 'default', variants: [['15x3.75 in', 'White', 16362, 6.25, 16.5]] },
  },
  {
    id: 'video-rental-notebook',
    name: 'Video Rental Notebook',
    category: 'Stationery',
    tag: 'Desk Pick',
    shortDetail: 'Spiral notebook for lists, scripts, ideas, and rewinds.',
    price: 28,
    sku: 'SKU-1989-NOTEBOOK-001',
    shape: 'card',
    artwork: notebookSvg(),
    printful: { catalogProductId: 474, fileType: 'default', variants: [['5.5x8.5 in', 'Dotted', 12141, 13.25, 28]] },
  },
  {
    id: 'arcade-token-coaster',
    name: 'Arcade Token Coaster',
    category: 'Home Goods',
    tag: 'Under $20',
    shortDetail: 'Cork-back coaster for coffee, soda, and desk refills.',
    price: 13.5,
    sku: 'SKU-1989-COASTER-001',
    shape: 'round',
    artwork: retroBadge({ title: 'ARCADE', subtitle: 'TOKEN CLUB', shape: 'circle' }),
    printful: { catalogProductId: 611, fileType: 'default', variants: [['3.74x3.74 in', null, 15662, 5.5, 13.5]] },
  },
  {
    id: 'arcade-desk-mouse-pad',
    name: 'Arcade Desk Mouse Pad',
    category: 'Home Goods',
    tag: 'Desk Pick',
    shortDetail: 'Desk pad for work blocks with a late-night arcade mood.',
    price: 24,
    sku: 'SKU-1989-MOUSEPAD-001',
    shape: 'card',
    artwork: mousepadSvg(),
    printful: { catalogProductId: 518, fileType: 'default', variants: [['8.7x7.1 in', 'White', 13097, 9.5, 24]] },
  },
]

const renderPng = async (svg, filePath, width = null, height = null) => {
  ensureDir(path.dirname(filePath))
  let image = sharp(Buffer.from(svg))
  if (width || height) image = image.resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  await image.png().toFile(filePath)
}

const uploadFile = async (filePath, filename) => {
  const data = fs.readFileSync(filePath).toString('base64')
  const response = await api('POST', '/files', { data, filename, type: 'default' })
  return response.result
}

const main = async () => {
  ensureDir(outputRoot)
  ensureDir(artworkRoot)
  ensureDir(path.dirname(dataPath))

  const existingProducts = (await api('GET', '/store/products?limit=100')).result ?? []
  const report = {
    schemaVersion: 2,
    updatedAt: new Date().toISOString(),
    store: { id: env.PRINTFUL_STORE_ID, name: env.SHOP_BRAND_NAME ?? 'Dreaming in 1989', currency: env.SHOP_CURRENCY ?? 'USD' },
    products: [],
  }
  const imports = []
  const productExports = []

  for (const product of products) {
    const productDir = path.join(outputRoot, product.id)
    const artworkDir = path.join(artworkRoot, product.id)
    ensureDir(productDir)
    ensureDir(artworkDir)

    const printPath = path.join(artworkDir, `${product.id}-print.png`)
    const productPath = path.join(productDir, '01-front.png')
    const detailPath = path.join(productDir, '02-detail.png')
    await renderPng(product.artwork, printPath)

    const printDataUri = `data:image/png;base64,${fs.readFileSync(printPath).toString('base64')}`
    await renderPng(physicalMockupSvg({ product: { ...product, caption: product.category }, artworkHref: printDataUri, shape: product.shape }), productPath)
    await renderPng(physicalMockupSvg({ product: { ...product, name: `${product.name} Detail`, caption: 'PRINT READY' }, artworkHref: printDataUri, shape: 'card' }), detailPath)

    const lifestylePaths = []
    for (let index = 0; index < 4; index += 1) {
      const lifestylePath = path.join(productDir, `0${index + 3}-lifestyle-${index + 1}.png`)
      await renderPng(lifestyleSvg({ product, artworkHref: printDataUri, index }), lifestylePath)
      lifestylePaths.push(lifestylePath)
    }

    const upload = await uploadFile(printPath, `${product.id}-print.png`)
    const existing = existingProducts.find((item) => item.external_id === product.id)
    let syncProduct = existing ?? null
    let created = false

    if (!syncProduct) {
      const syncVariants = product.printful.variants.map(([size, color, variantId, baseCost, retailPrice]) => ({
        external_id: `${product.id}-${String(size).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        variant_id: variantId,
        retail_price: currency(retailPrice),
        sku: `${product.sku}-${String(size).toUpperCase().replace(/[^A-Z0-9]+/g, '')}`,
        files: [{ id: upload.id, type: product.printful.fileType }],
      }))
      const response = await api('POST', '/store/products', {
        sync_product: {
          name: product.name,
          external_id: product.id,
        },
        sync_variants: syncVariants,
      })
      syncProduct = response.result
      created = true
    }

    const variantSummary = product.printful.variants.map(([size, color, variantId, baseCost, retailPrice]) => ({
      size,
      color,
      catalogVariantId: variantId,
      baseCost,
      retailPrice,
      estimatedGrossMargin: Number((retailPrice - baseCost).toFixed(2)),
    }))

    report.products.push({
      localProductId: product.id,
      name: product.name,
      category: product.category,
      sku: product.sku,
      storefrontPrice: product.price,
      artworkFile: path.relative(repoRoot, printPath),
      printfulUpload: {
        id: upload.id,
        status: upload.status,
        filename: upload.filename,
      },
      printfulSync: {
        syncProductId: syncProduct.id,
        externalId: syncProduct.external_id,
        syncedVariants: syncProduct.variants,
        createdThisRun: created,
      },
      printfulCandidate: {
        catalogProductId: product.printful.catalogProductId,
        fileType: product.printful.fileType,
      },
      variants: variantSummary,
    })

    const importBase = product.id.replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '')
    const assetList = [productPath, detailPath, ...lifestylePaths]
    const names = assetList.map((assetPath, index) => `${importBase}Image${index + 1}`)
    assetList.forEach((assetPath, index) => {
      imports.push(`import ${names[index]} from '../assets/catalog/${product.id}/${path.basename(assetPath)}'`)
    })

    const gallery = [
      { label: 'Front', image: names[0], imageUse: 'product' },
      { label: 'Detail', image: names[1], imageUse: 'detail' },
      ...names.slice(2).map((name, index) => ({ label: `Lifestyle ${index + 1}`, image: name, imageUse: 'lifestyle' })),
    ]

    productExports.push(`{
    id: '${product.id}',
    name: '${product.name.replaceAll("'", "\\'")}',
    shortDetail: '${product.shortDetail.replaceAll("'", "\\'")}',
    price: ${product.price},
    category: '${product.category}',
    tag: '${product.tag}',
    image: ${names[0]},
    printDetailImage: ${names[1]},
    lifestyleImage: ${names[2]},
    galleryImages: [${gallery.map((item) => `{ label: '${item.label}', image: ${item.image}, imageUse: '${item.imageUse}' }`).join(', ')}],
    imageUse: 'product',
    sku: '${product.sku}',
    stockState: 'in-stock',
    printful: {
      syncProductId: ${syncProduct.id},
      catalogProductId: ${product.printful.catalogProductId},
      variants: ${JSON.stringify(variantSummary)},
    },
  }`)
  }

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)

  const dataSource = `${imports.join('\n')}\n\nexport const products = [\n  ${productExports.join(',\n  ')}\n]\n\nexport const newArrivalIds = ['rewind-club-tee', 'mall-weekend-hoodie', 'mall-weekend-mug', 'rewind-sticker-strip']\n\nexport const featuredDropProduct = products.find((product) => product.id === 'food-court-poster') ?? null\n\nexport const bundles = [\n  {\n    id: 'bundle-mall-fit',\n    name: 'Mall Weekend Fit',\n    shortDetail: 'Tee, hoodie, and tote built around the full mall-run look.',\n    price: 99,\n    value: 116,\n    image: products.find((product) => product.id === 'mall-weekend-hoodie')?.lifestyleImage,\n    imageUse: 'banner',\n    items: ['Rewind Club Tee', 'Mall Weekend Hoodie', 'Mall Weekend Tote'],\n  },\n  {\n    id: 'bundle-desk-counter',\n    name: 'Counter Desk Pack',\n    shortDetail: 'Mug, coaster, notebook, and mouse pad for work blocks.',\n    price: 73,\n    value: 85.45,\n    image: products.find((product) => product.id === 'arcade-desk-mouse-pad')?.lifestyleImage,\n    imageUse: 'banner',\n    items: ['Mall Weekend Mug', 'Arcade Token Coaster', 'Video Rental Notebook', 'Arcade Desk Mouse Pad'],\n  },\n  {\n    id: 'bundle-room-wall',\n    name: 'Room Wall Set',\n    shortDetail: 'Poster, canvas, and sticker strip for a fast room reset.',\n    price: 88,\n    value: 100.5,\n    image: products.find((product) => product.id === 'food-court-poster')?.lifestyleImage,\n    imageUse: 'banner',\n    items: ['Food Court Poster', 'Memory Lane Canvas', 'Rewind Sticker Strip'],\n  },\n]\n\nexport const shelfReadySets = [\n  { id: 'set-under-25', name: 'Under-$25 Gift Run', copy: 'Sticker strip, coaster, mug, and mouse pad picks.', price: 73.95, image: products.find((product) => product.id === 'rewind-sticker-strip')?.lifestyleImage, imageUse: 'banner' },\n  { id: 'set-room', name: 'Room Wall Starter', copy: 'Poster, canvas, and sticker strip.', price: 88, image: products.find((product) => product.id === 'memory-lane-canvas')?.lifestyleImage, imageUse: 'banner' },\n  { id: 'set-desk', name: 'Desk Setup Pack', copy: 'Notebook, mouse pad, mug, and coaster.', price: 73, image: products.find((product) => product.id === 'video-rental-notebook')?.lifestyleImage, imageUse: 'banner' },\n]\n\nexport const productDetailExperiences = Object.fromEntries(products.map((product) => [product.id, {\n  storyTitle: product.name,\n  storyBody: product.shortDetail,\n  storyBullets: ['Made to order through Printful', 'US-focused launch SKU', 'Retro 1989 mall visual system', 'Built for bundle and upsell flows'],\n  lookbook: product.galleryImages.slice(2).map((item) => [item.image, item.label]),\n  careRows: [['Use', product.category === 'Apparel' ? 'Daily wear and weekend outfits' : 'Everyday desk, room, or gift use'], ['Production', 'Printed after checkout through mapped Printful variants']],\n}]))\n`
  fs.writeFileSync(dataPath, dataSource)

  console.log(JSON.stringify({
    products: report.products.length,
    createdPrintfulProducts: report.products.filter((product) => product.printfulSync.createdThisRun).length,
    reportPath: path.relative(repoRoot, reportPath),
    dataPath: path.relative(repoRoot, dataPath),
  }, null, 2))
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
