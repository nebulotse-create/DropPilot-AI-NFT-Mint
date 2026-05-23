# DropPilot AI

> Your AI command center for drops, wallets, gas, and launch signals.
> Never miss the next mint window.

**Live demo →** https://nebulotse-create.github.io/DropPilot-AI-Mint/

DropPilot is an AI co-pilot for NFT mint hunters and airdrop farmers. It watches drop queues across Monad, Abstract, Base, Zora, Ethereum, and Solana, scores risk in real time, and routes your watchlist through a multi-agent reasoning pipeline.

This is a concept-stage submission for the Xiaomi MiMo Orbit grant program. All telemetry shown in the demo is illustrative mock data — not live RPC feeds.

---

## Why DropPilot

NFT mint windows close in seconds. Airdrop checkers ship rugs daily. Gas spikes burn whole sessions. The hunter's loop today is six tabs, three Discords, two block explorers, and a prayer.

DropPilot consolidates that loop into one mission-control dashboard with five autonomous agents doing the grunt work — contract bytecode scans, holder distribution checks, LP locks, X chatter sentiment, eligibility cross-referencing — and surfaces everything as a single risk verdict per drop.

## Dashboard tour

The demo is a single-page mission control split into seven surfaces.

### Mission control hero

Live ticker rail across the top (per-chain gas, ETH/SOL spot), then three side-by-side panels:

- **Chains tracked** — 8/8: Ethereum, Base, Monad, Abstract, Zora, Solana, OpenSea, Magic Eden
- **Upcoming mint queue** — 6 drops sorted by ETA with trace + action buttons
- **Wallet snapshot** — demo wallet, allowlist count, 7d mints, gas spent, flagged scams

A full-width signal stream (X / OpenSea / Magic Eden / Zora / scanner) sits below.

### 01 · Coverage map

Eight surfaces scanned every 6 seconds: Ethereum mempool, Base L2, Monad mainnet+testnet, Abstract zkSync, Zora creator paths, Solana cNFT + standard, OpenSea drops index, Magic Eden launchpad (SOL + ETH + Base).

### 02 · Agent operations

The AI core. Three panels plus a natural-language command bar.

- **Agents** — 5 autonomous agents: Scanner, Forensic, Sentiment, Eligibility, Router. Each shows status, p50 latency, and a live log feed.
- **Tool registry** — 12 tools, each clickable. Side drawer slides in with schema, sample I/O, last 5 invocations, and the agents that use it.

  `scan_contract_bytecode` · `query_holder_dist` · `check_lp_lock` · `fetch_x_chatter` · `crossref_rug_db` · `estimate_gas` · `simulate_mint` · `lookup_ens` · `scan_solana_program` · `dispatch_alert` · `read_dompet_history` · `compute_eligibility`
- **Cost-tier router** — 24h stats: 1,842 drops scored, 91.2% routed to cost-efficient tier, 8.8% escalated to flagship, $0.34 saved per scan, escalation reasons listed.
- **NL command bar** — type `watch Base drops, risk < 30, AL only, alert TG` and the parser breaks it into chips: chain filter, risk threshold, stage filter, alert channel.

Click any drop in the queue and a side drawer opens with the agent's step-by-step reasoning trace — which tool fired, what it returned, latency per step, final verdict. Three drops have scripted traces; the other three render from a template that adapts to the drop's risk level so every drop has a visible trace.

### 03 · Risk engine

Eight-factor weighted scoring, composite 0-100 with a verdict label (LOW / MED / HIGH / SCAM). Each factor is shown with its check status: contract verified, LP locked, holder distribution, deployer history, X sentiment, rug-DB cross-reference, gas simulation, eligibility match. Tabs swap between three sample drops (Pixie Pirates LOW 22, PowderEgg MED 58, FreeMintAlpha SCAM 94).

### 04 · Wallet check

Paste a wallet, get a read-only eligibility report. Six cards render: allowlist matches, snapshot eligibility, gas-budget fit, contract reputation, peer activity, and recommended next mint. Read-only, zero signing.

### 05 · Alert routing

Webhook + push + browser. Three rails:

- **Telegram bot** — chat ID subscribe via the header CTA mini-drawer
- **Discord webhook** — paste URL, get drop pings
- **Browser push** — opt-in for in-tab alerts

### 06 · Roadmap

Concept · pre-MVP. The product map: command center → eligibility checker → autonomous mint pilot.

### Trilingual

EN / ID / ZH switcher, top-right. All copy, panel labels, drawer text, and the disclaimer footer are localized in three languages.

## What's mocked

Everything you see — gas prices, ETAs, risk scores, agent latencies, tool invocation counts, reasoning traces, eligibility cards — is frozen demo data. The footer disclaimer is explicit about this in all three languages.

The point of the build is to make the **shape** of the agent product real, not the data feed.

## Tech

Pure HTML, CSS, and vanilla JavaScript. No build step, no framework, no bundler. Renders on GitHub Pages out of the box.

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

## Browser support

Tested on Chromium 120+. Uses CSS `:has()` and modern grid — older browsers will degrade gracefully but lose some panel collapse behavior.

## Roadmap (post-grant)

- Wire reasoning trace to real agent runtime via WebSocket
- Replace ticker mock with free RPC reads (Alchemy/Ankr for ETH/Base/Zora/Abstract, native RPC for Monad and Solana)
- Cost-tier router as a real model dispatch layer over MiMo's pricing tiers
- Eligibility checker that actually reads on-chain history
- Telegram bot + Discord webhook for the alerts CTA

## License

MIT. See [LICENSE](./LICENSE).

---

Built for the Xiaomi MiMo Orbit grant program, May 2026.
