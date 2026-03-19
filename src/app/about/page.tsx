"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ContactSection } from "@/components/sections/ContactSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 bg-navy-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl"
        >
          <Badge className="mb-6">Our Company</Badge>
          <h1 className="text-5xl md:text-7xl font-black font-space text-text-primary mb-8 leading-tight">
            Advanced Power <br />
            <span className="text-gradient">Electronics for EVs</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-12">
            Founded in Coimbatore, eDrift Electric is on a mission to accelerate the global transition to electric mobility. 
            We specialize in high-efficiency on-board and portable charging solutions that define the next generation of power conversion.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 py-12 border-y border-border-subtle">
             <div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">India&apos;s Engineering Edge</h3>
                <p className="text-text-secondary leading-relaxed">
                   Our R&D facility in Tamil Nadu leverages the region&apos;s deep industrial heritage with cutting-edge global technology trends in wide bandgap semiconductors.
                </p>
             </div>
             <div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">The SiC Revolution</h3>
                <p className="text-text-secondary leading-relaxed">
                   By switching from traditional silicon to Silicon Carbide (SiC) and Gallium Nitride (GaN), we reduce weight and volume while hitting industry-leading 98% efficiency.
                </p>
             </div>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "2025", desc: "The year we scale smart V2X (Bidirectional) charging solutions across India." },
             { title: "98%", desc: "The peak efficiency benchmark our SiC series hits daily." },
             { title: "IP67", desc: "The rugged standard every eDrift product is built to survive." }
           ].map((item, idx) => (
             <div key={idx} className="p-8 rounded-2xl glass border-accent-teal/5">
                <h4 className="text-4xl font-space font-black text-accent-teal mb-4">{item.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
      
      <ContactSection />
    </div>
  );
}
