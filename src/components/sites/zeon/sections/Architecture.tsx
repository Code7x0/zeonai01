"use client";

import { useState } from "react";
import { zeonArchitecture } from "@/lib/zeonai/content";

export function Architecture() {
  const [active, setActive] = useState(0);
  const layer = zeonArchitecture.layers[active];

  return (
    <section
      className="zn-sec"
      id={zeonArchitecture.id}
      aria-labelledby="zn-arch-title"
    >
      <div className="zn-wrap">
        <div className="zn-sec-head">
          <h2 id="zn-arch-title" className="zn-h2">
            {zeonArchitecture.title}
          </h2>
          <p className="zn-lead">{zeonArchitecture.lead}</p>
          <p className="zn-body">{zeonArchitecture.note}</p>
        </div>

        <div className="zn-arch">
          <div
            className="zn-arch-list"
            role="tablist"
            aria-label="Architecture layers"
          >
            {zeonArchitecture.layers.map((l, i) => (
              <button
                key={l.num}
                type="button"
                role="tab"
                className="zn-arch-btn"
                aria-selected={active === i}
                onClick={() => setActive(i)}
              >
                <span className="zn-arch-num">Layer {l.num}</span>
                <span className="zn-arch-title">{l.title}</span>
                <span className="zn-arch-callout">{l.callout}</span>
              </button>
            ))}
          </div>

          <div className="zn-arch-panel" role="tabpanel">
            <h3 className="zn-h3">{layer.title}</h3>
            <p className="zn-body" style={{ marginTop: "0.75rem" }}>
              {layer.body}
            </p>
            <div className="zn-arch-points">
              {layer.points.map((p) => (
                <div key={p.label} className="zn-arch-point">
                  <strong>{p.label}</strong>
                  <span>{p.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
