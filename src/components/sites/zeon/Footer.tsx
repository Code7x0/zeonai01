import Link from "next/link";
import {
  zeonFooterColumns,
  zeonMeta,
  zeonOffices,
} from "@/lib/zeonai/content";

export function Footer() {
  return (
    <footer className="border-t border-border-sand bg-paper px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tight text-text-ink"
          >
            ZeonAI
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">
            The governed AI platform for enterprise knowledge and workflows.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-text-muted">
            {zeonOffices.map((o) => (
              <li key={o.id}>
                <strong className="block font-medium text-text-ink">
                  {o.title}
                </strong>
                {o.address}
              </li>
            ))}
          </ul>
        </div>
        {zeonFooterColumns.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-faint">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-text-ink">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <a className="hover:text-terracotta" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-border-sand pt-6 font-mono text-[11px] text-text-faint">
        <p>© {new Date().getFullYear()} ZeonAI Labs. All rights reserved.</p>
        <a className="hover:text-text-ink" href={zeonMeta.email}>
          {zeonMeta.contactEmail}
        </a>
      </div>
    </footer>
  );
}
