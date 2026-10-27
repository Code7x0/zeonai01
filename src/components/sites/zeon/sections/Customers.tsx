"use client";

import { useRef, useState } from "react";
import { zeonCustomers } from "@/lib/zeonai/content";
import { useReveal } from "../hooks/useReveal";

export function Customers() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [active, setActive] = useState(0);
  const cases = zeonCustomers.cases;
  const c = cases[active] ?? cases[0];

  return (
    <section
      id={zeonCustomers.id}
      ref={root}
      className="zn-section"
      aria-labelledby="zn-cust-title"
    >
      <div className="zn-wrap">
        <div className="zn-reveal">
          <h2 id="zn-cust-title" className="zn-h2">
            What it looks like in practice.
          </h2>
          <p className="zn-lead">{zeonCustomers.lead}</p>
        </div>

        <article className="zn-case zn-reveal">
          <div>
            <p className="zn-case-meta">
              {c.category} · {c.meta}
            </p>
            <h3>{c.title}</h3>
            <p>
              <strong style={{ color: "var(--ink)" }}>Challenge.</strong>{" "}
              {c.challenge}
            </p>
            <p>
              <strong style={{ color: "var(--ink)" }}>Deployed.</strong>{" "}
              {c.deployed}
            </p>
            <p>
              <strong style={{ color: "var(--ink)" }}>Outcome.</strong>{" "}
              {c.outcome}
            </p>
            <div className="zn-case-nav">
              <button
                type="button"
                aria-label="Previous"
                onClick={() =>
                  setActive((i) => (i === 0 ? cases.length - 1 : i - 1))
                }
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setActive((i) => (i + 1) % cases.length)}
              >
                →
              </button>
            </div>
          </div>
          <div className="zn-metrics">
            {c.results.map((r) => (
              <div key={r} className="zn-metric">
                <b>{r.split(" ")[0]}</b>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
