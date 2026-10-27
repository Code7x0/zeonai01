"use client";

import { useState } from "react";
import { AskAiPanel } from "./AskAiPanel";
import { WorkflowPanel } from "./WorkflowPanel";
import { DashboardPanel } from "./DashboardPanel";
import { ContractPanel } from "./ContractPanel";

const tabs = [
  { id: "ask", label: "Ask AI" },
  { id: "flow", label: "Workflows" },
  { id: "dash", label: "AI Dashboards" },
  { id: "contract", label: "Contract Intelligence" },
] as const;

export function ProductShowcase() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("ask");

  return (
    <div className="zn-showcase">
      <div className="zn-tabs" role="tablist" aria-label="Product demos">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={`zn-tab${active === t.id ? " is-on" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {active === "ask" ? <AskAiPanel /> : null}
        {active === "flow" ? <WorkflowPanel /> : null}
        {active === "dash" ? <DashboardPanel /> : null}
        {active === "contract" ? <ContractPanel /> : null}
      </div>
    </div>
  );
}
