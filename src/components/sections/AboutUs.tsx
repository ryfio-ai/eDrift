"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Cpu, Zap, Share2 } from "lucide-react";

export const AboutUs = () => {
  return (
    <section id="about" className="py-32 px-6 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-brand-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">About eDrift</p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Engineering the Future of <br />
              <span className="text-brand-primary">Electric Mobility</span>
            </h2>
            
            <p className="text-lg text-slate-500 leading-relaxed font-semibold mb-10 max-w-xl">
              Founded in 2022, eDrift Electric builds automotive-grade power electronics for the global EV ecosystem, combining efficiency-focused design with reliability for demanding industrial and commercial deployments.
            </p>

            <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-slate-200">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">Founded 2022</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Industry Core</span>
               </div>
               <div className="w-px h-10 bg-slate-200 hidden md:block" />
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">IIT Palakkad</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">R&D Ecosystem</span>
               </div>
               <div className="w-px h-10 bg-slate-200 hidden md:block" />
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">Hosur Facility</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Manufacturing hub</span>
               </div>
            </div>

            <p className="text-sm text-slate-400 font-semibold leading-relaxed mt-10 max-w-xl italic">
              Operating from Tamil Nadu with engineering roots in the IIT Palakkad ecosystem, eDrift focuses on practical power electronics innovation for real-world mobility systems.
            </p>
          </motion.div>

          {/* Capability Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { 
                icon: Cpu, 
                title: "In-house R&D", 
                desc: "Rapid prototyping and advanced power architecture design." 
              },
              { 
                icon: Shield, 
                title: "Compliance Ready", 
                desc: "Alignment with global IEC and SAE engineering standards." 
              },
              { 
                icon: Zap, 
                title: "Tier-1 Support", 
                desc: "Enterprise-grade support for complex OEM programs." 
              },
              { 
                icon: Share2, 
                title: "Scalable Output", 
                desc: "Production delivery from pilot builds to high volumes." 
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{feature.title}</h4>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
