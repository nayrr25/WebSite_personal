import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  adjustFontFallback: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  adjustFontFallback: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-ai.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "N-AI — Data · Insights · AI",
    template: "%s · N-AI",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "Executive AI and data intelligence consultancy. Anomaly detection, risk scoring, and intelligent systems for organizations operating at the edge of complexity.",
  keywords: [
    "AI consulting",
    "data intelligence",
    "anomaly detection",
    "risk scoring",
    "executive analytics",
    "Nancy Rodriguez",
    "N-AI",
  ],
  authors: [{ name: "Nancy Rodriguez" }],
  creator: "Nancy Rodriguez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "N-AI — Data · Insights · AI",
    description:
      "AI-powered analytics, anomaly detection and intelligent systems design for executive leaders.",
    siteName: "N-AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-AI — Data · Insights · AI",
    description:
      "AI-powered analytics, anomaly detection and intelligent systems design for executive leaders.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-bg-elevated focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-text-primary"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
