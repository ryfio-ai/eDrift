"use client";

import React, { useState, useMemo } from "react";
import { useCalculatorHistory, HistoryItem } from "@/lib/calculator/HistoryContext";
import { 
  Clock, 
  Search, 
  Filter, 
  Trash2, 
  RotateCcw, 
  ChevronDown, 
  Calendar,
  MoreVertical,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const formatDate = (date: number | Date, formatStr: string) => {
  const d = new Date(date);
  if (formatStr === "yyyy-MM-dd") {
    return d.toISOString().split('T')[0];
  }
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
  currentVariableName?: string;
}

type TimeFilter = "Recent" | "All" | "Today" | "Yesterday";

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onReplay, currentVariableName }) => {
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
      filtered = filtered.filter(h => formatDate(h.timestamp, "yyyy-MM-dd") === dateFilter);
    }

    return filtered;
  }, [history, timeFilter, variableFilter, dateFilter]);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-border-main shadow-sm overflow-hidden print:hidden">
      {/* Header */}
      <div className="p-5 border-b border-border-main flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-primary" />
          <h3 className="font-bold text-slate-800">History</h3>
        </div>
        <button 
          onClick={clearHistory}
          className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-red-500 transition-colors"
        >
          Clear History
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="p-3 bg-slate-50/50 border-b border-border-main flex flex-col gap-2">
        {/* Time Tabs */}
        <div className="flex bg-white rounded-lg p-1 border border-border-main shadow-sm">
          {(["Recent", "All", "Today", "Yesterday"] as TimeFilter[]).map(tab => (
            <button
              key={tab}
              onClick={() => setTimeFilter(tab)}
              className={cn(
                "flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all",
                timeFilter === tab 
                  ? "bg-brand-primary text-white shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dropdowns Row */}
        <div className="flex gap-2">
          {/* Variable Dropdown */}
          <div className="relative flex-1">
            <button 
              onClick={() => setIsVariableOpen(!isVariableOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-white border border-border-main rounded-lg text-[12px] font-medium text-slate-700 hover:border-brand-primary/30 transition-all"
            >
              <span className="truncate">{variableFilter}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isVariableOpen && "rotate-180")} />
            </button>
            {isVariableOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-main rounded-lg shadow-xl z-20 max-h-[200px] overflow-y-auto">
                {uniqueVariables.map(v => (
                  <button
                    key={v}
                    onClick={() => {
                      setVariableFilter(v);
                      setIsVariableOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-[12px] hover:bg-slate-50 transition-colors",
                      variableFilter === v ? "text-brand-primary font-bold" : "text-slate-600"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker (Simplified) */}
          <div className="relative w-32">
            <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-8 pr-2 py-2 bg-white border border-border-main rounded-lg text-[12px] font-medium text-slate-700 outline-none focus:border-brand-primary/30"
            />
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-clean">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Filter className="w-10 h-10 mb-3" />
            <p className="text-[11px] font-bold uppercase tracking-widest">No calculations found</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div 
              key={item.id}
              className="group relative p-4 bg-white border border-border-main rounded-xl hover:border-brand-primary/30 hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {/* Category & Date */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.categoryName}</span>
                  <h4 className="text-[14px] font-bold text-brand-primary">{item.variableLabel}</h4>
                </div>
                <div className="flex items-center gap-1">
                   <button 
                     onClick={() => onReplay?.(item)}
                     className="p-1.5 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-md transition-all"
                     title="Replay"
                   >
                     <RotateCcw className="w-3.5 h-3.5" />
                   </button>
                   <button 
                     onClick={() => deleteHistoryItem(item.id)}
                     className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                     title="Delete"
                   >
                     <Trash2 className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>

              {/* Sub-info */}
              <p className="text-[11px] text-slate-500 mb-3">
                {item.methodName} • {formatDate(item.timestamp, "MMM d, yyyy, hh:mm a")}
              </p>

              {/* Result Summary */}
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Output</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-slate-800">{item.primaryValue}</span>
                  <span className="text-[10px] font-bold text-brand-primary uppercase">{item.primaryUnit}</span>
                </div>
              </div>

              {/* Input Peek (Optional/Hidden by default) */}
              <div className="mt-2 pt-2 border-t border-slate-50 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto overflow-hidden transition-all duration-300">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                   {Object.entries(item.inputs).slice(0, 4).map(([k, v]) => (
                     <div key={k} className="flex justify-between text-[10px]">
                        <span className="text-slate-400">{k}:</span>
                        <span className="font-bold text-slate-600">{v} {item.inputUnits[k]}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-50/50 border-t border-border-main text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Showing {filteredHistory.length} of {history.length}
        </p>
      </div>
    </div>
  );
};
