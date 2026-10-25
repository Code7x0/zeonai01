import { accessOverride, accessTiers } from "@/lib/zeonai/engineering-visuals";

/** Visibility tiers table from the ZeonAI preview. */
export function AccessVisual() {
  return (
    <figure className="aid-eng-visual" aria-label="Roles and visibility tiers">
      <div className="aid-eng-panel" data-eng-stage>
        <table className="aid-eng-table aid-eng-table--tiers">
          <caption className="sr-only">Who can see and act on each visibility tier</caption>
          <thead>
            <tr>
              <th scope="col">tier</th>
              <th scope="col">who can see it</th>
              <th scope="col">who can act</th>
            </tr>
          </thead>
          <tbody>
            {accessTiers.map((row) => (
              <tr key={row.tier}>
                <th scope="row">{row.tier}</th>
                <td>{row.see}</td>
                <td>{row.act}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="aid-eng-mono-note" data-eng-stage>
          {accessOverride}
        </p>
      </div>
    </figure>
  );
}
