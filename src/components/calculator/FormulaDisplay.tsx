"use client";

import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

interface FormulaDisplayProps {
  formula: string;
  colorClass?: string;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ formula, colorClass = "text-brand-primary" }) => {
  return (
    <div className={`${colorClass} overflow-x-auto w-full`}>
      <BlockMath math={formula} />
    </div>
  );
};
