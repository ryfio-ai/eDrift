"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Zap, ShieldCheck, Cpu, 
  BarChart3, Activity, Thermometer, 
  Package, CheckCircle2, ChevronRight,
  Info, ExternalLink, Quote
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { cn } from "@/lib/utils";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen font-sans pb-32">
      {/* 1. HERO SECTION */}
      <section className="bg-[#0B1120] pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80 M20 0 L20 100 M40 0 L40 100 M60 0 L60 100 M80 0 L80 100" stroke="white" strokeWidth="0.1" fill="none" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-start max-w-4xl">
            <span className="inline-block bg-brand-primary/20 text-[#60A5FA] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8">
              {study.tagBadge}
            </span>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.1] mb-8 tracking-tight">
              {study.headline}
            </h1>
            <p className="text-text-faint text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              {study.subheadline}
            </p>

            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/10 w-full">
              {[
                { label: "Industry", val: study.meta.industry },
                { label: "Type", val: study.meta.type },
                { label: "Technology", val: study.meta.technology },
                { label: "Status", val: study.meta.status }
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-white font-semibold text-sm">{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY METRICS BAR */}
      <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-6">
        <div className="bg-surface border border-border-subtle shadow-xl rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {study.keyMetrics.map((m, i) => (
              <div key={i} className="text-center md:text-left relative group">
                {i !== 0 && <div className="hidden lg:block absolute left-[-24px] top-1/2 -translate-y-1/2 w-[1px] h-12 bg-border-subtle/50" />}
                <div className="text-brand-primary text-3xl md:text-4xl font-bold mb-2 tracking-tighter tech-value group-hover:scale-105 transition-transform origin-left">
                  {m.value}
                </div>
                <div className="text-text-main font-bold text-xs uppercase tracking-wider mb-1">{m.label}</div>
                {m.sub && <div className="text-text-faint text-[10px] font-medium">{m.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* LEFT COLUMN: Deep Technical Content */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* S1: CLIENT OVERVIEW */}
            <section id="overview">
              <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                01. Client Overview
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Strategic Partnership & Objectives</h3>
              <p className="text-text-muted text-lg leading-relaxed mb-10">
                {study.clientOverview.content}
              </p>
              
              <div className="bg-bg-soft border border-border-subtle rounded-3xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {study.clientOverview.profile.map((p, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-border-subtle/50 last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                      <span className="text-[11px] font-bold text-text-faint uppercase tracking-wider">{p.label}</span>
                      <span className="text-sm font-semibold text-text-main">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* S2: CHALLENGE */}
            <section id="challenge">
              <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                02. Engineering Challenge
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Overcoming Technical Limitations</h3>
              <p className="text-text-muted text-lg leading-relaxed mb-10">
                {study.challenge.content}
              </p>
              <div className="space-y-4">
                <p className="text-text-main font-bold text-xs uppercase tracking-widest mb-6">Critical Bottlenecks Identified:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {study.challenge.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 bg-surface p-4 rounded-xl border border-border-subtle/50 shadow-sm">
                      <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowLeft className="w-3 h-3 rotate-180" />
                      </div>
                      <span className="text-sm font-medium text-text-muted">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* S3: CONSTRAINTS */}
            {study.technicalConstraints && (
              <section id="constraints">
                <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  03. Technical Constraints
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold mb-10 text-text-main">Hard Design Constraints</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {study.technicalConstraints.tables.map((table, i) => (
                    <div key={i} className="space-y-6">
                      <h4 className="text-sm font-bold text-text-main uppercase tracking-widest px-4 py-2 bg-bg-soft rounded-lg inline-block">{table.title}</h4>
                      <div className="space-y-3">
                        {table.rows.map((row, j) => (
                          <div key={j} className="flex flex-col py-3 border-b border-border-subtle/50 last:border-0">
                            <span className="text-[10px] font-bold text-text-faint uppercase tracking-wider mb-1">{row.label}</span>
                            <span className="text-[13px] font-semibold text-text-main tech-value">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* S4: DESIGN APPROACH */}
            <section id="approach">
              <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                04. Design Approach
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Multi-Stage Topology Optimization</h3>
              <p className="text-text-muted text-lg leading-relaxed mb-12">
                {study.designApproach.content}
              </p>
              
              <div className="space-y-12">
                {study.designApproach.sections.map((section, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-border-subtle hover:border-brand-primary transition-colors py-2">
                    <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-border-subtle border-2 border-surface group-hover:bg-brand-primary" />
                    <h4 className="text-xl font-bold text-text-main mb-4">{section.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed max-w-2xl">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* S5: SEMICONDUCTORS */}
            {study.semiconductors && (
              <section id="semiconductors" className="bg-brand-light rounded-[48px] p-12 border border-blue-50">
                <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                  <Cpu className="w-4 h-4" />
                  05. Semiconductor Selection
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Power Switch Matrix</h3>
                <p className="text-text-muted text-base mb-10">
                  {study.semiconductors.content}
                </p>

                <div className="overflow-x-auto mb-12 rounded-2xl border border-border-subtle shadow-sm">
                  <table className="w-full text-left border-collapse bg-surface">
                    <thead className="bg-bg-soft border-b border-border-subtle">
                      <tr>
                        {study.semiconductors.table.headers.map((h, i) => (
                          <th key={i} className="p-4 text-[11px] font-bold text-text-muted uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {study.semiconductors.table.rows.map((row, i) => (
                        <tr key={i} className="border-b border-border-subtle/50 last:border-0 hover:bg-bg-soft/50 transition-colors">
                          {row.map((cell, j) => (
                            <td key={j} className={cn(
                              "p-4 text-xs font-semibold",
                              j === 0 ? "text-text-faint font-bold uppercase tracking-wider" : "text-text-main tech-value",
                              cell.includes("Selected") && "text-brand-primary font-bold"
                            )}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-xs font-bold text-text-main uppercase tracking-widest mb-4">Selection Rationale:</h5>
                    <ul className="space-y-3">
                      {study.semiconductors.rationale.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                          <CheckCircle2 className="w-4 h-4 text-accent-success shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4 bg-surface p-6 rounded-2xl border border-border-subtle">
                    <h5 className="text-xs font-bold text-text-main uppercase tracking-widest mb-4">Final Device BOM:</h5>
                    <div className="space-y-4">
                      {study.semiconductors.selected.map((s, i) => (
                        <div key={i} className="space-y-1">
                          <div className="text-[10px] font-bold text-text-faint uppercase tracking-widest">{s.stage}</div>
                          <div className="text-[13px] font-bold text-brand-primary tech-value leading-tight">{s.device}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* S6: EFFICIENCY */}
            {study.efficiency && (
              <section id="efficiency">
                <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                  <Zap className="w-4 h-4" />
                  06. Efficiency Performance
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Measured System Efficiency</h3>
                <p className="text-text-muted text-lg mb-10">
                  {study.efficiency.content}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="rounded-2xl border border-border-subtle overflow-hidden shadow-sm">
                    <div className="bg-bg-soft p-4 border-b border-border-subtle">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Efficiency vs Load Sweep</span>
                    </div>
                    <table className="w-full text-left">
                      <thead className="bg-bg-soft/50 border-b border-border-subtle/50">
                        <tr>
                          <th className="p-4 text-[10px] font-bold text-text-faint uppercase">Load %</th>
                          <th className="p-4 text-[10px] font-bold text-text-faint uppercase">Baseline</th>
                          <th className="p-4 text-[10px] font-bold text-brand-primary uppercase">Edrift Design</th>
                        </tr>
                      </thead>
                      <tbody>
                        {study.efficiency.table.map((row, i) => (
                          <tr key={i} className="border-b border-border-subtle/30 last:border-0 hover:bg-bg-soft/30 transition-colors">
                            <td className="p-4 text-xs font-bold text-text-muted tech-value">{row.load}</td>
                            <td className="p-4 text-xs font-medium text-text-faint line-through tech-value">{row.baseline}</td>
                            <td className="p-4 text-sm font-bold text-text-main tech-value">{row.design}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-brand-primary p-8 rounded-[40px] text-white">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/60">Impact Summary</h5>
                    <div className="space-y-6">
                      {study.efficiency.summary.map((s, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-bold tracking-tight">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* S7: THERMAL */}
            {study.thermal && (
              <section id="thermal">
                <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                  <Thermometer className="w-4 h-4" />
                  07. Thermal Analysis
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Heat Management & Junction Temperatures</h3>
                <p className="text-text-muted text-lg mb-10">
                  {study.thermal.content}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="md:col-span-1 space-y-6">
                    <div className="p-6 bg-bg-soft rounded-2xl border border-border-subtle">
                      <div className="text-[10px] font-bold text-text-faint uppercase mb-2">Strategy</div>
                      <p className="text-xs font-bold text-text-main leading-relaxed">{study.thermal.strategy}</p>
                    </div>
                    <div className="p-6 bg-bg-soft rounded-2xl border border-border-subtle">
                      <div className="text-[10px] font-bold text-text-faint uppercase mb-4 text-center">Thermal Path</div>
                      <div className="text-[10px] font-bold text-brand-primary tech-value text-center tracking-tight leading-loose">
                        {study.thermal.path.split("→").join("\n→\n")}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="rounded-2xl border border-border-subtle overflow-hidden shadow-sm h-full">
                      <div className="bg-bg-soft p-4 border-b border-border-subtle flex justify-between items-center">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Junction Temps (Full Load)</span>
                        <span className="text-[10px] font-bold text-text-faint uppercase bg-surface px-3 py-1 rounded shadow-sm">60°C Ambient</span>
                      </div>
                      <table className="w-full text-left">
                        <thead className="bg-bg-soft/50 border-b border-border-subtle/50">
                          <tr>
                            <th className="p-4 text-[10px] font-bold text-text-faint uppercase">Device</th>
                            <th className="p-4 text-[10px] font-bold text-text-faint uppercase text-center">Baseline</th>
                            <th className="p-4 text-[10px] font-bold text-brand-primary uppercase text-center">Design</th>
                            <th className="p-4 text-[10px] font-bold text-accent-success uppercase text-right">Delta</th>
                          </tr>
                        </thead>
                        <tbody>
                          {study.thermal.measurements.map((row, i) => (
                            <tr key={i} className="border-b border-border-subtle/30 last:border-0 hover:bg-bg-soft/30 transition-colors">
                              <td className="p-4 text-xs font-bold text-text-muted">{row.device}</td>
                              <td className="p-4 text-xs font-medium text-text-faint text-center tech-value">{row.baseline}</td>
                              <td className="p-4 text-sm font-bold text-text-main text-center tech-value">{row.design}</td>
                              <td className="p-4 text-xs font-bold text-accent-success text-right tech-value">{row.improvement}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-success" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-900 mb-1">Thermal Success Criteria Met</p>
                    <p className="text-sm text-green-800 leading-relaxed">{study.thermal.result}</p>
                  </div>
                </div>
              </section>
            )}

            {/* S8: POWER DENSITY */}
            {study.powerDensity && (
              <section id="power-density">
                <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  08. Power Density & Form Factor
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Volumetric Comparison</h3>
                <p className="text-text-muted text-lg mb-12">
                  {study.powerDensity.content}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    {study.powerDensity.metrics.map((m, i) => (
                      <div key={i} className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-xs font-bold text-text-main uppercase tracking-widest">{m.label}</span>
                          <span className="text-brand-primary font-bold tech-value">{m.design}</span>
                        </div>
                        <div className="relative h-2 bg-bg-soft rounded-full overflow-hidden">
                           <div 
                             className="absolute inset-y-0 left-0 bg-border-subtle rounded-full" 
                             style={{ width: "100%" }} 
                           />
                           <div 
                             className="absolute inset-y-0 left-0 bg-brand-primary rounded-full" 
                             style={{ width: `${(parseFloat(m.design) / parseFloat(m.baseline)) * 100}%` }} 
                           />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-text-faint">
                          <span>BASELINE: {m.baseline}</span>
                          <span>IMPROVEMENT: {((1 - parseFloat(m.design) / parseFloat(m.baseline)) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-surface-dark rounded-[40px] p-10 text-white relative overflow-hidden">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Volume Recovery Vectors</h5>
                    <ul className="space-y-6 relative z-10">
                      {study.powerDensity.recoveryPoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span className="text-sm font-semibold tracking-tight text-slate-300">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                      <p className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-2">Mechanical Outcome:</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{study.powerDensity.outcome}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* S9: VALIDATION */}
            {study.validation && (
              <section id="validation">
                <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  09. Testing & Validation
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Rigorous Automotive-Grade Verification</h3>
                <p className="text-text-muted text-lg mb-10">
                  {study.validation.content}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {study.validation.tables.map((table, i) => (
                    <div key={i} className="space-y-4">
                      <div className="bg-bg-soft p-4 border border-border-subtle rounded-2xl">
                        <span className="text-[10px] font-bold text-text-main uppercase tracking-widest">{table.title}</span>
                      </div>
                      <div className="space-y-2">
                        {table.rows.map((row, j) => (
                          <div key={j} className="flex justify-between items-center p-4 bg-surface border border-border-subtle/50 rounded-xl hover:border-brand-primary/20 transition-colors group">
                            <span className="text-xs font-semibold text-text-muted">{row.test}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-accent-success uppercase tracking-widest">{row.result}</span>
                              <CheckCircle2 className="w-4 h-4 text-accent-success" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* S10: DEPLOYMENT */}
            <section id="deployment">
              <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
                <Activity className="w-4 h-4" />
                10. Deployment Outcome
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-text-main">Field Results & Scaling</h3>
              <p className="text-text-muted text-lg leading-relaxed mb-10">
                {study.deployment.content}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {study.deployment.metrics.map((m, i) => (
                  <div key={i} className="bg-brand-primary p-6 rounded-3xl text-white">
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">{m.label}</div>
                    <div className="text-2xl font-bold tracking-tighter tech-value">{m.value}</div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sidebar / Rail */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="lg:sticky lg:top-32 space-y-12">
              
              {/* Internal Nav */}
              <nav className="p-8 bg-bg-soft border border-border-subtle rounded-[40px] space-y-4">
                <h5 className="text-[10px] font-bold text-text-faint uppercase tracking-widest mb-6 px-2">On This Page</h5>
                {[
                  { id: "overview", label: "01. Client Overview" },
                  { id: "challenge", label: "02. Challenge" },
                  { id: "constraints", label: "03. Constraints" },
                  { id: "approach", label: "04. Design Approach" },
                  { id: "semiconductors", label: "05. Semiconductors" },
                  { id: "efficiency", label: "06. Efficiency" },
                  { id: "thermal", label: "07. Thermal" },
                  { id: "power-density", label: "08. Power Density" },
                  { id: "validation", label: "09. Validation" },
                  { id: "deployment", label: "10. Deployment" }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="flex w-full items-center justify-between group p-2 hover:bg-surface rounded-xl transition-all"
                  >
                    <span className="text-[13px] font-bold text-text-muted group-hover:text-brand-primary transition-colors">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-text-faint group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </nav>

              {/* Testimonial */}
              {study.testimonial && (
                <div className="p-8 bg-surface-dark rounded-[40px] text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="w-20 h-20 text-brand-primary" />
                   </div>
                   <p className="text-lg font-medium font-heading leading-relaxed mb-8 relative z-10">
                      "{study.testimonial.quote}"
                   </p>
                   <div className="flex items-center gap-4 relative z-10 border-t border-white/10 pt-6">
                      <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-lg">
                        {study.testimonial.author[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">{study.testimonial.author}</div>
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{study.testimonial.role}</div>
                      </div>
                   </div>
                </div>
              )}

              {/* CTAs / Related Links */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-text-faint uppercase tracking-widest mb-6 px-6">Related Resources</h5>
                <div className="grid grid-cols-1 gap-3">
                  {study.relatedLinks.map((link, i) => (
                    <Link 
                      key={i} 
                      href={link.href}
                      className="flex items-center justify-between p-5 bg-surface border border-border-subtle rounded-2xl hover:border-brand-primary hover:shadow-lg transition-all group"
                    >
                      <span className="text-[13px] font-bold text-text-main">{link.label}</span>
                      <ExternalLink className="w-4 h-4 text-text-faint group-hover:text-brand-primary transition-colors" />
                    </Link>
                  ))}
                  <Link 
                    href="/contact"
                    className="bg-brand-primary text-white p-6 rounded-2xl font-bold text-center hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand-primary/20 mt-4 block"
                  >
                    Contact for Similar Project
                  </Link>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* 4. FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <div className="bg-[#0B1120] rounded-[64px] p-12 md:p-20 text-center relative overflow-hidden group">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full -mr-32 -mt-32" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/10 blur-[100px] rounded-full -ml-32 -mb-32" />

           <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">Ready to Optimize Your Power System?</h2>
              <p className="text-text-faint text-lg mb-12">
                Our engineering team works with Tier-1 OEMs to deliver automotive-grade SiC and GaN solutions that scale.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto bg-surface text-text-main px-10 h-14 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-bg-soft transition-all">
                  Book a Technical Audit <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/products" className="w-full sm:w-auto bg-white/10 text-white px-10 h-14 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                  View Hardware Lineup
                </Link>
              </div>
           </div>
        </div>
      </section>

    </main>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
