import { delegationNote, delegationStatuses } from "@/lib/zeonai/engineering-visuals";

/** Case holder keeps ownership; task status timeline (preview). */
export function DelegationVisual() {
  return (
    <figure className="aid-eng-visual aid-eng-deleg" aria-label="Delegation and task status">
      <div className="aid-eng-deleg-case" data-eng-stage>
        <div>
          <span className="aid-eng-pipe-kicker">case</span>
          <span className="aid-eng-pipe-title">Invoice #4821</span>
        </div>
        <div>
          <span className="aid-eng-pipe-kicker">holder</span>
          <span className="aid-eng-pipe-title">Finance manager</span>
        </div>
      </div>
      <ol className="aid-eng-timeline">
        {delegationStatuses.map((s, i) => (
          <li key={s} data-eng-stage>
            <span className="aid-eng-timeline-dot" aria-hidden />
            <span className="aid-eng-timeline-label">{s}</span>
            {i < delegationStatuses.length - 1 ? (
              <span className="aid-eng-timeline-line" aria-hidden data-eng-line />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="aid-eng-mono-note" data-eng-stage>
        {delegationNote}
      </p>
    </figure>
  );
}
