import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
// ...
  title: {
    default: 'eDrift Electric — Automotive-Grade Power Electronics for EV OEMs',
    template: '%s | eDrift Electric Engineering',
  },
  description: 'eDrift Electric specializes in 97.5% efficient SiC/GaN power conversion systems, ASIL-D compliant on-board chargers, and industrial PSU solutions for the global EV ecosystem. Founded at IIT Palakkad.',
  keywords: [
    'EV on-board charger OEM', 
    'SiC power electronics', 
    'ASIL-D compliant charging', 
    'SiC MOSFET EV charger', 
    'GaN power conversion', 
    'Industrial DC Fast Chargers', 
    'EV charging India OEM'
  ],
  authors: [{ name: 'eDrift Electric Engineering' }],
  creator: 'eDrift Electric',
  metadataBase: new URL('https://edriftelectric.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://edriftelectric.com',
    siteName: 'eDrift Electric',
    images: [{ url: '/images/edrift logo.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
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
      className={`${inter.variable} h-full antialiased`}
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
