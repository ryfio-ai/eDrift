"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Rocket, ShieldCheck } from "lucide-react";

export const MissionVision = () => {
  const pillars = [
    {
      label: "Mission",
      title: "Engineering Efficiency",
      desc: "Enable zero-emission mobility through engineering-efficient power systems that reduce energy loss and improve field reliability.",
      icon: Target
    },
    {
      label: "Vision",
      title: "Global Center for PE",
      desc: "Help position India as a global center for advanced power electronics engineering and EV infrastructure innovation.",
      icon: Rocket
    },
    {
      label: "Strategy",
      title: "Modular Scaling",
      desc: "Build modular, scalable power systems that support fleet growth, OEM deployment, and long-term electrification goals.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="why-edrift" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Why eDrift</p>
            <div className="w-12 h-[2px] bg-brand-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            A Focused Mission for the <br />
            <span className="text-brand-primary">EV Transition</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="p-10 border border-slate-100 bg-slate-50/50 rounded-[40px] hover:bg-white hover:border-brand-primary/20 hover:shadow-2xl transition-all duration-500 group text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary mx-auto mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                <pillar.icon className="w-8 h-8" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-black text-brand-primary mb-4">{pillar.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{pillar.title}</h3>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
