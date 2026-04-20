"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HistoryItem {
  id: string;
  timestamp: number;
  variableName: string;
  variableLabel: string;
  categoryName: string;
  methodName: string;
  primaryValue: string;
  primaryUnit: string;
  inputs: Record<string, number>;
  inputUnits: Record<string, string>;
  secondaryValues?: Record<string, { value: string; unit: string }>;
}

interface HistoryContextType {
  history: HistoryItem[];
  addHistoryItem: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("edrift_calc_history_v2");
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
    localStorage.setItem("edrift_calc_history_v2", JSON.stringify(history));
  }, [history]);

  const addHistoryItem = (item: Omit<HistoryItem, "id" | "timestamp">) => {
    const newItem: HistoryItem = { 
      ...item, 
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now() 
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 50)); // Keep last 50
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, deleteHistoryItem, clearHistory }}>
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
