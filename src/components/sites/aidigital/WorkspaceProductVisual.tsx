"use client";

import { useId } from "react";
import type { ZeonWorkspaceProduct } from "@/lib/zeonai/content";

type VisualKind = ZeonWorkspaceProduct["visual"];

export function WorkspaceProductVisual({
  kind,
  className = "",
  large = false,
}: {
  kind: VisualKind;
  className?: string;
  large?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `ws-g-${kind}-${uid}`;
  const size = large ? 160 : 72;

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`aid-ws-visual ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0009dc" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#26263a" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        rx="18"
        fill="#f2f3fd"
        stroke="rgba(0,9,220,0.18)"
      />
      {kind === "ask" && <AskGlyph grad={gradId} />}
      {kind === "agents" && <AgentsGlyph grad={gradId} />}
      {kind === "apps" && <AppsGlyph grad={gradId} />}
      {kind === "dashboards" && <DashGlyph grad={gradId} />}
      {kind === "workflows" && <FlowGlyph grad={gradId} />}
      {kind === "contract" && <ContractGlyph grad={gradId} />}
    </svg>
  );
}

function AskGlyph({ grad }: { grad: string }) {
  return (
    <g fill="none" stroke={`url(#${grad})`} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="60" cy="52" r="22" />
      <path d="M48 78c6 10 18 10 24 0" />
      <path d="M52 48h16M60 40v16" />
    </g>
  );
}

function AgentsGlyph({ grad }: { grad: string }) {
  return (
    <g fill="none" stroke={`url(#${grad})`} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="40" cy="42" r="10" />
      <circle cx="80" cy="42" r="10" />
      <circle cx="60" cy="78" r="10" />
      <path d="M48 48l8 20M72 48l-8 20M50 42h20" />
    </g>
  );
}

function AppsGlyph({ grad }: { grad: string }) {
  return (
    <g fill="none" stroke={`url(#${grad})`} strokeWidth="2.5">
      <rect x="28" y="28" width="28" height="28" rx="6" />
      <rect x="64" y="28" width="28" height="28" rx="6" />
      <rect x="28" y="64" width="28" height="28" rx="6" />
      <rect x="64" y="64" width="28" height="28" rx="6" />
    </g>
  );
}

function DashGlyph({ grad }: { grad: string }) {
  return (
    <g fill={`url(#${grad})`} opacity="0.95">
      <rect x="28" y="68" width="12" height="24" rx="3" />
      <rect x="46" y="52" width="12" height="40" rx="3" />
      <rect x="64" y="40" width="12" height="52" rx="3" />
      <rect x="82" y="58" width="12" height="34" rx="3" />
    </g>
  );
}

function FlowGlyph({ grad }: { grad: string }) {
  return (
    <g fill="none" stroke={`url(#${grad})`} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="32" cy="60" r="8" />
      <circle cx="60" cy="60" r="8" />
      <circle cx="88" cy="60" r="8" />
      <path d="M40 60h12M68 60h12" />
      <path d="M82 52l10 8-10 8" />
    </g>
  );
}

function ContractGlyph({ grad }: { grad: string }) {
  return (
    <g fill="none" stroke={`url(#${grad})`} strokeWidth="2.5" strokeLinecap="round">
      <rect x="34" y="26" width="52" height="68" rx="6" />
      <path d="M46 44h28M46 56h28M46 68h18" />
      <path d="M72 74l6 6 12-14" />
    </g>
  );
}
