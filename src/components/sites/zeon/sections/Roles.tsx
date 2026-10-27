"use client";

import { useMemo, useRef, useState } from "react";
import { zeonRoleModules, zeonRoles } from "@/lib/zeonai/content";
import { useReveal } from "../hooks/useReveal";

export function Roles() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [active, setActive] = useState(0);
  const role = zeonRoles.roles[active] ?? zeonRoles.roles[0];
  const included = useMemo(() => new Set(role.modules), [role]);

  return (
    <section
      id={zeonRoles.anchorId}
      ref={root}
      className="zn-section"
      aria-labelledby="zn-roles-title"
    >
      <div className="zn-wrap">
        <div className="zn-reveal">
          <h2 id="zn-roles-title" className="zn-h2">
            {zeonRoles.title}
          </h2>
          <p className="zn-lead">{zeonRoles.lead}</p>
        </div>
        <div className="zn-roles zn-reveal">
          <div role="radiogroup" aria-label={zeonRoles.title} style={{ display: "grid", gap: "0.45rem" }}>
            {zeonRoles.roles.map((r, i) => (
              <label
                key={r.id}
                className={`zn-role${i === active ? " is-on" : ""}`}
              >
                <input
                  type="radio"
                  name="zn-role"
                  checked={i === active}
                  onChange={() => setActive(i)}
                />
                {r.label}
              </label>
            ))}
          </div>
          <div className="zn-role-panel">
            <h3 style={{ marginTop: 0 }}>Modules for {role.label}</h3>
            <div className="zn-chips">
              {zeonRoleModules.map((m) => (
                <span
                  key={m.id}
                  className={`zn-chip${included.has(m.id) ? " on" : ""}`}
                >
                  {m.name}
                </span>
              ))}
            </div>
            <h3 style={{ marginTop: "1.25rem" }}>Agents</h3>
            <div className="zn-chips">
              {role.agents.map((a) => (
                <span key={a} className="zn-chip on">
                  {a}
                </span>
              ))}
            </div>
            <a
              href={zeonRoles.cta.href}
              className="zn-btn zn-btn-accent"
              style={{ marginTop: "1.25rem" }}
            >
              {zeonRoles.cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
