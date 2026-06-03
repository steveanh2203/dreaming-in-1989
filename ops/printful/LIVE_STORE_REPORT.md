# Printful Live Store Report

Last checked: 2026-06-03

## Store

- Name: `Dreaming in 1989`
- ID: `18275392`
- Type: `native`
- Token mode: account/all-stores token with `X-PF-Store-Id` context

## Endpoint Checks

- OAuth scopes: OK
- Stores list: OK, `1` store visible
- Single store lookup: OK
- Catalog products: OK, `71` catalog products visible in current catalog page context
- Store products: OK, `0` products currently in this store
- Orders: OK in v1 and v2, `0` orders currently in this store
- Webhooks: OK in v1 and v2, no webhook URL configured yet
- Shipping countries: OK
- File listing: legacy `/files` returns `410` removed; guessed v2 file listing endpoints returned `404`, so file upload/listing must be implemented against the exact current file endpoint from Printful docs before use

## Current Operational Status

The Printful connection is ready for store-level setup work.

The store is empty, so the next real milestone is product setup:

- decide first launch products
- map local shop products to Printful catalog product IDs and variant IDs
- upload/attach design files
- create sync products or product templates
- generate/approve mockups
- create a draft test order before enabling real checkout automation

## Reporting Notes

Revenue reporting is not meaningful yet because there are no orders.

Once orders exist, Printful can provide fulfillment/order cost and shipment status data. Full profit reporting still needs local checkout/payment data, discounts, payment fees, ad spend, and refunds.
