"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-48">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-brand-primary/5 blur-[150px] rounded-full -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-12 shadow-sm"
        >
           <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
           Automotive Grade Systems_
        </motion.div>

        <div className="max-w-5xl mx-auto mb-20 text-center">
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-6xl md:text-9xl font-black text-slate-900 tracking-tight leading-[0.95] mb-12"
           >
             Redefining EV <br />
             <span className="text-brand-primary">Charging AI_</span>
           </motion.h1>
           
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-xl md:text-3xl text-slate-500 leading-relaxed font-semibold max-w-3xl mx-auto mb-16"
           >
             Flexible & Limitless. Premium onboard and portable EV chargers with industry-leading <span className="text-slate-900">≥97% efficiency</span> across 7 voltage options.
           </motion.p>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-8"
           >
             <Link href="/contact" className="btn-primary min-w-[280px] h-16 text-xs shadow-2xl shadow-brand-primary/30">
               Engineering Consultation
               <ArrowRight className="w-5 h-5 ml-2" />
             </Link>
             <Link href="/products" className="btn-outline min-w-[280px] h-16 text-xs group">
               Technical Specifications
               <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
           </motion.div>
        </div>

        {/* Global Authority Metrics */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 1 }}
           className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 items-center border-t border-slate-100 pt-20"
        >
          {[
            { label: "Products Delivered", val: "10K+" },
            { label: "Countries Served", val: "20+" },
            { label: "Industry Experience", val: "15+ Yrs" },
            { label: "Peak Efficiency", val: "≥97%" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
               <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-3">{item.label}</p>
               <h4 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">{item.val}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
