import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

import { Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "eDrift Electric | Automotive-Grade Power Electronics OEM",
    template: "%s | eDrift Electric Engineering"
  },
  description: "Specialized in 97.5% efficient SiC/GaN power conversion systems, On-Board Chargers (OBC), and DC charging solutions for global automotive OEMs. Founded at IIT Palakkad.",
  keywords: [
    "EV Power Electronics OEM",
    "On-Board Charger SiC",
    "ASIL-D Compliant PSU",
    "Fleet Electrification Infrastructure",
    "Gallium Nitride EV Charger",
    "Custom Power Conversion B2B",
    "RFQ EV Charging Systems"
  ],
  authors: [{ name: "eDrift Electric Engineering" }],
  creator: "eDrift Electric",
  metadataBase: new URL("https://edriftelectric.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://edriftelectric.in",
    siteName: "eDrift Electric",
    images: [{ url: "/images/edrift logo.png", width: 1200, height: 630 }],
  },
  twitter: { 
    card: "summary_large_image",
    title: "eDrift Electric | Engineering the Future of EV Power",
    description: "High-efficiency SiC/GaN power systems for global automotive manufacturers.",
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-0 bg-white font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
