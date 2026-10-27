import { zeonTrust } from "@/lib/zeonai/content";

export function Trust() {
  return (
    <section
      className="zn-sec zn-sec-alt"
      id={zeonTrust.id}
      aria-labelledby="zn-trust-title"
    >
      <div className="zn-wrap">
        <div className="zn-sec-head">
          <h2 id="zn-trust-title" className="zn-h2">
            {zeonTrust.title}
          </h2>
          <p className="zn-lead">{zeonTrust.lead}</p>
        </div>

        <div className="zn-trust-grid">
          {zeonTrust.accessSteps.map((s) => (
            <article key={s.n} className="zn-trust-item">
              <h3 className="zn-h3">
                {s.n}. {s.title}
              </h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>

        <div className="zn-console" style={{ marginTop: "1.5rem" }}>
          <div className="zn-console-bar">
            <span className="zn-console-meta">{zeonTrust.audit.path}</span>
            <span className="zn-sample">{zeonTrust.audit.sampleLabel}</span>
          </div>
          <div className="zn-console-body" aria-label={zeonTrust.audit.ariaLabel}>
            <div className="zn-pipe">
              {zeonTrust.audit.sets[0].entries.map((e) => (
                <div key={e.meta + e.body} className="zn-pipe-step">
                  <span className="zn-pipe-num">·</span>
                  <span className="zn-pipe-title">{e.body}</span>
                  <span className="zn-pipe-state">{e.meta}</span>
                </div>
              ))}
            </div>
            <p className="zn-note">{zeonTrust.roleNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
