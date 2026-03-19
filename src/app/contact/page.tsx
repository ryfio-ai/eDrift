"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <div className="pt-32 bg-navy-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center max-w-3xl mx-auto"
        >
          <Badge className="mb-6">Contact Us</Badge>
          <h1 className="text-5xl md:text-6xl font-black font-space text-text-primary mb-6 leading-tight">
            Let&apos;s Build the <br />
            <span className="text-gradient">Fastest Charger</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Whether you&apos;re an OEM looking for reliable power electronics or a fleet operator needing robust charging solutions, we are here to help.
          </p>
        </motion.div>
      </div>
      
      <ContactSection />
    </div>
  );
}
