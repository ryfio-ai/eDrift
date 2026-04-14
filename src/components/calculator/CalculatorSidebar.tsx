"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { calculatorConfig } from "@/lib/calculator/config";
import { ChevronRight, Calculator, History as HistoryIcon, Clock } from "lucide-react";
import { slugify } from "@/lib/calculator/utils";
import { useCalculatorHistory } from "@/lib/calculator/HistoryContext";

export const CalculatorSidebar: React.FC = () => {
  const params = useParams();
  const slugParam = params?.slug;
  // If slug is array (catch-all), take first, else it's a string
  const activeSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  
  const { history } = useCalculatorHistory();

  return (
    <div className="w-80 h-[calc(100vh-120px)] overflow-y-auto pr-4 custom-scrollbar sticky top-24 pb-12">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-text-main tracking-tight">Design Suite_</h2>
          <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest">Engineering Tools</p>
        </div>
      </div>

      <nav className="space-y-12">
        {/* Recent Section */}
        {history.length > 0 && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
             <div className="flex items-center gap-2 mb-4 px-2">
                <Clock className="w-3.5 h-3.5 text-brand-primary" />
                <h3 className="text-[10px] font-bold text-text-main uppercase tracking-[0.2em]">Recently Calculated</h3>
             </div>
             <div className="space-y-2">
                {history.slice(0, 3).map((item, idx) => (
                  <Link
                    key={`${item.timestamp}-${idx}`}
                    href={`/design-calculator/${slugify(item.variableLabel)}`}
                    className="block group px-3 py-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-primary/20 hover:bg-white transition-all duration-300"
                  >
                    <div className="text-[10px] font-bold text-text-main group-hover:text-brand-primary transition-colors mb-0.5">{item.variableLabel}</div>
                    <div className="text-[9px] text-brand-primary font-bold font-mono">{item.primaryValue} {item.primaryUnit}</div>
                  </Link>
                ))}
             </div>
          </div>
        )}

        {/* Category Menus */}
        {calculatorConfig.categories.map((category) => (
          <div key={category.name}>
            <h3 className="px-2 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">
              {category.name}
            </h3>
            <div className="space-y-1">
              {category.variables.map((variable) => {
                const slug = slugify(variable.label);
                const isActive = activeSlug === slug;

                return (
                  <Link
                    key={variable.name}
                    href={`/design-calculator/${slug}`}
                    className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 font-semibold text-xs border ${
                      isActive
                        ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20"
                        : "text-text-muted hover:text-text-main hover:bg-slate-50 border-transparent"
                    }`}
                  >
                    <span className="truncate">{variable.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "translate-x-0" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};
