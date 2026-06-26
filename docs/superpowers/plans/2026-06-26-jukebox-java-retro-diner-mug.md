# Jukebox Java Retro Diner Mug Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the selected Concept 4 Jukebox Java mug as a new storefront catalog product with prepared transparent artwork, SEO-friendly copy, and verified build/test coverage.

**Architecture:** Reuse the existing static catalog pattern in `shop-only/src/data/catalog.js`. Store all product assets under `shop-only/src/assets/catalog/jukebox-java-retro-diner-mug/`, then reference them from catalog data and PDP experience copy. Do not publish to Printful or create live orders.

**Tech Stack:** React/Vite static assets, Node test runner, ESLint, Vite production build, local chroma-key removal helper.

---

### Task 1: Prepare Concept 4 Artwork Assets

**Files:**
- Create: `shop-only/src/assets/catalog/jukebox-java-retro-diner-mug/00-concept-chroma.png`
- Create: `shop-only/src/assets/catalog/jukebox-java-retro-diner-mug/00-artwork-transparent.png`
- Create: `shop-only/src/assets/catalog/jukebox-java-retro-diner-mug/00-preview-white.png`
- Create: `shop-only/src/assets/catalog/jukebox-java-retro-diner-mug/00-preview-checker.png`

- [ ] **Step 1: Copy only Concept 4 source image**

Copy `C:\Users\Administrator\.codex\generated_images\019f01ea-1946-7cf2-ba6e-2b20f2c574e9\ig_09987ccaacec6995016a3df6c054f88191860edb059c5a79ae.png` to `00-concept-chroma.png`.

- [ ] **Step 2: Remove chroma-key background**

Run the installed imagegen helper:

```powershell
python C:\Users\Administrator\.codex\skills\.system\imagegen\scripts\remove_chroma_key.py `
  --input shop-only\src\assets\catalog\jukebox-java-retro-diner-mug\00-concept-chroma.png `
  --out shop-only\src\assets\catalog\jukebox-java-retro-diner-mug\00-artwork-transparent.png `
  --auto-key border --soft-matte --transparent-threshold 12 --opaque-threshold 220 --despill
```

- [ ] **Step 3: Generate white and checker previews**

Use a local Pillow script to composite the transparent artwork over white and checkerboard backgrounds for review.

- [ ] **Step 4: Validate alpha**

Confirm `00-artwork-transparent.png` is RGBA, corners are transparent, and nontransparent coverage is present.

### Task 2: Add Product To Catalog Data

**Files:**
- Modify: `shop-only/src/data/catalog.js`
- Modify: `shop-only/src/data/catalog.test.js`

- [ ] **Step 1: Add imports and variants**

Add imports for the four new mug assets and define `jukeboxJavaMugVariants` for `11 oz` and `15 oz` glossy white variants.

- [ ] **Step 2: Add product object**

Add `jukebox-java-retro-diner-mug` with SEO-friendly name, description, category `Drinkware`, prices, gallery images, and Printful mapping to catalog product `19` variants `1320` and `4830`.

- [ ] **Step 3: Add PDP experience**

Add story title, story body, bullets, care rows, and lookbook entries tailored to the Jukebox Java concept.

- [ ] **Step 4: Update tests**

Extend `catalog.test.js` to assert the new product id, name, category, asset references, variants, and new arrivals include the mug.

### Task 3: Verify And Restart Local Shop

**Files:**
- No source changes expected.

- [ ] **Step 1: Run focused tests**

```powershell
node --test server\auth-server.test.js src\data\catalog.test.js src\lib\demoProductReviews.test.js src\lib\productReviews.test.js
```

- [ ] **Step 2: Run lint**

```powershell
npm run lint
```

- [ ] **Step 3: Run production build**

```powershell
npm run build
```

- [ ] **Step 4: Restart Doppler dev servers**

Stop listeners on `5173` and `8789`, then restart API and Vite via `doppler run`.

- [ ] **Step 5: Smoke-check HTTP**

Verify `http://127.0.0.1:5173/` and `http://127.0.0.1:8789/api/auth/me` return `200`.
