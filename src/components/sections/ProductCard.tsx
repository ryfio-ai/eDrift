"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu, ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 h-full"
    >
      {/* Product Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-slate-700 rounded-lg shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">{product.category}</p>
          <h3 className="text-xl font-semibold text-slate-900 leading-tight mb-2 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: Zap, label: "Power", val: product.powerRating, color: "text-brand-primary" },
            { icon: ShieldCheck, label: "Protection", val: product.ipRating, color: "text-emerald-600" },
            { icon: Cpu, label: "Topology", val: product.topology, color: "text-slate-600" },
            { icon: ArrowUpRight, label: "Efficiency", val: product.efficiency, color: "text-brand-primary" }
          ].map((spec, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100/50">
               <spec.icon className={`w-4 h-4 ${spec.color}`} />
               <div className="min-w-0">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{spec.label}</p>
                  <p className="text-[11px] font-bold text-slate-900 truncate">{spec.val}</p>
               </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-2">
          <Link href="/contact" className="btn-primary w-full h-11 text-xs">
            Request Quote
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
          <Link href={product.href} className="btn-outline w-full h-11 text-xs">
            <Download className="w-3.5 h-3.5 mr-2" />
            View Datasheet
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
