"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Cpu, Gauge, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col bg-white border border-slate-100 rounded-[32px] overflow-hidden hover:-translate-y-1.5 transition-all duration-500 h-full relative hover:shadow-2xl hover:border-brand-primary/20"
    >
      {/* Visual Identity */}
      <div className="block aspect-[16/10] relative overflow-hidden bg-slate-50 border-b border-slate-100 group/img">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover/img:scale-105 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status Badges */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 bg-brand-primary text-white text-[9px] font-black uppercase tracking-[0.1em] rounded-full shadow-lg shadow-brand-primary/20">
            {product.series} Series
          </span>
          {product.badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-white/95 backdrop-blur-md text-slate-900 text-[8px] font-bold uppercase tracking-widest rounded-full border border-slate-100 shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        {/* Identity Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
               {product.category}
            </p>
            <span className="text-[11px] font-black text-brand-primary tracking-wider font-mono">
               {product.metadata.sku}
            </span>
          </div>
          
          <h3 className="text-2xl font-black text-slate-900 leading-[1.2] mb-3 tracking-tight">
            {product.name}
          </h3>
          
          <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* Engineering Specifications Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 group/spec transition-colors hover:bg-white hover:border-brand-primary/10">
              <Zap className="w-4 h-4 text-brand-primary opacity-40 group-hover/spec:opacity-100 transition-opacity" />
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Power</p>
                 <p className="text-xs font-bold text-slate-900">{product.powerRating}</p>
              </div>
           </div>
           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 group/spec transition-colors hover:bg-white hover:border-brand-primary/10">
              <Cpu className="w-4 h-4 text-brand-primary opacity-40 group-hover/spec:opacity-100 transition-opacity" />
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Voltage</p>
                 <p className="text-xs font-bold text-slate-900">{product.voltageRange}</p>
              </div>
           </div>
           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 group/spec transition-colors hover:bg-white hover:border-brand-primary/10">
              <Gauge className="w-4 h-4 text-brand-primary opacity-40 group-hover/spec:opacity-100 transition-opacity" />
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Current</p>
                 <p className="text-xs font-bold text-slate-900">{product.maxCurrent}</p>
              </div>
           </div>
           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 group/spec transition-colors hover:bg-white hover:border-brand-primary/10">
              <Layers className="w-4 h-4 text-brand-primary opacity-40 group-hover/spec:opacity-100 transition-opacity" />
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Input</p>
                 <p className="text-xs font-bold text-slate-900 truncate max-w-[80px]">{product.inputSpecs.split(' (')[0]}</p>
              </div>
           </div>
        </div>

        {/* Action Area */}
        <div className="mt-auto pt-6 border-t border-slate-50">
          <Link href="/contact" className="btn-primary w-full h-[56px] text-xs flex items-center justify-center gap-2 rounded-2xl transition-all shadow-lg shadow-brand-primary/5 hover:shadow-brand-primary/20">
            Initiate Technical RFQ
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
