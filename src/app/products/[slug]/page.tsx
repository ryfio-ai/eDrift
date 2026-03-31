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
  Layers
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
                    <p className="text-xl font-bold text-slate-900">{product.ipRating}</p>
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

        {/* Technical Deep Dive */}
        <section className="py-32 border-t border-slate-100 mt-20">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* Detailed Specifications Table */}
              <div className="lg:col-span-2">
                 <h2 className="text-3xl font-semibold text-slate-900 mb-10 tracking-tight flex items-center gap-4">
                    <FileText className="text-brand-primary" />
                    Engineering Specifications
                 </h2>
                 <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-slate-50/30">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-slate-50">
                             <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Parameter</th>
                             <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Configuration</th>
                             <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Notes</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {product.specs.map((spec, i) => (
                             <tr key={i} className="bg-white">
                                <td className="p-6 text-sm font-bold text-slate-900">{spec.label}</td>
                                <td className="p-6 text-sm font-medium text-slate-600">{spec.value}</td>
                                <td className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{spec.notes || '-'}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Compliance & Customization Rails */}
              <div className="space-y-12">
                 <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                       <ShieldCheck className="w-5 h-5 text-brand-primary" />
                       Compliance Standards
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {product.compliance.map(std => (
                         <span key={std} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                           {std}
                         </span>
                       ))}
                    </div>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                       <Settings className="w-5 h-5 text-brand-primary" />
                       OEM Customization
                    </h3>
                    <ul className="space-y-4">
                       {product.customization.map((item, i) => (
                         <li key={i} className="text-xs font-medium text-slate-500 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                            {item}
                         </li>
                       ))}
                    </ul>
                 </div>

                 <div className="p-8 bg-slate-900 rounded-[32px] text-white">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                       <Truck className="w-5 h-5 text-brand-primary" />
                       Lead Time (Volume)
                    </h3>
                    <div className="space-y-4">
                       {product.leadTime.map((lt, i) => (
                         <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                            <span className="text-xs font-medium text-slate-400">{lt.volume}</span>
                            <span className="text-sm font-bold text-brand-primary">{lt.weeks}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Application Ecosystem */}
        <section className="pb-32">
           <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-4">Real World Utility</div>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Application Ecosystem</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.applications.map((app, i) => (
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
