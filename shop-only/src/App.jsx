import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  Headphones,
  Home,
  Image,
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
import wallArtDepartmentImage from './assets/departments/wall-art-department.png'
import cassettePlayerFeatureImage from './assets/featured/cassette-player-feature.png'
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
import arcadeTokenCupImage from './assets/products-cutout/arcade-token-cup.png'
import boomboxSpeakerImage from './assets/products-cutout/boombox-speaker.png'
import cartoonPinPackImage from './assets/products-cutout/cartoon-pin-pack.png'
import cassetteMixImage from './assets/products-cutout/cassette-mix.png'
import dinerMugImage from './assets/products-cutout/diner-mug.png'
import dinerTrayImage from './assets/products-cutout/diner-tray.png'
import mallToteImage from './assets/products-cutout/mall-tote.png'
import neonClockImage from './assets/products-cutout/neon-clock.png'
import pinballKeychainImage from './assets/products-cutout/pinball-keychain.png'
import pocketGameImage from './assets/products-cutout/pocket-game.png'
import rewindTeeImage from './assets/products-cutout/rewind-tee.png'
import snackBowlSetImage from './assets/products-cutout/snack-bowl-set.png'
import vhsCalendarImage from './assets/products-cutout/vhs-calendar.png'
import videoNightSignImage from './assets/products-cutout/video-night-sign.png'
import './App.css'

const categories = ['All', 'Audio', 'Arcade', 'Apparel', 'Kitchen', 'Wall Art', 'Collectibles']

const productImages = {
  pocketGame: pocketGameImage,
  cassetteMix: cassetteMixImage,
  arcadePoster: arcadePosterImage,
  videoNightSign: videoNightSignImage,
  mallTote: mallToteImage,
  dinerMug: dinerMugImage,
  cartoonPinPack: cartoonPinPackImage,
  neonClock: neonClockImage,
  boomboxSpeaker: boomboxSpeakerImage,
  arcadeTokenCup: arcadeTokenCupImage,
  dinerTray: dinerTrayImage,
  vhsCalendar: vhsCalendarImage,
  rewindTee: rewindTeeImage,
  albumWallPrint: albumWallPrintImage,
  snackBowlSet: snackBowlSetImage,
  pinballKeychain: pinballKeychainImage,
}

