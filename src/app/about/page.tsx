"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ContactSection } from "@/components/sections/ContactSection";
import { Shield, Zap, Target, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-40 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-5xl text-left"
        >
          <Badge variant="cyan" className="mb-10 text-royal-blue font-black tracking-[0.2em]">Our Engineering Heritage</Badge>
          <h1 className="text-7xl md:text-9xl font-black font-space text-slate-900 mb-12 tracking-tighter leading-[0.85]">
            The New Standard <br />
            In <span className="text-gradient">Power Electronics</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-600 leading-relaxed mb-20 font-medium max-w-4xl">
            eDrift Electric is a specialized technology company 
            dedicated to accelerating the global transition to sustainable mobility 
            through world-class charging engineering and industrial automation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-20 border-y border-slate-100">
             <div className="group">
                <div className="w-20 h-20 rounded-3xl bg-royal-blue/5 border border-slate-100 flex items-center justify-center text-royal-blue mb-8 group-hover:scale-110 transition-transform shadow-sm">
                   <Shield className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black font-space text-slate-900 mb-6 tracking-tight">Engineering Excellence</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                   Our R&D facility leverages deep industrial heritage with 
                   cutting-edge global trends in wide-bandgap semiconductors to deliver unparalleled reliability.
                </p>
             </div>
             <div className="group">
                <div className="w-20 h-20 rounded-3xl bg-vibrant-purple/5 border border-slate-100 flex items-center justify-center text-vibrant-purple mb-8 group-hover:scale-110 transition-transform shadow-sm">
                   <Zap className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black font-space text-slate-900 mb-6 tracking-tight">The SiC Revolution</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                   By switching from traditional silicon to Silicon Carbide (SiC), 
                   we hit industry-leading 98% efficiency with 30% smaller footprints for every platform.
                </p>
             </div>
          </div>
        </motion.div>

        {/* Improved Stats/Milestones Grid */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { title: "2022", desc: "The year we pioneered smart SiC-based charging for the Indian market.", icon: Target, color: "text-royal-blue" },
             { title: "98%", desc: "Peak efficiency benchmark achieved across our production series chargers.", icon: Zap, color: "text-emerald-600" },
             { title: "IIT-P", desc: "Proudly innovating from our specialized R&D hub at IIT Palakkad.", icon: Cpu, color: "text-vibrant-purple" }
           ].map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="p-12 rounded-[48px] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:-translate-y-4 transition-all duration-700"
             >
                <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center ${item.color} mb-8 shadow-sm group-hover:rotate-12 transition-transform`}>
                   <item.icon className="w-8 h-8" />
                </div>
                <h4 className={`text-6xl font-space font-black ${item.color} mb-8 tracking-tighter`}>{item.title}</h4>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
      
      <ContactSection />
    </div>
  );
}
