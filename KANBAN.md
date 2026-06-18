# Dreaming in 1989 Kanban

## Done Today

- Added Supabase/PayPal/Printful/Resend/GA4 env structure in `shop-only/.env.example`.
- Added full transactional email template set under `shop-only/server/email-templates/`.
- Added product image rules in `shop-only/docs/product-image-rules.md` and `shop-only/UI_DESIGN.md`.
- Added PDP gallery scrolling UI for product detail pages.
- Created a Printful catalog batch script at `ops/printful/scripts/launch-catalog.mjs`.
- Tested Printful API access and product creation flow.
- Deleted all Printful store products after Sir requested a reset.
- Installed and authenticated Doppler CLI locally.
- Created/used Doppler project `dreaming-in-1989` with config `dev`.
- Imported current `shop-only/.env.local` secrets into Doppler `dev`.
- Added Doppler workflow:
  - `DOPPLER_SETUP.md`
  - `npm run dev:doppler`
  - `npm run dev:api:doppler`
  - `npm run env:pull`

## Current State

- Printful store is intentionally empty: `0` products.
- Website still contains generated catalog files from the rejected batch.
- The rejected product images must not be treated as final assets.
- Real API keys should stay in Doppler and local `.env.local` only.
- No raw API keys should be committed to GitHub.

## Next

- Create exactly 1 new product first.
- Do not invent a new logo or fake product artwork without approval.
- Use real product artwork/source concept first, then create polished mockup/lifestyle images.
- Replace the rejected website catalog with only the approved single product.
- Re-run:
  - `npm run lint`
  - `npm run build`
  - browser QA for product detail page
- After product is approved, rebuild catalog slowly with strict image rules.

## Blockers / Decisions Needed

- Sir needs to choose the first product type:
  - mug
  - tee
  - poster
  - other
- Sir needs to confirm whether the product artwork already exists or should be designed from scratch.
- Sir needs to stay logged in to Doppler or run `doppler login` on a new machine.
