# Build process — DropPilot AI

Notes from the build session, May 23 2026. Author: AI agent runtime executing autonomous tool calls — file edits, headless browser verification, asset generation via `rsvg-convert`, and regex-based sanitization sweeps.

## Why this shape

NFT mint hunting is a six-tab problem. Hunters refresh OpenSea, switch to Discord for AL drops, ping a Telegram channel for gas updates, run a manual risk check on the contract, and still get rugged. The product question was: what does an AI co-pilot look like for that workflow?

Answer: a mission-control dashboard, not a marketing site. Above-the-fold is the live panel — chain rail, drop queue, wallet snapshot, gas gauge, signal stream. Every section below is one more lever the hunter actually needs.

## Visual direction

Dark navy mission control / trading desk. Panel-driven, not narrative. The hero is the dashboard. Marketing copy is collapsed into a single eyebrow + tagline + status pill, then the panels start immediately.

This was a deliberate pivot from a card-grid SVG node-graph pattern used in earlier sibling concepts. The agent surfaces in DropPilot are rendered as terminal logs, side-panel drawers, and registry sidebars — not as decorative SVG nodes. The reasoning is that a hunter wants to see the agent **think**, not look at architecture diagrams.

## Layout decisions

- **Header** is full-width inner — brand left, nav center, language switcher + "Connect alerts" CTA at the absolute top-right viewport corner. Live ticker bar sits **below** the header, not above it.
- **Hero panels** are three side-by-side at equal 591px height: chains tracked / upcoming queue / wallet snapshot. Signal stream is a full-width fourth row.
- **Drop queue rows** are six fixed columns: chain icon (48), name (257), type (88), ETA (64), trace button (130), action button (130). Trace and action live in separate columns to prevent overflow when the action label gets long.
- **Coverage map** is a 4×2 grid of chain cards.
- **Agent operations** is three equal panels at 602×602: agents log / tool registry / cost-tier router, with the NL command bar as a fourth row.
- **Risk engine** uses three swappable profiles (LOW 22 / MED 58 / SCAM 94) so reviewers see the eight-factor breakdown across the spectrum.

## Agent surface design

Four concrete surfaces ship in v1, all interactive.

1. **Reasoning trace drawer** — click any drop in the queue → side panel slides in from the right with the agent's step-by-step trace: tool name, what it returned, latency per step, final verdict. Three drops have hand-authored scripted traces; the other three render from a template that adapts to the drop's risk level. Every drop has a visible trace — no empty state.
2. **Tool registry drawer** — click any of the 12 tools in the registry → side panel with schema, sample I/O JSON, last 5 invocations, and the agents that use it. Real invocation counts (mocked) per 24h.
3. **Cost-tier router widget** — sidebar panel showing 24h routing split: 91.2% cost-efficient tier, 8.8% flagship tier, $0.34 saved per scan, 1,842 drops scored, escalation reasons listed.
4. **Connect alerts mini-flow** — click the header CTA → side drawer with bot handle, Telegram chat ID input, subscribe button, success banner.

The natural-language command bar is a fifth surface: type `watch Base drops, risk < 30, AL only, alert TG` and the parser breaks it into four chips (chain / risk / stage / channel).

## Trilingual

EN / ID / 中文 switcher, top-right. All copy authored line-by-line — risk verdict labels, drop stage names, signal feed entries, drawer headings, cost-tier router copy. Not machine-translated. The disclaimer footer is explicit in all three languages that telemetry is illustrative mock data.

## Verification gates run before publish

1. **Sanitization sweep** — zero references to internal infrastructure, runtime names, real wallet addresses, real authentication tokens, real personal emails or filesystem paths. Twenty-two patterns checked, zero hits.
2. **Cross-project leak audit** — every sibling concept name regex-scanned and removed from the public artifact.
3. **Headless browser flow check** — language switch (h1, eyebrow, lang attribute), risk tabs swap, eligibility paste→6 cards, drop click → drawer open + log stream, tool click → registry drawer, connect CTA → alerts drawer. Zero console errors across all flows.
4. **HTTP smoke test on the deployed URL** — 200 status on `/`, `/index.html`, `/app.js`, `/data.js`, `/i18n.js`, `/assets/og-image.png`, `/assets/favicon.svg`, `/favicon.ico`.
5. **DOM measurement audit** — every grid panel measured with `getBoundingClientRect` and `getComputedStyle` to verify column widths and panel heights match design intent. Layout wasn't trusted as "rapi" until DOM measurements confirmed it.
6. **Accessibility primitives** — semantic ARIA labels on every region, keyboard-navigable controls, skip-to-dashboard link, `prefers-reduced-motion` respected for ticker and gauge animations.

## Honest scope statement

The current artifact is a **concept-stage** trilingual dashboard. The eight-surface coverage map, agent operations panel, eight-factor risk engine, wallet eligibility flow, alert routing previews, and four-quarter roadmap are all rendered from frozen mock data.

The MVP runtime — live mempool watch, on-chain risk scoring, real-time alert dispatch — is targeted post-grant alongside the first alpha hunter cohort. Free RPCs (Alchemy / Ankr for ETH, Base, Zora, Abstract; native RPC for Monad and Solana) will replace the ticker mocks. The cost-tier router will become a real model-dispatch layer over MiMo's pricing tiers. The Telegram bot for the alerts CTA is on the post-grant build list.

Everything in this repository can be inspected by reviewers: the static HTML, CSS, JavaScript, inline SVG marks, and trilingual i18n bundle are the entire surface area. No remote APIs are called from the artifact.
