"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Cpu, Gauge, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { gridItem } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      variants={gridItem}
      className="product-card group flex flex-col bg-white border border-border-subtle rounded-lg overflow-hidden h-full relative"
    >
      {/* Product Image / Technical Rendering */}
      <div className="block aspect-[16/9] relative overflow-hidden bg-bg-main border-b border-border-subtle">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status Chips */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="px-2 py-0.5 bg-brand-primary text-white text-[9px] font-semibold tracking-wider rounded-sm">
            {product.series}
          </span>
          {product.badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-text-main text-[9px] font-semibold tracking-wider rounded-sm border border-border-subtle"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        {/* Product Identity */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold tracking-widest text-text-faint">
               {product.category}
            </p>
            <span className="text-[10px] font-bold text-brand-primary tech-value">
               {product.metadata.sku}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-text-muted text-[13px] leading-relaxed line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* Technical Specification Grid - Industrial Layout */}
        <div className="grid grid-cols-2 gap-px bg-border-subtle border border-border-subtle rounded overflow-hidden mb-6">
           <div className="bg-bg-main p-3">
              <p className="text-[9px] font-bold text-text-faint uppercase tracking-widest mb-1">Power Output</p>
              <div className="flex items-center gap-2">
                 <Zap className="w-3 h-3 text-brand-primary/40" />
                 <p className="text-xs font-bold text-text-main tech-value">{product.powerRating}</p>
              </div>
           </div>
           <div className="bg-bg-main p-3">
              <p className="text-[9px] font-bold text-text-faint uppercase tracking-widest mb-1">Voltage Range</p>
              <div className="flex items-center gap-2">
                 <Cpu className="w-3 h-3 text-brand-primary/40" />
                 <p className="text-xs font-bold text-text-main tech-value">{product.voltageRange}</p>
              </div>
           </div>
           <div className="bg-bg-main p-3">
              <p className="text-[9px] font-bold text-text-faint uppercase tracking-widest mb-1">Peak Current</p>
              <div className="flex items-center gap-2">
                 <Gauge className="w-3 h-3 text-brand-primary/40" />
                 <p className="text-xs font-bold text-text-main tech-value">{product.maxCurrent}</p>
              </div>
           </div>
           <div className="bg-bg-main p-3">
              <p className="text-[9px] font-bold text-text-faint uppercase tracking-widest mb-1">Form Factor</p>
              <div className="flex items-center gap-2">
                 <Layers className="w-3 h-3 text-brand-primary/40" />
                 <p className="text-xs font-bold text-text-main truncate tech-value">{product.inputSpecs.split(' (')[0]}</p>
              </div>
           </div>
        </div>

        {/* Primary Action */}
        <div className="mt-auto pt-4 border-t border-border-subtle">
          <Link 
            href="/contact" 
            className="w-full h-11 bg-bg-main text-text-main border border-border-strong text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded transition-all group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary"
          >
            Technical RFQ
            <ArrowUpRight className="w-4 h-4 cta-arrow" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
