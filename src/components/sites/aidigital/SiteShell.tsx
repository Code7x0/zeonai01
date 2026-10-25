import "./aidigital.css";
import { ZeonNavbar } from "./ZeonNavbar";

/**
 * Shell without Footer — homepage stacks Footer over Who inside WhoStack;
 * other pages render Footer themselves.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="aidigital min-h-screen">
      <a href="#main-content" className="aid-skip-link">
        Skip to content
      </a>
      <ZeonNavbar />
      <div id="main-content">{children}</div>
    </div>
  );
}
