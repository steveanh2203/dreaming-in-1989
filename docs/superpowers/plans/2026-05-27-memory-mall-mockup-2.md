# Memory Mall Mockup 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a desktop-first Dreaming in 1989 ecommerce and news demo with cart and checkout UI.

**Architecture:** Replace the Vite starter screen with a React single-page app composed from static data, local React state, and focused presentational sections. The app uses a generated retro storefront hero asset plus code-native navigation, news, products, cart drawer, checkout modal, timeline, arcade, and memory modules.

**Tech Stack:** React 19, Vite, CSS modules via plain imported CSS, lucide-react icons, local static image assets.

---

### Task 1: App Data and UI Shell

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css`
- Modify: `src/App.css`
- Create: `src/assets/memory-lane-hero.png`

- [ ] Import the generated hero image and lucide icons directly.
- [ ] Define static arrays for navigation, news articles, products, trends, timeline years, and memory cards at module scope.
- [ ] Add cart state, checkout state, active news category, active year, and search query in `App`.
- [ ] Render a desktop app shell with fixed left navigation, top utility bar, hero, content grid, shop, cart drawer, and checkout modal.

### Task 2: Core Ecommerce Interaction

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] Add product cards with quantity-aware `Add to cart` buttons.
- [ ] Add cart drawer with quantity steppers, remove action, subtotal, shipping, and total.
- [ ] Add checkout demo modal with shipping, payment, and review steps.
- [ ] Add order success receipt state after confirming checkout.

### Task 3: News and Nostalgia Modules

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] Add category filtering for news.
- [ ] Add featured timeline with selected year state.
- [ ] Add arcade, time capsule, playlist, and poll panels.
- [ ] Keep all real UI text code-native, readable, and free from real copyrighted brand names.

### Task 4: Verification

**Files:**
- Verify: `src/App.jsx`
- Verify: `src/App.css`
- Verify: `src/index.css`

- [ ] Run `C:\Program Files\nodejs\npm.cmd run build`.
- [ ] Run `C:\Program Files\nodejs\npm.cmd run lint`.
- [ ] Start Vite with `C:\Program Files\nodejs\npm.cmd run dev -- --host 127.0.0.1`.
- [ ] Use Playwright fallback because Browser plugin is unavailable in this session.
- [ ] Capture desktop screenshot and verify load, console health, cart interaction, checkout flow, and visual fit against the approved mockup direction.
