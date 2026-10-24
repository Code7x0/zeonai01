import type { CSSProperties } from "react";
import type { ZeonCapabilityVisual } from "@/lib/zeonai/content";

/**
 * Light editorial product canvas — paper surfaces, cobalt interaction,
 * fine borders. Sample-data only; no ambient particles / WebGL.
 */
export function CapabilityStage({
  kind,
  title,
}: {
  kind: ZeonCapabilityVisual;
  title: string;
}) {
  return (
    <figure className="aid-obs-stage" data-kind={kind}>
      <div className="aid-obs-chrome">
        <p className="aid-obs-path">
          ZeonAI platform / AI Workspace /{" "}
          <span data-cap-label>{title}</span>
        </p>
        <span className="aid-obs-sample">Sample data</span>
      </div>
      <div className="aid-obs-body" data-stage-body>
        {kind === "ask" && <AskScene />}
        {kind === "drive" && <DriveScene />}
        {kind === "workflows" && <WorkflowScene />}
        {kind === "dashboards" && <DashScene />}
        {kind === "contract" && <ContractScene />}
        {kind === "opportunity" && <OpportunityScene />}
        {kind === "quote" && <QuoteScene />}
        {kind === "apps" && <AppsScene />}
        {kind === "agents" && <AgentsScene />}
      </div>
    </figure>
  );
}

function AskScene() {
  return (
    <div className="aid-obs-ask">
      <div className="aid-obs-ask-user" data-rise>
        What approval do I need for capital spend above budget?
      </div>
      <div className="aid-obs-ask-bot" data-rise data-sig="reply">
        <p className="aid-obs-ask-meta">
          <span className="aid-obs-dot" />
          AI assistant · Finance manager
        </p>
        <p data-rise>
          Spend above the approved budget needs CFO sign-off once it passes the
          delegated limit. Raise a variation request in Workflows and attach the
          revised business case.
        </p>
        <ul className="aid-obs-cites">
          <li data-rise data-sig="cite">
            <span>1</span>
            <div>
              <strong>Capital expenditure policy v4.pdf</strong>
              <em>AI Drive, Finance only</em>
            </div>
          </li>
          <li data-rise data-sig="cite">
            <span>2</span>
            <div>
              <strong>Delegation of authority.docx</strong>
              <em>AI Drive, v12</em>
            </div>
          </li>
        </ul>
        <p className="aid-obs-ask-note" data-rise>
          2 matching documents not shown: outside your access
        </p>
      </div>
    </div>
  );
}

