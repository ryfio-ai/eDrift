"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Shield, ExternalLink, ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";

const resourceCategories = [
  {
    title: "Technical Datasheets",
    description: "Detailed engineering specifications for our power conversion platforms.",
    icon: FileText,
    items: [
      { name: "EBC-33-SiC 3.3kW OBC", size: "2.4 MB", type: "PDF" },
      { name: "Portable Fleet Charger V2", size: "1.8 MB", type: "PDF" },
      { name: "Custom PSU Integration Note", size: "3.1 MB", type: "PDF" },
    ]
  },
  {
    title: "Brochures & Catalogs",
    description: "Overview of Edrift capabilities, infrastructure, and product lines.",
    icon: Download,
    items: [
      { name: "Engineering Capabilities 2026", size: "5.2 MB", type: "PDF" },
      { name: "Product Line Overview", size: "4.1 MB", type: "PDF" },
    ]
  },
  {
    title: "Compliance & Design",
    description: "Standards alignment, layout guides, and integration tools.",
    icon: Shield,
    items: [
      { name: "ASIL-D Design Alignment", size: "1.2 MB", type: "PDF" },
      { name: "Thermal Management Guide", size: "2.8 MB", type: "PDF" },
    ]
  }
];

export default function ResourcesPage() {
  return (
    <main className="pt-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-brand-primary" />
            <p className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Resource Center</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-8 tracking-tight">
            Engineering <br />
            <span className="text-brand-primary">Technical Hub_</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted font-medium max-w-2xl leading-relaxed">
            Access technical documentation, integration guides, and performance data for our automotive-grade power electronics systems.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {resourceCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-bg-main border border-border-subtle flex items-center justify-center text-brand-primary">
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">{category.title}</h3>
                  <p className="text-[10px] font-semibold text-text-faint uppercase tracking-widest">{category.items.length} Documents Available</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item, i) => (
                  <div 
                    key={i}
                    className="group p-5 bg-bg-main border border-border-subtle rounded-xl flex items-center justify-between hover:bg-white hover:border-brand-primary/20 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-bold text-text-main mb-1 group-hover:text-brand-primary transition-colors">{item.name}</p>
                      <p className="text-[10px] font-semibold text-text-faint uppercase tracking-widest leading-none mt-1.5">{item.size} • {item.type}</p>
                    </div>
                    <Download className="w-4 h-4 text-text-faint group-hover:text-brand-primary transition-all" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* External Tools */}
        <div className="mb-40 p-12 bg-slate-900 rounded-3xl relative overflow-hidden shadow-2xl shadow-slate-200">
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-lg">
                 <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-primary uppercase mb-4">Engineering Support</p>
                 <h2 className="text-3xl font-bold text-white mb-6">TCO & Specification Calculator</h2>
                 <p className="text-white/60 font-medium leading-relaxed mb-10">
                    Run complex calculations for Total Cost of Ownership, charging times, and system efficiency based on your specific application requirements.
                 </p>
                 <a 
                   href="https://edrift-calculator.vercel.app/" 
                   target="_blank" 
                   className="btn-primary px-8"
                 >
                    Launch Engineering Tool
                    <ExternalLink className="w-4 h-4 ml-2" />
                 </a>
              </div>
              <div className="w-full lg:w-1/3 aspect-video bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                 <div className="text-center p-8">
                    <p className="text-[9px] font-semibold tracking-widest text-white/30 uppercase mb-4">Web-Based Calculator</p>
                    <ArrowRight className="w-6 h-6 text-white/10 mx-auto" />
                 </div>
              </div>
           </div>
           {/* Glow Effect */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
        </div>
      </div>
      
      <ContactSection />
    </main>
  );
}
