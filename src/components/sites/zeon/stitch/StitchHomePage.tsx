"use client";

import { useEffect, useRef } from "react";
import { STITCH_BODY } from "./stitchBody";
import { mountStitchInteractions } from "./stitchInteractions";
import "./stitch.css";

/** Canonical Stitch homepage: screen 1d80e6b369e1498baba4779bb7763e50 */
export function StitchHomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    cleanupRef.current = mountStitchInteractions(root) ?? null;
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="zeon-stitch"
      dangerouslySetInnerHTML={{ __html: STITCH_BODY }}
    />
  );
}
