# Product Design Audit - Shop/Product Detail

Audit date: 2026-06-07
Target: http://127.0.0.1:5173/
Scope: Homepage entry, product grid, Rewind Club Tee product detail, add-to-cart feedback.

## Captured Steps

1. Home hero: `01-home-hero.png`
   - Health: Needs attention.
   - Header/search/cart/nav take a lot of vertical space and visually collide with hero content.
   - The hero headline and receipt art become hard to read in the first viewport.

2. Product grid: `02-product-grid-recapture.png`
   - Health: Mostly good.
   - Product cards are clear, prices are readable, category filters are easy to scan.
   - Anchor positioning needs work because Best Sellers starts with leftover New Arrivals content above it.

3. Product detail entry: `03-product-detail.png`, `04-product-detail-purchase.png`
   - Health: Needs attention.
   - Gallery has strong visual style, but it pushes buying content too far down.
   - On product entry, the user sees thumbnails and large image area before seeing product title, price, or Add to Cart.
   - H1 and Add to Cart are below the viewport after initial entry.

4. Purchase controls: `05-product-purchase-controls.png`
   - Health: Good.
   - Price, stock, quantity, size/color/fit options, and CTA are clear once reached.
   - Primary CTA is visually strong and secondary wishlist action is clearly separated.

5. Add-to-cart feedback: `06-after-add-to-cart.png`, `07-cart-drawer.png`
   - Health: Mixed.
   - Toast confirms add-to-cart quickly and cart total updates.
   - Toast truncates product name and packs item count into a small space.
   - Cart drawer data exists and updates, but the visible cart drawer state is not obvious in the captured viewport after pressing View.

## Top Recommendations

1. Bring product title, price, and Add to Cart above the fold on product detail.
2. Reduce the product gallery's vertical dominance on first entry, or use a two-column desktop layout.
3. Fix sticky header/anchor offsets so navigation lands with the section title cleanly visible.
4. Simplify the homepage first viewport so the hero message is not buried under nav and decorative receipt details.
5. Improve add-to-cart feedback: show full product name, clearer item count, and a visibly opened cart drawer or side panel.

## Accessibility Risks

- Sticky header and anchor jumps may hide headings from keyboard/screen-reader users.
- Product options use buttons, which is good, but selected state should be checked for visible focus and ARIA selected/pressed state.
- Product detail has rich visual storytelling, but buying content appears late in the visual order.
- Cart drawer needs keyboard focus management and an obvious close control.

## Evidence Limits

- This audit used screenshots, DOM snapshots, and basic click flow only.
- It did not complete checkout, test mobile viewport, or run a full WCAG audit.
