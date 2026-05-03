"use client";

import React from "react";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Globe, ShieldCheck, Zap, Activity } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

export default function CaseStudiesClient() {
  return (
    <div className="pt-40 pb-48 px-6 bg-bg-main min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center max-w-3xl mx-auto">
           <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-primary" />
              <div className="text-[10px] tracking-[0.2em] font-bold text-brand-primary uppercase">Engineering Case Studies</div>
              <div className="w-12 h-px bg-brand-primary" />
           </div>
           <h1 className="text-4xl md:text-7xl font-bold text-text-main mb-8 tracking-tighter leading-[1.1]">
             Real Challenges. <br />
             <span className="text-brand-primary">Measured Outcomes_</span>
           </h1>
           <p className="text-lg md:text-xl text-text-muted font-medium leading-relaxed">
             A deep dive into how we solve complex power conversion problems 
             using SiC and GaN technology for global OEMs.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {caseStudies.map((study, i) => (
             <CaseStudyCard key={i} {...study} />
           ))}
        </div>

        <div className="mt-32 pt-20 border-t border-border-subtle grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Globe, label: "Global Deployments", val: "10,000+ Units" },
              { icon: ShieldCheck, label: "Safety Alignment", val: "AIS-138 / BIS" },
              { icon: Activity, label: "Field Reliability", val: "99.98%" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                 <div className="w-14 h-14 rounded-full bg-surface border border-border-subtle flex items-center justify-center mb-6 shadow-sm">
                    <stat.icon className="w-6 h-6 text-brand-primary" />
                 </div>
                 <p className="text-[10px] tracking-[0.2em] text-text-faint font-bold uppercase mb-2">{stat.label}</p>
                 <h4 className="text-3xl font-bold text-text-main tracking-tighter tech-value">{stat.val}</h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
