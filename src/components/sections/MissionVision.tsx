"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export const MissionVision = () => {
  return (
    <section id="mission" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-teal/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4">Our Purpose</Badge>
          <h2 className="text-4xl md:text-5xl font-black font-space text-text-primary mb-6">
            Driving Sustainable <br />
            <span className="text-gradient">Innovations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="h-full p-10 border-l-4 border-l-primary-start">
              <h3 className="text-2xl font-black font-space text-text-primary mb-6 uppercase tracking-tighter">Mission</h3>
              <p className="text-lg text-text-secondary leading-relaxed italic">
                &ldquo;To design and deliver reliable, efficient, and intelligent EV charging solutions that empower users, accelerate the adoption of electric mobility, and contribute to a cleaner and more sustainable energy future.&rdquo;
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="h-full p-10 border-l-4 border-l-primary-end">
              <h3 className="text-2xl font-black font-space text-text-primary mb-6 uppercase tracking-tighter">Vision</h3>
              <p className="text-lg text-text-secondary leading-relaxed italic">
                &ldquo;To enable a sustainable and energy-efficient mobility ecosystem by developing innovative EV charging technologies that seamlessly integrate vehicles with other vehicles and external loads, empowering vehicles to intelligently consume, share, and utilize energy in everyday life.&rdquo;
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
