# Section 03 — Engineering redesign plan

## Selected direction

**Product-led editorial (A + B)** — Scale-like hierarchy and whitespace; each chapter centres a verified product/config visual from the ZeonAI preview. Light scroll reveals only; no long pin, no WebGL.

Rejected C as primary: interactive narrative risks over-animation and would fight Architecture’s already-heavy scroll pin above.

## Asset inventory (from preview + content)

| Chapter | Visual source | Type | Reuse |
|--------|---------------|------|-------|
| Overview | Six `zeonEngineering.pieces` labels | Editorial flow diagram (new SVG, labels from content) | New composition |
| 01 Pipeline | Preview SVG: hub → agent → 4 sub-agents → outputs | Diagram | Rebuild as ZeonAI-token SVG |
| 02 Document | Preview panels: spreadsheet + PDF config | Product UI | Rebuild with verified labels |
| 03 Rules | Preview: prompt → draft rule (`gst_amount`) | Product UI | Rebuild verbatim |
| 04 Access | Preview: tier table + override note | Diagram/table | Rebuild |
| 05 Delegation | Preview SVG + status flow + close-block note | Timeline | Rebuild |
| 06 Audit | Preview activity log lines | Product UI | Rebuild |

No raster assets in repo for these; preview embeds SVG/HTML panels. Labels taken from live preview extract (`engineering-preview-extract.json`).

## Storyboard

1. **Opening** — eyebrow, H2, lead; horizontal 01–06 overview with hairline connectors; subtle draw-on.
2. **Chapters** — alternating 5/7 split; hairline top rule; mono `01 / 06`; Barlow title; body; visual panel.
3. **Progress** — sticky mini `n / 06` on desktop only (thin), not a full-section pin.

## Motion

- GSAP + ScrollTrigger already in project.
- Overview: stagger fade + connector dashoffset.
- Chapters: `from` opacity/y on text + visual when ~75% in view; once.
- Pipeline: staged highlight of sub-agent row.
- `prefers-reduced-motion`: instant opacity, no dashoffset.

## Responsive

- ≥1024: split; odd chapters text-left, even text-right.
- &lt;1024: stack text then visual.
- Mobile: overview becomes 2×3 grid of numbered steps.

## A11y / perf

- Semantic `section` / `h2` / `h3` / `ol`.
- Visuals `aria-hidden` when decorative duplicate of text; tables labelled.
- No new deps. SVG only.
