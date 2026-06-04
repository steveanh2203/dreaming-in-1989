import { test, expect } from '@playwright/test'

test.use({ channel: 'chrome', viewport: { width: 1440, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear())
})

test('diner mug storefront flow', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await page.getByRole('button', { name: /skip intro/i }).click()
  await expect(page.locator('#products')).toBeVisible()

  await page.getByLabel(/search products and skus/i).fill('Diner Counter Mug')
  await expect(page.getByText('Diner Counter Mug').first()).toBeVisible()

  await page.getByRole('button', { name: /view diner counter mug details/i }).first().click()
  await expect(page.getByRole('heading', { name: 'Diner Counter Mug' })).toBeVisible()
  await expect(page.getByText('Glossy White').first()).toBeVisible()
  await expect(page.getByText('Cream Accent')).toHaveCount(0)
  await expect(page.getByText('15 oz')).toHaveCount(0)

  await page.getByLabel('Diner Counter Mug', { exact: true }).getByRole('button', { name: /add to cart/i }).click()
  await expect(page.getByText(/added to cart/i)).toBeVisible()
  await page.getByRole('button', { name: /open cart/i }).click()
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
  await expect(page.getByRole('heading', { name: 'My Orders' })).toBeVisible()
  await expect(page.getByText('Printful draft pending')).toBeVisible()
})

test('customer dashboard account tabs', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await page.getByRole('button', { name: /skip intro/i }).click()

  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByPlaceholder('alex@example.com').fill('alex@example.com')
  await page.getByPlaceholder('Your password').fill('demo-password')
  await page.getByRole('button', { name: 'Sign In', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'My Orders' })).toBeVisible()
  await expect(page.getByText('Tracking Center')).toHaveCount(0)

  await page.getByRole('tab', { name: 'Tracking' }).click()
  await expect(page.getByRole('heading', { name: 'Tracking Center' })).toBeVisible()

  await page.getByRole('tab', { name: 'Support' }).click()
  await expect(page.getByRole('heading', { name: 'Support Desk' })).toBeVisible()
  await expect(page.getByText('Draft ticket')).toBeVisible()
})
