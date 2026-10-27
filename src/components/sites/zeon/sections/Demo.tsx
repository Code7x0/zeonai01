"use client";

import { FormEvent, useRef, useState } from "react";
import { zeonDemo, zeonMeta } from "@/lib/zeonai/content";
import { useReveal } from "../hooks/useReveal";

export function Demo() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [status, setStatus] = useState<"idle" | "ok" | "error" | "loading">(
    "idle",
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          role: String(data.get("role") ?? ""),
          team: String(data.get("team") ?? ""),
          interest: String(data.get("interest") ?? ""),
          message: String(data.get("message") ?? ""),
          consent: data.get("consent") === "on",
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id={zeonDemo.id}
      ref={root}
      className="zn-section"
      aria-labelledby="zn-demo-title"
    >
      <div className="zn-wrap">
        <div className="zn-reveal">
          <h2 id="zn-demo-title" className="zn-h2">
            {zeonDemo.title}
          </h2>
          <p className="zn-lead">{zeonDemo.body}</p>
        </div>
        <div className="zn-form-grid zn-reveal">
          <div>
            <h3 style={{ marginTop: 0 }}>{zeonDemo.nextTitle}</h3>
            <div className="zn-steps" style={{ marginTop: "1rem" }}>
              {zeonDemo.nextSteps.map((s) => (
                <article key={s.num} className="zn-step" style={{ minHeight: 0 }}>
                  <strong style={{ fontSize: "1.5rem" }}>{s.num}</strong>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
          <form className="zn-form" onSubmit={onSubmit}>
            <h3 style={{ margin: 0 }}>{zeonDemo.formTitle}</h3>
            <p className="zn-note" style={{ margin: 0 }}>
              {zeonDemo.formNote}
            </p>
            <div className="zn-form-row">
              <label>
                Name
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                Work email
                <input name="email" type="email" required autoComplete="email" />
              </label>
            </div>
            <div className="zn-form-row">
              <label>
                Company
                <input name="company" required autoComplete="organization" />
              </label>
              <label>
                Role
                <select name="role" required defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  {zeonDemo.roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Interest
              <select name="interest" required defaultValue={zeonDemo.interests[0]}>
                {zeonDemo.interests.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Message (optional)
              <textarea name="message" />
            </label>
            <label className="zn-check">
              <input name="consent" type="checkbox" required />
              I agree to be contacted about this demo request.
            </label>
            <button
              type="submit"
              className="zn-btn zn-btn-accent"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Talk to our team"}
            </button>
            {status === "ok" ? (
              <p className="zn-status ok">Thanks — we will be in touch.</p>
            ) : null}
            {status === "error" ? (
              <p className="zn-status err">
                {zeonDemo.fallback}{" "}
                <a href={zeonMeta.email}>{zeonMeta.contactEmail}</a>
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
