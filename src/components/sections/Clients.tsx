"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, Award, Zap } from "lucide-react";

const partners = [
  { name: "Global EV OEM", type: "Confidential Engineering" },
  { name: "Tier-1 Systems Partner", type: "Joint Development" },
  { name: "Industrial Platform", type: "Infrastructure Program" },
  { name: "Semiconductor Lead", type: "Technology Collaboration" },
  { name: "Fleet Operator", type: "Pilot Deployment" },
  { name: "Commercial Logistics", type: "Validation Partner" },
];

const badges = [
  { label: "ISO 9001:2015", desc: "Quality Management" },
  { label: "SAE J1772", desc: "EV Connectivity" },
  { label: "IEC 61851", desc: "Charging Safety" },
  { label: "ASIL-D Ready", desc: "Functional Safety" }
];

export const Clients = () => {
  return (
    <section className="py-32 px-6 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
           <div>
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-[2px] bg-brand-primary" />
                 <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Ecosystem Verification</div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                 Validated by Global <br />
                 <span className="text-brand-primary">OEM Engineering Teams</span>
              </h2>
              <p className="text-lg text-slate-500 font-semibold leading-relaxed mb-10 max-w-xl">
                 eDrift collaborates across engineering, manufacturing, and industrial deployment ecosystems to support practical EV power system development.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-slate-200">
                 <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">97.5%</span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Avg. Efficiency</span>
                 </div>
                 <div className="w-px h-10 bg-slate-200 hidden md:block" />
                 <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">Zero</span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Failure Tolerance</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              {partners.map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 bg-white border border-slate-100 rounded-2xl group hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500"
                >
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-brand-primary/20 group-hover:bg-brand-primary transition-colors" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">{client.name}</p>
                   </div>
                   <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-slate-400">{client.type}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Engineering Compliance Badges */}
        <div className="pt-20 border-t border-slate-100">
           <div className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Technical Compliance</p>
              <h3 className="text-2xl font-bold text-slate-900">Validated Certification Stack</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-5 p-8 bg-white border border-slate-100 rounded-2xl group hover:border-brand-primary/20 hover:shadow-xl transition-all">
                   <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                      <Award className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900 mb-1">{badge.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{badge.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
