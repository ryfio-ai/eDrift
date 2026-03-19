"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SpecTable } from "@/components/ui/SpecTable";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const OBC_3_3kW = [
  { label: "Input Voltage Range", value: "170V – 270V AC" },
  { label: "Input RMS Current", value: "16A" },
  { label: "Output Voltage Options", value: "48V / 60V / 72V / 84V / 96V" },
  { label: "Max Output Current", value: "60A (48V), 55A (60V), 45A (72V), 40A (84V), 35A (96V)" },
  { label: "Power", value: "3.3kW" },
  { label: "Efficiency", value: "98%" },
  { label: "Power Factor", value: "0.98" },
];

const OBC_6_6kW = [
  { label: "Input Voltage Range", value: "170V – 270V AC" },
  { label: "Input RMS Current", value: "32A" },
  { label: "Output Voltage Options", value: "108V / 144V / 312V / 520V" },
  { label: "Max Output Current", value: "60A (108V), 46A (144V), 20A (312V), 40A (520V)" },
  { label: "Power", value: "6.6kW" },
  { label: "Efficiency", value: "98%" },
  { label: "Power Factor", value: "0.98" },
];

export default function OnboardChargerPage() {
  const [activeTab, setActiveTab] = useState<"3.3kW" | "6.6kW">("3.3kW");

  return (
    <div className="pt-32 pb-24 px-6 bg-navy-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/#products" className="inline-flex items-center text-text-secondary hover:text-accent-teal mb-8 transition-colors group">
           <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
           >
             <Badge className="mb-6">Advanced OBC Series</Badge>
             <h1 className="text-4xl md:text-6xl font-black font-space text-text-primary mb-6">
                On-Board EV <br />
                <span className="text-gradient">Charger (OBC)</span>
             </h1>
             <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                Next-generation charging solutions using Silicon Carbide (SiC) MOSFET technology. 
                IP67 rated, 98% efficiency, and automotive-grade reliability for any electric vehicle ecosystem.
             </p>
             <div className="space-y-4 mb-10">
                {["CAN Communication", "Natural/Forced Air Cooling", "Smart Over-Voltage Protection", "Compact Enclosure"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-text-primary">
                    <CheckCircle2 className="w-5 h-5 text-accent-green" />
                    <span>{f}</span>
                  </div>
                ))}
             </div>
             <Link href="/contact">
               <GlowButton className="px-10 py-4 text-lg">Request a Quote</GlowButton>
             </Link>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square glass flex items-center justify-center overflow-hidden"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/10 to-transparent" />
              <div className="relative z-10 p-12 text-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                 <div className="text-8xl font-black font-space italic text-white/10 uppercase">OBC Visual</div>
                 <p className="text-text-secondary mt-4">3D CAD Rendering Placeholder</p>
              </div>
           </motion.div>
        </div>

        {/* Tabbed Specs */}
        <div className="mb-24">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                 <h2 className="text-3xl font-black font-space text-text-primary mb-2">Technical Specifications</h2>
                 <p className="text-text-secondary">Explore the performance metrics of our OBC variants.</p>
              </div>
              <div className="flex bg-navy-mid/50 p-1.5 rounded-full border border-border-subtle">
                 {(["3.3kW", "6.6kW"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-2.5 rounded-full font-bold transition-all ${
                        activeTab === tab 
                        ? "bg-gradient-to-r from-primary-start to-primary-end text-navy-dark shadow-lg" 
                        : "text-text-secondary hover:text-text-primary"
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
                transition={{ duration: 0.3 }}
              >
                <SpecTable rows={activeTab === "3.3kW" ? OBC_3_3kW : OBC_6_6kW} />
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Mechanical Specs Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <GlassCard className="p-8 border-accent-teal/5">
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                 <div className="w-1.5 h-8 bg-accent-teal rounded-full" />
                 Common Mechanical Specs
              </h3>
              <ul className="space-y-4 text-text-secondary">
                 <li className="flex justify-between border-b border-border-subtle pb-2">
                    <span>Voltage Compatibility</span>
                    <span className="text-text-primary font-mono">48V – 96V (Configurable)</span>
                 </li>
                 <li className="flex justify-between border-b border-border-subtle pb-2">
                    <span>IP Rating</span>
                    <span className="text-text-primary font-mono">IP67 Waterproof</span>
                 </li>
                 <li className="flex justify-between border-b border-border-subtle pb-2">
                    <span>Operating Temp</span>
                    <span className="text-text-primary font-mono">–40°C to +55°C</span>
                 </li>
                 <li className="flex justify-between border-b border-border-subtle pb-2">
                    <span>Size</span>
                    <span className="text-text-primary font-mono">~280 × 160 × 140 mm</span>
                 </li>
                 <li className="flex justify-between">
                    <span>Topology</span>
                    <span className="text-text-primary font-mono">LLC + Sync Rectification</span>
                 </li>
              </ul>
           </GlassCard>

           <div className="grid grid-cols-1 gap-8">
              <GlassCard className="p-8 bg-accent-green/5 border-accent-green/10">
                 <h4 className="font-bold text-accent-green mb-4 capitalize">Protection Suite</h4>
                 <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-accent-green" /> OVP (Over Voltage)
                    </div>
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-accent-green" /> OCP (Over Current)
                    </div>
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-accent-green" /> OTP (Over Temp)
                    </div>
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-accent-green" /> Short Circuit
                    </div>
                 </div>
              </GlassCard>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-start/10 to-primary-end/10 border border-white/5">
                 <p className="text-text-primary font-bold mb-2">Need a Custom Configuration?</p>
                 <p className="text-text-secondary text-sm mb-4">Our R&D team can customize voltage ranges and cooling options for your specific platform.</p>
                 <Link href="/contact" className="text-accent-teal font-bold hover:underline">Contact Engineering &rarr;</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
