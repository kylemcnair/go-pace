import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://gopace.run"),
  title: "GoPace – Free Running Pace Calculator",
  description:
    "Free running pace calculator for 5K, 10K, half marathon, and marathon. Calculate finish times or required pace easily.",
  openGraph: {
    title: "GoPace – Free Running Pace Calculator",
    description:
      "Quickly calculate your running pace or finish times for popular race distances.",
    url: "https://gopace.run",
    siteName: "GoPace",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoPace Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoPace – Free Running Pace Calculator",
    description:
      "Calculate your race finish time or pace instantly. Simple & free.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4899830385307583"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {children}

        {/* Vercel Analytics */}
        <Analytics />

        <footer className="text-center py-6 text-sm text-gray-500">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </footer>
      </body>
    </html>
  );
}
