import afterHoursTeeArtworkImage from '../assets/catalog/after-hours-video-club-tee/00-artwork-transparent.png'
import afterHoursTeeFrontImage from '../assets/catalog/after-hours-video-club-tee/printful-white/01-front.png'
import afterHoursTeeHeroVideoStoreWideImage from '../assets/catalog/after-hours-video-club-tee/12-hero-video-store-wide.png'
import afterHoursTeeVideoStoreLifestyleImage from '../assets/catalog/after-hours-video-club-tee/12-lifestyle-video-store.png'
import afterHoursTeeParkingLotLifestyleImage from '../assets/catalog/after-hours-video-club-tee/13-lifestyle-rental-parking-lot.png'
import afterHoursTeeMovieNightLifestyleImage from '../assets/catalog/after-hours-video-club-tee/14-lifestyle-movie-night.png'
import afterHoursTeeArcadeLifestyleImage from '../assets/catalog/after-hours-video-club-tee/15-lifestyle-arcade.png'
import afterHoursTeeCheckoutCounterImage from '../assets/catalog/after-hours-video-club-tee/16-lifestyle-checkout-counter.png'
import afterHoursTeeArcadeCounterImage from '../assets/catalog/after-hours-video-club-tee/17-lifestyle-arcade-counter.png'
import afterHoursTeeMovieCouchImage from '../assets/catalog/after-hours-video-club-tee/18-lifestyle-movie-couch.png'
import afterHoursTeeMallStorefrontImage from '../assets/catalog/after-hours-video-club-tee/19-lifestyle-mall-storefront.png'
import jukeboxJavaMugFrontImage from '../assets/catalog/jukebox-java-retro-diner-mug/printful-white/01-front.png'
import jukeboxJavaMugPrintDetailImage from '../assets/catalog/jukebox-java-retro-diner-mug/printful-white/05-print-detail.png'
import jukeboxJavaMugHeroDinerBoothImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/06-hero-diner-booth.png'
import jukeboxJavaMugBreakfastCounterImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/07-lifestyle-breakfast-counter.png'
import jukeboxJavaMugKitchenShelfImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/08-lifestyle-kitchen-shelf.png'
import jukeboxJavaMugMusicDeskImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/09-lifestyle-music-desk.png'
import jukeboxJavaMugNightWindowImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/10-lifestyle-night-window.png'
import jukeboxJavaMugMusicDeskCassettesImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/11-lifestyle-music-desk-cassettes.png'
import jukeboxJavaMugDinerTableImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/12-lifestyle-diner-jukebox-table.png'
import jukeboxJavaMugRadioDeskImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/13-lifestyle-radio-desk.png'
import jukeboxJavaMugDinerCounterImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/14-lifestyle-diner-counter-handheld.png'

const afterHoursTeeVariants = ['S', 'M', 'L', 'XL'].map((size) => ({
  size,
  color: 'White',
  retailPrice: 29,
  sku: `SKU-1989-AHVC-TEE-${size}`,
  externalId: `after-hours-video-club-tee-${size.toLowerCase()}-white`,
}))

const jukeboxJavaMugVariants = [
  {
    size: '11 oz',
    color: 'White',
    retailPrice: 18,
    sku: 'SKU-1989-JJ-MUG-11OZ',
    externalId: 'jukebox-java-retro-diner-mug-11oz-glossy-white',
    catalogVariantId: 1320,
  },
  {
    size: '15 oz',
    color: 'White',
    retailPrice: 22,
    sku: 'SKU-1989-JJ-MUG-15OZ',
    externalId: 'jukebox-java-retro-diner-mug-15oz-glossy-white',
    catalogVariantId: 4830,
  },
]

