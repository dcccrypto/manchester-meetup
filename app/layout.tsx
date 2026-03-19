import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://manchester-meetup.vercel.app"),
  title: "OpenClaw Manchester Meetup — April 1, 2026",
  description: "The North's premier AI builders meetup. Join builders, founders, and innovators in Manchester. Free entry. 1 April 2026.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-g-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/logo-g-512.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "OpenClaw Manchester Meetup — April 1, 2026",
    description: "The North's premier AI builders meetup. Join builders, founders, and innovators in Manchester. Free entry. 1 April 2026.",
    type: "website",
    url: "https://manchester-meetup.vercel.app",
    siteName: "OpenClaw Manchester",
    images: [
      {
        url: "/logo-g-512.png",
        width: 512,
        height: 512,
        alt: "OpenClaw Manchester Meetup — April 1, 2026",
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Manchester Meetup — April 1, 2026",
    description: "The North's premier AI builders meetup. Free entry. 1 April 2026, Manchester.",
    images: ["/logo-g-512.png"],
  },
  keywords: ["AI meetup", "Manchester", "OpenClaw", "tech event", "AI builders", "artificial intelligence", "April 2026"],
  authors: [{ name: "Gaskell / OpenClaw Manchester" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://manchester-meetup.vercel.app",
  },
  other: {
    "theme-color": "#E63946",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#E63946" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "OpenClaw Manchester Meetup",
              "description": "The North's premier AI builders meetup. Join builders, founders, and innovators in Manchester.",
              "startDate": "2026-04-01T18:00:00+01:00",
              "endDate": "2026-04-01T22:00:00+01:00",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Manchester City Centre",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Manchester",
                  "addressCountry": "GB"
                }
              },
              "organizer": {
                "@type": "Person",
                "name": "Gaskell"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP",
                "availability": "https://schema.org/InStock",
                "url": "https://manchester-meetup.vercel.app/#register"
              },
              "image": "https://manchester-meetup.vercel.app/logo-g-512.png",
              "url": "https://manchester-meetup.vercel.app"
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
