# Printful Connection Report

Last checked: 2026-06-03

## Result

- API token present: yes
- Token length checked without exposing secret: 40 characters
- OAuth scopes endpoint: OK
- Catalog products endpoint: OK
- Stores endpoint: OK, returned `1` store
- Selected store: `Dreaming in 1989`
- Store ID: `18275392`
- Store type: `native`
- `PRINTFUL_STORE_ID`: set

## What This Means

The token is accepted by Printful and can read general API resources such as catalog products. Store-level context is now available through `PRINTFUL_STORE_ID=18275392`.

- Store products endpoint: OK, currently `0` products
- Orders endpoint: OK, currently `0` orders
- Webhooks endpoint: OK, currently no webhook URL configured

## Next Step

Use the API store to create or sync the first Printful products, then map local storefront products to Printful sync products / variants.
