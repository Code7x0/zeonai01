# Section 04 — Industries redesign plan

## Three directions (compared)

1. **Editorial interactive bento (selected)** — Scale-quality horizontal tabs + preview’s proven 4+8 grid (featured lead + 2×2 agents). Clear hierarchy, stable layout, purposeful mini-diagrams.
2. **Pure equal card grid** — Six sector pages of four identical cards. Rejected: repetitive, weak identity, fails “not six grids” brief.
3. **Scroll-pinned sector chapters** — Full-height storytelling per sector. Rejected: competes with Engineering §03 motion budget; harder a11y/tab semantics.

## Asset inventory

| Source | Type | Reuse |
|--------|------|-------|
| Preview `#industries` tab panels | Structure + all copy | `zeonIndustries` in content.ts |
| Workflow steps per sector | Diagram labels | Featured panel step rail |
| Four agents per sector | Application cards | Agent tiles + mini visual by `visual` kind |
| Preview rasters / SVGs in industries | None found | CSS miniatures only (no invented product UI) |

## Layout

1. Eyebrow `04 · Industries` · H2 · lead  
2. Horizontal tablist + sliding underline  
3. Bento: lead ~4 cols + tiles ~8 cols  
4. Roles remain in `Team` below

## Motion

Tab underline morph; panel crossfade (opacity/y); reduced-motion = instant swap.

## QA (2026-10-25)

- All 6 sectors: content + steps + runsOn verified against preview
- Viewports: 1440 (4+8 bento), 1024 (4+8), 768 (stack + 2-col tiles), 390 (stack + scroll tabs)
- Typecheck + production build clean; industries ESLint clean
- Screenshots: `docs/design-references/engineering-qa/industries-1440.png`, `industries-390.png`
