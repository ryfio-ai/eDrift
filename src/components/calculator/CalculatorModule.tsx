"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { CalculatorVariable, CalculationResult } from "@/lib/calculator/types";
import { runCalculation } from "@/lib/calculator/engine";
import { convertToBase, convertFromBase } from "@/lib/calculator/unitConversions";
import { FormulaDisplay } from "./FormulaDisplay";
import { HelpCircle, Calculator, ChevronDown, Check, Zap, Table, FileText, Clock, RotateCcw } from "lucide-react";
import { useCalculatorHistory } from "@/lib/calculator/HistoryContext";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";

// --- HELPERS (Mirrored from Reference Source) ---

const formatLabel = (label: string) => {
  if (!label) return label;
  if (label.includes("_")) {
    const parts = label.split("_");
    return (
      <span className="inline-flex items-baseline">
        {parts[0]}
        <sub className="ml-[1px]" style={{ fontSize: '0.7em', bottom: '-0.2em' }}>{parts[1]}</sub>
      </span>
    );
  }
  const match = label.match(/^([A-ZΔ])(in|out|peak|rms|max)$/);
  if (match) {
    return (
      <span className="inline-flex items-baseline">
        {match[1]}
        <sub className="ml-[1px]" style={{ fontSize: '0.7em', bottom: '-0.2em' }}>{match[2]}</sub>
      </span>
    );
  }
  return label;
};

const smartFormat = (val: number | string) => {
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (!Number.isFinite(num)) return val;
  const abs = Math.abs(num);
  if (abs >= 1e6 || (abs > 0 && abs < 1e-4)) {
    const [base, exp] = num.toExponential(3).split("e");
    return (
      <span>
        {parseFloat(base).toFixed(3)} × 10<sup style={{ fontSize: '0.6em' }}>{parseInt(exp)}</sup>
      </span>
    );
  }
  return num.toFixed(abs < 1 ? 6 : 4);
};

// --- COMPONENTS ---

