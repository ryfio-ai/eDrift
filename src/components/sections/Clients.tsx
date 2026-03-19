"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

const clients = [
  { name: "Microchip", color: "#FF0000" },
  { name: "Infineon", color: "#00A19A" },
  { name: "onsemi", color: "#000000" }
];

export const Clients = () => {
  return (
    <section id="clients" className="py-24 px-6 bg-navy-dark">
      <div className="max-w-7xl mx-auto text-center">
        <Badge className="mb-4">Our Ecosystem</Badge>
        <h2 className="text-3xl md:text-4xl font-black font-space text-text-primary mb-4">
          Technology Partners
        </h2>
        <p className="text-text-secondary text-sm uppercase tracking-widest mb-16">
          Collaborating with industry leaders
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="h-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 bg-white/5 hover:bg-white/10">
                 <div className="text-2xl font-black text-text-primary/40 group-hover:text-text-primary font-space italic uppercase">
                    {client.name}
                 </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
