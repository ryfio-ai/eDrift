"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Laptop, Gauge, CheckCircle2, Cpu } from "lucide-react";

const highlights = [
  {
    title: "SiC MOSFET Architecture",
    desc: "Next-generation third-party semiconductors enabling extreme switching speeds and thermal performance.",
    outcome: "> 97.5% Efficiency",
    icon: Zap,
  },
  {
    title: "CAN v2.0B Integration",
    desc: "Automotive-grade communication protocols ensuring seamless data exchange between vehicle and charger.",
    outcome: "Diagnostic Ready",
    icon: Laptop,
  },
  {
    title: "ASIL-D BMS Protection",
    desc: "Advanced functional safety algorithms monitoring voltage, current, and temperature at microsecond intervals.",
    outcome: "Zero-Failure Policy",
    icon: Shield,
  },
  {
    title: "Ultra-High Power Density",
    desc: "Innovative mechanical packaging techniques achieving 30% reduction in chassis footprint vs competition.",
    outcome: "Compact Footprint",
    icon: Gauge,
  }
];

export const TechHighlights = () => {
  return (
    <section id="tech" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Technology Hero Section */}
        <div className="max-w-4xl mb-24">
           <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">Our Technology Philosophy</div>
           <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 leading-tight">
              Engineering the Future of <br className="hidden md:block" />
              <span className="text-brand-primary">Automotive Power Conversion</span>
           </h1>
           <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
              At eDrift Electric, we dont just build chargers. We develop specialized 
              integrated systems that redefine the standards of reliability and efficiency 
              for the global EV ecosystem.
           </p>
        </div>

        {/* Technology Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div className="p-8 h-full flex flex-col border border-slate-100 bg-slate-50/50 rounded-2xl group hover:bg-white hover:shadow-2xl hover:border-brand-primary/10 hover:-translate-y-2 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">{item.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{item.outcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modular Compliance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24 border-t border-slate-100 px-8 bg-slate-50 rounded-[48px]">
           <div>
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8">
                 <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-6 tracking-tight">Compliance & Validation Pipeline</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                 Every eDrift product undergoes rigorous validation in our ISO-certified facilities. 
                 From thermal cycling to EMI/EMC testing, our pipeline ensures automotive-grade 
                 stability for fleet deployments.
              </p>
              <ul className="space-y-4">
                 {[
                   "Automotive-Grade Validation (SAE / IEC)",
                   "Zero-Interruption Thermal Management",
                   "Real-time CAN-based Diagnostics",
                   "Modular PCB Architecture"
                 ].map((list, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      {list}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center">
               <div className="text-white/20 text-4xl font-bold uppercase tracking-[0.5em] rotate-12">Validation</div>
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent" />
           </div>
        </div>
      </div>
    </section>
  );
};
