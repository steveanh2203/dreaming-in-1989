# Doppler Setup

Secrets for this repo live in Doppler.

Project:

```text
dreaming-in-1989
```

Default local config:

```text
dev
```

## New Machine Setup

Fast path:

```bash
./START
```

On Windows PowerShell:

```powershell
.\START.ps1
```

Use `./START --setup-only` if you only want to prepare the machine without
starting the local dev servers.

Manual setup:

Install Doppler CLI:

```bash
brew install gnupg dopplerhq/cli/doppler
```

Login:

```bash
doppler login
```

Clone repo, then bind this folder to the Doppler project:

```bash
cd dreaming-in-1989
doppler setup --project dreaming-in-1989 --config dev --no-interactive
cd shop-only
doppler setup --project dreaming-in-1989 --config dev --no-interactive
npm install
```

Run the frontend with secrets injected:

```bash
npm run dev:doppler
```

Run the local API server with secrets injected:

```bash
npm run dev:api:doppler
```

Run the storefront and API server together with secrets injected:

```bash
npm run dev:all:doppler
```

Verify required integration secret names are present without printing secret values:

```bash
npm run doppler:verify
```

Apply the branded Supabase Auth confirmation email template:

```bash
npm run supabase:auth-smtp:apply
npm run supabase:auth-email:apply
```

The SMTP command configures Supabase Auth to send through Resend. The email
template command updates the hosted Supabase Auth "Confirm sign up" email
template from `shop-only/server/supabase-auth-templates/confirm-signup.html`.

Check integration wiring while the API server is running:

```bash
curl http://127.0.0.1:5173/api/integrations/status
```

Optional: pull secrets into a local `.env.local` file:

```bash
npm run env:pull
```

Avoid writing `.env.local` on public PCs. Prefer `npm run dev:all:doppler`
because secrets stay injected through Doppler at runtime.

## Secret Names

Browser-safe values:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_PAYPAL_CLIENT_ID
VITE_PAYPAL_ENV
VITE_GA4_MEASUREMENT_ID
```

Server-only values:

```text
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_ACCESS_TOKEN
SUPABASE_PROJECT_REF
PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET
PAYPAL_ENV
PAYPAL_WEBHOOK_ID
PRINTFUL_API_TOKEN
PRINTFUL_STORE_ID
RESEND_API_KEY
RESEND_FROM_EMAIL
SUPPORT_EMAIL
```

`SUPABASE_ACCESS_TOKEN` and `SUPABASE_PROJECT_REF` are only needed for project
management tasks such as applying hosted Supabase Auth email templates. They are
not browser secrets. If `SUPABASE_PROJECT_REF` is omitted, the apply script can
derive it from `VITE_SUPABASE_URL` when the URL is the standard
`https://<project-ref>.supabase.co` format.

If you do not want to use a Supabase access token, copy the HTML from
`shop-only/server/supabase-auth-templates/confirm-signup.html` into Supabase
Dashboard > Authentication > Email Templates > Confirm sign up, then set the
subject to:

```text
Confirm your Dreaming in 1989 account
```

To send Supabase Auth messages through the Resend domain instead of the default
`noreply@mail.app.supabase.io`, configure Supabase Auth custom SMTP with Resend
SMTP credentials in the Supabase dashboard or run:

```bash
npm run supabase:auth-smtp:apply
```

## Rules

- Do not commit `.env.local`.
- Do not paste API keys into GitHub.
- Doppler is the source of truth for local secrets.
- Use `dev` for local sandbox work.
- Use `prd` only for production deploy secrets.
