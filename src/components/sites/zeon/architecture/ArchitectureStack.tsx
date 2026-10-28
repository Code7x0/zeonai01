"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { archData } from "../stitch/stitchData";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import "./architecture.css";

type LayerKind =
  | "sources"
  | "processing"
  | "rules"
  | "workflows"
  | "access"
  | "outputs";

type LayerDef = {
  id: number;
  kind: LayerKind;
  label: string;
  short: string;
  title: string;
  description: string;
};

/** Card surface tones — matches requested stack palette */
const CARD_TONES = [
  "teal",
  "black",
  "mist",
  "charcoal",
  "white",
  "white",
] as const;

const LAYERS: LayerDef[] = [
  {
    id: 1,
    kind: "sources",
    label: "Data Sources",
    short: "Spreadsheets, PDFs, shared inboxes, APIs, S3 and ERP connectors.",
    title: archData[0].title,
    description: archData[0].lead,
  },
  {
    id: 2,
    kind: "processing",
    label: "Document Processing",
    short: "Configured spatial parser, layout stitching and table reconciliation.",
    title: archData[1].title,
    description: archData[1].lead,
  },
  {
    id: 3,
    kind: "rules",
    label: "Rules Engine",
    short: "Calculation, validation, transformation and assignment.",
    title: archData[2].title,
    description: archData[2].lead,
  },
  {
    id: 4,
    kind: "workflows",
    label: "Workflows & Approvals",
    short: "One case holder, sub-tasks without giving up custody.",
    title: archData[3].title,
    description: archData[3].lead,
  },
  {
    id: 5,
    kind: "access",
    label: "Access & Audit",
    short: "3 sensitivity tiers, tamper-evident Merkle hash integrity.",
    title: archData[4].title,
    description: archData[4].lead,
  },
  {
    id: 6,
    kind: "outputs",
    label: "Outputs & Integrations",
    short: "Two-phase commit for SAP, Dynamics, TechOne and Pronto.",
    title: archData[5].title,
    description: archData[5].lead,
  },
];

function DashShell({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="zn-arch-panel">
      <header className="zn-arch-panel-h">
        <div>
          <strong>{title}</strong>
          {meta ? <span>{meta}</span> : null}
        </div>
        <span className="zn-arch-panel-live">Live demo</span>
      </header>
      <div className="zn-arch-panel-b">{children}</div>
    </div>
  );
}

function StatusRow({
  label,
  sub,
  status,
  tone,
}: {
  label: string;
  sub?: string;
  status: string;
  tone: "ok" | "warn" | "err" | "info";
}) {
  return (
    <li className="zn-arch-row">
      <span className={`zn-arch-dot is-${tone}`} aria-hidden="true" />
      <div className="zn-arch-row-copy">
        <strong>{label}</strong>
        {sub ? <em>{sub}</em> : null}
      </div>
      <span className={`zn-arch-pill is-${tone}`}>{status}</span>
    </li>
  );
}

