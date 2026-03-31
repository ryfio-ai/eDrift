"use client";

import React from "react";
import { X, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export interface FilterState {
  category: string[];
  powerRating: string[];
  inputType: string[];
  outputVoltage: string[];
  ipRating: string[];
  useCase: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

const filterGroups = [
  {
    id: "category",
    label: "Product Type",
    options: ["Portable Charger", "On-Board Charger", "Din Rail Power Supply", "Custom PSU"],
  },
  {
    id: "powerRating",
    label: "Power Rating",
    options: ["1-3 kW", "3-6 kW", "6-11 kW", "11 kW+"],
  },
  {
    id: "inputType",
    label: "Input Type",
    options: ["Single Phase", "Three Phase", "Wide Range"],
  },
  {
    id: "outputVoltage",
    label: "Output Voltage",
    options: ["48 V", "72 V", "96 V", "Custom"],
  },
  {
    id: "ipRating",
    label: "IP Rating",
    options: ["IP65", "IP67", "IP68"],
  },
  {
    id: "useCase",
    label: "Use Case",
    options: ["2W/3W", "4W", "Commercial Fleet", "Industrial Automation"],
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
          <SlidersHorizontal className="w-5 h-5 text-brand-primary" />
          <h4 className="text-lg font-semibold text-slate-900 tracking-tight">Technical Filters</h4>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-md bg-brand-primary text-[10px] text-white flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button 
            onClick={onClear}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            Clear All
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <div key={group.id} className="space-y-4 border-b border-slate-100 pb-6 last:border-0">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
              {group.label}
            </h5>
            <div className="grid grid-cols-1 gap-3">
              {group.options.map((option) => {
                const isChecked = filters[group.id as keyof FilterState].includes(option);
                return (
                  <label 
                    key={option} 
                    className={`flex items-center gap-3 cursor-pointer group transition-all duration-300 ${isChecked ? 'translate-x-1' : ''}`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={isChecked}
                        onChange={() => handleToggle(group.id as keyof FilterState, option)}
                      />
                      <div className="w-5 h-5 rounded-md border-2 border-slate-200 peer-checked:border-brand-primary peer-checked:bg-brand-primary flex items-center justify-center transition-all">
                        <div className={`w-1.5 h-1.5 rounded-full bg-white scale-0 transition-transform ${isChecked ? 'scale-100' : ''}`} />
                      </div>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-brand-primary font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Filter className="w-12 h-12 text-brand-primary" />
           </div>
           <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-brand-primary rounded-full" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Engineering Support</p>
           </div>
           <p className="text-sm font-semibold text-slate-900 mb-6 leading-tight">
              Require custom power <br /> specifications for your project?
           </p>
           <Link href="/contact" className="btn-primary w-full h-11 text-xs font-semibold">
              Request Custom RFQ
           </Link>
        </div>
      </div>
    </div>
  );
};
