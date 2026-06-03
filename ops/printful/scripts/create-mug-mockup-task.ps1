param(
  [string]$ArtworkUrl = $env:PRINTFUL_MUG_ARTWORK_URL
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$printfulDir = Split-Path -Parent $scriptDir
$envPath = Join-Path $printfulDir '.env'

if (-not (Test-Path $envPath)) {
  throw "Missing $envPath. Copy .env.example to .env and add PRINTFUL_API_TOKEN."
}

Get-Content $envPath | ForEach-Object {
  if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
  }
}

if (-not $env:PRINTFUL_API_TOKEN) {
  throw 'PRINTFUL_API_TOKEN is not set.'
}

if (-not $ArtworkUrl) {
  throw 'Artwork URL is missing. Pass -ArtworkUrl "https://..." or set PRINTFUL_MUG_ARTWORK_URL.'
}

$headers = @{
  Authorization = "Bearer $env:PRINTFUL_API_TOKEN"
  'Content-Type' = 'application/json'
}

if ($env:PRINTFUL_STORE_ID) {
  $headers['X-PF-Store-Id'] = $env:PRINTFUL_STORE_ID
}

$body = @{
  format = 'jpg'
  mockup_width_px = 1200
  products = @(
    @{
      source = 'catalog'
      catalog_product_id = 19
      catalog_variant_ids = @(1320)
      mockup_style_ids = @(10423, 10421, 10422)
      orientation = 'horizontal'
      placements = @(
        @{
          placement = 'default'
          technique = 'sublimation'
          print_area_type = 'simple'
          layers = @(
            @{
              type = 'file'
              url = $ArtworkUrl
              position = @{
                width = 9.0
                height = 3.5
                top = 0
                left = 0
              }
            }
          )
        }
      )
    }
  )
} | ConvertTo-Json -Depth 12

$response = Invoke-RestMethod -Uri 'https://api.printful.com/v2/mockup-tasks' -Headers $headers -Method Post -Body $body
$response | ConvertTo-Json -Depth 12
