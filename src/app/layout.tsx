import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-900">
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

