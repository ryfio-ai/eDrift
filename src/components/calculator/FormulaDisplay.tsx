"use client";

import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

interface FormulaDisplayProps {
  formula: string;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ formula }) => {
  return (
    <div className="text-brand-primary overflow-x-auto w-full">
      <BlockMath math={formula} />
    </div>
  );
};
