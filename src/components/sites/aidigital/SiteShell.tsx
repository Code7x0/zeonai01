import "./aidigital.css";
import { Footer } from "./Footer";
import { ZeonNavbar } from "./ZeonNavbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="aidigital min-h-screen">
      <ZeonNavbar />
      {children}
      <Footer />
    </div>
  );
}
