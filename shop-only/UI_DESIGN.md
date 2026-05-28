# 1989 Supply Co. UI Design

## Purpose

`shop-only` is a dedicated ecommerce storefront. It must sell products clearly and efficiently. It should not include news feeds, social polls, community walls, timelines, or editorial archive sections.

The target experience is a retro American 80s/90s shop with modern ecommerce usability.

## Core Positioning

Brand direction: `1989 Supply Co.`

Offer: retro-inspired goods, gifts, shelf decor, apparel, audio objects, arcade collectibles, and curated bundles.

Primary user goal: discover products, compare categories, add items to cart, and complete a demo checkout.

## Brand Voice

The voice should feel like a confident retro shop, not a social community or nostalgia blog.

Writing rules:

- Keep copy short and concrete.
- Lead with product value, not lore.
- Use light retro flavor, but do not overdo slang.
- Avoid long sentimental paragraphs.
- Avoid social prompts such as `share your memory`, `vote`, `comment`, or `join the conversation`.
- CTAs should be direct: `Add to Cart`, `Shop New Arrivals`, `View Bundle`, `Checkout`.

Good examples:

- `Retro goods for everyday nostalgia.`
- `Shelf-ready gifts inspired by 1989.`
- `Free shipping over $75.`
- `Build a weekend bundle.`

Avoid:

- `Tell us your favorite childhood memory.`
- `What cartoon did you love most?`
- `Read the latest nostalgia stories.`
- `Join the Memory Lane community.`

## Information Architecture

Allowed sections:

1. Header
   - Logo
   - Primary nav: `New Arrivals`, `Collections`, `Best Sellers`, `Cart`
   - Search
   - Cart button

2. Hero
   - Full-width visual storefront moment
   - One clear offer
   - Two CTAs max
   - No marketing essay

3. Category Bar
   - Ecommerce filters only
   - Example: `All`, `Audio`, `Arcade`, `Apparel`, `Kitchen`, `Wall Art`, `Collectibles`

4. Product Grid
   - Main page focus
   - Product image, tag, name, short detail, price, add-to-cart
   - Dense enough to scan, not oversized editorial cards

5. Collections / Bundles
   - Curated shopping bundles
   - Example: `Video Store Night`, `Saturday Morning Shelf`, `Mall Weekend Kit`, `Diner Counter Set`
   - Each bundle should have clear price/value and add-bundle action

6. Cart Drawer
   - Items
   - Quantity controls
   - Subtotal
   - Shipping
   - Promo code
   - Checkout CTA

7. Checkout Modal
   - Demo checkout only
   - Shipping form
   - Payment demo form
   - Review state
   - Success state

8. Service Strip
   - Fast shipping
   - Easy returns
   - Secure checkout
   - Retro packaging

9. Footer
   - Lightweight
   - Shop links
   - Support links
   - Email signup

Disallowed sections:

- News feed
- Polls
- Community memory wall
- Timelines
- Long editorial articles
- Social-like comment/like widgets
- Decorative location lists that do not support shopping

## Layout Principles

- Hero can be full-bleed.
- Commerce content must use a centered container.
- Recommended content width: `min(1440px, calc(100% - 48px))`.
- Product grid should feel like a real storefront, not a landing-page gallery.
- Cards should be stable in size and easy to scan.
- Use 6-8px border radius max.
- Avoid nested cards.
- Avoid excessive full-width sections after the hero.
- Avoid huge text inside product cards.
- Keep CTAs consistent and obvious.
- Product browsing must be easier to understand than the theme.
- Retro styling should support the store, not compete with product discovery.
- No section after the hero should span edge-to-edge unless it has a strong ecommerce reason.

## Responsive Rules

Use these breakpoints:

| Breakpoint | Width | Behavior |
| --- | --- | --- |
| Desktop | `1200px+` | Full header, 4-column product grid, 3-column bundles |
| Tablet | `768px - 1199px` | Wrapped header/nav, 2-column product grid, 1-2 column bundles |
| Mobile | `< 768px` | Stacked header, 1-column product grid, full-width cart drawer |

