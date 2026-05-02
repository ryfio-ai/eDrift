"use client";

import React, { useState, useMemo } from "react";
import { useCalculatorHistory, HistoryItem } from "@/lib/calculator/HistoryContext";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { calculatorConfig } from "@/lib/calculator/config";
import { 
  Clock, 
  Search, 
  Filter, 
  Trash2, 
  RotateCcw, 
  ChevronDown, 
  Calendar,
  MoreVertical,
  X,
  FileDown,
  Printer,
  RotateCw
} from "lucide-react";
import { cn } from "@/lib/utils";

const getLatex = (label: string): string => {
  if (!label) return "";
  
  let latex = label;
  if (label.includes("_") && !label.includes("\\")) {
    const parts = label.split("_");
    latex = `${parts[0]}_{${parts[1].replace(/{|}/g, '')}}`;
  }
  
  latex = latex.replace(/μ/g, "\\mu ");
  latex = latex.replace(/Δ/g, "\\Delta ");
  latex = latex.replace(/Φ/g, "\\Phi ");
  latex = latex.replace(/η/g, "\\eta ");
  latex = latex.replace(/π/g, "\\pi ");

  return latex;
};

const formatSymbol = (label: string) => {
  return <InlineMath math={getLatex(label)} />;
};

const formatDate = (date: number | Date) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(d);
};

interface HistoryPanelProps {
  onReplay?: (item: HistoryItem) => void;
  onExportPDF?: () => void;
  onExportExcel?: () => void;
  currentVariableName?: string;
}

type TimeFilter = "Recent" | "All" | "Today" | "Yesterday";

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  onReplay, 
  onExportPDF,
  onExportExcel,
  currentVariableName 
}) => {
  const { history, deleteHistoryItem, clearHistory } = useCalculatorHistory();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Recent");
  const [variableFilter, setVariableFilter] = useState<string>("All Variable");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [isVariableOpen, setIsVariableOpen] = useState(false);

  const uniqueVariables = useMemo(() => {
    const vars = Array.from(new Set(history.map(h => h.variableLabel)));
    return ["All Variable", ...vars];
  }, [history]);

  const filteredHistory = useMemo(() => {
    let filtered = [...history];

    // Time filtering
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;

    if (timeFilter === "Today") {
      filtered = filtered.filter(h => h.timestamp >= today);
    } else if (timeFilter === "Yesterday") {
      filtered = filtered.filter(h => h.timestamp >= yesterday && h.timestamp < today);
    } else if (timeFilter === "Recent") {
      filtered = filtered.slice(0, 10);
    }

    // Variable filtering
    if (variableFilter !== "All Variable") {
      filtered = filtered.filter(h => h.variableLabel === variableFilter);
    }

    // Date filtering
    if (dateFilter) {
      filtered = filtered.filter(h => {
        const d = new Date(h.timestamp);
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        return dateStr === dateFilter;
      });
    }

    return filtered;
  }, [history, timeFilter, variableFilter, dateFilter]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-[340px] mx-auto print:hidden font-sans">
      {/* 1. Export Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={onExportPDF}
          className="bg-white border border-slate-200 rounded-lg py-2.5 px-2 text-[13px] font-heading font-bold text-slate-800 shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          Export as PDF
        </button>
        <button 
          onClick={onExportExcel}
          className="bg-white border border-slate-200 rounded-lg py-2.5 px-2 text-[13px] font-heading font-bold text-slate-800 shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          Export as Excel
        </button>
      </div>

      {/* 2. Filter Tabs and Dropdowns */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex flex-col gap-3">
        <div className="flex gap-2">
          {(["Recent", "All", "Today", "Yesterday"] as TimeFilter[]).map(tab => (
            <button
              key={tab}
              onClick={() => setTimeFilter(tab)}
              className={cn(
                "flex-1 py-1.5 text-[11px] font-heading font-bold rounded-md transition-all",
                timeFilter === tab 
                  ? "bg-brand-primary text-white" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <button 
              onClick={() => setIsVariableOpen(!isVariableOpen)}
              className="w-full flex items-center justify-between px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-heading font-medium text-slate-700"
            >
              <span className="truncate">{variableFilter}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", isVariableOpen && "rotate-180")} />
            </button>
            {isVariableOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-xl z-20 max-h-[180px] overflow-y-auto">
                {uniqueVariables.map(v => (
                  <button
                    key={v}
                    onClick={() => {
                      setVariableFilter(v);
                      setIsVariableOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-[12px] font-heading hover:bg-slate-50 transition-colors",
                      variableFilter === v ? "text-brand-primary font-bold" : "text-slate-600"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={cn(
                "w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-sans font-medium text-slate-700 outline-none appearance-none",
                !dateFilter && "text-transparent"
              )}
            />
            {!dateFilter && (
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-sans text-slate-400 pointer-events-none">
                dd-mm-yyyy
              </span>
            )}
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3. History Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
        <div className="p-5 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-brand-primary" />
            <h3 className="text-[28px] font-heading font-medium text-slate-800">History</h3>
          </div>
          <button 
            onClick={clearHistory}
            className="text-[14px] font-sans text-slate-400 hover:text-brand-primary transition-colors font-medium"
          >
            Clear History
          </button>
        </div>
        
        <div className="px-4 py-2">
          <p className="text-[13px] text-slate-400 font-sans">
            Showing latest calculation per variable ({filteredHistory.length})
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-clean">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 opacity-10 grayscale">
              <Filter className="w-12 h-12 mb-3 text-slate-300 stroke-[1]" />
              <p className="text-[12px] font-heading font-extrabold uppercase tracking-[0.2em] text-slate-400">No calculations yet</p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Item Header */}
                <div className="bg-slate-50/50 px-4 py-3 border-b border-slate-100">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-col">
                       <span className="text-[12px] text-slate-400 font-sans">{item.categoryName}</span>
                       <h4 className="text-[16px] font-heading font-bold text-brand-primary leading-tight">{item.variableLabel}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                         onClick={() => onReplay?.(item)}
                         className="p-1.5 text-slate-400 hover:text-brand-primary transition-colors hover:bg-white rounded-md border border-transparent hover:border-slate-100 shadow-sm"
                       >
                         <RotateCcw className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => deleteHistoryItem(item.id)}
                         className="p-1.5 text-slate-400 hover:text-red-500 transition-colors hover:bg-white rounded-md border border-transparent hover:border-slate-100 shadow-sm"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-sans">
                    <span>{item.methodName}</span>
                    <span className="opacity-40">•</span>
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                </div>

                {/* Inputs Section */}
                <div className="p-4 flex flex-col gap-2 border-b border-slate-100">
                   <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Inputs</div>
                     {Object.entries(item.inputs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-[13px]">
                           <span className="text-slate-500 font-sans font-bold flex items-center">{formatSymbol(key)}</span>
                           <div className="flex items-center gap-1">
                              <span className="font-bold text-slate-700">{value}</span>
                              <span className="text-[11px] text-slate-400 font-sans">{item.inputUnits[key] || ""}</span>
                           </div>
                        </div>
                     ))}
                </div>

                {/* Output Section */}
                <div className="p-4 bg-slate-50/30">
                   <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Output</div>
                   <div className="flex justify-between items-baseline">
                      <span className="text-[14px] text-slate-400 font-sans">
                         {formatSymbol(calculatorConfig.categories
                           .flatMap(c => c.variables)
                           .find(v => v.label === item.variableLabel)?.symbol || "Result")}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[20px] font-bold text-brand-primary">{item.primaryValue}</span>
                        <span className="text-[14px] font-bold text-brand-primary">{item.primaryUnit}</span>
                      </div>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
