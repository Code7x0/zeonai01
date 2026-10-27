/** Official ZeonAI mark + wordmark from zeonai-website-preview.vercel.app */
export function BrandLogo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`zn-brand-lockup ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sites/zeonai/brand/mark-light.png"
        alt=""
        width={112}
        height={116}
        className="zn-brand-mark h-9 w-auto"
        decoding={priority ? "sync" : "async"}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sites/zeonai/brand/wordmark-light.png"
        alt="ZeonAI"
        width={288}
        height={74}
        className="zn-brand-word h-[1.15rem] w-auto"
        decoding={priority ? "sync" : "async"}
      />
    </span>
  );
}
