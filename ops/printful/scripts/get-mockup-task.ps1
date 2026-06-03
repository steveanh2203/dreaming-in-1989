param(
  [Parameter(Mandatory = $true)]
  [string]$TaskId
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$printfulDir = Split-Path -Parent $scriptDir
$envPath = Join-Path $printfulDir '.env'

Get-Content $envPath | ForEach-Object {
  if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
  }
}

$headers = @{
  Authorization = "Bearer $env:PRINTFUL_API_TOKEN"
}

if ($env:PRINTFUL_STORE_ID) {
  $headers['X-PF-Store-Id'] = $env:PRINTFUL_STORE_ID
}

$response = Invoke-RestMethod -Uri "https://api.printful.com/v2/mockup-tasks?id=$TaskId" -Headers $headers -Method Get
$response | ConvertTo-Json -Depth 14
