import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
  Lock,
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
import arcadeDepartmentImage from './assets/departments/arcade-department.png'
import audioDepartmentImage from './assets/departments/audio-department.png'
import kitchenDepartmentImage from './assets/departments/kitchen-department.png'
import mugCategoryImage from './assets/departments/mug-category.png'
import phoneCaseCategoryImage from './assets/departments/phone-case-category.png'
import stickerCategoryImage from './assets/departments/sticker-category.png'
import tShirtCategoryImage from './assets/departments/t-shirt-category.png'
import wallArtDepartmentImage from './assets/departments/wall-art-department.png'
import deskGiftsLineupImage from './assets/gift-counter/desk-gifts-lineup-v2.png'
import partyNightLineupImage from './assets/gift-counter/party-night-lineup-v2.png'
import shelfDecorLineupImage from './assets/gift-counter/shelf-decor-lineup-v2.png'
import under25LineupImage from './assets/gift-counter/under-25-lineup-v2.png'
import albumWallPrintImage from './assets/products-cutout/album-wall-print.png'
import arcadePosterImage from './assets/products-cutout/arcade-poster.png'
import dinerMugImage from './assets/products-cutout/diner-mug-transparent-mockup.jpg'
import dinerTrayImage from './assets/products-cutout/diner-tray.png'
import rewindTeeLifestyleImage from './assets/products-cutout/rewind-tee-lifestyle.png'
import dinerMugLifestyleImage from './assets/products-cutout/diner-mug-lifestyle.png'
import vhsCalendarImage from './assets/products-cutout/vhs-calendar.png'
import videoNightSignImage from './assets/products-cutout/video-night-sign.png'
import foodCourtPosterGeneratedImage from './assets/pdp-generated/food-court-poster-generated.png'
import mallRunDadHatGeneratedImage from './assets/pdp-generated/mall-run-dad-hat-generated.png'
import mallWeekendHoodieFrontImage from './assets/pdp-generated/mall-weekend-hoodie-front.png'
import mallWeekendHoodieLifestyleImage from './assets/pdp-generated/mall-weekend-hoodie-lifestyle.png'
import mallWeekendHoodiePrintDetailImage from './assets/pdp-generated/mall-weekend-hoodie-print-detail.png'
import mallWeekendToteGeneratedImage from './assets/pdp-generated/mall-weekend-tote-generated.png'
import backInTheDayMallReferenceImage from './assets/pdp-generated/back-in-the-day-mall-reference.png'
import goodTimesStampImage from './assets/pdp-generated/good-times-stamp-generated.png'
import rewindClubTeeGeneratedImage from './assets/pdp-generated/rewind-club-tee-generated.png'
import rewindStickerPackGeneratedImage from './assets/pdp-generated/rewind-sticker-pack-generated.png'
import varsityHoodieGeneratedImage from './assets/pdp-generated/varsity-hoodie-generated.png'
import authCreateAccountImage from './assets/auth/auth-create-account-desk.png'
import authSignInImage from './assets/auth/auth-sign-in-video-counter.png'
import retroCartImage from './assets/ui/retro-cart.png'
import RevenueDashboard from './RevenueDashboard.jsx'
import PurchaseReviewForm from './PurchaseReviewForm.jsx'
import {
  bundles as generatedBundles,
  featuredDropProduct as generatedFeaturedDropProduct,
  newArrivalIds as generatedNewArrivalIds,
  productDetailExperiences as generatedProductDetailExperiences,
  products as generatedProducts,
  shelfReadySets as generatedShelfReadySets,
} from './data/catalog.js'
import { isSupabaseConfigured, supabase } from './lib/supabaseClient.js'
import {
  getReviewPurchaseKey,
  getReviewStars,
  getReviewableOrderItems,
  isOrderReviewEligible,
  mapProductReview,
} from './lib/productReviews.js'
import {
  createDemoProductReviews,
  getAverageReviewRating,
  getReviewDistribution,
  mergeProductReviews,
} from './lib/demoProductReviews.js'
import './App.css'

const categories = ['All', 'Phone Case', 'Mug', 'T Shirt', 'Sticker']
const collectionSortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest']
const collectionAvailabilityOptions = ['All', 'In Stock', 'Low Stock']

const getCategorySlug = (category) => category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const getCategoryFromSlug = (slug) =>
  categories.find((category) => getCategorySlug(category) === slug) ?? 'All'

const getProductPath = (product) => `#/products/${product.id}`

const paymentBadges = [
  { id: 'visa', label: 'Visa', mark: 'VISA' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex', label: 'American Express', mark: 'AMEX' },
  { id: 'apple-pay', label: 'Apple Pay', mark: 'Pay' },
  { id: 'google-pay', label: 'Google Pay', mark: 'Pay' },
  { id: 'paypal', label: 'PayPal', mark: 'PayPal' },
]

function PaymentBadges() {
  return (
    <div className="pay-badges" aria-label="Accepted payments">
      {paymentBadges.map((payment) => (
        <span className={`payment-badge payment-badge--${payment.id}`} key={payment.id} aria-label={payment.label}>
          <span className="payment-badge-mark" aria-hidden="true">
            {payment.mark && <span>{payment.mark}</span>}
          </span>
        </span>
      ))}
    </div>
  )
}

const accountRouteBase = '/my-account'
const accountRouteTabs = new Set(['dashboard', 'orders', 'addresses', 'payments', 'wishlist', 'settings', 'support'])
const signInPath = '/sign-in'
const createAccountPath = '/create-account'
const forgotPasswordPath = '/forgot-password'
const resetPasswordPath = '/reset-password'
const orderFilterTabs = ['All', 'Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled']
const defaultOrderDateRange = { start: '2020-12-01', end: new Date().toISOString().split('T')[0] }

const getPasswordStrength = (password) => {
  const value = String(password)
  const checks = [
    value.length >= 8,
    /[a-z]/.test(value),
    /[A-Z]/.test(value),
    /\d/.test(value),
    /[^A-Za-z0-9]/.test(value),
  ]
  const score = checks.filter(Boolean).length
  const hasEnoughVariety = checks.slice(1).filter(Boolean).length >= 3
  const isAcceptable = checks[0] && hasEnoughVariety

  if (!value) {
    return {
      label: 'Password check',
      message: 'Use 8+ characters with mixed letters, numbers, and a symbol.',
      percent: 0,
      score,
      tone: 'idle',
      isAcceptable: false,
    }
  }

  if (!checks[0]) {
    return {
      label: 'Too short',
      message: 'Add at least 8 characters before creating the account.',
      percent: 22,
      score,
      tone: 'weak',
      isAcceptable: false,
    }
  }

  if (!isAcceptable) {
    return {
      label: score >= 3 ? 'Almost there' : 'Weak password',
      message: 'Mix uppercase, lowercase, numbers, and symbols for a stronger password.',
      percent: Math.max(36, score * 18),
      score,
      tone: score >= 3 ? 'fair' : 'weak',
      isAcceptable: false,
    }
  }

  return {
    label: score >= 5 ? 'Strong password' : 'Good password',
    message: score >= 5 ? 'Nice. This has strong variety.' : 'Good. Add a symbol or extra variety to make it stronger.',
    percent: score >= 5 ? 100 : 82,
    score,
    tone: score >= 5 ? 'strong' : 'good',
    isAcceptable: true,
  }
}

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
  rewindTee: rewindClubTeeGeneratedImage,
  rewindHoodie: mallWeekendHoodieFrontImage,
  varsityHoodie: varsityHoodieGeneratedImage,
  mallRunDadHat: mallRunDadHatGeneratedImage,
  mallTote: mallWeekendToteGeneratedImage,
  dinerMug: dinerMugImage,
  arcadePoster: arcadePosterImage,
  foodCourtPoster: foodCourtPosterGeneratedImage,
  stickerPack: rewindStickerPackGeneratedImage,
  deskCalendar: vhsCalendarImage,
  notebook: videoNightSignImage,
  coasterSet: dinerTrayImage,
  wallCanvas: albumWallPrintImage,
}

const getInitialProductImageIndex = () => 0

const products = generatedProducts

const defaultPdpExperience = {
  tone: 'archive',
  orderLabel: '1989 Supply Co. Mail Order',
  storyTitle: 'Back In The Day',
  storyBody:
    'A small piece of the old mall weekend: warm lights, taped receipts, display racks, and the feeling that one good find could carry the whole week.',
  storyBullets: ['Made after order', 'Retro artwork with modern print quality', 'Easy gift-ready shelf piece', 'Designed for everyday use'],
  careRows: [
    ['Production', 'Made to order for US delivery'],
    ['Best For', 'Gifts, rooms, desks, weekend outfits, and memory corners'],
  ],
  proofCards: [
    { Icon: PackageCheck, label: 'Made fresh', value: 'Printed after checkout', detail: 'No dusty warehouse blanks.' },
    { Icon: ShieldCheck, label: 'Checked file', value: 'Artwork reviewed', detail: 'Sharp print handoff.' },
    { Icon: Truck, label: 'Tracked ship', value: '2-4 day production', detail: 'Tracking after shipment.' },
  ],
  lookbook: [
    [mallWeekendImage, 'Weekend at the mall'],
    [videoStoreImage, 'Friday night video run'],
    [arcadeDepartmentImage, 'Neon arcade corner'],
    [audioDepartmentImage, 'Tape deck and headphones'],
  ],
  reviews: [
    ['Perfect throwback vibe', 'The print is clean, nostalgic, and feels like a real shelf find from an old mall store.', 'Jason R.'],
    ['Better than expected', 'The piece feels giftable right away and the visual style is exactly the retro mood I wanted.', 'Melissa T.'],
    ['Instant conversation starter', 'Friends noticed it immediately. Shipping was smooth and the packaging felt considered.', 'Tyler W.'],
  ],
  faqs: [
    [Truck, 'Shipping', 'When will my order arrive?', 'Made to order in 2-4 business days, then shipped with tracking.'],
    [RefreshCcw, 'Returns', 'What is your return policy?', 'Return and claim rules depend on whether the item is damaged, defective, incorrect, or misprinted.'],
    [Package, 'Sizing', 'How do I choose options?', 'Pick the size, finish, frame, or pack option shown above before adding to cart.'],
    [Lock, 'Care', 'How do I keep it looking good?', 'Follow the product care note above and avoid harsh heat on printed surfaces.'],
  ],
  bundleEyebrow: 'Complete The Memory Kit',
  bundleHeadline: 'Complete the Retro Set.',
  bundleBadge: 'Bundle & save 12%',
}

const categoryPdpExperiences = {
  'T Shirt': {
    tone: 'apparel',
    storyBullets: ['Soft everyday blank', 'Vintage mall graphic energy', 'Unisex fit', 'Easy outfit anchor'],
    careRows: [
      ['Material', 'Soft cotton blend selected for daily wear'],
      ['Care', 'Machine wash cold, tumble dry low'],
    ],
    faqs: [
      [Truck, 'Shipping', 'When will apparel ship?', 'Each piece is printed after checkout, usually produced in 2-4 business days before carrier transit.'],
      [Package, 'Sizing', 'How does it fit?', 'Classic true-to-size fit. Size up for a looser weekend look.'],
      [RefreshCcw, 'Returns', 'Can I return the wrong size?', 'Made-to-order sizing mistakes are not automatic claims, so check the option before checkout.'],
      [Lock, 'Care', 'How should I wash it?', 'Wash cold inside out and tumble dry low to protect the print.'],
    ],
  },
  Mug: {
    tone: 'diner',
    storyBullets: ['Glossy counter-ready ceramic', 'Desk and breakfast-table friendly', 'Small gift price point', 'Print wraps cleanly on the mug'],
    careRows: [
      ['Use', 'Coffee, tea, cocoa, and desk refills'],
      ['Care', 'Hand wash recommended for longest print life'],
    ],
  },
  Sticker: {
    tone: 'paper',
    storyBullets: ['Desk-friendly nostalgia', 'Small giftable add-on', 'Useful daily object', 'Pairs well with mugs and shirts'],
    careRows: [
      ['Use', 'Laptop lids, bottles, notebooks, and memory corners'],
      ['Gift Fit', 'Easy under-$30 checkout add-on'],
    ],
  },
  'Phone Case': {
    tone: 'archive',
    storyBullets: ['Everyday protective accessory', 'Retro artwork with daily carry energy', 'Easy gift-ready add-on', 'Designed for phone-case drops'],
    careRows: [
      ['Use', 'Daily phone carry and retro shelf styling'],
      ['Best For', 'Gifts, phone upgrades, and matching merch sets'],
    ],
  },
  Apparel: {
    tone: 'apparel',
    storyBullets: ['Soft everyday blank', 'Vintage mall graphic energy', 'Unisex fit', 'Easy outfit anchor'],
    careRows: [
      ['Material', 'Soft cotton blend selected for daily wear'],
      ['Care', 'Machine wash cold, tumble dry low'],
    ],
    faqs: [
      [Truck, 'Shipping', 'When will apparel ship?', 'Each piece is printed after checkout, usually produced in 2-4 business days before carrier transit.'],
      [Package, 'Sizing', 'How does it fit?', 'Classic true-to-size fit. Size up for a looser weekend look.'],
      [RefreshCcw, 'Returns', 'Can I return the wrong size?', 'Made-to-order sizing mistakes are not automatic claims, so check the option before checkout.'],
      [Lock, 'Care', 'How should I wash it?', 'Wash cold inside out and tumble dry low to protect the print.'],
    ],
  },
  Bags: {
    tone: 'carry',
    storyBullets: ['Heavy daily canvas feel', 'Room for small errands', 'Flat retro print area', 'Giftable under-$25 pick'],
    careRows: [
      ['Material', 'Canvas tote body with printed retro artwork'],
      ['Best For', 'Books, records, groceries, and weekend market runs'],
    ],
  },
  Drinkware: {
    tone: 'diner',
    storyBullets: ['Glossy counter-ready ceramic', 'Desk and breakfast-table friendly', 'Small gift price point', 'Print wraps cleanly on the mug'],
    careRows: [
      ['Use', 'Coffee, tea, cocoa, and desk refills'],
      ['Care', 'Hand wash recommended for longest print life'],
    ],
  },
  'Wall Art': {
    tone: 'wall',
    storyBullets: ['Instant room mood', 'Retro color story', 'Easy studio upgrade', 'Pairs well with shelf goods'],
    careRows: [
      ['Finish', 'Printed wall decor with archive-style color'],
      ['Best For', 'Bedrooms, studios, offices, and listening corners'],
    ],
  },
  Stationery: {
    tone: 'paper',
    storyBullets: ['Desk-friendly nostalgia', 'Small giftable add-on', 'Useful daily object', 'Pairs well with mugs and wall art'],
    careRows: [
      ['Use', 'Notes, planning, decorating, and desk rituals'],
      ['Gift Fit', 'Easy under-$30 checkout add-on'],
    ],
  },
  'Home Goods': {
    tone: 'home',
    storyBullets: ['Useful tabletop piece', 'Retro kitchen-counter mood', 'Bundle-ready home add-on', 'Small footprint'],
    careRows: [
      ['Use', 'Coffee table, desk, kitchen, and shelf styling'],
      ['Care', 'Wipe clean and avoid prolonged soaking'],
    ],
  },
}

