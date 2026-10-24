# Implementation Plan — Complete ZeonAI Site

**Prerequisites complete:** Phase 0 baseline, Phase 1 inventory, Phase 2 design audit, PAGE_MAPPING.  
**Hero-lock impact must be NONE on every task unless explicitly waived (none are).**

---

## Milestone M0 — Project safety ✅

| ID | Target | Acceptance | Hero impact | Status |
|---|---|---|---|---|
| M0-1 | Checkpoint branch | `checkpoint/pre-zeonai-migration` exists | NONE | Done |
| M0-2 | Hero protection list | Documented in PHASE0 | NONE | Done |
| M0-3 | Baseline screenshots | Desktop + mobile saved | NONE | Done |

## Milestone M1 — Content inventory ✅

| ID | Target | Acceptance | Hero impact | Status |
|---|---|---|---|---|
| M1-1 | Route discovery | Inventory lists all live routes | NONE | Done |
| M1-2 | Section extract | Homepage + terms + privacy copy extracted | NONE | Done |
| M1-3 | Privacy route | `/privacy-policy` live (not `/privacy`) | NONE | Done |

## Milestone M2 — Design audit ✅

| ID | Target | Acceptance | Hero impact | Status |
|---|---|---|---|---|
| M2-1 | DESIGN_SYSTEM_AUDIT.md | Components + tokens mapped | NONE | Done |
| M2-2 | PAGE_MAPPING.md | Build/Combine/Exclude decided | NONE | Done |

## Milestone M3 — Shared navigation and global components ✅

| ID | Target | Source | Reuse | New | Files | Acceptance | Hero impact | Status |
|---|---|---|---|---|---|---|---|---|
| M3-1 | ZeonAI content module | Inventory | — | `content.ts` | `src/lib/zeonai/content.ts` | Typed copy for all sections | NONE | Done |
| M3-2 | Nav retarget | ZeonAI nav | Navbar chrome | `ZeonNavbar.tsx` | new + SiteShell | Nav matches ZeonAI IA | NONE | Done |
| M3-3 | Footer retarget | Offices + links + social | Footer layout | ZeonAI offices/social | `Footer.tsx`, `constants.ts` | Offices + legal + social work | NONE | Done |
| M3-4 | Site metadata | ZeonAI title | Root layout | Metadata | `src/app/layout.tsx` | Title/description ZeonAI | NONE | Done |
| M3-5 | ZeonLogo | Brand | — | `ZeonLogo.tsx` | new + ZeonNavbar | Nav shows ZeonAI mark | NONE | Done |

## Milestone M4 — Homepage content migration (below hero) ✅

| ID | Target | Source section | Reuse | Acceptance | Hero impact | Status |
|---|---|---|---|---|---|---|
| M4-1 | Elevate → Platform | H1-adjacent | Elevate | ZeonAI platform copy + CTA | NONE | Done |
| M4-2 | Services → Capabilities | All 9 modules | Services | Featured 3 + 6 compact cards | NONE | Done |
| M4-3 | OpenGarden → Architecture/Engineering/Trust | Architecture + Engineering + Governance | OpenGarden | Layers + engineering + security | NONE | Done |
| M4-4 | Team → Industries/Roles | Industries + Who are you | Team | Sectors with agents + role sample | NONE | Done |
| M4-5 | Articles → Case studies | Customers | Articles | Four cases with challenge/deployed/outcome | NONE | Done |
| M4-6 | Talk → Book a demo | Demo form | Talk | Full form + `/api/demo` | NONE | Done |
| M4-7 | Hero regression | Baseline | — | H1 locked; files untouched | NONE | Done |

## Milestone M5 — Additional pages ✅

| ID | Target | Source | Reuse | Files | Acceptance | Hero impact | Status |
|---|---|---|---|---|---|---|---|
| M5-1 | `/terms` | `/terms` | SiteShell + prose | `src/app/(site)/terms/page.tsx` | Renders source terms | NONE | Done |
| M5-2 | `/privacy-policy` | `/privacy-policy` | SiteShell + prose | `src/app/(site)/privacy-policy/page.tsx` | Source draft privacy | NONE | Done |

## Milestone M6 — Remaining section polish ✅

| ID | Target | Acceptance | Hero impact | Status |
|---|---|---|---|---|
| M6-1 | Anchor IDs | `#overview` `#platform` `#architecture` `#engineering` `#industries` `#roles` `#customers` `#trust` `#book-a-demo` | NONE | Done |
| M6-2 | Internal CTA wiring | Local anchors/routes + socials | NONE | Done |

## Milestone M7 — Responsive ✅

| ID | Target | Viewports | Acceptance | Hero impact | Status |
|---|---|---|---|---|---|
| M7-1 | Homepage RWD | 1440 / 1024 / 768 / 390 / 320 | No horizontal overflow | NONE | Done |
| M7-2 | Terms + Privacy RWD | Same shell | Readable prose | NONE | Done |

## Milestone M8 — SEO / a11y / perf ✅

| ID | Target | Acceptance | Hero impact | Status |
|---|---|---|---|---|
| M8-1 | Metadata | Unique titles for `/`, `/terms`, `/privacy-policy` | NONE | Done |
| M8-2 | Reduced motion | Existing GSAP respects RM; no new libraries | NONE | Done |
| M8-3 | `npm run check` | Lint + typecheck + build pass | NONE | Done |

## Milestone M9 — Final QA ✅

| ID | Target | Acceptance | Hero impact | Status |
|---|---|---|---|---|
| M9-1 | FINAL_QA_REPORT.md | Per-route status | NONE | Done |
| M9-2 | Hero baseline compare | Locked files clean; live H1 unchanged | Must pass | Done |

---

## Explicitly out of scope (this plan)

- Cloning every AI Digital microsite  
- Replacing locked Lottie / Hero.tsx  
- Installing Three.js / Anime.js by default  
- Pixel-perfect recreation of ZeonAI interactive capability tour / sample UIs (content mapped into design-system cards instead)  
