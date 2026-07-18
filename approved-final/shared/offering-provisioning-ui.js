(function () {
  "use strict";

  const cfg = window.adminScreenConfig;
  const provisioning = cfg && cfg.offeringProvisioning;
  const registry = window.MoolWorkspaceRegistry;
  if (!provisioning || !registry || !registry.profiles) return;

  const app = document.getElementById("app");
  const sectionHead = document.querySelector(".section-head");
  if (!app || !sectionHead) return;

  const groups = [
    ["Personal", ["personal"]],
    ["Products & Trade", ["manufacturing", "wholesale", "retail"]],
    ["Food", ["food"]],
    ["Health & Medicine", ["health", "pharmacy"]],
    ["Services & Salon", ["services"]],
    ["Ride & Transport", ["mobility", "delivery", "transport"]],
    ["Create & Work", ["creator", "work"]]
  ];

  const profiles = [
    {
      id: "personal",
      label: "Individual / Consumer",
      family: "personal",
      summary: "Permanent personal identity, Purchase Power, Wishes and permitted Signals."
    },
    ...Object.values(registry.profiles)
  ];

  const templates = {
    future_demand: {
      label: "Future demand",
      note: "Aggregate confirmed future needs before supply competes.",
      name: "Jodhpur Future Basket",
      result: "Secure 100 approved household basket requirements",
      guarantee: "100 approved Future-Need Slots matching the locked basket rules",
      evidence: "Approved need, valid consent, budget, area and purchase window",
      priceModel: "funded_outcome",
      headline: "100 confirmed household basket needs",
      cardCopy: "See matched future demand, readiness and maximum outcome cost.",
      cta: "Check demand plan",
      route: "/retailer/services/:serviceId?state=future-demand"
    },
    managed_service: {
      label: "Managed service",
      note: "Reserve accountable people or operating capacity.",
      name: "Shop Rider Reserve",
      result: "Reserve primary and backup delivery capacity for the selected shift",
      guarantee: "Accepted funded availability block and proof-completed deliveries",
      evidence: "Shift acceptance, pickup, OTP delivery and exception evidence",
      priceModel: "subscription_usage",
      headline: "Reliable delivery capacity for your shop",
      cardCopy: "Choose shift, radius and order capacity before activating riders.",
      cta: "Build delivery plan",
      route: "/retailer/services/:serviceId?state=capacity-plan"
    },
    outcome_contract: {
      label: "Outcome contract",
      note: "Contract a controllable result, cap and make-good.",
      name: "Neighbourhood Basket Growth",
      result: "Get 100 paid, fulfilled monthly basket customers",
      guarantee: "100 paid, fulfilled and retained first household basket cycles",
      evidence: "Order, payment, fulfilment, cancellation and refund status",
      priceModel: "per_retained_outcome",
      headline: "Get 100 monthly basket customers",
      cardCopy: "Check readiness, exact qualifying result and maximum payable amount.",
      cta: "Check outcome plan",
      route: "/retailer/services/:serviceId?state=outcome-plan"
    },
    software_entitlement: {
      label: "Software entitlement",
      note: "Activate an existing production-ready operating capability.",
      name: "Retail ProcureAI",
      result: "Compare eligible supply and prepare approved target-price purchase orders",
      guarantee: "Activated entitlement and accepted procurement workflow",
      evidence: "Entitlement, approved RFQ, PO, GRN and like-for-like landed comparison",
      priceModel: "workspace_subscription",
      headline: "Buy shop stock at a better landed cost",
      cardCopy: "Compare eligible suppliers and approve every purchase order yourself.",
      cta: "Review plan",
      route: "/retailer/services/:serviceId?state=entitlement"
    },
    funded_work: {
      label: "Funded work",
      note: "Publish proof-based work only after funding and eligibility.",
      name: "Retailer Activation Assignment",
      result: "Activate verified retailers through an accepted first transaction",
      guarantee: "Accepted activation evidence and retained first transaction",
      evidence: "Geo visit, owner approval, catalogue readiness and retained transaction",
      priceModel: "funder_paid_outcome",
      headline: "Earn from verified retailer activation",
      cardCopy: "Review payout, proof, capacity and rework terms before applying.",
      cta: "Review funded work",
      route: "/earn/opportunities/:opportunityId"
    },
    required_action: {
      label: "Required action",
      note: "Open the exact compliance or readiness action without promotion.",
      name: "Pharmacy Licence Renewal",
      result: "Complete the required licence record review before capability expiry",
      guarantee: "Accepted document-review milestone",
      evidence: "Authorized document, expiry, reviewer decision and audit event",
      priceModel: "no_charge",
      headline: "Review your pharmacy licence record",
      cardCopy: "See the affected capability, required document and completion date.",
      cta: "Review requirement",
      route: "/account/identity?state=workspace-documents"
    }
  };

  const state = {
    step: 0,
    maxVisited: 0,
    template: "outcome_contract",
    name: "",
    result: "",
    direction: "grow_my_business",
    family: "Products & Trade",
    selectedProfiles: new Set(["grocery_retailer"]),
    geography: "Jodhpur pilot area",
    verification: "verified_and_ready",
    entitlement: "all_eligible_plans",
    readiness: new Set(["identity", "catalogue", "capacity", "fulfilment", "money"]),
    priceModel: "",
    basePrice: "9999",
    fundedCap: "50000",
    capacity: "100",
    duration: "30",
    guarantee: "",
    evidence: "",
    makeGood: "Continue at MoolSocial cost or refund undelivered outcome units",
    settlement: "After fulfilment and cancellation/return window",
    headline: "",
    cardCopy: "",
    cta: "",
    route: "",
    surfaces: new Set(["workspace_home", "workspace_catalogue", "priority_inbox"]),
    owner: "Outcome Products Team",
    approvals: new Set(["product", "finance", "operations"]),
    rollout: "5% canary in Jodhpur",
    start: "After required approvals",
    stopRule: "Pause on funding, capacity, complaint or journey-health threshold",
    error: "",
    draftSaved: false,
    receipt: null
  };
  let receiptSequence = 302;
  const provisionedRecords = new Map();

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyTemplate(id) {
    const template = templates[id];
    if (!template) return;
    state.template = id;
    state.name = template.name;
    state.result = template.result;
    state.guarantee = template.guarantee;
    state.evidence = template.evidence;
    state.priceModel = template.priceModel;
    state.headline = template.headline;
    state.cardCopy = template.cardCopy;
    state.cta = template.cta;
    state.route = template.route;
    state.error = "";
  }

  applyTemplate(state.template);

  const launchButton = document.createElement("button");
  launchButton.type = "button";
  launchButton.className = "provisioning-launch-button";
  launchButton.dataset.testid = "create-offering";
  launchButton.innerHTML = "<span>+</span> Create offering";
  sectionHead.append(launchButton);

  const backdrop = document.createElement("div");
  backdrop.className = "offering-backdrop";
  backdrop.hidden = true;
  backdrop.innerHTML = '<section class="offering-dialog" role="dialog" aria-modal="true" aria-labelledby="offeringDialogTitle"><div id="offeringWizard"></div></section>';
  document.body.append(backdrop);

  const wizard = backdrop.querySelector("#offeringWizard");
  const stepLabels = ["Result", "Eligibility", "Commercial", "Experience", "Governance", "Review"];

  function selectedProfileLabels() {
    return profiles.filter((profile) => state.selectedProfiles.has(profile.id)).map((profile) => profile.label);
  }

  function currentGroupProfiles() {
    const group = groups.find(([label]) => label === state.family) || groups[1];
    return profiles.filter((profile) => group[1].includes(profile.family));
  }

  function estimatedReach() {
    const profileWeight = Math.max(1, state.selectedProfiles.size);
    const geographyWeight = state.geography.includes("India") ? 42000 : state.geography.includes("Rajasthan") ? 9200 : 1840;
    const readinessFactor = state.verification === "verified_and_ready" ? 0.72 : 0.9;
    return Math.round(profileWeight * geographyWeight * readinessFactor).toLocaleString("en-IN");
  }

  function stepHeader() {
    return `<header class="offering-head">
      <span class="offering-title">
        <small>SUPERADMIN · SERVER-CONFIGURED PRODUCT</small>
        <h2 id="offeringDialogTitle">Provision a workspace offering</h2>
        <p>Compose registered capabilities, target eligible profiles and launch through governed approval.</p>
      </span>
      <button type="button" class="offering-close" data-action="close" aria-label="Close offering provisioning">×</button>
    </header>
    <nav class="offering-steps" aria-label="Provisioning progress">
      ${stepLabels.map((label, index) => `<button type="button" class="${index === state.step ? "active" : ""} ${index <= state.maxVisited ? "visited" : ""}" data-jump-step="${index}" ${index > state.maxVisited ? "disabled" : ""}><i>${index + 1}</i><span>${label}</span></button>`).join("")}
    </nav>`;
  }

  function textField(label, name, value, hint, multiline) {
    const control = multiline
      ? `<textarea id="op-${name}" data-bind="${name}">${escapeHtml(value)}</textarea>`
      : `<input id="op-${name}" data-bind="${name}" value="${escapeHtml(value)}">`;
    return `<label class="op-field" for="op-${name}"><span>${label}</span>${control}${hint ? `<small>${hint}</small>` : ""}</label>`;
  }

  function selectField(label, name, value, options, hint) {
    return `<label class="op-field" for="op-${name}"><span>${label}</span>
      <select id="op-${name}" data-bind="${name}">
        ${options.map(([optionValue, optionLabel]) => `<option value="${escapeHtml(optionValue)}" ${optionValue === value ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}
      </select>${hint ? `<small>${hint}</small>` : ""}
    </label>`;
  }

  function toggleButtons(values, selectedSet, attribute) {
    return `<div class="op-toggle-grid">${values.map(([id, label, note]) => `<button type="button" class="op-toggle ${selectedSet.has(id) ? "on" : ""}" ${attribute}="${id}" aria-pressed="${selectedSet.has(id)}"><i>${selectedSet.has(id) ? "✓" : "+"}</i><span><b>${label}</b>${note ? `<small>${note}</small>` : ""}</span></button>`).join("")}</div>`;
  }

  function resultStep() {
    return `<div class="offering-step-copy"><small>STEP 1</small><h3>What exact result will MoolSocial provision?</h3><p>Start from a registered foundation. Superadmin configures the product; it does not invent an undeveloped capability.</p></div>
      <div class="template-grid">
        ${Object.entries(templates).map(([id, template]) => `<button type="button" class="template-card ${state.template === id ? "selected" : ""}" data-template="${id}" aria-pressed="${state.template === id}"><i>${state.template === id ? "✓" : "+"}</i><b>${template.label}</b><span>${template.note}</span></button>`).join("")}
      </div>
      <div class="offering-form two">
        ${textField("Offering name", "name", state.name, "User-facing and specific; avoid internal programme names.")}
        ${selectField("Commercial direction", "direction", state.direction, [
          ["grow_my_business", "Workspace buys a result"],
          ["earn_from_work", "Eligible user earns from funded work"],
          ["separate_paths", "Both, as two separate paths"]
        ], "The payer and earner paths must never be mixed.")}
        <div class="wide">${textField("Plain-language completed result", "result", state.result, "The sentence must describe what is true when the user's end intent is complete.", true)}</div>
      </div>`;
  }

  function eligibilityStep() {
    return `<div class="offering-step-copy"><small>STEP 2</small><h3>Who receives this offering?</h3><p>Target canonical profiles and readiness rules. Compatible profiles inside one family may share a version; a different family creates a separate version. The server resolves eligibility at use time.</p></div>
      <div class="eligibility-layout">
        <section>
          <div class="family-tabs">${groups.map(([label]) => `<button type="button" class="${state.family === label ? "active" : ""}" data-family="${escapeHtml(label)}">${escapeHtml(label)}</button>`).join("")}</div>
          <div class="profile-grid">
            ${currentGroupProfiles().map((profile) => `<button type="button" class="profile-choice ${state.selectedProfiles.has(profile.id) ? "selected" : ""}" data-profile="${profile.id}" aria-pressed="${state.selectedProfiles.has(profile.id)}"><i>${state.selectedProfiles.has(profile.id) ? "✓" : "+"}</i><span><b>${escapeHtml(profile.label)}</b><small>${escapeHtml(profile.summary || "Profile-specific workspace")}</small></span></button>`).join("")}
          </div>
        </section>
        <aside class="eligibility-summary">
          <small>LIVE RULE ESTIMATE</small><b>${estimatedReach()}</b><span>eligible after current rules</span>
          <em>${state.selectedProfiles.size} profile${state.selectedProfiles.size === 1 ? "" : "s"} selected</em>
          <p>${escapeHtml(selectedProfileLabels().join(", ") || "Select at least one profile")}</p>
        </aside>
      </div>
      <div class="offering-form three">
        ${selectField("Geography", "geography", state.geography, [
          ["Jodhpur pilot area", "Jodhpur pilot area"],
          ["Rajasthan enabled areas", "Rajasthan enabled areas"],
          ["India enabled areas", "India enabled areas"]
        ])}
        ${selectField("Verification", "verification", state.verification, [
          ["verified_and_ready", "Verified and operating-ready"],
          ["verified_only", "Verified; readiness checked later"],
          ["all_eligible", "All legally eligible users"]
        ])}
        ${selectField("Plan entitlement", "entitlement", state.entitlement, [
          ["all_eligible_plans", "All eligible plans"],
          ["paid_workspace", "Paid workspace plans"],
          ["invited_pilot", "Invited pilot only"]
        ])}
      </div>
      <h4 class="op-subtitle">Required readiness</h4>
      ${toggleButtons([
        ["identity", "Identity and authority", "Profile owner/operator is verified"],
        ["catalogue", "Authoritative catalogue", "Product/service and price are ready"],
        ["capacity", "Stock or capacity", "Target can be fulfilled"],
        ["fulfilment", "Fulfilment and support", "Delivery, cancellation and issue routes exist"],
        ["money", "Payment and refund", "Funding and settlement rules are ready"]
      ], state.readiness, "data-readiness")}`;
  }

  function commercialStep() {
    return `<div class="offering-step-copy"><small>STEP 3</small><h3>Lock the commercial result and maximum exposure</h3><p>The product cannot enter approval without a qualifying event, evidence, cap and make-good.</p></div>
      <div class="offering-form three">
        ${selectField("Price model", "priceModel", state.priceModel, [
          ["per_retained_outcome", "Per retained outcome + cap"],
          ["funded_outcome", "Funded result pool"],
          ["workspace_subscription", "Workspace subscription"],
          ["subscription_usage", "Subscription + usage"],
          ["funder_paid_outcome", "Funder-paid work outcome"],
          ["no_charge", "No-charge required action"]
        ])}
        ${textField("Base price / subscription (INR)", "basePrice", state.basePrice)}
        ${textField("Maximum funded exposure (INR)", "fundedCap", state.fundedCap)}
        ${textField("Outcome capacity", "capacity", state.capacity)}
        ${textField("Active duration (days)", "duration", state.duration)}
        ${selectField("Settlement", "settlement", state.settlement, [
          ["After fulfilment and cancellation/return window", "After fulfilment and return window"],
          ["After accepted milestone", "After accepted milestone"],
          ["Before reserved capacity begins", "Before reserved capacity begins"]
        ])}
        <div class="wide">${textField("Qualifying guarantee unit", "guarantee", state.guarantee, "Do not use vague revenue, reach or income promises.", true)}</div>
        <div class="wide">${textField("Authoritative evidence", "evidence", state.evidence, "Name the records that prove completion and reversal.", true)}</div>
        <div class="wide">${selectField("If MoolSocial misses the contracted unit", "makeGood", state.makeGood, [
          ["Continue at MoolSocial cost or refund undelivered outcome units", "Continue at MoolSocial cost or refund undelivered units"],
          ["Rework the rejected deliverable at no extra charge", "Rework rejected deliverable"],
          ["Release unused reservation and refund the affected period", "Release reservation and refund affected period"],
          ["No commercial guarantee; fixed software entitlement only", "No outcome guarantee; entitlement only"]
        ])}</div>
      </div>
      <div class="commercial-lock"><i>₹</i><span><b>Maximum configured exposure</b><strong>₹${Number(state.fundedCap || 0).toLocaleString("en-IN")}</strong><small>Finance approval remains mandatory before launch.</small></span></div>`;
  }

  function experienceStep() {
    return `<div class="offering-step-copy"><small>STEP 4</small><h3>Bind the offering to the user's real next action</h3><p>The card must open an authoritative operating route, not a promotional dead end.</p></div>
      <div class="experience-layout">
        <div class="offering-form">
          ${textField("Workspace card headline", "headline", state.headline)}
          ${textField("Decision copy", "cardCopy", state.cardCopy, "Explain what the user can accomplish and what they should check.", true)}
          ${textField("Action label", "cta", state.cta)}
          ${selectField("Destination", "route", state.route, [
            ["/retailer/services/:serviceId?state=outcome-plan", "Retailer result plan"],
            ["/retailer/services/:serviceId?state=future-demand", "Retailer future demand"],
            ["/supply/services/:serviceId?state=outcome-plan", "Manufacturer / supply result plan"],
            ["/provider/growth?state=grow-results", "Provider growth result"],
            ["/creator/campaigns/:campaignId", "Creator campaign"],
            ["/earn/opportunities/:opportunityId", "Funded work opportunity"],
            ["/account/identity?state=workspace-documents", "Required workspace document"]
          ], "Only registered production route states may be selected.")}
        </div>
        <aside class="user-card-preview">
          <small>ELIGIBLE USER PREVIEW</small>
          <span class="preview-profile">${escapeHtml(selectedProfileLabels()[0] || "Eligible workspace")}</span>
          <i>Recommended result</i>
          <h4>${escapeHtml(state.headline)}</h4>
          <p>${escapeHtml(state.cardCopy)}</p>
          <span class="preview-meta"><b>${escapeHtml(state.capacity)}</b> target outcomes · <b>${escapeHtml(state.duration)}</b> days</span>
          <button type="button" disabled aria-disabled="true" title="Admin preview only">${escapeHtml(state.cta)}</button>
          <em>Why shown: profile, area and readiness matched</em>
        </aside>
      </div>
      <h4 class="op-subtitle">Permitted surfaces</h4>
      ${toggleButtons([
        ["workspace_home", "Workspace home", "Best next result"],
        ["workspace_catalogue", "Products & services", "Full eligible terms"],
        ["priority_inbox", "Priority Inbox", "Time-bound action"],
        ["chat", "Chat", "Transactional or approved notice"],
        ["push", "Push", "Consent/frequency controlled"]
      ], state.surfaces, "data-surface")}`;
  }

  function governanceStep() {
    return `<div class="offering-step-copy"><small>STEP 5</small><h3>Separate authority and control the rollout</h3><p>The provisioner cannot silently create, fund and publish a high-risk product.</p></div>
      <div class="offering-form two">
        ${textField("Product owner", "owner", state.owner)}
        ${selectField("Initial rollout", "rollout", state.rollout, [
          ["5% canary in Jodhpur", "5% canary in Jodhpur"],
          ["One invited workspace", "One invited workspace"],
          ["One enabled pin code", "One enabled pin code"],
          ["25% eligible audience", "25% eligible audience"],
          ["100% after canary approval", "100% after canary approval"]
        ])}
        ${selectField("Start", "start", state.start, [
          ["After required approvals", "After required approvals"],
          ["Schedule date after approval", "Schedule date after approval"],
          ["Manual launch after readiness review", "Manual launch after readiness review"]
        ])}
        ${selectField("Automatic stop rule", "stopRule", state.stopRule, [
          ["Pause on funding, capacity, complaint or journey-health threshold", "Funding, capacity, complaint or health threshold"],
          ["Pause when funded capacity is exhausted", "Funded capacity exhausted"],
          ["Manual stop only for required action", "Manual stop for required action"]
        ])}
      </div>
      <h4 class="op-subtitle">Required approvals</h4>
      ${toggleButtons([
        ["product", "Product owner", "Result, route and capability"],
        ["finance", "Finance", "Price, funding and maximum liability"],
        ["compliance", "Compliance", "Regulated scope, claims and terms"],
        ["operations", "Operations", "Capacity, fulfilment and support"]
      ], state.approvals, "data-approval")}
      <div class="governance-banner"><i>!</i><span><b>Independent emergency control</b><small>Launch Controller can pause. Emergency Controller can stop without changing orders, payments or evidence already in progress.</small></span></div>`;
  }

  function reviewStep() {
    if (state.receipt) {
      return `<section class="provisioning-receipt">
        <i>✓</i>
        <small>OFFERING VERSION CREATED</small>
        <h3>${escapeHtml(state.name)}</h3>
        <p>${escapeHtml(state.receipt.message)}</p>
        <div class="receipt-id"><span>REFERENCE</span><b>${state.receipt.id}</b></div>
        <div class="review-grid">
          <span><small>STATE</small><b>Approval requested</b></span>
          <span><small>TARGET</small><b>${escapeHtml(selectedProfileLabels().join(", "))}</b></span>
          <span><small>ROLLOUT</small><b>${escapeHtml(state.rollout)}</b></span>
          <span><small>MAX EXPOSURE</small><b>₹${Number(state.fundedCap || 0).toLocaleString("en-IN")}</b></span>
        </div>
        <div class="receipt-next"><b>What happens next</b><span>Product, Finance and Operations receive separate approval tasks. No user sees this offering until every required approval and canary readiness check passes.</span></div>
        <button type="button" class="receipt-another" data-action="new">Create another offering</button>
      </section>`;
    }
    return `<div class="offering-step-copy"><small>STEP 6</small><h3>Review the complete provision before approval</h3><p>This version is immutable after submission. Material changes create a new version and repeat the required approvals.</p></div>
      <div class="review-grid">
        <span><small>FOUNDATION</small><b>${escapeHtml(templates[state.template].label)}</b></span>
        <span><small>DIRECTION</small><b>${state.direction === "grow_my_business" ? "Workspace buys result" : state.direction === "earn_from_work" ? "User earns from work" : "Two separate paths"}</b></span>
        <span><small>ELIGIBLE ESTIMATE</small><b>${estimatedReach()}</b></span>
        <span><small>ROLLOUT</small><b>${escapeHtml(state.rollout)}</b></span>
      </div>
      <section class="review-contract">
        <div><small>OFFERING</small><h4>${escapeHtml(state.name)}</h4><p>${escapeHtml(state.result)}</p></div>
        <div><small>PROFILES</small><p>${escapeHtml(selectedProfileLabels().join(", "))}</p></div>
        <div><small>GUARANTEE</small><p>${escapeHtml(state.guarantee)}</p></div>
        <div><small>EVIDENCE</small><p>${escapeHtml(state.evidence)}</p></div>
        <div><small>MAKE-GOOD</small><p>${escapeHtml(state.makeGood)}</p></div>
        <div><small>DESTINATION</small><p>${escapeHtml(state.route)}</p></div>
      </section>
      <div class="final-lock"><i>✓</i><span><b>Provisioning checks complete</b><small>Capability binding, target profile, route, commercial cap, evidence, approvals, stop rule and rollback are present.</small></span></div>`;
  }

  function bodyForStep() {
    if (state.step === 0) return resultStep();
    if (state.step === 1) return eligibilityStep();
    if (state.step === 2) return commercialStep();
    if (state.step === 3) return experienceStep();
    if (state.step === 4) return governanceStep();
    return reviewStep();
  }

  function footer() {
    if (state.receipt) return "";
    const secondaryLabel = state.step === 0 ? "Save draft" : "Back";
    const primaryLabel = state.step === 5 ? "Send for approval" : "Continue";
    return `<footer class="offering-footer">
      <span class="offering-save-state">${state.draftSaved ? "Draft saved in this prototype session" : "Changes remain in this draft until submitted"}</span>
      <div>
        <button type="button" class="op-secondary" data-action="${state.step === 0 ? "save" : "back"}">${secondaryLabel}</button>
        <button type="button" class="op-primary" data-action="${state.step === 5 ? "submit" : "next"}">${primaryLabel}</button>
      </div>
    </footer>`;
  }

  function render() {
    wizard.innerHTML = `${stepHeader()}<div class="offering-body">${state.error ? `<div class="op-error" role="alert">${escapeHtml(state.error)}</div>` : ""}${bodyForStep()}</div>${footer()}`;
    bindCurrentStep();
  }

  function syncBoundField(target) {
    const key = target.dataset.bind;
    if (!key) return;
    state[key] = target.value;
    state.error = "";
    if (state.step === 3 && ["headline", "cardCopy", "cta"].includes(key)) {
      render();
    }
  }

  function toggleSet(set, id) {
    if (set.has(id)) set.delete(id);
    else set.add(id);
  }

  function selectCompatibleProfile(id) {
    const nextProfile = profiles.find((profile) => profile.id === id);
    if (!nextProfile) return;
    const selectedFamilies = new Set(
      profiles.filter((profile) => state.selectedProfiles.has(profile.id)).map((profile) => profile.family)
    );
    if (selectedFamilies.size && !selectedFamilies.has(nextProfile.family)) {
      state.selectedProfiles.clear();
    }
    toggleSet(state.selectedProfiles, id);
    if (["manufacturing", "wholesale"].includes(nextProfile.family)) {
      state.route = "/supply/services/:serviceId?state=outcome-plan";
    } else if (["food", "health", "pharmacy", "services"].includes(nextProfile.family)) {
      state.route = "/provider/growth?state=grow-results";
    } else if (nextProfile.family === "creator") {
      state.route = "/creator/campaigns/:campaignId";
    } else if (["work", "mobility", "delivery", "transport"].includes(nextProfile.family)) {
      state.route = "/earn/opportunities/:opportunityId";
    } else if (nextProfile.family === "retail") {
      state.route = templates[state.template].route;
    }
  }

  function validateStep() {
    wizard.querySelectorAll("[data-bind]").forEach((control) => {
      state[control.dataset.bind] = control.value;
    });
    if (state.step === 0 && (!state.name.trim() || !state.result.trim())) return "Add an offering name and an exact completed result before continuing.";
    if (state.step === 1 && state.selectedProfiles.size === 0) return "Select at least one eligible personal or workspace profile.";
    if (state.step === 2 && (!state.guarantee.trim() || !state.evidence.trim() || Number(state.capacity) < 1)) return "Add a qualifying guarantee, authoritative evidence and outcome capacity.";
    if (state.step === 3 && (!state.headline.trim() || !state.cta.trim() || !state.route.trim())) return "Complete the user card headline, action and registered destination.";
    if (state.step === 4 && (!state.owner.trim() || !state.approvals.has("product"))) return "Name the product owner and require Product approval.";
    return "";
  }

  function addProvisionedQueueItem() {
    if (document.querySelector(`[data-provisioned-id="${state.receipt.id}"]`)) return;
    const queue = document.querySelector(".queue-list");
    if (!queue) return;
    const record = {
      receipt: { ...state.receipt },
      name: state.name,
      profileIds: [...state.selectedProfiles],
      geography: state.geography,
      rollout: state.rollout,
      fundedCap: state.fundedCap
    };
    provisionedRecords.set(state.receipt.id, record);
    const item = document.createElement("button");
    item.type = "button";
    item.className = "queue-item provisioned";
    item.dataset.provisionedId = state.receipt.id;
    item.innerHTML = `<span class="queue-copy"><small>WORKSPACE OFFERING · ${state.receipt.id}</small><b>${escapeHtml(state.name)}</b><span>${escapeHtml(selectedProfileLabels().join(", "))} · ${escapeHtml(state.geography)}</span></span><span class="queue-side"><span class="pill warn">Approval</span><time>Version 1</time></span>`;
    item.addEventListener("click", () => openReceipt(record));
    queue.prepend(item);
  }

  function submitOffering() {
    state.receipt = {
      id: `OFR-20260718-${receiptSequence++}`,
      message: "The server-owned product version is ready for independent approval. Publishing remains blocked."
    };
    addProvisionedQueueItem();
    render();
  }

  function resetForNew() {
    state.step = 0;
    state.maxVisited = 0;
    state.receipt = null;
    state.draftSaved = false;
    state.error = "";
    applyTemplate("outcome_contract");
    render();
  }

  function openReceipt(record) {
    if (record) {
      state.receipt = { ...record.receipt };
      state.name = record.name;
      state.selectedProfiles = new Set(record.profileIds);
      state.geography = record.geography;
      state.rollout = record.rollout;
      state.fundedCap = record.fundedCap;
    }
    if (!state.receipt) return;
    state.step = 5;
    state.maxVisited = 5;
    state.error = "";
    backdrop.hidden = false;
    document.body.classList.add("offering-open");
    render();
  }

  function openWizard() {
    state.error = "";
    backdrop.hidden = false;
    document.body.classList.add("offering-open");
    render();
    const closeButton = wizard.querySelector(".offering-close");
    if (closeButton) closeButton.focus();
  }

  function closeWizard() {
    backdrop.hidden = true;
    document.body.classList.remove("offering-open");
    launchButton.focus();
  }

  function bindCurrentStep() {
    wizard.querySelectorAll("[data-bind]").forEach((control) => {
      control.addEventListener("change", (event) => syncBoundField(event.currentTarget));
      if (control.tagName === "INPUT" || control.tagName === "TEXTAREA") {
        control.addEventListener("input", (event) => {
          const key = event.currentTarget.dataset.bind;
          state[key] = event.currentTarget.value;
          state.error = "";
          if (state.step === 3) {
            const preview = wizard.querySelector(".user-card-preview");
            if (preview) {
              const headline = preview.querySelector("h4");
              const copy = preview.querySelector("p");
              const action = preview.querySelector("button");
              if (headline) headline.textContent = state.headline;
              if (copy) copy.textContent = state.cardCopy;
              if (action) action.textContent = state.cta;
            }
          }
        });
      }
    });

    wizard.querySelectorAll("[data-template]").forEach((button) => button.addEventListener("click", () => {
      applyTemplate(button.dataset.template);
      render();
    }));
    wizard.querySelectorAll("[data-family]").forEach((button) => button.addEventListener("click", () => {
      state.family = button.dataset.family;
      render();
    }));
    wizard.querySelectorAll("[data-profile]").forEach((button) => button.addEventListener("click", () => {
      selectCompatibleProfile(button.dataset.profile);
      state.error = "";
      render();
    }));
    wizard.querySelectorAll("[data-readiness]").forEach((button) => button.addEventListener("click", () => {
      toggleSet(state.readiness, button.dataset.readiness);
      render();
    }));
    wizard.querySelectorAll("[data-surface]").forEach((button) => button.addEventListener("click", () => {
      toggleSet(state.surfaces, button.dataset.surface);
      render();
    }));
    wizard.querySelectorAll("[data-approval]").forEach((button) => button.addEventListener("click", () => {
      toggleSet(state.approvals, button.dataset.approval);
      render();
    }));
    wizard.querySelectorAll("[data-jump-step]").forEach((button) => button.addEventListener("click", () => {
      state.step = Number(button.dataset.jumpStep);
      state.error = "";
      render();
    }));
    wizard.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "close") return closeWizard();
      if (action === "new") return resetForNew();
      if (action === "save") {
        state.draftSaved = true;
        state.error = "";
        return render();
      }
      if (action === "back") {
        state.step = Math.max(0, state.step - 1);
        state.error = "";
        return render();
      }
      if (action === "next") {
        const error = validateStep();
        if (error) {
          state.error = error;
          return render();
        }
        state.step = Math.min(5, state.step + 1);
        state.maxVisited = Math.max(state.maxVisited, state.step);
        state.error = "";
        return render();
      }
      if (action === "submit") {
        const error = validateStep();
        if (error) {
          state.error = error;
          return render();
        }
        return submitOffering();
      }
    }));
  }

  launchButton.addEventListener("click", openWizard);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeWizard();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !backdrop.hidden) closeWizard();
  });
})();
