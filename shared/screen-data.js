window.MoolSocialScreenbook = {
  foundation: [
    {
      id: "LG",
      name: "MoolSocial Approved Logo Specs",
      file: "moolsocial-approved-logo-specs.html",
      status: "Approved",
      purpose: "Final logo, colours, logotype, tagline and usage rules."
    },
    {
      id: "FR",
      name: "Freeze Brand System",
      file: "moolsocial-freeze-brand-system.html",
      status: "Locked",
      purpose: "Frozen brand, product principles, legal boundary and usage rules."
    },
    {
      id: "DM",
      name: "Domain Names",
      file: "moolsocial-domain-strategy.html",
      status: "Buy priority approved",
      purpose: "Main domain, defensive domains, redirects and production subdomains."
    },
    {
      id: "UI",
      name: "Shared UI Foundation",
      file: "moolsocial-shared-ui-foundation.html",
      status: "Ready for screen design",
      purpose: "Reusable tokens, controls, decision cards and universal screen primitives."
    }
  ],
  screens: [
    {
      id: "00",
      name: "Install App",
      file: "screens/00-install-app.html",
      status: "Approved",
      purpose: "Play Store listing and install/open handoff into MoolSocial."
    },
    {
      id: "01",
      name: "App Splash / First Open Handoff",
      file: "screens/01-app-splash-first-open.html",
      status: "Approved",
      purpose: "MoolSocial splash, boot checks, routing states and first setup handoff."
    },
    {
      id: "02",
      name: "First Setup / Language + Location",
      file: "screens/02-first-setup-language-location.html",
      status: "Approved",
      purpose: "Auto-select phone language, explain location value, ask consent at the right moment and set current service area."
    },
    {
      id: "03",
      name: "Login / Account Handoff",
      file: "screens/03-login-account-handoff.html",
      status: "Approved",
      purpose: "Approved one-method sign-in through social account, email OTP or mobile OTP, with provider route logic and automatic Screen 04 handoff."
    },
    {
      id: "04",
      name: "Universal Focus Shell",
      file: "screens/04-universal-focus-shell.html",
      status: "Approved",
      purpose: "First main app screen after login: Social opens by default, Mool morphs the dock into universal access, contextual tabs control the active world."
    },
    {
      id: "05",
      name: "Social > Shorts",
      file: "screens/05-social-shorts.html",
      status: "Approved",
      purpose: "Full-screen Shorts viewer with creator identity, social actions, hidden details, contextual proof sheet and one-tap Mool/Chat access."
    },
    {
      id: "06",
      name: "Social > Videos",
      file: "screens/06-social-videos.html",
      status: "Approved",
      purpose: "Video feed/watch flow with YouTube-style chips, Shorts link, verified proof and one-tap action context."
    },
    {
      id: "07",
      name: "Social > Feed",
      file: "screens/07-social-feed.html",
      status: "Approved",
      purpose: "Social feed with composer, posts, stories, comments, repost/share and verified action context for product/service/work-linked posts."
    },
    {
      id: "08",
      name: "Social > Create",
      file: "screens/08-social-create.html",
      status: "Approved",
      purpose: "Approved all-in-one social creation hub for text, photo, shorts, videos, stories, live, threads, polls and creator earning path."
    },
    {
      id: "09",
      name: "Buy",
      file: "screens/09-buy.html",
      status: "Approved",
      purpose: "Approved Buy commerce entry with QR shop session, progressive route into Grocery Decision, shop-specific purchase actions, compact category browsing, medicine boundary, basket logic and decision-ready product cards."
    },
    {
      id: "10",
      name: "Buy > Grocery Decision",
      file: "screens/10-buy-grocery-decision.html",
      status: "Approved",
      purpose: "Approved shop-specific grocery decision flow after Buy: selected shop/category context, retailer capability settings, retail/family-pack/wholesale-MOQ/shop-offer choices and basket continuation."
    },
    {
      id: "11",
      name: "Buy > Product Detail",
      file: "screens/11-buy-product-detail.html",
      status: "Approved",
      purpose: "Approved product detail and add-to-basket flow after Grocery Decision: selected product/shop context, shop capability settings, rate, unit, quantity, fulfilment, proof and basket action."
    },
    {
      id: "12",
      name: "Buy > Basket / Checkout Decision",
      file: "screens/12-buy-basket-checkout.html",
      status: "Approved",
      purpose: "Approved basket and checkout decision flow after Product Detail: shop basket, item quantities, fulfilment, estimated amount, retailer stock lock, proof, confirmed payable amount and payment handoff."
    },
    {
      id: "13",
      name: "Retailer Stock Confirmation Alert",
      file: "screens/13-retailer-stock-confirmation.html",
      status: "Approved",
      purpose: "Approved retailer operating alert triggered by customer stock confirmation: urgent shop workspace alert, item stock lock, mismatch handling, SLA, trust logging and payment unlock."
    },
    {
      id: "14",
      name: "Customer Payment / Order Confirmation",
      file: "screens/14-customer-payment-order-confirmation.html",
      status: "Approved",
      purpose: "Approved customer payment and order confirmation flow after retailer stock lock: final payable amount, stock-lock timer, fulfilment, payment method, protected charge, pickup code, receipt and order tracking handoff."
    },
    {
      id: "15",
      name: "Counter Ready Receipt",
      file: "screens/15-counter-ready-receipt.html",
      status: "Approved",
      purpose: "Approved counter pickup receipt handoff after payment: paid receipt, live shop queue match, order/customer/amount signals, counter instruction, QR backup, counter view, collected state and no rider tracking for pickup orders."
    },
    {
      id: "16",
      name: "Order Completed / Bill & Rating",
      file: "screens/16-order-completed-bill-rating.html",
      status: "Approved",
      purpose: "Approved completed counter pickup order closeout: order closed, final bill, payment proof, issue window, trust feedback, repeat basket, monthly basket, bill actions, rating and low-rating issue path."
    },
    {
      id: "17",
      name: "Home Delivery Tracking",
      file: "screens/17-home-delivery-tracking.html",
      status: "Approved",
      purpose: "Approved home delivery tracking branch after payment: ETA, item summary, rider identity, route, locked/unlocked doorstep OTP, proof timestamps, address help, delay support, rider reassignment and OTP-verified delivered handoff."
    },
    {
      id: "18",
      name: "Home Delivery Completed / Bill & Rating",
      file: "screens/18-home-delivery-completed-bill-rating.html",
      status: "Approved",
      purpose: "Approved home delivery completion closeout after doorstep OTP verification: calm delivered summary, final bill, compact proof, issue window, order rating, repeat basket and support handoff."
    },
    {
      id: "19",
      name: "Order Issue / Refund Evidence",
      file: "screens/19-order-issue-refund-evidence.html",
      status: "Approved",
      purpose: "Approved guided issue assistant after report problem: affected item selection, issue type, suggested refund/replacement, evidence capture, proof comparison, SLA and support review path."
    },
    {
      id: "20",
      name: "Issue Status / Retailer Response",
      file: "screens/20-issue-review-status-retailer-response.html",
      status: "Approved",
      purpose: "Approved customer-facing live issue tracker after evidence submission: case number, shop reply timer, compact proof packet, refund/replacement status, automatic support fallback, chat handoff and safe resolved confirmation."
    },
    {
      id: "21",
      name: "Issue Result / Refund Replacement",
      file: "screens/21-issue-result-refund-replacement.html",
      status: "Approved",
      purpose: "Approved final issue outcome after shop/support decision: refund amount, replacement route, support decision, bill adjustment, saved proof and next actions."
    },
    {
      id: "22",
      name: "Chat / Order Support Thread",
      file: "screens/22-chat-order-support-thread.html",
      status: "Approved",
      purpose: "Approved order/support chat with WhatsApp-quality text messaging, audio/video call, photo/video/file/bill/proof attachment, order context, support fallback, read receipts and safe upload rules."
    },
    {
      id: "23",
      name: "Chat Inbox / Chat Home",
      file: "screens/23-chat-inbox-home.html",
      status: "Approved",
      purpose: "Approved premium chat inbox for the Chat main action: WhatsApp-like thread list, All/Unread/People/Business/Orders/Support filters, call/video/media/file capability signals, verified context, order/support alerts, quick start actions and thread routing."
    },
    {
      id: "24",
      name: "Chat / Business Thread",
      file: "screens/24-chat-business-thread.html",
      status: "Approved",
      purpose: "Approved verified business chat with WhatsApp-quality messaging, audio/video call, photo/video/file sharing, live shop trust, stock update, quote expiry, pickup/delivery choice, catalog/order/pay actions, support route and commerce-safe thread contract."
    },
    {
      id: "25",
      name: "Chat / People Thread",
      file: "screens/25-chat-people-thread.html",
      status: "Approved",
      purpose: "Approved personal and group chat with WhatsApp-quality thread UX: text, call, video, attachment tray, photo/file previews, voice note, reply preview, typing state, reactions, member privacy, shared basket, poll, invite and optional Buy handoff."
    },
    {
      id: "26",
      name: "Eat / Food Decision Home",
      file: "screens/26-eat.html",
      status: "Approved",
      purpose: "Approved Eat main action with restaurant chooser, delivery/QR/search/offers context, loyalty, route-specific Order Food, Book Table and Tiffin panels, live summary, filters, price/time/trust/cancellation clarity and next action."
    },
    {
      id: "27",
      name: "Eat > Order Food",
      file: "screens/27-eat-order-food.html",
      status: "Approved",
      purpose: "Approved restaurant menu/order decision screen after Eat: selected restaurant, fulfilment choice, menu categories, item cards, live basket and restaurant acceptance-before-payment logic."
    },
    {
      id: "28",
      name: "Eat > Book Table",
      file: "screens/28-eat-book-table.html",
      status: "Approved",
      purpose: "Approved table booking flow after Eat: restaurant choices, people, time slot, table package, offer, hold rule, cancellation, cover/deposit clarity and confirm action."
    },
    {
      id: "29",
      name: "Eat > Tiffin",
      file: "screens/29-eat-tiffin.html",
      status: "Approved",
      purpose: "Approved tiffin decision screen after Eat: kitchen choice, food style, meal type, delivery slot, trial/weekly/monthly plan, menu calendar, pause/skip control and start action."
    },
    {
      id: "30",
      name: "Ride",
      file: "screens/30-ride.html",
      status: "Approved",
      purpose: "Approved progressive Ride decision screen after Universal Ride: pickup/drop, Bike/Auto/Cab choice, dynamic package reveal, fare, ETA and booking action before captain assignment."
    },
    {
      id: "31",
      name: "Ride > Captain Arriving",
      file: "screens/31-ride-accepted-captain-arriving.html",
      status: "Approved",
      purpose: "Approved accepted ride handoff after booking: captain identity, vehicle number, ETA, live map, call, chat, pickup instruction, safety and cancellation controls."
    },
    {
      id: "32",
      name: "Ride > Live Trip",
      file: "screens/32-ride-live-trip.html",
      status: "Approved",
      purpose: "Approved on-trip ride screen after captain starts trip: route progress, destination ETA, fare lock, Cash/UPI/Card payment lock, call/chat/share/safety, add stop, route issue and trip completion handoff."
    },
    {
      id: "33",
      name: "Ride > Payment Approval",
      file: "screens/33-ride-payment-approval.html",
      status: "Approved",
      purpose: "Approved ride-ended payment approval screen: final fare, customer-approved card debit, Cash/UPI collection, issue-before-pay route, receipt and rating handoff."
    },
    {
      id: "34",
      name: "Ride > Receipt & Rating",
      file: "screens/34-ride-receipt-rating.html",
      status: "Approved",
      purpose: "Approved ride closure screen after successful payment: paid receipt, trip proof, captain rating, support window, share/download receipt and next ride action."
    },
    {
      id: "35",
      name: "Ride > Post-Trip Support",
      file: "screens/35-ride-post-trip-support.html",
      status: "Approved",
      purpose: "Approved ride support screen after receipt: belongings warning, missing item report, fare issue, route issue, safety concern, attached proof, timeline and support chat handoff."
    },
    {
      id: "36",
      name: "Book",
      file: "screens/36-book.html",
      status: "Approved",
      purpose: "Approved Book master action screen after Universal Book: Get It Done, Services, Doctor and Salon decisions with doctor/hospital/follow-up logic, provider proof, time, fee, cancellation and booking action."
    },
    {
      id: "37",
      name: "Book > Doctor Appointment",
      file: "screens/37-book-doctor-appointment.html",
      status: "Approved",
      purpose: "Approved doctor appointment decision screen after Book > Doctor: clinic doctor, hospital OPD, video consult, follow-up, symptoms/reports, fee, queue/slot, proof and confirm action."
    },
    {
      id: "38",
      name: "Book > Patient Details & Reports",
      file: "screens/38-book-patient-details-reports.html",
      status: "Approved",
      purpose: "Approved patient details and reports screen after appointment selection: family patient selection, symptoms, report upload, prescription link, privacy consent and appointment confirmation readiness."
    },
    {
      id: "39",
      name: "Doctor > Patient Invite & Follow-Up",
      file: "screens/39-doctor-patient-invite-followup.html",
      status: "Approved",
      purpose: "Approved doctor/clinic growth screen for walk-in patient QR/link invite, follow-up window, automated reminders, report sharing and patient app onboarding reason."
    },
    {
      id: "40",
      name: "Patient > Clinic Invite Join",
      file: "screens/40-patient-clinic-invite-join.html",
      status: "Approved",
      purpose: "Approved patient-side QR/link handoff after doctor invite: verified doctor, follow-up benefit, report upload, patient consent, login/link route and clinic chat."
    },
    {
      id: "41",
      name: "Patient > Follow-Up Workspace",
      file: "screens/41-patient-followup-workspace.html",
      status: "Approved",
      purpose: "Approved patient-owned follow-up workspace after clinic invite: active doctor case, report upload, medicine reminders, prescription record, rebook/review, sharing control and clinic chat."
    },
    {
      id: "42",
      name: "Book > Salon Appointment",
      file: "screens/42-book-salon-appointment.html",
      status: "Approved",
      purpose: "Approved salon booking decision screen after Book > Salon: salon visit, home visit, makeup and package paths, service need, price, slot, proof, cancellation and booking action."
    },
    {
      id: "43",
      name: "Salon > Booking Confirmation",
      file: "screens/43-salon-booking-confirm.html",
      status: "Approved",
      purpose: "Approved salon confirmation screen after provider/slot selection: selected provider, service, slot, amount, payment choice, MoolSocial payment benefit, add-ons, cancellation, reminder and final confirm action."
    },
    {
      id: "44",
      name: "Salon > Booking Confirmed",
      file: "screens/44-salon-booking-confirmed.html",
      status: "Approved",
      purpose: "Approved confirmed salon slot screen after Screen 43: booking ID, payment status, MoolSocial payment nudge, reminder, route, reschedule/cancel and booking chat."
    },
    {
      id: "45",
      name: "Salon > Visit Check-In",
      file: "screens/45-salon-visit-check-in.html",
      status: "Approved",
      purpose: "Approved salon arrival screen after booking confirmation: checked-in state, salon acknowledgment, stylist/queue readiness, MoolSocial payment reason, issue-before-pay support and service completion handoff."
    },
    {
      id: "46",
      name: "Salon > Service Payment Rating",
      file: "screens/46-salon-service-payment-rating.html",
      status: "Approved",
      purpose: "Approved salon completion screen after check-in/service: finished service state, payment approval, bill, rating, repeat booking, support and receipt handoff."
    },
    {
      id: "47",
      name: "Salon > Post-Visit Support",
      file: "screens/47-salon-post-visit-support.html",
      status: "Approved",
      purpose: "Approved salon support screen after payment/rating: saved visit record, bill correction, service issue, safety concern, proof-if-needed, review action and support chat handoff."
    },
    {
      id: "48",
      name: "Book > Get It Done",
      file: "screens/48-book-get-it-done.html",
      status: "Approved",
      purpose: "Approved Get It Done progressive flow after Book: task city, pickup/document/market/custom choices, verified help, missing details, proof preference, payment hold, review handoff and chat."
    },
    {
      id: "49",
      name: "Get It Done > Review & Payment Hold",
      file: "screens/49-get-it-done-review-payment.html",
      status: "Approved",
      purpose: "Approved review and payment-hold screen after Get It Done task details: completed task summary, helper fee, spend limit, total hold, payment method, proof release rule, edit, confirm and chat."
    },
    {
      id: "50",
      name: "Get It Done > Helper Accepted",
      file: "screens/50-get-it-done-helper-accepted.html",
      status: "Approved",
      purpose: "Approved live task screen after Get It Done payment hold: accepted helper, ETA, route preview, held amount, spend cap, proof rule, chat/call/share, cancel and proof handoff."
    },
    {
      id: "51",
      name: "Get It Done > Proof Review & Release",
      file: "screens/51-get-it-done-proof-release.html",
      status: "Approved",
      purpose: "Approved proof review and payment release screen after live task: proof preview, bill/status, helper fee, actual spend, unused return, release, ask again and issue path."
    },
    {
      id: "52",
      name: "Get It Done > Completed & Rating",
      file: "screens/52-get-it-done-completed-rating.html",
      status: "Approved",
      purpose: "Approved completion screen after Get It Done payment release: released amount, unused return, receipt/proof saved, rating, repeat task, save helper, share and support."
    },
    {
      id: "53",
      name: "Get It Done > Issue Support",
      file: "screens/53-get-it-done-issue-support.html",
      status: "Approved",
      purpose: "Approved issue support screen for Get It Done exceptions: wrong proof, incomplete task, overcharge, safety concern, payment status, evidence, resolution option, chat and support submit."
    },
    {
      id: "54",
      name: "Get It Done > Issue Case Status",
      file: "screens/54-get-it-done-issue-case-status.html",
      status: "Approved",
      purpose: "Approved case-status screen after issue submit: issue context, protected amount, timeline stage, ETA, chat handoff and edit/retry path."
    },
    {
      id: "55",
      name: "Get It Done > Issue Resolution",
      file: "screens/55-get-it-done-issue-resolution.html",
      status: "Approved",
      purpose: "Approved issue resolution screen after support review: recommended refund, rework, bill adjustment or close case with protected amount and decision basis."
    },
    {
      id: "56",
      name: "Get It Done > Resolution Complete",
      file: "screens/56-get-it-done-resolution-complete.html",
      status: "Approved",
      purpose: "Approved final resolution completion screen after issue outcome: refund, rework, bill adjustment or close case confirmation with saved record and next action."
    },
    {
      id: "57",
      name: "Pay",
      file: "screens/57-pay.html",
      status: "Approved",
      purpose: "Approved Pay master screen for payment-first actions: Recharge, Bills, Scan Pay and Pay Requests, with receipts kept as secondary records."
    },
    {
      id: "58",
      name: "Pay > Recharge",
      file: "screens/58-pay-recharge.html",
      status: "Approved",
      purpose: "Approved recharge screen after Pay: mobile, DTH, data and saved recharges with number/operator/plan check, payment mode and receipt rule."
    },
    {
      id: "59",
      name: "Pay > Bills",
      file: "screens/59-pay-bills.html",
      status: "Approved",
      purpose: "Approved bills screen after Pay: electricity, water, gas and internet bills with biller lookup, consumer number, due amount, due date, payment mode and receipt rule."
    },
    {
      id: "60",
      name: "Pay > Scan Pay",
      file: "screens/60-pay-scan.html",
      status: "Approved",
      purpose: "Approved scan pay screen after Pay: shop QR, order QR, provider QR and UPI ID with payee verification, amount confirmation, purpose and receipt rule."
    },
    {
      id: "61",
      name: "Pay > Pay Requests",
      file: "screens/61-pay-requests.html",
      status: "Approved",
      purpose: "Approved payment requests screen for pending, order, business and people requests with verified requester, linked purpose, amount, expiry, decline and review-to-pay actions."
    },
    {
      id: "62",
      name: "Pay > Request Confirmation",
      file: "screens/62-pay-request-confirmation.html",
      status: "Approved",
      purpose: "Approved final payment confirmation screen after Pay Requests with verified payee, linked purpose, exact debit, expiry, payment method, decline, authentication handoff and receipt rule."
    },
    {
      id: "63",
      name: "Pay > Success & Receipt",
      file: "screens/63-pay-processing-receipt.html",
      status: "Approved",
      purpose: "Approved authoritative payment outcome screen with success receipt, provider and MoolSocial references, linked order update, tracking, pending/failure safeguards and support."
    },
    {
      id: "64",
      name: "Pay > Receipts & History",
      file: "screens/64-pay-receipts-history.html",
      status: "Approved",
      purpose: "Approved searchable consumer payment ledger with all, pending and refund views, immutable references, linked purposes, receipt actions and status-safe support routes."
    },
    {
      id: "65",
      name: "Pay > Pending & Refund Status",
      file: "screens/65-pay-pending-refund-status.html",
      status: "Approved",
      purpose: "Approved reusable status screen for provider-pending payments and refunds with duplicate-payment prevention, verified timeline, expected resolution, linked references and support."
    },
    {
      id: "66",
      name: "Pay > Failed, Reversal & Safe Retry",
      file: "screens/66-pay-failed-reversal-safe-retry.html",
      status: "Approved",
      purpose: "Approved payment exception screen that separates verified no-debit failure from debit reversal, unlocks retry only when safe and preserves bank, purpose and support references."
    },
    {
      id: "67",
      name: "Work",
      file: "screens/67-work.html",
      status: "Approved",
      purpose: "Approved scalable Work entry with compact opportunity scanning, exclusive inline expansion, funded earning potential, progressive My Work activation and required-work Apply routing."
    },
    {
      id: "68",
      name: "Work > Opportunity Details & Apply",
      file: "screens/68-work-opportunity-terms-apply.html",
      status: "Approved",
      purpose: "Approved opportunity decision screen with verified publisher, exact funded outcome, live deadline and direct Apply routing for an existing verified workspace or new-user Freelancer Work setup."
    },
    {
      id: "69",
      name: "Work > Freelancer Work Setup",
      file: "screens/69-my-work-setup.html",
      status: "Approved",
      purpose: "Approved first-workspace setup used only when an applicant has no verified workspace, creating general Freelancer Work while preserving the saved opportunity and honest review state."
    },
    {
      id: "81",
      name: "Retail Wholesale Buy > Procurement Catalog",
      file: "screens/81-retailer-wholesale-buy-catalog.html",
      status: "Approved",
      purpose: "Approved production-scale canonical-SKU catalogue with case rate, MOQ, delivery window, payment term, delivery owner and offer visible, plus protected-payment terms and exact-MOQ cart entry."
    },
    {
      id: "82",
      name: "Retail Wholesale Buy > Review Order & Place POs",
      file: "screens/82-retailer-wholesale-cart-purchase-order.html",
      status: "Approved",
      purpose: "Approved Indian wholesale order review with MOQ-safe quantities, delivery windows and ownership, protected advance, payment-on-delivery balance, GST details and supplier-wise purchase-order placement."
    },
    {
      id: "83",
      name: "Retail Wholesale Buy > Order Confirmation",
      file: "screens/83-retailer-wholesale-order-confirmed.html",
      status: "Approved",
      purpose: "Approved supplier-wise PO confirmation with protected advance, payment on delivery, dispatch SLA, delivery window and owner, GST invoice timing and goods-receipt stock control."
    },
    {
      id: "84",
      name: "Retail Wholesale Buy > Delivery Tracking",
      file: "screens/84-retailer-wholesale-delivery-tracking.html",
      status: "Approved",
      purpose: "Approved supplier-wise tracking with honest pre-dispatch commitments, telemetry-backed live ETA, stale-GPS warning, delivery ownership, payment protection and goods-receipt handoff."
    },
    {
      id: "85",
      name: "Retail Wholesale Buy > Goods Receipt",
      file: "screens/85-retailer-wholesale-goods-receipt.html",
      status: "Approved",
      purpose: "Approved compact goods receipt with accepted-versus-disputed quantity control, GST invoice matching, accepted-stock posting, GRN creation and protected payment settlement."
    },
    {
      id: "86",
      name: "Retail Wholesale Buy > Receipt Result",
      file: "screens/86-retailer-wholesale-receipt-result.html",
      status: "Approved",
      purpose: "Approved compact post-receipt result with authoritative stock, purchase-book, GRN, GST invoice and protected-payment event outcomes."
    },
    {
      id: "87",
      name: "Retailer > Purchase Book",
      file: "screens/87-retailer-purchase-book.html",
      status: "Approved",
      purpose: "Approved retailer Purchase Book with wholesale and direct bills, invoice-photo extraction, accepted-stock linkage, payables, GST issues, cost insight, reconciliation and supplier actions."
    },
    {
      id: "88",
      name: "Retailer > Supplier Bill & Payment",
      file: "screens/88-retailer-supplier-bill-payment.html",
      status: "Approved",
      purpose: "Approved supplier obligation detail with retained invoice, extracted lines, PO/GRN/GST reconciliation, verified beneficiary, issue holds and safe payment authorization."
    },
    {
      id: "89",
      name: "Retailer > Supplier Payment Status",
      file: "screens/89-retailer-supplier-payment-status.html",
      status: "Approved",
      purpose: "Approved authoritative supplier-payment processing, settled, failed and reversed states with receipt truth, bill linkage and safe idempotent retry."
    },
    {
      id: "90",
      name: "Retailer > Sales Book",
      file: "screens/90-retailer-sales-book.html",
      status: "Approved",
      purpose: "Approved unified retailer sales projection across app, counter, phone and Chat with invoice, payment, fulfilment, stock, margin and return truth."
    },
    {
      id: "91",
      name: "Retailer > Stock Statement",
      file: "screens/91-retailer-stock-statement.html",
      status: "Approved",
      purpose: "Approved auditable retailer Stock Statement with sellable value, available stock, reservations, incoming stock, movement history and exception-based counts."
    },
    {
      id: "92",
      name: "Retailer > Business Book Home",
      file: "screens/92-retailer-business-book-home.html",
      status: "Approved",
      purpose: "Approved compact retailer business position connecting Sales Book, Purchase Book, Stock Statement, money due, expenses, GST summary, margin and reconciliation."
    },
    {
      id: "93",
      name: "Retailer > Business Services",
      file: "screens/93-retailer-business-services.html",
      status: "Approved",
      purpose: "Approved always-visible professional offerings for delivery support, sales expansion, tax and books, offers and advertising."
    },
    {
      id: "94",
      name: "Retailer > Business Service Plan",
      file: "screens/94-retailer-business-service-plan.html?service=delivery",
      status: "Approved",
      purpose: "Approved service-specific plan comparison, exact charge rules, spending control and activation review."
    },
    {
      id: "95",
      name: "Retailer > Business Service Activation",
      file: "screens/95-retailer-business-service-activation.html?service=delivery&plan=starter&limit=3000",
      status: "Approved",
      purpose: "Approved final plan review, payment mandate, service consent and activation authorization."
    },
    {
      id: "96",
      name: "Retailer > Active Business Service",
      file: "screens/96-retailer-business-service-active.html?service=delivery&plan=starter&limit=3000&payment=upi",
      status: "Approved",
      purpose: "Approved active-service operating home with usage, spend, readiness, first action and support."
    },
    { id: "97", name: "Retailer > Customers & Loyalty", file: "screens/97-retailer-customers-loyalty.html", status: "Approved", purpose: "Customer records, permissions, repeat behavior and retention actions." },
    { id: "98", name: "Retailer > Customer Detail & Retention", file: "screens/98-retailer-customer-detail-retention.html", status: "Approved", purpose: "Customer history, repeat basket and permission-aware reminder flow." },
    { id: "99", name: "Retailer > Offers & Campaigns", file: "screens/99-retailer-offers-campaigns.html", status: "Approved", purpose: "Campaign control centre with live performance and pause controls." },
    { id: "100", name: "Retailer > Campaign Builder", file: "screens/100-retailer-offer-campaign-builder.html", status: "Approved", purpose: "Progressive audience, offer, budget and approval workflow." },
    { id: "101", name: "Retailer > Slow Stock Liquidation", file: "screens/101-retailer-slow-stock-liquidation.html", status: "Approved", purpose: "Stock recovery route with quantity and price-floor control." },
    { id: "102", name: "Retailer > AI Operating Assistant", file: "screens/102-retailer-ai-operating-assistant.html", status: "Approved", purpose: "Approval-gated operating suggestions for stock, orders and buying." },
    { id: "103", name: "Retailer > Staff & Permissions", file: "screens/103-retailer-staff-permissions.html", status: "Approved", purpose: "Team access and permission management for shop operations." },
    { id: "104", name: "Retailer > Store Settings & Readiness", file: "screens/104-retailer-store-settings-readiness.html", status: "Approved", purpose: "Shop readiness, fulfilment, payment and compliance controls." },
    { id: "105", name: "Retailer > Returns & Customer Issues", file: "screens/105-retailer-returns-customer-issues.html", status: "Approved", purpose: "Case inbox and evidence-led resolution workflow." },
    { id: "106", name: "Retailer > Cash, Bank & Reconciliation", file: "screens/106-retailer-cash-bank-expenses-reconciliation.html", status: "Approved", purpose: "Money position, expenses and close-the-day controls."
    }
  ]
};
