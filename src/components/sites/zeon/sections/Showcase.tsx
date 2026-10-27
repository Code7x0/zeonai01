"use client";

import { useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";

const demos = [
  {
    id: "contract",
    label: "Contract Intelligence",
    steps: ["Upload", "Extract clauses", "Flag risk", "Human review"],
    title: "Service agreement — sample",
    body: [
      "Illustrative frontend data only — not live processing.",
      "Term, renewal and liability language extracted for review.",
      "Risk flags surface before anyone acts on the contract.",
    ],
    fields: [
      ["Value", "$5,000,000"],
      ["Term", "24 months"],
      ["Auto-renewal", "Yes · 60-day notice"],
      ["Risk flags", "2 clauses"],
    ],
  },
  {
    id: "invoice",
    label: "Invoice processing",
    steps: ["Ingest", "Match PO", "Rules", "Approve & post"],
    title: "Supplier invoice — sample",
    body: [
      "Invoice fields typed for rules and three-way match.",
      "Exceptions route to finance before ERP posting.",
      "Full audit trail on every action.",
    ],
    fields: [
      ["Total", "AUD 48,220"],
      ["PO match", "Matched"],
      ["Exceptions", "1 line"],
      ["Next", "Human approval"],
    ],
  },
  {
    id: "ask",
    label: "Ask AI",
    steps: ["Question", "Access check", "Cite sources", "Export"],
    title: "Policy question — sample",
    body: [
      "Answers only from documents the person can open.",
      "Withheld files stay outside the answer.",
      "Every claim cites a source.",
    ],
    fields: [
      ["Sources", "2 cited"],
      ["Withheld", "2 outside access"],
      ["Persona", "Finance manager"],
      ["Audit", "Read only log"],
    ],
  },
  {
    id: "flow",
    label: "Workflows",
    steps: ["Open case", "Sub-agents", "Exception", "Post"],
    title: "Supplier workflow — sample",
    body: [
      "One case holder at a time; tasks cannot outlive the case.",
      "Agents prepare; people approve what matters.",
      "ERP posting only after review.",
    ],
    fields: [
      ["Status", "Approve"],
      ["Holder", "Finance"],
      ["Open tasks", "1"],
      ["ERP", "After review"],
    ],
  },
] as const;

export function Showcase() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [active, setActive] = useState(0);
  const demo = demos[active] ?? demos[0];

  return (
    <section ref={root} className="zn-section" aria-labelledby="zn-show-title">
      <div className="zn-wrap">
        <div className="zn-reveal">
          <h2 id="zn-show-title" className="zn-h2">
            From documents to decisions — with people on the exceptions.
          </h2>
          <p className="zn-lead">
            Sample workflows from AI Workspace. Frontend demonstration only.
          </p>
        </div>

        <div className="zn-tabs zn-reveal" role="tablist" aria-label="Demos">
          {demos.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`zn-tab${i === active ? " is-on" : ""}`}
              onClick={() => setActive(i)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="zn-demo zn-reveal" role="tabpanel">
          <aside className="zn-demo-rail">
            <ol>
              {demo.steps.map((s, i) => (
                <li key={s} className={i === 1 ? "is-on" : ""}>
                  <span className="zn-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </aside>
          <div className="zn-demo-pane">
            <div className="zn-sheet">
              <h4>{demo.title}</h4>
              {demo.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="zn-fields">
              {demo.fields.map(([label, value]) => (
                <div key={label} className="zn-field">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p className="zn-note">Sample data · not live AI processing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
