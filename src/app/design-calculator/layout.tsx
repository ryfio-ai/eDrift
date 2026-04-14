"use client";

import React from "react";
import { CalculatorSidebar } from "@/components/calculator/CalculatorSidebar";
import { HistoryProvider } from "@/lib/calculator/HistoryContext";

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HistoryProvider>
      <div className="flex flex-col lg:flex-row pt-20 bg-white min-h-screen">
        {/* Left Sidebar - Fixed at Desktop */}
        <aside className="lg:w-80 lg:shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-hidden hidden lg:block">
          <CalculatorSidebar />
        </aside>

        {/* Mobile Sidebar (Optional simplification or hide) */}
        <div className="lg:hidden p-4 bg-slate-50 border-b border-slate-200">
           <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Select Tool in Sidebar</p>
        </div>

        {/* Main Application Area */}
        <main className="flex-grow min-w-0 bg-slate-50/30">
          {children}
        </main>
      </div>
    </HistoryProvider>
  );
}
