/* global console */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const money = (value) => `$${Number(value).toFixed(2)}`

const sampleItems = [
  {
    name: 'Arcade Night Poster',
    option: 'Size: 18x24 in / Frame: Optional',
    quantity: 1,
    price: 32,
  },
  {
    name: 'Rewind Sticker Pack',
    option: 'Pack: Standard',
    quantity: 1,
    price: 16,
  },
]

const sampleData = {
  CUSTOMER_NAME: 'Sir',
  CUSTOMER_EMAIL: 'sir@example.com',
  ORDER_NUMBER: 'SANDBOX-1989',
  PAYMENT_STATUS: 'Sandbox approved',
  FULFILLMENT_STATUS: 'Production pending',
  SUBTOTAL: money(48),
  SHIPPING: money(7.95),
  TOTAL: money(55.95),
  SHIPPING_ADDRESS: '123 Sandbox Arcade<br>QA Suite<br>Austin, TX 78701<br>United States',
  ORDER_URL: 'http://127.0.0.1:5173/my-account/orders',
  CHECKOUT_URL: 'http://127.0.0.1:5173/checkout',
  SUPPORT_EMAIL: 'support@1989supply.co',
  TICKET_ID: 'SUP-1989QA',
  ISSUE_TYPE: 'Tracking question',
  TRACKING_NUMBER: '9400 1989 0000 6270',
  TRACKING_URL: 'https://tools.usps.com/go/TrackConfirmAction',
  CARRIER: 'USPS',
  DELIVERY_DATE: 'June 21, 2026',
  CLAIM_STATUS: 'Reprint approved',
  CLAIM_DETAIL: 'We approved a replacement print after reviewing the photos.',
  RESET_URL: 'http://127.0.0.1:5173/reset-password',
  ACCOUNT_URL: 'http://127.0.0.1:5173/my-account/orders',
  CART_URL: 'http://127.0.0.1:5173/#products',
  DISCOUNT_CODE: 'REWIND10',
  EXPIRY_DATE: 'June 30, 2026',
  ITEM_ROWS: renderItemRows(sampleItems),
}