Rules:

- Product cards must never become too narrow for price + add button.
- Search and category filters should stay near the product grid.
- Cart drawer width: `min(430px, 100vw)`.
- Hero text must not overlap the offer ticket on mobile.
- Product grid should appear quickly after the hero on mobile.
- Avoid viewport-width font scaling. Use `clamp()` only for major hero text when needed.

## Spacing System

Use a consistent spacing scale:

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` | `4px` | Tiny gaps, icon spacing |
| `--space-2` | `8px` | Button/icon gaps |
| `--space-3` | `12px` | Compact card padding |
| `--space-4` | `16px` | Standard component padding |
| `--space-5` | `24px` | Section inner padding |
| `--space-6` | `32px` | Major section spacing |
| `--space-7` | `48px` | Hero/content separation |

Rules:

- Product cards should use `12-16px` internal padding.
- Section spacing should usually be `24-32px`.
- Do not create random one-off spacing values unless needed for alignment.
- Header height should stay compact enough for ecommerce browsing.

## Typography System

Use four roles only.

### Display

Font: `Abril Fatface`

Use for:

- Hero headline
- Section headings
- Bundle headings

Rules:

- Weight: regular
- Letter spacing: `0`
- Do not use all caps
- Do not use for product metadata or buttons

### UI Sans

Font: `Inter`

Use for:

- Navigation
- Buttons
- Filters
- Forms
- Prices
- Product controls

Rules:

- Weights: `600`, `700`, `800`
- Letter spacing: `0`
- Keep button text short

### Editorial Serif

Font: `Libre Baskerville`

Use for:

- Product names
- Short product descriptions
- Bundle copy

Rules:

- Product names: 16-22px
- Copy: 13-15px
- Avoid long paragraphs

### Receipt Mono

Font: `Special Elite`

Use for:

- Product tags
- SKU-style labels
- Promo code labels
- Small retro details

Rules:

- Use sparingly
- Do not use for long body copy

## Color Palette

The palette should feel retro but still support ecommerce clarity.

### Core

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#1F120D` | Main text on light cards |
| `--night` | `#081312` | Page background |
| `--pine` | `#123532` | Main dark surface |
| `--paper` | `#F0D5A8` | Product/card surface |
| `--paper-soft` | `#F7E4C2` | Inputs and light panels |
| `--wood` | `#754629` | Borders and dividers |

### Action

| Token | Hex | Use |
| --- | --- | --- |
| `--red` | `#BD2A25` | Primary CTA |
| `--red-dark` | `#721818` | CTA gradient/end |
| `--amber` | `#FFB24B` | Price badge, sale highlight |
| `--cyan` | `#55E7FF` | Focus ring and tiny neon accent |

### Supporting

| Token | Hex | Use |
| --- | --- | --- |
| `--cream` | `#FFF2D8` | Text on dark backgrounds |
| `--muted` | `#7A4324` | Secondary text/borders on light surfaces |
| `--shadow` | `rgba(0, 0, 0, 0.32)` | Card and drawer shadow |

## Component Rules

### Buttons

Primary button:

- Red gradient
- White/cream text
- 2px dark red border
- 4px radius
- Optional icon

Secondary button:

- Dark transparent surface
- Amber border
- Cream text

Product add button:

- Compact
- Icon + `Add`
- Dark surface
- Must not wrap text

### Product Cards

Required content:

- Product image
- Tag
- Name
- One-line detail
- Price
- Add button

Rules:

- Image area must have fixed aspect ratio.
- Product title and price must align consistently.
- Cards in the same row should be equal height.
- Avoid large decorative text inside cards.

### Cart Drawer

Rules:

- Slides from right.
- Width: `min(430px, 100vw)`.
- Quantity controls must be visible.
- Checkout button fixed near summary.
- Empty cart state must be clear.

### Search And Filters

Rules:

- Search should sit near product grid.
- Filters should be horizontal chips.
- Active filter uses red.
- Filter text must be short.

