"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { zeonCustomers } from "@/lib/zeonai/content";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

const cases = zeonCustomers.cases;
const INTERVAL = zeonCustomers.intervalMs;

export function Customers() {
  const titleId = useId();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPlaying, setUserPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startedRef = useRef(0);
  const remainRef = useRef<number>(INTERVAL);
  const indexRef = useRef(0);

  const playing = !reduced && userPlaying;

  const go = useCallback((next: number) => {
    const i = ((next % cases.length) + cases.length) % cases.length;
    indexRef.current = i;
    setIndex(i);
    setAnimKey((k) => k + 1);
    setProgress(0);
    remainRef.current = INTERVAL;
    startedRef.current = performance.now();
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!playing) {
      clearTimer();
      return;
    }

    startedRef.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startedRef.current;
      const p = Math.min(1, elapsed / remainRef.current);
      setProgress(p);
      if (p >= 1) {
        remainRef.current = INTERVAL;
        go(indexRef.current + 1);
      }
    };
    timerRef.current = window.setInterval(tick, 40);
    return clearTimer;
  }, [playing, go, clearTimer, animKey]);

  const pause = () => {
    if (!playing) return;
    const elapsed = performance.now() - startedRef.current;
    remainRef.current = Math.max(400, remainRef.current - elapsed);
    setUserPlaying(false);
  };

  const resume = () => {
    if (reduced) return;
    startedRef.current = performance.now();
    setUserPlaying(true);
  };

  const togglePlay = () => {
    if (playing) pause();
    else resume();
  };

  const onKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const slide = cases[index];
  const status = `${index + 1} of ${cases.length}`;

  return (
    <section
      id={zeonCustomers.id}
      className="aid-cust"
      aria-labelledby={titleId}
    >
      <div className="aid-container aid-cust-inner">
        <header className="aid-cust-intro">
          <p className="aid-cust-eyebrow">{zeonCustomers.eyebrow}</p>
          <h2 id={titleId} className="aid-cust-title">
            {zeonCustomers.title}
          </h2>
          <p className="aid-cust-lead">{zeonCustomers.lead}</p>
        </header>

        <div
          className="aid-cust-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Case studies"
          onKeyDown={onKey}
        >
          <div
            key={animKey}
            className="aid-cust-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={status}
            tabIndex={0}
          >
            <div className="aid-cust-metric">
              <p className="aid-cust-industry">{slide.category}</p>
              <p className="aid-cust-value">{slide.metric.value}</p>
              <p className="aid-cust-metric-label">{slide.metric.label}</p>
              <p className="aid-cust-metric-context">{slide.metric.context}</p>

              <ul className="aid-cust-results" aria-label="Key results">
                {slide.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>

              <ul className="aid-cust-products" aria-label="Deployed">
                {slide.products.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="aid-cust-story">
              <h3 className="aid-cust-case-title">{slide.title}</h3>
              <p className="aid-cust-case-meta">{slide.meta}</p>

              <dl className="aid-cust-dl">
                <div>
                  <dt>The challenge</dt>
                  <dd>{slide.challenge}</dd>
                </div>
                <div>
                  <dt>What we deployed</dt>
                  <dd>{slide.deployed}</dd>
                </div>
              </dl>

              <div className="aid-cust-outcome">
                <p className="aid-cust-outcome-label">The outcome</p>
                <p className="aid-cust-outcome-body">{slide.outcome}</p>
              </div>
            </div>
          </div>

          <div className="aid-cust-controls">
            <div className="aid-cust-nav">
              <button
                type="button"
                className="aid-cust-btn"
                aria-label="Previous slide"
                onClick={() => go(index - 1)}
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M10 3.5 5.5 8l4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="aid-cust-btn"
                aria-label="Next slide"
                onClick={() => go(index + 1)}
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M6 3.5 10.5 8 6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="aid-cust-btn"
                aria-label={
                  playing ? "Pause automatic slides" : "Play automatic slides"
                }
                title={
                  playing ? "Pause automatic slides" : "Play automatic slides"
                }
                onClick={togglePlay}
                disabled={reduced}
              >
                {playing ? (
                  <svg viewBox="0 0 16 16" aria-hidden>
                    <path
                      d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" aria-hidden>
                    <path d="M5 3l8 5-8 5z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>

            <div className="aid-cust-progress" aria-hidden>
              <span
                className="aid-cust-progress-fill"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            <p className="aid-cust-status" aria-live="polite">
              {status}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