const products = [
  {
    id: 'pocket-game',
    name: 'Pocket Game Console',
    shortDetail: 'Handheld shelf piece with playable charm.',
    price: 49,
    category: 'Arcade',
    tag: 'New',
    image: productImages.pocketGame,
    sku: 'SKU-1989-014',
    stockState: 'in-stock',
  },
  {
    id: 'cassette-mix',
    name: 'Soft Rock Cassette Set',
    shortDetail: 'Three display tapes in clamshell cases.',
    price: 28,
    category: 'Audio',
    tag: 'Best Seller',
    image: productImages.cassetteMix,
    sku: 'SKU-1989-022',
    stockState: 'in-stock',
  },
  {
    id: 'arcade-poster',
    name: 'Arcade Lights Poster',
    shortDetail: '18x24 print for game room walls.',
    price: 32,
    category: 'Wall Art',
    tag: 'Low Stock',
    image: productImages.arcadePoster,
    sku: 'SKU-1989-031',
    stockState: 'low-stock',
  },
  {
    id: 'video-night-sign',
    name: 'Video Store Desk Sign',
    shortDetail: 'Acrylic counter sign with late-fee energy.',
    price: 36,
    category: 'Collectibles',
    tag: 'Gift Pick',
    image: productImages.videoNightSign,
    sku: 'SKU-1989-044',
    stockState: 'in-stock',
  },
  {
    id: 'mall-tote',
    name: 'Mall Weekend Tote',
    shortDetail: 'Heavy canvas tote for weekend runs.',
    price: 24,
    category: 'Apparel',
    tag: 'Fresh Drop',
    image: productImages.mallTote,
    sku: 'SKU-1989-051',
    stockState: 'in-stock',
  },
  {
    id: 'diner-mug',
    name: 'Diner Counter Mug',
    shortDetail: 'Cream ceramic mug with red stripe.',
    price: 18,
    category: 'Kitchen',
    tag: 'Under $20',
    image: productImages.dinerMug,
    sku: 'SKU-1989-063',
    stockState: 'in-stock',
  },
  {
    id: 'cartoon-pin-pack',
    name: 'Saturday Pin Pack',
    shortDetail: 'Four enamel pins for jackets or bags.',
    price: 22,
    category: 'Apparel',
    tag: 'Bundle Ready',
    image: productImages.cartoonPinPack,
    sku: 'SKU-1989-077',
    stockState: 'in-stock',
  },
  {
    id: 'neon-clock',
    name: 'Neon Counter Clock',
    shortDetail: 'Desk clock with soft cyan glow.',
    price: 64,
    category: 'Collectibles',
    tag: 'Sold Out',
    image: productImages.neonClock,
    sku: 'SKU-1989-089',
    stockState: 'sold-out',
  },
  {
    id: 'boombox-speaker',
    name: 'Boombox Shelf Speaker',
    shortDetail: 'Bluetooth speaker with chrome faceplate.',
    price: 72,
    category: 'Audio',
    tag: 'Premium',
    image: productImages.boomboxSpeaker,
    sku: 'SKU-1989-102',
    stockState: 'in-stock',
  },
  {
    id: 'arcade-token-cup',
    name: 'Arcade Token Cup',
    shortDetail: 'Ceramic cup for desks, coins, or pens.',
    price: 20,
    category: 'Arcade',
    tag: 'Under $25',
    image: productImages.arcadeTokenCup,
    sku: 'SKU-1989-118',
    stockState: 'in-stock',
  },
  {
    id: 'diner-tray',
    name: 'Diner Counter Tray',
    shortDetail: 'Metal catchall tray for keys and watches.',
    price: 26,
    category: 'Kitchen',
    tag: 'New',
    image: productImages.dinerTray,
    sku: 'SKU-1989-126',
    stockState: 'in-stock',
  },
  {
    id: 'vhs-calendar',
    name: 'VHS Desk Calendar',
    shortDetail: 'Flip calendar with rental-store styling.',
    price: 34,
    category: 'Collectibles',
    tag: 'Desk Pick',
    image: productImages.vhsCalendar,
    sku: 'SKU-1989-137',
    stockState: 'in-stock',
  },
  {
    id: 'rewind-tee',
    name: 'Rewind Club Tee',
    shortDetail: 'Soft cotton tee with small chest mark.',
    price: 30,
    category: 'Apparel',
    tag: 'New Size Run',
    image: productImages.rewindTee,
    sku: 'SKU-1989-144',
    stockState: 'in-stock',
  },
  {
    id: 'album-wall-print',
    name: 'Album Wall Print',
    shortDetail: 'Gallery print for music corners.',
    price: 38,
    category: 'Wall Art',
    tag: 'Gift Pick',
    image: productImages.albumWallPrint,
    sku: 'SKU-1989-152',
    stockState: 'in-stock',
  },
  {
    id: 'snack-bowl-set',
    name: 'Movie Snack Bowl Set',
    shortDetail: 'Stacking bowls for couch-night snacks.',
    price: 42,
    category: 'Kitchen',
    tag: 'Bundle Ready',
    image: productImages.snackBowlSet,
    sku: 'SKU-1989-168',
    stockState: 'low-stock',
  },
  {
    id: 'pinball-keychain',
    name: 'Pinball Keychain',
    shortDetail: 'Enamel keychain with arcade cabinet charm.',
    price: 14,
    category: 'Collectibles',
    tag: 'Stocking Gift',
    image: productImages.pinballKeychain,
    sku: 'SKU-1989-181',
    stockState: 'in-stock',
  },
]

