import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  History,
  Home,
  Image,
  LogIn,
  LogOut,
  Mail,
  Minus,
  Package,
  Plus,
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
import introVideo from './assets/intro/dreaming-1989-intro.mp4'
import dreaming1989LogoImage from './assets/header/dreaming-1989-logo-alpha.png'
import vhsCassetteHeaderImage from './assets/header/vhs-cassette-header.png'
import mallWeekendImage from './assets/mall-weekend.png'
import videoStoreImage from './assets/video-store-night.png'
import arcadeDepartmentImage from './assets/departments/arcade-department.png'
import audioDepartmentImage from './assets/departments/audio-department.png'
import kitchenDepartmentImage from './assets/departments/kitchen-department.png'
import wallArtDepartmentImage from './assets/departments/wall-art-department.png'
import snackBowlSetFeatureImage from './assets/featured/snack-bowl-set-feature.png'
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
import vhsCalendarImage from './assets/products-cutout/vhs-calendar.png'
import videoNightSignImage from './assets/products-cutout/video-night-sign.png'
import retroCartImage from './assets/ui/retro-cart.png'
import RevenueDashboard from './RevenueDashboard.jsx'
import './App.css'

const categories = ['All', 'Apparel', 'Bags', 'Drinkware', 'Wall Art', 'Stationery', 'Home Goods']

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
const visitorStorageKey = 'dreaming-1989-visitor'

