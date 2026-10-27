/** Compact SVG flags for the three ZeonAI office countries. */

export function FlagIndia({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="60" height="40" fill="#FF9933" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#138808" />
      <circle
        cx="30"
        cy="20"
        r="4.2"
        fill="none"
        stroke="#000080"
        strokeWidth="1"
      />
      <circle cx="30" cy="20" r="0.9" fill="#000080" />
    </svg>
  );
}

export function FlagUae({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="60" height="40" fill="#00732F" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#000" />
      <rect width="15" height="40" fill="#FF0000" />
    </svg>
  );
}

export function FlagCanada({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="60" height="40" fill="#fff" />
      <rect width="15" height="40" fill="#FF0000" />
      <rect x="45" width="15" height="40" fill="#FF0000" />
      {/* Simplified maple leaf */}
      <path
        fill="#FF0000"
        d="M30 9.2c.35 1.6 1.1 2.7 2.2 3.5l3.8-2.1-.7 3.6 3.9.4-2.9 2.4 2.6 2.8-3.6-.9.3 3.8-2.8-2.2L30 31l-2.8-2.5.3-3.8-3.6.9 2.6-2.8-2.9-2.4 3.9-.4-.7-3.6 3.8 2.1c1.1-.8 1.85-1.9 2.2-3.5z"
      />
    </svg>
  );
}
