const normalizeStatus = (value) => String(value ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_')

export const getReviewPurchaseKey = (orderId, productId) => `${orderId ?? ''}:${productId ?? ''}`

export const isOrderReviewEligible = (order) => {
  const orderStatus = normalizeStatus(order?.status)
  const fulfillmentStatus = normalizeStatus(order?.fulfillment)
  const paymentStatus = normalizeStatus(order?.paymentStatus ?? order?.payment)
  const orderBlocked = ['cancelled', 'canceled', 'refunded'].includes(orderStatus)

  return !orderBlocked && (
    ['paid', 'captured'].some((status) => paymentStatus === status || paymentStatus.endsWith(`_${status}`))
    || ['delivered', 'completed'].includes(orderStatus)
    || ['delivered', 'fulfilled'].includes(fulfillmentStatus)
  )
}

export const getReviewableOrderItems = (order, catalogProducts) => {
  const catalogById = new Map(catalogProducts.map((product) => [product.id, product]))
  const catalogByName = new Map(catalogProducts.map((product) => [product.name.toLowerCase(), product]))
  const seenProductIds = new Set()

  return (order?.items ?? []).flatMap((item) => {
    const itemName = typeof item === 'string' ? item : item?.name
    const product = catalogById.get(item?.productId) ?? catalogByName.get(String(itemName ?? '').toLowerCase())

    if (!product || seenProductIds.has(product.id)) return []
    seenProductIds.add(product.id)

    return [{
      productId: product.id,
      productName: product.name,
      image: product.image,
      optionSummary: typeof item === 'string' ? '' : item?.optionSummary ?? '',
    }]
  })
}

export const mapProductReview = (review) => ({
  id: review.id,
  userId: review.user_id,
  orderId: review.order_id,
  productId: review.product_id,
  reviewerName: review.reviewer_name,
  rating: Number(review.rating),
  title: review.title,
  body: review.body,
  status: review.status,
  createdAt: review.created_at,
})

export const getReviewStars = (rating) => {
  const safeRating = Math.min(5, Math.max(1, Math.round(Number(rating) || 1)))
  return `${'★'.repeat(safeRating)}${'☆'.repeat(5 - safeRating)}`
}
