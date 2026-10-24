# AI Digital homepage — page brief

## Route map
| Source | Local | Files |
|--------|-------|-------|
| https://www.aidigital.com/ | `/` | `src/app/page.tsx`, `src/components/sites/aidigital/*`, `public/sites/aidigital/*` |

First root clone — replaces template homepage. Out-of-scope internal paths keep absolute `https://www.aidigital.com/...` destinations.

## Stack / origin
Webflow site (`data-wf-domain=www.aidigital.com`). Fonts: Inter Variable (body), Barlow Semi Condensed Black/ExtraBold (headings). Accent lime `#aef33e`, brand blue `#0009dc`, ink `#26263a`, soft grey bg `#f9f9f9`, services bg `#f2f3fd`.

## Section order (desktop 1440)
1. **Fixed navbar** (~80px) — wordmark SVG, mega-menu triggers (Who we are / What we do / Elevate / AI Labs / Smart Supply / Resources / Join us), lime "Contact us" pill.
2. **Main banner** — lavender pill `#e5e6fb`: holiday report CTA + "Get your free copy."
3. **Hero** (min 100vh) — Lottie "WE ARE AI" ribbon graphic (desktop JSON), H1 "AI-Native Media Consultancy" (56px / 900 / blue, capitalize), body paragraph, infinite logo slider (nutpods, AW, Swarovski, True, Yamaha, Mediagistic, Airbnb, Mars, SA) with side fade masks.
4. **Elevate** (100vh black gradient) — tag "Elevate", H3 "The AI Engine Behind Everything", copy, CTAs Explore Elevate + Play video (YouTube modal `bhr8LWEhEVo`), large Elevate.gif visual.
5. **Services** (`#f2f3fd`) — "our services" + 3 cards: Media Orchestration / Smart Supply / AI Digital Labs with SVG art and Learn more links.
6. **Open Garden** — collage of 6 images + philosophy copy + Explore CTA; Play video (`S4fbLN6wjoQ`).
7. **Global team** — stats (3 hubs / 650+ employees), map/flag collage, Join us + Resources cards.
8. **Latest articles** — 3 blog cards (HTML5 banners, Banner design, Attribution).
9. **Let's talk** — blue rounded CTA block.
10. **Footer** — company/products/industries/capabilities columns, offices, newsletter form, legal links.

## Interactions (Phase 1–2 complete)
- Lenis + GSAP ScrollTrigger (skipped under prefers-reduced-motion).
- Navbar scrolled state after ~180px; full multi-column mega-menus + mobile drawer.
- Logo slider: Vengeance UI LogoSlider with infinite marquee + edge blur.
- Elevate: GSAP pin + reveal scrub; desktop lime play cursor; YouTube modal.
- Open Garden absolute collage + GSAP stagger; Watch video modal.
- Team dense flag mosaic + StatsCounter for hubs/employees.
- Heading reveals via Vengeance StaggerText on key sections.
- Newsletter: POST `/api/newsletter` (HubSpot when env set; otherwise local success UX).
- Shared chrome via `src/app/(site)/layout.tsx` + `SiteShell`.

## Assets
Under `public/sites/aidigital/` — fonts, icons/logo.svg, images (elevate.gif, open-garden*, service-*.svg), logos/*, articles/*, lottie-desktop.json, favicon.png.
