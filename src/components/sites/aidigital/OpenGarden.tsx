import { zeonEngineering, zeonTrust } from "@/lib/zeonai/content";

/**
 * Section 03 Engineering (simple white) + Trust / governance.
 */
export function OpenGarden() {
  return (
    <>
      <section
        id={zeonEngineering.id}
        className="relative overflow-hidden bg-white py-16 md:py-24"
        aria-labelledby="engineering-title"
      >
        <div className="aid-container">
          <header className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-[var(--aid-blue)] uppercase">
              {zeonEngineering.eyebrow}
            </p>
            <h2
              id="engineering-title"
              className="aid-heading mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] text-[var(--aid-blue)]"
            >
              {zeonEngineering.title}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.5] text-[var(--aid-ink)]">
              {zeonEngineering.lead}
            </p>
          </header>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {zeonEngineering.pieces.map((piece) => (
              <li
                key={piece.num}
                className="border-t border-black/10 pt-5"
              >
                <p className="font-mono text-[0.75rem] tracking-[0.08em] text-[var(--aid-grey)]">
                  {piece.num} · {piece.label}
                </p>
                <h3 className="aid-heading mt-2 text-[1.125rem] text-[var(--aid-blue)] md:text-[1.25rem]">
                  {piece.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.5] text-[var(--aid-ink)]">
                  {piece.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id={zeonTrust.id}
        className="relative overflow-hidden bg-[#f9f9f9] py-16 md:py-24"
      >
        <div className="aid-container">
          <div className="rounded-2xl bg-[var(--aid-blue)] p-6 text-white md:p-10">
            <p className="text-xs font-semibold tracking-wide text-[var(--aid-lime)] uppercase">
              {zeonTrust.eyebrow}
            </p>
            <h3 className="aid-heading mt-2 text-[clamp(1.5rem,3vw,2.25rem)] text-white">
              {zeonTrust.title}
            </h3>
            <p className="mt-3 max-w-3xl text-[0.9375rem] leading-[1.45] text-white/90">
              {zeonTrust.lead}
            </p>
            <h4 className="mt-8 text-sm font-semibold tracking-wide text-[var(--aid-lime)] uppercase">
              {zeonTrust.accessTitle}
            </h4>
            <ul className="mt-3 flex flex-col gap-2 text-[0.875rem] text-white/90 md:text-[0.9375rem]">
              {zeonTrust.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--aid-lime)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-[0.875rem] leading-[1.45] text-white/85">
              {zeonTrust.governedNote}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 md:p-10">
            <h3 className="aid-heading text-[clamp(1.35rem,2.5vw,1.85rem)] text-[var(--aid-blue)]">
              {zeonTrust.securityTitle}
            </h3>
            <p className="mt-3 max-w-3xl text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)]">
              {zeonTrust.securityLead}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {zeonTrust.certifications.map((c) => (
                <div
                  key={c.name}
                  className="rounded-xl border border-black/5 bg-[var(--aid-bg)] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[var(--aid-blue)]">
                    {c.name}
                  </p>
                  <p className="text-xs text-[var(--aid-grey)]">{c.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {zeonTrust.securityPoints.map((item) => (
                <article key={item.title}>
                  <h4 className="text-sm font-semibold text-[var(--aid-blue)]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[0.875rem] leading-[1.45] text-[var(--aid-ink)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-sm font-semibold text-[var(--aid-blue)]">
                Deployment options
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {zeonTrust.deployments.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-[var(--aid-blue)]/15 px-3 py-1 text-xs font-medium text-[var(--aid-blue)]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