const productDetailExperiences = {
  'rewind-club-tee': {
    storyTitle: 'The Tee From The Video Store Run',
    storyBody:
      'This is the shirt you throw on before walking past the arcade, grabbing a soda, and pretending the Friday night rental was your whole personality.',
    storyBullets: ['Light tee for daily wear', 'Chest artwork with rewind-club attitude', 'Pairs with tote and stickers', 'Best first item for the collection'],
    lookbook: [
      [rewindTeeLifestyleImage, 'Ringer tee on the weekend'],
      [videoStoreImage, 'Rental counter mood'],
      [mallWeekendImage, 'Mall hallway light'],
      [arcadeDepartmentImage, 'After-arcade stop'],
    ],
    reviews: [
      ['Feels like a real old tee', 'Soft and easy to wear. The artwork has that video-store memory without looking costume-y.', 'Drew P.'],
      ['Great first order', 'I bought it with the sticker pack and it instantly made the whole order feel complete.', 'Nina C.'],
      ['Print came out clean', 'The graphic is crisp and the shirt works with jeans, shorts, everything.', 'Marco L.'],
    ],
  },
  'mall-weekend-hoodie': {
    storyTitle: 'The Food Court Hoodie',
    storyBody:
      'Built for those late-afternoon mall walks when the arcade is loud, the parking lot is glowing, and the hoodie becomes your whole weekend uniform.',
    storyBullets: ['Cozy pullover feel', 'Front, back, lifestyle, and print-detail views', 'Best seller anchor item', 'Strong bundle with tote and stickers'],
    lookbook: [
      [mallWeekendHoodieLifestyleImage, 'Hoodie in the wild'],
      [mallWeekendHoodiePrintDetailImage, 'Print close-up'],
      [mallWeekendImage, 'Mall weekend reference'],
      [videoStoreImage, 'After-dark rental stop'],
    ],
    reviews: [
      ['The hero piece', 'This is the item that made the order feel premium. Cozy, nostalgic, and the print detail looks great.', 'Alyssa M.'],
      ['Bought the bundle after seeing it', 'The tote and stickers made sense once I saw the hoodie styled like a whole weekend kit.', 'Ben H.'],
      ['Better in person', 'The front and back views sold me. It feels like something from a real campus shop.', 'Tara S.'],
    ],
  },
  '1999-varsity-hoodie': {
    storyTitle: 'After-School Varsity Energy',
    storyBody:
      'A red fleece pullover with late-90s hallway confidence: part pep-rally, part mall photo booth, part last-period escape plan.',
    storyBullets: ['Bold red fleece presence', 'Varsity-style nostalgia', 'Great gift for apparel buyers', 'Pairs with dad hat'],
    lookbook: [
      [varsityHoodieGeneratedImage, 'Varsity front view'],
      [mallWeekendImage, 'School-night mall stop'],
      [arcadeDepartmentImage, 'Arcade after class'],
      [partyNightLineupImage, 'Outfit lineup'],
    ],
  },
  'mall-run-dad-hat': {
    storyTitle: 'The Errand Hat',
    storyBody:
      'Washed cotton, low-key, and ready for a Saturday loop through the mall, diner, record bin, and parking-lot sunset.',
    storyBullets: ['Easy adjustable cap', 'Small apparel add-on', 'Looks good with tees and hoodies', 'Low-risk gift price'],
    lookbook: [
      [mallRunDadHatGeneratedImage, 'Washed cap detail'],
      [mallWeekendImage, 'Mall run uniform'],
      [under25LineupImage, 'Small gift counter'],
      [audioDepartmentImage, 'Tape-shop stop'],
    ],
  },
  'mall-weekend-tote': {
    storyTitle: 'The Carry-All Mall Bag',
    storyBody:
      'A canvas tote for the small treasures: notebooks, coffee, poster tubes, snacks, and whatever you picked up because the display looked too good.',
    storyBullets: ['Heavy canvas feel', 'Front or front-and-back print options', 'Best bundle companion', 'Useful beyond one outfit'],
    lookbook: [
      [mallWeekendToteGeneratedImage, 'Tote front view'],
      [deskGiftsLineupImage, 'Gift counter setup'],
      [mallWeekendImage, 'Shopping bag moment'],
      [shelfDecorLineupImage, 'Shelf styling'],
    ],
  },
  'diner-counter-mug': {
    storyTitle: 'Bottomless Coffee Counter',
    storyBody:
      'A glossy mug for early work blocks, late edits, and that diner-counter feeling when the refill keeps showing up before you ask.',
    storyBullets: ['Under-$20 gift pick', 'Glossy white finish', 'Desk-friendly daily use', 'Pairs with calendar or coasters'],
    lookbook: [
      [dinerMugLifestyleImage, 'Countertop lifestyle'],
      [dinerMugImage, 'Transparent mug mockup'],
      [kitchenDepartmentImage, 'Kitchen shelf'],
      [deskGiftsLineupImage, 'Desk gift setup'],
    ],
  },
  'arcade-night-poster': {
    storyTitle: 'Neon On The Bedroom Wall',
    storyBody:
      'The poster for anyone who remembers cabinet glow, carpet patterns, and saving one last quarter for the game that always won.',
    storyBullets: ['Room-transforming wall piece', 'Low-stock urgency', 'Strong visual anchor', 'Pairs with canvas and stickers'],
    lookbook: [
      [arcadePosterImage, 'Poster art'],
      [arcadeDepartmentImage, 'Arcade corner'],
      [heroMemoryLaneImage, 'Bedroom wall mood'],
      [shelfDecorLineupImage, 'Room decor lineup'],
    ],
  },
  'food-court-poster': {
    storyTitle: 'Food Court Time Machine',
    storyBody:
      'A wall print that smells like fries in your imagination: bright signage, sticky trays, and the perfect table near the fountain.',
    storyBullets: ['Gift-pick wall art', 'Food-court color palette', 'Bedroom or kitchen nook fit', 'Pairs with diner mug'],
    lookbook: [
      [foodCourtPosterGeneratedImage, 'Food court poster'],
      [heroSupermarketImage, 'Aisle nostalgia'],
      [kitchenDepartmentImage, 'Kitchen memory'],
      [partyNightLineupImage, 'Night-in setup'],
    ],
  },
  'rewind-sticker-pack': {
    storyTitle: 'The Locker-Door Add-On',
    storyBody:
      'Tiny hits of nostalgia for laptop lids, bottles, notebooks, and every surface that needs a little rewind-button attitude.',
    storyBullets: ['Easy impulse add-on', 'Die-cut sticker energy', 'Great with every bundle', 'Giftable under-$20 item'],
    lookbook: [
      [rewindStickerPackGeneratedImage, 'Sticker pack sheet'],
      [under25LineupImage, 'Under-$25 counter'],
      [videoStoreImage, 'Video-store labels'],
      [arcadeDepartmentImage, 'Cabinet sticker mood'],
    ],
  },
  'retro-desk-calendar': {
    storyTitle: 'A Desk That Remembers',
    storyBody:
      'A monthly desk calendar for planning real days while the artwork keeps one foot in taped-up bedrooms and weekend TV blocks.',
    storyBullets: ['Useful monthly format', 'Original retro-style art', 'Desk gift sweet spot', 'Pairs with mug and notebook'],
    lookbook: [
      [vhsCalendarImage, 'Calendar product view'],
      [deskGiftsLineupImage, 'Desk gift lineup'],
      [heroContentSheetImage, 'Content wall mood'],
      [videoStoreImage, 'Planning the rental list'],
    ],
  },
  'video-rental-notebook': {
    storyTitle: 'The Late-Fee List Book',
    storyBody:
      'A lined notebook for ideas, lists, sketches, and the kind of reminders that once lived on receipts and VHS rental slips.',
    storyBullets: ['Lined pages for daily notes', 'Small stationery gift', 'Works with sticker pack', 'Strong desk bundle item'],
    lookbook: [
      [videoNightSignImage, 'Notebook cover mood'],
      [videoStoreImage, 'Rental desk reference'],
      [deskGiftsLineupImage, 'Desk gift lineup'],
      [heroProductSheetImage, 'Product sheet flatlay'],
    ],
  },
  'diner-coaster-set': {
    storyTitle: 'Tabletop Diner Detail',
    storyBody:
      'Four coasters that make a coffee table feel like a booth: small, useful, and quietly full of retro counter charm.',
    storyBullets: ['Set of four standard option', 'Useful tabletop add-on', 'Pairs with diner mug', 'Great home-goods bundle piece'],
    lookbook: [
      [dinerTrayImage, 'Coaster set view'],
      [kitchenDepartmentImage, 'Diner kitchen shelf'],
      [dinerMugLifestyleImage, 'Mug and tabletop'],
      [deskGiftsLineupImage, 'Desk gift setup'],
    ],
  },
  'memory-lane-canvas': {
    storyTitle: 'The Big Memory Wall',
    storyBody:
      'A stretched canvas for rooms that need one strong retro signal: quiet nostalgia, sunset colors, and a permanent corner of 1989.',
    storyBullets: ['Premium wall-art gift', 'Large visual anchor', 'Bedroom and studio friendly', 'Pairs with poster and stickers'],
    lookbook: [
      [albumWallPrintImage, 'Canvas art'],
      [heroMemoryLaneImage, 'Memory lane wall'],
      [shelfDecorLineupImage, 'Room decor shelf'],
      [wallArtDepartmentImage, 'Wall art department'],
    ],
  },
}

const getProductDetailExperience = (product) => {
  if (!product) return defaultPdpExperience

  return {
    ...defaultPdpExperience,
    ...(categoryPdpExperiences[product.category] ?? {}),
    ...(productDetailExperiences[product.id] ?? {}),
    ...(generatedProductDetailExperiences[product.id] ?? {}),
  }
}

const bundles = generatedBundles

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
  { name: 'Phone Case', copy: 'Retro cases for daily carry and late-night pocket checks.', image: phoneCaseCategoryImage, imageUse: 'banner' },
  { name: 'Mug', copy: 'Glossy mugs for coffee, tea, and desk days.', image: mugCategoryImage, imageUse: 'banner' },
  { name: 'T Shirt', copy: 'White retro graphic tees printed after each order.', image: tShirtCategoryImage, imageUse: 'banner' },
  { name: 'Sticker', copy: 'Die-cut sticker packs for laptops, bottles, and notebooks.', image: stickerCategoryImage, imageUse: 'banner' },
]

const giftCounterItems = [
  {
    title: 'Under $25',
    copy: 'Sticker packs and small retro add-ons.',
    category: 'Sticker',
    budget: '$16-$22',
    image: under25LineupImage,
    imageUse: 'banner',
  },
  {
    title: 'Desk Gifts',
    copy: 'Mugs and clean desk add-ons.',
    category: 'Mug',
    budget: '$18-$26',
    image: deskGiftsLineupImage,
    imageUse: 'banner',
  },
  {
    title: 'Daily Carry',
    copy: 'Phone cases with pocket-ready retro artwork.',
    category: 'Phone Case',
    budget: '$24-$32',
    image: shelfDecorLineupImage,
    imageUse: 'banner',
  },
  {
    title: 'Outfit',
    copy: 'Graphic tees for daily wear.',
    category: 'T Shirt',
    budget: '$24-$54',
    image: partyNightLineupImage,
    imageUse: 'banner',
  },
]

const newArrivalIds = generatedNewArrivalIds
const featuredDropProduct = generatedFeaturedDropProduct
const shelfReadySets = generatedShelfReadySets

const policyCards = [
  {
    id: 'shipping',
    title: 'Shipping',
    path: 'shipping',
    label: 'Made-to-order shipping',
    copy: 'Orders are produced after checkout, then handed to a carrier for delivery. Production time and shipping time are separate.',
    points: ['Production usually takes 2-5 business days', 'US domestic transit is estimated after shipment', 'Tracking is sent after the carrier label is created'],
    sections: [
      ['Production', 'Production is the time needed to prepare an order for shipping after the order is received. The store should show this separately from carrier transit.'],
      ['Delivery', 'US delivery estimates should be shown as production time plus shipping transit. Tracking should be sent to the customer once the order ships.'],
      ['Address changes', 'Address edits should be handled before the order is submitted or before production starts. After production begins, changes may not be possible.'],
    ],
  },
  {
    id: 'refund',
    title: 'Refund',
    path: 'refund',
    label: 'Returns and claims',
    copy: 'Because items are made after purchase, refunds focus on damaged, misprinted, defective, incorrect, or lost orders.',
    points: ['Claims should be submitted within the stated claim window', 'Photo proof is required for damaged or misprinted goods', 'Wrong size or changed mind is not an automatic refund'],
    sections: [
      ['Covered cases', 'The store should handle damaged, misprinted, defective, incorrect, and confirmed lost orders through order review.'],
      ['Not covered', 'Wrong size selection, wrong color selection, changed mind, or customer address mistakes should not be automatic refunds once an item is produced.'],
      ['Claim flow', 'The customer sends an order number, photos, and a short description. The store reviews the issue and offers a reprint or refund when eligible.'],
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    path: 'contact',
    label: 'Support desk',
    copy: 'One support inbox handles order questions, address updates, tracking questions, claim reviews, and refund requests.',
    points: ['Email: support@1989supply.co', 'Include order number and checkout email', 'Attach photos for damaged or misprinted items'],
    sections: [
      ['Support email', 'Use support@1989supply.co as the customer support inbox for order questions, address updates, tracking help, and claim follow-up.'],
      ['What to include', 'For order issues, customers should include order number, email used at checkout, photos if relevant, and the shipping address if asking about delivery.'],
      ['Response target', 'A realistic small-shop target is 1-2 business days for first response, with some claim reviews taking longer when production review is needed.'],
    ],
  },
  {
    id: 'terms-privacy',
    title: 'Terms & Privacy',
    path: 'terms-privacy',
    label: 'Store terms',
    copy: 'Store terms explain made-to-order production, payment processing, order data use, and customer privacy handling.',
    points: ['Orders are produced after checkout', 'Customer data is used for checkout, support, and shipping', 'Payment and shipping services may process order data'],
    sections: [
      ['Made-to-order production', 'Items are made after purchase. Production status, address changes, cancellations, and delivery timing depend on order progress.'],
      ['Customer data', 'Customer name, email, address, order items, and support messages are used to process payment, prepare orders, send tracking, and handle support.'],
      ['Service terms', 'Order details may be used by payment, production, and shipping services to complete checkout and delivery.'],
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
      ['Order received', 'Checkout is captured and the order is prepared for production.'],
      ['Production', 'The item is printed, packed, and prepared for shipment. Most items are commonly produced in 2-5 business days, but peak periods can take longer.'],
      ['Carrier handoff', 'After production, the carrier receives the package and tracking becomes available.'],
      ['Delivery', 'The customer follows carrier tracking. Delivery issues are reviewed with the carrier when eligible.'],
    ],
    table: [
      ['Production time', 'Separate from shipping time', 'Shown before checkout and in order emails.'],
      ['Tracking', 'Sent after shipping label / carrier handoff', 'Customer must allow tracking to update after carrier scan.'],
      ['Wrong address', 'Customer responsibility after production starts', 'Contact support immediately before production begins.'],
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
      ['Store reviews evidence', 'The store checks whether the issue matches covered claim cases.'],
      ['Resolution review', 'If eligible, the store arranges reprint or refund handling.'],
      ['Resolution', 'Customer receives replacement, refund, or a clear reason when the claim is not covered.'],
    ],
  },
  contact: {
    channels: [
      ['Order support', 'support@1989supply.co', 'Use for order status, address updates, tracking, refund claims, and damaged item reports.'],
      ['Response time', '1-2 business days', 'Claim and carrier reviews can take longer than first response.'],
      ['Urgent address change', 'Before production starts', 'Send the order number and corrected address immediately.'],
    ],
    checklist: ['Order number', 'Checkout email', 'Full name', 'Shipping address', 'Photos for damaged/misprinted items', 'Short explanation of the issue'],
    formLabels: ['Name', 'Email', 'Order number', 'Issue type', 'Message'],
  },
  'terms-privacy': {
    dataRows: [
      ['Contact data', 'Name, email, shipping address', 'Checkout, shipping, tracking, support'],
      ['Order data', 'Purchased items, size/color choices, order value', 'Production, shipping, customer service'],
      ['Payment data', 'Payment status and transaction reference', 'Payment confirmation and fraud prevention'],
      ['Support data', 'Messages, photos, claim notes', 'Refund review, claim handling, customer service'],
    ],
    providers: [
      ['Production and shipping services', 'Use the order items, recipient name, address, and shipping details needed to prepare and deliver orders.'],
      ['Payment processor', 'Processes payment confirmation, transaction references, and fraud checks.'],
      ['Shipping carriers', 'Receive recipient address and package details to deliver orders and provide tracking.'],
    ],
    rights: ['Request order support records', 'Ask for correction of contact details', 'Request deletion where legally and operationally possible', 'Ask how order data was used for production and shipping'],
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
  ['Where is my tracking?', 'Tracking is sent after production is complete and the carrier receives the label.'],
  ['Can I change my address?', 'Send a support request before production begins. After production starts, changes may not be possible.'],
  ['What issues are covered?', 'Damaged, misprinted, defective, wrong item, or confirmed lost orders can be reviewed.'],
  ['What should I include?', 'Use your checkout email, order number, short issue details, and photos for damaged or misprinted items.'],
]

const productOptionGroups = {
  'T Shirt': [
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
        { label: 'White', priceDelta: 0 },
      ],
    },
  ],
  Mug: [
    {
      name: 'Size',
      options: [
        { label: '11 oz', priceDelta: 0 },
        { label: '15 oz', priceDelta: 4 },
      ],
    },
    {
      name: 'Finish',
      options: [
        { label: 'Glossy White', priceDelta: 0 },
      ],
    },
  ],
  Sticker: [
    {
      name: 'Pack',
      options: [
        { label: 'Standard', priceDelta: 0 },
        { label: 'Gift Pack', priceDelta: 6 },
      ],
    },
  ],
  'Phone Case': [
    {
      name: 'Model',
      options: [
        { label: 'Standard', priceDelta: 0 },
        { label: 'Plus', priceDelta: 2 },
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
        { label: '15 oz', priceDelta: 4 },
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
  ],
}

const formatVariantColor = (color, product) => {
  if (!color) return null
  if ((product?.category === 'Drinkware' || product?.category === 'Mug') && color === 'White') return 'Glossy White'
  if ((product?.category === 'Stationery' || product?.category === 'Sticker') && color === 'White') return null
  if (product?.category === 'Home Goods' && color === 'White') return null
  return color
}

const getUniqueVariantValues = (variants, key, formatter = (value) => value) =>
  variants
    .map((variant) => formatter(variant[key], variant))
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)

const getVariantPriceDelta = (variants, key, value, basePrice, formatter = (rawValue) => rawValue) => {
  const matchingVariant = variants.find((variant) => formatter(variant[key], variant) === value)
  return matchingVariant ? Number((matchingVariant.retailPrice - basePrice).toFixed(2)) : 0
}

const getPrintfulOptionGroups = (product) => {
  const variants = product?.printful?.variants ?? []
  if (!variants.length) return null

  const basePrice = product.price
  const sizeOptions = getUniqueVariantValues(variants, 'size')
  const colorOptions = getUniqueVariantValues(variants, 'color', (color) => formatVariantColor(color, product))
  const groups = []

  if (sizeOptions.length) {
    groups.push({
      name: product.category === 'Stationery' || product.category === 'Sticker' ? 'Format' : 'Size',
      options: sizeOptions.map((size) => ({
        label: size,
        priceDelta: getVariantPriceDelta(variants, 'size', size, basePrice),
      })),
    })
  }

  if (colorOptions.length) {
    groups.push({
      name:
        product.category === 'Drinkware' || product.category === 'Mug'
          ? 'Finish'
          : product.category === 'Stationery' || product.category === 'Sticker'
            ? 'Paper'
            : 'Color',
      options: colorOptions.map((color) => ({
        label: color,
        priceDelta: getVariantPriceDelta(
          variants,
          'color',
          color,
          basePrice,
          (rawColor) => formatVariantColor(rawColor, product),
        ),
      })),
    })
  }

  return groups
}

const getOptionGroups = (product) => getPrintfulOptionGroups(product) ?? productOptionGroups[product?.category] ?? []

const getDefaultOptions = (product) =>
  Object.fromEntries(getOptionGroups(product).map((group) => [group.name, group.options[0].label]))

const getSelectedOptions = (groups, selectedOptions) =>
  groups.map((group) => group.options.find((option) => option.label === selectedOptions[group.name]) ?? group.options[0])

const formatPrice = (value) => `$${value.toFixed(2)}`
const collapsedCartItemCount = 2
const FREE_SHIPPING_THRESHOLD = 75

const trackStoreEvent = (eventName, payload = {}) => {
  if (typeof window === 'undefined') return

  const detail = {
    event: eventName,
    ...payload,
  }

  window.dispatchEvent(new CustomEvent('dreaming1989:store-event', { detail }))
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail)
  if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, payload)
  if (window.ttq?.track) window.ttq.track(eventName, payload)
}

