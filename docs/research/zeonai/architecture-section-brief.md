# Architecture section — inspection brief

## Sources

| Source | Finding |
|---|---|
| https://www.lyzr.ai/ (2026-10-24) | Homepage **no longer** contains “01 · Architecture / The platform in one picture”. Redesigned; no six-layer isometric stack. |
| https://zeonai-website-preview.vercel.app/#architecture | **Living reference** — Astro `data-platform` section that already ports the Lyzr interaction pattern with ZeonAI copy. |

## Observed interaction (preview)

- **Layout:** 12-col grid; copy + accordion left (`lg:col-span-5`), SVG stack right (`lg:col-span-7`).
- **Pin:** Desktop ≥64rem + `prefers-reduced-motion: no-preference` → `.pin-track { min-height: 275vh }`, `.pin-stage { position: sticky; top: header + 0.25rem }`.
- **Scroll progression (not a timer):** progress = `clamp(-track.top / (track.height - vh))`; explode factor uses first 85% of progress × 6 layers. Each layer `--o = clamp(progress*6/0.85 - iso)`. Active index = `ceil(p) - 1`.
- **Manual override:** click layer or accordion sets `manualLock`, forces `--o: 1` on all layers; scroll sync resumes only after the section leaves the viewport.
- **Diagram:** shared isometric diamond polygons; Y via `--yf` (exploded) / `--yc` (collapsed) / `--o`. Active/hover fills blue; callout opacity 1 when active.
- **A11y:** layers are `role="button"` + keyboard; accordion `aria-expanded` / `aria-controls`; reduced-motion disables pin and `--o` scrub.
- **No GSAP/Framer** on preview — vanilla scroll + rAF.

## Local mapping

| Concern | Decision |
|---|---|
| Replace | OpenGarden architecture list (static cards) |
| Placement | Immediately after Elevate (donut); before Services |
| Content | Extend `zeonArchitecture` with instruction, callouts, detail points from preview (verified ZeonAI copy) |
| Motion | Port preview scroll/manual logic in React; CSS/SVG only (no Three.js) |
| Brand | `--aid-blue`, Inter/Barlow, cream→blue-100 blend from `.aid-ws` |
| Keep | OpenGarden engineering + trust blocks unchanged |

## Blend

Elevate (`.aid-ws`) already fades into `--aid-blue-100`. Architecture section starts on that same stop and softens into paper/`--aid-bg` so Services can keep its existing blue-100 join.
