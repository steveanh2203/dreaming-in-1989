import lateNightRewindMugFrontImage from '../assets/catalog/late-night-rewind-club-mug/01-front.png'
import lateNightRewindMugHandleRightImage from '../assets/catalog/late-night-rewind-club-mug/02-handle-right.png'
import lateNightRewindMugHandleLeftImage from '../assets/catalog/late-night-rewind-club-mug/03-handle-left.png'
import lateNightRewindMugLifestyleImage from '../assets/catalog/late-night-rewind-club-mug/04-lifestyle-1.png'
import lateNightRewindMugArtworkImage from '../assets/catalog/late-night-rewind-club-mug/00-artwork-transparent.png'
import videoRentalRunToteFrontImage from '../assets/catalog/video-rental-run-tote/01-front.png'
import videoRentalRunToteBackImage from '../assets/catalog/video-rental-run-tote/02-back.png'
import videoRentalRunToteHangerFrontImage from '../assets/catalog/video-rental-run-tote/03-hanger-front.png'
import videoRentalRunToteHangerBackImage from '../assets/catalog/video-rental-run-tote/04-hanger-back.png'
import videoRentalRunToteDetailImage from '../assets/catalog/video-rental-run-tote/05-detail.png'
import videoRentalRunToteHeroLifestyleImage from '../assets/catalog/video-rental-run-tote/06-hero-lifestyle.png'
import videoRentalRunToteLifestyleImage1 from '../assets/catalog/video-rental-run-tote/07-lifestyle-1.png'
import videoRentalRunToteLifestyleImage2 from '../assets/catalog/video-rental-run-tote/08-lifestyle-2.png'
import videoRentalRunToteLifestyleImage3 from '../assets/catalog/video-rental-run-tote/09-lifestyle-3.png'
import videoRentalRunToteLifestyleImage4 from '../assets/catalog/video-rental-run-tote/10-lifestyle-4.png'

export const products = [
  {
    id: 'late-night-rewind-club-mug',
    name: 'Late Night Rewind Club Mug',
    category: 'Drinkware',
    tag: 'New Drop',
    shortDetail: 'White glossy 11 oz mug with a late-night VHS rewind club print.',
    price: 18,
    sku: 'SKU-1989-LNRC-MUG-11OZ',
    stockState: 'in-stock',
    image: lateNightRewindMugFrontImage,
    backImage: lateNightRewindMugHandleRightImage,
    lifestyleImage: lateNightRewindMugLifestyleImage,
    printDetailImage: lateNightRewindMugArtworkImage,
    galleryImages: [
      { label: '01 Front', image: lateNightRewindMugFrontImage },
      { label: '02 Handle Right', image: lateNightRewindMugHandleRightImage },
      { label: '03 Handle Left', image: lateNightRewindMugHandleLeftImage },
      { label: '04 Lifestyle', image: lateNightRewindMugLifestyleImage },
      { label: '05 Artwork', image: lateNightRewindMugArtworkImage },
    ],
    printful: {
      syncProductId: 440663109,
      externalId: 'late-night-rewind-club-mug',
      catalogProductId: 19,
      variants: [
        {
          size: '11 oz',
          color: 'White',
          catalogVariantId: 1320,
          retailPrice: 18,
          baseCost: 10.95,
          sku: 'SKU-1989-LNRC-MUG-11OZ',
          externalId: 'late-night-rewind-club-mug-11oz-glossy-white',
        },
      ],
    },
  },
  {
    id: 'video-rental-run-tote',
    name: 'Video Rental Run Tote Bag',
    category: 'Bags',
    tag: 'Fresh Drop',
    shortDetail: 'Oyster organic cotton tote with a Friday-night video rental graphic.',
    price: 29,
    sku: 'SKU-1989-VRRT-TOTE-OS',
    stockState: 'in-stock',
    image: videoRentalRunToteFrontImage,
    backImage: videoRentalRunToteBackImage,
    lifestyleImage: videoRentalRunToteHeroLifestyleImage,
    printDetailImage: videoRentalRunToteDetailImage,
    galleryImages: [
      { label: '01 Front', image: videoRentalRunToteFrontImage },
      { label: '02 Back', image: videoRentalRunToteBackImage },
      { label: '03 Hanger Front', image: videoRentalRunToteHangerFrontImage },
      { label: '04 Hanger Back', image: videoRentalRunToteHangerBackImage },
      { label: '05 Detail', image: videoRentalRunToteDetailImage },
      { label: '06 Hero Lifestyle', image: videoRentalRunToteHeroLifestyleImage },
      { label: '07 Checkout Counter', image: videoRentalRunToteLifestyleImage1 },
      { label: '08 Mall Walk', image: videoRentalRunToteLifestyleImage2 },
      { label: '09 Movie Night', image: videoRentalRunToteLifestyleImage3 },
      { label: '10 Friday Pickup', image: videoRentalRunToteLifestyleImage4 },
    ],
    printful: {
      syncProductId: 440828566,
      externalId: 'video-rental-run-tote',
      catalogProductId: 367,
      variants: [
        {
          size: 'One size',
          color: 'Oyster',
          catalogVariantId: 10458,
          retailPrice: 29,
          baseCost: 15.25,
          sku: 'SKU-1989-VRRT-TOTE-OS',
          externalId: 'video-rental-run-tote-one-size-oyster',
        },
      ],
    },
  },
]

