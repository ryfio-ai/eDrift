"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Battery, Cpu, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "Elite Series OBC",
    desc: "Flagship AC-DC conversion platform (3.3kW - 7.2kW) specialized for high-density automotive environments.",
    icon: Battery,
    href: "/products?category=On+Board+Charger"
  },
  {
    title: "Ultra High-Power",
    desc: "Industrial three-phase solutions (11kW - 20kW) designed for high-utilization commercial fleet depots and heavy EVs.",
    icon: Zap,
    href: "/products?powerRating=11kW&powerRating=20kW"
  },
  {
    title: "Delta Series DC-DC",
    desc: "Robust 750W to 1.5kW converters for auxiliary traction power, ECUs, and mission-critical low-voltage architectures.",
    icon: Cpu,
    href: "/products?category=On+Board+DC-DC"
  },
  {
    title: "Magna / Combo",
    desc: "Advanced integrated 2-in-1 systems and bi-directional V2L platforms for next-generation mobile energy hubs.",
    icon: Share2,
    href: "/products?category=2-in-1+Integrated+OBC&category=Bi-Directional+Charger+(V2L)"
  }
];

export const ProductOverview = () => {
  return (
    <section id="products" className="py-24 px-6 bg-white overflow-hidden">
      <div className="section-container">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <p className="label-uppercase">Product Platform</p>
          </div>
          <h2 className="mb-8">
            Power Conversion Systems for <br />
            <span className="text-brand-primary">EV and Industrial Mobility</span>
          </h2>
          <p className="text-lg text-text-muted font-medium max-w-2xl leading-relaxed">
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
              className="group p-10 border border-border-subtle bg-bg-subtle rounded-[24px] hover:bg-white hover:border-brand-primary/20 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-brand-primary mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                  <product.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-6 tracking-tight leading-tight">{product.title}</h3>
                <p className="text-sm font-medium text-text-muted leading-relaxed mb-10">{product.desc}</p>
              </div>
              
              <Link href={product.href} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-faint group-hover:text-brand-primary transition-colors">
                View Specifications
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16 pt-16 border-t border-border-subtle">
           <Link href="/products" className="text-[10px] font-bold uppercase tracking-widest text-text-faint hover:text-brand-primary flex items-center gap-3 transition-colors">
              Compare Product Options
              <ArrowRight className="w-4 h-4" />
           </Link>
           <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest text-text-faint hover:text-brand-primary flex items-center gap-3 transition-colors">
              Talk to an Applications Engineer
              <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </div>
    </section>
  );
};
