"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white pt-20 pb-32">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-10"
        >
           <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
           Next-Gen EV Power Electronics
        </motion.div>

        <div className="max-w-4xl mx-auto mb-10">
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-5xl md:text-7xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-8"
           >
             High-Efficiency <span className="text-brand-primary">Charging Solutions</span> for Global OEMs
           </motion.h1>
           
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium"
           >
             eDrift Electric partners with automotive manufacturers and fleet operators 
              to deliver SiC & GaN based power conversion systems with 97%+ efficiency.
           </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/contact" className="btn-primary w-full sm:w-auto h-14 px-10 text-lg">
            Request Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/products" className="btn-outline w-full sm:w-auto h-14 px-10 text-lg">
            View Product Catalog
          </Link>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 1 }}
           className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-16"
        >
          {[
            { icon: Shield, label: "Automotive Grade", val: "ASIL-D Ready" },
            { icon: Zap, label: "Peak Efficiency", val: "97.5% Efficiency" },
            { icon: Globe, label: "Global Standards", val: "IEC & SAE Compliant" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
               </div>
               <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">{item.label}</p>
               <h4 className="text-lg font-bold text-slate-900">{item.val}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
