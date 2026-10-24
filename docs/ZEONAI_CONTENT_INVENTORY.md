# ZeonAI Content Inventory

**Source A (design):** Local AI Digital-inspired homepage  
**Source B (content):** https://zeonai-website-preview.vercel.app/  
**Also checked:** https://www.zeonai.com/  
**Inspected:** 2026-10-24  

Status legend: `Not inspected` · `Inspected` · `Extracted` · `Mapped` · `Implemented` · `Verified` · `Blocked`

---

## Route discovery

| URL | Type | HTTP / notes | Status |
|---|---|---|---|
| `https://zeonai-website-preview.vercel.app/` | SPA homepage | Live; title *ZeonAI Labs \| Governed enterprise AI platform* | Implemented |
| `/#platform` (Capabilities) | Anchor | Nav: Platform → Services | Implemented |
| `/#architecture` | Anchor | Architecture layers → OpenGarden | Implemented |
| `/#industries` | Anchor | Nav: Industries → Team | Implemented |
| `/#customers` | Anchor | Nav: Customers → Articles | Implemented |
| `/#trust` | Anchor | Nav: Trust → OpenGarden | Implemented |
| `/#book-a-demo` | Anchor | CTA → Talk (mailto) | Implemented |
| `/terms` | Page | Live on preview; local `/terms` | Verified |
| `/privacy-policy` | Page | Live draft on preview; local `/privacy-policy` | Verified |
| `/privacy` | Page | 404 (wrong path — use `/privacy-policy`) | Excluded |
| `sitemap.xml` | Discovery | Empty `<urlset>` | Inspected |
| Secondary product/blog/docs routes | — | Not linked from nav; not discovered | Excluded |

**Conclusion:** ZeonAI preview is a **single marketing page** with in-page anchors, plus `/terms`. Do not invent AI Digital–style multi-route sitemaps without source content.

---

## Homepage sections (source order)

### Hero / intro — Extracted

- **H1:** The governed AI platform for enterprise knowledge and workflows.  
- **Body:** AI Workspace answers questions from your own documents and cites every source. Its agents read, check and route the paperwork behind a process, from the inbox to your ERP, and people approve what matters. Access control and an audit log are part of the platform, not an add-on.  
- **CTAs:** Book a demo → `#book-a-demo`; See the platform → `#platform`  
- **Local mapping note:** Local Lottie hero is **LOCKED**. ZeonAI H1/body map to Elevate / intro strip below hero, not into locked Hero.

### 01 · Architecture — Extracted

- **H2:** The platform in one picture  
- **Lead:** Every document moves through the same six layers, from the file you upload to the record in your ERP.  
- **Note:** The language model can be swapped. The layers underneath are what make the output safe to act on.  
- **Layers:** Data sources · Document processing · Rules engine · Workflows and approvals · Access and audit · Outputs and integrations (full copy retained in content module)

### 02 · Capabilities — Extracted

- **H2:** How ZeonAI is shaping decisions across the enterprise  
- **Lead:** One platform, every business process, and one place to enhance them.  
- **Modules:** Ask AI, AI Drive, Workflows, AI Dashboards, Contract Intelligence, Opportunity Management, Quote Management, App Hub, Agent Hub (descriptions extracted)  
- **Stat:** 50+ agents in our portfolio  

### 03 · Engineering — Extracted

- **H2:** How it works under the hood  
- **Lead:** Six pieces, in the order a document meets them.  
- Pipeline / document processing / business rules / access / delegation / audit (full copy extracted)

### 04 · Industries — Extracted

- **H2:** Built for regulated, document-heavy sectors  
- **Sectors:** Financial services and lending · Superannuation and finance · Media and publishing · Government and public sector · Defence · Metals and manufacturing  
- Each sector: pitch, steps, agents list (extracted)

### Role picker — Extracted

- **H2:** Who are you?  
- Roles: Finance manager, Legal and contracts lead, Procurement and tenders lead, Compliance and KYC officer, Operations head, Credit analyst  
- Module include/exclude matrix for Finance manager sample extracted

### 05 · Customers — Extracted

| Case | Client | Headline metric | Status |
|---|---|---|---|
| Mortgage application automation | Australian credit asset management firm | 70%+ reduction in manual effort | Extracted |
| Billing agent | Lending bank in the US | 80% reduction in manual partner billing | Extracted |
| Financial operations intelligence | Leading superannuation fund | 80–85% reduction in daily receipting time | Extracted |
| AI Workspace for content intelligence | Leading Australian media agency | 20–28% lower operating cost | Extracted |

### 06 · Governance / Trust — Extracted

- **H2:** Governed by design, not added afterwards  
- Access control, human review, audit log copy extracted  
- FAQ-style trust points present on source (see content module)

### Book a demo — Extracted

- Form fields: Name, Work email, Company, Role (optional), interest radios (AI Workspace / Agent Hub / Both), Message, privacy consent  
- Contact: contact@zeonai.com  

### Footer — Extracted

- **Offices:**  
  - India — Neeladri Vihar, Chandrasekharpur, Bhubaneswar, Odisha 751021  
  - United Arab Emirates — Meydan Grandstand area, Dubai  
  - Canada — 180 Howden Blvd, Brampton, ON L6S 0E6  
- Social: LinkedIn, X, Facebook  
- Links: Privacy policy (Broken → 404), Terms (`/terms`)

---

## `/terms` — Extracted

- Draft for legal review  
- About this site, Use of the content, Samples and illustrations, Liability, Contact  
- Operator: ZeonAI Labs Private Ltd  

## `/privacy-policy` — Verified / Implemented

- Live draft on preview (path is `/privacy-policy`, not `/privacy`).  
- Sections: Who we are, What we collect, How we use it, Legal basis, Who we share it with, International transfers, How long we keep it, Your rights, Changes (Last updated: 13 October 2026).  
- Local route: `/privacy-policy`.

---

## Assets

| Asset | Source | Local plan | Status |
|---|---|---|---|
| OG image | `https://www.zeonai.com/images/og/zeonai-og-default.png` | Optional favicon/OG | Inspected |
| Product UI screenshots / sample data | Inline in preview (illustrated) | Prefer CSS/UI recreation; do not scrape customer data | Extracted |
| Local Lottie | Existing aidigital assets | **LOCKED — reuse as-is** | Verified baseline |

---

## Metadata

| Page | Title | Description candidate |
|---|---|---|
| `/` | ZeonAI Labs \| Governed enterprise AI platform | From H1 + lead sentence |
| `/terms` | Terms \| ZeonAI Labs | Draft terms for ZeonAI Labs website |
