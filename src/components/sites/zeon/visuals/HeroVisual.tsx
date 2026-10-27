"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

/** CSS 3D document stack — communicates ingest → extract → act without WebGL weight. */
export function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    el.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const onLeave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className="zn-hero-visual"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
    >
      <div ref={stageRef} className="zn-doc-stage">
        <article className="zn-doc zn-doc-a">
          <p className="zn-doc-label">Contract.pdf</p>
          <h3 className="zn-doc-title">Master services agreement</h3>
          <div className="zn-doc-lines">
            <span />
            <span />
            <span />
          </div>
        </article>
        <article className="zn-doc zn-doc-b">
          <p className="zn-doc-label">Invoice.png</p>
          <h3 className="zn-doc-title">Supplier invoice pack</h3>
          <div className="zn-doc-lines">
            <span />
            <span />
            <span />
          </div>
        </article>
        <article className="zn-doc zn-doc-c">
          <p className="zn-doc-label">Output</p>
          <h3 className="zn-doc-title">Validated fields → workflow</h3>
          <div className="zn-doc-lines">
            <span />
            <span />
            <span />
          </div>
        </article>
        <div className="zn-core">AI</div>
        <span className="zn-float-tag zn-float-tag-1">Extract</span>
        <span className="zn-float-tag zn-float-tag-2">Validate</span>
        <span className="zn-float-tag zn-float-tag-3">Route</span>
      </div>
    </div>
  );
}
