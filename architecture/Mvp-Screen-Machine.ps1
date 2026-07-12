param(
  [ValidateSet('Validate','Register','Approve','ValidateWorkspace')]
  [string]$Action = 'Validate',
  [string]$Root = (Split-Path -Parent $PSScriptRoot),
  [int]$Screen = -1,
  [string]$File,
  [string]$Name,
  [string]$Module,
  [string]$BudgetBucket,
  [string]$RouteId,
  [string]$RoutePath,
  [string]$RouteState,
  [ValidateSet('route-shell','route-state','embedded-panel','external-surface','reference-only')]
  [string]$Implementation = 'route-shell',
  [ValidateSet('mvp-core','mvp-conditional','post-mvp','superseded-do-not-implement')]
  [string]$LaunchScope = 'mvp-core',
  [string]$PainSolved,
  [string[]]$CapabilityKey = @(),
  [string[]]$FeatureOutcome = @(),
  [switch]$AllowBudgetExtension,
  [string]$ExtensionReason
)

$ErrorActionPreference = 'Stop'
$routeMapPath = Join-Path $Root 'shared\production-route-map.json'
$approvedRouteMapPath = Join-Path $Root 'approved-final\shared\production-route-map.json'
$budgetPath = Join-Path $Root 'shared\mvp-route-budget.json'
$approvalRegistryPath = Join-Path $Root 'shared\prototype-approval-registry.json'

function Read-Json([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) { throw "Missing required file: $Path" }
  return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
}

function Write-Json([string]$Path, $Value) {
  $Value | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Get-LaunchRouteIds($Contracts) {
  return @($Contracts | Where-Object {
    $_.launchScope -in @('mvp-core','mvp-conditional') -and $_.implementation -ne 'reference-only'
  } | Select-Object -ExpandProperty routeId -Unique)
}

function Rebuild-Routes($Contracts) {
  return @($Contracts | Group-Object -Property routeId | ForEach-Object {
    $first = $_.Group[0]
    [pscustomobject][ordered]@{
      routeId = $_.Name
      routePath = $first.routePath
      productionModule = $first.productionModule
      prototypeScreens = @($_.Group | ForEach-Object { [int]$_.prototypeScreen } | Sort-Object)
      routeStates = @($_.Group | ForEach-Object { $_.routeState })
      launchScopes = @($_.Group | ForEach-Object { $_.launchScope } | Sort-Object -Unique)
      budgetBuckets = @($_.Group | ForEach-Object { $_.budgetBucket } | Where-Object { $_ } | Sort-Object -Unique)
    }
  })
}

function Set-EmbeddedJsonContract([string]$HtmlPath, [string]$Id, $Contract) {
  $html = Get-Content -LiteralPath $HtmlPath -Raw
  $json = $Contract | ConvertTo-Json -Compress -Depth 8
  $tag = "<script type=`"application/json`" id=`"$Id`">$json</script>"
  $pattern = "<script type=[`"']application/json[`"'] id=[`"']$Id[`"']>.*?</script>"
  if ($html -match "id=[`"']$Id[`"']") {
    $html = [regex]::Replace($html, $pattern, $tag, 'Singleline')
  } elseif ($html -match '</body>') {
    $html = $html -replace '</body>', "$tag</body>"
  } else {
    throw "No closing body tag in $HtmlPath"
  }
  Set-Content -LiteralPath $HtmlPath -Value $html -Encoding utf8 -NoNewline
}

