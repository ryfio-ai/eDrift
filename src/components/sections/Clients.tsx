"use client";

import React from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "Tech Partner 1", initials: "TP" },
  { name: "EV OEM Partner", initials: "EO" },
  { name: "Grid Tech", initials: "GT" },
  { name: "Semiconductor Ltd", initials: "SC" },
  { name: "Logistics Pro", initials: "LP" },
];

export const Clients = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">Strategic Ecosystem</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Industrial & <span className="text-brand-primary">Technology Partnerships</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {partners.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-40 h-40 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center p-6 group hover:border-brand-primary hover:shadow-lg transition-all duration-300">
                 <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-bold text-slate-300 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-all">
                    {client.initials}
                 </div>
                 <p className="mt-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{client.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
