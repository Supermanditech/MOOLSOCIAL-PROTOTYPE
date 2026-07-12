# Manufacturer / Supplier Workspace MVP Lock

Date: 12 July 2026

## Purpose

The manufacturer and supplier workspace is the verified B2B supply side that fulfils retailer Wholesale Buy demand. It is not a supplier directory and not a passive product-listing marketplace.

Every workspace owner remains a personal MoolSocial consumer and social user. The Mool control returns to that personal layer in one tap.

## Two-Sided Operating Model

Sell side:

- finished products and canonical SKUs
- source price, MOQ and commercial terms
- buyer demand and procurement pools
- buyer orders, availability and production commitment
- dispatch, transport choice and delivery proof
- receivables, protected advances and tax documents

Buy side:

- raw material
- packaging
- machinery, tools and operational services
- supplier comparison and input procurement
- inward delivery, claims and purchase records

## Workspace Navigation

`Mool | Orders | Stock | Wholesale Buy | Chat`

- Mool returns to the personal/social super-app.
- Orders contains incoming customer orders and their progressive confirmation, production commitment, dispatch, invoice and receivable states.
- Stock contains the products the business makes or sells, including catalogue, batches, available quantity, commercial terms and production capacity.
- Wholesale Buy contains inward buying from suppliers for raw material, packaging and operating requirements, including purchase orders and inward receipt.
- Chat contains buyers, input suppliers, transport, order and MoolSocial support conversations.

The workspace name in the header returns to the operating home. Do not add a second Home tab.

## Stock And Accounting Boundary

Stock is the manufacturer's saleable availability layer. It contains finished products, SKU, batch, available quantity, reserved quantity, MOQ, selling price, production capacity and buyer-facing commercial terms. Verified availability is what retailers, hotels, restaurants and distributors can order.

Stock is not a substitute for accounting. Manufacturer Business Book is a separate operating module opened from the workspace header/home and must cover:

- sales register and GST invoices
- purchase register and supplier bills
- receivables and payables
- protected advance and payment release
- credit/debit notes and returns
- cash, bank, expenses and reconciliation
- GST-ready exports and document archive

## Product-To-Input Resolver

Do not decide input requirements from free text or from the broad word `manufacturer`.

1. Workspace onboarding records the verified industry, value-chain role, product family, GST/HSN activity and operating locations.
2. The manufacturer creates the saleable catalogue from the MoolSocial master catalogue, CSV upload, barcode/pack scan or a reviewed new product.
3. Every saleable SKU records product class, brand, pack, unit, HSN, MOQ, available quantity, price and buyer terms.
4. The platform proposes a standard input template for the confirmed product class: raw material, grade, packaging, labels and common operating inputs.
5. The manufacturer confirms, removes or edits every proposed input. Formulation, recipe, grade and packaging assumptions must never be treated as final automatically.
6. Wholesale Buy ranks only the confirmed input categories, while retaining an explicit Browse All option.

The first MVP taxonomy targets FMCG manufacturing and its input value chain. Later industries extend the registry without changing the workspace route or navigation.

## Route Consolidation Target

The workspace should target 12 production routes and may use up to the 16-route planning allowance:

1. operating home
2. products, saleable stock and commercial terms
3. buyer orders and order detail states
4. availability, stock and production capacity
5. dispatch, transport and delivery proof
6. input procurement and purchase order states
7. Business Book: sales, purchases, receivables, payables and protected advances
8. GST documents, reconciliation, credit notes and claims
9. buyer and source relationships
10. campaigns and demand pools
11. analytics and forecasting
12. settings, staff, security and support

Additional prototype states should reuse these routes. A new route above the planning allowance requires the controlled extension rule in `MVP-120-ROUTE-MACHINE.md`.

## Screen 107 Contract

Screen 107 is a stateful hybrid B2B operating app, following the approved retailer workspace interaction pattern. Its header opens Business Home and its center dock switches among Orders, Stock and Wholesale Buy without returning to a menu.

Business Home must answer:

- What requires action now?
- What buyer demand is ready?
- What can be supplied or produced?
- What inputs need procurement?
- What money or delivery risk needs attention?

The Orders view must show incoming demand and confirmed customer orders. The Stock view must keep the live sell catalogue, available quantity, batches and commercial terms accessible. The Wholesale Buy view must let the manufacturer browse suppliers and place purchase orders for raw material, packaging and other requirements. Full detail and fulfilment states open progressively from these focused views.

## Screen 109 Contract

Screen 109 owns the detailed manufacturer catalogue and saleable-stock route. It must support tens of thousands of canonical SKUs without rendering the full catalogue at once.

- Default state is `My Stock`: only products added by the manufacturer.
- `Add Products` searches the server-side master catalogue filtered by verified industry, product family and HSN activity.
- `Import CSV` supports mobile file selection and secure desktop/web continuation with preview, validation and error correction before publish.
- A reviewed new-product path exists when the canonical SKU is missing.
- Product rows remain dense and show brand, product, pack, HSN, available quantity, reserved quantity, selling price, MOQ and commercial terms.
- Product details, quantity update, terms, batch handling and publish/pause actions open progressively inside the route.
- Adding or changing a product updates a proposed product-to-input mapping. The manufacturer must confirm the mapping before it changes Wholesale Buy recommendations.
- Search, filters, cursor pagination, virtualisation and server-side facets are mandatory production behaviours; never preload the master catalogue.
