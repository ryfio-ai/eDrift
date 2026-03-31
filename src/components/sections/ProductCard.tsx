"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
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
      className="group flex flex-col bg-white border border-slate-100 rounded-[32px] overflow-hidden hover:-translate-y-1.5 transition-all duration-500 h-full relative hover:shadow-xl hover:border-brand-primary/20"
    >
      {/* 1. PROFESSIONAL IMAGE VIEWPORT */}
      <Link 
        href={`/products/${product.slug}`} 
        className="block aspect-[16/9] relative overflow-hidden bg-slate-50 border-b border-slate-100 group/img"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover/img:scale-105 transition-transform duration-[1.5s] ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status Indicators (Badges) */}
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
          {product.badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[8px] font-bold uppercase tracking-widest rounded-full border border-slate-100 shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </Link>

      <div className="p-8 flex-grow flex flex-col">
        {/* Identity Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-6 h-[1.5px] bg-brand-primary" />
             <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-primary">{product.category}</p>
          </div>
          
          <Link href={`/products/${product.slug}`} className="block group/title">
            <h3 className="text-[22px] font-bold text-slate-900 leading-tight mb-3 tracking-tight group-hover/title:text-brand-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* LUXURY FOOTER ACTIONS */}
        <div className="mt-auto pt-8 border-t border-slate-50 flex flex-col gap-6">
          <div className="flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">Part Reference</span>
                <span className="text-[10px] font-bold text-slate-900 tracking-wide uppercase">{product.metadata.sku}</span>
             </div>
             
             <Link 
              href={product.metadata.datasheetUrl} 
              className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 hover:text-brand-primary transition-colors uppercase tracking-widest"
              title="Download Technical Datasheet"
             >
               <FileText className="w-3.5 h-3.5" />
               Datasheet
             </Link>
          </div>
          
          <Link href="/contact" className="btn-primary w-full h-[56px] text-[10px] flex items-center justify-center gap-2 rounded-2xl group/btn">
            Initiate Technical RFQ
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
