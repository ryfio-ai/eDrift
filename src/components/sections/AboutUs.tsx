"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

export const AboutUs = () => {
  return (
    <section id="about" className="py-24 px-6 bg-navy-dark relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-teal/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6">About eDrift</Badge>
          <h2 className="text-4xl md:text-5xl font-black font-space mb-8 text-text-primary leading-tight">
            Pioneering the Next Era of <br />
            <span className="text-gradient">Power Electronics</span>
          </h2>
          
          <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
            <p>
              eDrift Electric Private Limited is a technology-driven company pioneering 
              advanced power electronics solutions for the electric mobility ecosystem. 
              With a strong focus on innovation and engineering excellence, our experienced 
              R&D team designs next-generation EV charging technologies.
            </p>
            <p>
              We leverage cutting-edge semiconductor technologies such as silicon carbide (SiC) 
              and gallium nitride (GaN) to develop highly efficient, compact, and reliable 
              charging solutions.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
               </div>
               <div>
                  <h4 className="font-bold text-text-primary">High Efficiency</h4>
                  <p className="text-sm">98% Conversion Rate</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
               </div>
               <div>
                  <h4 className="font-bold text-text-primary">Reliable Tech</h4>
                  <p className="text-sm">IP67 Rugged Design</p>
               </div>
            </div>
          </div>
          
          <div className="mt-8">
             <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-text-primary">
                Made in India 🇮🇳
             </span>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <GlassCard className="aspect-square bg-navy-mid/40 border-accent-teal/10 flex flex-col justify-between p-8">
             <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center font-black text-2xl text-navy-dark">
                   R&D
                </div>
                <div className="text-right">
                   <p className="text-text-secondary text-sm font-mono tracking-widest uppercase">Technology Stack</p>
                   <p className="text-text-primary font-bold">SiC & GaN</p>
                </div>
             </div>
             
             {/* Tech Spec Visualization Placeholder */}
             <div className="flex-grow flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-48 h-48 rounded-full border border-dashed border-accent-teal/30 animate-[spin_20s_linear_infinity]" />
                   <div className="absolute w-32 h-32 rounded-full border border-accent-green/20" />
                </div>
                <div className="relative z-10 text-center">
                   <div className="text-5xl font-mono font-black text-accent-teal">98%</div>
                   <div className="text-xs uppercase tracking-widest font-bold text-text-secondary mt-2">Conversion Efficiency</div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-navy-dark/50 border border-white/5">
                   <p className="text-xs font-mono text-accent-teal mb-1">Topology</p>
                   <p className="text-sm font-bold truncate">LLC Resonant</p>
                </div>
                <div className="p-4 rounded-xl bg-navy-dark/50 border border-white/5">
                   <p className="text-xs font-mono text-accent-teal mb-1">Cooling</p>
                   <p className="text-sm font-bold truncate">Forced Air/Natural</p>
                </div>
             </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
