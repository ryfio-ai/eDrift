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
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Knowledge Hub</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            Engineering <br />
            <span className="text-brand-primary">Resource Center</span>
          </h1>
          <p className="text-lg text-slate-500 font-semibold max-w-2xl leading-relaxed">
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
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-brand-primary">
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{category.items.length} Files Available</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item, i) => (
                  <div 
                    key={i}
                    className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:border-brand-primary/20 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-1 group-hover:text-brand-primary transition-colors">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.size} • {item.type}</p>
                    </div>
                    <Download className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* External Tools */}
        <div className="mb-40 p-12 bg-slate-900 rounded-[40px] relative overflow-hidden">
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-lg">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-4">Interactive Tools</p>
                 <h2 className="text-3xl font-bold text-white mb-6">TCO & Specification Calculator</h2>
                 <p className="text-white/60 font-medium leading-relaxed mb-8">
                    Run complex calculations for Total Cost of Ownership, charging times, and system efficiency based on your specific application requirements.
                 </p>
                 <a 
                   href="https://edrift-calculator.vercel.app/" 
                   target="_blank" 
                   className="btn-primary"
                 >
                    Launch Calculator
                    <ExternalLink className="w-4 h-4 ml-2" />
                 </a>
              </div>
              <div className="w-full lg:w-1/3 aspect-video bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
                 <div className="text-center p-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Web-Based Engineering Tool</p>
                    <ArrowRight className="w-8 h-8 text-white/10 mx-auto" />
                 </div>
              </div>
           </div>
           {/* Glow */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
        </div>
      </div>
      
      <ContactSection />
    </main>
  );
}
