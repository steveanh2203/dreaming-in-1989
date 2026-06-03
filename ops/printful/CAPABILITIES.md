# Printful API Capability Report

Last reviewed: 2026-06-03

## Strong Fit

### Product And Catalog Operations

- Retrieve catalog products, variants, categories, prices, size guides, blank images, mockup styles, mockup templates, and stock availability.
- Use catalog and variant IDs to map local storefront products to fulfillable Printful items.
- Maintain a local product mapping file so the shop can show friendly product data while fulfillment uses Printful IDs.

### Mockup Operations

- Create mockup generation tasks from catalog products/product templates.
- Retrieve mockup task results.
- Use webhook events for completed mockup tasks where configured.
- Good use for AI Agent: generate product copy, choose categories, prepare image prompts/files, request mockups, and record results.

### Order And Fulfillment Operations

- Create orders, add/update/delete order items, estimate order cost, confirm orders, retrieve invoices, retrieve shipments, and track order lifecycle.
- Retrieve shipment events such as sent, delivered, returned, canceled, failed, or on hold through webhook events.
- Good use for AI Agent: assemble order payloads, check missing data, summarize exceptions, and prepare tasks for human approval.

### Shipping And Availability

- Calculate shipping rates for customer checkout.
- Retrieve shipping countries and stock availability.
- Listen to stock and catalog price webhook events.

### Store And Reporting

- Retrieve stores and store statistics.
- Use order costs, sales amounts, shipping, fulfillment costs, and order status data to build local revenue/cost reports.
- Good use for AI Agent: generate daily/weekly summaries from pulled API data.

## Limited Or Needs Local System

- Full profit reporting still needs local storefront sale price, discounts, taxes, payment processor fees, ad spend, refunds, and currency handling.
- Printful can expose fulfillment/order/store data, but it is not a complete business P&L by itself.
- A real webhook receiver needs a deployed HTTPS endpoint.
- Real payment confirmation should come from the payment processor, not only Printful.
- Product publishing and order confirmation should stay human-approved until tested.

## Recommended No-Dashboard Workflow

1. Keep `ops/printful/.env` for credentials.
2. Keep product mapping in a local JSON/CSV file.
3. Use scripts to pull Printful data and create Markdown/JSON reports.
4. Let Codex update task logs and reports after each run.
5. Build UI dashboard only after repeated manual reporting becomes painful.

