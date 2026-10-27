import { pdfConfig, spreadsheetConfig } from "@/lib/zeonai/engineering-visuals";

/** Spreadsheet + PDF configuration panels from the ZeonAI preview. */
export function DocConfigVisual() {
  return (
    <figure
      className="aid-eng-visual aid-eng-doc"
      aria-label="Document processing configuration examples"
    >
      <div className="aid-eng-panel" data-eng-stage>
        <header className="aid-eng-panel-head">
          <span className="aid-eng-panel-tag">{spreadsheetConfig.title}</span>
          <dl className="aid-eng-meta">
            {spreadsheetConfig.meta.map((m) => (
              <div key={m.key}>
                <dt>{m.key}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>
        <table className="aid-eng-table">
          <caption className="sr-only">Spreadsheet column configuration</caption>
          <thead>
            <tr>
              <th scope="col">column</th>
              <th scope="col">label</th>
              <th scope="col">type</th>
            </tr>
          </thead>
          <tbody>
            {spreadsheetConfig.columns.map((c) => (
              <tr key={c.label}>
                <td>{c.label}</td>
                <td>{c.hint}</td>
                <td>
                  <code>{c.type}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="aid-eng-panel" data-eng-stage>
        <header className="aid-eng-panel-head">
          <span className="aid-eng-panel-tag">{pdfConfig.title}</span>
          <dl className="aid-eng-meta">
            {pdfConfig.meta.map((m) => (
              <div key={m.key}>
                <dt>{m.key}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>
        <p className="aid-eng-panel-label">extraction</p>
        <ul className="aid-eng-chips">
          {pdfConfig.extraction.map((mode) => (
            <li key={mode}>{mode}</li>
          ))}
        </ul>
        <p className="aid-eng-mono-note">
          merge_adjacent: <strong>{String(pdfConfig.mergeAdjacent)}</strong>
        </p>
      </div>
    </figure>
  );
}
