/**
 * Featured-panel workflow rail — step labels from verified sector.steps.
 */
export function SectorSteps({ steps }: { steps: readonly string[] }) {
  return (
    <div className="aid-ind-steps" aria-hidden>
      <span className="aid-ind-steps-rail" />
      <ol className="aid-ind-steps-list">
        {steps.map((step) => (
          <li key={step}>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
