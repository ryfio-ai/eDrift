"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-40">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-12 shadow-sm"
        >
           <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
           Next-Gen EV Power Electronics
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16">
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-10"
           >
             High-Efficiency <span className="text-brand-primary">Power Systems_</span> <br className="hidden md:block" /> for Global OEMs
           </motion.h1>
           
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-xl md:text-2xl text-slate-500 leading-relaxed font-semibold max-w-3xl mx-auto"
           >
             eDrift Electric partners with automotive manufacturers to deliver 
             specialized SiC-based conversion systems with 97.5% peak efficiency.
           </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-32"
        >
          <Link href="/contact" className="btn-primary min-w-[240px] text-sm">
            Request Quote
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
          <Link href="/products" className="btn-outline min-w-[240px] text-sm group">
            View Specification Catalog
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Feature Highlights - Enhanced Visibility */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 1 }}
           className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-slate-100 pt-20"
        >
          {[
            { icon: Shield, label: "Safety Integrity", val: "ASIL-D Certified" },
            { icon: Zap, label: "Performance", val: "97.5% Efficiency" },
            { icon: Globe, label: "Compliance", val: "Global SAE / IEC" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
               <div className="w-16 h-16 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-brand-primary/20 transition-all duration-500">
                  <item.icon className="w-7 h-7" />
               </div>
               <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-black mb-2">{item.label}</p>
               <h4 className="text-xl font-bold text-slate-900 tracking-tight">{item.val}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
