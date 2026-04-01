"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "Optimizing SiC Switching Topologies for ASIL-D Compliance",
    desc: "A deep dive into functional safety requirements for high-voltage power conversion in automotive environments.",
    date: "March 28, 2026",
    tag: "Functional Safety",
    readTime: "12 min"
  },
  {
    title: "Thermal Derating Strategies in High-Density GaN Modules",
    desc: "Evaluating the performance of Gallium Nitride semiconductors under extreme thermal stress and high-ambient conditions.",
    date: "March 15, 2026",
    tag: "Hardware Design",
    readTime: "8 min"
  },
  {
    title: "The Future of 800V Architecture in Commercial EV Fleets",
    desc: "Why the shift to higher voltage systems is mandatory for the next generation of industrial and long-haul electric mobility.",
    date: "March 02, 2026",
    tag: "Industry Trends",
    readTime: "10 min"
  },
  {
    title: "EMI/EMC Mitigation in 22kW On-Board Charging Systems",
    desc: "Advanced techniques for reducing electromagnetic interference in high-power AC-DC conversion stages.",
    date: "February 18, 2026",
    tag: "Compliance",
    readTime: "15 min"
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-48 px-6 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[3px] bg-brand-primary" />
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Engineering Blog</div>
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[0.95]">
             Technical <br />
             <span className="text-brand-primary">Perspectives_</span>
           </h1>
           <p className="text-xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-2xl">
             In-depth research and engineering insights from our power 
             electronics lab at IIT Palakkad.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {posts.map((post, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-10 group hover:border-brand-primary/30 transition-all duration-500 flex flex-col justify-between"
             >
                <div>
                   <div className="flex items-center gap-4 mb-8">
                      <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 dark:border-slate-800">
                        {post.tag}
                      </span>
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-brand-primary transition-colors">
                     {post.title}
                   </h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                     {post.desc}
                   </p>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                         <Clock className="w-3.5 h-3.5 text-slate-300" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <BookOpen className="w-3.5 h-3.5 text-slate-300" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{post.date}</span>
                      </div>
                   </div>
                   <button className="text-brand-primary hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
