import { pipelineOutputs, pipelineStages } from "@/lib/zeonai/engineering-visuals";

/** Hub → agent → four sub-agents → outputs (preview-verified labels). */
export function PipelineVisual() {
  return (
    <figure
      className="aid-eng-visual aid-eng-pipe"
      aria-label="Pipeline: hub, agent, sub-agents, outputs"
    >
      <div className="aid-eng-pipe-spine">
        <div className="aid-eng-pipe-node aid-eng-pipe-node--hub" data-eng-stage>
          <span className="aid-eng-pipe-kicker">hub</span>
          <span className="aid-eng-pipe-title">Finance hub</span>
        </div>

        <div className="aid-eng-pipe-rail" aria-hidden data-eng-line />

        <div className="aid-eng-pipe-node aid-eng-pipe-node--agent" data-eng-stage>
          <span className="aid-eng-pipe-kicker">agent</span>
          <span className="aid-eng-pipe-title">Invoice processing</span>
        </div>

        <div className="aid-eng-pipe-rail" aria-hidden data-eng-line />

        <ol className="aid-eng-pipe-subs">
          {pipelineStages.map((s, i) => (
            <li key={s.id} data-eng-stage>
              <span className="aid-eng-pipe-sub-num">0{i + 1}</span>
              <span className="aid-eng-pipe-sub-label">{s.label}</span>
            </li>
          ))}
        </ol>

        <div className="aid-eng-pipe-rail" aria-hidden data-eng-line />

        <div className="aid-eng-pipe-out-block" data-eng-stage>
          <span className="aid-eng-pipe-kicker">outputs</span>
          <ul className="aid-eng-pipe-outs">
            {pipelineOutputs.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
