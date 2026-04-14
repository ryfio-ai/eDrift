"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorVariable, CalculationResult } from "@/lib/calculator/types";
import { runCalculation } from "@/lib/calculator/engine";
import { convertToBase, convertFromBase } from "@/lib/calculator/unitConversions";
import { FormulaDisplay } from "./FormulaDisplay";
import { Info, Download, Moon, LayoutGrid, Clock, ChevronDown, FileText, Table, Zap } from "lucide-react";
import { useCalculatorHistory } from "@/lib/calculator/HistoryContext";
import { cn } from "@/lib/utils";
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

  const { addHistoryItem, history } = useCalculatorHistory();
  const activeMethod = variable.methods[methodIndex];

  const currentToolHistory = useMemo(() => {
    return history.filter(item => item.variableName === variable.name).slice(0, 10);
  }, [history, variable.name]);

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

  const currentResult: CalculationResult | null = useMemo(() => {
    return runCalculation(variable.name, activeMethod.name, toBase, formData);
  }, [variable.name, activeMethod.name, inputs, units, formData]);

  const handleCalculate = () => {
    if (currentResult && currentResult.primaryValue !== "0.000" && currentResult.primaryValue !== "Invalid") {
      addHistoryItem({
        variableName: variable.name,
        variableLabel: variable.label,
        methodName: activeMethod.name,
        primaryValue: currentResult.primaryValue,
        primaryUnit: currentResult.primaryUnit,
        inputs: { ...inputs },
        inputUnits: { ...units },
        secondaryValues: currentResult.secondaryValues
      });
    }
  };

  const exportToExcel = () => {
    if (!currentResult || currentResult.primaryValue === "Invalid") return;
    const data = [
      { Property: "Tool", Value: variable.label },
      { Property: "Method", Value: activeMethod.name },
      { Property: "Result", Value: `${currentResult.primaryValue} ${currentResult.primaryUnit}` },
      { Property: "Timestamp", Value: new Date().toLocaleString() }
    ];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Result");
    XLSX.writeFile(wb, `${variable.name}_report.xlsx`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Main Area */}
      <div className="flex-1 px-10 py-12">
        {/* Header Section - Exactly as high-fidelity reference */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{variable.category || "Design Tool"}</h1>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium tracking-tight">
              <span>Calculating</span>
              <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded font-bold">{variable.label}</span>
              <span className="text-slate-200">|</span>
              <span>Method: {activeMethod.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors">
               <Moon className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Method Tab Switcher */}
        <div className="flex gap-4 my-10 border-b border-slate-50 pb-8">
           <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
             {variable.methods.map((method, idx) => (
                <button
                  key={method.name}
                  onClick={() => setMethodIndex(idx)}
                  className={cn(
                    "px-8 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest",
                    methodIndex === idx 
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {method.name}
                </button>
             ))}
           </div>
        </div>

        {/* Hero Formula Box */}
        <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-[40px] p-16 mb-12 flex flex-col items-center justify-center relative shadow-sm">
           <div className="absolute top-6 left-6 opacity-20">
              <Zap className="w-6 h-6 text-brand-primary" />
           </div>
           <FormulaDisplay 
              formula={typeof activeMethod.formula === "string" ? activeMethod.formula : activeMethod.formula[formData.topology || "Buck Converter"]} 
           />
        </div>

        {/* Input Area */}
        <div className="space-y-12">
           {/* Topology Settings (if applicable) */}
           {(variable.name === "Inductance" || variable.name === "RMSCapacitorCurrent" || variable.name === "MinimumCapacitance") && (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                 <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-800">Topology Selection</span>
                    <Info className="w-4 h-4 text-slate-300" />
                 </div>
                 <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    {["Buck", "Boost"].map((top) => (
                      <button
                        key={top}
                        onClick={() => setFormData({ ...formData, topology: `${top} Converter` })}
                        className={cn(
                          "px-10 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest",
                          formData.topology === `${top} Converter` 
                            ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                            : "text-slate-400 hover:text-slate-600"
                        )}
                      >
                        {top}
                      </button>
                    ))}
                 </div>
              </div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 group/inputs">
              {activeMethod.inputFields
                .filter(field => !field.topologyFilter || field.topologyFilter === formData.topology)
                .map((field) => (
                <div key={field.name} className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{field.label}</label>
                      <Info className="w-3.5 h-3.5 text-slate-200" />
                    </div>
                  </div>
                  <div className="flex bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden focus-within:ring-4 focus-within:ring-brand-primary/5 focus-within:border-brand-primary/20 focus-within:bg-white transition-all shadow-sm">
                    <input
                      type="number"
                      value={inputs[field.name] || ""}
                      onChange={(e) => setInputs({ ...inputs, [field.name]: parseFloat(e.target.value) || 0 })}
                      className="flex-grow bg-transparent px-8 py-5 text-lg font-bold text-slate-800 outline-none placeholder:text-slate-200"
                      placeholder="0.00"
                    />
                    <div className="bg-white border-l border-slate-100 flex items-center px-6">
                      <select
                        value={units[field.name]}
                        onChange={(e) => setUnits({ ...units, [field.name]: e.target.value })}
                        className="bg-transparent text-[11px] font-black text-brand-primary outline-none cursor-pointer uppercase tracking-widest text-center min-w-[60px]"
                      >
                        {field.units.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 ml-2" />
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <button 
             onClick={handleCalculate}
             className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white py-6 rounded-[32px] font-bold text-xl shadow-2xl shadow-brand-primary/30 transition-all active:scale-[0.98] group flex items-center justify-center gap-4"
           >
             <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
             Execute Computation
           </button>

           {/* Results Preview Card - Premium Style */}
           {currentResult && currentResult.primaryValue !== "0.000" && (
              <div className="p-10 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                 <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                          <Zap className="w-5 h-5" />
                       </div>
                       <div className="h-px bg-white/10 flex-grow" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 italic">Result Verified_</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                       <div>
                          <p className="text-[11px] font-black text-brand-primary uppercase tracking-[0.25em] mb-4">Calculated {variable.label}</p>
                          <div className="flex items-end gap-5">
                             <div className="text-7xl font-black tracking-tighter leading-none">{currentResult.primaryValue}</div>
                             <div className="flex flex-col mb-1">
                                <span className="bg-brand-primary text-[11px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest">{currentResult.primaryUnit}</span>
                             </div>
                          </div>
                       </div>
                       
                       {currentResult.secondaryValues && (
                          <div className="flex flex-wrap gap-8 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-12">
                             {Object.entries(currentResult.secondaryValues).map(([label, data]) => (
                                <div key={label} className="flex flex-col gap-2">
                                   <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">{label}</span>
                                   <span className="text-xl font-black text-white/80">{data.value} <span className="text-[10px] text-brand-primary uppercase">{data.unit}</span></span>
                                </div>
                             ))}
                          </div>
                       )}
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>

      {/* Right Interaction Sidebar */}
      <div className="w-full lg:w-[420px] bg-slate-50/50 border-l border-slate-100 p-10 space-y-12">
         {/* Export Actions */}
         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 px-2">Data Operations_</h3>
            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => window.print()}
                 className="flex flex-col items-center gap-4 p-6 bg-white border border-slate-200 rounded-[28px] hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all group"
               >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-colors">
                     <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">Export PDF</span>
               </button>
               <button 
                 onClick={exportToExcel}
                 className="flex flex-col items-center gap-4 p-6 bg-white border border-slate-200 rounded-[28px] hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all group"
               >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-colors">
                     <Table className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">Export Excel</span>
               </button>
            </div>
         </div>

         {/* Calculator History */}
         <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-brand-primary" />
                  <h4 className="font-bold text-xl text-slate-800 tracking-tight">Recent Calc</h4>
               </div>
               <LayoutGrid className="w-5 h-5 text-slate-200" />
            </div>

            <div className="space-y-4">
               {currentToolHistory.length === 0 ? (
                 <div className="py-24 flex flex-col items-center justify-center text-slate-200 bg-white/50 rounded-[32px] border-2 border-dashed border-slate-100">
                    <Clock className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Ready for Calculations</p>
                 </div>
               ) : (
                 currentToolHistory.map((item, idx) => (
                    <div key={idx} className="p-6 bg-white border border-slate-200 rounded-[32px] hover:shadow-lg transition-all border-l-[6px] border-l-brand-primary group cursor-help">
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 block">{item.methodName}</span>
                       <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-slate-800 tracking-tighter group-hover:text-brand-primary transition-colors">{item.primaryValue}</span>
                          <span className="bg-brand-primary/5 text-brand-primary text-[10px] font-black px-3 py-1.5 rounded-lg border border-brand-primary/10 uppercase">{item.primaryUnit}</span>
                       </div>
                    </div>
                 ))
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
