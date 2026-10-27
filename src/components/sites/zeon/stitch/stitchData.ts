export const archData = [
  {
    "num": "01",
    "title": "Data Sources & Custody",
    "lead": "Spreadsheets, PDFs, shared inboxes, APIs, S3, and ERP connectors (SAP, TechnologyOne, Pronto). Files are ingested and read where they live, typed according to schema, and the exact cryptographic hash of the original file is preserved with the case record.",
    "card1T": "Spreadsheets, CSVs & Mailboxes",
    "card1D": "Multi-sheet extraction, dynamic header detection, typed columns (numeric, currency, dates, percentages), automated inbox polling.",
    "card2T": "PDFs, TIFFs & Object Stores",
    "card2D": "Key-phrase grounding, document classification, bounding-box preservation for pixel-level audit verification.",
    "code": "source: s3://finance-ap-inbound/invoices/2025-Q1/\nconnectors: ['SAP_S4HANA', 'TechnologyOne_Financials', 'SharePoint_AP']\nretention_policy: zero_data_retention_after_vectorization\nchecksum_sha256: 8a3f890b201cd99812df...\nstatus: verified_original_retained_in_case"
  },
  {
    "num": "02",
    "title": "Document Processing & Layout Stitcher",
    "lead": "Configured spatial parser, layout stitching, and multi-page table reconciliation. You configure the document layout once, and the engine extracts every subsequent document without breaking on formatting variances.",
    "card1T": "Typed Columns & Schemas",
    "card1D": "Numeric, alphabetic, currency, and date columns, each with dedicated deterministic transformation primitives.",
    "card2T": "Multi-Page Table Reconciliation",
    "card2D": "Consecutive page tables stitch intelligently into a single consolidated transaction ledger without duplicate headers.",
    "code": "parser_mode: spatial_layout_variable_pages\nmerge_adjacent_tables: true\nheader_fingerprint: ['Item', 'Quantity', 'Unit Price', 'GST', 'Line Total']\nconfidence_floor: 0.9985\npage_range: [1, 2, 3] -> merged_records: 48"
  },
  {
    "num": "03",
    "title": "Deterministic Business Rules Engine",
    "lead": "Four rule types: Calculation (e.g. GST, arithmetic variance), Validation, Transformation, and Assignment. Plain-language drafted, compiled to deterministic code, and reviewed by a human auditor before commitment.",
    "card1T": "Four Rule Primitives",
    "card1D": "Calculation, Validation, Transformation, and Assignment prevent hallucinations and erratic LLM drift.",
    "card2T": "Named Output Safety",
    "card2D": "Every rule explicitly declares its variable contract to guarantee compile-time integrity across downstream ERPs.",
    "code": "rule_set: 'Superannuation & AP Variance Check'\ntype: Calculation & Policy Validation\nassert line_total_sum + gst_calculated == invoice_total\nif variance > tolerance_threshold:\n  route_to: 'AP Exception Gate (Sam Whitaker)'\n  flag: 'UNMATCHED_SURCHARGE'"
  },
  {
    "num": "04",
    "title": "Workflows & Approvals (Single Custody)",
    "lead": "One case holder at any time. The holder can delegate sub-tasks without giving up primary custody, and human-in-the-loop gating ensures no case can close while a delegated approval remains open.",
    "card1T": "Single-Case Custody",
    "card1D": "Sub-tasks can be submitted, rejected, re-submitted, and closed, strictly bounded by the primary case deadline.",
    "card2T": "Human-in-the-Loop Gating",
    "card2D": "case.close() is deterministically blocked by the platform while any delegated sub-task holds an open or review status.",
    "code": "case_id: 'WF-89104'\nmaster_holder: 'fa.approver (Sam Whitaker)'\ntasks_delegated: [{to: 'legal.ops', status: 'COMPLETED'}, {to: 'cfo.office', status: 'PENDING'}]\ncan_close: FALSE // blocked on cfo.office"
  },
  {
    "num": "05",
    "title": "Access, Context & Cryptographic Audit",
    "lead": "Role-based access control with 3 sensitivity tiers (General, Protected, Restricted). Every token, prompt, extraction, and routing event is committed to a tamper-evident append-only Merkle ledger.",
    "card1T": "3 Sensitivity Tiers",
    "card1D": "General (all staff), Protected (cleared roles only), and Restricted (strictly bound to designated named owner).",
    "card2T": "Append-Only Merkle Stream",
    "card2D": "Read-only audit stream with actor ID, microsecond timestamps, and non-repudiation cryptographic verification.",
    "code": "case_security_tier: 'PROTECTED'\nactor_identity: 'finance.director (Priya Nair)'\nrbac_filter: 2 documents withheld outside clearance\nmerkle_leaf_hash: 0x7c94b2a8f901...\nprovenance_status: IMMUTABLE_VERIFIED"
  },
  {
    "num": "06",
    "title": "Outputs & Enterprise Integrations",
    "lead": "Two-phase transactional commits directly into SAP, Microsoft Dynamics 365, TechnologyOne, Pronto, and Oracle NetSuite. Plus interactive executive dashboards and signed cryptographic evidence packs.",
    "card1T": "Two-Phase Commit Connectors",
    "card1D": "Native bi-directional connectors with automated roll-back protection if ERP ledger validations fail.",
    "card2T": "Signed Evidence Packs",
    "card2D": "Generates tamper-evident audit PDFs with embedded original hashes, line item bounds, and approval signatures.",
    "code": "target_erps: ['SAP_S4HANA', 'TechnologyOne_Financials', 'Pronto_ERP']\nendpoint: /api/v2/purchase_invoices/batch_post\npayload_status: TWO_PHASE_COMMITTED\njournal_entry_id: 'JE-2025-081491'"
  }
] as const;

