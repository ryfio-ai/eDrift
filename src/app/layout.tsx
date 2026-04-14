import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingSupport } from "@/components/layout/FloatingSupport";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from '@vercel/analytics/next';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eDrift Electric | Automotive-Grade Power Electronics",
  description: "Specialized in high-efficiency On-Board Chargers and Power Conversion Systems for the global EV ecosystem.",
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

