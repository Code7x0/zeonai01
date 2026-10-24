import type { Metadata } from "next";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "AI Digital: Your Partner for Responsible, AI-Optimized Marketing & Advertising",
  description:
    "Discover how walled gardens like Google and Meta impact advertisers and learn strategies to regain control with an Open Garden approach.",
  icons: {
    icon: "/sites/aidigital/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
