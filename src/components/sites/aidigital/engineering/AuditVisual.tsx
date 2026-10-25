import { auditEntries } from "@/lib/zeonai/engineering-visuals";

/** Read-only activity log entries from the ZeonAI preview. */
export function AuditVisual() {
  return (
    <figure className="aid-eng-visual" aria-label="Activity log">
      <div className="aid-eng-panel" data-eng-stage>
        <header className="aid-eng-panel-head">
          <span className="aid-eng-panel-tag">activity log</span>
          <span className="aid-eng-badge">read only</span>
        </header>
        <ol className="aid-eng-log">
          {auditEntries.map((e) => (
            <li key={`${e.time}-${e.event}`} data-eng-stage>
              <time dateTime={e.time}>{e.time}</time>
              <code>{e.event}</code>
              <span>by {e.actor}</span>
            </li>
          ))}
        </ol>
        <p className="aid-eng-mono-note">
          Watchers notified in-app and by email · cannot act on the case
        </p>
      </div>
    </figure>
  );
}
