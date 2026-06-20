import console from 'node:console'
import process from 'node:process'

const isEnabled = (name) => String(process.env[name] ?? '').toLowerCase() === 'true'

const services = [
  {
    name: 'PostHog',
    enabledKey: 'POSTHOG_ENABLED',
    confirmedKey: 'POSTHOG_COST_CAP_CONFIRMED',
  },
  {
    name: 'Sentry',
    enabledKey: 'SENTRY_ENABLED',
    confirmedKey: 'SENTRY_COST_CAP_CONFIRMED',
  },
  {
    name: 'Cloudflare R2',
    enabledKey: 'CLOUDFLARE_R2_ENABLED',
    confirmedKey: 'CLOUDFLARE_R2_COST_CAP_CONFIRMED',
  },
  {
    name: 'Vercel production',
    enabledKey: 'VERCEL_PRODUCTION_ENABLED',
    confirmedKey: 'VERCEL_SPEND_LIMIT_CONFIRMED',
  },
]

const mode = String(process.env.COST_GUARD_MODE ?? 'strict').toLowerCase()
const violations = services.filter(
  ({ enabledKey, confirmedKey }) => isEnabled(enabledKey) && !isEnabled(confirmedKey),
)

if (violations.length === 0) {
  console.log('[cost-guard] OK: no paid-capable service is enabled without a confirmed limit.')
  process.exit(0)
}

for (const service of violations) {
  console.error(
    `[cost-guard] ${service.name} is enabled, but ${service.confirmedKey}=true is missing.`,
  )
}

if (mode === 'warn') {
  console.warn('[cost-guard] Warning mode is active; build will continue.')
  process.exit(0)
}

console.error(
  '[cost-guard] Build blocked. Configure the provider dashboard limit, then confirm it in Doppler.',
)
process.exit(1)
