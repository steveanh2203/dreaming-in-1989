import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Gift,
  Headphones,
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
import mallWeekendImage from './assets/mall-weekend.png'
import saturdayShelfImage from './assets/saturday-shelf.png'
import videoStoreImage from './assets/video-store-night.png'
import arcadeDepartmentImage from './assets/departments/arcade-department.png'
import audioDepartmentImage from './assets/departments/audio-department.png'
import kitchenDepartmentImage from './assets/departments/kitchen-department.png'
import wallArtDepartmentImage from './assets/departments/wall-art-department.png'
import albumWallPrintFeatureImage from './assets/featured/album-wall-print-feature.png'
import boomboxFeatureImage from './assets/featured/boombox-feature.png'
import snackBowlSetFeatureImage from './assets/featured/snack-bowl-set-feature.png'
import albumWallPrintImage from './assets/products/album-wall-print.png'
import arcadePosterImage from './assets/products/arcade-poster.png'
import arcadeTokenCupImage from './assets/products/arcade-token-cup.png'
import boomboxSpeakerImage from './assets/products/boombox-speaker.png'
import cartoonPinPackImage from './assets/products/cartoon-pin-pack.png'
import cassetteMixImage from './assets/products/cassette-mix.png'
import dinerMugImage from './assets/products/diner-mug.png'
import dinerTrayImage from './assets/products/diner-tray.png'
import mallToteImage from './assets/products/mall-tote.png'
import neonClockImage from './assets/products/neon-clock.png'
import pinballKeychainImage from './assets/products/pinball-keychain.png'
import pocketGameImage from './assets/products/pocket-game.png'
import rewindTeeImage from './assets/products/rewind-tee.png'
import snackBowlSetImage from './assets/products/snack-bowl-set.png'
import vhsCalendarImage from './assets/products/vhs-calendar.png'
import videoNightSignImage from './assets/products/video-night-sign.png'
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

const featuredImages = {
  'boombox-speaker': boomboxFeatureImage,
  'album-wall-print': albumWallPrintFeatureImage,
  'snack-bowl-set': snackBowlSetFeatureImage,
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
  },
  {
    id: 'bundle-shelf',
    name: 'Saturday Morning Shelf',
    shortDetail: 'Pin pack, counter mug, and shelf display art.',
    price: 68,
    value: 78,
    image: saturdayShelfImage,
  },
  {
    id: 'bundle-mall',
    name: 'Mall Weekend Kit',
    shortDetail: 'Tote, poster, and pocket game display.',
    price: 99,
    value: 115,
    image: mallWeekendImage,
  },
]

const heroSlides = [
  { image: heroImage, label: 'Retro den counter' },
  { image: heroSupermarketV2Image, label: 'Checkout lane' },
  { image: heroSupermarketImage, label: 'Aisle storefront' },
  { image: heroMemoryLaneImage, label: 'Memory lane room' },
  { image: heroProductSheetImage, label: 'Product shelf sheet' },
  { image: heroContentSheetImage, label: 'Retro content wall' },
]

const departmentCards = [
  { name: 'Audio', copy: 'Tapes, players, speakers, and desktop sound pieces.', image: audioDepartmentImage },
  { name: 'Arcade', copy: 'Handhelds, token goods, and game-room accents.', image: arcadeDepartmentImage },
  { name: 'Kitchen', copy: 'Diner mugs, trays, and snack-night hardware.', image: kitchenDepartmentImage },
  { name: 'Wall Art', copy: 'Prints and signs for shelves, studios, and dens.', image: wallArtDepartmentImage },
]

const giftGuides = [
  { title: 'Desk Setup Gifts', copy: 'Small pieces that make a workspace feel collected.', category: 'Collectibles', budget: '$14-$64' },
  { title: 'Couch Night Gear', copy: 'Bowls, tapes, and video-store pieces for movie nights.', category: 'Kitchen', budget: '$18-$82' },
  { title: 'Music Corner Finds', copy: 'Audio objects, prints, and cassette display goods.', category: 'Audio', budget: '$28-$72' },
]

const quickFilters = [
  { label: 'Under $25', query: 'Under $25' },
  { label: 'New Drops', query: 'New' },
  { label: 'Gift Picks', query: 'Gift' },
  { label: 'Low Stock', query: 'Low Stock' },
]

