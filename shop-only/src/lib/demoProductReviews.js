const reviewerNames = [
  'Alex M.',
  'Jamie R.',
  'Morgan T.',
  'Casey L.',
  'Taylor B.',
  'Jordan K.',
  'Riley S.',
  'Cameron P.',
  'Avery D.',
  'Quinn H.',
  'Reese W.',
  'Parker N.',
  'Drew C.',
  'Skyler J.',
  'Hayden F.',
  'Robin G.',
  'Sam V.',
  'Blake E.',
  'Dakota A.',
  'Emerson O.',
]

const reviewCopyByRating = {
  5: [
    ['Exactly the retro mood I wanted', '{product} looks even better in person. The colors feel nostalgic without looking faded.'],
    ['Instant favorite', 'This became one of my favorite {category} pieces right away. The design has a lot of personality.'],
    ['Great quality and clean detail', 'The artwork on {product} is crisp, balanced, and easy to appreciate up close.'],
    ['Perfect throwback energy', 'It feels like a real find from an old mall shop. The retro direction is spot on.'],
    ['Made the whole setup better', '{product} added the exact 80s and 90s touch I wanted without overpowering everything else.'],
    ['A fun conversation starter', 'Friends noticed the design immediately. It has a memorable look and feels thoughtfully made.'],
    ['Better than the photos', 'The details read clearly in person and the overall finish feels more polished than expected.'],
    ['Would happily buy again', 'The design, color, and finish all work together. It also feels easy to give as a gift.'],
    ['Nostalgic in the best way', 'This captures the late-night rewind era without feeling like a costume or novelty prop.'],
    ['The print came out beautifully', 'Sharp lines, rich color, and a strong retro composition. I am very happy with this one.'],
    ['A great gift choice', 'I picked {product} for a retro fan and it landed perfectly. The presentation felt special.'],
    ['Looks right at home', 'The piece fits naturally into my everyday setup and still stands out enough to feel unique.'],
  ],
  4: [
    ['Very happy with it', '{product} has a strong design and the finished piece looks close to what I expected.'],
    ['Solid retro piece', 'The nostalgic style works really well. I would only make a tiny adjustment to the sizing or placement.'],
    ['Good detail and color', 'The artwork is clear and the colors feel accurate. Overall, this is a very satisfying {category} item.'],
    ['A nice everyday find', 'It is practical, fun, and easy to work into a normal routine without feeling overly themed.'],
    ['Gift-ready and memorable', 'The recipient liked it immediately. The design is distinctive and the quality feels dependable.'],
    ['Worth adding to the collection', 'A strong piece with plenty of character. It pairs well with the other retro items I own.'],
    ['Looks good in person', 'The main design reads well and the finish is clean. Delivery presentation could be a little tighter.'],
    ['Good balance of fun and usable', 'It has enough nostalgia to stand out while still feeling like something I can use regularly.'],
  ],
  3: [
    ['Good overall with a small caveat', 'The concept is great and the design is clear, though the finished scale felt slightly different than expected.'],
    ['Nice design, average finish', 'I like the retro direction and still use it often. A little more contrast would make it stronger.'],
    ['Fun piece for the right setup', '{product} has personality and works well with other nostalgic decor, but it is more subtle in person.'],
    ['Mostly as expected', 'The item matches the overall idea and arrived in good shape. I hoped for slightly richer color.'],
  ],
  2: [
    ['Good idea, but not quite for me', 'The retro concept is appealing, but the final look did not fit my setup as well as I expected.'],
    ['Some nice details', 'The artwork has personality, though I would prefer a different scale or placement on this item.'],
  ],
}

const hashString = (value) => {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const seededShuffle = (items, seed) => {
  const shuffled = [...items]
  let state = seed || 1

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const targetIndex = state % (index + 1)
    const current = shuffled[index]
    shuffled[index] = shuffled[targetIndex]
    shuffled[targetIndex] = current
  }

  return shuffled
}

const interpolateReviewCopy = (value, product) =>
  value
    .replaceAll('{product}', product.name)
    .replaceAll('{category}', String(product.category ?? 'product').toLowerCase())

const buildRatingSequence = (count, seed) => {
  const fiveStarCount = Math.ceil(count * 0.6)
  const fourStarCount = Math.ceil(count * 0.25)
  const ratings = [
    ...Array(fiveStarCount).fill(5),
    ...Array(fourStarCount).fill(4),
    ...Array(Math.max(0, count - fiveStarCount - fourStarCount)).fill(3),
  ]

  if (count >= 16 && seed % 4 === 0) ratings[ratings.length - 1] = 2
  return seededShuffle(ratings, seed)
}

const buildOptionSummary = (optionGroups, seed, index) => {
  if (!optionGroups?.length) return ''

  return optionGroups
    .map((group, groupIndex) => {
      const options = group.options ?? []
      if (!options.length) return null
      const optionIndex = (seed + index * 7 + groupIndex * 13) % options.length
      return `${group.name}: ${options[optionIndex].label}`
    })
    .filter(Boolean)
    .join(' | ')
}

const getCustomerPhotoPool = (product) => {
  const gallery = product?.galleryImages ?? []
  const lifestyleShots = gallery.slice(5).map((entry) => entry.image)
  if (lifestyleShots.length) return lifestyleShots
  return gallery.map((entry) => entry.image)
}

export const createDemoProductReviews = (product, optionGroups = []) => {
  if (!product) return []

  const productKey = String(product.id ?? product.name ?? 'product')
  const seed = hashString(productKey)
  const count = 10 + (seed % 11)
  const ratings = buildRatingSequence(count, seed)
  const copyOffsets = new Map()
  const photoPool = getCustomerPhotoPool(product)

  return ratings.map((rating, index) => {
    const copyBank = reviewCopyByRating[rating]
    const offset = copyOffsets.get(rating) ?? seed % copyBank.length
    const [title, body] = copyBank[offset % copyBank.length]
    copyOffsets.set(rating, offset + 1)
    const hasPhoto = rating >= 4 && photoPool.length > 0 && (seed + index) % 3 === 0
    const photo = hasPhoto ? photoPool[(seed + index) % photoPool.length] : null

    return {
      id: `sample-${productKey}-${index + 1}`,
      productId: product.id,
      reviewerName: reviewerNames[(seed + index * 7) % reviewerNames.length],
      rating,
      title,
      body: interpolateReviewCopy(body, product),
      verified: false,
      source: 'sample',
      createdAt: null,
      optionSummary: buildOptionSummary(optionGroups, seed, index),
      images: photo ? [photo] : [],
    }
  })
}

export const getAverageReviewRating = (reviews) => {
  if (!reviews.length) return 0
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0)
  return total / reviews.length
}

export const getReviewDistribution = (reviews) => {
  const total = reviews.length

  return [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => Number(review.rating) === rating).length
    return {
      rating,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    }
  })
}

export const mergeProductReviews = (verifiedReviews, demoReviews) => {
  const demoSlots = Math.max(0, demoReviews.length - verifiedReviews.length)
  return [...verifiedReviews, ...demoReviews.slice(0, demoSlots)]
}
