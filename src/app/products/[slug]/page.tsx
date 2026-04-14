"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import Image from "next/image";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  FileText,
  Cpu,
  Gauge,
  Layers,
  ArrowUpRight,
  Download
} from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Navigation */}
        <div className="mb-12">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Product Image & Badges */}
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
            >
              <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl">
                 <Image 
                   src={product.image} 
                   alt={product.name}
                   fill
                   className="object-cover opacity-90"
                 />
                 <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                    <span className="px-5 py-2 rounded-full bg-brand-primary text-[10px] font-black uppercase tracking-[0.1em] text-white shadow-xl shadow-brand-primary/20">
                       {product.series} Series
                    </span>
                    {product.badges.map(badge => (
                      <span key={badge} className="px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-lg">
                        {badge}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Technical Summary Row */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Power</p>
                    <p className="text-xl font-bold text-slate-900">{product.powerRating}</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Voltage</p>
                    <p className="text-xl font-bold text-slate-900">{product.voltageRange}</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current</p>
                    <p className="text-xl font-bold text-slate-900">{product.maxCurrent}</p>
                 </div>
              </div>
            </motion.div>

            {/* Right: Overview & Primary Specs */}
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary">{product.category}</div>
                <div className="text-xs font-black text-slate-400 tracking-[0.1em] font-mono">{product.metadata.sku}</div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">{product.name}</h1>
              <p className="text-lg text-slate-500 font-semibold leading-relaxed mb-10 italic">
                &quot;{product.tagline}&quot;
              </p>
              <p className="text-base text-slate-600 font-medium leading-relaxed mb-12">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-6 pt-10 border-t border-slate-100">
                 <Link href="/contact" className="btn-primary h-16 px-10 flex items-center justify-center gap-3">
                   Request Technical RFQ
                   <ArrowUpRight className="w-5 h-5" />
                 </Link>
                 <Link href={product.metadata.datasheetUrl} className="btn-outline h-16 px-10 gap-3">
                    <Download className="w-5 h-5" />
                    Technical Specs
                 </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Deep Dive */}
        <section className="py-24 border-t border-slate-100 mt-20">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex flex-col gap-4">
                    <div className="w-12 h-1 bg-brand-primary rounded-full" />
                    Engineering <br />Specifications_
                 </h2>
                 <p className="text-slate-500 mt-6 font-semibold leading-relaxed">
                    Automotive-grade validation parameters for eDrift {product.series} platform integration.
                 </p>
                 <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl shadow-brand-primary/20 relative overflow-hidden group">
                    <ShieldCheck className="w-10 h-10 text-brand-primary mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-lg font-bold mb-3 tracking-tight">Technical Support</h4>
                    <p className="text-sm text-white/60 font-medium leading-relaxed mb-8">
                       Our hardware engineering team provides direct integration consultation for OEM power chains.
                    </p>
                    <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-brand-primary hover:text-white transition-colors">
                       Talk to Engineering →
                    </Link>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
                 </div>
              </div>

              <div className="lg:col-span-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                    {product.specs.map((spec, i) => (
                       <div key={i} className="flex justify-between items-center py-5 border-b border-slate-100 group">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{spec.label}</span>
                             {spec.notes && <span className="text-[9px] font-bold text-brand-primary/60 uppercase tracking-tight">{spec.notes}</span>}
                          </div>
                          <span className="text-sm font-black text-slate-900 group-hover:text-brand-primary transition-colors">{spec.value}</span>
                       </div>
                    ))}
                    {/* Fallback if specs are few */}
                    <div className="flex justify-between items-center py-5 border-b border-slate-100 group">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Input Topology</span>
                       <span className="text-sm font-black text-slate-900">{product.inputSpecs}</span>
                    </div>
                    <div className="flex justify-between items-center py-5 border-b border-slate-100 group">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Part Number</span>
                       <span className="text-sm font-black text-slate-900 font-mono">{product.metadata.sku}</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}
