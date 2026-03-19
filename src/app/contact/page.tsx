"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <div className="pt-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center max-w-4xl mx-auto"
        >
          <Badge variant="purple" className="mb-8">Contact Engineering</Badge>
          <h1 className="text-6xl md:text-8xl font-black font-space text-slate-900 mb-10 leading-[0.9] tracking-tighter">
            Let&apos;s Build the <br />
            <span className="text-gradient">Fastest Charger</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            Whether you&apos;re an OEM looking for reliable power electronics or a fleet operator 
            needing robust charging solutions, our technical team is ready to assist.
          </p>
        </motion.div>
      </div>
      
      <ContactSection />
    </div>
  );
}
