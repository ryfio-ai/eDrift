"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <div className="pt-32 pb-48 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-primary" />
              <p className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Engineering Perspective_</p>
           </div>
           <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-8 tracking-tight leading-[1.1]">
             Technical <br />
             <span className="text-brand-primary">Knowledge Base_</span>
           </h1>
           <p className="text-lg md:text-xl text-text-muted font-medium leading-relaxed max-w-2xl">
             In-depth research and engineering insights from our power 
             electronics lab at IIT Palakkad.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-animate-stagger>
           {blogPosts.map((post, i) => (
             <div
               key={i}
               className="p-10 border border-border-subtle bg-bg-main rounded-[24px] group hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
             >
                <div>
                   {post.featuredImage && (
                     <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-xl border border-border-subtle">
                       <img 
                         src={post.featuredImage} 
                         alt={post.title}
                         className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                     </div>
                   )}
                   <div className="flex items-center gap-4 mb-8">
                      <span className="px-3 py-1 bg-white rounded-lg text-[9px] font-semibold uppercase tracking-widest text-text-faint border border-border-subtle">
                        {post.category.replace('-', ' ')}
                      </span>
                   </div>
                   <h3 className="text-2xl font-bold text-text-main mb-6 group-hover:text-brand-primary transition-colors">
                     {post.title}
                   </h3>
                   <p className="text-sm text-text-muted font-medium leading-relaxed mb-10">
                     {post.excerpt}
                   </p>
                </div>

                <div className="pt-8 border-t border-border-subtle flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                         <Clock className="w-3.5 h-3.5 text-text-faint" />
                         <span className="text-[10px] font-semibold text-text-faint uppercase tracking-wider">{post.readingTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <BookOpen className="w-3.5 h-3.5 text-text-faint" />
                         <span className="text-[10px] font-semibold text-text-faint uppercase tracking-wider">{post.date}</span>
                      </div>
                   </div>
                   <Link href={`/blog/${post.slug}`} className="text-brand-primary hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
