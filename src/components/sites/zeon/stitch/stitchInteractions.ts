import { archData, indData } from "./stitchData";

const archActive =
  "w-full text-left p-5 rounded-xl border transition-all flex items-center justify-between group bg-paper-card border-text-ink shadow-cohere-card";
const archIdle =
  "w-full text-left p-5 rounded-xl border transition-all flex items-center justify-between group bg-paper-subtle border-border-sand hover:bg-paper-card";
const indActive =
  "px-5 py-2.5 rounded-full bg-obsidian text-paper font-mono text-xs font-semibold";
const indIdle =
  "px-5 py-2.5 rounded-full bg-paper-card border border-border-sand text-text-muted hover:text-text-ink font-mono text-xs font-medium";
const docActive =
  "px-3.5 py-1.5 rounded-lg bg-obsidian text-paper font-mono text-xs font-medium";
const docIdle =
  "px-3.5 py-1.5 rounded-lg bg-paper-card text-text-muted hover:text-text-ink font-mono text-xs border border-border-sand";

function setArch(root: HTMLElement, index: number) {
  const data = archData[index - 1];
  if (!data) return;

  for (let i = 1; i <= 6; i++) {
    const btn = root.querySelector<HTMLElement>(`#arch-btn-${i}`);
    if (!btn) continue;
    btn.className = i === index ? archActive : archIdle;
    const label = btn.querySelector("span:first-child");
    if (label) {
      label.className =
        i === index
          ? "font-mono text-xs text-terracotta font-bold block mb-0.5"
          : "font-mono text-xs text-text-muted font-bold block mb-0.5";
    }
  }

  const panel = root.querySelector("#arch-detail-panel");
  if (!panel) return;
  panel.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-3 border-b border-border-sand">
        <span class="font-mono text-xs uppercase tracking-wider text-emerald-botanical font-bold">Layer ${data.num} Specification</span>
        <span class="font-mono text-xs text-text-muted">Deterministic Architecture</span>
      </div>
      <h3 class="font-serif text-3xl font-normal text-text-ink">${data.title}</h3>
      <p class="font-sans text-base text-text-muted leading-relaxed">${data.lead}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div class="p-4 rounded-xl bg-paper-subtle border border-border-sand">
          <span class="font-mono text-xs font-bold text-terracotta uppercase block">${data.card1T}</span>
          <p class="font-sans text-xs text-text-muted mt-1 leading-relaxed">${data.card1D}</p>
        </div>
        <div class="p-4 rounded-xl bg-paper-subtle border border-border-sand">
          <span class="font-mono text-xs font-bold text-terracotta uppercase block">${data.card2T}</span>
          <p class="font-sans text-xs text-text-muted mt-1 leading-relaxed">${data.card2D}</p>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-obsidian text-paper font-mono text-xs space-y-2">
        <div class="text-paper/40">// Layer ${data.num} Production Telemetry Spec</div>
        <pre class="text-emerald-400 whitespace-pre-wrap">${data.code}</pre>
      </div>
    </div>
  `;
}

function setInd(root: HTMLElement, idx: number) {
  const data = indData[idx];
  if (!data) return;

  for (let i = 0; i < indData.length; i++) {
    const btn = root.querySelector<HTMLElement>(`#ind-btn-${i}`);
    if (!btn) continue;
    btn.className = i === idx ? indActive : indIdle;
  }

  const box = root.querySelector("#ind-content");
  if (!box) return;
  box.innerHTML = `
    <div class="space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-sand gap-4">
        <div>
          <h3 class="font-serif text-3xl font-normal text-text-ink">${data.title}</h3>
          <p class="font-sans text-sm text-text-muted mt-1">${data.desc}</p>
        </div>
        <span class="px-3.5 py-1.5 rounded-full bg-paper-subtle border border-border-sand font-mono text-xs font-semibold text-emerald-botanical whitespace-nowrap">Production Ready</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
        ${data.pipeline
          .map(
            (step) =>
              `<div class="p-3 rounded-xl bg-paper-subtle border border-border-sand text-text-ink font-medium">${step}</div>`,
          )
          .join("")}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${data.cards
          .map(
            (c) => `
          <div class="p-6 rounded-xl bg-paper-subtle border border-border-sand flex flex-col justify-between space-y-3">
            <div>
              <span class="font-serif text-xl font-medium text-text-ink block">${c.title}</span>
              <p class="font-sans text-xs text-text-muted leading-relaxed mt-1.5">${c.desc}</p>
            </div>
            <div class="pt-3 border-t border-border-subtle flex items-center justify-between font-mono text-[11px] text-text-muted">
              <span>Runs on Agent Hub</span>
              <span class="material-symbols-outlined text-sm text-emerald-botanical">arrow_outward</span>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>
  `;
}

function setDocTab(root: HTMLElement, tab: string) {
  const map: Record<string, string> = {
    inv: "doc-btn-inv",
    bs: "doc-btn-bs",
    bol: "doc-btn-bol",
  };
  Object.values(map).forEach((id) => {
    const btn = root.querySelector<HTMLElement>(`#${id}`);
    if (btn) btn.className = docIdle;
  });
  const active = root.querySelector<HTMLElement>(`#${map[tab]}`);
  if (active) active.className = docActive;
}

