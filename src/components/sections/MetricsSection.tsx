"use client";

import React from "react";
import { Counter } from "@/components/ui/Counter";

export const MetricsSection = () => {
  const metrics = [
    { label: "Peak Efficiency", val: 97.5, suffix: "%", decimals: 1, desc: "Industry-leading power conversion efficiency." },
    { label: "Design Life", val: 10, suffix: "+ Years", desc: "Engineered for long-term industrial durability." },
    { label: "Prototyping", val: 4, suffix: "-6 Weeks", desc: "Rapid feasibility transition to hardware validation." },
    { label: "Safety Standard", val: "ASIL-D", desc: "Highest functional safety alignment for EV systems." }
  ];

  return (
    <section className="py-24 bg-white border-y border-border-subtle">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-animate-stagger>
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="p-8 flex flex-col justify-start border border-transparent hover:border-border-subtle transition-colors rounded-lg"
            >
              <p className="label-uppercase mb-4">{metric.label}</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-text-main mb-3 tracking-tighter tech-value">
                {typeof metric.val === "number" ? (
                  <Counter value={metric.val} suffix={metric.suffix} decimals={metric.decimals} />
                ) : (
                  <span>{metric.val}</span>
                )}
              </h3>
              <p className="text-sm font-medium text-text-muted leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
