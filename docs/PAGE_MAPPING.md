# Page Mapping — ZeonAI Content × AI Digital Patterns

| ZeonAI page or content area | AI Digital reference page/pattern | Source content available | Decision | Status |
|---|---|---|---|---|
| Homepage (overall) | Existing local homepage shell | Yes — full SPA | Preserve design; migrate section copy | **Verified** |
| Hero (Lottie + tagline block) | Local locked hero | ZeonAI H1 differs | **Exclude from migration** — hero locked | **Locked** |
| Platform intro | Elevate | Yes | Map ZeonAI H1/body/CTAs into Elevate | **Verified** |
| Capabilities (9 modules) | Services | Yes | Featured 3 + compact 6 | **Verified** |
| Architecture layers | OpenGarden | Yes | Six-layer list | **Verified** |
| Engineering under the hood | OpenGarden extension | Yes | Six engineering pieces | **Verified** |
| Industries | Team | Yes | Sector switcher + agents | **Verified** |
| Role picker | Team secondary | Yes | Roles list + Finance manager sample | **Verified** |
| Customers / case studies | Articles cards | Yes | Four cases with full narrative | **Verified** |
| Trust / Governance / Security | OpenGarden callout | Yes | Access + security + deployments | **Verified** |
| Book a demo | Talk | Yes | Full form + next steps + `/api/demo` | **Verified** |
| Terms | Simple legal | Yes (`/terms`) | Build `/terms` | **Verified** |
| Privacy policy | Simple legal | Yes (`/privacy-policy`) | Build `/privacy-policy` | **Verified** |
| Blog / News / Open roles | AI Digital resources | No ZeonAI source | Exclude | **Excluded** |
| Product deep-links | AI Digital product pages | Anchors only | Homepage anchors | **Combined** |

## Decision rules applied

- **Build** only when ZeonAI publishes distinct content for a route.  
- **Combine** interactive capability-tour UI into Services cards (source wording preserved).  
- **Exclude** AI Digital routes with no ZeonAI content.  
- **Locked** hero never receives ZeonAI H1 rewrite.  
