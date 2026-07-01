import console from 'node:console'
import process from 'node:process'

const groups = [
  {
    name: 'Supabase browser',
    required: ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'],
  },
  {
    name: 'Supabase server',
    required: ['SUPABASE_SERVICE_ROLE_KEY'],
    needs: ['VITE_SUPABASE_URL'],
  },
  {
    name: 'Supabase Auth email management',
    optional: ['SUPABASE_ACCESS_TOKEN', 'SUPABASE_PROJECT_REF'],
    needs: ['VITE_SUPABASE_URL'],
  },
  {
    name: 'PayPal',
    required: ['PAYPAL_CLIENT_SECRET'],
    oneOf: [['PAYPAL_CLIENT_ID', 'VITE_PAYPAL_CLIENT_ID']],
  },
  {
    name: 'Printful',
    required: ['PRINTFUL_API_TOKEN'],
    optional: ['PRINTFUL_STORE_ID'],
  },
  {
    name: 'Resend',
    required: ['RESEND_API_KEY', 'RESEND_FROM_EMAIL'],
    optional: ['SUPPORT_EMAIL'],
  },
  {
    name: 'Analytics',
    optional: ['VITE_GA4_MEASUREMENT_ID'],
  },
]

const present = (name) => Boolean(String(process.env[name] ?? '').trim())

let hasMissingRequired = false

for (const group of groups) {
  const missing = [
    ...(group.required ?? []).filter((name) => !present(name)),
    ...(group.needs ?? []).filter((name) => !present(name)),
  ]
  const missingOneOf = (group.oneOf ?? []).filter((options) => !options.some(present))

  if (missing.length || missingOneOf.length) hasMissingRequired = true

  console.log(`\n[${group.name}]`)
  for (const name of [...(group.required ?? []), ...(group.needs ?? []), ...(group.optional ?? [])]) {
    console.log(`${present(name) ? 'OK' : '--'} ${name}`)
  }
  for (const options of group.oneOf ?? []) {
    console.log(`${options.some(present) ? 'OK' : '--'} one of ${options.join(' / ')}`)
  }
}

if (hasMissingRequired) {
  console.error('\n[doppler] Missing required secrets for at least one integration.')
  process.exit(1)
}

console.log('\n[doppler] Required integration secrets are present.')