const templates = [
  {
    slug: 'order-confirmation',
    title: 'Order confirmed',
    preheader: 'Order {{ORDER_NUMBER}} is confirmed. We are preparing it for made-to-order production.',
    eyebrow: 'Checkout counter receipt',
    headline: 'ORDER CONFIRMED',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'Your order made it through the checkout counter. We saved the details and will prepare it for made-to-order production.',
    ],
    statusRows: [
      ['Order number', '#{{ORDER_NUMBER}}'],
      ['Payment', '{{PAYMENT_STATUS}}'],
      ['Fulfillment', '{{FULFILLMENT_STATUS}}'],
    ],
    includeItems: true,
    includeTotals: true,
    panels: [
      ['Shipping to', '{{SHIPPING_ADDRESS}}'],
    ],
    ctaLabel: 'View order status',
    ctaUrl: '{{ORDER_URL}}',
    footerNote: 'Made to order after checkout. Production time and shipping time are separate.',
  },
  {
    slug: 'payment-failed',
    title: 'Payment needs attention',
    preheader: 'Payment for order {{ORDER_NUMBER}} did not complete. Your cart is still waiting.',
    eyebrow: 'Checkout counter alert',
    headline: 'PAYMENT NEEDS ATTENTION',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'The payment did not complete, so no order has been sent to production. Your cart can still be reviewed and paid again.',
    ],
    statusRows: [
      ['Order attempt', '#{{ORDER_NUMBER}}'],
      ['Payment', '{{PAYMENT_STATUS}}'],
      ['Production', 'Not started'],
    ],
    includeItems: true,
    includeTotals: true,
    panels: [
      ['What to do next', 'Return to checkout, confirm your PayPal payment, and place the order again. If PayPal charged you but this email says failed, contact support before trying again.'],
    ],
    ctaLabel: 'Return to checkout',
    ctaUrl: '{{CHECKOUT_URL}}',
    footerNote: 'We do not send made-to-order items into production until payment is confirmed.',
    tone: 'warning',
  },
  {
    slug: 'order-in-production',
    title: 'Order in production',
    preheader: 'Order {{ORDER_NUMBER}} is now in made-to-order production.',
    eyebrow: 'Production counter update',
    headline: 'IN PRODUCTION',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'Your order has moved from review into production. The print team is preparing the items before carrier handoff.',
    ],
    statusRows: [
      ['Order number', '#{{ORDER_NUMBER}}'],
      ['Payment', '{{PAYMENT_STATUS}}'],
      ['Fulfillment', 'In production'],
    ],
    includeItems: true,
    panels: [
      ['Production note', 'Address changes and cancellations may no longer be possible once production begins. Tracking appears after the carrier receives the package.'],
    ],
    ctaLabel: 'View production status',
    ctaUrl: '{{ORDER_URL}}',
    footerNote: 'Made-to-order production and shipping are separate steps.',
  },
  {
    slug: 'shipping-tracking',
    title: 'Order shipped',
    preheader: 'Order {{ORDER_NUMBER}} has shipped with {{CARRIER}} tracking {{TRACKING_NUMBER}}.',
    eyebrow: 'Carrier handoff',
    headline: 'ORDER SHIPPED',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'Your package has left the production counter and is now with the carrier. Tracking may take a short while to show movement.',
    ],
    statusRows: [
      ['Order number', '#{{ORDER_NUMBER}}'],
      ['Carrier', '{{CARRIER}}'],
      ['Tracking', '{{TRACKING_NUMBER}}'],
    ],
    includeItems: true,
    panels: [
      ['Shipping to', '{{SHIPPING_ADDRESS}}'],
      ['Delivery note', 'Carrier scans can update slowly during the first day. If tracking stalls for several business days, contact support.'],
    ],
    ctaLabel: 'Track package',
    ctaUrl: '{{TRACKING_URL}}',
    footerNote: 'Tracking emails are sent when fulfillment provides carrier information.',
  },
  {
    slug: 'delivered',
    title: 'Order delivered',
    preheader: 'Order {{ORDER_NUMBER}} was marked delivered on {{DELIVERY_DATE}}.',
    eyebrow: 'Delivery counter',
    headline: 'DELIVERED',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'The carrier marked your order as delivered. We hope the nostalgia landed in good shape.',
    ],
    statusRows: [
      ['Order number', '#{{ORDER_NUMBER}}'],
      ['Delivered', '{{DELIVERY_DATE}}'],
      ['Tracking', '{{TRACKING_NUMBER}}'],
    ],
    panels: [
      ['Need help?', 'If the package is missing, damaged, misprinted, or incorrect, contact support with your order number and photos if relevant.'],
    ],
    ctaLabel: 'View order',
    ctaUrl: '{{ORDER_URL}}',
    footerNote: 'Claims are reviewed case by case for damaged, misprinted, incorrect, or lost orders.',
  },
  {
    slug: 'support-ticket-received',
    title: 'Support ticket received',
    preheader: 'We received support ticket {{TICKET_ID}} and will reply to {{CUSTOMER_EMAIL}}.',
    eyebrow: 'Support counter ticket',
    headline: 'TICKET RECEIVED',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'We received your support request and saved it at the counter. A reply will go to {{CUSTOMER_EMAIL}}.',
    ],
    statusRows: [
      ['Ticket', '#{{TICKET_ID}}'],
      ['Issue', '{{ISSUE_TYPE}}'],
      ['Order', '#{{ORDER_NUMBER}}'],
    ],
    panels: [
      ['What happens next', 'We review the order, message, and any photos or tracking details. If more information is needed, support will reply to this email.'],
    ],
    ctaLabel: 'View account support',
    ctaUrl: '{{ACCOUNT_URL}}',
    footerNote: 'For urgent address changes, reply as soon as possible before production starts.',
  },
  {
    slug: 'refund-reprint-update',
    title: 'Claim update',
    preheader: 'Claim update for order {{ORDER_NUMBER}}: {{CLAIM_STATUS}}.',
    eyebrow: 'Claim counter update',
    headline: 'CLAIM UPDATE',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'We reviewed the order issue and updated the claim status.',
    ],
    statusRows: [
      ['Order number', '#{{ORDER_NUMBER}}'],
      ['Claim status', '{{CLAIM_STATUS}}'],
      ['Fulfillment', '{{FULFILLMENT_STATUS}}'],
    ],
    panels: [
      ['Review details', '{{CLAIM_DETAIL}}'],
      ['POD policy note', 'Made-to-order items are reviewed for damaged, misprinted, defective, incorrect, or confirmed lost orders. Wrong size selection or changed mind is not automatically covered after production.'],
    ],
    ctaLabel: 'View order',
    ctaUrl: '{{ORDER_URL}}',
    footerNote: 'Keep photos and packaging until the review is complete.',
  },
  {
    slug: 'account-notice',
    title: 'Account notice',
    preheader: 'A secure account action was requested for Dreaming in 1989.',
    eyebrow: 'Customer counter security',
    headline: 'ACCOUNT NOTICE',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'A secure account action was requested for your Dreaming in 1989 account.',
    ],
    statusRows: [
      ['Account', '{{CUSTOMER_EMAIL}}'],
      ['Action', 'Password reset / account update'],
      ['Status', 'Waiting for confirmation'],
    ],
    panels: [
      ['Security note', 'If you requested this, use the button below to continue. If you did not request it, you can ignore this email or contact support.'],
    ],
    ctaLabel: 'Continue securely',
    ctaUrl: '{{RESET_URL}}',
    footerNote: 'Supabase can also send auth emails directly; this template is for branded account notices.',
    tone: 'security',
  },
  {
    slug: 'welcome',
    title: 'Welcome to Dreaming in 1989',
    preheader: 'Your Dreaming in 1989 customer account is ready.',
    eyebrow: 'New customer file',
    headline: 'WELCOME TO 1989',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'Your customer account is ready. You can save wishlist picks, view order history, manage addresses, and contact support from the account counter.',
    ],
    statusRows: [
      ['Account', '{{CUSTOMER_EMAIL}}'],
      ['Member file', 'Rewind Club'],
      ['Perk', '{{DISCOUNT_CODE}}'],
    ],
    panels: [
      ['First order note', 'Use {{DISCOUNT_CODE}} at checkout before {{EXPIRY_DATE}} for a first-order nudge.'],
    ],
    ctaLabel: 'Shop new arrivals',
    ctaUrl: '{{CART_URL}}',
    footerNote: 'Made-to-order goods, gift-ready packaging, and retro everyday nostalgia.',
  },
  {
    slug: 'abandoned-checkout',
    title: 'Your cart is waiting',
    preheader: 'Your Dreaming in 1989 cart is still waiting at the checkout counter.',
    eyebrow: 'Checkout counter hold',
    headline: 'CART STILL WAITING',
    intro: [
      'Hi {{CUSTOMER_NAME}},',
      'Your cart is still parked at the counter. If you want the full retro run, you can pick up where you left off.',
    ],
    statusRows: [
      ['Cart', 'Saved checkout'],
      ['Code', '{{DISCOUNT_CODE}}'],
      ['Expires', '{{EXPIRY_DATE}}'],
    ],
    includeItems: true,
    includeTotals: true,
    panels: [
      ['Reminder', 'Items are made after checkout, so production starts only after payment is confirmed.'],
    ],
    ctaLabel: 'Return to cart',
    ctaUrl: '{{CHECKOUT_URL}}',
    footerNote: 'If you already checked out, you can ignore this reminder.',
  },
]

