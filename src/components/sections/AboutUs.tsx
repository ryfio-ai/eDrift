"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Award, CheckCircle2 } from "lucide-react";

export const AboutUs = () => {
  return (
    <section id="about" className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-32 h-10 mb-8 overflow-hidden opacity-40">
               <Image 
                 src="/images/edrift logo.png" 
                 alt="eDrift" 
                 fill 
                 className="object-contain object-left grayscale"
               />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
              Engineering the Future of <br />
              <span className="text-brand-primary">Electric Mobility</span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">
              Founded in 2022, eDrift Electric is committed to developing industry-leading power electronics for the global EV ecosystem. 
              Our focus is on delivering automotive-grade reliability combined with peak efficiency for demanding industrial applications.
            </p>
            
            <div className="space-y-4 mb-12">
               {[
                 "In-house R&D and rapid prototyping capability",
                 "Manufacturing compliance with global IEC/SAE standards",
                 "Tier-1 supplier support and lifecycle management",
                 "Scalable production for low to high volume orders"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                    <span>{item}</span>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              {[
                { icon: Shield, title: "Reliability", desc: "Built for 10+ year service life in harsh industrial environments." },
                { icon: Award, title: "Excellence", desc: "Rigorous thermal management and efficiency benchmarks." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 group">
                   <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-primary shrink-0 shadow-sm transition-all duration-300">
                      <feature.icon className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-primary/10 blur-3xl opacity-20 rounded-[48px]" />
            <div className="relative bg-white border border-slate-200 p-12 rounded-[32px] shadow-2xl overflow-hidden">
               <div className="space-y-10">
                  <div className="flex justify-between items-end border-b border-slate-100 pb-8">
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-2">Corporate Strategy</p>
                        <h3 className="text-3xl font-semibold text-slate-900 tracking-tight">Sustainable Growth</h3>
                     </div>
                  </div>
                  
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-brand-primary pl-8 py-2">
                     &quot;Supporting the transition to net-zero through modular, high-efficiency power infrastructure that scales with your fleet.&quot;
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-8">
                     <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/50">
                        <div className="text-3xl font-bold text-slate-900 mb-1">97.5%</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Efficiency</div>
                     </div>
                     <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/50">
                        <div className="text-3xl font-bold text-brand-primary mb-1">ZERO</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Failure Tolerance</div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
