"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import "./capability.css";

type Side = "left" | "right";

type CapNode = {
  id: string;
  side: Side;
  eyebrow: string;
  title: string;
  blurb: string;
};

/** Inputs left → products right, hub in the brand-blue glass center */
const NODES: CapNode[] = [
  {
    id: "sharepoint",
    side: "left",
    eyebrow: "Source",
    title: "SharePoint & Object Stores",
    blurb: "PDFs, TIFFs, and S3 buckets where the files already live.",
  },
  {
    id: "erp",
    side: "left",
    eyebrow: "Source",
    title: "ERP Ledgers",
    blurb: "SAP, TechnologyOne, Pronto — ready for two-phase commits.",
  },
  {
    id: "policy",
    side: "left",
    eyebrow: "Source",
    title: "Policies & SOPs",
    blurb: "Board memos, clearance tiers, and delegated authority.",
  },
  {
    id: "inbox",
    side: "left",
    eyebrow: "Source",
    title: "Inboxes & Claims",
    blurb: "Shared mailboxes, AP inbound, and progress claims.",
  },
  {
    id: "workspace",
    side: "right",
    eyebrow: "Surface",
    title: "aOS Workspace",
    blurb: "Citation-first Ask AI over protected corpora.",
  },
  {
    id: "agents",
    side: "right",
    eyebrow: "Surface",
    title: "Agent Hub",
    blurb: "50+ operational agents with human review gates.",
  },
  {
    id: "invoice",
    side: "right",
    eyebrow: "Surface",
    title: "InvoiceAI & CashfloAI",
    blurb: "AP match, DSCR checks, and double-billing detection.",
  },
  {
    id: "drive",
    side: "right",
    eyebrow: "Surface",
    title: "Governed AI Drive",
    blurb: "Immutable lineage and tamper-evident custody.",
  },
];

type DocTab = {
  id: string;
  label: string;
  vendor: string;
  meta: string;
  invoice: string;
  date: string;
  rows: { label: string; qty: string; amount: string; tone: "ok" | "warn" }[];
  fields: { label: string; value: string; status: string }[];
  alert: { title: string; amount: string; body: string };
};

const DOCS: DocTab[] = [
  {
    id: "inv",
    label: "Commercial Invoice (AP 3-Way)",
    vendor: "SIEMENS ENERGY AG",
    meta: "Tax ID: DE 811 123 456 · PO Reference: PO-90141",
    invoice: "INVOICE: INV-449102",
    date: "DATE: 2025-02-18",
    rows: [
      {
        label: "01 Gas Turbine Blade Assembly Set [P/N: GT-8802]",
        qty: "12",
        amount: "$118,500.00",
        tone: "ok",
      },
      {
        label: "02 High-Temp Thermal Sensor Array",
        qty: "24",
        amount: "$24,350.00",
        tone: "ok",
      },
      {
        label: "03 Expedite & Hot-Shot Logistics Surcharge",
        qty: "1",
        amount: "$420.00",
        tone: "warn",
      },
    ],
    fields: [
      { label: "Vendor name", value: "Siemens Energy AG", status: "100%" },
      {
        label: "Tax matrix verification",
        value: "GST statutory calculation valid",
        status: "Passed",
      },
    ],
    alert: {
      title: "Variance exception flagged",
      amount: "+AUD 420.00",
      body: "Line #3 surcharge not present in signed blanket purchase order. Routing to Sam Whitaker for approval.",
    },
  },
  {
    id: "bs",
    label: "Corporate Balance Sheet",
    vendor: "NORTHSTAR MINING HOLDINGS",
    meta: "Entity: AU Consolidated · Period: FY25 Q2",
    invoice: "STATEMENT: BS-77201",
    date: "AS OF: 2025-06-30",
    rows: [
      {
        label: "Cash & cash equivalents",
        qty: "—",
        amount: "$84.2M",
        tone: "ok",
      },
      {
        label: "Trade receivables",
        qty: "—",
        amount: "$31.6M",
        tone: "ok",
      },
      {
        label: "Unmatched intercompany clearing",
        qty: "—",
        amount: "$1.1M",
        tone: "warn",
      },
    ],
    fields: [
      { label: "Entity scope", value: "AU Consolidated Group", status: "Bound" },
      {
        label: "Period lock",
        value: "FY25 Q2 closed books",
        status: "Passed",
      },
    ],
    alert: {
      title: "Clearing imbalance flagged",
      amount: "AUD 1.1M",
      body: "Intercompany clearing exceeds tolerance. Held for controller review before ledger publish.",
    },
  },
  {
    id: "bol",
    label: "Multilingual Bill of Lading",
    vendor: "PACIFIC BULK LOGISTICS",
    meta: "Vessel: MV Aurora · Port: Fremantle → Qingdao",
    invoice: "B/L: PBL-220491",
    date: "DATE: 2025-03-04",
    rows: [
      {
        label: "Container MSCU8841921 · Iron ore fines",
        qty: "1",
        amount: "28,400 t",
        tone: "ok",
      },
      {
        label: "Container TCLU2290184 · Iron ore fines",
        qty: "1",
        amount: "27,950 t",
        tone: "ok",
      },
      {
        label: "Demurrage clause — disputed hours",
        qty: "18h",
        amount: "Pending",
        tone: "warn",
      },
    ],
    fields: [
      { label: "Language stitch", value: "EN / ZH layout reconciled", status: "99%" },
      {
        label: "Weighbridge match",
        value: "Dockets aligned to B/L totals",
        status: "Passed",
      },
    ],
    alert: {
      title: "Demurrage dispute open",
      amount: "18 hours",
      body: "Clause hours exceed charter party allowance. Queued for commercial ops before ERP freight accrual.",
    },
  },
];

