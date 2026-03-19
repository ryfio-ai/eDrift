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
    <div className="w-full overflow-hidden rounded-[32px] border border-white/5 bg-navy-mid/20 backdrop-blur-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5">
             <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#00F0FF]">Specification</th>
             <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#00F0FF]">Rating / Detail</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, i) => (
            <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
              <td className="px-8 py-5 text-sm font-bold text-text-secondary group-hover:text-white transition-colors">{row.label}</td>
              <td className="px-8 py-5 text-sm font-black font-space text-white">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
