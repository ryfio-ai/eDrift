"use client";

import React from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Engineering | eDrift Electric",
  description: "Get in touch with eDrift's engineering team for custom EV power electronics, On-Board Chargers, and DC-DC converter solutions.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <ContactSection />
    </div>
  );
}
