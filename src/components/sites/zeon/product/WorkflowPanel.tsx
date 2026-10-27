const steps = [
  { n: "01", label: "Invoice received", state: "done" },
  { n: "02", label: "Fields extracted", state: "done" },
  { n: "03", label: "PO matched", state: "done" },
  { n: "04", label: "Rules validated", state: "active" },
  { n: "05", label: "Human approval", state: "next" },
  { n: "06", label: "ERP posting", state: "next" },
] as const;

/** Illustrative invoice workflow — DeepDelve InvoiceAI / AI Workspace pattern. */
export function WorkflowPanel() {
  return (
    <div className="zn-ui" aria-label="Invoice workflow sample">
      <div className="zn-ui-bar">
        <span>Workflows · Invoice processing</span>
        <span className="zn-ui-tag">SAMPLE · NOT LIVE</span>
      </div>
      <div className="zn-flow">
        {steps.map((s, i) => (
          <div key={s.n} className={`zn-flow-step is-${s.state}`}>
            <div className="zn-flow-card">
              <span>{s.n}</span>
              <strong>{s.label}</strong>
            </div>
            {i < steps.length - 1 ? <i aria-hidden>→</i> : null}
          </div>
        ))}
      </div>
      <div className="zn-flow-detail">
        <div>
          <span className="zn-ui-label">Exception</span>
          <p>Line 3 quantity differs from PO by 2 units — routed to Finance.</p>
        </div>
        <div>
          <span className="zn-ui-label">Holder</span>
          <p>Finance manager · audit log open</p>
        </div>
      </div>
    </div>
  );
}
