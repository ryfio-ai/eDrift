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
    <section id="tech" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Technology Hero Section */}
        <div className="max-w-5xl mb-24">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[3px] bg-brand-primary" />
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Our Engineering Narrative</div>
           </div>
           <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-10 leading-[1.05] tracking-tight">
              Engineering the <span className="text-brand-primary">Precision Standards_</span> <br className="hidden md:block" />
              of Global EV Infrastructure
           </h2>
           <p className="text-xl text-slate-500 font-semibold leading-relaxed max-w-3xl">
              We move beyond generic power electronics. eDrift develops highly-integrated 
              Silicon Carbide (SiC) and Gallium Nitride (GaN) systems that redefine 
              efficiency benchmarks for Automotive OEMs.
           </p>
        </div>

        {/* Technology Stack Grid - Enhanced for Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-40">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <div className="glass-card p-10 h-full flex flex-col group hover:bg-white hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-5 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-semibold">{item.desc}</p>
                
                <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{item.outcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modular Compliance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-24 px-12 bg-slate-50/50 rounded-[64px] border border-slate-100">
           <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center mb-10 shadow-xl shadow-brand-primary/20">
                 <Cpu className="w-7 h-7" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Compliance & Validation</h2>
              <p className="text-lg text-slate-500 font-semibold leading-relaxed mb-10">
                 Every eDrift architecture undergoes 5,000+ hours of automated validation 
                 in our specialized laboratory environments. From thermal shock to EMI/EMC 
                 profiles, we ensure automotive-grade stability.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   "Automotive SAE / IEC",
                   "Thermal Management",
                   "CAN-on-Si Diagnostics",
                   "Modular PCB Design"
                 ].map((list, i) => (
                   <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                      <div className="w-4 h-4 rounded-full border-2 border-brand-primary flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      </div>
                      {list}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-brand-secondary flex items-center justify-center group">
               <div className="text-white/10 text-6xl font-black uppercase tracking-[0.4em] scale-150 rotate-12 group-hover:scale-110 transition-transform duration-[10s]">Logic</div>
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-brand-primary/10" />
               <div className="absolute bottom-10 left-10 p-6 glass-card border-white/10 bg-white/5 backdrop-blur-3xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Validation Pipeline</p>
                  <p className="text-white font-bold text-lg">99.9% Fault Isolation</p>
               </div>
           </div>
        </div>
      </div>
    </section>
  );
};
