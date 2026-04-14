"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowLeft, Battery, Zap } from "lucide-react";

const Portable_Specs = [
  { label: "Config. Output Voltage", value: "48V, 60V, 72V, 84V, 96V, 240V, & 400V Nominal" },
  { label: "Common Output Power", value: "3.3kW" },
  { label: "Max Output Current", value: "60A Max" },
  { label: "Efficiency", value: "> 97.5%" },
  { label: "IP Grade", value: "IP67 Rated Housing" },
  { label: "Portability", value: "Lightweight & Compact Enclosure" },
  { label: "Features", value: "Production Certified & Tested" },
];

export default function PortableChargerPage() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/products" className="inline-flex items-center text-brand-primary hover:underline mb-12 transition-all font-semibold uppercase text-[10px] tracking-widest gap-2">
           <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
           >
             <Badge variant="purple" className="mb-8 font-semibold">Premium Powerhouse</Badge>
             <h1 className="text-5xl md:text-7xl font-bold font-sans text-text-main mb-8 tracking-tighter leading-tight">
                Portable EV <br />
                <span className="text-brand-primary">Charger Series_</span>
             </h1>
             <p className="text-text-muted text-xl mb-12 leading-relaxed font-medium">
                Experience the pinnacle of portable power. Built using automotive-grade components, 
                our 3.3kW portable charger series offers unparalleled flexibility and industrial ruggedness.
             </p>
             <div className="space-y-4 mb-12">
                {["Suitable for 48V to 400V", "Vibration Resistant", "Smart Heat Sync", "Precision GUI Config"].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-text-main font-semibold">
                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    {f}
                  </div>
                ))}
             </div>
             <GlowButton variant="purple" size="lg" className="h-16 px-10 rounded-2xl">Download Portfolio</GlowButton>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[32px] overflow-hidden group shadow-2xl bg-bg-main border border-border-subtle"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center border border-border-subtle">
                     <Battery className="w-16 h-16 text-brand-primary" />
                  </div>
                  <Badge variant="cyan" className="font-semibold shadow-sm">Premium Grade Components</Badge>
              </div>
           </motion.div>
        </div>

        {/* Technical Data */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-brand-primary" />
                    <p className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Technical Specs</p>
                 </div>
                 <h2 className="text-4xl font-bold font-heading text-text-main tracking-tight">EBC Portable Series Data</h2>
              </div>
           </div>

           <div className="w-full overflow-hidden rounded-[24px] border border-border-subtle bg-bg-main shadow-sm">
              <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-white border-b border-border-subtle">
                      <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Parameter</th>
                      <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Official Rating</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border-subtle">
                   {Portable_Specs.map((row, i) => (
                     <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-4.5 text-sm font-semibold text-text-muted group-hover:text-text-main transition-colors">{row.label}</td>
                       <td className="px-8 py-4.5 text-sm font-bold text-text-main tech-value">{row.value}</td>
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
