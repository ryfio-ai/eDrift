"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Zap, Shield, Laptop, Gauge } from "lucide-react";

const highlights = [
  {
    title: "SiC MOSFET Technology",
    desc: "Next-gen semiconductors for extreme efficiency and density.",
    icon: Zap,
    color: "text-royal-blue",
    bg: "bg-royal-blue/5"
  },
  {
    title: "CAN v2.0B Protocol",
    desc: "Seamless automotive communication for smart EV integration.",
    icon: Laptop,
    color: "text-vibrant-purple",
    bg: "bg-vibrant-purple/5"
  },
  {
    title: "BMS Protection",
    desc: "Advanced safety algorithms for voltage and current protection.",
    icon: Shield,
    color: "text-royal-blue",
    bg: "bg-royal-blue/5"
  },
  {
    title: "Ultra High Density",
    desc: "Compact mechanical design fitting any vehicle chassis.",
    icon: Gauge,
    color: "text-vibrant-purple",
    bg: "bg-vibrant-purple/5"
  }
];

export const TechHighlights = () => {
  return (
    <section id="tech" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Badge variant="purple" className="mb-4">Internal Tech</Badge>
          <h2 className="text-4xl md:text-6xl font-black font-space text-slate-900 tracking-tighter">
            Smart <span className="text-gradient">Engineering</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="p-10 h-full flex flex-col border border-slate-100 bg-slate-50/50 rounded-[32px] group hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-8 shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{item.desc}</p>
                <div className="mt-auto pt-4 border-t border-slate-200 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   Reliability Focus <div className="w-1 h-1 rounded-full bg-emerald-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
