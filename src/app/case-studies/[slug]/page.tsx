"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/case-studies";
import { ArrowLeft, CheckCircle2, TrendingUp, BarChart3, Clock, Quote } from "lucide-react";
import Link from "next/link";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation & Header */}
        <div className="mb-20">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>

          <div className="max-w-4xl">
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/5 px-5 py-2 rounded-full mb-8 inline-block">
              Industrial Case Study: {study.industry}
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-10 leading-tight tracking-tight">
               {study.title}
            </h1>
          </div>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 items-start">
           
           {/* Left: Deep Narrative */}
           <div className="lg:col-span-7 space-y-20">
              <section>
                 <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    The Challenge
                 </h2>
                 <p className="text-xl text-slate-600 font-medium leading-relaxed">
                    {study.challenge}
                 </p>
              </section>

              <section>
                 <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    eDrift's Engineering Solution
                 </h2>
                 <p className="text-xl text-slate-600 font-medium leading-relaxed">
                    {study.solution}
                 </p>
              </section>

              {/* Implementation Timeline */}
              <section className="p-12 bg-slate-50 border border-slate-100 rounded-[48px]">
                 <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-primary" />
                    Deployment Timeline
                 </h2>
                 <div className="space-y-8">
                    {study.timeline.map((step, i) => (
                      <div key={i} className="flex gap-8 group">
                         <div className="shrink-0 text-xs font-bold uppercase tracking-widest text-brand-primary w-24">
                            {step.month}
                         </div>
                         <div className="flex-grow pb-8 border-b border-slate-200 group-last:border-0">
                            <p className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-tight">{step.task}</p>
                            <p className="text-xs text-slate-500 font-medium tracking-wide">Validation against Tier-1 automotive standards.</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* Right: Metrics & Testimonial Rail */}
           <aside className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
              <div className="p-10 bg-slate-900 rounded-[48px] text-white overflow-hidden relative">
                 <div className="relative z-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-10 flex items-center gap-3">
                       <BarChart3 className="w-5 h-5 text-brand-primary" />
                       Quantifiable Impact
                    </h3>
                    <div className="space-y-12">
                       {study.metrics.map((m, i) => (
                          <div key={i} className="flex flex-col gap-2">
                             <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">{m.label}</span>
                                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">{m.improvement}</span>
                             </div>
                             <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-bold text-white">{m.after}</span>
                                <span className="text-xs text-white/20 line-through">from {m.before}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 {/* Background Accent */}
                 <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-primary/10 blur-[80px] rounded-full" />
              </div>

              {study.testimonial && (
                <div className="p-10 border border-slate-100 rounded-[48px] relative overflow-hidden group hover:border-brand-primary transition-all duration-700">
                   <Quote className="w-12 h-12 text-slate-100 absolute -top-2 -right-2 group-hover:text-brand-primary/5 transition-colors" />
                   <p className="text-lg text-slate-600 font-medium italic mb-10 relative z-10 leading-relaxed">
                      "{study.testimonial.quote}"
                   </p>
                   <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 font-bold">
                         {study.testimonial.author[0]}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">{study.testimonial.author}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{study.testimonial.role}</p>
                      </div>
                   </div>
                </div>
              )}

              <div className="flex flex-col gap-4 pt-10">
                 <Link href="/contact" className="btn-primary w-full h-14">Request Consultation</Link>
                 <Link href="/products" className="btn-outline w-full h-14">View Hardware Integrations</Link>
              </div>
           </aside>
        </div>
      </div>
    </main>
  );
}
