"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Shield, Zap, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
  };

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg-main pt-32 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column — content */}
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-subtle border border-border-subtle rounded text-brand-primary text-[10px] font-semibold tracking-wider mb-10"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms both" }}
          >
            <Shield className="w-3.5 h-3.5" />
            Automotive-Grade Reliability
          </div>

          <h1
            className="text-text-main mb-6 !leading-[1.1]"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 80ms both" }}
          >
            Automotive-Grade <span className="text-brand-primary">SiC On-Board Chargers</span> & DC-DC Converters for EV OEMs
          </h1>

          <p
            className="text-base md:text-lg text-text-muted leading-relaxed max-w-lg mb-10"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 160ms both" }}
          >
            eDrift Electric designs and manufactures high-efficiency <strong>silicon carbide (SiC) on-board chargers</strong> and <strong>automotive DC-DC converters</strong> for EV manufacturers, providing full engineering support from prototyping to production.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 240ms both" }}
          >
            <Link href="/contact" className="btn-primary w-full sm:w-auto px-8">
              Talk to Engineering
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/products" className="btn-outline w-full sm:w-auto px-8">
              View Catalog
            </Link>
          </div>

          <div
            className="flex flex-wrap gap-x-10 gap-y-4 items-center border-t border-border-subtle pt-8"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 340ms both" }}
          >
            {[
              { icon: Zap, label: "Efficiency", value: "97.5%" },
              { icon: Shield, label: "Functional Safety", value: "ASIL-D" },
              { icon: Globe, label: "Standards", value: "ISO 9001" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold tracking-widest text-text-faint">{item.label}</span>
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-brand-primary/80" />
                  <span className="text-sm font-bold text-text-main tech-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual — Sliding Card Showcase */}
        <div
          className="relative hidden lg:block"
          style={{ animation: "heroFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms both" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative bg-white border border-border-subtle rounded-lg p-10 shadow-sm aspect-[4/3] flex flex-col items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-slate-50/50 -z-10" />
            
            {/* Dashed Border Box */}
            <div className="w-full h-full border border-dashed border-stronger-border rounded overflow-hidden relative">
               
               {/* Slider Inner */}
               <div 
                 className="flex h-full transition-transform duration-700 ease-in-out"
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}
               >
                 {products.map((product) => (
                   <Link 
                     key={product.id} 
                     href={`/products/${product.slug}`}
                     className="w-full h-full shrink-0 flex items-center justify-center p-4 relative"
                   >
                     <div className="relative w-full h-full transform group-hover:scale-[1.08] transition-transform duration-1000">
                        <Image 
                          src={product.image} 
                          alt={`eDrift ${product.series} Series ${product.name} - ${product.powerRating} ${product.category}`}
                          fill
                          className="object-contain mix-blend-multiply"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                        />
                     </div>

                     {/* Product Info Overlay — Extreme Top Right */}
                     <div className="absolute top-2 right-2 p-4 bg-white/90 backdrop-blur-md border border-border-subtle rounded shadow-md z-20 pointer-events-none transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-primary mb-1">
                           {product.id.includes("sic") ? "EBC-33-SiC" : product.metadata.sku.split("-")[0]}
                        </p>
                        <h4 className="text-xs font-black text-slate-900 leading-tight">
                           {product.name}
                        </h4>
                        <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                           REF: {product.metadata.sku}
                        </p>
                     </div>
                   </Link>
                 ))}
               </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-10 right-10 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 suppressHydrationWarning
                 onClick={handlePrev}
                 className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-primary pointer-events-auto transition-all hover:scale-110 active:scale-95"
               >
                 <ChevronLeft className="w-5 h-5" />
               </button>
               <button 
                 suppressHydrationWarning
                 onClick={handleNext}
                 className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-primary pointer-events-auto transition-all hover:scale-110 active:scale-95"
               >
                 <ChevronRight className="w-5 h-5" />
               </button>
            </div>

            {/* Indicator Dots */}
            <div className="absolute bottom-6 flex gap-2">
               {products.slice(0, 5).map((_, i) => (
                 <div 
                   key={i} 
                   className={cn(
                     "h-1.5 rounded-full transition-all duration-300",
                     i === currentIndex % 5 ? "w-6 bg-brand-primary" : "w-1.5 bg-slate-200"
                   )} 
                 />
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
