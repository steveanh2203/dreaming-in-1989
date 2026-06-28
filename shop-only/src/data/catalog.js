import afterHoursTeeArtworkImage from '../assets/catalog/after-hours-video-club-tee/00-artwork-transparent.png'
import afterHoursTeeFrontImage from '../assets/catalog/after-hours-video-club-tee/printful-white/01-front.png'
import afterHoursTeeFlatFrontImage from '../assets/catalog/after-hours-video-club-tee/printful-white/02-flat-front.png'
import afterHoursTeeProductDetailsImage from '../assets/catalog/after-hours-video-club-tee/printful-white/03-product-details.png'
import afterHoursTeeLeftImage from '../assets/catalog/after-hours-video-club-tee/printful-white/04-left.png'
import afterHoursTeeRightImage from '../assets/catalog/after-hours-video-club-tee/printful-white/05-right.png'
import afterHoursTeeZoomFrontImage from '../assets/catalog/after-hours-video-club-tee/printful-white/06-zoom-front.png'
import afterHoursTeeFlatBackImage from '../assets/catalog/after-hours-video-club-tee/printful-white/07-flat-back.png'
import afterHoursTeeGhostBackImage from '../assets/catalog/after-hours-video-club-tee/printful-white/08-ghost-back.png'
import afterHoursTeeProductDetailsAltImage from '../assets/catalog/after-hours-video-club-tee/printful-white/09-product-details-2.png'
import afterHoursTeeFoldedFrontImage from '../assets/catalog/after-hours-video-club-tee/printful-white/10-folded-front.png'
import afterHoursTeePrintfileFrontImage from '../assets/catalog/after-hours-video-club-tee/printful-white/11-printfile-front.png'
import afterHoursTeeHeroVideoStoreWideImage from '../assets/catalog/after-hours-video-club-tee/12-hero-video-store-wide.png'
import afterHoursTeeVideoStoreLifestyleImage from '../assets/catalog/after-hours-video-club-tee/12-lifestyle-video-store.png'
import afterHoursTeeParkingLotLifestyleImage from '../assets/catalog/after-hours-video-club-tee/13-lifestyle-rental-parking-lot.png'
import afterHoursTeeMovieNightLifestyleImage from '../assets/catalog/after-hours-video-club-tee/14-lifestyle-movie-night.png'
import afterHoursTeeArcadeLifestyleImage from '../assets/catalog/after-hours-video-club-tee/15-lifestyle-arcade.png'
import jukeboxJavaMugFrontImage from '../assets/catalog/jukebox-java-retro-diner-mug/printful-white/01-front.png'
import jukeboxJavaMugHandleRightImage from '../assets/catalog/jukebox-java-retro-diner-mug/printful-white/02-handle-right.png'
import jukeboxJavaMugHandleLeftImage from '../assets/catalog/jukebox-java-retro-diner-mug/printful-white/03-handle-left.png'
import jukeboxJavaMugFrontCloseupImage from '../assets/catalog/jukebox-java-retro-diner-mug/printful-white/04-front-closeup.png'
import jukeboxJavaMugPrintDetailImage from '../assets/catalog/jukebox-java-retro-diner-mug/printful-white/05-print-detail.png'
import jukeboxJavaMugHeroDinerBoothImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/06-hero-diner-booth.png'
import jukeboxJavaMugBreakfastCounterImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/07-lifestyle-breakfast-counter.png'
import jukeboxJavaMugKitchenShelfImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/08-lifestyle-kitchen-shelf.png'
import jukeboxJavaMugMusicDeskImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/09-lifestyle-music-desk.png'
import jukeboxJavaMugNightWindowImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/10-lifestyle-night-window.png'
import jukeboxJavaMugMusicDeskCassettesImage from '../assets/catalog/jukebox-java-retro-diner-mug/lifestyle/11-lifestyle-music-desk-cassettes.png'

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
    image: afterHoursTeeFrontImage,
    backImage: afterHoursTeeFlatBackImage,
    lifestyleImage: afterHoursTeeHeroVideoStoreWideImage,
    printDetailImage: afterHoursTeeArtworkImage,
    galleryImages: [
      { label: '01 Front', image: afterHoursTeeFrontImage },
      { label: '02 Flat Front', image: afterHoursTeeFlatFrontImage },
      { label: '03 Product Details', image: afterHoursTeeProductDetailsImage },
      { label: '04 Left', image: afterHoursTeeLeftImage },
      { label: '05 Right', image: afterHoursTeeRightImage },
      { label: '06 Zoom Front', image: afterHoursTeeZoomFrontImage },
      { label: '07 Flat Back', image: afterHoursTeeFlatBackImage },
      { label: '08 Ghost Back', image: afterHoursTeeGhostBackImage },
      { label: '09 Details', image: afterHoursTeeProductDetailsAltImage },
      { label: '10 Folded Front', image: afterHoursTeeFoldedFrontImage },
      { label: '11 Print File', image: afterHoursTeePrintfileFrontImage },
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
    image: jukeboxJavaMugFrontImage,
    lifestyleImage: jukeboxJavaMugMusicDeskCassettesImage,
    printDetailImage: jukeboxJavaMugPrintDetailImage,
    seoTitle: 'Jukebox Java Retro Diner Mug | 80s Coffee Mug Gift',
    metaDescription:
      'Shop the Jukebox Java Retro Diner Mug, a glossy white coffee mug with 1980s diner artwork, jukebox charm, and nostalgic gift-ready style.',
    productDescription:
      'Bring the booth-side soundtrack to your morning coffee with the Jukebox Java Retro Diner Mug. Inspired by American diners, tabletop jukeboxes, sugar packets, chrome trim, and the warm buzz of a late-night coffee refill, this glossy white mug turns an everyday cup into a small piece of 1980s nostalgia. The artwork features a playful Jukebox Java diner graphic designed for fans of retro coffee bars, vintage restaurant signs, old-school music culture, and giftable Americana.',
    galleryImages: [
      { label: '01 Front', image: jukeboxJavaMugFrontImage },
      { label: '02 Handle Right', image: jukeboxJavaMugHandleRightImage },
      { label: '03 Handle Left', image: jukeboxJavaMugHandleLeftImage },
      { label: '04 Front Closeup', image: jukeboxJavaMugFrontCloseupImage },
      { label: '05 Print Detail', image: jukeboxJavaMugPrintDetailImage },
      { label: '06 Diner Booth', image: jukeboxJavaMugHeroDinerBoothImage },
      { label: '07 Breakfast Counter', image: jukeboxJavaMugBreakfastCounterImage },
      { label: '08 Kitchen Shelf', image: jukeboxJavaMugKitchenShelfImage },
      { label: '09 Music Desk', image: jukeboxJavaMugMusicDeskImage },
      { label: '10 Night Window', image: jukeboxJavaMugNightWindowImage },
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
