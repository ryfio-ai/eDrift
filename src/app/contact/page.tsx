import React from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Engineering | eDrift Electric",
  description: "Get in touch with eDrift's engineering team for custom EV power electronics and technical support.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
