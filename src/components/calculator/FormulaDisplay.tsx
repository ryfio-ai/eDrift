"use client";

import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

interface FormulaDisplayProps {
  formula: string;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ formula }) => {
  return (
    <div className="w-full py-8 px-6 bg-slate-50 border border-slate-100 rounded-2xl overflow-x-auto flex items-center justify-center">
      <div className="text-brand-primary">
        <BlockMath math={formula} />
      </div>
    </div>
  );
};
