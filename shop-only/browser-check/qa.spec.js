import { test, expect } from '@playwright/test'

test.use({ channel: 'chrome', viewport: { width: 1440, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear())
})

test('diner mug storefront flow', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await expect(page.locator('#products')).toBeVisible()

  await page.getByLabel(/search products and skus/i).fill('Diner Counter Mug')
  const productCard = page.locator('.product-card').filter({ hasText: 'Diner Counter Mug' }).first()
  await expect(productCard).toBeVisible()

  await productCard.getByRole('button', { name: 'Add', exact: true }).click()
  await expect(page.getByText(/added to cart/i)).toBeVisible()
  await page.locator('.cart-button').click()
  await expect(page.getByRole('complementary', { name: /shopping cart/i })).toBeVisible()
  await expect(page.getByText('Diner Counter Mug').first()).toBeVisible()
  await page.getByRole('button', { name: 'Checkout', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Shipping Details' })).toBeVisible()
  await page.getByPlaceholder('Marty McFly').fill('Marty McFly')
  await page.getByPlaceholder('marty@example.com').fill('marty@example.com')
  await page.getByPlaceholder('1989 Supply Street').fill('1989 Supply Street')
  await page.getByPlaceholder('Hill Valley').fill('Hill Valley')
  await page.getByPlaceholder('90089').fill('90089')
  await page.getByRole('button', { name: /continue with paypal/i }).click()
  await page.getByRole('button', { name: 'Place Order' }).click()
  await expect(page.getByRole('heading', { name: 'Order received' })).toBeVisible()
  await page.getByRole('button', { name: 'View Dashboard' }).click()
  await expect(page.getByText('Purchase History')).toBeVisible()
})

test('diner mug product detail page uses the retro catalog conversion layout', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#/products/diner-counter-mug')

  await expect(page.locator('.catalog-pdp-hero')).toBeVisible()
  await expect(page.locator('.catalog-pdp-gallery')).toBeVisible()
  await expect(page.locator('.catalog-pdp-buy-panel')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Diner Counter Mug' })).toBeVisible()
  await expect(page.getByText('Ceramic mug for coffee, tea, and desk days.')).toBeVisible()
  await expect(page.getByText('$18.00').first()).toBeVisible()

  await expect(page.locator('.catalog-pdp-buy-panel').getByRole('button', { name: /add to cart/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /buy now/i })).toBeVisible()
  const heroPanelHeights = await page.locator('.catalog-pdp-main-frame, .catalog-pdp-buy-panel').evaluateAll((panels) =>
    panels.map((panel) => Math.round(panel.getBoundingClientRect().height)),
  )
  expect(heroPanelHeights).toEqual([heroPanelHeights[0], heroPanelHeights[0]])
  await expect(page.locator('.catalog-pdp-panel-trust').getByText(/ships in 2-4 business days/i)).toBeVisible()
  await expect(page.locator('.catalog-pdp-trust-strip').getByText(/gift-ready/i)).toBeVisible()
  await expect(page.locator('.catalog-pdp-memory-row').getByText(/back in the day/i)).toBeVisible()
  await expect(page.locator('.catalog-pdp-info-tabs').getByText(/size guide/i)).toBeVisible()
  await expect(page.locator('.catalog-pdp-bundle-save').getByText(/bundle & save/i)).toBeVisible()
  await expect(page.locator('.catalog-pdp-bundle-save').getByRole('button', { name: /add bundle to cart/i }).first()).toBeVisible()
  await expect(page.locator('.catalog-pdp-complete-look').getByText(/complete the look/i)).toBeVisible()
  await expect(page.locator('.catalog-pdp-era-grid').getByText(/customer notes/i)).toBeVisible()

  await expect(page.locator('.product-detail-reset')).toHaveCount(0)
  await expect(page.locator('.catalog-pdp-sticky')).toHaveCount(0)
})

test('diner mug product detail cart controls update state', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#/products/diner-counter-mug')

  await page.getByRole('button', { name: /increase quantity/i }).click()
  await page.locator('.catalog-pdp-buy-panel').getByRole('button', { name: /add to cart/i }).click()
  await expect(page.getByText(/added to cart/i)).toBeVisible()

  await page.locator('.cart-button').click()
  await expect(page.getByRole('complementary', { name: /shopping cart/i })).toBeVisible()
  const cartItem = page.locator('.cart-item').filter({ hasText: 'Diner Counter Mug' }).first()
  await expect(cartItem).toBeVisible()
  await expect(cartItem.locator('.quantity-row span')).toHaveText('2')
})

test('customer dashboard account tabs', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')

  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByPlaceholder('alex@example.com').fill('alex@example.com')
  await page.getByPlaceholder('Your password').fill('demo-password')
  await page.getByRole('button', { name: 'Sign In', exact: true }).click()

  await expect(page.getByText('Purchase History')).toBeVisible()

  await page.getByRole('button', { name: 'Wishlist' }).click()
  await expect(page.getByText('saved').first()).toBeVisible()

  await page.getByRole('button', { name: 'Account Settings' }).click()
  await expect(page.getByRole('heading', { name: 'Account Settings' })).toBeVisible()

  // Go to Overview
  await page.getByRole('button', { name: 'Overview' }).click()
  // Click Contact Support in the Support Center sidebar card
  await page.getByRole('button', { name: /Contact Support/ }).click()
  // Verify Support Center workspace is active in the main column
  await expect(page.locator('.account-support-workspace').getByText('Support Center')).toBeVisible()
  await expect(page.getByText('draft ticket')).toBeVisible()
})
