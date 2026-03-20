"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ChevronRight, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20 pb-32">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-royal-blue/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-vibrant-purple/5 blur-[100px] rounded-full -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-9xl font-black font-space text-slate-900 mb-8 tracking-tighter leading-[0.9]"
        >
          Welcome to <br />
          <span className="text-gradient">E-Drift_</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Innovative power solutions tailored to unique industry needs. 
          Empowering your mission from conception to completion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <GlowButton variant="primary" size="lg" className="w-full sm:w-auto h-16 group shadow-2xl shadow-royal-blue/20">
            Get in Touch 
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </GlowButton>
          <GlowButton variant="outline" size="lg" className="w-full sm:w-auto h-16 border-slate-200 text-slate-900 hover:bg-slate-50">
            Our Products
          </GlowButton>
        </motion.div>

        {/* Stats Section */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6, duration: 1 }}
           className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-slate-100 pt-16"
        >
          {[
            { label: "Founded", value: 2022, suffix: "" },
            { label: "Innovation", value: 100, suffix: "%" },
            { label: "Support", value: 24, suffix: "/7" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
               <div className="text-3xl md:text-5xl font-black font-space text-slate-900 flex items-center justify-center">
                 {stat.label === "Founded" ? stat.value : <AnimatedCounter from={0} to={stat.value} duration={2} />}
                 <span className="text-royal-blue">{stat.suffix}</span>
               </div>
               <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-3 group-hover:text-royal-blue transition-colors">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
