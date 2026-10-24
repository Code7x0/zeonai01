# Phase 0 — Project Safety and Baseline

**Date:** 2026-10-24  
**Branch (work):** `feat/zeonai-full-site`  
**Recovery checkpoint:** `checkpoint/pre-zeonai-migration` @ `0a30a3f`

## 0.1 Project map

| Item | Value |
|---|---|
| Framework | Next.js 16.3.5 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 + scoped `aidigital.css` |
| Package manager | npm |
| Scripts | `dev`, `build`, `lint`, `typecheck`, `check` |
| Homepage route | `src/app/(site)/page.tsx` → `HomePage` |
| Layout shell | `src/app/(site)/layout.tsx` → `SiteShell` (Navbar + Footer) |
| Site components | `src/components/sites/aidigital/*` |
| Assets | `public/sites/aidigital/*` |
| Motion | GSAP, Lenis, lottie-react, framer-motion/motion |

### Homepage section order (local)

1. **Hero** (LOCKED) — Lottie wordmark + consultancy blurb + logos  
2. Elevate  
3. Services  
4. OpenGarden  
5. Team  
6. Articles  
7. Talk  

### Existing routes

- `/` — homepage only (no secondary ZeonAI pages yet)

## 0.2 Recovery point

- Git branch `checkpoint/pre-zeonai-migration` created and committed with the full AI Digital-inspired homepage + assets.  
- Work continues on `feat/zeonai-full-site` branched from that checkpoint.  
- Restore: `git checkout checkpoint/pre-zeonai-migration`

## 0.3 Hero lock — PROTECTED FILES

**Do not modify these files for content migration or shared refactors.** Prefer new components / additive variants.

| File | Role |
|---|---|
| `src/components/sites/aidigital/Hero.tsx` | Hero layout, tagline, logo slider |
| `src/components/sites/aidigital/HeroLottie.tsx` | Lottie loader |
| `src/components/sites/aidigital/HeroWordmark.tsx` | Legacy SVG wordmark (unused by Hero; do not delete blindly) |
| `public/sites/aidigital/images/lottie-harnessing.json` | Active hero Lottie |
| `public/sites/aidigital/images/lottie-desktop.json` | Source desktop Lottie |
| `public/sites/aidigital/images/lottie-mobile.json` | Source mobile Lottie |
| `public/sites/aidigital/images/lottie-desktop-source.json` | Backup source |
| `scripts/reletter-hero-lottie.mjs` | Lottie reletter generator |
| `src/components/sites/aidigital/data/hero-wordmark.json` | Wordmark path data |
| `src/components/sites/aidigital/data/lottie-desktop.json` | Component-local copy |

### Shared dependencies used by hero (change carefully)

- `src/components/ui/logo-slider.tsx`  
- `src/components/ui/staggerText.tsx`  
- `src/components/sites/aidigital/aidigital.css` (`.hero-lottie-*`, `.home-hero`)  
- `src/components/sites/aidigital/constants.ts` (`logos` array used by Hero)  
- `lottie-react` package  

**Rule:** If `constants.logos` or hero CSS must change for other pages, create ZeonAI-specific variants instead of editing hero-consumed values.

### Baseline screenshots

| Viewport | File |
|---|---|
| Desktop 1440×900 | `docs/design-references/baseline/hero-desktop-1440.png` |
| Mobile 390×844 | `docs/design-references/baseline/hero-mobile-390.png` |
| Prior local refs | `docs/design-references/aidigital/local-desktop-hero.png`, `local-mobile-hero.png` |

## 0.4 Site baseline notes

- Dev server: `http://localhost:3456`  
- Nav/footer still branded AI Digital (content migration pending).  
- Smooth scroll: Lenis via `SmoothScroll`.  
- Newsletter API: `src/app/api/newsletter/route.ts`  

## Hero-lock regression checklist (run after each milestone)

- [ ] Lottie still loads and loops  
- [ ] Phrase / ribbon timing unchanged  
- [ ] Hero layout / spacing unchanged at 1440 and 390  
- [ ] No new console errors from hero components  
