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

const afterHoursTeeVariants = ['S', 'M', 'L', 'XL'].map((size) => ({
  size,
  color: 'White',
  retailPrice: 29,
  sku: `SKU-1989-AHVC-TEE-${size}`,
  externalId: `after-hours-video-club-tee-${size.toLowerCase()}-white`,
}))

export const products = [
  {
    id: 'after-hours-video-club-tee',
    name: 'After Hours Video Club Tee',
    category: 'T Shirt',
    tag: 'New Drop',
    shortDetail: 'White retro graphic tee inspired by late-night video store runs and after-hours rewinds.',
    price: 29,
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
]

export const newArrivalIds = ['after-hours-video-club-tee']

export const featuredDropProduct = products[0]

export const bundles = []

export const shelfReadySets = []

export const productDetailExperiences = {
  'after-hours-video-club-tee': {
    tone: 'video-store',
    orderLabel: '1989 Video Counter Mail Order',
    storyTitle: 'After Hours Video Club',
    storyBody:
      'A white graphic tee for the last rental run of the night: glowing marquees, stacked tapes, parking-lot neon, and one more rewind before closing.',
    storyBullets: [
      'White short-sleeve tee with a front After Hours Video Club graphic',
      'Transparent artwork prepared as a high-resolution print file',
      'Product views sourced from the supplied Printful mockup package',
      'Available in sizes S through XL',
    ],
    careRows: [
      ['Production', 'Printed after checkout through Printful'],
      ['Best For', 'Video-store nights, arcade runs, casual outfits, and retro gifts'],
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
}
