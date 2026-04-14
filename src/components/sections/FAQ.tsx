"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is the typical engagement flow?",
    a: "Most programs begin with a technical feasibility discussion, followed by architecture alignment, rapid prototyping, and validation planning."
  },
  {
    q: "Do you support NDA-based engineering discussions?",
    a: "Yes. For OEM and product-development engagements, eDrift can begin with confidential technical discussions before commercial scoping."
  },
  {
    q: "Can your systems be customized for thermal and packaging constraints?",
    a: "Yes. eDrift supports application-specific requirements including thermal envelopes, voltage ranges, control strategy, and physical packaging needs."
  },
  {
    q: "What types of organizations do you work with?",
    a: "eDrift works with EV OEMs, fleet operators, industrial platform developers, and partners building charging or power conversion infrastructure."
  },
  {
    q: "What volumes can you support?",
    a: "Programs can begin at pilot scale and expand toward larger annual production volumes based on technical fit and deployment scope."
  },
  {
    q: "How quickly can your team respond?",
    a: "Initial engineering and commercial responses are typically provided within one business day for qualified inquiries."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <p className="label-uppercase">Industrial FAQ</p>
            <div className="w-12 h-[2px] bg-brand-primary" />
          </div>
          <h2 className="text-center">
            Answers for Engineering and <br />
            <span className="text-brand-primary">Procurement Teams</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border rounded-2xl transition-all duration-300 ${openIndex === i ? "border-brand-primary/20 bg-bg-subtle shadow-lg" : "border-border-subtle hover:border-slate-200"}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-7 flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors ${openIndex === i ? "text-text-main" : "text-text-muted group-hover:text-text-main"}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? "bg-brand-primary text-white rotate-180" : "bg-bg-subtle text-text-faint group-hover:bg-slate-100"}`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <div className="h-px bg-border-subtle mb-6" />
                      <p className="text-sm font-medium text-text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
