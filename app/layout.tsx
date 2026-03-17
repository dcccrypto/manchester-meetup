import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenClaw Manchester Meetup — April 1, 2026",
  description: "The North's premier AI builders meetup. Organised by Gaskell. April 1, 2026.",
  openGraph: {
    title: "OpenClaw Manchester Meetup — April 1, 2026",
    description: "The North's premier AI builders meetup. Organised by Gaskell.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
