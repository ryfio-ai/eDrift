import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'eDrift Electric — B2B Power Electronics for EV OEMs',
    template: '%s | eDrift Electric',
  },
  description: 'eDrift Electric specializes in high-reliability EV power conversion products for OEMs, fleet operators, and industrial systems. Modular, efficient, and scalable charging infrastructure.',
  keywords: ['EV charging OEM', 'B2B power electronics', 'SiC MOSFET chargers', 'on-board charging systems', 'fleet EV solutions'],
  authors: [{ name: 'eDrift Electric Private Limited' }],
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
  robots: { index: true, follow: true },
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
