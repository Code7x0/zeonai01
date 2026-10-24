# Design System Audit — Local AI Digital-Inspired Implementation

**Primary reference:** Local homepage (`src/components/sites/aidigital/*`)  
**Secondary reference:** https://www.aidigital.com/ (patterns only)  
**Content brand:** ZeonAI  

## Tokens (from `aidigital.css`)

| Token | Value | Usage |
|---|---|---|
| `--aid-blue` | `#0009dc` | Headings, links, brand |
| `--aid-blue-100` / `--aid-blue-pill` | light blue fills | Pills, banners |
| `--aid-lime` | `#aef33e` | CTA buttons, accents |
| `--aid-ink` | `#26263a` | Body text |
| `--aid-grey` | `#80808e` | Muted |
| `--aid-bg` | `#f9f9f9` | Page background |
| `--aid-font-heading` | Barlow Semi Condensed | Display |
| `--aid-font-body` | Inter Variable | Body |
| `--aid-container` / `--aid-home` | 80rem / 90rem | Widths |

## Shared components to reuse

| Component | Path | Reuse for ZeonAI |
|---|---|---|
| SiteShell | `SiteShell.tsx` | All pages |
| Navbar | `Navbar.tsx` | Retarget labels/hrefs; keep mega-menu chrome |
| Footer | `Footer.tsx` | ZeonAI offices + links |
| Logo | `Logo.tsx` | Prefer text/SVG ZeonAI mark variant (new file) |
| Hero | `Hero.tsx` + `HeroLottie.tsx` | **LOCKED — no edits** |
| Elevate | `Elevate.tsx` | Platform overview / product intro |
| Services | `Services.tsx` | Capabilities / module trio |
| OpenGarden | `OpenGarden.tsx` | Architecture / governance philosophy |
| Team | `Team.tsx` | Stats + industries strip |
| Articles | `Articles.tsx` | Case studies cards |
| Talk | `Talk.tsx` | Book-a-demo CTA block |
| VideoModal | `VideoModal.tsx` | Optional; keep if media exists |
| logo-slider | `ui/logo-slider.tsx` | Hero only (locked consumer) |
| staggerText | `ui/staggerText.tsx` | Section titles |
| stats-counter | `ui/stats-counter.tsx` | Customer metrics |
| SmoothScroll | `motion/SmoothScroll.tsx` | Global |

## Variants needed (additive)

| Need | Approach |
|---|---|
| ZeonAI wordmark | New `ZeonLogo.tsx` — do not alter `Logo.tsx` geometry used in nav until verified |
| Case study cards | Extend Articles data shape |
| Demo form | Extend Talk or new `DemoForm.tsx` matching Talk visual language |
| Legal page shell | Thin page using SiteShell + typography classes |
| Industry tabs | New section component styled like Services cards |

## Page archetypes

| Archetype | Source need | Local pattern |
|---|---|---|
| Marketing homepage | ZeonAI SPA | Existing HomePage section stack |
| Legal | `/terms` | Simple content page |
| Product detail | Not in source as separate routes | Exclude until content exists |
| Blog/resource | Not discovered | Exclude |

## Animation conventions

- GSAP + ScrollTrigger for section reveals  
- Lenis smooth scroll  
- Lottie **only** in locked hero  
- Prefer CSS / existing GSAP tokens for new sections  
- Respect `prefers-reduced-motion` via `reduced-motion.ts`  

## Do not

- Introduce a second color system  
- Replace Barlow/Inter  
- Globally restyle `.home-hero` / `.hero-lottie-*`  
- Install Three.js / R3F unless a future page clearly needs 3D (none in ZeonAI source)  
