"use client";

import { useRef } from "react";
import { zeonDemo } from "@/lib/zeonai/content";
import { useReveal } from "../hooks/useReveal";

export function Process() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="zn-section" aria-labelledby="zn-process-title">
      <div className="zn-wrap">
        <div className="zn-reveal">
          <h2 id="zn-process-title" className="zn-h2">
            From friction to a live workflow — in order.
          </h2>
          <p className="zn-lead">
            We start with the process that costs you most, show AI Workspace on a
            relevant scenario, then answer deployment and governance for your
            environment.
          </p>
        </div>
        <div className="zn-steps">
          {zeonDemo.nextSteps.map((s) => (
            <article key={s.num} className="zn-step zn-reveal">
              <strong>{s.num}</strong>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
