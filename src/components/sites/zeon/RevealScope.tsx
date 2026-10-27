"use client";

import { useRef } from "react";
import { useReveal } from "./hooks/useReveal";

/** Applies GSAP ScrollTrigger reveals to `.zn-reveal` descendants. */
export function RevealScope({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  return <div ref={root}>{children}</div>;
}