const demoCustomerOrders = [
  {
    id: '1989-0529',
    date: 'May 29, 2026',
    status: 'In production',
    total: 64,
    items: [
      { name: 'Rewind Club Tee', quantity: 1, price: 30, optionSummary: 'Size: M / Color: Washed Black / Fit: Classic' },
      { name: 'Rewind Sticker Pack', quantity: 1, price: 16 },
    ],
    subtotal: 46,
    discount: 0,
    shipping: 7.95,
    fulfillment: 'Printful draft ready',
    tracking: 'Preparing label',
    timeline: [
      { label: 'Order received', detail: 'Demo checkout captured and saved to customer dashboard.', done: true },
      { label: 'Printful review', detail: 'Order payload is waiting for human approval before fulfillment.', done: true },
      { label: 'In production', detail: 'Print file and product variant are queued for production.', done: true },
      { label: 'Shipped', detail: 'Carrier tracking appears here after Printful ships.', done: false },
    ],
  },
  {
    id: '1989-0517',
    date: 'May 17, 2026',
    status: 'Delivered',
    total: 42,
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
]

const formatOrderItems = (items) =>
  items.map((item) => (typeof item === 'string' ? item : `${item.quantity ?? 1}x ${item.name}`)).join(', ')

const getStoredCustomer = () => {
  try {
    const savedCustomer = window.localStorage.getItem('dreaming-1989-customer')
    return savedCustomer ? JSON.parse(savedCustomer) : null
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

const getStoredVisitorExperience = () => {
  try {
    const forceIntro = window.location.hash === '#intro' || new URLSearchParams(window.location.search).has('intro')
    const savedVisitor = window.localStorage.getItem(visitorStorageKey)
    const savedCustomer = window.localStorage.getItem('dreaming-1989-customer')
    const hasVisited = Boolean(savedCustomer) || Boolean(savedVisitor && JSON.parse(savedVisitor)?.hasVisited)

    return {
      hasVisited,
      showOnboarding: forceIntro || !hasVisited,
      showReturnCue: !forceIntro && hasVisited,
    }
  } catch {
    return {
      hasVisited: false,
      showOnboarding: true,
      showReturnCue: false,
    }
  }
}

const saveVisitorExperience = () => {
  try {
    window.localStorage.setItem(
      visitorStorageKey,
      JSON.stringify({
        hasVisited: true,
        lastVisit: new Date().toISOString(),
      }),
    )
  } catch {
    // Visitor recognition is a progressive enhancement.
  }
}

function App() {
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
  const [supportMenuOpen, setSupportMenuOpen] = useState(false)
  const [supportMenuPosition, setSupportMenuPosition] = useState({ top: 0, left: 0 })
  const [cartExpanded, setCartExpanded] = useState(false)
  const [accountTab, setAccountTab] = useState('orders')
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [supportDraftType, setSupportDraftType] = useState('Tracking question')
  const [visitorExperience, setVisitorExperience] = useState(() => getStoredVisitorExperience())
  const [memoryEntered, setMemoryEntered] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedImageInfo, setSelectedImageInfo] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [customer, setCustomer] = useState(() => getStoredCustomer())
  const [cart, setCart] = useState([
    { id: 'rewind-sticker-pack', name: 'Rewind Sticker Pack', price: 16, image: productImages.stickerPack, quantity: 1 },
  ])
  const cartButtonRef = useRef(null)
  const floatingCartButtonRef = useRef(null)
  const supportButtonRef = useRef(null)
  const flyTimerRef = useRef(null)
  const noticeTimerRef = useRef(null)
  const cartFeedbackCounterRef = useRef(0)
  const visitorCueTimerRef = useRef(null)

  useEffect(() => {
    if (visitorExperience.showOnboarding) return undefined

    const slideTimer = window.setInterval(() => {
      setHeroSlideIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
    }, 5200)

    return () => window.clearInterval(slideTimer)
  }, [visitorExperience.showOnboarding])

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
      setActiveRoute('home')
    }

    syncRoute()
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    return () => {
      if (flyTimerRef.current) window.clearTimeout(flyTimerRef.current)
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current)
      if (visitorCueTimerRef.current) window.clearTimeout(visitorCueTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!visitorExperience.showReturnCue) return undefined

    visitorCueTimerRef.current = window.setTimeout(() => {
      setVisitorExperience((currentExperience) => ({
        ...currentExperience,
        showReturnCue: false,
      }))
    }, 2800)

    return () => {
      if (visitorCueTimerRef.current) window.clearTimeout(visitorCueTimerRef.current)
    }
  }, [visitorExperience.showReturnCue])

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
  const activePolicyRoute = activeRoute === 'home' ? null : activePolicy
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
  const featuredDropImage = featuredDrop.image
  const customerOrders = customer?.orders?.length ? customer.orders : demoCustomerOrders
  const selectedAccountOrder =
    customerOrders.find((order) => order.id === selectedOrderId) ?? customerOrders[0] ?? demoCustomerOrders[0]
  const activeOrderCount = customerOrders.filter((order) => order.status !== 'Delivered').length
  const deliveredOrderCount = customerOrders.length - activeOrderCount

  const openProductDetail = (product) => {
    setSelectedProduct(product)
    setSelectedOptions(getDefaultOptions(product))
  }

  const openImageInfo = (item, context = 'Product image', imageUse = item.imageUse ?? 'product') => {
    setSelectedImageInfo({
      ...item,
      context,
      imageUse,
    })
  }

  const openPolicy = (policyId) => {
    const policy = policyCards.find((item) => item.id === policyId)
    if (!policy) return
    window.history.pushState(null, '', `#/${policy.path}`)
    window.dispatchEvent(new Event('hashchange'))
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

  const enterMemoryMarket = useCallback(() => {
    saveVisitorExperience()
    window.scrollTo(0, 0)
    if (window.location.hash === '#intro' || window.location.search.includes('intro')) {
      window.history.replaceState(null, '', window.location.pathname || '/')
    }
    setHeroSlideIndex(0)
    setMemoryEntered(true)
    setVisitorExperience({
      hasVisited: true,
      showOnboarding: false,
      showReturnCue: false,
    })
  }, [])

  useEffect(() => {
    if (!visitorExperience.showOnboarding) return undefined
    window.scrollTo(0, 0)

    const introTimer = window.setTimeout(() => {
      enterMemoryMarket()
    }, 11200)

    return () => window.clearTimeout(introTimer)
  }, [enterMemoryMarket, visitorExperience.showOnboarding])

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
      quantity: 1,
    }
    setCart((currentCart) => {
      const existing = currentCart.find((cartItem) => cartItem.id === product.id)
      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
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
    }, event)
    setSelectedProduct(null)
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
    setAccountTab(tab)
    setSelectedOrderId((currentId) => currentId ?? customerOrders[0]?.id ?? demoCustomerOrders[0]?.id)
    setAccountOpen(true)
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
    }

    setCustomer(nextCustomer)
    saveStoredCustomer(nextCustomer)
    setAccountTab('orders')
    setSelectedOrderId(nextCustomer.orders[0]?.id ?? null)
    setAuthOpen(false)
    setAccountOpen(true)
  }

  const logoutCustomer = () => {
    setCustomer(null)
    saveStoredCustomer(null)
    setAccountOpen(false)
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
    <div className={`shop-app${memoryEntered || visitorExperience.showOnboarding ? ' memory-entered' : ''}`}>
      {visitorExperience.showOnboarding && (
        <div className="memory-onboarding-backdrop" role="presentation">
          <section
            className="memory-onboarding"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-onboarding-title"
          >
            <div className="memory-onboarding-scene" aria-hidden="true">
              <video
                className="memory-entry-video"
                autoPlay
                muted
                playsInline
                preload="auto"
                poster={heroMemoryLaneImage}
              >
                <source src={introVideo} type="video/mp4" />
              </video>
            </div>
            <div className="memory-intro-brand" aria-hidden="true">
              <span>Dreaming in 1989</span>
            </div>
            <div className="memory-onboarding-copy">
              <p className="receipt-label">Memory lane is opening</p>
              <h2 id="memory-onboarding-title">Good times are back on the shelf.</h2>
              <p>Opening memory lane...</p>
              <div className="memory-entry-progress" aria-hidden="true">
                <span />
              </div>
            </div>
            <div className="memory-welcome" aria-hidden="true">Welcome</div>
            <button className="memory-skip-button" type="button" onClick={enterMemoryMarket}>
              Skip intro
              <ChevronRight size={16} />
            </button>
          </section>
        </div>
      )}

      {visitorExperience.showReturnCue &&
        !visitorExperience.showOnboarding &&
        !accountOpen &&
        !authOpen &&
        !checkoutOpen &&
        !selectedProduct && (
        <div className="returning-memory-ticket" role="status">
          <span>Welcome back</span>
          <strong>Your memory lane is still open.</strong>
        </div>
      )}

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
                <button className="logout-button" type="button" onClick={logoutCustomer}>
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
          <a href="#products">Aisles</a>
          <a href="#new-arrivals">New Drops</a>
          <a href="#collections">Bundles</a>
          <a href="#featured">Spotlight</a>
          <a href="#products">Best Sellers</a>
          <a href="#deals">Gift Counter</a>
          <a href="#gift-guide">Shelf Sets</a>
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
                  <small>{policy.label}</small>
                </button>
              ))}
              <a href="#footer" role="menuitem" onClick={() => setSupportMenuOpen(false)}>
                <span>Support Email</span>
                <small>Store footer details</small>
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
                href="#products"
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setQuery('')
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

      {authOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setAuthOpen(false)}>
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Close sign in" onClick={() => setAuthOpen(false)}>
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

      {accountOpen && customer && (
        <div className="modal-backdrop" role="presentation" onClick={() => setAccountOpen(false)}>
          <section
            className="account-modal account-dashboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Close account" onClick={() => setAccountOpen(false)}>
              <X size={22} />
            </button>
            <div className="account-head">
              <div>
                <p className="receipt-label">My account</p>
                <h2 id="account-title">{customer.name}</h2>
                <p>{customer.email}</p>
              </div>
              <div className="account-stamp">Customer</div>
            </div>
            <div className="account-summary-grid">
              <span>
                <Mail size={18} />
                Account email
                <small>{customer.email}</small>
              </span>
              <span>
                <History size={18} />
                {customerOrders.length} orders
                <small>{activeOrderCount} active</small>
              </span>
              <span>
                <Package size={18} />
                Joined {customer.joined}
                <small>{deliveredOrderCount} delivered</small>
              </span>
            </div>
            <div className="account-tabs" role="tablist" aria-label="Customer dashboard sections">
              {[
                ['orders', 'My Orders'],
                ['tracking', 'Tracking'],
                ['support', 'Support'],
              ].map(([tabId, label]) => (
                <button
                  className={accountTab === tabId ? 'active' : ''}
                  key={tabId}
                  type="button"
                  role="tab"
                  aria-selected={accountTab === tabId}
                  onClick={() => setAccountTab(tabId)}
                >
                  {label}
                </button>
              ))}
            </div>

            {accountTab === 'orders' && (
              <div className="customer-dashboard-grid">
                <div className="order-history">
                  <div className="account-section-heading">
                    <h3>My Orders</h3>
                    <small>Recent activity</small>
                  </div>
                  {customerOrders.map((order) => (
                    <button
                      className={`order-card ${selectedAccountOrder?.id === order.id ? 'active' : ''}`}
                      key={order.id}
                      type="button"
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <div>
                        <strong>#{order.id}</strong>
                        <span>{order.date} / {order.status}</span>
                        <small>{formatOrderItems(order.items)}</small>
                      </div>
                      <em>{formatPrice(order.total)}</em>
                    </button>
                  ))}
                </div>

                <section className="order-detail-panel" aria-label="Selected order details">
                  <div className="account-section-heading">
                    <h3>Order Detail</h3>
                    <small>{selectedAccountOrder.status}</small>
                  </div>
                  <div className="order-detail-receipt">
                    <div>
                      <span>Order</span>
                      <strong>#{selectedAccountOrder.id}</strong>
                    </div>
                    <div>
                      <span>Total</span>
                      <strong>{formatPrice(selectedAccountOrder.total)}</strong>
                    </div>
                    <div>
                      <span>Fulfillment</span>
                      <strong>{selectedAccountOrder.fulfillment ?? 'Printful demo flow'}</strong>
                    </div>
                    <div>
                      <span>Tracking</span>
                      <strong>{selectedAccountOrder.tracking ?? 'Pending shipment'}</strong>
                    </div>
                  </div>
                  <div className="order-line-items">
                    {(selectedAccountOrder.items ?? []).map((item) => (
                      <div className="order-line-item" key={`${selectedAccountOrder.id}-${typeof item === 'string' ? item : item.name}`}>
                        <span>{typeof item === 'string' ? item : `${item.quantity ?? 1}x ${item.name}`}</span>
                        <strong>{typeof item === 'string' ? 'Saved item' : formatPrice((item.price ?? 0) * (item.quantity ?? 1))}</strong>
                        {typeof item !== 'string' && item.optionSummary && <small>{item.optionSummary}</small>}
                      </div>
                    ))}
                  </div>
                  <div className="order-timeline">
                    {(selectedAccountOrder.timeline ?? []).map((step) => (
                      <div className={`timeline-step ${step.done ? 'done' : ''}`} key={`${selectedAccountOrder.id}-${step.label}`}>
                        <span>{step.done ? <CheckCircle2 size={16} /> : <Package size={16} />}</span>
                        <div>
                          <strong>{step.label}</strong>
                          <small>{step.detail}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {accountTab === 'tracking' && (
              <section className="tracking-panel">
                <div className="account-section-heading">
                  <h3>Tracking Center</h3>
                  <small>Demo statuses</small>
                </div>
                {customerOrders.map((order) => (
                  <article className="tracking-card" key={`tracking-${order.id}`}>
                    <Truck size={22} />
                    <div>
                      <strong>#{order.id}</strong>
                      <span>{order.status}</span>
                      <small>{order.tracking ?? 'Tracking appears after Printful ships.'}</small>
                    </div>
                    <button type="button" onClick={() => {
                      setSelectedOrderId(order.id)
                      setAccountTab('orders')
                    }}>
                      View
                    </button>
                  </article>
                ))}
              </section>
            )}

            {accountTab === 'support' && (
              <section className="support-panel">
                <div className="account-section-heading">
                  <h3>Support Desk</h3>
                  <small>Refund / tracking / address help</small>
                </div>
                <div className="support-grid">
                  <div className="support-ticket-preview">
                    <p className="receipt-label">Draft ticket</p>
                    <h4>{supportDraftType}</h4>
                    <p>Order #{selectedAccountOrder.id}</p>
                    <small>
                      This is a dashboard demo. It prepares the support request shape without sending email or creating a supplier claim.
                    </small>
                  </div>
                  <form className="support-form">
                    <label>
                      Issue type
                      <select value={supportDraftType} onChange={(event) => setSupportDraftType(event.target.value)}>
                        <option>Tracking question</option>
                        <option>Address change</option>
                        <option>Damaged or misprinted item</option>
                        <option>Refund request</option>
                      </select>
                    </label>
                    <label>
                      Order
                      <select value={selectedAccountOrder.id} onChange={(event) => setSelectedOrderId(event.target.value)}>
                        {customerOrders.map((order) => (
                          <option key={`support-${order.id}`} value={order.id}>#{order.id}</option>
                        ))}
                      </select>
                    </label>
                    <label className="wide">
                      Message
                      <textarea rows="4" placeholder="Tell us what happened. Add photos before a real claim." />
                    </label>
                    <button className="checkout-button" type="button">
                      Save Draft Request
                    </button>
                  </form>
                </div>
              </section>
            )}

            <div className="account-actions">
              <button className="secondary-button" type="button" onClick={() => setAccountOpen(false)}>
                Back to Shop
              </button>
              <button className="checkout-button" type="button" onClick={logoutCustomer}>
                Logout
              </button>
            </div>
          </section>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-backdrop product-detail-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}>
          <section
            className="product-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close product details"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={22} />
            </button>
            <div className="product-detail-media">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <span>{selectedProduct.tag}</span>
            </div>
            <div className="product-detail-info">
              <p className="receipt-label">{selectedProduct.category}</p>
              <h2 id="product-detail-title">{selectedProduct.name}</h2>
              <p>{selectedProduct.shortDetail}</p>
              <div className="detail-meta">
                <span>{selectedProduct.sku}</span>
                <span>{selectedProduct.stockState === 'low-stock' ? 'Low stock' : selectedProduct.stockState}</span>
              </div>

              <div className="detail-price-row">
                <span>Configured price</span>
                <strong>{formatPrice(selectedVariantPrice)}</strong>
              </div>

              <div className="option-stack">
                {selectedOptionGroups.map((group) => (
                  <fieldset className="option-group" key={group.name}>
                    <legend>{group.name}</legend>
                    <div>
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

              <div className="selected-variant">
                <span>Selected</span>
                <strong>{selectedVariantSummary}</strong>
              </div>

              <div className="detail-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                >
                  Keep Browsing
                </button>
                <button
                  className="checkout-button"
                  type="button"
                  disabled={selectedProduct.stockState === 'sold-out'}
                  onClick={addSelectedProductToCart}
                >
                  {selectedProduct.stockState === 'sold-out' ? 'Sold Out' : 'Add to Cart'}
                </button>
              </div>
            </div>
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
