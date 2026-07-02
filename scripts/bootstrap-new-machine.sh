#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHOP_DIR="$ROOT_DIR/shop-only"
DOPPLER_PROJECT="${DOPPLER_PROJECT:-dreaming-in-1989}"
DOPPLER_CONFIG="${DOPPLER_CONFIG:-dev}"

START_APP=1
PULL_ENV=0
SKIP_INSTALL=0

log() {
  printf '\n[start] %s\n' "$1"
}

die() {
  printf '\n[start] ERROR: %s\n' "$1" >&2
  exit 1
}

usage() {
  cat <<'EOF'
Usage:
  ./START [options]

Options:
  --setup-only    Install/setup dependencies and Doppler, but do not start dev servers.
  --pull-env      Also write shop-only/.env.local from Doppler. Avoid this on public PCs.
  --skip-install  Skip npm dependency installation.
  -h, --help      Show this help.

Environment overrides:
  DOPPLER_PROJECT=dreaming-in-1989
  DOPPLER_CONFIG=dev
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --setup-only)
      START_APP=0
      ;;
    --pull-env)
      PULL_ENV=1
      ;;
    --skip-install)
      SKIP_INSTALL=1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      die "Unknown option: $1"
      ;;
  esac
  shift
done

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

need_command() {
  local name="$1"
  local hint="$2"
  if ! command_exists "$name"; then
    die "$name is not installed. $hint"
  fi
}

install_doppler_if_needed() {
  if command_exists doppler; then
    return
  fi

  log "Doppler CLI is missing. Trying to install it."

  case "$(uname -s)" in
    Darwin)
      need_command brew "Install Homebrew first: https://brew.sh"
      brew install gnupg dopplerhq/cli/doppler
      ;;
    Linux)
      if command_exists brew; then
        brew install gnupg dopplerhq/cli/doppler
      else
        die "Automatic Doppler install is configured for macOS/Homebrew. Install Doppler CLI, then rerun ./START: https://docs.doppler.com/docs/install-cli"
      fi
      ;;
    MINGW*|MSYS*|CYGWIN*)
      die "Use PowerShell on Windows: .\\START.ps1"
      ;;
    *)
      die "Unsupported OS for automatic Doppler install. Install Doppler CLI, then rerun ./START."
      ;;
  esac
}

verify_node() {
  need_command node "Install Node.js 20+ first: https://nodejs.org"
  need_command npm "Install npm with Node.js 20+ first."

  local major
  major="$(node -p "process.versions.node.split('.')[0]")"
  if [ "$major" -lt 20 ]; then
    die "Node.js 20+ is required. Current version: $(node -v)"
  fi
}

doppler_login_if_needed() {
  if doppler me >/dev/null 2>&1; then
    return
  fi

  log "Doppler is installed but not logged in. Opening Doppler login."
  doppler login
}

doppler_setup_folder() {
  local dir="$1"
  log "Binding Doppler in ${dir#$ROOT_DIR/} -> project=$DOPPLER_PROJECT config=$DOPPLER_CONFIG"
  (
    cd "$dir"
    doppler setup --project "$DOPPLER_PROJECT" --config "$DOPPLER_CONFIG" --no-interactive
  )
}

install_dependencies() {
  if [ "$SKIP_INSTALL" -eq 1 ]; then
    log "Skipping npm dependency installation."
    return
  fi

  log "Installing shop dependencies."
  (
    cd "$SHOP_DIR"
    if [ -f package-lock.json ]; then
      npm ci
    else
      npm install
    fi
  )
}

verify_doppler_secrets() {
  log "Verifying required API secret names without printing secret values."
  (
    cd "$SHOP_DIR"
    npm run doppler:verify
  )
}

pull_env_if_requested() {
  if [ "$PULL_ENV" -ne 1 ]; then
    return
  fi

  log "Writing shop-only/.env.local from Doppler. Do not use --pull-env on public PCs."
  (
    cd "$SHOP_DIR"
    npm run env:pull
  )
}

start_app() {
  if [ "$START_APP" -ne 1 ]; then
    log "Setup complete. Start later with: cd shop-only && npm run dev:all:doppler"
    return
  fi

  log "Starting storefront and local API with Doppler-injected secrets."
  cd "$SHOP_DIR"
  exec npm run dev:all:doppler
}

main() {
  [ -d "$SHOP_DIR" ] || die "Cannot find shop-only app folder."

  log "Bootstrapping Dreaming in 1989 from $ROOT_DIR"
  verify_node
  install_doppler_if_needed
  doppler_login_if_needed
  doppler_setup_folder "$ROOT_DIR"
  doppler_setup_folder "$SHOP_DIR"
  install_dependencies
  verify_doppler_secrets
  pull_env_if_requested
  start_app
}

main
