"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

/** Same all-intra MP4 as Cast & Render — every frame is a keyframe for scrubbing. */
const VIDEO_URL =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/45567745-d826-44a2-a5ce-7ef670944e60.mp4";

/**
 * Centerpiece: interactive white 3D donut only — no chrome, no copy.
 * Scrubs with pointer / touch and section scroll progress.
 */
export function CastRenderCenter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekTo = useRef(0);
  const seekAt = useRef(0);
  const duration = useRef(0);
  const ready = useRef(false);
  const pointerUnit = useRef(0.2);
  const scrollUnit = useRef(0.2);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const clip = videoRef.current;
    const root = rootRef.current;
    if (!clip || !root) return;

    if (reduced) {
      clip.pause();
      clip.removeAttribute("src");
      clip.load();
      return;
    }

    let started = false;
    let raf = 0;

    const applySeek = () => {
      // Scroll-led scrub so fast scrolling “explodes” through frames
      const u = Math.max(
        0,
        Math.min(1, scrollUnit.current * 0.82 + pointerUnit.current * 0.18),
      );
      if (duration.current > 0) seekTo.current = u * duration.current;
    };

    const start = () => {
      if (started) return;
      started = true;
      ready.current = true;
    };

    const onMeta = () => {
      duration.current = clip.duration || 0;
      clip.pause();
      applySeek();
      seekAt.current = seekTo.current;
      try {
        clip.currentTime = seekAt.current;
      } catch {
        /* ignore */
      }
    };

    clip.addEventListener("loadedmetadata", onMeta);
    clip.addEventListener("loadeddata", start);
    clip.addEventListener("canplaythrough", start);
    clip.addEventListener("error", start);
    clip.src = VIDEO_URL;
    clip.load();
    const bail = window.setTimeout(start, 12000);

    const unlock = () => {
      const p = clip.play();
      if (p && typeof p.then === "function") {
        p.then(() => clip.pause()).catch(() => {});
      } else {
        clip.pause();
      }
    };
    ["touchstart", "pointerdown", "wheel", "keydown"].forEach((ev) => {
      window.addEventListener(ev, unlock, { once: true, passive: true });
    });

    const onPointer = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const ny = (e.clientY - rect.top) / Math.max(rect.height, 1);
      pointerUnit.current = Math.max(0, Math.min(1, nx * 0.75 + ny * 0.25));
      applySeek();
    };

    let lastScrollY = window.scrollY;
    let velocity = 0;

    const onScroll = () => {
      const section = root.closest("section") ?? root.parentElement?.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      // Wider mapping so small scroll travel covers more of the clip
      scrollUnit.current = Math.max(
        0,
        Math.min(1, (viewH * 0.75 - rect.top) / (rect.height * 0.85 + viewH * 0.2)),
      );
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      velocity = Math.min(1, Math.abs(dy) / 48);
      applySeek();
    };

    const onWheel = (e: WheelEvent) => {
      velocity = Math.min(1, Math.abs(e.deltaY) / 36);
      // Nudge scrub directly from wheel for snappy explode feel
      scrollUnit.current = Math.max(
        0,
        Math.min(1, scrollUnit.current + e.deltaY * 0.00135),
      );
      applySeek();
    };

    root.addEventListener("pointermove", onPointer);
    root.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    onScroll();

    const frame = () => {
      if (ready.current && duration.current > 0) {
        const gap = seekTo.current - seekAt.current;
        if (Math.abs(gap) > 0.0004) {
          // Fast scroll → nearly snap; idle → still snappy
          const ease = 0.28 + velocity * 0.55;
          seekAt.current += gap * ease;
          velocity *= 0.86;
          if (clip.readyState >= 2 && !clip.seeking) {
            try {
              clip.currentTime = seekAt.current;
            } catch {
              /* ignore */
            }
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(bail);
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      clip.removeEventListener("loadedmetadata", onMeta);
      clip.removeEventListener("loadeddata", start);
      clip.removeEventListener("canplaythrough", start);
      clip.removeEventListener("error", start);
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="aid-ws-donut" aria-hidden>
      <video
        ref={videoRef}
        className="aid-ws-donut-video"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
      />
    </div>
  );
}
