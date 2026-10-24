import type { Metadata } from "next";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeonAI Labs | Governed enterprise AI platform",
  description:
    "The governed AI platform for enterprise knowledge and workflows. AI Workspace answers from your documents with citations; agents route paperwork with access control and an audit log built in.",
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
    <html lang="en" className="antialiased">
      <body className="min-h-dvh">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
