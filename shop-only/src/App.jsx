import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  FileText,
  Gift,
  Heart,
  Home,
  Image,
  LogIn,
  LogOut,
  Mail,
  Minus,
  Package,
  PackageCheck,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  User,
  Wallet,
  X,
} from 'lucide-react'
import heroImage from './assets/store-hero.png'
import heroContentSheetImage from './assets/hero-content-sheet.png'
import heroMemoryLaneImage from './assets/hero-memory-lane.png'
import heroProductSheetImage from './assets/hero-product-sheet.png'
import heroSupermarketImage from './assets/hero-supermarket.png'
import heroSupermarketV2Image from './assets/hero-supermarket-v2.png'
import dreaming1989LogoImage from './assets/header/dreaming-1989-logo-alpha.png'
import vhsCassetteHeaderImage from './assets/header/vhs-cassette-header.png'
import mallWeekendImage from './assets/mall-weekend.png'
import videoStoreImage from './assets/video-store-night.png'
import vintageMotelKeychain from './assets/ui/vintage-motel-keychain.png'
import arcadeDepartmentImage from './assets/departments/arcade-department.png'
import audioDepartmentImage from './assets/departments/audio-department.png'
import kitchenDepartmentImage from './assets/departments/kitchen-department.png'
import wallArtDepartmentImage from './assets/departments/wall-art-department.png'
import snackBowlSetFeatureImage from './assets/featured/snack-bowl-set-feature.png'
import boomboxFeatureImage from './assets/featured/boombox-feature.png'
import arcadeEssentialsSetImage from './assets/sets/arcade-essentials.png'
import audioShelfSetImage from './assets/sets/audio-shelf-set.png'
import deskSetupPackSetImage from './assets/sets/desk-setup-pack.png'
import kitchenDinnerKitSetImage from './assets/sets/kitchen-dinner-kit.png'
import wallArtStarterSetImage from './assets/sets/wall-art-starter.png'
import deskGiftsLineupImage from './assets/gift-counter/desk-gifts-lineup-v2.png'
import partyNightLineupImage from './assets/gift-counter/party-night-lineup-v2.png'
import shelfDecorLineupImage from './assets/gift-counter/shelf-decor-lineup-v2.png'
import under25LineupImage from './assets/gift-counter/under-25-lineup-v2.png'
import albumWallPrintImage from './assets/products-cutout/album-wall-print.png'
import arcadePosterImage from './assets/products-cutout/arcade-poster.png'
import cartoonPinPackImage from './assets/products-cutout/cartoon-pin-pack.png'
import dinerMugImage from './assets/products-cutout/diner-mug-transparent-mockup.jpg'
import dinerTrayImage from './assets/products-cutout/diner-tray.png'
import mallToteImage from './assets/products-cutout/mall-tote.png'
import rewindTeeImage from './assets/products-cutout/rewind-tee.png'
import rewindTeeDetailImage from './assets/products-cutout/rewind-tee-detail.png'
import rewindTeeLifestyleImage from './assets/products-cutout/rewind-tee-lifestyle.png'
import dinerMugLifestyleImage from './assets/products-cutout/diner-mug-lifestyle.png'
import vhsCalendarImage from './assets/products-cutout/vhs-calendar.png'
import videoNightSignImage from './assets/products-cutout/video-night-sign.png'
import retroCartImage from './assets/ui/retro-cart.png'
import RevenueDashboard from './RevenueDashboard.jsx'
import './App.css'

const categories = ['All', 'Apparel', 'Bags', 'Drinkware', 'Wall Art', 'Stationery', 'Home Goods']
const collectionSortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest']
const collectionAvailabilityOptions = ['All', 'In Stock', 'Low Stock']
const productInfoTabs = ['Details', 'Size Guide', 'Shipping', 'Reviews']

const getCategorySlug = (category) => category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const getCategoryFromSlug = (slug) =>
  categories.find((category) => getCategorySlug(category) === slug) ?? 'All'

const getProductPath = (product) => `#/products/${product.id}`

const accountRouteBase = '/my-account'
const accountRouteTabs = new Set(['dashboard', 'orders', 'addresses', 'payments', 'wishlist', 'settings', 'support'])
const orderFilterTabs = ['All', 'Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled']
const defaultOrderDateRange = { start: '2020-12-01', end: new Date().toISOString().split('T')[0] }

const normalizePathname = (pathname) => {
  const normalizedPath = (pathname || '/').replace(/\/+$/, '')
  return normalizedPath || '/'
}

const getAccountTabFromPath = (pathname) => {
  const normalizedPath = normalizePathname(pathname)
  if (normalizedPath === accountRouteBase) return 'dashboard'
  if (!normalizedPath.startsWith(`${accountRouteBase}/`)) return null

  const routeTab = normalizedPath.slice(accountRouteBase.length + 1).split('/')[0]
  return accountRouteTabs.has(routeTab) ? routeTab : 'dashboard'
}

const getAccountPath = (tab = 'dashboard') => {
  if (tab === 'dashboard') return accountRouteBase
  return `${accountRouteBase}/${tab}`
}

const getDateOnlyTime = (value) => {
  const [year, month, day] = String(value).split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day).getTime()
}

const getOrderDateOnlyTime = (dateLabel) => {
  if (String(dateLabel).toLowerCase() === 'today') {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
  }

  const parsedDate = new Date(dateLabel)
  if (Number.isNaN(parsedDate.getTime())) return null
  return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()).getTime()
}

const productImages = {
  rewindTee: rewindTeeImage,
  rewindHoodie: rewindTeeImage,
  mallTote: mallToteImage,
  dinerMug: dinerMugImage,
  arcadePoster: arcadePosterImage,
  stickerPack: cartoonPinPackImage,
  deskCalendar: vhsCalendarImage,
  notebook: videoNightSignImage,
  coasterSet: dinerTrayImage,
  wallCanvas: albumWallPrintImage,
}

const imageUseMeta = {
  product: {
    ratio: '1:1 product frame',
    treatment: 'Object contained',
    note: 'Use for sellable SKU images. Keep the full item visible inside a square frame.',
  },
  banner: {
    ratio: '16:9 landscape banner',
    treatment: 'Cover crop',
    note: 'Use for bundles, gift guides, featured promos, and section cover images.',
  },
  hero: {
    ratio: 'Full-bleed hero',
    treatment: 'Cover crop',
    note: 'Use only for first-viewport storefront scenes and wide campaign backgrounds.',
  },
}

const products = [
  {
    id: 'rewind-club-tee',
    name: 'Rewind Club Tee',
    shortDetail: 'Soft cotton tee printed on demand.',
    price: 30,
    category: 'Apparel',
    tag: 'New',
    image: productImages.rewindTee,
    printDetailImage: rewindTeeDetailImage,
    lifestyleImage: rewindTeeLifestyleImage,
    imageUse: 'product',
    sku: 'SKU-1989-014',
    stockState: 'in-stock',
  },
  {
    id: 'mall-weekend-hoodie',
    name: 'Mall Weekend Hoodie',
    shortDetail: 'Warm pullover with a small retro chest print.',
    price: 54,
    category: 'Apparel',
    tag: 'Best Seller',
    image: productImages.rewindHoodie,
    imageUse: 'product',
    sku: 'SKU-1989-022',
    stockState: 'in-stock',
  },
  {
    id: 'mall-weekend-tote',
    name: 'Mall Weekend Tote',
    shortDetail: 'Heavy canvas tote for shopping and day trips.',
    price: 24,
    category: 'Bags',
    tag: 'Fresh Drop',
    image: productImages.mallTote,
    imageUse: 'product',
    sku: 'SKU-1989-031',
    stockState: 'in-stock',
  },
  {
    id: 'diner-counter-mug',
    name: 'Diner Counter Mug',
    shortDetail: 'Ceramic mug for coffee, tea, and desk days.',
    price: 18,
    category: 'Drinkware',
    tag: 'Under $20',
    image: productImages.dinerMug,
    lifestyleImage: dinerMugLifestyleImage,
    imageUse: 'product',
    sku: 'SKU-1989-044',
    stockState: 'in-stock',
  },
  {
    id: 'arcade-night-poster',
    name: 'Arcade Night Poster',
    shortDetail: '18x24 wall poster for rooms and studios.',
    price: 32,
    category: 'Wall Art',
    tag: 'Low Stock',
    image: productImages.arcadePoster,
    imageUse: 'product',
    sku: 'SKU-1989-051',
    stockState: 'low-stock',
  },
  {
    id: 'rewind-sticker-pack',
    name: 'Rewind Sticker Pack',
    shortDetail: 'Die-cut stickers for laptops, bottles, and notebooks.',
    price: 16,
    category: 'Stationery',
    tag: 'Gift Pick',
    image: productImages.stickerPack,
    imageUse: 'product',
    sku: 'SKU-1989-063',
    stockState: 'in-stock',
  },
  {
    id: 'retro-desk-calendar',
    name: 'Retro Desk Calendar',
    shortDetail: 'Monthly desk calendar with original 1989-style art.',
    price: 26,
    category: 'Stationery',
    tag: 'Desk Pick',
    image: productImages.deskCalendar,
    imageUse: 'product',
    sku: 'SKU-1989-077',
    stockState: 'in-stock',
  },
  {
    id: 'video-rental-notebook',
    name: 'Video Rental Notebook',
    shortDetail: 'Lined notebook for lists, sketches, and daily notes.',
    price: 22,
    category: 'Stationery',
    tag: 'New',
    image: productImages.notebook,
    imageUse: 'product',
    sku: 'SKU-1989-089',
    stockState: 'in-stock',
  },
  {
    id: 'diner-coaster-set',
    name: 'Diner Coaster Set',
    shortDetail: 'Four printed coasters for coffee tables and desks.',
    price: 22,
    category: 'Home Goods',
    tag: 'Bundle Ready',
    image: productImages.coasterSet,
    imageUse: 'product',
    sku: 'SKU-1989-102',
    stockState: 'in-stock',
  },
  {
    id: 'memory-lane-canvas',
    name: 'Memory Lane Canvas',
    shortDetail: 'Stretched canvas print for bedrooms and work corners.',
    price: 48,
    category: 'Wall Art',
    tag: 'Gift Pick',
    image: productImages.wallCanvas,
    imageUse: 'product',
    sku: 'SKU-1989-181',
    stockState: 'in-stock',
  },
]

const bundles = [
  {
    id: 'bundle-weekend',
    name: 'Weekend Outfit Pack',
    shortDetail: 'Tee, tote, and stickers for an easy first order.',
    price: 64,
    value: 70,
    image: videoStoreImage,
    imageUse: 'banner',
    items: ['Rewind Club Tee', 'Mall Weekend Tote', 'Rewind Sticker Pack'],
  },
  {
    id: 'bundle-desk',
    name: 'Desk Work Pack',
    shortDetail: 'Notebook, calendar, and coasters for a cleaner desk.',
    price: 58,
    value: 70,
    image: snackBowlSetFeatureImage,
    imageUse: 'banner',
    items: ['Video Rental Notebook', 'Retro Desk Calendar', 'Diner Coaster Set'],
  },
  {
    id: 'bundle-room',
    name: 'Retro Room Pack',
    shortDetail: 'Poster, canvas, and stickers for a quick room refresh.',
    price: 86,
    value: 96,
    image: mallWeekendImage,
    imageUse: 'banner',
    items: ['Arcade Night Poster', 'Memory Lane Canvas', 'Rewind Sticker Pack'],
  },
]

const heroSlides = [
  {
    image: heroImage,
    imageUse: 'hero',
    label: 'Retro den counter',
    receipt: {
      code: 'RCPT-1989-01',
      items: [
        ['Tee', 30],
        ['Tote', 24],
        ['Mug', 18],
        ['Wall art', 48],
        ['Stickers', 16],
      ],
    },
  },
  {
    image: heroSupermarketV2Image,
    imageUse: 'hero',
    label: 'Checkout lane',
    receipt: {
      code: 'RCPT-1989-02',
      items: [
        ['Diner mug', 18],
        ['Canvas tote', 24],
        ['Coasters', 22],
        ['Desk calendar', 26],
        ['Gift note', 6],
      ],
    },
  },
  {
    image: heroSupermarketImage,
    imageUse: 'hero',
    label: 'Aisle storefront',
    receipt: {
      code: 'RCPT-1989-03',
      items: [
        ['Hoodie', 54],
        ['Notebook', 22],
        ['Sticker pack', 16],
        ['Canvas print', 48],
        ['Poster', 32],
      ],
    },
  },
  {
    image: heroMemoryLaneImage,
    imageUse: 'hero',
    label: 'Memory lane room',
    receipt: {
      code: 'RCPT-1989-04',
      items: [
        ['Tee', 30],
        ['Desk calendar', 26],
        ['Wall canvas', 48],
        ['Rewind tee', 30],
        ['Handling', 0],
      ],
    },
  },
  {
    image: heroProductSheetImage,
    imageUse: 'hero',
    label: 'Product shelf sheet',
    receipt: {
      code: 'RCPT-1989-05',
      items: [
        ['Desk calendar', 26],
        ['Notebook', 22],
        ['Coaster set', 22],
        ['Mug', 18],
        ['Bundle save', -12],
      ],
    },
  },
  {
    image: heroContentSheetImage,
    imageUse: 'hero',
    label: 'Retro content wall',
    receipt: {
      code: 'RCPT-1989-06',
      items: [
        ['Wall canvas', 48],
        ['Arcade poster', 32],
        ['Sticker pack', 16],
        ['Gift note', 5],
        ['Shipping', 0],
      ],
    },
  },
]

const departmentCards = [
  { name: 'Apparel', copy: 'Tees and hoodies printed after each order.', image: audioDepartmentImage, imageUse: 'banner' },
  { name: 'Drinkware', copy: 'Mugs for coffee, tea, and desk days.', image: kitchenDepartmentImage, imageUse: 'banner' },
  { name: 'Wall Art', copy: 'Posters and canvas prints for rooms and studios.', image: wallArtDepartmentImage, imageUse: 'banner' },
  { name: 'Stationery', copy: 'Stickers, notebooks, and desk calendars.', image: arcadeDepartmentImage, imageUse: 'banner' },
]

const giftCounterItems = [
  {
    title: 'Under $25',
    copy: 'Stickers, notebooks, coasters, and small desk goods.',
    category: 'Stationery',
    budget: '$16-$22',
    image: under25LineupImage,
    imageUse: 'banner',
  },
  {
    title: 'Desk Gifts',
    copy: 'Calendars, notebooks, mugs, and clean desk add-ons.',
    category: 'Stationery',
    budget: '$18-$26',
    image: deskGiftsLineupImage,
    imageUse: 'banner',
  },
  {
    title: 'Room Decor',
    copy: 'Posters and canvas prints for quick wall upgrades.',
    category: 'Wall Art',
    budget: '$32-$48',
    image: shelfDecorLineupImage,
    imageUse: 'banner',
  },
  {
    title: 'Outfit',
    copy: 'Tees, hoodies, and tote bags for daily wear.',
    category: 'Apparel',
    budget: '$24-$54',
    image: partyNightLineupImage,
    imageUse: 'banner',
  },
]

const newArrivalIds = ['mall-weekend-hoodie', 'rewind-club-tee', 'diner-counter-mug', 'retro-desk-calendar']
const featuredDropProduct = {
  id: 'arcade-night-poster',
  name: 'Arcade Night Poster',
  shortDetail: 'Wall poster made after order for rooms, offices, and studios.',
  price: 32,
  category: 'Wall Art',
  tag: "Today's Spotlight",
  image: arcadePosterImage,
  imageUse: 'product',
  sku: 'SKU-1989-198',
  stockState: 'in-stock',
}

const shelfReadySets = [
  {
    id: 'set-outfit',
    name: 'Outfit Starter',
    copy: 'Tee, hoodie, and tote for a simple first drop.',
    price: 108,
    image: audioShelfSetImage,
    imageUse: 'banner',
  },
  {
    id: 'set-room',
    name: 'Room Wall Set',
    copy: 'Poster, canvas, and sticker pack.',
    price: 86,
    image: arcadeEssentialsSetImage,
    imageUse: 'banner',
  },
  {
    id: 'set-desk',
    name: 'Desk Setup Pack',
    copy: 'Notebook, calendar, mug, and coasters.',
    price: 78,
    image: kitchenDinnerKitSetImage,
    imageUse: 'banner',
  },
  {
    id: 'set-wall-art',
    name: 'Wall Art Starter',
    copy: 'Two wall prints and stickers to style a room.',
    price: 80,
    image: wallArtStarterSetImage,
    imageUse: 'banner',
  },
  {
    id: 'set-gift',
    name: 'Small Gift Pack',
    copy: 'Sticker pack, notebook, and coasters.',
    price: 50,
    image: deskSetupPackSetImage,
    imageUse: 'banner',
  },
]

