"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Laptop, Gauge, Cpu } from "lucide-react";

const highlights = [
  {
    title: "SiC MOSFET Architecture",
    desc: "Next-generation 1200V Silicon Carbide semiconductors enabling extreme switching speeds and peak efficiency.",
    outcome: "> 97.5% Efficiency",
    icon: Zap,
  },
  {
    title: "CAN v2.0B Integration",
    desc: "Automotive-grade communication protocols ensuring seamless data exchange between vehicle and power unit.",
    outcome: "Diagnostic Ready",
    icon: Laptop,
  },
  {
    title: "ASIL-D BMS Protection",
    desc: "Advanced functional safety algorithms monitoring voltage, current, and temperature at microsecond intervals.",
    outcome: "Zero-Fault Policy",
    icon: Shield,
  },
  {
    title: "Ultra-High Power Density",
    desc: "Innovative mechanical packaging techniques achieving 30% reduction in chassis footprint vs legacy units.",
    outcome: "Compact Footprint",
    icon: Gauge,
  }
];

export const TechHighlights = () => {
  return (
    <section id="tech" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Technology Hero Section */}
        <div className="max-w-5xl mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-primary" />
              <div className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Innovation Narrative_</div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-text-main mb-10 leading-[1.05] tracking-tight">
               Engineering the <span className="text-brand-primary">Precision Standards_</span> <br className="hidden md:block" />
               of Global EV Infrastructure
            </h2>
            <p className="text-lg md:text-xl text-text-muted font-medium leading-relaxed max-w-3xl">
               We move beyond generic power electronics. eDrift develops highly-integrated 
               Silicon Carbide (SiC) and Gallium Nitride (GaN) systems that redefine 
               efficiency benchmarks for Automotive OEMs and industrial fleet operators.
            </p>
        </div>

        {/* Technology Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-40">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div className="glass-card p-10 h-full flex flex-col group hover:bg-white hover:shadow-xl transition-all duration-500 border border-border-subtle hover:border-brand-primary/20 rounded-[32px]">
                <div className="w-14 h-14 rounded-2xl bg-bg-main border border-border-subtle flex items-center justify-center text-brand-primary mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-5 tracking-tight">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-10 font-medium">{item.desc}</p>
                
                <div className="mt-auto pt-8 border-t border-border-subtle flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-main">{item.outcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modular Compliance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-24 px-12 bg-bg-main rounded-[48px] border border-border-subtle">
           <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center mb-10 shadow-xl shadow-brand-primary/20">
                 <Cpu className="w-7 h-7" />
              </div>
              <h2 className="text-4xl font-bold text-text-main mb-8 tracking-tight">Compliance & Validation</h2>
              <p className="text-lg text-text-muted font-medium leading-relaxed mb-10 italic pr-4">
                 Every eDrift architecture undergoes 5,000+ hours of automated validation 
                 in specialized laboratory environments. From thermal shock to EMI/EMC 
                 profiles, we ensure automotive-grade stability for mass production.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   "Automotive SAE / IEC",
                   "Thermal Management",
                   "CAN-on-Si Diagnostics",
                   "Modular PCB Design"
                 ].map((list, i) => (
                   <li key={i} className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-main">
                      <div className="w-4 h-4 rounded-full border-2 border-brand-primary/30 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      </div>
                      {list}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center group">
                <div className="text-white/5 text-6xl font-black uppercase tracking-[0.4em] scale-150 rotate-12 group-hover:scale-110 transition-transform duration-[10s]">Logic_</div>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 to-transparent opacity-40" />
                <div className="absolute bottom-10 left-10 p-6 glass-card border-white/10 bg-white/5 backdrop-blur-3xl rounded-2xl">
                   <p className="text-[9px] font-semibold uppercase tracking-widest text-white/40 mb-2">Validation Pipeline</p>
                   <p className="text-white font-bold text-lg tech-value">99.9% Isolation</p>
                </div>
           </div>
        </div>
      </div>
    </section>
  );
};