function DriveScene() {
  const files = [
    { name: "Supplier master agreement.pdf", meta: "v7 · Indexed", access: "Confidential" },
    { name: "Services order form.docx", meta: "v3 · Indexed", access: "Internal" },
    { name: "Data processing addendum.pdf", meta: "v2 · Indexing", access: "Confidential" },
  ];
  return (
    <div className="aid-obs-drive">
      <div className="aid-obs-drive-list">
        <div className="aid-obs-drive-head" data-rise>
          <span>AI Drive / Legal / Contracts</span>
          <span className="aid-obs-mono">Upload documents</span>
        </div>
        <ul>
          {files.map((f, i) => (
            <li
              key={f.name}
              className={i === 0 ? "is-selected" : undefined}
              data-rise
              data-sig={i === 0 ? "file" : undefined}
            >
              <strong>{f.name}</strong>
              <span>
                {f.meta} · {f.access}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="aid-obs-drive-meta" data-rise data-sig="meta">
        <p className="aid-obs-label">Selected file</p>
        <strong>Supplier master agreement.pdf</strong>
        <dl>
          <div>
            <dt>Owner</dt>
            <dd>Legal operations</dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>Legal, Procurement</dd>
          </div>
          <div>
            <dt>Rights</dt>
            <dd>View only, no download</dd>
          </div>
          <div>
            <dt>Index</dt>
            <dd>Searchable by Ask AI</dd>
          </div>
        </dl>
        <p className="aid-obs-label">Lineage</p>
        <ol className="aid-obs-lineage">
          <li data-rise>v5 Drafted</li>
          <li data-rise>v6 Reviewed by legal</li>
          <li className="is-current" data-rise data-sig="lineage">
            v7 Approved, current
          </li>
        </ol>
      </aside>
    </div>
  );
}

function WorkflowScene() {
  const steps = [
    { n: 1, label: "Ingest", kind: "auto" },
    { n: 2, label: "Extract", kind: "auto" },
    { n: 3, label: "Match", kind: "auto" },
    { n: 4, label: "Rules", kind: "auto" },
    { n: 5, label: "Approve", kind: "human" },
    { n: 6, label: "Post", kind: "auto" },
  ] as const;
  return (
    <div className="aid-obs-flow">
      <div className="aid-obs-flow-head" data-rise>
        <span>Supplier invoice workflow</span>
        <span className="aid-obs-pill">Running</span>
      </div>
      <div className="aid-obs-flow-track" aria-hidden>
        <svg viewBox="0 0 360 8" className="aid-obs-flow-path">
          <path
            data-sig="path"
            d="M4 4 H356"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="4 3"
          />
        </svg>
      </div>
      <div className="aid-obs-flow-steps">
        {steps.map((s) => (
          <div
            key={s.n}
            className={`aid-obs-flow-step${s.kind === "human" ? " is-human" : ""}${s.n === 5 ? " is-active" : ""}`}
            data-rise
            data-sig="step"
          >
            <span>{s.n}</span>
            <em>{s.label}</em>
            {s.kind === "human" ? <i>Human</i> : null}
          </div>
        ))}
      </div>
      <div className="aid-obs-flow-note" data-rise data-sig="human">
        <strong>FA</strong>
        <span>Finance approver · Reviews the flagged exceptions</span>
      </div>
    </div>
  );
}

function DashScene() {
  const bars = [42, 58, 51, 72, 64, 88, 76];
  return (
    <div className="aid-obs-dash">
      <div className="aid-obs-dash-head" data-rise>
        <span>Procurement overview</span>
        <div className="aid-obs-tags">
          <span>Excel</span>
          <span>Database</span>
        </div>
      </div>
      <div className="aid-obs-metrics">
        <div data-rise>
          <strong>AUD 4.8m</strong>
          <span>Spend this quarter</span>
        </div>
        <div data-rise>
          <strong>312</strong>
          <span>Open invoices</span>
        </div>
        <div data-rise>
          <strong>3.1d</strong>
          <span>Avg approval</span>
        </div>
      </div>
      <div className="aid-obs-chart" aria-hidden>
        {bars.map((h, i) => (
          <i
            key={i}
            data-sig="bar"
            style={{ "--h": `${h}%` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function ContractScene() {
  return (
    <div className="aid-obs-contract">
      <div className="aid-obs-contract-doc">
        <div className="aid-obs-contract-file" data-rise>
          <span className="aid-obs-file-icon">PDF</span>
          <div>
            <strong>Supplier-agreement-v3.pdf</strong>
            <span>From AI Drive, Legal</span>
          </div>
        </div>
        <ul>
          <li data-rise>
            <span>Term</span>
            36 months from the effective date
          </li>
          <li data-rise>
            <span>Renewal</span>
            Auto-renew · 90 days notice
          </li>
          <li data-rise>
            <span>Payment</span>
            Payable within 45 days
          </li>
          <li className="is-flag" data-rise data-sig="flag">
            <span>Liability</span>
            Cap flagged for review
          </li>
        </ul>
      </div>
      <aside className="aid-obs-contract-side" data-rise>
        <p className="aid-obs-label">Risk flags</p>
        <div className="aid-obs-risk" data-rise data-sig="risk">
          Liability cap above policy
        </div>
        <div className="aid-obs-risk" data-rise data-sig="risk">
          Auto-renewal needs legal review
        </div>
      </aside>
    </div>
  );
}

function OpportunityScene() {
  const stages = [
    { name: "New", count: 2, items: ["Road resurfacing tender", "Depot maintenance panel"] },
    { name: "Qualifying", count: 1, items: ["Water main renewal"] },
    { name: "Pursue", count: 1, items: ["Bridge inspection works"], highlight: true },
    { name: "Quoted", count: 1, items: ["Footpath upgrade"] },
  ];
  return (
    <div className="aid-obs-pipe">
      <div className="aid-obs-pipe-head" data-rise>
        <span>Opportunity pipeline</span>
        <span className="aid-obs-mono">Scanner found 2 new tenders today</span>
      </div>
      <div className="aid-obs-pipe-cols">
        {stages.map((col) => (
          <div
            key={col.name}
            className={`aid-obs-pipe-col${col.highlight ? " is-hot" : ""}`}
            data-rise
          >
            <header>
              <strong>{col.name}</strong>
              <span>{col.count}</span>
            </header>
            <ul>
              {col.items.map((item) => (
                <li key={item} data-rise data-sig={col.highlight ? "card" : undefined}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteScene() {
  const lines = [
    { item: "Site survey", qty: "1", aud: "2,400" },
    { item: "Materials, from your price library", qty: "1", aud: "18,750" },
    { item: "Labour, 6 crew days", qty: "6", aud: "9,600" },
    { item: "Delivery and setup", qty: "1", aud: "1,850" },
  ];
  return (
    <div className="aid-obs-quote">
      <div className="aid-obs-quote-head" data-rise>
        <div>
          <strong>Quote Q-1042 / Sample Council</strong>
          <span className="aid-obs-pill is-muted">Draft</span>
        </div>
      </div>
      <table className="aid-obs-quote-table">
        <thead>
          <tr data-rise>
            <th>Line item</th>
            <th>Qty</th>
            <th>AUD</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((row) => (
            <tr key={row.item} data-rise data-sig="line">
              <td>{row.item}</td>
              <td>{row.qty}</td>
              <td>{row.aud}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="aid-obs-quote-foot" data-rise data-sig="total">
        <span>Total</span>
        <strong>AUD 32,600</strong>
      </div>
      <div className="aid-obs-flow-note" data-rise>
        <strong>PA</strong>
        <span>Pricing approver · Reviews margin and terms</span>
      </div>
    </div>
  );
}

function AppsScene() {
  const apps = [
    { name: "Assisted Benefits Builder", status: "Available", selected: true },
    { name: "Assisted Maintenance Planner", status: "Available" },
    { name: "Training Assistant", status: "Available" },
    { name: "Voice Timesheet", status: "Available" },
    { name: "Grant Acquittal", status: "Coming soon" },
    { name: "Document Assessment", status: "Coming soon" },
  ];
  return (
    <div className="aid-obs-apps">
      <div className="aid-obs-apps-head" data-rise>
        <span>Apps for your role</span>
        <span className="aid-obs-mono">6 apps</span>
      </div>
      <div className="aid-obs-apps-grid">
        {apps.map((app) => (
          <div
            key={app.name}
            className={`aid-obs-app${app.selected ? " is-selected" : ""}`}
            data-rise
            data-sig={app.selected ? "selected" : "tile"}
          >
            <strong>{app.name}</strong>
            <span>{app.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentsScene() {
  const agents = [
    "Invoice processing",
    "Partner billing",
    "Bank-ERP match",
    "KYC intelligence",
    "Credit scoring",
    "Fund analysis",
  ];
  const steps = ["Ingest", "Extract", "Validate", "Output"];
  return (
    <div className="aid-obs-agents">
      <div className="aid-obs-agents-wall" data-rise>
        {agents.map((a) => (
          <span key={a} className="aid-obs-chip" data-rise data-sig="chip">
            {a}
          </span>
        ))}
      </div>
      <div className="aid-obs-agents-detail" data-rise data-sig="parent">
        <div className="aid-obs-agents-parent">
          <strong>Invoice processing</strong>
          <span>Parent agent</span>
        </div>
        <div className="aid-obs-agents-steps">
          {steps.map((s, i) => (
            <div key={s} className="aid-obs-agents-step" data-rise data-sig="node">
              <span>{i + 1}</span>
              <em>{s}</em>
            </div>
          ))}
        </div>
      </div>
      <div className="aid-obs-agents-stat" data-rise>
        <strong>50+</strong>
        <span>agents in portfolio</span>
      </div>
    </div>
  );
}
