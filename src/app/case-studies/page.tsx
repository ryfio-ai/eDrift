"use client";

import React from "react";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Zap } from "lucide-react";

const caseStudies = [
  {
    title: "6.6kW On-Board Charger Efficiency Optimization",
    category: "Automotive OEM",
    challenge: "A leading EV OEM faced thermal management issues in their 6.6kW OBC deployment, limiting charging speed in high-ambient conditions.",
    solution: "Implemented eDrift's SiC-based switching topology with advanced thermal interface materials and custom firmware for optimized switching frequency.",
    outcome: "18% Reduction in Heat Loss",
    specs: [
      { label: "Efficiency", value: "≥97.5%" },
      { label: "Voltage Range", value: "85V - 265V" },
      { label: "Peak Power", value: "6.6kW" },
      { label: "Compliance", value: "ASIL-D Ready" }
    ]
  },
  {
    title: "Portable Fleet Charger Deployment for Last-Mile Delivery",
    category: "Fleet Electrification",
    challenge: "Last-mile delivery fleet required a ruggedized, portable charging solution that could withstand 24/7 industrial use across multiple depots.",
    solution: "Deployed the EBC-Portable series with IP67-rated enclosure and integrated cloud monitoring for fleet-wide energy tracking.",
    outcome: "99.9% Uptime in Field Tests",
    specs: [
      { label: "Enclosure", value: "IP67 Rated" },
      { label: "Charging Rate", value: "3.3kW / 7.2kW" },
      { label: "Connectivity", value: "4G / Wi-Fi" },
      { label: "Durability", value: "Industrial Grade" }
    ]
  },
  {
    title: "Custom Power Conversion for Autonomous Utility Vehicles",
    category: "Industrial Mobility",
    challenge: "Autonomous utility vehicle OEM needed a specialized DC-DC converter and PSU that could handle extreme vibration and varied battery chemistries.",
    solution: "Developed a custom GaN-based PSU with wide input range and proprietary vibration-damping mounting system.",
    outcome: "35% Compact vs. Legacy System",
    specs: [
      { label: "Power Density", value: "2.8W/cm³" },
      { label: "Vibration Test", value: "MIL-STD-810G" },
      { label: "Input Range", value: "20V - 100V" },
      { label: "Safety", value: "SIL-2 Compliant" }
    ]
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="pt-32 pb-48 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
           <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[3px] bg-brand-primary" />
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Technical Case Studies</div>
              <div className="w-12 h-[3px] bg-brand-primary" />
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[0.95]">
             Engineering <br />
             <span className="text-brand-primary">Success Stories_</span>
           </h1>
           <p className="text-xl text-slate-500 font-semibold leading-relaxed max-w-2xl mx-auto">
             How we help global OEMs solve complex power conversion challenges 
             with automotive-grade efficiency and reliability.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {caseStudies.map((study, i) => (
             <CaseStudyCard key={i} {...study} />
           ))}
        </div>

        <div className="mt-32 pt-20 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Globe, label: "Global Deployments", val: "10k+ Units" },
              { icon: ShieldCheck, label: "Safety Standard", val: "ASIL-D / SIL-2" },
              { icon: Zap, label: "Avg. Efficiency", value: "97.5%" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                 <stat.icon className="w-10 h-10 text-brand-primary opacity-20 mb-6" />
                 <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-2">{stat.label}</p>
                 <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val || stat.value}</h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
