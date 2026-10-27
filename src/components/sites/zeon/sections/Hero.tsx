"use client";

import { useState } from "react";
import { zeonPlatform } from "@/lib/zeonai/content";

const tabs = [
  { id: "ask", label: "Ask AI" },
  { id: "agents", label: "Agent hub" },
  { id: "workflow", label: "Workflow" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function Hero() {
  const [tab, setTab] = useState<TabId>("ask");

  return (
    <section className="zn-hero" id="platform" aria-labelledby="zn-hero-title">
      <div className="zn-wrap zn-hero-grid">
        <div className="zn-hero-copy">
          <h1 id="zn-hero-title" className="zn-h1">
            Governed AI for enterprise work
          </h1>
          <p className="zn-lead">
            Answers cite your documents, with review and audit built in.
          </p>
          <div className="zn-hero-actions">
            <a
              href={zeonPlatform.ctaPrimary.href}
              className="zn-btn zn-btn-solid"
            >
              Book a demo
            </a>
            <a href="#architecture" className="zn-btn zn-btn-ghost">
              See the architecture
            </a>
          </div>
        </div>

        <div className="zn-console" aria-label="Product preview">
          <div className="zn-console-bar">
            <div className="zn-console-tabs" role="tablist" aria-label="Preview">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  className="zn-console-tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="zn-console-meta">Sample workspace</span>
          </div>
          <div className="zn-console-body" role="tabpanel">
            {tab === "ask" ? <AskPreview /> : null}
            {tab === "agents" ? <AgentPreview /> : null}
            {tab === "workflow" ? <WorkflowPreview /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function AskPreview() {
  return (
    <>
      <p className="zn-ask-q">
        What approval do I need for capital spend above budget?
      </p>
      <p className="zn-ask-a">
        Spend above the approved budget requires CFO and Managing Director
        sign-off once it exceeds delegated authority. Raise a variation request
        in Workflows and attach the revised business case.
      </p>
      <p className="zn-ask-cite">
        Cited from Policy_v4.pdf page 14 and Matrix.docx page 3
      </p>
    </>
  );
}

function AgentPreview() {
  const steps = [
    { num: "01", title: "Ingest invoice pack", state: "Done" },
    { num: "02", title: "Extract line items", state: "Done" },
    { num: "03", title: "Three-way match", state: "Live" },
    { num: "04", title: "Route exception", state: "Queued" },
  ];
  return (
    <div className="zn-pipe">
      {steps.map((s) => (
        <div
          key={s.num}
          className={`zn-pipe-step${s.state === "Live" ? " is-live" : ""}`}
        >
          <span className="zn-pipe-num">{s.num}</span>
          <span className="zn-pipe-title">{s.title}</span>
          <span className="zn-pipe-state">{s.state}</span>
        </div>
      ))}
    </div>
  );
}

function WorkflowPreview() {
  return (
    <>
      <p className="zn-ask-q">Case WF-89104 · single custody</p>
      <p className="zn-ask-a">
        Master holder keeps the case while legal.ops and cfo.office complete
        delegated tasks. Closing stays blocked until every task is complete.
      </p>
      <p className="zn-ask-cite">Audit · append-only activity log</p>
    </>
  );
}
