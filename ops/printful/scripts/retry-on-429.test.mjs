import assert from 'node:assert/strict'
import test from 'node:test'

import { retryOn429 } from './retry-on-429.mjs'

test('retries a rate-limited operation until it succeeds', async () => {
  let attempts = 0
  const result = await retryOn429(
    async () => {
      attempts += 1
      if (attempts < 3) {
        const error = new Error('limited')
        error.status = 429
        throw error
      }
      return 'completed'
    },
    { maxAttempts: 4, delayMs: 0, wait: async () => {} },
  )

  assert.equal(result, 'completed')
  assert.equal(attempts, 3)
})

test('does not retry a non-rate-limit failure', async () => {
  let attempts = 0

  await assert.rejects(
    retryOn429(
      async () => {
        attempts += 1
        const error = new Error('bad request')
        error.status = 400
        throw error
      },
      { maxAttempts: 4, delayMs: 0, wait: async () => {} },
    ),
    /bad request/,
  )

  assert.equal(attempts, 1)
})
