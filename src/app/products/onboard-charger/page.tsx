"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";

const OBC_Specs = [
  { label: "Config. Output Voltage", value: "48V, 60V, 72V, 84V, 96V, 240V, & 400V Nominal" },
  { label: "Config. Output Power", value: "3.3kW (Common) | Range: 2.2kW – 6.6kW" },
  { label: "Max Output Current", value: "60A Max" },
  { label: "Input Voltage Range", value: "180V – 275V AC" },
  { label: "Input RMS Current", value: "30A Max" },
  { label: "Efficiency", value: "> 97.5%" },
  { label: "Power Factor", value: "> 0.98 at full load" },
  { label: "Electrical Protection", value: "OVP, OCP, OTP Fully Integrated" },
];

const Mech_Specs = [
  { label: "Operation Temp", value: "-40°C to +55°C Industrial" },
  { label: "IP Rating", value: "IP67 Waterproof Certification" },
  { label: "Mechanical Protection", value: "SAE J1455 Vibration Comp" },
  { label: "Form Factor", value: "Approx. 280 x 160 x 140 mm" },
  { label: "Cooling", value: "Smart Active Thermal Management" },
  { label: "Topology", value: "LLC + Sync Rec with SiC MOSFET" },
];

export default function OnboardChargerPage() {
  const [activeTab, setActiveTab] = useState<"Electrical" | "Mechanical">("Electrical");

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
             <Badge variant="cyan" className="mb-8 font-semibold">Production Series</Badge>
             <h1 className="text-5xl md:text-7xl font-bold font-heading text-text-main mb-8 tracking-tighter leading-tight">
                On-Board EV <br />
                <span className="text-brand-primary">Charger (OBC)_</span>
             </h1>
             <p className="text-text-muted text-xl mb-12 leading-relaxed font-medium">
                Our rugged and high-efficiency On-Board Chargers are engineered for the most demanding 
                EV platforms, offering scalable power delivery across a wide voltage spectrum.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {["Suitable for 48V to 400V", "Integrated GUI Config", "SiC MOSFET Enabled", "Lightweight Chassis"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-text-main font-semibold text-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    {f}
                  </div>
                ))}
             </div>
             <GlowButton variant="primary" size="lg" className="h-16 px-10 rounded-2xl">Consult Engineering</GlowButton>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[32px] overflow-hidden group shadow-2xl bg-bg-main border border-border-subtle"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center border border-border-subtle">
                     <Zap className="w-16 h-16 text-brand-primary" />
                  </div>
                  <Badge variant="green" className="font-semibold shadow-sm">97.5% Peak Efficiency</Badge>
              </div>
           </motion.div>
        </div>

        {/* Tabbed Specs */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-brand-primary" />
                    <p className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Technical Specs</p>
                 </div>
                 <h2 className="text-4xl font-bold font-heading text-text-main tracking-tight">OBC Platform Data</h2>
              </div>
              <div className="flex bg-bg-main p-1.5 rounded-2xl border border-border-subtle shadow-sm">
                 {(["Electrical", "Mechanical"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 rounded-xl font-semibold text-[11px] uppercase tracking-widest transition-all ${
                        activeTab === tab 
                        ? "bg-brand-primary text-white shadow-md" 
                        : "text-text-faint hover:text-text-main"
                      }`}
                    >
                      {tab}
                    </button>
                 ))}
              </div>
           </div>

           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="w-full overflow-hidden rounded-[24px] border border-border-subtle bg-bg-main shadow-sm">
                   <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white border-b border-border-subtle">
                           <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Parameter</th>
                           <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Official Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {(activeTab === "Electrical" ? OBC_Specs : Mech_Specs).map((row, i) => (
                          <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-4.5 text-sm font-semibold text-text-muted group-hover:text-text-main transition-colors">{row.label}</td>
                            <td className="px-8 py-4.5 text-sm font-bold text-text-main tech-value">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Highlight Banner */}
        <div className="p-16 rounded-[32px] bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] -z-0" />
           <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-grow">
                 <h3 className="text-3xl font-bold font-heading mb-4 tracking-tight">Need a custom voltage configuration?</h3>
                 <p className="text-white/60 font-medium max-w-xl">Our chargers come with an integrated diagnostic GUI and can be tailored to specific battery chemistry from 48V to 400V.</p>
              </div>
              <GlowButton variant="primary" size="lg" className="shrink-0 bg-white text-slate-900 border-none px-10">Consult Engineering</GlowButton>
           </div>
        </div>
      </div>
    </div>
  );
}
