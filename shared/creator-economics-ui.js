(function () {
  "use strict";

  const script = document.currentScript;
  const surface = script?.dataset.surface || "";
  const profile = script?.dataset.profile || "business";
  const params = new URLSearchParams(location.search);
  const requested = params.get("engine") || params.get("earning") || params.get("source");

  const engines = {
    funded_campaign: {
      short: "Campaign",
      title: "Funded campaign fee + outcome bonus",
      funder: "Verified business or MoolSocial",
      value: "₹3,500 fixed + ₹40/order",
      qualify: "Approved content; bonus after completed, non-refunded orders",
      creator: "129-creator-campaigns.html?engine=funded_campaign",
      action: "125-creator-create-publish.html?earning=funded_campaign&campaign=CAM-2401",
      consumer: "05-social-shorts.html?earning=funded_campaign&campaign=CAM-2401",
      ledger: "130-creator-earnings-payouts.html?source=funded_campaign"
    },
    attributed_commerce: {
      short: "Commerce",
      title: "Attributed product or service share",
      funder: "Retailer, supplier or provider",
      value: "₹40/order · 7-day attribution",
      qualify: "Eligible content touch + paid completion + refund window closed",
      creator: "129-creator-campaigns.html?engine=attributed_commerce",
      action: "125-creator-create-publish.html?earning=attributed_commerce&sku=BASKET-399",
      consumer: "05-social-shorts.html?earning=attributed_commerce&content=CT-884&sku=BASKET-399",
      ledger: "130-creator-earnings-payouts.html?source=attributed_commerce"
    },
    membership: {
      short: "Members",
      title: "Monthly and annual memberships",
      funder: "Member subscription payment",
      value: "₹99/month or ₹999/year",
      qualify: "Successful payment after applicable refund or cooling hold",
      creator: "132-creator-memberships.html?engine=membership",
      action: "132-creator-memberships.html?engine=membership&state=plan",
      consumer: "07-social-feed.html?earning=membership&creator=JodhpurDaily",
      ledger: "130-creator-earnings-payouts.html?source=membership"
    },
    content_pool: {
      short: "Content pool",
      title: "Content-performance revenue pool",
      funder: "Dated MoolSocial revenue pool",
      value: "₹1,860 current estimate",
      qualify: "Original eligible content + valid performance + monthly close",
      creator: "127-creator-content-performance.html?engine=content_pool",
      action: "127-creator-content-performance.html?engine=content_pool&state=allocation",
      consumer: "06-social-videos.html?earning=content_pool&content=CT-991",
      ledger: "130-creator-earnings-payouts.html?source=content_pool"
    },
    local_production: {
      short: "Local brief",
      title: "Paid content production for local business",
      funder: "Verified local business",
      value: "₹4,500 fixed · 1 revision",
      qualify: "Asset matches brief and buyer approves or governed review closes",
      creator: "129-creator-campaigns.html?engine=local_production",
      action: "125-creator-create-publish.html?earning=local_production&brief=BR-771",
      consumer: null,
      ledger: "130-creator-earnings-payouts.html?source=local_production"
    },
    verified_onboarding: {
      short: "Onboarding",
      title: "Verified workspace or user onboarding",
      funder: "Reserved activation bounty",
      value: "₹450/verified activation",
      qualify: "Verification + declared meaningful activation; never install or OTP alone",
      creator: "133-earn-opportunities.html?engine=verified_onboarding",
      action: "134-earn-applications-eligibility.html?engine=verified_onboarding&opportunity=ONB-118",
      consumer: "70-my-work-choose-activity.html?source=creator_onboarding",
      ledger: "130-creator-earnings-payouts.html?source=verified_onboarding"
    },
    live_event: {
      short: "Live event",
      title: "Live campaign and launch event",
      funder: "Business or MoolSocial event budget",
      value: "₹6,000 host + qualified outcome pool",
      qualify: "Event delivered; outcome share after valid attendance or commerce",
      creator: "129-creator-campaigns.html?engine=live_event",
      action: "125-creator-create-publish.html?earning=live_event&event=LIVE-72",
      consumer: "07-social-feed.html?earning=live_event&event=LIVE-72",
      ledger: "130-creator-earnings-payouts.html?source=live_event"
    },
    licensed_reuse: {
      short: "Licence",
      title: "Licensed content reuse",
      funder: "Verified content buyer",
      value: "₹8,000 · Rajasthan · 90 days",
      qualify: "Rights verified + creator-approved scope + licence receipt issued",
      creator: "131-creator-verification-rights-safety.html?engine=licensed_reuse",
      action: "131-creator-verification-rights-safety.html?engine=licensed_reuse&state=review",
      consumer: null,
      ledger: "130-creator-earnings-payouts.html?source=licensed_reuse"
    }
  };

  const ids = Object.keys(engines);
  const currentId = engines[requested] ? requested : "funded_campaign";
  const current = engines[currentId];

  const style = document.createElement("style");
  style.textContent = `
    .ce-panel{display:grid;gap:9px;margin:10px 0;border:1px solid #d9ddec;border-left:4px solid #138808;border-radius:8px;background:#fff;padding:11px;color:#101331;box-shadow:0 8px 22px rgba(0,0,80,.08)}
    .ce-panel *{box-sizing:border-box;letter-spacing:0}.ce-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}.ce-head span{display:grid;gap:2px}.ce-head small{color:#138808;font-size:8px;font-weight:900}.ce-head b{color:#000080;font-size:13px}.ce-state{flex:0 0 auto;border-radius:999px;background:#eef9ed;padding:5px 7px;color:#138808;font-size:8px;font-weight:900}
    .ce-rail{display:flex;gap:6px;overflow-x:auto;padding:1px 0 4px;scrollbar-width:none}.ce-chip{flex:0 0 auto;border:1px solid #d9ddec;border-radius:999px;background:#fff;padding:7px 9px;color:#000080;text-decoration:none;font-size:8px;font-weight:900}.ce-chip.active{border-color:#000080;background:#000080;color:#fff;box-shadow:inset 0 -3px 0 #ff9933}
    .ce-card{display:grid;gap:8px;border:1px solid #e4e6f0;border-radius:8px;background:#f7f8fc;padding:10px}.ce-card h3{margin:0;color:#000080;font-size:14px}.ce-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.ce-fact{display:grid;gap:2px;border-left:3px solid #ff9933;background:#fff;padding:7px}.ce-fact small{color:#68708a;font-size:7px;font-weight:900}.ce-fact b{font-size:9px;line-height:1.25}.ce-rule{margin:0;color:#4d546d;font-size:8px;line-height:1.35}.ce-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px}.ce-button{min-height:38px;display:grid;place-items:center;border:1px solid #000080;border-radius:7px;background:#fff;color:#000080;text-decoration:none;font-size:9px;font-weight:900}.ce-button.primary{background:#000080;color:#fff}.ce-flow{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px}.ce-flow span{display:grid;place-items:center;min-height:32px;border-radius:6px;background:#eef0f9;color:#000080;text-align:center;font-size:6px;font-weight:900}.ce-flow span.done{background:#e9f7e7;color:#138808}
    .ce-source-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.ce-source{display:grid;gap:3px;border:1px solid #d9ddec;border-radius:7px;background:#fff;padding:8px;text-decoration:none}.ce-source small{color:#68708a;font-size:7px;font-weight:900}.ce-source b{color:#000080;font-size:11px}.ce-source em{color:#138808;font-size:8px;font-style:normal;font-weight:900}
    .ce-social{position:absolute;z-index:14;left:14px;right:74px;bottom:92px;display:grid;gap:5px;border-left:4px solid #ff9933;border-radius:7px;background:rgba(5,7,28,.9);padding:9px;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.28)}.ce-social small{font-size:7px;font-weight:900;color:#ffd6a2}.ce-social b{font-size:11px}.ce-social span{font-size:8px;line-height:1.25}.ce-social a{justify-self:start;border-radius:999px;background:#fff;padding:7px 11px;color:#000080;text-decoration:none;font-size:8px;font-weight:900}
    @media(min-width:851px){.ce-source-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.ce-social{left:22px;right:84px}}
  `;
  document.head.appendChild(style);

  function panelBase(kicker, title, state) {
    const panel = document.createElement("section");
    panel.className = "ce-panel";
    panel.innerHTML = `<div class="ce-head"><span><small>${kicker}</small><b>${title}</b></span><em class="ce-state">${state}</em></div>`;
    return panel;
  }

  function rail(baseParam) {
    return `<div class="ce-rail">${ids.map(id => `<a class="ce-chip ${id === currentId ? "active" : ""}" href="?${baseParam}=${id}">${engines[id].short}</a>`).join("")}</div>`;
  }

  function detailCard(primaryLabel, primaryHref, secondaryLabel, secondaryHref) {
    return `<div class="ce-card"><h3>${current.title}</h3><div class="ce-facts"><span class="ce-fact"><small>FUNDED BY</small><b>${current.funder}</b></span><span class="ce-fact"><small>VISIBLE VALUE</small><b>${current.value}</b></span></div><p class="ce-rule"><b>Becomes payable:</b> ${current.qualify}</p><div class="ce-flow"><span class="done">Fund</span><span>Accept</span><span>Deliver</span><span>Verify</span><span>Pay</span></div><div class="ce-actions"><a class="ce-button" href="${secondaryHref}">${secondaryLabel}</a><a class="ce-button primary" href="${primaryHref}">${primaryLabel}</a></div></div>`;
  }

  function contentRoot() {
    return document.querySelector(".content") ||
      document.querySelector(".screen-scroll") ||
      document.querySelector(".workspace-content") ||
      document.querySelector(".page-content") ||
      document.querySelector(".scroll") ||
      document.querySelector(".phone main") ||
      document.querySelector(".phone") ||
      document.body;
  }

  function insertTop(panel) {
    const root = contentRoot();
    const first = root.firstElementChild;
    if (first) first.insertAdjacentElement("afterend", panel); else root.appendChild(panel);
  }

  function renderCreatorHome() {
    const panel = panelBase("EARNING ENGINE", "Eight funded ways to earn", "all sources live");
    panel.innerHTML += `<div class="ce-source-grid">${ids.map(id => `<a class="ce-source" href="${engines[id].creator}"><small>${engines[id].short.toUpperCase()}</small><b>${engines[id].value}</b><em>Open</em></a>`).join("")}</div>`;
    insertTop(panel);
  }

  function renderCreatorCampaigns() {
    const panel = panelBase("DIRECT FUNDED OPPORTUNITY", "Choose one earning route", "funding checked");
    panel.innerHTML += rail("engine") + detailCard("Review and continue", current.action, "See earning record", current.ledger);
    insertTop(panel);
  }

  function renderCreatorDelivery() {
    if (!requested || !engines[requested]) return;
    const panel = panelBase("BOUND EARNING BRIEF", current.title, "terms attached");
    panel.innerHTML += `<div class="ce-facts"><span class="ce-fact"><small>FUNDED VALUE</small><b>${current.value}</b></span><span class="ce-fact"><small>QUALIFYING RULE</small><b>${current.qualify}</b></span></div><p class="ce-rule">Content ID, campaign or work ID, rights scope and required commercial disclosure travel with this draft through upload, moderation and submission.</p><div class="ce-actions"><a class="ce-button" href="${current.creator}">Review terms</a><a class="ce-button primary" href="${current.ledger}">Preview ledger source</a></div>`;
    insertTop(panel);
  }

  function renderCreatorPerformance() {
    if (currentId !== "content_pool" && currentId !== "attributed_commerce") return;
    const panel = panelBase("VERSIONED ATTRIBUTION", current.title, "server calculated");
    panel.innerHTML += `<div class="ce-facts"><span class="ce-fact"><small>ESTIMATED VALUE</small><b>${current.value}</b></span><span class="ce-fact"><small>RELEASE</small><b>${current.qualify}</b></span></div><div class="ce-flow"><span class="done">Events</span><span class="done">Validate</span><span>Close</span><span>Ledger</span><span>Pay</span></div><p class="ce-rule">The creator sees aggregated evidence and the rule version, never private consumer identity or raw purchase history.</p><div class="ce-actions"><a class="ce-button" href="${current.creator}">Source terms</a><a class="ce-button primary" href="${current.ledger}">Trace earning</a></div>`;
    insertTop(panel);
  }

  function renderCreatorEarnings() {
    const panel = panelBase("AUTHORITATIVE LEDGER", "Earnings by source", "8 sources");
    panel.innerHTML += `<div class="ce-source-grid">${ids.map((id, index) => { const e = engines[id]; const values = ["₹8,540", "₹5,040", "₹22,680", "₹1,860", "₹4,500", "₹1,350", "₹6,000", "₹8,000"]; return `<a class="ce-source" href="?source=${id}"><small>${e.short.toUpperCase()}</small><b>${values[index]}</b><em>${id === currentId ? "Selected" : "Trace source"}</em></a>`; }).join("")}</div>` + detailCard("Open source proof", current.creator, "Creator statement", "130-creator-earnings-payouts.html?statement=1");
    insertTop(panel);
  }

  function renderMembership() {
    const membership = engines.membership;
    const panel = panelBase("RECURRING CREATOR INCOME", "Member-to-ledger journey", "payment protected");
    panel.innerHTML += `<div class="ce-flow"><span class="done">Plan</span><span>Join</span><span>Pay</span><span>Hold</span><span>Payout</span></div><p class="ce-rule">Monthly and annual pricing, renewal, cancellation, platform fee and creator take-home are visible before the member confirms.</p><div class="ce-actions"><a class="ce-button" href="${membership.consumer}">Preview member view</a><a class="ce-button primary" href="${membership.ledger}">Trace payout</a></div>`;
    insertTop(panel);
  }

  function renderRights() {
    const licence = engines.licensed_reuse;
    const panel = panelBase("RIGHTS COMMERCE", "Licence content without transferring ownership", "scope controlled");
    panel.innerHTML += `<div class="ce-facts"><span class="ce-fact"><small>REQUEST</small><b>Retail campaign reuse</b></span><span class="ce-fact"><small>OFFER</small><b>${licence.value}</b></span><span class="ce-fact"><small>MEDIA</small><b>In-app + social ads</b></span><span class="ce-fact"><small>EDIT RIGHTS</small><b>Crop only</b></span></div><p class="ce-rule">Approval issues a versioned licence receipt. Territory, term, media and permitted edits remain enforceable.</p><div class="ce-actions"><a class="ce-button" href="${licence.ledger}">See held fee</a><a class="ce-button primary" href="?engine=licensed_reuse&state=review">Review request</a></div>`;
    insertTop(panel);
  }

  function businessEntry(id) {
    const mappings = {
      retailer: {
        funded_campaign: "100-retailer-offer-campaign-builder.html?mode=creator&engine=funded_campaign",
        attributed_commerce: "99-retailer-offers-campaigns.html?mode=creator&engine=attributed_commerce",
        local_production: "100-retailer-offer-campaign-builder.html?mode=creator&engine=local_production",
        live_event: "100-retailer-offer-campaign-builder.html?mode=creator&engine=live_event",
        licensed_reuse: "99-retailer-offers-campaigns.html?mode=creator&engine=licensed_reuse"
      },
      manufacturer: {
        funded_campaign: "113-manufacturer-buyers-demand-campaigns.html?mode=creator&engine=funded_campaign",
        attributed_commerce: "113-manufacturer-buyers-demand-campaigns.html?mode=creator&engine=attributed_commerce",
        local_production: "113-manufacturer-buyers-demand-campaigns.html?mode=creator&engine=local_production",
        live_event: "113-manufacturer-buyers-demand-campaigns.html?mode=creator&engine=live_event",
        licensed_reuse: "113-manufacturer-buyers-demand-campaigns.html?mode=creator&engine=licensed_reuse"
      },
      provider: {
        funded_campaign: "145-provider-growth.html?mode=creator&engine=funded_campaign",
        attributed_commerce: "145-provider-growth.html?mode=creator&engine=attributed_commerce",
        local_production: "145-provider-growth.html?mode=creator&engine=local_production",
        live_event: "145-provider-growth.html?mode=creator&engine=live_event",
        licensed_reuse: "145-provider-growth.html?mode=creator&engine=licensed_reuse"
      }
    };
    return mappings[profile]?.[id] || mappings.retailer[id];
  }

  function fundingEntry(id) {
    if (id === "live_event") {
      return "156-admin-audience-launch-configuration.html?engine=live_event&source=business_funding";
    }
    if (id === "licensed_reuse") {
      return "131-creator-verification-rights-safety.html?engine=licensed_reuse&source=business_funding";
    }
    return `${businessEntry(id)}&state=fund`;
  }

  function renderBusiness() {
    const available = ["funded_campaign", "attributed_commerce", "local_production", "live_event", "licensed_reuse"];
    const selected = available.includes(currentId) ? currentId : "funded_campaign";
    const e = engines[selected];
    const panel = panelBase("CREATOR GROWTH", "Fund a measurable creator outcome", "money reserved first");
    panel.innerHTML += `<div class="ce-rail">${available.map(id => `<a class="ce-chip ${id === selected ? "active" : ""}" href="${businessEntry(id)}">${engines[id].short}</a>`).join("")}</div><div class="ce-card"><h3>${e.title}</h3><div class="ce-facts"><span class="ce-fact"><small>YOUR COMMITMENT</small><b>${e.value}</b></span><span class="ce-fact"><small>RELEASE RULE</small><b>${e.qualify}</b></span></div><p class="ce-rule">Budget, output, capacity, geography, rights, disclosure and stop rule are reviewed before creators can see this opportunity.</p><div class="ce-actions"><a class="ce-button" href="${e.creator}">Preview creator view</a><a class="ce-button primary" href="${fundingEntry(selected)}">Set terms and reserve</a></div></div>`;
    insertTop(panel);
  }

  function renderEarn() {
    if (requested && currentId !== "verified_onboarding") return;
    const onboarding = engines.verified_onboarding;
    const panel = panelBase("VERIFIED ACTIVATION WORK", "Onboarding earning is outcome-based", "118 funded seats");
    panel.innerHTML += `<div class="ce-card"><h3>${onboarding.title}</h3><div class="ce-facts"><span class="ce-fact"><small>FUNDED VALUE</small><b>${onboarding.value}</b></span><span class="ce-fact"><small>QUALIFIES AFTER</small><b>${onboarding.qualify}</b></span></div><div class="ce-actions"><a class="ce-button" href="${onboarding.ledger}">Trace final earning</a><a class="ce-button primary" href="${onboarding.action}">Check eligibility</a></div></div>`;
    insertTop(panel);
  }

  function renderSocial() {
    if (!requested || !engines[requested]) return;
    const e = engines[requested];
    const actions = {
      funded_campaign: ["View campaign action", "09-buy.html?campaign=CAM-2401"],
      attributed_commerce: ["Shop linked basket", "09-buy.html?content=CT-884&sku=BASKET-399"],
      membership: ["Join membership", "62-pay-request-confirmation.html?purpose=membership&amount=99&creator=JodhpurDaily"],
      content_pool: ["View creator channel", "128-creator-audience-community.html?view=public"],
      live_event: ["Join live event", "62-pay-request-confirmation.html?purpose=live_event&event=LIVE-72&amount=0"]
    };
    const action = actions[requested];
    if (!action) return;
    const host = document.querySelector(".phone") || document.body;
    const card = document.createElement("section");
    card.className = "ce-social";
    card.innerHTML = `<small>${requested === "content_pool" ? "ELIGIBLE ORIGINAL CONTENT" : "PAID OR EARNING-LINKED CONTENT"}</small><b>${e.title}</b><span>${e.qualify}</span><a href="${action[1]}">${action[0]}</a>`;
    host.appendChild(card);
  }

  const renderers = {
    "creator-home": renderCreatorHome,
    "creator-delivery": renderCreatorDelivery,
    "creator-campaigns": renderCreatorCampaigns,
    "creator-performance": renderCreatorPerformance,
    "creator-earnings": renderCreatorEarnings,
    "creator-memberships": renderMembership,
    "creator-rights": renderRights,
    "business-funding": renderBusiness,
    "earn-onboarding": renderEarn,
    "consumer-social": renderSocial
  };

  if (renderers[surface]) renderers[surface]();
})();
