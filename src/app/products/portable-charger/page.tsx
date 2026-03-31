"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Battery, Zap } from "lucide-react";

const Portable_Specs = [
  { label: "Config. Output Voltage", value: "48V, 60V, 72V, 84V, 96V, 240V, & 400V Nominal" },
  { label: "Common Output Power", value: "3.3kW" },
  { label: "Max Output Current", value: "60A Max" },
  { label: "Efficiency", value: "> 97%" },
  { label: "IP Grade", value: "IP67 Rated Case" },
  { label: "Portability", value: "Lightweight & Compact Enclosure" },
  { label: "Features", value: "Built & Assembled in India" },
];

export default function PortableChargerPage() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/#products" className="inline-flex items-center text-vibrant-purple hover:underline mb-12 transition-all font-black uppercase text-[10px] tracking-widest gap-2">
           <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
           >
             <Badge variant="purple" className="mb-8">Premium Powerhouse</Badge>
             <h1 className="text-5xl md:text-7xl font-black font-sans text-slate-900 mb-8 tracking-tighter leading-none">
                Portable EV <br />
                <span className="text-gradient">Charger Series</span>
             </h1>
             <p className="text-slate-600 text-xl mb-12 leading-relaxed font-medium">
                Experience the pinnacle of portable power. Built in India using premium components, 
                our 3.3kW portable charger series offers unparalleled flexibility and ruggedness.
             </p>
             <div className="space-y-4 mb-12">
                {["Suitable for 48V to 400V", "Vibration Resistant", "Smart Heat Sync", "Precision GUI Config"].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-800 font-bold">
                    <div className="w-2 h-2 rounded-full bg-vibrant-purple" />
                    {f}
                  </div>
                ))}
             </div>
             <GlowButton variant="purple" size="lg" className="h-16 rounded-2xl">Download Portfolio</GlowButton>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[40px] overflow-hidden group shadow-2xl bg-slate-50 border border-slate-100"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant-purple/5 to-royal-blue/5" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                     <Battery className="w-16 h-16 text-vibrant-purple" />
                  </div>
                  <Badge variant="cyan" className="font-sans">Premium Grade Components</Badge>
              </div>
           </motion.div>
        </div>

        {/* Technical Data */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                 <Badge variant="purple" className="mb-4">System Data</Badge>
                 <h2 className="text-4xl font-black font-sans text-slate-900 tracking-tighter">Technical Specifications</h2>
              </div>
           </div>

           <div className="w-full overflow-hidden rounded-[40px] border border-slate-100 bg-slate-50/50 backdrop-blur shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-white/50 backdrop-blur">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-vibrant-purple">Parameter</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-vibrant-purple">Official Rating</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {Portable_Specs.map((row, i) => (
                     <tr key={i} className="group hover:bg-white transition-colors">
                       <td className="px-8 py-5 text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{row.label}</td>
                       <td className="px-8 py-5 text-sm font-black font-sans text-slate-900">{row.value}</td>
                     </tr>
                   ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
