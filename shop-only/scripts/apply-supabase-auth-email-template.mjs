import { Buffer } from 'node:buffer'
import console from 'node:console'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const defaultTemplatePath = path.resolve(__dirname, '../server/supabase-auth-templates/confirm-signup.html')
const dryRun = process.argv.includes('--dry-run')
const templateArg = process.argv.slice(2).find((arg) => !arg.startsWith('--'))
const templatePath = path.resolve(templateArg || defaultTemplatePath)

const env = (name) => String(process.env[name] ?? '').trim()

const deriveProjectRef = () => {
  const explicitRef = env('SUPABASE_PROJECT_REF') || env('PROJECT_REF')
  if (explicitRef) return explicitRef

  const supabaseUrl = env('VITE_SUPABASE_URL')
  const match = supabaseUrl.match(/^https:\/\/([a-z0-9-]+)\.supabase\.co\/?$/i)
  return match?.[1] ?? ''
}

const accessToken = env('SUPABASE_ACCESS_TOKEN')
const projectRef = deriveProjectRef()

if (!accessToken || !projectRef) {
  console.error('[supabase-auth-email] Cannot apply the template yet.')
  if (!accessToken) console.error('- Missing SUPABASE_ACCESS_TOKEN in Doppler.')
  if (!projectRef) console.error('- Missing SUPABASE_PROJECT_REF or a VITE_SUPABASE_URL ending in .supabase.co.')
  console.error('\nAdd those secrets, then run:')
  console.error('  npm run supabase:auth-email:apply')
  process.exit(1)
}

const html = await readFile(templatePath, 'utf8')

const payload = {
  mailer_subjects_confirmation: 'Confirm your Dreaming in 1989 account',
  mailer_templates_confirmation_content: html,
}

if (dryRun) {
  console.log('[supabase-auth-email] Dry run OK.')
  console.log(`- Project ref: ${projectRef}`)
  console.log(`- Template: ${templatePath}`)
  console.log(`- HTML bytes: ${Buffer.byteLength(html, 'utf8')}`)
  process.exit(0)
}

const response = await globalThis.fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})

if (!response.ok) {
  const detail = await response.text()
  console.error(`[supabase-auth-email] Supabase Management API returned ${response.status}.`)
  console.error(detail)
  process.exit(1)
}

console.log('[supabase-auth-email] Confirmation email template applied.')
console.log(`- Project ref: ${projectRef}`)
console.log(`- Template: ${templatePath}`)
