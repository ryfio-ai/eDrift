import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'eDrift Electric — Advanced EV Charging Solutions',
    template: '%s | eDrift Electric',
  },
  description: 'eDrift Electric Private Limited designs next-generation EV on-board and portable chargers using SiC & GaN technology. 2.2kW to 6.6kW OBC, IP67 rated, 97%+ efficiency.',
  keywords: ['EV charger', 'on-board charger', 'OBC', 'electric vehicle', 'SiC MOSFET', 'portable EV charger', 'eDrift Electric', 'India EV charging'],
  authors: [{ name: 'eDrift Electric Private Limited' }],
  creator: 'eDrift Electric',
  metadataBase: new URL('https://edriftelectric.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://edriftelectric.com',
    siteName: 'eDrift Electric',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col pt-0">
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
