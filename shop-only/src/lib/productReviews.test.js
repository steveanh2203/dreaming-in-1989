import test from 'node:test'
import assert from 'node:assert/strict'
import { getReviewableOrderItems, isOrderReviewEligible } from './productReviews.js'

test('does not treat browser demo payment status as verified purchase evidence', () => {
  assert.equal(
    isOrderReviewEligible({
      status: 'Order received',
      fulfillment: 'Production pending',
      paymentStatus: 'PayPal demo_approved',
    }),
    false,
  )
})

test('treats provider-confirmed payment or delivery as review eligible', () => {
  assert.equal(isOrderReviewEligible({ status: 'Order received', paymentStatus: 'paid' }), true)
  assert.equal(isOrderReviewEligible({ status: 'delivered', paymentStatus: 'pending_review' }), true)
  assert.equal(isOrderReviewEligible({ status: 'cancelled', paymentStatus: 'paid' }), false)
})

test('maps purchased order items only to known catalog products', () => {
  const items = getReviewableOrderItems(
    {
      items: [
        { productId: 'known-product', name: 'Known Product', optionSummary: 'Large' },
        { productId: 'unknown-product', name: 'Unknown Product' },
      ],
    },
    [{ id: 'known-product', name: 'Known Product', image: '/known.png' }],
  )

  assert.deepEqual(items, [
    {
      productId: 'known-product',
      productName: 'Known Product',
      image: '/known.png',
      optionSummary: 'Large',
    },
  ])
})
