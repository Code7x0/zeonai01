"use client";

import { useState } from "react";
import { zeonIndustries } from "@/lib/zeonai/content";

export function Industries() {
  const [active, setActive] = useState(0);
  const sector = zeonIndustries.sectors[active];

  return (
    <section
      className="zn-sec"
      id={zeonIndustries.id}
      aria-labelledby="zn-ind-title"
    >
      <div className="zn-wrap">
        <div className="zn-sec-head">
          <h2 id="zn-ind-title" className="zn-h2">
            {zeonIndustries.title}
          </h2>
          <p className="zn-lead">{zeonIndustries.lead}</p>
        </div>

        <div
          className="zn-ind-tabs"
          role="tablist"
          aria-label="Industry workspaces"
        >
          {zeonIndustries.sectors.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              className="zn-ind-tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="zn-ind-panel" role="tabpanel">
          <h3 className="zn-h3">{sector.title}</h3>
          <p className="zn-body" style={{ marginTop: "0.55rem" }}>
            {sector.body}
          </p>
          <p className="zn-note">{sector.runsOn.replace(/ · /g, ", ")}</p>
          <div className="zn-ind-cards">
            {sector.agents.map((a) => (
              <article key={a.name} className="zn-ind-card">
                <h3 className="zn-h3" style={{ fontSize: "1rem" }}>
                  {a.name}
                </h3>
                <p>{a.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
