# Build process — DropPilot AI

This artifact was authored end-to-end by an AI agent runtime executing autonomous tool calls — file edits, headless browser verification, asset generation via `rsvg-convert`, and regex-based sanitization sweeps.

## Methodology

- Layout designed as a **command-center dashboard** rather than a marketing scroll. The above-the-fold experience is the live mission-control panel — multi-chain rail, drop queue with ETA countdowns, wallet snapshot, gas gauge, and signal stream — not a hero copy block.
- Every claim in narrative copy ties back to a visible interaction in the artifact (chain rail to coverage section, queue to risk engine, wallet snapshot to eligibility check).
- Trilingual i18n (English, Bahasa Indonesia, 中文) authored line-by-line, including risk verdict copy, drop stage labels, and signal feed entries — not machine-translated.
- Risk engine widget driven by three real worked profiles (LOW / MED / SCAM) so reviewers can see the eight-factor breakdown in action across the spectrum.
- Eight chain icons drawn as inline gradient marks so the architecture story is part of the static HTML — no external image dependencies.
- Drop queue ETA countdowns tick per-second; queue auto-reorders when a row reaches a stage opening.

## Verification gates run before publish

1. Sanitization sweep — zero references to internal infrastructure, runtime names, real wallet addresses, real authentication tokens, real personal emails or paths.
2. Regex audit for cross-project leaks — any reference to unrelated codebases, internal tooling, or sibling artifacts is removed from the public artifact.
3. Headless browser flow check — every interactive control (lang switch, chain rail toggles, risk profile tabs, wallet eligibility input, alert previews) opened, exercised, and closed without console errors.
4. HTTP smoke test on the deployed URL — 200 status on root, og-image, every script, and every asset.
5. Accessibility primitives — semantic ARIA labels on every region, keyboard-navigable controls, skip-to-dashboard link, prefers-reduced-motion respected for ticker and gauge animations.

## Honest scope statement

The current artifact is a **concept-stage** trilingual dashboard documenting the eight-surface coverage map, eight-factor risk engine, wallet eligibility flow, alert routing previews for Telegram / Discord / browser push, and a four-quarter roadmap. The MVP runtime — live mempool watch, on-chain risk scoring, real-time alert dispatch — is targeted Q3 2026 alongside the first alpha hunter cohort. Everything in this repository can be inspected by reviewers: the static HTML, CSS, JavaScript, inline SVG marks, and trilingual i18n bundle are the entire surface area. No remote APIs are called from the artifact. The drop queue and risk profiles are scripted demonstrations.
