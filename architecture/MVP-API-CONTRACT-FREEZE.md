# MVP API Contract Freeze

Date: 2026-07-14
Status: frozen for production planning

Contracts:

- `contracts/openapi/moolsocial-mvp-v1.yaml`
- `contracts/events/moolsocial-events-v1.yaml`
- `contracts/webhooks/webhook-contract-v1.json`
- `contracts/mocks/mvp-integration-mocks.json`

## Contract boundary

The API follows the approved production routes and state machines. Mobile, responsive web, admin and backend teams may be implemented independently against these contracts. A client requests a command and renders the returned authoritative state; it does not manufacture a successful order, payment, ride, proof, earning, payout or verification result.

## Writes and conflicts

Every state-changing request carries `Idempotency-Key`. Repeating the same logical command returns the original result. Commands that depend on current state also carry the expected aggregate or offer version. A stale version, exhausted capacity or invalid transition returns a stable `409` problem response and the recovery action.

Errors use `application/problem+json` with a machine code, safe title, trace ID, retryability and field-level issues where applicable. Internal stack text is never a user-facing error.

## Read pagination and freshness

Feeds, catalogues, work opportunities, chats and ledgers use opaque cursor pagination. Catalogue decisions and other expiring records include a version and freshness limit. Clients must revalidate stale data before commitment.

## Events and webhooks

Cross-capability changes use versioned event names and a common envelope containing event ID, aggregate ID and version, actor, workspace, policy version and tracing references. Consumers deduplicate by event ID and order mutations by aggregate version.

Webhook retries retain the same event ID. Receivers verify the signature over the raw body, store the event ID before applying side effects, and return success for a safely processed duplicate.

## Integration mocks

Mocks cover ready, empty, partial, offline, timeout, validation, stale and duplicate responses. Payment, location, identity, notification and media mocks include delayed, failed, repeated and out-of-order outcomes. Production acceptance cannot rely on an integration that always succeeds immediately.

## Compatibility rule

Additive optional fields are backward compatible. Removing or changing meaning, requiredness, enum behavior, money units, idempotency semantics or state transitions requires a versioned contract and migration plan. Contract tests run before client or server deployment.

This API freeze intentionally does not define the separately deferred domain/database architecture, security/compliance program or production ticket breakdown.
