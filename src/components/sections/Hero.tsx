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
             className="text-xl md:text-3xl text-slate-600 leading-relaxed font-semibold max-w-3xl mx-auto mb-16"
           >
             Flexible & Limitless. Premium onboard and portable EV chargers with industry-leading <span className="text-slate-900">≥97% efficiency</span> across 7 voltage options._
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

        {/* Global Technical Benchmarks */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 1 }}
           className="mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center border-t border-slate-100 pt-20"
        >
          {[
            { label: "Efficiency Rate", val: "98%+" },
            { label: "Voltage Options", val: "7" },
            { label: "Max Power Output", val: "6.6kW" },
            { label: "Certified Products", val: "CE" },
            { label: "Maximum Current", val: "60A" },
            { label: "Quality Tested", val: "100%" }
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
