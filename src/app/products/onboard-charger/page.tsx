"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Zap, Shield, Sparkles } from "lucide-react";

const OBC_Specs = [
  { label: "Config. Output Voltage", value: "48V, 60V, 72V, 84V, 96V, 240V, & 400V Nominal" },
  { label: "Config. Output Power", value: "3.3kW (Common) | Range: 2.2kW – 6.6kW" },
  { label: "Max Output Current", value: "60A Max" },
  { label: "Input Voltage Range", value: "180V – 275V AC" },
  { label: "Input RMS Current", value: "30A Max" },
  { label: "Efficiency", value: "> 97%" },
  { label: "Power Factor", value: "> 0.98" },
  { label: "Electrical Protection", value: "OVP, OCP, OTP Integrated" },
];

const Mech_Specs = [
  { label: "Operation Temp", value: "-40°C to +55°C" },
  { label: "IP Rating", value: "IP67 Waterproof" },
  { label: "Mechanical Protection", value: "Vibration Resistance" },
  { label: "Form Factor", value: "Approx. 280 x 160 x 140 mm" },
  { label: "Cooling", value: "Smart Thermal Control" },
  { label: "Topology", value: "LLC + Sync Rec with SiC MOSFET" },
];

export default function OnboardChargerPage() {
  const [activeTab, setActiveTab] = useState<"Electrical" | "Mechanical">("Electrical");

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/#products" className="inline-flex items-center text-royal-blue hover:underline mb-12 transition-all font-black uppercase text-[10px] tracking-widest gap-2">
           <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
           >
             <Badge variant="cyan" className="mb-8 text-royal-blue">Production Series</Badge>
             <h1 className="text-5xl md:text-7xl font-black font-heading text-slate-900 mb-8 tracking-tighter leading-none">
                On-Board EV <br />
                <span className="text-gradient">Charger (OBC)</span>
             </h1>
             <p className="text-slate-600 text-xl mb-12 leading-relaxed font-medium">
                Our rugged and high-efficiency On-Board Chargers are designed for the most demanding 
                EV platforms, offering 3.3kW common power rating across a wide voltage spectrum.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {["Suitable for 48V to 400V", "User Config GUI", "SiC MOSFET Enabled", "Compact & Light Weight"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-800 font-bold text-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    {f}
                  </div>
                ))}
             </div>
             <GlowButton variant="primary" size="lg" className="h-16 rounded-2xl">Request Specs</GlowButton>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[40px] overflow-hidden group shadow-2xl bg-slate-50 border border-slate-100"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/5 to-vibrant-purple/5" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                     <Zap className="w-16 h-16 text-royal-blue" />
                  </div>
                  <Badge variant="green" className="font-sans">97%+ Efficiency</Badge>
              </div>
           </motion.div>
        </div>

        {/* Tabbed Specs */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                 <Badge variant="purple" className="mb-4">Engineering Data</Badge>
                 <h2 className="text-4xl font-black font-heading text-slate-900 tracking-tighter">Product Specifications</h2>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-3xl border border-slate-200">
                 {(["Electrical", "Mechanical"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                        activeTab === tab 
                        ? "bg-gradient-to-r from-royal-blue to-vibrant-purple text-white shadow-lg" 
                        : "text-slate-500 hover:text-slate-900"
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
                <div className="w-full overflow-hidden rounded-[40px] border border-slate-100 bg-slate-50/50 backdrop-blur shadow-2xl">
                   <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/50 backdrop-blur">
                           <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-royal-blue">Parameter</th>
                           <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-royal-blue">Official Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(activeTab === "Electrical" ? OBC_Specs : Mech_Specs).map((row, i) => (
                          <tr key={i} className="group hover:bg-white transition-colors">
                            <td className="px-8 py-5 text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{row.label}</td>
                            <td className="px-8 py-5 text-sm font-black font-sans text-slate-900">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Highlight Banner */}
        <div className="p-16 rounded-[48px] bg-slate-900 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-royal-blue/20 blur-[100px] -z-0" />
           <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-grow">
                 <h3 className="text-3xl font-black font-heading mb-4 tracking-tight">Need a custom voltage configuration?</h3>
                 <p className="text-slate-400 font-medium max-w-xl">Our chargers come with a user-configurable GUI and can be tailored to any battery chemistry from 48V to 400V.</p>
              </div>
              <GlowButton variant="primary" size="lg" className="shrink-0 bg-white text-slate-900 border-none">Consult Engineering</GlowButton>
           </div>
        </div>
      </div>
    </div>
  );
}
