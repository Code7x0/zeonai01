/**
 * Source-of-truth copy extracted from
 * https://zeonai-website-preview.vercel.app/ (2026-10-24).
 * Do not invent claims — extend only from inspected source text.
 */

export const zeonMeta = {
  title: "ZeonAI Labs | Governed enterprise AI platform",
  description:
    "The governed AI platform for enterprise knowledge and workflows. AI Workspace answers from your documents with citations; agents route paperwork with access control and an audit log built in.",
  email: "mailto:contact@zeonai.com",
  contactEmail: "contact@zeonai.com",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/zeonai-labs",
    },
    { label: "X", href: "https://x.com/LabsZeonai" },
    { label: "Facebook", href: "https://www.facebook.com/zeonailabs" },
  ],
} as const;

export const zeonNav = [
  { label: "Platform", href: "#platform" },
  { label: "Industries", href: "#industries" },
  { label: "Customers", href: "#customers" },
  { label: "Trust", href: "#trust" },
] as const;

export const zeonPlatform = {
  eyebrow: "AI Workspace",
  title: "The governed AI platform for enterprise knowledge and workflows.",
  body: "AI Workspace answers questions from your own documents and cites every source. Its agents read, check and route the paperwork behind a process, from the inbox to your ERP, and people approve what matters. Access control and an audit log are part of the platform, not an add-on.",
  ctaPrimary: { label: "Book a demo", href: "#book-a-demo" },
  ctaSecondary: { label: "See the platform", href: "#platform" },
} as const;

/**
 * Six hero capability-tour products from
 * https://zeonai-website-preview.vercel.app/ (hero tabs + Capabilities module copy).
 * Descriptions/bullets match the verified Capabilities module text — not sample UI metrics.
 */
export const zeonWorkspaceProducts = {
  id: "overview",
  eyebrow: "AI Workspace",
  title: "Six ways the platform shows up in the work",
  lead: "Each card is a capability from AI Workspace. Open one to see what it does.",
  centerLabel: "ZeonAI",
  centerHint: "Select a product",
  sourcePage: "https://zeonai-website-preview.vercel.app/",
  products: [
    {
      id: "ask-ai",
      title: "Ask AI",
      body: "A persona-aware copilot that answers from your documents, with citations.",
      bullets: [
        "Answers grounded in your files",
        "Citations for every claim",
        "Access rules applied before retrieval",
      ],
      detail:
        "A persona-aware copilot answers from your documents and cites every source. Access rules are applied before retrieval, so answers stay inside what the person is allowed to see.",
      source:
        "Hero capability tour tab “Ask AI” + Capabilities module Ask AI",
      visual: "ask" as const,
      orbit: "tl" as const,
    },
    {
      id: "agent-hub",
      title: "Agent Hub",
      body: "Agents grouped by function, each running a workflow of sub-agents.",
      bullets: [
        "50+ agents across finance, lending, and ops",
        "Sub-agents for ingest, extract, validate, and output",
        "Human approval where it matters",
      ],
      detail:
        "A hub groups related agents. Each agent does one business task and runs the same sub-agent sequence; the result can go to a dashboard, a report, an export file, or your ERP.",
      source:
        "Hero capability tour tab “Agent Hub” + Capabilities / Engineering hub copy",
      visual: "agents" as const,
      orbit: "tr" as const,
    },
    {
      id: "app-hub",
      title: "App Hub",
      body: "Intelligent apps, shown only for the roles that may use them.",
      bullets: [
        "Role-gated app catalogue",
        "Assisted planners and assistants",
        "Start with what you need, add more later",
      ],
      detail:
        "Intelligent apps are shown only for the roles that may use them. Start with what you need and add more later from the role-gated catalogue.",
      source:
        "Hero capability tour tab “App Hub” + Capabilities module App Hub",
      visual: "apps" as const,
      orbit: "ml" as const,
    },
    {
      id: "ai-dashboards",
      title: "AI Dashboards",
      body: "Smart dashboards built from your Excel and database sources.",
      bullets: [
        "Excel and database sources",
        "Live operational metrics",
        "Role-gated views",
      ],
      detail:
        "Smart dashboards are built from your Excel and database sources, with live operational metrics in role-gated views.",
      source:
        "Hero capability tour tab “AI Dashboards” + Capabilities module AI Dashboards",
      visual: "dashboards" as const,
      orbit: "mr" as const,
    },
    {
      id: "workflows",
      title: "Workflows",
      body: "Steps, approvals and an audit trail, with agents and people working together.",
      bullets: [
        "Human approval on exceptions",
        "ERP posting after review",
        "Full audit trail",
      ],
      detail:
        "Steps, approvals and an audit trail keep agents and people working together. Exceptions go to a person before ERP posting.",
      source:
        "Hero capability tour tab “Workflows” + Capabilities module Workflows",
      visual: "workflows" as const,
      orbit: "bl" as const,
    },
    {
      id: "contract-intelligence",
      title: "Contract Intelligence",
      body: "Clauses read, key terms extracted and risks flagged for review.",
      bullets: [
        "Clause extraction",
        "Risk flags for review",
        "Key term fields",
      ],
      detail:
        "Clauses are read, key terms extracted, and risks flagged so a person can review before acting.",
      source:
        "Hero capability tour tab “Contract Intelligence” + Capabilities module Contract Intelligence",
      visual: "contract" as const,
      orbit: "br" as const,
    },
  ],
} as const;

