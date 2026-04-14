"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg-main pt-32 pb-20">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-brand-primary/5 blur-[150px] rounded-full -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-8"
           >
             <Shield className="w-3 h-3" />
             Automotive-Grade Reliability
           </motion.div>

           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="mb-8"
           >
             Automotive-Grade <br />
             <span className="text-brand-primary">Power Electronics</span> <br />
             for EV OEMs
           </motion.h1>
           
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-lg md:text-xl text-text-muted leading-relaxed font-semibold max-w-xl mb-12"
           >
             eDrift Electric develops high-efficiency SiC-based power systems for automotive and industrial EV programs, with engineering support for prototyping, validation, and production deployment.
           </motion.p>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex flex-col sm:flex-row items-center gap-4 mb-12"
           >
              <Link href="/contact" className="btn-primary w-full sm:w-auto px-10">
                Talk to Engineering
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/products" className="btn-outline w-full sm:w-auto px-10 group">
                View Catalog
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
           </motion.div>

           {/* Trust Chips */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.6, duration: 1 }}
             className="flex flex-wrap gap-8 items-center border-t border-border-strong pt-10"
           >
             {[
               { icon: Zap, label: "97.5% Efficiency" },
               { icon: Shield, label: "ASIL-D Design" },
               { icon: Globe, label: "SAE / IEC Standards" }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-2">
                 <item.icon className="w-4 h-4 text-brand-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-text-faint">{item.label}</span>
               </div>
             ))}
           </motion.div>
        </div>

        {/* Hero Visual Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square w-full max-w-[500px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 rounded-[40px] blur-2xl" />
            <div className="relative bg-white border border-border-subtle rounded-[40px] p-8 shadow-2xl overflow-hidden aspect-square flex flex-col items-center justify-center">
              {/* This would be replaced with a real product render */}
              <div className="w-full h-full border-2 border-dashed border-border-subtle rounded-3xl flex flex-col items-center justify-center text-center p-10">
                <Zap className="w-16 h-16 text-brand-primary/20 mb-6" />
                <p className="text-xs font-bold text-text-faint uppercase tracking-[0.2em]">High-Voltage Architecture <br /> Visualization Placeholder</p>
              </div>
              
              {/* Product Labels floating */}
              <div className="absolute top-10 right-10 p-5 bg-white/90 backdrop-blur-md border border-border-subtle rounded-3xl shadow-lg">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-1">EBC-33-SiC</p>
                <h4 className="text-base font-bold text-text-main leading-none">3.3kW On-Board Charger</h4>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

