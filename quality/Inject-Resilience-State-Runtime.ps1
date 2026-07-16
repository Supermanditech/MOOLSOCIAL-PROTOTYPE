param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$version = 'micro-cycle-2-20260716c'
$snippet = "  <script src=`"../shared/resilience-state-runtime.js?v=$version`"></script>"
$runtimePattern = '[ \t]*<script src="[.][.]/shared/resilience-state-runtime[.]js[^"]*"></script>\r?\n?'
$contractPattern = '<script src="[.][.]/shared/prototype-interaction-contracts[.]js[^"]*"></script>'
$updated = 0

foreach ($relativeRoot in @('screens', 'approved-final\screens')) {
  $screenRoot = Join-Path $Root $relativeRoot
    $files = @(Get-ChildItem -LiteralPath $screenRoot -File -Filter '*.html' | Where-Object { $_.Name -match '^\d{2,3}-' })
  foreach ($file in $files) {
    $html = [IO.File]::ReadAllText($file.FullName)
    $withoutRuntime = [regex]::Replace($html, $runtimePattern, '')
    if ($withoutRuntime -match $contractPattern) {
      $html = [regex]::Replace(
        $withoutRuntime,
        $contractPattern,
        $snippet + [Environment]::NewLine + '$0',
        1
      )
    } else {
      if ($withoutRuntime -notmatch '</body>') { throw "Screen has no body close: $($file.FullName)" }
      $replacement = $snippet + [Environment]::NewLine + '</body>'
      $html = $withoutRuntime -replace '</body>', $replacement
    }
    if ($html -eq [IO.File]::ReadAllText($file.FullName)) { continue }
    [IO.File]::WriteAllText($file.FullName, $html, [Text.UTF8Encoding]::new($false))
    $updated += 1
  }
}

Write-Output "Injected resilience-state runtime into $updated source and approved screen files."
