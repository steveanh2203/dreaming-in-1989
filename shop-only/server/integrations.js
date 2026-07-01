import { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'
import process from 'node:process'

const jsonHeaders = { 'Content-Type': 'application/json' }

const cleanString = (value, fallback = '') => String(value ?? fallback).trim()
const env = (name, fallback = '') => cleanString(process.env[name], fallback)
const hasEnv = (name) => Boolean(env(name))
const money = (value) => Math.max(0, Math.round(Number(value ?? 0) * 100) / 100)
const isoNow = () => new Date().toISOString()

const publicSiteUrl = () => env('PUBLIC_SITE_URL', 'http://127.0.0.1:5173').replace(/\/$/, '')

const getBearerToken = (req) => {
  const header = cleanString(req.headers.authorization)
  const match = header.match(/^Bearer\s+(.+)$/i)
  return match ? match[1].trim() : ''
}

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options)
  const text = await response.text()
  let body = null

  if (text) {
    try {
      body = JSON.parse(text)
    } catch {
      body = { raw: text }
    }
  }

  if (!response.ok) {
    const message = body?.message || body?.error_description || body?.error || `Request failed with ${response.status}`
    const error = new Error(message)
    error.status = response.status
    error.body = body
    throw error
  }

  return body ?? {}
}

const paypalBaseUrl = () =>
  env('PAYPAL_ENV', env('VITE_PAYPAL_ENV', 'sandbox')).toLowerCase() === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

const getPayPalClientId = () => env('PAYPAL_CLIENT_ID', env('VITE_PAYPAL_CLIENT_ID'))

const getPayPalAccessToken = async () => {
  const clientId = getPayPalClientId()
  const clientSecret = env('PAYPAL_CLIENT_SECRET')
  if (!clientId || !clientSecret) {
    const error = new Error('PayPal is not configured. Add PAYPAL_CLIENT_ID or VITE_PAYPAL_CLIENT_ID plus PAYPAL_CLIENT_SECRET in Doppler.')
    error.status = 503
    throw error
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const body = await fetchJson(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  return body.access_token
}

const createPayPalOrder = async ({ total, currency = env('SHOP_CURRENCY', 'USD'), items = [], shipping = {} }) => {
  const accessToken = await getPayPalAccessToken()
  const value = money(total)
  if (value <= 0) {
    const error = new Error('PayPal order total must be greater than zero.')
    error.status = 400
    throw error
  }

  const order = await fetchJson(`${paypalBaseUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: randomUUID(),
          amount: {
            currency_code: currency,
            value: value.toFixed(2),
          },
          description: 'Dreaming in 1989 made-to-order checkout',
          items: items.slice(0, 50).map((item) => ({
            name: cleanString(item.name, 'Dreaming in 1989 item').slice(0, 127),
            quantity: String(Math.max(1, Number(item.quantity ?? 1))),
            unit_amount: {
              currency_code: currency,
              value: money(item.price).toFixed(2),
            },
            category: 'PHYSICAL_GOODS',
          })),
          shipping: shipping?.name || shipping?.address
            ? {
                name: shipping.name ? { full_name: cleanString(shipping.name).slice(0, 300) } : undefined,
                address: shipping.address ? { address_line_1: cleanString(shipping.address).slice(0, 300) } : undefined,
              }
            : undefined,
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: env('SHOP_BRAND_NAME', 'Dreaming in 1989'),
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
            return_url: `${publicSiteUrl()}/#/checkout/paypal-return`,
            cancel_url: `${publicSiteUrl()}/#/checkout/paypal-cancel`,
          },
        },
      },
    }),
  })

  return {
    id: order.id,
    status: order.status,
    approvalUrl: order.links?.find((link) => link.rel === 'payer-action' || link.rel === 'approve')?.href ?? '',
    raw: order,
  }
}