export const products = [
  {
    id: 'after-hours-video-club-tee',
    name: 'After Hours Video Club Tee',
    category: 'T Shirt',
    tag: 'New Drop',
    shortDetail: 'White retro graphic tee inspired by late-night video store runs and after-hours rewinds.',
    price: 29,
    compareAtPrice: 38,
    sku: 'SKU-1989-AHVC-TEE',
    stockState: 'in-stock',
    image: afterHoursTeeVideoStoreLifestyleImage,
    productionImage: afterHoursTeeFrontImage,
    lifestyleImage: afterHoursTeeHeroVideoStoreWideImage,
    printDetailImage: afterHoursTeeArtworkImage,
    galleryImages: [
      { label: 'Video Store', image: afterHoursTeeVideoStoreLifestyleImage, kind: 'lifestyle' },
      { label: 'Rental Lot', image: afterHoursTeeParkingLotLifestyleImage, kind: 'lifestyle' },
      { label: 'Movie Night', image: afterHoursTeeMovieNightLifestyleImage, kind: 'lifestyle' },
      { label: 'Arcade', image: afterHoursTeeArcadeLifestyleImage, kind: 'lifestyle' },
      { label: 'Checkout Counter', image: afterHoursTeeCheckoutCounterImage, kind: 'lifestyle' },
      { label: 'Arcade Counter', image: afterHoursTeeArcadeCounterImage, kind: 'lifestyle' },
      { label: 'Movie Couch', image: afterHoursTeeMovieCouchImage, kind: 'lifestyle' },
      { label: 'Mall Storefront', image: afterHoursTeeMallStorefrontImage, kind: 'lifestyle' },
    ],
    printful: {
      externalId: 'after-hours-video-club-tee',
      variants: afterHoursTeeVariants,
    },
  },
  {
    id: 'jukebox-java-retro-diner-mug',
    name: 'Jukebox Java Retro Diner Mug',
    category: 'Mug',
    tag: 'New Drop',
    shortDetail:
      'Glossy white retro diner coffee mug with a Jukebox Java graphic inspired by tabletop tunes, sugar packets, and late-night booth refills.',
    price: 18,
    compareAtPrice: 24,
    sku: 'SKU-1989-JJ-MUG',
    stockState: 'in-stock',
    image: jukeboxJavaMugMusicDeskCassettesImage,
    productionImage: jukeboxJavaMugFrontImage,
    lifestyleImage: jukeboxJavaMugMusicDeskCassettesImage,
    printDetailImage: jukeboxJavaMugPrintDetailImage,
    seoTitle: 'Jukebox Java Retro Diner Mug | 80s Coffee Mug Gift',
    metaDescription:
      'Shop the Jukebox Java Retro Diner Mug, a glossy white coffee mug with 1980s diner artwork, jukebox charm, and nostalgic gift-ready style.',
    productDescription:
      'Bring the booth-side soundtrack to your morning coffee with the Jukebox Java Retro Diner Mug. Inspired by American diners, tabletop jukeboxes, sugar packets, chrome trim, and the warm buzz of a late-night coffee refill, this glossy white mug turns an everyday cup into a small piece of 1980s nostalgia. The artwork features a playful Jukebox Java diner graphic designed for fans of retro coffee bars, vintage restaurant signs, old-school music culture, and giftable Americana.',
    galleryImages: [
      { label: 'Music Desk', image: jukeboxJavaMugMusicDeskCassettesImage, kind: 'lifestyle' },
      { label: 'Diner Booth', image: jukeboxJavaMugHeroDinerBoothImage, kind: 'lifestyle' },
      { label: 'Breakfast Counter', image: jukeboxJavaMugBreakfastCounterImage, kind: 'lifestyle' },
      { label: 'Kitchen Shelf', image: jukeboxJavaMugKitchenShelfImage, kind: 'lifestyle' },
      { label: 'Night Window', image: jukeboxJavaMugNightWindowImage, kind: 'lifestyle' },
      { label: 'Jukebox Table', image: jukeboxJavaMugDinerTableImage, kind: 'lifestyle' },
      { label: 'Radio Desk', image: jukeboxJavaMugRadioDeskImage, kind: 'lifestyle' },
      { label: 'Diner Counter', image: jukeboxJavaMugDinerCounterImage, kind: 'lifestyle' },
    ],
    printful: {
      externalId: 'jukebox-java-retro-diner-mug',
      catalogProductId: 19,
      technique: 'sublimation',
      placement: 'default',
      variants: jukeboxJavaMugVariants,
    },
  },
]

export const newArrivalIds = ['after-hours-video-club-tee', 'jukebox-java-retro-diner-mug']

export const featuredDropProduct = products[0]

export const bundles = []

export const shelfReadySets = []

export const productDetailExperiences = {
  'after-hours-video-club-tee': {
    tone: 'video-store',
    orderLabel: '1989 Video Counter Mail Order',
    storyTitle: 'After Hours Video Club',
    storyBody:
      'A clean white tee built for late rental runs, glowing marquees, and one more rewind before closing. The front graphic keeps the video-store counter energy clear without making the shirt feel noisy.',
    storyBullets: [
      'Soft white tee with a bold front graphic',
      'Video-store artwork for movie-night outfits',
      'Easy gift pick for retro fans',
      'Made to order after checkout',
      'Pairs well with denim, jackets, and weekend layers',
    ],
    careRows: [
      ['Production', 'Made to order after checkout'],
      ['Best For', 'Video-store nights and casual retro outfits'],
      ['Care', 'Machine wash cold inside out and tumble dry low'],
      ['Artwork', 'After Hours Video Club illustration on a white tee'],
    ],
    lookbook: [
      [afterHoursTeeVideoStoreLifestyleImage, 'Late-night video aisle'],
      [afterHoursTeeParkingLotLifestyleImage, 'Rental-store parking lot'],
      [afterHoursTeeMovieNightLifestyleImage, 'Living-room movie night'],
      [afterHoursTeeArcadeLifestyleImage, 'After-school arcade'],
    ],
  },
  'jukebox-java-retro-diner-mug': {
    tone: 'diner',
    orderLabel: '1989 Diner Counter Mail Order',
    storyTitle: 'Coffee With A Tabletop Soundtrack',
    storyBody:
      'A diner-counter mug built for late refills, tabletop jukebox glow, and slow Saturday mornings. It is made for coffee desks, kitchen shelves, and anyone who wants a small piece of diner nostalgia in the daily routine.',
    storyBullets: [
      'Glossy white ceramic diner mug',
      'Jukebox Java artwork on the front',
      'Gift ready for coffee and music lovers',
      'Made to order after checkout',
      'Works for coffee, tea, cocoa, and desk refills',
    ],
    careRows: [
      ['Production', 'Made to order after checkout'],
      ['Best For', 'Coffee lovers'],
      ['Care', 'Hand wash recommended'],
      ['Artwork', 'Jukebox Java diner-counter illustration'],
    ],
    lookbook: [
      [jukeboxJavaMugBreakfastCounterImage, 'Breakfast counter refill'],
      [jukeboxJavaMugKitchenShelfImage, 'Kitchen shelf nostalgia'],
      [jukeboxJavaMugMusicDeskImage, 'Desk-side mixtape coffee'],
      [jukeboxJavaMugNightWindowImage, 'Night-shift diner window'],
    ],
  },
}
