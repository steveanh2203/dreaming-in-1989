# Dreaming in 1989

Retro American 80s/90s nostalgia storefront and product workflow.

## START on a new machine

After cloning the repo, run one command from the repo root:

```bash
./START
```

On Windows PowerShell:

```powershell
.\START.ps1
```

`START` will:

- verify Node.js 20+ and npm
- install Doppler CLI when supported by the OS package manager
- run `doppler login` if needed
- bind this repo and `shop-only` to Doppler project `dreaming-in-1989`, config `dev`
- install `shop-only` npm dependencies
- verify required API secret names without printing secret values
- start the storefront and local API with Doppler-injected secrets

Useful variants:

```bash
./START --setup-only
./START --skip-install
./START --pull-env
```

Avoid `--pull-env` on public PCs. Default runtime uses `doppler run` instead of writing secrets to disk.

## Primary app

```bash
cd shop-only
npm run dev:all:doppler
```

Frontend runs on Vite. Local API runs from `shop-only/server/auth-server.js`.

## Projects

- `shop-only` - primary storefront app.
- `awesome-design-md` - design reference material used during ideation.
