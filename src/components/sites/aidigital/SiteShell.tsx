import "./aidigital.css";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="aidigital min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