const bundles = [
  {
    id: 'bundle-video',
    name: 'Video Store Night',
    shortDetail: 'Desk sign, cassette set, and snack tray print.',
    price: 82,
    value: 96,
    image: videoStoreImage,
    items: ['Video Store Desk Sign', 'Soft Rock Cassette Set', 'Movie Snack Bowl Set'],
  },
  {
    id: 'bundle-shelf',
    name: 'Diner Counter Set',
    shortDetail: 'Pin pack, counter mug, and shelf display art.',
    price: 68,
    value: 78,
    image: snackBowlSetFeatureImage,
    items: ['Diner Counter Mug', 'Diner Counter Tray', 'Saturday Pin Pack'],
  },
  {
    id: 'bundle-mall',
    name: 'Mall Weekend Kit',
    shortDetail: 'Tote, poster, and pocket game display.',
    price: 99,
    value: 115,
    image: mallWeekendImage,
    items: ['Mall Weekend Tote', 'Arcade Lights Poster', 'Pocket Game Console'],
  },
]

const heroSlides = [
  {
    image: heroImage,
    label: 'Retro den counter',
    receipt: {
      code: 'RCPT-1989-01',
      items: [
        ['Audio', 29],
        ['Arcade', 24],
        ['Kitchen', 19],
        ['Wall art', 38],
        ['Bundles', 49],
      ],
    },
  },
  {
    image: heroSupermarketV2Image,
    label: 'Checkout lane',
    receipt: {
      code: 'RCPT-1989-02',
      items: [
        ['Counter mug', 18],
        ['Mall tote', 24],
        ['Snack bowls', 42],
        ['Desk calendar', 34],
        ['Gift wrap', 6],
      ],
    },
  },
  {
    image: heroSupermarketImage,
    label: 'Aisle storefront',
    receipt: {
      code: 'RCPT-1989-03',
      items: [
        ['Pocket game', 49],
        ['Token cup', 20],
        ['Pin pack', 22],
        ['Neon clock', 64],
        ['Poster', 32],
      ],
    },
  },
  {
    image: heroMemoryLaneImage,
    label: 'Memory lane room',
    receipt: {
      code: 'RCPT-1989-04',
      items: [
        ['Cassette set', 28],
        ['Shelf speaker', 72],
        ['Album print', 38],
        ['Rewind tee', 30],
        ['Late fee', 0],
      ],
    },
  },
  {
    image: heroProductSheetImage,
    label: 'Product shelf sheet',
    receipt: {
      code: 'RCPT-1989-05',
      items: [
        ['VHS calendar', 34],
        ['Desk sign', 36],
        ['Diner tray', 26],
        ['Pinball key', 14],
        ['Bundle save', -12],
      ],
    },
  },
  {
    image: heroContentSheetImage,
    label: 'Retro content wall',
    receipt: {
      code: 'RCPT-1989-06',
      items: [
        ['Wall print', 38],
        ['Arcade poster', 32],
        ['Mix tape', 28],
        ['Gift note', 5],
        ['Shipping', 0],
      ],
    },
  },
]

const departmentCards = [
  { name: 'Audio', copy: 'Tapes, players, speakers, and desktop sound pieces.', image: audioDepartmentImage },
  { name: 'Arcade', copy: 'Handhelds, token goods, and game-room accents.', image: arcadeDepartmentImage },
  { name: 'Kitchen', copy: 'Diner mugs, trays, and snack-night hardware.', image: kitchenDepartmentImage },
  { name: 'Wall Art', copy: 'Prints and signs for shelves, studios, and dens.', image: wallArtDepartmentImage },
]

