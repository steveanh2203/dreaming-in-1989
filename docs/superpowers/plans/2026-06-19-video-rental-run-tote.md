# Video Rental Run Tote Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a complete Video Rental Run Tote product with a production-ready transparent print file, Printful mockups, exactly 10 storefront images, product copy, and a working PDP.

**Architecture:** Generate one original chroma-key concept, remove the key locally, and use that transparent PNG as the single artwork source of truth. Apply it to one Printful tote variant, use returned mockups for physical-product references, generate the hero and four lifestyle scenes from the approved artwork/product references, then register all assets in the existing catalog data model.

**Tech Stack:** Built-in Image Generation, local chroma-key removal, Printful API, Node.js, Sharp, React/Vite.

---

### Task 1: Create and validate the artwork source

**Files:**
- Create: `ops/printful/artwork/video-rental-run-tote/video-rental-run-tote-chroma-source.png`
- Create: `ops/printful/artwork/video-rental-run-tote/video-rental-run-tote-transparent.png`
- Create: `ops/printful/artwork/video-rental-run-tote/README.md`

- [ ] Generate an original American 1980s-1990s video-rental-run illustration on a perfectly flat `#00ff00` background with no storefront logo.
- [ ] Copy the generated source into the product artwork directory.
- [ ] Remove the green key with `remove_chroma_key.py`, soft matte, despill, and edge contraction if needed.
- [ ] Verify PNG alpha, transparent corners, clean subject coverage, readable artwork, and no remaining green field.

### Task 2: Prepare the Printful product and mockups

**Files:**
- Create: `ops/printful/video-rental-run-tote-product.json`
- Create: `ops/printful/video-rental-run-tote-mockup-task.json`
- Create: `ops/printful/video-rental-run-tote-mockup-result.json`
- Create: `ops/printful/mockups/video-rental-run-tote/*`

- [ ] Verify the target Printful tote catalog product, variant, print area, pricing, and available mockup styles.
- [ ] Upload/reference only the transparent artwork and create a non-published Printful sync product or mockup task.
- [ ] Download every useful returned Printful view.
- [ ] Preserve API responses locally for auditability.

### Task 3: Build the 10-image storefront package

**Files:**
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/01-front.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/02-back.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/03-side-left.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/04-side-right.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/05-detail.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/06-hero-lifestyle.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/07-lifestyle-1.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/08-lifestyle-2.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/09-lifestyle-3.png`
- Create: `shop-only/src/assets/catalog/video-rental-run-tote/10-lifestyle-4.png`

- [ ] Remove or intentionally frame mockup backgrounds and compose product views as centered `1:1` images.
- [ ] Create one square detail image preserving the real artwork/material.
- [ ] Generate one hero lifestyle image using the transparent artwork as primary reference and Printful mockup as physical reference.
- [ ] Generate four distinct square American 1980s-1990s lifestyle images using the same references.
- [ ] Reject any image with altered artwork/text, incorrect placement, warped tote geometry, clipped handles, green remnants, or non-square dimensions.
- [ ] Confirm the storefront package contains exactly 10 numbered images.

### Task 4: Register the product and PDP content

**Files:**
- Modify: `shop-only/src/data/catalog.js`

- [ ] Import all 10 numbered product images.
- [ ] Add the product record with category, price, SKU, Printful identifiers, and ordered gallery labels.
- [ ] Add the product to new arrivals without removing the existing mug.
- [ ] Add exact product story copy, bullets, production, best-for, and artwork context.
- [ ] Ensure hero, lookbook, detail, cart, and modal surfaces resolve to product-specific assets.

### Task 5: Verify the finished product

**Files:**
- Test: `shop-only/src/data/catalog.js`
- Test: `shop-only/src/assets/catalog/video-rental-run-tote/*`

- [ ] Run `npm run lint` from `shop-only`; expect exit code `0`.
- [ ] Run `npm run build` from `shop-only`; expect exit code `0`.
- [ ] Verify all 10 images are square and load successfully.
- [ ] Open the PDP and verify desktop/mobile gallery access, modal image ratio, hero crop, four lookbook cards, exact copy, cart thumbnail, and no distorted product imagery.
- [ ] Confirm no product was publicly published and no order was created or confirmed.

