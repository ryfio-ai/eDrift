"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  Zap, 
  TrendingDown, 
  ArrowRight, 
  Download, 
  PieChart, 
  Info,
  DollarSign,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function TCOCalculator() {
  // Inputs
  const [fleetSize, setFleetSize] = useState(10);
  const [milesPerYear, setMilesPerYear] = useState(15000); // km/year
  const [elecCost, setElecCost] = useState(0.12); // $/kWh
  const [legacyEff, setLegacyEff] = useState(94);
  const [edriftEff, setEdriftEff] = useState(97.5);
  const [analysisYears, setAnalysisYears] = useState(5);

  // Derived Calculations
  const results = useMemo(() => {
    const kwhPerKm = 0.2; // Average EV efficiency
    const totalKm = fleetSize * milesPerYear * analysisYears;
    const totalEnergyRequired = totalKm * kwhPerKm;

    const legacyEnergyConsumed = totalEnergyRequired / (legacyEff / 100);
    const edriftEnergyConsumed = totalEnergyRequired / (edriftEff / 100);

    const energySaved = legacyEnergyConsumed - edriftEnergyConsumed;
    const costSaved = energySaved * elecCost;
    const co2Prevented = (energySaved * 0.475) / 1000; // Tons (avg grid factor)

    const legacyCost = legacyEnergyConsumed * elecCost;
    const edriftCost = edriftEnergyConsumed * elecCost;
    const roiPercent = ((legacyCost - edriftCost) / edriftCost) * 100;

    return {
      energySaved: Math.round(energySaved),
      costSaved: Math.round(costSaved),
      co2Prevented: co2Prevented.toFixed(2),
      roiPercent: Math.round(roiPercent),
      paybackMonths: Math.max(1, Math.round((2000 / (costSaved / (analysisYears * 12))))) // Mock hardware delta cost
    };
  }, [fleetSize, milesPerYear, elecCost, legacyEff, edriftEff, analysisYears]);

  return (
    <main className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">Interactive Decision Support</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
            Total Cost of <br />
            <span className="text-brand-primary">Ownership Calculator</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Quantify the economic impact of upgrading to eDrift's 97.5% efficient power electronics across your fleet or OEM lineup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-start">
          
          {/* Left: Input Dashboard */}
          <div className="lg:col-span-4 space-y-8 bg-slate-50 p-10 rounded-[48px] border border-slate-100">
             <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-5 h-5 text-brand-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Analysis Inputs</h3>
             </div>

             <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Fleet Size (Units)</label>
                  <input 
                    type="range" min="1" max="500" step="1" 
                    value={fleetSize} onChange={(e) => setFleetSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                  <div className="flex justify-between mt-2 text-sm font-bold text-slate-900">
                     <span>1</span>
                     <span className="text-brand-primary">{fleetSize} units</span>
                     <span>500</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Legacy Efficiency (%)</label>
                  <input 
                    type="number" value={legacyEff} 
                    onChange={(e) => setLegacyEff(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Avg. Mileage (km/unit/yr)</label>
                  <input 
                    type="number" value={milesPerYear} 
                    onChange={(e) => setMilesPerYear(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Elec. Cost ($/kWh)</label>
                  <input 
                    type="number" step="0.01" value={elecCost} 
                    onChange={(e) => setElecCost(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Period (Years)</label>
                  <div className="flex gap-2">
                     {[3, 5, 10].map(y => (
                       <button 
                         key={y} 
                         onClick={() => setAnalysisYears(y)}
                         className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${
                           analysisYears === y ? "bg-brand-primary text-white border-brand-primary" : "bg-white text-slate-400 border-slate-200"
                         }`}
                       >
                         {y}Y
                       </button>
                     ))}
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Output Visualization */}
          <div className="lg:col-span-8 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                   key={results.costSaved}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="p-10 bg-brand-primary rounded-[48px] text-white overflow-hidden relative"
                >
                   <div className="relative z-10">
                      <DollarSign className="w-8 h-8 text-white/20 mb-10" />
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Total OpEx Savings</p>
                      <h3 className="text-5xl font-bold mb-4">${results.costSaved.toLocaleString()}</h3>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Across {analysisYears} Years of Operation</p>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 blur-[60px] rounded-full" />
                </motion.div>

                <div className="p-10 bg-slate-900 rounded-[48px] text-white overflow-hidden relative">
                   <div className="relative z-10">
                      <Zap className="w-8 h-8 text-brand-primary mb-10" />
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Efficiency Gains (ROI)</p>
                      <h3 className="text-5xl font-bold mb-4">+{results.roiPercent}%</h3>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Energy Recovery Margin</p>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 blur-[60px] rounded-full" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: TrendingDown, label: "Payback Period", val: `${results.paybackMonths} Months`, color: "text-emerald-500" },
                  { icon: ShieldCheck, label: "CO2 Prevented", val: `${results.co2Prevented} Tons`, color: "text-brand-primary" },
                  { icon: PieChart, label: "Energy Saved", val: `${results.energySaved.toLocaleString()} kWh`, color: "text-blue-500" }
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] text-center shadow-sm">
                     <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-4`} />
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                     <p className="text-xl font-bold text-slate-900">{stat.val}</p>
                  </div>
                ))}
             </div>

             <div className="p-10 bg-slate-50 border border-slate-100 rounded-[48px] text-center">
                <h3 className="text-3xl font-semibold text-slate-900 mb-6 tracking-tight">Generate Full ROI Report</h3>
                <p className="text-lg text-slate-500 font-medium mb-10 max-w-xl mx-auto">
                   Our engineering team can provide a detailed simulation based on your specific custom charging profiles and hardware geometry.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                   <button className="btn-primary h-14 px-10">Download PDF Report</button>
                   <Link href="/contact" className="btn-outline h-14 px-10">Request Consultation</Link>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
