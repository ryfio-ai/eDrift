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
  Table, 
  FileText, 
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
        className="flex items-center justify-between w-full h-[40px] px-3 py-2 bg-slate-50 text-slate-700 border border-border-main rounded-md cursor-pointer transition-all hover:border-brand-primary/30 select-none shadow-sm"
      >
        <span className="text-[13px] font-bold uppercase tracking-wider">{value}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute z-[100] left-0 right-0 mt-1 min-w-max bg-white border border-border-main rounded-md shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <ul className="max-h-[200px] overflow-y-auto scrollbar-clean py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => { onChange(option); setIsOpen(false); }}
                className={cn(
                  "px-4 py-2 text-[13px] font-medium cursor-pointer transition-colors",
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
  const [mountDate, setMountDate] = useState("");

  const { history, addHistoryItem } = useCalculatorHistory();
  const activeMethod = variable.methods[methodIndex];

  useEffect(() => {
    setMounted(true);
    setMountDate(new Date().toLocaleDateString());
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

  const generateReportHTML = (historyItems: HistoryItem[]) => {
    const now = new Date().toLocaleString();
    
    return `
      <html>
        <head>
          <title>Engineering Calculation Report</title>
          <style>
            body { font-family: 'Inter', system-ui, -apple-system, sans-serif; padding: 40px; color: #1e293b; background: #fff; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid #0f172a; pb: 20px; margin-bottom: 40px; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
            .header .meta { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
            .header .logo { font-size: 24px; font-weight: 900; color: #0086c1; font-style: italic; }
            
            .card { border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 24px; page-break-inside: avoid; background: #f8fafc; }
            .card-title { font-size: 18px; font-weight: 900; color: #0f172a; margin-bottom: 4px; }
            .card-category { font-size: 12px; font-weight: 700; color: #0086c1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
            .card-meta { font-size: 11px; color: #94a3b8; font-weight: 600; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; }
            
            .section-label { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
            .input-row { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; padding: 4px 0; border-bottom: 1px solid #f1f5f9; }
            .input-row:last-child { border-bottom: none; }
            .input-row .label { color: #64748b; }
            
            .result-container { margin-top: 20px; padding: 16px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; }
            .result-value { font-size: 24px; font-weight: 900; color: #0086c1; }
            .result-unit { font-size: 14px; color: #94a3b8; margin-left: 4px; }
            
            .secondary-container { margin-top: 16px; }
            .secondary-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 8px; }
            .secondary-item { padding: 8px 12px; background: #fff; border-radius: 8px; border: 1px solid #f1f5f9; display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; }
            .secondary-item .val { color: #0086c1; }
            
            @media print {
              body { padding: 0; }
              .card { border-color: #eee; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Engineering Calculation Report</h1>
              <div class="meta">Generated on ${now}</div>
            </div>
            <div class="logo">eDrift_</div>
          </div>
          
          ${historyItems.map(item => `
            <div class="card">
              <div class="card-title">${item.variableLabel}</div>
              <div class="card-category">${item.categoryName}</div>
              <div class="card-meta">${item.methodName} • ${new Date(item.timestamp).toLocaleString()}</div>
              
              <div class="section-label">Input Parameters</div>
              <div style="margin-bottom: 20px;">
                ${Object.entries(item.inputs).map(([k, v]) => `
                  <div class="input-row">
                    <span class="label">${k.toUpperCase()}</span>
                    <span>${v} ${item.inputUnits[k]}</span>
                  </div>
                `).join('')}
              </div>
              
              <div class="section-label">Final Result</div>
              <div class="result-container">
                <span class="result-value">${item.primaryValue}</span>
                <span class="result-unit">${item.primaryUnit}</span>
              </div>
              
              ${item.secondaryValues ? `
                <div class="secondary-container">
                  <div class="section-label">Secondary Values</div>
                  <div class="secondary-grid">
                    ${Object.entries(item.secondaryValues).map(([k, v]) => `
                      <div class="secondary-item">
                        <span style="color: #64748b;">${k}</span>
                        <span class="val">${v.value} ${v.unit}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `;
  };

  const exportToPDF = () => {
    const historyToExport = history.length > 0 ? history : (result ? [{
      id: "current",
      timestamp: Date.now(),
      variableName: variable.name,
      variableLabel: variable.label,
      categoryName: categoryName,
      methodName: activeMethod.name.startsWith("M") ? `Method ${activeMethod.name.replace("M", "")}` : activeMethod.name,
      primaryValue: smartFormatText(convertFromBase(result.rawValue!, outputUnit)),
      primaryUnit: outputUnit,
      inputs: { ...inputs },
      inputUnits: { ...units },
      secondaryValues: result.secondaryValues
    }] : []);

    if (historyToExport.length === 0) return;

    const html = generateReportHTML(historyToExport as HistoryItem[]);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const exportToExcel = () => {
    const historyToExport = history.length > 0 ? history : (result ? [{
      id: "current",
      timestamp: Date.now(),
      variableName: variable.name,
      variableLabel: variable.label,
      categoryName: categoryName,
      methodName: activeMethod.name.startsWith("M") ? `Method ${activeMethod.name.replace("M", "")}` : activeMethod.name,
      primaryValue: smartFormatText(convertFromBase(result.rawValue!, outputUnit)),
      primaryUnit: outputUnit,
      inputs: { ...inputs },
      inputUnits: { ...units },
      secondaryValues: result.secondaryValues
    }] : []);

    if (historyToExport.length === 0) return;

    const rows = historyToExport.map(item => ({
      "Date": new Date(item.timestamp).toLocaleString(),
      "Tool": item.variableLabel,
      "Category": item.categoryName,
      "Method": item.methodName,
      "Result": item.primaryValue,
      "Unit": item.primaryUnit,
      "Input Parameters": Object.entries(item.inputs).map(([k, v]) => `${k}: ${v}${item.inputUnits[k]}`).join(" | "),
      "Secondary Results": item.secondaryValues ? Object.entries(item.secondaryValues).map(([k, v]) => `${k}: ${v.value}${v.unit}`).join(" | ") : "N/A"
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    
    // Add professional column widths
    const maxWidths = [22, 25, 20, 15, 12, 8, 45, 45];
    ws["!cols"] = maxWidths.map(w => ({ wch: w }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "eDrift Calculations");
    
    // Generate filename with timestamp
    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `eDrift_Report_${dateStr}.xlsx`);
  };

  return (
    <motion.div 
      key={variable.name}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-8 print:hidden"
    >
      {/* 1. Header Section */}
      <motion.div variants={itemVariants} className="flex justify-between items-center bg-white p-6 rounded-[24px] border border-border-main shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-[32px] font-black text-slate-800 tracking-tight leading-none mb-2">
            {variable.label}
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
            <p className="text-[13px] text-slate-500 font-bold uppercase tracking-widest">
               Engineering Suite • {categoryName}
            </p>
          </div>
        </div>
        {/* Icons removed as requested */}
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Content Area (Calculator Form) */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
           
           {/* 2. Method Tabs */}
           <motion.div variants={itemVariants} className="w-full overflow-x-auto scrollbar-thin pb-1">
              <div className="inline-flex items-center bg-slate-50/50 p-1.5 rounded-[16px] border border-border-main w-max">
                 {variable.methods.map((method, index) => (
                    <button
                      key={method.name}
                      onClick={() => setMethodIndex(index)}
                      className={cn(
                        "px-10 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-widest transition-all",
                        methodIndex === index 
                          ? "bg-white text-brand-primary shadow-md border border-brand-primary/10" 
                          : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                      )}
                    >
                      {method.name.startsWith("M") ? `Method ${method.name.replace("M", "")}` : method.name}
                    </button>
                 ))}
              </div>
           </motion.div>

           {/* 3. Formula Hero */}
           <motion.div variants={itemVariants} className="bg-white border border-border-main rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-slate-50/80 px-6 py-3 border-b border-border-main flex items-center justify-between">
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Active Formula</span>
                 <Zap className="w-3.5 h-3.5 text-brand-primary" />
              </div>
              <div className="p-10 flex flex-col items-center justify-center min-h-[160px]">
                 <FormulaDisplay formula={typeof activeMethod.formula === "string" ? activeMethod.formula : activeMethod.formula[formData.topology || "Buck Converter"]} />
              </div>
           </motion.div>

           {/* 4. Input Form Area */}
           <motion.div variants={itemVariants} className="bg-white p-8 rounded-[24px] border border-border-main shadow-sm flex flex-col gap-8">
              {["Inductance", "RMSCapacitorCurrent", "MinimumCapacitance"].includes(variable.name) && (
                 <div className="flex flex-col gap-4">
                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Calculator className="w-4 h-4" /> Circuit Topology
                    </label>
                    <div className="flex gap-2 p-1.5 bg-slate-50 rounded-xl border border-border-main w-fit">
                       {["Buck Converter", "Boost Converter"].map(t => (
                          <button
                            key={t}
                            onClick={() => setFormData({ ...formData, topology: t })}
                            className={cn(
                              "px-8 py-2 rounded-lg text-[13px] font-bold uppercase tracking-wider transition-all",
                              formData.topology === t 
                                ? "bg-white text-brand-primary shadow-sm border border-brand-primary/10" 
                                : "text-slate-400 hover:text-slate-600"
                            )}
                          >
                             {t.replace(" Converter", "")}
                          </button>
                       ))}
                    </div>
                 </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                 {activeMethod.inputFields
                   .filter(f => !f.topologyFilter || f.topologyFilter === formData.topology)
                   .map(field => (
                    <div key={field.name} className="flex flex-col gap-2 relative group">
                       <label className="flex items-center justify-between">
                          <span className="text-[15px] font-bold text-slate-700">
                             {formatLabel(field.label)}
                          </span>
                          <div className="group/tip relative">
                             <Info className="w-4 h-4 text-slate-300 cursor-help hover:text-brand-primary transition-colors" />
                             <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all z-50">
                                {field.helptext}
                             </div>
                          </div>
                       </label>
                       <div className="flex gap-2">
                          <input 
                            type="number"
                            value={inputs[field.name] || ""}
                            onChange={(e) => setInputs({ ...inputs, [field.name]: parseFloat(e.target.value) || 0 })}
                            placeholder="0.0"
                            className="w-full bg-slate-50 border border-border-main rounded-xl px-4 py-3 text-[16px] font-medium outline-none hover:border-slate-300 focus:border-brand-primary focus:bg-white transition-all text-slate-800 shadow-inner"
                          />
                          {field.units[0] !== "" && (
                             <div className="flex-none w-[100px]">
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

              <div className="flex justify-end pt-4">
                 <button 
                   onClick={handleCalculate}
                   className="group relative px-12 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-black rounded-2xl shadow-xl hover:shadow-brand-primary/20 transition-all flex items-center gap-3 active:scale-95"
                 >
                    <Zap className="w-5 h-5 fill-white" />
                    <span className="uppercase tracking-widest text-[15px]">Calculate Results</span>
                 </button>
              </div>
           </motion.div>

           {/* 5. Summary Board Cards */}
           <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto lg:h-[300px]">
              <div className="bg-white border border-border-main rounded-[24px] p-8 shadow-sm flex flex-col overflow-hidden group">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-colors">
                       <Check className="w-5 h-5" />
                    </div>
                    <h3 className="text-[17px] font-black text-slate-800 uppercase tracking-wider">Current Inputs</h3>
                 </div>
                 <div className="flex-1 overflow-y-auto pr-2 scrollbar-clean space-y-4">
                    {Object.keys(inputs).length === 0 ? (
                       <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
                          <Info className="w-8 h-8 mb-2" />
                          <p className="text-[11px] font-bold uppercase tracking-widest">Awaiting values</p>
                       </div>
                    ) : (
                       Object.entries(inputs).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
                             <span className="text-[15px] text-slate-500 font-bold uppercase tracking-tight">{formatLabel(key)}</span>
                             <span className="text-[16px] font-black text-slate-800">
                                {val} <span className="text-brand-primary font-bold text-[12px] uppercase ml-1">{units[key]}</span>
                             </span>
                          </div>
                       ))
                    )}
                 </div>
              </div>

              <div className="bg-white border border-border-main rounded-[24px] p-8 shadow-sm flex flex-col overflow-hidden border-t-4 border-t-brand-primary group">
                 <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                          <Check className="w-5 h-5" />
                       </div>
                       <h3 className="text-[17px] font-black text-slate-800 uppercase tracking-wider">Output</h3>
                    </div>
                    <CustomDropdown 
                       options={variable.outputUnits} 
                       value={outputUnit} 
                       onChange={setOutputUnit} 
                       className="w-[110px]"
                    />
                 </div>
                 <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                    {calculated && result ? (
                       <div className="flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-500 w-full">
                          <div className="flex flex-col gap-1">
                             <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{formatLabel(variable.symbol || variable.label)} Result</span>
                             <div className="flex items-baseline justify-center gap-2">
                                <span className="text-[42px] font-black text-brand-primary tracking-tighter leading-none">
                                   {smartFormat(convertFromBase(result.rawValue!, outputUnit))}
                                </span>
                                <span className="text-slate-400 text-[16px] font-black uppercase">{outputUnit}</span>
                             </div>
                          </div>
                          
                          {result.secondaryValues && (
                             <div className="grid grid-cols-1 gap-2 pt-4 border-t border-slate-50">
                                {Object.entries(result.secondaryValues).map(([k, v]) => (
                                   <div key={k} className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-xl">
                                      <span className="text-slate-400 text-[11px] font-bold uppercase">{formatLabel(k)}</span>
                                      <div className="flex items-baseline gap-1">
                                         <span className="text-[16px] font-black text-slate-700">{v.value}</span>
                                         <span className="text-brand-primary text-[10px] font-bold">{v.unit}</span>
                                      </div>
                                   </div>
                                ))}
                             </div>
                          )}
                       </div>
                    ) : (
                       <div className="flex flex-col items-center gap-4 opacity-30">
                          <Zap className="w-10 h-10" />
                          <p className="text-[12px] font-bold uppercase tracking-[0.2em]">Click calculate</p>
                       </div>
                    )}
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Right Interaction Sidebar */}
        <motion.div variants={itemVariants} className="w-full xl:w-[360px] flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={exportToExcel}
                className="flex items-center justify-center gap-2 h-14 bg-white border border-border-main rounded-[20px] text-[12px] font-black text-slate-500 uppercase tracking-widest hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-sm group"
              >
                 <FileDown className="w-4 h-4 group-hover:scale-110 transition-transform" /> Excel
              </button>
              <button 
                onClick={exportToPDF}
                className="flex items-center justify-center gap-2 h-14 bg-white border border-border-main rounded-[20px] text-[12px] font-black text-slate-500 uppercase tracking-widest hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-sm group"
              >
                 <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" /> PDF
              </button>
           </div>

           <div className="flex-1 min-h-[600px] xl:min-h-0">
              <HistoryPanel 
                onReplay={handleReplay}
                currentVariableName={variable.name}
              />
           </div>

           {/* Help Card */}
           <div className="bg-brand-primary p-6 rounded-[24px] text-white shadow-xl shadow-brand-primary/20 relative overflow-hidden group print:hidden">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="text-[18px] font-black mb-2 flex items-center gap-2">
                 <HelpCircle className="w-5 h-5" /> Need Help?
              </h4>
              <p className="text-[13px] text-white/80 font-medium leading-relaxed mb-4">
                 Our technical support team is available to help with complex design parameters.
              </p>
              <button className="w-full py-3 bg-white text-brand-primary rounded-xl font-black text-[12px] uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-lg">
                 Contact Engineering
              </button>
           </div>
        </motion.div>
      </div>

    </motion.div>
  );
};
