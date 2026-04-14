"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorVariable, CalculationResult } from "@/lib/calculator/types";
import { runCalculation } from "@/lib/calculator/engine";
import { convertToBase, convertFromBase } from "@/lib/calculator/unitConversions";
import { FormulaDisplay } from "./FormulaDisplay";
import { Info, Download, Moon, LayoutGrid, Clock, ChevronDown, FileText, Table } from "lucide-react";
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

  // Filter history for current tool
  const currentToolHistory = useMemo(() => {
    return history.filter(item => item.variableName === variable.name).slice(0, 10);
  }, [history, variable.name]);

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50/50">
      {/* Main Area */}
      <div className="flex-1 px-8 py-10">
        {/* Top Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">{variable.category || "Design Tool"}</h1>
            <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
              <span>Calculating</span>
              <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded font-bold">{variable.label}</span>
              <span className="text-slate-300">•</span>
              <span>Method: {activeMethod.name}</span>
            </div>
          </div>
          <button className="p-2.5 bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-800/20">
            <Moon className="w-5 h-5" />
          </button>
        </div>

        {/* Method Switcher Tabs */}
        <div className="flex gap-4 mb-8">
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200 w-fit">
            {variable.methods.map((method, idx) => (
              <button
                key={method.name}
                onClick={() => setMethodIndex(idx)}
                className={cn(
                  "px-8 py-2.5 rounded-xl text-[13px] font-bold transition-all",
                  methodIndex === idx 
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {method.name}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Formula Display */}
        <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-[32px] p-12 mb-10 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 w-full flex flex-col items-center">
             <FormulaDisplay 
                formula={typeof activeMethod.formula === "string" ? activeMethod.formula : activeMethod.formula[formData.topology || "Buck"]} 
             />
             
             {/* Large Result Overlay (if calculated) */}
             {currentResult && currentResult.primaryValue !== "0.000" && (
                <div className="mt-8 pt-8 border-t border-brand-primary/10 w-full text-center animate-in zoom-in duration-500">
                   <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-2">Calculated Result_</p>
                   <div className="flex items-center justify-center gap-4">
                      <span className="text-5xl font-black text-slate-800 tracking-tighter">
                        {currentResult.primaryValue}
                      </span>
                      <span className="text-xl font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-lg uppercase">
                        {currentResult.primaryUnit}
                      </span>
                   </div>
                </div>
             )}
          </div>
        </div>

        {/* Input Grid Area */}
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-200">
          {/* Topology Control (If applicable) */}
          {(variable.name === "Inductance" || variable.name === "RMSCapacitorCurrent" || variable.name === "MinimumCapacitance") && (
            <div className="flex items-center justify-between mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-800">Topology</span>
                <Info className="w-4 h-4 text-slate-300 cursor-help" />
              </div>
              <div className="flex bg-slate-50 p-1 rounded-xl">
                {["Buck", "Boost"].map((top) => (
                  <button
                    key={top}
                    onClick={() => setFormData({ ...formData, topology: `${top} Converter` })}
                    className={cn(
                      "px-8 py-2 rounded-lg text-xs font-bold transition-all",
                      formData.topology === `${top} Converter` 
                        ? "bg-brand-primary text-white shadow-sm" 
                        : "text-slate-400 border-transparent hover:text-slate-600"
                    )}
                  >
                    {top}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {activeMethod.inputFields
              .filter(field => !field.topologyFilter || field.topologyFilter === formData.topology)
              .map((field) => (
              <div key={field.name} className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <label className="text-xs font-bold text-slate-800">{field.label}</label>
                  <Info className="w-3.5 h-3.5 text-slate-300 cursor-help" />
                </div>
                <div className="flex bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all shadow-inner">
                  <input
                    type="number"
                    value={inputs[field.name] || ""}
                    onChange={(e) => setInputs({ ...inputs, [field.name]: parseFloat(e.target.value) || 0 })}
                    className="flex-grow bg-transparent px-6 py-4 text-sm font-bold text-slate-700 outline-none"
                    placeholder="0.0"
                  />
                  <div className="relative group/unit">
                    <select
                      value={units[field.name]}
                      onChange={(e) => setUnits({ ...units, [field.name]: e.target.value })}
                      className="bg-white px-6 py-4 border-l border-slate-100 text-[11px] font-bold text-slate-800 outline-none cursor-pointer appearance-none min-w-[100px] text-center uppercase tracking-widest"
                    >
                      {field.units.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleCalculate}
            className="w-full mt-12 bg-brand-primary hover:bg-brand-primary/95 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-brand-primary/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
          >
            Calculate System Data
          </button>
        </div>
      </div>

      {/* Right Sidebar - Exports & History */}
      <div className="w-full lg:w-[380px] px-8 py-10 border-l border-slate-200 bg-white">
        <div className="grid grid-cols-2 gap-4 mb-10">
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-wider"
          >
            <FileText className="w-4 h-4" />
            PDF Export
          </button>
          <button 
            onClick={exportToExcel}
            className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-wider"
          >
            <Table className="w-4 h-4" />
            Excel Export
          </button>
        </div>

        {/* History Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-800">
               <Clock className="w-5 h-5 text-brand-primary" />
               <h3 className="font-bold text-lg">History</h3>
            </div>
            <div className="flex gap-2">
               {['Recent', 'All'].map(tab => (
                 <button key={tab} className={cn(
                   "text-[10px] font-bold px-3 py-1.5 rounded-lg border",
                   tab === 'Recent' ? "bg-brand-primary text-white border-brand-primary" : "text-slate-400 border-slate-200"
                 )}>{tab}</button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
            {currentToolHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                 <LayoutGrid className="w-12 h-12 mb-4 opacity-20" />
                 <p className="text-xs font-bold uppercase tracking-widest">No calculations yet</p>
              </div>
            ) : (
              currentToolHistory.map((item, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-primary/20 transition-all group">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.methodName}</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-brand-primary transition-colors">{item.primaryValue}</span>
                      <span className="text-[11px] font-bold text-brand-primary bg-white px-2 py-1 rounded-lg border border-slate-200 uppercase">{item.primaryUnit}</span>
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
