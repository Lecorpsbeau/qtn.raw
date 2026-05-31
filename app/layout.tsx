import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "The Portfolio of RAW — Quentin Pacifici",
  description:
    "Photography portfolio by Quentin Pacifici. Mode, automobile et portrait à Paris.",
  openGraph: {
    title: "The Portfolio of RAW",
    description: "Photographs by Quentin Pacifici — @qtn.raw",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>
        {/* Animated mesh background — fixed layer */}
        <div className="mesh-bg" aria-hidden />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Sticky navbar */}
        <Navbar />

        {/* Page content */}
        <main className="relative z-10 pt-[var(--nav-h)]">
          {children}
        </main>
      </body>
    </html>
  );
}
