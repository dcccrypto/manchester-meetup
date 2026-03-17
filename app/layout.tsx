import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manchester Crypto Meetup — April 1, 2026",
  description: "Manchester's premier crypto & blockchain event. Organised by Gaskell. April 1, 2026.",
  openGraph: {
    title: "Manchester Crypto Meetup — April 1, 2026",
    description: "Manchester's premier crypto & blockchain event. Organised by Gaskell.",
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
