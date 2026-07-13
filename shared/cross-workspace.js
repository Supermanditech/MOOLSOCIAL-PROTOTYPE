(()=>{
  const c=window.crossScreenConfig||{};
  const app=document.querySelector("#app");
  let active=(c.filters||[])[0]||"All";
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  const icon=t=>({Required:"!",Orders:"O",Work:"₹",Offers:"%",Updates:"+",Identity:"ID",Files:"F",Security:"S",Workspace:"W",Personal:"P",Social:"@",Communication:"C",Availability:"ON",Privacy:"◌"}[t]||"•");

  function render(){
    const items=(c.items||[]).filter(x=>active==="All"||x.category===active||x.tags?.includes(active));
    app.innerHTML=`<div class="app">
      <header class="top"><div class="brandline"><button class="back" aria-label="Back">‹</button><div class="headcopy"><h1>${esc(c.title)}</h1><p>${esc(c.subtitle)}</p></div>${c.topAction?`<button class="topAction">${esc(c.topAction)}</button>`:""}</div></header>
      <section class="hero"><small>${esc(c.hero?.kicker||"MOOLSOCIAL")}</small><h2>${esc(c.hero?.title||"Everything important, in one place")}</h2><p>${esc(c.hero?.text||"")}</p></section>
      ${c.stats?.length?`<section class="stats">${c.stats.map(s=>`<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}</section>`:""}
      ${c.filters?.length?`<nav class="filters" aria-label="Filters">${c.filters.map(f=>`<button class="filter ${f===active?"active":""}" data-filter="${esc(f)}">${esc(f)}</button>`).join("")}</nav>`:""}
      <div class="sectionTitle"><h3>${esc(c.listTitle||"Your activity")}</h3><span>${esc(c.listNote||"tap to continue")}</span></div>
      <section class="list">${items.length?items.map(x=>`<button class="row" data-item="${(c.items||[]).indexOf(x)}"><span class="glyph ${x.tone||""}">${esc(x.glyph||icon(x.category))}</span><span class="rowcopy"><span class="rowtop"><strong>${esc(x.title)}</strong>${x.category?`<span class="tag">${esc(x.category)}</span>`:""}</span><p>${esc(x.summary)}</p><span class="meta">${esc(x.meta||"")}</span></span><span class="rowend">${x.unread?'<i class="unread"></i>':""}<time>${esc(x.time||"")}</time><b>›</b></span></button>`).join(""):'<div class="empty">Nothing needs your attention here.</div>'}</section>
      <nav class="dock"><a href="../screens/04-universal-focus-shell.html"><i>◉</i>Mool</a><a class="${c.screen===157?"active":""}" href="157-shared-priority-inbox.html"><i>◫</i>Activity</a><a class="${c.screen===162||c.screen===165?"active":""}" href="162-shared-workspaces-settings-analytics.html"><i>▣</i>Workspaces</a><a href="../screens/23-chat-inbox-home.html"><i>□</i>Chat</a></nav>
    </div><div class="shade"></div><aside class="sheet" aria-live="polite"></aside><div class="toast"></div>`;
    bind();
  }

  function bind(){
    document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{active=b.dataset.filter;render()});
    document.querySelectorAll("[data-item]").forEach(b=>b.onclick=()=>open(c.items[+b.dataset.item]));
    document.querySelector(".shade").onclick=close;
    document.querySelector(".back").onclick=()=>history.length>1?history.back():location.assign("../screens/04-universal-focus-shell.html");
    document.querySelector(".topAction")?.addEventListener("click",()=>toast(c.topResult||"Action opened."));
  }

  function open(x){
    const sheet=document.querySelector(".sheet");
    const shade=document.querySelector(".shade");
    const controls=x.controls?.length?`<div class="control-list">${x.controls.map((control,index)=>`<button class="control-row" data-setting="${index}" role="switch" aria-checked="${control.on?"true":"false"}" aria-disabled="${control.locked?"true":"false"}"><span><b>${esc(control.label)}</b><small>${esc(control.note||"")}</small></span><i class="toggle ${control.on?"on":""} ${control.locked?"locked":""}"><em></em></i></button>`).join("")}</div>`:"";
    const schedule=x.schedule?.length?`<div class="schedule-block"><div class="schedule-head"><b>${esc(x.scheduleTitle||"Automatic schedule")}</b><span>${esc(x.timezone||"Asia/Kolkata")}</span></div>${x.schedule.map(s=>`<div class="schedule-row"><strong>${esc(s[0])}</strong><span>${esc(s[1])}</span></div>`).join("")}</div>`:"";
    const preview=x.preview?`<div class="customer-preview"><small>LIVE PREVIEW</small><b>${esc(x.preview[0])}</b><span>${esc(x.preview[1])}</span></div>`:"";
    const facts=x.facts?.length?`<div class="facts">${x.facts.map(f=>`<div class="fact"><small>${esc(f[0])}</small><strong>${esc(f[1])}</strong></div>`).join("")}</div>`:"";
    const steps=x.steps?.length?`<div class="steps">${x.steps.map((s,i)=>`<div class="step ${i<x.currentStep?"done":i===x.currentStep?"active":""}"><i>${i<x.currentStep?"✓":i+1}</i><div><strong>${esc(s[0])}</strong><div class="meta">${esc(s[1])}</div></div></div>`).join("")}</div>`:"";
    sheet.innerHTML=`<div class="sheethead"><span class="glyph ${x.tone||""}">${esc(x.glyph||icon(x.category))}</span><div><h2>${esc(x.title)}</h2><p>${esc(x.summary)}</p></div><button class="iconbtn close" aria-label="Close">×</button></div>${x.why?`<div class="why"><strong>What this controls</strong><br>${esc(x.why)}</div>`:""}${preview}${facts}${controls}${schedule}${steps}<div class="actions">${x.secondary?`<button class="secondary">${esc(x.secondary)}</button>`:""}<button class="primary">${esc(x.primary||"Save changes")}</button></div>`;
    sheet.querySelector(".close").onclick=close;
    sheet.querySelectorAll("[data-setting]").forEach(button=>button.onclick=()=>{
      const control=x.controls[+button.dataset.setting];
      if(control.locked){toast(control.lockedMessage||"This required setting cannot be turned off here.");return;}
      control.on=!control.on;
      button.setAttribute("aria-checked",String(control.on));
      button.querySelector(".toggle").classList.toggle("on",control.on);
      toast(`${control.label}: ${control.on?"On":"Off"}`);
    });
    sheet.querySelector(".primary").onclick=()=>{
      const destination=x.href||(c.screen===162&&x.category==="Settings"?"165-shared-personalized-controls.html":null);
      if(destination){location.assign(destination);return;}
      toast(x.result||`${x.primary||"Changes"} saved.`);
      x.unread=false;
    };
    sheet.querySelector(".secondary")?.addEventListener("click",()=>toast(x.secondaryResult||"Temporary override opened."));
    shade.classList.add("open");
    sheet.classList.add("open");
  }

  function close(){
    document.querySelector(".shade")?.classList.remove("open");
    document.querySelector(".sheet")?.classList.remove("open");
  }

  function toast(message){
    const element=document.querySelector(".toast");
    element.textContent=message;
    element.classList.add("show");
    setTimeout(()=>element.classList.remove("show"),2200);
  }

  render();
})();
