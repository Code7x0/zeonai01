/**
 * Illustrative AI Workspace system surface — product storytelling, not live data.
 * Labels mirror approved platform language (documents, access, agents, review, ERP).
 */
export function SystemPanel() {
  return (
    <div className="zn-arch" aria-label="AI Workspace reference architecture">
      <div className="zn-arch-top">
        <span className="zn-accent">AI WORKSPACE · SYSTEM VIEW</span>
        <span>ILLUSTRATIVE · NOT LIVE</span>
      </div>
      <div className="zn-arch-hr" />

      <div className="zn-arch-status">
        <span className="zn-pill is-live">Governed runtime</span>
        <span className="zn-pill">Access checked before retrieval</span>
        <span className="zn-pill">Audit on every action</span>
      </div>

      <div className="zn-pipeline" aria-hidden>
        {(
          [
            ["01", "Documents", "Drive · inbox · ERP"],
            ["02", "Ask AI", "Cited answers"],
            ["03", "Agents", "Extract · route"],
            ["04", "Review", "Human on exceptions"],
            ["05", "ERP", "Post after approval"],
          ] as const
        ).map(([n, t, s], i, arr) => (
          <div key={n} className="zn-pipe-step">
            <div className="zn-pipe-card">
              <span className="zn-pipe-n">{n}</span>
              <strong>{t}</strong>
              <em>{s}</em>
            </div>
            {i < arr.length - 1 ? <span className="zn-pipe-arrow">→</span> : null}
          </div>
        ))}
      </div>

      <div className="zn-runtime">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sites/zeonai/figma/cpu.svg"
          alt=""
          width={30}
          height={30}
        />
        <div>
          <h4>Domain intelligence</h4>
          <p>MODEL + RETRIEVAL + ORCHESTRATION · ROLE-GATED</p>
        </div>
        <span className="fn">ƒ(x)</span>
      </div>

      <div className="zn-boundary">POLICY · TOOL BOUNDARIES · HUMAN APPROVAL</div>

      <div className="zn-metrics" aria-label="Illustrative sample metrics">
        <div>
          <strong>Cited</strong>
          <span>Every claim grounded in a source the user can open</span>
        </div>
        <div>
          <strong>Exceptions</strong>
          <span>Routed to people before anything posts to the ERP</span>
        </div>
        <div>
          <strong>Audit</strong>
          <span>Read-only log with actor and timestamp — not bolted on</span>
        </div>
      </div>

      <div className="zn-assure">
        {(
          [
            ["01 / CONTROL", "Evaluate"],
            ["02 / CONTROL", "Observe"],
            ["03 / CONTROL", "Review"],
          ] as const
        ).map(([k, t]) => (
          <article key={t}>
            <span>{k}</span>
            <strong>{t}</strong>
          </article>
        ))}
      </div>

      <div className="zn-arch-foot">
        <span>↺ FEEDBACK INTO THE WORKSPACE</span>
        <span>CONTROLLED RELEASE →</span>
      </div>
    </div>
  );
}
