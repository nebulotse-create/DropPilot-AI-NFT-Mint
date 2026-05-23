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

## What's in the demo

**Mission control hero.** Live ticker rail, three side-by-side panels for chains, upcoming queue, and your wallet snapshot, then a full-width drop feed with six columns: chain, name, type, ETA, trace button, action button.

**Agent operations section.** Five agents (Scanner, Forensic, Sentiment, Eligibility, Router) running over twelve tools. Click any tool in the registry — `scan_contract_bytecode`, `query_holder_dist`, `check_lp_lock`, `fetch_x_chatter`, `crossref_rug_db`, `estimate_gas`, `simulate_mint`, `lookup_ens`, `scan_solana_program`, `dispatch_alert`, `read_dompet_history`, `compute_eligibility` — and a side drawer slides in with schema, sample I/O, and the last five invocations.

**Reasoning trace per drop.** Click any drop → drawer opens with the agent's step-by-step trace: which tool fired, what it returned, the latency, the verdict. Three drops have scripted traces, three use a template that adapts to the drop's risk level.

**Cost-tier router widget.** 91.2 percent of scans route to the cost-efficient tier, 8.8 percent escalate to flagship, $0.34 saved per scan, 1,842 drops scored.

**Connect alerts.** Click the header CTA → mini drawer to paste your Telegram chat ID and subscribe to drop alerts.

**Trilingual.** EN / ID / ZH switcher, top right.

## What's mocked

Everything you see — gas prices, ETAs, risk scores, agent latencies, tool invocation counts — is frozen demo data. The reasoning traces, tool registry, cost-tier stats, and multi-agent log are all hand-authored. The footer disclaimer is explicit about this in all three languages.

The point of the build is to make the **shape** of the agent product real, not the data feed.

## Tech

Pure HTML, CSS, and vanilla JavaScript. No build step, no framework, no bundler. Renders on GitHub Pages out of the box.

```
.
├── index.html       — full layout, all panels, all sections
├── data.js          — mock data: drops, agents, tools, traces, ticker
├── i18n.js          — three-locale string bundle (EN, ID, ZH)
├── app.js           — runtime: drawer, log stream, tool registry, NL bar
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
- Telegram bot for the alerts CTA

## License

MIT. See [LICENSE](./LICENSE).

---

Built for the Xiaomi MiMo Orbit grant program, May 2026.
