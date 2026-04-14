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
      <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <aside className="lg:w-80 shrink-0">
            <CalculatorSidebar />
          </aside>
          <main className="flex-grow min-w-0">
            {children}
          </main>
        </div>
      </div>
    </HistoryProvider>
  );
}