### Product Data Model

Each product should include:

```js
{
  id: string | number,
  name: string,
  shortDetail: string,
  price: number,
  category: string,
  tag?: string,
  image: string,
  sku?: string,
  stockState?: 'in-stock' | 'low-stock' | 'sold-out',
  bundleEligible?: boolean
}
```

Rules:

- Product names should be short enough to fit in two lines.
- `shortDetail` should fit in one line on desktop and two lines on mobile.
- Price must always be visible before add-to-cart.
- Sold-out products should show disabled add button and clear stock text.

### UI States

Required states:

- Empty cart
- Cart with items
- Added-to-cart feedback
- Empty search result
- Active category
- Product sold out
- Promo code success
- Promo code invalid
- Checkout modal open
- Checkout success

State rules:

- Empty search should suggest clearing filters or browsing all products.
- Empty cart should provide a direct link/button back to products.
- Added-to-cart feedback should be subtle and not block browsing.
- Checkout button must be disabled when cart is empty.
- Invalid promo code should not shift layout.

### Accessibility

Rules:

- All interactive controls must be keyboard reachable.
- Buttons need clear labels; icon-only buttons require `aria-label`.
- Product images need useful alt text unless decorative.
- Modal should have `role="dialog"` and `aria-modal="true"`.
- Modal close button must be visible and keyboard accessible.
- Focus state uses `--cyan`.
- Do not rely on color alone for active, error, or success state.
- Text contrast must remain readable on both paper and dark surfaces.

## Imagery

Use product-focused images whenever possible.

Allowed:

- Product sprites
- Bundle banner assets
- Storefront hero image

Rules:

- Do not stretch small sprite cells into large blurry hero images.
- Product images should remain sharp and centered.
- Bundle images can be wider, but must use dedicated banner assets.
- Avoid purely decorative background images in commerce sections.

Image size rules:

| Image Type | Minimum Source | Display Ratio | Notes |
| --- | --- | --- | --- |
| Hero | `1600px` wide | Full-bleed flexible | Must be high-resolution |
| Product | `600x600px` preferred | `1:1` or `4:3` | Do not upscale tiny sprites into large product images |
| Bundle | `960x420px` minimum | `16:7` | Use dedicated banner assets |
| Cart thumbnail | `160x120px` minimum | `4:3` | Keep sharp at small size |

Rules:

- Do not use a sprite cell as a hero image.
- Do not stretch images with mismatched aspect ratios.
- Use `object-fit: cover` only when the crop is intentional.
- Product images should show the actual object clearly.

## Motion And Effects

Motion should be restrained.

Allowed:

- Cart drawer slide
- Modal fade/scale
- Button hover lift or color change
- Product card hover shadow

Disallowed:

- Continuous arcade-style animations
- Large bouncing elements
- Flashing neon text
- Decorative motion unrelated to shopping

Timing:

- Hover transitions: `120-180ms`
- Drawer/modal transitions: `180-240ms`
- Respect `prefers-reduced-motion` where practical.

## Interaction Requirements

MVP interactions:

- Category filtering
- Search
- Add product to cart
- Add bundle to cart
- Quantity increment/decrement
- Remove item
- Promo code field UI
- Checkout demo modal
- Order success state

Not required for MVP:

- Real payment
- Authentication
- Backend inventory
- User reviews
- Social sharing

## First Build Checklist

- Looks like a store within 3 seconds.
- Product grid appears above or shortly after first scroll.
- Cart is always accessible.
- No news/community/poll content.
- Text does not overflow on mobile.
- Hero is expressive, but product browsing is practical.
- Build and lint pass.

## Implementation Guardrails

Before finalizing any build:

- Product grid must be visible and usable without reading explanatory text.
- Cart must work with multiple products and quantity changes.
- Search and category filter must compose correctly.
- No unused news/community/timeline components should exist in the shop UI.
- CSS should define the design tokens from this document.
- Avoid adding dependencies unless they directly improve ecommerce UI.
- Run build and lint before handoff.
