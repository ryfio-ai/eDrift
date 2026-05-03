"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  title: string;
  slug: string;
  category: string;
  subheadline: string;
  keyMetrics: { value: string; label: string }[];
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  title, 
  slug, 
  category, 
  subheadline,
  keyMetrics 
}) => {
  // We take the first metric to display on the card
  const mainMetric = keyMetrics[0];

  return (
    <Link 
      href={`/case-studies/${slug}`}
      className="group block bg-white border border-border-subtle rounded-[32px] p-8 hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Zap className="w-24 h-24 text-brand-primary" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/5 px-3 py-1 rounded-full">
            {category}
          </span>
          <div className="w-8 h-8 rounded-full bg-bg-soft flex items-center justify-center text-text-faint group-hover:bg-brand-primary group-hover:text-white transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-text-main mb-4 leading-tight group-hover:text-brand-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-text-muted text-sm leading-relaxed mb-8 line-clamp-3">
          {subheadline}
        </p>

        <div className="pt-6 border-t border-border-subtle flex items-end justify-between">
          <div>
            <div className="text-[10px] font-bold text-text-faint uppercase tracking-widest mb-1">{mainMetric.label}</div>
            <div className="text-2xl font-bold text-text-main tech-value">{mainMetric.value}</div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
            Read Case Study <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
