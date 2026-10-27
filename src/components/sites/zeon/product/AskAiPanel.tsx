/** Illustrative Ask AI / DeepProbe-style workspace — sample data only. */
export function AskAiPanel() {
  return (
    <div className="zn-ui" aria-label="Ask AI sample interface">
      <div className="zn-ui-bar">
        <span>AI Workspace · Ask AI</span>
        <span className="zn-ui-tag">SAMPLE · NOT LIVE</span>
      </div>
      <div className="zn-ui-ask">
        <div className="zn-ui-q">
          <span className="zn-ui-label">Question</span>
          <p>
            What does our procurement policy say about supplier onboarding for
            amounts above AUD 50,000?
          </p>
        </div>
        <div className="zn-ui-a">
          <span className="zn-ui-label">Answer</span>
          <p>
            For spend above AUD 50,000, suppliers must complete KYC, provide
            insurance certificates, and receive legal review before a purchase
            order is issued. Two approvers are required in Finance and
            Procurement.
          </p>
          <ul className="zn-ui-cites">
            <li>
              <strong>Procurement Policy v4.2</strong>
              <span>PDF · Finance · Updated Mar 2025</span>
            </li>
            <li>
              <strong>Supplier Onboarding SOP</strong>
              <span>PDF · Procurement · Restricted</span>
            </li>
          </ul>
          <p className="zn-ui-note">
            Access rules applied before retrieval. Two related files were
            withheld outside this persona’s permissions.
          </p>
        </div>
      </div>
    </div>
  );
}
