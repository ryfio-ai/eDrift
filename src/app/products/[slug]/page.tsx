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
  Settings, 
  Truck, 
  CheckCircle2, 
  Download, 
  FileText,
  Thermometer,
  Cpu,
  Layers,
  ArrowUpRight
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
                   className="object-cover"
                 />
                 <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                    {product.badges.map(badge => (
                      <span key={badge} className="px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-lg">
                        {badge}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Technical Summary Row */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Efficiency</p>
                    <p className="text-xl font-bold text-slate-900">{product.efficiency}</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Power</p>
                    <p className="text-xl font-bold text-slate-900">{product.powerRating}</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Protection</p>
                    <p className="text-xl font-bold text-slate-900">{product.formFactor.ipRating}</p>
                 </div>
              </div>
            </motion.div>

            {/* Right: Overview & Primary Specs */}
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">{product.category}</div>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">{product.name}</h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
                {product.description}
              </p>

              <div className="space-y-4 mb-12">
                 <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Key Engineering Features</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                         <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                         <span className="text-sm text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-10 border-t border-slate-100">
                 <button className="btn-primary h-14 px-10">Request Technical RFQ</button>
                 <button className="btn-outline h-14 px-10 gap-3">
                    <Download className="w-5 h-5" />
                    Download Datasheet
                 </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Deep Dive - Modular Cards */}
        <section className="py-24 border-t border-slate-100 mt-20">
           <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-4">
                 <FileText className="w-8 h-8 text-brand-primary" />
                 Engineering Specifications
              </h2>
              <p className="text-slate-500 mt-2 font-medium">Categorized technical parameters for system integration.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Electrical Platform */}
              <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary shadow-sm">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-slate-900 leading-tight">Electrical Platform</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Power & Efficiency</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Nominal Power", value: product.powerRating },
                      { label: "Voltage Range", value: product.voltageRange },
                      { label: "Efficiency [%]", value: product.efficiency },
                      { label: "Power Factor", value: product.powerFactor },
                      { label: "Input Parameters", value: product.inputSpecs }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-3">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.label}</span>
                         <span className="text-sm font-black text-slate-900">{item.value}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Card 2: Mechanical & Thermal */}
              <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary shadow-sm">
                       <Thermometer className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-slate-900 leading-tight">Mechanical & Thermal</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Environment & Form</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Ingress Protection", value: product.formFactor.ipRating },
                      { label: "Thermal Range", value: product.formFactor.tempRange },
                      { label: "Dimensions [mm]", value: product.formFactor.dimensions },
                      { label: "Unit Weight", value: product.formFactor.weight }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-3">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.label}</span>
                         <span className="text-sm font-black text-slate-900">{item.value}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Card 3: Systems & Protection */}
              <div className="p-8 rounded-[32px] bg-slate-900 text-white shadow-2xl shadow-slate-900/20">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-primary">
                       <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-white leading-tight">Mission Critical Suite</h3>
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Protection & Logic</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="flex flex-col gap-3">
                       <span className="text-xs font-bold text-white/40 uppercase tracking-wide">Active Protections</span>
                       <div className="flex flex-wrap gap-2">
                          {product.protections.map(p => (
                            <span key={p} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-[9px] font-bold">
                               {p}
                            </span>
                          ))}
                       </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-white/40 uppercase tracking-wide">Customization</span>
                          <span className="text-[10px] font-black text-brand-primary underline">Available</span>
                       </div>
                       <ul className="space-y-2">
                          {product.customization.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-[11px] font-medium text-white/60 flex items-center gap-2">
                               <CheckCircle2 className="w-3 h-3 text-brand-primary" />
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Lead Time & Sourcing Section */}
        <section className="pb-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-brand-primary" />
                    Global Logistics & Lead Times
                 </h3>
                 <div className="space-y-6">
                    {product.leadTime.map((lt, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                         <div>
                            <p className="text-sm font-bold text-slate-900">{lt.volume}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Sourcing Volume</p>
                         </div>
                         <div className="text-right">
                            <p className="text-xl font-black text-brand-primary">{lt.weeks}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Delivery ETA</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-10 rounded-[40px] bg-white border-2 border-brand-primary/10 relative overflow-hidden flex flex-col justify-center">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Need a custom technical profile?</h3>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed max-w-md">
                       Our engineering team can map proprietary CAN protocols, adjust voltage trim points, and design custom mounting brackets for your specific chassis.
                    </p>
                    <Link href="/contact" className="btn-primary h-16 px-10 inline-flex items-center gap-3 group">
                       Contact Engineering Team
                       <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                 </div>
                 {/* Design Accent */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              </div>
           </div>
        </section>

        {/* Application Ecosystem */}
        <section className="pb-32 border-t border-slate-100 pt-32">
           <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-4">Real World Utility</div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Application Ecosystem</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.application.ecosystem?.map((app, i) => (
                <div key={i} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                   <div className="flex items-center gap-6 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform">
                         {i === 0 ? <Zap className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
                      </div>
                      <h4 className="text-xl font-semibold text-slate-900">{app.type}</h4>
                   </div>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      Optimized integration for {app.compatibility}. {product.name} maintains mission-critical reliability for these specific industrial use cases.
                   </p>
                </div>
              ))}
           </div>
        </section>
      </div>
    </main>
  );
}
