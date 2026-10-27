"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type Lenis from "lenis";
import {
  zeonTrust,
  type ZeonTrustRoleId,
} from "@/lib/zeonai/content";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

const MODULES = zeonTrust.modules;
const ROLE_IDS = Object.keys(zeonTrust.roles) as ZeonTrustRoleId[];

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden>
      <path
        d="M2.5 6.2 5 8.7 9.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden>
      <rect
        x="3"
        y="5.25"
        width="6"
        height="4.75"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M4.25 5.25V4a1.75 1.75 0 0 1 3.5 0v1.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * §06 Governance — intro, audit, access, and security/compliance.
 * Sticky viewport scene; WhoStack scrubs tall content then covers with Who.
 */
export function Trust() {
  const rootRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const roleGroupId = useId();
  const reduced = usePrefersReducedMotion();
  const [roleId, setRoleId] = useState<ZeonTrustRoleId>("executive");
  const [auditSet, setAuditSet] = useState(0);

  const role = zeonTrust.roles[roleId];
  const openSet = useMemo(() => new Set<string>(role.open), [role.open]);
  const openCount = role.open.length;
  const audit = zeonTrust.audit.sets[auditSet] ?? zeonTrust.audit.sets[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sync = () => {
      if (reduced) {
        root.style.setProperty("--trust-settle", "1");
        root.classList.add("is-settled");
        return;
      }
      const top = root.getBoundingClientRect().top;
      const vh = window.innerHeight || 1;
      const start = vh * 0.42;
      const settle =
        top >= start ? 0 : top <= 1 ? 1 : clamp01(1 - top / start);
      root.style.setProperty("--trust-settle", settle.toFixed(3));
      root.classList.toggle("is-settled", settle >= 0.98);
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", sync);
      sync();
      return () => lenis.off("scroll", sync);
    }
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => window.removeEventListener("scroll", sync);
  }, [reduced]);

  const cycleSample = () => {
    setAuditSet((i) => (i + 1) % zeonTrust.audit.sets.length);
  };

  return (
    <section
      ref={rootRef}
      id={zeonTrust.id}
      className="aid-trust-rise"
      aria-labelledby={titleId}
      style={{ ["--trust-settle" as string]: 0 }}
    >
      <div className="aid-trust-panel">
        <div className="aid-container aid-gov">
          <div className="aid-gov-top">
            <header className="aid-gov-intro">
              <p className="aid-gov-eyebrow">{zeonTrust.eyebrow}</p>
              <h2 id={titleId} className="aid-gov-title">
                Governed by design,
                <br />
                not added afterwards
              </h2>
              <p className="aid-gov-lead">{zeonTrust.lead}</p>
            </header>

            <div
              className="aid-gov-audit"
              role="img"
              aria-label={zeonTrust.audit.ariaLabel}
            >
              <div className="aid-gov-audit-chrome">
                <p className="aid-gov-audit-path">{zeonTrust.audit.path}</p>
                <button
                  type="button"
                  className="aid-gov-sample"
                  onClick={cycleSample}
                  aria-label={`Cycle sample audit data (showing set ${auditSet + 1} of ${zeonTrust.audit.sets.length})`}
                >
                  {zeonTrust.audit.sampleLabel}
                </button>
              </div>
              <div className="aid-gov-audit-body">
                <div className="aid-gov-audit-meta">
                  <p>{zeonTrust.audit.title}</p>
                  <p>{zeonTrust.audit.status}</p>
                </div>
                <ol className="aid-gov-timeline">
                  {audit.entries.map((entry, i) => (
                    <li
                      key={`${audit.id}-${entry.meta}`}
                      className={
                        i === audit.activeIndex
                          ? "aid-gov-event is-active"
                          : "aid-gov-event"
                      }
                    >
                      <span className="aid-gov-event-mark" aria-hidden />
                      <p className="aid-gov-event-meta">{entry.meta}</p>
                      <p className="aid-gov-event-body">{entry.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="aid-gov-access">
            <h3 className="aid-gov-access-title">{zeonTrust.accessTitle}</h3>

            <div className="aid-gov-steps-wrap">
              <span className="aid-gov-steps-rail" aria-hidden />
              <ol className="aid-gov-steps">
                {zeonTrust.accessSteps.map((step) => (
                  <li key={step.n} className="aid-gov-step">
                    <span className="aid-gov-step-n" aria-hidden>
                      {step.n}
                    </span>
                    <p className="aid-gov-step-title">{step.title}</p>
                    <p className="aid-gov-step-body">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="aid-gov-viewas">
              <p className="aid-gov-viewas-label" id={roleGroupId}>
                View as
              </p>
              <div
                className="aid-gov-segment"
                role="radiogroup"
                aria-labelledby={roleGroupId}
              >
                {ROLE_IDS.map((id) => {
                  const r = zeonTrust.roles[id];
                  const selected = id === roleId;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={
                        selected
                          ? "aid-gov-segment-btn is-active"
                          : "aid-gov-segment-btn"
                      }
                      onClick={() => setRoleId(id)}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <ul
              className="aid-gov-modules"
              aria-label={`${role.label} module access`}
            >
              {MODULES.map((name) => {
                const open = openSet.has(name);
                return (
                  <li key={name}>
                    <span
                      className={
                        open ? "aid-gov-chip is-open" : "aid-gov-chip is-locked"
                      }
                    >
                      <span className="aid-gov-chip-icon" aria-hidden>
                        {open ? <CheckIcon /> : <LockIcon />}
                      </span>
                      <span className="sr-only">
                        {open ? "Can open: " : "No access: "}
                      </span>
                      {name}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="aid-gov-summary" aria-live="polite">
              {role.label} sees {openCount} of {MODULES.length} modules.
            </p>
            <p className="aid-gov-note">{zeonTrust.roleNote}</p>
          </div>

          <div className="aid-gov-security" aria-labelledby="trust-security-title">
            <h3 id="trust-security-title" className="aid-gov-security-title">
              {zeonTrust.securityTitle}
            </h3>
            <p className="aid-gov-security-lead">{zeonTrust.securityLead}</p>
            <div className="aid-gov-certs">
              {zeonTrust.certifications.map((c) => (
                <div key={c.name} className="aid-gov-cert">
                  <p className="aid-gov-cert-name">{c.name}</p>
                  <p className="aid-gov-cert-detail">{c.detail}</p>
                </div>
              ))}
            </div>
            <div className="aid-gov-sec-grid">
              {zeonTrust.securityPoints.map((item) => (
                <article key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <p className="aid-gov-governed">{zeonTrust.governedNote}</p>
            <div className="aid-gov-deploy">
              <p className="aid-gov-deploy-label">Deployment options</p>
              <ul>
                {zeonTrust.deployments.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