const policyCards = [
  {
    id: 'shipping',
    title: 'Shipping',
    path: 'shipping',
    label: 'Printful fulfillment',
    copy: 'Orders are produced through Printful after checkout, then handed to a carrier for delivery. Production time and shipping time are separate.',
    points: ['Production usually takes 2-5 business days', 'US domestic transit is commonly estimated after fulfillment', 'Tracking is sent after the carrier label is created'],
    sections: [
      ['Production', 'Printful production is the time needed to prepare an order for shipping after the order is received. The store should show this separately from carrier transit.'],
      ['Delivery', 'US delivery estimates should be shown as fulfillment time plus shipping transit. Tracking should be sent to the customer once Printful marks the order shipped.'],
      ['Address changes', 'Address edits should be handled before the order is submitted or before fulfillment starts. After production begins, changes may not be possible.'],
    ],
  },
  {
    id: 'refund',
    title: 'Refund',
    path: 'refund',
    label: 'Returns and claims',
    copy: 'Because items are made after purchase, refunds focus on damaged, misprinted, defective, incorrect, or lost orders.',
    points: ['Claims should be submitted within Printful claim windows', 'Photo proof is required for damaged or misprinted goods', 'Wrong size or changed mind is not an automatic refund'],
    sections: [
      ['Covered cases', 'The store should handle damaged, misprinted, defective, incorrect, and confirmed lost orders through Printful claim handling.'],
      ['Not covered', 'Wrong size selection, wrong color selection, changed mind, or customer address mistakes should not be automatic refunds once an item is produced.'],
      ['Claim flow', 'The customer sends an order number, photos, and a short description. The store reviews the issue and requests a reprint or refund from Printful when eligible.'],
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    path: 'contact',
    label: 'Support desk',
    copy: 'One support inbox handles order questions, address updates, tracking questions, supplier claims, and refund requests.',
    points: ['Email: support@1989supply.co', 'Include order number and checkout email', 'Attach photos for damaged or misprinted items'],
    sections: [
      ['Support email', 'Use support@1989supply.co as the customer support inbox for order questions, address updates, tracking help, and claim follow-up.'],
      ['What to include', 'For order issues, customers should include order number, email used at checkout, photos if relevant, and the shipping address if asking about delivery.'],
      ['Response target', 'A realistic small-shop target is 1-2 business days for first response, with Printful supplier claims taking longer when production review is needed.'],
    ],
  },
  {
    id: 'terms-privacy',
    title: 'Terms & Privacy',
    path: 'terms-privacy',
    label: 'Store terms',
    copy: 'Store terms explain made-to-order production, payment processing, fulfillment partner data use, and customer privacy handling.',
    points: ['Orders are produced by a fulfillment partner', 'Customer data is used for checkout, support, and shipping', 'Payment and fulfillment providers may process order data'],
    sections: [
      ['Made-to-order production', 'Items are made after purchase through Printful. Production status, address changes, cancellations, and delivery timing depend on fulfillment progress.'],
      ['Customer data', 'Customer name, email, address, order items, and support messages are used to process payment, fulfill orders, send tracking, and handle support.'],
      ['Supplier terms', 'Printful receives the order details needed to produce and ship items. The store policy should link to the relevant payment and fulfillment partner terms.'],
    ],
  },
]

const supportMenuItems = [
  policyCards.find((policy) => policy.id === 'contact'),
  policyCards.find((policy) => policy.id === 'shipping'),
  policyCards.find((policy) => policy.id === 'refund'),
  policyCards.find((policy) => policy.id === 'terms-privacy'),
].filter(Boolean)

const policyPageDetails = {
  shipping: {
    timeline: [
      ['Order received', 'Checkout is captured and the order is prepared for Printful fulfillment.'],
      ['Production', 'Printful prints, packs, and prepares the item. Most items are commonly produced in 2-5 business days, but peak periods can take longer.'],
      ['Carrier handoff', 'After fulfillment, the carrier receives the package and tracking becomes available.'],
      ['Delivery', 'The customer follows carrier tracking. Delivery issues are reviewed with the carrier and Printful when eligible.'],
    ],
    table: [
      ['Production time', 'Separate from shipping time', 'Shown before checkout and in order emails.'],
      ['Tracking', 'Sent after shipping label / carrier handoff', 'Customer must allow tracking to update after carrier scan.'],
      ['Wrong address', 'Customer responsibility after fulfillment starts', 'Contact support immediately before production begins.'],
      ['Returned package', 'Reviewed case by case', 'Reshipment may require a new shipping fee if the address was wrong.'],
    ],
    notice: 'Orders are made after purchase. Production time is not the same as carrier transit time, so delivery estimates must include both.',
  },
  refund: {
    claimWindow: 'Misprinted, damaged, or defective item claims should be submitted within 30 days after delivery. Lost package claims should be submitted within 30 days after the estimated delivery date.',
    covered: ['Damaged item on arrival', 'Visible print defect', 'Wrong product or wrong print sent', 'Confirmed lost shipment', 'Manufacturing defect'],
    notCovered: ['Wrong size selected by customer', 'Changed mind after production', 'Wrong address entered by customer', 'Color expectations from screen differences', 'Normal carrier delay while tracking is active'],
    process: [
      ['Customer submits claim', 'Order number, checkout email, photos, and a short description are required.'],
      ['Store reviews evidence', 'The store checks whether the issue matches Printful-eligible claim cases.'],
      ['Supplier claim', 'If eligible, the store asks Printful for reprint or refund handling.'],
      ['Resolution', 'Customer receives replacement, refund, or a clear reason when the claim is not covered.'],
    ],
  },
  contact: {
    channels: [
      ['Order support', 'support@1989supply.co', 'Use for order status, address updates, tracking, refund claims, and damaged item reports.'],
      ['Response time', '1-2 business days', 'Supplier claims and carrier reviews can take longer than first response.'],
      ['Urgent address change', 'Before fulfillment starts', 'Send the order number and corrected address immediately.'],
    ],
    checklist: ['Order number', 'Checkout email', 'Full name', 'Shipping address', 'Photos for damaged/misprinted items', 'Short explanation of the issue'],
    formLabels: ['Name', 'Email', 'Order number', 'Issue type', 'Message'],
  },
  'terms-privacy': {
    dataRows: [
      ['Contact data', 'Name, email, shipping address', 'Checkout, shipping, tracking, support'],
      ['Order data', 'Purchased items, size/color choices, order value', 'Production, fulfillment, customer service'],
      ['Payment data', 'Payment status and transaction reference', 'Payment confirmation and fraud prevention'],
      ['Support data', 'Messages, photos, claim notes', 'Refund review, supplier claim, customer service'],
    ],
    providers: [
      ['Printful', 'Receives order item, artwork/SKU, recipient name, address, and shipping details for production and delivery.'],
      ['Payment processor', 'Processes payment confirmation, transaction references, and fraud checks.'],
      ['Shipping carriers', 'Receive recipient address and package details to deliver orders and provide tracking.'],
    ],
    rights: ['Request order support records', 'Ask for correction of contact details', 'Request deletion where legally and operationally possible', 'Ask how order data was used for fulfillment'],
  },
}

const accountSupportActions = [
  {
    id: 'help',
    title: 'Browse Help',
    copy: 'Read common shipping, refund, and account answers.',
    issueType: 'General question',
    icon: FileText,
  },
  {
    id: 'contact',
    title: 'Contact Support',
    copy: 'Send a message to the support desk.',
    issueType: 'General question',
    icon: Mail,
  },
  {
    id: 'order',
    title: 'Order Issues',
    copy: 'Report tracking, damage, address, or refund issues.',
    issueType: 'Order issue',
    icon: PackageCheck,
  },
]

const accountSupportFaqs = [
  ['Where is my tracking?', 'Tracking is sent after fulfillment starts and the carrier receives the label.'],
  ['Can I change my address?', 'Send a support request before production begins. After fulfillment starts, changes may not be possible.'],
  ['What issues are covered?', 'Damaged, misprinted, defective, wrong item, or confirmed lost orders can be reviewed.'],
  ['What should I include?', 'Use your checkout email, order number, short issue details, and photos for damaged or misprinted items.'],
]

const productOptionGroups = {
  Apparel: [
    {
      name: 'Size',
      options: [
        { label: 'S', priceDelta: 0 },
        { label: 'M', priceDelta: 0 },
        { label: 'L', priceDelta: 0 },
        { label: 'XL', priceDelta: 2 },
      ],
    },
    {
      name: 'Color',
      options: [
        { label: 'Washed Black', priceDelta: 0 },
        { label: 'Varsity Red', priceDelta: 0 },
        { label: 'Cream', priceDelta: 0 },
      ],
    },
    {
      name: 'Fit',
      options: [
        { label: 'Classic', priceDelta: 0 },
        { label: 'Oversized', priceDelta: 3 },
      ],
    },
  ],
  Bags: [
    {
      name: 'Color',
      options: [
        { label: 'Natural Canvas', priceDelta: 0 },
        { label: 'Black Canvas', priceDelta: 2 },
      ],
    },
    {
      name: 'Print Side',
      options: [
        { label: 'Front', priceDelta: 0 },
        { label: 'Front + Back', priceDelta: 6 },
      ],
    },
  ],
  Drinkware: [
    {
      name: 'Size',
      options: [
        { label: '11 oz', priceDelta: 0 },
      ],
    },
    {
      name: 'Finish',
      options: [
        { label: 'Glossy White', priceDelta: 0 },
      ],
    },
  ],
  'Home Goods': [
    {
      name: 'Set',
      options: [
        { label: 'Set of 4', priceDelta: 0 },
        { label: 'Set of 8', priceDelta: 16 },
      ],
    },
    {
      name: 'Finish',
      options: [
        { label: 'Matte', priceDelta: 0 },
        { label: 'Glossy', priceDelta: 2 },
      ],
    },
  ],
  'Wall Art': [
    {
      name: 'Size',
      options: [
        { label: '18x24', priceDelta: 0 },
        { label: '24x36', priceDelta: 18 },
      ],
    },
    {
      name: 'Frame',
      options: [
        { label: 'No Frame', priceDelta: 0 },
        { label: 'Black Frame', priceDelta: 22 },
        { label: 'Walnut Frame', priceDelta: 28 },
      ],
    },
  ],
  Stationery: [
    {
      name: 'Pack',
      options: [
        { label: 'Standard', priceDelta: 0 },
        { label: 'Gift Pack', priceDelta: 6 },
      ],
    },
    {
      name: 'Paper',
      options: [
        { label: 'Standard', priceDelta: 0 },
        { label: 'Premium', priceDelta: 4 },
      ],
    },
  ],
}

const getOptionGroups = (product) => productOptionGroups[product?.category] ?? []

const getDefaultOptions = (product) =>
  Object.fromEntries(getOptionGroups(product).map((group) => [group.name, group.options[0].label]))

const getSelectedOptions = (groups, selectedOptions) =>
  groups.map((group) => group.options.find((option) => option.label === selectedOptions[group.name]) ?? group.options[0])

const formatPrice = (value) => `$${value.toFixed(2)}`
const collapsedCartItemCount = 2

const escapePdfText = (value) =>
  String(value ?? '')
    .replace(/[\\()]/g, (match) => `\\${match}`)
    .replace(/[^\x20-\x7E]/g, '-')

const wrapPdfLine = (line, maxLength = 86) => {
  const words = String(line ?? '').split(/\s+/).filter(Boolean)
  if (!words.length) return ['']
  const lines = []
  let currentLine = ''

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word
    if (nextLine.length > maxLength && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = nextLine
    }
  })

  if (currentLine) lines.push(currentLine)
  return lines
}

