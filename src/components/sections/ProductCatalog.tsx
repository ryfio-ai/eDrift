"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { FilterSidebar, FilterState } from "./FilterSidebar";
import { products } from "@/data/products";
import { Search, SlidersHorizontal, ArrowRight, PackageOpen, X } from "lucide-react";

const initialFilters: FilterState = {
  category: [],
  powerRating: [],
  inputType: [],
  outputVoltage: [],
  ipRating: [],
  useCase: [],
};

export const ProductCatalog = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = filters.category.length === 0 || filters.category.includes(product.category);
      const matchPower = filters.powerRating.length === 0 || filters.powerRating.includes(product.powerRating);
      const matchInput = filters.inputType.length === 0 || filters.inputType.includes(product.inputType);
      const matchOutput = filters.outputVoltage.length === 0 || filters.outputVoltage.includes(product.outputVoltage);
      const matchIP = filters.ipRating.length === 0 || filters.ipRating.includes(product.ipRating);
      const matchUseCase = filters.useCase.length === 0 || product.useCase.some(uc => filters.useCase.includes(uc));

      return matchSearch && matchCategory && matchPower && matchInput && matchOutput && matchIP && matchUseCase;
    });
  }, [filters, searchQuery]);

  const clearFilters = () => setFilters(initialFilters);

  return (
    <section id="catalog" className="py-20 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-12 border-b border-slate-100 pb-16">
          <div className="max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">Industrial Power Electronics</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
              Advanced Solutions for <br />
              <span className="text-brand-primary">Automotive OEM Systems</span>
            </h2>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-4">
             {/* Search Bar */}
             <div className="relative group w-full md:w-[400px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                <input 
                   type="text" 
                   placeholder="Search by product name or spec..." 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl h-14 pl-14 pr-6 outline-none focus:border-brand-primary focus:bg-white transition-all text-sm font-medium text-slate-900 shadow-sm"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             
             {/* Mobile Filter Toggle */}
             <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex items-center justify-between w-full p-4 bg-brand-primary text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-brand-primary/20"
             >
                <div className="flex items-center gap-2">
                   <SlidersHorizontal className="w-4 h-4" />
                   Filter Selection
                </div>
                <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 sticky top-32 h-fit">
            <FilterSidebar 
               filters={filters} 
               onChange={setFilters} 
               onClear={clearFilters} 
            />
          </aside>

          {/* Product Grid Area */}
          <main className="flex-grow">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Found <span className="text-slate-900">{filteredProducts.length}</span> Engineering Specifications
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div 
                 layout
                 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                   {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                   ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                 <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm mb-6">
                    <PackageOpen className="w-10 h-10 text-slate-200" />
                 </div>
                 <h3 className="text-2xl font-semibold text-slate-900 mb-2">Technical Match Not Found</h3>
                 <p className="text-slate-400 font-medium mb-10 max-w-xs text-center">Try adjusting your filters or search query to find a matching power specification.</p>
                 <button onClick={clearFilters} className="btn-outline">
                    Reset All Filters
                 </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileFilterOpen(false)}
               className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[999]" 
            />
            <motion.div 
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", damping: 30, stiffness: 300 }}
               className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-[1000] shadow-2xl p-8 overflow-y-auto"
            >
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-2xl font-semibold text-slate-900 tracking-tight">Refine Specifications</h4>
                  <button 
                     onClick={() => setIsMobileFilterOpen(false)}
                     className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                     <X className="w-5 h-5" />
                  </button>
               </div>
               <FilterSidebar 
                  filters={filters} 
                  onChange={setFilters} 
                  onClear={clearFilters} 
               />
               <div className="mt-12 sticky bottom-0 pt-6 bg-white border-t border-slate-100">
                  <button 
                     onClick={() => setIsMobileFilterOpen(false)}
                     className="btn-primary w-full h-14"
                  >
                     View {filteredProducts.length} Results
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
