"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { calculatorConfig } from "@/lib/calculator/config";
import { HelpCircle, ChevronRight } from "lucide-react";
import { slugify } from "@/lib/calculator/utils";
import { cn } from "@/lib/utils";

export const CalculatorSidebar: React.FC = () => {
  const params = useParams();
  const slugParam = params?.slug;
  const activeSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  
  return (
    <div className="w-80 h-full flex flex-col bg-white border-r border-slate-200">
      {/* Sidebar Header with Logo */}
      <div className="p-8 pb-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image 
              src="/images/edrift logo.png" 
              alt="eDrift" 
              fill 
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-none">eDrift Electric</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5">Engineering Suite</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
        {calculatorConfig.categories.map((category) => (
          <div key={category.name}>
            <h3 className="px-2 text-[11px] font-bold text-slate-300 uppercase tracking-[0.15em] mb-4">
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
                    className={cn(
                      "group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 border-l-4",
                      isActive
                        ? "bg-brand-primary/5 text-brand-primary border-brand-primary font-bold shadow-sm shadow-brand-primary/5"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent font-medium"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] truncate">{variable.label} {variable.symbol && `(${variable.symbol})`}</span>
                      <HelpCircle className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-brand-primary/40" : "text-slate-200 group-hover:text-slate-300"
                      )} />
                    </div>
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
