"use client";

import React from "react";
import { motion } from "framer-motion";

export const MetricsSection = () => {
  const metrics = [
    { label: "Peak Efficiency", val: "97.5%", desc: "Industry-leading power conversion" },
    { label: "Design Life", val: "10+ Years", desc: "Built for industrial durability" },
    { label: "Prototyping", val: "4-6 Weeks", desc: "Rapid feasibility to validation" },
    { label: "Safety Standard", val: "ASIL-D", desc: "Highest functional safety alignment" }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center lg:text-left"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-3">{metric.label}</p>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">{metric.val}</h3>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{metric.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
