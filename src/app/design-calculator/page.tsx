"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculatorConfig } from "@/lib/calculator/config";
import { slugify } from "@/lib/calculator/utils";
import Link from "next/link";
import { ArrowRight, Search, Settings2, Zap, LayoutGrid, Clock } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 space-y-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
           <Zap className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
           <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">Engineering Suite V2.0</span>
        </div>
        <h1 className="text-[40px] md:text-[64px] font-black text-slate-800 tracking-tighter leading-tight">
          Precision Engineering <br />
          <span className="text-brand-primary">At Your Fingertips_</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          The industry-standard suite for power electronics designers. 
          Complex calculations, simplified into a premium, interactive experience.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto pt-6 group">
           <div className="absolute inset-0 bg-brand-primary/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-brand-primary transition-colors z-10" />
           <input 
             type="text" 
             placeholder="Search for tools (e.g. Inductance, Flux Density, RMS Current...)"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="relative w-full h-18 pl-16 pr-8 rounded-[24px] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 focus:border-brand-primary focus:ring-0 outline-none text-[16px] font-semibold transition-all z-10 placeholder:text-slate-300"
           />
        </div>
      </motion.div>

      {/* Categories & Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-20"
      >
        {filteredCategories.map((category) => (
          <div key={category.name} className="space-y-10">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
               <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <LayoutGrid className="w-5 h-5" />
               </div>
               <div className="flex flex-col">
                  <h2 className="text-[18px] font-black text-slate-800 tracking-tight">{category.name}</h2>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                     {category.variables.length} Technical Modules
                  </p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {category.variables.map((v) => (
                 <motion.div variants={cardVariants} key={v.name}>
                    <Link 
                      href={`/design-calculator/${slugify(v.label)}`} 
                      className="group relative flex flex-col h-full p-8 bg-white rounded-[32px] border border-slate-100 hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 overflow-hidden"
                    >
                       {/* Background Accent */}
                       <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                       
                       <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className="w-12 h-12 rounded-[18px] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                             <Settings2 className="w-6 h-6" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                       </div>

                       <div className="relative z-10 flex-1">
                          <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-brand-primary transition-colors leading-tight">
                            {v.label}
                          </h3>
                          <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                             {v.helptext}
                          </p>
                       </div>

                       <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Launch Module</span>
                          {v.unit && (
                             <div className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                Unit: {v.unit}
                             </div>
                          )}
                       </div>
                    </Link>
                 </motion.div>
               ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
         <div className="text-center py-40">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
               <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">No tools found</h3>
            <p className="text-slate-500 font-medium">Try searching with a different keyword.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-6 text-brand-primary font-bold hover:underline"
            >
              Clear search
            </button>
         </div>
      )}
    </div>
  );
}
