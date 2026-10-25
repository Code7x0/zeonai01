import { rulesVisual } from "@/lib/zeonai/engineering-visuals";

/** Plain-language prompt → drafted calculation rule (preview copy). */
export function RulesVisual() {
  return (
    <figure className="aid-eng-visual aid-eng-rules" aria-label="Business rules draft flow">
      <ul className="aid-eng-rule-types" data-eng-stage>
        {rulesVisual.types.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="aid-eng-panel" data-eng-stage>
        <p className="aid-eng-panel-label">{rulesVisual.promptLabel}</p>
        <p className="aid-eng-prompt">{rulesVisual.prompt}</p>
        <div className="aid-eng-draft-head">
          <span>{rulesVisual.draftLabel}</span>
          <span className="aid-eng-badge">{rulesVisual.draftBadge}</span>
        </div>
        <pre className="aid-eng-code">
          <code>{rulesVisual.code}</code>
        </pre>
      </div>
    </figure>
  );
}
