// DropPilot — runtime: i18n, dashboard render, ETA tick, gas pulse,
// risk profile tabs, wallet eligibility, agent operations panels,
// reasoning trace drawer, natural-language command parser.
(function(){
  "use strict";

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const I18N = window.DP_I18N || {};
  const DATA = window.DP_DATA || { drops:[], feed:[], riskProfiles:{}, eligibilityResults:[], agents:[], tools:[], router:{}, reasoning:{} };

  function lang(){ return document.documentElement.dataset.lang || "en"; }
  function dict(){ return I18N[lang()] || I18N.en || {}; }

  /* ============================================================
     i18n: text + placeholders + colored value spans
     ============================================================ */
  function paintColored(el, value){
    if(typeof value !== "string") { el.textContent = ""; return; }
    if(value.indexOf("{v}") === -1){ el.textContent = value; return; }
    el.innerHTML = "";
    const re = /\{v\}([\s\S]*?)\{\/v\}/g;
    let last = 0, m;
    while((m = re.exec(value)) !== null){
      if(m.index > last){
        el.appendChild(document.createTextNode(value.slice(last, m.index)));
      }
      const span = document.createElement("span");
      span.className = "v";
      span.textContent = m[1];
      el.appendChild(span);
      last = re.lastIndex;
    }
    if(last < value.length){
      el.appendChild(document.createTextNode(value.slice(last)));
    }
  }

  function applyI18n(){
    const d = dict();
    document.documentElement.lang = lang() === "zh" ? "zh-CN" : (lang() === "id" ? "id" : "en");
    $$("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      if(d[k] != null) paintColored(el, d[k]);
    });
    $$("[data-i18n-placeholder]").forEach(el => {
      const k = el.dataset.i18nPlaceholder;
      if(d[k] != null) el.placeholder = d[k];
    });
    renderQueue();
    renderFeed();
    renderRiskProfile(activeRiskTab);
    if(eligLastResults){ renderEligibility(eligLastResults); }
    renderAgents();
    renderTools();
    renderRouter();
    if(activeTraceId){ openTrace(activeTraceId); }
    updateHeroTimestamp();
  }

  function bindLangSwitch(){
    $$("[data-lang]").forEach(btn => {
      btn.addEventListener("click", () => {
        const newLang = btn.dataset.lang;
        document.documentElement.dataset.lang = newLang;
        $$("[data-lang]").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === newLang ? "true" : "false"));
        applyI18n();
      });
    });
  }

  /* ============================================================
     Drop queue
     ============================================================ */
  function fmtETA(seconds){
    if(seconds <= 0) return null;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if(h > 0) return `${h}h ${String(m).padStart(2,"0")}m`;
    return `${m}m ${String(s).padStart(2,"0")}s`;
  }
  function stageClass(stage){ return stage === "AL" ? "al" : stage === "FCFS" ? "fcfs" : "public"; }
  function stageLabel(drop){ return (drop.stageLabel && drop.stageLabel[lang()]) || drop.stage; }
  function riskLabel(level){
    const d = dict();
    return level === "low" ? d["drop.risk.low"] : level === "med" ? d["drop.risk.med"] : d["drop.risk.hi"];
  }
  function actionLabel(drop){
    const d = dict();
    if(drop.riskLevel === "hi") return d["drop.action.block"];
    if(drop.eta < 600) return d["drop.action.alert"];
    return d["drop.action.watch"];
  }

  function renderQueue(){
    const list = $("#queue-list");
    if(!list) return;
    const d = dict();
    list.innerHTML = "";
    const sorted = DATA.drops.slice().sort((a,b) => a.eta - b.eta);
    sorted.forEach((drop, idx) => {
      const row = document.createElement("div");
      row.className = "drop-row";
      row.dataset.id = drop.id;
      if(idx === 0) row.dataset.active = "true";
      const eta = fmtETA(drop.eta);
      const etaText = eta || d["drop.eta.now"] || "OPEN";
      const traceLbl = d["trace.btn.label"] || "Trace AI reasoning";
      row.innerHTML = `
        <div class="drop-thumb" aria-hidden="true">${drop.thumb}</div>
        <div class="drop-info">
          <div class="drop-name">
            <span>${drop.name}</span>
            <span class="stage ${stageClass(drop.stage)}">${stageLabel(drop)}</span>
          </div>
          <div class="drop-meta">
            <span class="chain">${drop.chain}</span>
            <span class="supply">${drop.supply} · ${drop.price}</span>
          </div>
        </div>
        <div class="drop-countdown">
          <span>${etaText}</span>
          <span class="lbl">${d["drop.eta"] || "Until stage"}</span>
        </div>
        <div class="drop-risk" data-level="${drop.riskLevel}" aria-label="risk ${drop.risk} of 100">
          <span class="ring">${drop.risk}</span>
          <span class="lbl">${riskLabel(drop.riskLevel)}</span>
        </div>
        <button class="drop-trace-btn" type="button" data-action="trace-open" data-id="${drop.id}" aria-label="${traceLbl}">${traceLbl}</button>
        <button class="drop-action" type="button">${actionLabel(drop)}</button>
      `;
      list.appendChild(row);
    });
    bindTraceButtons();
  }

  let tickerTimer = null;
  function startQueueTick(){
    if(tickerTimer) return;
    tickerTimer = setInterval(() => {
      DATA.drops.forEach(d => { if(d.eta > 0) d.eta -= 1; });
      const sorted = DATA.drops.slice().sort((a,b) => a.eta - b.eta);
      const list = $("#queue-list");
      if(!list) return;
      const rows = $$(".drop-row", list);
      sorted.forEach((drop, idx) => {
        const row = rows.find(r => r.dataset.id === drop.id);
        if(!row) return;
        row.dataset.active = idx === 0 ? "true" : "false";
        const cd = row.querySelector(".drop-countdown span:first-child");
        if(cd){
          const eta = fmtETA(drop.eta);
          cd.textContent = eta || (dict()["drop.eta.now"] || "OPEN");
        }
        const btn = row.querySelector(".drop-action");
        if(btn) btn.textContent = actionLabel(drop);
      });
      const cur = rows.map(r => r.dataset.id);
      const desired = sorted.map(d => d.id);
      if(JSON.stringify(cur) !== JSON.stringify(desired)){
        renderQueue();
      }
    }, 1000);
  }

  /* ============================================================
     Signal feed
     ============================================================ */
  function renderFeed(){
    const list = $("#feed-list");
    if(!list) return;
    list.innerHTML = "";
    DATA.feed.forEach(item => {
      const row = document.createElement("div");
      row.className = "feed-row";
      const tagClass = item.tag.toLowerCase();
      const text = (item.text && item.text[lang()]) || item.text.en || "";
      const ago = (item.ago && item.ago[lang()]) || item.ago.en || "";
      row.innerHTML = `
        <span class="feed-tag ${tagClass}">${item.tag}</span>
        <span class="feed-text">
          <span class="actor">${item.actor}</span> ${text} <span class="target">${item.target}</span>
        </span>
        <span class="feed-time">${ago}</span>
      `;
      list.appendChild(row);
    });
  }

  /* ============================================================
     Gas pulse
     ============================================================ */
  function pulseGas(){
    const v = $("#gas-v");
    const fill = $("#gas-fill");
    if(!v || !fill) return;
    setInterval(() => {
      const base = 14;
      const drift = Math.round((Math.random() - 0.5) * 4);
      const cur = Math.max(8, Math.min(28, base + drift));
      v.textContent = cur;
      fill.style.width = Math.min(100, (cur / 60) * 100).toFixed(1) + "%";
    }, 4000);
  }

  /* ============================================================
     Risk profile tabs
     ============================================================ */
  let activeRiskTab = "trust";

  function renderRiskProfile(key){
    activeRiskTab = key;
    const profile = DATA.riskProfiles[key];
    if(!profile) return;
    const d = dict();

    const targetEl = $("#risk-target-name");
    if(targetEl) targetEl.textContent = (profile.name && profile.name[lang()]) || profile.name.en;

    const scoreEl = $("#risk-score");
    if(scoreEl) scoreEl.textContent = profile.score;

    const verdictEl = $("#risk-verdict");
    if(verdictEl){
      verdictEl.dataset.level = profile.level;
      verdictEl.textContent = d[profile.verdictKey] || profile.verdictKey;
    }

    const arc = $("#risk-arc");
    if(arc){
      const max = 628.3;
      const offset = max - (profile.score / 100) * max;
      arc.setAttribute("stroke-dashoffset", offset.toFixed(1));
    }

    const fList = $("#risk-factors");
    if(fList){
      fList.innerHTML = "";
      profile.factors.forEach(f => {
        const row = document.createElement("div");
        row.className = "risk-factor";
        row.innerHTML = `
          <span class="risk-factor-bullet ${f.color}" aria-hidden="true"></span>
          <span class="risk-factor-text"><span class="k">${f.k}</span> · ${f.v}</span>
          <span class="risk-factor-score ${f.color}">${f.score}</span>
        `;
        fList.appendChild(row);
      });
    }

    $$(".risk-tab").forEach(t => {
      t.setAttribute("aria-pressed", t.dataset.target === key ? "true" : "false");
    });
  }

  function bindRiskTabs(){
    $$(".risk-tab").forEach(t => {
      t.addEventListener("click", () => renderRiskProfile(t.dataset.target));
    });
  }

  /* ============================================================
     Wallet eligibility
     ============================================================ */
  let eligLastResults = null;

  function renderEligibility(results){
    const wrap = $("#elig-results");
    if(!wrap) return;
    const d = dict();
    if(!results || results.length === 0){
      wrap.innerHTML = `<div class="eligibility-empty">${d["elig.empty"] || "Paste any wallet."}</div>`;
      return;
    }
    wrap.innerHTML = "";
    results.forEach(r => {
      const card = document.createElement("div");
      card.className = "eligibility-card";
      const badgeText = r.verdict === "yes" ? d["elig.match.yes"]
                      : r.verdict === "no"  ? d["elig.match.no"]
                                             : d["elig.match.maybe"];
      const why = (r.why && r.why[lang()]) || r.why.en || "";
      card.innerHTML = `
        <div class="top">
          <span class="nm">${r.nm}</span>
          <span class="badge ${r.verdict}">${badgeText}</span>
        </div>
        <div class="why">${why}</div>
      `;
      wrap.appendChild(card);
    });
  }

  function isLikelyAddress(s){
    if(!s) return false;
    s = s.trim();
    if(/^0x[a-fA-F0-9]{40}$/.test(s)) return true;
    if(/\.eth$/i.test(s)) return true;
    if(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(s)) return true;
    return false;
  }

  function bindEligibility(){
    const input = $("#elig-input");
    const btn = $("#elig-btn");
    const wrap = $("#elig-results");
    if(!input || !btn || !wrap) return;
    function run(){
      const v = input.value.trim();
      const d = dict();
      if(!v){
        eligLastResults = null;
        renderEligibility(null);
        return;
      }
      if(!isLikelyAddress(v)){
        wrap.innerHTML = `<div class="eligibility-empty">${d["elig.empty"] || "Paste any wallet."}</div>`;
        eligLastResults = null;
        return;
      }
      wrap.innerHTML = `<div class="eligibility-empty">${d["elig.checking"] || "Checking…"}</div>`;
      setTimeout(() => {
        eligLastResults = DATA.eligibilityResults;
        renderEligibility(DATA.eligibilityResults);
      }, 700);
    }
    btn.addEventListener("click", run);
    input.addEventListener("keydown", e => { if(e.key === "Enter") run(); });
  }

  /* ============================================================
     Hero timestamp + chain rail toggle
     ============================================================ */
  function updateHeroTimestamp(){
    const el = $("#hero-ts");
    if(!el) return;
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2,"0");
    const mm = String(now.getUTCMinutes()).padStart(2,"0");
    const ss = String(now.getUTCSeconds()).padStart(2,"0");
    el.textContent = `${hh}:${mm}:${ss} UTC · last sync now`;
  }

  function bindChainToggles(){
    $$(".chain-row").forEach(row => {
      row.addEventListener("click", () => {
        const cur = row.getAttribute("aria-pressed") === "true";
        row.setAttribute("aria-pressed", cur ? "false" : "true");
      });
    });
  }

  /* ============================================================
     AGENTS PANEL
     ============================================================ */
  function renderAgents(){
    const list = $("#agents-list");
    if(!list || !DATA.agents) return;
    const d = dict();
    list.innerHTML = "";
    DATA.agents.forEach(a => {
      const row = document.createElement("div");
      row.className = "agent-row";
      const name = (a.name && a.name[lang()]) || a.name.en;
      const role = (a.role && a.role[lang()]) || a.role.en;
      const statusKey = a.status === "escalating" ? "ops.agent.status.escalating" : "ops.agent.status.active";
      const statusText = d[statusKey] || a.status;
      const tierKey = a.tier === "flagship" ? "ops.tier.flagship" : "ops.tier.cost";
      const tierText = d[tierKey] || a.tier;
      const invTpl = d["ops.agent.invMin"] || "{n} inv/min";
      const invText = invTpl.replace("{n}", a.invMin);
      row.innerHTML = `
        <div class="agent-mark" style="background:${a.color}" aria-hidden="true">${a.code}</div>
        <div class="agent-info">
          <div class="agent-name">${name}</div>
          <div class="agent-role">${role}</div>
        </div>
        <span class="agent-tier ${a.tier}">${tierText}</span>
        <div class="agent-status">
          <span class="live ${a.status}">${statusText}</span>
          <span>${a.latency}</span>
          <span>${invText}</span>
        </div>
      `;
      list.appendChild(row);
    });
  }

  /* ============================================================
     TOOLS PANEL
     ============================================================ */
  function renderTools(){
    const list = $("#tools-list");
    if(!list || !DATA.tools) return;
    const d = dict();
    list.innerHTML = "";
    DATA.tools.forEach(t => {
      const row = document.createElement("div");
      row.className = "tool-row";
      row.dataset.toolId = t.id;
      row.addEventListener("click", () => openTool(t.id));
      const desc = (t.desc && t.desc[lang()]) || t.desc.en;
      const agent = DATA.agents.find(a => a.id === t.agent);
      const agentCode = agent ? agent.code : t.agent;
      row.innerHTML = `
        <div class="tool-info">
          <span class="tool-id">${t.id}</span>
          <span class="tool-meta"><span class="agent-pill">${agentCode}</span>${desc}</span>
        </div>
        <div class="tool-calls">
          ${t.calls24h.toLocaleString()}
          <span class="lbl">${d["ops.tool.calls24h"] || "calls 24h"}</span>
        </div>
        <div class="tool-ms">
          ${t.lastMs}
          <span class="lbl">${d["ops.tool.lastMs"] || "p50 ms"}</span>
        </div>
      `;
      list.appendChild(row);
    });
  }

  /* ============================================================
     COST-TIER ROUTER WIDGET
     ============================================================ */
  function renderRouter(){
    const router = DATA.router;
    if(!router) return;
    const d = dict();

    const cov = $("#router-coverage");
    if(cov) cov.textContent = router.coverage24h.toLocaleString();

    const sav = $("#router-savings");
    if(sav) sav.textContent = (router.savings && router.savings[lang()]) || router.savings.en;

    const costV = $("#router-cost-v");
    if(costV) costV.textContent = router.costTierPct.toFixed(1) + "%";
    const flagV = $("#router-flag-v");
    if(flagV) flagV.textContent = router.flagshipPct.toFixed(1) + "%";

    const barCost = $("#router-bar-cost");
    if(barCost) barCost.style.width = router.costTierPct + "%";
    const barFlag = $("#router-bar-flag");
    if(barFlag) barFlag.style.width = router.flagshipPct + "%";

    const cents = $("#router-cost-cents");
    if(cents) cents.textContent = "$" + router.avgCostCents.toFixed(4).replace(/0+$/,"").replace(/\.$/,"");

    const reasons = $("#router-reasons");
    if(reasons){
      reasons.innerHTML = "";
      router.flagshipReasons.forEach(r => {
        const row = document.createElement("div");
        row.className = "router-reason";
        const k = (r.k && r.k[lang()]) || r.k.en;
        row.innerHTML = `
          <span><span class="dot" style="background:${r.color}"></span>${k}</span>
          <span class="n">${r.n}</span>
        `;
        reasons.appendChild(row);
      });
    }
  }

  /* ============================================================
     REASONING TRACE DRAWER
     ============================================================ */
  let activeTraceId = null;

  function bindTraceButtons(){
    $$('[data-action="trace-open"]').forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const id = btn.dataset.id;
        openTrace(id);
      });
    });
  }

  function openTrace(id){
    const drawer = $("#trace-drawer");
    const overlay = $('[data-role="trace-overlay"]');
    if(!drawer) return;
    activeTraceId = id;

    const trace = DATA.reasoning[id];
    const titleEl = $("#trace-title");
    const body = $("#trace-body");
    const stats = $("#trace-stats");
    const d = dict();

    if(!trace){
      // generic fallback — use template per riskLevel
      const drop = DATA.drops.find(dd => dd.id === id);
      const lvl = drop ? drop.riskLevel : "low";
      const tpl = (DATA.reasoningTemplates && DATA.reasoningTemplates[lvl]) || null;
      if(tpl){
        const verdictLabels = { low:"LOW", med:"MED", hi:"CRITICAL" };
        const dropName = drop ? drop.name : "—";
        const dropChain = drop ? drop.chain : "—";
        const dropRisk = drop ? drop.risk : "—";
        titleEl.textContent = `${dropName} · ${dropChain} · ${verdictLabels[lvl]} ${dropRisk}/100`;
        const totalMs = tpl.steps.reduce((a, s) => a + s.ms, 0);
        const uniqTools = new Set(tpl.steps.map(s => s.tool)).size;
        stats.hidden = false;
        $("#trace-stat-steps").textContent = tpl.steps.length;
        $("#trace-stat-tools").textContent = uniqTools;
        $("#trace-stat-ms").textContent = totalMs;
        body.innerHTML = "";
        tpl.steps.forEach((step, i) => {
          const agent = DATA.agents.find(a => a.id === step.agent);
          const agentName = agent ? agent.code : step.agent.toUpperCase();
          const agentColor = agent ? agent.color : "#00E0C7";
          const desc = (step.desc && step.desc[lang()]) || step.desc.en;
          const div = document.createElement("div");
          div.className = "trace-step";
          div.dataset.result = step.result;
          div.style.animationDelay = (i * 60) + "ms";
          div.innerHTML = `
            <div class="trace-step-head">
              <span class="trace-step-agent" style="background:${agentColor}">${agentName}</span>
              <span class="trace-step-tool">${step.tool}</span>
              <span class="trace-step-ms">${step.ms}ms</span>
              <span class="trace-step-result" data-r="${step.result}">${step.result}</span>
            </div>
            <div class="trace-step-desc">${desc}</div>
          `;
          body.appendChild(div);
        });
        const summary = (tpl.summary && tpl.summary[lang()]) || tpl.summary.en;
        const sumEl = document.createElement("div");
        sumEl.className = "trace-summary";
        sumEl.innerHTML = `
          <div class="trace-summary-label">${d["trace.summary.label"] || "AI summary"}</div>
          <div class="trace-summary-text">${summary}</div>
        `;
        body.appendChild(sumEl);
      } else {
        const generic = DATA.reasoningDefault;
        titleEl.textContent = drop ? drop.name + " · " + drop.chain : (generic.title[lang()] || generic.title.en);
        stats.hidden = true;
        body.innerHTML = `<div class="trace-empty">${(generic.summary[lang()] || generic.summary.en)}</div>`;
      }
    } else {
      titleEl.textContent = (trace.title && trace.title[lang()]) || trace.title.en;
      const totalMs = trace.steps.reduce((a, s) => a + s.ms, 0);
      const uniqTools = new Set(trace.steps.map(s => s.tool)).size;
      stats.hidden = false;
      $("#trace-stat-steps").textContent = trace.steps.length;
      $("#trace-stat-tools").textContent = uniqTools;
      $("#trace-stat-ms").textContent = totalMs;

      body.innerHTML = "";
      trace.steps.forEach((step, i) => {
        const agent = DATA.agents.find(a => a.id === step.agent);
        const agentName = agent ? agent.code : step.agent.toUpperCase();
        const agentColor = agent ? agent.color : "#00E0C7";
        const desc = (step.desc && step.desc[lang()]) || step.desc.en;
        const div = document.createElement("div");
        div.className = "trace-step";
        div.dataset.result = step.result;
        div.style.animationDelay = (i * 60) + "ms";
        div.innerHTML = `
          <div class="trace-step-head">
            <span class="trace-step-agent" style="background:${agentColor}">${agentName}</span>
            <span class="trace-step-tool">${step.tool}</span>
            <span class="trace-step-ms">${step.ms}ms</span>
            <span class="trace-step-result" data-r="${step.result}">${step.result}</span>
          </div>
          <div class="trace-step-desc">${desc}</div>
        `;
        body.appendChild(div);
      });

      const summary = (trace.summary && trace.summary[lang()]) || trace.summary.en;
      const sumEl = document.createElement("div");
      sumEl.className = "trace-summary";
      sumEl.innerHTML = `
        <div class="trace-summary-label">${d["trace.summary.label"] || "AI summary"}</div>
        <div class="trace-summary-text">${summary}</div>
      `;
      body.appendChild(sumEl);
    }

    drawer.dataset.open = "true";
    drawer.setAttribute("aria-hidden", "false");
    if(overlay){ overlay.dataset.open = "true"; overlay.setAttribute("aria-hidden", "false"); }
    // focus close
    setTimeout(() => {
      const close = drawer.querySelector('[data-action="trace-close"]');
      if(close) close.focus();
    }, 80);
  }

  function closeTrace(){
    const drawer = $("#trace-drawer");
    const overlay = $('[data-role="trace-overlay"]');
    if(!drawer) return;
    drawer.dataset.open = "false";
    drawer.setAttribute("aria-hidden", "true");
    if(overlay){ overlay.dataset.open = "false"; overlay.setAttribute("aria-hidden", "true"); }
    activeTraceId = null;
  }

  function bindTraceDrawer(){
    document.addEventListener("click", e => {
      const t = e.target.closest('[data-action="trace-close"]');
      if(t){ closeTrace(); }
    });
    const overlay = $('[data-role="trace-overlay"]');
    if(overlay) overlay.addEventListener("click", closeTrace);
    document.addEventListener("keydown", e => {
      if(e.key === "Escape" && $("#trace-drawer").dataset.open === "true"){
        closeTrace();
      }
    });
  }

  /* ============================================================
     TOOL DETAIL DRAWER
     ============================================================ */
  function openTool(toolId){
    const drawer = $("#tool-drawer");
    const overlay = $('[data-role="tool-overlay"]');
    if(!drawer) return;
    const tool = DATA.tools.find(t => t.id === toolId);
    const detail = (DATA.toolDetails && DATA.toolDetails[toolId]) || null;
    if(!tool) return;
    const d = dict();
    const lng = lang();

    const titleEl = $("#tool-title");
    const meta = $("#tool-meta");
    const body = $("#tool-body");

    titleEl.textContent = tool.id;

    const agent = DATA.agents.find(a => a.id === tool.agent);
    const agentName = agent ? ((agent.name && agent.name[lng]) || agent.name.en) : tool.agent;
    const agentCode = agent ? agent.code : tool.agent.toUpperCase();
    const agentColor = agent ? agent.color : "#00E0C7";

    meta.innerHTML = `
      <div class="tool-meta-cell">
        <div class="v">${tool.calls24h.toLocaleString()}</div>
        <div class="l">${d["tool.drawer.calls"] || "calls 24h"}</div>
      </div>
      <div class="tool-meta-cell">
        <div class="v">${tool.lastMs}ms</div>
        <div class="l">${d["ops.tool.lastMs"] || "p50 ms"}</div>
      </div>
      <div class="tool-meta-cell">
        <div class="v" style="font-size:13px;display:flex;align-items:center;gap:6px">
          <span class="tool-usedby-pill" style="background:${agentColor};color:#06080F">${agentCode}</span>
        </div>
        <div class="l">${d["tool.drawer.usedBy"] || "Used by"}</div>
      </div>
    `;

    body.innerHTML = "";
    if(detail){
      // Schema
      const schemaIn = detail.schema.input.map(x => `<li>${x}</li>`).join("");
      const schemaOut = detail.schema.output.map(x => `<li>${x}</li>`).join("");
      const sch = document.createElement("div");
      sch.className = "tool-section";
      sch.innerHTML = `
        <h4>${d["tool.drawer.schema"] || "Schema"}</h4>
        <div class="tool-schema">
          <div class="tool-schema-col">
            <div class="lbl">${d["tool.drawer.input"] || "Input"}</div>
            <ul>${schemaIn}</ul>
          </div>
          <div class="tool-schema-col">
            <div class="lbl">${d["tool.drawer.output"] || "Output"}</div>
            <ul>${schemaOut}</ul>
          </div>
        </div>
      `;
      body.appendChild(sch);

      // Sample
      const sam = document.createElement("div");
      sam.className = "tool-section";
      sam.innerHTML = `
        <h4>${d["tool.drawer.sample"] || "Sample invocation"}</h4>
        <div class="tool-sample">
          <div class="tool-sample-row"><span class="lbl">${d["tool.drawer.input"] || "Input"}</span>${escapeHtml(detail.sample.in)}</div>
          <div class="tool-sample-row"><span class="lbl">${d["tool.drawer.output"] || "Output"}</span>${escapeHtml(detail.sample.out)}</div>
        </div>
      `;
      body.appendChild(sam);

      // Recent
      const rec = document.createElement("div");
      rec.className = "tool-section";
      const recRows = detail.recent.map(r =>
        `<div class="tool-recent-row">
          <span class="drop">${r.drop}</span>
          <span class="ms">${r.ms}ms</span>
          <span class="res" data-r="${r.result}">${r.result}</span>
        </div>`
      ).join("");
      rec.innerHTML = `
        <h4>${d["tool.drawer.recent"] || "Last 5 invocations"}</h4>
        <div class="tool-recent">${recRows}</div>
      `;
      body.appendChild(rec);
    }

    drawer.dataset.open = "true";
    drawer.setAttribute("aria-hidden", "false");
    if(overlay){ overlay.dataset.open = "true"; overlay.setAttribute("aria-hidden", "false"); }
    setTimeout(() => {
      const close = drawer.querySelector('[data-action="tool-close"]');
      if(close) close.focus();
    }, 80);
  }

  function closeTool(){
    const drawer = $("#tool-drawer");
    const overlay = $('[data-role="tool-overlay"]');
    if(!drawer) return;
    drawer.dataset.open = "false";
    drawer.setAttribute("aria-hidden", "true");
    if(overlay){ overlay.dataset.open = "false"; overlay.setAttribute("aria-hidden", "true"); }
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, ch =>
      ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[ch])
    );
  }

  function bindToolDrawer(){
    // tool-row click
    document.addEventListener("click", e => {
      const row = e.target.closest(".tool-row");
      if(row && row.parentElement && row.parentElement.id === "tools-list"){
        const id = row.dataset.toolId;
        if(id){
          openTool(id);
        }
      }
      const close = e.target.closest('[data-action="tool-close"]');
      if(close){ closeTool(); }
    });
    const overlay = $('[data-role="tool-overlay"]');
    if(overlay) overlay.addEventListener("click", closeTool);
    document.addEventListener("keydown", e => {
      if(e.key === "Escape" && $("#tool-drawer") && $("#tool-drawer").dataset.open === "true"){
        closeTool();
      }
    });
  }

  /* ============================================================
     CONNECT ALERTS DRAWER
     ============================================================ */
  function openConnect(){
    const drawer = $("#cn-drawer");
    const overlay = $('[data-role="cn-overlay"]');
    if(!drawer) return;
    const status = $("#cn-status");
    if(status){ status.hidden = true; status.dataset.state = "idle"; status.textContent = ""; }
    const input = $("#cn-input");
    if(input) input.value = "";
    drawer.dataset.open = "true";
    drawer.setAttribute("aria-hidden", "false");
    if(overlay){ overlay.dataset.open = "true"; overlay.setAttribute("aria-hidden", "false"); }
    setTimeout(() => {
      const close = drawer.querySelector('[data-action="cn-close"]');
      if(close) close.focus();
    }, 80);
  }
  function closeConnect(){
    const drawer = $("#cn-drawer");
    const overlay = $('[data-role="cn-overlay"]');
    if(!drawer) return;
    drawer.dataset.open = "false";
    drawer.setAttribute("aria-hidden", "true");
    if(overlay){ overlay.dataset.open = "false"; overlay.setAttribute("aria-hidden", "true"); }
  }
  function bindConnectDrawer(){
    // CTA in header → open drawer
    const ctas = document.querySelectorAll('a[href="#alerts"].dp-cta, a.dp-cta[href="#alerts"]');
    ctas.forEach(cta => {
      cta.addEventListener("click", e => {
        e.preventDefault();
        openConnect();
      });
    });

    document.addEventListener("click", e => {
      const close = e.target.closest('[data-action="cn-close"]');
      if(close){ closeConnect(); }

      const submit = e.target.closest('[data-action="cn-submit"]');
      if(submit){
        const input = $("#cn-input");
        const status = $("#cn-status");
        const d = dict();
        if(!input || !status) return;
        const v = (input.value || "").trim();
        status.hidden = false;
        if(v.length < 5){
          status.dataset.state = "info";
          status.textContent = (d["cn.drawer.placeholder"] ? "Telegram chat ID: " + (d["cn.drawer.placeholder"] || "123456789") : "Paste a numeric chat ID");
        } else {
          status.dataset.state = "success";
          status.textContent = (d["cn.drawer.subscribed"] || "Subscribed · agent will dispatch alerts to this chat") + " (chat " + v + ")";
        }
      }

      const copy = e.target.closest('[data-action="cn-copy"]');
      if(copy){
        const handle = (dict()["cn.drawer.bothandle"] || "@DropPilotAlertsBot");
        try {
          if(navigator.clipboard && navigator.clipboard.writeText){
            navigator.clipboard.writeText(handle);
          }
        } catch(err){}
        const status = $("#cn-status");
        if(status){
          status.hidden = false;
          status.dataset.state = "info";
          status.textContent = (dict()["cn.drawer.copied"] || "Bot handle copied") + " · " + handle;
        }
      }
    });
    const overlay = $('[data-role="cn-overlay"]');
    if(overlay) overlay.addEventListener("click", closeConnect);
    document.addEventListener("keydown", e => {
      if(e.key === "Escape" && $("#cn-drawer") && $("#cn-drawer").dataset.open === "true"){
        closeConnect();
      }
    });
  }


  /* ============================================================
     NATURAL-LANGUAGE COMMAND PARSER
     ============================================================ */
  // Tiny rule-based parser — extracts chain, risk threshold, stage, channel
  function parseCommand(text){
    const out = {};
    const t = text.toLowerCase();

    // chain
    const chains = ["ethereum","eth","base","monad","abstract","zora","solana","sol","opensea","magic eden","magiceden"];
    for(const c of chains){
      if(t.indexOf(c) !== -1){
        out.chain = c.charAt(0).toUpperCase() + c.slice(1);
        break;
      }
    }

    // risk threshold
    const m = t.match(/risk\s*([<>≤≥]=?|kurang dari|lebih dari|<|>|低于|高于)\s*(\d{1,3})/);
    if(m){
      const op = m[1].includes(">") || /lebih|高于/.test(m[1]) ? ">" : "<";
      out.risk = `${op} ${m[2]}`;
    } else {
      const m2 = t.match(/(\d{1,3})\s*(?:risk|risiko|风险)/);
      if(m2) out.risk = "< " + m2[1];
    }

    // stage
    if(/\bal\b|allowlist|白名单/.test(t)) out.stage = "AL";
    else if(/fcfs/.test(t)) out.stage = "FCFS";
    else if(/public|publik|公开/.test(t)) out.stage = "Public";

    // channel
    if(/\btg\b|telegram/.test(t)) out.channel = "Telegram";
    else if(/\bdc\b|discord/.test(t)) out.channel = "Discord";
    else if(/push|browser|浏览器|推送/.test(t)) out.channel = "Browser push";

    // free-text fallback
    if(Object.keys(out).length === 0){
      out._raw = text.trim().slice(0, 60);
    }
    return out;
  }

  function bindCommandBar(){
    const input = $("#cmd-input");
    const btn = $("#cmd-btn");
    const out = $("#cmd-output");
    const chips = $("#cmd-chips");
    if(!input || !btn || !out || !chips) return;

    function run(){
      const txt = input.value.trim();
      if(!txt) return;
      const parsed = parseCommand(txt);
      chips.innerHTML = "";
      const labels = {
        chain: "chain",
        risk: "risk",
        stage: "stage",
        channel: "channel",
        _raw: "command"
      };
      Object.keys(parsed).forEach(k => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.innerHTML = `<span class="k">${labels[k] || k}</span> <span class="v">${parsed[k]}</span>`;
        chips.appendChild(chip);
      });
      out.dataset.show = "true";
    }
    btn.addEventListener("click", run);
    input.addEventListener("keydown", e => { if(e.key === "Enter") run(); });
  }

  /* ============================================================
     init
     ============================================================ */
  function init(){
    bindLangSwitch();
    bindRiskTabs();
    bindEligibility();
    bindChainToggles();
    bindTraceDrawer();
    bindToolDrawer();
    bindConnectDrawer();
    bindCommandBar();
    applyI18n();
    pulseGas();
    startQueueTick();
    updateHeroTimestamp();
    setInterval(updateHeroTimestamp, 30000);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
