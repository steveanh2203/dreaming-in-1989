import console from 'node:console'
import process from 'node:process'

const dryRun = process.argv.includes('--dry-run')

const env = (name) => String(process.env[name] ?? '').trim()

const deriveProjectRef = () => {
  const explicitRef = env('SUPABASE_PROJECT_REF') || env('PROJECT_REF')
  if (explicitRef) return explicitRef

  const supabaseUrl = env('VITE_SUPABASE_URL')
  const match = supabaseUrl.match(/^https:\/\/([a-z0-9-]+)\.supabase\.co\/?$/i)
  return match?.[1] ?? ''
}

const required = {
  SUPABASE_ACCESS_TOKEN: env('SUPABASE_ACCESS_TOKEN'),
  VITE_SUPABASE_URL: env('VITE_SUPABASE_URL'),
  RESEND_API_KEY: env('RESEND_API_KEY'),
  RESEND_FROM_EMAIL: env('RESEND_FROM_EMAIL'),
}

const missing = Object.entries(required)
  .filter(([, value]) => !value)
  .map(([name]) => name)

const projectRef = deriveProjectRef()
if (!projectRef) missing.push('SUPABASE_PROJECT_REF')

if (missing.length) {
  console.error('[supabase-auth-smtp] Cannot apply SMTP settings yet.')
  for (const name of missing) console.error(`- Missing ${name} in Doppler.`)
  process.exit(1)
}

const payload = {
  external_email_enabled: true,
  mailer_secure_email_change_enabled: true,
  mailer_autoconfirm: false,
  smtp_admin_email: required.RESEND_FROM_EMAIL,
  smtp_host: 'smtp.resend.com',
  smtp_port: 465,
  smtp_user: 'resend',
  smtp_pass: required.RESEND_API_KEY,
  smtp_sender_name: env('SHOP_BRAND_NAME') || 'Dreaming in 1989',
}

const verifyResendSender = async () => {
  const fromDomain = payload.smtp_admin_email.split('@').pop()?.toLowerCase()
  const response = await globalThis.fetch('https://api.resend.com/domains', {
    headers: {
      Authorization: `Bearer ${required.RESEND_API_KEY}`,
    },
  })

  if (!response.ok) {
    return {
      ok: false,
      reason: `Resend domains check returned ${response.status}.`,
    }
  }

  const data = await response.json()
  const domains = Array.isArray(data.data) ? data.data : []
  const domain = domains.find((entry) => String(entry.name ?? '').toLowerCase() === fromDomain)

  if (!domain) {
    return {
      ok: false,
      reason: `RESEND_FROM_EMAIL uses ${fromDomain}, but that domain is not listed in Resend.`,
    }
  }

  if (domain.status !== 'verified') {
    return {
      ok: false,
      reason: `Resend domain ${fromDomain} is ${domain.status}, not verified.`,
    }
  }

  return { ok: true, domain: fromDomain }
}

const senderCheck = await verifyResendSender()

if (dryRun) {
  console.log('[supabase-auth-smtp] Dry run OK.')
  console.log(`- Project ref: ${projectRef}`)
  console.log(`- SMTP host: ${payload.smtp_host}:${payload.smtp_port}`)
  console.log(`- SMTP user: ${payload.smtp_user}`)
  console.log(`- Sender: ${payload.smtp_sender_name} <${payload.smtp_admin_email}>`)
  console.log(`- Resend sender: ${senderCheck.ok ? `verified ${senderCheck.domain}` : senderCheck.reason}`)
  process.exit(0)
}

if (!senderCheck.ok) {
  console.error('[supabase-auth-smtp] Refusing to apply SMTP settings.')
  console.error(`- ${senderCheck.reason}`)
  console.error('- Set RESEND_FROM_EMAIL to an address on a verified Resend domain, then rerun this command.')
  process.exit(1)
}

const response = await globalThis.fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${required.SUPABASE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})

if (!response.ok) {
  const detail = await response.text()
  console.error(`[supabase-auth-smtp] Supabase Management API returned ${response.status}.`)
  console.error(detail)
  process.exit(1)
}

console.log('[supabase-auth-smtp] Supabase Auth custom SMTP applied.')
console.log(`- Project ref: ${projectRef}`)
console.log(`- Sender: ${payload.smtp_sender_name} <${payload.smtp_admin_email}>`)
