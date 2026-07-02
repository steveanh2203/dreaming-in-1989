param(
  [switch]$SetupOnly,
  [switch]$PullEnv,
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ShopDir = Join-Path $RepoRoot "shop-only"
$DopplerProject = if ($env:DOPPLER_PROJECT) { $env:DOPPLER_PROJECT } else { "dreaming-in-1989" }
$DopplerConfig = if ($env:DOPPLER_CONFIG) { $env:DOPPLER_CONFIG } else { "dev" }

function Write-Step($Message) {
  Write-Host ""
  Write-Host "[start] $Message"
}

function Test-Command($Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Require-Command($Name, $Hint) {
  if (-not (Test-Command $Name)) {
    throw "$Name is not installed. $Hint"
  }
}

function Install-Doppler-IfNeeded {
  if (Test-Command "doppler") {
    return
  }

  Write-Step "Doppler CLI is missing. Trying to install it with winget."
  Require-Command "winget" "Install Doppler CLI manually, then rerun .\START.ps1: https://docs.doppler.com/docs/install-cli"
  winget install --id Doppler.doppler -e --accept-source-agreements --accept-package-agreements
  if ($LASTEXITCODE -ne 0) {
    throw "winget could not install Doppler CLI. Install it manually, then rerun .\START.ps1: https://docs.doppler.com/docs/install-cli"
  }

  if (-not (Test-Command "doppler")) {
    throw "Doppler installed but is not available in this terminal yet. Open a new PowerShell window and rerun .\START.ps1."
  }
}

function Verify-Node {
  Require-Command "node" "Install Node.js 20+ first: https://nodejs.org"
  Require-Command "npm" "Install npm with Node.js 20+ first."

  $major = [int](& node -p "process.versions.node.split('.')[0]")
  if ($major -lt 20) {
    $version = & node -v
    throw "Node.js 20+ is required. Current version: $version"
  }
}

function Doppler-Login-IfNeeded {
  & doppler me *> $null
  if ($LASTEXITCODE -eq 0) {
    return
  }

  Write-Step "Doppler is installed but not logged in. Opening Doppler login."
  & doppler login
}

function Doppler-Setup-Folder($Dir) {
  Write-Step "Binding Doppler in $Dir -> project=$DopplerProject config=$DopplerConfig"
  Push-Location $Dir
  try {
    & doppler setup --project $DopplerProject --config $DopplerConfig --no-interactive
  } finally {
    Pop-Location
  }
}

function Install-Dependencies {
  if ($SkipInstall) {
    Write-Step "Skipping npm dependency installation."
    return
  }

  Write-Step "Installing shop dependencies."
  Push-Location $ShopDir
  try {
    if (Test-Path "package-lock.json") {
      & npm ci
    } else {
      & npm install
    }
  } finally {
    Pop-Location
  }
}

function Verify-Doppler-Secrets {
  Write-Step "Verifying required API secret names without printing secret values."
  Push-Location $ShopDir
  try {
    & npm run doppler:verify
  } finally {
    Pop-Location
  }
}

function Pull-Env-IfRequested {
  if (-not $PullEnv) {
    return
  }

  Write-Step "Writing shop-only/.env.local from Doppler. Do not use -PullEnv on public PCs."
  Push-Location $ShopDir
  try {
    & npm run env:pull
  } finally {
    Pop-Location
  }
}

function Start-App {
  if ($SetupOnly) {
    Write-Step "Setup complete. Start later with: cd shop-only; npm run dev:all:doppler"
    return
  }

  Write-Step "Starting storefront and local API with Doppler-injected secrets."
  Set-Location $ShopDir
  & npm run dev:all:doppler
}

if (-not (Test-Path $ShopDir)) {
  throw "Cannot find shop-only app folder."
}

Write-Step "Bootstrapping Dreaming in 1989 from $RepoRoot"
Verify-Node
Install-Doppler-IfNeeded
Doppler-Login-IfNeeded
Doppler-Setup-Folder $RepoRoot
Doppler-Setup-Folder $ShopDir
Install-Dependencies
Verify-Doppler-Secrets
Pull-Env-IfRequested
Start-App
