"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { ArrowRight, BarChart3, Building2, Globe2 } from "lucide-react";

export default function CaseStudiesIndex() {
  return (
    <main className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">Social Proof & Industrial Validation</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 leading-tight">
            Proven Performance in <br />
            <span className="text-brand-primary">Critical Environments</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Case studies detailing how eDrift's power electronics enable OEMs and fleet operators to meet efficiency, reliability, and TCO targets.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12 mb-32">
           {caseStudies.map((study, idx) => (
             <motion.div
               key={study.slug}
               initial={{ opacity: 0, scale: 0.98, y: 30 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="group relative bg-slate-50 border border-slate-100 rounded-[48px] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700"
             >
               <div className="flex flex-col lg:flex-row items-stretch min-h-[450px]">
                  {/* Result Panel */}
                  <div className="lg:w-[400px] bg-slate-900 p-12 flex flex-col justify-between relative overflow-hidden group-hover:bg-brand-primary transition-colors duration-700">
                     <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8">
                           <BarChart3 className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Key Outcome</p>
                        <h4 className="text-2xl font-semibold text-white leading-tight">
                           {study.resultSummary}
                        </h4>
                     </div>
                     
                     <div className="relative z-10 pt-12 border-t border-white/10">
                        <div className="grid grid-cols-2 gap-6">
                           {study.metrics.slice(0, 2).map((m, i) => (
                              <div key={i}>
                                 <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">{m.label}</p>
                                 <p className="text-xl font-bold text-white">{m.after}</p>
                                 <p className="text-[10px] text-green-400 font-bold">{m.improvement}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                     
                     {/* Abs Background Glow */}
                     <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
                  </div>

                  {/* Context Panel */}
                  <div className="flex-grow p-12 lg:p-16 flex flex-col justify-center">
                     <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                           <Building2 className="w-4 h-4" /> {study.industry}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                           <Globe2 className="w-4 h-4" /> Regional Deployment
                        </span>
                     </div>

                     <h2 className="text-3xl font-semibold text-slate-900 mb-6 group-hover:text-brand-primary transition-colors">
                        {study.title}
                     </h2>

                     <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 line-clamp-3">
                        {study.challenge}
                     </p>

                     <Link 
                       href={`/case-studies/${study.slug}`} 
                       className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary group-hover:translate-x-2 transition-transform"
                     >
                        Read Deep Narrative <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </main>
  );
}
