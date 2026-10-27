/**
 * Mark + solid wordmark. Plain <img> so Next/Image
 * width/height attrs cannot override the small mark size.
 */
export function ZeonLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`aid-zeon-logo ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sites/zeonai/brand/mark-blue.png"
        alt=""
        width={35}
        height={36}
        className="aid-zeon-logo-mark"
        decoding="async"
      />
      <span className="aid-zeon-logo-word">ZeonAI</span>
    </span>
  );
}
