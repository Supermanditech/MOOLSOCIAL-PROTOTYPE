(function(){
  "use strict";
  const cfg=window.adminScreenConfig;
  if(!cfg)return;
  const routes=[
    [147,"Command Centre","147-admin-command-centre.html","CC"],
    [148,"Verification","148-admin-workspace-verification.html","ID"],
    [149,"Catalogue","149-admin-catalogue-governance.html","SKU"],
    [150,"Commerce","150-admin-commerce-exceptions.html","CO"],
    [151,"Ride Ops","151-admin-ride-operations.html","RD"],
    [152,"Work Ops","152-admin-work-campaign-governance.html","WK"],
    [153,"Trust & Safety","153-admin-content-trust-safety.html","TS"],
    [154,"Finance","154-admin-finance-reconciliation.html","₹"],
    [155,"Support","155-admin-support-disputes.html","SP"],
    [156,"Launch & Config","156-admin-audience-launch-configuration.html","LC"],
    [163,"Activity & Health","163-admin-user-activity-product-health.html","AH"],
    [164,"Signals & Privacy","164-admin-signals-consent-personalization.html","SG"]
  ];
  const root=document.getElementById("app");
  const nav=routes.map(([id,label,file,icon])=>`<a class="nav-link ${id===cfg.screen?'active':''}" href="${file}"><i>${icon}</i><span>${label}</span></a>`).join("");
  const stats=cfg.stats.map(x=>`<span class="summary-card"><small>${x.label}</small><b>${x.value}</b><em>${x.note}</em></span>`).join("");
  const filters=cfg.filters.map((x,i)=>`<button class="filter ${i===0?'active':''}">${x}</button>`).join("");
  const items=cfg.items.map((x,i)=>`<button class="queue-item ${i===0?'active':''}" data-item="${i}"><span class="queue-copy"><small>${x.kicker}</small><b>${x.title}</b><span>${x.meta}</span></span><span class="queue-side"><span class="pill ${x.tone||''}">${x.status}</span><time>${x.time||''}</time></span></button>`).join("");
  root.innerHTML=`<section class="admin-shell"><aside class="admin-nav"><div><span class="admin-brand"><b>MoolSocial Admin</b><small>Governed operations console</small></span><nav class="nav-list">${nav}</nav></div><span class="admin-user"><i>AK</i><span><b>Anita Kulkarni</b><small>${cfg.role||'Operations Controller'}</small></span></span></aside><main class="admin-main"><header class="admin-top"><span class="admin-title"><h1>${cfg.title}</h1><span>${cfg.subtitle}</span></span><span class="admin-search"><input aria-label="Search" placeholder="Search ID, user, workspace, order or case"><button title="Search">S</button></span><button class="admin-alert" title="Priority alerts">!</button></header><div class="admin-content"><section class="summary-grid">${stats}</section><div class="filter-row">${filters}</div><section class="work-grid"><div class="queue"><div class="section-head"><b>${cfg.queueTitle}</b><span>${cfg.queueNote}</span></div><div class="queue-list">${items}</div></div><aside class="detail" id="detail"><div class="detail-head"><span><small id="detailKicker"></small><h2 id="detailTitle"></h2></span><button class="detail-close" id="detailClose">X</button></div><div class="detail-body" id="detailBody"></div></aside></section></div></main></section>`;
  const detail=document.getElementById("detail"),detailKicker=document.getElementById("detailKicker"),detailTitle=document.getElementById("detailTitle"),detailBody=document.getElementById("detailBody");
  function render(index){
    const item=cfg.items[index];
    document.querySelectorAll(".queue-item.active").forEach(x=>x.classList.remove("active"));
    document.querySelector(`[data-item="${index}"]`).classList.add("active");
    detailKicker.textContent=item.kicker;detailTitle.textContent=item.title;
    const facts=(item.facts||[]).map(x=>`<span class="fact"><small>${x[0]}</small><b>${x[1]}</b></span>`).join("");
    const steps=(item.steps||cfg.steps||[]).map((x,i)=>`<div class="progress-step ${i===(item.currentStep??cfg.currentStep??0)?'current':''}"><i>${i+1}</i><span><b>${x[0]}</b><small>${x[1]}</small></span></div>`).join("");
    const composer=item.composer||cfg.composer?`<div class="composer"><div class="field"><label>PURPOSE</label><select><option>${item.purpose||'Required action'}</option><option>Feature launch</option><option>Offer or promotion</option><option>Work opportunity</option><option>Safety notice</option></select></div><div class="field"><label>AUDIENCE RULE</label><input value="${item.audience||'Eligible verified users in selected area'}"></div><div class="field"><label>MESSAGE</label><textarea>${item.message||'Open MoolSocial to review and take the next action.'}</textarea></div><div class="channel-row"><button class="channel on">In-app</button><button class="channel on">Push</button><button class="channel">Chat</button><button class="channel">Email</button><button class="channel">SMS</button></div></div>`:'';
    detailBody.innerHTML=`${facts?`<div class="fact-grid">${facts}</div>`:''}<p class="detail-text">${item.detail}</p>${composer}${steps?`<div class="progress-list">${steps}</div>`:''}<div class="status-note ${item.noteTone||''}">${item.note||cfg.note}</div><div class="action-row"><button class="secondary" id="secondaryAction">${item.secondary||cfg.secondary||'Hold'}</button><button class="primary" id="primaryAction">${item.primary||cfg.primary||'Continue'}</button></div>`;
    detail.classList.add("open");
    document.querySelectorAll(".channel").forEach(x=>x.onclick=()=>x.classList.toggle("on"));
    document.getElementById("secondaryAction").onclick=()=>{document.querySelector(".status-note").textContent=item.secondaryResult||"Held with reason and audit record."};
    document.getElementById("primaryAction").onclick=()=>{document.querySelector(".status-note").textContent=item.primaryResult||"Action recorded. The next required step is now open.";document.querySelector(".status-note").classList.remove("warn")};
  }
  document.querySelectorAll("[data-item]").forEach(x=>x.onclick=()=>render(Number(x.dataset.item)));
  document.querySelectorAll(".filter").forEach(x=>x.onclick=()=>{document.querySelectorAll(".filter.active").forEach(y=>y.classList.remove("active"));x.classList.add("active")});
  document.getElementById("detailClose").onclick=()=>detail.classList.remove("open");
  render(0);
})();