function renderItemRows(items) {
  return items.map((item) => `
                  <tr>
                    <td style="padding:13px 14px;border-bottom:1px solid #ead7b7;font-size:15px;color:#21140f;font-weight:800;">
                      ${item.name}<br><span style="font-size:12px;color:#7a4324;font-weight:400;">${item.option}</span>
                    </td>
                    <td align="center" style="padding:13px 8px;border-bottom:1px solid #ead7b7;font-size:15px;font-weight:800;color:#21140f;">${item.quantity}</td>
                    <td align="right" style="padding:13px 14px;border-bottom:1px solid #ead7b7;font-size:15px;font-weight:800;color:#21140f;">${money(item.price)}</td>
                  </tr>`).join('')
}

function renderStatusRows(rows) {
  return rows.map(([label, value], index) => `
                        <tr>
                          <td style="${index ? 'padding-top:8px;' : ''}font-size:12px;color:#7a4324;font-weight:900;letter-spacing:1.4px;text-transform:uppercase;">${label}</td>
                          <td align="right" style="${index ? 'padding-top:8px;' : ''}font-size:15px;font-weight:800;color:#12100d;">${value}</td>
                        </tr>`).join('')
}

function renderIntro(lines) {
  return lines.map((line) => `
                <p style="margin:0 0 12px;font-size:17px;line-height:1.55;color:#351d14;">
                  ${line}
                </p>`).join('')
}

