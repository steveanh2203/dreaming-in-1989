import { test, expect } from '@playwright/test'

test.use({ channel: 'chrome', viewport: { width: 1440, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear())
})

test('diner mug storefront flow', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await expect(page.locator('#products')).toBeVisible()

  await page.getByLabel(/search products and skus/i).fill('Diner Counter Mug')
  await expect(page.getByText('Diner Counter Mug').first()).toBeVisible()

  await page.getByRole('button', { name: /view diner counter mug details/i }).first().click()
  await expect(page.getByRole('heading', { name: 'Diner Counter Mug' })).toBeVisible()
  await expect(page.getByText('Glossy White').first()).toBeVisible()
  await expect(page.getByText('Cream Accent')).toHaveCount(0)
  await expect(page.getByText('15 oz')).toHaveCount(0)

  await page.locator('.product-catalog-order-form').getByRole('button', { name: /add to cart/i }).click()
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
  await expect(page.getByText('Purchase History')).toBeVisible()

  // Open the newly created order row to view detailed status in modal
  await page.getByRole('button', { name: /#1989-/ }).first().click()
  await expect(page.getByText('Printful draft pending')).toBeVisible()
})

test('diner mug PDP desktop hero matches reference structure', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#/products/diner-counter-mug')

  await expect(page.locator('.pdp-shell')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Diner Counter Mug' })).toBeVisible()

  const layout = await page.evaluate(() => {
    const rect = (selector) => {
      const element = document.querySelector(selector)
      if (!element) return null
      const box = element.getBoundingClientRect()
      return {
        height: Math.round(box.height),
        width: Math.round(box.width),
        x: Math.round(box.x),
        y: Math.round(box.y),
      }
    }

    return {
      buy: rect('.pdp-buy-col'),
      main: rect('.pdp-main-col'),
      mainWrap: rect('.pdp-main-img-wrap'),
      options: rect('.pdp-options-area'),
      shell: rect('.pdp-shell'),
      thumbCount: document.querySelectorAll('.pdp-thumb-btn').length,
      trust: rect('.pdp-inline-trust'),
      trustItems: Array.from(document.querySelectorAll('.pdp-inline-trust span')).map((item) => rectFromElement(item)),
    }

    function rectFromElement(element) {
      const box = element.getBoundingClientRect()
      return {
        height: Math.round(box.height),
        width: Math.round(box.width),
        x: Math.round(box.x),
        y: Math.round(box.y),
      }
    }
  })

  expect(layout.thumbCount).toBe(5)
  expect(layout.buy.width).toBeGreaterThanOrEqual(500)
  expect(layout.shell.height).toBeLessThanOrEqual(920)
  expect(layout.mainWrap.width / layout.main.width).toBeGreaterThan(0.82)
  expect(layout.trustItems.map((item) => item.y)).toEqual([
    layout.trustItems[0].y,
    layout.trustItems[0].y,
    layout.trustItems[0].y,
  ])
  expect(layout.options.width / layout.buy.width).toBeGreaterThan(0.88)
})

test('diner mug PDP lower sections keep readable desktop typography', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#/products/diner-counter-mug')

  await expect(page.locator('.pdp-story-row')).toBeVisible()

  const typography = await page.evaluate(() => {
    const fontSize = (selector) => {
      const element = document.querySelector(selector)
      return element ? Number.parseFloat(window.getComputedStyle(element).fontSize) : 0
    }
    const rect = (selector) => {
      const element = document.querySelector(selector)
      if (!element) return null
      const box = element.getBoundingClientRect()
      return {
        height: Math.round(box.height),
        width: Math.round(box.width),
      }
    }

    return {
      bundleName: fontSize('.pdp-bundle-slot small'),
      bundlePrice: fontSize('.pdp-bundle-now'),
      faqQuestion: fontSize('.pdp-faq-question'),
      giftHeader: fontSize('.pdp-gift-header'),
      giftList: fontSize('.pdp-gift-list li'),
      reviewBody: fontSize('.pdp-review-body'),
      sectionTitle: fontSize('.pdp-section-title'),
      storyBody: fontSize('.pdp-story-body'),
      storyHeadline: fontSize('.pdp-story-headline'),
      storyRow: rect('.pdp-story-row'),
      trustText: fontSize('.pdp-trust-item p'),
    }
  })

  expect(typography.storyHeadline).toBeGreaterThanOrEqual(30)
  expect(typography.storyBody).toBeGreaterThanOrEqual(15)
  expect(typography.bundleName).toBeGreaterThanOrEqual(11)
  expect(typography.bundlePrice).toBeGreaterThanOrEqual(30)
  expect(typography.giftHeader).toBeGreaterThanOrEqual(15)
  expect(typography.giftList).toBeGreaterThanOrEqual(15)
  expect(typography.trustText).toBeGreaterThanOrEqual(14)
  expect(typography.sectionTitle).toBeGreaterThanOrEqual(18)
  expect(typography.reviewBody).toBeGreaterThanOrEqual(15)
  expect(typography.faqQuestion).toBeGreaterThanOrEqual(15)
  expect(typography.storyRow.width).toBeGreaterThanOrEqual(1280)
})

