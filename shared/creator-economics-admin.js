(function () {
  "use strict";
  const cfg = window.adminScreenConfig;
  if (!cfg || !Array.isArray(cfg.items)) return;
  const screen = Number(cfg.screen);

  const governance = {
    kicker: "CREATOR ECONOMICS - CE-2401",
    title: "Eight funded creator earning engines",
    meta: "Business funding - creator delivery - consumer outcome - ledger release",
    status: "Governed",
    tone: "good",
    time: "Live controls",
    facts: [["ENGINES", "8"], ["RESERVED", "₹42.8L"], ["PENDING", "316"], ["STOP RULES", "Active"]],
    detail: "Campaign fees, commerce share, memberships, content pool, local production, verified onboarding, live events and licensed reuse use one versioned money lifecycle.",
    purpose: "Creator economics governance",
    audience: "Eligible verified funders and creators only",
    message: "Every earning retains its funder, qualifying event, rule version, deductions, dispute state and payout record.",
    steps: [["Fund", "Reserve before publish"], ["Match", "Eligibility and capacity"], ["Deliver", "Rights and disclosure"], ["Verify", "Signed outcome event"], ["Release", "Hold and dispute checks"], ["Payout", "Authoritative ledger"]],
    currentStep: 3,
    primary: "Open engine controls",
    secondary: "Pause new acceptance",
    primaryResult: "Engine controls opened. Existing obligations remain protected; new publication follows current funding and policy rules."
  };

  const finance = {
    kicker: "CREATOR LEDGER - CL-8820",
    title: "Creator earnings source reconciliation",
    meta: "Reserved - qualified - held - available - paid - reversed",
    status: "Balanced",
    tone: "good",
    time: "Closed 11:07",
    facts: [["GROSS", "₹18.4L"], ["AVAILABLE", "₹12.8L"], ["HELD", "₹4.1L"], ["EXCEPTIONS", "14"]],
    detail: "Reconcile each creator entry to the original funder, qualifying event, attribution version, fee, tax, refund and payout reference.",
    steps: [["Funding", "Reservation matches"], ["Outcome", "Event is idempotent"], ["Attribution", "Rule version stored"], ["Hold", "Refund and dispute"], ["Ledger", "Net amount posted"], ["Payout", "Bank reference"]],
    currentStep: 4,
    primary: "Reconcile exceptions",
    secondary: "Hold affected payouts",
    primaryResult: "Only affected entries remain held. Unrelated creator payouts continue normally."
  };

  const launch = {
    kicker: "LIVE CREATOR EVENT - LIVE-72",
    title: "Jodhpur local launch with verified creators",
    meta: "Host fee funded - outcome pool capped - disclosure required",
    status: "Approval",
    tone: "warn",
    time: "18 Jul 18:00",
    facts: [["HOSTS", "12"], ["HOST FEES", "₹72K held"], ["OUTCOME POOL", "₹1.2L"], ["CAPACITY", "2,000"]],
    detail: "Audience, event access, host deliverables, commercial disclosure, qualified outcomes, cancellation and stop rules are checked before launch.",
    purpose: "Live campaign and launch event",
    audience: "Eligible consumers and followers in Jodhpur with current consent",
    message: "Join a verified local launch. Paid host relationship and any product action are clearly disclosed.",
    steps: [["Brief", "Hosts and output"], ["Funding", "Fee and pool reserved"], ["Audience", "Eligibility and consent"], ["Rights", "Disclosure and media"], ["Approval", "Maker-checker"], ["Launch", "Live health controls"]],
    currentStep: 4,
    primary: "Approve controlled launch",
    secondary: "Return for correction"
  };

  if (screen === 152) cfg.items.unshift(governance);
  if (screen === 154) cfg.items.unshift(finance);
  if (screen === 156) cfg.items.unshift(launch);
})();