async function handleDemoSubmit(root: HTMLElement, form: HTMLFormElement) {
  const data = new FormData(form);
  const message =
    String(data.get("message") ?? data.get("notes") ?? "").trim() ||
    String(data.get("deploy") ?? "Proof of value request");
  const payload = {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    company: String(data.get("company") ?? ""),
    role: String(data.get("role") ?? data.get("title") ?? "Other"),
    team: String(data.get("team") ?? data.get("deploy") ?? ""),
    interest: String(data.get("interest") ?? "AI Workspace"),
    message,
    consent: true,
  };

  try {
    await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* still show success UI to match Stitch flow; server may be unavailable in preview */
  }

  form.classList.add("hidden");
  const success = root.querySelector<HTMLElement>("#demo-success");
  if (success) {
    success.classList.remove("hidden");
    success.classList.add("flex");
  }
}

/** Bind Stitch interactions inside the injected markup root. */
export function mountStitchInteractions(root: HTMLElement) {
  try {
    setArch(root, 1);
    setInd(root, 0);
  } catch (err) {
    console.error("[stitch] init failed", err);
  }
  root.setAttribute("data-stitch-mounted", "1");

  const onClick = (e: MouseEvent) => {
    const raw = e.target;
    const t =
      raw instanceof Element
        ? raw
        : raw instanceof Node
          ? raw.parentElement
          : null;
    if (!t) return;
    const arch = t.closest("[data-stitch-arch]");
    if (arch instanceof HTMLElement) {
      e.preventDefault();
      setArch(root, Number(arch.dataset.stitchArch));
      return;
    }
    const ind = t.closest("[data-stitch-ind]");
    if (ind instanceof HTMLElement) {
      e.preventDefault();
      setInd(root, Number(ind.dataset.stitchInd));
      return;
    }
    const doc = t.closest("[data-stitch-doc]");
    if (doc instanceof HTMLElement) {
      e.preventDefault();
      setDocTab(root, String(doc.dataset.stitchDoc));
      return;
    }
    const erp = t.closest("[data-stitch-erp]");
    if (erp instanceof HTMLElement) {
      e.preventDefault();
      const btn = root.querySelector<HTMLElement>("#btn-erp-post");
      const status = root.querySelector<HTMLElement>("#erp-post-status");
      if (btn) btn.textContent = "Executing Two-Phase Commit...";
      window.setTimeout(() => {
        btn?.classList.add("hidden");
        status?.classList.remove("hidden");
      }, 700);
    }
  };

  // Capture phase so nested SVG/icon clicks always reach the handler
  root.addEventListener("click", onClick, true);

  const form = root.querySelector<HTMLFormElement>("#consult-form");
  const onSubmit = (e: Event) => {
    e.preventDefault();
    if (form) void handleDemoSubmit(root, form);
  };
  form?.addEventListener("submit", onSubmit);

  return () => {
    root.removeEventListener("click", onClick, true);
    form?.removeEventListener("submit", onSubmit);
  };
}