function fibonacciSphere(count: number, radius: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return pts;
}

function ParticleSphere({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = fibonacciSphere(820, 1);
    let raf = 0;
    let angle = 0;
    let alive = true;
    let mouseX = 0;
    let mouseY = 0;
    let targetMX = 0;
    let targetMY = 0;
    let hasPointer = false;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      targetMX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      hasPointer = true;
    };
    const onLeave = () => {
      hasPointer = false;
      targetMX = 0;
      targetMY = 0;
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);

    const paint = () => {
      if (!alive) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) {
        raf = requestAnimationFrame(paint);
        return;
      }
      if (
        canvas.width !== Math.floor(w * dpr) ||
        canvas.height !== Math.floor(h * dpr)
      ) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Smooth pointer follow (V7-style)
      mouseX += (targetMX - mouseX) * 0.08;
      mouseY += (targetMY - mouseY) * 0.08;

      const cx = w * 0.5;
      const cy = h * 0.5;
      const scale = Math.min(w, h) * 0.44;
      const tiltY = angle + mouseX * 0.55;
      const tiltX = angle * 0.35 + mouseY * 0.45;
      const cosA = Math.cos(tiltY);
      const sinA = Math.sin(tiltY);
      const cosB = Math.cos(tiltX);
      const sinB = Math.sin(tiltX);
      const mx = cx + mouseX * scale * 0.85;
      const my = cy + mouseY * scale * 0.85;
      const influence = hasPointer || Math.hypot(mouseX, mouseY) > 0.02 ? 1 : 0;

      for (const p of points) {
        const x = p.x;
        const y = p.y;
        const z = p.z;
        const x1 = x * cosA - z * sinA;
        const z1 = x * sinA + z * cosA;
        const y2 = y * cosB - z1 * sinB;
        const z2 = y * sinB + z1 * cosB;
        const depth = (z2 + 1.35) / 2.35;
        let px = cx + x1 * scale;
        let py = cy + y2 * scale;

        // Mouse repulsion on nearby projected points
        if (influence > 0) {
          const dx = px - mx;
          const dy = py - my;
          const dist = Math.hypot(dx, dy) || 1;
          const radius = scale * 0.38;
          if (dist < radius) {
            const force = (1 - dist / radius) ** 2;
            px += (dx / dist) * force * 28;
            py += (dy / dist) * force * 28;
          }
        }

        const near =
          influence > 0
            ? Math.max(0, 1 - Math.hypot(px - mx, py - my) / (scale * 0.42))
            : 0;
        const alpha = Math.min(0.92, 0.22 + depth * 0.5 + near * 0.35);
        const size = 0.85 + depth * 1.55 + near * 1.4;
        const shade = Math.round(36 + depth * 70 + near * 40);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${shade}, ${shade + 2}, ${shade + 6}, ${alpha.toFixed(3)})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        angle += 0.0018;
        raf = requestAnimationFrame(paint);
      }
    };

    paint();
    if (reduced) {
      return () => {
        alive = false;
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
      };
    }

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(paint);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className="zn-cap-sphere" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

function orthogonalPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  side: Side,
) {
  const midX =
    side === "left"
      ? from.x + (to.x - from.x) * 0.55
      : from.x - (from.x - to.x) * 0.55;
  const bendY = from.y + (to.y - from.y) * 0.35;
  return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${bendY} L ${to.x} ${bendY} L ${to.x} ${to.y}`;
}

function ContextGraph({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const [wires, setWires] = useState<
    { d: string; fx: number; fy: number; tx: number; ty: number }[]
  >([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const hub = hubRef.current;
    if (!root || !hub) return;

    const measure = () => {
      const rb = root.getBoundingClientRect();
      const hb = hub.getBoundingClientRect();
      const hubCenter = {
        x: hb.left + hb.width / 2 - rb.left,
        y: hb.top + hb.height / 2 - rb.top,
      };

      const next = NODES.map((node, i) => {
        const el = nodeRefs.current[i];
        if (!el) return null;
        const b = el.getBoundingClientRect();
        const side = node.side;
        const from = {
          x: side === "left" ? b.right - rb.left : b.left - rb.left,
          y: b.top + b.height / 2 - rb.top,
        };
        const to = {
          x:
            side === "left"
              ? hubCenter.x - hb.width * 0.42
              : hubCenter.x + hb.width * 0.42,
          y: hubCenter.y + (i % 4 - 1.5) * 10,
        };
        return {
          d: orthogonalPath(from, to, side),
          fx: from.x,
          fy: from.y,
          tx: to.x,
          ty: to.y,
        };
      }).filter(Boolean) as {
        d: string;
        fx: number;
        fy: number;
        tx: number;
        ty: number;
      }[];

      setWires(next);
    };

    measure();
    const t = window.setTimeout(measure, 120);
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="zn-cap-graph" ref={rootRef} role="img" aria-label="aOS governed context graph connecting enterprise sources to product surfaces">
      <ParticleSphere reduced={reduced} />
      <div className="zn-cap-axis" aria-hidden="true" />
      <svg className="zn-cap-wires" aria-hidden="true">
        {wires.map((w, i) => (
          <g key={NODES[i]?.id ?? i}>
            <path className="zn-cap-wire" d={w.d} />
            <circle className="zn-cap-port" cx={w.fx} cy={w.fy} r="3.2" />
            <circle className="zn-cap-port" cx={w.tx} cy={w.ty} r="3.2" />
          </g>
        ))}
      </svg>

      <div className="zn-cap-hub" ref={hubRef}>
        <strong>Governed Context Graph</strong>
        <span>powered by aOS · governed blue runtime</span>
      </div>

      {NODES.map((node, i) => (
        <article
          key={node.id}
          className="zn-cap-node"
          data-side={node.side}
          data-i={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          style={{ ["--i" as string]: String(i) } as CSSProperties}
        >
          <em>{node.eyebrow}</em>
          <strong>{node.title}</strong>
          <p>{node.blurb}</p>
        </article>
      ))}
    </div>
  );
}

function ExtractionPlayground() {
  const [tab, setTab] = useState(0);
  const [posted, setPosted] = useState(false);
  const doc = DOCS[tab] ?? DOCS[0];

  useEffect(() => {
    setPosted(false);
  }, [tab]);

  return (
    <div className="zn-cap-play">
      <div className="zn-cap-play-bar">
        <div className="zn-cap-play-tabs" role="tablist" aria-label="Document samples">
          {DOCS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={i === tab}
              className={i === tab ? "is-on" : undefined}
              onClick={() => setTab(i)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="zn-cap-play-legend" aria-hidden="true">
          <span>
            <i className="is-ok" />
            Confidence &gt; 99%
          </span>
          <span>
            <i className="is-warn" />
            Audit tolerance breach
          </span>
        </div>
      </div>

      <div className="zn-cap-play-body">
        <div className="zn-cap-doc">
          <div className="zn-cap-doc-sheet">
            <div className="zn-cap-doc-head">
              <div>
                <strong>{doc.vendor}</strong>
                <span>{doc.meta}</span>
              </div>
              <div className="is-right">
                <span>{doc.invoice}</span>
                <span>{doc.date}</span>
              </div>
            </div>
            <div className="zn-cap-rows">
              <div className="zn-cap-row-h">
                <span>Line description</span>
                <span>Qty</span>
                <span>Amount</span>
              </div>
              {doc.rows.map((row) => (
                <div key={row.label} className={`zn-cap-row is-${row.tone}`}>
                  <strong>{row.label}</strong>
                  <span>{row.qty}</span>
                  <span>{row.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="zn-cap-inspect">
          <div className="zn-cap-inspect-h">
            <strong>Telemetry field inspector</strong>
            <span className="zn-cap-badge">Live demo</span>
          </div>
          <div className="zn-cap-fields">
            {doc.fields.map((f) => (
              <div key={f.label} className="zn-cap-field">
                <div>
                  <span>{f.label}</span>
                  <strong>{f.value}</strong>
                </div>
                <em>{f.status}</em>
              </div>
            ))}
          </div>
          <div className="zn-cap-alert">
            <strong>
              <span>{doc.alert.title}</span>
              <span>{doc.alert.amount}</span>
            </strong>
            <p>{doc.alert.body}</p>
          </div>
          <div className="zn-cap-commit">
            <button
              type="button"
              disabled={posted}
              onClick={() => setPosted(true)}
            >
              {posted ? "Commit queued" : "Simulate authorized ERP commit"}
            </button>
            <p className="zn-cap-commit-status" aria-live="polite">
              {posted
                ? "✓ Two-phase commit logged to SAP S/4HANA & TechnologyOne (Batch #BT-8891)"
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CapabilityShowcase() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  return (
    <section className="zn-cap" aria-labelledby="zn-cap-heading">
      <header className="zn-cap-intro">
        <p className="zn-cap-kicker">02 · Capability showcase</p>
        <h2 id="zn-cap-heading" className="zn-cap-title">
          One runtime. Four surfaces. Full custody.
        </h2>
        <p className="zn-cap-lead">
          Enterprise sources feed a single governed context graph. Ask AI,
          agents, finance pipelines, and Drive all read — and write — through
          the same clearance, custody, and audit path.
        </p>
      </header>

      <ContextGraph reduced={reduced} />
      <ExtractionPlayground />
    </section>
  );
}