function renderPanels(panels) {
  return panels.map(([label, value], index) => `
            <tr>
              <td style="padding:${index ? '0 28px 18px' : '0 28px 22px'};">
                <div style="background:#fff8e5;border-left:6px solid #b21d22;padding:14px 16px;border-radius:4px;">
                  <div style="font-size:12px;color:#7a4324;font-weight:900;letter-spacing:1.4px;text-transform:uppercase;">${label}</div>
                  <div style="margin-top:6px;font-size:15px;line-height:1.5;color:#351d14;">${value}</div>
                </div>
              </td>
            </tr>`).join('')
}

function renderItemsTable() {
  return `
            <tr>
              <td style="padding:0 28px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf0;border:2px solid #7a4324;border-radius:6px;overflow:hidden;">
                  <tr>
                    <th align="left" style="padding:12px 14px;background:#073c35;color:#ffbd59;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;">Item</th>
                    <th align="center" style="padding:12px 8px;background:#073c35;color:#ffbd59;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;">Qty</th>
                    <th align="right" style="padding:12px 14px;background:#073c35;color:#ffbd59;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;">Price</th>
                  </tr>
                  {{ITEM_ROWS}}
                </table>
              </td>
            </tr>`
}

function renderTotalsTable() {
  return `
            <tr>
              <td style="padding:0 28px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8e2ae;border:2px solid #7a4324;border-radius:6px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="font-size:14px;color:#5d3a24;">Subtotal</td>
                          <td align="right" style="font-size:14px;font-weight:800;">{{SUBTOTAL}}</td>
                        </tr>
                        <tr>
                          <td style="padding-top:7px;font-size:14px;color:#5d3a24;">Shipping</td>
                          <td align="right" style="padding-top:7px;font-size:14px;font-weight:800;">{{SHIPPING}}</td>
                        </tr>
                        <tr>
                          <td style="padding-top:12px;border-top:2px dashed #9a6a43;font-size:20px;font-weight:900;color:#12100d;">Total</td>
                          <td align="right" style="padding-top:12px;border-top:2px dashed #9a6a43;font-size:22px;font-weight:900;color:#b21d22;">{{TOTAL}}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
}

function renderTemplate(template) {
  const accent = template.tone === 'warning' ? '#b36b00' : template.tone === 'security' ? '#0b4c83' : '#b21d22'
  const shadow = template.tone === 'warning' ? '#6b3c00' : template.tone === 'security' ? '#0b2f52' : '#4b1012'

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${template.title}</title>
  </head>
  <body style="margin:0;padding:0;background:#ead7b7;color:#21140f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${template.preheader}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ead7b7;background-image:linear-gradient(0deg,rgba(117,70,41,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(117,70,41,0.08) 1px,transparent 1px);background-size:32px 32px;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fff3d2;border:3px solid #7a4324;border-radius:8px;box-shadow:0 10px 0 #8f764e;">
            <tr>
              <td style="padding:0;">
                <div style="background:#073c35;color:#ffbd59;border-bottom:4px solid #7a4324;padding:10px 18px;text-align:center;font-size:12px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;">
                  Dreaming in 1989 &nbsp; * &nbsp; Nostalgia News & Market
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 28px 12px;text-align:center;">
                <div style="display:inline-block;background:#fff7df;border:2px solid #7a4324;border-radius:6px;padding:8px 18px;box-shadow:0 4px 0 #8f764e;">
                  <div style="font-size:13px;font-weight:900;letter-spacing:1.8px;color:#073c35;text-transform:uppercase;">${template.eyebrow}</div>
                  <div style="font-size:28px;line-height:1;font-weight:900;color:${accent};text-shadow:1px 2px 0 #ffbd59;">${template.headline}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 28px 0;">
                ${renderIntro(template.intro)}
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:2px dashed #9a6a43;background:#fff8e5;border-radius:6px;">
                  <tr>
                    <td style="padding:18px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        ${renderStatusRows(template.statusRows)}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${template.includeItems ? renderItemsTable() : ''}
            ${template.includeTotals ? renderTotalsTable() : ''}
            ${renderPanels(template.panels ?? [])}
            <tr>
              <td style="padding:0 28px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="padding:16px;background:${accent};border:2px solid ${shadow};border-radius:6px;box-shadow:0 4px 0 ${shadow};">
                      <a href="${template.ctaUrl}" style="display:block;color:#fff7df;text-decoration:none;font-size:16px;font-weight:900;text-transform:uppercase;letter-spacing:.8px;">${template.ctaLabel}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 24px;background:#073c35;color:#fff3d2;border-top:4px solid #7a4324;text-align:center;">
                <p style="margin:0 0 8px;font-size:13px;line-height:1.45;">
                  ${template.footerNote}
                </p>
                <p style="margin:0;font-size:12px;color:#ffbd59;">
                  Need help? Reply to this email or contact {{SUPPORT_EMAIL}}.
                </p>
              </td>
            </tr>
          </table>
          <p style="max-width:680px;margin:18px auto 0;font-size:11px;line-height:1.5;color:#7a4324;text-align:center;">
            You received this because of account or order activity at Dreaming in 1989.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}

function renderPreview(html) {
  return Object.entries(sampleData).reduce(
    (content, [key, value]) => content.replaceAll(`{{${key}}}`, value),
    html,
  )
}

await mkdir(__dirname, { recursive: true })

for (const template of templates) {
  const html = renderTemplate(template)
  await writeFile(path.join(__dirname, `${template.slug}.html`), html)
  await writeFile(path.join(__dirname, `${template.slug}.preview.html`), renderPreview(html))
}

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dreaming in 1989 Email Templates</title>
    <style>
      body {
        margin: 0;
        background: #ead7b7;
        color: #21140f;
        font-family: Arial, Helvetica, sans-serif;
      }

      header {
        padding: 24px;
        background: #073c35;
        color: #fff3d2;
        border-bottom: 4px solid #7a4324;
      }

      h1 {
        margin: 0 0 8px;
        color: #ffbd59;
        font-size: 28px;
        text-transform: uppercase;
      }

      p {
        margin: 0;
        max-width: 760px;
        line-height: 1.5;
      }

      main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 18px;
        padding: 24px;
      }

      a {
        display: block;
        min-height: 118px;
        padding: 18px;
        color: inherit;
        text-decoration: none;
        background: #fff3d2;
        border: 2px solid #7a4324;
        border-radius: 8px;
        box-shadow: 0 5px 0 #8f764e;
      }

      strong {
        display: block;
        margin-bottom: 8px;
        color: #b21d22;
        font-size: 18px;
        text-transform: uppercase;
      }

      span {
        color: #5d3a24;
        font-size: 14px;
        line-height: 1.45;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Dreaming in 1989 Email Templates</h1>
      <p>Preview gallery for all transactional and customer lifecycle email UI files.</p>
    </header>
    <main>
      ${templates.map((template) => `
      <a href="./${template.slug}.preview.html">
        <strong>${template.headline}</strong>
        <span>${template.title}<br>${template.preheader.replaceAll('{{ORDER_NUMBER}}', 'SANDBOX-1989')}</span>
      </a>`).join('')}
    </main>
  </body>
</html>
`

await writeFile(path.join(__dirname, 'index.html'), indexHtml)

console.log(`Generated ${templates.length} email templates, ${templates.length} previews, and index.html.`)