const CustomDropdown = ({ options, value, onChange, className }: { 
  options: string[], 
  value: string, 
  onChange: (v: string) => void,
  className?: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={cn("relative w-full", className)} ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-[40px] px-3 py-2 bg-main text-main border border-main rounded-md cursor-pointer transition-all hover:border-gray-400 select-none"
      >
        <span className="text-[14px] font-medium">{value}</span>
        <ChevronDown className={cn("w-4 h-4 text-muted transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 min-w-max bg-card border border-main rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <ul className="max-h-[200px] overflow-y-auto scrollbar-clean py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => { onChange(option); setIsOpen(false); }}
                className={cn(
                  "px-4 py-2 text-[14px] cursor-pointer transition-colors",
                  value === option ? "bg-primary text-white font-semibold" : "text-main hover:bg-primary-soft hover:text-primary"
                )}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface CalculatorModuleProps {
  variable: CalculatorVariable;
}

export const CalculatorModule: React.FC<CalculatorModuleProps> = ({ variable }) => {
  const [methodIndex, setMethodIndex] = useState(0);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [units, setUnits] = useState<Record<string, string>>({});
  const [outputUnit, setOutputUnit] = useState(variable.outputUnits[0]);
  const [formData, setFormData] = useState<Record<string, any>>({ topology: "Buck Converter" });
  const [calculated, setCalculated] = useState(false);

  const { addHistoryItem, history } = useCalculatorHistory();
  const activeMethod = variable.methods[methodIndex];

  const currentToolHistory = useMemo(() => {
    return history.filter(item => item.variableName === variable.name).slice(0, 10);
  }, [history, variable.name]);

  // Sync state initially
  useEffect(() => {
    const initialUnits: Record<string, string> = {};
    activeMethod.inputFields.forEach(f => initialUnits[f.name] = f.units[0]);
    setUnits(initialUnits);
    setCalculated(false);
  }, [activeMethod, variable.name]);

  const toBase = (fieldName: string) => {
    const val = inputs[fieldName] || 0;
    const unit = units[fieldName] || "";
    return convertToBase(val, unit);
  };

  const result: CalculationResult | null = useMemo(() => {
    return runCalculation(variable.name, activeMethod.name, toBase, formData);
  }, [variable.name, activeMethod.name, inputs, units, formData]);

  const handleCalculate = () => {
    setCalculated(true);
    if (result && result.primaryValue !== "0.000" && result.primaryValue !== "Invalid") {
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
    }
  };

  const exportToExcel = () => {
    if (!result) return;
    const ws = XLSX.utils.json_to_sheet([{ Result: result.primaryValue, Unit: result.primaryUnit }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calculation");
    XLSX.writeFile(wb, `${variable.name}_report.xlsx`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-[28px] font-normal text-slate-800 tracking-tight mb-1">
            {variable.label}
          </h1>
          <p className="text-[14px] text-slate-500 font-medium font-sans">
             Calculating <span className="text-brand-primary font-semibold">{variable.label}</span> • Method {activeMethod.name.replace("M", "")}
          </p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => { setInputs({}); setCalculated(false); }}
             className="w-10 h-10 bg-white border border-border-main rounded-lg flex items-center justify-center text-slate-500 hover:bg-bg-soft transition-colors shadow-sm"
           >
              <RotateCcw className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Content Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
           
           {/* 2. Method Tabs */}
           <div className="w-full overflow-x-auto scrollbar-thin pb-2">
              <div className="inline-flex items-center bg-white border border-border-main rounded-lg p-1 shadow-sm w-max font-sans">
                 {variable.methods.map((method, index) => (
                    <button
                      key={method.name}
                      onClick={() => setMethodIndex(index)}
                      className={cn(
                        "px-8 py-2 rounded-md text-[15px] font-medium transition-all-custom",
                        methodIndex === index ? "bg-brand-primary text-white shadow-md" : "text-slate-500 hover:bg-bg-soft cursor-pointer"
                      )}
                    >
                      {method.name.startsWith("M") ? `Method ${method.name.replace("M", "")}` : method.name}
                    </button>
                 ))}
              </div>
           </div>

           {/* 3. Formula Hero */}
           <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-xl p-8 flex flex-col items-center justify-center min-h-[120px] shadow-inner">
              <FormulaDisplay formula={typeof activeMethod.formula === "string" ? activeMethod.formula : activeMethod.formula[formData.topology || "Buck Converter"]} />
           </div>

           {/* 4. Input Form Area */}
           <div className="bg-white p-6 rounded-xl border border-border-main shadow-sm flex flex-col gap-6">
              {/* Topology Dropdown if needed */}
              {["Inductance", "RMSCapacitorCurrent", "MinimumCapacitance"].includes(variable.name) && (
                 <div className="w-full sm:w-1/2">
                    <label className="text-brand-primary mb-2 text-[16px] block font-medium">Topology</label>
                    <div className="flex gap-2 bg-bg-main p-1 rounded-md border border-border-main w-fit font-sans">
                       {["Buck Converter", "Boost Converter"].map(t => (
                          <button
                            key={t}
                            onClick={() => setFormData({ ...formData, topology: t })}
                            className={cn(
                              "px-8 py-1.5 rounded-md text-[14px] transition-all hover-translate",
                              formData.topology === t ? "bg-brand-primary text-white shadow-md" : "text-slate-500 hover:bg-bg-soft"
                            )}
                          >
                             {t.replace(" Converter", "")}
                          </button>
                       ))}
                    </div>
                 </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                 {activeMethod.inputFields
                   .filter(f => !f.topologyFilter || f.topologyFilter === formData.topology)
                   .map(field => (
                    <div key={field.name} className="flex flex-col gap-1.5 relative">
                       <label className="flex items-center text-brand-primary text-[15px] sm:text-[17px] font-medium tracking-wide">
                          {formatLabel(field.label)}
                          <div className="ml-3">
                             <HelpCircle className="w-3.5 h-3.5 text-slate-200 cursor-help" />
                          </div>
                       </label>
                       <div className="flex gap-2">
                          <input 
                            type="number"
                            value={inputs[field.name] || ""}
                            onChange={(e) => setInputs({ ...inputs, [field.name]: parseFloat(e.target.value) || 0 })}
                            placeholder="0.0"
                            className="w-full bg-bg-main border border-border-main rounded-md px-3 py-2 text-[14px] sm:text-[15px] h-[40px] outline-none hover:border-gray-300 focus:border-brand-primary transition-colors text-slate-800"
                          />
                          {field.units[0] !== "" && (
                             <div className="flex-none w-[90px]">
                                <CustomDropdown 
                                   options={field.units} 
                                   value={units[field.name] || field.units[0]} 
                                   onChange={(val) => setUnits({ ...units, [field.name]: val })}
                                />
                             </div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="flex justify-end mt-4">
                 <button 
                   onClick={handleCalculate}
                   className="px-16 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-md shadow-lg glimmer-effect hover-translate transition-all"
                 >
                    Calculate
                 </button>
              </div>
           </div>

           {/* 5. Summary Board Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[260px]">
              {/* Inputs Panel */}
              <div className="bg-white border border-border-main rounded-xl p-6 shadow-sm flex flex-col overflow-hidden">
                 <h3 className="text-[17px] font-semibold text-slate-800 mb-4">Current Inputs</h3>
                 <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin space-y-3">
                    {Object.keys(inputs).length === 0 ? (
                       <p className="text-sm text-slate-500 italic text-center py-10">No inputs entered yet.</p>
                    ) : (
                       Object.entries(inputs).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                             <span className="text-[15px] text-brand-primary font-semibold">{formatLabel(key)}</span>
                             <span className="text-[15px] font-medium text-slate-800">{val} <span className="text-slate-500 font-normal lowercase">{units[key]}</span></span>
                          </div>
                       ))
                    )}
                 </div>
              </div>

              {/* Results Panel */}
              <div className="bg-white border border-border-main rounded-xl p-6 shadow-sm flex flex-col overflow-hidden">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[17px] font-semibold text-slate-800 font-sans">Calculated Result</h3>
                    <CustomDropdown 
                       options={variable.outputUnits} 
                       value={outputUnit} 
                       onChange={setOutputUnit} 
                       className="w-[90px] h-8"
                    />
                 </div>
                 <div className="flex-1 flex flex-col justify-center items-center text-center">
                    {calculated && result ? (
                       <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
                          <div className="flex items-baseline gap-2">
                             <span className="text-slate-500 text-[16px] font-medium">{formatLabel(variable.symbol || variable.label)} =</span>
                             <span className="text-[32px] font-black text-brand-primary tracking-tight">{smartFormat(convertFromBase(result.rawValue!, outputUnit))}</span>
                             <span className="text-slate-500 text-[15px]">{outputUnit}</span>
                          </div>
                          {result.secondaryValues && Object.entries(result.secondaryValues).map(([k, v]) => (
                             <div key={k} className="flex items-baseline gap-2 opacity-80">
                                <span className="text-slate-500 text-[14px] font-medium">{formatLabel(k)} =</span>
                                <span className="text-[18px] font-bold text-brand-primary">{v.value}</span>
                                <span className="text-slate-500 text-[13px]">{v.unit}</span>
                             </div>
                          ))}
                       </div>
                    ) : (
                       <p className="text-sm text-slate-500 italic">Enter values and click calculate to see results.</p>
                    )}
                 </div>
                 <div className="mt-4 pt-4 border-t border-border-main text-center">
                    <p className="text-[13px] text-slate-500 font-medium uppercase tracking-wide">Method Verified: eDrift Engine V2.0</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Interaction Sidebar - History */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6">
           <div className="flex gap-2">
              <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 h-11 bg-white border border-border-main rounded-lg text-[13px] font-bold text-slate-500 uppercase tracking-wider hover:bg-bg-soft transition-all">
                 <FileText className="w-4 h-4" /> PDF
              </button>
              <button onClick={exportToExcel} className="flex-1 flex items-center justify-center gap-2 h-11 bg-white border border-border-main rounded-lg text-[13px] font-bold text-slate-500 uppercase tracking-wider hover:bg-bg-soft transition-all">
                 <Table className="w-4 h-4" /> EXCEL
              </button>
           </div>

           <div className="flex-1 bg-white p-6 rounded-xl border border-border-main shadow-sm flex flex-col min-h-[400px]">
              <div className="flex items-center gap-3 mb-6">
                 <Clock className="w-5 h-5 text-brand-primary" />
                 <h4 className="font-bold text-lg text-slate-800 font-sans">History</h4>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-clean space-y-4 pr-1">
                 {currentToolHistory.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
                       <Calculator className="w-12 h-12 mb-4" />
                       <p className="text-xs uppercase font-bold tracking-[0.2em]">Empty History</p>
                    </div>
                 ) : (
                    currentToolHistory.map((item, idx) => (
                       <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-border-main hover:border-brand-primary/30 transition-all cursor-help group">
                          <span className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">{item.methodName}</span>
                          <div className="flex justify-between items-baseline">
                             <span className="text-xl font-bold text-slate-800 group-hover:text-brand-primary transition-colors">{item.primaryValue}</span>
                             <span className="text-[12px] font-bold text-brand-primary uppercase">{item.primaryUnit}</span>
                          </div>
                       </div>
                    ))
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
