import type { ZeonIndustryVisual } from "@/lib/zeonai/content";

/**
 * Compact application diagrams — labels derived from verified agent
 * names/descriptions only. No fabricated metrics or sample data.
 */
export function AgentVisual({
  kind,
  label,
}: {
  kind: ZeonIndustryVisual;
  label: string;
}) {
  return (
    <figure className="aid-ind-agent-visual" aria-hidden>
      {render(kind, label)}
    </figure>
  );
}

function render(kind: ZeonIndustryVisual, label: string) {
  switch (kind) {
    case "doc-pack":
      return (
        <div className="aid-ind-viz aid-ind-viz--stack">
          <span className="aid-ind-doc" />
          <span className="aid-ind-doc aid-ind-doc--offset" />
          <span className="aid-ind-doc-lines">
            <i />
            <i />
            <i />
          </span>
        </div>
      );
    case "evidence":
      return (
        <ul className="aid-ind-viz aid-ind-viz--bars">
          <li>
            <span />
            Evidence
          </li>
          <li>
            <span />
            Evidence
          </li>
          <li className="is-accent">
            <span />
            One view
          </li>
        </ul>
      );
    case "identity":
      return (
        <div className="aid-ind-viz aid-ind-viz--id">
          <span className="aid-ind-id-photo" />
          <span className="aid-ind-id-lines">
            <i />
            <i />
          </span>
          <span className="aid-ind-id-check">✓</span>
        </div>
      );
    case "memo":
      return (
        <div className="aid-ind-viz aid-ind-viz--memo">
          <span className="aid-ind-memo-title">Memo</span>
          <i />
          <i />
          <i className="is-short" />
        </div>
      );
    case "three-way":
      return (
        <div className="aid-ind-viz aid-ind-viz--tri">
          {["Invoice", "PO", "GRN"].map((t) => (
            <span key={t}>{t}</span>
          ))}
          <svg viewBox="0 0 64 28" className="aid-ind-tri-links" aria-hidden>
            <path d="M12 8 L32 22 L52 8" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </div>
      );
    case "reconcile":
    case "match":
      return (
        <div className="aid-ind-viz aid-ind-viz--cols">
          <div>
            <em>A</em>
            <i />
            <i />
          </div>
          <span className="aid-ind-link" />
          <div>
            <em>B</em>
            <i />
            <i />
          </div>
        </div>
      );
    case "two-way":
      return (
        <div className="aid-ind-viz aid-ind-viz--cols">
          <div>
            <em>INV</em>
            <i />
          </div>
          <span className="aid-ind-link" />
          <div>
            <em>PO</em>
            <i />
          </div>
        </div>
      );
    case "fund":
      return (
        <div className="aid-ind-viz aid-ind-viz--chart">
          <span style={{ height: "42%" }} />
          <span style={{ height: "68%" }} />
          <span style={{ height: "55%" }} />
          <span className="is-accent" style={{ height: "88%" }} />
        </div>
      );
    case "brief":
      return (
        <div className="aid-ind-viz aid-ind-viz--brief">
          <i />
          <i />
          <i className="is-short" />
          <span>Brief</span>
        </div>
      );
    case "factcheck":
      return (
        <ul className="aid-ind-viz aid-ind-viz--checks">
          <li className="is-ok">Claim</li>
          <li className="is-flag">Claim</li>
          <li className="is-ok">Claim</li>
        </ul>
      );
    case "audio":
      return (
        <div className="aid-ind-viz aid-ind-viz--wave">
          {[4, 10, 7, 14, 9, 12, 6, 11, 5].map((h, i) => (
            <span key={i} style={{ height: `${h * 6}%` }} />
          ))}
        </div>
      );
    case "search":
    case "cite":
    case "access-search":
      return (
        <div className="aid-ind-viz aid-ind-viz--search">
          <span className="aid-ind-search-bar" />
          <span className="aid-ind-search-hit" />
          <span className="aid-ind-search-hit is-dim" />
        </div>
      );
    case "geo":
      return (
        <div className="aid-ind-viz aid-ind-viz--geo">
          <span />
          <span />
          <span className="is-pin" />
        </div>
      );
    case "clearance":
      return (
        <div className="aid-ind-viz aid-ind-viz--lock">
          <span className="aid-ind-lock-ring" />
          <span className="aid-ind-lock-body" />
          <em>Clearance</em>
        </div>
      );
    case "classified":
      return (
        <div className="aid-ind-viz aid-ind-viz--memo">
          <span className="aid-ind-memo-title">Restricted</span>
          <i />
          <i className="is-short" />
          <span className="aid-ind-cite">Cite</span>
        </div>
      );
    case "sop":
      return (
        <div className="aid-ind-viz aid-ind-viz--sop">
          <span>v1</span>
          <span className="is-accent">v2</span>
          <span>v3</span>
        </div>
      );
    case "ehs":
      return (
        <div className="aid-ind-viz aid-ind-viz--ehs">
          <span className="aid-ind-ehs-dot" />
          <i />
          <i />
          <span className="aid-ind-ehs-pattern">Pattern</span>
        </div>
      );
    case "migrate":
      return (
        <div className="aid-ind-viz aid-ind-viz--migrate">
          <em>Source</em>
          <span className="aid-ind-link" />
          <em>Target</em>
        </div>
      );
    default:
      return <span className="aid-ind-viz-fallback">{label.slice(0, 1)}</span>;
  }
}
