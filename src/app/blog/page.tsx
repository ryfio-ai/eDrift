"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Clock, Tag, BookOpen } from "lucide-react";

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "technical-guides", "oem-resources", "industry-insights"];

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Blog Header */}
        <div className="max-w-3xl mb-20">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">Engineering Knowledge Hub</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 leading-tight">
            Insights Into <br />
            <span className="text-brand-primary">Power Electronics Innovation</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Technical guides, industry trends, and OEM integration strategy from the eDrift engineering team.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-slate-100 pb-8">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                 activeCategory === cat 
                 ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                 : "bg-slate-50 text-slate-400 hover:bg-slate-100"
               }`}
             >
               {cat.replace('-', ' ')}
             </button>
           ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
           {filteredPosts.map((post, idx) => (
             <motion.article 
               key={post.slug}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="group flex flex-col h-full bg-white border border-slate-100 rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500"
             >
               <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-full w-full flex items-center justify-center text-slate-200 uppercase tracking-widest text-[10px] font-bold">Engineering Insights</div>
               </div>
               
               <div className="p-8 flex-grow flex flex-col">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/5 px-3 py-1 rounded-full">
                      {post.category.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                       <Clock className="w-3 h-3" /> {post.readingTime}
                    </span>
                 </div>

                 <h3 className="text-xl font-semibold text-slate-900 mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                 </h3>

                 <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8 line-clamp-3">
                   {post.excerpt}
                 </p>

                 <div className="mt-auto pt-6 border-t border-slate-50">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary group-hover:translate-x-2 transition-transform"
                    >
                       Technical Post <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>
               </div>
             </motion.article>
           ))}
        </div>
      </div>
    </main>
  );
}
