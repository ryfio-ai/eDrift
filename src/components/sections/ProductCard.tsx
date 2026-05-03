"use client";

import React, { useState } from "react";
import { ArrowRight, Zap, Cpu, Gauge, Layers, ZoomIn } from "lucide-react";
import Image from "next/image";
import { Product } from "@/data/products";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { QuoteModal } from "@/components/ui/QuoteModal";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <div className="product-card group flex flex-col bg-white rounded-2xl overflow-hidden h-full relative">
        {/* Product Image Area */}
        <div
          className="block aspect-[4/3] relative overflow-hidden bg-slate-50 cursor-pointer group/image border-b border-border-subtle/50"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />

          {/* Zoom icon overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors z-20 flex items-center justify-center">
            <div className="opacity-0 group-hover/image:opacity-100 bg-white text-text-main p-2.5 rounded-full shadow-xl transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-300">
              <ZoomIn className="w-5 h-5" />
            </div>
          </div>

          {/* Status Chips */}
          <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
            <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-bold tracking-wider rounded-full uppercase shadow-sm">
              {product.series}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-1 bg-slate-100 text-text-muted text-[10px] font-bold tracking-widest uppercase rounded">
                {product.category}
              </span>
              <span className="text-[10px] font-bold text-text-faint tracking-widest uppercase">
                {product.metadata.sku}
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">
              {product.name}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
              {product.tagline}
            </p>
          </div>

          {/* Clean Specs List */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-3 mb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-text-faint">
                <Zap className="w-3.5 h-3.5 text-brand-primary/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Output Power</span>
              </div>
              <p className="text-sm font-bold text-text-main">{product.powerRating}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-text-faint">
                <Cpu className="w-3.5 h-3.5 text-brand-primary/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Voltage</span>
              </div>
              <p className="text-sm font-bold text-text-main">{product.voltageRange}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-text-faint">
                <Gauge className="w-3.5 h-3.5 text-brand-primary/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Current</span>
              </div>
              <p className="text-sm font-bold text-text-main">{product.maxCurrent}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-text-faint">
                <Layers className="w-3.5 h-3.5 text-brand-primary/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Input</span>
              </div>
              <p className="text-sm font-bold text-text-main truncate" title={product.inputSpecs}>
                {product.inputSpecs.split(' (')[0]}
              </p>
            </div>
          </div>

          {/* Primary Action */}
          <div className="mt-auto">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full h-12 bg-white text-brand-primary border-2 border-brand-primary font-bold tracking-wide rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-brand-primary hover:text-white group/btn shadow-sm hover:shadow-md"
            >
              Request Quote
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={product.image}
        imageAlt={product.name}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={product}
      />
    </>
  );
};
