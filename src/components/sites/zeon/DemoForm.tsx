"use client";

import { FormEvent, useState } from "react";
import { zeonDemo } from "@/lib/zeonai/content";

/** Real demo intake — posts to /api/demo. */
export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error" | "loading">(
    "idle",
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message =
      String(data.get("message") ?? "").trim() ||
      "Demo request from the ZeonAI website.";
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
          message,
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
      className="zn-sec"
      aria-labelledby="zn-demo-title"
    >
      <div className="zn-wrap">
        <div className="zn-sec-head">
          <h2 id="zn-demo-title" className="zn-h2">
            {zeonDemo.title}
          </h2>
          <p className="zn-lead">{zeonDemo.body}</p>
        </div>

        <div className="zn-demo-grid">
          <ol className="zn-demo-steps">
            {zeonDemo.nextSteps.map((s) => (
              <li key={s.num}>
                <span>{s.num}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <form className="zn-form" onSubmit={onSubmit}>
            <h3>{zeonDemo.formTitle}</h3>
            <p className="zn-form-note">{zeonDemo.formNote}</p>
            <div className="zn-form-row">
              <label>
                Name
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                Work email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
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
              <select
                name="interest"
                required
                defaultValue={zeonDemo.interests[0]}
              >
                {zeonDemo.interests.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Message (optional)
              <textarea name="message" rows={3} />
            </label>
            <label className="zn-check">
              <input name="consent" type="checkbox" required />
              <span>I agree to be contacted about this demo request.</span>
            </label>
            <button
              type="submit"
              className="zn-btn zn-btn-solid"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Talk to our team"}
            </button>
            {status === "ok" ? (
              <p className="zn-form-status is-ok" role="status">
                Thanks. We will be in touch shortly.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="zn-form-status is-error" role="alert">
                Something went wrong. Email us directly or try again.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
