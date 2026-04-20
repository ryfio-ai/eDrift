"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { calculatorConfig } from "@/lib/calculator/config";
import { Calculator, HelpCircle } from "lucide-react";
import { slugify } from "@/lib/calculator/utils";
import { cn } from "@/lib/utils";

// Format a field label to render subscripts correctly
const formatLabel = (label: string) => {
  if (!label) return label;
  if (label.includes("_")) {
    const parts = label.split("_");
    return (
      <>
        {parts[0]}
        <sub style={{ letterSpacing: "-0.5px" }}>{parts[1]}</sub>
      </>
    );
  }
  const match = label.match(/^([A-ZΔ])(in|out|peak|rms|max)$/);
  if (match) {
    return (
      <>
        {match[1]}
        <sub style={{ letterSpacing: "-0.5px" }}>{match[2]}</sub>
      </>
    );
  }
  return label;
};

export const CalculatorSidebar: React.FC = () => {
  const params = useParams();
  const slugParam = params?.slug;
  const activeSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  
  return (
    <div className="flex flex-col h-full bg-white border-r border-[#e5e7eb] print:hidden">
      {/* Sidebar Header - Simplified as requested */}
      <div className="py-6 px-5 border-b border-[#e5e7eb] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0086c1]/10 flex items-center justify-center text-[#0086c1]">
            <Calculator className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[25px] leading-none text-[#1e293b] tracking-tight">
               Design Calculator
            </h1>
            <p className="text-[12px] text-[#64748b] font-bold tracking-widest mt-1 uppercase">
              Engineering Suite
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-clean py-6 pr-1">
          {calculatorConfig.categories.map((category) => (
            <div key={category.name} className="mb-5">
              <h2 className="text-[15px] font-semibold text-[#64748b] mb-2 px-6 capitalize tracking-normal">
                {category.name.toLowerCase()}
              </h2>
              <ul className="flex flex-col relative space-y-0.5">
                {category.variables.map((variable) => {
                  const slug = slugify(variable.label);
                  const isActive = activeSlug === slug;
                  
                  // Extract base name if label contains (symbol)
                  const baseName = variable.label.includes("(")
                    ? variable.label.split("(")[0].trim()
                    : variable.label;

                  const showSymbol = variable.symbol && 
                    variable.symbol.toLowerCase() !== baseName.toLowerCase();

                  return (
                    <li key={variable.name} className="relative px-1 pl-5">
                      <Link
                        href={`/design-calculator/${slug}`}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-[14px] md:text-[15px] rounded transition-all duration-200 hover:translate-x-0.5 cursor-pointer",
                          isActive
                            ? "bg-[#ebf5fa] text-[#0086c1] font-semibold shadow-sm"
                            : "text-[#1e293b] hover:bg-[#ebf5fa] bg-transparent font-medium"
                        )}
                      >
                        <span className="text-left">
                          {baseName}
                          {showSymbol && (
                            <span className="ml-1">
                              ({formatLabel(variable.symbol!)})
                            </span>
                          )}
                        </span>
                        <div className="group relative">
                           <HelpCircle className={cn(
                              "w-3.5 h-3.5 transition-colors",
                              isActive ? "text-[#0086c1]/40" : "text-slate-200 group-hover:text-[#64748b]"
                           )} />
                           <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none shadow-xl">
                              {variable.unit ? `Unit: ${variable.unit} | ` : ""}{variable.helptext}
                           </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom space with line to stop scrollbar short of the bottom */}
        <div className="px-6 pb-12 shrink-0">
          <div className="border-t border-gray-400 opacity-20"></div>
        </div>
      </div>
    </div>
  );
};