function Validate-Machine($Registry, $Budget) {
  $issues = [System.Collections.Generic.List[string]]::new()
  $contracts = @($Registry.screenContracts)

  if (@($contracts.prototypeScreen | Sort-Object -Unique).Count -ne $contracts.Count) {
    $issues.Add('Prototype screen numbers are not unique.')
  }

  foreach ($group in ($contracts | Group-Object routeId)) {
    $paths = @($group.Group.routePath | Sort-Object -Unique)
    if ($paths.Count -ne 1) { $issues.Add("Route $($group.Name) maps to multiple paths: $($paths -join ', ')") }
    $states = @($group.Group.routeState)
    if (@($states | Sort-Object -Unique).Count -ne $states.Count) { $issues.Add("Route $($group.Name) repeats a route state.") }
    $shells = @($group.Group | Where-Object { $_.implementation -eq 'route-shell' })
    if ($shells.Count -gt 1) { $issues.Add("Route $($group.Name) has more than one route shell.") }
  }

  $launchRouteIds = Get-LaunchRouteIds $contracts
  $baselineOverage = [Math]::Max(0, $launchRouteIds.Count - [int]$Budget.routeCeiling)
  if ($baselineOverage -gt 0) {
    if ([bool]$Budget.hardCeilingEnforced) {
      $issues.Add("Launch route ceiling exceeded: $($launchRouteIds.Count) / $($Budget.routeCeiling).")
    } else {
      $extensionRoutes = @($contracts | Where-Object {
        $_.launchScope -in @('mvp-core','mvp-conditional') -and $_.budgetExtension -eq $true -and -not [string]::IsNullOrWhiteSpace([string]$_.budgetExtensionReason)
      } | Select-Object -ExpandProperty routeId -Unique).Count
      if ($extensionRoutes -lt $baselineOverage) {
        $issues.Add("Route baseline exceeded by $baselineOverage but only $extensionRoutes controlled extension routes are documented.")
      }
    }
  }

  $allocationTotal = [int](($Budget.allocations | Measure-Object -Property routeAllowance -Sum).Sum)
  if ($allocationTotal -ne [int]$Budget.remainingRouteCapacity) {
    $issues.Add("Workspace allocations total $allocationTotal but remaining capacity is $($Budget.remainingRouteCapacity).")
  }

  foreach ($allocation in $Budget.allocations) {
    $used = @($contracts | Where-Object {
      $_.budgetBucket -eq $allocation.budgetBucket -and $_.launchScope -in @('mvp-core','mvp-conditional')
    } | Select-Object -ExpandProperty routeId -Unique).Count
    if ($used -gt [int]$allocation.routeAllowance) {
      $bucketOverage = $used - [int]$allocation.routeAllowance
      $bucketExtensions = @($contracts | Where-Object {
        $_.budgetBucket -eq $allocation.budgetBucket -and $_.launchScope -in @('mvp-core','mvp-conditional') -and $_.budgetExtension -eq $true -and -not [string]::IsNullOrWhiteSpace([string]$_.budgetExtensionReason)
      } | Select-Object -ExpandProperty routeId -Unique).Count
      if ($bucketExtensions -lt $bucketOverage) {
        $issues.Add("Budget bucket $($allocation.budgetBucket) exceeded by $bucketOverage without enough documented extension routes.")
      }
    }
  }

  if ($issues.Count) { throw ($issues -join [Environment]::NewLine) }

  return [pscustomobject]@{
    PrototypeScreens = $contracts.Count
    RouteGroups = @($contracts.routeId | Sort-Object -Unique).Count
    LaunchRoutesUsed = $launchRouteIds.Count
    LaunchRouteBaseline = [int]$Budget.routeCeiling
    LaunchRoutesRemaining = [int]$Budget.routeCeiling - $launchRouteIds.Count
    BaselineOverage = $baselineOverage
  }
}

$registry = Read-Json $routeMapPath
$budget = Read-Json $budgetPath

