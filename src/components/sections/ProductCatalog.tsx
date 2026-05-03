"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { FilterSidebar, FilterState } from "./FilterSidebar";
import { products } from "@/data/products";
import { Search, SlidersHorizontal, PackageOpen, X } from "lucide-react";

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
  const [filterMounted, setFilterMounted] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.metadata.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = filters.category.length === 0 || filters.category.includes(product.category);
      const matchPower = filters.powerRating.length === 0 || filters.powerRating.includes(product.powerRating);
      const matchInput = filters.inputType.length === 0 || filters.inputType.some((it) => product.inputSpecs.includes(it));
      const matchOutput = filters.outputVoltage.length === 0 || filters.outputVoltage.some((ov) => product.voltageRange.includes(ov));
      const matchStatus = filters.status.length === 0 || product.badges.some((b) => filters.status.includes(b));

      return matchSearch && matchCategory && matchPower && matchInput && matchOutput && matchStatus;
    });
  }, [filters, searchQuery]);

  const clearFilters = () => setFilters(initialFilters);

  const openMobileFilter = () => {
    setIsMobileFilterOpen(true);
    requestAnimationFrame(() => setFilterMounted(true));
  };

  const closeMobileFilter = () => {
    setFilterMounted(false);
    setTimeout(() => setIsMobileFilterOpen(false), 280);
  };

  return (
    <section id="catalog" className="pt-10 pb-20 px-6 bg-bg-main min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 border-b border-border-subtle pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-primary" />
            <div className="text-[10px] tracking-[0.15em] font-semibold text-text-faint uppercase">Product Engineering Catalog</div>
          </div>
          <h2 className="mb-10 text-text-main">
            Automotive Grade <span className="text-brand-primary">Power Systems</span>
          </h2>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative group flex-grow w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by SKU, power rating, or application..."
                className="w-full bg-white border border-border-strong rounded-lg h-12 pl-12 pr-6 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={openMobileFilter}
              className="lg:hidden btn-primary w-full h-12 text-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Refine Specifications
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-28 h-fit">
            <FilterSidebar filters={filters} onChange={setFilters} onClear={clearFilters} />
          </aside>

          {/* Right Product Grid Area */}
          <main className="flex-grow">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[10px] font-semibold tracking-wider text-text-faint uppercase">
                <span className="text-text-main tech-value">{filteredProducts.length}</span> Results Available
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-bg-subtle rounded-lg border border-dashed border-border-strong">
                <PackageOpen className="w-12 h-12 text-text-faint mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-text-main mb-2">Technical Match Not Found</h3>
                <p className="text-text-muted text-sm mb-8 max-w-xs text-center font-medium">
                  Try adjusting your filters or search query to find a matching power specification.
                </p>
                <button onClick={clearFilters} className="btn-outline bg-white">
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-[999]"
            style={{ opacity: filterMounted ? 1 : 0, transition: "opacity 0.28s ease" }}
            onClick={closeMobileFilter}
          />
          <div
            className="fixed right-0 top-0 h-full w-full max-w-[360px] bg-white z-[1000] shadow-2xl p-6 overflow-y-auto"
            style={{
              transform: filterMounted ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-lg font-bold text-text-main">Refine Specifications</h4>
              <button
                onClick={closeMobileFilter}
                className="p-2 rounded bg-bg-subtle text-text-faint hover:text-text-main transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="pb-24">
              <FilterSidebar filters={filters} onChange={setFilters} onClear={clearFilters} />
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-border-subtle lg:hidden">
              <button onClick={closeMobileFilter} className="btn-primary w-full h-12 text-xs">
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
