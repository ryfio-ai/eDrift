"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";

import { CalculatorVariable, CalculationResult } from "@/lib/calculator/types";
import { runCalculation } from "@/lib/calculator/engine";
import { convertToBase, convertFromBase } from "@/lib/calculator/unitConversions";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
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
  Info,
  FileText,
  ExternalLink,
  AlertCircle,
  Wrench
} from "lucide-react";
import { slugify } from "@/lib/calculator/utils";
import { useCalculatorHistory, HistoryItem } from "@/lib/calculator/HistoryContext";
import { HistoryPanel } from "./HistoryPanel";
import { calculatorConfig } from "@/lib/calculator/config";
import { cn } from "@/lib/utils";
import * as math from "mathjs";

// --- HELPERS ---

const formatLabelToLatex = (label: string): string => {
  if (!label) return "";
  
  // If it's already complex or has special chars, wrap it
  let latex = label;
  
  // Handle subscripts if not already in LaTeX
  if (label.includes("_") && !label.includes("\\")) {
    const parts = label.split("_");
    latex = `${parts[0]}_{${parts[1]}}`;
  }
  
  // Handle Greek characters if they are literals
  latex = latex.replace(/μ/g, "\\mu ");
  latex = latex.replace(/Δ/g, "\\Delta ");
  latex = latex.replace(/Φ/g, "\\Phi ");
  latex = latex.replace(/η/g, "\\eta ");
  latex = latex.replace(/π/g, "\\pi ");
  latex = latex.replace(/%/g, "\\% ");

  return latex;
};

