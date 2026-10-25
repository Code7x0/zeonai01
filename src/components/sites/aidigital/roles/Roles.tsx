"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type Lenis from "lenis";
import {
  zeonRoleModules,
  zeonRoles,
  type ZeonRole,
} from "@/lib/zeonai/content";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

const roles = zeonRoles.roles;
const LAST = roles.length - 1;

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

function moduleSet(role: ZeonRole) {
  return new Set<string>(role.modules);
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

/** Progress of the scrub runway through the viewport (0 → 1). */
function scrubProgress(scrub: HTMLElement) {
  const rect = scrub.getBoundingClientRect();
  const h = scrub.offsetHeight || 1;
  return clamp01((window.innerHeight - rect.top) / h);
}

export function Roles() {
  const groupId = useId();
  const scrubRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLUListElement>(null);
  const agentsRef = useRef<HTMLUListElement>(null);
  const lockRef = useRef(false);
  const activeRef = useRef(0);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const role = roles[active] ?? roles[0];
  const included = useMemo(() => moduleSet(role), [role]);
  const includedCount = role.modules.length;
  const total = zeonRoleModules.length;

  const applyActive = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(LAST, idx));
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActive(next);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const scrub = scrubRef.current;
    if (!scrub) return;

    const syncFromScroll = () => {
      if (lockRef.current) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const progress = scrubProgress(scrub);
      const idx =
        progress >= 0.995 ? LAST : Math.round(progress * LAST);
      applyActive(idx);
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", syncFromScroll);
      syncFromScroll();
      return () => {
        lenis.off("scroll", syncFromScroll);
      };
    }

    window.addEventListener("scroll", syncFromScroll, { passive: true });
    syncFromScroll();
    return () => window.removeEventListener("scroll", syncFromScroll);
  }, [reduced, applyActive]);

  useEffect(() => {
    const modules = modulesRef.current;
    const agents = agentsRef.current;
    if (!modules) return;
    registerGsap();

    const cards = modules.querySelectorAll(".aid-roles-module");
    const pills = agents?.querySelectorAll(".aid-roles-agent") ?? [];

    if (reduced) {
      gsap.set([cards, pills], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      cards,
      { opacity: 0.4, y: 10, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.36,
        stagger: 0.026,
        ease: "power2.out",
        overwrite: true,
      },
    );
    if (pills.length) {
      gsap.fromTo(
        pills,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
          overwrite: true,
        },
      );
    }
  }, [active, reduced]);

  const scrollToRole = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(LAST, idx));
      applyActive(next);
      if (reduced) return;
      const scrub = scrubRef.current;
      if (!scrub || window.matchMedia("(max-width: 767px)").matches) return;

      lockRef.current = true;
      const progress = LAST === 0 ? 0 : next / LAST;
      const rect = scrub.getBoundingClientRect();
      const absTop = rect.top + (getLenis()?.scroll ?? window.scrollY);
      const y = absTop - window.innerHeight + scrub.offsetHeight * progress;

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(y, { duration: 0.85, offset: 0 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      window.setTimeout(() => {
        lockRef.current = false;
      }, 1000);
    },
    [applyActive, reduced],
  );

  const select = (idx: number) => {
    if (!reduced && scrubRef.current) scrollToRole(idx);
    else applyActive(idx);
  };

  const progressLabel = `${String(active + 1).padStart(2, "0")} / ${String(roles.length).padStart(2, "0")}`;

  return (
    <>
      <section
        id={zeonRoles.anchorId}
        className="aid-roles"
        aria-labelledby={`${groupId}-title`}
        data-section={zeonRoles.id}
      >
        <div className="aid-roles-panel">
          <div className="aid-roles-inner aid-container">
            <header className="aid-roles-header">
              <div className="aid-roles-header-row">
                <p className="aid-roles-eyebrow">{zeonRoles.chooseLabel}</p>
                <p className="aid-roles-progress" aria-live="polite">
                  {progressLabel}
                </p>
              </div>
              <h2 id={`${groupId}-title`} className="aid-roles-title">
                {zeonRoles.title}
              </h2>
              <p className="aid-roles-lead">{zeonRoles.lead}</p>
            </header>

            <div className="aid-roles-layout">
              <div className="aid-roles-picker">
                <div
                  className="aid-roles-list"
                  role="radiogroup"
                  aria-label={zeonRoles.title}
                >
                  {roles.map((r, i) => {
                    const selected = i === active;
                    const inputId = `${groupId}-${r.id}`;
                    return (
                      <label
                        key={r.id}
                        htmlFor={inputId}
                        className={`aid-roles-option${selected ? " is-selected" : ""}`}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name={`${groupId}-role`}
                          value={r.id}
                          checked={selected}
                          onChange={() => select(i)}
                          className="aid-roles-option-input"
                        />
                        <span className="aid-roles-radio" aria-hidden />
                        <span className="aid-roles-option-label">{r.label}</span>
                      </label>
                    );
                  })}
                </div>

                <a
                  href={zeonRoles.customCta.href}
                  className="aid-roles-custom"
                >
                  <span className="aid-roles-custom-title">
                    {zeonRoles.customCta.title}
                  </span>
                  <span className="aid-roles-custom-body">
                    {zeonRoles.customCta.body}
                  </span>
                </a>
              </div>

              <div className="aid-roles-config">
                <p className="aid-roles-summary">
                  Set up for <strong>{role.label}</strong>:{" "}
                  <span>
                    {includedCount} of {total} modules
                  </span>
                </p>

                <ul ref={modulesRef} className="aid-roles-modules">
                  {zeonRoleModules.map((mod) => {
                    const on = included.has(mod.id);
                    return (
                      <li
                        key={mod.id}
                        className={`aid-roles-module${on ? " is-on" : " is-off"}`}
                        data-lit={on ? "true" : "false"}
                      >
                        <p className="aid-roles-module-name">
                          {mod.name}
                          <span className="aid-roles-module-status">
                            {on ? "Included" : "Not needed"}
                          </span>
                        </p>
                        <span className="aid-roles-module-dot" aria-hidden />
                      </li>
                    );
                  })}
                </ul>

                <div className="aid-roles-agents">
                  <p className="aid-roles-agents-label">
                    Agents set up for this role
                  </p>
                  <ul ref={agentsRef} className="aid-roles-agents-list">
                    {role.agents.map((agent) => (
                      <li key={agent} className="aid-roles-agent">
                        {agent}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="aid-roles-cta-row">
                  <a href={zeonRoles.cta.href} className="aid-roles-cta">
                    {zeonRoles.cta.label}
                  </a>
                  <p className="aid-roles-footnote">{zeonRoles.footnote}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="aid-roles-grid" aria-hidden />
        </div>
      </section>

      <div ref={scrubRef} className="aid-roles-scrub" aria-hidden />
    </>
  );
}
