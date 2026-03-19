"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Eye, Rocket } from "lucide-react";

export const MissionVision = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-12 h-full border border-slate-100 bg-slate-50/50 rounded-[40px] group transition-all duration-500 hover:bg-white hover:shadow-2xl">
               <div className="w-20 h-20 rounded-3xl bg-royal-blue/5 flex items-center justify-center text-royal-blue mb-10 group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10" />
               </div>
               <Badge className="mb-4">Our Mission</Badge>
               <h3 className="text-3xl md:text-5xl font-black font-space text-slate-900 mb-8 tracking-tighter">
                 Zero-Emission <br /> 
                 <span className="text-royal-blue">Through Efficiency</span>
               </h3>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Our mission is to lead the Indian electric vehicle revolution by providing world-class, 
                  high-efficiency power conversion products that make sustainable transportation 
                  more accessible and reliable for everyone.
               </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-12 h-full border border-slate-100 bg-slate-50/50 rounded-[40px] group transition-all duration-500 hover:bg-white hover:shadow-2xl">
               <div className="w-20 h-20 rounded-3xl bg-vibrant-purple/5 flex items-center justify-center text-vibrant-purple mb-10 group-hover:scale-110 transition-transform">
                  <Rocket className="w-10 h-10" />
               </div>
               <Badge variant="purple" className="mb-4">Our Vision</Badge>
               <h3 className="text-3xl md:text-5xl font-black font-space text-slate-900 mb-8 tracking-tighter">
                 Global Hub for <br /> 
                 <span className="text-vibrant-purple">Power Tech</span>
               </h3>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We envision a future where India is a global hub for power electronics engineering. 
                  eDrift aims to be the standard-bearer for innovation, quality, and excellence 
                  in EV charging infrastructure globally.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
