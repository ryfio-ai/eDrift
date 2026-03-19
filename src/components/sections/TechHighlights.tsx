"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Thermometer, 
  Lock, 
  Gauge, 
  Factory, 
  Settings 
} from "lucide-react";

const highlights = [
  { title: "SiC & GaN Power Semiconductors", icon: <Cpu className="w-5 h-5" /> },
  { title: "LLC Resonant Topology", icon: <Zap className="w-5 h-5" /> },
  { title: "CAN Communication Interface", icon: <Settings className="w-5 h-5" /> },
  { title: "Smart Thermal Management", icon: <Thermometer className="w-5 h-5" /> },
  { title: "OVP / OCP / OTP Protection", icon: <Lock className="w-5 h-5" /> },
  { title: "Power Factor > 0.98", icon: <Gauge className="w-5 h-5" /> },
  { title: "IP67 Rugged Enclosure", icon: <Factory className="w-5 h-5" /> },
  { title: "User Configurable GUI", icon: <ShieldCheck className="w-5 h-5" /> }
];

export const TechHighlights = () => {
  return (
    <section id="tech" className="py-24 px-6 relative bg-navy-mid/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge className="mb-4">Innovation Focus</Badge>
            <h2 className="text-4xl md:text-5xl font-black font-space text-text-primary">
              Engineering <span className="text-gradient">Excellence</span>
            </h2>
          </div>
          <p className="text-text-secondary md:text-right max-w-sm">
            Leveraging next-generation topologies to push the boundaries of power density and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl border border-white/5 bg-navy-mid/30 hover:border-accent-teal/30 hover:bg-navy-mid/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center text-accent-teal mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="font-bold text-text-primary text-sm tracking-tight leading-snug">
                {item.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