if ($Action -eq 'Register') {
  if ($Screen -lt 0 -or -not $File -or -not $Name -or -not $Module -or -not $RouteId -or -not $RoutePath -or -not $RouteState) {
    throw 'Register requires Screen, File, Name, Module, RouteId, RoutePath and RouteState.'
  }
  if (-not $PainSolved.Trim() -or $FeatureOutcome.Count -eq 0) {
    throw 'Register requires PainSolved and at least one FeatureOutcome.'
  }

  $screenPath = Join-Path (Join-Path $Root 'screens') $File
  if (-not (Test-Path -LiteralPath $screenPath)) { throw "Prototype file does not exist: $screenPath" }
  if ($File -notlike ((('{0:D2}' -f $Screen)) + '-*.html')) { throw 'File name must start with the screen number.' }
  if (@($registry.screenContracts | Where-Object { [int]$_.prototypeScreen -eq $Screen }).Count) { throw "Screen $Screen is already registered." }

  $existingRoute = @($registry.screenContracts | Where-Object { $_.routeId -eq $RouteId })
  if ($existingRoute.Count) {
    if (@($existingRoute.routePath | Sort-Object -Unique).Count -ne 1 -or $existingRoute[0].routePath -ne $RoutePath) {
      throw "Route ID $RouteId already owns $($existingRoute[0].routePath), not $RoutePath."
    }
    if ($Implementation -eq 'route-shell') { throw "Route ID $RouteId already exists. Register this prototype as route-state or embedded-panel." }
  } elseif ($Implementation -in @('route-state','embedded-panel')) {
    throw "$Implementation requires an existing routeId. Register its route-shell first."
  }

  if (@($registry.screenContracts | Where-Object { $_.routeId -eq $RouteId -and $_.routeState -eq $RouteState }).Count) {
    throw "Route state $RouteState already exists in $RouteId."
  }

  $isNewLaunchRoute = $existingRoute.Count -eq 0 -and $LaunchScope -in @('mvp-core','mvp-conditional')
  if ($LaunchScope -in @('mvp-core','mvp-conditional')) {
    $capabilityAllocation = @($budget.allocations | Where-Object { $_.budgetBucket -eq $BudgetBucket })
    if ($capabilityAllocation.Count -ne 1) { throw 'Every future launch screen requires a valid BudgetBucket.' }
    if ($CapabilityKey.Count -eq 0) { throw 'Every future launch screen requires at least one CapabilityKey.' }
    $invalidCapability = @($CapabilityKey | Where-Object { $_ -notin @($capabilityAllocation[0].capabilityKeys) })
    if ($invalidCapability.Count) { throw "Invalid capability keys for ${BudgetBucket}: $($invalidCapability -join ', ')" }
  }
  $budgetExtension = $false
  if ($isNewLaunchRoute) {
    $allocation = @($budget.allocations | Where-Object { $_.budgetBucket -eq $BudgetBucket })
    if ($allocation.Count -ne 1) { throw 'A new launch route requires a valid BudgetBucket.' }
    $usedInBucket = @($registry.screenContracts | Where-Object {
      $_.budgetBucket -eq $BudgetBucket -and $_.launchScope -in @('mvp-core','mvp-conditional')
    } | Select-Object -ExpandProperty routeId -Unique).Count
    $launchUsed = @(Get-LaunchRouteIds $registry.screenContracts).Count
    $needsExtension = $usedInBucket -ge [int]$allocation[0].routeAllowance -or $launchUsed -ge [int]$budget.routeCeiling
    if ($needsExtension) {
      if (-not [bool]$budget.controlledExtensionAllowed) { throw 'Controlled route extensions are disabled.' }
      if (-not $AllowBudgetExtension -or [string]::IsNullOrWhiteSpace($ExtensionReason)) {
        throw "Route planning allowance reached. Re-run with -AllowBudgetExtension and a written -ExtensionReason."
      }
      $budgetExtension = $true
    }
  }

  $note = switch ($Implementation) {
    'route-shell' { "Own production route $RoutePath and keep all progressive states inside it." }
    'route-state' { "Do not create a route. Implement $RouteState inside $RoutePath." }
    'embedded-panel' { "Do not create a route. Render $RouteState on demand inside $RoutePath." }
    'external-surface' { "Implement outside the authenticated router and preserve the handoff to $RoutePath." }
    'reference-only' { 'Do not implement. This prototype remains decision evidence only.' }
  }

  $contract = [pscustomobject][ordered]@{
    contractVersion = 'mvp-route-machine-flex-2026-07-12'
    prototypeScreen = $Screen
    prototypeName = $Name
    productionModule = $Module
    budgetBucket = $BudgetBucket
    routeId = $RouteId
    routePath = $RoutePath
    routeState = $RouteState
    implementation = $Implementation
    launchScope = $LaunchScope
    separateProductionRoute = ($Implementation -eq 'route-shell')
    painSolved = $PainSolved
    capabilityKeys = @($CapabilityKey)
    featureOutcomes = @($FeatureOutcome)
    budgetExtension = $budgetExtension
    budgetExtensionReason = if ($budgetExtension) { $ExtensionReason.Trim() } else { $null }
    productionNote = $note
    canonicalMap = 'architecture/MVP-120-ROUTE-MACHINE.md'
  }

  $registry.screenContracts = @($registry.screenContracts) + $contract
  $registry.prototypeScreenCount = @($registry.screenContracts).Count
  $registry.routes = Rebuild-Routes $registry.screenContracts
  $registry.productionRouteGroupCount = @($registry.routes).Count
  $registry.contractVersion = 'mvp-route-machine-flex-2026-07-12'
  Set-EmbeddedJsonContract $screenPath 'productionRouteContract' $contract
  Set-EmbeddedJsonContract $screenPath 'prototypeApprovalContract' ([pscustomobject][ordered]@{
    prototypeScreen = $Screen
    status = 'draft-until-user-approval'
    authoritative = $true
    approvedAt = $null
  })
  Write-Json $routeMapPath $registry
}

