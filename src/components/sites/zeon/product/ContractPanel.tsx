const fields = [
  ["Counterparty", "Northbridge Services Pty Ltd"],
  ["Term", "24 months"],
  ["Auto-renewal", "Yes · 60-day notice"],
  ["Liability cap", "12× annual fees"],
  ["Risk flags", "2 clauses for review"],
] as const;

/** Illustrative Contract Intelligence — sample extraction only. */
export function ContractPanel() {
  return (
    <div className="zn-ui" aria-label="Contract Intelligence sample">
      <div className="zn-ui-bar">
        <span>Contract Intelligence</span>
        <span className="zn-ui-tag">SAMPLE · NOT LIVE</span>
      </div>
      <div className="zn-contract">
        <div className="zn-contract-doc">
          <span className="zn-ui-label">Document</span>
          <strong>Master Services Agreement — draft</strong>
          <p>
            Term, renewal, and liability language extracted for human review
            before anyone acts on the contract.
          </p>
        </div>
        <dl className="zn-contract-fields">
          {fields.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="zn-ui-note">
        Risk flags surface before action. People approve what matters.
      </p>
    </div>
  );
}
