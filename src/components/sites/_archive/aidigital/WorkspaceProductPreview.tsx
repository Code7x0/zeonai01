import type { ZeonWorkspaceProduct } from "@/lib/zeonai/content";

/** Mini product UI inspired by zeonai-website-preview hero capability scenes — black + blue. */
export function WorkspaceProductPreview({
  kind,
  title,
  large = false,
}: {
  kind: ZeonWorkspaceProduct["visual"];
  title: string;
  large?: boolean;
}) {
  return (
    <div className={`aid-ws-preview${large ? " is-large" : ""}`}>
      <div className="aid-ws-preview-chrome">
        <p className="aid-ws-preview-path">
          ZeonAI platform / AI Workspace /{" "}
          <span>{title}</span>
        </p>
        <span className="aid-ws-preview-sample">Sample data</span>
      </div>
      <div className="aid-ws-preview-body">
        {kind === "ask" && <AskPreview />}
        {kind === "agents" && <AgentsPreview />}
        {kind === "apps" && <AppsPreview />}
        {kind === "dashboards" && <DashPreview />}
        {kind === "workflows" && <FlowPreview />}
        {kind === "contract" && <ContractPreview />}
      </div>
    </div>
  );
}

function AskPreview() {
  return (
    <div className="aid-ws-ask">
      <div className="aid-ws-ask-user">
        What approval do I need for capital spend above budget?
      </div>
      <div className="aid-ws-ask-bot">
        <p className="aid-ws-ask-meta">
          <span className="aid-ws-dot" />
          AI assistant · Finance manager
        </p>
        <p>
          Spend above the approved budget needs CFO sign-off once it passes the
          delegated limit.
        </p>
        <ul className="aid-ws-ask-cites">
          <li>
            <span>1</span> Capital expenditure policy v4.pdf
          </li>
          <li>
            <span>2</span> Delegation of authority.docx
          </li>
        </ul>
      </div>
    </div>
  );
}

function AgentsPreview() {
  const agents = [
    "Invoice processing",
    "Partner billing",
    "Bank-ERP match",
    "KYC intelligence",
    "Credit scoring",
    "Fund analysis",
  ];
  return (
    <div className="aid-ws-agents">
      <div className="aid-ws-agents-wall">
        {agents.map((a) => (
          <span key={a} className="aid-ws-agent-chip">
            {a}
          </span>
        ))}
      </div>
      <div className="aid-ws-agents-stat">
        <strong>50+</strong>
        <span>agents in portfolio</span>
      </div>
    </div>
  );
}

function AppsPreview() {
  const apps = [
    "Assisted Benefits Builder",
    "Assisted Maintenance Planner",
    "Training Assistant",
    "Voice Timesheet",
  ];
  return (
    <div className="aid-ws-apps">
      <div className="aid-ws-apps-head">
        <span>Apps for your role</span>
        <span className="aid-ws-mono">6 apps</span>
      </div>
      <div className="aid-ws-apps-grid">
        {apps.map((app) => (
          <div key={app} className="aid-ws-app-tile">
            <span className="aid-ws-app-name">{app}</span>
            <span className="aid-ws-app-status">Available</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashPreview() {
  const bars = [42, 58, 51, 72, 64, 88, 76];
  return (
    <div className="aid-ws-dash">
      <div className="aid-ws-dash-head">
        <span>Procurement overview</span>
        <div className="aid-ws-dash-tags">
          <span>Excel</span>
          <span>Database</span>
        </div>
      </div>
      <div className="aid-ws-dash-metrics">
        <div>
          <strong>AUD 4.8m</strong>
          <span>Spend this quarter</span>
        </div>
        <div>
          <strong>312</strong>
          <span>Open invoices</span>
        </div>
        <div>
          <strong>3.1d</strong>
          <span>Avg approval</span>
        </div>
      </div>
      <div className="aid-ws-dash-chart" aria-hidden>
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function FlowPreview() {
  const steps = ["Ingest", "Extract", "Match", "Rules", "Approve", "Post"];
  return (
    <div className="aid-ws-flow">
      <div className="aid-ws-flow-head">
        <span>Supplier invoice workflow</span>
        <span className="aid-ws-flow-run">Running</span>
      </div>
      <div className="aid-ws-flow-steps">
        {steps.map((s, i) => (
          <div key={s} className={`aid-ws-flow-step${i === 4 ? " is-active" : ""}`}>
            <span>{i + 1}</span>
            <em>{s}</em>
          </div>
        ))}
      </div>
      <div className="aid-ws-flow-note">
        <strong>FA</strong>
        <span>Finance approver · Reviews flagged exceptions</span>
      </div>
    </div>
  );
}

function ContractPreview() {
  return (
    <div className="aid-ws-contract">
      <div className="aid-ws-contract-doc">
        <div className="aid-ws-contract-file">
          <span className="aid-ws-contract-icon">PDF</span>
          <div>
            <strong>Supplier-agreement-v3.pdf</strong>
            <span>From AI Drive, Legal</span>
          </div>
        </div>
        <ul>
          <li>
            <span>Renewal</span>
            Auto-renew · 90 days notice
          </li>
          <li>
            <span>Payment</span>
            Payable within 45 days
          </li>
          <li className="is-flag">
            <span>Liability</span>
            Cap flagged for review
          </li>
        </ul>
      </div>
      <div className="aid-ws-contract-side">
        <p>Risk flags</p>
        <div className="aid-ws-contract-risk">Liability cap above policy</div>
      </div>
    </div>
  );
}