const capturePayPalOrder = async (orderId) => {
  const cleanOrderId = cleanString(orderId)
  if (!cleanOrderId) {
    const error = new Error('PayPal order id is required.')
    error.status = 400
    throw error
  }

  const accessToken = await getPayPalAccessToken()
  return fetchJson(`${paypalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(cleanOrderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
  })
}

const supabaseUrl = () => env('VITE_SUPABASE_URL').replace(/\/$/, '')
const supabaseAnonKey = () => env('VITE_SUPABASE_ANON_KEY')
const supabaseServiceRoleKey = () => env('SUPABASE_SERVICE_ROLE_KEY')
const isSupabaseServerConfigured = () => Boolean(supabaseUrl() && supabaseServiceRoleKey())

const supabaseRest = async (path, options = {}) => {
  if (!isSupabaseServerConfigured()) {
    const error = new Error('Supabase server API is not configured. Add VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Doppler.')
    error.status = 503
    throw error
  }

  return fetchJson(`${supabaseUrl()}/rest/v1/${path.replace(/^\//, '')}`, {
    ...options,
    headers: {
      apikey: supabaseServiceRoleKey(),
      Authorization: `Bearer ${supabaseServiceRoleKey()}`,
      ...jsonHeaders,
      ...(options.headers ?? {}),
    },
  })
}

const getSupabaseUser = async (req) => {
  const token = getBearerToken(req)
  if (!token) return null
  if (!supabaseUrl() || !supabaseAnonKey()) return null

  try {
    return await fetchJson(`${supabaseUrl()}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey(),
        Authorization: `Bearer ${token}`,
      },
    })
  } catch {
    return null
  }
}

const buildOrderTimeline = (paymentStatus = 'pending_review') => [
  { label: 'Order received', detail: 'Checkout was received by the store API.', done: true },
  {
    label: 'Payment review',
    detail: paymentStatus === 'captured' || paymentStatus === 'paid' ? 'Payment was confirmed by the provider.' : 'Payment awaits provider confirmation.',
    done: paymentStatus === 'captured' || paymentStatus === 'paid',
  },
  { label: 'Production review', detail: 'Human approval is required before sending to production.', done: false },
  { label: 'Production', detail: 'Production begins after review.', done: false },
  { label: 'Tracking', detail: 'Carrier tracking appears here after shipment.', done: false },
]

const normalizeOrderItems = (items = []) =>
  Array.isArray(items)
    ? items.slice(0, 50).map((item) => ({
        product_id: cleanString(String(item.product_id ?? item.productId ?? item.id ?? '').split(':')[0]) || null,
        name: cleanString(item.name, 'Dreaming in 1989 item'),
        quantity: Math.max(1, Number(item.quantity ?? 1)),
        price: money(item.price),
        option_summary: cleanString(item.option_summary ?? item.optionSummary) || null,
      }))
    : []

const createStoreOrder = async (req, payload) => {
  const user = await getSupabaseUser(req)
  const items = normalizeOrderItems(payload.items)
  const orderNumber = cleanString(payload.orderNumber, `DI1989-${Date.now().toString().slice(-8)}`)
  const paymentProvider = cleanString(payload.paymentProvider, 'paypal')
  const paymentStatus = cleanString(payload.paymentStatus, payload.paypalCaptureId ? 'captured' : 'pending_review')
  const subtotal = money(payload.subtotal)
  const discount = money(payload.discount)
  const shipping = money(payload.shipping)
  const total = money(payload.total || subtotal - discount + shipping)
  const currency = cleanString(payload.currency, env('SHOP_CURRENCY', 'USD'))
  const shippingAddress = {
    address: cleanString(payload.shippingAddress?.address ?? payload.shippingAddressParts?.[0]),
    city: cleanString(payload.shippingAddress?.city ?? payload.shippingAddressParts?.[1]),
    zip: cleanString(payload.shippingAddress?.zip ?? payload.shippingAddressParts?.[2]),
    country: cleanString(payload.shippingAddress?.country, 'United States'),
    items,
  }
  const timeline = Array.isArray(payload.timeline) && payload.timeline.length ? payload.timeline : buildOrderTimeline(paymentStatus)

  let dbOrder = null
  if (user && isSupabaseServerConfigured()) {
    const [insertedOrder] = await supabaseRest(
      'orders?select=id,order_number,status,payment_provider,payment_status,fulfillment_status,subtotal,discount,shipping,total,shipping_address,tracking_number,tracking_url,timeline,created_at',
      {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({
          user_id: user.id,
          order_number: orderNumber,
          customer_email: cleanString(payload.email, user.email),
          customer_name: cleanString(payload.name, user.user_metadata?.name ?? 'Retro Shopper'),
          status: 'order_received',
          payment_provider: paymentProvider,
          payment_status: paymentStatus,
          fulfillment_status: 'production_pending',
          subtotal,
          discount,
          shipping,
          total,
          currency,
          shipping_address: shippingAddress,
          timeline,
        }),
      },
    )

    dbOrder = insertedOrder

    if (items.length) {
      await supabaseRest('order_items', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify(items.map((item) => ({
          order_id: insertedOrder.id,
          product_id: item.product_id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          option_summary: item.option_summary,
        }))),
      })
    }
  }

  return {
    id: dbOrder?.order_number ?? orderNumber,
    dbId: dbOrder?.id ?? null,
    date: dbOrder?.created_at ?? isoNow(),
    status: 'Order received',
    subtotal,
    discount,
    shipping,
    total,
    items: items.map((item) => ({
      productId: item.product_id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      optionSummary: item.option_summary,
    })),
    payment: `${paymentProvider === 'paypal' ? 'PayPal' : paymentProvider} ${paymentStatus.replace(/_/g, ' ')}`,
    paymentStatus: paymentStatus.replace(/_/g, ' '),
    fulfillment: 'Production pending',
    tracking: 'Tracking appears after shipment',
    shippingAddress: [shippingAddress.address, shippingAddress.city, shippingAddress.zip, shippingAddress.country].filter(Boolean).join(', '),
    timeline,
  }
}

const sendResendEmail = async ({ to, subject, html, text }) => {
  if (!hasEnv('RESEND_API_KEY') || !hasEnv('RESEND_FROM_EMAIL')) {
    return { skipped: true, reason: 'Resend is not configured.' }
  }

  return fetchJson('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env('RESEND_API_KEY')}`,
      ...jsonHeaders,
    },
    body: JSON.stringify({
      from: env('RESEND_FROM_EMAIL'),
      to: [to],
      subject,
      html,
      text,
    }),
  })
}

