import React from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact EV Engineering Team | Get Quote for OBC & DC-DC | eDrift",
  description: "Consult with eDrift's engineering team for automotive-grade power electronics. Get quotes for SiC on-board chargers and DC-DC converters for your EV program.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
