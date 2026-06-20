# After School Arcade Tee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the storefront demo catalog with one production-quality After School Arcade Tee backed by Printful and a complete image package.

**Architecture:** Build one deterministic transparent artwork by combining a generated arcade illustration with exact typography and the existing brand logo. Create one Printful sync product, request official mockups, then use those official images as locked product references for lifestyle generation and storefront data.

**Tech Stack:** React, Vite, Sharp, Printful REST API, built-in image generation, Playwright.

---

### Task 1: Empty the storefront catalog

**Files:**
- Modify: `shop-only/src/data/catalog.js`

- [ ] Replace the current product array and related merchandising collections with empty exports.
- [ ] Run lint and build to verify the empty-catalog state does not crash the storefront.

### Task 2: Produce print artwork

**Files:**
- Create: `ops/printful/artwork/after-school-arcade-tee/arcade-scene-source.png`
- Create: `ops/printful/artwork/after-school-arcade-tee/after-school-arcade-tee-print.png`
- Create: `ops/printful/artwork/after-school-arcade-tee/README.md`

- [ ] Generate the arcade scene without any brand logo or AI-rendered typography.
- [ ] Remove the flat background and validate alpha coverage.
- [ ] Composite exact text and the existing logo with Sharp.
- [ ] Validate dimensions, alpha channel, margins, and logo proportions.

### Task 3: Create the Printful product

**Files:**
- Create: `ops/printful/after-school-arcade-tee-product.json`
- Create: `ops/printful/after-school-arcade-tee-mockup-task.json`

- [ ] Verify token and store access without printing secrets.
- [ ] Select a supported dark unisex tee and live US-available variants.
- [ ] Calculate retail prices from current base costs.
- [ ] Create exactly one sync product and request all useful official mockup views.
- [ ] Save API metadata without credentials.

### Task 4: Build the image package

**Files:**
- Create: `shop-only/src/assets/catalog/after-school-arcade-tee/*`

- [ ] Download every useful official Printful mockup.
- [ ] Prepare the primary product image without a raw white rectangle.
- [ ] Generate up to four lifestyle images using an official mockup as the locked product reference.
- [ ] Reject any image with altered artwork, garment shape, print position, or logo.

### Task 5: Add the single storefront product

**Files:**
- Modify: `shop-only/src/data/catalog.js`

- [ ] Add the single product with exact Printful variant mapping and gallery order.
- [ ] Keep bundles and shelf-ready sets empty until more real products exist.
- [ ] Verify cart and product detail views use the new product assets.

### Task 6: Verify

**Files:**
- Test: `shop-only/qa.spec.js`

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run browser QA at desktop and mobile sizes.
- [ ] Confirm one product only, correct logo, reachable gallery views, undistorted images, cart functionality, and no console errors.