// Deterministic demo social-proof so cards/PDP can show ratings without a backend.
const hashString = (value) => {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return hash
}

const getProductProof = (product) => {
  if (!product) return { rating: 4.8, reviewCount: 120, soldCount: 200 }
  const seed = hashString(String(product.id ?? product.name ?? 'product'))
  const demoReviews = createDemoProductReviews(product)
  const rating = getAverageReviewRating(demoReviews)
  const reviewCount = demoReviews.length
  const soldCount = 120 + ((seed >> 3) % 880)
  return { rating, reviewCount, soldCount }
}

// Retro price-gun "starburst" flash — only for a few highlight tags so cards
// stay scannable instead of every card shouting at once.
const sunburstLabels = {
  'Best Seller': 'HOT!',
  'Under $20': 'DEAL!',
  'Low Stock': 'LAST FEW',
}
const getSunburstLabel = (product) => sunburstLabels[product?.tag] ?? null

// Sale pricing: `price` is the live (sale) price, `compareAtPrice` is the higher "was" price.
const getDiscountPercent = (price, compareAt) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0

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
    `Production: ${order?.fulfillment ?? 'Production pending'}`,
    `Tracking: ${order?.tracking ?? 'Tracking appears after shipment'}`,
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
    'No real payment or live order is created in demo mode.',
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

const emptyCustomerOrders = []

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
    ['review', 'order review'],
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

const defaultWishlistIds = []

