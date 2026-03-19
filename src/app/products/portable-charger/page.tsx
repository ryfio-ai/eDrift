"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SpecTable } from "@/components/ui/SpecTable";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

// Portable chargers share the same core electrical specs as OBC for eDrift's catalog
const PROT_3_3kW = [
  { label: "Input Voltage Range", value: "170V – 270V AC" },
  { label: "Input RMS Current", value: "16A" },
  { label: "Output Voltage Options", value: "48V / 60V / 72V / 84V / 96V" },
  { label: "Max Output Current", value: "60A (48V), 55A (60V), 45A (72V), 40A (84V), 35A (96V)" },
  { label: "Power", value: "3.3kW" },
  { label: "Efficiency", value: "98%" },
  { label: "Power Factor", value: "0.98" },
];

const DCDC_Specs = [
  { label: "Input Range 72V Nom", value: "44V – 97V → 14V Out" },
  { label: "Input Range 108V Nom", value: "74V – 162V → 14V Out" },
  { label: "Input Range 144V Nom", value: "100V – 200V → 14V Out" },
  { label: "Input Range 320V Nom", value: "220V – 450V → 14V Out" },
  { label: "Current Ratings", value: "80A (1kW) | 100A (1.2kW) | 125A (1.5kW)" },
];

export default function PortableChargerPage() {
  const [activeTab, setActiveTab] = useState<"Charger" | "DC-DC">("Charger");

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
             <Badge className="mb-6">Portable Series</Badge>
             <h1 className="text-4xl md:text-6xl font-black font-space text-text-primary mb-6">
                Portable EV <br />
                <span className="text-gradient">Charger System</span>
             </h1>
             <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                Rugged, lightweight, and highly portable charging solutions for fleet transitions and individual users. 
                IP67 rated for outdoor use with wide temperature tolerance and plug-and-play simplicity.
             </p>
             <div className="space-y-4 mb-10">
                {["Lightweight & Compact", "User Configurable GUI", "Rugged IP67 Enclosure", "High Conversion Efficiency"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-text-primary">
                    <CheckCircle2 className="w-5 h-5 text-accent-teal" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 to-transparent" />
              <div className="relative z-10 p-12 text-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                 <div className="text-8xl font-black font-space italic text-white/10 uppercase">Portable</div>
                 <p className="text-text-secondary mt-4">Product Prototype Placeholder</p>
              </div>
           </motion.div>
        </div>

        {/* Tabbed Specs */}
        <div className="mb-24">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                 <h2 className="text-3xl font-black font-space text-text-primary mb-2">Detailed Specifications</h2>
                 <p className="text-text-secondary">Comprehensive ratings for our portable chargers and DC-DC converters.</p>
              </div>
              <div className="flex bg-navy-mid/50 p-1.5 rounded-full border border-border-subtle">
                 {(["Charger", "DC-DC"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-2.5 rounded-full font-bold transition-all ${
                        activeTab === tab 
                        ? "bg-gradient-to-r from-primary-start to-primary-end text-navy-dark shadow-lg" 
                        : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {tab === "DC-DC" ? "Isolated DC-DC" : "Portable Charger"}
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
                <SpecTable rows={activeTab === "Charger" ? PROT_3_3kW : DCDC_Specs} />
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <GlassCard className="p-8">
              <h4 className="text-accent-teal font-black mb-4 uppercase tracking-tighter">Thermal Management</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                 Advanced heat dissipation using forced air cooling with smart fan control, ensuring peak performance from &ndash;40&deg;C to +55&deg;C.
              </p>
           </GlassCard>
           <GlassCard className="p-8">
              <h4 className="text-accent-teal font-black mb-4 uppercase tracking-tighter">CAN Communication</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                 Standard automotive CAN interface for seamless integration with BMS and vehicle controllers for intelligent charging cycles.
              </p>
           </GlassCard>
           <GlassCard className="p-8">
              <h4 className="text-accent-teal font-black mb-4 uppercase tracking-tighter">IP67 Enclosure</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                 Designed for resilience. Our portable units are fully sealed against dust and immersion, making them perfect for any weather condition.
              </p>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
