"use client";

import React from "react";

interface SpecRow {
  label: string;
  value: string;
}

interface SpecTableProps {
  rows: SpecRow[];
}

export const SpecTable = ({ rows }: SpecTableProps) => {
  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-border-subtle bg-bg-main shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-bg-main border-b border-border-subtle">
             <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Specification_</th>
             <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Rating / Detail</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {rows.map((row, i) => (
            <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
              <td className="px-8 py-4.5 text-sm font-semibold text-text-muted group-hover:text-text-main transition-colors">{row.label}</td>
              <td className="px-8 py-4.5 text-sm font-bold text-text-main tech-value">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
