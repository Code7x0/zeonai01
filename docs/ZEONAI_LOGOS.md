# ZeonAI Logo Strip — Verification Report

**Source inspected:** https://www.zeonai.com/ (2026-10-24)  
**Strip consumer:** `Hero.tsx` → `LogoSlider` (animation unchanged)  
**Asset path:** `public/sites/zeonai/logos/`

## Displayed in hero strip (Trusted by)

| Organization | Classification | Local asset | Source |
|---|---|---|---|
| Fujitsu | Customer (Trusted by) | `logos/fujitsu.png` | Homepage — Trusted by Leading Organizations Worldwide |
| National Capital District Commission | Customer (Trusted by) | `logos/national-capital-district-commission.png` | Same section |
| Indian Air Force | Customer (Trusted by) | `logos/indian-air-force.png` | Same section |
| aiDea Labs | Customer (Trusted by) | `logos/aidea-labs.png` | Same section |
| Aditya Birla Hindalco | Customer (Trusted by) | `logos/aditya-birla-hindalco.png` | Same section |
| Mahanadi Coalfields Limited (MCL) | Customer (Trusted by) | `logos/mahanadi-coalfields.png` | Same section |
| Quantum Lending Solutions | Customer (Trusted by) | `logos/quantum-lending-solutions.png` | Same section |
| La Trobe Financial | Customer (Trusted by) | `logos/la-trobe-financial.png` | Same section |

Original Framer CDN files archived under `logos/customers/*-source.png`.

## Strategic partners (verified, not in hero strip)

Listed under homepage **Our Strategic Partners**. Kept as archive assets only so partners are not mislabeled as customers.

| Organization | Local asset |
|---|---|
| Nuvola | `logos/partners/nuvola-blue.svg` / `.png` |
| IBM | `logos/partners/ibm-blue.svg` / `.png` |
| Nebius | `logos/partners/nebius-blue.svg` / `.png` |
| Fujitsu | `logos/partners/fujitsu-blue.svg` / `.png` (also appears under Trusted by) |
| ergonomics | `logos/partners/ergonomics.png` |
| KOHER | `logos/partners/koher-blue.svg` / `.png` |

## Treatment

- Monochrome blue `#0009dc` (`--aid-blue`) with transparent backgrounds.
- LogoSlider speed, blur, sizing, and marquee CSS unchanged.
- Hero duplicates the array for the infinite loop (`[...logos, ...logos]`).

## Not used

- AI Digital logos (nutpods, Swarovski, Yamaha, Airbnb, Mars, etc.) — removed from strip data.
- Invented or unverified brands — none.
