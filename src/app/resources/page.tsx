import React from "react";
import { Metadata } from "next";
import { ResourcesList } from "@/components/sections/ResourcesList";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "EV Power Electronics Resources | Technical Documentation | eDrift",
  description: "Access technical documentation, integration guides, and performance data for eDrift's automotive-grade power electronics systems.",
};

export default function ResourcesPage() {
  return (
    <main className="pt-10 bg-white min-h-screen">
      <ResourcesList />
      <ContactSection />
    </main>
  );
}