const giftCounterItems = [
  {
    title: 'Under $25',
    copy: 'Pins, mugs, cups, and small counter goods.',
    category: 'Collectibles',
    budget: '$14-$24',
    image: under25LineupImage,
  },
  {
    title: 'Desk Gifts',
    copy: 'Calendar flips, clocks, and desktop shelf pieces.',
    category: 'Collectibles',
    budget: '$34-$64',
    image: deskGiftsLineupImage,
  },
  {
    title: 'Shelf Decor',
    copy: 'Signs, prints, and display pieces for rooms.',
    category: 'Wall Art',
    budget: '$32-$38',
    image: shelfDecorLineupImage,
  },
  {
    title: 'Party Night',
    copy: 'Snack bowls, trays, and couch-night add-ons.',
    category: 'Kitchen',
    budget: '$26-$42',
    image: partyNightLineupImage,
  },
]

const quickFilters = [
  { label: 'Under $25', query: 'Under $25' },
  { label: 'New Drops', query: 'New' },
  { label: 'Gift Picks', query: 'Gift' },
  { label: 'Low Stock', query: 'Low Stock' },
]

const newArrivalIds = ['diner-tray', 'rewind-tee', 'boombox-speaker', 'vhs-calendar']
const featuredDropProduct = {
  id: 'cassette-player-wm36',
  name: 'Cassette Player WM-36',
  shortDetail: 'Clear blue edition for pocket playlists and shelf display.',
  price: 79,
  category: 'Audio',
  tag: "Today's Spotlight",
  image: cassettePlayerFeatureImage,
  sku: 'SKU-1989-198',
  stockState: 'in-stock',
}

const shelfReadySets = [
  {
    id: 'set-counter',
    name: 'Audio Shelf Set',
    copy: 'Speaker, tapes, and wall-ready sound.',
    price: 119,
    image: audioShelfSetImage,
    imageMode: 'scene',
  },
  {
    id: 'set-arcade',
    name: 'Arcade Essentials',
    copy: 'Poster, token cup, pin pack.',
    price: 99,
    image: arcadeEssentialsSetImage,
    imageMode: 'scene',
  },
  {
    id: 'set-kitchen',
    name: 'Kitchen Dinner Kit',
    copy: 'Tray, mugs, and snack bowls.',
    price: 90,
    image: kitchenDinnerKitSetImage,
    imageMode: 'scene',
  },
  {
    id: 'set-wall-art',
    name: 'Wall Art Starter',
    copy: 'Prints to style your walls.',
    price: 90,
    image: wallArtStarterSetImage,
    imageMode: 'scene',
  },
  {
    id: 'set-desk',
    name: 'Desk Setup Pack',
    copy: 'Clock, organizer, and calendar.',
    price: 79,
    image: deskSetupPackSetImage,
    imageMode: 'scene',
  },
]

