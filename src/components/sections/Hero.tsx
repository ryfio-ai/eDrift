"use client";

import React from "react";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg-main pt-32 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column — staggered children via CSS animations */}
        <div className="max-w-2xl">
          {/* Eyebrow Label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-subtle border border-border-subtle rounded text-brand-primary text-[10px] font-semibold tracking-wider mb-10"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms both" }}
          >
            <Shield className="w-3.5 h-3.5" />
            Automotive-Grade Reliability
          </div>

          {/* Heading */}
          <h1
            className="text-text-main mb-6 !leading-[1.1]"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 80ms both" }}
          >
            Automotive-Grade <span className="text-brand-primary">Power Electronics</span> for EV OEMs
          </h1>

          {/* Supporting Paragraph */}
          <p
            className="text-base md:text-lg text-text-muted leading-relaxed max-w-lg mb-10"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 160ms both" }}
          >
            eDrift Electric develops high-efficiency SiC-based power systems for automotive and industrial EV programs, providing full engineering support from prototyping to production deployment.
          </p>

          {/* CTA Row */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 240ms both" }}
          >
            <Link href="/contact" className="btn-primary w-full sm:w-auto px-8">
              Talk to Engineering
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/products" className="btn-outline w-full sm:w-auto px-8">
              View Catalog
            </Link>
          </div>

          {/* Enterprise Proof Strip */}
          <div
            className="flex flex-wrap gap-x-10 gap-y-4 items-center border-t border-border-subtle pt-8"
            style={{ animation: "heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 340ms both" }}
          >
            {[
              { icon: Zap, label: "Efficiency", value: "97.5%" },
              { icon: Shield, label: "Functional Safety", value: "ASIL-D" },
              { icon: Globe, label: "Standards", value: "ISO 9001" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold tracking-widest text-text-faint">{item.label}</span>
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-brand-primary/80" />
                  <span className="text-sm font-bold text-text-main tech-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div
          className="relative hidden lg:block"
          style={{ animation: "heroFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms both" }}
        >
          <div className="relative bg-white border border-border-subtle rounded-lg p-10 shadow-sm aspect-[4/3] flex flex-col items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-slate-50/50 -z-10" />
            <div className="w-full h-full border border-dashed border-stronger-border rounded flex flex-col items-center justify-center text-center p-12 transition-colors group-hover:bg-slate-50/80">
              <Zap className="w-12 h-12 text-brand-primary/10 mb-4" />
              <p className="text-[10px] font-semibold text-text-faint tracking-[0.15em] leading-[1.8]">
                SYSTEM ARCHITECTURE <br />
                VISUALIZATION
              </p>
            </div>
            <div className="absolute top-8 right-8 p-6 bg-white border border-border-subtle rounded shadow-sm">
              <p className="text-[10px] font-semibold tracking-widest text-brand-primary mb-1.5">EBC-33-SiC</p>
              <h4 className="text-sm font-bold text-text-main">3.3kW On-Board Charger</h4>
              <p className="text-[9px] text-text-faint mt-1.5 tech-value">REF: ED-SIC-3.3-001</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
