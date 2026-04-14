"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CalculationResult } from "./types";

export interface HistoryItem {
  timestamp: number;
  variableName: string;
  variableLabel: string;
  methodName: string;
  primaryValue: string;
  primaryUnit: string;
  inputs: Record<string, number>;
  inputUnits: Record<string, string>;
  secondaryValues?: Record<string, { value: string; unit: string }>;
}

interface HistoryContextType {
  history: HistoryItem[];
  addHistoryItem: (item: Omit<HistoryItem, "timestamp">) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("edrift_calc_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("edrift_calc_history", JSON.stringify(history));
  }, [history]);

  const addHistoryItem = (item: Omit<HistoryItem, "timestamp">) => {
    const newItem: HistoryItem = { ...item, timestamp: Date.now() };
    setHistory((prev) => [newItem, ...prev].slice(0, 20)); // Keep last 20
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useCalculatorHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useCalculatorHistory must be used within a HistoryProvider");
  }
  return context;
};
