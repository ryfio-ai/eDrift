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
      className="group flex flex-col glass-card overflow-hidden hover:-translate-y-2 transition-all duration-500 h-full relative"
    >
      {/* Product Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-50 border-b border-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
          {product.badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1.5 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-md shadow-xl"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-[2px] bg-brand-primary" />
             <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-primary">{product.category}</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-brand-primary transition-colors tracking-tight">
            {product.name}
          </h3>
          <p className="text-slate-500 text-sm font-semibold leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Specs Grid - Enhanced for Visibility */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { icon: Zap, label: "Power", val: product.powerRating, color: "text-brand-primary" },
            { icon: ShieldCheck, label: "Safety", val: product.ipRating, color: "text-emerald-500" },
            { icon: Cpu, label: "Logic", val: product.topology, color: "text-slate-400" },
            { icon: ArrowUpRight, label: "Efficiency", val: product.efficiency, color: "text-brand-primary" }
          ].map((spec, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 rounded-[14px] bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-brand-primary/10 transition-all">
               <div className="flex items-center justify-between">
                  <spec.icon className={`w-3.5 h-3.5 ${spec.color}`} />
                  <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">{spec.label}</p>
               </div>
               <p className="text-xs font-black text-slate-900 tracking-tight">{spec.val}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-3">
          <Link href="/contact" className="btn-primary w-full shadow-lg shadow-brand-primary/10">
            Request Quote
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
          <Link href={`/products/${product.slug}`} className="btn-outline w-full text-[10px]">
            Technical Drawings
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
