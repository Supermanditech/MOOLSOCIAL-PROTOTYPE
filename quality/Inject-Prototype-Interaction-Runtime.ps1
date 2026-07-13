param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$backlog = Get-Content -Raw -LiteralPath (Join-Path $Root 'quality\generated\flow-interaction-backlog.json') | ConvertFrom-Json
$files = @($backlog.tickets | Select-Object -ExpandProperty file -Unique)
$snippet = @'
  <script src="../shared/prototype-interaction-contracts.js"></script>
  <script src="../shared/prototype-interaction-runtime.js"></script>
'@

foreach ($relativeRoot in @('screens', 'approved-final\screens')) {
  foreach ($file in $files) {
    $path = Join-Path (Join-Path $Root $relativeRoot) $file
    if (-not (Test-Path -LiteralPath $path)) { throw "Missing screen for interaction runtime: $path" }
    $html = [IO.File]::ReadAllText($path)
    if ($html -match 'prototype-interaction-runtime[.]js') { continue }
    if ($html -notmatch '</body>') { throw "Screen has no body close: $path" }
    $html = $html -replace '</body>', "$snippet`r`n</body>"
    [IO.File]::WriteAllText($path, $html, [Text.UTF8Encoding]::new($false))
  }
}

Write-Output "Injected the explicit interaction runtime into $($files.Count) source and approved screens."
