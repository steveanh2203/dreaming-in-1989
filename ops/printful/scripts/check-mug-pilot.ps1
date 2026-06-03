$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$printfulDir = Split-Path -Parent $scriptDir
$repoRoot = Split-Path -Parent (Split-Path -Parent $printfulDir)
$envPath = Join-Path $printfulDir '.env'
$mappingPath = Join-Path $printfulDir 'product-mapping.json'

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

$headers = @{
  Authorization = "Bearer $env:PRINTFUL_API_TOKEN"
}

if ($env:PRINTFUL_STORE_ID) {
  $headers['X-PF-Store-Id'] = $env:PRINTFUL_STORE_ID
}

$mapping = Get-Content $mappingPath | ConvertFrom-Json
$mug = $mapping.products | Where-Object { $_.localProductId -eq 'diner-counter-mug' } | Select-Object -First 1

if (-not $mug) {
  throw 'No diner-counter-mug mapping found.'
}

$catalogProductId = $mug.printfulCandidate.catalogProductId
$prices = Invoke-RestMethod -Uri "https://api.printful.com/v2/catalog-products/$catalogProductId/prices" -Headers $headers -Method Get
$availability = Invoke-RestMethod -Uri "https://api.printful.com/v2/catalog-products/$catalogProductId/availability" -Headers $headers -Method Get

$priceMap = @{}
foreach ($variantPrice in $prices.data.variants) {
  $priceMap[[string]$variantPrice.id] = $variantPrice.techniques[0].discounted_price
}

$availabilityMap = @{}
foreach ($variantAvailability in $availability.data) {
  $availabilityMap[[string]$variantAvailability.catalog_variant_id] = (
    $variantAvailability.techniques[0].selling_regions |
      ForEach-Object { "$($_.name): $($_.availability)" }
  ) -join '; '
}

"Mug pilot check"
"Store: $($mapping.store.name) ($($mapping.store.id))"
"Product: $($mug.storefrontName)"
"Catalog: $($mug.printfulCandidate.name) [$catalogProductId]"
""

foreach ($variant in $mug.variants) {
  $variantId = [string]$variant.catalogVariantId
  $price = $priceMap[$variantId]
  $status = $availabilityMap[$variantId]
  $optionSummary = ($variant.localOptions.PSObject.Properties | ForEach-Object { "$($_.Name)=$($_.Value)" }) -join ', '

  [PSCustomObject]@{
    LocalVariant = $variant.localVariantId
    Options = $optionSummary
    CatalogVariantId = $variantId
    PrintfulCost = $price
    StorefrontPrice = ('{0:0.00}' -f [decimal]$variant.storefrontPrice)
    Availability = $status
    LocalStatus = $variant.status
  }
}
