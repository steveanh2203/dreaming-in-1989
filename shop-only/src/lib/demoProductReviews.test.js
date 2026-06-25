import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createDemoProductReviews,
  getAverageReviewRating,
  getReviewDistribution,
  mergeProductReviews,
} from './demoProductReviews.js'

const product = {
  id: 'late-night-rewind-club-mug',
  name: 'Late Night Rewind Club Mug',
  category: 'Drinkware',
}

test('creates a stable set of 10 to 20 reviews for each product', () => {
  const firstRun = createDemoProductReviews(product)
  const secondRun = createDemoProductReviews(product)

  assert.ok(firstRun.length >= 10)
  assert.ok(firstRun.length <= 20)
  assert.deepEqual(firstRun, secondRun)
  assert.equal(new Set(firstRun.map((review) => review.id)).size, firstRun.length)
})

test('keeps the rating mix strongly weighted toward four and five stars', () => {
  const reviews = createDemoProductReviews(product)
  const positiveReviews = reviews.filter((review) => review.rating >= 4)
  const oneStarReviews = reviews.filter((review) => review.rating === 1)
  const twoStarReviews = reviews.filter((review) => review.rating === 2)

  assert.ok(positiveReviews.length / reviews.length >= 0.8)
  assert.equal(oneStarReviews.length, 0)
  assert.ok(twoStarReviews.length <= 1)
  assert.ok(getAverageReviewRating(reviews) >= 4.2)
})

test('builds percentages from the actual review list', () => {
  const distribution = getReviewDistribution([
    { rating: 5 },
    { rating: 5 },
    { rating: 4 },
    { rating: 3 },
  ])

  assert.deepEqual(distribution, [
    { rating: 5, count: 2, percentage: 50 },
    { rating: 4, count: 1, percentage: 25 },
    { rating: 3, count: 1, percentage: 25 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 0, percentage: 0 },
  ])
})

test('replaces sample slots with verified reviews instead of inflating the sample total', () => {
  const demoReviews = createDemoProductReviews(product)
  const verifiedReviews = [
    { id: 'live-1', rating: 5, verified: true },
    { id: 'live-2', rating: 4, verified: true },
  ]

  const mergedReviews = mergeProductReviews(verifiedReviews, demoReviews)

  assert.equal(mergedReviews.length, demoReviews.length)
  assert.deepEqual(mergedReviews.slice(0, 2), verifiedReviews)
})
