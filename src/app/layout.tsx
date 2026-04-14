import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingSupport } from "@/components/layout/FloatingSupport";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@vercel/analytics/react";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const SITE_URL = "https://www.edriftelectric.com";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "eDrift Electric | Automotive-Grade Power Electronics",
    template: "%s | eDrift Electric",
  },
  description: "Specialized in high-efficiency On-Board Chargers, DC-DC Converters, and Power Conversion Systems for the global EV ecosystem. Engineering-first solutions for modern electrification.",
  keywords: [
    "EV Power Electronics",
    "On-Board Charger",
    "OBC",
    "DC-DC Converter",
    "EV charging solutions India",
    "Automotive grade power electronics",
    "Engineering calculators",
    "EV battery management",
    "Power conversion systems",
    "eDrift Electric",
  ],
  authors: [{ name: "eDrift Engineering Team" }],
  creator: "eDrift Electric",
  publisher: "eDrift Electric",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "eDrift Electric",
    title: "eDrift Electric | Advanced Power Electronics",
    description: "Modular and scalable power electronics for the next generation of electric vehicles.",
    images: [
      {
        url: "/images/edrift logo.png",
        width: 1200,
        height: 630,
        alt: "eDrift Electric - Powering the Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eDrift Electric | Automotive Power Electronics",
    description: "High-efficiency power conversion for the global EV ecosystem.",
    images: ["/images/edrift logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-900">
        <OrganizationSchema />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingSupport />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
