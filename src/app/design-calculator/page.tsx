"use client";

import React, { useState } from "react";
import { calculatorConfig } from "@/lib/calculator/config";
import { slugify } from "@/lib/calculator/utils";
import Link from "next/link";
import { ArrowRight, Search, Settings2 } from "lucide-react";

export default function DesignCalculatorLanding() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = calculatorConfig.categories.map(cat => ({
    ...cat,
    variables: cat.variables.filter(v => 
      v.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.variables.length > 0);

  return (
    <div className="space-y-16">
      {/* Search Header */}
      <div className="pb-12 border-b border-border-subtle">
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tight font-heading">
          Engineering <span className="text-brand-primary">Design Suite_</span>
        </h1>
        <p className="text-lg text-text-muted font-medium mb-10 max-w-2xl">
          Access our comprehensive collection of power electronics design tools, 
          from simple reactance calculations to complex inductor and transformer optimization.
        </p>

        <div className="relative max-w-2xl group">
           <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-faint group-focus-within:text-brand-primary transition-colors" />
           <input 
             type="text" 
             placeholder="Search tools (e.g. Inductance, Reactance, etc.)"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-50 border border-border-subtle focus:bg-white focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary outline-none text-sm font-semibold transition-all"
           />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filteredCategories.map((category) => (
          <div key={category.name} className="space-y-8">
            <div className="flex items-center gap-3">
               <Settings2 className="w-5 h-5 text-brand-primary" />
               <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">{category.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
               {category.variables.map((v) => (
                 <Link 
                   href={`/design-calculator/${slugify(v.label)}`} 
                   key={v.name}
                   className="group p-6 rounded-[24px] border border-border-subtle bg-bg-main hover:bg-white hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500"
                 >
                    <div className="flex items-center justify-between mb-3">
                       <h3 className="text-lg font-bold text-text-main group-hover:text-brand-primary transition-colors">
                         {v.label}
                       </h3>
                       <ArrowRight className="w-5 h-5 text-text-faint opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    <p className="text-xs text-text-muted font-medium line-clamp-2 leading-relaxed">
                       {v.helptext}
                    </p>
                 </Link>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
