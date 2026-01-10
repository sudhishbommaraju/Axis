import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keep fonts if they work, or remove if causing issues. Keeping for now.
import "./globals.css";
import { AxisBackground } from "@/components/ui/axis-background";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axis | Decision Authority Layer",
  description: "The operating system for financial survival. Axis enforces commitments and manages risk states.",
};

import { AxisNavBar } from "@/components/ui/axis-navbar";
import { PageTransition } from "@/components/ui/page-transition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    // Force dark mode class on HTML to ensure Tailwind dark variants work
    <html lang="en" className="dark">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-black text-white min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200"
        )}
      >
        {/* Layer 0: Global Background (Fixed, Passive) */}
        {/* We place it here so it persists across all pages including Auth and Public */}
        <AxisBackground className="fixed inset-0 z-0 pointer-events-none" />

        {/* Global Navigation */}
        <AxisNavBar />

        {/* Layer 1: Content (Relative, Interactive) */}
        {/* We wrap children in a PageTransition to ensure smooth route changes */}
        <div className="relative z-10 w-full min-h-screen flex flex-col">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </body>
    </html>
  );
}
