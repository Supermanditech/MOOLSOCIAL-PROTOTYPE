# MoolSocial Retailer POS Module Lock

## Status

Approved architecture lock based on Screen 80.

## Scope

The POS interaction and transaction contract is shared across retailer workspaces. Grocery, general retail, medicine, food counter and later retail verticals reuse one POS module instead of building disconnected checkout systems.

## Core POS Contract

```text
workspace_id
outlet_id
counter_id
operator_id
order_id
customer_id or walk_in
line_items
price_and_tax_snapshot
inventory_reservations
payment_mode
payment_evidence
sale_completion_event
inventory_posting
business_book_posting
invoice_id
invoice_delivery_consent
invoice_delivery_channel
```

## Locked UX

```text
show counter and customer context once
make total payable the dominant decision
keep item lines available on demand
show only available payment modes
complete the sale once
post stock, sale, payment and invoice atomically
present a clean receipt result
offer consent-aware invoice delivery
```

## Vertical Adapters

Vertical adapters may add rules without replacing the core POS:

```text
medicine: licence, prescription and controlled-item rules
food counter: table, kitchen ticket and service-charge rules
weighted goods: measured quantity and final weight
returns: original invoice and return eligibility
credit sales: approved customer limit and due date
tax: vertical and jurisdiction-specific invoice fields
```

## Regression Rule

No retailer vertical may fork Screen 80 into an unrelated payment, receipt or accounting flow. Any shared improvement must update the POS module contract and pass all retailer vertical regression tests.
