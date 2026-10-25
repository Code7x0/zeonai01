# ZeonAI Website Upgrade Plan

Companion to `docs/website-audit.md`.  
Direction: **Enterprise AI × Creative Technology Lab × Governed Product Platform**.

Guiding rule: Keep what is excellent. Correct what is broken. Improve what is unclear. Animate what benefits from motion. Leave everything else alone.

---

## Motion system (before more effects)

| Category | Rule |
|---|---|
| Entrance | Opacity + short Y (≤16–22px); stagger ≤0.06–0.08; ease `power2.out` / tokens |
| Section transitions | Shared wash gradients only; no unique gimmick per section |
| Product demos | Animate product-true states (tabs, layers, sector swap) — not decoration |
| Pins | Only where comprehension gains; target ≤ ~0.45–0.55 vh per scrub step |
| Hover / buttons | Instant feedback; 0.2–0.3s color/opacity |
| Reduced motion | Skip Lenis, pins, Lottie loops, word staggers; show static end state |
| Tooling | Prefer existing GSAP + Lenis. Do **not** add Three.js, Anime.js, or more Lottie unless a specific story needs it |

Adopt `src/lib/motion/tokens.ts` for new/edited tweens.

---

## Priority 1 — Critical corrections

| ID | Current | Issue | Evidence | Solution | Benefit | Files | Complexity | Perf risk | Regression | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| P1.1 | Engineering overview `aria-label="Architecture overview"` | Wrong SR label | `Engineering.tsx` | Rename to “Engineering overview” | A11y clarity | `Engineering.tsx` | Low | None | Low | P1 |
| P1.2 | No skip link | Keyboard users cannot skip nav | `layout.tsx` / shell | Add “Skip to content” → `#main` / main landmark | A11y | `SiteShell` / layout / HomePage | Low | None | Low | P1 |
| P1.3 | Hero Lottie always loops | Ignores `prefers-reduced-motion` | `HeroLottie.tsx` | Pause / static first frame when reduced | A11y | `HeroLottie.tsx` | Low | Low | Low | P1 |
| P1.4 | `TextAnimation` always staggers | Ignores reduced motion | `staggerText.tsx` | Render plain text when reduced | A11y | `staggerText.tsx` | Low | Low | Low | P1 |
| P1.5 | WhoStack buried layers still focusable until opacity gate | Keyboard trap risk | `WhoStack.tsx` | Set `aria-hidden` / `inert` when buried | A11y | `WhoStack.tsx` | Med | None | Med | P1 |

---

## Priority 2 — High-impact visual / UX

| ID | Current | Issue | Evidence | Solution | Benefit | Files | Complexity | Perf risk | Regression | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| P2.1 | Elevate dialog CTA `aid-btn-blue` | Inconsistent primary CTA | `Elevate.tsx` | Use `aid-btn-lime` (black primary) | Conversion consistency | `Elevate.tsx` | Low | None | Low | P2 |
| P2.2 | Industries pin `vh * 6 * 0.72` | Scroll fatigue (~5–6k px) | CDP + `Industries.tsx` | Reduce multiplier to ~0.48 | Faster path to customers/CTA | `Industries.tsx` | Low | Improves | Med (scrub feel) | P2 |
| P2.3 | Architecture ~275vh sticky track | Long before Capabilities | CSS + CDP height | Modestly reduce track min-height | Shorter journey | `aidigital.css` Architecture | Low | Improves | Med | P2 |
| P2.4 | Mid-page CTA desert | No demo CTA until Who/Talk | Homepage scan | Add one quiet text-link or button after Customers | Conversion | `Customers.tsx` or thin band | Low | None | Low | P2 |
| P2.5 | Nav hotzone mouse-only | Hard to reveal nav on some inputs | `ZeonNavbar.tsx` | Also show nav on `focusin` within header | UX | `ZeonNavbar.tsx` | Low | None | Low | P2 |
| P2.6 | Engineering vs Architecture overlap | Duplicate narrative | Content audit | Keep both; clarify Engineering intro copy only if needed; **do not delete** in this pass | Clarity | `content.ts` optional | Low | None | Low | P2 later |

---

## Priority 3 — Motion / interaction

| ID | Action | UX benefit |
|---|---|---|
| P3.1 | Wire `motion` tokens into edited GSAP calls | Consistency |
| P3.2 | CastRenderCenter: disable scrub animation when reduced | A11y |
| P3.3 | Do not introduce WebGL / new Lottie / Anime.js | Performance + focus |
| P3.4 | Optional later: port `TextAnimation` to GSAP and drop framer-motion | Bundle simplicity |

---

## Priority 4 — Optional creative / cleanup

- Document or remove unused `three` / `@react-three/fiber` / `motion` packages  
- Remove or archive unused `HeroWordmark`, legacy `Navbar`, `stats-counter`  
- Compress oversized public assets (`close.png` 992K) if still referenced  
- Rename `aid-btn-lime` → `aid-btn-primary` (cosmetic, high churn — defer)  
- Editorial merge of Elevate vs Capabilities (large IA change — defer until product owners agree)

---

## Preserve list

See audit. Especially: brand tokens, content.ts ownership, Lenis sync, Architecture explode model, Capabilities keyboard UI, Industries content, Customers RM handling, Talk form, Who interaction concept, Engineering chapters.

---

## Implementation batch for this pass

Execute **P1.1–P1.5**, **P2.1–P2.5**, **P3.1–P3.2**.  
Defer package removals and IA merges pending confirmation.
