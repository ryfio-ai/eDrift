"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorVariable, CalculationResult } from "@/lib/calculator/types";
import { runCalculation } from "@/lib/calculator/engine";
import { convertToBase, convertFromBase } from "@/lib/calculator/unitConversions";
import { FormulaDisplay } from "./FormulaDisplay";
import { 
  HelpCircle, 
  Calculator, 
  ChevronDown, 
  Check, 
  Zap, 
  Clock, 
  RotateCcw,
  Printer,
  FileDown,
  Info
} from "lucide-react";
import { useCalculatorHistory, HistoryItem } from "@/lib/calculator/HistoryContext";
import { HistoryPanel } from "./HistoryPanel";
import { calculatorConfig } from "@/lib/calculator/config";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";

// --- HELPERS ---

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

const smartFormatText = (val: number | string) => {
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (!Number.isFinite(num)) return String(val);
  const abs = Math.abs(num);
  if (abs >= 1e6 || (abs > 0 && abs < 1e-4)) {
    return num.toExponential(3);
  }
  return num.toFixed(abs < 1 ? 6 : 4);
};

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
        className="flex items-center justify-between w-full h-[36px] px-3 py-1.5 bg-slate-50 text-slate-700 border border-border-main rounded-lg cursor-pointer transition-all hover:border-[#22c55e]/30 select-none shadow-sm"
      >
        <span className="text-[12px] font-heading font-bold uppercase tracking-wider">{value}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute z-[100] left-0 right-0 mt-1 min-w-max bg-white border border-border-main rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <ul className="max-h-[200px] overflow-y-auto scrollbar-clean py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => { onChange(option); setIsOpen(false); }}
                className={cn(
                  "px-4 py-2 text-[12px] font-heading font-medium cursor-pointer transition-colors",
                  value === option ? "bg-[#22c55e] text-white" : "text-slate-600 hover:bg-slate-50 hover:text-[#22c55e]"
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

export const CalculatorModule: React.FC<CalculatorModuleProps> = ({ variable }) => {
  const [methodIndex, setMethodIndex] = useState(0);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [units, setUnits] = useState<Record<string, string>>({});
  const [outputUnit, setOutputUnit] = useState(variable.outputUnits[0]);
  const [formData, setFormData] = useState<Record<string, any>>({ topology: "Buck Converter" });
  const [calculated, setCalculated] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { history, addHistoryItem } = useCalculatorHistory();
  const activeMethod = variable.methods[methodIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryName = useMemo(() => {
    const cat = calculatorConfig.categories.find(c => c.variables.some(v => v.name === variable.name));
    return cat?.name || "Calculation";
  }, [variable.name]);

  // Sync state initially
  useEffect(() => {
    const initialUnits: Record<string, string> = {};
    activeMethod.inputFields.forEach(f => {
      if (!units[f.name]) initialUnits[f.name] = f.units[0];
    });
    setUnits(prev => ({ ...initialUnits, ...prev }));
    setOutputUnit(variable.outputUnits[0]);
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
        categoryName: categoryName,
        methodName: activeMethod.name.startsWith("M") ? `Method ${activeMethod.name.replace("M", "")}` : activeMethod.name,
        primaryValue: smartFormatText(convertFromBase(result.rawValue!, outputUnit)),
        primaryUnit: outputUnit,
        inputs: { ...inputs },
        inputUnits: { ...units },
        secondaryValues: result.secondaryValues
      });
    }
  };

  const handleReplay = (item: HistoryItem) => {
    const mIdx = variable.methods.findIndex(m => {
       const mName = m.name.startsWith("M") ? `Method ${m.name.replace("M", "")}` : m.name;
       return mName === item.methodName;
    });
    if (mIdx !== -1) setMethodIndex(mIdx);
    
    setInputs(item.inputs);
    setUnits(item.inputUnits);
    setOutputUnit(item.primaryUnit);
    setCalculated(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exportToPDF = () => { /* ... */ };
  const exportToExcel = () => { /* ... */ };

  return (
    <motion.div 
      key={variable.name}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-4 print:hidden w-full max-h-screen font-sans"
    >
      {/* 1. Header Section - Compact */}
      <motion.div variants={itemVariants} className="flex justify-between items-end pb-2 border-b border-slate-50">
        <div className="flex flex-col">
          <h1 className="text-[28px] font-heading font-extrabold text-slate-800 tracking-tight leading-none">
            {categoryName}
          </h1>
          <p className="text-[13px] font-sans text-slate-400 font-medium mt-1">
            Calculating <span className="text-[#22c55e] font-heading font-bold">{variable.label}</span> • {activeMethod.name}
          </p>
        </div>
        <div className="flex gap-2">
          {variable.methods.map((method, index) => (
            <button
              key={method.name}
              onClick={() => setMethodIndex(index)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-[11px] font-heading font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95",
                methodIndex === index 
                  ? "bg-[#22c55e] text-white" 
                  : "bg-white text-slate-400 border border-border-main hover:text-slate-600"
              )}
            >
              {method.name.startsWith("M") ? `M${method.name.replace("M", "")}` : method.name}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left Content Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          
          {/* Formula Card - Compact */}
          <motion.div variants={itemVariants} className="bg-[#f0fdf4] border border-[#22c55e]/10 rounded-[20px] p-4 flex items-center justify-center min-h-[70px] shadow-sm">
             <div className="scale-110 transform origin-center">
                <FormulaDisplay formula={typeof activeMethod.formula === "string" ? activeMethod.formula : activeMethod.formula[formData.topology || "Buck Converter"]} />
             </div>
          </motion.div>

          {/* Main Input Grid Section - Compact */}
          <motion.div variants={itemVariants} className="bg-white p-5 rounded-[24px] border border-border-main shadow-sm flex flex-col gap-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {activeMethod.inputFields.map((field) => (
                   <div key={field.name} className="flex flex-col gap-1 group">
                      <div className="flex items-center gap-1 px-1">
                         <label className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-tight group-hover:text-slate-600 transition-colors">
                            {formatLabel(field.label)}
                         </label>
                         <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="relative flex-1">
                            <input 
                              type="number"
                              value={inputs[field.name] || ""}
                              onChange={(e) => setInputs({ ...inputs, [field.name]: parseFloat(e.target.value) || 0 })}
                              placeholder="0.0"
                              className="w-full bg-slate-50 border border-border-main rounded-lg px-3 py-2 text-[14px] font-sans font-bold outline-none hover:border-slate-300 focus:border-[#22c55e] focus:bg-white transition-all text-slate-800 shadow-inner"
                            />
                         </div>
                         {field.units[0] !== "" && (
                            <div className="w-[80px] shrink-0">
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

             <div className="flex justify-end">
                <button 
                  onClick={handleCalculate}
                  className="px-10 py-3 bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-heading font-extrabold rounded-lg shadow-lg shadow-[#22c55e]/10 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                   <span className="uppercase tracking-widest text-[12px]">Calculate</span>
                </button>
             </div>
          </motion.div>

          {/* Bottom Split - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Left: Current Inputs Summary */}
             <motion.div variants={itemVariants} className="bg-white p-5 rounded-[24px] border border-border-main shadow-sm flex flex-col gap-4">
                <h3 className="text-[12px] font-heading font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-2">Current Inputs</h3>
                <div className="space-y-2">
                   {activeMethod.inputFields.map(f => (
                      <div key={f.name} className="flex justify-between items-center pb-1.5 border-b border-slate-50/50 last:border-0">
                         <span className="text-[12px] font-sans text-[#22c55e] font-bold">{formatLabel(f.label)}</span>
                         <div className="flex items-baseline gap-1 font-sans font-bold">
                            <span className="text-slate-700 text-[13px]">{inputs[f.name] || 0}</span>
                            <span className="text-slate-400 text-[10px] uppercase">{units[f.name] || f.units[0]}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>

             {/* Right: Calculated Result */}
             <motion.div variants={itemVariants} className="bg-white p-5 rounded-[24px] border border-border-main shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                   <h3 className="text-[12px] font-heading font-extrabold text-slate-800 uppercase tracking-widest">Result</h3>
                   <CustomDropdown 
                      options={variable.outputUnits} 
                      value={outputUnit} 
                      onChange={setOutputUnit} 
                      className="w-[85px]"
                   />
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center py-4 min-h-[80px]">
                   {calculated && result ? (
                      <div className="flex flex-col items-center gap-0.5 w-full">
                         <div className="flex items-baseline justify-center gap-1.5 font-sans">
                            <span className="text-[36px] font-extrabold text-[#22c55e] tracking-tighter leading-none">
                               {smartFormat(convertFromBase(result.rawValue!, outputUnit))}
                            </span>
                            <span className="text-[#22c55e] text-[16px] font-bold uppercase">{outputUnit}</span>
                         </div>
                      </div>
                   ) : (
                      <p className="text-[11px] font-sans text-slate-400 italic">Click calculate to see results.</p>
                   )}
                </div>
             </motion.div>
          </div>
        </div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="w-full xl:w-[320px] shrink-0 sticky top-4">
           <HistoryPanel 
             onReplay={handleReplay}
             onExportPDF={exportToPDF}
             onExportExcel={exportToExcel}
             currentVariableName={variable.name}
           />
        </motion.div>
      </div>
    </motion.div>
  );
};
