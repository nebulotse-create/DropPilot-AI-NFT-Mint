<div align="center">

# DropPilot AI

**Your AI command center for drops, wallets, gas, and launch signals.**
**Never miss the next mint window.**

[![Live demo](https://img.shields.io/badge/live-demo-00E0C7?style=flat-square)](https://nebulotse-create.github.io/DropPilot-AI-Mint/)
[![Stage](https://img.shields.io/badge/stage-concept--preview-7C5CFF?style=flat-square)](#whats-mocked)
[![Locales](https://img.shields.io/badge/locales-EN%20%C2%B7%20ID%20%C2%B7%20ZH-FFC857?style=flat-square)](#trilingual)
[![License](https://img.shields.io/badge/license-MIT-2B3D55?style=flat-square)](./LICENSE)

[**→ Open the live dashboard**](https://nebulotse-create.github.io/DropPilot-AI-Mint/)

</div>

---

> NFT mint windows close in seconds.
> Airdrop checkers ship rugs daily.
> Gas spikes burn whole sessions.
>
> The hunter's loop today: six tabs, three Discords, two block explorers, and a prayer.

DropPilot collapses that loop into a single mission-control dashboard. Five autonomous agents do the grunt work — bytecode scans, holder distribution checks, LP locks, X chatter sentiment, eligibility cross-referencing — and surface everything as a single risk verdict per drop.

Built as a concept-stage submission for the **Xiaomi MiMo Orbit grant program**, May 2026.

---

## The dashboard, in 30 seconds

Open the live link and the page **is** the product. No marketing scroll above the fold — the hero is the panel.

| Surface | What you see |
|---|---|
| **Live ticker** | Per-chain gas + ETH/SOL spot, pinned across the top |
| **Chains tracked** | 8/8 surfaces with drop counts and gwei pulse |
| **Upcoming queue** | 6 drops sorted by ETA with trace + action buttons |
| **Wallet snapshot** | Allowlists, 7d mints, gas spent, flagged scams |
| **Signal stream** | Aggregated chatter from X / OpenSea / Magic Eden / Zora |

---

## The AI surface

Four interactive surfaces ship in v1 — none of them are decorative.

### 1 · Reasoning trace drawer

Click any drop in the queue. A side panel slides in with the agent's step-by-step trace: which tool fired, what it returned, latency per step, final verdict. Three drops have hand-authored traces, three render from a template that adapts to the risk level. Every drop has a visible trace — no empty state.

### 2 · Tool registry

Twelve tools, each clickable. Side drawer reveals schema, sample I/O JSON, and the last five invocations.

| Scanner | Forensic | Sentiment | Eligibility | Router |
|---|---|---|---|---|
| `scan_contract_bytecode` | `check_lp_lock` | `fetch_x_chatter` | `read_dompet_history` | `dispatch_alert` |
| `query_holder_dist` | `crossref_rug_db` | | `compute_eligibility` | `estimate_gas` |
| `scan_solana_program` | `simulate_mint` | | `lookup_ens` | |

### 3 · Cost-tier router

24h routing telemetry rendered as a sidebar widget.

| Metric | Value |
|---|---|
| Drops scored | 1,842 |
| Cost-efficient tier | **91.2%** |
| Flagship tier | 8.8% |
| Saved per scan | $0.34 |

A natural fit for **MiMo Token Plan tiered pricing** when the post-grant runtime ships.

### 4 · Connect alerts mini-flow

Click the header CTA. Side drawer opens with bot handle, Telegram chat ID input, and a working subscribe → success banner. The CTA is wired to a real flow, not a dead link.

### 5 · Natural-language command bar

Type:

```
watch Base drops, risk < 30, AL only, alert TG
```

The parser breaks it into four chips: chain · risk threshold · stage filter · alert channel.

---

## The other surfaces

| Section | What it does |
|---|---|
| **01 · Coverage map** | 4×2 grid of chain coverage cards — Ethereum, Base, Monad, Abstract, Zora, Solana, OpenSea, Magic Eden |
| **02 · Agent operations** | The AI core (above) |
| **03 · Risk engine** | 8-factor weighted scoring with three swappable profiles: LOW 22 / MED 58 / SCAM 94 |
| **04 · Wallet check** | Paste a wallet → 6 cards: allowlist, snapshot, gas-budget, contract reputation, peer activity, next mint |
| **05 · Alert routing** | Telegram bot + Discord webhook + browser push, three preview rails |
| **06 · Roadmap** | Concept → MVP → autonomous pilot |

---

## Trilingual

EN · ID · 中文 switcher in the top-right. Every panel label, drawer heading, risk verdict, signal feed entry, and the disclaimer footer is authored line-by-line in three languages. Not machine-translated.

---

## What's mocked

> Everything you see — gas prices, ETAs, risk scores, agent latencies, tool invocation counts, reasoning traces — is **frozen demo data**.

The footer disclaimer is explicit about this in all three languages. The point of the build is to make the **shape** of the agent product real, not the data feed.

---

## Tech

Pure HTML, CSS, and vanilla JavaScript. No build step. No framework. No bundler. Renders on GitHub Pages out of the box.

```
.
├── index.html       — full layout, all panels, all sections
├── data.js          — mock data: drops, agents, tools, traces, ticker, wallet
├── i18n.js          — three-locale string bundle (EN, ID, ZH)
├── app.js           — runtime: drawer, log stream, tool registry, NL bar, risk tabs
├── assets/          — favicons, og-image (SVG + PNG)
├── README.md
├── LICENSE
└── BUILD-PROCESS.md
```

Tested on Chromium 120+. Uses CSS `:has()` and modern grid — older browsers degrade gracefully but lose some panel collapse behavior.

---

## Roadmap (post-grant)

- Wire reasoning trace to a real agent runtime via WebSocket
- Replace ticker mock with free RPC reads — Alchemy/Ankr for ETH/Base/Zora/Abstract, native RPC for Monad and Solana
- Cost-tier router becomes a real model dispatch layer over MiMo's pricing tiers
- Eligibility checker that actually reads on-chain history
- Telegram bot + Discord webhook for the alerts CTA

---

## License

MIT. See [LICENSE](./LICENSE).

---

<div align="center">

**Built for the [Xiaomi MiMo Orbit](https://100t.xiaomimimo.com/) grant program · May 2026**

[Live demo](https://nebulotse-create.github.io/DropPilot-AI-Mint/) · [Build process](./BUILD-PROCESS.md)

</div>
