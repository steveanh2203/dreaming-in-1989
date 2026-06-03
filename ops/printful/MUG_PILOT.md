# Mug Pilot - Diner Counter Mug

Last checked: 2026-06-03

## Local Product

- Storefront product: `Diner Counter Mug`
- Local ID: `diner-counter-mug`
- Local SKU: `SKU-1989-044`
- Current category: `Drinkware`
- Current base price: `$18.00`
- Local asset: `shop-only/src/assets/products-cutout/diner-mug.png`

## Printful Catalog Decision

Recommended first mapping:

- Catalog product ID: `19`
- Printful product: `White Glossy Mug`
- Technique: `Sublimation`
- Placement: `default`

Why: this is the closest Printful match for the current shop product. It supports glossy white ceramic mugs and includes the current local size options `11 oz` and `15 oz`.

## Variant Mapping

| Local option | Printful variant | Base cost | Store price | Status |
| --- | ---: | ---: | ---: | --- |
| `11 oz / Glossy White` | `1320` | `$10.95` | `$18.00` | Ready for design |
| `15 oz / Glossy White` | `4830` | `$14.25` | `$22.00` | Hold availability |

Availability returned by the API for the current selling-region context:

- `1320`: `southeast_asia: in stock`
- `4830`: `southeast_asia: not fulfillable`

## Option Gap

The storefront currently has a `Cream Accent` finish option. No exact Printful catalog match was found.

Closest alternate catalog product:

- Catalog product ID: `403`
- Product: `White Ceramic Mug with Color Inside`
- Available color-inside variants include black, blue, red, yellow, and other accent colors depending on size/availability.

Recommendation for speed: launch the pilot as `11 oz / Glossy White` only, then add accent mugs later as separate variants or separate products after checking target-market availability.

## Artwork Readiness

The existing repo mug assets are not print-ready:

- `shop-only/src/assets/products/diner-mug.png`: `313 x 313 px`
- `shop-only/src/assets/products-cutout/diner-mug.png`: `313 x 313 px`

Use [artwork/diner-counter-mug/README.md](artwork/diner-counter-mug/README.md) for the print-area spec before mockup generation.

## Financial Snapshot

Before shipping, tax, payment processing, discounts, refunds, and ad spend:

- `11 oz`: `$18.00 - $10.95 = $7.05` estimated gross margin
- `15 oz`: `$22.00 - $14.25 = $7.75` estimated gross margin

This is not a final profit report. Final profit must include checkout revenue, shipping charged, Printful shipping/fulfillment, payment processor fees, discounts, ad spend, refunds, and taxes.

## Next Step

Use `ops/printful/scripts/check-mug-pilot.ps1` to re-check live API price and availability before creating a mockup or store product.
