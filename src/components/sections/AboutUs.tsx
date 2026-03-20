"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Shield, Zap, Cpu, Award } from "lucide-react";

export const AboutUs = () => {
  return (
    <section id="about" className="py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black font-space text-slate-900 mb-8 tracking-tighter">
              From Conception <br />
              to <span className="text-gradient">Completion_</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">
              e-Drift Electric specializes in innovative power electronics, from Battery Chargers to Power Supplies, 
              revolutionizing the industry with locally made, pioneering solutions tailored to the unique 
              needs of our clients.
            </p>
            
            <div className="space-y-6 mb-12">
               <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm group hover:shadow-xl transition-all duration-500">
                  <h4 className="text-lg font-black font-space text-slate-900 mb-4 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-royal-blue/10 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-royal-blue" />
                     </div>
                     Empowering Industrial Automation
                  </h4>
                  <p className="text-slate-500 font-medium leading-relaxed">
                     Founded in December 2022, we are committed to developing best-in-class, reliable power electronic 
                     devices in India. Our mission is to offer unparalleled advantages in efficiency and cost-effectiveness.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Shield, title: "Reliability", desc: "Built and assembled with premium Indian components." },
                { icon: Award, title: "Quality", desc: "Unparalleled performance standards in every unit." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 group">
                   <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-royal-blue shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-500 leading-snug font-medium">{feature.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-royal-blue/10 to-vibrant-purple/10 blur-3xl opacity-30" />
            <GlassCard className="p-12 border-slate-200 relative bg-white shadow-2xl overflow-hidden rounded-[48px]">
               <div className="relative z-10 space-y-10">
                  <div className="flex justify-between items-end border-b border-slate-100 pb-8">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-royal-blue mb-2 font-space">The e-Drift Vision</p>
                        <h3 className="text-4xl font-black font-space text-slate-900 tracking-tight">Sustainable Tech</h3>
                     </div>
                     <Badge variant="green" className="rounded-xl">Since 2022</Badge>
                  </div>
                  
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-royal-blue pl-6 py-2">
                     &quot;Dedicated to revolutionizing the power electronics landscape with locally developed, 
                     pioneering solutions.&quot;
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                     <div className="p-6 rounded-3xl bg-slate-50">
                        <div className="text-3xl font-black text-royal-blue mb-1">Passion</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Culture</div>
                     </div>
                     <div className="p-6 rounded-3xl bg-slate-50">
                        <div className="text-3xl font-black text-vibrant-purple mb-1">Impact</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Reach</div>
                     </div>
                  </div>
               </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
