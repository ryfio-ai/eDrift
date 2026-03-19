"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ContactSection } from "@/components/sections/ContactSection";
import { Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl text-left"
        >
          <Badge variant="cyan" className="mb-8">About eDrift</Badge>
          <h1 className="text-6xl md:text-8xl font-black font-space text-slate-900 mb-10 tracking-tighter leading-[0.9]">
            The New Standard in <br />
            <span className="text-gradient">Power Electronics</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-16 font-medium">
            Founded in Coimbatore, eDrift Electric is a specialized technology company 
            dedicated to accelerating the global transition to sustainable mobility 
            through world-class charging engineering.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-y border-slate-100">
             <div className="group">
                <div className="w-16 h-16 rounded-2xl bg-royal-blue/5 border border-slate-100 flex items-center justify-center text-royal-blue mb-6 group-hover:scale-110 transition-transform">
                   <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-space text-slate-900 mb-4">India&apos;s Engineering Edge</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                   Our R&D facility in Tamil Nadu leverages the region&apos;s deep industrial heritage with 
                   cutting-edge global trends in wide-bandgap semiconductors.
                </p>
             </div>
             <div className="group">
                <div className="w-16 h-16 rounded-2xl bg-vibrant-purple/5 border border-slate-100 flex items-center justify-center text-vibrant-purple mb-6 group-hover:scale-110 transition-transform">
                   <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-space text-slate-900 mb-4">The SiC Revolution</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                   By switching from traditional silicon to Silicon Carbide (SiC) and Gallium Nitride (GaN), 
                   we hit industry-leading 98% efficiency with 30% smaller footprints.
                </p>
             </div>
          </div>
        </motion.div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "2024", desc: "The year we pioneered smart SiC-based charging for the Indian market.", color: "text-royal-blue" },
             { title: "98%", desc: "Peak efficiency benchmark achieved across our OBC series.", color: "text-royal-blue" },
             { title: "IP67", desc: "Rugged standard for survival in extreme outdoor conditions.", color: "text-vibrant-purple" }
           ].map((item, idx) => (
             <div key={idx} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <h4 className={`text-5xl font-space font-black ${item.color} mb-6`}>{item.title}</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
      
      <ContactSection />
    </div>
  );
}
