"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { STITCH_BODY } from "./stitchBody";
import { mountStitchInteractions } from "./stitchInteractions";
import { ArchitectureStack } from "../architecture/ArchitectureStack";
import { CapabilityShowcase } from "../capabilities/CapabilityShowcase";
import { IndustryShowcase } from "../industries/IndustryShowcase";
import "./stitch.css";

/** Static HTML shell — isolated so portal state updates do not rewrite innerHTML. */
function StitchMarkup() {
  return (
    <div
      className="zeon-stitch"
      dangerouslySetInnerHTML={{ __html: STITCH_BODY }}
    />
  );
}

/** Canonical Stitch homepage: screen 1d80e6b369e1498baba4779bb7763e50 */
export function StitchHomePage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [archSlot, setArchSlot] = useState<Element | null>(null);
  const [capSlot, setCapSlot] = useState<Element | null>(null);
  const [indSlot, setIndSlot] = useState<Element | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    setArchSlot(wrap.querySelector("#zn-architecture-stack"));
    setCapSlot(wrap.querySelector("#zn-capability-showcase"));
    setIndSlot(wrap.querySelector("#zn-industry-showcase"));

    const unmountInteractions =
      mountStitchInteractions(wrap) ?? (() => undefined);

    return () => {
      setArchSlot(null);
      setCapSlot(null);
      setIndSlot(null);
      unmountInteractions();
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <StitchMarkup />
      {archSlot ? createPortal(<ArchitectureStack />, archSlot) : null}
      {capSlot ? createPortal(<CapabilityShowcase />, capSlot) : null}
      {indSlot ? createPortal(<IndustryShowcase />, indSlot) : null}
    </div>
  );
}
