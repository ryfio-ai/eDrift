import React from 'react'

interface SpecRow {
  label: string
  value: string
}

interface SpecTableProps {
  rows: SpecRow[]
}

export const SpecTable = ({ rows }: SpecTableProps) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border-subtle bg-navy-mid/30">
      <table className="w-full text-left border-collapse">
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-border-subtle last:border-0 hover:bg-white/5 transition-colors">
              <td className="p-4 text-text-secondary font-medium w-1/3">{row.label}</td>
              <td className="p-4 text-text-primary font-mono">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
