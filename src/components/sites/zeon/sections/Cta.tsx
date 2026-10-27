import { zeonDemo, zeonMeta } from "@/lib/zeonai/content";

export function Cta() {
  return (
    <section className="zn-cta" aria-labelledby="zn-cta-title">
      <div className="zn-cta-bg" aria-hidden>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/sites/zeonai/media/earth-grid.jpg"
        >
          <source src="/sites/zeonai/media/ambient.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="zn-wrap">
        <h2 id="zn-cta-title" className="zn-h2">
          Ready to move from pilot to production?
        </h2>
        <p className="zn-lead">
          Pick one high-value workflow. We show AI Workspace on a scenario that
          matters — then talk deployment and governance.
        </p>
        <div className="zn-cta-actions">
          <a href={`#${zeonDemo.id}`} className="zn-btn zn-btn-solid">
            Book a demo
          </a>
          <a href={zeonMeta.email} className="zn-btn zn-btn-ghost">
            Talk to our team
          </a>
        </div>
      </div>
    </section>
  );
}
