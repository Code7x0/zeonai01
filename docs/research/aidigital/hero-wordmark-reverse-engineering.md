# Hero wordmark reverse-engineering

## What aidigital.com actually does

Live hero uses **Webflow native Lottie** (SVG renderer), not editable HTML text:

- Desktop: `AIDigital_Desktop.json` (2223×798, 30fps, 256 frames ≈ 8.533s)
- Mobile: `AIDigital_Mobile.json`
- DOM: `.lottie-desktop[data-animation-type="lottie"][data-renderer="svg"]`

### Architecture (critical)

1. **Baked letter shapes** — each glyph is a vector shape layer (`W`, `E`, `A`…), not a text layer. You cannot change the phrase inside the JSON without replacing paths.
2. **Ribbon sandwich / weave** — the lime `Line` layer sits **in the middle of the letter z-stack**:
   - Layers above Line paint **in front of** the ribbon
   - Layers below Line paint **behind** the ribbon
   - Some letters are duplicated (`E`/`E 2`/`E 3`, `T`/`T 2`, `G`/`G 2`) so the same glyph can sit on both sides of the ribbon while bars open.
3. **Path morph stretch** — stretchable letters animate **shape path vertices** (not CSS `scaleX`). Source `E 2` grows from ~62 → ~171 units wide; `T` from ~70 → ~213.
4. **Trim Paths on Line** — stroke draws via trim end 0→100, then erase via trim start 0→100. Stroke width also keyframes.
5. **Letter spacing** — each letter’s X position keyframes outward mid-cycle, then returns, so opened bars have room.

## Local recreation (no quality compromise)

Because the phrase must become **HARNESSING THE POWER OF AI**, we rebuild the **same technique** rather than editing the baked “WE ARE AI DIGITAL” Lottie:

| Source technique | Local implementation |
| --- | --- |
| Barlow-like black condensed glyphs | Paths extracted from `BarlowSemiCondensed-Black.ttf` via opentype.js |
| Front / Line / back stack | SVG groups `.hero-letters-back` → ribbon `<path>` → `.hero-letters-front` |
| Shape morph on E/T bars | Precomputed `normal` + `stretched` path `d` for H/A/E/F/T; GSAP lerps coordinates |
| Trim Paths | `stroke-dashoffset` draw + erase timed to source frame ratios |
| Position spread | GSAP `x` on each letter `<g>` |
| Timing | 8.533s loop matching source duration |

### Regenerating glyph data

```bash
npm i -D opentype.js
node scripts/generate-hero-wordmark.mjs
```

Writes `src/components/sites/aidigital/data/hero-wordmark.json`.

### Why not “just edit the Lottie text”

Lottie letter layers are outlines. Changing copy requires new outlines + remade morph keys + re-authored weave duplicates — which is exactly what the generator + `HeroWordmark` do, in maintainable SVG/GSAP form.
