"use client";

import { FormEvent, useState } from "react";
import { zeonDemo, zeonMeta } from "@/lib/zeonai/content";

export function Talk() {
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
      className="aid-demo"
      aria-labelledby="aid-demo-title"
    >
      <div className="aid-demo-panel">
        <div className="aid-container">
          <div className="aid-demo-shell">
            <div className="aid-demo-inner">
              <div className="aid-demo-copy">
                <p className="aid-demo-eyebrow">Next step</p>
                <h2 id="aid-demo-title" className="aid-demo-title">
                  {zeonDemo.title}
                </h2>
                <p className="aid-demo-lead">{zeonDemo.body}</p>

                <div className="aid-demo-next">
                  <h3 className="aid-demo-next-title">{zeonDemo.nextTitle}</h3>
                  <ol className="aid-demo-steps">
                    {zeonDemo.nextSteps.map((step) => (
                      <li key={step.num} className="aid-demo-step">
                        <span className="aid-demo-step-num" aria-hidden>
                          {step.num}
                        </span>
                        <div>
                          <p className="aid-demo-step-title">{step.title}</p>
                          <p className="aid-demo-step-body">{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="aid-demo-form-card">
                <h3 className="aid-demo-form-title">{zeonDemo.formTitle}</h3>
                <p className="aid-demo-form-note">{zeonDemo.formNote}</p>

                {status === "ok" ? (
                  <p className="aid-demo-success">
                    Thanks — we will be in touch shortly.
                  </p>
                ) : (
                  <form onSubmit={onSubmit} className="aid-demo-form">
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
                    <label>
                      Company
                      <input
                        name="company"
                        required
                        autoComplete="organization"
                      />
                    </label>
                    <label>
                      Role (optional)
                      <select name="role" defaultValue="">
                        <option value="">Select a role</option>
                        {zeonDemo.roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Team / function (optional)
                      <input name="team" />
                    </label>
                    <fieldset>
                      <legend>Interest</legend>
                      <div className="aid-demo-interests">
                        {zeonDemo.interests.map((interest) => (
                          <label key={interest} className="aid-demo-interest">
                            <input
                              type="radio"
                              name="interest"
                              value={interest}
                              required
                            />
                            {interest}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label>
                      Message
                      <textarea name="message" required rows={3} />
                    </label>
                    <label className="aid-demo-consent">
                      <input type="checkbox" name="consent" required />
                      <span>
                        I agree that ZeonAI Labs may contact me about this
                        request. See the{" "}
                        <a href="/privacy-policy">privacy policy</a>.
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="aid-btn aid-btn-lime"
                    >
                      {status === "loading" ? "Sending…" : zeonDemo.cta.label}
                    </button>
                    {status === "error" ? (
                      <p className="aid-demo-error">
                        Something went wrong. {zeonDemo.fallback}
                      </p>
                    ) : (
                      <p className="aid-demo-alt">
                        Or email{" "}
                        <a href={zeonMeta.email}>{zeonMeta.contactEmail}</a>.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
