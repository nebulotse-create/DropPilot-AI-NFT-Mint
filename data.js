// DropPilot — drop queue + signal feed + risk profile + agent operations data
// Concept artifact: scripted mock data for UI demonstration.

window.DP_DATA = {
  drops: [
    {
      id: "pixie",
      thumb: "PX",
      name: "Pixie Pirates",
      chain: "Base",
      stage: "AL",
      stageLabel: { en:"AL", id:"AL", zh:"AL" },
      eta: 14*60+22,
      supply: "5,000",
      price: "0.0042 ETH",
      risk: 22,
      riskLevel: "low"
    },
    {
      id: "powder",
      thumb: "PE",
      name: "PowderEgg WL",
      chain: "Zora",
      stage: "FCFS",
      stageLabel: { en:"FCFS", id:"FCFS", zh:"FCFS" },
      eta: 6*60+3,
      supply: "2,200",
      price: "free + gas",
      risk: 58,
      riskLevel: "med"
    },
    {
      id: "monad-genesis",
      thumb: "MG",
      name: "Monad Genesis Set",
      chain: "Monad",
      stage: "Public",
      stageLabel: { en:"PUBLIC", id:"PUBLIK", zh:"公开" },
      eta: 38*60+18,
      supply: "12,500",
      price: "1.2 MON",
      risk: 18,
      riskLevel: "low"
    },
    {
      id: "abstract-pen",
      thumb: "AP",
      name: "Abstract Penguins",
      chain: "Abstract",
      stage: "AL",
      stageLabel: { en:"AL", id:"AL", zh:"AL" },
      eta: 1*3600+22*60,
      supply: "8,888",
      price: "0.005 ETH",
      risk: 31,
      riskLevel: "low"
    },
    {
      id: "sol-glyph",
      thumb: "GL",
      name: "Glyphs Solana",
      chain: "Solana",
      stage: "FCFS",
      stageLabel: { en:"FCFS", id:"FCFS", zh:"FCFS" },
      eta: 2*3600+11*60,
      supply: "3,333",
      price: "0.4 SOL",
      risk: 44,
      riskLevel: "med"
    },
    {
      id: "free-mint-alpha",
      thumb: "FM",
      name: "FreeMintAlpha",
      chain: "Ethereum",
      stage: "Public",
      stageLabel: { en:"PUBLIC", id:"PUBLIK", zh:"公开" },
      eta: 4*60+10,
      supply: "10,000",
      price: "free",
      risk: 94,
      riskLevel: "hi"
    }
  ],

  feed: [
    { tag:"X",    actor:"@punk6529",        text:{ en:"hyped about", id:"hype banget sama", zh:"力推" }, target:"Pixie Pirates AL", ago:{ en:"42s ago", id:"42d lalu", zh:"42 秒前" } },
    { tag:"OS",   actor:"OpenSea",           text:{ en:"new drop indexed", id:"drop baru ter-index", zh:"新 drop 已收录" }, target:"PowderEgg WL", ago:{ en:"1m ago", id:"1m lalu", zh:"1 分前" } },
    { tag:"SCAN", actor:"Risk scanner",      text:{ en:"flagged setApprovalForAll on", id:"flag setApprovalForAll di", zh:"标记 setApprovalForAll" }, target:"FreeMintAlpha", ago:{ en:"2m ago", id:"2m lalu", zh:"2 分前" } },
    { tag:"ME",   actor:"Magic Eden",        text:{ en:"launchpad confirmed", id:"launchpad terkonfirmasi", zh:"launchpad 已确认" }, target:"Glyphs Solana", ago:{ en:"3m ago", id:"3m lalu", zh:"3 分前" } },
    { tag:"X",    actor:"@cobie",            text:{ en:"thread on", id:"thread tentang", zh:"长推:" }, target:"Monad Genesis Set", ago:{ en:"5m ago", id:"5m lalu", zh:"5 分前" } },
    { tag:"ZORA", actor:"Zora",              text:{ en:"creator coin live for", id:"creator coin live untuk", zh:"creator 币上线" }, target:"PowderEgg WL", ago:{ en:"7m ago", id:"7m lalu", zh:"7 分前" } },
    { tag:"TG",   actor:"Drop hunters TG",   text:{ en:"AL slot rotation in", id:"rotasi slot AL di", zh:"AL 名额轮换:" }, target:"Pixie Pirates", ago:{ en:"9m ago", id:"9m lalu", zh:"9 分前" } },
    { tag:"SCAN", actor:"Risk scanner",      text:{ en:"holder concentration 78% on", id:"konsentrasi holder 78% di", zh:"持有者集中度 78%:" }, target:"FreeMintAlpha", ago:{ en:"11m ago", id:"11m lalu", zh:"11 分前" } },
    { tag:"OS",   actor:"OpenSea",           text:{ en:"floor +12% on", id:"floor +12% di", zh:"floor 上涨 12%:" }, target:"Abstract Penguins (mint)", ago:{ en:"14m ago", id:"14m lalu", zh:"14 分前" } },
    { tag:"X",    actor:"@punk6529",         text:{ en:"calls FreeMintAlpha a", id:"sebut FreeMintAlpha sebagai", zh:"称 FreeMintAlpha 为" }, target:"drainer", ago:{ en:"17m ago", id:"17m lalu", zh:"17 分前" } }
  ],

  riskProfiles: {
    trust: {
      name: { en:"Pixie Pirates · Base · 4h to AL", id:"Pixie Pirates · Base · 4j ke AL", zh:"Pixie Pirates · Base · 距 AL 4 小时" },
      score: 22,
      level: "low",
      verdictKey: "risk.verdict.low",
      factors: [
        { color:"green", k:"Contract verified", v:"Etherscan / BaseScan", score:"PASS" },
        { color:"green", k:"LP locked",        v:"24-month vesting · zk-attested", score:"PASS" },
        { color:"green", k:"Owner privileges",  v:"Renounced post-mint", score:"PASS" },
        { color:"green", k:"Holder concentration", v:"Top 10 hold 4.2% pre-mint", score:"PASS" },
        { color:"green", k:"Team identity",     v:"Doxxed · 2 prior shipped collections", score:"PASS" },
        { color:"green", k:"Audit",             v:"Spearbit + ChainSecurity",  score:"PASS" },
        { color:"amber", k:"AL distribution",  v:"23% to non-active wallets", score:"23%" },
        { color:"green", k:"Mint mechanism",    v:"ERC-721A · standard ALMint", score:"PASS" }
      ]
    },
    risky: {
      name: { en:"PowderEgg WL · Zora · 6m to FCFS", id:"PowderEgg WL · Zora · 6m ke FCFS", zh:"PowderEgg WL · Zora · 距 FCFS 6 分" },
      score: 58,
      level: "med",
      verdictKey: "risk.verdict.med",
      factors: [
        { color:"green", k:"Contract verified", v:"BaseScan", score:"PASS" },
        { color:"amber", k:"Contract age",      v:"7 days old", score:"WARN" },
        { color:"red",   k:"LP not locked",     v:"No vesting commitment", score:"FAIL" },
        { color:"amber", k:"Holder concentration", v:"Top 5 hold 38%", score:"38%" },
        { color:"green", k:"Owner identity",    v:"X-handle linked + verified", score:"PASS" },
        { color:"amber", k:"Audit",             v:"Self-reported only", score:"WARN" },
        { color:"green", k:"Mint price",        v:"Free + gas · within market", score:"PASS" },
        { color:"amber", k:"Roadmap clarity",   v:"Vague utility commitment",  score:"WARN" }
      ]
    },
    scam: {
      name: { en:"FreeMintAlpha · Ethereum · 4m to public", id:"FreeMintAlpha · Ethereum · 4m ke public", zh:"FreeMintAlpha · 以太坊 · 距公开 4 分" },
      score: 94,
      level: "hi",
      verdictKey: "risk.verdict.hi",
      factors: [
        { color:"red", k:"setApprovalForAll on connect", v:"Drainer pattern", score:"FAIL" },
        { color:"red", k:"Contract age",         v:"19 minutes old",  score:"FAIL" },
        { color:"red", k:"Honeypot pattern",     v:"transfer() override · sell reverts", score:"FAIL" },
        { color:"red", k:"Holder concentration", v:"1 wallet holds 78% supply", score:"FAIL" },
        { color:"red", k:"Mint domain",           v:"claim-free-eth[.]xyz · 2-day-old", score:"FAIL" },
        { color:"red", k:"Linked X account",      v:"Created 11h ago · 0 followers", score:"FAIL" },
        { color:"amber", k:"Mint price",          v:"\"Free\" — gas-bait pattern",  score:"WARN" },
        { color:"red", k:"Pattern recurrence",    v:"3 prior drainer collections same deployer", score:"FAIL" }
      ]
    }
  },

  eligibilityResults: [
    { nm:"Pixie Pirates",      verdict:"yes",   why:{ en:"Held 1 prior · seed checked",   id:"Pegang 1 collection sebelumnya · seed dicek", zh:"持有 1 个前作 · 种子已验" } },
    { nm:"Monad Genesis Set",  verdict:"yes",   why:{ en:"OAT collected · slot 318",       id:"OAT terkumpul · slot 318",                zh:"已收 OAT · 名额 318" } },
    { nm:"Abstract Penguins",  verdict:"maybe", why:{ en:"Snapshot in 6 days · 1 of 3 criteria", id:"Snapshot 6 hari lagi · 1 dari 3 kriteria", zh:"6 天后快照 · 满足 1/3 条件" } },
    { nm:"Glyphs Solana",      verdict:"yes",   why:{ en:"Tensor history · sniper tier",  id:"Riwayat Tensor · tier sniper",            zh:"Tensor 历史 · sniper 级" } },
    { nm:"PowderEgg WL",       verdict:"no",    why:{ en:"Wallet age too low · 14d",        id:"Umur wallet kurang · 14h",                  zh:"钱包年龄不足 · 14 天" } },
    { nm:"FreeMintAlpha",      verdict:"no",    why:{ en:"BLOCKED · scam pattern matched",  id:"DIBLOK · pola scam terdeteksi",           zh:"已拦截 · 匹配诈骗模式" } }
  ],

  /* =======================================================
     AGENT OPERATIONS
     ======================================================= */

  // 5 specialised agents the pipeline orchestrates
  agents: [
    {
      id:"scanner",
      code:"SCN",
      name:{ en:"Scanner Agent", id:"Agen Scanner",    zh:"扫描代理" },
      role:{ en:"Bytecode + supply + LP analysis",
             id:"Analisis bytecode + supply + LP",
             zh:"字节码 + 供给 + LP 分析" },
      tier:"cost",
      status:"active",
      latency:"68ms p50",
      invMin:42,
      color:"#00E0C7"
    },
    {
      id:"forensic",
      code:"FRN",
      name:{ en:"Forensic Agent", id:"Agen Forensik",   zh:"取证代理" },
      role:{ en:"Fund-flow trace · drainer + rug history",
             id:"Lacak aliran dana · histori drainer + rug",
             zh:"资金流追踪 · drainer + rug 历史" },
      tier:"flagship",
      status:"escalating",
      latency:"412ms p50",
      invMin:6,
      color:"#EC4899"
    },
    {
      id:"sentiment",
      code:"SNT",
      name:{ en:"Sentiment Agent", id:"Agen Sentimen",  zh:"情绪代理" },
      role:{ en:"X / Telegram chatter · shill cluster detection",
             id:"Obrolan X / Telegram · deteksi cluster shill",
             zh:"X / Telegram 讨论 · 水军聚类识别" },
      tier:"cost",
      status:"active",
      latency:"94ms p50",
      invMin:31,
      color:"#8B5CF6"
    },
    {
      id:"eligibility",
      code:"ELG",
      name:{ en:"Eligibility Agent", id:"Agen Kelayakan", zh:"资格代理" },
      role:{ en:"Wallet snapshot match · OAT + holder rules",
             id:"Cocokin snapshot wallet · aturan OAT + holder",
             zh:"钱包快照匹配 · OAT + 持有者规则" },
      tier:"cost",
      status:"active",
      latency:"38ms p50",
      invMin:88,
      color:"#34D399"
    },
    {
      id:"router",
      code:"RTR",
      name:{ en:"Router Agent", id:"Agen Router",       zh:"路由代理" },
      role:{ en:"Compose verdict · dispatch TG / DC / push",
             id:"Susun verdict · kirim ke TG / DC / push",
             zh:"汇总判定 · 派发 TG / DC / push" },
      tier:"cost",
      status:"active",
      latency:"22ms p50",
      invMin:67,
      color:"#FBBF24"
    }
  ],

  // 12 tools the agent runtime can invoke
  tools: [
    { id:"scan_contract_bytecode", agent:"scanner", calls24h:1284, lastMs:62,  desc:{ en:"Fetch + disassemble contract bytecode", id:"Ambil + disassemble bytecode kontrak", zh:"获取并反汇编合约字节码" } },
    { id:"query_holder_dist",      agent:"scanner", calls24h:982,  lastMs:104, desc:{ en:"Top-N holder concentration analysis",   id:"Analisis konsentrasi top-N holder",     zh:"前 N 持有者集中度分析" } },
    { id:"check_lp_lock",          agent:"scanner", calls24h:611,  lastMs:88,  desc:{ en:"Liquidity pool lock + vesting status",   id:"Status lock + vesting LP",                 zh:"流动性锁定与释放状态" } },
    { id:"trace_fund_flow",        agent:"forensic",calls24h:147,  lastMs:621, desc:{ en:"5-10 hop wallet fund-flow cluster",      id:"Cluster aliran dana 5-10 hop wallet",     zh:"5-10 跳钱包资金流聚类" } },
    { id:"crossref_rug_db",        agent:"forensic",calls24h:204,  lastMs:312, desc:{ en:"Match deployer against known rug DB",   id:"Cocokin deployer dengan DB rug dikenal",   zh:"与已知 rug 库比对部署者" } },
    { id:"fetch_x_chatter",        agent:"sentiment",calls24h:736, lastMs:148, desc:{ en:"X mentions + Telegram cluster sample",  id:"Mentions X + sampling cluster Telegram",   zh:"X 提及 + Telegram 聚类抽样" } },
    { id:"detect_shill_cluster",   agent:"sentiment",calls24h:412, lastMs:201, desc:{ en:"New-account shill pattern detection",   id:"Deteksi pola shill akun baru",            zh:"新账号水军模式识别" } },
    { id:"compute_eligibility",    agent:"eligibility",calls24h:2104,lastMs:42, desc:{ en:"Cross-check wallet vs AL criteria",     id:"Cek silang wallet vs kriteria AL",        zh:"钱包与 AL 标准比对" } },
    { id:"read_dompet_history",    agent:"eligibility",calls24h:1894,lastMs:31, desc:{ en:"Read NFT + token history of wallet",    id:"Baca histori NFT + token wallet",         zh:"读取钱包 NFT + 代币历史" } },
    { id:"estimate_gas",           agent:"router", calls24h:3214, lastMs:14,  desc:{ en:"Per-chain gas estimate at next block",   id:"Estimasi gas per-chain di block berikut", zh:"按链估算下一 block 的 gas" } },
    { id:"compose_alert",          agent:"router", calls24h:847,  lastMs:18,  desc:{ en:"Render TG / DC / push payload",          id:"Render payload TG / DC / push",           zh:"渲染 TG / DC / push 载荷" } },
    { id:"dispatch_alert",         agent:"router", calls24h:847,  lastMs:124, desc:{ en:"Send alert via webhook + push",          id:"Kirim alert lewat webhook + push",        zh:"通过 webhook + push 发送" } }
  ],

  // Cost-tier router stats (last 24h, mock)
  router: {
    coverage24h: 1842,         // total drops scored
    costTierPct: 91.2,         // % routed to cost-efficient tier
    flagshipPct: 8.8,          // % escalated
    avgCostCents: 0.16,        // per scan
    flagshipReasons: [
      { k:{ en:"setApprovalForAll detected", id:"setApprovalForAll terdeteksi", zh:"检测到 setApprovalForAll" }, n:42, color:"#F87171" },
      { k:{ en:"Honeypot pattern bytecode",  id:"Bytecode pola honeypot",        zh:"蜜罐模式字节码" }, n:31, color:"#F87171" },
      { k:{ en:"Holder concentration > 70%", id:"Konsentrasi holder > 70%",      zh:"持有者集中度 > 70%" }, n:54, color:"#FBBF24" },
      { k:{ en:"Brand-new deployer wallet",  id:"Wallet deployer baru bikin",     zh:"全新部署者钱包" }, n:28, color:"#FBBF24" },
      { k:{ en:"Cross-chain rug history",    id:"Histori rug lintas chain",       zh:"跨链 rug 历史" }, n:7, color:"#F87171" }
    ],
    savings:{ en:"$214 saved last 24h", id:"$214 hemat 24h terakhir", zh:"过去 24 小时节省 $214" }
  },

  // Per-drop reasoning trace (steps the agent runtime would emit)
  reasoning: {
    "pixie": {
      verdict:"low", score:22,
      title:{ en:"Pixie Pirates · Base · LOW 22/100", id:"Pixie Pirates · Base · LOW 22/100", zh:"Pixie Pirates · Base · 低 22/100" },
      steps:[
        { agent:"scanner", tool:"scan_contract_bytecode", ms:62,  result:"PASS",
          desc:{ en:"Bytecode verified on BaseScan · standard ERC-721A · no unusual opcodes",
                 id:"Bytecode terverifikasi di BaseScan · ERC-721A standar · tidak ada opcode aneh",
                 zh:"BaseScan 已验证字节码 · 标准 ERC-721A · 无异常操作码" } },
        { agent:"scanner", tool:"query_holder_dist", ms:104, result:"PASS",
          desc:{ en:"Top-10 holders own 4.2% pre-mint · healthy distribution",
                 id:"Top-10 holder pegang 4.2% pre-mint · distribusi sehat",
                 zh:"前 10 持有者占 4.2% 预铸造 · 分布健康" } },
        { agent:"scanner", tool:"check_lp_lock", ms:88,  result:"PASS",
          desc:{ en:"24-month LP lock · zk-attested · vesting cliff ships post-mint",
                 id:"LP lock 24 bulan · zk-attested · cliff vesting jalan pasca-mint",
                 zh:"24 个月 LP 锁定 · zk-attested · 铸造后开始解锁" } },
        { agent:"sentiment", tool:"fetch_x_chatter", ms:148, result:"PASS",
          desc:{ en:"428 mentions/24h · 71% from accounts > 1y old · organic curve",
                 id:"428 mentions/24h · 71% dari akun > 1tahun · kurva organik",
                 zh:"24 小时 428 次提及 · 71% 来自一年以上账号 · 有机曲线" } },
        { agent:"sentiment", tool:"detect_shill_cluster", ms:201, result:"PASS",
          desc:{ en:"No shill cluster signature · 12% new accounts (within baseline)",
                 id:"Tidak ada signature shill · 12% akun baru (dalam baseline)",
                 zh:"无水军特征 · 12% 新账号(基准内)" } },
        { agent:"eligibility", tool:"compute_eligibility", ms:42, result:"ELIGIBLE",
          desc:{ en:"Wallet 0x1f3a…7eC9 holds 1 prior · seed-checked · slot reserved",
                 id:"Wallet 0x1f3a…7eC9 pegang 1 collection sebelumnya · seed dicek · slot dipesan",
                 zh:"钱包 0x1f3a…7eC9 持有 1 个前作 · 种子已验 · 已留座" } },
        { agent:"router", tool:"compose_alert", ms:18, result:"OK",
          desc:{ en:"Composite 22/100 · cleared LOW · alert queued for AL stage",
                 id:"Composite 22/100 · LOW · alert antri buat stage AL",
                 zh:"综合 22/100 · 低风险 · AL 阶段提醒已排队" } }
      ],
      summary:{ en:"All 8 risk factors clean. Wallet eligible. Alert will fire 90s before AL opens.",
               id:"8 faktor risiko bersih. Wallet eligible. Alert nyala 90 detik sebelum AL buka.",
               zh:"全部 8 项风险因子干净。钱包合格。AL 开始前 90 秒提醒触发。" }
    },
    "powder": {
      verdict:"med", score:58,
      title:{ en:"PowderEgg WL · Zora · MED 58/100", id:"PowderEgg WL · Zora · MED 58/100", zh:"PowderEgg WL · Zora · 中 58/100" },
      steps:[
        { agent:"scanner", tool:"scan_contract_bytecode", ms:71, result:"PASS",
          desc:{ en:"Bytecode verified on Zora · ERC-1155 standard mint",
                 id:"Bytecode terverifikasi di Zora · mint ERC-1155 standar",
                 zh:"Zora 验证字节码 · ERC-1155 标准铸造" } },
        { agent:"scanner", tool:"check_lp_lock", ms:92, result:"FAIL",
          desc:{ en:"No LP lock declaration · creator coin path only",
                 id:"Tidak ada deklarasi LP lock · jalur creator coin doang",
                 zh:"无 LP 锁定声明 · 仅 creator coin 路径" } },
        { agent:"scanner", tool:"query_holder_dist", ms:118, result:"WARN",
          desc:{ en:"Top-5 hold 38% · concentrated but not pre-rug pattern",
                 id:"Top-5 pegang 38% · terkonsentrasi tapi bukan pola pre-rug",
                 zh:"前 5 持有者占 38% · 集中但非预 rug 模式" } },
        { agent:"sentiment", tool:"fetch_x_chatter", ms:151, result:"PASS",
          desc:{ en:"187 mentions · 58% from accounts > 6mo · moderate organic",
                 id:"187 mentions · 58% dari akun > 6bulan · organik sedang",
                 zh:"187 次提及 · 58% 来自半年以上账号 · 中度有机" } },
        { agent:"forensic", tool:"crossref_rug_db", ms:312, result:"PASS",
          desc:{ en:"Deployer 0x9a4c…d12e · no prior rug · 4 shipped projects",
                 id:"Deployer 0x9a4c…d12e · tidak ada rug · 4 project rilis",
                 zh:"部署者 0x9a4c…d12e · 无 rug 历史 · 4 个已发项目" } },
        { agent:"eligibility", tool:"compute_eligibility", ms:38, result:"NOT_ELIGIBLE",
          desc:{ en:"Wallet age 14d · below project's 30d minimum",
                 id:"Umur wallet 14h · di bawah minimum 30h project",
                 zh:"钱包 14 天 · 低于项目 30 天门槛" } },
        { agent:"router", tool:"compose_alert", ms:21, result:"OK",
          desc:{ en:"Composite 58/100 · MED · review-required alert · no auto-mint",
                 id:"Composite 58/100 · MED · alert butuh review · no auto-mint",
                 zh:"综合 58/100 · 中等 · 需复查提醒 · 不自动铸造" } }
      ],
      summary:{ en:"LP not locked + holder concentration trigger MED tier. Wallet age below threshold so no eligibility hit. Alert as informational only.",
               id:"LP gak locked + konsentrasi holder trigger tier MED. Umur wallet di bawah threshold jadi gak dapet slot. Alert sifat informasional.",
               zh:"LP 未锁 + 持有者集中触发中等档。钱包年龄不达标无资格。提醒仅作通知。" }
    },
    "free-mint-alpha": {
      verdict:"hi", score:94,
      title:{ en:"FreeMintAlpha · Ethereum · CRITICAL 94/100", id:"FreeMintAlpha · Ethereum · KRITIS 94/100", zh:"FreeMintAlpha · 以太坊 · 致命 94/100" },
      steps:[
        { agent:"scanner", tool:"scan_contract_bytecode", ms:64, result:"FAIL",
          desc:{ en:"setApprovalForAll(*, true) on connect · drainer signature",
                 id:"setApprovalForAll(*, true) saat connect · signature drainer",
                 zh:"连接时调用 setApprovalForAll(*, true) · drainer 特征" } },
        { agent:"scanner", tool:"query_holder_dist", ms:98, result:"FAIL",
          desc:{ en:"1 wallet holds 78% supply · classic concentration pre-rug",
                 id:"1 wallet pegang 78% supply · konsentrasi klasik pre-rug",
                 zh:"单一钱包持有 78% · 典型 rug 前集中" } },
        { agent:"forensic", tool:"trace_fund_flow", ms:621, result:"FAIL",
          desc:{ en:"Funnel addr 0x4b…a92c received 4.2 ETH from 38 victims (24h)",
                 id:"Address corong 0x4b…a92c terima 4.2 ETH dari 38 korban (24j)",
                 zh:"漏斗地址 0x4b…a92c 24 小时内从 38 个受害者收到 4.2 ETH" } },
        { agent:"forensic", tool:"crossref_rug_db", ms:312, result:"FAIL",
          desc:{ en:"Deployer 0x7d3e…112a matches 3 prior drainer collections",
                 id:"Deployer 0x7d3e…112a cocok 3 koleksi drainer sebelumnya",
                 zh:"部署者 0x7d3e…112a 匹配 3 个先前 drainer 系列" } },
        { agent:"sentiment", tool:"detect_shill_cluster", ms:201, result:"FAIL",
          desc:{ en:"47 'free mint' tweets · 89% from <12h-old accounts",
                 id:"47 tweet 'free mint' · 89% dari akun <12 jam baru",
                 zh:"47 条「free mint」推文 · 89% 来自 12 小时内新建账号" } },
        { agent:"eligibility", tool:"compute_eligibility", ms:42, result:"BLOCKED",
          desc:{ en:"Wallet protection: hard-block before any signature request",
                 id:"Proteksi wallet: hard-block sebelum permintaan tanda tangan",
                 zh:"钱包保护:在任何签名请求前硬性阻止" } },
        { agent:"router", tool:"compose_alert", ms:20, result:"OK",
          desc:{ en:"Composite 94/100 · CRITICAL · klaxon alert · do-not-connect copy",
                 id:"Composite 94/100 · KRITIS · alert klakson · copy jangan-connect",
                 zh:"综合 94/100 · 致命 · 警铃提醒 · 禁连提示" } }
      ],
      summary:{ en:"Drainer pattern with 3-recurrence deployer history. 38 wallets already drained in 24h. Auto-block engaged before any wallet sign request.",
               id:"Pola drainer dengan deployer recurrence 3 kali. 38 wallet udah dikuras dalam 24 jam. Auto-block aktif sebelum sign request manapun.",
               zh:"Drainer 模式 + 部署者重犯 3 次。24 小时内已洗 38 个钱包。任何签名请求前自动拦截。" }
    }
  },

  // Default reasoning when a drop has no scripted trace (used for monad/abstract/glyphs)
  reasoningDefault: {
    title:{ en:"Generic drop scan", id:"Scan drop generik", zh:"通用 drop 扫描" },
    summary:{ en:"Standard 8-factor scan. Click Pixie Pirates / PowderEgg WL / FreeMintAlpha for full reasoning trace.",
              id:"Scan 8-faktor standar. Klik Pixie Pirates / PowderEgg WL / FreeMintAlpha buat trace reasoning lengkap.",
              zh:"标准 8 因子扫描。点击 Pixie Pirates / PowderEgg WL / FreeMintAlpha 查看完整推理轨迹。" }
  },

  // Trace template per riskLevel — used when a drop has no scripted reasoning
  reasoningTemplates: {
    low: {
      steps:[
        { agent:"scanner", tool:"scan_contract_bytecode", ms:64, result:"PASS",
          desc:{ en:"Bytecode verified · standard ERC-721A · no unusual opcodes",
                 id:"Bytecode terverifikasi · ERC-721A standar · tidak ada opcode aneh",
                 zh:"字节码已验证 · 标准 ERC-721A · 无异常操作码" } },
        { agent:"scanner", tool:"query_holder_dist", ms:98, result:"PASS",
          desc:{ en:"Top-10 hold 6.4% pre-mint · healthy distribution",
                 id:"Top-10 pegang 6.4% pre-mint · distribusi sehat",
                 zh:"前 10 持有者占 6.4% · 分布健康" } },
        { agent:"scanner", tool:"check_lp_lock", ms:84, result:"PASS",
          desc:{ en:"LP locked 18-month · audit-attested",
                 id:"LP lock 18 bulan · audit-attested",
                 zh:"LP 锁定 18 个月 · 审计认证" } },
        { agent:"sentiment", tool:"fetch_x_chatter", ms:142, result:"PASS",
          desc:{ en:"312 mentions/24h · organic curve · no shill cluster",
                 id:"312 mentions/24h · kurva organik · tanpa cluster shill",
                 zh:"24 小时 312 次提及 · 有机曲线 · 无水军聚类" } },
        { agent:"forensic", tool:"crossref_rug_db", ms:298, result:"PASS",
          desc:{ en:"Deployer clean · no prior rug · 2 shipped projects",
                 id:"Deployer bersih · tidak ada rug · 2 project rilis",
                 zh:"部署者干净 · 无 rug 历史 · 2 个已发项目" } },
        { agent:"eligibility", tool:"compute_eligibility", ms:38, result:"ELIGIBLE",
          desc:{ en:"Wallet meets AL criteria · slot reserved",
                 id:"Wallet memenuhi kriteria AL · slot dipesan",
                 zh:"钱包符合 AL 条件 · 已留座" } },
        { agent:"router", tool:"compose_alert", ms:18, result:"OK",
          desc:{ en:"Verdict LOW · alert queued for stage open",
                 id:"Verdict LOW · alert antri buat stage buka",
                 zh:"判定低风险 · 阶段开放提醒已排队" } }
      ],
      summary:{ en:"All risk factors clean. Wallet eligible. Alert will fire 90s before stage opens.",
                id:"Semua faktor risiko bersih. Wallet eligible. Alert nyala 90 detik sebelum stage buka.",
                zh:"全部风险因子干净。钱包合格。阶段开始前 90 秒提醒触发。" }
    },
    med: {
      steps:[
        { agent:"scanner", tool:"scan_contract_bytecode", ms:71, result:"PASS",
          desc:{ en:"Bytecode verified · standard mint flow",
                 id:"Bytecode terverifikasi · alur mint standar",
                 zh:"字节码已验证 · 标准铸造流程" } },
        { agent:"scanner", tool:"query_holder_dist", ms:118, result:"WARN",
          desc:{ en:"Top-5 hold 36% · concentrated but not pre-rug",
                 id:"Top-5 pegang 36% · terkonsentrasi tapi bukan pre-rug",
                 zh:"前 5 持有者占 36% · 集中但非预 rug" } },
        { agent:"scanner", tool:"check_lp_lock", ms:92, result:"WARN",
          desc:{ en:"LP lock 6-month only · below 12-month safety floor",
                 id:"LP lock cuma 6 bulan · di bawah floor aman 12 bulan",
                 zh:"LP 仅锁 6 个月 · 低于 12 月安全线" } },
        { agent:"sentiment", tool:"fetch_x_chatter", ms:151, result:"PASS",
          desc:{ en:"94 mentions · 52% from accounts > 6mo · moderate organic",
                 id:"94 mentions · 52% dari akun > 6 bulan · organik sedang",
                 zh:"94 次提及 · 52% 来自半年以上账号 · 中度有机" } },
        { agent:"forensic", tool:"crossref_rug_db", ms:308, result:"PASS",
          desc:{ en:"Deployer no prior rug · 1 shipped project",
                 id:"Deployer tidak ada rug · 1 project rilis",
                 zh:"部署者无 rug 历史 · 1 个已发项目" } },
        { agent:"eligibility", tool:"compute_eligibility", ms:39, result:"ELIGIBLE",
          desc:{ en:"Wallet meets criteria · proceed-with-caution flag",
                 id:"Wallet memenuhi kriteria · flag proceed-with-caution",
                 zh:"钱包符合条件 · 谨慎参与标记" } },
        { agent:"router", tool:"compose_alert", ms:21, result:"OK",
          desc:{ en:"Verdict MED · review-required alert · no auto-mint",
                 id:"Verdict MED · alert butuh review · no auto-mint",
                 zh:"中等档 · 需复查提醒 · 不自动铸造" } }
      ],
      summary:{ en:"Holder concentration + short LP lock trigger MED tier. Alert is informational — review manually before connecting.",
                id:"Konsentrasi holder + LP lock pendek trigger tier MED. Alert informasional — review manual sebelum connect.",
                zh:"持有者集中 + LP 锁短触发中等档。提醒仅作信息 — 连接前请人工复查。" }
    },
    hi: {
      steps:[
        { agent:"scanner", tool:"scan_contract_bytecode", ms:68, result:"FAIL",
          desc:{ en:"Suspicious approval pattern · drainer signature flagged",
                 id:"Pola approval mencurigakan · signature drainer ditandai",
                 zh:"可疑授权模式 · drainer 特征已标记" } },
        { agent:"scanner", tool:"query_holder_dist", ms:104, result:"FAIL",
          desc:{ en:"Top wallet holds 64% supply · concentration pre-rug pattern",
                 id:"Top wallet pegang 64% supply · pola konsentrasi pre-rug",
                 zh:"头部钱包持有 64% · 预 rug 集中模式" } },
        { agent:"forensic", tool:"trace_fund_flow", ms:612, result:"FAIL",
          desc:{ en:"Funnel address received 1.8 ETH from 14 victims (24h)",
                 id:"Address corong terima 1.8 ETH dari 14 korban (24j)",
                 zh:"漏斗地址 24 小时内从 14 个受害者收到 1.8 ETH" } },
        { agent:"forensic", tool:"crossref_rug_db", ms:316, result:"FAIL",
          desc:{ en:"Deployer matches 2 prior drainer collections",
                 id:"Deployer cocok 2 koleksi drainer sebelumnya",
                 zh:"部署者匹配 2 个先前 drainer 系列" } },
        { agent:"sentiment", tool:"detect_shill_cluster", ms:204, result:"FAIL",
          desc:{ en:"32 promo posts · 84% from <24h-old accounts",
                 id:"32 post promo · 84% dari akun <24 jam baru",
                 zh:"32 条推广 · 84% 来自 24 小时内新建账号" } },
        { agent:"eligibility", tool:"compute_eligibility", ms:41, result:"BLOCKED",
          desc:{ en:"Wallet protection: hard-block before signature request",
                 id:"Proteksi wallet: hard-block sebelum sign request",
                 zh:"钱包保护:签名请求前硬性阻止" } },
        { agent:"router", tool:"compose_alert", ms:20, result:"OK",
          desc:{ en:"Verdict CRITICAL · klaxon alert · do-not-connect copy",
                 id:"Verdict KRITIS · alert klakson · copy jangan-connect",
                 zh:"致命 · 警铃提醒 · 禁连提示" } }
      ],
      summary:{ en:"Drainer + repeat-offender deployer detected. Wallets already drained. Auto-block engaged before any sign request.",
                id:"Drainer + deployer recurrence terdeteksi. Wallet udah dikuras. Auto-block aktif sebelum sign request manapun.",
                zh:"drainer + 部署者重犯检测到。已有钱包被洗。任何签名前自动拦截。" }
    }
  },

  // Per-tool detail (schema, sample IO, last 5 invocations) — used by tool registry drawer
  toolDetails: {
    "scan_contract_bytecode": {
      schema:{ input:["address: 0x...", "chain: 'eth'|'base'|'monad'|..."], output:["opcodes: string[]","verified: bool","drainer: bool","gas_estimate: int"] },
      sample:{ in:`{ "address":"0x9a4c…d12e", "chain":"base" }`, out:`{ "opcodes":["PUSH1","CALLDATALOAD",…], "verified":true, "drainer":false, "gas_estimate":86420 }` },
      recent:[
        { drop:"Pixie Pirates", ms:62, result:"PASS" },
        { drop:"PowderEgg WL", ms:71, result:"PASS" },
        { drop:"FreeMintAlpha", ms:64, result:"FAIL" },
        { drop:"Monad Genesis", ms:58, result:"PASS" },
        { drop:"Glyphs Solana", ms:74, result:"PASS" }
      ]
    },
    "query_holder_dist": {
      schema:{ input:["address: 0x...","chain","topN: 10"], output:["topNPercent: float","gini: float","whaleCount: int"] },
      sample:{ in:`{ "address":"0x9a4c…d12e", "chain":"base", "topN":10 }`, out:`{ "topNPercent":4.2, "gini":0.23, "whaleCount":0 }` },
      recent:[
        { drop:"Pixie Pirates", ms:104, result:"PASS" },
        { drop:"PowderEgg WL", ms:118, result:"WARN" },
        { drop:"FreeMintAlpha", ms:98, result:"FAIL" },
        { drop:"Abstract Penguins", ms:121, result:"PASS" },
        { drop:"Glyphs Solana", ms:115, result:"WARN" }
      ]
    },
    "check_lp_lock": {
      schema:{ input:["pair: 0x...","chain"], output:["locked: bool","durationMonths: int","attested: bool"] },
      sample:{ in:`{ "pair":"0x71ee…44ab", "chain":"base" }`, out:`{ "locked":true, "durationMonths":24, "attested":true }` },
      recent:[
        { drop:"Pixie Pirates", ms:88, result:"PASS" },
        { drop:"PowderEgg WL", ms:92, result:"FAIL" },
        { drop:"Monad Genesis", ms:81, result:"PASS" },
        { drop:"Abstract Penguins", ms:86, result:"PASS" },
        { drop:"Glyphs Solana", ms:94, result:"WARN" }
      ]
    },
    "trace_fund_flow": {
      schema:{ input:["wallet: 0x...","hops: 5..10","chain"], output:["funnels: addr[]","victimsCount: int","totalETH: float"] },
      sample:{ in:`{ "wallet":"0x7d3e…112a", "hops":8, "chain":"eth" }`, out:`{ "funnels":["0x4b…a92c"], "victimsCount":38, "totalETH":4.2 }` },
      recent:[
        { drop:"FreeMintAlpha", ms:621, result:"FAIL" },
        { drop:"PowderEgg WL", ms:584, result:"PASS" },
        { drop:"Pixie Pirates", ms:612, result:"PASS" },
        { drop:"Glyphs Solana", ms:602, result:"PASS" },
        { drop:"Abstract Penguins", ms:597, result:"PASS" }
      ]
    },
    "crossref_rug_db": {
      schema:{ input:["deployer: 0x...","chain"], output:["matches: int","priorRugs: collection[]"] },
      sample:{ in:`{ "deployer":"0x7d3e…112a", "chain":"eth" }`, out:`{ "matches":3, "priorRugs":["FakePunks","DrainerApes","RugZilla"] }` },
      recent:[
        { drop:"PowderEgg WL", ms:312, result:"PASS" },
        { drop:"FreeMintAlpha", ms:312, result:"FAIL" },
        { drop:"Pixie Pirates", ms:298, result:"PASS" },
        { drop:"Monad Genesis", ms:304, result:"PASS" },
        { drop:"Abstract Penguins", ms:308, result:"PASS" }
      ]
    },
    "fetch_x_chatter": {
      schema:{ input:["query: string","window: '24h'|'7d'"], output:["mentions: int","organicPct: float","topPosters: handle[]"] },
      sample:{ in:`{ "query":"PixiePirates", "window":"24h" }`, out:`{ "mentions":428, "organicPct":71, "topPosters":["@nftcalls","@basegems",…] }` },
      recent:[
        { drop:"Pixie Pirates", ms:148, result:"PASS" },
        { drop:"PowderEgg WL", ms:151, result:"PASS" },
        { drop:"Monad Genesis", ms:143, result:"PASS" },
        { drop:"Abstract Penguins", ms:158, result:"PASS" },
        { drop:"Glyphs Solana", ms:152, result:"PASS" }
      ]
    },
    "detect_shill_cluster": {
      schema:{ input:["query: string","minAccountAgeHours: 12"], output:["shillCount: int","newAccPct: float","verdict: bool"] },
      sample:{ in:`{ "query":"FreeMintAlpha", "minAccountAgeHours":12 }`, out:`{ "shillCount":47, "newAccPct":89, "verdict":true }` },
      recent:[
        { drop:"FreeMintAlpha", ms:201, result:"FAIL" },
        { drop:"Pixie Pirates", ms:201, result:"PASS" },
        { drop:"PowderEgg WL", ms:198, result:"PASS" },
        { drop:"Glyphs Solana", ms:204, result:"WARN" },
        { drop:"Abstract Penguins", ms:199, result:"PASS" }
      ]
    },
    "compute_eligibility": {
      schema:{ input:["wallet: 0x...","collectionId","stage: 'AL'|'FCFS'|'Public'"], output:["eligible: bool","reason: string","slot: int"] },
      sample:{ in:`{ "wallet":"0x1f3a…7eC9", "collectionId":"pixie", "stage":"AL" }`, out:`{ "eligible":true, "reason":"holds_prior_collection", "slot":2178 }` },
      recent:[
        { drop:"Pixie Pirates", ms:42, result:"ELIGIBLE" },
        { drop:"PowderEgg WL", ms:38, result:"NOT_ELIGIBLE" },
        { drop:"FreeMintAlpha", ms:42, result:"BLOCKED" },
        { drop:"Monad Genesis", ms:39, result:"ELIGIBLE" },
        { drop:"Abstract Penguins", ms:41, result:"ELIGIBLE" }
      ]
    },
    "read_dompet_history": {
      schema:{ input:["wallet: 0x...","window: '7d'|'30d'"], output:["mints: int","gasEth: float","scamFlagged: int"] },
      sample:{ in:`{ "wallet":"0x1f3a…7eC9", "window":"7d" }`, out:`{ "mints":12, "gasEth":0.084, "scamFlagged":0 }` },
      recent:[
        { drop:"Pixie Pirates", ms:31, result:"OK" },
        { drop:"PowderEgg WL", ms:34, result:"OK" },
        { drop:"Monad Genesis", ms:29, result:"OK" },
        { drop:"Abstract Penguins", ms:32, result:"OK" },
        { drop:"Glyphs Solana", ms:33, result:"OK" }
      ]
    },
    "estimate_gas": {
      schema:{ input:["chain","blockOffset: int"], output:["gwei: float","usd: float","trend: 'up'|'down'"] },
      sample:{ in:`{ "chain":"base", "blockOffset":1 }`, out:`{ "gwei":0.018, "usd":0.21, "trend":"down" }` },
      recent:[
        { drop:"Pixie Pirates", ms:14, result:"OK" },
        { drop:"PowderEgg WL", ms:16, result:"OK" },
        { drop:"FreeMintAlpha", ms:14, result:"OK" },
        { drop:"Monad Genesis", ms:14, result:"OK" },
        { drop:"Abstract Penguins", ms:13, result:"OK" }
      ]
    },
    "compose_alert": {
      schema:{ input:["dropId","verdict","channels: ('tg'|'dc'|'push')[]"], output:["payload: object"] },
      sample:{ in:`{ "dropId":"pixie", "verdict":"low", "channels":["tg","dc"] }`, out:`{ "payload":{"text":"Pixie AL opens 90s · LOW 22","markup":[…]} }` },
      recent:[
        { drop:"Pixie Pirates", ms:18, result:"OK" },
        { drop:"PowderEgg WL", ms:21, result:"OK" },
        { drop:"FreeMintAlpha", ms:20, result:"OK" },
        { drop:"Monad Genesis", ms:18, result:"OK" },
        { drop:"Abstract Penguins", ms:19, result:"OK" }
      ]
    },
    "dispatch_alert": {
      schema:{ input:["payload: object","channels"], output:["delivered: int","failed: int","ms: int"] },
      sample:{ in:`{ "payload":{…}, "channels":["tg","dc"] }`, out:`{ "delivered":2, "failed":0, "ms":124 }` },
      recent:[
        { drop:"Pixie Pirates", ms:124, result:"OK" },
        { drop:"PowderEgg WL", ms:131, result:"OK" },
        { drop:"FreeMintAlpha", ms:118, result:"OK" },
        { drop:"Monad Genesis", ms:122, result:"OK" },
        { drop:"Abstract Penguins", ms:128, result:"OK" }
      ]
    }
  }
};