const formatLabel = (label: string) => {
  return <InlineMath math={formatLabelToLatex(label)} />;
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

  if (options.length === 0 || (options.length === 1 && options[0] === "")) return null;

  return (
    <div className={cn("relative w-full", className)} ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-[36px] px-3 py-1.5 bg-slate-50 text-slate-700 border border-border-main rounded-lg cursor-pointer transition-all hover:border-brand-primary/30 select-none shadow-sm"
      >
        <span className="text-[12px] font-heading font-bold tracking-wider">{value}</span>
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
                  value === option ? "bg-brand-primary text-white" : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
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
  const [inputStrings, setInputStrings] = useState<Record<string, string>>({});
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [units, setUnits] = useState<Record<string, string>>({});
  const [outputUnit, setOutputUnit] = useState(variable.outputUnits[0]);
  const [formData, setFormData] = useState<Record<string, any>>({ topology: "Buck Converter" });
  const [calculated, setCalculated] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [manualDutyCycle, setManualDutyCycle] = useState(false);
  const [customFormulaStr, setCustomFormulaStr] = useState("x * y + z");
  const [customVariables, setCustomVariables] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [persistedResult, setPersistedResult] = useState<CalculationResult | null>(null);

  const { history, addHistoryItem } = useCalculatorHistory();
  const activeMethod = variable.methods[methodIndex];

  const category = useMemo(() => {
    return calculatorConfig.categories.find(c => c.variables.some(v => v.name === variable.name));
  }, [variable.name]);

  const categoryName = category?.name || "Calculation";
  const isUnderDevelopment = category?.underDevelopment;

  const stateKey = `edrift_${variable.name}_${formData.topology || 'default'}`;

  // Load from local storage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(stateKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.methodIndex !== undefined && parsed.methodIndex < variable.methods.length) {
           setMethodIndex(parsed.methodIndex);
        }
        setInputs(parsed.inputs || {});
        setInputStrings(parsed.inputStrings || {});
        setUnits(parsed.units || {});
        if (parsed.customFormulaStr) setCustomFormulaStr(parsed.customFormulaStr);
        if (parsed.manualDutyCycle) setManualDutyCycle(parsed.manualDutyCycle);
        if (parsed.result) {
          setCalculated(true);
          setPersistedResult(parsed.result);
        } else {
          setCalculated(false);
          setPersistedResult(null);
        }
      } catch (e) {
        console.error("Failed to parse state", e);
      }
    } else {
      setInputs({});
      setInputStrings({});
      setCalculated(false);
      setPersistedResult(null);
      // Initialize units
      const initialUnits: Record<string, string> = {};
      activeMethod.inputFields.forEach(f => {
        initialUnits[f.name] = f.units[0] || "";
      });
      setUnits(initialUnits);
      setOutputUnit(variable.outputUnits[0]);
    }
    setValidationErrors({});
  }, [stateKey, variable.name]); // Reload state when topology or variable changes

  // Save to local storage (debounced)
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      localStorage.setItem(stateKey, JSON.stringify({
        methodIndex,
        inputs,
        inputStrings,
        units,
        customFormulaStr,
        manualDutyCycle,
        result: calculated ? persistedResult : null
      }));
    }, 200);
    return () => clearTimeout(timer);
  }, [methodIndex, inputs, inputStrings, units, customFormulaStr, manualDutyCycle, calculated, persistedResult, stateKey, mounted]);

  // Extract variables for custom formula
  useEffect(() => {
    if (activeMethod.customFormulaInput) {
       try {
          const node = math.parse(customFormulaStr);
          const vars = node.filter(n => (n as any).isSymbolNode && (n as any).name !== 'pi' && (n as any).name !== 'e').map(n => (n as any).name);
          setCustomVariables(Array.from(new Set(vars)));
       } catch (e) {
          // invalid formula, just keep previous variables
       }
    }
  }, [customFormulaStr, activeMethod]);

  // Auto-calculate Duty Cycle
  useEffect(() => {
    if (manualDutyCycle || activeMethod.customFormulaInput) return;
    const vin = inputs["Vin"];
    const vout = inputs["Vout"];
    if (vin > 0 && vout > 0) {
      let newD = 0;
      if (formData.topology === "Buck Converter" && vin > vout) {
        newD = vout / vin;
      } else if (formData.topology === "Boost Converter" && vout > vin) {
        newD = 1 - (vin / vout);
      }
      if (newD > 0 && Math.abs((inputs["D"] || 0) - newD) > 0.001) {
         setInputs(prev => ({ ...prev, D: newD }));
         setInputStrings(prev => ({ ...prev, D: smartFormatText(newD) }));
      }
    }
  }, [inputs["Vin"], inputs["Vout"], formData.topology, manualDutyCycle, activeMethod]);

  const toBase = (fieldName: string) => {
    const val = inputs[fieldName] || 0;
    const unit = units[fieldName] || "";
    return convertToBase(val, unit);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (formData.topology === "Buck Converter") {
      if (inputs["Vin"] !== undefined && inputs["Vout"] !== undefined && inputs["Vin"] <= inputs["Vout"]) {
        errors["Vout"] = "Buck Converter: Vout must be less than Vin";
      }
    } else if (formData.topology === "Boost Converter") {
      if (inputs["Vin"] !== undefined && inputs["Vout"] !== undefined && inputs["Vout"] <= inputs["Vin"]) {
        errors["Vout"] = "Boost Converter: Vout must be greater than Vin";
      }
    }
    
    // Check required dynamic variables if custom formula
    if (activeMethod.customFormulaInput) {
       try {
         math.parse(customFormulaStr);
       } catch (e) {
         errors["formula"] = "Invalid formula syntax.";
       }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (key: string, value: string) => {
    setInputStrings(prev => ({ ...prev, [key]: value }));
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setInputs(prev => ({ ...prev, [key]: parsed }));
    } else if (value === "") {
      setInputs(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleCalculate = () => {
    if (!validate()) {
       setCalculated(false);
       return;
    }
    
    let res: CalculationResult | null = null;
    
    if (activeMethod.customFormulaInput) {
       try {
         const scope: Record<string, number> = {};
         customVariables.forEach(v => {
            scope[v] = inputs[v] || 0;
         });
         const evaluated = math.evaluate(customFormulaStr, scope);
         res = {
           primaryValue: smartFormatText(evaluated),
           rawValue: evaluated,
           primaryUnit: outputUnit || ""
         };
       } catch (e) {
         setValidationErrors({ formula: "Error evaluating formula." });
         setCalculated(false);
         return;
       }
    } else {
       res = runCalculation(variable.name, activeMethod.name, toBase, formData);
    }
    
    if (res && res.primaryValue !== "0.000" && res.primaryValue !== "Invalid") {
      setCalculated(true);
      setPersistedResult(res);
      addHistoryItem({
        variableName: variable.name,
        variableLabel: variable.label,
        categoryName: categoryName,
        methodName: activeMethod.name.startsWith("M") ? `Method ${activeMethod.name.replace("M", "")}` : activeMethod.name,
        primaryValue: smartFormatText(convertFromBase(res.rawValue!, outputUnit)),
        primaryUnit: outputUnit,
        inputs: { ...inputs },
        inputUnits: { ...units },
        secondaryValues: res.secondaryValues
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
    const newStrs: Record<string, string> = {};
    Object.keys(item.inputs).forEach(k => newStrs[k] = String(item.inputs[k]));
    setInputStrings(newStrs);
    setUnits(item.inputUnits);
    setOutputUnit(item.primaryUnit);
    setCalculated(true);
    // Recalculate to set the exact result matching this replay
    setTimeout(() => handleCalculate(), 50);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exportToPDF = () => { /* ... */ };
  const exportToExcel = () => { /* ... */ };

  const currentInputFields = activeMethod.customFormulaInput 
    ? customVariables.map(v => ({ name: v, label: v, helptext: `Variable ${v}`, units: [""] }))
    : activeMethod.inputFields.filter(field => !field.topologyFilter || field.topologyFilter === formData.topology);

  if (!mounted) return null;

  const baseName = variable.label.includes("(") ? variable.label.split("(")[0].trim() : variable.label;
  const showSymbol = variable.symbol && variable.symbol.toLowerCase() !== baseName.toLowerCase();

  return (
    <div
      className="flex flex-col gap-2 print:hidden w-full font-sans"
    >
      {/* 1. Header Section */}
      <div className="relative flex flex-col pb-1 border-b border-slate-50 items-center text-center">
        <h1 className="text-[22px] font-heading font-extrabold text-slate-800 tracking-tight leading-none flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            <span>{baseName}</span>
            {showSymbol && <span>({formatLabel(variable.symbol!)})</span>}
          </div>
          <span>Calculator</span>
          {isUnderDevelopment && (
             <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md tracking-wider uppercase">Under Development</span>
          )}
        </h1>
        <p className="text-[13px] font-sans text-slate-400 font-medium text-center">
          <span className="text-brand-primary font-heading font-bold">{categoryName}</span> • {activeMethod.name}
        </p>

        {/* Derivation Link */}
        {(variable.name === "Inductance" || variable.name === "RMSCapacitorCurrent" || variable.name === "MinimumCapacitance") && (
          <a 
            href={variable.name === "Inductance" ? "/materials/Inductance derivation.pdf" : "/materials/Derivations.pdf"} 
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-0 hidden md:flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-lg text-[11px] font-heading font-bold text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary/20 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Click here for derivation</span>
            <ExternalLink className="w-3 h-3 opacity-40" />
          </a>
        )}
      </div>

      {/* 2. Method Selection - Left Aligned Tabs */}
      {variable.methods.length > 1 && (
        <div className="flex justify-start z-10 relative">
          <div className="flex bg-slate-100 p-0.5 rounded-xl shadow-inner border border-slate-200">
            {variable.methods.map((method, index) => (
              <button
                key={method.name}
                onClick={() => setMethodIndex(index)}
                className={cn(
                  "px-6 py-2 rounded-lg text-[12px] font-heading font-bold transition-all active:scale-95",
                  methodIndex === index 
                    ? "bg-white text-brand-primary shadow-md border border-slate-100" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {method.name.startsWith("M") ? `Method ${method.name.replace("M", "")}` : method.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-3 items-start">
        {/* Left Content Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-3 relative">
          
          {isUnderDevelopment && (
             <div className="absolute inset-0 z-50 flex items-start justify-center pt-8">
               <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center w-[360px] max-w-[95%] text-center border border-slate-100">
                  <div className="w-12 h-12 bg-[#e8f5e9] rounded-full flex items-center justify-center mb-4">
                     <Wrench className="w-5 h-5 text-[#4caf50]" />
                  </div>
                  <h2 className="text-[18px] font-heading font-extrabold text-slate-800 mb-1 tracking-tight">Coming Soon</h2>
                  <p className="text-[13px] text-slate-400 mb-6 font-sans">
                     The <strong className="text-slate-600">{categoryName}</strong> module is under development.
                  </p>
                  <p className="text-[10px] font-heading font-bold text-slate-400 uppercase tracking-widest mb-3">Available Tools</p>
                  <div className="flex flex-col w-full gap-2">
                     {calculatorConfig.categories.filter(c => !c.underDevelopment && c.name !== "Custom Formulas").map(c => (
                        <a key={c.name} href={`/design-calculator/${slugify(c.variables[0].label)}`} className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[12px] font-heading font-bold rounded-xl text-center transition-colors">
                           {c.name}
                        </a>
                     ))}
                  </div>
               </div>
             </div>
          )}

          {isUnderDevelopment ? (
             <div className="flex flex-col gap-4 w-full opacity-40 select-none pointer-events-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="h-[85px] bg-slate-100 rounded-[20px]" />
                   <div className="h-[85px] bg-slate-100 rounded-[20px]" />
                </div>
                <div className="h-[220px] bg-slate-100 rounded-[24px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="h-[140px] bg-slate-100 rounded-[20px]" />
                   <div className="h-[140px] bg-slate-100 rounded-[20px]" />
                </div>
             </div>
          ) : (
            <>
              {/* Formula and Image Card */}
          <div className={cn("grid gap-2", variable.image ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
            <div className="bg-brand-primary-soft border border-brand-primary/10 rounded-[16px] p-2 flex items-center justify-center min-h-[60px] shadow-sm overflow-hidden">
               <div className="hide-scroll w-full overflow-x-auto py-3" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <style dangerouslySetInnerHTML={{ __html: `
                    .hide-scroll::-webkit-scrollbar { display: none; }
                  `}} />
                  <div className="min-w-full w-max text-center px-4">
                     <div className="inline-block text-[1.1em]">
                     {activeMethod.customFormulaInput ? (
                        <span className="font-heading font-bold text-brand-primary text-lg">Custom Equation Evaluator</span>
                     ) : (
                        <FormulaDisplay formula={typeof activeMethod.formula === "string" ? activeMethod.formula : activeMethod.formula[formData.topology || "Buck Converter"]} />
                     )}
                     </div>
                  </div>
               </div>
            </div>
            {variable.image && (
               <div className="bg-white border border-border-main rounded-[16px] p-2 flex items-center justify-center min-h-[60px] shadow-sm">
                  <img src={variable.image} alt={variable.label} className="max-w-full max-h-[80px] object-contain" />
               </div>
            )}
          </div>

          {/* Main Input Grid Section */}
          <div className="bg-white p-3 rounded-[20px] border border-border-main shadow-sm flex flex-col gap-3">
             {/* Topology Selector - Left Aligned */}
             {(variable.name === "Inductance" || variable.name === "RMSCapacitorCurrent" || variable.name === "MinimumCapacitance") && (
                <div className="flex flex-col gap-2 pb-2 border-b border-slate-50 items-start">
                   <div className="flex items-center gap-1.5 ml-1">
                      <label className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-widest">Topology</label>
                      <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
                   </div>
                   <div className="flex gap-2">
                      {["Buck Converter", "Boost Converter"].map(top => (
                         <button 
                           key={top}
                           onClick={() => { setFormData({ ...formData, topology: top }); setCalculated(false); }}
                           className={cn(
                             "px-5 py-2 rounded-xl text-[12px] font-heading font-bold border transition-all active:scale-95",
                             (formData.topology || "Buck Converter") === top
                               ? "bg-brand-primary/5 border-brand-primary text-brand-primary shadow-sm"
                               : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                           )}
                         >
                            {top.split(" ")[0]}
                         </button>
                      ))}
                   </div>
                </div>
             )}
             
             {/* Custom Formula Input Block */}
             {activeMethod.customFormulaInput && (
                <div className="flex flex-col gap-3 pb-4 border-b border-slate-50">
                    <label className="text-[12px] font-heading font-bold text-slate-400 uppercase tracking-widest">Enter Expression</label>
                    <input 
                       type="text"
                       value={customFormulaStr}
                       onChange={(e) => setCustomFormulaStr(e.target.value)}
                       placeholder="e.g. x * y + z"
                       className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[15px] font-sans outline-none focus:border-brand-primary transition-all text-slate-800 shadow-inner"
                    />
                    {validationErrors["formula"] && (
                       <span className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {validationErrors["formula"]}
                       </span>
                    )}
                </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {currentInputFields.map((field) => {
                   const isDutyCycleField = field.name === "D";
                   return (
                   <div key={field.name} className="flex flex-col gap-1.5 group">
                      <div className="flex items-center justify-between px-1.5">
                         <div className="flex items-center gap-1.5">
                            <label className="text-[14px] font-heading font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                               {formatLabel(field.label)}
                            </label>
                            <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
                         </div>
                         {isDutyCycleField && (
                            <label className="flex items-center gap-1.5 cursor-pointer">
                               <input 
                                 type="checkbox" 
                                 checked={manualDutyCycle} 
                                 onChange={(e) => setManualDutyCycle(e.target.checked)} 
                                 className="w-3 h-3 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                               />
                               <span className="text-[10px] text-slate-400 font-bold uppercase">Manual</span>
                            </label>
                         )}
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="relative flex-1">
                            <input 
                              type="number"
                              value={inputStrings[field.name] !== undefined ? inputStrings[field.name] : ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              disabled={isDutyCycleField && !manualDutyCycle}
                              placeholder="0.0"
                              className={cn(
                                "w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-[15px] font-sans font-bold outline-none focus:bg-white transition-all text-slate-800 shadow-inner",
                                validationErrors[field.name] ? "border-red-400 focus:border-red-500" : "hover:border-slate-300 focus:border-brand-primary",
                                isDutyCycleField && !manualDutyCycle && "opacity-60 cursor-not-allowed"
                              )}
                            />
                         </div>
                         {field.units && field.units.length > 0 && field.units[0] !== "" && (
                            <div className="w-[100px] shrink-0">
                               <CustomDropdown 
                                  options={field.units} 
                                  value={units[field.name] || field.units[0]} 
                                  onChange={(val) => setUnits({ ...units, [field.name]: val })}
                               />
                            </div>
                         )}
                      </div>
                      {validationErrors[field.name] && (
                         <span className="text-red-500 text-xs font-bold flex items-center gap-1 mt-0.5 ml-1">
                            <AlertCircle className="w-3 h-3" /> {validationErrors[field.name]}
                         </span>
                      )}
                   </div>
                )})}
             </div>

             <div className="flex justify-end pt-1">
                <button 
                  onClick={handleCalculate}
                  className="px-8 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white font-heading font-extrabold rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95 group"
                >
                   <Check className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                   <span className="uppercase tracking-widest text-[11px]">Calculate Result</span>
                </button>
             </div>
          </div>

          {/* Bottom Split - Summary and Results side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {/* Left: Current Inputs Summary */}
             <div className="bg-white p-3 rounded-[16px] border border-border-main shadow-sm flex flex-col gap-2 text-center">
                <h3 className="text-[11px] font-heading font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-2">Current Configuration</h3>
                <div className="space-y-3">
                   {(variable.name === "Inductance" || variable.name === "RMSCapacitorCurrent" || variable.name === "MinimumCapacitance") && (
                      <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                         <span className="text-[13px] font-sans text-brand-primary font-bold">Topology</span>
                         <span className="text-slate-700 text-[13px] font-bold">{formData.topology || "Buck Converter"}</span>
                      </div>
                   )}
                   {currentInputFields.map(f => (
                      <div key={f.name} className="flex justify-between items-center pb-2 border-b border-slate-50/50 last:border-0">
                         <span className="text-[14px] font-sans text-brand-primary font-bold flex items-center">{formatLabel(f.label)}</span>
                         <div className="flex items-baseline gap-1.5 font-sans font-bold text-slate-700">
                            <span className="text-[15px]">{inputStrings[f.name] || 0}</span>
                            <span className="text-slate-400 text-[11px]">{units[f.name] || (f.units && f.units[0]) || ""}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Right: Calculated Result */}
             <div className="bg-white p-3 rounded-[16px] border border-border-main shadow-sm flex flex-col gap-2 text-center">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2 relative">
                   <h3 className="text-[11px] font-heading font-extrabold text-slate-800 uppercase tracking-widest">Calculated Result</h3>
                   {variable.outputUnits && variable.outputUnits.length > 0 && variable.outputUnits[0] !== "" && (
                     <div className="shrink-0">
                        <CustomDropdown 
                           options={variable.outputUnits} 
                           value={outputUnit} 
                           onChange={setOutputUnit} 
                           className="w-[80px]"
                        />
                     </div>
                   )}
                </div>

                <div className="flex-grow flex flex-col justify-center items-center text-center py-2 min-h-[80px]">
                   {calculated && persistedResult ? (
                      <div className="flex flex-col items-center gap-1 w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
                         <div className="flex items-baseline justify-center gap-1 font-sans">
                            <span className="text-[36px] font-extrabold text-brand-primary tracking-tighter leading-none">
                               {smartFormat(convertFromBase(persistedResult.rawValue!, outputUnit))}
                            </span>
                            <span className="text-brand-primary text-[18px] font-bold">{outputUnit}</span>
                         </div>
                         <div className="mt-2 py-1 px-4 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Valid result generated
                         </div>
                      </div>
                   ) : (
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                            <Zap className="w-6 h-6 fill-slate-50" />
                         </div>
                         <p className="text-[12px] font-sans text-slate-400 font-medium">Click calculate to see technical results.</p>
                      </div>
                   )}
                </div>
             </div>
          </div>
            </>
          )}
        </div>

        {/* Sidebar - History */}
        <div className="w-full xl:w-[340px] shrink-0 sticky top-4">
           <HistoryPanel 
             onReplay={handleReplay}
             onExportPDF={exportToPDF}
             onExportExcel={exportToExcel}
             currentVariableName={variable.name}
           />
        </div>
      </div>
    </div>
  );
};
