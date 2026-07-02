import test from 'node:test'
import assert from 'node:assert/strict'
import process from 'node:process'

const withoutPrintfulToken = async (callback) => {
  const originalToken = process.env.PRINTFUL_API_TOKEN
  const originalStoreId = process.env.PRINTFUL_STORE_ID
  process.env.PRINTFUL_API_TOKEN = ''
  process.env.PRINTFUL_STORE_ID = ''

  try {
    return await callback()
  } finally {
    if (originalToken === undefined) delete process.env.PRINTFUL_API_TOKEN
    else process.env.PRINTFUL_API_TOKEN = originalToken

    if (originalStoreId === undefined) delete process.env.PRINTFUL_STORE_ID
    else process.env.PRINTFUL_STORE_ID = originalStoreId
  }
}

const callHandler = async (moduleUrl) => {
  const { default: handler } = await import(moduleUrl)
  let rawBody = ''
  const res = {
    statusCode: 200,
    setHeader() {},
    end(body) {
      rawBody = String(body ?? '')
    },
  }

  const originalConsoleError = console.error
  console.error = () => {}
  try {
    await handler({ method: 'GET', headers: {} }, res)
  } finally {
    console.error = originalConsoleError
  }

  return {
    statusCode: res.statusCode,
    body: JSON.parse(rawBody),
  }
}

test('Vercel wrapper routes /api/printful/store to the shared Printful handler', async () => {
  await withoutPrintfulToken(async () => {
    const result = await callHandler(new URL('./printful/store.js', import.meta.url))

    assert.equal(result.statusCode, 503)
    assert.equal(result.body.error, 'Printful is not configured. Add PRINTFUL_API_TOKEN in Doppler.')
  })
})

test('Vercel wrapper routes /api/printful/products to the shared Printful handler', async () => {
  await withoutPrintfulToken(async () => {
    const result = await callHandler(new URL('./printful/products.js', import.meta.url))

    assert.equal(result.statusCode, 503)
    assert.equal(result.body.error, 'Printful is not configured. Add PRINTFUL_API_TOKEN in Doppler.')
  })
})