export type ZeonWorkspaceProduct =
  (typeof zeonWorkspaceProducts.products)[number];

export const zeonArchitecture = {
  id: "architecture",
  eyebrow: "01 · Architecture",
  title: "The platform in one picture",
  lead: "Every document moves through the same six layers, from the file you upload to the record in your ERP.",
  note: "The language model can be swapped. The layers underneath are what make the output safe to act on.",
  instruction: "Scroll to open the layers, or choose one.",
  layers: [
    {
      num: "01",
      title: "Data sources",
      callout: "files and repositories",
      body: "Spreadsheets and PDFs come in by upload or from a connected repository. They are read where they live, and the original file is kept with the case.",
      points: [
        { label: "Spreadsheets", detail: "Sheets, header row, typed columns" },
        { label: "PDFs", detail: "Key phrases and a document category" },
        { label: "Kept", detail: "The original file stays with the case" },
      ],
    },
    {
      num: "02",
      title: "Document processing",
      callout: "sheets, pages, fields",
      body: "Document processing is configured, not hard-coded. You describe the document once and the same setup reads every file of that kind.",
      points: [
        {
          label: "Spreadsheets",
          detail:
            "Numeric, alphabetic, date, time and percentage columns, each with its own instructions",
        },
        {
          label: "PDFs",
          detail:
            "Whole document, page by page, or fixed layout with variable pages",
        },
        {
          label: "Repeats",
          detail: "Matching data on adjacent pages merges into one record",
        },
      ],
    },
    {
      num: "03",
      title: "Rules engine",
      callout: "four rule types",
      body: "Rules live in named rule sets. Describe a rule in plain language and the platform drafts it. A person reviews the draft before it is saved.",
      points: [
        {
          label: "Types",
          detail: "Calculation, validation, transformation, assignment",
        },
        { label: "Output", detail: "Each rule names the variables it produces" },
        {
          label: "Review",
          detail: "Generated rules are checked by a person",
        },
      ],
    },
    {
      num: "04",
      title: "Workflows and approvals",
      callout: "one holder, many tasks",
      body: "A case has one holder at a time. The holder can delegate tasks without giving up the case, and a case cannot close while a task is still open.",
      points: [
        {
          label: "Tasks",
          detail: "Open, submitted, sent back, resubmitted, completed",
        },
        {
          label: "Deadlines",
          detail: "A task deadline cannot pass the case deadline",
        },
        { label: "Closing", detail: "Blocked until every task is complete" },
      ],
    },
    {
      num: "05",
      title: "Access and audit",
      callout: "roles, tiers, audit log",
      body: "Roles carry named permissions. Visibility tiers keep sensitive cases in front of the right people only. Every action is written to an activity log that nobody can edit.",
      points: [
        {
          label: "Roles",
          detail: "Named permissions, set by an administrator",
        },
        {
          label: "Visibility",
          detail: "General, protected, or restricted to one owner",
        },
        {
          label: "Log",
          detail: "Read only, with the actor and a timestamp",
        },
      ],
    },
    {
      num: "06",
      title: "Outputs and integrations",
      callout: "dashboard, report, ERP",
      body: "Results go where the work happens: a dashboard, a downloadable report, an export file, or your ERP through a connector.",
      points: [
        { label: "Formats", detail: "Dashboard view, report, export file" },
        { label: "ERP", detail: "Posted through a connector" },
        {
          label: "Watchers",
          detail: "Notified in the app and by email, read only",
        },
      ],
    },
  ],
} as const;

