# Mug Pilot - Diner Counter Mug

Last checked: 2026-06-04

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

Approved pilot artwork:

- Transparent print file: `ops/printful/artwork/diner-counter-mug/diner-counter-club-11oz-transparent-v1.png`
- Printful mockup task: `928541343`
- Mockups: `ops/printful/mockups/diner-counter-mug-transparent/`
- Creative rule: use transparent artwork so the white mug surface is the background, avoiding a rectangular sticker/decal look.

## Printful Sync

Created in the `Dreaming in 1989` Printful store:

- Sync product ID: `436581797`
- External product ID: `diner-counter-mug`
- Sync variant ID: `5338415400`
- External variant ID: `diner-counter-mug-11oz-glossy-white`
- Printful variant ID: `1320`
- SKU: `SKU-1989-044-11OZ`
- Retail price: `$18.00`

## Financial Snapshot

Before shipping, tax, payment processing, discounts, refunds, and ad spend:

- `11 oz`: `$18.00 - $10.95 = $7.05` estimated gross margin
- `15 oz`: `$22.00 - $14.25 = $7.75` estimated gross margin

This is not a final profit report. Final profit must include checkout revenue, shipping charged, Printful shipping/fulfillment, payment processor fees, discounts, ad spend, refunds, and taxes.

## Next Step

Keep the pilot to `11 oz / Glossy White` until the `15 oz` availability hold is resolved. Before real checkout automation, create a draft test order only after explicit human approval.
