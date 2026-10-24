export function ZeonLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--aid-font-heading)] text-[1.15rem] leading-none font-black tracking-tight text-[var(--aid-blue)] uppercase md:text-[1.35rem] ${className}`}
    >
      ZeonAI
    </span>
  );
}