export const zeonCapabilities = {
  id: "platform",
  eyebrow: "02 · Capabilities",
  title: "How ZeonAI is shaping decisions across the enterprise",
  lead: "One platform, every business process, and one place to enhance them.",
  stat: { value: "50+", label: "agents in our portfolio" },
  hint: "Click an item or use the arrow keys.",
  modules: [
    {
      id: "ask-ai",
      num: "01",
      title: "Ask AI",
      body: "A persona-aware copilot that answers from your documents, with citations.",
      bullets: [
        "Answers grounded in your files",
        "Citations for every claim",
        "Access rules applied before retrieval",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-media.svg",
      featured: true,
      visual: "ask" as const,
    },
    {
      id: "ai-drive",
      num: "02",
      title: "AI Drive",
      body: "Governed documents with versions, lineage, indexing and permissions.",
      bullets: [
        "Versioned document store",
        "Lineage and indexing",
        "Permissions before search",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-smart.svg",
      featured: false,
      visual: "drive" as const,
    },
    {
      id: "workflows",
      num: "03",
      title: "Workflows",
      body: "Steps, approvals and an audit trail, with agents and people working together.",
      bullets: [
        "Human approval on exceptions",
        "ERP posting after review",
        "Full audit trail",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-labs.svg",
      featured: false,
      visual: "workflows" as const,
    },
    {
      id: "ai-dashboards",
      num: "04",
      title: "AI Dashboards",
      body: "Smart dashboards built from your Excel and database sources.",
      bullets: [
        "Excel and database sources",
        "Live operational metrics",
        "Role-gated views",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-media.svg",
      featured: false,
      visual: "dashboards" as const,
    },
    {
      id: "contract-intelligence",
      num: "05",
      title: "Contract Intelligence",
      body: "Clauses read, key terms extracted and risks flagged for review.",
      bullets: [
        "Clause extraction",
        "Risk flags for review",
        "Key term fields",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-smart.svg",
      featured: false,
      visual: "contract" as const,
    },
    {
      id: "opportunity-management",
      num: "06",
      title: "Opportunity Management",
      body: "Opportunities surfaced, qualified and moved through the pipeline.",
      bullets: [
        "Tender and opportunity scan",
        "Qualify and pursue stages",
        "Pipeline visibility",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-labs.svg",
      featured: false,
      visual: "opportunity" as const,
    },
    {
      id: "quote-management",
      num: "07",
      title: "Quote Management",
      body: "Quotes assembled from your library and routed for approval.",
      bullets: [
        "Price library line items",
        "Margin and terms review",
        "Approval routing",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-media.svg",
      featured: false,
      visual: "quote" as const,
    },
    {
      id: "app-hub",
      num: "08",
      title: "App Hub",
      body: "Intelligent apps, shown only for the roles that may use them.",
      bullets: [
        "Role-gated app catalogue",
        "Assisted planners and assistants",
        "Start with what you need, add more later",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-labs.svg",
      featured: true,
      visual: "apps" as const,
    },
    {
      id: "agent-hub",
      num: "09",
      title: "Agent Hub",
      body: "Agents grouped by function, each running a workflow of sub-agents.",
      bullets: [
        "50+ agents across finance, lending, and ops",
        "Sub-agents for ingest, extract, validate, and output",
        "Human approval where it matters",
      ],
      href: "#platform",
      image: "/sites/aidigital/images/service-smart.svg",
      featured: true,
      visual: "agents" as const,
    },
  ],
} as const;

export type ZeonCapabilityModule =
  (typeof zeonCapabilities.modules)[number];
export type ZeonCapabilityVisual = ZeonCapabilityModule["visual"];

export const zeonEngineering = {
  id: "engineering",
  eyebrow: "03 · Engineering",
  title: "How it works under the hood",
  lead: "Six pieces, in the order a document meets them.",
  pieces: [
    {
      num: "01",
      label: "pipeline",
      title: "Hubs, agents and sub-agents",
      body: "A hub groups related agents. Each agent does one business task, and every agent runs the same four sub-agents in order. The result can go to a dashboard, a report, an export file or your ERP.",
    },
    {
      num: "02",
      label: "document processing",
      title: "Configured, not hard-coded",
      body: "You describe the document once. For a spreadsheet that means its sheets, header row and typed columns, each with its own instructions. For a PDF it means key phrases, a document category and an extraction mode, with data that repeats across adjacent pages merged into one record.",
    },
    {
      num: "03",
      label: "business rules",
      title: "Rule sets in four types",
      body: "A rule is a calculation, a validation, a transformation or an assignment, and rules are grouped into named rule sets. Describe the rule in plain language and the platform drafts it. A person reviews the draft before it is saved.",
    },
    {
      num: "04",
      label: "access",
      title: "Roles and visibility tiers",
      body: "Roles carry named permissions. A case is general, protected, or restricted to one owner, and only the current holder of a case can act on it. An administrator override exists, but only as an explicit permission you grant, and it never reaches a restricted case.",
    },
    {
      num: "05",
      label: "delegation",
      title: "Tasks without handing over the case",
      body: "The holder delegates tasks and keeps the case. Each task has a deadline that cannot pass the case deadline, and moves from open to completed, with send-back and resubmission in between. A case cannot close while a task is still open.",
    },
    {
      num: "06",
      label: "audit and notifications",
      title: "A log nobody can edit",
      body: "Every action is written to a read-only activity log with the actor and a timestamp. It cannot be edited or deleted. Watchers are told about each change in the app and by email, and they cannot act on the case.",
    },
  ],
} as const;

export const zeonTrust = {
  id: "trust",
  eyebrow: "06 · Governance",
  title: "Governed by design, not added afterwards",
  lead: "Access control, human review and an audit log are built into every part of AI Workspace, from the first search to the record posted in your ERP.",
  accessTitle: "Access you control",
  points: [
    "Admin defines roles — set up the roles your teams need, once.",
    "Roles map to modules — each role gets only the modules it needs.",
    "People see only what their role allows — access is checked before anything is retrieved.",
  ],
  securityTitle: "Enterprise-grade security and compliance",
  securityLead:
    "Upholding strict data security and privacy standards is at the core of everything we do.",
  certifications: [
    { name: "SOC 2", detail: "Compliance" },
    { name: "ISO 27001", detail: "Information security management" },
    { name: "GDPR", detail: "GDPR-ready systems" },
  ],
  securityPoints: [
    {
      title: "Role-based access",
      body: "Granular permission controls ensure users only access what they need. Access is checked before anything is retrieved.",
    },
    {
      title: "Encryption",
      body: "End-to-end encryption for data at rest and in transit.",
    },
    {
      title: "Two-factor authentication and audit logs",
      body: "Two-factor authentication and comprehensive audit trails.",
    },
    {
      title: "Legal archiving",
      body: "Compliant data retention and GDPR-ready systems.",
    },
    {
      title: "Disaster recovery",
      body: "Robust backup systems and business continuity planning.",
    },
    {
      title: "Deployment on your terms",
      body: "On-premises or private cloud deployment with full data and model sovereignty.",
    },
  ],
  governedNote:
    "Answers are drawn only from the documents and repositories the person can already open, and each one cites its sources. Check an output against the source before you act on it.",
  deployments: [
    "On-premises",
    "Private cloud",
    "AWS",
    "GCP",
    "Azure",
  ],
} as const;

export const zeonIndustries = {
  id: "industries",
  title: "Built for regulated, document-heavy sectors",
  lead: "The same platform, with agents built for each sector. Examples from our agent portfolio.",
  sectors: [
    {
      title: "Financial services and lending",
      body: "Faster, better-documented credit decisions without adding headcount.",
      runsOn: "AI Workspace · Agent Hub",
      steps: ["Intake", "Extract", "Check", "Approve"],
      agents: [
        {
          name: "Mortgage application automation",
          detail:
            "Reads application packs and checks them against lending policy.",
        },
        {
          name: "AI underwriting",
          detail:
            "Assembles the evidence an underwriter needs into one view.",
        },
        {
          name: "KYC intelligence",
          detail: "Extracts and verifies identity and entity details.",
        },
        {
          name: "Credit memo generation",
          detail: "Drafts the credit memo from verified data for review.",
        },
      ],
    },
    {
      title: "Superannuation and finance",
      body: "Clean payables and reconciliations, with an audit trail for every exception.",
      runsOn: "AI Workspace · Agent Hub",
      steps: ["Intake", "Extract", "Check", "Approve"],
      agents: [
        {
          name: "Invoice processing and 3-way match",
          detail:
            "Matches invoices to purchase orders and goods receipts.",
        },
        {
          name: "E-batch and payment reconciliation",
          detail: "Reconciles payment batches against bank records.",
        },
        {
          name: "Fund analysis",
          detail:
            "Summarises fund data for investment and board reporting.",
        },
        {
          name: "Bank-ERP reconciliation",
          detail:
            "Matches bank records to the ledger and flags the differences for review.",
        },
      ],
    },
    {
      title: "Media and publishing",
      body: "More output from the same newsroom, with checks before anything is published.",
      runsOn: "AI Workspace · Core",
      steps: ["Ask", "Access", "Retrieve", "Cite"],
      agents: [
        {
          name: "Topic summary and insight",
          detail: "Condenses coverage and research into a briefing.",
        },
        {
          name: "Fact check",
          detail: "Flags claims that need a source before publication.",
        },
        {
          name: "AI audio",
          detail: "Turns written stories into audio versions.",
        },
        {
          name: "Topic and article search",
          detail: "Finds related coverage across the archive.",
        },
      ],
    },
    {
      title: "Government and public sector",
      body: "Answers from policy and data, with access controls that match the classification.",
      runsOn: "AI Workspace · Core and Agent Hub",
      steps: ["Ask", "Retrieve", "Act", "Review"],
      agents: [
        {
          name: "Generative search and policy questions",
          detail: "Answers policy questions with citations to the source.",
        },
        {
          name: "Financial analysis",
          detail: "Analyses budget and expenditure data on request.",
        },
        {
          name: "Geospatial analysis",
          detail: "Brings location data into reports and decisions.",
        },
        {
          name: "Secure knowledge discovery",
          detail:
            "Searches restricted archives within each user's clearance.",
        },
      ],
    },
    {
      title: "Defence",
      body: "Knowledge discovery for classified environments, deployed on your own infrastructure.",
      runsOn: "AI Workspace · Core",
      steps: ["Ask", "Access", "Retrieve", "Cite"],
      agents: [
        {
          name: "Secure knowledge discovery",
          detail: "Finds what personnel need within their clearance.",
        },
        {
          name: "Classified document questions",
          detail:
            "Answers questions on restricted documents, with citations.",
        },
        {
          name: "Access-controlled search",
          detail: "Search that enforces need-to-know on every result.",
        },
        {
          name: "SOP and doctrine management",
          detail: "Keeps procedures current, versioned and searchable.",
        },
      ],
    },
    {
      title: "Metals and manufacturing",
      body: "Less paperwork between the plant floor and the finance team.",
      runsOn: "AI Workspace · Agent Hub",
      steps: ["Intake", "Extract", "Check", "Approve"],
      agents: [
        {
          name: "Vendor invoice processing",
          detail: "Captures and validates vendor invoices for posting.",
        },
        {
          name: "EHS injury and incident analysis",
          detail: "Finds patterns in safety reports to prevent repeats.",
        },
        {
          name: "Data migration reconciliation",
          detail: "Checks migrated records against the source system.",
        },
        {
          name: "Invoice and PO 2-way matching",
          detail:
            "Matches vendor invoices to purchase orders and routes mismatches to the right person.",
        },
      ],
    },
  ],
} as const;

export const zeonRoles = {
  id: "roles",
  title: "Who are you?",
  lead: "Pick your role. The modules and agents set up for it light up, and the rest stay off. Start with what you need, add more later.",
  roles: [
    "Finance manager",
    "Legal and contracts lead",
    "Procurement and tenders lead",
    "Compliance and KYC officer",
    "Operations head",
    "Credit analyst",
  ],
  customCta: "Your team, your workflow — tell us your function and we'll show the fit",
  sample: {
    role: "Finance manager",
    summary: "Set up for Finance manager: 6 of 12 modules",
    modules: [
      { name: "Ask AI", status: "Included" },
      { name: "Search", status: "Not needed" },
      { name: "Notifications", status: "Included" },
      { name: "AI Drive", status: "Included" },
      { name: "AI Dashboards", status: "Not needed" },
      { name: "Workflows", status: "Included" },
      { name: "Contract Intelligence", status: "Not needed" },
      { name: "App Hub", status: "Not needed" },
      { name: "Quote Management", status: "Not needed" },
      { name: "Opportunity Management", status: "Not needed" },
      { name: "Dashboard", status: "Included" },
      { name: "Agent Hub", status: "Included" },
    ],
    agents: [
      "InvoiceAI",
      "Bank and ERP reconciliation",
      "Budget variance review",
    ],
  },
} as const;

export const zeonCustomers = {
  id: "customers",
  title: "Customers and case studies",
  lead: "Real deployments across lending, finance and media, with the results each one delivered.",
  cases: [
    {
      href: "#customers",
      image: "/sites/aidigital/articles/state-of-ai.webp",
      category: "Lending",
      title: "Mortgage application automation",
      meta: "Australian credit asset management firm",
      detail: "70%+ reduction in manual effort · 30,000+ documents a month",
      challenge:
        "Multi-page loan application forms took extensive manual effort to extract and validate, which led to inefficiencies and potential errors.",
      deployed:
        "DocAI on Agent Hub reads each form, with a validation screen for quick checks and corrections, connected to the firm's financial systems.",
      outcome:
        "Staff moved to strategic work. AI-driven validation ensures near-zero data errors and processing time fell by 70%, so loan approvals arrive sooner.",
    },
    {
      href: "#customers",
      image: "/sites/aidigital/articles/holiday-report.png",
      category: "Lending",
      title: "Billing agent",
      meta: "Lending bank in the US",
      detail: "80% reduction in manual partner billing · 99%+ accuracy",
      challenge:
        "Monthly partner fee calculations across several fee types were done by hand with SQL queries and Excel templates.",
      deployed:
        "InvoiceAI on Agent Hub extracts partner agreements, calculates the fee structures and posts invoices through an ERP integration, with a validation screen for quick checks.",
      outcome:
        "Billing disputes fall away with 99%+ accuracy, partners are paid 60% faster, and automated audit trails reduce compliance risk.",
    },
    {
      href: "#customers",
      image: "/sites/aidigital/articles/attribution.webp",
      category: "Superannuation",
      title: "Financial operations intelligence",
      meta: "Leading superannuation fund",
      detail: "80–85% reduction in daily receipting time",
      challenge:
        "Receipting meant identifying employer deposits on daily bank statements by hand and preparing batches in spreadsheets, passed between receipting officers by email.",
      deployed:
        "A reconciliation agent on Agent Hub reads bank statement narratives, matches deposits to employer accounts and generates the batch files in real time. Exceptions and duplicates go to a person.",
      outcome:
        "Staff review only the exceptions. Fund allocation is faster, operational risk is lower, and human review keeps compliance in place.",
    },
    {
      href: "#customers",
      image: "/sites/aidigital/articles/podcast-cover.png",
      category: "Media",
      title: "AI Workspace for content intelligence",
      meta: "Leading Australian media agency",
      detail: "20–28% lower operating cost · errors under 1%",
      challenge:
        "Manual processes could not synthesise large volumes of content, leaving information gaps and outdated reports. Keyword search missed context, and manual summaries were costly and subjective.",
      deployed:
        "AI Workspace turns text and audio into real-time summaries, with semantic search, consistent sentiment analysis and archive queries.",
      outcome:
        "Operating costs fell by 20-28% and error rates from 20% to under 1%. The same team now serves 5x more customers without more headcount.",
    },
  ],
} as const;

export const zeonDemo = {
  id: "book-a-demo",
  title: "Book a demo",
  body: "See AI Workspace on a workflow that matters to you. Tell us a little about your team and we will arrange a time.",
  nextTitle: "What happens next",
  nextSteps: [
    {
      num: "01",
      title: "A conversation about your process",
      body: "We start with the workflow or knowledge problem that costs you most.",
    },
    {
      num: "02",
      title: "The platform on a relevant workflow",
      body: "We show AI Workspace on a scenario from your sector, or on a sample of your documents if you share one.",
    },
    {
      num: "03",
      title: "Deployment and governance answers",
      body: "Cloud, private cloud or on-premises, and how role-based access, review and audit work in your environment.",
    },
  ],
  formTitle: "Your details",
  formNote: "All fields are required unless marked optional.",
  interests: ["AI Workspace", "Agent Hub", "Both"] as const,
  roles: [
    "Finance",
    "Legal",
    "Operations",
    "Compliance",
    "Technology",
    "Other",
  ] as const,
  cta: { label: "Talk to our team", href: "mailto:contact@zeonai.com" },
  fallback:
    "If the form does not submit, email us at contact@zeonai.com instead.",
} as const;

export const zeonOffices = [
  {
    title: "India Office",
    address:
      "Neeladri Vihar, Chandrasekharpur, Bhubaneswar, Odisha 751021",
    map: "https://maps.google.com/?q=Neeladri+Vihar+Bhubaneswar",
  },
  {
    title: "UAE Office",
    address: "Meydan Grandstand area, Dubai",
    map: "https://maps.google.com/?q=Meydan+Grandstand+Dubai",
  },
  {
    title: "Canada Office",
    address: "180 Howden Blvd, Brampton, ON L6S 0E6",
    map: "https://maps.google.com/?q=180+Howden+Blvd+Brampton",
  },
] as const;

export const zeonFooterColumns = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/#platform" },
      { label: "Architecture", href: "/#architecture" },
      { label: "Industries", href: "/#industries" },
      { label: "Customers", href: "/#customers" },
      { label: "Trust", href: "/#trust" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a demo", href: "/#book-a-demo" },
      { label: "Contact", href: "mailto:contact@zeonai.com" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
] as const;

export const zeonTerms = {
  title: "Terms",
  notice: "Draft for legal review.",
  sections: [
    {
      heading: "About this site",
      body: "This website is operated by ZeonAI Labs Private Ltd. By using it you agree to these terms.",
    },
    {
      heading: "Use of the content",
      body: "The content on this site is provided for general information about ZeonAI products. It is not an offer or a contract. Product descriptions may change.",
    },
    {
      heading: "Samples and illustrations",
      body: "Screens, names, documents and figures shown on this site are samples or illustrations unless marked otherwise. They are not customer data.",
    },
    {
      heading: "Liability",
      body: "For questions about liability, governing law and jurisdiction, email contact@zeonai.com.",
    },
    {
      heading: "Contact",
      body: "Questions about these terms: contact@zeonai.com.",
    },
  ],
} as const;

export const zeonPrivacy = {
  title: "Privacy policy",
  notice: "Draft for legal review",
  disclaimer:
    "This text is a draft written to describe what the website does today. It has not been reviewed or approved by legal counsel and must not be treated as the final policy.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        'ZeonAI Labs Private Ltd ("ZeonAI Labs", "we") runs this website. We have offices in India, the United Arab Emirates and Canada.',
        "You can contact us about privacy at contact@zeonai.com.",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "When you use the demo or contact form we collect your name, work email, company, role, the product you are interested in, your message, and your agreement to be contacted.",
        "Our hosting provider keeps standard server logs (such as IP address, browser type and the pages requested) to keep the site secure and working.",
        "We do not use analytics or advertising cookies on this site.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use form details only to reply to your request, arrange a demo and follow up on it.",
        "We do not sell your personal information.",
      ],
    },
    {
      heading: "Legal basis",
      paragraphs: [
        "We rely on your consent, given in the form, and on our legitimate interest in responding to enquiries.",
        "For the legal basis that applies where you live, email contact@zeonai.com.",
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "Service providers who host the site and handle form submissions for us, under contracts that limit how they use it.",
        "For the names and locations of our service providers, email contact@zeonai.com.",
      ],
    },
    {
      heading: "International transfers",
      paragraphs: [
        "Because our teams work across several countries, your details may be accessed from outside the country where you live.",
        "For details of the safeguards we use, email contact@zeonai.com.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep enquiry details only as long as we need them to reply to you and to keep a record of the conversation. For the exact period, email contact@zeonai.com.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Depending on where you live, you may have the right to access, correct or delete your personal information, to object to or restrict how we use it, and to withdraw consent at any time.",
        "To use these rights, email contact@zeonai.com. You can also complain to your local data protection authority.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We will update this page when how we handle personal information changes, and show the date of the latest version.",
        "Last updated: 13 October 2026.",
      ],
    },
  ],
} as const;
