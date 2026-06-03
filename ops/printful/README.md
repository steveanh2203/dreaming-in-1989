# Printful Ops

Headless operations setup for connecting `shop-only` to Printful without building an admin dashboard first.

## Goal

Use Codex / AI Agent plus small scripts and structured files to manage:

- Printful API connection checks
- Product catalog mapping
- Mockup generation status
- Order and fulfillment status
- Revenue and cost reporting where the API exposes enough data
- Human approval for risky actions

## Secret Setup

Do not commit API tokens.

1. Copy `.env.example` to `.env`.
2. Put the real Printful token in `.env`.
3. If the token is account-level, add `PRINTFUL_STORE_ID`.
4. Ask Codex to run a connection check and create the first store/product report.

## Recommended First Setup Tasks

- [ ] Add Printful API token to `ops/printful/.env`
- [ ] Verify token with store/account endpoint
- [ ] List available stores
- [ ] Select the store used by `1989 Supply Co.`
- [ ] Pull catalog/product/variant basics
- [ ] Create local product-to-Printful mapping file
- [ ] Produce capability report based on live token access

## Pilot Product

- [Mug Pilot](MUG_PILOT.md)
- [Product Mapping](product-mapping.json)

Run the pilot check:

```powershell
.\ops\printful\scripts\check-mug-pilot.ps1
```

Workflow proof files:

- [Mug Workflow Test](MUG_WORKFLOW_TEST.md)
- `scripts/create-mug-mockup-task.ps1`
- `scripts/get-mockup-task.ps1`

## Human Approval Required

These actions should not run automatically until the system is proven:

- Publishing products
- Creating or confirming real orders
- Changing product pricing in bulk
- Replacing print files for live products
- Canceling/refunding orders
- Approving supplier hold/approval-sheet changes
