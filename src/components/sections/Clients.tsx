"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

const partners = [
  { name: "Tech Partner 1", initials: "TP" },
  { name: "EV OEM Partner", initials: "EO" },
  { name: "Grid Tech", initials: "GT" },
  { name: "Semiconductor Ltd", initials: "SC" },
  { name: "Logistics Pro", initials: "LP" },
];

export const Clients = () => {
  return (
    <section className="py-32 px-6 bg-white text-slate-900 border-t border-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-4">Trusted By Leaders</Badge>
          <h2 className="text-3xl md:text-5xl font-black font-space tracking-tighter">
            Technology <span className="text-gradient">Partnerships</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] bg-slate-50 border border-slate-100 flex items-center justify-center group hover:border-royal-blue hover:bg-white hover:shadow-xl transition-all duration-500">
                 <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-xl font-black text-slate-300 group-hover:text-royal-blue group-hover:border-royal-blue/20 transition-all uppercase">
                    {client.initials}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
