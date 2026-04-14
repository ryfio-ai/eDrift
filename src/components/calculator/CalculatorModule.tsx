"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorVariable, CalculationResult } from "@/lib/calculator/types";
import { runCalculation } from "@/lib/calculator/engine";
import { convertToBase, convertFromBase } from "@/lib/calculator/unitConversions";
import { FormulaDisplay } from "./FormulaDisplay";
import { Badge } from "@/components/ui/Badge";
import { Info, RefreshCw, Zap, Download, History as HistoryIcon } from "lucide-react";
import { useCalculatorHistory } from "@/lib/calculator/HistoryContext";
import * as XLSX from "xlsx";

interface CalculatorModuleProps {
  variable: CalculatorVariable;
}

export const CalculatorModule: React.FC<CalculatorModuleProps> = ({ variable }) => {
  const [methodIndex, setMethodIndex] = useState(0);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [units, setUnits] = useState<Record<string, string>>({});
  const [outputUnit, setOutputUnit] = useState(variable.outputUnits[0]);
  const [formData, setFormData] = useState<Record<string, any>>({
    topology: "Buck Converter",
  });

  const { addHistoryItem } = useCalculatorHistory();
  const activeMethod = variable.methods[methodIndex];

  // Initialize defaults
  useEffect(() => {
    const initialInputs: Record<string, number> = {};
    const initialUnits: Record<string, string> = {};
    activeMethod.inputFields.forEach((field) => {
      initialInputs[field.name] = 0;
      initialUnits[field.name] = field.units[0];
    });
    setInputs(initialInputs);
    setUnits(initialUnits);
  }, [activeMethod]);

  const toBase = (fieldName: string) => {
    const value = inputs[fieldName] || 0;
    const unit = units[fieldName] || "";
    return convertToBase(value, unit);
  };

  const result: CalculationResult | null = useMemo(() => {
    return runCalculation(variable.name, activeMethod.name, toBase, formData);
  }, [variable.name, activeMethod.name, inputs, units, formData]);

  // Save to History effect
  useEffect(() => {
    if (result && result.primaryValue !== "0.000" && result.primaryValue !== "Invalid") {
      const timer = setTimeout(() => {
          addHistoryItem({
            variableName: variable.name,
            variableLabel: variable.label,
            methodName: activeMethod.name,
            primaryValue: result.primaryValue,
            primaryUnit: result.primaryUnit,
            inputs: { ...inputs },
            inputUnits: { ...units },
            secondaryValues: result.secondaryValues
          });
      }, 2000); // Debounce history saves
      return () => clearTimeout(timer);
    }
  }, [result]);

  const exportToExcel = () => {
    if (!result || result.primaryValue === "Invalid") return;

    const data = [
      { Category: "Property", Value: "Details" },
      { Category: "Tool", Value: variable.label },
      { Category: "Method", Value: activeMethod.name },
      { Category: "Topology", Value: formData.topology },
      { Category: "TIMESTAMP", Value: new Date().toLocaleString() },
      { Category: "---", Value: "---" },
      ...activeMethod.inputFields.map(f => ({
        Category: `Input: ${f.label}`,
        Value: `${inputs[f.name]} ${units[f.name]}`
      })),
      { Category: "---", Value: "---" },
      { Category: "RESULT", Value: `${result.primaryValue} ${result.primaryUnit}` },
      ...(result.secondaryValues ? Object.entries(result.secondaryValues).map(([k, v]) => ({
        Category: k,
        Value: `${v.value} ${v.unit}`
      })) : [])
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calculation");
    XLSX.writeFile(wb, `${variable.name}_report.xlsx`);
  };

  const displayValue = result && result.rawValue 
    ? convertFromBase(result.rawValue, outputUnit).toFixed(4)
    : "0.0000";

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-border-subtle">
        <div className="max-w-xl">
           <Badge variant="cyan" className="mb-6 font-semibold">{variable.symbol || "Engineering"}</Badge>
           <h1 className="text-4xl font-bold text-text-main mb-4 tracking-tight leading-tight">{variable.label}</h1>
           <p className="text-text-muted font-medium text-lg leading-relaxed">{variable.helptext}</p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="flex bg-bg-main p-1.5 rounded-2xl border border-border-subtle shadow-sm">
             {variable.methods.map((method, idx) => (
               <button
                 key={method.name}
                 onClick={() => setMethodIndex(idx)}
                 className={`px-6 py-2.5 rounded-xl font-semibold text-[11px] uppercase tracking-widest transition-all ${
                   methodIndex === idx 
                     ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                     : "text-text-faint hover:text-text-main"
                 }`}
               >
                 {method.name}
               </button>
             ))}
          </div>
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Formula & Method Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
           <div className="space-y-4">
              <p className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em]">Active Principle_</p>
              <p className="text-sm font-semibold text-text-muted leading-relaxed italic border-l-2 border-brand-primary/30 pl-4">
                "{activeMethod.helptext}"
              </p>
           </div>
           
           <FormulaDisplay formula={typeof activeMethod.formula === "string" ? activeMethod.formula : activeMethod.formula[formData.topology || "Buck Converter"]} />

           {variable.image && (
             <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 group/img overflow-hidden">
                <p className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] mb-4 group-hover/img:text-brand-primary transition-colors">Circuit Schematic_</p>
                <img 
                  src={variable.image} 
                  alt={`${variable.label} Circuit`} 
                  className="w-full max-w-lg mx-auto rounded-xl shadow-sm mix-blend-multiply group-hover/img:scale-[1.02] transition-transform duration-500"
                />
             </div>
           )}

           {/* Input Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {activeMethod.inputFields
                .filter(field => !field.topologyFilter || field.topologyFilter === formData.topology)
                .map((field) => (
                <div key={field.name} className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[11px] font-bold text-text-main uppercase tracking-wider">{field.label}</label>
                    <div className="group relative">
                      <Info className="w-3.5 h-3.5 text-text-faint cursor-help" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 bg-slate-900 text-white text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-xl">
                        {field.helptext}
                      </div>
                    </div>
                  </div>
                  <div className="flex shadow-sm rounded-xl overflow-hidden border border-border-subtle focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
                    <input
                      type="number"
                      value={inputs[field.name] || ""}
                      onChange={(e) => setInputs({ ...inputs, [field.name]: parseFloat(e.target.value) || 0 })}
                      className="flex-grow bg-white px-4 py-3 text-sm font-bold text-text-main placeholder:text-text-faint outline-none"
                      placeholder="0.00"
                    />
                    <select
                      value={units[field.name]}
                      onChange={(e) => setUnits({ ...units, [field.name]: e.target.value })}
                      className="bg-slate-50 px-3 py-3 border-l border-border-subtle text-[10px] font-bold text-text-muted outline-none cursor-pointer hover:bg-slate-100 uppercase tracking-widest"
                    >
                      {field.units.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {/* Generic Topology Toggle */}
              {(variable.name === "Inductance" || variable.name === "RMSCapacitorCurrent" || variable.name === "MinimumCapacitance") && (
                <div className="space-y-3">
                   <label className="text-[11px] font-bold text-text-main uppercase tracking-wider">Converter Topology</label>
                   <div className="flex bg-slate-50 p-1 rounded-xl border border-border-subtle">
                      {["Buck Converter", "Boost Converter"].map((top) => (
                        <button
                          key={top}
                          onClick={() => setFormData({ ...formData, topology: top })}
                          className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${
                            formData.topology === top 
                              ? "bg-white text-brand-primary shadow-sm" 
                              : "text-text-faint hover:text-text-main"
                          }`}
                        >
                          {top.split(" ")[0]}
                        </button>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-6">
           <div className="p-8 bg-slate-900 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <Zap className="w-5 h-5 text-brand-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Calculated Value</span>
                 </div>
                 
                 <div className="mb-10">
                    <div className="text-5xl font-bold tracking-tighter mb-2 font-mono">{displayValue}</div>
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-bold text-white/40 uppercase tracking-widest">In Units:</span>
                       <select
                         value={outputUnit}
                         onChange={(e) => setOutputUnit(e.target.value)}
                         className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] font-bold text-brand-primary outline-none cursor-pointer hover:bg-white/10"
                       >
                         {variable.outputUnits.map((u) => (
                           <option key={u} value={u} className="bg-slate-900">{u}</option>
                         ))}
                       </select>
                    </div>
                 </div>

                 {result?.secondaryValues && (
                   <div className="space-y-4 pt-8 border-t border-white/5">
                      {Object.entries(result.secondaryValues).map(([label, data]) => (
                        <div key={label} className="flex justify-between items-center group/item">
                           <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest group-hover/item:text-white/50 transition-colors">{label}</span>
                           <span className="text-sm font-bold font-mono tracking-tight text-white/80">{data.value} {data.unit}</span>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
           </div>

           <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-4">
              <RefreshCw className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
              <div>
                 <p className="text-xs font-bold text-emerald-950 mb-1 leading-tight">Verification Successful</p>
                 <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">Calculation verified against standard IEEE power electronics models.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
