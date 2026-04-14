"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Cpu, Zap, Share2 } from "lucide-center";
import { Cpu as CpuIcon, Shield as ShieldIcon, Zap as ZapIcon, Share2 as ShareIcon } from "lucide-react";
import { staggerContainer, fadeIn } from "@/lib/motion";

export const AboutUs = () => {
  return (
    <section id="about" className="py-32 px-6 bg-white overflow-hidden reveal-fade">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="text-[10px] font-semibold tracking-[0.15em] text-brand-primary uppercase">Corporate Engineering</p>
            </div>
            
            <h2 className="text-text-main mb-8 !leading-tight">
              Engineering the Future of <br />
              <span className="text-brand-primary">Electric Mobility</span>
            </h2>
            
            <p className="text-lg text-text-muted leading-relaxed font-medium mb-10 max-w-xl">
              Founded in 2018, eDrift Electric builds automotive-grade power electronics for the global EV ecosystem, combining efficiency-focused design with reliability for demanding industrial and commercial deployments.
            </p>

            <div className="flex flex-wrap gap-10 items-center pt-8 border-t border-border-subtle">
               <div className="flex flex-col gap-1.5">
                  <span className="text-2xl font-bold text-text-main tracking-tighter tech-value">2018</span>
                  <span className="text-[10px] tracking-widest text-text-faint font-semibold uppercase">Founded</span>
               </div>
               <div className="w-px h-10 bg-border-subtle hidden md:block" />
               <div className="flex flex-col gap-1.5">
                  <span className="text-2xl font-bold text-text-main tracking-tighter tech-value">IIT Palakkad</span>
                  <span className="text-[10px] tracking-widest text-text-faint font-semibold uppercase">Ecosystem</span>
               </div>
               <div className="w-px h-10 bg-border-subtle hidden md:block" />
               <div className="flex flex-col gap-1.5">
                  <span className="text-2xl font-bold text-text-main tracking-tighter tech-value">Hosur Facility</span>
                  <span className="text-[10px] tracking-widest text-text-faint font-semibold uppercase">Manufacturing</span>
               </div>
            </div>
          </motion.div>

          {/* Capability Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { 
                icon: CpuIcon, 
                title: "In-house R&D", 
                desc: "Rapid prototyping and advanced power architecture design." 
              },
              { 
                icon: ShieldIcon, 
                title: "Compliance Ready", 
                desc: "Alignment with global IEC and SAE engineering standards." 
              },
              { 
                icon: ZapIcon, 
                title: "Tier-1 Support", 
                desc: "Enterprise-grade support for complex OEM programs." 
              },
              { 
                icon: ShareIcon, 
                title: "Scalable Output", 
                desc: "Production delivery from pilot builds to high volumes." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="p-8 bg-bg-main border border-border-subtle rounded-lg transition-all duration-300 group hover:border-brand-primary/30 hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded bg-white border border-border-subtle flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <feature.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <h4 className="text-lg font-bold text-text-main mb-2 tracking-tight">{feature.title}</h4>
                <p className="text-[11px] font-medium text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
