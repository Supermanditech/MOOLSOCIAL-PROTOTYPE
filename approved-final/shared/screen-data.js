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
    }
  ]
};
