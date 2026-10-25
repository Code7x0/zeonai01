# ZeonAI Premium Upgrade — Final Report

**Date:** 2026-10-25

## 1. Overall assessment

ZeonAI already has a distinctive brand system (Barlow + `#0009dc`), strong product UI demos, and ambitious scroll storytelling. Relative to Manifest AI it is denser and longer before proof/CTA; relative to AI Digital it carries more product depth and less pure creative whitespace. The main gaps were scroll fatigue, CTA consistency, accessibility holes in motion, and Architecture/Engineering narrative overlap — not a missing identity.

## 2. Highest-impact issues found

1. Multi-pin scroll budget (Industries ~6.6k px, Architecture ~3.4k px, Who stack)  
2. CTA inconsistency (Elevate blue vs black primary) + mid-page CTA desert  
3. Reduced-motion holes (Lottie, text stagger, video scrub)  
4. WhoStack bury focusability / missing skip link  
5. Engineering mislabeled as “Architecture overview”  
6. Dead motion deps (Three.js unused) — deferred cleanup  

## 3. Intentionally preserved

Brand tokens and logo; content.ts ownership; Lenis↔ScrollTrigger sync; Architecture explode model; Capabilities keyboard UI; Industries sector content; Customers carousel; Talk form; Who interaction concept; Engineering chapter content (no card skins).

## 4. Improvements implemented

| ID | Change |
|---|---|
| P1.1 | Engineering overview aria-label fixed |
| P1.2 | Skip-to-content link in `SiteShell` |
| P1.3 | Hero Lottie respects reduced motion |
| P1.4 | `TextAnimation` static under reduced motion |
| P1.5 | WhoStack sets `aria-hidden` + `inert` when buried |
| P2.1 | Elevate dialog CTA → black primary (`aid-btn-lime`) |
| P2.2 | Industries pin multiplier 0.72 → 0.48 |
| P2.3 | Architecture pin track 275vh → 210vh |
| P2.4 | Customers section “Book a demo” CTA |
| P2.5 | Navbar reveals on keyboard focus |
| P3.1 | Engineering entrances use `motion` tokens |
| P3.2 | CastRenderCenter skips scrub when reduced |

## 5. Animation system

No new libraries. Refined existing GSAP + Lenis; adopted `lib/motion/tokens.ts` in Engineering; shortened pins; closed reduced-motion gaps. Explicitly **avoided** Three.js / Anime.js / extra Lottie.

## 6. Skills actually used

- browser-mcp (live ZeonAI, Manifest, AI Digital)  
- GSAP ScrollTrigger + GSAP React skills (guidance)  
- Project AGENTS.md / clone-website context  
- Explore subagent (codebase IA/motion audit)  

## 7. Open-source components

Evaluated Skipper UI / new component kits: **not adopted** this pass — existing stack sufficient.

## 8. Dependencies

- **Added:** none  
- **Avoided:** Three.js usage, Anime.js, more Lottie  
- **Still unused in tree:** `three`, `@react-three/fiber`, `motion` package — recommend future removal  

## 9. Files modified

- `docs/website-audit.md` (new)  
- `docs/website-upgrade-plan.md` (new)  
- `docs/website-upgrade-report.md` (this file)  
- `SiteShell.tsx`, `ZeonNavbar.tsx`, `Elevate.tsx`, `HeroLottie.tsx`  
- `Engineering.tsx`, `Industries.tsx`, `WhoStack.tsx`, `Customers.tsx`  
- `CastRenderCenter.tsx`, `staggerText.tsx`, `aidigital.css`  

## 10. Tests performed

- `npm run typecheck` — pass  
- `npm run lint` — pre-existing errors in `docs/research/*` only; no new src errors identified  
- Live browser inspection of ZeonAI / Manifest / AI Digital (screenshots intermittently timed out)  
- Production build not re-run in this pass (typecheck green)  

## 11. Performance

No Lighthouse score claimed. Expected improvement from shorter Industries/Architecture scroll runways; no new heavy assets.

## 12. Remaining recommendations

1. Product/editorial decision: keep Elevate + Capabilities distinct or consolidate  
2. Soften Architecture ↔ Engineering duplication in copy (not delete)  
3. Remove unused Three/`motion` packages after confirming no future WebGL plan  
4. Mobile pin QA at 390 / 768 with Lenis  
5. Optional: port `TextAnimation` to GSAP and drop framer-motion  
6. Merge this branch to `main` when ready for Vercel production  

## Verified vs subjective

- **Verified:** pin lengths (CDP), CTA class split, aria mislabel, missing skip link, unused Three imports, RM holes  
- **Subjective / deferred:** full IA merge of product sections, visual “premium polish” beyond hierarchy/consistency