function LayerDashboard({ layer }: { layer: LayerDef }) {
  const data = archData[layer.id - 1]!;

  switch (layer.kind) {
    case "sources":
      return (
        <DashShell title="Inbound connectors" meta="AP / Object store">
          <ul className="zn-arch-rows">
            <StatusRow
              label="SharePoint / S3 AP-Inbound"
              sub="Spreadsheets, CSVs & mailboxes"
              status="Polling"
              tone="info"
            />
            <StatusRow
              label="PDF · TIFF · Object stores"
              sub={data.card2T}
              status="Linked"
              tone="ok"
            />
            <StatusRow
              label="SAP · TechnologyOne · Pronto"
              sub="ERP connectors"
              status="Ready"
              tone="ok"
            />
            <StatusRow
              label="Documents in queue"
              sub="Illustrative session"
              status="Demo"
              tone="info"
            />
          </ul>
          <pre className="zn-arch-mono">{data.code}</pre>
        </DashShell>
      );
    case "processing":
      return (
        <DashShell title="Document intelligence" meta="INV-7731-AP">
          <div className="zn-arch-stats">
            <div>
              <span>Confidence</span>
              <strong>99.85%</strong>
            </div>
            <div>
              <span>Line items</span>
              <strong>48</strong>
            </div>
            <div>
              <span>Pages merged</span>
              <strong>3</strong>
            </div>
          </div>
          <ul className="zn-arch-rows">
            <StatusRow
              label="Spatial layout parse"
              sub="Configured parser · variable pages"
              status="Passed"
              tone="ok"
            />
            <StatusRow
              label="Table reconciliation"
              sub="Header fingerprint matched"
              status="48 rows"
              tone="info"
            />
            <StatusRow
              label="Typed columns"
              sub={data.card1T}
              status="Schema"
              tone="ok"
            />
          </ul>
          <pre className="zn-arch-mono">{data.code}</pre>
        </DashShell>
      );
    case "rules":
      return (
        <DashShell title="Rules pipeline" meta="Deterministic">
          <div className="zn-arch-pipe" aria-label="Rules pipeline">
            {["Input", "Calculate", "Validate", "Transform", "Assign"].map(
              (step, i) => (
                <span
                  key={step}
                  className={`zn-arch-pipe-step ${i <= 2 ? "is-on" : ""}`}
                >
                  {step}
                </span>
              ),
            )}
          </div>
          <ul className="zn-arch-rows">
            <StatusRow
              label="GST & variance calculation"
              sub="line_total_sum + gst == invoice_total"
              status="On"
              tone="ok"
            />
            <StatusRow
              label="Tolerance validation"
              sub="Unmatched surcharge route"
              status="Flagged"
              tone="warn"
            />
            <StatusRow
              label="Named output contract"
              sub={data.card2T}
              status="Compiled"
              tone="info"
            />
          </ul>
          <pre className="zn-arch-mono">{data.code}</pre>
        </DashShell>
      );
    case "workflows":
      return (
        <DashShell title="Case WF-89104" meta="Single custody">
          <div className="zn-arch-stats">
            <div>
              <span>Holder</span>
              <strong>Sam Whitaker</strong>
            </div>
            <div>
              <span>Gate</span>
              <strong>Human review</strong>
            </div>
            <div>
              <span>Close</span>
              <strong>Blocked</strong>
            </div>
          </div>
          <ul className="zn-arch-rows">
            <StatusRow
              label="Ingestion · OCR · rules"
              sub="Supplier invoice exception"
              status="Done"
              tone="ok"
            />
            <StatusRow
              label="Human review"
              sub="Approver gate open"
              status="Required"
              tone="warn"
            />
            <StatusRow
              label="Legal ops sub-task"
              sub="Delegated without surrendering custody"
              status="Done"
              tone="ok"
            />
            <StatusRow
              label="Ledger commit"
              sub="Queued until gate closes"
              status="Queued"
              tone="info"
            />
          </ul>
          <pre className="zn-arch-mono">{data.code}</pre>
        </DashShell>
      );
    case "access":
      return (
        <DashShell title="Access & audit" meta="Demo integrity labels">
          <div className="zn-arch-tiers">
            <span>General</span>
            <span className="is-mid">Protected</span>
            <span>Restricted</span>
          </div>
          <ul className="zn-arch-rows">
            <StatusRow
              label="Sensitivity tier"
              sub="finance.director · Protected"
              status="3 tiers"
              tone="info"
            />
            <StatusRow
              label="Merkle leaf (demo UI)"
              sub="Illustrative hash label — not live verification"
              status="0x7c94…"
              tone="ok"
            />
            <StatusRow
              label="RBAC-hidden matches"
              sub="Outside clearance withheld"
              status="2 withheld"
              tone="warn"
            />
          </ul>
          <pre className="zn-arch-mono">{data.code}</pre>
        </DashShell>
      );
    case "outputs":
      return (
        <DashShell title="ERP two-phase commit" meta="Evidence pack">
          <ul className="zn-arch-rows">
            <StatusRow
              label="SAP S/4HANA"
              sub="Prepare transaction"
              status="Phase 1"
              tone="ok"
            />
            <StatusRow
              label="TechnologyOne"
              sub="Prepare transaction"
              status="Phase 1"
              tone="ok"
            />
            <StatusRow
              label="ERP validation fail"
              sub="Automatic rollback protection"
              status="Protected"
              tone="err"
            />
            <StatusRow
              label="Pronto · commit path"
              sub="Signed evidence pack queued"
              status="Queued"
              tone="info"
            />
          </ul>
          <pre className="zn-arch-mono">{data.code}</pre>
        </DashShell>
      );
    default:
      return null;
  }
}

export function ArchitectureStack() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;
    if (prefersReducedMotion()) return;

    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }
        let best = 0;
        let bestRatio = -1;
        cards.forEach((el, i) => {
          const r = ratios.get(el) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = i;
          }
        });
        setActive((prev) => (prev === best ? prev : best));
      },
      {
        root: null,
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
        rootMargin: "-12% 0px -35% 0px",
      },
    );

    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="zn-arch" ref={rootRef} aria-labelledby="zn-arch-heading">
      <header className="zn-arch-intro">
        <p className="zn-arch-kicker">01 · Architecture</p>
        <h2 id="zn-arch-heading" className="zn-arch-title">
          The platform in one picture
        </h2>
        <p className="zn-arch-lead">
          Every document and workflow flows through six deterministic layers.
          Swap foundation models freely while preserving immutable custody,
          strict clearance, and two-phase ERP commits.
        </p>
      </header>

      <div className="zn-arch-stack">
        {LAYERS.map((layer, i) => {
          const isActive = active === i;
          const tone = CARD_TONES[i] ?? "white";
          return (
            <article
              key={layer.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`zn-arch-card is-${tone} ${isActive ? "is-active" : ""}`}
              style={{ ["--arch-i" as string]: String(i) } as CSSProperties}
              aria-current={isActive ? "true" : undefined}
            >
              <div className="zn-arch-card-inner">
                <div className="zn-arch-copy">
                  <p className="zn-arch-eyebrow">{layer.label}</p>
                  <h3>{layer.title}</h3>
                  <p className="zn-arch-desc">{layer.description}</p>
                  <p className="zn-arch-brief">{layer.short}</p>
                </div>
                <div className="zn-arch-dash-wrap">
                  <LayerDashboard layer={layer} />
                </div>
              </div>
            </article>
          );
        })}
        <div className="zn-arch-end" aria-hidden="true" />
      </div>
    </section>
  );
}
