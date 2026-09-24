# Vela — AI Personal Shopping Agent

[中文说明](./README.zh-CN.md) · English

Vela is a portfolio-ready concept for an explainable multimodal shopping agent. A user shares an outfit photo (optional), adds an occasion, budget and style direction, then receives a compact product edit with a clear reason behind every recommendation. The conversation stays open so the user can refine the result in natural language.

> This is a product concept, not a live retailer. The included catalog and prices are mock data.

## Why this project exists

Shopping recommendations usually optimize for more inventory and more clicks. Vela explores a different product thesis: **a smaller, explainable edit can reduce decision fatigue and build trust**. It demonstrates an AI PM workflow across multimodal input, preference collection, constraint-aware ranking, explainability and conversational refinement.

## Core journey

1. Upload an outfit or inspiration photo (optional).
2. VLM reads only visible fashion signals: palette, silhouette, texture and styling choices.
3. Add the occasion, total budget and desired style direction.
4. The agent creates a constrained recommendation and explains its strategy.
5. Product cards show mock catalog items and a specific “why it works” rationale.
6. Ask a follow-up to refine the edit without restarting.

The UI explicitly tells the model not to infer sensitive traits such as gender, ethnicity, health, body type or attractiveness from an image.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No API key is required: Vela starts in **Demo mode** and the full journey remains usable.

## Connect your own AI API

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then fill in:

```env
AI_API_KEY=your_key_here
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4.1-mini
```

Vela calls the standard `POST /chat/completions` shape, so any provider with an OpenAI-compatible endpoint and a multimodal model can work. Change all three values to match your provider. Restart the dev server after editing `.env.local`.

- `AI_API_KEY`: your private provider key. `.env.local` is ignored by Git.
- `AI_BASE_URL`: API root ending in `/v1`, without `/chat/completions`.
- `AI_MODEL`: an exact model ID that accepts image input and JSON output.

The result panel shows **Live AI** when the call succeeds. If the provider is unavailable or configured incorrectly, Vela safely returns to **Demo fallback** so the portfolio experience never dead-ends.

## Architecture

- Next.js 15 + React 19 + TypeScript
- Single-session image handling; no application file storage or database. In Live AI mode, the image is sent to the API provider you configure and is subject to that provider's data policy.
- One server route as the provider adapter: `src/app/api/agent/route.ts`
- Local mock product catalog: `src/lib/catalog.ts`
- Responsive editorial interface with keyboard focus, visible labels and reduced-motion support

### Intentionally removed from v1

- Amazon / RapidAPI product search
- FASHN virtual try-on
- Server-side photo storage and image deletion endpoints
- Auto-generated moodboards, polling and background jobs
- Multi-chat history and persistent user profiles

These dependencies made the original demo expensive to run and obscured the core product hypothesis. They are logical v2 experiments after the recommendation loop is validated.

## Product decisions and success metrics

Primary hypothesis: users are more likely to act on a small recommendation set when each item is tied to their context and constraints.

- North-star signal: recommendation-to-save rate
- Trust: “reason was useful” rating
- Efficiency: time from upload to first viable edit
- Quality guardrail: edits that exceed the stated budget
- Safety guardrail: unsupported sensitive-trait inference reports

See [PORTFOLIO_NOTES.md](./PORTFOLIO_NOTES.md) for the full keep / remove / rename / rewrite audit.

## Open-source attribution

This project began from ideas and selected product image assets in [parsakhaz/open-ai-stylist](https://github.com/parsakhaz/open-ai-stylist), inspected at commit `198fedb7d859bead825a004566f417b07c63cc6a` (July 1, 2025). The upstream README identifies that project as MIT-licensed; however, the inspected default branch did not contain the referenced `LICENSE` file. This repository preserves the source link and documents the discrepancy rather than implying that a missing upstream license file was present.

Vela’s new code is released under the MIT License in this repository. See [NOTICE](./NOTICE) and [LICENSE](./LICENSE).