const newArrivalIds = ['diner-tray', 'rewind-tee', 'boombox-speaker', 'vhs-calendar']
const dealProductIds = ['pinball-keychain', 'diner-mug', 'arcade-token-cup', 'mall-tote']
const spotlightProductIds = ['boombox-speaker', 'album-wall-print', 'snack-bowl-set']

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
  const dealProducts = products.filter((product) => dealProductIds.includes(product.id))
  const spotlightProducts = products.filter((product) => spotlightProductIds.includes(product.id))
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
        <div className="header-receipt-line" aria-label="Store notices">
          <span><Truck size={15} /> Free shipping over $75</span>
          <span><Sparkles size={15} /> Use REWIND10</span>
          <span><Package size={15} /> Packed like a shelf find</span>
        </div>
        <div className="header-main">
          <a className="brand" href="#top" aria-label="Deaming in 1989 home">
            <ShoppingBag size={25} />
            <span>Deaming in 1989</span>
            <small>Retro goods counter</small>
          </a>
          <nav className="primary-nav" aria-label="Primary navigation">
            <a href="#new-arrivals">New Arrivals</a>
            <a href="#collections">Collections</a>
            <a href="#deals">Deals</a>
            <a href="#gift-guide">Gift Guide</a>
            <a href="#products">Best Sellers</a>
          </nav>
          <div className="header-checkout">
            <label className="header-search">
              <Search size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search goods..."
                aria-label="Search products"
              />
            </label>
            <button className="cart-button" type="button" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={20} />
              <span>Cart</span>
              <strong>{itemCount}</strong>
            </button>
          </div>
        </div>
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
          <aside className="offer-ticket" aria-label="Current offer">
            <span>Free shipping</span>
            <strong>Orders over $75</strong>
            <small>Use REWIND10 for 10% off</small>
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
                      <button className="details-button" type="button" onClick={() => openProductDetail(product)}>
                        Details
                      </button>
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

          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
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
                      <button className="details-button" type="button" onClick={() => openProductDetail(product)}>
                        Details
                      </button>
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

        <section id="deals" className="store-section deal-section">
          <div className="deal-banner">
            <div>
              <p className="receipt-label">Counter deals</p>
              <h2>Small Gifts Under $30</h2>
              <p>Quick add-ons for shelves, desks, bags, and kitchen counters.</p>
            </div>
            <Tags size={42} />
          </div>
          <div className="mini-product-grid">
            {dealProducts.map((product) => (
              <article className="mini-product-card" key={product.id}>
                <button
                  className="mini-image-button product-image--cutout"
                  type="button"
                  onClick={() => openImageInfo(product)}
                >
                  <img src={product.image} alt={product.name} />
                </button>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.shortDetail}</p>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
                <button type="button" onClick={() => addToCart(product)}>
                  Add
                </button>
                <button className="details-button" type="button" onClick={() => openProductDetail(product)}>
                  Details
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="featured" className="store-section spotlight-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Staff counter picks</p>
              <h2>Featured This Week</h2>
            </div>
            <p className="section-note">Three products with stronger display value for rooms and shelves.</p>
          </div>
          <div className="spotlight-grid">
            {spotlightProducts.map((product, index) => {
              const spotlightImage = featuredImages[product.id] ?? product.image

              return (
                <article className={`spotlight-card ${index === 0 ? 'wide' : ''}`} key={product.id}>
                  <button
                    className="spotlight-image-button"
                    type="button"
                    onClick={() =>
                      openImageInfo(
                        {
                          ...product,
                          image: spotlightImage,
                        },
                        'Featured banner image',
                        'scene',
                      )
                    }
                  >
                    <img src={spotlightImage} alt={product.name} />
                  </button>
                  <div>
                    <p className="receipt-label">{product.tag}</p>
                    <h3>{product.name}</h3>
                    <p>{product.shortDetail}</p>
                    <div className="bundle-buy">
                      <strong>{formatPrice(product.price)}</strong>
                      <span className="buy-actions">
                        <button className="details-button" type="button" onClick={() => openProductDetail(product)}>
                          Details
                        </button>
                        <button type="button" onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="collections" className="store-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Curated kits</p>
              <h2>Collections & Bundles</h2>
            </div>
            <p className="section-note">Build a weekend bundle and save.</p>
          </div>
          <div className="bundle-grid">
            {bundles.map((bundle) => (
              <article className="bundle-card" key={bundle.id}>
                <img src={bundle.image} alt={bundle.name} />
                <div>
                  <p className="receipt-label">Bundle value {formatPrice(bundle.value)}</p>
                  <h3>{bundle.name}</h3>
                  <p>{bundle.shortDetail}</p>
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

        <section id="gift-guide" className="store-section gift-section">
          <div className="section-heading">
            <div>
              <p className="receipt-label">Gift lanes</p>
              <h2>Gift Guide</h2>
            </div>
            <p className="section-note">Shop by the kind of setup your buyer is building.</p>
          </div>
          <div className="gift-grid">
            {giftGuides.map((guide) => (
              <article className="gift-card" key={guide.title}>
                <Gift size={30} />
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

      </main>

      <footer className="site-footer">
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
            <h2>Deaming in 1989</h2>
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
            <a href="#gift-guide">Gift guide</a>
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
          <span>Support: hello@deaming1989.test</span>
          <span>© 1989-2026 Deaming in 1989</span>
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
