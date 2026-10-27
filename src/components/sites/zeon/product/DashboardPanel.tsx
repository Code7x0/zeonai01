/** Illustrative AI Dashboard figures from preview — labelled sample data. */
export function DashboardPanel() {
  const bars = [42, 58, 51, 67, 72, 64, 78, 70, 82, 76, 88, 84];
  return (
    <div className="zn-ui" aria-label="AI Dashboard sample">
      <div className="zn-ui-bar">
        <span>AI Dashboards · Procurement</span>
        <span className="zn-ui-tag">SAMPLE DATA · NOT CUSTOMER RESULTS</span>
      </div>
      <div className="zn-dash-kpis">
        {(
          [
            ["AUD 4.8M", "Quarterly spend"],
            ["312", "Open invoices"],
            ["3.1 days", "Avg approval time"],
            ["38", "Exceptions"],
          ] as const
        ).map(([v, l]) => (
          <div key={l}>
            <strong>{v}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <div className="zn-dash-chart" aria-hidden>
        <div className="zn-dash-bars">
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <p>Spend trend · illustrative</p>
      </div>
      <div className="zn-dash-meta">
        <span>Sources: Excel · ERP extract</span>
        <span>Role-gated · Finance</span>
      </div>
    </div>
  );
}
