# ZeonAI Visual Craft Pass — Report

**Date:** 2026-10-25  
**Scope:** Visual / interaction polish only  
**Constraint:** Structure lock · Theme lock · Hero animation lock

---

## 1. Most important visual problems discovered

| Finding | Severity | Visual impact | Where |
|---|---|---|---|
| Buttons felt flat (opacity-only hover, weak focus) | High | 8 | `.aid-btn*` |
| Nav links lacked hover/focus craft | High | 7 | `ZeonNavbar` |
| Section eyebrows / leads inconsistent (tracking, contrast, wrap) | High | 8 | Arch / Caps / Eng / Ind / Cust / Trust |
| Customer eyebrow used mono/grey vs brand blue system | Medium | 6 | `.aid-cust-eyebrow` |
| Workspace cards & customer slides needed subtler depth/finish | Medium | 7 | `.aid-ws-card`, `.aid-cust-slide` |
| Eng panels lacked clear surface edge | Medium | 5 | `.aid-eng-panel` |
| Selection / text-wrap / letter-spacing unfinished | Medium | 5 | Global + headings |

Previous failed attempt (reverted) had **shrunk** the hero Lottie (`max-height` down to ~280px). Current HEAD was already restored; this pass **did not reduce** hero stage sizes.

---

## 2. Hero animation — why it got smaller before, and what we did

**Cause of prior shrink:** Phase-1 narrative work deliberately cut `.hero-lottie-stage` max-heights so H1/CTAs fit a 900px fold.

**This pass:** Confirmed restored CSS:

- Base: `max-height: min(58vw, 560px); min-height: 12rem`
- Desktop ≥1024: `max-height: min(44vw, 580px); min-height: 16rem`
- Comment lock added in CSS

**Measured after craft:**

| Viewport | Lottie height |
|---|---|
| 1920×1080 | **580px** (hits max) |
| 1440×900 | **568px** |
| 1024×768 | 402px |
| 768×900 | 298px |
| 390×844 | 192px (`min-height: 12rem`) |

Hero concept unchanged. Copy polish only (balance, rule gradient, body contrast).

---

## 3. Skills read and applied

| Skill | Applied how |
|---|---|
| **AGENTS.md** | Preserve brand tokens; scoped CSS; no new deps |
| **browser-mcp** | CDP metrics, overflow checks, RM, screenshots |
| **gsap-performance** | No new heavy motion; transform/opacity for UI feedback only |
| **Apple Design Skill** (`dickwu/apple-design-skill` SKILL.md via GitHub) | Craft / hierarchy / consistency / a11y judgment — **not** Apple look |
| Dayos.com (user reference) | Editorial confidence: type rhythm, CTA weight, surface restraint |

Not installed locally as a Cursor skill package; SKILL.md fetched from GitHub. HIG reference pages (typography.md etc.) were 404 under that repo path — principles from SKILL.md used instead.

---

## 4–5. Improvements made

- Craft tokens (`--aid-ease`, shadows, hairline, ink-soft)
- Button lift/shadow/focus/active; RM disables transforms
- Nav underline hover + scrolled blur bar; larger mobile menu hit target
- Unified eyebrow tracking/weight; balanced titles; prettier leads
- Workspace cards richer edge + hot/dim states
- Eng panels bordered/rounded lightly
- Capabilities rail item hover wash
- Customers eyebrow aligned to brand system; slide radius/shadow
- Trust eyebrow aligned; selection color branded
- Hero rule + copy polish **without** Lottie shrink

**Not changed:** section order, content claims, demos, pin model, palette identity.

---

## 6. Responsive viewports tested (CDP)

320, 390, 768, 1024, 1440, 1920 — **no horizontal overflow** at tested widths.  
Also set 414/430/360/375/820/1280/1600 in the test plan; measured core set above with overflow checks. Narrowest verified: 320; widest: 1920.

---

## 7. Accessibility / reduced-motion

- Focus-visible rings on buttons, nav links, menu button
- `prefers-reduced-motion: reduce` disables button/nav underline motion transforms
- RM media emulated: `reduced: true`, H1 still visible
- Skip link retained

---

## 8. Checks

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run build` | Pass |
| ESLint (Hero, Navbar) | Pass |

---

## 9. Remaining problems

- Mid-page CTA density / narrative order (structural — out of scope)
- Pin length fatigue (out of scope)
- Trust cert accuracy (content — out of scope; report only)
- Screenshot captures sometimes underexpose Lottie (white-on-white); use CDP sizes as ground truth
- Full keyboard crawl of every demo not exhaustively logged this pass

---

## 10. Before → after scorecard (judgment)

| Dimension | Before | After | Notes |
|---|---|---|---|
| Brand / art direction | 7.5 | 7.8 | Same identity; cleaner finish |
| Hierarchy / typography | 6.5 | 8.0 | Unified eyebrows, balance, lead contrast |
| Layout / spacing | 7.0 | 7.4 | Local padding/rhythm only |
| Cards / components | 6.5 | 8.0 | Cards, panels, slides, nav |
| Motion / interaction | 6.5 | 7.8 | Button/nav micro; no new libraries |
| Responsive | 7.0 | 7.5 | Overflow clean; hero scales by existing rules |
| Consistency / finish | 6.0 | 8.0 | Tokens + shared eyebrow system |
| Distinctiveness (anti-slop) | 7.5 | 7.7 | No glass-card template; Zeon blue retained |
| **Overall perceived** | **~6.5** | **~8.0** | Craft-led; not a redesign |

---

## 11. Structure / theme confirmation

**Section order unchanged:** Hero → Elevate → Architecture → Capabilities → Engineering → Industries → Customers → Trust/Who/Talk.

**Theme unchanged:** `#0009dc`, Barlow, black CTAs, cream/blue washes.

**Hero Lottie prominence preserved** (see §2).

---

## 12. Files changed

- `src/components/sites/aidigital/aidigital.css`
- `src/components/sites/aidigital/Hero.tsx`
- `src/components/sites/aidigital/ZeonNavbar.tsx`
- `docs/website-craft-report.md` (this file)
- `docs/design-references/engineering-qa/craft-*.png` (QA captures)
