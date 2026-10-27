"use client";

import { useState } from "react";
import { zeonArchitecture } from "@/lib/zeonai/content";

/** Interactive six-layer platform architecture from verified preview content. */
export function ArchitecturePanel() {
  const [active, setActive] = useState(0);
  const layer = zeonArchitecture.layers[active] ?? zeonArchitecture.layers[0];

  return (
    <div className="zn-arch-live">
      <div className="zn-layers" role="tablist" aria-label="Architecture layers">
        {zeonArchitecture.layers.map((l, i) => (
          <button
            key={l.num}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`zn-layer${i === active ? " is-on" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="zn-layer-num">{l.num}</span>
            <span>
              <strong>{l.title}</strong>
              <em>{l.callout}</em>
            </span>
          </button>
        ))}
      </div>
      <div className="zn-layer-panel" role="tabpanel">
        <p className="zn-ui-label">
          {layer.num} · {layer.title}
        </p>
        <h3>{layer.title}</h3>
        <p>{layer.body}</p>
        <ul>
          {layer.points.map((p) => (
            <li key={p.label}>
              <strong>{p.label}</strong>
              <span>{p.detail}</span>
            </li>
          ))}
        </ul>
        <p className="zn-ui-note">{zeonArchitecture.note}</p>
      </div>
    </div>
  );
}