if ($Action -eq 'Approve') {
  if ($Screen -lt 0) { throw 'Approve requires Screen.' }
  $contract = @($registry.screenContracts | Where-Object { [int]$_.prototypeScreen -eq $Screen })
  if ($contract.Count -ne 1) { throw "Screen $Screen is not registered exactly once." }
  $prefix = '{0:D2}' -f $Screen
  $source = Get-ChildItem -LiteralPath (Join-Path $Root 'screens') -Filter "$prefix-*.html" | Select-Object -First 1
  if (-not $source) { throw "Source screen $Screen is missing." }
  $approval = [pscustomobject][ordered]@{
    prototypeScreen = $Screen
    status = 'approved-and-frozen'
    authoritative = $true
    approvedAt = (Get-Date).ToString('yyyy-MM-dd')
  }
  Set-EmbeddedJsonContract $source.FullName 'prototypeApprovalContract' $approval
  Copy-Item -LiteralPath $source.FullName -Destination (Join-Path (Join-Path $Root 'approved-final\screens') $source.Name) -Force

  $approvalRegistry = if (Test-Path $approvalRegistryPath) { Read-Json $approvalRegistryPath } else { [pscustomobject]@{ version='1'; approvals=@() } }
  $approvalRegistry.approvals = @($approvalRegistry.approvals | Where-Object { [int]$_.prototypeScreen -ne $Screen }) + $approval
  Write-Json $approvalRegistryPath $approvalRegistry
  Write-Json (Join-Path $Root 'approved-final\shared\prototype-approval-registry.json') $approvalRegistry
  Copy-Item -LiteralPath $routeMapPath -Destination $approvedRouteMapPath -Force
}

$result = Validate-Machine $registry $budget
$result | Format-List

if ($Action -eq 'ValidateWorkspace') {
  $allocation = @($budget.allocations | Where-Object { $_.budgetBucket -eq $BudgetBucket })
  if ($allocation.Count -ne 1) { throw 'ValidateWorkspace requires a valid BudgetBucket.' }
  $workspaceContracts = @($registry.screenContracts | Where-Object { $_.budgetBucket -eq $BudgetBucket })
  $covered = @($workspaceContracts | ForEach-Object { $_.capabilityKeys } | Where-Object { $_ } | Sort-Object -Unique)
  $missing = @($allocation[0].capabilityKeys | Where-Object { $_ -notin $covered })
  if ($missing.Count) { throw "Workspace $BudgetBucket is incomplete. Missing capability keys: $($missing -join ', ')" }
  [pscustomobject]@{ BudgetBucket=$BudgetBucket; RoutesUsed=@($workspaceContracts.routeId|Sort-Object -Unique).Count; RouteAllowance=[int]$allocation[0].routeAllowance; CapabilityKeysCovered=$covered.Count; CapabilityKeysRequired=@($allocation[0].capabilityKeys).Count; Status='complete' } | Format-List
}
