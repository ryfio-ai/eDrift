"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Battery, Cpu, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "3.3kW On-Board Charger",
    desc: "Built for efficient AC-DC conversion in automotive applications where compact packaging, safety, and thermal performance matter.",
    icon: Battery,
    href: "/products/ebc-33-sic"
  },
  {
    title: "Portable Fleet Charger",
    desc: "Designed for commercial and fleet charging environments that require mobility, fast deployment, and dependable field operation.",
    icon: Zap,
    href: "/products/ebc-portable"
  },
  {
    title: "Custom PSU Solution",
    desc: "For OEMs and industrial partners who need application-specific voltage, packaging, control, or thermal design requirements.",
    icon: Cpu,
    href: "/products/custom-psu"
  },
  {
    title: "DC Fast Charging Systems",
    desc: "High-power charging architecture for infrastructure and vehicle programs that require robust and scalable charging performance.",
    icon: Share2,
    href: "/products/dc-fast-charger"
  }
];

export const ProductOverview = () => {
  return (
    <section id="products" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Product Platform</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            Power Conversion Systems for <br />
            <span className="text-brand-primary">EV and Industrial Mobility</span>
          </h2>
          <p className="text-lg text-slate-500 font-semibold max-w-2xl leading-relaxed">
            Choose from standard product platforms or work with our engineering team on custom power architecture requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 border border-slate-100 bg-slate-50/50 rounded-3xl hover:bg-white hover:border-brand-primary/20 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                  <product.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{product.title}</h3>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest leading-relaxed mb-10">{product.desc}</p>
              </div>
              
              <Link href={product.href} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-primary transition-colors">
                View Specifications
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16 pt-16 border-t border-slate-50">
           <Link href="/products" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary flex items-center gap-3">
              Compare Product Options
              <ArrowRight className="w-4 h-4" />
           </Link>
           <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary flex items-center gap-3">
              Talk to an Applications Engineer
              <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </div>
    </section>
  );
};