test('diner mug PDP commerce UI follows desktop type scale', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#/products/diner-counter-mug')

  await expect(page.locator('.pdp-buy-col')).toBeVisible()
  await expect(page.locator('.pdp-sticky-bar')).toBeVisible()

  const typography = await page.evaluate(() => {
    const fontSize = (selector) => {
      const element = document.querySelector(selector)
      return element ? Number.parseFloat(window.getComputedStyle(element).fontSize) : 0
    }
    const rect = (selector) => {
      const element = document.querySelector(selector)
      if (!element) return null
      const box = element.getBoundingClientRect()
      return {
        height: Math.round(box.height),
        width: Math.round(box.width),
      }
    }

    return {
      bundleButton: fontSize('.pdp-bundle-quick-btn'),
      buyButton: fontSize('.pdp-btn-buy'),
      cartButton: fontSize('.pdp-btn-cart'),
      floatingCartVisible: (() => {
        const element = document.querySelector('.floating-cart-button')
        if (!element) return false
        const style = window.getComputedStyle(element)
        const box = element.getBoundingClientRect()
        return style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0
      })(),
      inlineTrust: fontSize('.pdp-inline-trust span'),
      optionButton: fontSize('.pdp-opt-btn'),
      optionLabel: fontSize('.pdp-option-label'),
      paymentBadge: fontSize('.pdp-pay-badge'),
      priceTicket: rect('.pdp-price-ticket'),
      priceTicketLeft: rect('.pdp-price-ticket-left'),
      priceTicketRight: rect('.pdp-price-ticket-right'),
      priceNow: fontSize('.pdp-price-now'),
      productName: fontSize('.pdp-product-name'),
      qtyValue: fontSize('.pdp-qty-stepper strong'),
      ratingLink: fontSize('.pdp-rating-link'),
      saveLabel: fontSize('.pdp-save-label'),
      secondaryButton: fontSize('.pdp-secondary-btn'),
      sku: fontSize('.pdp-sku-label'),
      stickyBar: rect('.pdp-sticky-bar'),
      stickyBuy: fontSize('.pdp-sticky-buy'),
      stickyMid: fontSize('.pdp-sticky-mid span'),
      stickyName: fontSize('.pdp-sticky-name'),
      stickyStars: fontSize('.pdp-sticky-stars'),
      stock: fontSize('.pdp-stock-badge'),
      tagline: fontSize('.pdp-tagline'),
    }
  })

  expect(typography.productName).toBeGreaterThanOrEqual(30)
  expect(typography.ratingLink).toBeGreaterThanOrEqual(15)
  expect(typography.tagline).toBeGreaterThanOrEqual(15)
  expect(typography.stock).toBeGreaterThanOrEqual(14)
  expect(typography.sku).toBeGreaterThanOrEqual(14)
  expect(typography.priceNow).toBeGreaterThanOrEqual(42)
  expect(typography.saveLabel).toBeGreaterThanOrEqual(13)
  expect(typography.bundleButton).toBeGreaterThanOrEqual(11)
  expect(typography.optionLabel).toBeGreaterThanOrEqual(14)
  expect(typography.optionButton).toBeGreaterThanOrEqual(14)
  expect(typography.qtyValue).toBeGreaterThanOrEqual(20)
  expect(typography.inlineTrust).toBeGreaterThanOrEqual(12)
  expect(typography.buyButton).toBeGreaterThanOrEqual(20)
  expect(typography.cartButton).toBeGreaterThanOrEqual(15)
  expect(typography.secondaryButton).toBeGreaterThanOrEqual(14)
  expect(typography.paymentBadge).toBeGreaterThanOrEqual(11)
  expect(typography.stickyName).toBeGreaterThanOrEqual(17)
  expect(typography.stickyStars).toBeGreaterThanOrEqual(12)
  expect(typography.stickyMid).toBeGreaterThanOrEqual(12)
  expect(typography.stickyBuy).toBeGreaterThanOrEqual(16)
  expect(typography.stickyBar.height).toBeGreaterThanOrEqual(72)
  expect(typography.stickyBar.height).toBeLessThanOrEqual(96)
  expect(typography.priceTicketLeft.width + typography.priceTicketRight.width).toBeLessThanOrEqual(typography.priceTicket.width + 2)
  expect(typography.floatingCartVisible).toBe(false)
})

test('diner mug PDP desktop panel width does not crush lower cards', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 1200 })
  await page.goto('http://127.0.0.1:5173/#/products/diner-counter-mug')

  await expect(page.locator('.pdp-story-row')).toBeVisible()

  const layout = await page.evaluate(() => {
    const rect = (selector) => {
      const element = document.querySelector(selector)
      if (!element) return null
      const box = element.getBoundingClientRect()
      return {
        height: Math.round(box.height),
        width: Math.round(box.width),
        x: Math.round(box.x),
        y: Math.round(box.y),
      }
    }

    return {
      bundle: rect('.pdp-story-col--bundle'),
      gift: rect('.pdp-story-col--gift'),
      story: rect('.pdp-story-col--story'),
      storyRow: rect('.pdp-story-row'),
    }
  })

  expect(layout.story.width).toBeGreaterThanOrEqual(900)
  expect(layout.bundle.width).toBeGreaterThanOrEqual(900)
  expect(layout.gift.width).toBeGreaterThanOrEqual(900)
  expect(new Set([layout.story.y, layout.bundle.y, layout.gift.y]).size).toBe(3)
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
