"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Clock, ArrowRight, Share2, Mail, Linkedin, Download } from "lucide-react";
import Link from "next/link";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation & Metadata */}
        <div className="mb-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/5 px-4 py-1.5 rounded-full">
              {post.category.replace('-', ' ')}
            </span>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
               <Clock className="w-4 h-4" /> {post.readingTime}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               {post.date}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between py-8 border-y border-slate-100 gap-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-bold border border-slate-100">EE</div>
                <div>
                   <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">eDrift Engineering</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Power Electronics R&D</p>
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-brand-primary transition-all">
                   <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-brand-primary transition-all">
                   <Mail className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-brand-primary transition-all">
                   <Share2 className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Content Render */}
        <MarkdownRenderer content={post.content} />

        {/* Gated Lead Magnet CTA */}
        <div
           className="p-12 bg-slate-50 border border-slate-100 rounded-[48px] text-center mb-32"
           data-animate
        >
          <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mx-auto mb-10 shadow-sm">
             <Download className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight">Need Advanced Specifications?</h2>
          <p className="text-lg text-slate-500 font-medium mb-10 max-w-xl mx-auto">
             Download the **eDrift OEM Buyer’s Guide** for detailed power electronics benchmarking and SiC/GaN integration strategies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link href="/resources" className="btn-primary h-14 px-10">Download Free Guide</Link>
             <Link href="/contact" className="btn-outline h-14 px-10">Request Technical Demo</Link>
          </div>
        </div>
      </div>

      {/* Footer Internal Linking */}
      <div className="bg-slate-50 py-24 px-6 border-t border-slate-100">
         <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-900 mb-12 tracking-tight">Expand Your Technical Knowledge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {blogPosts.filter(p => p.slug !== slug).slice(0, 3).map((related) => (
                 <Link 
                   key={related.slug} 
                   href={`/blog/${related.slug}`}
                   className="p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
                 >
                    <p className="text-[9px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">{related.category.replace('-', ' ')}</p>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 group-hover:text-brand-primary transition-colors">{related.title}</h4>
                    <p className="text-sm text-slate-400 font-medium line-clamp-2">{related.excerpt}</p>
                 </Link>
               ))}
            </div>
         </div>
      </div>
    </article>
  );
}