const printfulHeaders = () => {
  if (!hasEnv('PRINTFUL_API_TOKEN')) {
    const error = new Error('Printful is not configured. Add PRINTFUL_API_TOKEN in Doppler.')
    error.status = 503
    throw error
  }

  return {
    Authorization: `Bearer ${env('PRINTFUL_API_TOKEN')}`,
    ...(hasEnv('PRINTFUL_STORE_ID') ? { 'X-PF-Store-Id': env('PRINTFUL_STORE_ID') } : {}),
  }
}

const printfulFetch = (path) => fetchJson(`https://api.printful.com${path}`, { headers: printfulHeaders() })

export const createIntegrationRoutes = ({ json, parseBody }) => ({
  'GET /api/integrations/status': async (_req, res) =>
    json(res, 200, {
      doppler: {
        project: env('DOPPLER_PROJECT'),
        config: env('DOPPLER_CONFIG'),
      },
      configured: {
        supabasePublic: Boolean(supabaseUrl() && supabaseAnonKey()),
        supabaseServer: isSupabaseServerConfigured(),
        paypal: Boolean(getPayPalClientId() && hasEnv('PAYPAL_CLIENT_SECRET')),
        printful: hasEnv('PRINTFUL_API_TOKEN'),
        resend: Boolean(hasEnv('RESEND_API_KEY') && hasEnv('RESEND_FROM_EMAIL')),
        ga4: hasEnv('VITE_GA4_MEASUREMENT_ID'),
      },
    }),

  'POST /api/paypal/create-order': async (req, res) => {
    const body = await parseBody(req)
    const order = await createPayPalOrder(body)
    return json(res, 200, { order })
  },

  'POST /api/paypal/capture-order': async (req, res) => {
    const body = await parseBody(req)
    const capture = await capturePayPalOrder(body.orderId)
    return json(res, 200, { capture })
  },

  'POST /api/orders': async (req, res) => {
    const body = await parseBody(req)
    const order = await createStoreOrder(req, body)
    const email = cleanString(body.email)
    let emailResult = null

    if (email) {
      emailResult = await sendResendEmail({
        to: email,
        subject: `Order ${order.id} received`,
        html: `<p>We received order <strong>${order.id}</strong>.</p><p>Total: $${order.total.toFixed(2)}</p><p>Production starts after payment and human review.</p>`,
        text: `We received order ${order.id}. Total: $${order.total.toFixed(2)}. Production starts after payment and human review.`,
      })
    }

    return json(res, 201, { order, email: emailResult })
  },

  'POST /api/support-tickets': async (req, res) => {
    const body = await parseBody(req)
    const user = await getSupabaseUser(req)
    const email = cleanString(body.email, user?.email)
    const message = cleanString(body.message)
    if (!email || !message) return json(res, 400, { error: 'Email and message are required.' })

    let ticket = {
      id: `SUP-${Date.now().toString().slice(-6)}`,
      email,
      orderId: cleanString(body.orderId),
      issueType: cleanString(body.issueType, 'support'),
      message,
      status: 'open',
      createdAt: isoNow(),
    }

    if (user && isSupabaseServerConfigured()) {
      const [insertedTicket] = await supabaseRest('support_tickets?select=id,email,order_number,topic,message,status,created_at', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({
          user_id: user.id,
          email,
          order_number: cleanString(body.orderId) || null,
          topic: cleanString(body.issueType, 'support'),
          message,
          status: 'open',
        }),
      })

      ticket = {
        id: `SUP-${String(insertedTicket.id).replace(/-/g, '').slice(0, 6).toUpperCase()}`,
        email: insertedTicket.email,
        orderId: insertedTicket.order_number || '',
        issueType: insertedTicket.topic,
        message: insertedTicket.message,
        status: insertedTicket.status,
        createdAt: insertedTicket.created_at,
      }
    }

    const supportEmail = env('SUPPORT_EMAIL')
    const emailResult = supportEmail
      ? await sendResendEmail({
          to: supportEmail,
          subject: `Support request ${ticket.id}`,
          html: `<p><strong>${ticket.issueType}</strong></p><p>From: ${email}</p><p>Order: ${ticket.orderId || 'n/a'}</p><p>${message.replace(/[<>&]/g, '')}</p>`,
          text: `${ticket.issueType}\nFrom: ${email}\nOrder: ${ticket.orderId || 'n/a'}\n\n${message}`,
        })
      : null

    return json(res, 201, { ticket, email: emailResult })
  },

  'POST /api/email/signup': async (req, res) => {
    const body = await parseBody(req)
    const email = cleanString(body.email)
    if (!email) return json(res, 400, { error: 'Email is required.' })

    const result = await sendResendEmail({
      to: email,
      subject: 'You are on the Dreaming in 1989 drop list',
      html: '<p>You are on the Dreaming in 1989 drop list. We will email restock notes, gift runs, and campaign codes when they are live.</p>',
      text: 'You are on the Dreaming in 1989 drop list. We will email restock notes, gift runs, and campaign codes when they are live.',
    })

    return json(res, 200, { ok: true, email: result })
  },

  'GET /api/printful/store': async (_req, res) => {
    const stores = await printfulFetch('/stores')
    return json(res, 200, { stores })
  },

  'GET /api/printful/products': async (_req, res) => {
    const products = await printfulFetch('/store/products')
    return json(res, 200, { products })
  },
})
