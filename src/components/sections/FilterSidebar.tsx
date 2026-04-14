"use client";

import React from "react";
import { X, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FilterState {
  category: string[];
  powerRating: string[];
  inputType: string[];
  outputVoltage: string[];
  ipRating: string[];
  useCase: string[];
  status: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

const filterGroups = [
  {
    id: "category",
    label: "Product Category",
    options: [
      "Portable EV Charger",
      "On Board Charger",
      "On Board DC-DC",
      "2-in-1 Integrated OBC",
      "Bi-Directional Charger (V2L)"
    ],
  },
  {
    id: "powerRating",
    label: "Output Power",
    options: ["< 1kW", "1–2kW", "3.3kW", "7.2kW", "11kW", "20kW"],
  },
  {
    id: "inputType",
    label: "Input Phase",
    options: ["Single Phase", "Three Phase", "DC Input"],
  },
  {
    id: "outputVoltage",
    label: "System Voltage",
    options: ["14V", "48V", "60V", "72V", "84V", "96V", "400V", "Combo"],
  },
  {
    id: "status",
    label: "Development Stage",
    options: ["In production", "Customizable", "Sample available"],
  },
];

export const FilterSidebar = ({ filters, onChange, onClear }: FilterSidebarProps) => {
  const handleToggle = (groupId: keyof FilterState, option: string) => {
    const current = filters[groupId];
    const next = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    onChange({ ...filters, [groupId]: next });
  };

  const activeCount = Object.values(filters).flat().length;

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
          <h4 className="text-sm font-bold text-text-main uppercase tracking-tight">Technical Filters</h4>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded bg-brand-primary text-[10px] text-white flex items-center justify-center font-bold tech-value">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button 
            onClick={onClear}
            className="text-[10px] font-bold uppercase tracking-widest text-text-faint hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            Clear All
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="space-y-6 max-h-[calc(100vh-320px)] overflow-y-auto pr-4 thin-scrollbar">
        {filterGroups.map((group) => (
          <div key={group.id} className="space-y-4 border-b border-border-subtle pb-6 last:border-0">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-text-faint mb-3">
              {group.label}
            </h5>
            <div className="grid grid-cols-1 gap-2.5">
              {group.options.map((option) => {
                const isChecked = filters[group.id as keyof FilterState].includes(option);
                return (
                  <label 
                    key={option} 
                    className={cn(
                      "flex items-center gap-3 cursor-pointer group transition-all duration-200",
                      isChecked ? "translate-x-0.5" : ""
                    )}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={isChecked}
                        onChange={() => handleToggle(group.id as keyof FilterState, option)}
                      />
                      <div className="w-4 h-4 rounded border border-border-strong peer-checked:border-brand-primary peer-checked:bg-brand-primary flex items-center justify-center transition-all group-hover:border-brand-primary/50">
                        <div className={cn("w-1 h-1 rounded-sm bg-white scale-0 transition-transform", isChecked ? "scale-100" : "")} />
                      </div>
                    </div>
                    <span className={cn(
                       "text-xs font-medium transition-colors tech-value", 
                       isChecked ? "text-brand-primary font-bold" : "text-text-muted group-hover:text-text-main"
                    )}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Support Block */}
      <div className="pt-2">
        <div className="p-5 rounded-lg bg-bg-subtle border border-border-subtle relative overflow-hidden group">
           <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Filter className="w-16 h-16 text-brand-primary" />
           </div>
           <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-brand-primary rounded-full" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Support</p>
           </div>
           <p className="text-xs font-bold text-text-main mb-4 leading-normal">
              Need custom power <br /> specifications?
           </p>
           <Link href="/contact" className="btn-outline w-full h-9 text-[11px] font-bold uppercase tracking-widest bg-white">
              Request RFQ
           </Link>
        </div>
      </div>
    </div>
  );
};
