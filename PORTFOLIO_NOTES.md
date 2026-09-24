# Portfolio transformation audit

## Final packaging

**Before:** StyleList, an AI fashion stylist centered on styling chat, Amazon search, moodboards and virtual try-on.

**After:** Vela, an AI personal shopping agent centered on multimodal preference understanding, explicit constraints, explainable recommendations and conversational refinement.

Portfolio one-liner:

> I designed a multimodal shopping agent that turns visual style signals and explicit constraints into a small, explainable product edit, then lets users refine it conversationally.

## Keep

| Original capability | How Vela uses it |
| --- | --- |
| Next.js + TypeScript foundation | Retained as the web application stack |
| Image input | Reframed as optional fashion-signal context |
| Multimodal AI concept | Retained behind one provider adapter |
| Conversational refinement | Simplified to one clear follow-up loop |
| Product cards | Rebuilt around explanation and budget |
| Responsive web delivery | Retained and redesigned mobile-first |

## Remove

| Removed | Why |
| --- | --- |
| Amazon / RapidAPI integration | Avoids a second paid dependency and unstable retailer coupling |
| FASHN virtual try-on | Not required to prove the recommendation hypothesis |
| Moodboard generator | Duplicated the role of a concise recommendation edit |
| Proactive background styling | Added polling and failure states without improving the core demo |
| Uploaded-image filesystem storage | Created privacy and deployment complexity |
| Chat history, gallery and Zustand store | Too much navigation and state for a single portfolio story |
| Aceternity effect components | Replaced by one coherent product-specific visual system |

## Rename

| StyleList name | Vela name |
| --- | --- |
| AI Fashion Stylist | AI Personal Shopping Agent |
| Onboarding | Style Signal |
| Chat | Edit Studio |
| Moodboard / Gallery | Your Edit |
| Model Images | Outfit Reference |
| Auto-Style | Build My Edit |
| Product Search | Curated Picks |

## Rewrite

- Replaced gender/body-shape inference with visible, non-sensitive fashion signals.
- Replaced open-ended stylist chat with a guided three-step decision flow.
- Replaced generic product search with a budget-aware mock catalog.
- Added a rationale to every recommendation.
- Added demo/live/fallback states so reviewers can always complete the experience.
- Rewrote the landing page around the product thesis, not a feature checklist.
- Rebuilt the visual identity with editorial typography, high-contrast color, restrained motion and an intentional “small edit” feel.
- Rewrote the README as an AI PM case-study artifact: hypothesis, scope, tradeoffs, metrics, safety and architecture.

## Suggested portfolio walkthrough

1. Frame the problem: product abundance increases decision fatigue.
2. State the hypothesis: constraint-aware explanations build confidence.
3. Demo the photo → context → edit → follow-up loop.
4. Point out the privacy and sensitive-inference guardrails.
5. Explain why retailer APIs and virtual try-on were cut from v1.
6. Close with the measurement plan and v2 experiments.

## Logical v2 experiments

- Test 4 picks versus 12 picks on save rate and decision time.
- Add real catalog retrieval behind the same product interface.
- Let users edit detected style signals before recommendation.
- Save edits only after explicit opt-in.
- Evaluate rationale quality separately from product relevance.