const createReceiptPdfBlob = (order, customer) => {
  const orderItems = order?.items ?? []
  const customerName = customer?.name ?? 'Retro Shopper'
  const customerEmail = customer?.email ?? 'demo@1989supply.co'
  const shippingAddress = order?.shippingAddress || '123 Nostalgia Lane, Suite 7B, Retro City, CA 90210'
  const subtotal = order?.subtotal ?? order?.total ?? 0
  const discount = order?.discount ?? 0
  const shipping = order?.shipping ?? 0
  const total = order?.total ?? subtotal - discount + shipping
  const receiptLines = [
    'DREAMING IN 1989 - CUSTOMER RECEIPT',
    '1989 Supply Co. / Made-to-order retro goods',
    '',
    `Order: #${order?.id ?? 'DRAFT'}`,
    `Date: ${order?.date ?? 'Today'}`,
    `Status: ${order?.status ?? 'Order received'}`,
    `Customer: ${customerName}`,
    `Email: ${customerEmail}`,
    `Payment: ${order?.payment ?? 'PayPal'}`,
    `Fulfillment: ${order?.fulfillment ?? 'Printful draft pending'}`,
    `Tracking: ${order?.tracking ?? 'Tracking appears after fulfillment'}`,
    `Shipping address: ${shippingAddress}`,
    '',
    'ITEMS',
    '-----',
    ...orderItems.flatMap((item) => {
      const itemName = typeof item === 'string' ? item : item.name
      const itemQuantity = typeof item === 'string' ? 1 : item.quantity
      const itemPrice = typeof item === 'string' ? 0 : item.price
      const optionSummary = typeof item === 'string' ? '' : item.optionSummary
      const lineTotal = itemQuantity * itemPrice
      return [
        `${itemQuantity} x ${itemName} - ${formatPrice(itemPrice)} each - ${formatPrice(lineTotal)}`,
        optionSummary ? `   Options: ${optionSummary}` : '',
      ].filter(Boolean)
    }),
    '',
    'TOTALS',
    '------',
    `Subtotal: ${formatPrice(subtotal)}`,
    `Discount: ${discount ? `-${formatPrice(discount)}` : '$0.00'}`,
    `Shipping: ${formatPrice(shipping)}`,
    'Tax: $0.00',
    `Total: ${formatPrice(total)}`,
    '',
    'ORDER PROGRESS',
    '--------------',
    ...((order?.timeline ?? []).map((step) => `${step.done ? '[x]' : '[ ]'} ${step.label}: ${step.detail}`)),
    '',
    'Support: support@1989supply.co',
    'No real payment or Printful order is created in demo mode.',
  ].flatMap((line) => wrapPdfLine(line))

  const pageWidth = 612
  const pageHeight = 792
  const left = 54
  const top = 742
  const lineHeight = 15
  const linesPerPage = 47
  const pages = []

  for (let index = 0; index < receiptLines.length; index += linesPerPage) {
    pages.push(receiptLines.slice(index, index + linesPerPage))
  }

  const objects = [
    { id: 1, body: '<< /Type /Catalog /Pages 2 0 R >>' },
    { id: 2, body: '' },
    { id: 3, body: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>' },
  ]

  pages.forEach((pageLines, pageIndex) => {
    const pageObjectId = 4 + pageIndex * 2
    const contentObjectId = pageObjectId + 1
    const content = [
      'BT',
      '/F1 10 Tf',
      `${left} ${top} Td`,
      ...pageLines.flatMap((line, lineIndex) => [
        lineIndex ? `0 -${lineHeight} Td` : '',
        `(${escapePdfText(line)}) Tj`,
      ]).filter(Boolean),
      'ET',
    ].join('\n')

    objects.push({
      id: pageObjectId,
      body: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectId} 0 R >>`,
    })
    objects.push({
      id: contentObjectId,
      body: `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    })
  })

  objects[1].body = `<< /Type /Pages /Kids [${pages.map((_, pageIndex) => `${4 + pageIndex * 2} 0 R`).join(' ')}] /Count ${pages.length} >>`
  objects.sort((firstObject, secondObject) => firstObject.id - secondObject.id)

  let pdf = '%PDF-1.4\n'
  const offsets = [0]

  objects.forEach((object) => {
    offsets[object.id] = pdf.length
    pdf += `${object.id} 0 obj\n${object.body}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let id = 1; id <= objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
}

const demoCustomerOrders = [
  {
    id: 'DI1989-10425',
    date: 'May 18, 2025',
    status: 'Delivered',
    total: 64.89,
    items: [
      { name: 'Mall Soft Cotton Tee', quantity: 1, price: 29.99, optionSummary: 'Black / Large', image: productImages.rewindTee },
      { name: 'Blockbuster Sticker Pack', quantity: 1, price: 8.99, optionSummary: 'Multi', image: productImages.stickerPack },
      { name: 'Vintage 1989 Dad Hat', quantity: 1, price: 19.99, optionSummary: 'Navy', image: productImages.deskCalendar },
    ],
    subtotal: 58.97,
    discount: 0,
    shipping: 5.92,
    fulfillment: 'Delivered through Printful',
    tracking: 'USPS DI1989 10425 DEMO',
    timeline: [
      { label: 'Order received', detail: 'May 18, 2025', done: true },
      { label: 'Printful review', detail: 'May 19, 2025', done: true },
      { label: 'In production', detail: 'May 20, 2025', done: true },
      { label: 'Shipped', detail: 'May 21, 2025', done: true },
      { label: 'Delivered', detail: 'May 23, 2025', done: true },
    ],
  },
  {
    id: 'DI1989-10387',
    date: 'May 02, 2025',
    status: 'Shipped',
    total: 37.45,
    items: [
      { name: 'Diner Counter Mug', quantity: 1, price: 18, optionSummary: 'Size: 11 oz / Finish: Glossy White' },
      { name: 'Mall Weekend Tote', quantity: 1, price: 24, optionSummary: 'Color: Natural Canvas / Print Side: Front' },
    ],
    subtotal: 42,
    discount: 0,
    shipping: 0,
    fulfillment: 'Delivered through Printful',
    tracking: 'USPS 1989 0517 DEMO',
    timeline: [
      { label: 'Order received', detail: 'Checkout completed.', done: true },
      { label: 'In production', detail: 'Printful produced the made-to-order items.', done: true },
      { label: 'Shipped', detail: 'Carrier received the package.', done: true },
      { label: 'Delivered', detail: 'Package marked delivered.', done: true },
    ],
  },
  {
    id: 'DI1989-10291',
    date: 'Apr 22, 2025',
    status: 'Delivered',
    total: 89.9,
    items: [
      { name: 'Arcade Night Poster', quantity: 1, price: 32, optionSummary: '18x24 / Matte' },
      { name: 'Mall Weekend Hoodie', quantity: 1, price: 54, optionSummary: 'Ash Gray / Large' },
    ],
    subtotal: 86,
    discount: 4.05,
    shipping: 7.95,
    fulfillment: 'Delivered through Printful',
    tracking: 'USPS DI1989 10291 DEMO',
    timeline: [
      { label: 'Order received', detail: 'Apr 22, 2025', done: true },
      { label: 'Printful review', detail: 'Apr 23, 2025', done: true },
      { label: 'In production', detail: 'Apr 24, 2025', done: true },
      { label: 'Shipped', detail: 'Apr 26, 2025', done: true },
      { label: 'Delivered', detail: 'Apr 29, 2025', done: true },
    ],
  },
  {
    id: 'DI1989-10176',
    date: 'Apr 10, 2025',
    status: 'Delivered',
    total: 45,
    items: [
      { name: 'Video Rental Notebook', quantity: 1, price: 22, optionSummary: 'Lined' },
      { name: 'Rewind Sticker Pack', quantity: 1, price: 16, optionSummary: 'Multi' },
    ],
    subtotal: 38,
    discount: 0,
    shipping: 7,
    fulfillment: 'Delivered through Printful',
    tracking: 'USPS DI1989 10176 DEMO',
    timeline: [
      { label: 'Order received', detail: 'Apr 10, 2025', done: true },
      { label: 'Printful review', detail: 'Apr 11, 2025', done: true },
      { label: 'In production', detail: 'Apr 12, 2025', done: true },
      { label: 'Shipped', detail: 'Apr 14, 2025', done: true },
      { label: 'Delivered', detail: 'Apr 17, 2025', done: true },
    ],
  },
  {
    id: 'DI1989-10033',
    date: 'Mar 28, 2025',
    status: 'Cancelled',
    total: 19.99,
    items: [
      { name: 'Retro Desk Calendar', quantity: 1, price: 19.99, optionSummary: 'Desk size' },
    ],
    subtotal: 19.99,
    discount: 0,
    shipping: 0,
    fulfillment: 'Cancelled before production',
    tracking: 'No tracking',
    timeline: [
      { label: 'Order received', detail: 'Mar 28, 2025', done: true },
      { label: 'Cancelled', detail: 'Mar 28, 2025', done: true },
    ],
  },
]

const accountCoupons = [
  { code: 'REWIND10', offer: '10% off', detail: 'Your order', expires: 'Jun 30, 2026', tone: 'red' },
  { code: 'FREESHIP75', offer: 'Free shipping', detail: 'Over $75', expires: 'Jul 31, 2026', tone: 'blue' },
  { code: 'MALLDROP15', offer: '15% off', detail: 'New drops', expires: 'Aug 15, 2026', tone: 'red' },
]

const defaultAccountAddresses = [
  {
    id: 'primary-address',
    label: 'Primary',
    name: 'Alex Taylor',
    lines: ['123 Arcade Way', 'Floor 2', 'Santa Monica, CA 90401', 'United States', '(310) 555-1989'],
  },
  {
    id: 'gift-address',
    label: 'Gift',
    name: 'Alex Taylor',
    lines: ['742 Evergreen Terrace', 'Apt. 5', 'Springfield, IL 62701', 'United States', '(217) 555-1989'],
  },
]

const emptyAddressDraft = {
  id: '',
  label: 'Saved',
  name: '',
  line1: '',
  line2: '',
  cityState: '',
  country: 'United States',
  phone: '',
}

const shippingCountries = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'BE', flag: '🇧🇪', name: 'Belgium' },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: 'IE', flag: '🇮🇪', name: 'Ireland' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: 'HK', flag: '🇭🇰', name: 'Hong Kong' },
  { code: 'TW', flag: '🇹🇼', name: 'Taiwan' },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil' },
]

const getShippingCountry = (countryName) =>
  shippingCountries.find((country) => country.name === countryName) ?? shippingCountries[0]

const getFlagImageUrl = (countryCode, width = 40) => `https://flagcdn.com/w${width}/${countryCode.toLowerCase()}.png`

const normalizeAccountAddresses = (addresses) => {
  const sourceAddresses = Array.isArray(addresses) ? addresses : defaultAccountAddresses

  return sourceAddresses.map((address, index) => ({
    id: address.id ?? `address-${index + 1}`,
    label: address.label || 'Saved',
    name: address.name || 'Retro Shopper',
    lines: Array.isArray(address.lines) ? address.lines.map((line) => String(line ?? '').trim()) : [],
  }))
}

const getAddressDraft = (address = emptyAddressDraft) => ({
  id: address.id ?? '',
  label: address.label ?? 'Saved',
  name: address.name ?? '',
  line1: address.lines?.[0] ?? '',
  line2: address.lines?.[1] ?? '',
  cityState: address.lines?.[2] ?? '',
  country: getShippingCountry(address.lines?.[3]).name,
  phone: address.lines?.[4] ?? '',
})

const getNextAddressId = (addresses) => {
  let nextNumber = addresses.length + 1
  while (addresses.some((address) => address.id === `address-${nextNumber}`)) {
    nextNumber += 1
  }
  return `address-${nextNumber}`
}

const getOrderProgressTimeline = (order) => {
  const timeline = order?.timeline ?? []
  if (!timeline.length) return []

  const normalizedStatus = String(order?.status ?? '').toLowerCase()
  const statusLabelMap = [
    ['cancelled', 'cancelled'],
    ['delivered', 'delivered'],
    ['shipped', 'shipped'],
    ['production', 'in production'],
    ['review', 'printful review'],
    ['received', 'order received'],
  ]
  const currentLabel = statusLabelMap.find(([statusKey]) => normalizedStatus.includes(statusKey))?.[1]
  const currentIndex = currentLabel
    ? timeline.findIndex((step) => step.label.toLowerCase() === currentLabel)
    : -1
  const lastDoneIndex = timeline.findLastIndex((step) => step.done)
  const progressIndex = currentIndex >= 0 ? currentIndex : Math.max(lastDoneIndex, 0)

  return timeline.slice(0, progressIndex + 1).map((step) => ({ ...step, done: true }))
}

const recentlyViewedIds = [
  'rewind-club-tee',
  'mall-weekend-hoodie',
  'arcade-night-poster',
  'mall-weekend-tote',
  'retro-desk-calendar',
  'diner-counter-mug',
  'video-rental-notebook',
  'memory-lane-canvas',
]

const wishlistIds = [
  'diner-counter-mug',
  'mall-weekend-tote',
  'arcade-night-poster',
  'memory-lane-canvas',
]

const getAccountLineItemImage = (item) => {
  if (typeof item === 'string') return productImages.stickerPack
  if (item.image) return item.image
  const itemName = item.name.toLowerCase()
  if (itemName.includes('tee')) return productImages.rewindTee
  if (itemName.includes('hoodie')) return productImages.rewindHoodie
  if (itemName.includes('sticker')) return productImages.stickerPack
  if (itemName.includes('mug')) return productImages.dinerMug
  if (itemName.includes('tote')) return productImages.mallTote
  if (itemName.includes('poster')) return productImages.arcadePoster
  if (itemName.includes('notebook')) return productImages.notebook
  if (itemName.includes('calendar')) return productImages.deskCalendar
  return productImages.wallCanvas
}

const getStoredCustomer = () => {
  try {
    const savedCustomer = window.localStorage.getItem('dreaming-1989-customer')
    if (!savedCustomer) return null
    const parsedCustomer = JSON.parse(savedCustomer)
    const hasCurrentDemoOrders = parsedCustomer?.orders?.some((order) => String(order.id).startsWith('DI1989-'))
    return {
      ...parsedCustomer,
      orders: hasCurrentDemoOrders ? parsedCustomer.orders : demoCustomerOrders,
      addresses: normalizeAccountAddresses(parsedCustomer.addresses),
    }
  } catch {
    return null
  }
}

const saveStoredCustomer = (customer) => {
  try {
    if (customer) {
      window.localStorage.setItem('dreaming-1989-customer', JSON.stringify(customer))
    } else {
      window.localStorage.removeItem('dreaming-1989-customer')
    }
  } catch {
    // Account persistence should not block the shopping flow.
  }
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/')
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [authMode, setAuthMode] = useState('sign-in')
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [paypalDemoState, setPaypalDemoState] = useState('idle')
  const [promoCode, setPromoCode] = useState('')
  const [promoState, setPromoState] = useState('idle')
  const [cartNotice, setCartNotice] = useState(null)
  const [flyingCartItem, setFlyingCartItem] = useState(null)
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [activePolicyId, setActivePolicyId] = useState('shipping')
  const [activeRoute, setActiveRoute] = useState('home')
  const [collectionCategory, setCollectionCategory] = useState('All')
  const [collectionSort, setCollectionSort] = useState('Featured')
  const [collectionAvailability, setCollectionAvailability] = useState('All')
  const [collectionMaxPrice, setCollectionMaxPrice] = useState('All')
  const [trackedOrderId, setTrackedOrderId] = useState('')
  const [trackingNotice, setTrackingNotice] = useState('')
  const [supportMenuOpen, setSupportMenuOpen] = useState(false)
  const [supportMenuPosition, setSupportMenuPosition] = useState({ top: 0, left: 0 })
  const [cartExpanded, setCartExpanded] = useState(false)
  const [accountTab, setAccountTab] = useState(() => getAccountTabFromPath(window.location.pathname) ?? 'orders')
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [profileNotice, setProfileNotice] = useState('')
  const [profileEditorOpen, setProfileEditorOpen] = useState(false)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const [securityNotice, setSecurityNotice] = useState('')
  const [addressNotice, setAddressNotice] = useState('')
  const [addressManageMode, setAddressManageMode] = useState(false)
  const [addressEditorMode, setAddressEditorMode] = useState('idle')
  const [addressDraft, setAddressDraft] = useState(emptyAddressDraft)
  const [addressCountry, setAddressCountry] = useState(emptyAddressDraft.country)
  const [addressCountryMenuOpen, setAddressCountryMenuOpen] = useState(false)
  const [ordersExpanded, setOrdersExpanded] = useState(false)
  const [orderFilter, setOrderFilter] = useState('All')
  const [orderDateRange, setOrderDateRange] = useState(defaultOrderDateRange)
  const [copiedCoupon, setCopiedCoupon] = useState('')
  const [couponsExpanded, setCouponsExpanded] = useState(false)
  const [orderDetailOpen, setOrderDetailOpen] = useState(false)
  const [orderDetailNotice, setOrderDetailNotice] = useState('')
  const [activeSupportAction, setActiveSupportAction] = useState('help')
  const [supportTicketNotice, setSupportTicketNotice] = useState('')
  const [supportTickets, setSupportTickets] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1)
  const [activeProductInfoTab, setActiveProductInfoTab] = useState('Details')
  const [activeThumbLabel, setActiveThumbLabel] = useState('Front View')
  const [selectedImageInfo, setSelectedImageInfo] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [customer, setCustomer] = useState(() => getStoredCustomer())
  const [cart, setCart] = useState([
    { id: 'rewind-sticker-pack', name: 'Rewind Sticker Pack', price: 16, image: productImages.stickerPack, quantity: 1 },
  ])
  const cartButtonRef = useRef(null)
  const floatingCartButtonRef = useRef(null)
  const recentCarouselRef = useRef(null)
  const supportButtonRef = useRef(null)
  const flyTimerRef = useRef(null)
  const noticeTimerRef = useRef(null)
  const cartFeedbackCounterRef = useRef(0)
  const pageScrollLockRef = useRef(null)

  useEffect(() => {
    const syncCurrentPath = () => setCurrentPath(window.location.pathname || '/')

    window.addEventListener('popstate', syncCurrentPath)
    return () => window.removeEventListener('popstate', syncCurrentPath)
  }, [])

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setHeroSlideIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
    }, 5200)

    return () => window.clearInterval(slideTimer)
  }, [])

  useEffect(() => {
    const syncRoute = () => {
      const route = window.location.hash.replace(/^#\/?/, '')
      const policy = policyCards.find((item) => item.path === route)
      if (policy) {
        setActivePolicyId(policy.id)
        setActiveRoute(policy.id)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (route.startsWith('collections')) {
        const [, categorySlug] = route.split('/')
        const nextCategory = categorySlug ? getCategoryFromSlug(categorySlug) : 'All'
        setCollectionCategory(nextCategory)
        setActiveCategory(nextCategory)
        setActiveRoute('collection')
        setSelectedProduct(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (route.startsWith('products/')) {
        const [, productId] = route.split('/')
        const nextProduct = products.find((product) => product.id === productId) ?? null
        setSelectedProduct(nextProduct)
        setSelectedOptions(getDefaultOptions(nextProduct))
        setSelectedProductQuantity(1)
        setActiveProductInfoTab('Details')
        setActiveThumbLabel('Front View')
        setActiveRoute('product')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (route === 'track-order') {
        setActiveRoute('tracking')
        setSelectedProduct(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      setActiveRoute('home')
      setSelectedProduct(null)
    }

    syncRoute()
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    return () => {
      if (flyTimerRef.current) window.clearTimeout(flyTimerRef.current)
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current)
    }
  }, [])

  const updateSupportMenuPosition = useCallback(() => {
    const triggerRect = supportButtonRef.current?.getBoundingClientRect()
    if (!triggerRect) return

    const menuWidth = Math.min(280, window.innerWidth - 28)
    const left = Math.min(Math.max(14, triggerRect.right - menuWidth), window.innerWidth - menuWidth - 14)

    setSupportMenuPosition({
      top: triggerRect.bottom + 8,
      left,
    })
  }, [])

  useEffect(() => {
    if (!supportMenuOpen) return undefined

    updateSupportMenuPosition()
    window.addEventListener('resize', updateSupportMenuPosition)
    window.addEventListener('scroll', updateSupportMenuPosition, true)

    return () => {
      window.removeEventListener('resize', updateSupportMenuPosition)
      window.removeEventListener('scroll', updateSupportMenuPosition, true)
    }
  }, [supportMenuOpen, updateSupportMenuPosition])

  useEffect(() => {
    const overlayOpen =
      cartOpen ||
      checkoutOpen ||
      authOpen ||
      accountOpen ||
      profileEditorOpen ||
      logoutConfirmOpen ||
      addressEditorMode !== 'idle' ||
      orderDetailOpen ||
      Boolean(selectedImageInfo)

    if (overlayOpen && !pageScrollLockRef.current) {
      pageScrollLockRef.current = {
        bodyOverflow: document.body.style.overflow,
        htmlOverflow: document.documentElement.style.overflow,
      }
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }

    if (!overlayOpen && pageScrollLockRef.current) {
      document.body.style.overflow = pageScrollLockRef.current.bodyOverflow
      document.documentElement.style.overflow = pageScrollLockRef.current.htmlOverflow
      pageScrollLockRef.current = null
    }

    return () => {
      if (pageScrollLockRef.current) {
        document.body.style.overflow = pageScrollLockRef.current.bodyOverflow
        document.documentElement.style.overflow = pageScrollLockRef.current.htmlOverflow
        pageScrollLockRef.current = null
      }
    }
  }, [
    accountOpen,
    addressEditorMode,
    authOpen,
    cartOpen,
    checkoutOpen,
    logoutConfirmOpen,
    orderDetailOpen,
    profileEditorOpen,
    selectedImageInfo,
  ])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesSearch =
        !normalizedQuery ||
        [product.name, product.shortDetail, product.category, product.tag, product.sku]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, query])

  const collectionProducts = useMemo(() => {
    const maxPrice = collectionMaxPrice === 'All' ? Number.POSITIVE_INFINITY : Number(collectionMaxPrice)
    const availabilityMap = {
      'In Stock': 'in-stock',
      'Low Stock': 'low-stock',
    }

    const visibleItems = products.filter((product) => {
      const matchesCategory = collectionCategory === 'All' || product.category === collectionCategory
      const matchesAvailability =
        collectionAvailability === 'All' || product.stockState === availabilityMap[collectionAvailability]
      const matchesPrice = product.price <= maxPrice
      return matchesCategory && matchesAvailability && matchesPrice
    })

    return [...visibleItems].sort((firstProduct, secondProduct) => {
      if (collectionSort === 'Price: Low to High') return firstProduct.price - secondProduct.price
      if (collectionSort === 'Price: High to Low') return secondProduct.price - firstProduct.price
      if (collectionSort === 'Newest') return products.indexOf(firstProduct) - products.indexOf(secondProduct)
      return 0
    })
  }, [collectionAvailability, collectionCategory, collectionMaxPrice, collectionSort])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoState === 'success' ? Math.round(subtotal * 0.1 * 100) / 100 : 0
  const shipping = subtotal - discount >= 75 || subtotal === 0 ? 0 : 7.95
  const total = Math.max(subtotal - discount + shipping, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartListExpanded = cartExpanded && cart.length > collapsedCartItemCount
  const visibleCartItems = cartListExpanded ? cart : cart.slice(0, collapsedCartItemCount)
  const hiddenCartItemCount = Math.max(cart.length - visibleCartItems.length, 0)
  const newArrivals = products.filter((product) => newArrivalIds.includes(product.id))
  const featuredDrop = featuredDropProduct
  const shelfSets = shelfReadySets
  const activePolicy = policyCards.find((policy) => policy.id === activePolicyId) ?? policyCards[0]
  const activePolicyRoute = policyCards.some((policy) => policy.id === activeRoute) ? activePolicy : null
  const activePolicyDetails = policyPageDetails[activePolicyRoute?.id]
  const activeHeroSlide = heroSlides[heroSlideIndex]
  const visibleProducts = filteredProducts
  const selectedOptionGroups = useMemo(() => getOptionGroups(selectedProduct), [selectedProduct])
  const selectedVariantOptions = useMemo(
    () => getSelectedOptions(selectedOptionGroups, selectedOptions),
    [selectedOptionGroups, selectedOptions],
  )
  const selectedVariantSummary = selectedOptionGroups
    .map((group, index) => `${group.name}: ${selectedVariantOptions[index]?.label}`)
    .join(' / ')
  const selectedVariantPrice =
    (selectedProduct?.price ?? 0) + selectedVariantOptions.reduce((sum, option) => sum + option.priceDelta, 0)
  const activePreviewImage = useMemo(() => {
    if (!selectedProduct) return null
    if (activeThumbLabel === 'Print Detail') return selectedProduct.printDetailImage || selectedProduct.image
    if (activeThumbLabel === 'Life Style') return selectedProduct.lifestyleImage || selectedProduct.image
    if (activeThumbLabel === 'Road Trip Vibes') return heroMemoryLaneImage
    return selectedProduct.image
  }, [selectedProduct, activeThumbLabel])
  const relatedProducts = selectedProduct
    ? products
      .filter((product) => product.category === selectedProduct.category && product.id !== selectedProduct.id)
      .slice(0, 3)
    : []
  const featuredDropImage = featuredDrop.image
  const routeAccountTab = getAccountTabFromPath(currentPath)
  const displayedAccountTab = routeAccountTab ?? accountTab
  const customerOrders = customer?.orders?.length ? customer.orders : demoCustomerOrders
  const trackedOrder =
    customerOrders.find((order) => order.id === trackedOrderId || `#${order.id}` === trackedOrderId) ?? null
  const orderDateStartTime = getDateOnlyTime(orderDateRange.start)
  const orderDateEndTime = getDateOnlyTime(orderDateRange.end)
  const orderDateRangeStart = Math.min(orderDateStartTime ?? 0, orderDateEndTime ?? Number.MAX_SAFE_INTEGER)
  const orderDateRangeEnd = Math.max(orderDateStartTime ?? 0, orderDateEndTime ?? Number.MAX_SAFE_INTEGER)
  const filteredCustomerOrders = customerOrders.filter((order) => {
    const normalizedStatus = String(order.status).toLowerCase()
    const orderDateTime = getOrderDateOnlyTime(order.date)
    const matchesDate =
      orderDateTime === null || (orderDateTime >= orderDateRangeStart && orderDateTime <= orderDateRangeEnd)

    if (orderFilter === 'All') return matchesDate
    if (orderFilter === 'Pending') return matchesDate && normalizedStatus.includes('received')
    if (orderFilter === 'Processing') {
      return matchesDate && (normalizedStatus.includes('production') || normalizedStatus.includes('processing'))
    }
    if (orderFilter === 'Shipping') {
      return matchesDate && (normalizedStatus.includes('shipped') || normalizedStatus.includes('shipping'))
    }
    if (orderFilter === 'Delivered') return matchesDate && normalizedStatus.includes('delivered')
    if (orderFilter === 'Cancelled') return matchesDate && normalizedStatus.includes('cancelled')

    return matchesDate
  })
  const ordersForCurrentView = displayedAccountTab === 'orders' ? filteredCustomerOrders : customerOrders
  const hasOrderToggle = ordersForCurrentView.length > 3
  const visibleCustomerOrders = ordersExpanded ? ordersForCurrentView : ordersForCurrentView.slice(0, 3)
  const selectedAccountOrder =
    customerOrders.find((order) => order.id === selectedOrderId) ?? customerOrders[0] ?? demoCustomerOrders[0]
  const detailOrder = orderDetailOpen ? selectedAccountOrder : null
  const selectedSupportAction =
    accountSupportActions.find((action) => action.id === activeSupportAction) ?? accountSupportActions[0]
  const detailOrderProgressTimeline = getOrderProgressTimeline(detailOrder)
  const detailOrderProgressTone = detailOrder?.status?.toLowerCase().includes('cancelled') ? 'cancelled' : 'standard'
  const savedAddresses = normalizeAccountAddresses(customer?.addresses)
  const addressEditorOpen = addressEditorMode !== 'idle'
  const recentlyViewedProducts = products.filter((product) => recentlyViewedIds.includes(product.id))
  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id))
  const visibleAccountCoupons = couponsExpanded ? accountCoupons : accountCoupons.slice(0, 2)
  const hasAccountCouponToggle = accountCoupons.length > 2
  const accountRouteOpen = Boolean(routeAccountTab)
  const accountScreenOpen = accountRouteOpen && Boolean(customer)
  const accountAuthOpen = accountRouteOpen && !customer
  const accountSettingsTabs = ['settings', 'addresses', 'payments']
  const isAccountSettingsTab = accountSettingsTabs.includes(displayedAccountTab)
  const accountLayoutMode =
    isAccountSettingsTab
      ? 'settings'
      : ['orders', 'wishlist', 'support'].includes(displayedAccountTab)
        ? displayedAccountTab
        : 'overview'

  useEffect(() => {
    if (!accountScreenOpen) return

    document.querySelector('.account-screen-backdrop')?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [accountScreenOpen])

  const navigateToPath = useCallback((path) => {
    const nextPath = path || '/'
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState(null, '', nextPath)
    }
    setCurrentPath(window.location.pathname || '/')
  }, [])

  const navigateToAccount = useCallback((tab = 'dashboard') => {
    const nextTab = accountRouteTabs.has(tab) ? tab : 'dashboard'
    setAccountTab(nextTab)
    setSelectedOrderId((currentId) => currentId ?? customerOrders[0]?.id ?? demoCustomerOrders[0]?.id)
    navigateToPath(getAccountPath(nextTab))
  }, [customerOrders, navigateToPath])

  const openAccountSupport = useCallback((actionId = 'help') => {
    const nextAction = accountSupportActions.some((action) => action.id === actionId) ? actionId : 'help'
    setActiveSupportAction(nextAction)
    setSupportTicketNotice('')
    if (nextAction === 'order') {
      setSelectedOrderId((currentId) => currentId ?? customerOrders[0]?.id ?? demoCustomerOrders[0]?.id)
    }
    navigateToAccount('support')
  }, [customerOrders, navigateToAccount])

  const closeAuth = () => {
    setAuthOpen(false)
    if (accountAuthOpen) navigateToPath('/')
  }

  const openProductDetail = (product) => {
    setSelectedProduct(product)
    setSelectedOptions(getDefaultOptions(product))
    setSelectedProductQuantity(1)
    setActiveProductInfoTab('Details')
    window.history.pushState(null, '', getProductPath(product))
    window.dispatchEvent(new Event('hashchange'))
  }

  const openImageInfo = (item, context = 'Product image', imageUse = item.imageUse ?? 'product') => {
    setSelectedImageInfo({
      ...item,
      context,
      imageUse,
    })
  }

  const scrollRecentCarousel = (direction) => {
    const carousel = recentCarouselRef.current
    if (!carousel) return
    carousel.scrollBy({
      left: direction * Math.max(carousel.clientWidth * 0.82, 220),
      behavior: 'smooth',
    })
  }

  const openPolicy = (policyId) => {
    const policy = policyCards.find((item) => item.id === policyId)
    if (!policy) return
    window.history.pushState(null, '', `#/${policy.path}`)
    window.dispatchEvent(new Event('hashchange'))
  }

  const openCollection = (category = 'All') => {
    const nextCategory = categories.includes(category) ? category : 'All'
    const path = nextCategory === 'All' ? '#/collections' : `#/collections/${getCategorySlug(nextCategory)}`
    setCollectionCategory(nextCategory)
    setActiveCategory(nextCategory)
    window.history.pushState(null, '', path)
    window.dispatchEvent(new Event('hashchange'))
  }

  const openOrderTracking = () => {
    window.history.pushState(null, '', '#/track-order')
    window.dispatchEvent(new Event('hashchange'))
  }

  const submitSupportTicket = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = String(formData.get('message') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()

    if (!email || !message) {
      setSupportTicketNotice('Please add your email and a short message.')
      return
    }

    const ticketId = `SUP-${Date.now().toString().slice(-6)}`
    const nextTicket = {
      id: ticketId,
      action: selectedSupportAction.title,
      email,
      issueType: String(formData.get('issueType') ?? selectedSupportAction.issueType),
      orderId: String(formData.get('orderId') ?? ''),
      message,
      createdAt: new Date().toISOString(),
    }

    setSupportTickets((currentTickets) => [nextTicket, ...currentTickets].slice(0, 4))
    setSupportTicketNotice(`Ticket ${ticketId} received. We'll reply to ${email}.`)
    event.currentTarget.reset()
  }

  const submitOrderTracking = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const rawOrderId = String(formData.get('orderId') ?? '').trim().replace(/^#/, '')
    const email = String(formData.get('email') ?? '').trim().toLowerCase()
    const foundOrder = customerOrders.find((order) => order.id.toLowerCase() === rawOrderId.toLowerCase())

    if (!foundOrder) {
      setTrackedOrderId('')
      setTrackingNotice('Order not found. Try DI1989-10425 for the demo order.')
      return
    }

    if (customer?.email && email && email !== customer.email.toLowerCase()) {
      setTrackedOrderId('')
      setTrackingNotice('Email does not match this account order.')
      return
    }

    setTrackedOrderId(foundOrder.id)
    setTrackingNotice('')
  }

  const openHomeSection = (sectionId) => {
    setActiveRoute('home')
    window.history.pushState(null, '', `#${sectionId}`)
    window.dispatchEvent(new Event('hashchange'))
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const openSupportMenu = () => {
    updateSupportMenuPosition()
    setSupportMenuOpen(true)
  }

  const getVisibleCartTarget = () => {
    const floatingRect = floatingCartButtonRef.current?.getBoundingClientRect()
    if (floatingRect && floatingRect.bottom > 0 && floatingRect.top < window.innerHeight) {
      return floatingRect
    }

    const headerRect = cartButtonRef.current?.getBoundingClientRect()
    if (headerRect && headerRect.bottom > 0 && headerRect.top < window.innerHeight) {
      return headerRect
    }

    return floatingRect ?? headerRect ?? { left: window.innerWidth - 92, right: window.innerWidth - 24, top: window.innerHeight - 92, bottom: window.innerHeight - 24 }
  }

  const showCartFeedback = (item, sourceElement) => {
    const sourceRect = sourceElement?.getBoundingClientRect()
    const targetRect = getVisibleCartTarget()
    const startX = sourceRect ? sourceRect.left + sourceRect.width / 2 - 29 : targetRect.left
    const startY = sourceRect ? sourceRect.top + sourceRect.height / 2 - 29 : targetRect.top
    const endX = targetRect.left + targetRect.width / 2 - 29
    const endY = targetRect.top + targetRect.height / 2 - 29
    const noticeWidth = 292
    const noticeLeft = Math.min(Math.max(16, targetRect.right - noticeWidth), window.innerWidth - noticeWidth - 16)
    const noticeGoesAbove = targetRect.bottom + 12 > window.innerHeight - 128
    const noticeTop = noticeGoesAbove ? Math.max(16, targetRect.top - 138) : Math.max(16, targetRect.bottom + 12)

    if (flyTimerRef.current) window.clearTimeout(flyTimerRef.current)
    if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current)

    cartFeedbackCounterRef.current += 1
    const feedbackKey = cartFeedbackCounterRef.current

    setFlyingCartItem({
      key: `${item.id}-${feedbackKey}`,
      name: item.name,
      image: item.image,
      startX,
      startY,
      endX,
      endY,
    })
    setCartNotice({
      key: `${item.id}-notice-${feedbackKey}`,
      name: item.name,
      price: item.price,
      image: item.image,
      left: noticeLeft,
      top: noticeTop,
      placement: noticeGoesAbove ? 'above' : 'below',
    })
    flyTimerRef.current = window.setTimeout(() => setFlyingCartItem(null), 760)
    noticeTimerRef.current = window.setTimeout(() => setCartNotice(null), 2600)
  }

  const addToCart = (item, event) => {
    if (!item) return
    const product = {
      id: item.cartId ?? item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      optionSummary: item.optionSummary,
      quantity: item.quantity ?? 1,
    }
    setCart((currentCart) => {
      const existing = currentCart.find((cartItem) => cartItem.id === product.id)
      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + product.quantity } : cartItem,
        )
      }
      return [...currentCart, product]
    })
    showCartFeedback(product, event?.currentTarget)
  }

  const addSelectedProductToCart = (event) => {
    if (!selectedProduct) return

    addToCart({
      ...selectedProduct,
      cartId: `${selectedProduct.id}:${selectedVariantSummary}`,
      price: selectedVariantPrice,
      optionSummary: selectedVariantSummary,
      quantity: selectedProductQuantity,
    }, event)
  }

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => ({ ...item, quantity: item.id === id ? item.quantity + change : item.quantity }))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  const applyPromo = () => {
    setPromoState(promoCode.trim().toUpperCase() === 'REWIND10' ? 'success' : 'invalid')
  }

  const openAuth = (mode = 'sign-in') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }

  const openAccountDashboard = (tab = 'orders') => {
    navigateToAccount(tab)
  }

  const openOrderDetail = (order) => {
    setSelectedOrderId(order.id)
    setOrderDetailNotice('')
    setOrderDetailOpen(true)
  }

  const updateOrderDateRange = (field, value) => {
    setOrderDateRange((currentRange) => ({ ...currentRange, [field]: value }))
    setOrdersExpanded(false)
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const fallbackName = email.split('@')[0] || 'Retro Shopper'
    const name = String(formData.get('name') ?? '').trim() || fallbackName
    const nextCustomer = {
      name,
      email,
      joined: customer?.joined ?? 'June 2026',
      orders: customer?.orders?.length ? customer.orders : demoCustomerOrders,
      addresses: normalizeAccountAddresses(customer?.addresses),
    }

    setCustomer(nextCustomer)
    saveStoredCustomer(nextCustomer)
    setAccountTab('orders')
    setSelectedOrderId(nextCustomer.orders[0]?.id ?? null)
    setAuthOpen(false)
    navigateToAccount('orders')
  }

  const requestLogout = () => {
    setLogoutConfirmOpen(true)
  }

  const logoutCustomer = () => {
    setCustomer(null)
    saveStoredCustomer(null)
    setAccountOpen(false)
    setLogoutConfirmOpen(false)
    navigateToPath('/')
  }

  const openProfileEditor = () => {
    setProfileNotice('')
    setProfileEditorOpen(true)
  }

  const updateCustomerProfile = (updates) => {
    const nextCustomer = {
      ...customer,
      ...updates,
    }
    setCustomer(nextCustomer)
    saveStoredCustomer(nextCustomer)
    return nextCustomer
  }

  const saveCustomerAddresses = (nextAddresses, notice) => {
    updateCustomerProfile({ addresses: normalizeAccountAddresses(nextAddresses) })
    setAddressNotice(notice)
    setAddressManageMode(true)
  }

  const openAddAddress = () => {
    setAddressDraft(emptyAddressDraft)
    setAddressCountry(emptyAddressDraft.country)
    setAddressCountryMenuOpen(false)
    setAddressEditorMode('add')
    setAddressManageMode(true)
    setAddressNotice('')
  }

  const openEditAddress = (address) => {
    const nextDraft = getAddressDraft(address)
    setAddressDraft(nextDraft)
    setAddressCountry(nextDraft.country)
    setAddressCountryMenuOpen(false)
    setAddressEditorMode('edit')
    setAddressManageMode(true)
    setAddressNotice('')
  }

  const closeAddressEditor = () => {
    setAddressDraft(emptyAddressDraft)
    setAddressCountry(emptyAddressDraft.country)
    setAddressCountryMenuOpen(false)
    setAddressEditorMode('idle')
  }

  const submitAddressForm = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextAddress = {
      id: addressDraft.id || getNextAddressId(savedAddresses),
      label: String(formData.get('label') ?? 'Saved').trim() || 'Saved',
      name: String(formData.get('name') ?? '').trim(),
      lines: [
        formData.get('line1'),
        formData.get('line2'),
        formData.get('cityState'),
        formData.get('country'),
        formData.get('phone'),
      ].map((value) => String(value ?? '').trim()),
    }

    const nextAddresses =
      addressEditorMode === 'edit'
        ? savedAddresses.map((address) => (address.id === nextAddress.id ? nextAddress : address))
        : [...savedAddresses, nextAddress]

    saveCustomerAddresses(nextAddresses, addressEditorMode === 'edit' ? 'Address updated.' : 'Address added.')
    closeAddressEditor()
  }

  const deleteAddress = (addressId) => {
    const address = savedAddresses.find((item) => item.id === addressId)
    if (!address) return
    if (!window.confirm(`Delete ${address.label} address?`)) return
    const nextAddresses = savedAddresses.filter((item) => item.id !== addressId)
    saveCustomerAddresses(nextAddresses, 'Address deleted.')
    if (addressDraft.id === addressId) closeAddressEditor()
  }

  const setPrimaryAddress = (addressId) => {
    const nextAddresses = savedAddresses.map((address) => {
      if (address.id === addressId) return { ...address, label: 'Primary' }
      if (address.label.toLowerCase() === 'primary') return { ...address, label: 'Saved' }
      return address
    })
    saveCustomerAddresses(nextAddresses, 'Primary address updated.')
  }

  const submitProfileUpdate = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextName = String(formData.get('name') ?? '').trim()
    const nextEmail = String(formData.get('email') ?? '').trim()
    updateCustomerProfile({
      name: nextName || customer.name,
      email: nextEmail || customer.email,
    })
    setProfileEditorOpen(false)
    setProfileNotice('Profile updated.')
  }

  const uploadProfilePhoto = (event) => {
    const [file] = event.currentTarget.files ?? []
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      updateCustomerProfile({ avatar: String(reader.result) })
      setProfileNotice('Profile photo updated.')
    }
    reader.readAsDataURL(file)
  }

  const updatePasswordDraft = () => {
    setSecurityNotice('Password change saved for production handoff.')
  }

  const sendResetLinkDraft = () => {
    setSecurityNotice('Reset link is ready to send from the production email service.')
  }

  const reorderAccountOrder = (order) => {
    if (!order?.items?.length) return
    const reorderItems = order.items.map((item, index) => {
      const itemName = typeof item === 'string' ? item : item.name
      const itemPrice = typeof item === 'string' ? 0 : item.price
      return {
        id: `reorder-${order.id}-${index}-${Date.now()}`,
        name: itemName,
        price: itemPrice,
        image: getAccountLineItemImage(item),
        quantity: typeof item === 'string' ? 1 : item.quantity,
        optionSummary: typeof item === 'string' ? '' : item.optionSummary,
      }
    })
    setCart((currentCart) => [...currentCart, ...reorderItems])
    setCartOpen(true)
    setOrderDetailNotice('Items were added to your cart.')
  }

  const showOrderActionNotice = (message) => {
    setOrderDetailNotice(message)
  }

  const downloadOrderReceipt = (order) => {
    if (!order) return
    const receiptBlob = createReceiptPdfBlob(order, customer)
    const receiptUrl = URL.createObjectURL(receiptBlob)
    const receiptLink = document.createElement('a')
    receiptLink.href = receiptUrl
    receiptLink.download = `receipt-${order.id}.pdf`
    document.body.appendChild(receiptLink)
    receiptLink.click()
    receiptLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(receiptUrl), 1000)
    setOrderDetailNotice(`Downloaded receipt-${order.id}.pdf.`)
  }

  const copyCouponCode = async (code) => {
    setCopiedCoupon(code)
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Clipboard support can be blocked in some local browser contexts.
    }
  }

  const openCheckout = () => {
    if (!cart.length) return
    setCheckoutDone(false)
    setPaymentMethod('paypal')
    setPaypalDemoState('idle')
    setCheckoutOpen(true)
  }

  const submitCheckout = (event) => {
    event.preventDefault()
    if (paymentMethod === 'paypal' && paypalDemoState !== 'approved') {
      setPaypalDemoState('required')
      return
    }
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? customer?.email ?? 'demo@1989supply.co').trim()
    const name = String(formData.get('name') ?? customer?.name ?? 'Retro Shopper').trim()
    const shippingAddress = [
      formData.get('address'),
      formData.get('city'),
      formData.get('zip'),
    ]
      .map((value) => String(value ?? '').trim())
      .filter(Boolean)
      .join(', ')
    const nextOrderNumber = 530 + (customer?.orders?.length ?? 0)
    const completedOrder = {
      id: `1989-${String(nextOrderNumber).padStart(4, '0')}`,
      date: 'Today',
      status: 'Order received',
      subtotal,
      discount,
      shipping,
      total,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        optionSummary: item.optionSummary,
      })),
      payment: paymentMethod === 'paypal' ? 'PayPal demo approved' : 'Demo payment',
      fulfillment: 'Printful draft pending',
      tracking: 'Tracking appears after fulfillment',
      shippingAddress,
      timeline: [
        { label: 'Order received', detail: 'Demo checkout saved to the customer dashboard.', done: true },
        { label: 'Payment demo', detail: 'PayPal demo approval completed. No real payment was captured.', done: true },
        { label: 'Printful draft', detail: 'Next real step is creating a draft order after human approval.', done: false },
        { label: 'Production', detail: 'Production begins only after the Printful order is confirmed.', done: false },
        { label: 'Tracking', detail: 'Carrier tracking appears here after shipment.', done: false },
      ],
    }
    const nextCustomer = {
      name,
      email,
      joined: customer?.joined ?? 'June 2026',
      orders: [completedOrder, ...(customer?.orders?.length ? customer.orders : demoCustomerOrders)],
      addresses: normalizeAccountAddresses(customer?.addresses),
    }
    setCustomer(nextCustomer)
    saveStoredCustomer(nextCustomer)
    setSelectedOrderId(completedOrder.id)
    setAccountTab('orders')
    setCheckoutDone(true)
    setCart([])
    setPromoCode('')
    setPromoState('idle')
  }

  const isRevenueDashboard = window.location.pathname === '/dashboard' || window.location.hash === '#revenue-dashboard'

  if (isRevenueDashboard) {
    return <RevenueDashboard />
  }

  return (
    <div className={`shop-app memory-entered${accountRouteOpen ? ' account-route-active' : ''}`}>
      <header className="site-header">
        <div className="header-main">
          <a className="brand" href="#top" aria-label="Dreaming in 1989 home">
            <img src={dreaming1989LogoImage} alt="1989 Supply Co." />
          </a>
          <div className="header-center">
            <label className="header-search">
              <Search size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, tags, SKUs..."
                aria-label="Search products"
              />
            </label>
            <p className="header-tagline">
              Good Times. Great Memories.
              <span>Always in Stock.</span>
            </p>
            <span className="header-ticket">
              <Package size={15} />
              Visitors today: 1989
            </span>
          </div>
          <div className="header-vhs" aria-label="Featured tape">
            <img className="vhs-art" src={vhsCassetteHeaderImage} alt="" aria-hidden="true" />
            <div className="vhs-label">
              <span>E-180</span>
              <strong>Dreaming in 1989</strong>
              <em>1989</em>
            </div>
            <span>VHS</span>
          </div>
          <div className="header-checkout">
            {customer ? (
              <div className="account-menu">
                <button className="account-button" type="button" onClick={() => openAccountDashboard('orders')}>
                  <User size={17} />
                  <span>Hi, {customer.name.split(' ')[0]}</span>
                </button>
                <button className="logout-button" type="button" onClick={requestLogout}>
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            ) : (
              <button className="signin-button" type="button" onClick={() => openAuth('sign-in')}>
                <LogIn size={17} />
                Sign in
              </button>
            )}
            <button className="cart-button" type="button" ref={cartButtonRef} onClick={() => setCartOpen(true)}>
              <ShoppingCart size={20} />
              <span>Cart ({itemCount})</span>
              <strong>{formatPrice(total)}</strong>
              <small>Day 19</small>
            </button>
          </div>
        </div>
        <nav className="primary-nav" aria-label="Primary navigation">
          <a className="home-tab" href="#top" aria-label="Home">
            <Home size={18} />
          </a>
          <a href="#new-arrivals">New Drops</a>
          <a href="#collections">Bundles</a>
          <a href="#products">Best Sellers</a>
          <a href="#deals">Gift Counter</a>
          <div
            className={`support-menu ${supportMenuOpen ? 'is-open' : ''}`}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setSupportMenuOpen(false)
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setSupportMenuOpen(false)
              }
            }}
            onMouseLeave={() => setSupportMenuOpen(false)}
          >
            <button
              className="support-menu-trigger"
              type="button"
              ref={supportButtonRef}
              aria-expanded={supportMenuOpen}
              aria-haspopup="menu"
              onClick={() => {
                if (supportMenuOpen) {
                  setSupportMenuOpen(false)
                } else {
                  openSupportMenu()
                }
              }}
              onMouseEnter={openSupportMenu}
            >
              Support
              <ChevronDown size={14} />
            </button>
            <div
              className="support-submenu"
              role="menu"
              aria-label="Support menu"
              style={{
                '--support-menu-top': `${supportMenuPosition.top}px`,
                '--support-menu-left': `${supportMenuPosition.left}px`,
              }}
            >
              {supportMenuItems.map((policy) => (
                <button
                  key={policy.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setSupportMenuOpen(false)
                    openPolicy(policy.id)
                  }}
                >
                  <span>{policy.title}</span>
                </button>
              ))}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setSupportMenuOpen(false)
                  openOrderTracking()
                }}
              >
                <span>Track Order</span>
              </button>
              <a href="#footer" role="menuitem" onClick={() => setSupportMenuOpen(false)}>
                <span>Support Email</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main id="top">
        {activePolicyRoute ? (
          <section className="store-section policy-route-page">
            <div className="policy-route-nav" aria-label="Policy pages">
              {policyCards.map((policy) => (
                <button
                  className={activePolicyRoute.id === policy.id ? 'active' : ''}
                  key={policy.id}
                  type="button"
                  onClick={() => openPolicy(policy.id)}
                >
                  {policy.title}
                </button>
              ))}
            </div>
            <article className="policy-route-card">
              <div className="policy-route-head">
                <div>
                  <p className="receipt-label">{activePolicyRoute.label}</p>
                  <h1>{activePolicyRoute.title}</h1>
                </div>
                <span>Printful policy</span>
              </div>
              <p>{activePolicyRoute.copy}</p>
              <div className="policy-route-summary">
                {activePolicyRoute.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              <div className="policy-route-content">
                {activePolicyRoute.sections.map(([title, copy]) => (
                  <section key={title}>
                    <h2>{title}</h2>
                    <p>{copy}</p>
                  </section>
                ))}
              </div>
              {activePolicyRoute.id === 'shipping' && (
                <div className="policy-deep policy-deep--shipping">
                  <div className="shipping-timeline">
                    {activePolicyDetails.timeline.map(([title, copy], index) => (
                      <section key={title}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <h2>{title}</h2>
                        <p>{copy}</p>
                      </section>
                    ))}
                  </div>
                  <div className="shipping-rules">
                    <h2>Shipping rules customers should see</h2>
                    <div className="policy-table">
                      {activePolicyDetails.table.map(([name, rule, action]) => (
                        <div key={name}>
                          <strong>{name}</strong>
                          <span>{rule}</span>
                          <em>{action}</em>
                        </div>
                      ))}
                    </div>
                    <p>{activePolicyDetails.notice}</p>
                  </div>
                </div>
              )}

              {activePolicyRoute.id === 'refund' && (
                <div className="policy-deep policy-deep--refund">
                  <section className="claim-window">
                    <h2>Claim window</h2>
                    <p>{activePolicyDetails.claimWindow}</p>
                  </section>
                  <div className="claim-matrix">
                    <section>
                      <h2>Covered</h2>
                      {activePolicyDetails.covered.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </section>
                    <section>
                      <h2>Not automatic</h2>
                      {activePolicyDetails.notCovered.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </section>
                  </div>
                  <div className="claim-process">
                    {activePolicyDetails.process.map(([title, copy], index) => (
                      <section key={title}>
                        <b>{index + 1}</b>
                        <h2>{title}</h2>
                        <p>{copy}</p>
                      </section>
                    ))}
                  </div>
                </div>
              )}

              {activePolicyRoute.id === 'contact' && (
                <div className="policy-deep policy-deep--contact">
                  <div className="support-board">
                    {activePolicyDetails.channels.map(([title, value, copy]) => (
                      <section key={title}>
                        <small>{title}</small>
                        <strong>{value}</strong>
                        <p>{copy}</p>
                      </section>
                    ))}
                  </div>
                  <section className="support-checklist">
                    <h2>Required info before we can help</h2>
                    <div>
                      {activePolicyDetails.checklist.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </section>
                  <section className="support-form-preview" aria-label="Support form preview">
                    <h2>Support form fields</h2>
                    {activePolicyDetails.formLabels.map((label) => (
                      <label key={label}>
                        {label}
                        <input disabled placeholder={label === 'Message' ? 'Describe the issue...' : label} />
                      </label>
                    ))}
                  </section>
                </div>
              )}

              {activePolicyRoute.id === 'terms-privacy' && (
                <div className="policy-deep policy-deep--terms">
                  <section className="data-table">
                    <h2>Customer data we use</h2>
                    {activePolicyDetails.dataRows.map(([type, data, purpose]) => (
                      <div key={type}>
                        <strong>{type}</strong>
                        <span>{data}</span>
                        <em>{purpose}</em>
                      </div>
                    ))}
                  </section>
                  <section className="provider-list">
                    <h2>Providers involved</h2>
                    {activePolicyDetails.providers.map(([name, copy]) => (
                      <article key={name}>
                        <h3>{name}</h3>
                        <p>{copy}</p>
                      </article>
                    ))}
                  </section>
                  <section className="rights-list">
                    <h2>Customer rights requests</h2>
                    {activePolicyDetails.rights.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </section>
                </div>
              )}
              <div className="policy-route-actions">
                <button type="button" onClick={() => openHomeSection('products')}>
                  Back to Shop
                </button>
                <button type="button" onClick={() => openHomeSection('footer')}>
                  Contact Support
                </button>
              </div>
            </article>
          </section>
        ) : activeRoute === 'product' ? (
          selectedProduct ? (
            <section className="store-section product-route-page">
              <nav className="product-route-breadcrumb" aria-label="Product breadcrumb">
                <button type="button" onClick={() => openHomeSection('products')}>
                  Shop
                </button>
                <ChevronRight size={15} />
                <button type="button" onClick={() => openCollection(selectedProduct.category)}>
                  {selectedProduct.category}
                </button>
                <ChevronRight size={15} />
                <span>{selectedProduct.name}</span>
              </nav>

              <div className="product-route-shell product-catalog-shell">
                <aside className="product-catalog-thumbs" aria-label={`${selectedProduct.name} image views`}>
                  {[
                    { label: 'Front View', img: selectedProduct.image },
                    { label: 'Print Detail', img: selectedProduct.printDetailImage || selectedProduct.image, zoom: !selectedProduct.printDetailImage },
                    { label: 'Life Style', img: selectedProduct.lifestyleImage || selectedProduct.image, lifestyle: !selectedProduct.lifestyleImage },
                    { label: 'Road Trip Vibes', img: heroMemoryLaneImage, isNew: true }
                  ].map((item, index) => (
                    <button
                      className={`catalog-thumb catalog-thumb-${index + 1} ${item.isNew ? 'thumb-new' : ''} ${activeThumbLabel === item.label ? 'active' : ''}`}
                      type="button"
                      key={item.label}
                      onClick={() => setActiveThumbLabel(item.label)}
                    >
                      {item.isNew && <span className="thumb-badge">NEW</span>}
                      <div className="polaroid-photo-frame">
                        <img
                          src={item.img}
                          alt={`${selectedProduct.name} ${item.label.toLowerCase()}`}
                          className={`${item.zoom ? 'thumb-zoom' : ''} ${item.lifestyle ? 'thumb-lifestyle' : ''}`}
                        />
                      </div>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </aside>

                <div className="product-route-media product-catalog-media">
                  <div className="main-masking-tape"></div>
                  <div className="main-cardboard-backing">
                    {selectedProduct.tag && <span className="product-tag-badge">{selectedProduct.tag}</span>}
                    <div className="product-main-photo">
                      <img src={activePreviewImage} alt={selectedProduct.name} />
                    </div>
                    <div className="product-catalog-sku">
                      {selectedProduct.sku}
                    </div>
                  </div>
                </div>

                <article className="product-route-buy-panel product-catalog-order-form">
                  <div className="notebook-spiral-binding">
                    {[...Array(14)].map((_, i) => (
                      <span key={i} className="spiral-ring"></span>
                    ))}
                  </div>
                  <div className="notebook-metal-clip"></div>
                  <header className="product-order-head">
                    <div>
                      <p className="receipt-label">Order this item</p>
                      <h1>{selectedProduct.name}</h1>
                    </div>
                    <strong className="price-stamp">{formatPrice(selectedVariantPrice)}</strong>
                  </header>

                  <div className="product-order-status">
                    <span className="stock-state-label">
                      {selectedProduct.stockState === 'low-stock' ? 'Low stock' : 'In stock'}
                    </span>
                    <small className="sku-stamp-label">{selectedProduct.sku}</small>
                  </div>

                  <div className="product-order-quantity">
                    <span>Quantity</span>
                    <div className="quantity-stepper">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setSelectedProductQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))}
                      >
                        <Minus size={16} />
                      </button>
                      <strong>{selectedProductQuantity}</strong>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setSelectedProductQuantity((currentQuantity) => Math.min(9, currentQuantity + 1))}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="option-stack product-catalog-options">
                    {selectedOptionGroups.map((group) => (
                      <fieldset className="option-group" key={group.name}>
                        <legend>{group.name}</legend>
                        <div className="option-buttons-grid">
                          {group.options.map((option) => (
                            <button
                              className={selectedOptions[group.name] === option.label ? 'active' : ''}
                              key={option.label}
                              type="button"
                              onClick={() =>
                                setSelectedOptions((currentOptions) => ({
                                  ...currentOptions,
                                  [group.name]: option.label,
                                }))
                              }
                            >
                              <span>{option.label}</span>
                              {option.priceDelta > 0 && <small>+{formatPrice(option.priceDelta)}</small>}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    ))}
                  </div>

                  <div className="detail-actions product-route-actions product-catalog-actions">
                    <button
                      className="checkout-button"
                      type="button"
                      disabled={selectedProduct.stockState === 'sold-out'}
                      onClick={addSelectedProductToCart}
                    >
                      <ShoppingCart size={18} />
                      {selectedProduct.stockState === 'sold-out' ? 'Sold Out' : 'Add to Cart'}
                    </button>
                    <button className="secondary-button" type="button" onClick={() => navigateToAccount('wishlist')}>
                      <Heart size={18} />
                      Add to Wishlist
                    </button>
                  </div>
                </article>
              </div>

              {/* NEW: Middle Gallery Section */}
              <div className="product-catalog-middle-gallery">
                {/* Polaroid Left: Route 66 Canyon */}
                <div className="polaroid-card polaroid-canyon">
                  <div className="polaroid-label-tape">Road Trip Vibes</div>
                  <div className="polaroid-img-wrapper">
                    <img src={heroMemoryLaneImage} alt="Route 66 road trip" />
                    
                    {/* Retro US 66 highway shield road sign standing on post */}
                    <div className="route-66-sign-wrapper">
                      <div className="route-66-sign-post"></div>
                      <svg className="route-66-shield" viewBox="0 0 100 100" width="55" height="55">
                        <path d="M 50 10 C 70 10, 90 13, 90 35 C 90 62, 70 80, 50 92 C 30 80, 10 62, 10 35 C 10 13, 30 10, 50 10 Z" fill="white" stroke="black" strokeWidth="4.5" />
                        <path d="M 50 15 C 66 15, 84 17, 84 35 C 84 58, 66 74, 50 85 C 34 74, 16 58, 16 35 C 16 17, 34 15, 50 15 Z" fill="none" stroke="black" strokeWidth="1.5" />
                        <text x="50" y="32" fontFamily="var(--font-retro), sans-serif" fontSize="10" fontWeight="900" textAnchor="middle" fill="black">ROUTE</text>
                        <text x="50" y="46" fontFamily="var(--font-retro), sans-serif" fontSize="11" fontWeight="900" textAnchor="middle" fill="black">US</text>
                        <text x="50" y="76" fontFamily="var(--font-retro), sans-serif" fontSize="28" fontWeight="950" textAnchor="middle" fill="black">66</text>
                      </svg>
                    </div>
                  </div>
                  <div className="polaroid-caption">Route US 66</div>
                </div>

                {/* Handwritten Note Center */}
                <div className="handwritten-index-card">
                  <div className="index-card-tape"></div>
                  <span className="card-tag">BACK IN THE DAY</span>
                  <p className="card-paragraph">
                    Weekend plans were simple.<br />
                    Fill up the tank, grab some<br />
                    cassettes, and hit the road<br />
                    with your best friends.<br />
                    No phones. No rush.<br />
                    Just the open road and<br />
                    endless possibilities.
                  </p>
                  <div className="card-stamp">
                    <span>MEMORIES</span>
                    <strong>1989</strong>
                  </div>
                </div>

                {/* Sunset Motel Keychain (Generated High-Fidelity Asset) */}
                <div className="sunset-motel-keychain-wrapper">
                  <img src={vintageMotelKeychain} className="vintage-motel-keychain-img" alt="Sunset Motel Keychain" />
                </div>

                {/* Polaroid Right: Retro Diner */}
                <div className="polaroid-card polaroid-diner">
                  <div className="polaroid-tape"></div>
                  <div className="polaroid-img-wrapper">
                    <img src={videoStoreImage} alt="Dintee Diner at night" />
                  </div>
                  <div className="polaroid-caption">
                    <span>Good food.</span>
                    <span>Good times.</span>
                    <span>Great memories.</span>
                  </div>
                </div>
              </div>

              <section className="product-catalog-info-panel">
                <div className="product-catalog-tabs" role="tablist" aria-label="Product information">
                  {productInfoTabs.map((tab) => (
                    <button
                      className={activeProductInfoTab === tab ? 'active' : ''}
                      type="button"
                      role="tab"
                      aria-selected={activeProductInfoTab === tab}
                      key={tab}
                      onClick={() => setActiveProductInfoTab(tab)}
                    >
                      {tab === 'Reviews' ? 'Reviews (48)' : tab}
                    </button>
                  ))}
                </div>

                <div className="product-catalog-tab-body" role="tabpanel">
                  {activeProductInfoTab === 'Details' && (
                    <>
                      <ul>
                        <li>{selectedProduct.shortDetail}</li>
                        <li>Vintage mall graphic printed on front.</li>
                        <li>Pre-shrunk for a consistent fit.</li>
                      </ul>
                      <ul>
                        <li>Printed in the USA.</li>
                        <li>Machine wash cold, tumble dry low.</li>
                        <li>Designed for everyday wear.</li>
                      </ul>
                    </>
                  )}
                  {activeProductInfoTab === 'Size Guide' && (
                    <>
                      <ul>
                        <li>Measure chest width on your favorite tee.</li>
                        <li>Choose oversized fit for a looser 90s mall look.</li>
                        <li>XL adds {formatPrice(2)} to cover blank garment cost.</li>
                      </ul>
                      <ul>
                        <li>Classic fit runs true to size.</li>
                        <li>Print-on-demand items are made after checkout.</li>
                        <li>Review size before ordering.</li>
                      </ul>
                    </>
                  )}
                  {activeProductInfoTab === 'Shipping' && (
                    <>
                      <ul>
                        <li>Made to order through Printful fulfillment.</li>
                        <li>Tracking appears after fulfillment starts.</li>
                        <li>Orders usually ship within 1-2 business days after production.</li>
                      </ul>
                      <ul>
                        <li>Damaged or misprinted goods can be reviewed by support.</li>
                        <li>Wrong size selection is not an automatic refund.</li>
                        <li>Use the order help desk for claims.</li>
                      </ul>
                    </>
                  )}
                  {activeProductInfoTab === 'Reviews' && (
                    <>
                      <ul>
                        <li>Rated 4.8/5 by early Rewind Club shoppers.</li>
                        <li>Customers like the soft cotton feel.</li>
                        <li>Print detail holds up well after normal wash cycles.</li>
                      </ul>
                      <ul>
                        <li>Best with jeans, canvas totes, and weekend errands.</li>
                        <li>Fast support for damaged or misprinted items.</li>
                        <li>Good Times. Guaranteed.</li>
                      </ul>
                    </>
                  )}
                  <aside className="product-catalog-guarantee">
                    <span>Good Times.</span>
                    <strong>Guaranteed.</strong>
                    <small>Dreaming in 1989 Supply Co.</small>
                  </aside>
                </div>
                
                {/* Nested Trust Badges Service Strip */}
                <div className="product-catalog-service-strip">
                  <div className="service-badge-column">
                    <Truck size={24} className="badge-icon" />
                    <div className="badge-copy">
                      <strong>FAST SHIPPING</strong>
                      <p>Quick delivery to your doorstep.</p>
                    </div>
                  </div>
                  <div className="service-badge-column">
                    <ShieldCheck size={24} className="badge-icon" />
                    <div className="badge-copy">
                      <strong>SECURE CHECKOUT</strong>
                      <p>Safe & secure payments.</p>
                    </div>
                  </div>
                  <div className="service-badge-column">
                    <RefreshCcw size={24} className="badge-icon" />
                    <div className="badge-copy">
                      <strong>EASY RETURNS</strong>
                      <p>Hassle-free returns within 30 days.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* NEW: Bottom Story, Playlist & Cassette Section */}
              <div className="product-catalog-contextual-row">
                {/* The Story */}
                <div className="contextual-card story-card">
                  <span className="card-heading-underline">THE STORY</span>
                  <div className="story-content">
                    <p>
                      {selectedProduct.id === 'rewind-club-tee'
                        ? "The Rewind Club Tee is a tribute to simpler days. Inspired by the malls, music, and memories of the late 80s, this design brings back the feeling of weekends well spent and summers that lasted forever."
                        : `The ${selectedProduct.name} is a tribute to simpler days. Inspired by the malls, music, and memories of the late 80s, this design brings back the feeling of weekends well spent and summers that lasted forever.`}
                    </p>
                    <p>Throw it on and take a trip down memory lane.</p>
                  </div>
                  {/* Circular Postmark Stamp in Background */}
                  <div className="circular-postmark-stamp">
                    <span>1989 SUPPLY CO.</span>
                    <strong>APPROVED</strong>
                  </div>
                </div>

                {/* Soundtrack of the Era */}
                <div className="contextual-card playlist-card">
                  <span className="card-heading-underline">SOUNDTRACK OF THE ERA</span>
                  <ul className="playlist-songs">
                    <li>
                      <span className="play-triangle"></span>
                      <div>
                        <strong>Summer of '89</strong>
                        <small>by Bryan Adams</small>
                      </div>
                    </li>
                    <li>
                      <span className="play-triangle"></span>
                      <div>
                        <strong>Saturday Morning Cartoons</strong>
                        <small>Theme Songs</small>
                      </div>
                    </li>
                    <li>
                      <span className="play-triangle"></span>
                      <div>
                        <strong>Pump Up the Jam</strong>
                        <small>by Technotronic</small>
                      </div>
                    </li>
                    <li>
                      <span className="play-triangle"></span>
                      <div>
                        <strong>Friday Night Arcade</strong>
                        <small>The Beep Test</small>
                      </div>
                    </li>
                    <li>
                      <span className="play-triangle"></span>
                      <div>
                        <strong>Livin' On a Prayer</strong>
                        <small>by Bon Jovi</small>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Boombox Cassette Graphic */}
                <div className="contextual-card boombox-card">
                  <div className="boombox-image-wrapper">
                    <img src={boomboxFeatureImage} alt="Vintage Boombox Cassette Player" />
                    <div className="cassette-label-tape">
                      <span>Road Trip Mix '89</span>
                    </div>
                  </div>
                </div>
              </div>

              {relatedProducts.length > 0 && (
                <section className="product-route-related">
                  <div className="section-heading">
                    <div>
                      <p className="receipt-label">More from this shelf</p>
                      <h2>Related Products</h2>
                    </div>
                  </div>
                  <div className="collection-route-grid">
                    {relatedProducts.map((product) => (
                      <article className="product-card collection-product-card" key={`product-related-${product.id}`}>
                        <button
                          className="media-square product-image product-image-button product-image--cutout"
                          type="button"
                          onClick={() => openProductDetail(product)}
                        >
                          <img src={product.image} alt={product.name} />
                          <span>{product.tag}</span>
                        </button>
                        <div className="product-copy">
                          <p className="sku">{product.sku}</p>
                          <button className="product-title-button" type="button" onClick={() => openProductDetail(product)}>
                            {product.name}
                          </button>
                          <p>{product.shortDetail}</p>
                        </div>
                        <div className="product-buy">
                          <strong>{formatPrice(product.price)}</strong>
                          <span className="buy-actions">
                            <button type="button" onClick={(event) => addToCart(product, event)}>Add</button>
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </section>
          ) : (
            <section className="store-section product-route-page">
              <div className="empty-results product-route-empty">
                <Sparkles size={26} />
                <h3>Product not found</h3>
                <p>This shelf item may have moved or sold out.</p>
                <button type="button" onClick={() => openCollection('All')}>Browse Products</button>
              </div>
            </section>
          )
        ) : activeRoute === 'collection' ? (
          <section className="store-section collection-route-page">
            <div className="collection-route-head">
              <div>
                <p className="receipt-label">Collection shelf</p>
                <h1>{collectionCategory === 'All' ? 'All Products' : collectionCategory}</h1>
                <p>{collectionProducts.length} item{collectionProducts.length === 1 ? '' : 's'} ready for this shelf.</p>
              </div>
              <button type="button" onClick={openOrderTracking}>
                Track Order <ChevronRight size={16} />
              </button>
            </div>

            <div className="collection-filter-panel">
              <label>
                Category
                <select
                  value={collectionCategory}
                  onChange={(event) => openCollection(event.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Sort
                <select value={collectionSort} onChange={(event) => setCollectionSort(event.target.value)}>
                  {collectionSortOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Availability
                <select
                  value={collectionAvailability}
                  onChange={(event) => setCollectionAvailability(event.target.value)}
                >
                  {collectionAvailabilityOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Max Price
                <select value={collectionMaxPrice} onChange={(event) => setCollectionMaxPrice(event.target.value)}>
                  <option>All</option>
                  <option value="25">Under $25</option>
                  <option value="50">Under $50</option>
                  <option value="75">Under $75</option>
                </select>
              </label>
            </div>

            <div className="collection-route-grid">
              {collectionProducts.map((product) => (
                <article className="product-card collection-product-card" key={`collection-${product.id}`}>
                  <button
                    className="media-square product-image product-image-button product-image--cutout"
                    type="button"
                    onClick={() => openProductDetail(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span>{product.tag}</span>
                  </button>
                  <div className="product-copy">
                    <p className="sku">{product.sku}</p>
                    <button className="product-title-button" type="button" onClick={() => openProductDetail(product)}>
                      {product.name}
                    </button>
                    <p>{product.shortDetail}</p>
                  </div>
                  <div className="product-buy">
                    <strong>{formatPrice(product.price)}</strong>
                    <span className="buy-actions">
                      <button type="button" onClick={() => openProductDetail(product)}>View Detail</button>
                      <button type="button" onClick={(event) => addToCart(product, event)}>Add</button>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : activeRoute === 'tracking' ? (
          <section className="store-section tracking-route-page">
            <div className="tracking-route-card">
              <div className="tracking-route-head">
                <p className="receipt-label">Order lookup</p>
                <h1>Track Your Order</h1>
                <p>Use your order number and checkout email to see the latest fulfillment status.</p>
              </div>
              <form className="tracking-lookup-form" onSubmit={submitOrderTracking}>
                <label>
                  Order Number
                  <input name="orderId" placeholder="DI1989-10425" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder={customer?.email ?? 'you@example.com'} />
                </label>
                <button className="checkout-button" type="submit">Track Order</button>
              </form>
              {trackingNotice && <p className="account-inline-notice tracking-route-notice">{trackingNotice}</p>}
              {trackedOrder && (
                <section className="tracking-route-result">
                  <div>
                    <small>Order</small>
                    <strong>#{trackedOrder.id}</strong>
                    <span>{trackedOrder.date}</span>
                  </div>
                  <div>
                    <small>Status</small>
                    <strong>{trackedOrder.status}</strong>
                    <span>{trackedOrder.tracking}</span>
                  </div>
                  <div>
                    <small>Total</small>
                    <strong>{formatPrice(trackedOrder.total)}</strong>
                    <span>{trackedOrder.items?.length ?? 0} item{trackedOrder.items?.length === 1 ? '' : 's'}</span>
                  </div>
                  <div className="tracking-route-steps">
                    {getOrderProgressTimeline(trackedOrder).map((step) => (
                      <article className={step.done ? 'done' : ''} key={step.label}>
                        <span>{step.done ? <CheckCircle2 size={16} /> : <Package size={16} />}</span>
                        <strong>{step.label}</strong>
                        <p>{step.detail}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </section>
        ) : (
          <>
        <section className="hero" aria-label="Storefront offer">
          <div className="hero-slider" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                className={`media-hero hero-slide ${index === heroSlideIndex ? 'active' : ''}`}
                key={slide.label}
                src={slide.image}
                alt=""
              />
            ))}
          </div>
          <div className="hero-content">
            <p className="receipt-label">New drop ready now</p>
            <h1>Retro goods for everyday nostalgia.</h1>
            <p>Made-to-order apparel, prints, desk goods, and gifts.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#products">
                Shop New Arrivals <ChevronRight size={18} />
              </a>
              <a className="secondary-button" href="#collections">
                View Bundles
              </a>
            </div>
          </div>
          <aside className="hero-receipt" aria-label={`${activeHeroSlide.label} receipt`}>
            <div className="receipt-pin" aria-hidden="true" />
            <div className="receipt-head">
              <strong>1989 Supply Co.</strong>
              <span>Good Times. Guaranteed.</span>
            </div>
            <div className="receipt-dash" aria-hidden="true" />
            <div className="receipt-meta">
              <span>{activeHeroSlide.receipt.code}</span>
              <span>{activeHeroSlide.label}</span>
            </div>
            <div className="receipt-lines">
              {activeHeroSlide.receipt.items.map(([name, price]) => (
                <div className="receipt-line" key={`${activeHeroSlide.label}-${name}`}>
                  <span>{name}</span>
                  <strong>{price < 0 ? `-${formatPrice(Math.abs(price))}` : formatPrice(price)}</strong>
                </div>
              ))}
            </div>
            <div className="receipt-dash" aria-hidden="true" />
            <div className="receipt-total">
              <span>Slide total</span>
              <strong>{formatPrice(activeHeroSlide.receipt.items.reduce((sum, [, price]) => sum + price, 0))}</strong>
            </div>
            <p>Thank you! Come again.</p>
            <div className="receipt-barcode" aria-hidden="true" />
          </aside>
          <div className="hero-dots" aria-label="Hero slideshow">
            {heroSlides.map((slide, index) => (
              <button
                className={index === heroSlideIndex ? 'active' : ''}
                key={slide.label}
                type="button"
                aria-label={`Show ${slide.label}`}
                onClick={() => setHeroSlideIndex(index)}
              />
            ))}
          </div>
        </section>

        <section className="service-strip" aria-label="Store service benefits">
          <div className="service-ticket">
            <Truck size={18} />
            <span>
              <strong>Shipping estimate</strong>
              <small>Printed in 2-5 days</small>
            </span>
          </div>
          <div className="service-ticket">
            <CheckCircle2 size={18} />
            <span>
              <strong>Refund policy</strong>
              <small>Help within 30 days</small>
            </span>
          </div>
          <div className="service-ticket">
            <ShieldCheck size={18} />
            <span>
              <strong>Secure checkout</strong>
              <small>SSL protected</small>
            </span>
          </div>
          <div className="service-ticket">
            <Package size={18} />
            <span>
              <strong>Made to order</strong>
              <small>POD fulfilled</small>
            </span>
          </div>
        </section>

        <section className="store-section department-section" aria-label="Shop by department">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Shop by shelf</p>
              <h2>Departments</h2>
            </div>
            <p className="section-note">Jump straight into the product type you want.</p>
          </div>
          <div className="department-grid">
            {departmentCards.map((department) => (
              <article className="department-card" key={department.name}>
                <img className="media-banner" src={department.image} alt={`${department.name} products`} />
                <div>
                  <h3>{department.name}</h3>
                  <p>{department.copy}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setActiveCategory(department.name)
                      window.location.hash = 'products'
                    }}
                  >
                    Shop {department.name}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="new-arrivals" className="store-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Fresh on the counter</p>
              <h2>New Arrivals</h2>
            </div>
            <p className="section-note">Fresh apparel, mugs, wall art, and desk goods.</p>
          </div>
          <div className="feature-product-grid">
            {newArrivals.map((product) => (
              <article className="feature-product-card" key={product.id}>
                <button
                  className="media-square product-image-button feature-image-button product-image--cutout"
                  type="button"
                  aria-label={`View ${product.name} details`}
                  onClick={() => openProductDetail(product)}
                >
                  <img src={product.image} alt={product.name} />
                </button>
                <div>
                  <p className="receipt-label">{product.category}</p>
                  <button className="product-title-button" type="button" onClick={() => openProductDetail(product)}>
                    {product.name}
                  </button>
                  <p>{product.shortDetail}</p>
                  <div className="bundle-buy">
                    <strong>{formatPrice(product.price)}</strong>
                    <span className="buy-actions">
                      <button type="button" onClick={(event) => addToCart(product, event)}>
                        Add
                      </button>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="store-section products-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Browse the shelf</p>
              <h2>Best Sellers</h2>
            </div>
            <label className="product-search">
              <Search size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, tags, SKUs..."
                aria-label="Search products and SKUs"
              />
            </label>
          </div>

          <div className="category-bar" aria-label="Product categories">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <button
                    className="media-square product-image product-image-button product-image--cutout"
                    type="button"
                    aria-label={`View ${product.name} details`}
                    onClick={() => openProductDetail(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span>{product.tag}</span>
                  </button>
                  <div className="product-copy">
                    <p className="sku">{product.sku}</p>
                    <button className="product-title-button" type="button" onClick={() => openProductDetail(product)}>
                      {product.name}
                    </button>
                    <p>{product.shortDetail}</p>
                  </div>
                  <div className="product-buy">
                    <strong>{formatPrice(product.price)}</strong>
                    <span className="buy-actions">
                      <button
                        type="button"
                        disabled={product.stockState === 'sold-out'}
                        onClick={(event) => addToCart(product, event)}
                      >
                        <ShoppingCart size={17} />
                        {product.stockState === 'sold-out' ? 'Sold out' : 'Add'}
                      </button>
                    </span>
                  </div>
                  {product.stockState !== 'in-stock' && (
                    <p className="stock-note">
                      {product.stockState === 'low-stock' ? 'Only a few left' : 'Restock soon'}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <Sparkles size={26} />
              <h3>No products found</h3>
              <p>Clear search or browse all products.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All')
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section id="collections" className="store-section bundle-builder-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Curated kits</p>
              <h2>Weekend Bundle Builder</h2>
            </div>
            <p className="section-note">Three ready-made carts for movie nights, counters, and mall-weekend shelves.</p>
          </div>
          <div className="bundle-grid">
            {bundles.map((bundle) => (
              <article className="bundle-card" key={bundle.id}>
                <img className="media-banner" src={bundle.image} alt={bundle.name} />
                <div>
                  <p className="receipt-label">Bundle value {formatPrice(bundle.value)}</p>
                  <h3>{bundle.name}</h3>
                  <p>{bundle.shortDetail}</p>
                  <ul className="bundle-item-list">
                    {bundle.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="bundle-buy">
                    <strong>{formatPrice(bundle.price)}</strong>
                    <button type="button" onClick={(event) => addToCart(bundle, event)}>
                      Add Bundle
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="deals" className="store-section gift-counter-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Gift lanes</p>
              <h2>Gift Counter</h2>
            </div>
            <p className="section-note">Gift picks by budget.</p>
          </div>
          <div className="gift-grid">
            {giftCounterItems.map((guide) => (
              <article className="gift-card" key={guide.title}>
                <button
                  className="media-banner gift-image-button"
                  type="button"
                  onClick={() =>
                    openImageInfo(
                      {
                        id: guide.title,
                        name: guide.title,
                        image: guide.image,
                        category: guide.category,
                        imageUse: guide.imageUse,
                      },
                      'Gift counter image',
                      guide.imageUse,
                    )
                  }
                >
                  <img src={guide.image} alt={`${guide.title} gift products`} />
                </button>
                <span>{guide.budget}</span>
                <h3>{guide.title}</h3>
                <p>{guide.copy}</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setActiveCategory(guide.category)
                    window.location.hash = 'products'
                  }}
                >
                  Shop Picks
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="featured" className="store-section featured-drop-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Staff counter pick</p>
              <h2>Featured Drop</h2>
            </div>
            <p className="section-note">Today&apos;s pick, ready to add.</p>
          </div>
          <article className="featured-drop-card">
            <button
              className="featured-drop-image product-image--cutout"
              type="button"
              onClick={() =>
                openProductDetail({
                  ...featuredDrop,
                  image: featuredDropImage,
                })
              }
            >
              <img src={featuredDropImage} alt={featuredDrop.name} />
            </button>
            <div className="featured-drop-copy">
              <p className="receipt-label">{featuredDrop.tag}</p>
              <button className="featured-title-button" type="button" onClick={() => openProductDetail(featuredDrop)}>
                {featuredDrop.name}
              </button>
              <p>{featuredDrop.shortDetail}</p>
              <dl className="drop-spec-list">
                <div>
                  <dt>Type</dt>
                  <dd>Wall poster</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>18x24 in</dd>
                </div>
                <div>
                  <dt>Artwork</dt>
                  <dd>Original print</dd>
                </div>
                <div>
                  <dt>Ships</dt>
                  <dd>After production</dd>
                </div>
                <div>
                  <dt>Frame</dt>
                  <dd>Optional</dd>
                </div>
                <div>
                  <dt>Fulfillment</dt>
                  <dd>Printful</dd>
                </div>
              </dl>
            </div>
            <aside className="featured-drop-actions" aria-label={`${featuredDrop.name} purchase actions`}>
              <div className="featured-price">
                <strong>{formatPrice(featuredDrop.price)}</strong>
                <span>In stock</span>
              </div>
              <button className="checkout-button" type="button" onClick={(event) => addToCart(featuredDrop, event)}>
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button className="wishlist-button" type="button" onClick={() => openProductDetail(featuredDrop)}>
                <Heart size={18} />
                Add to Wishlist
              </button>
              <div className="drop-stamp">Good Times. Guaranteed.</div>
            </aside>
          </article>
        </section>

        <section id="gift-guide" className="store-section shelf-ready-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Ready for the shelf</p>
              <h2>Shelf-Ready Sets</h2>
            </div>
            <p className="section-note">Denser kits for shoppers who want the full look in one pass.</p>
          </div>
          <div className="shelf-set-grid">
            {shelfSets.map((set) => (
              <article className="shelf-set-card" key={set.id}>
                <button
                  className="media-banner shelf-set-image"
                  type="button"
                  onClick={() => openImageInfo(set, 'Shelf-ready set image', set.imageUse)}
                >
                  <img src={set.image} alt={`${set.name} product set`} />
                </button>
                <div>
                  <p className="receipt-label">Curated kit</p>
                  <h3>{set.name}</h3>
                  <p>{set.copy}</p>
                </div>
                <div className="shelf-set-ticket">
                  <span>{formatPrice(set.price)}</span>
                  <button type="button" onClick={(event) => addToCart(set, event)}>
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="policies" className="store-section policy-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Shop rules</p>
              <h2>Store Policies</h2>
            </div>
            <p className="section-note">Shipping, refunds, support, and privacy.</p>
          </div>
          <div className="policy-grid">
            {policyCards.map((policy) => (
              <article className="policy-card" key={policy.id}>
                <p className="receipt-label">{policy.label}</p>
                <h3>{policy.title}</h3>
                <p>{policy.copy}</p>
                <ul>
                  {policy.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => openPolicy(policy.id)}>
                  Open {policy.title}
                </button>
              </article>
            ))}
          </div>
        </section>

          </>
        )}
      </main>

      <footer id="footer" className="site-footer">
        <div className="footer-stickers" aria-hidden="true">
          <span className="footer-sticker footer-sticker--rewind">
            <Sparkles size={15} /> REWIND10
          </span>
          <span className="footer-sticker footer-sticker--drop">
            <Tags size={15} /> New drop
          </span>
          <span className="footer-sticker footer-sticker--year">1989</span>
          <span className="footer-sticker footer-sticker--gift">
            <Gift size={15} /> Gift pick
          </span>
        </div>
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="receipt-label">Open late since 1989-ish</p>
          <h2>1989 Supply Co.</h2>
            <p>Retro-inspired goods made to order and fulfilled through Printful.</p>
            <div className="footer-service-row" aria-label="Store service notes">
              <span><Truck size={16} /> US shipping plan</span>
              <span><ShieldCheck size={16} /> Secure checkout</span>
              <span><Package size={16} /> Made to order</span>
            </div>
          </div>

          <nav className="footer-links" aria-label="Footer shop links">
            <h3>Shop</h3>
            {categories.slice(1).map((category) => (
              <a
                href={`#/collections/${getCategorySlug(category)}`}
                key={category}
                onClick={(event) => {
                  event.preventDefault()
                  setQuery('')
                  openCollection(category)
                }}
              >
                {category}
              </a>
            ))}
          </nav>

          <nav className="footer-links" aria-label="Footer store links">
            <h3>Counter</h3>
            <a href="#new-arrivals">New arrivals</a>
            <a href="#collections">Bundles</a>
            <a href="#deals">Gift counter</a>
            <a href="#gift-guide">Shelf sets</a>
            <a href="#products">Best sellers</a>
            <a href="#policies">Policies</a>
          </nav>

          <nav className="footer-links" aria-label="Footer policy links">
            <h3>Policies</h3>
            {policyCards.map((policy) => (
              <a
                href={`#/${policy.path}`}
                key={policy.id}
                onClick={(event) => {
                  event.preventDefault()
                  openPolicy(policy.id)
                }}
              >
                {policy.title}
              </a>
            ))}
          </nav>

          <form className="signup-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="email-signup">Drop alerts</label>
            <p>Get restock notes, gift runs, and small-batch shelf drops.</p>
            <div>
              <input id="email-signup" type="email" placeholder="you@example.com" />
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>

        <div className="footer-receipt-strip">
          <span>Use REWIND10 for 10% off</span>
          <span>Made to order through Printful.</span>
          <span>Production and shipping times are shown at checkout.</span>
          <span>Support: support@1989supply.co</span>
        </div>
      </footer>

      {!cartOpen && (
        <button
          className="floating-cart-button"
          type="button"
          ref={floatingCartButtonRef}
          aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? '' : 's'}`}
          onClick={() => setCartOpen(true)}
        >
          <img className="floating-cart-art" src={retroCartImage} alt="" aria-hidden="true" />
          <span className="floating-cart-count">{itemCount}</span>
          <span className="floating-cart-copy">
            Cart
            <strong>{formatPrice(total)}</strong>
          </span>
        </button>
      )}

      {flyingCartItem && (
        <div
          className="cart-fly-item"
          key={flyingCartItem.key}
          aria-hidden="true"
          style={{
            '--fly-start-x': `${flyingCartItem.startX}px`,
            '--fly-start-y': `${flyingCartItem.startY}px`,
            '--fly-end-x': `${flyingCartItem.endX}px`,
            '--fly-end-y': `${flyingCartItem.endY}px`,
          }}
        >
          {flyingCartItem.image ? <img src={flyingCartItem.image} alt="" /> : <ShoppingCart size={22} />}
        </div>
      )}

      {cartNotice && (
        <div
          className={`cart-mini-modal ${cartNotice.placement === 'above' ? 'is-above' : ''}`}
          role="status"
          style={{ left: cartNotice.left, top: cartNotice.top }}
        >
          <div className="cart-mini-image">
            {cartNotice.image ? <img src={cartNotice.image} alt="" /> : <ShoppingCart size={20} />}
          </div>
          <div>
            <strong>Added to cart</strong>
            <span>{cartNotice.name}</span>
            <small>{formatPrice(cartNotice.price)} / Cart {itemCount} item{itemCount === 1 ? '' : 's'}</small>
          </div>
          <button type="button" onClick={() => setCartOpen(true)}>
            View
          </button>
        </div>
      )}

      <div className={`drawer-backdrop ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping cart" aria-hidden={!cartOpen}>
        <div className="drawer-header">
          <div>
            <p className="receipt-label">Your order</p>
            <h2>Cart</h2>
          </div>
          <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {cart.length ? (
          <>
            <div className="cart-items">
              {visibleCartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>
                    {item.optionSummary && <p className="cart-variant">{item.optionSummary}</p>}
                    <div className="quantity-row">
                      <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={15} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={15} />
                      </button>
                      <button type="button" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > collapsedCartItemCount && (
              <button className="cart-toggle" type="button" onClick={() => setCartExpanded((expanded) => !expanded)}>
                {cartListExpanded ? 'Rút gọn' : `Hiển thị hết (${hiddenCartItemCount})`}
              </button>
            )}
          </>
        ) : (
          <div className="empty-cart">
            <ShoppingBag size={34} />
            <h3>Your cart is empty</h3>
            <p>Start with a best seller or bundle.</p>
            <button type="button" onClick={() => setCartOpen(false)}>
              Browse Products
            </button>
          </div>
        )}

        <div className="cart-summary">
          <label htmlFor="promo-code">Promo code</label>
          <div className="promo-row">
            <input
              id="promo-code"
              value={promoCode}
              onChange={(event) => {
                setPromoCode(event.target.value)
                setPromoState('idle')
              }}
              placeholder="REWIND10"
            />
            <button type="button" onClick={applyPromo}>
              Apply
            </button>
          </div>
          <p className={`promo-state ${promoState}`}>
            {promoState === 'success' && 'Promo applied: 10% off.'}
            {promoState === 'invalid' && 'Code not found.'}
          </p>
          <div className="summary-lines">
            <span>
              Subtotal <strong>{formatPrice(subtotal)}</strong>
            </span>
            <span>
              Discount <strong>-{formatPrice(discount)}</strong>
            </span>
            <span>
              Shipping <strong>{shipping ? formatPrice(shipping) : 'Free'}</strong>
            </span>
            <span className="total">
              Total <strong>{formatPrice(total)}</strong>
            </span>
          </div>
          <button className="checkout-button" type="button" disabled={!cart.length} onClick={openCheckout}>
            Checkout
          </button>
        </div>
      </aside>

      {(authOpen || accountAuthOpen) && (
        <div className="modal-backdrop" role="presentation" onClick={closeAuth}>
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Close sign in" onClick={closeAuth}>
              <X size={22} />
            </button>
            <p className="receipt-label">Customer counter</p>
            <h2 id="auth-title">{authMode === 'sign-up' ? 'Create account' : 'Sign in'}</h2>
            <p className="checkout-note">
              Access your saved orders, checkout details, and account history.
            </p>
            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === 'sign-up' && (
                <label>
                  Full name
                  <input name="name" placeholder="Alex Taylor" />
                </label>
              )}
              <label>
                Email
                <input name="email" required type="email" placeholder="alex@example.com" />
              </label>
              <label>
                Password
                <input required type="password" placeholder="Your password" />
              </label>
              <button className="checkout-button" type="submit">
                {authMode === 'sign-up' ? 'Create Account' : 'Sign In'}
              </button>
            </form>
            <div className="auth-switch">
              {authMode === 'sign-up' ? 'Already have an account?' : 'New customer?'}
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'sign-up' ? 'sign-in' : 'sign-up')}
              >
                {authMode === 'sign-up' ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </section>
        </div>
      )}

      {accountScreenOpen && customer && (
        <div className="modal-backdrop account-screen-backdrop" role="presentation">
          <section
            className="account-modal account-dashboard-modal account-screen account-portal"
            role="region"
            aria-labelledby="account-title"
          >
            <header className="account-portal-header">
              <button className="account-brand-button" type="button" onClick={() => navigateToPath('/')}>
                <img src={dreaming1989LogoImage} alt="Dreaming in 1989" />
              </button>
              <div className="account-portal-actions">
                <button type="button" onClick={() => {
                  setCartOpen(true)
                }}>
                  <ShoppingCart size={18} />
                  Cart ({itemCount})
                </button>
                <button type="button" onClick={() => navigateToPath('/')}>
                  <ChevronRight size={18} />
                  Back to Shop
                </button>
                <button type="button" onClick={requestLogout}>
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </header>

            <div className="account-portal-grid account-center-grid" id="account-dashboard">
              <aside className="account-panel account-menu-panel">
                <div className="account-mini-profile">
                  <div className="account-mini-avatar" aria-hidden="true">
                    {customer.avatar ? <img src={customer.avatar} alt="" /> : <User size={34} />}
                  </div>
                  <div>
                    <h2 id="account-title">{customer.name}</h2>
                    <span>{customer.email}</span>
                    <em>Rewind Club</em>
                  </div>
                </div>
                <div className="account-profile-actions">
                  <button type="button" onClick={openProfileEditor}>
                    <User size={16} />
                    Edit Profile
                  </button>
                  <label className="account-upload-button">
                    <Image size={16} />
                    Upload Photo
                    <input accept="image/*" type="file" onChange={uploadProfilePhoto} />
                  </label>
                  {profileNotice && <small>{profileNotice}</small>}
                </div>
                <nav className="account-side-menu" aria-label="Customer account menu">
                  {[
                    ['dashboard', 'Overview', Home],
                    ['orders', 'Orders', Package],
                    ['wishlist', 'Wishlist', Heart],
                    ['settings', 'Account Settings', ShieldCheck],
                  ].map(([tabId, label, Icon]) => (
                    <button
                      className={displayedAccountTab === tabId || (tabId === 'settings' && isAccountSettingsTab) ? 'active' : ''}
                      key={tabId}
                      type="button"
                      onClick={() => {
                        navigateToAccount(tabId)
                      }}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                  <button type="button" onClick={requestLogout}>
                    <LogOut size={18} />
                    Logout
                  </button>
                </nav>
                <div className="account-vhs-card account-vhs-card-compact">
                  <img src={vhsCassetteHeaderImage} alt="Dreaming in 1989 VHS membership card" />
                </div>
              </aside>

              <main className={`account-main-column account-center-column account-center-column--${accountLayoutMode}`}>
                {isAccountSettingsTab ? (
                  <div className="account-settings-tab">
                    <div className="account-settings-breadcrumb">
                      <Home size={14} />
                      <span>/</span>
                      <b>My Account</b>
                      <span>/</span>
                      <strong>Account Settings</strong>
                    </div>

                    <section className="account-settings-hero">
                      <div className="account-settings-id-card" aria-hidden="true">
                        <User size={42} />
                      </div>
                      <div className="account-settings-hero-copy">
                        <h2>Account Settings</h2>
                        <dl>
                          <div>
                            <dt>Email Address</dt>
                            <dd>{customer.email}</dd>
                          </div>
                          <div>
                            <dt>Membership Level</dt>
                            <dd><Tags size={16} /> Rewind Club</dd>
                          </div>
                          <div>
                            <dt>Reward Progress</dt>
                            <dd>750 / 1,000 pts</dd>
                            <span className="account-settings-progress"><i /></span>
                          </div>
                        </dl>
                      </div>
                      <div className="account-settings-star" aria-hidden="true">
                        <Sparkles size={27} />
                      </div>
                    </section>

                    <div className="account-settings-control-grid">
                      <section className="account-panel account-security-panel" id="account-security">
                        <div className="account-settings-section-title">
                          <ShieldCheck size={19} />
                          <h3>Security</h3>
                        </div>
                        <form className="account-settings-form" onSubmit={(event) => {
                          event.preventDefault()
                          updatePasswordDraft()
                        }}>
                          <label>
                            Current Password
                            <input type="password" placeholder="••••••••" />
                          </label>
                          <label>
                            New Password
                            <input type="password" placeholder="••••••••" />
                          </label>
                          <label>
                            Confirm New Password
                            <input type="password" placeholder="••••••••" />
                          </label>
                          <button className="checkout-button" type="submit">Update Password</button>
                        </form>
                      </section>

                      <div className="account-settings-info-stack">
                        <section className="account-panel account-settings-info-card">
                          <div className="account-settings-section-title">
                            <User size={18} />
                            <h3>Login Info</h3>
                          </div>
                          <dl>
                            <div>
                              <dt>Email Address</dt>
                              <dd>{customer.email}</dd>
                            </div>
                            <div>
                              <dt>Last Sign-In</dt>
                              <dd>May 18, 2025 • 8:42 PM</dd>
                            </div>
                          </dl>
                        </section>

                        <section className="account-panel account-reset-card">
                          <div>
                            <div className="account-settings-section-title">
                              <RefreshCcw size={18} />
                              <h3>Reset Password</h3>
                            </div>
                            <p>We'll send you a link to reset your password.</p>
                          </div>
                          <button className="account-outline-red-button" type="button" onClick={sendResetLinkDraft}>
                            Send Reset Link
                          </button>
                          {securityNotice && <small className="account-inline-notice">{securityNotice}</small>}
                        </section>

                        <section className="account-panel account-settings-info-card">
                          <div className="account-settings-section-title">
                            <Sparkles size={18} />
                            <h3>Account Status</h3>
                          </div>
                          <dl>
                            <div>
                              <dt>Member Since</dt>
                              <dd>March 12, 2024</dd>
                            </div>
                            <div>
                              <dt>Reward Progress</dt>
                              <dd>750 / 1,000 pts</dd>
                            </div>
                          </dl>
                          <span className="account-settings-progress"><i /></span>
                        </section>
                      </div>
                    </div>

                    <section className="account-panel account-addresses-card" id="account-addresses">
                      <div className="account-settings-section-title account-addresses-title">
                        <div>
                          <FileText size={18} />
                          <h3>Saved Addresses</h3>
                        </div>
                        <button
                          type="button"
                          onClick={openAddAddress}
                        >
                          <Plus size={15} /> Add New Address
                        </button>
                      </div>
                      <div className="account-address-grid">
                        {savedAddresses.map((address) => (
                          <article className="account-address-card" key={address.id}>
                            <span>{address.label}</span>
                            <strong>{address.name}</strong>
                            {address.lines.filter(Boolean).map((line) => <small key={line}>{line}</small>)}
                            <button className="account-address-manage-button" type="button" onClick={() => openEditAddress(address)}>
                              <ShieldCheck size={13} /> Manage
                            </button>
                            <em aria-hidden="true">{address.label.toLowerCase() === 'gift' ? '1989' : '62704'}</em>
                            {addressManageMode && (
                              <div className="account-address-actions">
                                <button type="button" onClick={() => openEditAddress(address)}>Edit</button>
                                {address.label.toLowerCase() !== 'primary' && (
                                  <button type="button" onClick={() => setPrimaryAddress(address.id)}>Set Primary</button>
                                )}
                                <button type="button" onClick={() => deleteAddress(address.id)}>Delete</button>
                              </div>
                            )}
                          </article>
                        ))}
                        {!savedAddresses.length && (
                          <p className="account-empty-address">No saved addresses yet.</p>
                        )}
                        <button className="account-add-address" type="button" onClick={openAddAddress}>
                          <Plus size={24} />
                          Add New Address
                        </button>
                      </div>
                      {addressNotice && <small className="account-inline-notice account-address-notice">{addressNotice}</small>}
                    </section>
                  </div>
                ) : displayedAccountTab === 'support' ? (
                  <section className="account-panel account-support-workspace" id="account-support-workspace">
                    <div className="account-panel-title">
                      Support Center
                      <span className="account-panel-count">{supportTickets.length} draft ticket{supportTickets.length === 1 ? '' : 's'}</span>
                    </div>
                    <div className="account-support-workspace-grid">
                      <div className="account-support-action-list" aria-label="Support actions">
                        {accountSupportActions.map((action) => {
                          const Icon = action.icon
                          return (
                            <button
                              className={activeSupportAction === action.id ? 'active' : ''}
                              key={action.id}
                              type="button"
                              onClick={() => {
                                setActiveSupportAction(action.id)
                                setSupportTicketNotice('')
                              }}
                            >
                              <Icon size={19} />
                              <span>
                                <strong>{action.title}</strong>
                                <small>{action.copy}</small>
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      <div className="account-support-main">
                        <section className="account-support-faq">
                          <div className="account-settings-section-title">
                            <FileText size={18} />
                            <h3>{selectedSupportAction.title}</h3>
                          </div>
                          <div className="account-support-faq-list">
                            {accountSupportFaqs.map(([question, answer]) => (
                              <article key={question}>
                                <strong>{question}</strong>
                                <p>{answer}</p>
                              </article>
                            ))}
                          </div>
                        </section>

                        <form className="account-support-ticket-form" onSubmit={submitSupportTicket}>
                          <div className="account-settings-section-title">
                            <Mail size={18} />
                            <h3>Open Support Ticket</h3>
                          </div>
                          <label>
                            Email
                            <input name="email" type="email" defaultValue={customer.email} required />
                          </label>
                          <label>
                            Order
                            <select name="orderId" defaultValue={activeSupportAction === 'order' ? selectedAccountOrder.id : ''}>
                              <option value="">No order selected</option>
                              {customerOrders.map((order) => (
                                <option key={order.id} value={order.id}>
                                  #{order.id} - {order.status}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label>
                            Issue Type
                            <select name="issueType" defaultValue={selectedSupportAction.issueType}>
                              <option>General question</option>
                              <option>Order issue</option>
                              <option>Tracking question</option>
                              <option>Damaged item</option>
                              <option>Refund request</option>
                              <option>Address change</option>
                            </select>
                          </label>
                          <label className="wide">
                            Message
                            <textarea
                              name="message"
                              rows="5"
                              placeholder="Tell us what happened. Include photos later if the item arrived damaged or misprinted."
                              required
                            />
                          </label>
                          <button className="checkout-button" type="submit">Send Support Request</button>
                          {supportTicketNotice && <small className="account-inline-notice">{supportTicketNotice}</small>}
                        </form>

                        {supportTickets.length > 0 && (
                          <section className="account-support-ticket-log" aria-label="Recent support tickets">
                            <div className="account-settings-section-title">
                              <PackageCheck size={18} />
                              <h3>Recent Tickets</h3>
                            </div>
                            {supportTickets.map((ticket) => (
                              <article key={ticket.id}>
                                <strong>{ticket.id}</strong>
                                <span>{ticket.issueType}{ticket.orderId ? ` / #${ticket.orderId}` : ''}</span>
                              </article>
                            ))}
                          </section>
                        )}
                      </div>
                    </div>
                  </section>
                ) : displayedAccountTab === 'wishlist' ? (
                  <section className="account-panel account-wishlist-panel" id="account-wishlist">
                    <div className="account-panel-title">
                      Wishlist
                      <span className="account-panel-count">{wishlistProducts.length} saved <Heart size={15} /></span>
                    </div>
                    <div className="account-wishlist-grid">
                      {wishlistProducts.map((product) => (
                        <article className="account-wishlist-card" key={`wishlist-${product.id}`}>
                          <button className="account-wishlist-image" type="button" onClick={() => openProductDetail(product)}>
                            <img src={product.image} alt={product.name} />
                          </button>
                          <div className="account-wishlist-copy">
                            <span>{product.category}</span>
                            <h3>{product.name}</h3>
                            <p>{product.shortDetail}</p>
                            <strong>{formatPrice(product.price)}</strong>
                          </div>
                          <div className="account-wishlist-actions">
                            <button type="button" onClick={() => openProductDetail(product)}>
                              View Detail
                            </button>
                            <button type="button" onClick={(event) => addToCart(product, event)}>
                              Add to Cart
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : displayedAccountTab === 'orders' ? (
                  <section className="account-panel account-orders-panel account-orders-compact" id="account-orders">
                    <div className="account-order-filter-bar" aria-label="Order status filters">
                      {orderFilterTabs.map((filter) => (
                        <button
                          className={orderFilter === filter ? 'active' : ''}
                          key={filter}
                          type="button"
                          onClick={() => {
                            setOrderFilter(filter)
                            setOrdersExpanded(false)
                          }}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="account-order-history-toolbar">
                      <strong>Purchase History</strong>
                      <div className="account-date-range-control" aria-label="Order date range">
                        <input
                          aria-label="Order start date"
                          max={orderDateRange.end}
                          type="date"
                          value={orderDateRange.start}
                          onChange={(event) => updateOrderDateRange('start', event.target.value)}
                          onInput={(event) => updateOrderDateRange('start', event.target.value)}
                        />
                        <ChevronRight size={20} />
                        <input
                          aria-label="Order end date"
                          min={orderDateRange.start}
                          type="date"
                          value={orderDateRange.end}
                          onChange={(event) => updateOrderDateRange('end', event.target.value)}
                          onInput={(event) => updateOrderDateRange('end', event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="account-panel-title">
                      Order History
                      {hasOrderToggle && (
                        <button type="button" onClick={() => setOrdersExpanded((currentValue) => !currentValue)}>
                          {ordersExpanded ? 'Show Less' : 'Show More'} <ChevronDown size={15} />
                        </button>
                      )}
                    </div>
                    <div className="account-order-table">
                      {visibleCustomerOrders.map((order) => {
                        const firstItem = order.items?.[0]
                        const itemLabel = typeof firstItem === 'string' ? firstItem : firstItem?.name
                        const itemCountLabel = order.items?.length > 1 ? `+${order.items.length - 1} more item` : '1 item'

                        return (
                          <button
                            className={`account-order-table-row ${selectedAccountOrder?.id === order.id ? 'active' : ''}`}
                            key={order.id}
                            type="button"
                            onClick={() => openOrderDetail(order)}
                          >
                            <div className="account-order-id">
                              <strong>#{order.id}</strong>
                              <span>{order.date}</span>
                            </div>
                            <img src={getAccountLineItemImage(firstItem)} alt={itemLabel} />
                            <div className="account-order-item">
                              <strong>{itemLabel}</strong>
                              <span>{itemCountLabel}</span>
                            </div>
                            <em className={`status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>{order.status}</em>
                            <b>{formatPrice(order.total)}</b>
                            <span className="account-view-detail">View Detail <ChevronRight size={14} /></span>
                          </button>
                        )
                      })}
                    </div>
                  </section>
                ) : (
                  <>
                    <section className="account-panel account-summary-panel">
                      <div className="account-summary-stat">
                        <ShoppingBag size={28} />
                        <strong>{customerOrders.length}</strong>
                        <span>Total orders</span>
                      </div>
                      <div className="account-summary-stat">
                        <Wallet size={28} />
                        <strong>{formatPrice(customerOrders.reduce((sum, order) => sum + order.total, 0))}</strong>
                        <span>Total spent</span>
                      </div>
                      <div className="account-summary-stat account-summary-progress">
                        <Gift size={28} />
                        <strong>Rewind Club</strong>
                        <span>$40.88 to next reward</span>
                        <div><i /></div>
                      </div>
                    </section>

                    <section className="account-panel account-orders-panel account-orders-compact" id="account-orders">
                      <div className="account-panel-title">
                        Recent Orders
                        {hasOrderToggle && (
                          <button type="button" onClick={() => setOrdersExpanded((currentValue) => !currentValue)}>
                            {ordersExpanded ? 'Show Less' : 'Show More'} <ChevronDown size={15} />
                          </button>
                        )}
                      </div>
                      <div className="account-order-table">
                        {visibleCustomerOrders.map((order) => {
                          const firstItem = order.items?.[0]
                          const itemLabel = typeof firstItem === 'string' ? firstItem : firstItem?.name
                          const itemCountLabel = order.items?.length > 1 ? `+${order.items.length - 1} more item` : '1 item'

                          return (
                            <button
                              className={`account-order-table-row ${selectedAccountOrder?.id === order.id ? 'active' : ''}`}
                              key={order.id}
                              type="button"
                              onClick={() => openOrderDetail(order)}
                            >
                              <div className="account-order-id">
                                <strong>#{order.id}</strong>
                                <span>{order.date}</span>
                              </div>
                              <img src={getAccountLineItemImage(firstItem)} alt={itemLabel} />
                              <div className="account-order-item">
                                <strong>{itemLabel}</strong>
                                <span>{itemCountLabel}</span>
                              </div>
                              <em className={`status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>{order.status}</em>
                              <b>{formatPrice(order.total)}</b>
                              <span className="account-view-detail">View Detail <ChevronRight size={14} /></span>
                            </button>
                          )
                        })}
                      </div>
                    </section>

                    <section className="account-panel account-recent-card" id="account-recent">
                      <div className="account-panel-title">
                        Recently Viewed
                        <button type="button">View All <ChevronRight size={15} /></button>
                      </div>
                      <div className="account-recent-carousel">
                        <button
                          className="account-recent-arrow account-recent-arrow-left"
                          type="button"
                          aria-label="Previous recently viewed products"
                          onClick={() => scrollRecentCarousel(-1)}
                        >
                          <ChevronLeft size={22} />
                        </button>
                        <div className="account-recent-grid" ref={recentCarouselRef}>
                          {recentlyViewedProducts.map((product) => (
                            <button key={`recent-${product.id}`} type="button" onClick={() => openProductDetail(product)}>
                              <img src={product.image} alt={product.name} />
                              <strong>{product.name}</strong>
                              <span>{formatPrice(product.price)}</span>
                            </button>
                          ))}
                        </div>
                        <button
                          className="account-recent-arrow account-recent-arrow-right"
                          type="button"
                          aria-label="Next recently viewed products"
                          onClick={() => scrollRecentCarousel(1)}
                        >
                          <ChevronRight size={22} />
                        </button>
                      </div>
                    </section>
                  </>
                )}
              </main>

              {displayedAccountTab !== 'orders' && displayedAccountTab !== 'support' && !isAccountSettingsTab && (
                <aside className={`account-side-column account-rewards-column account-rewards-column--${accountLayoutMode}`}>
                  <section className="account-panel account-rewards-panel">
                    <div className="account-panel-title">
                      Coupons
                    </div>
                    <div className="account-coupon-stack">
                      {visibleAccountCoupons.map((coupon) => (
                        <article className={`account-coupon-ticket ${coupon.tone}`} key={coupon.code}>
                          <div>
                            <strong>{coupon.code}</strong>
                            <span>Active</span>
                          </div>
                          <div>
                            <b>{coupon.offer}</b>
                            <small>{coupon.detail}</small>
                            <em>Exp. {coupon.expires}</em>
                          </div>
                          <button type="button" onClick={() => copyCouponCode(coupon.code)}>
                            {copiedCoupon === coupon.code ? 'Copied' : 'Copy'}
                          </button>
                        </article>
                      ))}
                    </div>
                    {hasAccountCouponToggle && (
                      <button
                        className="account-coupon-toggle"
                        type="button"
                        onClick={() => setCouponsExpanded((isExpanded) => !isExpanded)}
                      >
                        {couponsExpanded ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </section>

                  <section className="account-panel account-support-card" id="account-support">
                    <div className="account-panel-title">Support Center</div>
                    <div className="account-support-content">
                      <div>
                        {accountSupportActions.map((action) => {
                          const Icon = action.icon
                          return (
                          <button type="button" key={action.id} onClick={() => openAccountSupport(action.id)}>
                            <Icon size={17} />
                            <span>
                              <strong>{action.title}</strong>
                              <small>{action.copy}</small>
                            </span>
                          </button>
                          )
                        })}
                      </div>
                      <img src={mallWeekendImage} alt="Retro mall support desk" />
                    </div>
                  </section>
                </aside>
              )}
            </div>
          </section>
        </div>
      )}

      {logoutConfirmOpen && customer && (
        <div className="modal-backdrop logout-confirm-backdrop" role="presentation" onClick={() => setLogoutConfirmOpen(false)}>
          <section
            className="logout-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-confirm-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Close logout confirmation" onClick={() => setLogoutConfirmOpen(false)}>
              <X size={22} />
            </button>
            <LogOut size={30} />
            <p className="receipt-label">Account session</p>
            <h2 id="logout-confirm-title">Log Out?</h2>
            <p>Are you sure you want to log out of {customer.email}?</p>
            <div className="logout-confirm-actions">
              <button type="button" onClick={() => setLogoutConfirmOpen(false)}>Cancel</button>
              <button type="button" onClick={logoutCustomer}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </section>
        </div>
      )}

      {addressEditorOpen && (
        <div className="modal-backdrop address-editor-backdrop" role="presentation" onClick={closeAddressEditor}>
          <section
            className="address-editor-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="address-editor-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Close address editor" onClick={closeAddressEditor}>
              <X size={22} />
            </button>
            <p className="receipt-label">Shipping address</p>
            <h2 id="address-editor-title">{addressEditorMode === 'edit' ? 'Edit Address' : 'Add Address'}</h2>
            <form
              className="account-address-form"
              key={`${addressEditorMode}-${addressDraft.id}`}
              onSubmit={submitAddressForm}
            >
              <label>
                Label
                <select name="label" defaultValue={addressDraft.label}>
                  <option>Primary</option>
                  <option>Gift</option>
                  <option>Home</option>
                  <option>Office</option>
                  <option>Saved</option>
                </select>
              </label>
              <label>
                Full Name
                <input name="name" required defaultValue={addressDraft.name} placeholder="Alex Taylor" />
              </label>
              <label>
                Address Line 1
                <input name="line1" required defaultValue={addressDraft.line1} placeholder="123 Arcade Way" />
              </label>
              <label>
                Address Line 2
                <input name="line2" defaultValue={addressDraft.line2} placeholder="Floor, suite, apartment" />
              </label>
              <label>
                City / State / ZIP
                <input name="cityState" required defaultValue={addressDraft.cityState} placeholder="Santa Monica, CA 90401" />
              </label>
              <label>
                Country
                <div className="account-country-select">
                  <input name="country" readOnly type="hidden" value={addressCountry} />
                  <button
                    aria-expanded={addressCountryMenuOpen}
                    className="account-country-trigger"
                    type="button"
                    onClick={() => setAddressCountryMenuOpen((currentValue) => !currentValue)}
                  >
                    <img
                      src={getFlagImageUrl(getShippingCountry(addressCountry).code)}
                      srcSet={`${getFlagImageUrl(getShippingCountry(addressCountry).code, 80)} 2x`}
                      alt=""
                    />
                    <span>{getShippingCountry(addressCountry).name}</span>
                    <ChevronDown size={17} />
                  </button>
                  {addressCountryMenuOpen && (
                    <div className="account-country-menu" role="listbox" aria-label="Shipping countries">
                      {shippingCountries.map((country) => (
                        <button
                          className={addressCountry === country.name ? 'active' : ''}
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setAddressCountry(country.name)
                            setAddressCountryMenuOpen(false)
                          }}
                          role="option"
                          aria-selected={addressCountry === country.name}
                        >
                          <img
                            src={getFlagImageUrl(country.code)}
                            srcSet={`${getFlagImageUrl(country.code, 80)} 2x`}
                            alt=""
                          />
                          <span>{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <small className="account-country-note">Vietnam is not available for shipping.</small>
              </label>
              <label>
                Phone
                <input name="phone" defaultValue={addressDraft.phone} placeholder="(310) 555-1989" />
              </label>
              <div className="account-address-form-actions">
                <button className="checkout-button" type="submit">
                  {addressEditorMode === 'edit' ? 'Save Address' : 'Create Address'}
                </button>
                <button type="button" onClick={closeAddressEditor}>Cancel</button>
              </div>
            </form>
          </section>
        </div>
      )}

      {profileEditorOpen && customer && (
        <div className="modal-backdrop profile-editor-backdrop" role="presentation" onClick={() => setProfileEditorOpen(false)}>
          <section
            className="profile-editor-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-editor-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Close profile editor" onClick={() => setProfileEditorOpen(false)}>
              <X size={22} />
            </button>
            <p className="receipt-label">Account profile</p>
            <h2 id="profile-editor-title">Edit Profile</h2>
            <form className="profile-editor-form" onSubmit={submitProfileUpdate}>
              <label>
                Full Name
                <input name="name" required defaultValue={customer.name} />
              </label>
              <label>
                Email
                <input name="email" required type="email" defaultValue={customer.email} />
              </label>
              <div className="profile-editor-actions">
                <button className="checkout-button" type="submit">Save Profile</button>
                <button type="button" onClick={() => setProfileEditorOpen(false)}>Cancel</button>
              </div>
            </form>
          </section>
        </div>
      )}

      {detailOrder && (
        <div className="modal-backdrop order-detail-backdrop" role="presentation" onClick={() => setOrderDetailOpen(false)}>
          <section
            className="order-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="order-detail-header">
              <div>
                <p className="receipt-label">Customer receipt</p>
                <h2 id="order-detail-title">Order Detail</h2>
              </div>
              <div className="order-detail-header-actions">
                <span className={`order-detail-status status-${detailOrder.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {detailOrder.status}
                </span>
                <button type="button" aria-label="Close order detail" onClick={() => setOrderDetailOpen(false)}>
                  <X size={20} />
                </button>
              </div>
            </header>

            <div className="order-detail-summary">
              <div className="order-detail-summary-main">
                <FileText size={24} />
                <span>
                  <strong>#{detailOrder.id}</strong>
                  <small>Placed on {detailOrder.date}</small>
                </span>
              </div>
              <div>
                <small>Total</small>
                <strong>{formatPrice(detailOrder.total)}</strong>
              </div>
              <div>
                <small>Payment</small>
                <strong>{detailOrder.payment ?? 'PayPal'}</strong>
              </div>
              <div>
                <small>Fulfillment</small>
                <strong>Printful</strong>
              </div>
            </div>

            <div className="order-detail-body">
              <section className="order-detail-items">
                <div className="order-detail-section-title">
                  Items ({detailOrder.items?.length ?? 0})
                </div>
                <div className="order-detail-item-head">
                  <span>Item</span>
                  <span>Qty</span>
                  <span>Unit Price</span>
                  <span>Total</span>
                </div>
                <div className="order-detail-item-list">
                  {detailOrder.items?.map((item, index) => {
                    const itemName = typeof item === 'string' ? item : item.name
                    const itemQuantity = typeof item === 'string' ? 1 : item.quantity
                    const itemPrice = typeof item === 'string' ? 0 : item.price
                    const lineTotal = itemPrice * itemQuantity

                    return (
                      <div className="order-detail-item-row" key={`${itemName}-${index}`}>
                        <img src={getAccountLineItemImage(item)} alt={itemName} />
                        <div>
                          <strong>{itemName}</strong>
                          <small>{typeof item === 'string' ? 'Demo item' : item.optionSummary}</small>
                        </div>
                        <span>{itemQuantity}</span>
                        <span>{formatPrice(itemPrice)}</span>
                        <b>{formatPrice(lineTotal)}</b>
                      </div>
                    )
                  })}
                </div>
                <div className="order-detail-totals">
                  <span>Subtotal</span>
                  <strong>{formatPrice(detailOrder.subtotal ?? detailOrder.total)}</strong>
                  <span>Discount</span>
                  <strong>{detailOrder.discount ? `-${formatPrice(detailOrder.discount)}` : '$0.00'}</strong>
                  <span>Shipping</span>
                  <strong>{formatPrice(detailOrder.shipping ?? 0)}</strong>
                  <span>Tax</span>
                  <strong>$0.00</strong>
                  <span>Total</span>
                  <strong>{formatPrice(detailOrder.total)}</strong>
                </div>
              </section>

              <aside className="order-detail-delivery">
                <div className="order-detail-section-title">Delivery Information</div>
                <div className="order-detail-info-block">
                  <Mail size={17} />
                  <div>
                    <strong>Shipping Address</strong>
                    <p>{customer.name}<br />123 Nostalgia Lane, Suite 7B<br />Retro City, CA 90210<br />United States</p>
                  </div>
                </div>
                <div className="order-detail-info-block">
                  <Truck size={17} />
                  <div>
                    <strong>Shipping Method</strong>
                    <p>Standard Shipping (Printful)<br />Tracking updates appear after shipment.</p>
                  </div>
                </div>
                <div className="order-detail-info-block">
                  <Package size={17} />
                  <div>
                    <strong>Tracking Number</strong>
                    <p>{detailOrder.tracking}</p>
                    <button type="button" onClick={() => showOrderActionNotice('Tracking demo is ready for production carrier links.')}>
                      Track Package
                    </button>
                  </div>
                </div>
                <div className="order-detail-info-block">
                  <PackageCheck size={17} />
                  <div>
                    <strong>Printful Status</strong>
                    <p>{detailOrder.fulfillment}</p>
                  </div>
                </div>
              </aside>
            </div>

            <section className="order-detail-progress">
              <div className="order-detail-section-title">Order Progress</div>
              <div
                className={`order-detail-timeline order-detail-timeline-${detailOrderProgressTone}`}
                style={{ '--timeline-steps': Math.max(detailOrderProgressTimeline.length, 1) }}
              >
                {detailOrderProgressTimeline.map((step, index) => (
                  <div
                    className={`order-detail-step ${step.done ? 'done' : ''} ${index < detailOrderProgressTimeline.length - 1 ? 'connected' : ''}`}
                    key={`${detailOrder.id}-${step.label}`}
                  >
                    <span><CheckCircle2 size={18} /></span>
                    <strong>{step.label}</strong>
                    <small>{step.detail}</small>
                  </div>
                ))}
              </div>
            </section>

            {orderDetailNotice && <p className="order-detail-notice">{orderDetailNotice}</p>}

            <footer className="order-detail-footer">
              <button className="order-detail-primary" type="button" onClick={() => reorderAccountOrder(detailOrder)}>
                <RefreshCcw size={17} /> Reorder
              </button>
              <button type="button" onClick={() => showOrderActionNotice('Tracking demo is ready for production carrier links.')}>
                <Truck size={17} /> Track Package
              </button>
              <button type="button" onClick={() => {
                setOrderDetailOpen(false)
                navigateToAccount('support')
              }}>
                <Mail size={17} /> Contact Support
              </button>
              <button type="button" onClick={() => downloadOrderReceipt(detailOrder)}>
                <Download size={17} /> Download Receipt
              </button>
              <button type="button" onClick={() => setOrderDetailOpen(false)}>Close</button>
            </footer>
          </section>
        </div>
      )}

      {selectedImageInfo && (
        <div className="modal-backdrop image-info-backdrop" role="presentation" onClick={() => setSelectedImageInfo(null)}>
          <section
            className="image-info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-info-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close image information"
              onClick={() => setSelectedImageInfo(null)}
            >
              <X size={22} />
            </button>
            <div className={`image-info-preview image-info-preview--${selectedImageInfo.imageUse}`}>
              <img src={selectedImageInfo.image} alt={selectedImageInfo.name} />
            </div>
            <div className="image-info-copy">
              <Image size={28} />
              <p className="receipt-label">{selectedImageInfo.context}</p>
              <h2 id="image-info-title">{selectedImageInfo.name}</h2>
              <div className="image-info-grid">
                <span>
                  <small>Category</small>
                  <strong>{selectedImageInfo.category ?? 'Bundle'}</strong>
                </span>
                <span>
                  <small>Display ratio</small>
                  <strong>{imageUseMeta[selectedImageInfo.imageUse]?.ratio ?? imageUseMeta.product.ratio}</strong>
                </span>
                <span>
                  <small>Background</small>
                  <strong>{imageUseMeta[selectedImageInfo.imageUse]?.treatment ?? imageUseMeta.product.treatment}</strong>
                </span>
                <span>
                  <small>SKU</small>
                  <strong>{selectedImageInfo.sku ?? selectedImageInfo.id}</strong>
                </span>
              </div>
              <p>
                {imageUseMeta[selectedImageInfo.imageUse]?.note ?? imageUseMeta.product.note}
              </p>
              <div className="detail-actions">
                <button className="secondary-button" type="button" onClick={() => setSelectedImageInfo(null)}>
                  Close
                </button>
                {selectedImageInfo.category && (
                  <button
                    className="checkout-button"
                    type="button"
                    onClick={() => {
                      setSelectedImageInfo(null)
                      openProductDetail(selectedImageInfo)
                    }}
                  >
                    View Product
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {checkoutOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <button className="modal-close" type="button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}>
              <X size={22} />
            </button>
            {checkoutDone ? (
              <div className="success-state">
                <CheckCircle2 size={48} />
                <h2 id="checkout-title">Order received</h2>
                <p>Your order request is saved to the customer dashboard. No real payment or Printful order was created.</p>
                <div className="success-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutOpen(false)
                      setCartOpen(false)
                    }}
                  >
                    Back to Shop
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutOpen(false)
                      setCartOpen(false)
                      openAccountDashboard('orders')
                    }}
                  >
                    View Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitCheckout}>
                <p className="receipt-label">Secure checkout</p>
                <h2 id="checkout-title">Shipping Details</h2>
                <p className="checkout-note">Enter the shipping details for your made-to-order items.</p>
                <div className="form-grid">
                  <label>
                    Full name
                    <input name="name" required placeholder="Marty McFly" />
                  </label>
                  <label>
                    Email
                    <input name="email" required type="email" placeholder="marty@example.com" />
                  </label>
                  <label className="wide">
                    Address
                    <input name="address" required placeholder="1989 Supply Street" />
                  </label>
                  <label>
                    City
                    <input name="city" required placeholder="Hill Valley" />
                  </label>
                  <label>
                    ZIP
                    <input name="zip" required inputMode="numeric" placeholder="90089" />
                  </label>
                  <label className="wide">
                    Order note
                    <span className="card-input card-input--note">
                      <CreditCard size={18} />
                      <textarea placeholder="Size, color, or delivery note" rows="3" />
                    </span>
                  </label>
                </div>
                <section className="payment-box" aria-label="Payment method">
                  <div className="payment-box-head">
                    <div>
                      <p className="receipt-label">Payment</p>
                      <h3>Pay with PayPal</h3>
                    </div>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                  <div className="payment-methods" role="radiogroup" aria-label="Choose payment method">
                    <button
                      className={paymentMethod === 'paypal' ? 'active' : ''}
                      type="button"
                      role="radio"
                      aria-checked={paymentMethod === 'paypal'}
                      onClick={() => {
                        setPaymentMethod('paypal')
                        setPaypalDemoState('idle')
                      }}
                    >
                      <Wallet size={18} />
                      PayPal
                    </button>
                  </div>
                  <div className={`paypal-demo-panel paypal-demo-panel--${paypalDemoState}`}>
                    <div>
                      <strong>PayPal checkout</strong>
                      <p>Continue to PayPal to review and approve your payment.</p>
                    </div>
                    <button
                      className="paypal-demo-button"
                      type="button"
                      onClick={() => setPaypalDemoState('approved')}
                    >
                      {paypalDemoState === 'approved' ? 'PayPal Approved' : 'Continue with PayPal'}
                    </button>
                  </div>
                  {paypalDemoState === 'required' && (
                    <p className="payment-warning">Please approve PayPal before placing the order.</p>
                  )}
                </section>
                <div className="review-box">
                  <CreditCard size={20} />
                  <span>Review total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <button className="checkout-button" type="submit">
                  Place Order
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default App
