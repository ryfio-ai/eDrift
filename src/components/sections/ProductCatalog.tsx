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
  status: [],
};

export const ProductCatalog = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.metadata.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = filters.category.length === 0 || filters.category.includes(product.category);
      const matchPower = filters.powerRating.length === 0 || filters.powerRating.includes(product.powerRating);
      const matchInput = filters.inputType.length === 0 || filters.inputType.some(it => product.inputSpecs.includes(it));
      const matchOutput = filters.outputVoltage.length === 0 || filters.outputVoltage.some(ov => product.voltageRange.includes(ov));
      const matchStatus = filters.status.length === 0 || product.badges.some(b => filters.status.includes(b));

      return matchSearch && matchCategory && matchPower && matchInput && matchOutput && matchStatus;
    });
  }, [filters, searchQuery]);

  const clearFilters = () => setFilters(initialFilters);

  return (
    <section id="catalog" className="py-20 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 border-b border-slate-100 pb-16">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-[3px] bg-brand-primary" />
             <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Industrial Power Catalog</div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-12">
            Automotive Grade <br />
            <span className="text-brand-primary">Power Solutions_</span>
          </h2>

          {/* Top Search Bar - Enhanced for Visibility */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
             <div className="relative group flex-grow w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                <input 
                   type="text" 
                   placeholder="Search by SKU, power rating, or application..." 
                   className="w-full bg-slate-50 border border-slate-200 rounded-[20px] h-16 pl-16 pr-8 outline-none focus:border-brand-primary focus:bg-white focus:shadow-2xl focus:shadow-brand-primary/5 transition-all text-base font-semibold text-slate-900 shadow-sm"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                   <div className="h-6 w-[1px] bg-slate-200" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Advanced Search</span>
                </div>
             </div>
             
             {/* Mobile Filter Toggle */}
             <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden btn-primary w-full h-16 text-sm"
             >
                <SlidersHorizontal className="w-5 h-5" />
                Refine Specs
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 sticky top-32 h-fit">
            <FilterSidebar 
               filters={filters} 
               onChange={setFilters} 
               onClear={clearFilters} 
            />
          </aside>

          {/* Right Product Grid Area */}
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
