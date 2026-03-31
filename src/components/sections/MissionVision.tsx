"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Rocket, ShieldCheck } from "lucide-react";

export const MissionVision = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-10 h-full border border-slate-100 bg-slate-50/30 rounded-[24px] group transition-all duration-500 hover:bg-white hover:shadow-xl">
               <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-105 transition-transform">
                  <Target className="w-8 h-8" />
               </div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-brand-primary mb-4">Strategic Mission</div>
               <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 tracking-tight">
                 Zero-Emission <br /> 
                 Through <span className="text-brand-primary">Engineering Efficiency</span>
               </h3>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We lead the Indian electric vehicle revolution by providing world-class, high-efficiency power conversion systems that make sustainable transportation 
                  more reliable for commercial and industrial partners.
               </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-10 h-full border border-slate-100 bg-slate-50/30 rounded-[24px] group transition-all duration-500 hover:bg-white hover:shadow-xl">
               <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-8 group-hover:scale-105 transition-transform">
                  <Rocket className="w-8 h-8" />
               </div>
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">Global Vision</div>
               <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 tracking-tight">
                 International Hub for <br /> 
                 <span className="text-slate-900 border-b-4 border-brand-primary/20">Power Electronics</span>
               </h3>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We empower India as a global hub for power electronics engineering. eDrift aims to be the standard-bearer for innovation, quality, and excellence in EV infrastructure worldwide.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
