# ZeonAI Website Audit

**Date:** 2026-10-25  
**Live site inspected:** https://zeonai01.vercel.app/  
**Code source of truth:** `/home/kai/zeonai01` (`feat/zeonai-full-site` / merged `main`)  
**References:** Manifest AI (https://manifestai.com.au/), AI Digital (https://www.aidigital.com/)

## Method and limitations

| Source | Status |
|---|---|
| Repository (components, CSS, content, motion) | Fully inspected |
| Live ZeonAI (browser MCP + CDP) | Inspected at ~2227×1253; Lenis scroll measured; some screenshots timed out |
| Manifest AI (browser) | Accessible; structure/hierarchy captured via a11y snapshot |
| AI Digital (browser + WebFetch) | Confirmed correct URL; creative IA captured |
| Lighthouse / lab performance scores | **Not measured** — not claimed |
| Mobile device lab | Emulation deferred to implementation QA; code breakpoints reviewed |

**Skills used:** browser-mcp; GSAP ScrollTrigger; GSAP React; project `AGENTS.md` / clone-website context; Cursor explore subagent for codebase IA/motion pass.

---

## Stack snapshot

- **Framework:** Next.js 16.3.5, React 19, TypeScript strict, Tailwind v4  
- **Site surface:** `src/components/sites/aidigital/*` + `aidigital.css`  
- **Motion primary:** GSAP 3 + ScrollTrigger + `@gsap/react` `useGSAP`  
- **Scroll:** Lenis (`SmoothScroll.tsx`), synced to ScrollTrigger  
- **Also present:** Lottie (hero), framer-motion (title stagger only), unused `three` / `@react-three/fiber` / `motion` package  
- **Type:** Barlow Semi Condensed (display) + Inter Variable (body), local `@font-face`  
- **Brand tokens:** `--aid-blue` `#0009dc`, lime/black CTAs, cream washes

---

## Information architecture (verified)

Render order (`HomePage.tsx` → `OpenGarden` → `WhoStack`):

| # | Section | ID | Job |
|---|---|---|---|
| 1 | Hero | — | Brand + thesis + CTAs |
| 2 | Elevate / Workspace | `#overview` | Product orbit + preview dialog |
| 3 | Architecture | `#architecture` | Spatial “one picture” of 6 layers |
| 4 | Capabilities | `#platform` | Module catalogue (nav “Platform”) |
| 5 | Engineering | `#engineering` | Under-the-hood editorial chapters |
| 6 | Industries | `#industries` | Sector portfolio (pinned scrub) |
| 7 | Customers | `#customers` | Case studies |
| 8 | Trust / Governance | `#trust` | Governed-by-design (stacked) |
| 9 | Who are you? | `#who` | Role personalization |
| 10 | Book a demo | `#book-a-demo` | Conversion |
| 11 | Footer | — | Offices + links |

**Nav covers only:** Platform, Industries, Customers, Trust — not Architecture, Engineering, Who, or Elevate.

### Architecture vs Engineering

Both narrate the same six-layer pipeline (sources → processing → rules → workflows/access → audit/outputs).  
**Distinct jobs if kept:** Architecture = spatial overview; Engineering = implementation depth.  
**Risk:** Visitors hear the same story twice before industries/outcomes.  
**Verified bug:** Engineering overview uses `aria-label="Architecture overview"`.

### Elevate vs Capabilities

Shared products (Ask AI, Agent Hub, App Hub, Dashboards, Workflows, Contract Intelligence). Elevate is experiential; Capabilities is the catalogue. Overlap is intentional-but-dense.

---

## A. Visual design

### Already premium (preserve)

- Brand blue `#0009dc` + Barlow condensed display lockup  
- Hero Lottie “HARNESSING…” wordmark energy (AI Digital lineage, ZeonAI content)  
- Capabilities rail + product stage craft  
- Engineering editorial chapter rhythm  
- Industries sector storytelling concept  
- Trust blue full-bleed governance moment  
- Who → modules lighting interaction idea  
- Demo white page + blue shell cover pattern  

### Weaknesses (verified or strongly evidenced)

| Finding | Type | Evidence |
|---|---|---|
| Page length ~29k px at desktop | Verified | CDP: `scrollHeight` 29334; Industries alone ~6666 px; Architecture ~3446 px |
| CTA style split (black vs blue) | Verified | Nav/Hero/`Talk` use `aid-btn-lime` (black); Elevate dialog uses `aid-btn-blue` |
| `aid-btn-lime` name ≠ appearance | Verified | CSS maps lime class to `--aid-black` |
| Mid-funnel CTA desert | Verified | No primary demo CTA between Hero and Who/Talk |
| Token sprawl (`--ws-*`, `--obs-*`, `--roles-*`) | Opportunity | Coherent but undocumented |
| Large unused/legacy assets | Verified | e.g. `close.png` 992K in public tree; Three.js unused |

---

## B. Typography

**System:** Display = Barlow Semi Condensed 900 uppercase via `.aid-heading`; body = Inter Variable.  
**Working:** Distinctive, on-brand, better than generic Inter-only AI templates.  
**Issues:**

- Section title sizes vary by local clamp without a shared type scale document  
- Monospace meta labels used heavily in Engineering (acceptable for “lab” tone; watch density)  
- `TextAnimation` (framer) staggers words without reduced-motion respect  

---

## C. Visual hierarchy (by section)

| Section | First notice | Second | Action | Hierarchy clear? |
|---|---|---|---|---|
| Hero | Brand + Lottie headline | Subhead | Book / See platform | Yes |
| Elevate | Orbit cards | Dialog detail | Book (blue, inconsistent) | Mostly |
| Architecture | Exploded layers | Accordion copy | Implicit explore | Strong visually; long pin |
| Capabilities | Active module | Stage UI | Explore tabs | Strong |
| Engineering | Chapter index + title | Diagram | Continue scroll | Strong per chapter; long |
| Industries | Active sector | Visual | Scrub sectors | Strong; pin fatigue |
| Customers | Case card | Metrics | Browse | OK |
| Trust | Blue field + title | Security/governance | Continue | Strong |
| Who | Role question | Modules | Book with modules | Strong |
| Demo | Form | Steps | Submit | Clear |

**Competing attention:** Elevate + Capabilities + Architecture + Engineering all explain “what the platform is” before proof (customers) and conversion.

---

## D. UX and conversion

| Area | Finding | Type |
|---|---|---|
| Nav completeness | Missing deep links to Architecture / Engineering / Who | Opportunity |
| Nav auto-hide | Mouse hotzone only; touch relies on scroll-up | Verified |
| Skip link | None in layout | Verified a11y gap |
| WhoStack bury | Opacity/blur bury; keyboard can reach near-hidden layers until pointer-events cut | Verified risk |
| Demo cover | Negative margin stack is powerful but fragile | Verified risk |
| Form | Labels + consent present | Preserve |
| CTA path | Long scroll before second primary CTA | Verified |

---

## E. Motion and interaction

### Systems in use

1. **GSAP + ScrollTrigger** — Architecture, Engineering, Industries, WhoStack, Services (partial)  
2. **Lenis** — global smooth scroll; `__lenis` bridge in multiple components  
3. **framer-motion** — `staggerText` titles only  
4. **Lottie** — hero loop  
5. **CastRenderCenter** — video scrub (not WebGL)

### Per-area notes

| Animation | Improves understanding? | Issues |
|---|---|---|
| Architecture sticky explode | Yes | ~275vh track; long |
| Industries pin + snap | Yes for sector story | `end: vh * 6 * 0.72` ≈ multi-viewport tax |
| Who bury + demo rise | Theatrical | Fragile; a11y |
| Title word stagger | Mild polish | Ignores reduced motion; second runtime |
| Hero Lottie | Brand presence | No reduced-motion static fallback |
| Nav hide/show | Focus | Mouse-only reveal hotzone |

**Principle:** Do not add Three.js/Lottie/Anime “for AI.” Current stack is already rich; prefer refine + shorten pins over new libraries.

---

## F. Technical

| Topic | Finding |
|---|---|
| Dead dependencies | `three`, `@react-three/fiber`, `motion` unused in `src/` |
| Duplicate motion | framer + GSAP |
| Unused code | `HeroWordmark.tsx`, legacy `Navbar.tsx`, `stats-counter.tsx` unused |
| Motion tokens | `lib/motion/tokens.ts` exists, **zero imports** |
| Font loading | `font-display: swap` — OK; TTF Inter Variable ~856K |
| SEO metadata | Title + description set in `layout.tsx` |
| Reduced motion | Partial; holes listed above |
| Console | Minimal client logging |

Build/lint/typecheck: run during implementation QA (Phase 12).

---

## Comparison matrix

| Dimension | ZeonAI | Manifest AI | AI Digital |
|---|---|---|---|
| Brand identity | Strong blue + condensed type; still feels template-adjacent in places | Coherent enterprise product brand | Bold creative agency brand |
| Hero | Clear governed-AI thesis + Lottie | Immediate business outcome + PoV CTA | Creative media consultancy hero |
| Typography | Distinctive Barlow/Inter | Polished product hierarchy | Expressive marketing type |
| Layout | Dense multi-pin scroll | Tighter section budget | Editorial + media |
| Product storytelling | Strong UI demos; too many “what is it” chapters | Layered aOS + workspaces with outcomes | Product/platform narrative for media |
| Visual storytelling | Good diagrams; long | Outcome-led panels | Imagery/media led |
| Motion | Ambitious; some fatigue | Restrained enterprise | Creative, purposeful |
| Credibility | Cases + trust present | Metrics + Trust Centre + certifications | Awards, offices, thought leadership |
| Conversion | Demo form strong; path long | Repeated “proof of value” | Contact / explore |
| Mobile | Needs ongoing pin QA | Designed compact | Responsive marketing |
| Performance | Not scored; heavy pin + Lottie + Lenis | Not scored | Not scored |

**Takeaways for ZeonAI (not cloning):**

- From Manifest: shorter path from claim → product → proof → trust → CTA; outcome language; consistent primary CTA.  
- From AI Digital: confident brand-first hero; atmospheric sections without clutter.  
- Keep ZeonAI’s governed-AI, diagrams, and role personalization as differentiators.

---

## Design direction (locked)

**Enterprise AI × Creative Technology Lab × Governed Product Platform**

Feel: intelligent, precise, editorial, premium, trustworthy — not neon startup, not animation demo.

---

## Preserve list (do not casually change)

1. Brand color/type system and logo lockup  
2. Content ownership in `lib/zeonai/content.ts`  
3. Lenis ↔ ScrollTrigger sync  
4. Architecture explode interaction (refine length, keep model)  
5. Capabilities rail + keyboard model  
6. Industries sector content (trim pin, keep story)  
7. Customers carousel reduced-motion handling  
8. Talk/demo form + consent  
9. Who role → modules interaction (simplify bury, keep idea)  
10. Engineering chapter content and diagrams (no forced card skins)

---

## Highest-impact verified issues

1. Excessive pin/scroll budget (Industries + Architecture + Who)  
2. Architecture ↔ Engineering narrative duplication + wrong aria label  
3. CTA inconsistency + mid-page CTA desert  
4. Reduced-motion holes (Lottie, TextAnimation, scrub)  
5. WhoStack bury accessibility  
6. Missing skip link; mouse-only nav hotzone  
7. Dead motion dependencies / unused tokens  
8. Elevate ↔ Capabilities product repetition (editorial, not a crash bug)
