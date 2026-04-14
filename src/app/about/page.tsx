"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ContactSection } from "@/components/sections/ContactSection";
import { Shield, Zap, Target, Cpu, Users, Award } from "lucide-react";

/**
 * Animated counter component for B2B metrics
 */
const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current).toString() + suffix);
  const [currentValue, setCurrentValue] = useState("0" + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => setCurrentValue(latest));
  }, [display]);

  return <span ref={ref}>{currentValue}</span>;
};

export default function AboutPage() {
  return (
    <main className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* B2B Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">Our Engineering Mission</div>
            <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-8 leading-tight">
               Redefining EV <br />
               <span className="text-brand-primary">Hardware Systems_</span>
            </h1>
            <div className="space-y-6 mb-10">
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                 Edrift Electric Private Limited is a technology-driven company pioneering advanced power electronics solutions for the electric mobility ecosystem. With a strong focus on innovation and engineering excellence, our experienced research and development team is dedicated to designing next-generation EV charging technologies.
              </p>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                 At Edrift Electric, we leverage cutting-edge semiconductor technologies such as silicon carbide (SiC) and gallium nitride (GaN) to develop highly efficient, compact, and reliable charging solutions. Our goal is to push the boundaries of power conversion efficiency while delivering products that are practical, scalable, and user-focused.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 border-t border-slate-100 pt-10">
               <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-brand-primary" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">IIT Palakkad Academic R&D Partner</span>
               </div>
               <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-brand-primary" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">ASIL-D Functional Safety Ready</span>
               </div>
            </div>
          </motion.div>
          <div className="relative aspect-video rounded-[48px] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,102,255,0.05),transparent)]" />
             <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center">
                <Cpu className="w-16 h-16 text-brand-primary/20 mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Precision Engineering Center</p>
                <h3 className="text-2xl font-semibold text-slate-300">Automotive Grade <br/>Validation Lab</h3>
             </div>
          </div>
        </section>

        {/* The Story / R&D Pedigree */}
        <section className="mb-40">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-8">
                 <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Vision & Mission</h2>
                 <div className="prose prose-slate font-medium text-slate-600 leading-relaxed space-y-8 mt-6">
                    <div>
                       <h3 className="text-xl font-semibold text-slate-800 mb-3">Our Vision</h3>
                       <p>
                          To enable a sustainable and energy-efficient mobility ecosystem by developing innovative EV charging technologies that seamlessly integrate vehicles with other vehicles and external loads, empowering vehicles to intelligently consume, share, and utilize energy in everyday life.
                       </p>
                    </div>
                    <div>
                       <h3 className="text-xl font-semibold text-slate-800 mb-3">Our Mission</h3>
                       <p>
                          To design and deliver reliable, efficient, and intelligent EV charging solutions that empower users, accelerate the adoption of electric mobility, and contribute to a cleaner and more sustainable energy future.
                       </p>
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { label: "Founded", val: "2018", sub: "Global HQ" },
                   { label: "Products", val: "10K+", sub: "Units Delivered" },
                   { label: "Countries", val: "20+", sub: "Served Global" },
                   { label: "Efficiency", val: "≥97%", sub: "Industrial Peak" }
                 ].map((m, i) => (
                   <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center flex flex-col justify-center border-b-4 border-b-brand-primary">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{m.label}</p>
                      <p className="text-2xl font-bold text-slate-900 mb-1">{m.val}</p>
                      <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{m.sub}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Animated Metrics Strip */}
        <section className="mb-40 py-24 bg-slate-900 rounded-[48px] overflow-hidden relative">
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center px-12">
              <div>
                 <div className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tighter">
                   <Counter value={97} suffix="%" />
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Peak Efficiency</p>
                 <p className="text-sm font-semibold text-white/60 max-w-[220px] mx-auto">Verified across the Elite series OBC platforms.</p>
              </div>
              <div>
                 <div className="text-5xl md:text-6xl font-semibold text-brand-primary mb-4 tracking-tighter">
                   <Counter value={10000} suffix="+" />
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Units Delivered</p>
                 <p className="text-sm font-semibold text-white/60 max-w-[220px] mx-auto">Field-proven engineering deployed globally.</p>
              </div>
              <div>
                 <div className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tighter">
                   ASIL-D
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Safety Integrity</p>
                 <p className="text-sm font-semibold text-white/60 max-w-[220px] mx-auto">Hardware diagnostics for mission-critical EV use.</p>
              </div>
           </div>
           {/* Glow */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
        </section>

        {/* Leadership Section */}
        <section className="mb-40">
           <div className="text-center mb-20">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-4">Engineering Focus</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">Core Product Families</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  role: "Single-Phase OBC", 
                  title: "Elite & EliteX Series", 
                  desc: "Flagship 3.3kW to 7.2kW on-board chargers with high-density LLC architecture.",
                  icon: Cpu 
                },
                { 
                  role: "Three-Phase Systems", 
                  title: "Ultra & UltraX Series", 
                  desc: "High-power 11kW to 20kW charging solutions for heavy industrial and fleet platforms.",
                  icon: Zap 
                },
                { 
                  role: "DC-DC Conversion", 
                  title: "Delta & DeltaX Series", 
                  desc: "Robust 750W to 1.5kW power converters for mission-critical auxiliary architectures.",
                  icon: Target 
                }
              ].map((member, i) => (
                <div key={i} className="p-10 rounded-[40px] bg-white border border-slate-100 group hover:shadow-2xl hover:border-brand-primary/10 hover:-translate-y-2 transition-all duration-700">
                   <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                      <member.icon className="w-8 h-8" />
                   </div>
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">{member.role}</h4>
                   <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-6">{member.title}</p>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">{member.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </div>

      <ContactSection />
    </main>
  );
}