export const indData = [
  {
    "title": "Mining & Heavy Operations",
    "desc": "Site-scale financial reconciliations, subcontractor claims, and high-volume vendor invoice processing with an 80% reduction in manual processing.",
    "pipeline": [
      "01 Ingest Site Dockets",
      "02 Match PO & Weight Slips",
      "03 Validate Safety/EHS",
      "04 Batch Post to ERP"
    ],
    "cards": [
      {
        "title": "Site Vendor Invoice 3-Way Match",
        "desc": "Captures remote supplier invoices and matches against physical weighbridge dockets and ERP purchase orders."
      },
      {
        "title": "Plant Asset Maintenance Co-Pilot",
        "desc": "Synthesizes complex OEM heavy equipment manuals and historical breakdown logs into step-by-step guidance."
      },
      {
        "title": "Subcontractor Claim Reconciler",
        "desc": "Cross-references progress claims against project schedule milestones and variations before sign-off."
      },
      {
        "title": "EHS Incident & Root Cause Analysis",
        "desc": "Identifies systemic root causes in safety reports across mine sites to prevent repeat incidents."
      }
    ]
  },
  {
    "title": "Financial Services & Lending",
    "desc": "Mortgage onboarding, credit memo drafting, KYC verification, and CashfloAI underwriting with over 70% effort reduction.",
    "pipeline": [
      "01 Intake Loan Pack",
      "02 Extract Financials",
      "03 Validate Policy",
      "04 Underwrite & Approve"
    ],
    "cards": [
      {
        "title": "Mortgage Application Automation",
        "desc": "Reads dense borrower packs and validates W2s, pay slips, and liabilities against lending criteria."
      },
      {
        "title": "CashfloAI Underwriting Co-Pilot",
        "desc": "Assembles risk ratios, borrower history, and collateral documentation into a single decision view."
      },
      {
        "title": "KYC & Entity Intelligence Agent",
        "desc": "Extracts and cross-verifies government identity and corporate entity registers in milliseconds."
      },
      {
        "title": "Credit Memo Generation",
        "desc": "Drafts comprehensive credit memorandums from verified data ready for risk committee sign-off."
      }
    ]
  },
  {
    "title": "Construction & Property Management",
    "desc": "Leases, rent rolls, variations, and subcontract claims held for human checkpoints before payment release.",
    "pipeline": [
      "01 Ingest Lease/Claim",
      "02 Parse Clauses & Rates",
      "03 Check Tolerances",
      "04 Human Sign-off Gate"
    ],
    "cards": [
      {
        "title": "Commercial Lease Abstraction",
        "desc": "Extracts critical dates, escalation clauses, and maintenance obligations into structured property databases."
      },
      {
        "title": "Rent Roll & Arrears Reconciliation",
        "desc": "Matches incoming tenant payments against tenancy agreements and flags overdue variances."
      },
      {
        "title": "Variation & Subcontract Claims",
        "desc": "Validates building contractor progress claims against initial architectural drawings and bill of quantities."
      },
      {
        "title": "Compliance & Safety Certifications",
        "desc": "Monitors trade contractor insurance policies, trade licenses, and statutory compliance validity."
      }
    ]
  },
  {
    "title": "Superannuation & Asset Management",
    "desc": "Daily bank statement receipting, batch file allocation, and employer contribution matching with 80–85% faster receipting.",
    "pipeline": [
      "01 Bank File Intake",
      "02 Match Member Ledger",
      "03 Validate SG Rates",
      "04 Batch Ledger Post"
    ],
    "cards": [
      {
        "title": "Daily Bank Statement Receipting",
        "desc": "Reconciles high-volume clearing account statements against internal member registries in seconds."
      },
      {
        "title": "Super Guarantee (SG) Contribution Check",
        "desc": "Deterministically validates statutory contribution percentages and flags underpayments."
      },
      {
        "title": "Fund Performance Disclosures",
        "desc": "Summarizes multi-asset fund data and yields for trustee board reporting and regulatory submission."
      },
      {
        "title": "Unallocated Deposit Discovery",
        "desc": "Discovers unallocated deposits and matches narrative tokens directly for accountant sign-off."
      }
    ]
  },
  {
    "title": "Public Sector, Permitting & Classified",
    "desc": "Sovereign knowledge discovery and policy navigation with rigorous need-to-know access control.",
    "pipeline": [
      "01 Ingest Classified Archive",
      "02 Role-Clearance Gate",
      "03 Cryptographic Retrieval",
      "04 Defensible Briefing"
    ],
    "cards": [
      {
        "title": "Statutory Policy Q&A",
        "desc": "Provides defensible answers to public policy queries citing specific legislation acts and ministerial directives."
      },
      {
        "title": "Building Plan & Permit Verification",
        "desc": "Cross-checks architectural submissions against municipal planning and zoning codes."
      },
      {
        "title": "Air-Gapped Sovereign Runtime",
        "desc": "Deployed on bare metal or private sovereign VPC with zero egress traffic and zero cross-tenant retention."
      },
      {
        "title": "Need-to-Know Compartment Access",
        "desc": "Enforces strict security clearance boundaries across historical archives and cabinet records."
      }
    ]
  }
] as const;
