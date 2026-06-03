# Printful Ops Runbook

## Phase 1: Connect

- Verify token.
- List stores.
- Choose `PRINTFUL_STORE_ID`.
- Save store metadata in a local report.

## Phase 2: Catalog Mapping

- Pull candidate Printful catalog products.
- Decide product types for the first launch.
- Map local products to Printful catalog product IDs and variant IDs.
- Check shipping countries, size guides, stock availability, and base prices.

## Phase 3: Mockups

- Upload or reference design files.
- Generate mockup tasks.
- Retrieve mockup results.
- Save approved images into the storefront asset workflow.

## Phase 4: Orders

- Keep checkout local/payment-provider-first.
- After paid checkout, create a Printful order draft.
- Review order payload.
- Confirm order only after human approval during early operations.
- Track shipment and status updates.

## Phase 5: Reporting

- Pull orders and store statistics.
- Combine with local sale price, discounts, shipping charged, payment fees, and ad spend.
- Produce daily report:
  - Gross sales
  - Printful fulfillment cost
  - Shipping cost
  - Discounts
  - Payment fees
  - Estimated net margin
  - Open issues / holds

