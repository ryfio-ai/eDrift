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
      <div className="flex flex-col lg:flex-row pt-20 bg-[var(--bg-main)] min-h-screen">
        {/* Left Sidebar - Exact Reference Width & Border */}
        <aside className="lg:w-75 lg:shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-hidden hidden lg:block bg-card border-r border-main">
          <CalculatorSidebar />
        </aside>

        {/* Mobile Sidebar Trigger (Placeholder for Drawer behavior) */}
        <div className="lg:hidden p-4 bg-white border-b border-main flex items-center justify-between">
           <span className="text-xs font-bold text-primary uppercase tracking-widest">Engineering Suite</span>
           <button className="text-muted">
              {/* This would trigger a mobile drawer if implemented */}
              <div className="w-6 h-0.5 bg-muted mb-1"></div>
              <div className="w-6 h-0.5 bg-muted mb-1"></div>
              <div className="w-6 h-0.5 bg-muted"></div>
           </button>
        </div>

        {/* Main Application Area - Optimized Max Width for Calculator Grid */}
        <main className="flex-1 w-full flex flex-col items-center">
          <div className="w-full max-w-[1200px] p-6 lg:p-10 flex-1">
             <div className="bg-white/40 rounded-[32px] p-0 md:p-4 backdrop-blur-sm border border-white/20">
                {children}
             </div>
          </div>
        </main>
      </div>
    </HistoryProvider>
  );
}