const getAccountLineItemImage = (item) => {
  if (!item) return productImages.stickerPack
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
    return {
      ...parsedCustomer,
      orders: Array.isArray(parsedCustomer.orders) ? parsedCustomer.orders : [],
      reviews: Array.isArray(parsedCustomer.reviews) ? parsedCustomer.reviews : [],
      addresses: normalizeAccountAddresses(parsedCustomer.addresses),
      wishlistIds: Array.isArray(parsedCustomer.wishlistIds) ? parsedCustomer.wishlistIds : defaultWishlistIds,
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

const getStoredWishlistIds = () => {
  try {
    const savedWishlist = window.localStorage.getItem('dreaming-1989-wishlist')
    if (!savedWishlist) return defaultWishlistIds
    const parsedWishlist = JSON.parse(savedWishlist)
    return Array.isArray(parsedWishlist) ? parsedWishlist : defaultWishlistIds
  } catch {
    return defaultWishlistIds
  }
}

const saveStoredWishlistIds = (wishlistIds) => {
  try {
    window.localStorage.setItem('dreaming-1989-wishlist', JSON.stringify(wishlistIds))
  } catch {
    // Wishlist persistence should not block browsing.
  }
}

// Client-side review store (demo): reviews written on the PDP plus photos for any
// review, kept in localStorage so the experience survives a reload without a backend.
const LOCAL_REVIEWS_KEY = 'dreaming-1989-local-reviews'
const LOCAL_REVIEW_IMAGES_KEY = 'dreaming-1989-review-images'

const getStoredLocalReviews = () => {
  try {
    const saved = window.localStorage.getItem(LOCAL_REVIEWS_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveStoredLocalReviews = (reviews) => {
  try {
    window.localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews))
    return true
  } catch {
    return false
  }
}

const getStoredReviewImages = () => {
  try {
    const saved = window.localStorage.getItem(LOCAL_REVIEW_IMAGES_KEY)
    const parsed = saved ? JSON.parse(saved) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const saveStoredReviewImages = (imageMap) => {
  try {
    window.localStorage.setItem(LOCAL_REVIEW_IMAGES_KEY, JSON.stringify(imageMap))
    return true
  } catch {
    return false
  }
}

const titleizeStatus = (value, fallback = 'Pending') => {
  const normalizedValue = String(value ?? '').replace(/[_-]+/g, ' ').trim()
  if (!normalizedValue) return fallback
  return normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1)
}

const formatOrderDate = (value) => {
  try {
    return new Date(value || Date.now()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Today'
  }
}

const getShippingAddressText = (shippingAddress) => {
  if (!shippingAddress) return ''
  if (typeof shippingAddress === 'string') return shippingAddress
  return [shippingAddress.address, shippingAddress.city, shippingAddress.zip, shippingAddress.country]
    .map((value) => String(value ?? '').trim())
    .filter(Boolean)
    .join(', ')
}

const getDefaultOrderTimeline = (order) => [
  { label: 'Order received', detail: 'Checkout was saved to the customer account.', done: true },
  {
    label: 'Payment',
    detail: titleizeStatus(order.payment_status, 'Payment pending'),
    done: ['paid', 'captured'].includes(String(order.payment_status ?? '').toLowerCase()),
  },
  {
    label: 'Production review',
    detail: 'Order is waiting for production review before fulfillment.',
    done: false,
  },
  {
    label: 'Production',
    detail: titleizeStatus(order.fulfillment_status, 'Production pending'),
    done: false,
  },
  {
    label: 'Tracking',
    detail: order.tracking_url || 'Carrier tracking appears here after shipment.',
    done: Boolean(order.tracking_number || order.tracking_url),
  },
]

const mapSupabaseOrder = (order) => ({
  id: order.order_number,
  dbId: order.id,
  date: formatOrderDate(order.created_at),
  status: titleizeStatus(order.status, 'Order received'),
  subtotal: Number(order.subtotal ?? 0),
  discount: Number(order.discount ?? 0),
  shipping: Number(order.shipping ?? 0),
  total: Number(order.total ?? 0),
  items: ((order.order_items?.length ? order.order_items : order.shipping_address?.items) ?? []).map((item) => ({
    productId: item.product_id,
    name: item.name,
    quantity: item.quantity,
    price: Number(item.price ?? 0),
    optionSummary: item.option_summary,
  })),
  payment: `${titleizeStatus(order.payment_provider, 'PayPal')} ${titleizeStatus(order.payment_status, 'pending').toLowerCase()}`,
  paymentStatus: titleizeStatus(order.payment_status, 'Pending'),
  fulfillment: titleizeStatus(order.fulfillment_status, 'Production pending'),
  tracking: order.tracking_url || order.tracking_number || 'Tracking appears after shipment',
  shippingAddress: getShippingAddressText(order.shipping_address),
  timeline: Array.isArray(order.timeline) && order.timeline.length ? order.timeline : getDefaultOrderTimeline(order),
})

const mergeCustomerForDisplay = (apiCustomer, currentCustomer = null) => ({
  ...apiCustomer,
  orders: Array.isArray(apiCustomer?.orders)
    ? apiCustomer.orders
    : currentCustomer?.orders?.length
      ? currentCustomer.orders
      : emptyCustomerOrders,
  addresses: normalizeAccountAddresses(
    Array.isArray(apiCustomer?.addresses) ? apiCustomer.addresses : currentCustomer?.addresses,
  ),
  wishlistIds: Array.isArray(apiCustomer?.wishlistIds)
    ? apiCustomer.wishlistIds
    : Array.isArray(currentCustomer?.wishlistIds)
      ? currentCustomer.wishlistIds
      : defaultWishlistIds,
  supportTickets: Array.isArray(apiCustomer?.supportTickets)
    ? apiCustomer.supportTickets
    : Array.isArray(currentCustomer?.supportTickets)
      ? currentCustomer.supportTickets
      : [],
  reviews: Array.isArray(apiCustomer?.reviews)
    ? apiCustomer.reviews
    : Array.isArray(currentCustomer?.reviews)
      ? currentCustomer.reviews
      : [],
})

const requireSupabaseClient = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured yet.')
  }
  return supabase
}

const formatJoinedMonth = (value) => {
  try {
    return new Date(value || Date.now()).toLocaleString('en-US', { month: 'long', year: 'numeric' })
  } catch {
    return new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
  }
}

const getUserFallbackName = (user) =>
  String(user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? 'Retro Shopper').trim() || 'Retro Shopper'

const mapSupabaseAddress = (address) => ({
  id: address.id,
  label: address.label || (address.is_primary ? 'Primary' : 'Saved'),
  name: address.name || '',
  lines: [address.line1, address.line2, address.city_state, address.country, address.phone]
    .map((value) => String(value ?? '').trim())
})

const getSupabaseCustomer = async (user, currentCustomer = null) => {
  const client = requireSupabaseClient()
  const [profileResult, addressesResult, wishlistResult, supportTicketsResult, ordersResult, reviewsResult] = await Promise.all([
    client
      .from('profiles')
      .select('id, email, name, avatar_url, joined_at')
      .eq('id', user.id)
      .maybeSingle(),
    client
      .from('addresses')
      .select('id, label, name, line1, line2, city_state, country, phone, is_primary')
      .eq('user_id', user.id)
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: true }),
    client
      .from('wishlist_items')
      .select('product_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    client
      .from('support_tickets')
      .select('id, email, order_number, topic, message, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(4),
    client
      .from('orders')
      .select(`
        id,
        order_number,
        customer_email,
        customer_name,
        status,
        payment_provider,
        payment_status,
        fulfillment_status,
        subtotal,
        discount,
        shipping,
        total,
        shipping_address,
        tracking_carrier,
        tracking_number,
        tracking_url,
        timeline,
        created_at,
        order_items (
          product_id,
          name,
          quantity,
          price,
          option_summary
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    client
      .from('product_reviews')
      .select('id, user_id, order_id, product_id, reviewer_name, rating, title, body, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ])

  if (profileResult.error) throw profileResult.error
  if (addressesResult.error) throw addressesResult.error
  if (wishlistResult.error) throw wishlistResult.error
  if (supportTicketsResult.error) throw supportTicketsResult.error
  if (ordersResult.error) throw ordersResult.error
  if (reviewsResult.error) throw reviewsResult.error

  const profile = profileResult.data
  return mergeCustomerForDisplay(
    {
      id: user.id,
      name: profile?.name || getUserFallbackName(user),
      email: profile?.email || user.email || '',
      joined: formatJoinedMonth(profile?.joined_at || user.created_at),
      avatar: profile?.avatar_url || currentCustomer?.avatar,
      addresses: (addressesResult.data ?? []).map(mapSupabaseAddress),
      wishlistIds: (wishlistResult.data ?? []).map((item) => item.product_id).filter(Boolean),
      supportTickets: (supportTicketsResult.data ?? []).map(mapSupabaseSupportTicket),
      orders: (ordersResult.data ?? []).map(mapSupabaseOrder),
      reviews: (reviewsResult.data ?? []).map(mapProductReview),
    },
    currentCustomer,
  )
}

const upsertSupabaseProfile = async (user, updates = {}) => {
  const client = requireSupabaseClient()
  const payload = {
    id: user.id,
    email: updates.email || user.email || '',
    name: updates.name || getUserFallbackName(user),
  }
  const { error } = await client.from('profiles').upsert(payload, { onConflict: 'id' })
  if (error) throw error
}

const addressToSupabasePayload = (address, userId) => ({
  user_id: userId,
  label: address.label,
  name: address.name,
  line1: address.lines[0] || '',
  line2: address.lines[1] || '',
  city_state: address.lines[2] || '',
  country: address.lines[3] || '',
  phone: address.lines[4] || '',
  is_primary: address.label.toLowerCase() === 'primary',
})

const getSupportTicketDisplayId = (id) => `SUP-${String(id).replace(/-/g, '').slice(0, 6).toUpperCase()}`

const mapSupabaseSupportTicket = (ticket) => ({
  id: getSupportTicketDisplayId(ticket.id),
  dbId: ticket.id,
  email: ticket.email,
  issueType: ticket.topic || 'General question',
  orderId: ticket.order_number || '',
  message: ticket.message || '',
  status: ticket.status || 'open',
  createdAt: ticket.created_at,
})

function ProductReviewCard({ review, onImageClick }) {
  const recommends = Number(review.rating) >= 4
  const initial = (review.reviewerName || '?').trim().charAt(0).toUpperCase()
  const badge = review.verified ? 'Verified buyer' : review.source === 'local' ? 'Reviewer' : 'Sample review'

  return (
    <blockquote className={review.verified ? 'catalog-pdp-live-review' : 'catalog-pdp-sample-review'}>
      <div className="review-card-top">
        <span aria-label={`${review.rating} out of 5 stars`}>{getReviewStars(review.rating)}</span>
        {recommends && (
          <span className="review-card-recommends">
            <CheckCircle2 size={13} aria-hidden="true" />
            Recommends
          </span>
        )}
      </div>

      <div className="review-card-meta">
        <span className="review-card-avatar" aria-hidden="true">{initial}</span>
        <span className="review-card-meta-text">
          <strong>{review.reviewerName}</strong>
          <span className="review-card-meta-line">
            {review.createdAt && <time dateTime={review.createdAt}>{formatOrderDate(review.createdAt)}</time>}
            {review.createdAt && <span aria-hidden="true">·</span>}
            <span>{badge}</span>
          </span>
        </span>
      </div>

      {review.optionSummary && <p className="review-card-options">{review.optionSummary}</p>}

      <div className="review-card-content">
        <div className="review-card-text">
          <strong>{review.title}</strong>
          <p>{review.body}</p>
        </div>
        {review.images?.length > 0 && (
          <div className="review-photo-strip">
            {review.images.map((src, index) => (
              <button
                type="button"
                className="review-photo-thumb"
                key={`${review.id}-photo-${index}`}
                onClick={() => onImageClick?.(src)}
                aria-label={`Open customer photo ${index + 1}`}
              >
                <img src={src} alt={`Customer photo ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </blockquote>
  )
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/')
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [authPasswordDraft, setAuthPasswordDraft] = useState('')
  const [authPasswordTouched, setAuthPasswordTouched] = useState(false)
  const [authPasswordNotice, setAuthPasswordNotice] = useState('')
  const [authResetPath, setAuthResetPath] = useState('')
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
  const [reviewEditor, setReviewEditor] = useState(null)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewNotice, setReviewNotice] = useState('')
  const [productReviews, setProductReviews] = useState([])
  const [productReviewsLoading, setProductReviewsLoading] = useState(false)
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false)
  const [reviewsModalPage, setReviewsModalPage] = useState(1)
  const [writeReviewGateOpen, setWriteReviewGateOpen] = useState(false)
  const [localReviews, setLocalReviews] = useState(() => getStoredLocalReviews())
  const [reviewImages, setReviewImages] = useState(() => getStoredReviewImages())
  const [pdpReviewOpen, setPdpReviewOpen] = useState(false)
  const [pdpReviewNotice, setPdpReviewNotice] = useState('')
  const [activeSupportAction, setActiveSupportAction] = useState('help')
  const [supportTicketNotice, setSupportTicketNotice] = useState('')
  const [supportTickets, setSupportTickets] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1)
  const [activeProductImageIndex, setActiveProductImageIndex] = useState(0)
  const [selectedImageInfo, setSelectedImageInfo] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [selectedPdpAddOnIds, setSelectedPdpAddOnIds] = useState([])
  const [pdpStickyCartVisible, setPdpStickyCartVisible] = useState(false)
  const [signupNotice, setSignupNotice] = useState('')
  const [customer, setCustomer] = useState(() => getStoredCustomer())
  const [guestWishlistIds, setGuestWishlistIds] = useState(() => getStoredWishlistIds())
  const customerRef = useRef(customer)
  const [cart, setCart] = useState([])
  const cartButtonRef = useRef(null)
  const floatingCartButtonRef = useRef(null)
  const productGalleryRef = useRef(null)
  const productHeroRef = useRef(null)
  const pdpPrimaryActionsRef = useRef(null)
  const recentCarouselRef = useRef(null)
  const supportButtonRef = useRef(null)
  const flyTimerRef = useRef(null)
  const noticeTimerRef = useRef(null)
  const cartFeedbackCounterRef = useRef(0)
  const orderNumberCounterRef = useRef(0)
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
        setSelectedPdpAddOnIds([])
        setPdpStickyCartVisible(false)
        setSelectedProductQuantity(1)
        setActiveProductImageIndex(getInitialProductImageIndex(nextProduct))
        setReviewsModalOpen(false)
        setReviewsModalPage(1)
        setActiveRoute('product')
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

  const selectedProductId = selectedProduct?.id

  useLayoutEffect(() => {
    if (activeRoute !== 'product' || !selectedProductId) return

    let active = true
    const alignProductHero = () => {
      if (active) productHeroRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    const frameId = window.requestAnimationFrame(alignProductHero)
    const settleTimers = [80, 320, 900].map((delay) => window.setTimeout(alignProductHero, delay))

    alignProductHero()
    document.fonts?.ready.then(alignProductHero)
    window.addEventListener('load', alignProductHero, { once: true })

    return () => {
      active = false
      window.cancelAnimationFrame(frameId)
      settleTimers.forEach((timerId) => window.clearTimeout(timerId))
      window.removeEventListener('load', alignProductHero)
    }
  }, [activeRoute, selectedProductId])

  useEffect(() => {
    return () => {
      if (flyTimerRef.current) window.clearTimeout(flyTimerRef.current)
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const productId = selectedProduct?.id
    if (activeRoute !== 'product' || !productId || !isSupabaseConfigured || !supabase) {
      return undefined
    }

    let active = true
    const loadingTimer = window.setTimeout(() => {
      if (active) setProductReviewsLoading(true)
    }, 0)

    supabase
      .from('product_reviews')
      .select('id, user_id, order_id, product_id, reviewer_name, rating, title, body, status, created_at')
      .eq('product_id', productId)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(24)
      .then(({ data, error }) => {
        if (!active) return
        setProductReviews(error ? [] : (data ?? []).map(mapProductReview))
        setProductReviewsLoading(false)
      })

    return () => {
      active = false
      window.clearTimeout(loadingTimer)
    }
  }, [activeRoute, selectedProduct?.id])

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
    cartOpen,
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
  const selectedVariantCompareAt = selectedProduct?.compareAtPrice
    ? selectedProduct.compareAtPrice + selectedVariantOptions.reduce((sum, option) => sum + option.priceDelta, 0)
    : 0
  const selectedVariantDiscount = getDiscountPercent(selectedVariantPrice, selectedVariantCompareAt)
  const selectedProductProof = getProductProof(selectedProduct)
  const visibleProductReviews = productReviews
    .filter((review) => review.productId === selectedProduct?.id)
    .map((review) => ({ ...review, verified: true, source: 'live', images: reviewImages[review.id] ?? [] }))
  const selectedLocalReviews = localReviews
    .filter((review) => review.productId === selectedProduct?.id)
    .map((review) => ({ ...review, images: review.images ?? [] }))
  const demoProductReviews = useMemo(
    () => createDemoProductReviews(selectedProduct, selectedOptionGroups),
    [selectedProduct, selectedOptionGroups],
  )
  const combinedProductReviews = mergeProductReviews(
    [...selectedLocalReviews, ...visibleProductReviews],
    demoProductReviews,
  )
  const selectedProductReviewCount = combinedProductReviews.length
  const selectedProductReviewRating = selectedProductReviewCount
    ? getAverageReviewRating(combinedProductReviews)
    : selectedProductProof.rating
  const selectedProductReviewDistribution = getReviewDistribution(combinedProductReviews)
  const previewProductReviews = combinedProductReviews.slice(0, 3)
  const reviewsModalPageSize = 5
  const reviewsModalPageCount = Math.max(1, Math.ceil(combinedProductReviews.length / reviewsModalPageSize))
  const reviewsModalPageReviews = combinedProductReviews.slice(
    (reviewsModalPage - 1) * reviewsModalPageSize,
    reviewsModalPage * reviewsModalPageSize,
  )
  const reviewsModalPhotos = combinedProductReviews.flatMap((review) => review.images ?? [])
  const selectedProductExperience = getProductDetailExperience(selectedProduct)
  const selectedProductGallery = selectedProduct
    ? selectedProduct.galleryImages?.length
      ? selectedProduct.galleryImages
      : [
          { label: 'Front', image: selectedProduct.image },
          ...(selectedProduct.backImage ? [{ label: 'Back', image: selectedProduct.backImage }] : []),
          ...(selectedProduct.lifestyleImage ? [{ label: 'Lifestyle', image: selectedProduct.lifestyleImage }] : []),
          ...(selectedProduct.printDetailImage ? [{ label: 'Print Detail', image: selectedProduct.printDetailImage }] : []),
        ]
    : []
  const activeProductImage = selectedProductGallery[activeProductImageIndex]?.image ?? selectedProduct?.image
  const curatedRelatedProductIds = selectedProduct?.id === 'mall-weekend-hoodie'
    ? ['rewind-club-tee', '1999-varsity-hoodie', 'mall-run-dad-hat', 'food-court-poster']
    : null
  const relatedProducts = selectedProduct
    ? curatedRelatedProductIds
      ? curatedRelatedProductIds
          .map((productId) => products.find((product) => product.id === productId))
          .filter(Boolean)
      : [
          ...products.filter((product) => product.category === selectedProduct.category && product.id !== selectedProduct.id),
          ...products.filter((product) => product.category !== selectedProduct.category),
        ].slice(0, 6)
    : []
  const bundleProducts = selectedProduct
    ? (selectedProduct.id === 'mall-weekend-hoodie'
      ? ['mall-weekend-hoodie', 'mall-weekend-tote', 'rewind-sticker-pack']
      : [selectedProduct.id, ...relatedProducts.slice(0, 2).map((product) => product.id)])
        .map((productId) => products.find((product) => product.id === productId))
        .filter(Boolean)
    : []
  const inlineAddOns = bundleProducts.filter((product) => product.id !== selectedProduct?.id).slice(0, 2)
  const selectedInlineAddOns = inlineAddOns.filter((product) => selectedPdpAddOnIds.includes(product.id))
  const inlineAddOnsRetail = selectedInlineAddOns.reduce((sum, product) => sum + product.price, 0)
  const inlineAddOnsDeal = Math.round(inlineAddOnsRetail * 0.9 * 100) / 100
  const selectedPdpOrderTotal = selectedVariantPrice * selectedProductQuantity + inlineAddOnsDeal
  const bundlePrice = bundleProducts.reduce((sum, product) => sum + product.price, 0)
  const bundleDealPrice = Math.round(bundlePrice * 0.88 * 100) / 100

  useEffect(() => {
    if (activeRoute !== 'product' || !selectedProduct) return undefined

    const actions = pdpPrimaryActionsRef.current
    if (!actions) return undefined

    let frameId = 0
    const updateStickyCart = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        const rect = actions.getBoundingClientRect()
        setPdpStickyCartVisible(rect.bottom < 96)
      })
    }

    updateStickyCart()
    window.addEventListener('scroll', updateStickyCart, { passive: true })
    window.addEventListener('resize', updateStickyCart)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateStickyCart)
      window.removeEventListener('resize', updateStickyCart)
    }
  }, [activeRoute, selectedProduct])

  const featuredDropImage = featuredDrop?.image
  const routeAccountTab = getAccountTabFromPath(currentPath)
  const displayedAccountTab = routeAccountTab ?? accountTab
  const customerOrders = customer && Array.isArray(customer.orders) ? customer.orders : emptyCustomerOrders
  const customerReviews = customer && Array.isArray(customer.reviews) ? customer.reviews : emptyCustomerOrders
  const customerReviewKeys = useMemo(
    () => new Set(customerReviews.map((review) => getReviewPurchaseKey(review.orderId, review.productId))),
    [customerReviews],
  )
  const trackedOrder =
    customerOrders.find((order) => order.id === trackedOrderId || `#${order.id}` === trackedOrderId) ?? null
  const orderDateStartTime = getDateOnlyTime(orderDateRange.start)
  const orderDateEndTime = getDateOnlyTime(orderDateRange.end)
  const orderDateRangeStart = Math.min(orderDateStartTime ?? 0, orderDateEndTime ?? Number.MAX_SAFE_INTEGER)
  const orderDateRangeEnd = Math.max(orderDateStartTime ?? 0, orderDateEndTime ?? Number.MAX_SAFE_INTEGER)
  const filteredCustomerOrders = customerOrders.filter((order) => {
    const normalizedStatus = String(order.status).toLowerCase()
    const orderMatchesStatus = orderFilter === 'All' || normalizedStatus === orderFilter.toLowerCase()
    const orderTime = getOrderDateOnlyTime(order.date)
    const orderMatchesDate =
      orderTime === null || (orderTime >= orderDateRangeStart && orderTime <= orderDateRangeEnd)

    return orderMatchesStatus && orderMatchesDate
  })


  const ordersForCurrentView = displayedAccountTab === 'orders' ? filteredCustomerOrders : customerOrders
  const hasOrderToggle = ordersForCurrentView.length > 3
  const visibleCustomerOrders = ordersExpanded ? ordersForCurrentView : ordersForCurrentView.slice(0, 3)
  const selectedAccountOrder =
    customerOrders.find((order) => order.id === selectedOrderId) ?? customerOrders[0] ?? null
  const detailOrder = orderDetailOpen ? selectedAccountOrder : null
  const detailOrderReviewEligible = isOrderReviewEligible(detailOrder)
  const detailOrderReviewItems = getReviewableOrderItems(detailOrder, products)
  const selectedSupportAction =
    accountSupportActions.find((action) => action.id === activeSupportAction) ?? accountSupportActions[0]
  const detailOrderProgressTimeline = getOrderProgressTimeline(detailOrder)
  const detailOrderProgressTone = detailOrder?.status?.toLowerCase().includes('cancelled') ? 'cancelled' : 'standard'
  const savedAddresses = normalizeAccountAddresses(customer?.addresses)
  const addressEditorOpen = addressEditorMode !== 'idle'
  const recentlyViewedProducts = products.filter((product) => recentlyViewedIds.includes(product.id))
  const activeWishlistIds = customer ? (customer.wishlistIds ?? []) : guestWishlistIds
  const wishlistProducts = products.filter((product) => activeWishlistIds.includes(product.id))
  const visibleAccountCoupons = couponsExpanded ? accountCoupons : accountCoupons.slice(0, 2)
  const hasAccountCouponToggle = accountCoupons.length > 2
  const accountRouteOpen = Boolean(routeAccountTab)
  const accountScreenOpen = accountRouteOpen && Boolean(customer)
  const accountAuthOpen = accountRouteOpen && !customer
  const authRouteOpen =
    currentPath === signInPath ||
    currentPath === createAccountPath ||
    currentPath === forgotPasswordPath ||
    currentPath === resetPasswordPath
  const authPageOpen = authRouteOpen || accountAuthOpen
  const activeAuthMode =
    currentPath === createAccountPath
      ? 'sign-up'
      : currentPath === forgotPasswordPath
        ? 'forgot-password'
        : currentPath === resetPasswordPath
          ? 'reset-password'
          : 'sign-in'
  const authVisualImage = activeAuthMode === 'sign-up' ? authCreateAccountImage : authSignInImage
  const authVisualAlt =
    activeAuthMode === 'sign-up'
      ? 'Retro new customer desk with paper forms, stickers, and a cassette'
      : 'Retro video store customer counter with VHS tapes and a CRT television'
  const passwordStrength = useMemo(() => getPasswordStrength(authPasswordDraft), [authPasswordDraft])
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

  useEffect(() => {
    customerRef.current = customer
  }, [customer])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined

    let active = true

    const syncCustomerFromSession = async (session) => {
      if (!session?.user) return
      try {
        const nextCustomer = await getSupabaseCustomer(session.user, customerRef.current)
        if (!active) return
        setCustomer(nextCustomer)
        setSupportTickets(nextCustomer.supportTickets ?? [])
        saveStoredCustomer(nextCustomer)
      } catch {
        // Keep cached demo account if Supabase profile sync is temporarily unavailable.
      }
    }

    supabase.auth.getSession().then(({ data }) => syncCustomerFromSession(data.session))
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setCustomer(null)
        setSupportTickets([])
        saveStoredCustomer(null)
        return
      }
      syncCustomerFromSession(session)
    })

    return () => {
      active = false
      authListener.subscription.unsubscribe()
    }
  }, [])

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
    setSelectedOrderId((currentId) => currentId ?? customerOrders[0]?.id ?? null)
    navigateToPath(getAccountPath(nextTab))
  }, [customerOrders, navigateToPath])

  const openAccountSupport = useCallback((actionId = 'help') => {
    const nextAction = accountSupportActions.some((action) => action.id === actionId) ? actionId : 'help'
    setActiveSupportAction(nextAction)
    setSupportTicketNotice('')
    if (nextAction === 'order') {
      setSelectedOrderId((currentId) => currentId ?? customerOrders[0]?.id ?? null)
    }
    navigateToAccount('support')
  }, [customerOrders, navigateToAccount])

  const openProductDetail = (product) => {
    setSelectedProduct(product)
    setSelectedOptions(getDefaultOptions(product))
    setSelectedPdpAddOnIds([])
    setPdpStickyCartVisible(false)
    setSelectedProductQuantity(1)
    setActiveProductImageIndex(getInitialProductImageIndex(product))
    setReviewsModalOpen(false)
    setReviewsModalPage(1)
    trackStoreEvent('view_product', {
      product_id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
    })
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

  const submitSupportTicket = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const message = String(formData.get('message') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()

    if (!email || !message) {
      setSupportTicketNotice('Please add your email and a short message.')
      return
    }

    try {
      const issueType = String(formData.get('issueType') ?? selectedSupportAction.issueType)
      const orderId = String(formData.get('orderId') ?? '')
      let nextTicket = {
        id: `SUP-${Date.now().toString().slice(-6)}`,
        action: selectedSupportAction.title,
        email,
        issueType,
        orderId,
        message,
        status: 'open',
        createdAt: new Date().toISOString(),
      }

      if (customer?.id && isSupabaseConfigured && supabase) {
        const client = requireSupabaseClient()
        const { data, error } = await client
          .from('support_tickets')
          .insert({
            user_id: customer.id,
            email,
            order_number: orderId || null,
            topic: issueType,
            message,
            status: 'open',
          })
          .select('id, email, order_number, topic, message, status, created_at')
          .single()

        if (error) throw error
        nextTicket = {
          ...mapSupabaseSupportTicket(data),
          action: selectedSupportAction.title,
        }
      }

      setSupportTickets((currentTickets) => [nextTicket, ...currentTickets].slice(0, 4))
      setSupportTicketNotice(`Ticket ${nextTicket.id} received. We'll reply to ${email}.`)
      form.reset()
    } catch (error) {
      setSupportTicketNotice(error.message || 'Could not send support request.')
    }
  }

  const submitOrderTracking = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const rawOrderId = String(formData.get('orderId') ?? '').trim().replace(/^#/, '')
    const email = String(formData.get('email') ?? '').trim().toLowerCase()
    const foundOrder = customerOrders.find((order) => order.id.toLowerCase() === rawOrderId.toLowerCase())

    if (!foundOrder) {
      setTrackedOrderId('')
      setTrackingNotice('Order not found. Check the order number and checkout email.')
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

  const addToCart = (item, event, options = {}) => {
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
    trackStoreEvent('add_to_cart', {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    })
    if (!options.suppressFeedback) showCartFeedback(product, event?.currentTarget)
  }

  const addSelectedProductToCart = (event) => {
    if (!selectedProduct) return

    addToCart({
      ...selectedProduct,
      cartId: `${selectedProduct.id}:${selectedVariantSummary || 'default'}`,
      price: selectedVariantPrice,
      optionSummary: selectedVariantSummary,
      quantity: selectedProductQuantity,
    }, event)

    selectedInlineAddOns.forEach((product) => {
      addToCart({
        ...product,
        cartId: `${product.id}:pdp-add-on`,
        price: Math.round(product.price * 0.9 * 100) / 100,
        optionSummary: `Complete the Scene add-on for ${selectedProduct.name}`,
        quantity: 1,
      }, null, { suppressFeedback: true })
    })
  }

  const buySelectedProductNow = (event) => {
    addSelectedProductToCart(event)
    setCartOpen(true)
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

  const submitEmailSignup = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email') ?? '').trim()

    if (!email) {
      setSignupNotice('Add your email to unlock the code.')
      return
    }

    setSignupNotice('Code unlocked: REWIND10 for 10% off.')
    setPromoCode('REWIND10')
    trackStoreEvent('email_signup', { email_domain: email.split('@')[1] ?? 'unknown' })
    form.reset()
  }

  const openAuth = (mode = 'sign-in') => {
    setCartOpen(false)
    setCheckoutOpen(false)
    setAuthPasswordDraft('')
    setAuthPasswordTouched(false)
    setAuthPasswordNotice('')
    setAuthResetPath('')
    navigateToPath(mode === 'sign-up' ? createAccountPath : mode === 'forgot-password' ? forgotPasswordPath : signInPath)
  }

  const openAccountDashboard = (tab = 'orders') => {
    navigateToAccount(tab)
  }

  const openOrderDetail = (order) => {
    setSelectedOrderId(order.id)
    setOrderDetailNotice('')
    setReviewEditor(null)
    setReviewNotice('')
    setOrderDetailOpen(true)
  }

  const openPurchaseReview = (order, item) => {
    setReviewNotice('')
    setReviewEditor({
      orderId: order.id,
      orderDbId: order.dbId,
      productId: item.productId,
      productName: item.productName,
    })
  }

  const submitPurchaseReview = async ({ rating, title, body, images }) => {
    if (!reviewEditor || !customer?.id) return

    setReviewSubmitting(true)
    setReviewNotice('')

    try {
      const client = requireSupabaseClient()
      const { data: authData, error: authError } = await client.auth.getUser()
      if (authError) throw authError
      if (!authData.user || authData.user.id !== customer.id) {
        throw new Error('Sign in again before posting your review.')
      }

      const { data, error } = await client
        .from('product_reviews')
        .insert({
          user_id: authData.user.id,
          order_id: reviewEditor.orderDbId,
          product_id: reviewEditor.productId,
          reviewer_name: String(customer.name || 'Retro Shopper').trim().slice(0, 80),
          rating,
          title,
          body,
          status: 'published',
        })
        .select('id, user_id, order_id, product_id, reviewer_name, rating, title, body, status, created_at')
        .single()

      if (error) throw error

      const nextReview = mapProductReview(data)
      if (Array.isArray(images) && images.length) {
        nextReview.images = images
        setReviewImages((current) => {
          const next = { ...current, [nextReview.id]: images }
          saveStoredReviewImages(next)
          return next
        })
      }
      setCustomer((currentCustomer) => {
        const nextCustomer = {
          ...currentCustomer,
          reviews: [nextReview, ...(currentCustomer?.reviews ?? [])],
        }
        saveStoredCustomer(nextCustomer)
        return nextCustomer
      })
      if (selectedProduct?.id === nextReview.productId) {
        setProductReviews((currentReviews) => [nextReview, ...currentReviews])
      }
      trackStoreEvent('product_review_submitted', {
        product_id: nextReview.productId,
        order_id: reviewEditor.orderId,
        rating: nextReview.rating,
      })
      setReviewEditor(null)
      setReviewNotice('Thank you — your verified review is now live.')
    } catch (error) {
      if (error.code === '23505') {
        setReviewNotice('You already reviewed this product from this order.')
      } else if (error.code === '42501') {
        setReviewNotice('Reviews unlock after payment is confirmed or the order is delivered.')
      } else {
        setReviewNotice(error.message || 'Could not post your review. Please try again.')
      }
    } finally {
      setReviewSubmitting(false)
    }
  }

  const hasPurchasedProduct = (productId) =>
    (customer?.orders ?? []).some(
      (order) =>
        isOrderReviewEligible(order) &&
        getReviewableOrderItems(order, products).some((item) => item.productId === productId),
    )

  // PDP "Write a review": demo flow that stores the review (and photos) client-side.
  const submitPdpReview = ({ rating, title, body, reviewerName, images }) => {
    if (!selectedProduct) return

    const name = String(customer?.name || reviewerName || 'Guest reviewer').trim().slice(0, 60) || 'Guest reviewer'
    const newReview = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId: selectedProduct.id,
      reviewerName: name,
      rating,
      title,
      body,
      images: Array.isArray(images) ? images : [],
      verified: hasPurchasedProduct(selectedProduct.id),
      source: 'local',
      createdAt: new Date().toISOString(),
    }

    const nextReviews = [newReview, ...localReviews]
    setLocalReviews(nextReviews)
    const saved = saveStoredLocalReviews(nextReviews)

    trackStoreEvent('product_review_submitted', {
      product_id: selectedProduct.id,
      rating,
      source: 'pdp',
    })
    setPdpReviewOpen(false)
    setPdpReviewNotice(
      saved
        ? 'Thanks! Your review is now live on this product.'
        : 'Your review is live for this session, but photos were too large to save for next time.',
    )
  }

  const updateOrderDateRange = (field, value) => {
    setOrderDateRange((currentRange) => ({ ...currentRange, [field]: value }))
    setOrdersExpanded(false)
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const confirmPassword = String(formData.get('confirmPassword') ?? '')

    if (activeAuthMode === 'sign-up') {
      const submittedStrength = getPasswordStrength(password)

      setAuthPasswordDraft(password)
      setAuthPasswordTouched(true)

      if (!submittedStrength.isAcceptable) {
        setAuthPasswordNotice('Password is not strong enough yet. Add length and mix letters, numbers, and symbols.')
        return
      }

      if (password !== confirmPassword) {
        setAuthPasswordNotice('Confirm password needs to match the password field.')
        return
      }
    }

    try {
      const client = requireSupabaseClient()
      const fallbackName = email.split('@')[0] || 'Retro Shopper'
      const name = String(formData.get('name') ?? '').trim() || fallbackName
      const authResult =
        activeAuthMode === 'sign-up'
          ? await client.auth.signUp({
              email,
              password,
              options: {
                data: { name },
                emailRedirectTo: `${window.location.origin}${signInPath}`,
              },
            })
          : await client.auth.signInWithPassword({ email, password })

      if (authResult.error) throw authResult.error

      if (!authResult.data.session && activeAuthMode === 'sign-up') {
        setAuthPasswordNotice('Account created. Check your email to confirm the account, then sign in.')
        return
      }

      const authUser = authResult.data.user
      if (!authUser) throw new Error('Could not load the account after authentication.')

      if (activeAuthMode === 'sign-up') {
        await upsertSupabaseProfile(authUser, { email, name })
      }
      const nextCustomer = await getSupabaseCustomer(authUser, customer)

      setCustomer(nextCustomer)
      setSupportTickets(nextCustomer.supportTickets ?? [])
      saveStoredCustomer(nextCustomer)
      setAuthPasswordNotice('')
      setAccountTab('orders')
      setSelectedOrderId(nextCustomer.orders[0]?.id ?? null)
      navigateToAccount('orders')
    } catch (error) {
      setAuthPasswordNotice(error.message || 'Could not complete account sign in.')
    }
  }

  const handleOAuthSignIn = async (provider) => {
    try {
      const client = requireSupabaseClient()
      const { error } = await client.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}${signInPath}` },
      })
      if (error) throw error
    } catch (error) {
      setAuthPasswordNotice(error.message || `Could not start ${provider} sign-in.`)
    }
  }

  const handleResetPasswordSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = String(formData.get('password') ?? '')
    const confirmPassword = String(formData.get('confirmPassword') ?? '')
    const submittedStrength = getPasswordStrength(password)

    setAuthPasswordDraft(password)
    setAuthPasswordTouched(true)

    if (!submittedStrength.isAcceptable) {
      setAuthPasswordNotice('Password is not strong enough yet. Add length and mix letters, numbers, and symbols.')
      return
    }

    if (password !== confirmPassword) {
      setAuthPasswordNotice('Confirm password needs to match the password field.')
      return
    }

    try {
      const client = requireSupabaseClient()
      const { error } = await client.auth.updateUser({ password })
      if (error) throw error
      setAuthPasswordDraft('')
      setAuthPasswordTouched(false)
      setAuthPasswordNotice('Password reset complete. Sign in with your new password.')
      await client.auth.signOut()
      navigateToPath(signInPath)
    } catch (error) {
      setAuthPasswordNotice(error.message || 'Could not reset password. Request a fresh reset link and try again.')
    }
  }

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()

    setAuthResetPath('')

    try {
      const client = requireSupabaseClient()
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${resetPasswordPath}`,
      })
      if (error) throw error
      setAuthPasswordNotice('If that email exists, a reset link will be sent.')
    } catch (error) {
      setAuthPasswordNotice(error.message || 'Could not request reset link.')
    }
  }

  const requestLogout = () => {
    setLogoutConfirmOpen(true)
  }

  const logoutCustomer = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut()
      }
    } catch {
      // Local logout should still complete if Supabase is temporarily unavailable.
    }
    setCustomer(null)
    setSupportTickets([])
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

  const saveWishlistIds = (nextWishlistIds) => {
    if (customer) {
      updateCustomerProfile({ wishlistIds: nextWishlistIds })
      return
    }

    setGuestWishlistIds(nextWishlistIds)
    saveStoredWishlistIds(nextWishlistIds)
  }

  const toggleWishlistProduct = async (product, options = {}) => {
    const productId = product?.id
    if (!productId) return

    const nextWishlistIds = activeWishlistIds.includes(productId)
      ? activeWishlistIds.filter((wishlistId) => wishlistId !== productId)
      : [productId, ...activeWishlistIds]

    try {
      if (customer?.id && isSupabaseConfigured && supabase) {
        const client = requireSupabaseClient()
        const isSaved = activeWishlistIds.includes(productId)
        const result = isSaved
          ? await client.from('wishlist_items').delete().eq('user_id', customer.id).eq('product_id', productId)
          : await client.from('wishlist_items').upsert(
              { user_id: customer.id, product_id: productId },
              { onConflict: 'user_id,product_id' },
            )

        if (result.error) throw result.error
      }

      saveWishlistIds(nextWishlistIds)
      if (options.openAccount) {
        navigateToAccount('wishlist')
      }
    } catch (error) {
      setCartNotice({
        key: Date.now(),
        message: error.message || 'Could not update wishlist.',
        placement: 'above',
      })
    }
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

  const submitAddressForm = async (event) => {
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

    try {
      let savedAddress = nextAddress

      if (customer?.id && isSupabaseConfigured && supabase) {
        const client = requireSupabaseClient()
        const payload = addressToSupabasePayload(nextAddress, customer.id)

        if (payload.is_primary) {
          const { error } = await client
            .from('addresses')
            .update({ is_primary: false, label: 'Saved' })
            .eq('user_id', customer.id)

          if (error) throw error
        }

        const result =
          addressEditorMode === 'edit'
            ? await client
                .from('addresses')
                .update(payload)
                .eq('id', nextAddress.id)
                .eq('user_id', customer.id)
                .select('id, label, name, line1, line2, city_state, country, phone, is_primary')
                .single()
            : await client
                .from('addresses')
                .insert(payload)
                .select('id, label, name, line1, line2, city_state, country, phone, is_primary')
                .single()

        if (result.error) throw result.error
        savedAddress = mapSupabaseAddress(result.data)
      }

      const nextAddresses =
        addressEditorMode === 'edit'
          ? savedAddresses.map((address) => (address.id === savedAddress.id ? savedAddress : address))
          : [...savedAddresses, savedAddress]

      const normalizedAddresses =
        savedAddress.label.toLowerCase() === 'primary'
          ? nextAddresses.map((address) =>
              address.id === savedAddress.id
                ? { ...address, label: 'Primary' }
                : address.label.toLowerCase() === 'primary'
                  ? { ...address, label: 'Saved' }
                  : address,
            )
          : nextAddresses

      saveCustomerAddresses(normalizedAddresses, addressEditorMode === 'edit' ? 'Address updated.' : 'Address added.')
      closeAddressEditor()
    } catch (error) {
      setAddressNotice(error.message || 'Could not save address.')
    }
  }

  const deleteAddress = async (addressId) => {
    const address = savedAddresses.find((item) => item.id === addressId)
    if (!address) return
    if (!window.confirm(`Delete ${address.label} address?`)) return

    try {
      if (customer?.id && isSupabaseConfigured && supabase) {
        const client = requireSupabaseClient()
        const { error } = await client.from('addresses').delete().eq('id', addressId).eq('user_id', customer.id)
        if (error) throw error
      }

      const nextAddresses = savedAddresses.filter((item) => item.id !== addressId)
      saveCustomerAddresses(nextAddresses, 'Address deleted.')
      if (addressDraft.id === addressId) closeAddressEditor()
    } catch (error) {
      setAddressNotice(error.message || 'Could not delete address.')
    }
  }

  const setPrimaryAddress = async (addressId) => {
    try {
      if (customer?.id && isSupabaseConfigured && supabase) {
        const client = requireSupabaseClient()
        const clearResult = await client
          .from('addresses')
          .update({ is_primary: false, label: 'Saved' })
          .eq('user_id', customer.id)

        if (clearResult.error) throw clearResult.error

        const primaryResult = await client
          .from('addresses')
          .update({ is_primary: true, label: 'Primary' })
          .eq('id', addressId)
          .eq('user_id', customer.id)

        if (primaryResult.error) throw primaryResult.error
      }

      const nextAddresses = savedAddresses.map((address) => {
        if (address.id === addressId) return { ...address, label: 'Primary' }
        if (address.label.toLowerCase() === 'primary') return { ...address, label: 'Saved' }
        return address
      })
      saveCustomerAddresses(nextAddresses, 'Primary address updated.')
    } catch (error) {
      setAddressNotice(error.message || 'Could not update primary address.')
    }
  }

  const submitProfileUpdate = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextName = String(formData.get('name') ?? '').trim()
    const nextEmail = String(formData.get('email') ?? '').trim()
    const profileUpdates = {
      name: nextName || customer.name,
      email: nextEmail || customer.email,
    }

    try {
      const client = requireSupabaseClient()
      const { data, error } = await client.auth.updateUser({
        email: profileUpdates.email,
        data: { name: profileUpdates.name },
      })
      if (error) throw error
      await upsertSupabaseProfile(data.user, profileUpdates)
      updateCustomerProfile(profileUpdates)
      setProfileEditorOpen(false)
      setProfileNotice(
        profileUpdates.email !== customer.email
          ? 'Profile updated. Confirm the new email if Supabase sends a verification link.'
          : 'Profile updated.',
      )
    } catch (error) {
      setProfileNotice(error.message || 'Could not update profile.')
    }
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

  const updatePasswordDraft = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const currentPassword = String(formData.get('currentPassword') ?? '')
    const newPassword = String(formData.get('newPassword') ?? '')
    const confirmPassword = String(formData.get('confirmPassword') ?? '')
    const submittedStrength = getPasswordStrength(newPassword)

    if (!submittedStrength.isAcceptable) {
      setSecurityNotice('New password is not strong enough. Use 8+ characters with mixed letters, numbers, and a symbol.')
      return
    }

    if (newPassword !== confirmPassword) {
      setSecurityNotice('Confirm new password needs to match.')
      return
    }

    try {
      const client = requireSupabaseClient()
      const reauthResult = await client.auth.signInWithPassword({
        email: customer.email,
        password: currentPassword,
      })
      if (reauthResult.error) throw new Error('Current password is incorrect.')

      const { error } = await client.auth.updateUser({ password: newPassword })
      if (error) throw error
      const nextCustomer = await getSupabaseCustomer(reauthResult.data.user, customer)
      setCustomer(nextCustomer)
      saveStoredCustomer(nextCustomer)
      form.reset()
      setSecurityNotice('Password updated. Existing sessions were refreshed.')
    } catch (error) {
      setSecurityNotice(error.message || 'Could not update password.')
    }
  }

  const sendResetLinkDraft = async () => {
    try {
      const client = requireSupabaseClient()
      const { error } = await client.auth.resetPasswordForEmail(customer.email, {
        redirectTo: `${window.location.origin}${resetPasswordPath}`,
      })
      if (error) throw error
      setSecurityNotice('If that email exists, a reset link will be sent.')
    } catch (error) {
      setSecurityNotice(error.message || 'Could not request reset link.')
    }
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
    trackStoreEvent('begin_checkout', {
      value: total,
      item_count: itemCount,
    })
    setCartOpen(false)
    setCheckoutDone(false)
    setPaymentMethod('paypal')
    setPaypalDemoState('idle')
    setCheckoutOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitCheckout = async (event) => {
    event.preventDefault()
    if (paymentMethod === 'paypal' && paypalDemoState !== 'approved') {
      setPaypalDemoState('required')
      return
    }
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? customer?.email ?? 'demo@1989supply.co').trim()
    const name = String(formData.get('name') ?? customer?.name ?? 'Retro Shopper').trim()
    const shippingAddressParts = [
      formData.get('address'),
      formData.get('city'),
      formData.get('zip'),
    ].map((value) => String(value ?? '').trim())
    const shippingAddress = shippingAddressParts
      .map((value) => String(value ?? '').trim())
      .filter(Boolean)
      .join(', ')
    orderNumberCounterRef.current += 1
    const nextOrderNumber = `${Math.round(event.timeStamp).toString().slice(-6)}${String(orderNumberCounterRef.current).padStart(2, '0')}`
    const completedOrder = {
      id: `DI1989-${nextOrderNumber}`,
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
      payment: paymentMethod === 'paypal' ? 'PayPal pending review' : 'Payment pending review',
      fulfillment: 'Production pending',
      tracking: 'Tracking appears after shipment',
      shippingAddress,
      timeline: [
        { label: 'Order received', detail: 'Demo checkout saved to the customer dashboard.', done: true },
        { label: 'Payment review', detail: 'No real payment is trusted until provider confirmation is verified.', done: false },
        { label: 'Production review', detail: 'Next real step is sending the order into production after human approval.', done: false },
        { label: 'Production', detail: 'Production begins only after the order is confirmed.', done: false },
        { label: 'Tracking', detail: 'Carrier tracking appears here after shipment.', done: false },
      ],
    }

    try {
      let savedOrder = completedOrder

      if (customer?.id && isSupabaseConfigured && supabase) {
        const client = requireSupabaseClient()
        const orderResult = await client
          .from('orders')
          .insert({
            user_id: customer.id,
            order_number: completedOrder.id,
            customer_email: email,
            customer_name: name,
            status: 'order_received',
            payment_provider: 'paypal',
            payment_status: 'pending_review',
            fulfillment_status: 'production_pending',
            subtotal,
            discount,
            shipping,
            total,
            currency: 'USD',
            shipping_address: {
              address: shippingAddressParts[0] || '',
              city: shippingAddressParts[1] || '',
              zip: shippingAddressParts[2] || '',
              country: 'United States',
              items: cart.map((item) => ({
                product_id: String(item.id ?? '').split(':')[0] || null,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                option_summary: item.optionSummary || null,
              })),
            },
            timeline: completedOrder.timeline,
          })
          .select('id, order_number, status, payment_provider, payment_status, fulfillment_status, subtotal, discount, shipping, total, shipping_address, tracking_number, tracking_url, timeline, created_at')
          .single()

        if (orderResult.error) throw orderResult.error

        savedOrder = mapSupabaseOrder({
          ...orderResult.data,
          order_items: cart.map((item) => ({
            product_id: String(item.id ?? '').split(':')[0] || null,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            option_summary: item.optionSummary || null,
          })),
        })
      }

      const existingOrders = customer && Array.isArray(customer.orders) ? customer.orders : []
      const nextCustomer = {
        ...customer,
        name,
        email,
        joined: customer?.joined ?? 'June 2026',
        orders: [savedOrder, ...existingOrders],
        addresses: normalizeAccountAddresses(customer?.addresses),
        wishlistIds: customer?.wishlistIds ?? guestWishlistIds,
      }
      setCustomer(nextCustomer)
      saveStoredCustomer(nextCustomer)
      trackStoreEvent('purchase_demo', {
        order_id: savedOrder.id,
        value: total,
        item_count: itemCount,
      })
      setSelectedOrderId(savedOrder.id)
      setAccountTab('orders')
      setCheckoutDone(true)
      setCart([])
      setPromoCode('')
      setPromoState('idle')
    } catch (error) {
      cartFeedbackCounterRef.current += 1
      setPaypalDemoState('idle')
      setCartNotice({
        key: cartFeedbackCounterRef.current,
        message: error.message || 'Could not save order.',
        placement: 'above',
      })
    }
  }

  const isRevenueDashboard = window.location.pathname === '/dashboard' || window.location.hash === '#revenue-dashboard'

  if (isRevenueDashboard) {
    return <RevenueDashboard />
  }

  if (authPageOpen) {
    return (
      <main className={`auth-page auth-page--${activeAuthMode}`} aria-labelledby="auth-title">
        <button className="auth-page-brand" type="button" onClick={() => navigateToPath('/')}>
          <img src={dreaming1989LogoImage} alt="1989 Supply Co." />
        </button>
        <div className="auth-page-shell">
          <section className="auth-page-panel" aria-labelledby="auth-title">
            <p className="receipt-label">Customer counter</p>
            <h1 id="auth-title">
              {activeAuthMode === 'sign-up'
                ? 'Create account'
                : activeAuthMode === 'forgot-password'
                  ? 'Reset link'
                : activeAuthMode === 'reset-password'
                  ? 'Reset password'
                  : 'Sign in'}
            </h1>
            <p className="auth-page-lede">
              {activeAuthMode === 'sign-up'
                ? 'Start a customer account for saved orders, quicker checkout, and support history.'
                : activeAuthMode === 'forgot-password'
                  ? 'Enter your account email and we will prepare a reset link.'
                : activeAuthMode === 'reset-password'
                  ? 'Choose a new password for your customer counter file.'
                : 'Access saved orders, checkout details, wishlist picks, and account history.'}
            </p>

            {activeAuthMode !== 'forgot-password' && activeAuthMode !== 'reset-password' && (
              <div className="auth-mode-tabs" aria-label="Account mode">
                <button
                  className={activeAuthMode === 'sign-in' ? 'active' : ''}
                  type="button"
                  aria-pressed={activeAuthMode === 'sign-in'}
                  onClick={() => openAuth('sign-in')}
                >
                  <LogIn size={15} aria-hidden="true" />
                  Sign in
                </button>
                <button
                  className={activeAuthMode === 'sign-up' ? 'active' : ''}
                  type="button"
                  aria-pressed={activeAuthMode === 'sign-up'}
                  onClick={() => openAuth('sign-up')}
                >
                  <User size={15} aria-hidden="true" />
                  Sign up
                </button>
              </div>
            )}

            <form
              className={`auth-form auth-page-form auth-page-form--${activeAuthMode}`}
              onSubmit={
                activeAuthMode === 'reset-password'
                  ? handleResetPasswordSubmit
                  : activeAuthMode === 'forgot-password'
                    ? handleForgotPasswordSubmit
                    : handleAuthSubmit
              }
            >
              {activeAuthMode === 'sign-up' && (
                <label className="auth-field">
                  <span>Full name</span>
                  <div className="auth-input-shell">
                    <User size={17} aria-hidden="true" />
                    <input name="name" autoComplete="name" placeholder="Alex Taylor" />
                  </div>
                </label>
              )}
              {activeAuthMode !== 'reset-password' && (
                <label className="auth-field">
                  <span>Email</span>
                  <div className="auth-input-shell">
                    <Mail size={17} aria-hidden="true" />
                    <input name="email" required type="email" autoComplete="email" placeholder="alex@example.com" />
                  </div>
                </label>
              )}
              {activeAuthMode !== 'forgot-password' && (
                <label className="auth-field">
                  <span>{activeAuthMode === 'reset-password' ? 'New password' : 'Password'}</span>
                  <div className="auth-input-shell">
                    <Lock size={17} aria-hidden="true" />
                    <input
                      required
                      name="password"
                      type="password"
                      value={authPasswordDraft}
                      autoComplete={activeAuthMode === 'sign-in' ? 'current-password' : 'new-password'}
                      aria-describedby={activeAuthMode !== 'sign-in' ? 'password-strength-note' : undefined}
                      placeholder="Your password"
                      onBlur={() => setAuthPasswordTouched(true)}
                      onChange={(event) => {
                        setAuthPasswordDraft(event.target.value)
                        setAuthPasswordTouched(true)
                        setAuthPasswordNotice('')
                      }}
                    />
                  </div>
                </label>
              )}
              {activeAuthMode !== 'sign-in' && activeAuthMode !== 'forgot-password' && (
                <label className="auth-field">
                  <span>{activeAuthMode === 'reset-password' ? 'Confirm new password' : 'Confirm password'}</span>
                  <div className="auth-input-shell">
                    <Lock size={17} aria-hidden="true" />
                    <input
                      required
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Type it once more"
                      onChange={() => setAuthPasswordNotice('')}
                    />
                  </div>
                </label>
              )}
              {activeAuthMode !== 'sign-in' && activeAuthMode !== 'forgot-password' && (authPasswordTouched || authPasswordDraft) && (
                <div
                  id="password-strength-note"
                  className={`password-strength password-strength--${passwordStrength.tone}`}
                  aria-live="polite"
                >
                  <div className="password-strength-meter" aria-hidden="true">
                    <span style={{ width: `${passwordStrength.percent}%` }} />
                  </div>
                  <p>
                    <strong>{passwordStrength.label}</strong>
                    <span>{passwordStrength.message}</span>
                  </p>
                </div>
              )}
              {authPasswordNotice && (
                <p className="auth-password-alert" role="alert">
                  {authPasswordNotice}
                </p>
              )}
              {authResetPath && (
                <button className="auth-reset-link-button" type="button" onClick={() => navigateToPath(authResetPath)}>
                  Open dev reset link
                </button>
              )}
              <button className="checkout-button" type="submit">
                {activeAuthMode === 'sign-up'
                  ? 'Create Account'
                  : activeAuthMode === 'forgot-password'
                    ? 'Send Reset Link'
                  : activeAuthMode === 'reset-password'
                    ? 'Reset Password'
                    : 'Sign In'}
              </button>
            </form>

            {activeAuthMode === 'sign-in' && (
              <button className="auth-forgot-button" type="button" onClick={() => openAuth('forgot-password')}>
                Forgot password?
              </button>
            )}

            {activeAuthMode !== 'forgot-password' && activeAuthMode !== 'reset-password' && (
              <>
                <div className="auth-oauth-divider">
                  <span>or</span>
                </div>
                <div className="auth-oauth-options">
                  <button type="button" className="auth-oauth-button auth-oauth-google" onClick={() => handleOAuthSignIn('google')}>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="#4285F4" d="M23.04 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.18a5.28 5.28 0 0 1-2.29 3.46v2.88h3.7c2.16-1.99 3.45-4.93 3.45-8.37z" />
                      <path fill="#34A853" d="M12 23c3.1 0 5.7-1.02 7.59-2.76l-3.7-2.88c-1.03.7-2.35 1.1-3.89 1.1-2.98 0-5.5-2-6.4-4.7H1.8v2.97A11.99 11.99 0 0 0 12 23z" />
                      <path fill="#FBBC05" d="M5.6 13.76A7.16 7.16 0 0 1 5.22 12c0-.61.1-1.2.28-1.76V7.27H1.8a11.96 11.96 0 0 0 0 9.46z" />
                      <path fill="#EA4335" d="M12 5.54c1.68 0 3.19.58 4.38 1.7l3.28-3.28C17.69 2.09 15.1 1 12 1A11.99 11.99 0 0 0 1.8 7.27l3.8 2.97c.9-2.7 3.42-4.7 6.4-4.7z" />
                    </svg>
                    Continue with Google
                  </button>
                  <button type="button" className="auth-oauth-button auth-oauth-facebook" onClick={() => handleOAuthSignIn('facebook')}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" aria-hidden="true">
                      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
                    </svg>
                    Continue with Facebook
                  </button>
                </div>
              </>
            )}

            <div className="auth-switch auth-page-switch">
              {activeAuthMode === 'sign-up'
                ? 'Already have an account?'
                : activeAuthMode === 'reset-password' || activeAuthMode === 'forgot-password'
                  ? 'Remembered it?'
                  : 'New customer?'}
              <button
                type="button"
                onClick={() => openAuth(activeAuthMode === 'sign-in' ? 'sign-up' : 'sign-in')}
              >
                {activeAuthMode === 'sign-in' ? 'Create account' : 'Sign in'}
              </button>
            </div>
          </section>

          <aside className="auth-page-aside" aria-label="Account benefits">
            <div className="auth-page-photo">
              <img src={authVisualImage} alt={authVisualAlt} />
            </div>
            <span className="auth-page-stamp">
              {activeAuthMode === 'sign-up'
                ? 'New customer file'
                : activeAuthMode === 'reset-password'
                  ? 'Security file'
                  : 'Member file'}
            </span>
            <h2>{activeAuthMode === 'sign-up' ? 'Set up the counter once.' : 'Pick up where you left off.'}</h2>
            <ul>
              <li>Saved orders and demo receipts in one dashboard.</li>
              <li>Wishlist and reorder shortcuts for repeat gifts.</li>
              <li>Support history tied to the checkout email.</li>
            </ul>
            <button type="button" onClick={() => navigateToPath('/')}>
              Back to shop
            </button>
          </aside>
        </div>
      </main>
    )
  }

  const appClassName = [
    'shop-app',
    'memory-entered',
    activeRoute === 'product' ? 'product-route-active' : '',
    activeRoute === 'product' && pdpStickyCartVisible ? 'pdp-sticky-cart-visible' : '',
    checkoutOpen ? 'checkout-page-active' : '',
    accountScreenOpen ? 'account-route-active' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={appClassName}>
      <div className="promo-marquee" role="region" aria-label="Store announcements">
        <div className="promo-marquee-track" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, group) => (
            <span className="promo-marquee-group" key={group}>
              <span><Truck size={13} /> Free shipping over $75</span>
              <span className="promo-marquee-star">★</span>
              <span>New drops every Friday</span>
              <span className="promo-marquee-star">★</span>
              <span><Gift size={13} /> Gift-ready packaging</span>
              <span className="promo-marquee-star">★</span>
              <span>Made to order in the USA</span>
              <span className="promo-marquee-star">★</span>
              <span>Use code REWIND10 for 10% off</span>
              <span className="promo-marquee-star">★</span>
            </span>
          ))}
        </div>
      </div>
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
            <button
              className="cart-button"
              type="button"
              ref={cartButtonRef}
              aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? '' : 's'}`}
              onClick={() => setCartOpen(true)}
            >
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
          <a href="#products">
            <span className="nav-label-desktop">Products</span>
            <span className="nav-label-mobile">Shop</span>
          </a>
          {bundles.length > 0 && <a href="#collections">Bundles</a>}
          <a href="#products">
            <span className="nav-label-desktop">Catalog</span>
            <span className="nav-label-mobile">Catalog</span>
          </a>
          <a className="mobile-gift-link" href="#deals">
            <span className="nav-label-desktop">Gift Counter</span>
            <span className="nav-label-mobile">Gifts</span>
          </a>
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
              <span className="support-label-desktop">Support</span>
              <span className="support-label-mobile">More</span>
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
              <a
                className="mobile-more-only"
                href="#deals"
                role="menuitem"
                onClick={() => setSupportMenuOpen(false)}
              >
                <span>Gift Counter</span>
              </a>
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
        {checkoutOpen ? (
          <section className={`checkout-page ${checkoutDone ? 'checkout-page--done' : ''}`} aria-labelledby="checkout-title">
            <div className="checkout-page-head">
              <button
                className="checkout-back-button"
                type="button"
                onClick={() => {
                  setCheckoutOpen(false)
                  if (!checkoutDone) setCartOpen(true)
                }}
              >
                <ChevronLeft size={18} />
                {checkoutDone ? 'Back to shop' : 'Back to cart'}
              </button>
              <span><Lock size={14} /> Secure SSL checkout</span>
            </div>

            <section className="checkout-modal checkout-page-panel" aria-labelledby="checkout-title">
              {checkoutDone ? (
                <div className="success-state order-receipt checkout-page-success">
                  <div className="order-receipt-head">
                    <strong>1989 SUPPLY CO.</strong>
                    <span>Good Times. Guaranteed.</span>
                  </div>
                  <div className="receipt-dash" aria-hidden="true" />
                  <span className="order-receipt-stamp" aria-hidden="true">PAID</span>
                  <CheckCircle2 size={44} />
                  <h2 id="checkout-title">Order received</h2>
                  <p>Your order request is saved to the customer dashboard. No real payment or live order was created.</p>
                  <div className="receipt-dash" aria-hidden="true" />
                  <p className="order-receipt-thanks">★ Thank you! Come again. ★</p>
                  <div className="receipt-barcode" aria-hidden="true" />
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
                <form className="checkout-page-form" onSubmit={submitCheckout}>
                  <div className="checkout-page-primary">
                    <p className="receipt-label"><Lock size={13} /> Secure checkout</p>
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
                  </div>

                  <aside className="checkout-page-sidebar">
                    <section className="checkout-summary" aria-label="Order summary">
                      <p className="receipt-label">Order summary · {itemCount} item{itemCount === 1 ? '' : 's'}</p>
                      <ul>
                        {cart.map((item) => (
                          <li key={item.id}>
                            <span>{item.name} × {item.quantity}</span>
                            <strong>{formatPrice(item.price * item.quantity)}</strong>
                          </li>
                        ))}
                      </ul>
                      <div className="checkout-summary-lines">
                        <span>Subtotal <strong>{formatPrice(subtotal)}</strong></span>
                        {discount > 0 && <span>Discount <strong>-{formatPrice(discount)}</strong></span>}
                        <span>Shipping <strong>{shipping ? formatPrice(shipping) : 'Free'}</strong></span>
                        <span className="checkout-summary-total">Total <strong>{formatPrice(total)}</strong></span>
                      </div>
                    </section>

                    <div className="review-box">
                      <CreditCard size={20} />
                      <span>Review total</span>
                      <strong>{formatPrice(total)}</strong>
                    </div>
                    <button className="checkout-button" type="submit">
                      <Lock size={16} />
                      Place Order
                    </button>
                    <div className="checkout-reassurance">
                      <span><Lock size={14} /> SSL-encrypted &amp; secure</span>
                      <PaymentBadges />
                    </div>
                  </aside>
                </form>
              )}
            </section>
          </section>
        ) : activePolicyRoute ? (
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
                <span>Store policy</span>
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
                    <h2>Services involved</h2>
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
            <section
              className={`store-section product-route-page product-route-page--reset pdp-tone-${selectedProductExperience.tone}${
                pdpStickyCartVisible ? ' pdp-sticky-cart-visible' : ''
              }`}
            >
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

              <div className="catalog-pdp-hero" ref={productHeroRef}>
                <div className="catalog-pdp-gallery-shell">
                  <aside
                    className="catalog-pdp-gallery"
                    ref={productGalleryRef}
                    aria-label={`${selectedProduct.name} product views`}
                  >
                    {selectedProductGallery.map((item, index) => (
                      <button
                        className={activeProductImageIndex === index ? 'active' : ''}
                        key={`${selectedProduct.id}-${item.label}`}
                        type="button"
                        onClick={() => setActiveProductImageIndex(index)}
                      >
                        <img src={item.image} alt={`${selectedProduct.name} ${item.label}`} />
                        <span>
                          <b>{String(index + 1).padStart(2, '0')}</b> {item.label.replace('Catalog ', '')}
                        </span>
                      </button>
                    ))}
                  </aside>
                </div>

                <figure className="catalog-pdp-main-frame">
                  <span className="catalog-pdp-tape catalog-pdp-tape--top" aria-hidden="true" />
                  <span className="catalog-pdp-bestseller-stamp" aria-hidden="true">{selectedProduct.tag}</span>
                  <button
                    type="button"
                    className="catalog-pdp-zoom-trigger"
                    onClick={() => openImageInfo({ ...selectedProduct, image: activeProductImage }, 'Product image', 'product')}
                    aria-label={`Zoom in on ${selectedProduct.name}`}
                  >
                    <img src={activeProductImage} alt={selectedProduct.name} />
                    <span className="catalog-pdp-zoom-hint" aria-hidden="true"><Search size={13} /> Zoom</span>
                  </button>
                  <figcaption>
                    <span><b>SKU</b> {selectedProduct.sku}</span>
                  </figcaption>
                </figure>

                <article className="catalog-pdp-buy-panel product-catalog-order-form" aria-label="Purchase options">
                  <div className="catalog-pdp-order-head">
                    <span>{selectedProductExperience.orderLabel}</span>
                    <strong>{selectedProduct.sku}</strong>
                  </div>
                  <h1>{selectedProduct.name}</h1>
                  <div className="catalog-pdp-rating">
                    <span aria-label={`${selectedProductReviewRating.toFixed(1)} out of 5 stars`}>★★★★★</span>
                    <button type="button" onClick={() => document.getElementById('pdp-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                      {selectedProductReviewRating.toFixed(1)} rating / {selectedProductReviewCount} reviews
                    </button>
                  </div>
                  <p className="catalog-pdp-short">{selectedProduct.shortDetail}</p>

                  <div className="catalog-pdp-price-row">
                    <div>
                      <span className="catalog-pdp-price-line">
                        <strong>{formatPrice(selectedVariantPrice)}</strong>
                        {selectedVariantDiscount > 0 && <s>{formatPrice(selectedVariantCompareAt)}</s>}
                        {selectedVariantDiscount > 0 && (
                          <b className="catalog-pdp-save-badge">Save {selectedVariantDiscount}%</b>
                        )}
                      </span>
                    </div>
                    <span
                      className={`stock-pill stock-pill--${
                        selectedProduct.stockState === 'sold-out'
                          ? 'out'
                          : selectedProduct.stockState === 'low-stock'
                            ? 'low'
                            : 'in'
                      }`}
                    >
                      {selectedProduct.stockState === 'sold-out'
                        ? 'Sold out'
                        : selectedProduct.stockState === 'low-stock'
                          ? 'Only a few left'
                      : 'In stock'}
                    </span>
                  </div>

                  <p className="catalog-pdp-installment">
                    <CreditCard size={14} />
                    <span>or 4 interest-free payments of <strong>{formatPrice(selectedVariantPrice / 4)}</strong></span>
                  </p>

                  <div className="catalog-pdp-options">
                    {selectedOptionGroups.map((group) => (
                      <fieldset key={group.name}>
                        <legend>{group.name}</legend>
                        <div>
                          {group.options.map((option) => (
                            <button
                              className={selectedOptions[group.name] === option.label ? 'active' : ''}
                              key={option.label}
                              type="button"
                              onClick={() => {
                                setSelectedOptions((current) => ({ ...current, [group.name]: option.label }))
                                trackStoreEvent('select_product_option', {
                                  product_id: selectedProduct.id,
                                  option_group: group.name,
                                  option: option.label,
                                })
                              }}
                            >
                              {option.label}
                              {option.priceDelta > 0 && <small>+{formatPrice(option.priceDelta)}</small>}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    ))}
                  </div>

                  <div className="catalog-pdp-quantity">
                    <span>Quantity</span>
                    <div>
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setSelectedProductQuantity((quantity) => Math.max(1, quantity - 1))}
                      >
                        <Minus size={15} />
                      </button>
                      <strong>{selectedProductQuantity}</strong>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setSelectedProductQuantity((quantity) => Math.min(9, quantity + 1))}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  {inlineAddOns.length > 0 && (
                    <section className="catalog-pdp-inline-upsell" aria-label="Complete the scene add-ons">
                      <div className="catalog-pdp-inline-upsell-head">
                        <span>Complete the Scene</span>
                        <strong>Save 10% on add-ons</strong>
                      </div>
                      <div className="catalog-pdp-inline-upsell-list">
                        {inlineAddOns.map((product) => {
                          const selected = selectedPdpAddOnIds.includes(product.id)
                          return (
                            <button
                              className={selected ? 'active' : ''}
                              key={`inline-add-on-${product.id}`}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                setSelectedPdpAddOnIds((currentIds) =>
                                  currentIds.includes(product.id)
                                    ? currentIds.filter((productId) => productId !== product.id)
                                    : [...currentIds, product.id],
                                )
                              }
                            >
                              <img src={product.image} alt="" aria-hidden="true" />
                              <span>
                                <strong>{product.name}</strong>
                                <small>{formatPrice(Math.round(product.price * 0.9 * 100) / 100)} add-on</small>
                              </span>
                              <b aria-hidden="true">{selected ? 'Added' : 'Add'}</b>
                            </button>
                          )
                        })}
                      </div>
                      <p>
                        Scene total with selected add-ons: <strong>{formatPrice(selectedPdpOrderTotal)}</strong>
                      </p>
                    </section>
                  )}

                  <div className="catalog-pdp-actions" ref={pdpPrimaryActionsRef}>
                    <button className="catalog-pdp-add-cart" type="button" onClick={addSelectedProductToCart}>
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button className="catalog-pdp-buy-now" type="button" onClick={buySelectedProductNow}>
                      Buy Now
                    </button>
                  </div>
                  <button
                    className={`catalog-pdp-save${activeWishlistIds.includes(selectedProduct.id) ? ' is-saved' : ''}`}
                    type="button"
                    aria-pressed={activeWishlistIds.includes(selectedProduct.id)}
                    onClick={() => toggleWishlistProduct(selectedProduct)}
                  >
                    <Heart size={16} />
                    {activeWishlistIds.includes(selectedProduct.id) ? 'Saved to Wishlist' : 'Save for Later'}
                  </button>
                  <div className="catalog-pdp-panel-trust" aria-label="Purchase guarantees">
                    <span><ShieldCheck size={14} /> Secure checkout</span>
                    <span><RefreshCcw size={14} /> 30-day returns</span>
                    <span><Package size={14} /> Made to order</span>
                  </div>
                  <div className="catalog-pdp-pay-row" aria-label="Accepted payments">
                    <PaymentBadges />
                  </div>
                </article>
              </div>

              <section className="catalog-pdp-memory-row" aria-label="Product memory and story">
                <article className="catalog-pdp-lifestyle-card">
                  <img
                    src={selectedProduct.lifestyleImage ?? selectedProductExperience.lookbook[0]?.[0] ?? backInTheDayMallReferenceImage}
                    alt={`${selectedProduct.name} memory scene`}
                  />
                </article>
                <article className="catalog-pdp-backstory-card">
                  <div className="catalog-pdp-backstory-copy">
                    <h2>{selectedProductExperience.storyTitle}</h2>
                    <p>{selectedProductExperience.storyBody}</p>
                    <ul className="catalog-pdp-story-bullets">
                      {selectedProductExperience.storyBullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="catalog-pdp-story-stamp" aria-hidden="true">
                    <img src={goodTimesStampImage} alt="" />
                  </div>
                </article>
              </section>

              <section className="catalog-pdp-lookbook" aria-label="1989 lookbook">
                <div className="catalog-pdp-section-title">
                  <div>
                    <p className="receipt-label">Straight from the archive</p>
                    <h2>Spotted around the 1989 mall.</h2>
                  </div>
                  <strong>The Lookbook</strong>
                </div>
                <div className="catalog-pdp-lookbook-grid">
                  {selectedProductExperience.lookbook.map(([image, caption]) => (
                    <figure key={caption} className="catalog-pdp-lookbook-card">
                      <img src={image} alt={caption} loading="lazy" />
                      <figcaption>{caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>

              <section className="catalog-pdp-bundle-save" aria-label="Bundle and save">
                <div className="catalog-pdp-section-title">
                  <div>
                    <p className="receipt-label">{selectedProductExperience.bundleEyebrow}</p>
                    <h2>{selectedProductExperience.bundleHeadline}</h2>
                  </div>
                  <strong>{selectedProductExperience.bundleBadge}</strong>
                </div>
                <div className="catalog-pdp-kit">
                  <div className="catalog-pdp-kit-items">
                    {bundleProducts.slice(0, 3).map((product, index) => (
                      <article key={`kit-${product.id}-${index}`}>
                        <img src={product.image} alt={product.name} />
                        <strong>{product.name}</strong>
                        <span>{formatPrice(product.price)}</span>
                        {index < 2 && <b aria-hidden="true">+</b>}
                      </article>
                    ))}
                  </div>
                  <div className="catalog-pdp-kit-checkout">
                    <p className="receipt-label">Bundle total</p>
                    <strong>{formatPrice(bundleDealPrice)}</strong>
                    <s>{formatPrice(bundlePrice)}</s>
                    <em>Save {formatPrice(bundlePrice - bundleDealPrice)}</em>
                    <button type="button" onClick={() => bundleProducts.forEach((product) => addToCart(product, null))}>
                      <span className="bundle-button-label-full">Add Bundle To Cart</span>
                      <span className="bundle-button-label-short">Add</span>
                    </button>
                  </div>
                </div>
              </section>

              <section className="catalog-pdp-reviews-section" id="pdp-reviews" aria-label="Customer reviews">
                <div className="catalog-pdp-section-title">
                  <div>
                    <p className="receipt-label">What shoppers are saying</p>
                    <h2>Proof before the checkout counter.</h2>
                  </div>
                  <button
                    type="button"
                    className="catalog-pdp-write-review"
                    onClick={() => {
                      if (!customer) {
                        setWriteReviewGateOpen(true)
                        return
                      }
                      setPdpReviewNotice('')
                      setPdpReviewOpen((open) => !open)
                    }}
                  >
                    <Sparkles size={15} /> Write a review
                  </button>
                </div>

                {pdpReviewOpen && customer && (
                  <PurchaseReviewForm
                    key={`pdp-review-${selectedProduct.id}`}
                    productName={selectedProduct.name}
                    maxImages={3}
                    showNameField={false}
                    submitLabel="Post review"
                    badgeLabel={hasPurchasedProduct(selectedProduct.id) ? 'Verified purchase' : 'Share your experience'}
                    onCancel={() => setPdpReviewOpen(false)}
                    onSubmit={submitPdpReview}
                  />
                )}
                {pdpReviewNotice && !pdpReviewOpen && (
                  <p className="purchase-review-notice catalog-pdp-review-posted" role="status">{pdpReviewNotice}</p>
                )}

                <div className="catalog-pdp-reviews-grid">
                  <article className="catalog-pdp-reviews-summary">
                    <strong>{selectedProductReviewRating.toFixed(1)}</strong>
                    <span aria-hidden="true">★★★★★</span>
                    <small>Based on {selectedProductReviewCount} reviews</small>
                    {selectedProductReviewDistribution.map(({ rating, percentage }) => (
                      <p key={`rating-bar-${rating}`}>
                        <b>{rating} Stars</b>
                        <i><em style={{ width: `${percentage}%` }} /></i>
                        <small>{percentage}%</small>
                      </p>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setReviewsModalPage(1)
                        setReviewsModalOpen(true)
                      }}
                    >
                      Show all {selectedProductReviewCount} reviews
                    </button>
                  </article>
                  {previewProductReviews.map((review) => (
                    <ProductReviewCard
                      review={review}
                      key={review.id}
                      onImageClick={(src) => openImageInfo({ image: src, name: 'Customer photo' }, 'Customer review photo', 'review')}
                    />
                  ))}
                  {productReviewsLoading && <p className="catalog-pdp-review-loading">Loading recent verified reviews…</p>}
                </div>
              </section>

              <section className="catalog-pdp-faq-section" aria-label="Questions and answers">
                <div className="catalog-pdp-section-title">
                  <div>
                    <p className="receipt-label">FAQ</p>
                    <h2>Questions? We've got answers.</h2>
                  </div>
                </div>
                <div className="catalog-pdp-faq-list">
                  {selectedProductExperience.faqs.map(([Icon, label, question, answer]) => (
                    <details key={label}>
                      <summary>
                        <Icon className="catalog-pdp-faq-icon" size={22} strokeWidth={1.7} aria-hidden="true" />
                        <span>{label}</span>
                        <b aria-hidden="true">-</b>
                        <strong>{question}</strong>
                        <ChevronDown className="catalog-pdp-faq-chevron" size={17} />
                      </summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {relatedProducts.length > 0 && (
                <section className="catalog-pdp-related product-route-related">
                  <div className="section-heading">
                    <div>
                      <p className="receipt-label">More from the shelf</p>
                      <h2>You may also like</h2>
                    </div>
                  </div>
                  <div className="catalog-pdp-related-grid">
                    {relatedProducts.slice(0, 4).map((product) => (
                      <article key={`related-${product.id}`}>
                        <button type="button" onClick={() => openProductDetail(product)}>
                          <img src={product.image} alt={product.name} />
                        </button>
                        <span>{product.category}</span>
                        <h3>{product.name}</h3>
                        <strong>{formatPrice(product.price)}</strong>
                        <button type="button" onClick={(event) => addToCart(product, event)}>Quick Add</button>
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

            {collectionProducts.length ? (
              <div className="collection-route-grid">
                {collectionProducts.map((product) => {
                  const proof = getProductProof(product)
                  return (
                  <article className="product-card collection-product-card" key={`collection-${product.id}`}>
                  <button
                    className="media-square product-image product-image-button product-image--cutout"
                    type="button"
                    onClick={() => openProductDetail(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span>{product.tag}</span>
                    {getDiscountPercent(product.price, product.compareAtPrice) > 0 && (
                      <span className="product-sale-flag" aria-hidden="true">
                        -{getDiscountPercent(product.price, product.compareAtPrice)}%
                      </span>
                    )}
                    {getSunburstLabel(product) && (
                      <span className="price-sunburst" aria-hidden="true">{getSunburstLabel(product)}</span>
                    )}
                  </button>
                  <div className="product-copy">
                    <p className="sku">{product.sku}</p>
                    <button className="product-title-button" type="button" onClick={() => openProductDetail(product)}>
                      {product.name}
                    </button>
                    <span className="proof-rating">
                      <span className="proof-stars" aria-hidden="true">★★★★★</span>
                      <span className="proof-count">{proof.rating.toFixed(1)} ({proof.reviewCount})</span>
                    </span>
                    <p>{product.shortDetail}</p>
                  </div>
                  <div className="product-card-meta">
                    <span
                      className={`stock-pill stock-pill--${
                        product.stockState === 'sold-out' ? 'out' : product.stockState === 'low-stock' ? 'low' : 'in'
                      }`}
                    >
                      {product.stockState === 'sold-out'
                        ? 'Sold out'
                        : product.stockState === 'low-stock'
                          ? 'Only a few left'
                          : 'In stock'}
                    </span>
                    {product.stockState !== 'sold-out' && (
                      <span className="sold-hint">{proof.soldCount}+ sold</span>
                    )}
                  </div>
                  <div className="product-buy">
                    <span className="product-price">
                      <strong>{formatPrice(product.price)}</strong>
                      {getDiscountPercent(product.price, product.compareAtPrice) > 0 && (
                        <s>{formatPrice(product.compareAtPrice)}</s>
                      )}
                    </span>
                    <span className="buy-actions">
                      <button
                        className="collection-view-detail"
                        type="button"
                        onClick={() => openProductDetail(product)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        disabled={product.stockState === 'sold-out'}
                        onClick={(event) => addToCart(product, event)}
                      >
                        <ShoppingCart size={16} />
                        {product.stockState === 'sold-out' ? 'Sold out' : 'Add'}
                      </button>
                    </span>
                  </div>
                  </article>
                  )
                })}
              </div>
            ) : (
              <div className="empty-results empty-results--tv">
                <div className="tv-testcard" aria-hidden="true">
                  <div className="smpte-bars" />
                  <span className="tv-standby">PLEASE STAND BY</span>
                </div>
                <h3>No live products yet</h3>
                <p>This collection is ready for real listings.</p>
                <button type="button" onClick={() => openCollection('All')}>
                  Browse All
                </button>
              </div>
            )}
          </section>
        ) : activeRoute === 'tracking' ? (
          <section className="store-section tracking-route-page">
            <div className="tracking-route-card">
              <div className="tracking-route-head">
                <p className="receipt-label">Order lookup</p>
                <h1>Track Your Order</h1>
                <p>Use your order number and checkout email to see the latest production and shipping status.</p>
              </div>
              <form className="tracking-lookup-form" onSubmit={submitOrderTracking}>
                <label>
                  Order Number
                  <input name="orderId" placeholder="Order number" required />
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
          <div className="hero-neon-sign" aria-hidden="true">
            <strong>OPEN</strong>
            <small>Est. 1989</small>
          </div>
          <div className="hero-content">
            <p className="receipt-label">New drop ready now</p>
            <h1>Retro goods for everyday nostalgia.</h1>
            <p>Made-to-order apparel, prints, desk goods, and gifts.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#products">
                View Product Shelf <ChevronRight size={18} />
              </a>
              <a className="secondary-button" href="#deals">
                View Gift Guide
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

        <section className="store-section department-section" aria-label="Shop by department">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Shop by shelf</p>
              <h2>Departments</h2>
            </div>
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

        {newArrivals.length > 0 && (
          <section id="new-arrivals" className="store-section">
            <div className="section-heading">
              <div>
                <p className="receipt-label">Fresh on the counter</p>
                <h2>New Arrivals</h2>
              </div>
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
                    <span className="proof-rating">
                      <span className="proof-stars" aria-hidden="true">★★★★★</span>
                      <span className="proof-count">{getProductProof(product).rating.toFixed(1)}</span>
                    </span>
                    <p>{product.shortDetail}</p>
                    <div className="bundle-buy">
                      <strong>{formatPrice(product.price)}</strong>
                      <span className="buy-actions">
                        <button type="button" onClick={(event) => addToCart(product, event)}>
                          <ShoppingCart size={16} />
                          Add
                        </button>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="film-divider" role="separator" aria-label="Good times, great memories">
          <span>Good Times · Great Memories · Listings Coming Soon</span>
        </div>

        <section id="products" className="store-section products-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Browse the shelf</p>
              <h2>Product Shelf</h2>
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
              {visibleProducts.map((product) => {
                const proof = getProductProof(product)
                return (
                <article className="product-card" key={product.id}>
                  <button
                    className="media-square product-image product-image-button product-image--cutout"
                    type="button"
                    aria-label={`View ${product.name} details`}
                    onClick={() => openProductDetail(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span>{product.tag}</span>
                    {getDiscountPercent(product.price, product.compareAtPrice) > 0 && (
                      <span className="product-sale-flag" aria-hidden="true">
                        -{getDiscountPercent(product.price, product.compareAtPrice)}%
                      </span>
                    )}
                    {getSunburstLabel(product) && (
                      <span className="price-sunburst" aria-hidden="true">{getSunburstLabel(product)}</span>
                    )}
                  </button>
                  <div className="product-copy">
                    <p className="sku">{product.sku}</p>
                    <button className="product-title-button" type="button" onClick={() => openProductDetail(product)}>
                      {product.name}
                    </button>
                    <span className="proof-rating">
                      <span className="proof-stars" aria-hidden="true">★★★★★</span>
                      <span className="proof-count">{proof.rating.toFixed(1)} ({proof.reviewCount})</span>
                    </span>
                    <p>{product.shortDetail}</p>
                  </div>
                  <div className="product-card-meta">
                    <span
                      className={`stock-pill stock-pill--${
                        product.stockState === 'sold-out' ? 'out' : product.stockState === 'low-stock' ? 'low' : 'in'
                      }`}
                    >
                      {product.stockState === 'sold-out'
                        ? 'Sold out'
                        : product.stockState === 'low-stock'
                          ? 'Only a few left'
                          : 'In stock'}
                    </span>
                    {product.stockState !== 'sold-out' && (
                      <span className="sold-hint">{proof.soldCount}+ sold</span>
                    )}
                  </div>
                  <div className="product-buy">
                    <span className="product-price">
                      <strong>{formatPrice(product.price)}</strong>
                      {getDiscountPercent(product.price, product.compareAtPrice) > 0 && (
                        <s>{formatPrice(product.compareAtPrice)}</s>
                      )}
                    </span>
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
                </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-results empty-results--tv">
              <div className="tv-testcard" aria-hidden="true">
                <div className="smpte-bars" />
                <span className="tv-standby">PLEASE STAND BY</span>
              </div>
              <h3>No live products yet</h3>
              <p>Demo products were cleared. Add real listings to publish this shelf.</p>
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

        {bundles.length > 0 && (
          <section id="collections" className="store-section bundle-builder-section">
            <div className="section-heading">
              <div>
                <p className="receipt-label">Curated kits</p>
                <h2>Weekend Bundle Builder</h2>
              </div>
              <p className="section-note">Three ready-made carts for movie nights, counters, and mall-weekend shelves.</p>
            </div>
            <div className="bundle-grid">
              {bundles.map((bundle) => {
              const bundleProducts = bundle.items.map((itemName) =>
                products.find((product) => product.name === itemName) ?? {
                  id: `${bundle.id}-${itemName}`,
                  name: itemName,
                  category: 'Bundle item',
                  image: bundle.image,
                },
              )

              return (
                <article className="bundle-card bundle-card--kit" key={bundle.id}>
                  <img className="media-banner" src={bundle.image} alt={bundle.name} />
                  <div className="bundle-preview-strip" aria-label={`${bundle.name} product preview`}>
                    <span className="bundle-preview-label">Ready-made kit</span>
                    <div className="bundle-preview-photos">
                      {bundleProducts.map((product, index) => (
                        <span className="bundle-preview-photo" key={`${bundle.id}-preview-${product.id}`}>
                          <img src={product.image} alt="" />
                          <small>{index + 1}</small>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="receipt-label">Bundle value {formatPrice(bundle.value)}</p>
                    <h3>{bundle.name}</h3>
                    <p>{bundle.shortDetail}</p>
                    <p className="bundle-includes-label">Bundle includes</p>
                    <ul className="bundle-item-list bundle-item-list--includes">
                      {bundleProducts.map((product) => (
                        <li key={`${bundle.id}-${product.id}`}>
                          <span className="bundle-item-thumb">
                            <img src={product.image} alt="" />
                          </span>
                          <span>
                            <strong>{product.name}</strong>
                            <small>{product.category}</small>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="bundle-buy">
                      <span className="bundle-price">
                        <strong>{formatPrice(bundle.price)}</strong>
                        <s>{formatPrice(bundle.value)}</s>
                        <em className="bundle-save">Save {formatPrice(bundle.value - bundle.price)}</em>
                      </span>
                      <button type="button" onClick={(event) => addToCart(bundle, event)}>
                        Add Bundle
                      </button>
                    </div>
                  </div>
                </article>
              )
              })}
            </div>
          </section>
        )}

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

        {featuredDrop && (
          <section id="featured" className="store-section featured-drop-section">
            <div className="section-heading">
              <div>
                <p className="receipt-label">Staff counter pick</p>
                <h2>Featured Drop</h2>
              </div>
              <p className="section-note">One clean counter pick, ready for the next late-night run.</p>
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
                <span className="featured-drop-badge">Staff Pick</span>
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
                    <dd>Graphic tee</dd>
                  </div>
                  <div>
                    <dt>Size</dt>
                    <dd>S through XL</dd>
                  </div>
                  <div>
                    <dt>Artwork</dt>
                    <dd>Front print</dd>
                  </div>
                  <div>
                    <dt>Production</dt>
                    <dd>Made to order</dd>
                  </div>
                  <div>
                    <dt>Care</dt>
                    <dd>Wash inside out</dd>
                  </div>
                  <div>
                    <dt>Best For</dt>
                    <dd>Video-store nights</dd>
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
                  <span className="checkout-label-full">Add to Cart</span>
                  <span className="checkout-label-short">Add</span>
                </button>
                <button className="wishlist-button" type="button" onClick={() => toggleWishlistProduct(featuredDrop, { openAccount: true })}>
                  <Heart size={18} />
                  <span className="wishlist-label">
                    {activeWishlistIds.includes(featuredDrop.id) ? 'Saved' : 'Add to Wishlist'}
                  </span>
                </button>
                <div className="drop-stamp">Good Times. Guaranteed.</div>
              </aside>
            </article>
          </section>
        )}

        {shelfSets.length > 0 && (
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
        )}

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
            <p>Retro-inspired goods made to order after checkout.</p>
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

          <form className="signup-form" onSubmit={submitEmailSignup}>
            <label htmlFor="email-signup">Drop alerts</label>
            <p>Get restock notes, gift runs, and 10% off your first order.</p>
            <div>
              <input id="email-signup" name="email" type="email" placeholder="you@example.com" />
              <button type="submit">Sign Up</button>
            </div>
            {signupNotice && <small>{signupNotice}</small>}
          </form>
        </div>

        <div className="footer-receipt-strip">
          <span>Use REWIND10 for 10% off</span>
          <span>Made to order after checkout.</span>
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
            <div className={`freeship-meter ${subtotal >= FREE_SHIPPING_THRESHOLD ? 'is-unlocked' : ''}`}>
              <p>
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <>You&apos;ve unlocked <strong>free shipping</strong>!</>
                ) : (
                  <>Add <strong>{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more for free shipping.</>
                )}
              </p>
              <div className="freeship-track">
                <div
                  className="freeship-fill"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
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
            <p>Real products will appear here after the first listings are added.</p>
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
            <ShieldCheck size={17} />
            Checkout
          </button>
          <div className="cart-reassurance">
            <span><ShieldCheck size={14} /> Secure SSL checkout</span>
            <span><RefreshCcw size={14} /> 30-day easy returns</span>
          </div>
          <PaymentBadges />
          <div className="cart-receipt-footer">
            <div className="receipt-barcode" aria-hidden="true" />
            <span>Thank you! Come again.</span>
          </div>
        </div>
      </aside>

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
                        <form className="account-settings-form" onSubmit={updatePasswordDraft}>
                          <label>
                            Current Password
                            <input required name="currentPassword" type="password" placeholder="••••••••" />
                          </label>
                          <label>
                            New Password
                            <input required name="newPassword" type="password" placeholder="••••••••" />
                          </label>
                          <label>
                            Confirm New Password
                            <input required name="confirmPassword" type="password" placeholder="••••••••" />
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
                            <select name="orderId" defaultValue={activeSupportAction === 'order' ? selectedAccountOrder?.id ?? '' : ''}>
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
                            <button type="button" onClick={() => toggleWishlistProduct(product)}>
                              Remove
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
                        const itemLabel = (typeof firstItem === 'string' ? firstItem : firstItem?.name) || 'Order item'
                        const itemCountLabel = order.items?.length > 1 ? `+${order.items.length - 1} more item` : `${order.items?.length || 1} item`

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
                      {!visibleCustomerOrders.length && (
                        <p className="account-empty-address">No real orders yet.</p>
                      )}
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
                          const itemLabel = (typeof firstItem === 'string' ? firstItem : firstItem?.name) || 'Order item'
                          const itemCountLabel = order.items?.length > 1 ? `+${order.items.length - 1} more item` : `${order.items?.length || 1} item`

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
                        {!visibleCustomerOrders.length && (
                          <p className="account-empty-address">No real orders yet.</p>
                        )}
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
                <small>Production</small>
                <strong>{detailOrder.fulfillment ?? 'Made to order'}</strong>
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
                    <p>Standard Shipping<br />Tracking updates appear after shipment.</p>
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
                    <strong>Production Status</strong>
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

            <section className="order-detail-reviews" aria-label="Review your purchase">
              <div className="order-detail-review-heading">
                <div>
                  <p className="receipt-label">Verified buyer feedback</p>
                  <h3>Review your purchase</h3>
                </div>
                <span>{detailOrderReviewEligible ? 'Ready for review' : 'Available after payment'}</span>
              </div>

              {detailOrderReviewEligible && detailOrder.dbId && detailOrderReviewItems.length > 0 ? (
                <div className="order-detail-review-items">
                  {detailOrderReviewItems.map((item) => {
                    const reviewKey = getReviewPurchaseKey(detailOrder.dbId, item.productId)
                    const alreadyReviewed = customerReviewKeys.has(reviewKey)

                    return (
                      <article key={reviewKey}>
                        <img src={item.image} alt="" />
                        <div>
                          <strong>{item.productName}</strong>
                          <small>{item.optionSummary || 'Verified item from this order'}</small>
                        </div>
                        {alreadyReviewed ? (
                          <span><CheckCircle2 size={16} /> Reviewed</span>
                        ) : (
                          <button type="button" onClick={() => openPurchaseReview(detailOrder, item)}>
                            Write a review
                          </button>
                        )}
                      </article>
                    )
                  })}
                </div>
              ) : (
                <p className="order-detail-review-locked">
                  {detailOrderReviewEligible
                    ? 'No catalog products from this order are available to review.'
                    : 'Once payment is confirmed, each purchased product can receive one verified review.'}
                </p>
              )}

              {reviewEditor?.orderId === detailOrder.id && (
                <PurchaseReviewForm
                  key={`${reviewEditor.orderId}-${reviewEditor.productId}`}
                  notice={reviewNotice}
                  productName={reviewEditor.productName}
                  submitting={reviewSubmitting}
                  maxImages={3}
                  onCancel={() => {
                    setReviewEditor(null)
                    setReviewNotice('')
                  }}
                  onSubmit={submitPurchaseReview}
                />
              )}

              {reviewNotice && !reviewEditor && (
                <p className="purchase-review-notice" role="status">{reviewNotice}</p>
              )}
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

      {reviewsModalOpen && (
        <div className="modal-backdrop reviews-modal-backdrop" role="presentation" onClick={() => setReviewsModalOpen(false)}>
          <section
            className="reviews-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reviews-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="reviews-modal-header">
              <h2 id="reviews-modal-title">Reviews for this product ({selectedProductReviewCount})</h2>
              <button type="button" aria-label="Close reviews" onClick={() => setReviewsModalOpen(false)}>
                <X size={20} />
              </button>
            </header>

            <div className="reviews-modal-stats">
              <div className="reviews-modal-score">
                <strong>{selectedProductReviewRating.toFixed(1)}</strong>
                <span aria-hidden="true">★</span>
                <small>{selectedProductReviewCount} ratings</small>
              </div>
              <div className="reviews-modal-bars">
                {selectedProductReviewDistribution.map(({ rating, percentage }) => (
                  <p key={`reviews-modal-bar-${rating}`}>
                    <b>{rating} star</b>
                    <i><em style={{ width: `${percentage}%` }} /></i>
                    <small>{percentage}%</small>
                  </p>
                ))}
              </div>
            </div>

            {reviewsModalPhotos.length > 0 && (
              <div className="reviews-modal-photo-strip">
                {reviewsModalPhotos.map((src, index) => (
                  <button
                    type="button"
                    key={`reviews-modal-photo-${index}`}
                    onClick={() => openImageInfo({ image: src, name: 'Customer photo' }, 'Customer review photo', 'review')}
                  >
                    <img src={src} alt={`Customer photo ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            <div className="reviews-modal-list">
              {reviewsModalPageReviews.map((review) => (
                <ProductReviewCard
                  review={review}
                  key={review.id}
                  onImageClick={(src) => openImageInfo({ image: src, name: 'Customer photo' }, 'Customer review photo', 'review')}
                />
              ))}
            </div>

            {reviewsModalPageCount > 1 && (
              <div className="reviews-modal-pagination">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={reviewsModalPage === 1}
                  onClick={() => setReviewsModalPage((page) => Math.max(1, page - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: reviewsModalPageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    type="button"
                    key={`reviews-modal-page-${page}`}
                    className={page === reviewsModalPage ? 'active' : ''}
                    onClick={() => setReviewsModalPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={reviewsModalPage === reviewsModalPageCount}
                  onClick={() => setReviewsModalPage((page) => Math.min(reviewsModalPageCount, page + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {writeReviewGateOpen && (
        <div className="modal-backdrop write-review-gate-backdrop" role="presentation" onClick={() => setWriteReviewGateOpen(false)}>
          <section
            className="write-review-gate-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-gate-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="write-review-gate-close"
              aria-label="Close"
              onClick={() => setWriteReviewGateOpen(false)}
            >
              <X size={18} />
            </button>
            <Sparkles size={26} className="write-review-gate-icon" aria-hidden="true" />
            <h2 id="write-review-gate-title">Log in to write a review</h2>
            <p>Sign in or create a free account to share your experience with this product.</p>
            <div className="write-review-gate-actions">
              <button type="button" onClick={() => { setWriteReviewGateOpen(false); openAuth('sign-in') }}>Log in</button>
              <button type="button" onClick={() => { setWriteReviewGateOpen(false); openAuth('sign-up') }}>Create account</button>
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
            aria-label={`${selectedImageInfo.name} image preview`}
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
          </section>
        </div>
      )}

    </div>
  )
}

export default App
