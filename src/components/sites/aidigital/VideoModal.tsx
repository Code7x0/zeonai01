"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  videoId: string;
  onClose: () => void;
};

export function VideoModal({ open, videoId, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close video"
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
        onClick={onClose}
      >
        ✕
      </button>
      <div
        className="aspect-video w-full max-w-5xl overflow-hidden rounded-xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          title="Video"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