const productOptionGroups = {
  Audio: [
    {
      name: 'Finish',
      options: [
        { label: 'Midnight Black', priceDelta: 0 },
        { label: 'Chrome Silver', priceDelta: 6 },
        { label: 'Cream Shell', priceDelta: 4 },
      ],
    },
    {
      name: 'Pack',
      options: [
        { label: 'Single Item', priceDelta: 0 },
        { label: 'Gift Box', priceDelta: 8 },
      ],
    },
  ],
  Arcade: [
    {
      name: 'Cabinet Color',
      options: [
        { label: 'Token Green', priceDelta: 0 },
        { label: 'Neon Red', priceDelta: 4 },
        { label: 'Coin-Op Blue', priceDelta: 4 },
      ],
    },
    {
      name: 'Display',
      options: [
        { label: 'No Stand', priceDelta: 0 },
        { label: 'Acrylic Stand', priceDelta: 8 },
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
    {
      name: 'Fit',
      options: [
        { label: 'Classic', priceDelta: 0 },
        { label: 'Oversized', priceDelta: 3 },
      ],
    },
  ],
  Kitchen: [
    {
      name: 'Set',
      options: [
        { label: 'Single', priceDelta: 0 },
        { label: 'Pair', priceDelta: 14 },
        { label: 'Family Set', priceDelta: 28 },
      ],
    },
    {
      name: 'Accent',
      options: [
        { label: 'Red Stripe', priceDelta: 0 },
        { label: 'Blue Stripe', priceDelta: 0 },
        { label: 'Diner Cream', priceDelta: 0 },
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
  Collectibles: [
    {
      name: 'Edition',
      options: [
        { label: 'Standard', priceDelta: 0 },
        { label: 'Numbered', priceDelta: 12 },
      ],
    },
    {
      name: 'Packaging',
      options: [
        { label: 'Display Box', priceDelta: 0 },
        { label: 'Collector Case', priceDelta: 10 },
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

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoState, setPromoState] = useState('idle')
  const [addedName, setAddedName] = useState('')
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedImageInfo, setSelectedImageInfo] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [cart, setCart] = useState([
    { id: 'cassette-mix', name: 'Soft Rock Cassette Set', price: 28, image: productImages.cassetteMix, quantity: 1 },
  ])

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setHeroSlideIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
    }, 5200)

    return () => window.clearInterval(slideTimer)
  }, [])

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
  const freeShippingRemaining = Math.max(75 - subtotal + discount, 0)
  const newArrivals = products.filter((product) => newArrivalIds.includes(product.id))
  const featuredDrop = featuredDropProduct
  const shelfSets = shelfReadySets
  const activeHeroSlide = heroSlides[heroSlideIndex]
  const hasActiveProductFilter = activeCategory !== 'All' || query.trim().length > 0
  const visibleProducts = hasActiveProductFilter ? filteredProducts : filteredProducts.slice(0, 8)
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

  const openProductDetail = (product) => {
    setSelectedProduct(product)
    setSelectedOptions(getDefaultOptions(product))
  }

  const openImageInfo = (item, context = 'Product image', imageMode = item.imageMode ?? 'cutout') => {
    setSelectedImageInfo({
      ...item,
      context,
      imageMode,
    })
  }

  const addToCart = (item) => {
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
    setCartOpen(true)
    setAddedName(item.name)
    window.setTimeout(() => setAddedName(''), 1600)
  }

  const addSelectedProductToCart = () => {
    if (!selectedProduct) return

    addToCart({
      ...selectedProduct,
      cartId: `${selectedProduct.id}:${selectedVariantSummary}`,
      price: selectedVariantPrice,
      optionSummary: selectedVariantSummary,
    })
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

  const openCheckout = () => {
    if (!cart.length) return
    setCheckoutDone(false)
    setCheckoutOpen(true)
  }

  const submitCheckout = (event) => {
    event.preventDefault()
    setCheckoutDone(true)
    setCart([])
    setPromoCode('')
    setPromoState('idle')
  }

  return (
    <div className="shop-app">
      <header className="site-header">
        <div className="header-main">
          <a className="brand" href="#top" aria-label="Dreaming in 1989 home">
            <img src={dreaming1989LogoImage} alt="Dreaming in 1989 Nostalgia News & Market" />
          </a>
          <div className="header-center">
            <label className="header-search">
              <Search size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search memories, news, items..."
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
            <button className="cart-button" type="button" onClick={() => setCartOpen(true)}>
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
          <a href="#footer">Support</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="Storefront offer">
          <div className="hero-slider" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                className={`hero-slide ${index === heroSlideIndex ? 'active' : ''}`}
                key={slide.label}
                src={slide.image}
                alt=""
              />
            ))}
          </div>
          <div className="hero-content">
            <p className="receipt-label">New drop ready now</p>
            <h1>Retro goods for everyday nostalgia.</h1>
            <p>Shelf-ready gifts, apparel, audio objects, and collectibles inspired by 1989.</p>
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
          <span>
            <Truck size={18} /> Fast shipping
          </span>
          <span>
            <CheckCircle2 size={18} /> Easy returns
          </span>
          <span>
            <ShieldCheck size={18} /> Secure checkout
          </span>
          <span>
            <Package size={18} /> Retro packaging
          </span>
        </section>

        <div className="desktop-rail left-rail" aria-label="Shop directory">
          <p className="receipt-label">Shop Directory</p>
          <h2>Find Goods</h2>
          <div className="rail-link-list">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveCategory(category)
                  window.location.hash = 'products'
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="rail-divider" />
          <p className="receipt-label">Quick Filters</p>
          <div className="rail-chip-list">
            {quickFilters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => {
                  setActiveCategory('All')
                  setQuery(filter.query)
                  window.location.hash = 'products'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="desktop-rail right-rail" aria-label="Cart and current deal">
          <p className="receipt-label">Cart Status</p>
          <h2>{itemCount} item{itemCount === 1 ? '' : 's'}</h2>
          <div className="rail-total">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="shipping-meter" aria-label="Free shipping progress">
            <span style={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }} />
          </div>
          <p className="rail-note">
            {freeShippingRemaining > 0
              ? `${formatPrice(freeShippingRemaining)} more for free shipping.`
              : 'Free shipping unlocked.'}
          </p>
          <button className="rail-cart-button" type="button" onClick={() => setCartOpen(true)}>
            Open Cart
          </button>
          <div className="rail-divider" />
          <p className="receipt-label">Counter Pick</p>
          <h3>Pinball Keychain</h3>
          <p className="rail-note">Small gift, easy add-on, ships fast.</p>
          <button type="button" onClick={() => addToCart(products.find((product) => product.id === 'pinball-keychain'))}>
            Add $14.00
          </button>
        </div>

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
                <img src={department.image} alt={`${department.name} products`} />
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
            <p className="section-note">Recently stocked goods across apparel, audio, kitchen, and collectibles.</p>
          </div>
          <div className="feature-product-grid">
            {newArrivals.map((product) => (
              <article className="feature-product-card" key={product.id}>
                <button
                  className="product-image-button feature-image-button product-image--cutout"
                  type="button"
                  onClick={() => openImageInfo(product)}
                >
                  <img src={product.image} alt={product.name} />
                </button>
                <div>
                  <p className="receipt-label">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p>{product.shortDetail}</p>
                  <div className="bundle-buy">
                    <strong>{formatPrice(product.price)}</strong>
                    <span className="buy-actions">
                      <button type="button" onClick={() => addToCart(product)}>
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
                    className="product-image product-image-button product-image--cutout"
                    type="button"
                    onClick={() => openImageInfo(product)}
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
                        onClick={() => addToCart(product)}
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
                <img src={bundle.image} alt={bundle.name} />
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
                    <button type="button" onClick={() => addToCart(bundle)}>
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
            <p className="section-note">Fast gift routes with a clear budget before you start browsing.</p>
          </div>
          <div className="gift-grid">
            {giftCounterItems.map((guide) => (
              <article className="gift-card" key={guide.title}>
                <button
                  className="gift-image-button product-image--cutout"
                  type="button"
                  onClick={() =>
                    openImageInfo(
                      {
                        id: guide.title,
                        name: guide.title,
                        image: guide.image,
                        category: guide.category,
                      },
                      'Gift counter image',
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
            <p className="section-note">A larger product moment with quick specs and a direct cart action.</p>
          </div>
          <article className="featured-drop-card">
            <button
              className="featured-drop-image"
              type="button"
              onClick={() =>
                openImageInfo(
                  {
                    ...featuredDrop,
                    image: featuredDropImage,
                  },
                  'Featured drop image',
                  'scene',
                )
              }
            >
              <img src={featuredDropImage} alt={featuredDrop.name} />
            </button>
            <div className="featured-drop-copy">
              <p className="receipt-label">{featuredDrop.tag}</p>
              <h3>{featuredDrop.name}</h3>
              <p>{featuredDrop.shortDetail}</p>
              <dl className="drop-spec-list">
                <div>
                  <dt>Condition</dt>
                  <dd>Excellent</dd>
                </div>
                <div>
                  <dt>Headphones</dt>
                  <dd>Foam on-ear</dd>
                </div>
                <div>
                  <dt>Battery</dt>
                  <dd>2 AA not included</dd>
                </div>
                <div>
                  <dt>Ships</dt>
                  <dd>2-4 days</dd>
                </div>
                <div>
                  <dt>Features</dt>
                  <dd>AM/FM radio</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>1989</dd>
                </div>
              </dl>
            </div>
            <aside className="featured-drop-actions" aria-label={`${featuredDrop.name} purchase actions`}>
              <div className="featured-price">
                <strong>{formatPrice(featuredDrop.price)}</strong>
                <span>In stock</span>
              </div>
              <button className="checkout-button" type="button" onClick={() => addToCart(featuredDrop)}>
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
                  className="shelf-set-image"
                  type="button"
                  onClick={() => openImageInfo(set, 'Shelf-ready set image', set.imageMode)}
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
                  <button type="button" onClick={() => addToCart(set)}>
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

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
            <p>Retro-inspired goods, shelf pieces, apparel, kitchen finds, and checkout-ready bundles.</p>
            <div className="footer-service-row" aria-label="Store service notes">
              <span><Truck size={16} /> Fast shipping</span>
              <span><ShieldCheck size={16} /> Secure checkout</span>
              <span><Package size={16} /> Retro packing</span>
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
          <span>Free shipping over $75</span>
          <span>Support: hello@1989supply.test</span>
          <span>Copyright 1989-2026 1989 Supply Co.</span>
        </div>
      </footer>

      {addedName && <div className="toast" role="status">{addedName} added to cart.</div>}

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
          <div className="cart-items">
            {cart.map((item) => (
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
                  {selectedProduct.stockState === 'sold-out' ? 'Sold Out' : 'Add Selected to Cart'}
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
            <div className={`image-info-preview image-info-preview--${selectedImageInfo.imageMode}`}>
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
                  <strong>{selectedImageInfo.imageMode === 'scene' ? 'Scene crop' : '1:1 product frame'}</strong>
                </span>
                <span>
                  <small>Background</small>
                  <strong>{selectedImageInfo.imageMode === 'scene' ? 'Full background kept' : 'Cutout treatment'}</strong>
                </span>
                <span>
                  <small>SKU</small>
                  <strong>{selectedImageInfo.sku ?? selectedImageInfo.id}</strong>
                </span>
              </div>
              <p>
                {selectedImageInfo.imageMode === 'scene'
                  ? 'This image is treated as a full-background scene, so the environment stays visible.'
                  : 'This image uses the product frame treatment: square ratio, object contained, and background visually minimized.'}
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
                <h2 id="checkout-title">Order placed</h2>
                <p>Your demo order is complete. Confirmation #1989-0529.</p>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutOpen(false)
                    setCartOpen(false)
                  }}
                >
                  Back to Shop
                </button>
              </div>
            ) : (
              <form onSubmit={submitCheckout}>
                <p className="receipt-label">Demo checkout</p>
                <h2 id="checkout-title">Shipping & Payment</h2>
                <div className="form-grid">
                  <label>
                    Full name
                    <input required placeholder="Marty McFly" />
                  </label>
                  <label>
                    Email
                    <input required type="email" placeholder="marty@example.com" />
                  </label>
                  <label className="wide">
                    Address
                    <input required placeholder="1989 Supply Street" />
                  </label>
                  <label>
                    City
                    <input required placeholder="Hill Valley" />
                  </label>
                  <label>
                    ZIP
                    <input required inputMode="numeric" placeholder="90089" />
                  </label>
                  <label className="wide">
                    Demo card
                    <span className="card-input">
                      <CreditCard size={18} />
                      <input required placeholder="4242 4242 4242 4242" />
                    </span>
                  </label>
                </div>
                <div className="review-box">
                  <Headphones size={20} />
                  <span>Review total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <button className="checkout-button" type="submit">
                  Place Demo Order
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
