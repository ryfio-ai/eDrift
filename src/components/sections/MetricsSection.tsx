"use client";

import React from "react";
import { motion } from "framer-motion";

export const MetricsSection = () => {
  const metrics = [
    { label: "Peak Efficiency", val: "97.5%", desc: "Industry-leading power conversion efficiency." },
    { label: "Design Life", val: "10+ Years", desc: "Engineered for long-term industrial durability." },
    { label: "Prototyping", val: "4-6 Weeks", desc: "Rapid feasibility transition to hardware validation." },
    { label: "Safety Standard", val: "ASIL-D", desc: "Highest functional safety alignment for EV systems." }
  ];

  return (
    <section className="py-24 bg-bg-subtle border-y border-border-subtle">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 flex flex-col justify-center"
            >
              <p className="label-uppercase mb-4">{metric.label}</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-text-main mb-3 tracking-tighter">
                {metric.val}
              </h3>
              <p className="text-sm font-medium text-text-muted leading-relaxed">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