export const newArrivalIds = ['video-rental-run-tote', 'late-night-rewind-club-mug']

export const featuredDropProduct = products[0]

export const bundles = []

export const shelfReadySets = []

export const productDetailExperiences = {
  'late-night-rewind-club-mug': {
    tone: 'video-store',
    orderLabel: '1989 Video Counter Mail Order',
    storyTitle: 'Late Night Rewind',
    storyBody:
      'A glossy desk mug built around the Friday-night ritual: rental slips, warm counter lights, CRT glow, and one last rewind before closing.',
    storyBullets: [
      'Printful White Glossy Mug 11 oz',
      'Artwork generated on chroma key and cleaned to transparent PNG',
      'Mockups pulled from Printful placement views',
      'Lifestyle image generated from the cleaned concept reference',
    ],
    careRows: [
      ['Production', 'Printed after checkout through Printful'],
      ['Best For', 'Coffee, tea, desk setups, video-room shelves, and retro gift baskets'],
      ['Artwork', 'Late-night VHS club illustration on a white glossy mug'],
    ],
  },
  'video-rental-run-tote': {
    tone: 'video-store',
    orderLabel: '1989 Video Counter Mail Order',
    storyTitle: 'Friday Night Rental Run',
    storyBody:
      'An organic cotton carry-all built for the old Friday ritual: return the tapes, scan the new-release wall, grab the snacks, and make it home before the previews start.',
    storyBullets: [
      'Printful Econscious EC8000 organic cotton tote in Oyster',
      'Original chroma-key artwork cleaned to a transparent 300 DPI print file',
      'Front print applied to the official 10 × 10 inch Printful placement',
      'Lifestyle scenes generated from the cleaned artwork and Printful product reference',
    ],
    careRows: [
      ['Production', 'DTG printed after checkout through Printful'],
      ['Best For', 'VHS runs, records, books, groceries, mall finds, and weekend errands'],
      ['Material', 'Certified organic cotton twill with long shoulder straps'],
      ['Artwork', 'Video Rental Run illustration with Friday Night Pickup and 1989 details'],
    ],
    lookbook: [
      [videoRentalRunToteLifestyleImage1, 'Friday night checkout'],
      [videoRentalRunToteLifestyleImage2, 'Golden-hour mall run'],
      [videoRentalRunToteLifestyleImage3, 'Movie-night living room'],
      [videoRentalRunToteLifestyleImage4, 'Rainy parking-lot pickup'],
    ],
  },
}
