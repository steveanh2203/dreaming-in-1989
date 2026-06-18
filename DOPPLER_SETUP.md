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

Optional: pull secrets into a local `.env.local` file:

```bash
npm run env:pull
```

## Rules

- Do not commit `.env.local`.
- Do not paste API keys into GitHub.
- Doppler is the source of truth for local secrets.
- Use `dev` for local sandbox work.
- Use `prd` only for production deploy secrets.
